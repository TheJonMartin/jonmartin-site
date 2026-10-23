/*
 * Glossary term anchors. One slug function shared by the /glossary page (which
 * puts id="<slug>" on each term's paragraph) and the DefinedTermSet schema
 * (glossarySchema in ./schema.ts), so each DefinedTerm's url/@id
 * (https://thejonmartin.com/glossary#<slug>) always lands on a real anchor.
 * glossary.md itself stays plain markdown for the CMS.
 */

/** "Ashby's Law of Requisite Variety" -> "ashbys-law-of-requisite-variety". */
export function termSlug(name: string): string {
	return name
		.replace(/&amp;/g, '&')
		.replace(/&#39;|&#x27;|&rsquo;/g, "'")
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Adds id="<slug>" to every `<p><strong>Term</strong>…` paragraph in rendered glossary HTML. */
export function withTermAnchors(html: string): string {
	return html.replace(
		/<p><strong>([^<]+)<\/strong>/g,
		(whole, term: string) => {
			const slug = termSlug(term.trim());
			return slug ? `<p id="${slug}"><strong>${term}</strong>` : whole;
		},
	);
}
