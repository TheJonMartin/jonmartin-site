// Route comparisons need to tolerate a trailing-slash mismatch, since the
// two sites in this repo use different URL conventions (see
// astro.config.fourlaws.mjs) and a link can reasonably be written either way.
export function matchesAnyRoute(knownRoutes, route) {
	const withSlash = route.endsWith('/') ? route : `${route}/`;
	const withoutSlash = route.endsWith('/') ? route.slice(0, -1) : route;
	return knownRoutes.has(route) || knownRoutes.has(withSlash) || knownRoutes.has(withoutSlash);
}

// Content-check exclusions (e.g. the Decap CMS admin shell) are matched as
// prefixes, not exact strings — a static file under public/ doesn't follow
// Astro's own routing conventions, so its exact route string is less
// predictable than an Astro page's.
export function isExcludedRoute(route, prefixes) {
	return prefixes.some((prefix) => route === prefix || route.startsWith(prefix));
}
