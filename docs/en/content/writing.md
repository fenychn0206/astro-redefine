---
title: Writing Articles
description: Post location, frontmatter, images, excerpts and pages.
---

## Location

Posts live in `src/content/posts/` with a `.md` extension. The filename contributes to the slug; prefer letters, numbers and hyphens.

```text
src/content/posts/
├── hello-world.md
├── astro-markdown.md
└── 2026-review.md
```

The default post URL is:

```text
/:year/:month/:day/:slug/
```

For example, `date: 2026-11-05` and `hello-world.md` become `/2026/11/05/hello-world/`.

## Frontmatter

```yaml
---
title: Hello, Astro
date: 2026-11-05 10:00:00
updated: 2026-11-06 09:00:00
tags: [Astro, Markdown]
categories: [Notes]
thumbnail: https://img.example.com/cover.webp
description: A short description.
sticky: 10
comment: true
license: cc_by_nc_sa
---

Content starts here.
```

| Field | Type | Description |
| --- | --- | --- |
| `title` | string | Required title |
| `date` | date | Required publish date |
| `updated` | date | Last update date |
| `tags` | string[] | Tags |
| `categories` | string[] | Categories |
| `thumbnail` | string \| false | Home thumbnail; `false` hides it |
| `cover` / `banner` | string | Additional cover fields |
| `sticky` | number \| boolean | Pinned weight; larger is earlier |
| `excerpt` | string \| false | Custom excerpt; `false` hides it |
| `author` | string \| object | Override site author |
| `avatar` | string | Override author avatar |
| `license` | enum | Copyright license |
| `copyright` | string | Custom copyright HTML |
| `comment` | boolean | Show comments |
| `expires` | date | Expiry date and warning |
| `description` | string | SEO and share description |
| `keywords` | string | SEO keywords |
| `draft` | boolean | Draft posts are not built |

## Excerpts

The default excerpt is the first 200 characters. Change it with `home.excerptLength`, use `excerpt` in frontmatter, or mark the cut with `<!-- more -->`.

## Images

Place images under `public/images/` and reference them from the root:

```markdown
![Cover](/images/cover.webp)
```

Absolute URLs are also supported:

```markdown
![Cover](https://img.example.com/cover.webp)
```

Enable `articles.style.imageCaption` to show the `alt` text as a caption.

## Sticky and expiry

```yaml
sticky: 100
expires: 2026-12-31
```

Sticky posts appear first on the home page and archives. Expired posts show a warning.

## Author and license

Without an `author` field the site author is used. Override the license per post:

```yaml
license: cc_by
```

Supported: `cc_by`, `cc_by_sa`, `cc_by_nc`, `cc_by_nd`, `cc_by_nc_sa`, `all_rights_reserved`, `public_domain`.

## Standalone pages

Non-post pages live in `src/content/pages/`. Use `type` or `template` to select a template:

```yaml
---
title: About
type: page
---

Page content.
```

See [Page templates](../pages.md).
