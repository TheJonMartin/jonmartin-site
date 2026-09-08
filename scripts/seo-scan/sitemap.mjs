import path from 'node:path';
import { readStaticFile } from './crawl.mjs';

function extractLocs(xml) {
	return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

// @astrojs/sitemap always emits sitemap-index.xml pointing at one or more
// sitemap-N.xml files. Reads the index, then flattens every referenced
// sitemap into one array of page URLs.
export async function readSitemapUrls(distDir) {
	const index = await readStaticFile(distDir, 'sitemap-index.xml');
	if (!index) return null;

	const sitemapUrls = extractLocs(index);
	const allPageUrls = [];
	for (const sitemapUrl of sitemapUrls) {
		const filename = path.basename(new URL(sitemapUrl).pathname);
		const xml = await readStaticFile(distDir, filename);
		if (!xml) continue;
		allPageUrls.push(...extractLocs(xml));
	}
	return allPageUrls.length > 0 ? allPageUrls : null;
}
