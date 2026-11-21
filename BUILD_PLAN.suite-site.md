# BUILD_PLAN: thejonmartin.com copy update to TheJonMartin Tools

Date: Friday, Nov 20, 2026
Base: origin/main `35c7488`
Branch: `copy/thejonmartin-tools-suite`
Source: `/workspace/site-updates/suite-gap-2026-11-20.md` (read-only gap analysis, 6:51 PM ET)
Public name (Jon, approved Nov 19 / confirmed for this draft): **TheJonMartin Tools**
Tools: Audit, Fix, Span, Stripe Sync, Pricebook

This is a draft-PR copy update only. No merge, no Netlify production publish.

## Constraints
- Do not use or merge `builder/portal-mend-rename`.
- Do not invent prices for Span, Stripe Sync, or Pricebook.
- Keep Watch $19/mo or $190/yr, Watch Weekly $29/mo or $290/yr, Fix free during beta then $49/mo or $490/yr.
- Change 46 checks to 51. Keep 37 best-practice tests.
- Stripe Sync is live, not planned / not a waitlist product.
- Do not rename the top-level `/tools` nav item (affiliate write-ups). Flag the name collision only.
- Do not edit DNS or the host-proxy rules in `public/_redirects`. Comment-only updates to the /pricing and /hubspot-facing notes are OK.
- Keep JSON-LD `@id` `https://thejonmartin.com/#portal-audit` stable.
- Do not add Offer nodes for add-ons.
- Do not touch GiftKeep copy, Altitude, Four Laws, or live /tools body pages.
- Do not invent unapproved tool blurbs beyond: they are optional tools in the same app; locked tools show "Add this tool" and ask only for that tool's permissions; Fix is four steps (dry run, review, approve, apply); nothing is written until you approve; Home has a "Needs your attention" list; tool tabs are on every page; only a Super Admin can approve or apply.

## Steps (one Claude call each; 3-4 files max)
- [x] 1. Home copy: (done 71b50b2) `src/content/pages/home.json`, `src/pages/index.astro` (comments only in the astro file). Done when: suite name, Fix not Fixer, 51 checks, 4-step Fix flow, optional tools, attention list / tool tabs mentioned, no invented prices. JSON remains valid. Check: `python3 -m json.tool src/content/pages/home.json >/dev/null` and `rg -n 'Portal Audit|Portal Fixer|46 automated' src/content/pages/home.json src/pages/index.astro` finds none.
- [x] 2. About, Nav, Footer: (done 5d2e43a) `src/content/pages/about.json`, `src/components/Nav.astro`, `src/components/Footer.astro`. Done when: product label is TheJonMartin Tools, GiftKeep unchanged, `/tools` label unchanged. Check: same ripgrep on those files, JSON valid.
- [x] 3. Schema, llms.txt, redirect comments: (done d3159d6) `src/lib/schema.ts`, `public/llms.txt`, `public/_redirects`. Done when: Service name is TheJonMartin Tools, `#portal-audit` id unchanged, existing prices unchanged, add-ons mentioned without prices, comment-only redirect updates. Check: `rg -n 'Portal Audit|Portal Fixer' src/lib/schema.ts public/llms.txt public/_redirects` finds none (except historical comments if any must stay — prefer none).
- [ ] 4. pSEO seed + gate + CMS labels: `scripts/pseo/seed/facts.json`, `scripts/pseo/seed/claims.json`, `scripts/pseo/seed/seed.sql`, `scripts/pseo/gate.mjs`. Done when: Stripe Sync is `own_live` named "Stripe Sync" with cta to `https://audit.thejonmartin.com/`; portal-audit product name is TheJonMartin Tools; waitlist/planned claim removed; gate no longer special-cases "stripe sync" as planned. Check: JSON valid; `node --test 'scripts/pseo/**/*.test.mjs'`.
- [ ] 5. CMS labels + CLAUDE.md one-liner: `public/admin/config.yml`, `CLAUDE.md`. Done when: CMS fixer labels say Fix (field names stay `fixerLabel` etc.), CLAUDE.md no longer calls Stripe Sync planned. Do not rewrite BUILD_PLAN.md (historical pSEO plan). Check: ripgrep.

After all steps: reviewer runs `npm run build` and `node --test 'scripts/pseo/**/*.test.mjs'` and quotes exit codes. Then opens a DRAFT PR. No merge, no deploy.

## Status
Started clean from `35c7488`. An earlier unpushed local draft (not Claude) was saved at `/workspace/site-updates/earlier-attempt-2026-11-20/` and discarded so Claude Code could do this work.
