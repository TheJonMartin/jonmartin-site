import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Second site in this repo: fourlaws.thejonmartin.com.
//
// One repo, two Netlify sites. This config points Astro at an entirely separate
// source tree and output directory, so the two sites share components and the
// Field & Ledger tokens in shared/ but build and deploy independently. Nothing
// here touches the main site's build — `npm run build` still produces exactly
// what it did before.
//
// Build it with:  npx astro build --config astro.config.fourlaws.mjs
// (wired up as `npm run build:fourlaws`)
//
// The Netlify project for this config must set its publish directory to
// dist-fourlaws and its build command to the script above. See
// docs/fourlaws-deploy.md.
export default defineConfig({
	site: 'https://fourlaws.thejonmartin.com',

	srcDir: './src-fourlaws',
	publicDir: './public-fourlaws',
	outDir: './dist-fourlaws',

	// 'file' emits /glossary.html rather than /glossary/index.html. Netlify's
	// pretty-URL handling then serves it at /glossary with no trailing slash —
	// byte-identical to the URLs fourlaws.netlify.app serves today, and both
	// /glossary and /glossary.html resolve. This matters: the URL structure was
	// deliberately frozen because outreach links are already pointing at it.
	// Changing this to 'directory' would 301 every existing link.
	build: { format: 'file' },

	// The main site's sitemap is hand-maintained, which is fine at four pages.
	// Four Laws lands at sixteen and grows, so it's generated. The serialize hook
	// exists because build.format 'file' makes Astro emit /glossary.html into the
	// sitemap, while the canonical (see src-fourlaws/layouts/Base.astro) is
	// /glossary — a sitemap that disagrees with the canonical is worse than no
	// sitemap at all.
	integrations: [
		sitemap({
			serialize(item) {
				item.url = item.url.replace(/index\.html$/, '').replace(/\.html$/, '');
				return item;
			},
		}),
	],
});
