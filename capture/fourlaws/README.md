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
| `/four-laws-complex-system-design-full` | **ported** ⚠︎ see "Full Reference" below |
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

## Full Reference

All sixteen URLs now build. The Full Reference is
`src-fourlaws/content/pages/four-laws-complex-system-design-full.md` — a
collection entry rather than a hand-built `.astro` page, since it is prose.

It carries 49 explicit anchor ids: `#p1`–`#p8`, `#s21`–`#s25`, `#s31`–`#s34`,
`#s41`–`#s43`, `#s51`–`#s53`, `#s61`–`#s68`, `#s71`–`#s76`, `#s81`–`#s85`, and
`#s831`–`#s837`. Every heading in the file is raw `<h2 id="…">` / `<h3 id="…">`
HTML rather than markdown, because markdown's auto-generated slugs would turn
"2.1 Ashby's Law of Requisite Variety" into `#21-ashbys-law-of-requisite-variety`
and silently break ten internal pages plus every outreach link already in the
wild. On the live site `#s833`–`#s837` are `<div>` blocks with a bold lead-in;
they are promoted to `<h4>` here so each anchor lands on something semantic.

`src-fourlaws/layouts/Base.astro` changed with it: the title rule now skips the
" | Four Laws of Complex System Design" suffix for any title that already opens
with the site name, so this page's `<title>` matches the live one exactly
instead of stuttering.

## Pre-cutover checks

Both of these must come back clean before following `docs/fourlaws-deploy.md`.
As of the Full Reference port, both do.

Missing-page check, after `npm run build:fourlaws`:

```sh
grep -oh 'href="/[^"#]*' dist-fourlaws/*.html | sed 's/href="//' | sort -u |
  while read p; do f="dist-fourlaws${p}.html"; [ "$p" = "/" ] && f="dist-fourlaws/index.html";
  [ -f "$f" ] || echo "MISSING: $p"; done
```

Missing-anchor check — the one that actually matters here, since the deep links
into the Full Reference are what made the page a cutover blocker:

```sh
python3 - <<'EOF'
import re, glob, os
ids = {os.path.basename(f)[:-5]: set(re.findall(r'id="([^"]+)"', open(f).read()))
       for f in glob.glob('dist-fourlaws/*.html')}
for f in glob.glob('dist-fourlaws/*.html'):
    for href in set(re.findall(r'href="(/[^"]*#[^"]+)"', open(f).read())):
        page, anchor = href.split('#', 1)
        key = 'index' if page == '/' else page.lstrip('/').replace('.html', '')
        if key not in ids: print('NO PAGE  ', href, '<-', os.path.basename(f))
        elif anchor not in ids[key]: print('NO ANCHOR', href, '<-', os.path.basename(f))
EOF
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
- **Full Reference presentation.** Three small departures from the live page, all
  consequences of the reskin rather than content changes. The `<h1>` reads "Four
  Laws of Complex System Design — Full Reference" where the live page splits that
  across an `<h1>` and a subtitle line; the eyebrow reads "reference" (the
  collection's group) where the live page says "Reference Document"; and 8.5's
  quick-reference table is a list, because it was a single-header table that has
  no faithful markdown equivalent. The other two tables (5.1, 5.2) are real
  tables. Nothing else in the prose was cut or reworded.
- **Body diagrams.** The Full Reference has eleven inline diagrams (Figures 0–10,
  22 files — a `.webp` with a `.png` fallback each). The `<figure>` elements are
  ported with their captions intact and each `<img>` preserved verbatim inside an
  HTML comment carrying its `src` and full alt text — nothing renders broken, and
  restoring them is a matter of copying the files into `public-fourlaws/img/` and
  uncommenting. Left uncopied deliberately: they are drawn in the old dark
  navy/cyan palette and would look wrong on a cream Field & Ledger page, so they
  want redrawing rather than copying.
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
