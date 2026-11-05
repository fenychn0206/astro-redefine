---
title: 编写文章
description: 文章目录、frontmatter、图片、摘要和单页。
---

## 文件位置

文章放在 `src/content/posts/`，使用 `.md` 扩展名。文件名会参与生成 slug；推荐使用英文、数字和连字符。

```text
src/content/posts/
├── hello-world.md
├── astro-markdown.md
└── 2026-review.md
```

文章 URL 默认为：

```text
/:year/:month/:day/:slug/
```

例如 `date: 2026-11-05`、文件 `hello-world.md` 会生成 `/2026/11/05/hello-world/`。

## Frontmatter

```yaml
---
title: 你好，Astro
date: 2026-11-05 10:00:00
updated: 2026-11-06 09:00:00
tags: [Astro, Markdown]
categories: [随笔]
thumbnail: https://img.example.com/cover.webp
description: 一篇文章的简介。
sticky: 10
comment: true
license: cc_by_nc_sa
---

正文从这里开始。
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | string | 文章标题，必填 |
| `date` | date | 发布时间，必填 |
| `updated` | date | 更新时间 |
| `tags` | string[] | 标签 |
| `categories` | string[] | 分类 |
| `thumbnail` | string \| false | 首页缩略图，`false` 不显示 |
| `cover` / `banner` | string | 文章封面备用字段 |
| `sticky` | number \| boolean | 置顶权重，数字越大越靠前 |
| `excerpt` | string \| false | 自定义摘要，`false` 不显示摘要 |
| `author` | string \| object | 覆盖站点作者 |
| `avatar` | string | 覆盖作者头像 |
| `license` | enum | 版权协议 |
| `copyright` | string | 自定义版权 HTML，优先级最高 |
| `comment` | boolean | 是否显示评论 |
| `expires` | date | 文章过期时间，过期后显示提示 |
| `description` | string | SEO 描述与分享摘要 |
| `keywords` | string | SEO 关键词 |
| `draft` | boolean | 草稿不会生成页面 |

## 摘要

默认截取正文前 200 个字符，`home.excerptLength` 可以修改。也可以在 frontmatter 中设置：

```yaml
excerpt: 这是自定义摘要。
```

或者在正文中使用 `<!-- more -->` 标记摘要结束位置。

## 图片

图片放在 `public/images/`，引用时使用根路径：

```markdown
![封面](/images/cover.webp)
```

也可以使用完整地址：

```markdown
![封面](https://img.example.com/cover.webp)
```

`articles.style.imageCaption` 开启后，图片的 `alt` 会作为图注显示。

## 置顶与过期

```yaml
sticky: 100
expires: 2026-12-31
```

置顶文章会排在首页和归档前面；过期文章会显示“内容可能已过时”的提示。

## 作者与版权

不设置 `author` 时使用 `site.author`。版权协议可以按文章覆盖：

```yaml
license: cc_by
```

支持 `cc_by`、`cc_by_sa`、`cc_by_nc`、`cc_by_nd`、`cc_by_nc_sa`、`all_rights_reserved`、`public_domain`。

## 独立页面

非文章页面放在 `src/content/pages/`，使用 `type` 或 `template` 选择模板：

```yaml
---
title: 关于
type: page
---

这里是页面内容。
```

可用模板见[页面模板](../pages.md)。
