import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	// Canonical origin. Base.astro/FourLawsLayout.astro build <link rel="canonical">,
	// og:url, and the absolute og:image URL from this, and the RSS feed uses it
	// for item links. The live site resolves at the apex (no www), so this is
	// the apex.
	site: 'https://thejonmartin.com',

	// 'file' emits e.g. /glossary.html rather than /glossary/index.html. Netlify's
	// pretty-URL handling then serves it at /glossary with no trailing slash.
	//
	// This is load-bearing for the Four Laws pages specifically: they were
	// ported from fourlaws.thejonmartin.com (and, before that,
	// fourlaws.netlify.app) with this exact URL shape frozen on purpose —
	// outreach links and backlink pitches already point at these paths with no
	// trailing slash. Changing that would add a redirect hop to every one of
	// them. The main site's own pages (/writing/*, /about, /thanks) used to
	// build as 'directory' (trailing slash); moving them to 'file' too, rather
	// than trying to run two formats in one Astro project (not supported —
	// build.format is one setting for the whole site), is why
	// public/_redirects carries explicit redirects for the old trailing-slash
	// paths. Those pages are newer with far less at stake than Four Laws' — the
	// direction of least regret is protecting the fragile, well-linked URLs
	// exactly and adding a safety-net redirect for the sturdier ones, not the
	// other way around.
	build: { format: 'file' },

	// Generated, not hand-maintained — this used to be true separately for each
	// of the two sites this repo built (see git history), for the same reason
	// in both cases: a hand-written sitemap silently goes stale the moment
	// someone adds a page and forgets it.
	integrations: [
		sitemap({
			// Pages carrying <meta name="robots" content="noindex"> must not appear
			// here: a sitemap that advertises a page the page itself tells robots to
			// skip is a contradiction crawlers report as an error. Keep this filter
			// in sync with every `noindex` prop passed to Base.astro/FourLawsLayout —
			// today that's /thanks, /thanks-contact, and /404.
			filter: (page) => !/\/(thanks|thanks-contact|404)(\.html)?$/.test(page),

			// build.format 'file' makes Astro emit e.g. /glossary.html into the
			// sitemap, while the canonical every layout actually builds (see the
			// cleanPath logic in FourLawsLayout.astro and the equivalent in
			// Base.astro) is /glossary. A sitemap that disagrees with a page's own
			// canonical is worse than no sitemap — strip both suffixes here so
			// every entry matches what the page itself claims as canonical.
			serialize(item) {
				item.url = item.url.replace(/index\.html$/, '').replace(/\.html$/, '');
				return item;
			},
		}),
	],
});
