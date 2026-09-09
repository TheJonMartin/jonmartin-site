# Consolidating thejonmartin.com and fourlaws.thejonmartin.com

**Status: merged locally and verified, not yet deployed.** This doc will be
updated once the redirects in "Deploy" below are actually live — until then,
treat that section as the plan, not a description of the current state.

## Why

This repo used to build **two independent Astro sites**: the main site
(`astro.config.mjs` → `src/` → Netlify project `jonmartin-mvp` →
thejonmartin.com) and Four Laws (`astro.config.fourlaws.mjs` →
`src-fourlaws/` → Netlify project `fourlaws-thejonmartin` →
fourlaws.thejonmartin.com). See `docs/fourlaws-deploy.md`'s original text
(preserved in git history) for why they were split that way in the first
place — in short, Four Laws' URLs had to stay byte-identical to
`fourlaws.netlify.app`'s, and running it as a second Astro config/output
directory was the least risky way to guarantee that while porting it.

Jon wanted one consolidated site instead. This merges both into one Astro
project, one Netlify project (`jonmartin-mvp`), one domain
(`thejonmartin.com`) — while keeping every one of Four Laws' 16 original URLs
and all 49 Full Reference anchors resolving at the exact same path. Only the
host changes.

## What actually changed

- **`src-fourlaws/` → `src/`.** Four Laws' 13 content/tool pages now live
  directly in `src/pages/` and `src/content/four-laws/`, at their existing
  top-level paths (`/glossary`, `/faq`, etc.) — not nested under
  `/four-laws/*`, which would have broken every existing link.
- **`build.format: 'file'` sitewide** (`astro.config.mjs`). This was already
  Four Laws' setting, and the one with real backlink stakes riding on it —
  outreach links and backlink pitches already point at its URLs with no
  trailing slash. The main site's own `/writing/*`, `/about`, etc. used to
  build as `'directory'` (trailing slash); Astro doesn't support two formats
  in one project, so those pages absorbed the change instead — see
  `public/_redirects` for the safety-net redirects that resulted, and the
  note in there about the one case (individual `/writing/<slug>/` links)
  that relies on Netlify's own pretty-URL normalization rather than an
  explicit rule, since Netlify's redirect syntax can't express "strip a
  trailing slash but keep everything else" as a single wildcard rule.
- **Two nav/layout pairs, not unified into one.** Main pages
  (`/`, `/about`, `/writing`, `/contact`, `/thanks`) keep `Base.astro` and
  the single-row `Nav.astro`; Four Laws pages keep `FourLawsLayout.astro` and
  the grouped Explore/Tools/Reference `FourLawsNav.astro`. Both already share
  the Field & Ledger design tokens, so they read as one family without
  needing to actually become one component — reusing two already-built nav
  components as-is was the lowest-risk path to "main site stays primary,
  minimal rewriting" (the decision made before this merge started).
- **Route collisions resolved.** Four Laws had its own `/`, `/about`, and
  `/thanks` — all retired/merged in favor of the main site's versions (see
  git history for the reasoning on each). `/contact` had no collision (main
  had no dedicated contact page before this) and moved over unchanged. The
  Four Laws contact form now posts to its own `/thanks-contact` rather than
  sharing `/thanks` with the main site's waitlist form — they made different
  promises in their copy, and diluting either into generic language wasn't
  worth the one file saved.
- **Content collection renamed `pages` → `fourLaws`** in `content.config.ts`,
  living at `src/content/four-laws/` — `src/content/pages/` was already the
  Decap-managed home.json/about.json for the main site, a different shape
  entirely, so reusing "pages" for both would have been confusing without
  actually colliding on disk.
- **Cross-domain links became internal links.** Every hardcoded
  `https://thejonmartin.com` / `https://fourlaws.thejonmartin.com` reference
  in nav, footer, CTA, and schema.org markup became a root-relative link or
  was removed where it became redundant (e.g. `FourLawsNav.astro`'s old
  "thejonmartin.com" link, now the same destination as its own wordmark).
  The homepage's Person schema no longer lists Four Laws under `sameAs` —
  that field is for genuinely separate identities, and Four Laws stopped
  being one.
- **`about.md`'s unique content** (a "Connect" section with real social
  links — LinkedIn, Instagram, Threads, X — that didn't exist anywhere on
  the main site) was folded into the main `/about` page as a new
  "Elsewhere" section before the file was retired. The rest of that page
  (family/personal narrative, "started, scaled, and sold two businesses"
  framing) was deliberately **not** carried over — that's a bigger
  positioning change than a technical merge should make unilaterally.
- **Decap CMS** (`public/admin/config.yml`) gained a `Four Laws` folder
  collection alongside the existing `Writing` and `Pages` ones — see
  `docs/cms-setup.md`.

## Verified before deploy

- Clean `npm run build` — 31 pages, zero route-collision errors (Astro
  throws on those, so a clean build is itself a real signal here, not just
  an absence-of-error-message).
- Adapted both check scripts from `capture/fourlaws/README.md`'s original
  migration (missing-page, missing-anchor) against the merged `dist/` — both
  clean.
- All 49 documented Full Reference anchor ids independently confirmed
  present (`#p1`–`#p8`, `#s21`–`#s837`).
- Canonical URLs, `og:url`, sitemap entries, and JSON-LD `@id`s all resolve
  to `thejonmartin.com/<path>` with no `.html` suffix and no unwanted
  trailing slash, across a sample spanning main pages, Four Laws content
  pages, and writing posts.
- `isPartOf` in the TechArticle schema and the BreadcrumbList's home item
  both correctly reference the single merged WebSite entity.

## Deploy (see chat / commit history for actual execution)

1. Draft-deploy the merged build to `jonmartin-mvp`, verify the draft URL,
   then promote to production.
2. Redirect the two old hosts **without touching DNS**: replace what
   `fourlaws-thejonmartin` (fourlaws.thejonmartin.com) and the legacy
   `fourlaws` project (fourlaws.netlify.app — no source repo, so this is a
   fresh minimal deploy, not a code change) actually serve with a single
   `_redirects` file: `/* https://thejonmartin.com/:splat 301!`. This keeps
   each project's existing custom domain and TLS certificate attached and
   serving, avoiding the cert-reprovisioning delay the original
   `fourlaws-deploy.md` migration ran into once.
3. Verify a sample of real Four Laws URLs against both old hosts and confirm
   a 301 to the matching `thejonmartin.com` path.
4. Once stable for a while, `fourlaws-thejonmartin` can be deleted entirely
   — no urgency either way.
