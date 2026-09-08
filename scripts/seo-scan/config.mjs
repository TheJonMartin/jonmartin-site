// Tunable knobs for the weekly SEO & AEO scan. Edit these as the sites and
// Jon's goals change — nothing else in scripts/seo-scan/ should need touching
// to adjust thresholds, targets, or which sites get scanned.
//
// This repo builds two independent static sites from two Astro configs (see
// astro.config.mjs and astro.config.fourlaws.mjs) — thejonmartin.com and
// fourlaws.thejonmartin.com. Both get scanned; `sites` is how each one's
// build output and URL conventions are described to the crawler.
export const config = {
	sites: [
		{
			key: 'main',
			label: 'thejonmartin.com',
			siteUrl: 'https://thejonmartin.com',
			distDir: 'dist',
			// Astro's default output: every route is <route>/index.html.
			urlFormat: 'directory',
			excludeFromContentChecks: ['/admin/', '/404.html'],
			expectedNoindex: ['/thanks/', '/404.html'],
			// Only the main site has the /writing blog collection that topic
			// coverage, cadence, and draft checks make sense against.
			runContentGapRules: true,
		},
		{
			key: 'fourlaws',
			label: 'fourlaws.thejonmartin.com',
			siteUrl: 'https://fourlaws.thejonmartin.com',
			distDir: 'dist-fourlaws',
			// build.format: 'file' — <route>.html served slash-less; URLs were
			// frozen before outreach links went out, see astro.config.fourlaws.mjs.
			urlFormat: 'file',
			excludeFromContentChecks: ['/404.html'],
			expectedNoindex: ['/thanks', '/404.html'],
			runContentGapRules: false,
		},
	],

	writingContentDir: 'src/content/writing',

	thresholds: {
		titleMin: 10,
		titleMax: 60,
		descriptionMin: 50,
		descriptionMax: 160,
		// Below this word count, a post reads as thin to both search engines
		// and AI answer engines (not enough substance to extract a confident
		// answer from).
		thinContentWords: 500,
		veryThinContentWords: 300,
		// A published post with no updatedDate past this age gets flagged for
		// a freshness pass — not necessarily wrong, just worth a look.
		staleContentDays: 365,
		// How often Jon wants to be publishing. Missing this isn't a defect,
		// just a nudge — tune to whatever cadence is actually the goal.
		targetCadenceDays: 21,
	},

	// Topics Jon's work actually covers. A post that touches none of these
	// isn't a defect, but a topic with zero posts is a content-gap worth
	// surfacing. Edit freely as positioning shifts.
	targetTopics: [
		'Revenue Operations',
		'Systems Integration',
		'Subscription Management',
		'CPQ',
		'Quote-to-Cash',
		'Billing & Churn',
		'Presales',
		'SaaS',
		'Professional Services',
		'Systems Thinking',
	],

	externalLinks: {
		// External-link checks are best-effort (network flakiness produces
		// false positives). Set to false to skip entirely.
		enabled: true,
		timeoutMs: 8000,
		concurrency: 5,
	},

	github: {
		issueLabel: 'seo-scan',
		issueTitle: 'Weekly SEO & AEO Scan',
	},
};
