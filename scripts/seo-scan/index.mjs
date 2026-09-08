#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { config } from './config.mjs';
import { crawlDist, readStaticFile, pathExists, listStaticAssetRoutes } from './crawl.mjs';
import { readSitemapUrls } from './sitemap.mjs';
import { readWritingSource, findTodoMarkers } from './source.mjs';
import { runTechnicalSeoRules } from './rules/technical-seo.mjs';
import { runAeoRules } from './rules/aeo.mjs';
import { runContentGapRules, buildTodoFindings } from './rules/content-gaps.mjs';
import { resolveSiblingLinks } from './sibling-links.mjs';
import { checkExternalLinks } from './external-links.mjs';
import { buildReport, parsePreviousData } from './report.mjs';
import { findOpenIssue, upsertScanIssue } from './github-issue.mjs';

const TODO_SCAN_DIRS = {
	main: ['src/pages', 'src/content', 'src/components', 'src/layouts'],
	fourlaws: ['src-fourlaws/pages', 'src-fourlaws/content', 'src-fourlaws/components', 'src-fourlaws/layouts'],
};

function withId(f) {
	return { ...f, id: `${f.site}::${f.id}` };
}

async function crawlSite(site) {
	if (!(await pathExists(site.distDir))) {
		console.warn(`Skipping ${site.label}: ${site.distDir} not built. Run the site's build script first.`);
		return null;
	}
	const pages = await crawlDist(site.distDir, site.siteUrl, {
		urlFormat: site.urlFormat,
		site: site.key,
		siteLabel: site.label,
	});
	return {
		pages,
		siteMap: await readSitemapUrls(site.distDir),
		robotsTxt: await readStaticFile(site.distDir, 'robots.txt'),
		hasLlmsTxt: Boolean(await readStaticFile(site.distDir, 'llms.txt')),
		assetRoutes: await listStaticAssetRoutes(site.distDir),
	};
}

async function main() {
	// Crawl every site first — sibling-link resolution below needs the full
	// route set of every site before any single site's rules can run.
	const crawled = new Map();
	for (const site of config.sites) {
		const result = await crawlSite(site);
		if (result) crawled.set(site.key, result);
	}

	const allPages = [...crawled.values()].flatMap((c) => c.pages);
	const activeSites = config.sites.filter((s) => crawled.has(s.key));
	const { findings: siblingFindings, pages: pagesWithSiblingsResolved } = resolveSiblingLinks(allPages, activeSites);

	const allFindings = [];
	const siteSummaries = [];

	for (const site of activeSites) {
		const { siteMap, robotsTxt, hasLlmsTxt, assetRoutes } = crawled.get(site.key);
		const pages = pagesWithSiblingsResolved.filter((p) => p.site === site.key);
		siteSummaries.push({ label: site.label, pageCount: pages.length });

		const siteConfig = {
			siteUrl: site.siteUrl,
			excludeFromContentChecks: site.excludeFromContentChecks,
			expectedNoindex: site.expectedNoindex,
			thresholds: config.thresholds,
			targetTopics: config.targetTopics,
		};

		const findings = [
			...runTechnicalSeoRules(pages, { config: siteConfig, siteMap, robotsTxt, assetRoutes }),
			...runAeoRules(pages, { config: siteConfig, hasLlmsTxt }),
		];

		if (site.runContentGapRules) {
			const writingPosts = await readWritingSource(config.writingContentDir);
			findings.push(...runContentGapRules(pages, { config: siteConfig, writingPosts }));
		}

		const todoMarkers = await findTodoMarkers(TODO_SCAN_DIRS[site.key] ?? []);
		findings.push(...buildTodoFindings(todoMarkers));

		allFindings.push(...findings.map((f) => withId({ ...f, site: site.key, siteLabel: site.label })));
	}

	allFindings.push(...siblingFindings.map(withId));

	const externalLinkFindings = await checkExternalLinks(pagesWithSiblingsResolved, config.externalLinks);
	allFindings.push(...externalLinkFindings.map((f) => ({ ...f, id: `links::${f.id}` })));

	const scannedAt = new Date().toISOString().slice(0, 10);
	const priorityRank = { P0: 0, P1: 1, P2: 2 };
	allFindings.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority] || a.category.localeCompare(b.category));

	const token = process.env.GITHUB_TOKEN;
	const repo = process.env.GITHUB_REPOSITORY;

	if (token && repo) {
		const existing = await findOpenIssue(repo, token, config.github.issueLabel, config.github.issueTitle);
		const previousData = parsePreviousData(existing?.body);

		const { markdown, counts, newCount, resolvedCount } = buildReport({
			findings: allFindings,
			previousData,
			scannedAt,
			siteSummaries,
		});

		const changeSummary =
			previousData && (newCount > 0 || resolvedCount > 0)
				? `**${scannedAt} scan:** ${newCount} new item(s), ${resolvedCount} resolved since last week. (P0: ${counts.P0}, P1: ${counts.P1}, P2: ${counts.P2} open now.)`
				: null;

		const { issue, created } = await upsertScanIssue({
			repo,
			token,
			label: config.github.issueLabel,
			title: config.github.issueTitle,
			body: markdown,
			changeSummary,
			existing,
		});
		console.log(`${created ? 'Created' : 'Updated'} issue #${issue.number}: ${issue.html_url}`);
	} else {
		const { markdown } = buildReport({ findings: allFindings, previousData: null, scannedAt, siteSummaries });
		await writeFile('seo-scan-report.md', markdown, 'utf-8');
		console.log(markdown);
		console.log('\n(No GITHUB_TOKEN/GITHUB_REPOSITORY in env — wrote seo-scan-report.md locally instead of updating a GitHub issue.)');
	}
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 1;
});
