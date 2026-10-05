import type { CollectionEntry } from 'astro:content';

// Shared by writing index + [...slug] so entry number and reading time stay consistent.

/** ~225 wpm, rounded up, minimum 1. */
export function readingTime(body: string): string {
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / 225));
	return `${minutes} min`;
}

/** Entry numbers ascend with publish date (oldest = 01), independent of caller sort. */
export function entryNumbers(
	posts: CollectionEntry<'writing'>[],
): Map<string, string> {
	const byDate = [...posts].sort(
		(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
	);
	return new Map(byDate.map((post, i) => [post.id, String(i + 1).padStart(2, '0')]));
}

/** Explicit `category`, else last tag — single "filed under" value for the article template. */
export function filedUnder(data: { category?: string; tags: string[] }): string | undefined {
	return data.category ?? data.tags[data.tags.length - 1];
}
