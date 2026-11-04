import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { renderPage } from './render.mjs';
import { gate } from './gate.mjs';
import { loadLocal } from './seed.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(dir, 'fixtures');

function loadJson(...parts) {
	return JSON.parse(readFileSync(path.join(fixturesDir, ...parts), 'utf8'));
}

const facts = loadJson('facts.json');
const products = loadJson('products.json');
const links = loadJson('links.json');
const claims = loadJson('claims.json');
const specs = {
	best: loadJson('specs', 'best.json'),
	compare: loadJson('specs', 'compare.json'),
	'howto-planned': loadJson('specs', 'howto-planned.json'),
};

const RUN_DATE = '2026-10-31';
const EXPECTED_KEYS = [
	'slug',
	'route',
	'template',
	'status',
	'title',
	'seoTitle',
	'description',
	'h1',
	'dek',
	'published',
	'modified',
	'checked',
	'disclosure',
	'niche',
	'fitTable',
	'sections',
	'faq',
	'closing',
	'ctas',
	'products',
	'sources',
].sort();

function render(spec, overrides = {}) {
	return renderPage(spec, { facts, products, links, claims, runDate: RUN_DATE, ...overrides });
}

function renderAll() {
	return {
		best: render(specs.best),
		compare: render(specs.compare),
		'howto-planned': render(specs['howto-planned']),
	};
}

for (const name of Object.keys(specs)) {
	test(`${name} fixture renders the step-1 page shape and passes the gate`, () => {
		const pages = renderAll();
		const page = pages[name];
		assert.deepEqual(Object.keys(page).sort(), EXPECTED_KEYS);

		const otherPages = Object.keys(pages)
			.filter((k) => k !== name)
			.map((k) => pages[k]);
		const result = gate(page, { spec: specs[name], facts, products, links, claims, otherPages, runDate: RUN_DATE });
		assert.deepEqual(result.errors, []);
		assert.equal(result.ok, true);
	});
}

