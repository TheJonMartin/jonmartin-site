// Tolerate trailing-slash mismatch when comparing routes (links may be written either way).
export function matchesAnyRoute(knownRoutes, route) {
	const withSlash = route.endsWith('/') ? route : `${route}/`;
	const withoutSlash = route.endsWith('/') ? route.slice(0, -1) : route;
	return knownRoutes.has(route) || knownRoutes.has(withSlash) || knownRoutes.has(withoutSlash);
}

// Content-check exclusions are prefix-matched — static files under public/ don't follow Astro routing.
export function isExcludedRoute(route, prefixes) {
	return prefixes.some((prefix) => route === prefix || route.startsWith(prefix));
}
