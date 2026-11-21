"""Regenerate public/og.png (1200x630) — the sitewide default social card.

Replaces the old untracked raster that had no source script. The content is
hard-coded (it is the one sitewide card, not a per-page render). The revenue
figure that used to sit in the subline was removed on purpose (Jon, Oct 28),
and the headline is the About hero line (Jon, Nov 21).

Matches the layout of scripts/tool-og.py: cream ground, plum left bar, sage
label, plum serif headline, mustard rule, sage footer. Run from the repo root:
  python3 scripts/site-og.py
Requires: playwright (python) with Chromium.
"""
import html
from playwright.sync_api import sync_playwright

LABEL = 'FIELD REPORT & SECOND OPINION'
HEADLINE = "Most broken processes aren't tool problems."
SUBLINE = 'Written diagnosis for founders of professional services firms.'
FOOTER = 'thejonmartin.com'

PAGE = """<html><body style="margin:0;width:1200px;height:630px;background:#FAF6EF;position:relative;overflow:hidden">
<div style="position:absolute;left:0;top:0;bottom:0;width:15px;background:#4A3352"></div>
<div style="position:absolute;left:90px;right:90px;top:70px;font:700 22px 'DejaVu Sans Mono',monospace;color:#7C9473;letter-spacing:1px;text-transform:uppercase">{label}</div>
<div style="position:absolute;left:90px;right:90px;top:128px;font:700 64px/1.14 'DejaVu Serif',serif;color:#4A3352">{headline}</div>
<div style="position:absolute;left:90px;width:97px;height:5px;background:#E8A93B;top:{ruley}px"></div>
<div style="position:absolute;left:90px;right:90px;top:{suby}px;font:400 30px 'DejaVu Sans',sans-serif;color:#2E2A26">{subline}</div>
<div style="position:absolute;left:90px;right:90px;top:512px;border-top:1px solid #7C9473"></div>
<div style="position:absolute;left:90px;top:540px;font:700 26px 'DejaVu Sans Mono',monospace;color:#7C9473">{footer}</div>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1200, 'height': 630})
    args = dict(label=html.escape(LABEL), headline=html.escape(HEADLINE), subline=html.escape(SUBLINE), footer=html.escape(FOOTER))
    pg.set_content(PAGE.format(ruley=0, suby=0, **args))
    h = pg.evaluate("document.querySelectorAll('div')[2].getBoundingClientRect().bottom")
    ruley = int(h) + 28
    pg.set_content(PAGE.format(ruley=ruley, suby=ruley + 30, **args))
    pg.screenshot(path='public/og.png')
    print('og.png', 'rule at', ruley)
    b.close()
