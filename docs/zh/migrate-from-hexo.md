---
title: 从 Hexo 迁移
description: 把 Hexo Theme Redefine 的配置、内容和标签迁移到 Astro。
---

## 配置迁移

Hexo 的 `_config.redefine.yml` 对应 `src/config.user.ts`。主要映射：

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

Astro 使用 camelCase 字段名；例如 `home_banner` 变为 `homeBanner`，`text_color` 变为 `textColor`。

## 内容迁移

把 `source/_posts/*.md` 复制到 `src/content/posts/`。frontmatter 字段基本兼容，但建议检查：

- `date` 使用 `YYYY-MM-DD HH:mm:ss`
- `tags` / `categories` 是数组
- `sticky` 使用数字
- 图片路径改到 `public/` 下

## 标签语法

Hexo 的 `{% note %}`、`{% folding %}`、`{% tabs %}`、`{% btn %}` 需要改成 `:::` 指令。仓库提供了转换脚本：

```bash
node scripts/convert-hexo-tags.mjs src/content
```

转换后需要检查嵌套模块：`tabs` 和包含子模块的 `folding` 外层使用四个冒号。

```md
::::tabs{name="example"}
:::tab[第一项]
内容
:::
:::tab[第二项]
内容
:::
::::
```

## Hexo 插件替代

| Hexo 插件 | Astro 方案 |
| --- | --- |
| `hexo-renderer-marked` | `@astrojs/markdown-remark` + `remark-directive` |
| `hexo-generator-index/archive/category/tag` | Astro 文件路由与 `getStaticPaths` |
| `hexo-generator-searchdb` | `src/pages/search.json.ts` |
| `hexo-generator-feed` | `@astrojs/rss` |
| `hexo-wordcount` | `src/lib/posts.ts` |
| `hexo-filter-mermaid-diagrams` | Mermaid 客户端渲染 |
| `hexo-renderer-stylus` | 预编译主题 CSS + Tailwind CSS v4 |

## 迁移后检查

- 文章地址是否符合预期
- 分类、标签、归档是否正确
- 评论系统是否配置了站点名和 CORS
- 搜索索引是否包含文章
- RSS 是否可以访问
