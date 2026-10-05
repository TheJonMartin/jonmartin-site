/*
 * JSON-LD builders for Four Laws content. Parse page markdown rather than
 * duplicating in front matter — hand-maintained schema drifts; silent absence
 * (parser returns nothing) beats a malformed block.
 */

/** Strips markdown links/emphasis/code to plain text for crawlers. */
function plain(md: string): string {
	return md
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * FAQPage from `### Question` headings + prose beneath.
 * Convention in faq.md: `##` themes, `###` question, rest until next heading = answer.
 */
export function faqSchema(body: string, url: string) {
	const entities: { '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }[] = [];

	const blocks = body.split(/^###\s+/m).slice(1);
	for (const block of blocks) {
		const [headingLine, ...rest] = block.split('\n');
		const question = plain(headingLine);
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
 * DefinedTermSet from `**Term**` lines + definition beneath.
 * Convention in glossary.md: bold-only line = term, next line = definition,
 * `[Full Reference … →](…)` closes the entry.
 */
export function glossarySchema(body: string, url: string, siteUrl: string) {
	const terms: { '@type': 'DefinedTerm'; name: string; description: string; inDefinedTermSet: string; url?: string }[] = [];

	const lines = body.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const m = lines[i].trim().match(/^\*\*(.+?)\*\*$/);
		if (!m) continue;

		const name = plain(m[1]);
		let description = '';
		let anchor: string | undefined;
		for (let j = i + 1; j < lines.length; j++) {
			const line = lines[j].trim();
			if (!line) { if (description) break; else continue; }
			if (/^\*\*(.+?)\*\*$/.test(line)) break;
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

/**
 * TechArticle for long-form collection pages (fallback in [...slug].astro).
 * Omits datePublished/dateModified — content.config has no publish date and
 * updatedDate is unset; a wrong date misleads, no date does not.
 */
export function articleSchema(title: string, description: string, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		'@id': url,
		headline: title,
		description,
		url,
		author: { '@type': 'Person', '@id': 'https://thejonmartin.com/#jon', name: 'Jon Martin' },
		publisher: { '@id': 'https://thejonmartin.com/#jon' },
		isPartOf: { '@id': 'https://thejonmartin.com/#website' },
	};
}

/**
 * BreadcrumbList: Home > Page, or Home > parent > Page when parent is passed
 * (Altitude modules). Four Laws stays two-level — nav groups have no URL.
 */
export function breadcrumbSchema(
	pageTitle: string,
	pageUrl: string,
	siteUrl: string,
	parent?: { name: string; url: string },
) {
	const itemListElement: {
		'@type': 'ListItem';
		position: number;
		name: string;
		item: string;
	}[] = [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }];

	if (parent) {
		itemListElement.push(
			{ '@type': 'ListItem', position: 2, name: parent.name, item: parent.url },
			{ '@type': 'ListItem', position: 3, name: pageTitle, item: pageUrl },
		);
	} else {
		itemListElement.push(
			{ '@type': 'ListItem', position: 2, name: pageTitle, item: pageUrl },
		);
	}

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement,
	};
}

/**
 * Person entity for Jon (#jon). sameAs identities must be genuinely his;
 * no worksFor — see about.astro. image is public/images/jon-martin.jpg.
 */
export const personSchema = {
	'@type': 'Person',
	'@id': 'https://thejonmartin.com/#jon',
	name: 'Jon Martin',
	url: 'https://thejonmartin.com/',
	image: 'https://thejonmartin.com/images/jon-martin.jpg',
	email: 'mailto:jon@thejonmartin.com',
	jobTitle: 'Revenue Operations Solutions Architect',
	description:
		'Writes diagnoses of why systems, processes, and org structures keep breaking in founder-led professional services firms.',
	knowsAbout: [
		'Revenue Operations',
		'Organizational Design',
		'Systems Thinking',
		'Subscription Management',
		'Systems Integration',
		"Conway's Law",
		"Ashby's Law of Requisite Variety",
	],
	sameAs: [
		'https://www.linkedin.com/in/jonmartinco/',
		'https://x.com/TheJonMartin',
		'https://www.instagram.com/jonmartin.co/',
		'https://www.threads.com/@jonmartin.co',
		'https://bio.site/thejonmartin',
		'https://github.com/TheJonMartin',
	],
};
