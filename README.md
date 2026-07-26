# Faizan Zafar — Portfolio

This is my personal portfolio. I'm Faizan Zafar, a Product Manager based in Munich, Germany,
and this site is where I share my experience, projects, and certifications.
It lives at **<https://faizanzafar.de>**.

The homepage is a single, self-contained `index.html` (HTML + CSS + vanilla JS), and the blog is
a small set of static pages beside it — no build step, no framework, no dependencies beyond one
external Google Font.

## Features

- 🎨 Modern UI — gradient hero, glassmorphism navbar, scroll-reveal animations, animated stats
- 🌗 Light & dark mode — respects your system preference, remembers your choice, no flash on load
- 🌍 Bilingual — English and German, toggled in the navbar, remembered across pages
- ✍️ Blog — static per-post pages with tag filtering, auto table of contents, RSS feed
- 📱 Fully responsive — mobile drawer nav, fluid type, works phone → desktop
- ♿ Accessible — semantic HTML, ARIA labels, honours `prefers-reduced-motion`
- ⚡ Fast & dependency-free — only an external Google Font; everything else is local

## Project structure

```
faizanzafar40.github.io/
├── index.html            ← the homepage (HTML + CSS + JS, all inline)
├── blog/
│   ├── index.html        ← the post listing, with tag filter
│   ├── _template.html    ← the template I copy to start a new post
│   ├── hello-world.html  ← a post
│   └── feed.xml          ← hand-maintained RSS feed
├── assets/
│   ├── blog.css          ← styles shared by every page under /blog/
│   ├── blog.js           ← behaviour shared by every page under /blog/
│   ├── me.png            ← my profile photo
│   ├── Resume_Zafar.pdf  ← my downloadable résumé
│   └── favicon.svg       ← "FZ" monogram favicon
├── sitemap.xml
├── CNAME                 ← custom domain (faizanzafar.de)
├── robots.txt
└── .nojekyll             ← tells GitHub Pages to serve files as-is
```

The homepage is organised into sections: **about**, **experience**, **skills**, **projects**,
**certifications**, **education**, and **contact**.

## The blog

The homepage keeps its CSS and JS inline because it is one self-contained page. The blog is many
pages, so its shared styles and behaviour live in `assets/blog.css` and `assets/blog.js` instead
of being copy-pasted into every post. The design tokens at the top of `blog.css` are deliberately
identical to the ones in `index.html` — **if I change an accent colour in one, I change it in both**.

`blog.js` handles the things I would otherwise have to maintain by hand:

| Written by me | Handled automatically |
| --- | --- |
| `<time datetime="2026-07-26">` | Formatted as `26 July 2026` / `26. Juli 2026` |
| Section headings (`h2`, `h3`) | `id`s, hover anchor links, and the table of contents |
| The article body | Reading time, from the word count |
| `<link rel="canonical">` | The share links (LinkedIn, email, copy link) |
| `data-tags` on a post card | Tag filtering, including linkable `#tag=` URLs |

Everything is progressive enhancement — the pages read fine with JavaScript switched off.

### Adding a post

1. Copy `blog/_template.html` to `blog/<slug>.html` and fill in the `{{PLACEHOLDER}}`s. Remember
   to delete the `noindex` meta tag and the demo "kitchen sink" content.
2. Add a card at the top of the post list in `blog/index.html`. Its `data-read-time` is the one
   number that has to be written by hand — the listing has no article body to count.
3. Add an `<item>` at the top of `blog/feed.xml` (RFC-822 date) and a `<url>` to `sitemap.xml`.
4. If the post introduces a new tag, add a matching button to the filter bar in `blog/index.html`.
5. Add the `.post-nav` block from the template to the previous post so the two link to each other.

### Translating a post

The blog chrome (nav, labels, buttons) is translated in the `I18N_DE` object inside `blog.js`.
A post translates its own copy by defining `window.BLOG_I18N_DE` **before** `blog.js` loads, then
tagging elements with `data-i18n="post.x"` for plain text or `data-i18n-html="post.x"` for markup —
the same convention `index.html` uses. Anything without a matching key simply stays in English.
`blog/hello-world.html` is a worked example.

## Run locally

I serve it rather than opening the file directly, so the relative paths and `/blog/` URLs behave
the way they do in production:

```bash
# Python
python -m http.server 8080
# then visit http://localhost:8080 — and http://localhost:8080/blog/
```

## Deploy

The site is served via **GitHub Pages** from this repository, with `faizanzafar.de` set as the
custom domain through the `CNAME` file. The included `.nojekyll` ensures the static files are
served untouched.

## Editing

- **Content:** all of my copy lives directly in the HTML body — I search for the section I want
  (`about`, `experience`, `certs`, etc.) and edit in place.
- **Accent colour / theme:** I edit the CSS variables under `:root` and `[data-theme="dark"]`
  at the top of `index.html` — and the matching block at the top of `assets/blog.css`.
- **Blog:** see [The blog](#the-blog) above.
