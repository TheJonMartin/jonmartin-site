# Content editing with Decap CMS

A browser-based editor at `/admin` for making small content changes — new
writing posts, tweaks to the Home and About page copy — without touching code
or going through Claude. Edits commit straight to this GitHub repo (same repo
Claude edits), which triggers the same Netlify build as any other push. There
is no separate database and nothing to keep in sync — the CMS just edits the
same files.

**What's editable:**

| What | Where it lives | CMS collection |
|---|---|---|
| Writing posts | `src/content/writing/*.md` | Writing |
| Home page copy | `src/content/pages/home.json` | Pages → Home Page |
| About page copy | `src/content/pages/about.json` | Pages → About Page |

Everything else — layout, styling, nav, the Four Laws site, `robots.txt`,
schema markup — is still code, still Claude's (or your) territory.

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
the app. You should land in the Decap CMS editor with "Writing" and "Pages"
in the sidebar. Only GitHub accounts with write access to the repo can
authenticate — right now that's just you.

## Day to day

- **Edit Home or About copy:** `/admin` → Pages → Home Page or About Page →
  change a field → **Publish**. That commits directly to `main` and
  Netlify rebuilds — no draft/review step, so double-check before publishing.
- **Write a post:** `/admin` → Writing → **New Writing**. Leave *Draft*
  checked while you're still writing it — draft posts don't appear on the
  live site or in the RSS feed (this mirrors `content.config.ts`'s existing
  `draft` field exactly, same rule Claude follows). Uncheck it when it's
  ready and hit **Publish**.
- **Delete a post:** open it in the CMS and use the delete option in the
  editor's menu (writing is configured with `delete: true`). Home and About
  are single files, not deletable entries.
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
