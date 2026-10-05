// Tunable knobs for the weekly SEO & AEO scan. Adjust thresholds/targets here;
// crawler and rules stay generic against `site`.
export const config = {
	site: {
		key: 'main',
		label: 'thejonmartin.com',
		siteUrl: 'https://thejonmartin.com',
		distDir: 'dist',
		// build.format 'file' sitewide — see astro.config.mjs.
		urlFormat: 'file',
		// Prefix-matched (util.mjs isExcludedRoute); '/admin' catches Decap CMS shell.
		excludeFromContentChecks: ['/404', '/admin'],
		expectedNoindex: ['/thanks', '/thanks-contact', '/thanks-consulting', '/404'],
		runContentGapRules: true,
		// Short by design (tools / contact form) — exempt from thin-content check only.
		thinContentExempt: ['/contact', '/flow-formula-calculator', '/part8-flow-diagnostic'],
	},

	writingContentDir: 'src/content/writing',
	fourLawsContentDir: 'src/content/four-laws',

	thresholds: {
		titleMin: 10,
		titleMax: 60,
		descriptionMin: 50,
		descriptionMax: 160,
		thinContentWords: 500,
		veryThinContentWords: 300,
		// Published post with no updatedDate past this age → freshness nudge.
		staleContentDays: 365,
		targetCadenceDays: 21,
	},

	// Topic gaps for the content-gap rule. `aliases` covers spellings that won't word-overlap `name`.
	targetTopics: [
		{ name: 'Revenue Operations', aliases: ['revops'] },
		{ name: 'Systems Integration' },
		{ name: 'Subscription Management' },
		{ name: 'CPQ' },
		{ name: 'Quote-to-Cash', aliases: ['qtc'] },
		{ name: 'Billing & Churn' },
		{ name: 'Presales' },
		{ name: 'SaaS' },
		{ name: 'Professional Services' },
		{ name: 'Systems Thinking' },
	],

	externalLinks: {
		enabled: true,
		timeoutMs: 8000,
		concurrency: 5,
	},

	github: {
		issueLabel: 'seo-scan',
		issueTitle: 'Weekly SEO & AEO Scan',
	},
};
