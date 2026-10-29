/*
 * JSON-LD builders: sitewide Organization/Person/Service plus the Four Laws
 * faqSchema/glossarySchema. The latter two parse page markdown rather than
 * duplicating front matter — hand-maintained schema drifts, and silent
 * absence (parser returns nothing) beats a malformed block.
 */

import { termSlug } from './glossary-anchors';

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
			rest.join('\n').split(/^#{1,3}\s+|^---\s*$/m)[0] ?? '',
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
 * `[Full Reference … →](…)` closes the entry (kept as a visible link only).
 * Each term's url/@id is its own anchor on the glossary (url#<slug>, id added
 * by withTermAnchors on the page), so the definitions point at this page.
 */
export function glossarySchema(body: string, url: string) {
	const terms: { '@type': 'DefinedTerm'; '@id': string; name: string; description: string; inDefinedTermSet: string; url: string }[] = [];

	const lines = body.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const m = lines[i].trim().match(/^\*\*(.+?)\*\*$/);
		if (!m) continue;

		const name = plain(m[1]);
		let description = '';
		for (let j = i + 1; j < lines.length; j++) {
			const line = lines[j].trim();
			if (!line) { if (description) break; else continue; }
			if (/^\*\*(.+?)\*\*$/.test(line)) break;
			if (/^\[.*?\]\((\/[^)]*)\)$/.test(line)) break;
			description += (description ? ' ' : '') + line;
		}

		if (name && description) {
			const termUrl = `${url}#${termSlug(name)}`;
			terms.push({
				'@type': 'DefinedTerm',
				'@id': termUrl,
				name,
				description: plain(description),
				inDefinedTermSet: url,
				url: termUrl,
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
 * Omits datePublished/dateModified — a wrong date misleads, no date does not.
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

/** Coerces the optional schema prop (single object, array, or undefined) into an array. */
export function toSchemaList(
	schema?: Record<string, unknown> | Record<string, unknown>[],
): Record<string, unknown>[] {
	return Array.isArray(schema) ? schema : schema ? [schema] : [];
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

/**
 * Organization for the site (#org). Only facts already on the site: name matches
 * the WebSite name and Base siteName ("Jon Martin"); the TheJonMartin handle is
 * kept as alternateName. The description leads with the consulting/diagnosis
 * work, not HubSpot; Portal Audit and Steward Ledger are listed as products in
 * hasOfferCatalog (their full nodes live on / and /steward-ledger). logo is the JM monogram icon (public/apple-touch-icon.png,
 * 180x180), email is the footer address, sameAs are the profiles linked from
 * /about that carry the TheJonMartin / jonmartin.co handles. No address, phone,
 * ratings or employee counts: none are published.
 */
export const organizationSchema = {
	'@type': 'Organization',
	'@id': 'https://thejonmartin.com/#org',
	name: 'Jon Martin',
	alternateName: 'TheJonMartin',
	url: 'https://thejonmartin.com/',
	description:
		'Revenue operations consulting and written diagnoses of why systems, processes, and org structures keep breaking in founder-led professional services firms, grounded in the Four Laws of Complex System Design.',
	logo: {
		'@type': 'ImageObject',
		url: 'https://thejonmartin.com/apple-touch-icon.png',
		width: 180,
		height: 180,
	},
	email: 'mailto:jon@thejonmartin.com',
	founder: { '@id': 'https://thejonmartin.com/#jon' },
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Products',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					'@id': 'https://thejonmartin.com/#portal-audit',
					name: 'Portal Audit',
					url: 'https://audit.thejonmartin.com/',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'SoftwareApplication',
					'@id': 'https://thejonmartin.com/steward-ledger#software',
					name: 'Steward Ledger',
					url: 'https://thejonmartin.com/steward-ledger',
				},
			},
		],
	},
	sameAs: [
		'https://www.linkedin.com/in/jonmartinco/',
		'https://x.com/TheJonMartin',
		'https://www.instagram.com/jonmartin.co/',
		'https://www.threads.com/@jonmartin.co',
	],
};

/**
 * Sitewide entity block, emitted on every page by SeoHead.astro so each page
 * can resolve #org and #jon on its own. Pages reference them by @id instead of
 * repeating the nodes.
 */
export const siteEntitiesSchema = {
	'@context': 'https://schema.org',
	'@graph': [organizationSchema, personSchema],
};

