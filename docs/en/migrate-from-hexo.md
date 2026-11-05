---
title: Migrating from Hexo
description: Move Hexo Theme Redefine config, content and tags to Astro.
---

## Configuration

Hexo's `_config.redefine.yml` maps to `src/config.user.ts`:

| Hexo | Astro |
| --- | --- |
| `info.title` | `site.title` |
| `info.subtitle` | `site.subtitle` |
| `info.author` | `site.author` |
| `info.url` | `site.url` |
| `defaults.favicon` | `images.favicon` |
| `defaults.logo` | `images.logo` |
| `defaults.avatar` | `images.avatar` |
| `colors.primary` | `colors.primary` |
| `home_banner` | `homeBanner` |
| `navbar` | `navbar` |
| `home` | `home` |
| `articles` | `articles` |
| `comment` | `comment` |
| `footer` | `footer` |
| `plugins` | `plugins` |

Astro uses camelCase keys: `home_banner` becomes `homeBanner`, `text_color` becomes `textColor`, and so on.

## Content

Copy `source/_posts/*.md` to `src/content/posts/`. Frontmatter is mostly compatible, but check:

- `date` uses `YYYY-MM-DD HH:mm:ss`
- `tags` / `categories` are arrays
- `sticky` is a number
- images move under `public/`

## Tags

Hexo's `{% note %}`, `{% folding %}`, `{% tabs %}` and `{% btn %}` become `:::` directives. A converter is included:

```bash
node scripts/convert-hexo-tags.mjs src/content
```

Review nested blocks afterwards: `tabs` and folding blocks with nested modules need four colons on the outer block.

```md
::::tabs{name="example"}
:::tab[First]
Content
:::
:::tab[Second]
Content
:::
::::
```

## Plugin replacements

| Hexo plugin | Astro solution |
| --- | --- |
| `hexo-renderer-marked` | `@astrojs/markdown-remark` + `remark-directive` |
| `hexo-generator-index/archive/category/tag` | Astro routes and `getStaticPaths` |
| `hexo-generator-searchdb` | `src/pages/search.json.ts` |
| `hexo-generator-feed` | `@astrojs/rss` |
| `hexo-wordcount` | `src/lib/posts.ts` |
| `hexo-filter-mermaid-diagrams` | Mermaid client rendering |
| `hexo-renderer-stylus` | Compiled theme CSS + Tailwind CSS v4 |

## Post-migration checks

- Post URLs match expectations
- Categories, tags and archives are correct
- Comments have the right site name and CORS
- Search index includes posts
- RSS is reachable