test('rule 2: fails when an option product has too few facts', () => {
	const page = render(specs.best);
	const reducedFacts = facts.filter((f) => !(f.product === 'gamma-crm' && ['gamma.integrations', 'gamma.support'].includes(f.id)));
	const result = gate(page, { spec: specs.best, facts: reducedFacts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 2:') && e.includes('gamma-crm')), result.errors.join('\n'));
});

test('rule 2: fails when facts are stale relative to the run date', () => {
	const page = render(specs.best);
	const result = gate(page, { spec: specs.best, facts, products, links, claims, runDate: '2026-12-31' });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 2:') && e.includes('stale')), result.errors.join('\n'));
});

test('rule 4: fails when the body has a number with no matching fact', () => {
	const spec = structuredClone(specs.best);
	spec.sections[0].blocks.push({ type: 'p', html: 'A one-time setup consultation costs $77 if you want a human to do it for you.' });
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 4:') && e.includes('$77')), result.errors.join('\n'));
});

test('rule 6: fails on a banned phrase', () => {
	const spec = structuredClone(specs.best);
	spec.sections[0].blocks.push({ type: 'p', html: 'This feature is staff-only for now.' });
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 6:') && e.includes('staff-only')), result.errors.join('\n'));
});

test('rule 5: fails when an affiliate page has no disclosure', () => {
	const page = render(specs.best);
	page.disclosure = null;
	const result = gate(page, { spec: specs.best, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 5:') && e.includes('disclosure')), result.errors.join('\n'));
});

test('real specs: close-vs-pipedrive and crm-for-freelancers pass the gate with loadLocal() data', () => {
	const local = loadLocal();
	const runDate = '2026-11-01';
	const realSpecs = local.specs.filter((s) => ['close-vs-pipedrive', 'crm-for-freelancers'].includes(s.slug));
	assert.equal(realSpecs.length, 2);

	const pages = realSpecs.map((spec) => renderPage(spec, { facts: local.facts, products: local.products, links: local.links, claims: local.claims, runDate }));

	realSpecs.forEach((spec, i) => {
		const otherPages = pages.filter((_, j) => j !== i);
		const result = gate(pages[i], { spec, facts: local.facts, products: local.products, links: local.links, claims: local.claims, otherPages, runDate });
		assert.deepEqual(result.errors, []);
		assert.equal(result.ok, true);
	});
});

test('rule 7: fails when a planned product gets a live cta', () => {
	const spec = structuredClone(specs['howto-planned']);
	const deltaSync = spec.products.find((p) => p.slug === 'delta-sync');
	deltaSync.role = 'own_cta';
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 7:') && e.includes('live cta')), result.errors.join('\n'));
});

test('rule 8: fails when an option product has neither an affiliate link nor a site URL', () => {
	const spec = structuredClone(specs.best);
	spec.products.find((p) => p.slug === 'gamma-crm').link = false;
	const page = render(spec);
	const result = gate(page, { spec, facts, products, links, claims, runDate: RUN_DATE });
	assert.equal(result.ok, false);
	assert.ok(result.errors.some((e) => e.startsWith('rule 8:') && e.includes('gamma-crm')), result.errors.join('\n'));
});

test('rule 8: an option product without an affiliate link falls back to a plain site link', () => {
	const spec = structuredClone(specs.best);
	spec.products.find((p) => p.slug === 'gamma-crm').link = false;
	const withSite = products.map((p) => (p.slug === 'gamma-crm' ? { ...p, site: 'https://gamma.example.com/' } : p));
	const page = render(spec, { products: withSite });
	const cta = page.ctas.find((c) => c.product === 'gamma-crm');
	assert.deepEqual(cta, { label: 'Visit Gamma CRM', href: 'https://gamma.example.com/', kind: 'site', product: 'gamma-crm' });
	assert.equal(page.products.find((p) => p.slug === 'gamma-crm').linkKind, 'site');
	const result = gate(page, { spec, facts, products: withSite, links, claims, runDate: RUN_DATE });
	assert.ok(!result.errors.some((e) => e.startsWith('rule 8:')), result.errors.join('\n'));
});

test('disclosure only appears when at least one affiliate link is on the page', () => {
	const spec = structuredClone(specs.best);
	for (const p of spec.products) p.link = false;
	const withSite = products.map((p) => ({ ...p, site: `https://${p.slug}.example.com/` }));
	const page = render(spec, { products: withSite });
	assert.equal(page.disclosure, null);
	assert.ok(page.ctas.every((c) => c.kind !== 'affiliate'));
});

test('rule 8: a mentioned product must be linked inline with {{link:slug}}', () => {
	const spec = structuredClone(specs.best);
	const withSite = products.map((p) => (p.slug === 'delta-sync' ? p : { ...p, site: `https://${p.slug}.example.com/` }));
	const mention = { slug: 'zeta-crm', name: 'Zeta CRM', product_type: 'affiliate', site: 'https://zeta.example.com/' };
	spec.products.push({ slug: 'zeta-crm', role: 'mention', link: false });
	const unlinked = render(spec, { products: [...withSite, mention] });
	const bad = gate(unlinked, { spec, facts, products: [...withSite, mention], links, claims, runDate: RUN_DATE });
	assert.ok(bad.errors.some((e) => e.startsWith('rule 8:') && e.includes('zeta-crm')), bad.errors.join('\n'));

	spec.sections[0].blocks.push({ type: 'p', html: 'Teams moving off {{link:zeta-crm}} can import contacts.' });
	const linked = render(spec, { products: [...withSite, mention] });
	assert.ok(linked.sections[0].blocks.at(-1).html.includes('<a href="https://zeta.example.com/" target="_blank" rel="noopener">Zeta CRM</a>'));
	const good = gate(linked, { spec, facts, products: [...withSite, mention], links, claims, runDate: RUN_DATE });
	assert.ok(!good.errors.some((e) => e.startsWith('rule 8:')), good.errors.join('\n'));
});
