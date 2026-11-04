#!/usr/bin/env node
// Step 3: nightly pSEO job. See BUILD_PLAN.md "Shape" and "Live-page rules".
// Flow: load -> links -> refresh facts -> render + gate every spec -> write new pages
// up to quota, re-render existing live pages and apply live-page rules, retire old
// noindex pages -> local: write files to disk; remote: open one PR.

import { readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { renderPage, affiliateLinks, attachRelated } from './render.mjs';
import { gate, checkRelatedLinks } from './gate.mjs';
import { loadLocal, loadSpecs } from './seed.mjs';
import { loadAll, createClient } from './lib/supabase.mjs';
import { fetchLinks } from './lib/notion.mjs';
import { refreshFacts, checkLink } from './lib/refresh.mjs';
import { trafficVerdicts } from './lib/gsc.mjs';
import { openPr } from './lib/github.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PAGES_DIR = path.join(REPO_ROOT, 'src', 'data', 'pseo', 'pages');

const REQUIRED_SECRETS = [
	'PSEO_SUPABASE_URL',
	'PSEO_SUPABASE_SERVICE_KEY',
	'PSEO_NOTION_TOKEN',
	'PSEO_CHEAT_SHEET_PAGE_ID',
	'PSEO_GITHUB_TOKEN',
	'PSEO_REPO',
];

const STALE_FACT_DAYS = 45;
const RETIRE_AFTER_DAYS = 120;

function parseArgs(argv) {
	const dateArg = argv.find((a) => a.startsWith('--date='));
	return {
		local: argv.includes('--local'),
		dryRun: argv.includes('--dry-run'),
		date: dateArg ? dateArg.slice('--date='.length) : new Date().toISOString().slice(0, 10),
	};
}

function daysBetween(a, b) {
	return Math.abs((new Date(a).getTime() - new Date(b).getTime()) / 86_400_000);
}

function pagePath(slug) {
	return path.join(PAGES_DIR, `${slug}.json`);
}

function readExistingPage(slug) {
	const file = pagePath(slug);
	return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
}

function serialize(page) {
	return JSON.stringify(page, null, 2) + '\n';
}

function resolveLinks(products, seedLinks, notionLinks) {
	if (seedLinks) return seedLinks;
	const links = {};
	for (const product of products) {
		if (notionLinks[product.slug]) links[product.slug] = notionLinks[product.slug];
		else if (product.link_url) links[product.slug] = product.link_url;
	}
	return links;
}

/** Render + gate every spec, then split into new-page candidates, live re-renders, and noindex retirement candidates. */
function buildRun({ specs, facts, products, links, claims, trackedPages, runDate }) {
	const renderedPages = specs.map((spec) => renderPage(spec, { facts, products, links, claims, runDate }));
	const gateResults = renderedPages.map((page, i) =>
		gate(page, {
			spec: specs[i],
			facts,
			products,
			links,
			claims,
			otherPages: renderedPages.filter((_, j) => j !== i),
			runDate,
		})
	);

	const newCandidates = [];
	const gateFailures = [];
	const liveRewrites = [];
	const retirements = [];

	specs.forEach((spec, i) => {
		const page = renderedPages[i];
		const existing = readExistingPage(spec.slug);

		if (!existing) {
			if (gateResults[i].ok) newCandidates.push({ slug: spec.slug, wave: spec.wave ?? 0, page });
			else gateFailures.push({ slug: spec.slug, errors: gateResults[i].errors });
			return;
		}

		if (existing.status === 'live') {
			// Keep the original publish date (traffic rules count from it).
			page.published = existing.published ?? page.published;
			const optionSlugs = spec.products.filter((p) => p.role === 'option').map((p) => p.slug);
			const staleFact = facts.find((f) => optionSlugs.includes(f.product) && daysBetween(f.checked_at, runDate) > STALE_FACT_DAYS);
			const reasons = staleFact ? [`fact "${staleFact.id}" checked_at is older than ${STALE_FACT_DAYS} days`] : [];
			liveRewrites.push({ slug: spec.slug, page, reasons, affiliateHrefs: affiliateLinks(page) });
			return;
		}

		if (existing.status === 'noindex') {
			const tracked = trackedPages.find((p) => p.slug === spec.slug);
			if (tracked?.noindex_at && daysBetween(tracked.noindex_at, runDate) >= RETIRE_AFTER_DAYS) retirements.push(spec.slug);
		}
	});

	return { newCandidates, gateFailures, liveRewrites, retirements };
}

/** Live-page demotion: stale option fact, dead affiliate link (network check skipped in --local), low search traffic. */
async function applyLiveRules(liveRewrites, { metrics, runDate, checkLinksNetwork }) {
	const verdicts = trafficVerdicts(
		liveRewrites.map((r) => ({ slug: r.slug, status: 'live', published: r.page.published })),
		metrics,
		runDate
	);
	for (const rewrite of liveRewrites) {
		if (verdicts[rewrite.slug] === 'noindex') rewrite.reasons.push('fewer than 10 impressions 90+ days after publish');
		if (checkLinksNetwork) {
			for (const href of rewrite.affiliateHrefs) {
				const result = await checkLink(href);
				if (result.dead) rewrite.reasons.push(`affiliate link ${href} is dead`);
			}
		}
		if (rewrite.reasons.length > 0) rewrite.page.status = 'noindex';
	}
	return liveRewrites;
}

/** Re-rendered live pages are only written when something besides the dates changed (or they were demoted), so a quiet night opens no PR. */
function changedRewrites(liveRewrites) {
	const strip = ({ modified, checked, ...rest }) => rest;
	return liveRewrites.filter((r) => {
		const existing = readExistingPage(r.slug);
		return !existing || JSON.stringify(strip(existing)) !== JSON.stringify(strip(r.page));
	});
}

/**
 * Related comparisons: computed from every page that will be live after this run (new pages that passed the gate and
 * quota, live re-renders not demoted, and live pages on disk with no spec), so a new page and its siblings link both ways.
 */
function linkRelated(written, liveRewrites) {
	const renderedSlugs = new Set([...written, ...liveRewrites].map((r) => r.slug));
	const onDisk = existsSync(PAGES_DIR)
		? readdirSync(PAGES_DIR)
				.filter((f) => f.endsWith('.json'))
				.map((f) => JSON.parse(readFileSync(path.join(PAGES_DIR, f), 'utf8')))
				.filter((p) => p.status === 'live' && !renderedSlugs.has(p.slug))
		: [];
	const targets = [...written.map((c) => c.page), ...liveRewrites.map((r) => r.page)];
	const pool = [...targets.filter((p) => p.status === 'live'), ...onDisk];
	attachRelated(targets, pool);
	const failures = [];
	for (const page of targets.filter((p) => p.status === 'live')) {
		const errors = checkRelatedLinks(page, pool);
		if (errors.length > 0) failures.push({ slug: page.slug, errors });
	}
	return failures;
}

function applyQuota(newCandidates, quota) {
	const sorted = [...newCandidates].sort((a, b) => a.wave - b.wave || a.slug.localeCompare(b.slug));
	return { written: sorted.slice(0, quota), skipped: sorted.slice(quota).map((c) => c.slug) };
}

function summarize({ mode, date, written, skipped, gateFailures, liveRewrites, retirements }) {
	const demoted = liveRewrites.filter((r) => r.page.status === 'noindex').length;
	return `pseo ${mode} ${date}: +${written.length} new, ${liveRewrites.length} re-rendered (${demoted} -> noindex), ${retirements.length} retired, ${gateFailures.length} gate failures, ${skipped.length} quota-skipped`;
}

function dailyQuota() {
	const n = Number(process.env.PSEO_DAILY_QUOTA ?? 2);
	return Number.isFinite(n) && n >= 0 ? n : 2;
}

async function runLocal({ dryRun, date }) {
	const data = loadLocal();
	const { newCandidates, gateFailures, liveRewrites, retirements } = buildRun({
		specs: data.specs,
		facts: data.facts,
		products: data.products,
		links: data.links,
		claims: data.claims,
		trackedPages: data.pages,
		runDate: date,
	});
	await applyLiveRules(liveRewrites, { metrics: data.metrics, runDate: date, checkLinksNetwork: false });
	const { written, skipped } = applyQuota(newCandidates, dailyQuota());
	for (const f of linkRelated(written, liveRewrites)) console.error(`related links ${f.slug}: ${f.errors.join('; ')}`);

	if (!dryRun) {
		for (const candidate of written) writeFileSync(pagePath(candidate.slug), serialize(candidate.page));
		for (const rewrite of changedRewrites(liveRewrites)) writeFileSync(pagePath(rewrite.slug), serialize(rewrite.page));
		for (const slug of retirements) if (existsSync(pagePath(slug))) unlinkSync(pagePath(slug));
	}

	console.log(summarize({ mode: dryRun ? 'local dry-run' : 'local', date, written, skipped, gateFailures, liveRewrites, retirements }));
	return 0;
}

async function runRemote({ date }) {
	const missing = REQUIRED_SECRETS.filter((name) => !process.env[name]);
	if (missing.length > 0) {
		console.log(`missing env: ${missing.join(', ')}`);
		return runLocal({ dryRun: true, date });
	}

	try {
		const startedAt = new Date().toISOString();
		const supabaseOpts = { url: process.env.PSEO_SUPABASE_URL, serviceKey: process.env.PSEO_SUPABASE_SERVICE_KEY };
		const supabase = createClient(supabaseOpts);
		const data = await loadAll(supabaseOpts);
		const specs = loadSpecs();

		const notionLinks = await fetchLinks({
			token: process.env.PSEO_NOTION_TOKEN,
			pageId: process.env.PSEO_CHEAT_SHEET_PAGE_ID,
			products: data.products,
		});
		const links = resolveLinks(data.products, null, notionLinks);
		const facts = await refreshFacts(data.facts, { now: date });

		const { newCandidates, gateFailures, liveRewrites, retirements } = buildRun({
			specs,
			facts,
			products: data.products,
			links,
			claims: data.claims,
			trackedPages: data.pages,
			runDate: date,
		});
		await applyLiveRules(liveRewrites, { metrics: data.metrics, runDate: date, checkLinksNetwork: true });
		const { written, skipped } = applyQuota(newCandidates, dailyQuota());
	for (const f of linkRelated(written, liveRewrites)) console.error(`related links ${f.slug}: ${f.errors.join('; ')}`);

		const files = {};
		for (const candidate of written) files[`src/data/pseo/pages/${candidate.slug}.json`] = serialize(candidate.page);
		for (const rewrite of changedRewrites(liveRewrites)) files[`src/data/pseo/pages/${rewrite.slug}.json`] = serialize(rewrite.page);
		for (const slug of retirements) files[`src/data/pseo/pages/${slug}.json`] = null;

		const summary = {
			date,
			new: written.map((c) => c.slug),
			quotaSkipped: skipped,
			reRendered: liveRewrites.map((r) => r.slug),
			noindexed: liveRewrites.filter((r) => r.page.status === 'noindex').map((r) => r.slug),
			retired: retirements,
			gateFailures,
		};

		if (Object.keys(files).length > 0) {
			await openPr({
				token: process.env.PSEO_GITHUB_TOKEN,
				repo: process.env.PSEO_REPO,
				base: 'main',
				branch: `pseo/nightly-${date}`,
				files,
				title: `pSEO nightly ${date}`,
				body: JSON.stringify(summary, null, 2),
			});
		}

		// Write back refreshed fact dates/stale flags and page statuses.
		const changedFacts = facts.filter((f, i) => f.checked_at !== data.facts[i].checked_at || f.stale !== data.facts[i].stale);
		if (changedFacts.length > 0) {
			await supabase.upsert(
				'pseo_facts',
				changedFacts.map(({ id, product, field, value, number, source_url, source_quote, refresh_method, checked_at, stale }) => ({ id, product, field, value, number, source_url, source_quote, refresh_method, checked_at, stale, updated_at: new Date().toISOString() })),
				{ onConflict: 'id' }
			);
		}
		const pageRows = [
			...written.map((c) => ({ slug: c.slug, route: c.page.route, template: c.page.template, products: c.page.products.map((p) => p.slug), status: 'live', wave: c.wave, gate_failures: [], published_at: new Date().toISOString() })),
			...gateFailures.map((g) => {
				const spec = specs.find((sp) => sp.slug === g.slug);
				return { slug: g.slug, route: spec.route, template: spec.template, products: spec.products.map((p) => p.slug), status: 'draft', wave: spec.wave ?? null, gate_failures: g.errors };
			}),
			...liveRewrites.filter((r) => r.page.status === 'noindex').map((r) => ({ slug: r.slug, route: r.page.route, template: r.page.template, products: r.page.products.map((p) => p.slug), status: 'noindex', noindex_at: new Date().toISOString(), gate_failures: r.reasons })),
		].map((row) => ({ ...row, updated_at: new Date().toISOString() }));
		for (const row of pageRows) await supabase.upsert('pseo_pages', [row], { onConflict: 'slug' });

		await supabase.insert('pseo_runs', [{ started_at: startedAt, finished_at: new Date().toISOString(), mode: 'nightly', summary }]);

		console.log(summarize({ mode: 'nightly', date, written, skipped, gateFailures, liveRewrites, retirements }));
	} catch (err) {
		console.error(`pseo nightly ${date} failed: ${err?.stack ?? err}`);
	}
	return 0;
}

async function main() {
	const { local, dryRun, date } = parseArgs(process.argv.slice(2));
	return local ? runLocal({ dryRun, date }) : runRemote({ date });
}

if (path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1] ?? '')) {
	main().catch((err) => {
		console.error(err);
		process.exit(1);
	});
}

export { buildRun, applyLiveRules, applyQuota, resolveLinks };
