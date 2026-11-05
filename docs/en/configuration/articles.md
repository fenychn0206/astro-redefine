---
title: Article Settings
description: Typography, TOC, code blocks, copyright and recommendations.
---

## Typography

```ts
articles: {
  style: {
    fontSize: '16px',
    lineHeight: 1.5,
    imageBorderRadius: '14px',
    imageAlignment: 'center',
    imageCaption: false,
    linkIcon: true,
    deleteMask: false,
    titleAlignment: 'left',
    headingsTopSpacing: {
      h1: '3.2rem',
      h2: '2.4rem',
      h3: '1.9rem',
      h4: '1.6rem',
      h5: '1.4rem',
      h6: '1.3rem',
    },
  },
},
```

- `imageCaption`: turn image `alt` into a `<figcaption>`.
- `linkIcon`: append an arrow icon to external links.
- `deleteMask`: hide `<del>` content until hover.
- `titleAlignment`: `left` or `center`.

## Word count and reading time

```ts
articles: {
  wordCount: { enable: true, count: true, min2read: true },
},
```

Counts both CJK characters and Latin words; reading time assumes roughly 300 words per minute.

## Author label

```ts
articles: {
  authorLabel: {
    enable: true,
    auto: false,
    list: ['Lv1', 'Lv2', 'Lv3'],
  },
},
```

`auto: true` derives the level from post count. Otherwise the list is used in order.

## Code blocks

```ts
articles: {
  codeBlock: {
    copy: true,
    style: 'mac',
    highlightTheme: { light: 'github-light', dark: 'github-dark' },
    font: {
      enable: false,
      family: 'Geist Mono',
      url: 'https://fonts.example.com/mono.css',
    },
  },
},
```

- `style`: `mac` shows window dots and a language label; `simple` uses a compact container.
- `copy`: show the copy button.
- `highlightTheme`: Shiki themes.
- `font`: custom code font.

## Table of contents

```ts
articles: {
  toc: {
    enable: true,
    maxDepth: 3,
    number: false,
    expand: true,
    initOpen: true,
  },
},
```

`maxDepth` limits heading depth, `number` adds numbering, `expand` opens child lists, and `initOpen` opens the TOC on first load. The TOC is hidden on mobile.

## Copyright

```ts
articles: {
  copyright: {
    enable: true,
    default: 'cc_by_nc_sa',
  },
},
```

Available licenses: `cc_by`, `cc_by_sa`, `cc_by_nc`, `cc_by_nd`, `cc_by_nc_sa`, `all_rights_reserved`, `public_domain`. Article frontmatter `license` and `copyright` override the default.

## Lazy loading and Pangu

```ts
articles: {
  lazyload: true,
  pangu: true,
},
```

`lazyload` uses native lazy loading. `pangu` inserts spacing between CJK and Latin text.

## Related posts

```ts
articles: {
  recommendation: {
    enable: true,
    title: 'Related Posts',
    limit: 3,
    mobileLimit: 2,
    placeholder: '/images/placeholder.webp',
    skipDirs: [],
  },
},
```

Recommendations are based on shared tags and categories. Path prefixes in `skipDirs` are excluded.

See [Comments](./comments.md) for the comment system.
