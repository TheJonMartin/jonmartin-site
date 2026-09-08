import { matchesAnyRoute } from './util.mjs';

const CATEGORY = 'technical-seo';

function finding(id, priority, page, site, siteLabel, title, detail, fix) {
	return { id: `${CATEGORY}:${page ?? 'site'}:${id}`, priority, category: CATEGORY, page, site, siteLabel, title, detail, fix };
}

// This repo builds two sites that link to each other (main nav links to Four
// Laws, Four Laws links back). Those cross-site links show up as "external"
// from each site's own crawl, but since we crawl both in the same run we can
// validate them for free against real routes instead of sending them through
// the flaky network-based external-link check — and get a hard P0 instead of
// a soft "couldn't verify" when one is actually broken.
//
// Returns { findings, pages } — `pages` has sibling URLs stripped out of
// externalLinks so the external-link checker doesn't also process them.
export function resolveSiblingLinks(pages, sites) {
	const routesByOrigin = new Map();
	for (const site of sites) {
		const origin = new URL(site.siteUrl).origin;
		const routes = new Set(pages.filter((p) => p.site === site.key).map((p) => p.route));
		routesByOrigin.set(origin, routes);
	}

	const findings = [];
	const updatedPages = pages.map((page) => {
		const remainingExternal = [];
		for (const url of page.externalLinks) {
			let parsed;
			try {
				parsed = new URL(url);
			} catch {
				remainingExternal.push(url);
				continue;
			}
			const siblingRoutes = routesByOrigin.get(parsed.origin);
			if (!siblingRoutes) {
				remainingExternal.push(url);
				continue;
			}
			if (!matchesAnyRoute(siblingRoutes, parsed.pathname)) {
				findings.push(
					finding(`broken-sibling-link-${url}`, 'P0', page.route, page.site, page.siteLabel, 'Broken link to sibling site',
						`Links to "${url}", which doesn't match any page built for that site in this scan.`,
						'Fix the href, or confirm the target route still exists on the other site.')
				);
			}
			// Matched or not, this URL is now accounted for — don't also run
			// it through the network-based external-link check.
		}
		return { ...page, externalLinks: remainingExternal };
	});

	return { findings, pages: updatedPages };
}
