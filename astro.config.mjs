import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// lastmod only where a real date exists: essays (updatedDate, else pubDate) and tool pages (checked date).
const lastmod = new Map();
for (const f of readdirSync('./src/content/writing')) {
	if (!f.endsWith('.md') || f.startsWith('_')) continue;
	const fm = readFileSync(`./src/content/writing/${f}`, 'utf8').split('---')[1] ?? '';
	const d = /^updatedDate:\s*(\S+)/m.exec(fm)?.[1] ?? /^pubDate:\s*(\S+)/m.exec(fm)?.[1];
	if (d) lastmod.set(`/writing/${f.replace(/\.md$/, '')}`, d);
}
const toolsSrc = readFileSync('./src/lib/tools.ts', 'utf8');
const toolsDate = /export const MODIFIED = '([\d-]+)'/.exec(toolsSrc)?.[1];
for (const m of toolsSrc.matchAll(/^\t\tslug: '([^']+)'/gm)) if (toolsDate) lastmod.set(`/tools/${m[1]}`, toolsDate);
if (toolsDate) lastmod.set('/tools', toolsDate);

export default defineConfig({
	site: 'https://thejonmartin.com',

	// 'file' keeps legacy Four Laws URLs slash-less (outreach/backlinks); main-site trailing-slash paths redirect in public/_redirects.
	build: { format: 'file' },

	integrations: [
		sitemap({
			// Must match every noindex page (Base/FourLawsLayout): /thanks, /thanks-contact, /thanks-consulting, /404.
			filter: (page) => !/\/(thanks|thanks-contact|thanks-consulting|404)(\.html)?$/.test(page),

			// build.format 'file' emits .html; strip so sitemap URLs match layout canonicals.
			serialize(item) {
				item.url = item.url.replace(/index\.html$/, '').replace(/\.html$/, '');
				const d = lastmod.get(new URL(item.url).pathname);
				if (d) item.lastmod = new Date(d).toISOString();
				return item;
			},
		}),
	],
});
