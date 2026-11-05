---
title: 主题介绍
description: Redefine for Astro 是一个使用 Markdown 写作、Tailwind CSS 驱动的静态博客主题。
---

Redefine for Astro 是 Hexo Theme Redefine 的 Astro 移植版。它保留了原主题的排版、卡片、提示块和页面结构，同时用 Astro 的静态路由、Content Collections 和 `remark-directive` 重新实现了内容管线。

主题适合个人博客、技术笔记和文档型站点：文章就是 Markdown 文件，构建结果是纯静态 HTML，不依赖前端框架运行时。

## 特性

- Markdown / Content Collections 写作，自动生成文章、归档、分类、标签和搜索索引
- 首页大图、打字机副标题、固定或静态背景
- 明亮 / 暗黑模式、目录、阅读进度、字号调整
- 文章字数、阅读时间、版权声明、相关推荐、上一篇 / 下一篇
- 站内搜索、RSS、Mermaid、APlayer、图片查看器
- Artalk / Waline / Giscus / Twikoo / Gitalk / Utterances 评论
- 友情链接、说说、相册、书签、404 等页面模板
- Tailwind CSS v4，配置集中在 `src/config.user.ts`
- 使用 ClientRouter 的可选单页导航体验

## 演示

- 演示站点：<https://demo.example.com>
- 站点源码：<https://github.example.com/you/astro-redefine>

## 文档导航

- [快速开始](./getting-started.md)
- [配置概览](./configuration/index.md)
- [编写文章](./content/writing.md)
- [Markdown 与特殊语法](./content/markdown.md)
- [页面模板](./pages.md)
- [插件与扩展](./plugins.md)
- [部署](./deployment.md)
- [从 Hexo 迁移](./migrate-from-hexo.md)

## 技术栈

- Astro 静态站点框架
- Tailwind CSS v4
- `remark-directive` 与 `rehype` 插件
- Shiki 代码高亮
- 原主题的样式与页面结构
