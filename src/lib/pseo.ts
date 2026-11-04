/*
 * pSEO engine pages — resolved page JSON written by scripts/pseo/run.mjs to
 * src/data/pseo/pages/<slug>.json. Astro renders it at /tools/best/<slug> or
 * /tools/compare/<slug>; this module just loads and types that JSON.
 */

import type { Block } from './tools';

export type PseoRoute = 'best' | 'compare';
export type PseoTemplate = 'best' | 'compare' | 'howto';
export type PseoStatus = 'live' | 'noindex';
/** `site`: plain link to the tool's own site when there is no approved affiliate link. */
export type PseoCtaKind = 'affiliate' | 'site' | 'own' | 'waitlist';
export type PseoProductType = 'affiliate' | 'own_live' | 'own_planned';

export interface PseoHeadLink {
	label: string;
	href: string;
	kind: 'affiliate' | 'site';
}

export interface PseoFitTable {
	caption: string;
	head: string[];
	/** Cells are plain text, unlike the trusted-HTML cells in tools.ts table Blocks. */
	rows: string[][];
	/** Aligned with `head`; a link per tool column, null for the label column. */
	links?: (PseoHeadLink | null)[];
}

/** Button linking to one tool, placed at the end of that tool's part of a section. */
export interface PseoCtaBlock {
	type: 'cta';
	product: string;
	label: string;
	href: string;
	kind: 'affiliate' | 'site';
}

export type PseoBlock = Block | PseoCtaBlock;

export interface PseoSection {
	label: string;
	blocks: PseoBlock[];
}

export interface PseoFaqEntry {
	q: string;
	a: string;
}

export interface PseoCta {
	label: string;
	href: string;
	kind: PseoCtaKind;
	/** Product slug this CTA points at (looked up in `products`). */
	product: string;
}

export interface PseoProductRef {
	slug: string;
	name: string;
	type: PseoProductType;
	/** One-line quick pick (option products only, when the spec sets one). */
	pick?: string;
	/** Link for option products: affiliate link or the tool's own site. */
	href?: string;
	linkKind?: 'affiliate' | 'site';
}

export interface PseoSource {
	text: string;
	href: string;
}

export interface PseoRelated {
	slug: string;
	route: string;
	title: string;
	dek: string;
	href: string;
}

export interface PseoPage {
	slug: string;
	route: PseoRoute;
	template: PseoTemplate;
	status: PseoStatus;
	title: string;
	seoTitle: string;
	description: string;
	h1: string;
	dek: string[];
	published: string;
	modified: string;
	checked: string;
	/** Null when the page has no affiliate link. */
	disclosure: string | null;
	niche: { label: string };
	fitTable: PseoFitTable | null;
	sections: PseoSection[];
	faq: PseoFaqEntry[];
	closing: string;
	ctas: PseoCta[];
	products: PseoProductRef[];
	sources: PseoSource[];
	/** Other live pSEO pages sharing a product or niche (max 4), set at render time. */
	related?: PseoRelated[];
}

const modules = import.meta.glob<{ default: PseoPage }>('../data/pseo/pages/*.json', { eager: true });

export const pseoPages: PseoPage[] = Object.values(modules).map((m) => m.default);

export function pagesFor(route: PseoRoute): PseoPage[] {
	return pseoPages.filter((p) => p.route === route);
}
