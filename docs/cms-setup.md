# Content editing with Decap CMS

A browser-based editor at `/admin` for making small content changes — new
writing posts, edits to the Four Laws reference pages, tweaks to the Home and
About page copy — without touching code or going through Claude. Edits commit
straight to this GitHub repo (same repo Claude edits), which triggers the
same Netlify build as any other push. There is no separate database and
nothing to keep in sync — the CMS just edits the same files.

**What's editable:**

| What | Where it lives | CMS collection |
|---|---|---|
| Writing posts | `src/content/writing/*.md` | Writing |
| Four Laws reference pages | `src/content/four-laws/*.md` | Four Laws |
| Home page copy | `src/content/pages/home.json` | Pages → Home Page |
| About page copy | `src/content/pages/about.json` | Pages → About Page |

Everything else — layout, styling, nav, `robots.txt`, schema markup, and the
three interactive Four Laws tools (they're real JavaScript applications, not
prose) — is still code, still Claude's (or your) territory.

Until [docs/site-consolidation.md](site-consolidation.md), the Four Laws
pages lived on a separate site (fourlaws.thejonmartin.com) with their own
Netlify project and their own copy of this same CMS setup. They're all one
site and one `/admin` now.

## One-time setup Jon has to do by hand

This is the one part that needs a human in the GitHub and Netlify UIs — it
involves pasting a client secret, which shouldn't pass through Claude or any
CLI.

### 1. Register a GitHub OAuth app

GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.

| Field | Value |
|---|---|
| Application name | anything recognizable, e.g. `jonmartin-site CMS` |
| Homepage URL | `https://thejonmartin.com` |
| Authorization callback URL | `https://api.netlify.com/auth/done` |

Save it. GitHub gives you a **Client ID** and lets you generate a **Client
secret** — copy both, you'll paste them in the next step and won't see the
secret again.

### 2. Add it to Netlify

In the `jonmartin-mvp` Netlify project (or at the team level, if you want one
OAuth app to cover every site on the team): **Site configuration → General →
OAuth** (Netlify's menus shift occasionally — if it's not there, search
"OAuth" in site settings, or see Decap's own docs under the GitHub backend's
"Site Settings for Netlify Users" section). Add a provider, paste the Client
ID and Client secret from step 1.

This is what makes `/admin` able to say "Login with GitHub" and actually work
— it's Netlify acting as the OAuth handshake proxy, not the deprecated
Netlify Identity widget, and not anything Git Gateway-related.

### 3. Confirm you can log in

Visit `https://thejonmartin.com/admin`, click **Login with GitHub**, approve
the app. You should land in the Decap CMS editor with "Writing", "Four Laws",
and "Pages" in the sidebar. Only GitHub accounts with write access to the
repo can authenticate — right now that's just you.

## Day to day

- **Edit Home or About copy:** `/admin` → Pages → Home Page or About Page →
  change a field → **Publish**. That commits directly to `main` and
  Netlify rebuilds — no draft/review step, so double-check before publishing.
- **Write a post:** `/admin` → Writing → **New Writing**. Leave *Draft*
  checked while you're still writing it — draft posts don't appear on the
  live site or in the RSS feed (this mirrors `content.config.ts`'s existing
  `draft` field exactly, same rule Claude follows). Uncheck it when it's
  ready and hit **Publish**.
- **Edit a Four Laws page:** `/admin` → Four Laws → pick a page. Same `draft`
  rule as Writing. The **Nav group** field (reference / explore / meta)
  controls which group of `FourLawsNav.astro` the page appears under —
  changing it moves the page in the nav, it doesn't change the URL. Renaming
  a page in the CMS renames its file, which changes its URL — don't do that
  for an existing published page without also adding a redirect, since these
  specific URLs have real outreach links and backlink pitches pointing at
  them (see `docs/site-consolidation.md`).
- **Delete a post or Four Laws page:** open it in the CMS and use the delete
  option in the editor's menu (both collections are configured with
  `delete: true`). Home and About are single files, not deletable entries.
- A couple of fields explicitly allow HTML — the tagline on Home (for the
  `<span class="accent">` styling) and any paragraph that needs a link on
  About. Everywhere else, plain text is enough; you don't need to know HTML
  to use this.

## Local testing (optional)

To try changes locally before they're live, in one terminal:

```
npm run cms      # starts the local git proxy Decap talks to
```

and in another:

```
npm run dev
```

then visit `http://localhost:4321/admin` — this bypasses GitHub login
entirely (that's what `local_backend: true` in `public/admin/config.yml`
does) and writes straight to your working copy, so you can review a `git
diff` before deciding whether to commit and push.

## Why Decap and not something else

Chosen over a hosted CMS (Sanity, Contentful) specifically to avoid adding a
database or external account: content stays as the same markdown/JSON files
in this repo, versioned in the same git history, deployed by the same
Netlify build. The tradeoff is a plainer editing UI than a hosted CMS would
give you — acceptable for "small changes," reconsider if the editing needs
grow into something that wants image galleries, scheduled publishing, or
multiple non-technical editors.
