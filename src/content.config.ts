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
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { writing };
