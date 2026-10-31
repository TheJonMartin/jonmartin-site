# jonmartin-site (thejonmartin.com)
Astro 7 static site, deployed by Netlify from `main` (never push to main; branches + draft PRs only).

## Stack / folders
- src/pages: routes (.astro); src/layouts: Base, AltitudeLayout, FourLawsLayout
- src/components: Nav, Footer, SeoHead, Analytics, forms, CrossSiteCTA
- src/lib: schema.ts (JSON-LD builders), tools.ts, writing.ts, *-links.ts
- src/content: altitude/, writing/, four-laws/ (markdown), pages/*.json (home/about/writing copy); schema in src/content.config.ts
- shared/styles: CSS; public/: static files, _redirects, llms.txt, admin/ (Decap CMS config)
- scripts/seo-scan: weekly SEO scan (opens/updates issue #2)
- docs/: cms-setup.md, site-consolidation.md

## Commands
- Node >= 22.22 (box: /workspace/tools/node-v22.23.4-linux-x64/bin on PATH)
- Build: `npm run build` (outputs dist/, deterministic)
- Proof for cleanups: sha256 manifest of every dist/ file before vs after

## Don't touch
- `main::` finding-id prefix in seo-scan; public/favicon.ico; CrossSiteCTA name
- Product copy, pricing, wording (Jon's call); no new public copy naming Steward Ledger/GiftKeep (rename pending)
- Altitude modules 09/12/16/18 "Next: …" lines (open question)
