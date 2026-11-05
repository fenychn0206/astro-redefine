---
title: 快速开始
description: 安装、启动和部署 Redefine for Astro。
---

## 环境要求

- Node.js `>= 22`
- npm、pnpm 或 yarn 任选其一

## 安装

```bash
git clone https://github.example.com/you/astro-redefine.git
cd astro-redefine
npm install
```

## 本地开发

```bash
npm run dev
```

默认地址为 <http://localhost:4321>。开发服务器支持热更新。

## 构建与预览

```bash
npm run build
npm run preview
```

构建结果输出到 `dist/`，可以部署到任何静态托管服务。

## 配置从哪里开始

站点配置分为三个文件：

| 文件 | 用途 |
| --- | --- |
| `src/config.user.ts` | 用户配置，修改站点标题、作者、导航、首页和评论等 |
| `src/config.default.ts` | 主题默认值与 TypeScript 类型，一般不改 |
| `src/config.ts` | 深度合并两个配置并导出 `config` |

只需要编辑 `src/config.user.ts`，未设置的字段会自动使用默认值。示例：

```ts
// src/config.user.ts
const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: '我的博客',
    author: 'Your Name',
    url: 'https://blog.example.com',
  },
  colors: {
    primary: '#0066CC',
  },
};
```

具体字段见[配置概览](./configuration/index.md)。

## 写第一篇文章

在 `src/content/posts/` 新建 Markdown 文件：

```markdown
---
title: 你好，Astro
date: 2026-11-05 10:00:00
tags: [Astro, Markdown]
categories: [随笔]
description: 第一篇文章。
---

正文从这里开始。
```

文章会生成 `/:year/:month/:day/:slug/` 形式的地址，并自动进入首页、归档、分类、标签和搜索索引。

## 目录结构

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

继续阅读：

- [配置概览](./configuration/index.md)
- [编写文章](./content/writing.md)
- [Markdown 与特殊语法](./content/markdown.md)
- [部署](./deployment.md)
