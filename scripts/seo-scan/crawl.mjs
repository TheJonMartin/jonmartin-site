import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';

async function findAllFiles(dir) {
	const results = [];
	async function walk(current) {
		const entries = await readdir(current, { withFileTypes: true });
		for (const entry of entries) {
			const full = path.join(current, entry.name);
			if (entry.isDirectory()) {
				await walk(full);
			} else if (entry.isFile()) {
				results.push(full);
			}
		}
	}
	await walk(dir);
	return results;
}

// Every non-HTML file in dist/ (images, PDFs, the sitemap itself, etc.) is a
// valid internal-link target even though it isn't a "page" the content rules
// score. Used so a link to /some-file.pdf isn't flagged as broken just
// because it's not one of the crawled pages.
export async function listStaticAssetRoutes(distDir) {
	const files = await findAllFiles(distDir);
	return files.filter((f) => !f.endsWith('.html')).map((f) => '/' + path.relative(distDir, f).replace(/\\/g, '/'));
}

// Astro's static output shape depends on `build.format` in the site's astro
// config. 'file' (astro.config.mjs, sitewide since the site-consolidation —
// see docs/site-consolidation.md) emits <route>.html served slash-less,
// including 404.html — Base.astro/FourLawsLayout.astro strip the .html for
// canonical purposes exactly like every other page, so 404 needs no special
// case here either. 'directory' (Astro's default, kept for any future site
// this scanner might cover) emits <route>/index.html with a trailing slash,
// except 404.html which static hosts require at that exact top-level path
// regardless of format.
function filePathToRoute(distDir, filePath, urlFormat) {
	let rel = path.relative(distDir, filePath).replace(/\\/g, '/');

	if (urlFormat === 'file') {
		if (rel === 'index.html') return '/';
		return '/' + rel.replace(/\.html$/, '');
	}

	if (rel === '404.html') return '/404';
	if (rel === 'index.html') return '/';
	if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
	else rel = rel.replace(/\.html$/, '/');
	return '/' + rel.replace(/^\/+/, '');
}

// What <link rel="canonical"> should read for a given route, matching each
// site's own convention (see Base.astro in each source tree).
function expectedCanonicalFor(route, siteUrl, urlFormat) {
	if (urlFormat === 'file') {
		if (route === '/') return new URL(route, siteUrl).href.replace(/\/$/, '');
		return new URL(route, siteUrl).href;
	}
	return new URL(route, siteUrl).href;
}

function textOf(el) {
	return (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function parseJsonLd(document) {
	const blocks = [];
	for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
		try {
			const parsed = JSON.parse(script.textContent);
			const items = parsed['@graph'] ?? [parsed];
			blocks.push(...items);
		} catch {
			blocks.push({ __invalid: true, raw: script.textContent });
		}
	}
	return blocks;
}

function countWords(text) {
	const trimmed = text.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
}

export async function crawlDist(distDir, siteUrl, { urlFormat = 'directory', site = 'main', siteLabel = site } = {}) {
	const files = (await findAllFiles(distDir)).filter((f) => f.endsWith('.html'));
	const pages = [];

	for (const file of files) {
		const route = filePathToRoute(distDir, file, urlFormat);
		const expectedCanonical = expectedCanonicalFor(route, siteUrl, urlFormat);
		const html = await readFile(file, 'utf-8');
		const { document } = parseHTML(html);

		const titleEl = document.querySelector('title');
		const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null;
		const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null;
		const robotsMeta = document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null;
		const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? null;

		const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((el) => ({
			level: Number(el.tagName.slice(1)),
			text: textOf(el),
		}));
		const h1s = headings.filter((h) => h.level === 1).map((h) => h.text);

		const images = [...document.querySelectorAll('img')].map((img) => ({
			src: img.getAttribute('src') ?? '',
			alt: img.getAttribute('alt'),
		}));

		const anchors = [...document.querySelectorAll('a[href]')];
		const internalLinks = [];
		const externalLinks = [];
		for (const a of anchors) {
			const href = a.getAttribute('href');
			if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
			let resolved;
			try {
				resolved = new URL(href, siteUrl + route);
			} catch {
				continue;
			}
			if (resolved.origin === new URL(siteUrl).origin) {
				internalLinks.push(resolved.pathname);
			} else {
				externalLinks.push(resolved.href);
			}
		}

		const main = document.querySelector('main') ?? document.body;
		const wordCount = countWords(textOf(main));

		const og = {
			title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? null,
			description: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? null,
			image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? null,
		};
		const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') ?? null;

		pages.push({
			site,
			siteLabel,
			route,
			file,
			title: textOf(titleEl),
			metaDescription,
			canonical,
			expectedCanonical,
			robotsMeta,
			viewport,
			headings,
			h1s,
			images,
			internalLinks,
			externalLinks: [...new Set(externalLinks)],
			jsonLd: parseJsonLd(document),
			wordCount,
			og,
			twitterCard,
		});
	}

	pages.sort((a, b) => a.route.localeCompare(b.route));
	return pages;
}

export async function readStaticFile(distDir, relPath) {
	try {
		return await readFile(path.join(distDir, relPath), 'utf-8');
	} catch {
		return null;
	}
}

export async function pathExists(p) {
	try {
		await stat(p);
		return true;
	} catch {
		return false;
	}
}
