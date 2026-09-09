import { matchesAnyRoute, isExcludedRoute } from '../util.mjs';

// Each rule returns findings as { id, priority, category, page, title, detail, fix }.
// `id` must be stable week over week (no timestamps, no counts) so the
// report can diff "new" vs "resolved" against the previous scan.
const CATEGORY = 'technical-seo';

function finding(id, priority, page, title, detail, fix) {
	return { id: `${CATEGORY}:${page ?? 'site'}:${id}`, priority, category: CATEGORY, page, title, detail, fix };
}

export function runTechnicalSeoRules(pages, { config, siteMap, robotsTxt, assetRoutes = [] }) {
	const findings = [];
	const contentPages = pages.filter((p) => !isExcludedRoute(p.route, config.excludeFromContentChecks));

	for (const page of contentPages) {
		const { route } = page;

		if (!page.title) {
			findings.push(finding('missing-title', 'P0', route, 'Missing <title>', 'The page has no <title> element.', 'Add a title via the Base layout\'s `title` or `seoTitle` prop.'));
		} else {
			const len = page.title.length;
			if (len < config.thresholds.titleMin || len > config.thresholds.titleMax) {
				findings.push(finding('title-length', 'P1', route, 'Title length outside recommended range',
					`"${page.title}" is ${len} characters (recommended ${config.thresholds.titleMin}-${config.thresholds.titleMax}). Search engines truncate past ~60.`,
					'Use the `seoTitle` prop on Base.astro to set a shorter search-results title without changing the on-page H1.'));
			}
		}

		if (!page.metaDescription) {
			findings.push(finding('missing-description', 'P1', route, 'Missing meta description',
				'No <meta name="description"> found — search engines and AI answer engines will fall back to pulling arbitrary text from the page.',
				'Pass a `description` prop to Base.astro.'));
		} else {
			const len = page.metaDescription.length;
			if (len < config.thresholds.descriptionMin || len > config.thresholds.descriptionMax) {
				findings.push(finding('description-length', 'P2', route, 'Meta description length outside recommended range',
					`Description is ${len} characters (recommended ${config.thresholds.descriptionMin}-${config.thresholds.descriptionMax}).`,
					'Tighten or expand the `description` prop so it reads as a complete, self-contained summary.'));
			}
		}

		if (!page.canonical) {
			findings.push(finding('missing-canonical', 'P0', route, 'Missing canonical link', 'No <link rel="canonical"> found.', 'Base.astro should be building this automatically — check the page isn\'t bypassing the layout.'));
		} else if (page.canonical !== page.expectedCanonical) {
			findings.push(finding('canonical-mismatch', 'P0', route, 'Canonical does not match page URL',
				`Canonical is "${page.canonical}", expected "${page.expectedCanonical}".`,
				'Check for a hardcoded canonical or a redirect/trailing-slash mismatch.'));
		}

		if (page.h1s.length === 0) {
			findings.push(finding('missing-h1', 'P1', route, 'No H1 on page', 'A page with no H1 gives both search engines and AI crawlers no clear topic anchor.', 'Add a single H1 that states the page\'s main topic.'));
		} else if (page.h1s.length > 1) {
			findings.push(finding('multiple-h1', 'P2', route, 'Multiple H1 elements',
				`Found ${page.h1s.length}: ${page.h1s.map((h) => `"${h}"`).join(', ')}.`,
				'Keep one H1 per page; demote the others to H2.'));
		}

		let prevLevel = 0;
		for (const heading of page.headings) {
			if (prevLevel > 0 && heading.level > prevLevel + 1) {
				findings.push(finding(`heading-skip-${heading.text.slice(0, 30)}`, 'P2', route, 'Heading level skipped',
					`"${heading.text}" is an H${heading.level} directly after an H${prevLevel} — no H${prevLevel + 1} in between.`,
					'Fix the heading hierarchy so levels step down one at a time; this affects how screen readers and AI crawlers outline the page.'));
				break; // one flag per page is enough signal without noise
			}
			prevLevel = heading.level;
		}

		const missingAlt = page.images.filter((img) => img.alt === null || img.alt === undefined);
		if (missingAlt.length > 0) {
			findings.push(finding('missing-alt', 'P2', route, 'Image(s) missing alt text',
				`${missingAlt.length} image(s) with no alt attribute: ${missingAlt.map((i) => i.src).join(', ')}.`,
				'Add descriptive alt text (or alt="" for purely decorative images).'));
		}

		if (!page.og.title || !page.og.description || !page.og.image) {
			findings.push(finding('incomplete-og', 'P2', route, 'Incomplete Open Graph tags',
				'Missing one or more of og:title / og:description / og:image — link previews in Slack, iMessage, LinkedIn etc. may render blank.',
				'Base.astro already builds these from title/description/ogImage — check the page is passing them.'));
		}

		if (!page.viewport) {
			findings.push(finding('missing-viewport', 'P0', route, 'Missing viewport meta tag', 'No <meta name="viewport"> found — page will not be treated as mobile-friendly.', 'Add the standard viewport meta tag (should come from Base.astro).'));
		}

		if (page.robotsMeta?.includes('noindex') && !config.expectedNoindex.includes(route)) {
			findings.push(finding('unexpected-noindex', 'P0', route, 'Unexpected noindex', 'This page is marked noindex but isn\'t in the expected noindex list.', 'Check the `noindex` prop wasn\'t left on by mistake.'));
		}
		if (!page.robotsMeta?.includes('noindex') && config.expectedNoindex.includes(route)) {
			findings.push(finding('missing-expected-noindex', 'P1', route, 'Expected noindex is missing', 'This page should be noindex per config but isn\'t marked as such.', 'Pass `noindex` to Base.astro for this page.'));
		}
	}

	// Site-wide duplicate checks.
	const byTitle = new Map();
	const byDescription = new Map();
	for (const page of contentPages) {
		if (page.title) byTitle.set(page.title, [...(byTitle.get(page.title) ?? []), page.route]);
		if (page.metaDescription) byDescription.set(page.metaDescription, [...(byDescription.get(page.metaDescription) ?? []), page.route]);
	}
	for (const [title, routes] of byTitle) {
		if (routes.length > 1) {
			findings.push(finding(`duplicate-title-${title.slice(0, 30)}`, 'P0', null, 'Duplicate <title> across pages',
				`"${title}" is used on: ${routes.join(', ')}.`, 'Give each page a distinct title.'));
		}
	}
	for (const [desc, routes] of byDescription) {
		if (routes.length > 1) {
			findings.push(finding(`duplicate-description-${desc.slice(0, 30)}`, 'P1', null, 'Duplicate meta description across pages',
				`Same description used on: ${routes.join(', ')}.`, 'Write a distinct description per page.'));
		}
	}

	// Internal link validity — every internal href should resolve to a route
	// that was actually built.
	const knownRoutes = new Set([...pages.map((p) => p.route), ...assetRoutes]);
	for (const page of pages) {
		for (const link of page.internalLinks) {
			if (!matchesAnyRoute(knownRoutes, link)) {
				findings.push(finding(`broken-link-${link}`, 'P0', page.route, 'Broken internal link', `Links to "${link}", which doesn\'t match any built page.`, 'Fix the href or, if the target was removed intentionally, add a redirect in public/_redirects.'));
			}
		}
	}

	// Sitemap coverage.
	if (siteMap) {
		const sitemapPaths = new Set(siteMap.map((u) => new URL(u).pathname));
		for (const page of contentPages) {
			const shouldBeIndexed = !config.expectedNoindex.includes(page.route);
			const inSitemap =
				sitemapPaths.has(page.route) ||
				sitemapPaths.has(page.route.replace(/\/$/, '')) ||
				sitemapPaths.has(`${page.route.replace(/\/$/, '')}/`);
			if (shouldBeIndexed && !inSitemap) {
				findings.push(finding('missing-from-sitemap', 'P1', page.route, 'Page missing from sitemap', 'Indexable page isn\'t listed in the generated sitemap.', 'Check the sitemap integration\'s filter in astro.config.mjs.'));
			}
			if (!shouldBeIndexed && inSitemap) {
				findings.push(finding('noindex-in-sitemap', 'P0', page.route, 'noindex page is in the sitemap', 'A page that should not be indexed still appears in the sitemap — a contradiction crawlers flag.', 'Add this route to the sitemap filter in astro.config.mjs.'));
			}
		}
	} else {
		findings.push(finding('sitemap-unreadable', 'P0', null, 'Sitemap could not be read', 'dist/sitemap-index.xml or dist/sitemap-0.xml was missing or unparsable.', 'Confirm @astrojs/sitemap ran during the build.'));
	}

	// robots.txt sanity.
	if (!robotsTxt) {
		findings.push(finding('missing-robots', 'P0', null, 'robots.txt missing from build output', 'No robots.txt in dist/.', 'Confirm public/robots.txt exists and is being copied.'));
	} else {
		if (/Disallow:\s*\/\s*$/m.test(robotsTxt)) {
			findings.push(finding('robots-disallow-all', 'P0', null, 'robots.txt disallows the whole site', 'Found a bare "Disallow: /" rule.', 'Remove or scope the rule.'));
		}
		if (!/Sitemap:/i.test(robotsTxt)) {
			findings.push(finding('robots-missing-sitemap', 'P2', null, 'robots.txt has no Sitemap directive', 'Crawlers can still find the sitemap, but pointing to it directly helps.', 'Add a `Sitemap:` line to public/robots.txt.'));
		}
	}

	return findings;
}
