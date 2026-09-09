# (Historical) Deploying fourlaws.thejonmartin.com as a second site

This doc described deploying Four Laws as a second Astro build in this repo,
on its own Netlify project and subdomain. That's no longer how this repo
works — see **[docs/site-consolidation.md](site-consolidation.md)** for what
changed and why.

The original text is still in git history (`git log -p -- docs/fourlaws-deploy.md`)
if the reasoning behind the original two-site split is ever needed — it
covers the URL-format constraint that consolidation had to preserve
(`build.format: 'file'`, byte-identical paths, no trailing slash) and the
TLS-certificate provisioning gotcha that's worth knowing about before anyone
touches DNS on this domain again.
