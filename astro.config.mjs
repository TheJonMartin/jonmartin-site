import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	// Canonical origin. Base.astro builds <link rel="canonical">, og:url, and the
	// absolute og:image URL from this, and the RSS feed uses it for item links.
	// The live site resolves at the apex (no www), so this is the apex.
	site: 'https://thejonmartin.com',

	// Generated, not hand-maintained. The previous public/sitemap.xml was written
	// by hand and listed only / and /writing/ — the actual post at
	// /writing/what-more-efficient-actually-means/ was never added, so the only
	// real content on the site wasn't in its own sitemap. Generating it removes
	// the step that was being forgotten.
	integrations: [
		sitemap({
			// Pages carrying <meta name="robots" content="noindex"> must not appear
			// here: a sitemap that advertises a page the page itself tells robots to
			// skip is a contradiction crawlers report as an error. Keep this filter
			// in sync with every `noindex` prop passed to Base.astro — today that's
			// /thanks and /404.
			filter: (page) => !/\/(thanks|404)\/?$/.test(page),
		}),
	],
});
