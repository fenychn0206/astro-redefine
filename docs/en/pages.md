---
title: Page Templates
description: Archives, categories, tags, friends, essays, masonry, bookmarks and 404.
---

## Generated routes

| Route | Content |
| --- | --- |
| `/` | Home post list |
| `/page/:page/` | Home pagination |
| `/archives/` | Posts grouped by year |
| `/categories/` | Category index |
| `/categories/:slug/` | Category posts |
| `/tags/` | Tag index |
| `/tags/:slug/` | Tag posts |
| `/rss.xml` | RSS feed |
| `/search.json` | Local search index |

Post URLs use `/:year/:month/:day/:slug/`.

## Standalone pages

Create Markdown files in `src/content/pages/`. The route is `/:slug/`; choose a template with `type` or `template`:

```yaml
---
title: Friends
type: links
comment: true
---
```

| Template | Purpose |
| --- | --- |
| `page` | Standard Markdown page |
| `links` | Friend links |
| `essays` | Short posts / shuoshuo |
| `masonry` | Masonry gallery |
| `bookmarks` | Bookmark directory |

## Friends

Data lives in `src/data/friends.json`:

```json
[
  {
    "name": "Example Blog",
    "url": "https://friend.example.com",
    "avatar": "https://img.example.com/avatar.webp"
  }
]
```

If `description` is missing, the link hostname is shown as the subtitle. `pageTemplates.friendsColumn` controls the column count (`2` or `3`).

Refresh the vendored data with:

```bash
node scripts/fetch-friends.mjs
```

You can also add a pnpm script and run `pnpm run friends:sync`.

## Essays

Data lives in `src/data/essays.yml`:

```yaml
- content: Wrote new theme docs today.
  date: 2026-11-05 10:00:00
```

Content supports Markdown and the date is formatted for the current locale.

## Masonry

Data lives in `src/data/masonry.yml`:

```yaml
- image: https://img.example.com/photo-1.webp
  title: Mountains
  description: Morning mist
```

The template uses CSS columns and the image viewer. Batch settings live in `pageTemplates.masonry`.

## Bookmarks

Data lives in `src/data/bookmarks.yml`:

```yaml
- category: Tools
  icon: fa-toolbox
  items:
    - name: Example
      link: https://tool.example.com
      description: An example tool
      image: https://img.example.com/tool.webp
```

## 404

`src/pages/404.astro` renders the themed 404 page. Point your static host's 404 route to `dist/404.html`.

## Comments

Set `comment: true` in a page's frontmatter to enable comments. Posts inherit `comment.enable` and can opt out with `comment: false`.
