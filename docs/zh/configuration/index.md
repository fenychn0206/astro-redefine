---
title: 配置概览
description: 用户配置、默认配置、合并规则以及基础站点信息。
---

## 配置文件

```text
src/config.user.ts     # 用户配置，编辑这个文件
src/config.default.ts  # 主题默认值与类型，一般不改
src/config.ts          # 深度合并入口
```

`src/config.user.ts` 只需要写要覆盖的字段。合并规则：

- 普通对象递归合并
- 数组整体替换，例如导航链接、社交链接、相册数据
- 没有出现在用户配置里的字段使用默认值

页面和组件统一从合并结果读取：

```ts
import config from '../config';

config.site.title;
config.colors.primary;
config.articles.toc;
```

## 配置分组

| 分组 | 内容 |
| --- | --- |
| `site` | 标题、描述、作者、语言、URL、分页 |
| `images` | favicon、logo、头像、OG 图 |
| `colors` | 主题色、默认明暗模式 |
| `global` | 字体、宽度、单页、预加载、统计、SEO |
| `homeBanner` | 首页大图、标题、副标题、社交链接 |
| `navbar` | 导航、配色、搜索 |
| `home` | 首页侧栏、摘要、分类 / 标签显示 |
| `articles` | 排版、目录、代码块、版权、推荐 |
| `comment` | Artalk、Waline、Giscus 等评论系统 |
| `footer` | 运行时间、统计、备案号 |
| `plugins` | RSS、Mermaid、APlayer |
| `pageTemplates` | 友链列数、标签样式、相册批量 |
| `seo` | robots 与 Open Graph |

## 站点信息

```ts
// src/config.user.ts
site: {
  title: '我的博客',
  subtitle: '记录与分享',
  description: '一个使用 Astro 构建的博客。',
  keywords: 'Astro, blog, Markdown',
  author: 'Your Name',
  language: 'zh-CN',
  timezone: 'Asia/Shanghai',
  url: 'https://blog.example.com',
  base: '/',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
  postsPerPage: 10,
},
```

`site.url` 用于生成 canonical、Open Graph 和文章版权链接，请填写最终部署地址；`base` 默认为 `/`，部署在子目录时再修改。

## 图片与颜色

```ts
images: {
  favicon: '/images/redefine-favicon.svg',
  logo: '/images/redefine-favicon.svg',
  avatar: '/images/redefine-avatar.svg',
  og: '/images/redefine-og.webp',
},
colors: {
  primary: '#0066CC',
  defaultMode: 'light',
},
```

`colors.primary` 会影响链接、按钮、进度条和悬浮状态。`defaultMode` 可选 `light` 或 `dark`；用户手动切换后以本地存储为准。

## Font Awesome

```ts
fontawesome: {
  thin: true,
  light: true,
  duotone: true,
  sharpSolid: false,
},
```

`solid`、`regular`、`brands` 默认启用，其余四种按需开启以减少字体体积。

## 下一步

- [全局设置](./global.md)
- [首页设置](./home.md)
- [文章设置](./articles.md)
- [评论设置](./comments.md)
