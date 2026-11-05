---
title: Getting Started
description: Install, run and deploy Redefine for Astro.
---

## Requirements

- Node.js `>= 22`
- npm, pnpm or yarn

## Install

```bash
git clone https://github.example.com/you/astro-redefine.git
cd astro-redefine
npm install
```

## Development

```bash
npm run dev
```

The default URL is <http://localhost:4321>. The dev server supports hot updates.

## Build

```bash
npm run build
npm run preview
```

The output is written to `dist/` and can be hosted on any static file service.

## Where configuration lives

| File | Purpose |
| --- | --- |
| `src/config.user.ts` | Site-specific configuration; edit this file |
| `src/config.default.ts` | Theme defaults and TypeScript types |
| `src/config.ts` | Deep-merge entry point |

Only edit `src/config.user.ts`. Anything you omit falls back to the defaults.

```ts
// src/config.user.ts
const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: 'My Blog',
    author: 'Your Name',
    url: 'https://blog.example.com',
  },
  colors: {
    primary: '#0066CC',
  },
};
```

See [Configuration](./configuration/index.md) for details.

## First post

Create a Markdown file in `src/content/posts/`:

```markdown
---
title: Hello, Astro
date: 2026-11-05 10:00:00
tags: [Astro, Markdown]
categories: [Notes]
description: My first post.
---

Content starts here.
```

The post is published at `/:year/:month/:day/:slug/` and appears in the home page, archives, categories, tags and search index.

## Project structure

```text
src/
├── config.user.ts
├── config.default.ts
├── config.ts
├── content.config.ts
├── content/
│   ├── posts/
│   └── pages/
├── data/
├── components/
├── layouts/
├── lib/
├── pages/
├── plugins/
├── scripts/
└── styles/
```

Continue with [Configuration](./configuration/index.md), [Writing](./content/writing.md) and [Markdown](./content/markdown.md).
