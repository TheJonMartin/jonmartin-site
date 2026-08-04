import { defineConfig } from 'astro/config';

export default defineConfig({
	// Canonical origin. Base.astro builds <link rel="canonical"> and og:url from
	// this, and public/sitemap.xml must agree with it. The live site resolves at
	// the apex (no www), so this is the apex — changing one means changing both.
	site: 'https://thejonmartin.com',
});
