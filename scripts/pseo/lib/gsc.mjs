// Step 3: Search Console verdicts from pseo.page_metrics (filled by a bot; empty table = skip entirely).

function daysSince(dateStr, now) {
	return (new Date(now).getTime() - new Date(dateStr).getTime()) / 86_400_000;
}

/** pages: rendered page objects with {slug, status, published}. metrics: pseo_page_metrics rows {page, date, impressions, ...}. */
export function trafficVerdicts(pages, metrics, now) {
	if (!metrics || metrics.length === 0) return {};
	const verdicts = {};
	for (const page of pages) {
		if (page.status && page.status !== 'live') continue;
		if (daysSince(page.published, now) < 90) continue;
		const totalImpressions = metrics
			.filter((m) => m.page === page.slug)
			.reduce((sum, m) => sum + (m.impressions ?? 0), 0);
		if (totalImpressions < 10) verdicts[page.slug] = 'noindex';
	}
	return verdicts;
}
