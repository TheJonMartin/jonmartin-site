import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Four Laws content pages. One markdown file per page, and the filename IS the
// live URL: pages/glossary.md is served at /glossary — the same path
// fourlaws.netlify.app serves today. Renaming a file breaks an existing link,
// so don't, unless you're also adding a redirect in public-fourlaws/_redirects.
//
// The three interactive tools (diagnostic, calculator, decision checklist) are
// deliberately NOT in this collection. They are real JavaScript applications,
// not prose, and will land as hand-built .astro pages under
// src-fourlaws/pages/ when their logic is ported.
const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src-fourlaws/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),

		// Search-results title, used verbatim when set — it does NOT get the
		// "| Four Laws of Complex System Design" suffix, because the reason to
		// set one is to control the exact length.
		//
		// Google shows roughly 60 characters. Several pages here have headlines
		// that read correctly on the page but ran to 80-89 characters as titles
		// and were being truncated mid-phrase in results. Set this when the
		// suffixed title would exceed ~60; leave it off and the h1 is used.
		seoTitle: z.string().optional(),

		// Drives which nav group the page belongs to and how the index orders
		// things. 'reference' is the Full Reference document and its companions
		// (glossary, FAQ); 'explore' is the standalone applied essays; 'meta' is
		// about/contact, which sit outside the argument.
		group: z.enum(['reference', 'explore', 'meta']),

		// Sort order within a group. Sparse numbering (10, 20, 30) so a page can
		// be slotted between two others without renumbering the whole set.
		order: z.number().default(100),

		draft: z.boolean().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { pages };
