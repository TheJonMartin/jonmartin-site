# Four Laws capture — migration source material

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
| `/` | not captured |
| `/four-laws-complex-system-design-full` | not captured — the big one, Parts 1–8 |
| `/four-laws-flow-and-constraints` | not captured |
| `/conways-law-revops-team-structure` | not captured |
| `/conways-law-ai-agents-revops` | not captured |
| `/stakeholder-decision-bottlenecks` | not captured |
| `/wip-limits-vs-theory-of-constraints` | not captured |
| `/vsm-ai-system-4` | not captured |
| `/applied-examples` | not captured |
| `/glossary` | **ported** → `src-fourlaws/content/pages/glossary.md` |
| `/faq` | not captured |
| `/about` | **ported** → `src-fourlaws/content/pages/about.md` |
| `/contact` | not captured |

### Interactive tools (3)

| Path | Tool |
|---|---|
| `/part8-flow-diagnostic` | Flow & Constraint Diagnostic — 5-step diagnostic logic |
| `/flow-formula-calculator` | Flow Formula Calculator — Little's Law, Kingman's VUT, Weinberg context-switching |
| `/stakeholder-decision-checklist` | Stakeholder Decision Stall Checklist |

## The one thing that needs a human

**The three tools' JavaScript could not be captured automatically.** Their logic
lives in inline `<script>` tags rather than external `.js` files, and the
browser automation available here blocks reading inline script contents.

This is worth doing properly rather than rebuilding from observed behaviour —
working code exists, so this is a port, not a reverse-engineering job.

To capture it, for each of the three tool URLs:

1. Open the page in Chrome.
2. `Cmd+Opt+U` (View Source).
3. Save the whole page as `capture/fourlaws/raw-<name>.html` in this folder.

Or from a terminal, which is faster and gets all three at once:

```sh
cd ~/Documents/GitHub/jonmartin-site/capture/fourlaws
curl -s https://fourlaws.netlify.app/part8-flow-diagnostic          -o raw-tool-flow-diagnostic.html
curl -s https://fourlaws.netlify.app/flow-formula-calculator        -o raw-tool-formula-calculator.html
curl -s https://fourlaws.netlify.app/stakeholder-decision-checklist -o raw-tool-decision-checklist.html
```

Then commit. Once those files exist, the tool logic can be extracted and ported
without any further dependence on the old site staying up.

## Note on the visual identity

The live site is a dark navy/purple technical-dashboard design (`--bg:#0a1220`,
`--card:#132038`, cyan/purple/amber accents). **None of that is being carried
over.** The decision is to reskin everything to Field & Ledger
(`shared/styles/field-and-ledger.css`) so Four Laws reads as part of one brand
with thejonmartin.com.

So when capturing raw HTML, the CSS is not the point — the content, the
structure, the heading IDs (the Full Reference uses anchors like `#s21`, `#p6`
that the glossary links into), and the tool JavaScript are.