/**
 * Portal Audit as a Service (homepage). Prices are the approved ones only:
 * free audit (one per portal), Watch $19/mo or $190/yr, Watch Weekly $29/mo or
 * $290/yr (weekly audits, Jon 2026-10-24), Fix free during beta
 * then $49/mo or $490/yr (annual is 10x monthly, Jon 2026-10-23). No onboarding fee. Keep in step with public/llms.txt.
 * Never describe the app as "read-only".
 */
export function portalAuditSchema(description: string) {
	const pricing = 'https://audit.thejonmartin.com/pricing';
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': 'https://thejonmartin.com/#portal-audit',
		name: 'Portal Audit',
		serviceType: 'HubSpot portal health audit',
		description,
		url: 'https://audit.thejonmartin.com/',
		provider: { '@id': 'https://thejonmartin.com/#org' },
		brand: { '@id': 'https://thejonmartin.com/#org' },
		offers: [
			{
				'@type': 'Offer',
				name: 'Free audit',
				description: 'One free audit per portal.',
				price: '0',
				priceCurrency: 'USD',
				url: pricing,
			},
			{
				'@type': 'Offer',
				name: 'Watch',
				price: '19',
				priceCurrency: 'USD',
				priceSpecification: [
					{
						'@type': 'UnitPriceSpecification',
						price: '19',
						priceCurrency: 'USD',
						unitCode: 'MON',
						unitText: 'month',
					},
					{
						'@type': 'UnitPriceSpecification',
						price: '190',
						priceCurrency: 'USD',
						unitCode: 'ANN',
						unitText: 'year',
					},
				],
				url: pricing,
			},
			{
				'@type': 'Offer',
				name: 'Watch Weekly',
				description: 'Weekly audits.',
				price: '29',
				priceCurrency: 'USD',
				priceSpecification: [
					{
						'@type': 'UnitPriceSpecification',
						price: '29',
						priceCurrency: 'USD',
						unitCode: 'MON',
						unitText: 'month',
					},
					{
						'@type': 'UnitPriceSpecification',
						price: '290',
						priceCurrency: 'USD',
						unitCode: 'ANN',
						unitText: 'year',
					},
				],
				url: pricing,
			},
			{
				'@type': 'Offer',
				name: 'Fix',
				description: 'Free during beta, then $49/mo or $490/yr.',
				price: '0',
				priceCurrency: 'USD',
				priceSpecification: [
					{
						'@type': 'UnitPriceSpecification',
						name: 'During beta',
						price: '0',
						priceCurrency: 'USD',
					},
					{
						'@type': 'UnitPriceSpecification',
						name: 'After beta',
						price: '49',
						priceCurrency: 'USD',
						unitCode: 'MON',
						unitText: 'month',
					},
					{
						'@type': 'UnitPriceSpecification',
						name: 'After beta (annual)',
						price: '490',
						priceCurrency: 'USD',
						unitCode: 'ANN',
						unitText: 'year',
					},
				],
				url: pricing,
			},
		],
	};
}

/** FAQPage from {q, a} pairs that are also rendered visibly on the page. */
export function faqPairsSchema(pairs: { q: string; a: string }[], url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': url,
		mainEntity: pairs.map(({ q, a }) => ({
			'@type': 'Question',
			name: q,
			acceptedAnswer: { '@type': 'Answer', text: a },
		})),
	};
}

/**
 * Steward Ledger as a SoftwareApplication (/steward-ledger). Prices are copied
 * from the page's own pricing card: $29/month, plus a $199 one-time sign-up fee
 * that includes setup (and the HubSpot connection if used). Change both
 * together. No operatingSystem, ratings or reviews: none are published.
 */
export function stewardLedgerSchema(description: string) {
	const url = 'https://thejonmartin.com/steward-ledger';
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'@id': `${url}#software`,
		name: 'Steward Ledger',
		applicationCategory: 'BusinessApplication',
		description,
		url,
		image: 'https://thejonmartin.com/og/steward-ledger-v3.png',
		audience: { '@type': 'Audience', audienceType: 'Nonprofits' },
		publisher: { '@id': 'https://thejonmartin.com/#org' },
		offers: {
			'@type': 'Offer',
			price: '29',
			priceCurrency: 'USD',
			url: `${url}#pricing`,
			priceSpecification: [
				{
					'@type': 'UnitPriceSpecification',
					name: 'Monthly',
					price: '29',
					priceCurrency: 'USD',
					unitCode: 'MON',
					unitText: 'month',
				},
				{
					'@type': 'UnitPriceSpecification',
					name: 'One-time sign-up fee (includes setup)',
					price: '199',
					priceCurrency: 'USD',
				},
			],
		},
	};
}
