#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { config } from './config.mjs';
import { crawlDist, readStaticFile, pathExists, listStaticAssetRoutes } from './crawl.mjs';
import { readSitemapUrls } from './sitemap.mjs';
import { readMarkdownCollection, findTodoMarkers } from './source.mjs';
import { runTechnicalSeoRules } from './rules/technical-seo.mjs';
import { runAeoRules } from './rules/aeo.mjs';
import { runContentGapRules, buildTodoFindings } from './rules/content-gaps.mjs';
import { checkExternalLinks } from './external-links.mjs';
import { buildReport, parsePreviousData } from './report.mjs';
import { findOpenIssue, upsertScanIssue } from './github-issue.mjs';

// One entry per site this repo builds — see config.mjs. Consolidated to a
// single site in September 2026 (docs/site-consolidation.md); kept as a map
// keyed by site.key rather than hard-coded in case that ever changes again.
const TODO_SCAN_DIRS = {
	main: ['src/pages', 'src/content', 'src/components', 'src/layouts', 'src/lib'],
};

function withId(f) {
	return { ...f, id: `${f.site}::${f.id}` };
}

async function scanSite(site) {
	if (!(await pathExists(site.distDir))) {
		console.warn(`Skipping ${site.label}: ${site.distDir} not built. Run the site's build script first.`);
		return { pages: [], findings: [] };
	}

	const pages = await crawlDist(site.distDir, site.siteUrl, {
		urlFormat: site.urlFormat,
		site: site.key,
		siteLabel: site.label,
	});
	const siteMap = await readSitemapUrls(site.distDir);
	const robotsTxt = await readStaticFile(site.distDir, 'robots.txt');
	const hasLlmsTxt = Boolean(await readStaticFile(site.distDir, 'llms.txt'));
	const assetRoutes = await listStaticAssetRoutes(site.distDir);

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
		const writingPosts = await readMarkdownCollection(config.writingContentDir);
		const fourLawsPosts = await readMarkdownCollection(config.fourLawsContentDir);
		findings.push(...runContentGapRules(pages, { config: siteConfig, writingPosts, fourLawsPosts }));
	}

	const todoMarkers = await findTodoMarkers(TODO_SCAN_DIRS[site.key] ?? []);
	findings.push(...buildTodoFindings(todoMarkers));

	return { pages, findings: findings.map((f) => withId({ ...f, site: site.key, siteLabel: site.label })) };
}

async function main() {
	const allPages = [];
	const allFindings = [];
	const siteSummaries = [];

	for (const site of config.sites) {
		const { pages, findings } = await scanSite(site);
		allPages.push(...pages);
		allFindings.push(...findings);
		if (pages.length > 0) siteSummaries.push({ label: site.label, pageCount: pages.length });
	}

	const externalLinkFindings = await checkExternalLinks(allPages, config.externalLinks);
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
