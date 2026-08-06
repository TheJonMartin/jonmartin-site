/*
 * JSON-LD builders for the two Four Laws pages whose shape search engines have
 * a specific vocabulary for.
 *
 * These parse the page's own markdown rather than duplicating the content in
 * front matter. That's the whole point: a schema block maintained by hand
 * drifts from the page it describes, and a FAQPage whose questions no longer
 * match the visible page is a structured-data error, not just stale metadata.
 * Parse the source of truth, and drift is impossible.
 *
 * The trade-off is that both parsers depend on the markdown conventions the two
 * files already use. Those conventions are asserted below — if a parser returns
 * nothing, the page still builds and simply emits no schema, which is the right
 * failure mode. Silent absence beats a malformed block.
 */

/** Strips markdown links/emphasis/code down to the plain text a crawler wants. */
function plain(md: string): string {
	return md
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [text](url) -> text
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * FAQPage from `### Question` headings and the prose beneath each.
 *
 * Convention in faq.md: `##` groups questions into themes, `###` is the
 * question itself, and everything up to the next heading is the answer.
 */
export function faqSchema(body: string, url: string) {
	const entities: { '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }[] = [];

	// Split on ### headings, keeping the heading text with its following block.
	const blocks = body.split(/^###\s+/m).slice(1);
	for (const block of blocks) {
		const [headingLine, ...rest] = block.split('\n');
		const question = plain(headingLine);
		// Answer runs until the next heading of any level.
		const answer = plain(
			rest.join('\n').split(/^#{1,3}\s+/m)[0] ?? '',
		);
		if (question && answer) {
			entities.push({
				'@type': 'Question',
				name: question,
				acceptedAnswer: { '@type': 'Answer', text: answer },
			});
		}
	}

	if (entities.length === 0) return undefined;

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': url,
		mainEntity: entities,
	};
}

/**
 * DefinedTermSet from `**Term**` lines and the definition beneath each.
 *
 * Convention in glossary.md: a bold-only line is a term, the line after it is
 * the definition, and a `[Full Reference … →](…)` line closes the entry.
 *
 * This is the highest-value schema on either site. A glossary marked up as a
 * DefinedTermSet is the shape both search engines and LLMs look for when
 * answering "what is Ashby's Law" — without it the page is just prose that
 * happens to contain definitions.
 */
export function glossarySchema(body: string, url: string, siteUrl: string) {
	const terms: { '@type': 'DefinedTerm'; name: string; description: string; inDefinedTermSet: string; url?: string }[] = [];

	const lines = body.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const m = lines[i].trim().match(/^\*\*(.+?)\*\*$/);
		if (!m) continue;

		const name = plain(m[1]);
		// Definition is the next non-empty line that isn't itself a link line.
		let description = '';
		let anchor: string | undefined;
		for (let j = i + 1; j < lines.length; j++) {
			const line = lines[j].trim();
			if (!line) { if (description) break; else continue; }
			if (/^\*\*(.+?)\*\*$/.test(line)) break; // next term
			const linkOnly = line.match(/^\[.*?\]\((\/[^)]*)\)$/);
			if (linkOnly) { anchor = linkOnly[1]; break; }
			description += (description ? ' ' : '') + line;
		}

		if (name && description) {
			terms.push({
				'@type': 'DefinedTerm',
				name,
				description: plain(description),
				inDefinedTermSet: url,
				...(anchor ? { url: new URL(anchor, siteUrl).href } : {}),
			});
		}
	}

	if (terms.length === 0) return undefined;

	return {
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		'@id': url,
		name: 'Four Laws of Complex System Design — Glossary',
		description:
			'Definitions of the terms used across the Four Laws reference: Ashby, Conway, Brooks, Reverse Conway, Team Topologies, Beer’s VSM, Little’s Law, and the Theory of Constraints.',
		hasDefinedTerm: terms,
	};
}
