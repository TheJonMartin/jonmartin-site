// Tunable knobs for the weekly SEO & AEO scan. Edit these as the site and
// Jon's goals change — nothing else in scripts/seo-scan/ should need touching
// to adjust thresholds, targets, or which routes get scanned.
//
// This used to describe two separate Astro builds (thejonmartin.com and
// fourlaws.thejonmartin.com). They were consolidated into one Astro project
// on 9 September 2026 — see docs/site-consolidation.md — so there's one
// entry below. `sites` stays a list (rather than a single object) because
// the crawler and rules are written against it generically; if this repo
// ever builds a second property again, that's the only shape to extend.
export const config = {
	sites: [
		{
			key: 'main',
			label: 'thejonmartin.com',
			siteUrl: 'https://thejonmartin.com',
			distDir: 'dist',
			// build.format: 'file' sitewide — <route>.html served slash-less.
			// Four Laws' URLs had to stay byte-identical to its pre-merge
			// address, which forced this for the whole project (Astro doesn't
			// support two output formats in one build). See astro.config.mjs.
			urlFormat: 'file',
			// Prefix-matched (see util.mjs isExcludedRoute) — '/admin' catches
			// the Decap CMS shell (public/admin/, a static file Astro doesn't
			// route, so its built route string isn't as predictable as a real
			// page's).
			excludeFromContentChecks: ['/404', '/admin'],
			expectedNoindex: ['/thanks', '/thanks-contact', '/404'],
			runContentGapRules: true,
		},
	],

	writingContentDir: 'src/content/writing',
	fourLawsContentDir: 'src/content/four-laws',

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
	// surfacing. Edit freely as positioning shifts. `aliases` covers
	// abbreviations/spellings that won't share a word with `name` (plain
	// word-overlap matching alone would miss "RevOps" as a match for
	// "Revenue Operations", for example) — add one whenever a real post gets
	// flagged as a gap it isn't.
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
