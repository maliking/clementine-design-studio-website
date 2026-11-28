// Which smaller copies of each portfolio picture exist (made by scripts/portfolio-sizes.py, added 11/28).
// pf-card.njk, recent-sites.njk and pf-viewer.njk only offer a smaller copy when it's really there,
// so a newly added site with only full-size files still shows (it just loads the bigger files).
import fs from "node:fs";
import path from "node:path";

const ROOT = "src/assets/img/portfolio";

export default function () {
  const out = {};
  if (!fs.existsSync(ROOT)) return out;
  for (const slug of fs.readdirSync(ROOT)) {
    const dir = path.join(ROOT, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const files = new Set(fs.readdirSync(dir));
    const all = (re, w) => {
      const full = [...files].filter((f) => re.test(f));
      return full.length > 0 && full.every((f) => files.has(f.replace(".webp", "-" + w + ".webp")));
    };
    out[slug] = {
      card: [480, 800].filter((w) => files.has("card-" + w + ".webp")),
      desktop: all(/^d-\d+\.webp$/, 1440) ? 1440 : 0,
      phone: all(/^p-\d+\.webp$/, 585) ? 585 : 0,
    };
  }
  return out;
}
