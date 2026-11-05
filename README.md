# Redefine for Astro

本主题系 [Hexo Theme Redefine](https://github.com/EvanNotFound/hexo-theme-redefine) 的 Astro 移植版。

## 快速开始

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
npm run preview
```

## 目录结构

```text
src/
├── config.user.ts            # 用户配置（编辑此文件）
├── config.default.ts         # 默认配置与类型（一般不改）
├── config.ts                 # 深度合并入口
├── content.config.ts         # posts / pages 集合 schema
├── content/
│   ├── posts/                # Markdown 文章
│   └── pages/                # 关于、友链、相册、书签、说说等页面
├── data/                     # 友链、说说、书签、相册 YAML 数据
├── i18n/                     # en / zh-CN / zh-TW / ja / es / fr
├── components/               # 页面组件（首页、文章、导航、页脚、评论…）
├── layouts/BaseLayout.astro  # 全站布局
├── lib/                      # 日期、内容、i18n、URL、版权工具
├── pages/
│   ├── index.astro           # 首页
│   ├── [year]/[month]/[day]/[slug].astro
│   ├── page/[page].astro     # 首页分页
│   ├── archives.astro        # 归档
│   ├── categories/           # 分类索引与分类详情
│   ├── tags/                 # 标签索引与标签详情
│   ├── [...slug].astro       # pages 集合的自定义页面
│   ├── search.json.ts        # 本地搜索索引
│   └── rss.xml.ts            # RSS
├── plugins/markdown.ts       # ::: 指令与 Markdown 后处理
├── scripts/theme.ts          # 浏览器端交互
└── styles/
    ├── global.css            # Tailwind + 主题样式入口
    └── theme.css             # 由原主题 Stylus 编译的样式
```

## 配置

站点信息与主题选项写在 [`src/config.user.ts`](./src/config.user.ts)。它只需要写想覆盖的字段，未设置的部分会使用 [`src/config.default.ts`](./src/config.default.ts) 的默认值。`src/config.ts` 负责把两者深度合并后导出。

常用字段：

```ts
// src/config.user.ts
const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: 'Theme Redefine',
    subtitle: 'Redefine Theme Demo Site',
    author: 'Redefine',
    language: 'en',
    url: 'https://astro-redefine.example.com',
    postsPerPage: 10,
  },
  colors: { primary: '#A31F34', defaultMode: 'light' },
  homeBanner: { enable: true, style: 'fixed' },
  navbar: { search: { enable: true } },
  articles: {
    toc: { enable: true, initOpen: true },
    codeBlock: { copy: true, style: 'mac' },
    recommendation: { enable: true },
  },
  comment: {
    enable: true,
    system: 'artalk',
    config: {
      artalk: {
        server: 'https://artalk.example.com',
        site: 'Theme Redefine',
        pageKey: 'pathname',
      },
    },
  },
};
```

规则：对象会递归合并，数组（导航、社交链接等）会整体替换默认值。

演示站使用 Artalk 评论系统。评论后端地址、站点名和跨域配置见 `docs/zh/configuration/comments.md`。

完整说明见演示文章：[`src/content/posts/theme-configuration.md`](./src/content/posts/theme-configuration.md)。

## 文档

完整文档位于 `docs/`：

- 中文：[docs/zh/index.md](./docs/zh/index.md)
- English: [docs/en/index.md](./docs/en/index.md)
- [快速开始](./docs/zh/getting-started.md)
- [配置概览](./docs/zh/configuration/index.md)
- [Markdown 与特殊语法](./docs/zh/content/markdown.md)
- [页面模板](./docs/zh/pages.md)
- [插件](./docs/zh/plugins.md)
- [部署](./docs/zh/deployment.md)

文档中的示例地址统一使用 `https://*.example.com` 占位域名，请替换为真实地址。

## 编写文章

```yaml
---
title: 你好，Astro
date: 2026-11-05 10:00:00
tags: [Astro, Markdown]
categories: [随笔]
thumbnail: /images/cover.webp
description: 第一篇文章。
---

正文从这里开始。
```

文章会自动生成 `/:year/:month/:day/:slug/` 路径、归档、分类页、标签页和搜索索引。

## Markdown 特殊语法

原主题的 Hexo 标签已全部替换为 `remark-directive` 的 `:::` 语法。

### 提示块

```md
:::note{type=info title="提示"}
这是一条提示。
:::
```

### 折叠面板

```md
::::folding[点击展开]{style=blue}
折叠内容。
::::
```

### 标签页

`:::tabs` 包含 `:::tab`，因为容器指令用冒号数量表示嵌套层级，外层使用四个冒号：

```md
::::tabs{name="example"}
:::tab[第一项]
第一项的内容。
:::
:::tab[第二项]
第二项的内容。
:::
::::
```

### 按钮与网格

```md
::button[阅读文档]{href="https://docs.astro.build" icon="fa-solid fa-book" size=lg align=center}

:::grid{cols=2 gap=16}
::button[首页]{href="/" icon="fa-solid fa-house"}
::button[归档]{href="/archives/" icon="fa-solid fa-box-archive"}
:::
```

## Hexo 插件替代方案

| 原 Hexo 组件 | Astro 方案 |
| --- | --- |
| `hexo-renderer-marked` | `@astrojs/markdown-remark` + `remark-directive` |
| Hexo 标签插件（`{% note %}` 等） | `remark-directive` 的 `:::` 语法，见 `src/plugins/markdown.ts` |
| `hexo-generator-index/archive/category/tag` | Astro 文件路由与 `getStaticPaths` |
| `hexo-renderer-stylus` | 预编译主题 CSS + Tailwind CSS v4 |
| `hexo-generator-searchdb` | `src/pages/search.json.ts` 与本地搜索 UI |
| `hexo-wordcount` | `src/lib/posts.ts` 中的字数 / 阅读时间计算 |
| `hexo-generator-feed` | `@astrojs/rss` |
| `hexo-filter-mermaid-diagrams` | Mermaid 客户端渲染 |
| `hexo-blog-encrypt` | 未包含；可由 Astro 中间件或客户端解密方案接入 |

## 特性

- 首页大图、打字机副标题、固定/静态背景
- 文章目录、悬浮工具栏、阅读进度、明暗切换、字号调整
- 字数统计、阅读时间、版权声明、相关推荐、上一篇/下一篇
- 本地搜索、RSS、站点/文章访问量
- Waline / Giscus / Twikoo / Gitalk / Artalk / Utterances
- Mermaid、代码复制、图片查看器、EXIF、相册、书签、说说、友链
- ClientRouter 单页体验、响应式布局、多语言 UI

---

<samp>code is licensed under <a href="LICENSE">GPL 3.0 LICENSE</a>, <br>docs are licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons BY-SA 4.0</a>.</samp>