/* ============================================================
   blog.js — shared behaviour for every page under /blog/

   Mirrors the JavaScript in index.html (theme, language, nav drawer,
   scroll progress, reveal, back-to-top) and adds the blog-only bits:
   tag filtering, table of contents, heading anchors, reading time,
   localised dates and share buttons.

   Vanilla JS, no dependencies. Everything here is progressive
   enhancement — the pages read fine with JavaScript switched off.
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     Theme toggle — shares the 'theme' localStorage key with index.html,
     so the choice carries across the whole site.
     ============================================================ */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ============================================================
     Article structure — heading ids, hover anchors, table scrollers
     and the table of contents.

     This runs before the language setup because applyLang() needs to
     know about the anchors and the ToC in order to keep them in sync.
     ============================================================ */
  var prose = document.querySelector('.prose');
  var tocEntries = [];   // { link, heading } pairs, refreshed on language change

  if (prose) {
    var slugify = function (s) {
      return s.toLowerCase()
        .replace(/[äöüß]/g, function (c) { return { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }[c]; })
        .replace(/[^\w\s-]/g, '')
        .trim().replace(/\s+/g, '-');
    };

    var used = {};
    prose.querySelectorAll('h2, h3').forEach(function (h) {
      if (!h.id) {
        var base = slugify(h.textContent) || 'section';
        used[base] = (used[base] || 0) + 1;
        h.id = used[base] > 1 ? base + '-' + used[base] : base;
      }
      var a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + h.id;
      a.textContent = '#';
      a.setAttribute('aria-label', 'Link to this section');
      h.appendChild(a);
    });

    // Build the ToC only when the post has enough top-level sections to
    // make one worth reading; otherwise drop the container entirely.
    var toc = document.getElementById('toc');
    if (toc) {
      var h2s = prose.querySelectorAll('h2');
      if (h2s.length >= 3) {
        var ol = document.createElement('ol');
        h2s.forEach(function (h) {
          var li = document.createElement('li');
          var link = document.createElement('a');
          link.href = '#' + h.id;
          li.appendChild(link);
          ol.appendChild(li);
          tocEntries.push({ link: link, heading: h });
        });
        toc.appendChild(ol);
      } else {
        toc.remove();
      }
    }

    // Wide tables get their own horizontal scroller so the page body
    // never scrolls sideways on a phone.
    prose.querySelectorAll('table').forEach(function (table) {
      if (table.parentElement.classList.contains('table-scroll')) return;
      var box = document.createElement('div');
      box.className = 'table-scroll';
      table.parentNode.insertBefore(box, table);
      box.appendChild(table);
    });
  }

  // An element's own text, ignoring any "#" anchor appended above.
  function headingText(h) {
    var out = '';
    for (var i = 0; i < h.childNodes.length; i++) {
      var n = h.childNodes[i];
      if (n.nodeType === 1 && n.classList && n.classList.contains('anchor')) continue;
      out += n.textContent;
    }
    return out.trim();
  }

  function refreshToc() {
    tocEntries.forEach(function (e) { e.link.textContent = headingText(e.heading); });
  }

  /* ============================================================
     Language toggle (EN / DE)

     Same contract as index.html: English lives in the markup,
     data-i18n swaps textContent and data-i18n-html swaps innerHTML.
     The strings below cover the blog chrome (nav, labels, buttons).

     A post can add its own German by defining BLOG_I18N_DE on the page
     BEFORE this script loads — see _template.html. Keys with no
     translation simply stay in English.
     ============================================================ */
  var I18N_DE = {
    'skip': 'Zum Inhalt springen',

    'nav.about': 'Über mich',
    'nav.experience': 'Erfahrung',
    'nav.skills': 'Kompetenzen',
    'nav.projects': 'Projekte',
    'nav.blog': 'Blog',
    'nav.certs': 'Zertifizierungen',
    'nav.education': 'Ausbildung',
    'nav.contact': 'Kontakt',

    'blog.eyebrow': 'Notizen & Gedanken',
    'blog.h1': 'Blog',
    'blog.lead': 'Gedanken zu Produktmanagement, SaaS und dem, was ich unterwegs lerne.',
    'blog.subscribe': 'Per RSS abonnieren',
    'blog.home': 'Zurück zur Startseite',
    'blog.filter': 'Filter',
    'blog.all': 'Alle',
    'blog.empty': 'Zu diesem Thema gibt es noch keine Beiträge — probieren Sie einen anderen Filter.',
    'blog.readMore': 'Weiterlesen',
    'blog.back': 'Zurück zum Blog',
    'blog.toc': 'Inhalt',
    'blog.share': 'Teilen',
    'blog.prev': 'Vorheriger Beitrag',
    'blog.next': 'Nächster Beitrag',
    'blog.cta.h2': 'Lassen Sie uns im Gespräch bleiben',
    'blog.cta.p': 'Wenn Sie hier etwas anspricht, freue ich mich aufrichtig über Ihre Nachricht.',
    'blog.cta.btn': 'Kontakt aufnehmen',

    'footer.note': 'Faizan Zafar · Product Manager, München · Erstellt mit HTML, CSS & JavaScript.'
  };

  // Merge in any post-specific German supplied by the page itself.
  if (window.BLOG_I18N_DE) {
    Object.keys(window.BLOG_I18N_DE).forEach(function (k) { I18N_DE[k] = window.BLOG_I18N_DE[k]; });
  }

  // Strings JavaScript builds at runtime, so they can't sit in the markup.
  var RUNTIME = {
    en: { minRead: 'min read', copy: 'Copy link', copied: 'Link copied!', linkedin: 'Share on LinkedIn', mail: 'Share by email' },
    de: { minRead: 'Min. Lesezeit', copy: 'Link kopieren', copied: 'Link kopiert!', linkedin: 'Auf LinkedIn teilen', mail: 'Per E-Mail teilen' }
  };

  var langToggle = document.getElementById('langToggle');
  var langCode = document.getElementById('langCode');
  var i18nEls = document.querySelectorAll('[data-i18n], [data-i18n-html]');

  // Capture the original English once so we can restore it. Headings may
  // already carry an appended "#" anchor, so read around it.
  i18nEls.forEach(function (el) {
    if (el.hasAttribute('data-i18n-html')) {
      var anchor = el.querySelector('.anchor');
      if (anchor) anchor.remove();
      el._en = el.innerHTML;
      if (anchor) el.appendChild(anchor);
    } else {
      el._en = headingText(el);
    }
  });

  var currentLang = 'en';
  var LANG_TAG = { en: 'en-GB', de: 'de-DE' };

  function t(key) { return RUNTIME[currentLang][key] || RUNTIME.en[key]; }

  function applyLang(lang) {
    currentLang = lang === 'de' ? 'de' : 'en';
    root.setAttribute('lang', LANG_TAG[currentLang]);

    i18nEls.forEach(function (el) {
      var isHtml = el.hasAttribute('data-i18n-html');
      var key = el.getAttribute(isHtml ? 'data-i18n-html' : 'data-i18n');
      var val = currentLang === 'de' ? I18N_DE[key] : el._en;
      if (val == null) return;
      // Swapping content wipes the children, so lift the "#" anchor out
      // first and put it back afterwards.
      var anchor = el.querySelector('.anchor');
      if (anchor) anchor.remove();
      if (isHtml) el.innerHTML = val; else el.textContent = val;
      if (anchor) el.appendChild(anchor);
    });

    if (langCode) langCode.textContent = currentLang === 'de' ? 'EN' : 'DE';
    if (langToggle) langToggle.setAttribute('aria-label', currentLang === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten');

    refreshToc();
    renderDates();
    renderReadTimes();
    labelShareButtons();
  }

  /* ---- Dates: the single source of truth is the <time datetime>
          attribute, formatted for whichever language is active. ---- */
  function renderDates() {
    document.querySelectorAll('time[datetime][data-date]').forEach(function (el) {
      var iso = el.getAttribute('datetime');
      // Midday avoids the date slipping a day across time zones.
      var d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso);
      if (isNaN(d.getTime())) return;
      try {
        el.textContent = d.toLocaleDateString(LANG_TAG[currentLang], { day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) {}
    });
  }

  /* ---- Reading time: taken from data-read-time where the markup states
          it (post cards), otherwise counted from the article body. ---- */
  var proseWords = null;
  function wordCount() {
    if (proseWords === null) {
      proseWords = prose ? (prose.textContent.trim().match(/\S+/g) || []).length : 0;
    }
    return proseWords;
  }
  function renderReadTimes() {
    document.querySelectorAll('[data-read-time]').forEach(function (el) {
      var stated = parseInt(el.getAttribute('data-read-time'), 10);
      var mins = stated > 0 ? stated : Math.max(1, Math.round(wordCount() / 220));
      el.textContent = mins + ' ' + t('minRead');
    });
  }

  /* ============================================================
     Share buttons (post pages). Declared before applyLang runs so it
     can label them, wired up further down.
     ============================================================ */
  var shareLinkedIn = document.getElementById('shareLinkedIn');
  var shareMail = document.getElementById('shareMail');
  var shareCopy = document.getElementById('shareCopy');
  var canonical = document.querySelector('link[rel="canonical"]');
  var pageUrl = canonical ? canonical.href : location.href;

  function labelShareButtons() {
    if (shareLinkedIn) shareLinkedIn.setAttribute('aria-label', t('linkedin'));
    if (shareMail) shareMail.setAttribute('aria-label', t('mail'));
    if (shareCopy && !shareCopy.classList.contains('copied')) {
      shareCopy.setAttribute('aria-label', t('copy'));
      shareCopy.setAttribute('data-tip', t('copy'));
    }
  }

  var storedLang;
  try { storedLang = localStorage.getItem('lang'); } catch (e) {}
  applyLang(storedLang || ((navigator.language || '').toLowerCase().indexOf('de') === 0 ? 'de' : 'en'));

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = currentLang === 'de' ? 'en' : 'de';
      applyLang(next);
      try { localStorage.setItem('lang', next); } catch (e) {}
    });
  }

  if (shareLinkedIn) shareLinkedIn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(pageUrl);
  if (shareMail) shareMail.href = 'mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(pageUrl);

  if (shareCopy) {
    var copyTimer;
    shareCopy.addEventListener('click', function () {
      var done = function () {
        shareCopy.setAttribute('data-tip', t('copied'));
        shareCopy.classList.add('copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function () {
          shareCopy.classList.remove('copied');
          shareCopy.setAttribute('data-tip', t('copy'));
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pageUrl).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = pageUrl;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  /* ============================================================
     Mobile menu
     ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navBackdrop = document.getElementById('navBackdrop');
  var hamIcon = document.getElementById('hamIcon');
  if (hamburger && navLinks && navBackdrop && hamIcon) {
    var openPath = 'M18 6 6 18M6 6l12 12';
    var closedPath = 'M3 6h18M3 12h18M3 18h18';
    var setMenu = function (open) {
      navLinks.classList.toggle('open', open);
      navBackdrop.classList.toggle('show', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamIcon.innerHTML = '<path d="' + (open ? openPath : closedPath) + '"/>';
    };
    hamburger.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    navBackdrop.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); hamburger.focus(); }
    });
    var desktopNav = window.matchMedia('(min-width: 1081px)');
    var onNavBreak = function () { if (desktopNav.matches) setMenu(false); };
    if (desktopNav.addEventListener) desktopNav.addEventListener('change', onNavBreak);
    else if (desktopNav.addListener) desktopNav.addListener(onNavBreak);
  }

  /* ============================================================
     Sticky header shadow + reading progress + back-to-top
     ============================================================ */
  var header = document.getElementById('header');
  var scrollProgress = document.getElementById('scrollProgress');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 12);
    if (scrollProgress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (max > 0 ? Math.min((y / max) * 100, 100) : 0) + '%';
    }
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ============================================================
     Scroll reveal
     ============================================================ */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ============================================================
     Listing page: tag filter

     Cards carry data-tags="product,career"; buttons carry data-tag.
     The chosen tag also goes in the URL hash, so a filtered view can be
     linked to (the #tag= links in each post's footer do exactly that).
     ============================================================ */
  var tagBtns = document.querySelectorAll('.tag-btn');
  if (tagBtns.length) {
    var cards = document.querySelectorAll('.post-card');
    var emptyState = document.querySelector('.empty-state');

    var filterBy = function (tag) {
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(',').map(function (s) { return s.trim(); });
        var match = tag === 'all' || tags.indexOf(tag) !== -1;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      tagBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-tag') === tag ? 'true' : 'false');
      });
      if (emptyState) emptyState.classList.toggle('show', shown === 0);
    };

    tagBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-tag');
        filterBy(tag);
        // Replace rather than push, so Back leaves the blog instead of
        // walking through every filter the visitor tried.
        history.replaceState(null, '', tag === 'all' ? location.pathname : '#tag=' + tag);
      });
    });

    var fromHash = (location.hash.match(/^#tag=(.+)$/) || [])[1];
    filterBy(fromHash ? decodeURIComponent(fromHash) : 'all');
  }
})();
