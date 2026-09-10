import { isExcludedRoute } from '../util.mjs';

// AEO ("answer engine optimization") checks: signals that help an AI system
// (Google's AI Overviews, ChatGPT browsing, Perplexity, etc.) confidently
// lift an accurate answer or citation from a page, on top of plain SEO.
const CATEGORY = 'aeo';
const GENERIC_HEADINGS = new Set(['introduction', 'conclusion', 'overview', 'summary', 'background']);

function finding(id, priority, page, title, detail, fix) {
	return { id: `${CATEGORY}:${page ?? 'site'}:${id}`, priority, category: CATEGORY, page, title, detail, fix };
}

function daysSince(dateStr) {
	if (!dateStr) return null;
	const then = new Date(dateStr).getTime();
	if (Number.isNaN(then)) return null;
	return Math.floor((Date.now() - then) / 86_400_000);
}

export function runAeoRules(pages, { config, hasLlmsTxt }) {
	const findings = [];
	// Noindex pages (thank-you screens, 404s) are deliberately kept out of
	// search and answer engines entirely, so content-depth/structured-data
	// signals on them aren't real findings — nothing will ever read them.
	const contentPages = pages.filter(
		(p) => !isExcludedRoute(p.route, config.excludeFromContentChecks) && !config.expectedNoindex.includes(p.route)
	);

	for (const page of contentPages) {
		const { route } = page;

		// Every content page should carry at least one JSON-LD block — it's
		// the single highest-leverage AEO signal, since it hands an answer
		// engine structured facts instead of making it infer from prose.
		const validJsonLd = page.jsonLd.filter((b) => !b.__invalid);
		if (validJsonLd.length === 0) {
			findings.push(finding('missing-structured-data', 'P1', route, 'No structured data on page',
				'No valid JSON-LD found. AI answer engines lean heavily on schema.org markup to extract facts (author, dates, type of content) with confidence.',
				'Add a JSON-LD block via the `schema` prop on Base.astro — see src/pages/index.astro for the Person/WebSite pattern.'));
		}
		if (page.jsonLd.some((b) => b.__invalid)) {
			findings.push(finding('invalid-json-ld', 'P0', route, 'Invalid JSON-LD', 'A <script type="application/ld+json"> block failed to parse.', 'Check for a trailing comma or unescaped character in the schema object.'));
		}

		const headings = page.headings;
		const genericHeadings = headings.filter((h) => h.level === 2 && GENERIC_HEADINGS.has(h.text.trim().toLowerCase()));
		if (genericHeadings.length > 0) {
			findings.push(finding('generic-headings', 'P2', route, 'Generic section headings',
				`Found: ${genericHeadings.map((h) => `"${h.text}"`).join(', ')}. Descriptive headings ("Ashby: you're not managing efficiency, you're managing variety") are themselves extractable answers; generic ones ("Introduction") aren't.`,
				'Rename to describe the specific claim the section makes.'));
		}

		const exemptFromThinContent = (config.thinContentExempt ?? []).includes(route);
		if (!exemptFromThinContent && page.wordCount > 0 && page.wordCount < config.thresholds.veryThinContentWords) {
			findings.push(finding('very-thin-content', 'P1', route, 'Very thin content',
				`~${page.wordCount} words. Both classic SEO and answer engines need enough substance to establish topical authority.`,
				'Expand with concrete detail, or consolidate into a page that already covers this ground.'));
		} else if (!exemptFromThinContent && page.wordCount > 0 && page.wordCount < config.thresholds.thinContentWords) {
			findings.push(finding('thin-content', 'P2', route, 'Thin content',
				`~${page.wordCount} words, below the ${config.thresholds.thinContentWords}-word guideline.`,
				'Consider expanding if this page is meant to rank/be cited on its own.'));
		}

		// Freshness, using dateModified/datePublished from the page's own
		// BlogPosting schema when present.
		const posting = page.jsonLd.find((b) => b['@type'] === 'BlogPosting');
		if (posting) {
			const effectiveDate = posting.dateModified ?? posting.datePublished;
			const age = daysSince(effectiveDate);
			if (age !== null && age > config.thresholds.staleContentDays) {
				findings.push(finding('stale-content', 'P2', route, 'Content hasn\'t been refreshed in a while',
					`${age} days since ${posting.dateModified ? 'last update' : 'publish'}. AI answer engines weight recency; stale posts are more likely to be passed over for a fresher competing source.`,
					'Re-read it — if it still holds up, add an `updatedDate` to the front matter even without changing the text, so the freshness signal is accurate.'));
			}
		}
	}

	if (!hasLlmsTxt) {
		findings.push(finding('missing-llms-txt', 'P2', null, 'No llms.txt', 'llms.txt is an emerging convention (proposed by Jeremy Howard / llmstxt.org) that gives AI crawlers a curated, plain-language map of the site — analogous to robots.txt but for what content is worth reading, not what\'s off-limits.', 'Add a public/llms.txt summarizing the site and linking its most important pages. Low cost, and the standard is young enough that early adoption is itself a minor signal.'));
	}

	return findings;
}
