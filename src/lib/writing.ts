import type { CollectionEntry } from 'astro:content';

// Small helpers shared between src/pages/writing/index.astro and
// src/pages/writing/[...slug].astro so "entry number" and "reading time"
// can't drift between the two — a post's number in the index has to match
// what its own title block says.

/** ~225 wpm, rounded up, minimum 1 — a standard-enough estimate that no
 * particular precision is being claimed. */
export function readingTime(body: string): string {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / 225));
	return `${minutes} min`;
}

/** Entry numbers ascend with publish date across the whole collection
 * (oldest = 01), independent of which page is asking or how the caller
 * happens to have sorted its own list. */
export function entryNumbers(
	posts: CollectionEntry<'writing'>[],
): Map<string, string> {
	const byDate = [...posts].sort(
		(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
	);
	return new Map(byDate.map((post, i) => [post.id, String(i + 1).padStart(2, '0')]));
}

/** `tags`' last entry, unless the post sets an explicit `category` — the
 * article template's single "filed under" value needs one authoritative
 * answer, not a whole tag list. */
export function filedUnder(data: { category?: string; tags: string[] }): string | undefined {
	return data.category ?? data.tags[data.tags.length - 1];
}
