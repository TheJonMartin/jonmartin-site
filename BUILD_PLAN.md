# BUILD_PLAN: programmatic SEO engine v1 (branch pseo-engine)
Approved plan: "Programmatic SEO Engine: Plan" (Jon, Oct 31 2026 3:22 PM ET). One PR. No production deploy from this branch.

## Shape
- Static Astro. The engine writes resolved page JSON to `src/data/pseo/pages/<slug>.json`; Astro renders it.
- Routes: `/tools/best/<slug>` (template `best`), `/tools/compare/<slug>` (templates `compare`, `howto`).
- Page JSON `status`: `live` (indexed, in sitemap) or `noindex` (meta robots noindex, left out of sitemap). Drafts and gate failures never reach the repo.
- Nightly job (Render cron, `node scripts/pseo/run.mjs`): sync cheat-sheet links (Notion, read-only) -> refresh facts (Supabase `pseo` schema) -> render page specs -> gate -> write up to the day's quota of new gated pages + re-render live ones -> one PR via GitHub API. Never deploys. Missing secrets -> log names, run local dry-run, exit 0.
- Search Console hook: reads `pseo.page_metrics` (filled by a bot from the Ryze connector, provider google_search_console). Empty table = skip noindex-by-traffic rules.

## Page spec (input, `scripts/pseo/specs/<slug>.json`)
`{ slug, route: "best"|"compare", template: "best"|"compare"|"howto", wave, niche: {label, team_size, must_haves[]}, products: [{slug, role: "option"|"own_cta"|"waitlist", link: true|false}], title, seoTitle, description, h1, dek[], sections: [{label, blocks: Block[]}], faq: [{q,a}], closing, computed: [{id, label, expr}] }`
- Text may contain `{{fact:<id>}}` (replaced by fact.value) and `{{calc:<id>}}` (replaced by a computed value). `expr` is `<factId> * <n>` or `<factId> + <factId>` only.
- `link: true` -> affiliate URL from the cheat sheet (`links` map), rel="sponsored nofollow noopener". No link in the map -> render name with no link.

## Gate (scripts/pseo/gate.mjs) — all must pass
1. Options: best >= 3 options, compare >= 2.
2. Facts: >= 5 facts per option product, each checked_at within 30 days of run date. One computed element or a fit table vs niche must_haves.
3. Body >= 600 words; similarity (5-word shingle Jaccard) vs every other engine page < 0.5.
4. Every number in rendered prose (digits, $, %, commas) equals a fact number/value or a computed value, or is in an allowlist of years/list numbers (1-10 in labels).
5. Disclosure present before first affiliate link; every affiliate link has rel containing "sponsored" and "nofollow"; every affiliate href is in the cheat-sheet links map.
6. Banned (case-insensitive): "steward", "staff-only", "staff only", "we implement", "I implement", "implement it for you", "done-for-you", "review" schema, "AggregateRating", own-product prices ("$29", "$199", "$19/mo", "$49" next to an own product name), planned-product live wording ("available now", "sign up today", "get started" next to Stripe sync).
7. Own-product sentences only from `claims_allowlist` rows with approved_by set. own_planned products render only the waitlist CTA with a PLANNED label.
Live-page rules (run.mjs): fact older than 45 days, dead affiliate link, or < 10 impressions after 90 days (only when page_metrics has data) -> status noindex; retire after 120 days.

## Steps (one Claude call each; check + commit after each)
- [ ] 1. Site rendering: src/lib/pseo.ts (types + `import.meta.glob` loader), src/components/pseo/{Disclosure,FitTable,OwnProductCta,WaitlistCta}.astro, src/pages/tools/best/[slug].astro, src/pages/tools/compare/[slug].astro reusing the look of src/pages/tools/[slug].astro, sitemap filter for noindex engine pages (astro.config.mjs reads the JSON status), 1 fixture page per template under src/data/pseo/pages/ marked noindex. Check: `npm run build` exit 0; dist has the 3 pages; noindex ones absent from sitemap.
- [ ] 2. Gate + renderer + tests: scripts/pseo/{render.mjs,gate.mjs,gate.test.mjs,fixtures/}. Check: `node --test scripts/pseo/` exit 0 with passing fixtures (best, compare, howto-planned) and rejections (few facts, stale facts, unmatched number, banned word, missing disclosure, planned product with live CTA).
- [ ] 3. Nightly job: scripts/pseo/{run.mjs,lib/notion.mjs,lib/supabase.mjs,lib/github.mjs,lib/refresh.mjs,lib/gsc.mjs,seed.mjs}, supabase/migrations/20261031_pseo.sql, render.yaml (cron only). Local mode `node scripts/pseo/run.mjs --local` uses scripts/pseo/seed + a links file. Check: `node --test scripts/pseo/` and `node scripts/pseo/run.mjs --local --dry-run` exit 0.
- [ ] 4. First 2 real pages: specs close-vs-pipedrive (compare) and crm-for-freelancers (best); remove fixtures from src/data/pseo/pages; generate via --local. Check: full test command exit 0; both pages pass the gate.

Test command: `npm run build && node --test scripts/pseo/ && npm run seo-scan`
Don't touch: src/lib/tools.ts and the 14 live /tools pages, netlify.toml, public/_redirects, GiftKeep pages, anything Railway. No real keys in code.
