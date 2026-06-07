# Faizan Zafar — Portfolio

This is my personal portfolio. I'm Faizan Zafar, a Product Manager based in Munich, Germany,
and this site is where I share my experience, projects, and certifications.
It lives at **<https://faizanzafar.de>**.

I built it as a single, self-contained `index.html` (HTML + CSS + vanilla JS) — no build step,
no framework, no dependencies beyond one external Google Font.

## Features

- 🎨 Modern UI — gradient hero, glassmorphism navbar, scroll-reveal animations, animated stats
- 🌗 Light & dark mode — respects your system preference, remembers your choice, no flash on load
- 📱 Fully responsive — mobile drawer nav, fluid type, works phone → desktop
- ♿ Accessible — semantic HTML, ARIA labels, honors `prefers-reduced-motion`
- ⚡ Fast & dependency-free — only an external Google Font; everything else is inline

## Project structure

```
faizanzafar40.github.io/
├── index.html            ← the entire site (HTML + CSS + JS)
├── assets/
│   ├── me.png            ← my profile photo
│   ├── Resume_Zafar.pdf  ← my downloadable résumé
│   └── favicon.svg       ← "FZ" monogram favicon
├── CNAME                 ← custom domain (faizanzafar.de)
├── robots.txt
└── .nojekyll             ← tells GitHub Pages to serve files as-is
```

The page is organized into sections: **about**, **experience**, **skills**, **projects**,
**certifications**, **education**, and **contact**.

## Run locally

I can just open `index.html` in a browser. Or serve it (so relative paths behave like production):

```bash
# Python
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

The site is served via **GitHub Pages** from this repository, with `faizanzafar.de` set as the
custom domain through the `CNAME` file. The included `.nojekyll` ensures the static files are
served untouched.

## Editing

- **Content:** all of my copy lives directly in the HTML body — I search for the section I want
  (`about`, `experience`, `certs`, etc.) and edit in place.
- **Accent color / theme:** I edit the CSS variables under `:root` and `[data-theme="dark"]`
  at the top of `index.html` (`--accent`, `--accent-2`, `--accent-grad`, …).
