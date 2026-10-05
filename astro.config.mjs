import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
				return item;
			},
		}),
	],
});
