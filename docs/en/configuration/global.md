---
title: Global Settings
description: global, footer, inject and SEO options.
---

## Fonts

```ts
global: {
  fonts: {
    chinese: {
      enable: true,
      family: 'Noto Sans SC',
      url: 'https://fonts.example.com/noto-sans-sc.css',
    },
    english: { enable: false, family: 'Geist Variable' },
    title: { enable: false, family: 'Chillax-Variable' },
  },
},
```

`url` points to a font CSS file; `family` is used as the CSS font family. Chinese, English and title fonts are independent.

## Widths

```ts
global: {
  contentMaxWidth: '1000px',
  sidebarWidth: '210px',
},
```

`contentMaxWidth` controls the main content column. `sidebarWidth` controls the home sidebar and article TOC width.

## Hover effects

```ts
global: {
  hover: { shadow: true, scale: false },
},
```

- `shadow`: card and pagination hover shadows
- `scale`: slight scale on home article cards

## Reading progress

```ts
global: {
  scrollProgress: { bar: false, percentage: true },
},
```

`bar` shows a top progress bar; `percentage` shows a percentage in the bottom-right tools.

## Website counter

```ts
global: {
  websiteCounter: {
    url: 'https://counter.example.com/js',
    enable: true,
    sitePv: true,
    siteUv: true,
    postPv: true,
  },
},
```

The default is a vercount-compatible script. Disable it to skip loading any counter script.

## Single-page experience

```ts
global: {
  singlePage: true,
},
```

Uses Astro ClientRouter for navigation without full page reloads. Scripts inside articles that need to run on every navigation should listen for `astro:page-load`.

Set it to `false` for ordinary static navigation.

## Preloader

```ts
global: {
  preloader: {
    enable: false,
    customMessage: 'Loading…',
  },
},
```

Shows a full-screen text animation before the page is ready. Empty `customMessage` falls back to the site title.

## Open Graph and SEO

```ts
global: {
  openGraph: {
    enable: true,
    image: '/images/redefine-og.webp',
    description: 'My blog',
  },
},
seo: {
  openGraph: true,
  robots: 'index,follow',
},
```

`global.openGraph` controls OG tags. Article frontmatter `description` and `keywords` override site defaults.

## Google Analytics

```ts
global: {
  googleAnalytics: {
    enable: true,
    id: 'G-XXXXXXXXXX',
  },
},
```

Injects gtag.js into the head. No analytics script is loaded when disabled.

## Footer

```ts
footer: {
  runtime: true,
  icon: '<i class="fa-solid fa-heart"></i>',
  start: '2026/01/01 00:00:00',
  statistics: true,
  customize: '',
  icp: {
    enable: false,
    number: 'ICP number',
    url: 'https://beian.example.com',
  },
},
```

`runtime` shows the site uptime, `statistics` shows post and word counts, `customize` accepts raw HTML, and `icp` adds a registration link.

## Inject custom code

```ts
inject: {
  enable: true,
  head: ['<meta name="custom" content="value">'],
  footer: ['<script src="https://cdn.example.com/script.js"></script>'],
},
```

`head` is injected into `<head>` and `footer` into the footer. Only inject trusted code.
