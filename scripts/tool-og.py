"""Regenerate public/og/tools/<slug>-v2.png (1200x630) from src/lib/tools.ts.

Matches the layout of public/og.png: cream ground, plum left bar, sage label,
plum serif headline, mustard rule. Run from the repo root:  python3 scripts/tool-og.py
Requires: playwright (python) with Chromium.
"""
import html, re
from pathlib import Path
from playwright.sync_api import sync_playwright

src = Path('src/lib/tools.ts').read_text()
blocks = re.split(r"\n\t\{\n\t\tslug: '", src)[1:]
tools = []
for b in blocks:
    slug = b.split("'", 1)[0]
    g = lambda k: re.search(rf"\n\t\t{k}: ([\'\"`])(.*?)(?<!\\)\1,\n", b).group(2).replace("\\'", "'")
    tools.append((slug, g('name'), g('category'), g('h1')))

PAGE = """<html><body style="margin:0;width:1200px;height:630px;background:#FAF6EF;position:relative;overflow:hidden">
<div style="position:absolute;left:0;top:0;bottom:0;width:15px;background:#4A3352"></div>
<div style="position:absolute;left:90px;right:90px;top:70px;font:700 22px 'DejaVu Sans Mono',monospace;color:#7C9473;letter-spacing:1px;text-transform:uppercase">TOOL REVIEW &middot; {cat}</div>
<div style="position:absolute;left:90px;right:90px;top:128px;font:700 {fs}px/1.14 'DejaVu Serif',serif;color:#4A3352">{h1}</div>
<div style="position:absolute;left:90px;width:97px;height:5px;background:#E8A93B;top:{ruley}px"></div>
<div style="position:absolute;left:90px;right:90px;top:{suby}px;font:400 30px 'DejaVu Sans',sans-serif;color:#2E2A26">{name}, reviewed.</div>
<div style="position:absolute;left:90px;right:90px;top:512px;border-top:1px solid #7C9473"></div>
<div style="position:absolute;left:90px;top:540px;font:700 26px 'DejaVu Sans Mono',monospace;color:#7C9473">thejonmartin.com/tools</div>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1200, 'height': 630})
    for slug, name, cat, h1 in tools:
        fs = 64 if len(h1) <= 40 else 56 if len(h1) <= 60 else 48
        pg.set_content(PAGE.format(cat=html.escape(cat), h1=html.escape(h1), name=html.escape(name), fs=fs, ruley=0, suby=0))
        h = pg.evaluate("document.querySelectorAll('div')[2].getBoundingClientRect().bottom")
        ruley = int(h) + 28
        pg.set_content(PAGE.format(cat=html.escape(cat), h1=html.escape(h1), name=html.escape(name), fs=fs, ruley=ruley, suby=ruley + 30))
        pg.screenshot(path=f'public/og/tools/{slug}-v2.png')
        print(slug, fs, 'rule at', ruley)
    b.close()
