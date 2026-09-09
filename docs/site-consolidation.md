# Consolidating thejonmartin.com and fourlaws.thejonmartin.com

**Status: deployed and verified live**, as of 9 September 2026. `thejonmartin.com`
serves the consolidated site; `fourlaws.thejonmartin.com` and the legacy
`fourlaws.netlify.app` both 301 every path to the matching `thejonmartin.com`
URL. Both were re-verified against their real production domains, not just
draft URLs.

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

## Deploy — what actually happened (9 September 2026)

1. Draft-deployed the merged build to `jonmartin-mvp` first
   (`netlify deploy --dir dist --no-build`), and used it to check the one
   thing that couldn't be verified locally: whether Netlify's pretty-URL
   handling actually normalizes `/writing/<slug>/` (trailing slash) to the
   real `/writing/<slug>.html` asset. **Confirmed yes** — a plain `curl -I`
   against the draft URL returned a 301 to the clean path with no explicit
   redirect rule needed for that case. Also caught and worked around an
   unrelated problem: the project has a dashboard-configured Lighthouse
   build plugin whose Puppeteer/Chromium install failed on a network error
   in the sandbox running the CLI — irrelevant to the actual site code, so
   `--no-build` (deploy the already-built `dist/` directly, skip the
   plugin-installing build orchestration) sidestepped it rather than trying
   to fix a Lighthouse plugin.
2. Promoted to production (`--prod`). Verified live on the real domain: all
   sampled paths 200, canonical tags correctly say `thejonmartin.com` with
   no `.html` suffix.
3. Redirected both old hosts **without touching DNS** — replaced what
   `fourlaws-thejonmartin` (fourlaws.thejonmartin.com) and the legacy
   `fourlaws` project (fourlaws.netlify.app — no source repo, so this was a
   fresh minimal deploy from a scratch folder, not a code change in this
   repo) actually serve with a single `_redirects` file:
   `/* https://thejonmartin.com/:splat 301!`. This kept each project's
   existing custom domain and TLS certificate attached and serving,
   avoiding the cert-reprovisioning delay the original `fourlaws-deploy.md`
   migration ran into once. Draft-verified each before promoting, same as
   step 1–2.
4. Verified a sample of real Four Laws URLs against both old hosts on their
   real production domains (not just draft URLs) — all correctly 301 to the
   matching `thejonmartin.com` path, splat-preserving the exact path.

**Still open, no urgency:** `fourlaws-thejonmartin` (now just a redirect)
can be deleted entirely once Jon's comfortable the redirect has held for a
while — nothing forces that decision.
