import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Hand-rolled rather than @astrojs/rss. The package would work, but it's a
// dependency for about thirty lines of string building, and this site is
// deliberately zero-JavaScript with a two-package dependency tree. If the feed
// ever needs enclosures, categories, or full content, swap this for the package
// rather than growing it.
//
// Served at /rss.xml. The autodiscovery <link> lives in src/layouts/Base.astro,
// so feed readers find it from any page on the site.

const esc = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('astro.config.mjs must set `site` for the RSS feed to build absolute URLs.');

	const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const items = posts
		.map((post) => {
			const url = new URL(`/writing/${post.id}`, site).href;
			return `		<item>
			<title>${esc(post.data.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${esc(post.data.description)}</description>
			<pubDate>${post.data.pubDate.toUTCString()}</pubDate>
		</item>`;
		})
		.join('\n');

	// lastBuildDate uses the newest post rather than build time: rebuilding the
	// site for an unrelated change shouldn't tell every reader the feed updated.
	const lastBuild = posts[0]?.data.pubDate ?? new Date();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Jon Martin — Writing</title>
		<link>${new URL('/writing', site).href}</link>
		<atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml" />
		<description>Notes on org design, systems, and why the things you built keep breaking.</description>
		<language>en-us</language>
		<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
};
