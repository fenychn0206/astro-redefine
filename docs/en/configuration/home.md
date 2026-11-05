---
title: Home and Navigation
description: Home banner, navbar, sidebar and post list.
---

## Home banner

```ts
homeBanner: {
  enable: true,
  style: 'fixed',
  image: {
    light: '/images/banner-light.webp',
    dark: '/images/banner-dark.webp',
  },
  title: 'My Blog',
  subtitle: {
    text: ['Notes and stories.', 'A simple blog.'],
    hitokoto: {
      enable: false,
      showAuthor: false,
      api: 'https://hitokoto.example.com',
    },
    typingSpeed: 100,
    backingSpeed: 80,
    startingDelay: 500,
    backingDelay: 1500,
    loop: true,
    smartBackspace: false,
  },
  textColor: { light: '#fff', dark: '#d1d1b6' },
  textStyle: {
    titleSize: '2.8rem',
    subtitleSize: '1.5rem',
    lineHeight: 1.2,
  },
  socialLinks: {
    enable: true,
    style: 'default',
    links: [
      { icon: 'github', url: 'https://social.example.com/you' },
      { icon: 'fa-solid fa-rss', url: '/rss.xml' },
    ],
    qrs: [],
  },
},
```

- `style: fixed` keeps the background fixed and applies a blur on scroll; `static` scrolls with the page.
- `title` accepts HTML and is rendered as-is.
- `subtitle.text` is used by the typewriter; hitokoto can fetch remote quotes.
- `socialLinks.style` supports `default`, `reverse` and `center`.
- `socialLinks.qrs` adds icons with QR code popups.

## Navbar

```ts
navbar: {
  autoHide: false,
  color: { left: '#f78736', right: '#367df7', transparency: 35 },
  width: { home: '1200px', pages: '1000px' },
  links: {
    Home: { path: '/', icon: 'fa-regular fa-house' },
    Archives: { path: '/archives/', icon: 'fa-regular fa-archive' },
    Docs: { path: 'https://docs.example.com', icon: 'fa-regular fa-book' },
    More: {
      icon: 'fa-regular fa-link',
      submenus: {
        Tags: '/tags/',
        Categories: '/categories/',
      },
    },
  },
  search: { enable: true, preload: true, topNPerArticle: 1 },
},
```

- Link keys are display labels and can be translated by the site language.
- `submenus` accepts a path string or `{ path, icon }`.
- External links open in a new tab automatically.
- `autoHide` hides the navbar when scrolling down.
- `search.preload` loads the search index before the first search.

## Home sidebar

```ts
home: {
  sidebar: {
    enable: true,
    position: 'left',
    firstItem: 'menu',
    announcement: 'Welcome to my blog.',
    showOnMobile: true,
    links: {
      Archives: { path: '/archives/', icon: 'fa-regular fa-archive' },
      Tags: { path: '/tags/', icon: 'fa-regular fa-tags' },
      Categories: { path: '/categories/', icon: 'fa-regular fa-folder' },
    },
  },
  articleDateFormat: 'auto',
  excerptLength: 200,
  categories: { enable: true, limit: 3 },
  tags: { enable: true, limit: 3 },
},
```

- `position`: `left` or `right`.
- `firstItem`: `menu` shows links first; `info` shows avatar and stats first.
- `showOnMobile`: include sidebar links in the mobile drawer.
- `articleDateFormat`: `auto`, `relative` or a date format string.
- `excerptLength`: maximum excerpt length on the home page.
- `categories.limit` / `tags.limit`: per-card limits; `0` means no limit.
