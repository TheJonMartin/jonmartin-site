import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live in src/content/writing/ as .md files. A malformed or missing
// front-matter field fails the build on purpose — better to catch it locally
// than to publish a post with no date or a broken title.
//
// To add a post: create src/content/writing/your-slug.md with front matter
// matching the shape below. The filename becomes the URL: your-slug.md is
// served at /writing/your-slug/. Set draft: true to keep it out of the
// published site while you work on it.
const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),

		// Search-results title. The on-page h1 can be as long as it needs to be;
		// this is what goes in <title> and og:title. Google displays about 60
		// characters, and "<title> — Jon Martin" eats 13 of them. Set this when
		// the headline is long; omit it and the title is used.
		seoTitle: z.string().optional(),

		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),

		// The article template's single "filed under" value (see
		// src/lib/writing.ts's filedUnder helper). Optional — falls back to the
		// last tag when unset, so existing posts don't all need editing just to
		// pick up the new template.
		category: z.string().optional(),
	}),
});

// Four Laws content pages. One markdown file per page, and the filename IS the
// live URL: four-laws/glossary.md is served at /glossary — carried over
// byte-identical from when this was a separate site (fourlaws.thejonmartin.com)
// with real outreach links and backlink pitches already pointing at these
// exact paths. Renaming a file breaks an existing link, so don't, unless
// you're also adding a redirect.
//
// Named `fourLaws` rather than `pages` (which is what this collection was
// called back when it lived in its own source tree) — `src/content/pages/`
// already holds the Decap-managed home.json/about.json for the main site's
// own pages, and those are a different shape entirely (single JSON files, not
// a glob-loaded markdown collection). Reusing "pages" for both would be
// confusing without actually colliding on disk.
//
// The three interactive tools (diagnostic, calculator, decision checklist)
// are deliberately NOT in this collection — real JavaScript applications, not
// prose, hand-built as .astro pages under src/pages/.
const fourLaws = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/four-laws' }),
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
		// for pages that sit outside the argument (unused today — the one page
		// that was 'meta', about.md, was retired in the site-merge: the main
		// site's own /about is canonical now).
		group: z.enum(['reference', 'explore', 'meta']),

		// Sort order within a group. Sparse numbering (10, 20, 30) so a page can
		// be slotted between two others without renumbering the whole set.
		order: z.number().default(100),

		draft: z.boolean().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { writing, fourLaws };
