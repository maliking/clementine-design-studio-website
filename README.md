# clementinedesign.studio

Mali King's website (Clementine Design Studio), rebuilt in code off Squarespace.

## How it's built

- [Eleventy](https://www.11ty.dev/) turns the files in `src/` into a plain website in `_site/`.
- `src/_includes/base.njk` is the shared header, phone menu and footer for every page.
- `src/_data/site.json` holds the menu, footer links and the "Book a Free Consultation" link.
- `src/assets/css/site.css` holds the Direction A design (colors, type, spacing). Phone rules are in the `max-width: 760px` block near the end.
- Each page is a folder in `src/` with an `index.njk` (for example `src/services/index.njk` becomes `/services/`).

## Run it

```
npm install
npm run build   # builds _site/
npm start       # local preview at http://localhost:8080
```

## Before the site goes live

- **Search engines:** every page has `noindex` while the site is a preview. Set the environment variable `SITE_LIVE=true` on the host when the domain switches over.
- **Heading font:** the design uses IvyPresto Display (Light and Light Italic), an Adobe font. Squarespace's license doesn't carry over, so it needs a web project from Mali's own Adobe Fonts account. Until then, Instrument Serif (free, Google Fonts) stands in. To switch, add the Adobe embed `<link>` in `base.njk`; the CSS already asks for `ivypresto-display` first.
- **Photos:** the stock photos are 1080px copies. Swap in full-size Unsplash+ downloads before launch.
- **Old URLs:** every live Squarespace URL that's kept needs to keep working (blog posts, plugin posts, /99designs pages). Redirects for anything renamed go in a `_redirects` file.
- **Email:** clementinedesign.studio has Google Workspace mail records (MX, SPF, DMARC, verification TXT). Only the website records (A and www) change at the switch. The mail records must stay as they are.
