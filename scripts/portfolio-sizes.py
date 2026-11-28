"""Smaller copies of the portfolio pictures, so phones and regular screens download less (added 11/28).

The full-size files stay exactly as they are ("crisp as hell"). This only adds smaller copies next to them:
  card.webp (1200 wide)  ->  card-480.webp, card-800.webp
  d-01.webp (2880 wide)  ->  d-01-1440.webp   (computer screenshots)
  p-01.webp (1170 wide)  ->  p-01-585.webp    (phone screenshots)
Browsers pick the smallest copy that's still sharp on that screen, so retina laptops keep getting the full-size files.

Run it from the repo folder after adding or re-capturing a site:  python3 scripts/portfolio-sizes.py
It skips copies that are already newer than their full-size file. src/_data/pfSizes.js only uses a copy if it exists,
so a site without copies still works (it just loads the full-size files).
"""
import glob, os, re, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "img", "portfolio")
JOBS = [(r"^card\.webp$", [480, 800]), (r"^d-\d+\.webp$", [1440]), (r"^p-\d+\.webp$", [585])]

made = 0
for path in sorted(glob.glob(os.path.join(ROOT, "*", "*.webp"))):
    name = os.path.basename(path)
    for pat, widths in JOBS:
        if not re.match(pat, name):
            continue
        im = None
        for w in widths:
            out = path[:-5] + "-%d.webp" % w
            if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(path):
                continue
            im = im or Image.open(path).convert("RGB")
            h = max(1, round(im.height * w / im.width))
            im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=86, method=6)
            made += 1
print("made", made, "smaller copies")
