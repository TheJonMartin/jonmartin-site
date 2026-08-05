# Four Laws migration — status and source material

`fourlaws.netlify.app` has **no source repo**. It has only ever existed as a
deployed site. Everything needed to rebuild it therefore has to be pulled off
the live site, and that capture is the only copy.

A previous capture was made in a sandbox session's temporary outputs folder and
was lost when the session ended. That's why this one lives in the git repo:
committed, pushed, and recoverable.

## Inventory — 16 URLs

Confirmed complete against the live site's own `sitemap.xml`.

### Content pages (13)

| Path | Status |
|---|---|
| `/` | **ported** → `src-fourlaws/pages/index.astro` |
| `/four-laws-complex-system-design-full` | **outstanding** — the big one, Parts 1–8 |
| `/four-laws-flow-and-constraints` | **ported** ⚠︎ see "Flow Deck" below |
| `/conways-law-revops-team-structure` | **ported** |
| `/conways-law-ai-agents-revops` | **ported** |
| `/stakeholder-decision-bottlenecks` | **ported** |
| `/wip-limits-vs-theory-of-constraints` | **ported** |
| `/vsm-ai-system-4` | **ported** |
| `/applied-examples` | **ported** — `#marketing` `#sales` `#cs` `#finance` `#revops` anchors preserved |
| `/glossary` | **ported** |
| `/faq` | **ported** |
| `/about` | **ported** |
| `/contact` | **ported** → `src-fourlaws/pages/contact.astro` (a form, so a page not a collection entry) |

Plus `/thanks`, which is new — the contact form needs somewhere to post to.
It's `noindex` and excluded from the sitemap.

### Interactive tools (3) — all ported

Raw HTML kept in this folder as the reference source.

| Path | Tool | Source capture |
|---|---|---|
| `/part8-flow-diagnostic` | Flow & Constraint Diagnostic | `raw-tool-flow-diagnostic.html` — 6,637 bytes of inline JS |
| `/flow-formula-calculator` | Flow Formula Calculator | `raw-tool-formula-calculator.html` — 3,840 bytes |
| `/stakeholder-decision-checklist` | Stakeholder Decision Stall Checklist | `raw-tool-decision-checklist.html` — 3,840 bytes |

The arithmetic was carried over unchanged and verified against the build output:
the Weinberg lookup table, Kingman's `0.02`/`0.96` domain window, the `/15`
curve normalisation and `88 − yn×82` pixel mapping, and all three Little's Law
solve-for branches are byte-equivalent to the capture.

One structural change in all three: the originals wired buttons with inline
`onclick="…"`. Astro bundles page scripts as modules, so nothing lands on
`window` and inline handlers would silently no-op. Navigation is wired with
`addEventListener` against `data-goto` / `data-action` attributes instead.

## Do not cut over yet

One page is still missing — `/four-laws-complex-system-design-full` — and most
ported pages link into it, several with deep anchors (`#s21`, `#s81`, `#p6`).
Deploying the subdomain today would publish a site with live links into 404s.

Order of operations:

1. Port the Full Reference, preserving its `#sNN` / `#pN` anchor ids exactly.
2. Re-run the missing-link check (below) and confirm it returns nothing.
3. Then follow `docs/fourlaws-deploy.md` for the Netlify and DNS steps.

Missing-link check, after a `npm run build:fourlaws`:

```sh
grep -oh 'href="/[^"#]*' dist-fourlaws/*.html | sed 's/href="//' | sort -u |
  while read p; do f="dist-fourlaws${p}.html"; [ "$p" = "/" ] && f="dist-fourlaws/index.html";
  [ -f "$f" ] || echo "MISSING: $p"; done
```

## Known deltas from the live site

Decisions made during the port, so they don't get rediscovered as bugs.

- **Visual identity.** The live site's dark navy/purple dashboard design
  (`--bg:#0a1220`, cyan/purple/amber accents) is **not** carried over. Everything
  is reskinned to Field & Ledger per `shared/styles/field-and-ledger.css`.
- **The Flow Deck is no longer a deck.** `/four-laws-flow-and-constraints` was a
  JS slide carousel with arrow/keyboard navigation and SVG diagrams. It's ported
  as a linear document — consistent with the Field & Ledger reskin, and it reads
  well that way since each slide already had a heading and prose. If the deck
  behaviour is wanted back, that page needs curling and the carousel rebuilding.
  Two SVG diagrams from it are currently rendered as plain text.
- **OG images.** The live site has per-page `og/*.png` images. None are carried
  over yet; `Base.astro` currently emits `twitter:card: summary` rather than
  `summary_large_image` to match.
- **The `/Ashby_Law_Client_as_Regulator_OnePager.docx` download** hasn't been
  copied into `public-fourlaws/` yet. The home page flags it as pending.
- **Google Analytics** (`G-V6MR0V297V`) is present on the live site and has not
  been carried over. Deliberate — worth an explicit decision rather than a
  silent copy.
- **"Get in touch" CTAs** still point at `/contact`. The separate backlog item
  to repoint the highest-intent pages at product links on thejonmartin.com is
  untouched.
