// Route comparisons need to tolerate a trailing-slash mismatch, since the
// two sites in this repo use different URL conventions (see
// astro.config.fourlaws.mjs) and a link can reasonably be written either way.
export function matchesAnyRoute(knownRoutes, route) {
	const withSlash = route.endsWith('/') ? route : `${route}/`;
	const withoutSlash = route.endsWith('/') ? route.slice(0, -1) : route;
	return knownRoutes.has(route) || knownRoutes.has(withSlash) || knownRoutes.has(withoutSlash);
}
