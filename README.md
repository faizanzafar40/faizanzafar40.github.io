# Faizan Zafar — Portfolio

A modern, responsive personal portfolio for **Faizan Zafar**, Product Manager (Munich, Germany).
Built as a single, self-contained `index.html` (HTML + CSS + vanilla JS) — no build step, no framework.

## Features

- 🎨 Modern UI — gradient hero, glassmorphism navbar, scroll-reveal animations, animated stats
- 🌗 Light & dark mode — respects your system preference, remembers your choice, no flash on load
- 📱 Fully responsive — mobile drawer nav, fluid type, works phone → desktop
- ♿ Accessible — semantic HTML, ARIA labels, honors `prefers-reduced-motion`
- ⚡ Fast & dependency-free — only an external Google Font; everything else is inline

## Content sources

All content is drawn solely from the provided materials: `main.tex` / `Resume_Zafar.pdf`,
the photo `me.png`, and the existing site at <https://faizanzafar.de>.

## Project structure

```
portfolio/
├── index.html            ← the entire site
├── assets/
│   ├── me.png            ← profile photo
│   ├── Resume_Zafar.pdf  ← downloadable résumé
│   └── favicon.svg       ← "FZ" monogram favicon
├── netlify.toml          ← Netlify config (static, with headers)
├── robots.txt
└── .nojekyll             ← tells GitHub Pages to serve files as-is
```

## Run locally

Just open `index.html` in a browser. Or serve it (recommended, so relative paths behave like production):

```bash
# Python
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

### Netlify
1. Drag-and-drop this `portfolio` folder onto <https://app.netlify.com/drop>, **or**
2. Connect the repo and set **publish directory** to this folder. No build command needed.

### GitHub Pages
1. Push these files to a repository (e.g. the contents at the repo root, or a `/docs` folder).
2. In **Settings → Pages**, choose the branch and folder. The included `.nojekyll` ensures the
   static files are served untouched.
3. To use a custom domain (e.g. `faizanzafar.de`), add a `CNAME` file containing your domain.

## Customizing

- **Accent color / theme:** edit the CSS variables under `:root` and `[data-theme="dark"]`
  at the top of `index.html` (`--accent`, `--accent-2`, `--accent-grad`, …).
- **Content:** all copy lives directly in the HTML body — search for the section you want
  (`EXPERIENCE`, `CERTIFICATIONS`, etc.) and edit in place.
