---
title: Configuration Overview
description: User config, default config, merge rules and basic site settings.
---

## Config files

```text
src/config.user.ts     # user configuration; edit this file
src/config.default.ts  # theme defaults and types
src/config.ts          # deep-merge entry point
```

`src/config.user.ts` only needs the values you want to override:

- Plain objects are merged recursively.
- Arrays are replaced, including navigation, social links and gallery data.
- Missing fields use the defaults from `src/config.default.ts`.

Components read the merged object:

```ts
import config from '../config';

config.site.title;
config.colors.primary;
config.articles.toc;
```

## Groups

| Group | Purpose |
| --- | --- |
| `site` | Title, description, author, language, URL, pagination |
| `images` | Favicon, logo, avatar, Open Graph image |
| `colors` | Primary color, default color mode |
| `global` | Fonts, content width, single-page mode, preloader, analytics |
| `homeBanner` | Home banner, title, subtitle, social links |
| `navbar` | Navigation, colors, search |
| `home` | Home sidebar, excerpt, category / tag display |
| `articles` | Typography, TOC, code blocks, copyright, recommendations |
| `comment` | Artalk, Waline, Giscus and other comment systems |
| `footer` | Runtime, statistics, ICP |
| `plugins` | RSS, Mermaid, APlayer |
| `pageTemplates` | Friends columns, tag style, masonry batch size |
| `seo` | Robots and Open Graph |

## Site

```ts
// src/config.user.ts
site: {
  title: 'My Blog',
  subtitle: 'Notes and stories',
  description: 'A blog built with Astro.',
  keywords: 'Astro, blog, Markdown',
  author: 'Your Name',
  language: 'en',
  timezone: 'UTC',
  url: 'https://blog.example.com',
  base: '/',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
  postsPerPage: 10,
},
```

`site.url` is used for canonical URLs, Open Graph, RSS and copyright links. `site.base` should only change when deploying under a sub-path.

## Images and colors

```ts
images: {
  favicon: '/images/redefine-favicon.svg',
  logo: '/images/redefine-favicon.svg',
  avatar: '/images/redefine-avatar.svg',
  og: '/images/redefine-og.webp',
},
colors: {
  primary: '#0066CC',
  defaultMode: 'light',
},
```

`primary` affects links, buttons, progress bars and hover states. `defaultMode` is `light` or `dark`; manual user choice is stored in the browser.

## Font Awesome

```ts
fontawesome: {
  thin: true,
  light: true,
  duotone: true,
  sharpSolid: false,
},
```

`solid`, `regular` and `brands` are always enabled. The remaining styles are opt-in to keep the font payload small.

## Next

- [Global settings](./global.md)
- [Home and navigation](./home.md)
- [Articles](./articles.md)
- [Comments](./comments.md)
