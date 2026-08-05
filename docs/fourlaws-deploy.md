# Deploying fourlaws.thejonmartin.com

One repo, two Netlify sites. This repo builds two independent static sites from
two Astro configs. Nothing is shared at build time except the files in
`shared/` — no host-based routing, no proxy rules, no coupling between the two
deploys. Either can be broken or rolled back without touching the other.

| | Main site | Four Laws |
|---|---|---|
| Config | `astro.config.mjs` | `astro.config.fourlaws.mjs` |
| Source | `src/` | `src-fourlaws/` |
| Static files | `public/` | `public-fourlaws/` |
| Build command | `npm run build` | `npm run build:fourlaws` |
| Publish directory | `dist` | `dist-fourlaws` |
| Netlify project | `jonmartin-mvp` | *(to be created — see below)* |
| Domain | thejonmartin.com | fourlaws.thejonmartin.com |
| URL format | `/writing/post/` (directory) | `/glossary` (file) |

The URL format difference is deliberate. Four Laws uses `build.format: 'file'`
so its paths stay byte-identical to what `fourlaws.netlify.app` serves today —
outreach links are already pointing at those URLs and two backlink pitches are
waiting on them.

## One-time setup Jon has to do by hand

These three steps need a human in the Netlify and GoDaddy UIs.

### 1. Create the second Netlify project

Netlify → Add new project → Import from Git → `TheJonMartin/jonmartin-site`
(the same repo the main site already uses — this is expected).

Set:

- **Build command:** `npm run build:fourlaws`
- **Publish directory:** `dist-fourlaws`
- **Branch:** `main`

Name it something recognisable like `fourlaws-thejonmartin`. Note there is
already an unrelated Netlify project called `fourlaws` serving the old site —
do **not** reuse it. Leave the old one running until cutover is verified.

There is intentionally no `netlify.toml` in this repo. A single root
`netlify.toml` would apply to both projects and the two need different build
commands, so both are configured in the Netlify UI instead. If you ever add
one, it will silently override the UI settings for *both* sites.

### 2. Point the subdomain at it

Netlify → the new project → Domain management → Add domain →
`fourlaws.thejonmartin.com`.

Then in GoDaddy DNS for `thejonmartin.com`, add:

| Type | Name | Value |
|---|---|---|
| CNAME | `fourlaws` | `<the new project>.netlify.app` |

Use the exact target Netlify shows you — it may differ from the project's
preview name. The apex `A` record and the `www` CNAME already exist and must be
left alone; this adds a third record, it doesn't replace anything.

### 3. Wait for the certificate, then verify it

Netlify provisions the TLS cert only after DNS resolves. The main site hit
exactly this problem: the first provisioning attempt ran while stale HubSpot
records were still in DNS, failed verification, and did not retry on its own —
the site served the generic `*.netlify.app` wildcard cert and browsers warned.

So don't assume it worked. After DNS propagates, load
`https://fourlaws.thejonmartin.com` and check the padlock names the custom
domain. If it doesn't, Netlify → Domain management → HTTPS → **Verify DNS
configuration**, then **Renew certificate**.

## Cutover

The content is migrated. All 16 URLs build, including the Full Reference and
the three tools, and both pre-cutover checks in `capture/fourlaws/README.md`
(missing pages, missing anchors) come back clean. Nothing in the repo is
blocking — steps 1–3 above are what's left.

Once the subdomain is live:

1. Verify every URL in the sitemap resolves on the new subdomain, and spot-check
   a deep link into the Full Reference (`/four-laws-complex-system-design-full#s21`)
   — the anchors are the part most likely to have rotted, and the part existing
   outreach links depend on.
2. Add redirects on the *old* Netlify project pointing at the new subdomain, so
   existing links and any search equity follow. Because `build.format: 'file'`
   kept every path byte-identical, this is a single splat rule rather than 16
   individual ones — in the old project's `_redirects`:

   ```
   /*  https://fourlaws.thejonmartin.com/:splat  301!
   ```

   Confirm a couple of real paths through it before trusting the wildcard.
3. Only then take the old project down.

Note the old site carries Google Analytics (`G-V6MR0V297V`) and per-page OG
images that were deliberately not carried over. Decide whether either should
come back *before* retiring the old project, while it's still there to copy
from — see the deltas list in `capture/fourlaws/README.md`.

## Local development

```
npm run dev            # main site
npm run dev:fourlaws   # Four Laws
```

They use different ports; both can run at once.
