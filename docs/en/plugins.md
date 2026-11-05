---
title: Plugins and Extensions
description: Search, RSS, Mermaid, APlayer, image viewer and ClientRouter.
---

## Local search

The build generates `/search.json`; no extra plugin is needed. Enable the navbar search:

```ts
navbar: {
  search: { enable: true, preload: true, topNPerArticle: 1 },
},
```

Search matches titles and body text and highlights the query.

## RSS

When `feed` is enabled, `/rss.xml` is generated:

```ts
plugins: {
  feed: { enable: true },
},
```

The feed includes titles, excerpts, dates, categories and tags.

## Mermaid

```ts
plugins: {
  mermaid: {
    enable: true,
    version: '11.4.1',
    theme: { light: 'default', dark: 'dark' },
  },
},
```

Use a `mermaid` code fence in Markdown. The library is loaded only on pages with diagrams.

## APlayer

```ts
plugins: {
  aplayer: {
    enable: true,
    type: 'mini',
    audios: [
      {
        name: 'Example Song',
        artist: 'Example Artist',
        url: 'https://audio.example.com/song.mp3',
        cover: 'https://img.example.com/cover.webp',
      },
    ],
  },
},
```

`type` supports `mini` and `fixed`. Audio URLs must be direct browser-accessible files.

## Image viewer

Images in articles, galleries and essays automatically use the image viewer:

- Click to open
- Previous / next
- `Esc` to close
- `Ctrl` + wheel to zoom
- EXIF panel for gallery images

## Pangu

```ts
articles: {
  pangu: true,
},
```

Adds spacing between CJK and Latin text. Enabled by default.

## Single-page navigation

```ts
global: {
  singlePage: true,
},
```

Uses Astro ClientRouter for navigation without full reloads. Scripts inside articles can listen for:

```js
document.addEventListener('astro:page-load', () => {
  // initialize your script
});
```

## Not built in

Article encryption and math rendering are not included by default. They can be added through Astro Markdown plugins or custom client scripts.
