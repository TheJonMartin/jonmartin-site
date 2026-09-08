# Weekly SEO & AEO scan

Scans both sites built from this repo — thejonmartin.com and
fourlaws.thejonmartin.com — for technical SEO issues, AEO (answer-engine)
gaps, and content gaps, then writes one prioritized checklist.

## What it checks

- **Technical SEO** — titles, meta descriptions, canonicals, H1/heading
  hierarchy, image alt text, Open Graph tags, sitemap coverage, robots.txt
  sanity, broken internal links (including links between the two sites, and
  links to static files like the stakeholder-matrix PDF), broken external
  links.
- **AEO** — structured data (JSON-LD) presence and validity, content depth,
  generic section headings, content freshness, llms.txt.
- **Content gaps** (main site only — this is the blog collection) — target
  topics with no published post, publishing cadence, unpublished drafts, and
  `TODO` markers left in shipped source (e.g. an About page that ships with
  its own "still missing" checklist).

Findings are ranked P0 (broken) / P1 (high priority) / P2 (opportunity).

## Running it

```
npm run seo-scan
```

This builds both sites and runs the scan. With `GITHUB_TOKEN` and
`GITHUB_REPOSITORY` set (as they are in the scheduled workflow), it creates
or updates a single GitHub issue labeled `seo-scan`. Without them, it prints
the report and writes it to `seo-scan-report.md` (gitignored) at the repo
root instead.

The issue is reused week to week rather than opening a new one each time —
its body always reflects the latest scan, and each run posts a short "N new,
N resolved" comment so the history is still visible without the issue list
filling up with near-duplicates.

## Tuning

Everything adjustable lives in `config.mjs`: word-count thresholds, target
topics, publishing cadence, which routes are expected to be `noindex`, and
whether external-link checking runs at all. Nothing else in this directory
should need touching to change what counts as a finding.

## Adding a check

Each rule module (`rules/technical-seo.mjs`, `rules/aeo.mjs`,
`rules/content-gaps.mjs`) exports a function that takes crawled pages and
returns findings shaped like:

```js
{ id, priority, category, page, title, detail, fix }
```

`id` must stay stable across runs (no timestamps or counts baked in) — it's
how the report tells "new since last week" apart from "still open."
