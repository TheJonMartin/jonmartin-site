import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		seoTitle: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		category: z.string().optional(),
	}),
});

const fourLaws = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/four-laws' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		seoTitle: z.string().optional(),
		group: z.enum(['reference', 'explore', 'meta']),
		order: z.number().default(100),
		draft: z.boolean().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

// Requirements Altitude written guide. Lives under /altitude/<slug> on purpose
// — unlike Four Laws, these paths have no legacy top-level backlinks to honor,
// and a namespace keeps a future paid-course gate from colliding with /glossary.
const altitude = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/altitude' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		seoTitle: z.string().optional(),
		group: z.enum(['core', 'practice', 'delivery', 'reference']),
		order: z.number().default(100),
		draft: z.boolean().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { writing, fourLaws, altitude };
