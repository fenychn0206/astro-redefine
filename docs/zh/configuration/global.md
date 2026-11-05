---
title: 全局设置
description: global、footer、inject 与 SEO 配置。
---

## 字体

```ts
global: {
  fonts: {
    chinese: {
      enable: true,
      family: 'Noto Sans SC',
      url: 'https://fonts.example.com/noto-sans-sc.css',
    },
    english: {
      enable: false,
      family: 'Geist Variable',
    },
    title: {
      enable: false,
      family: 'Chillax-Variable',
    },
  },
},
```

`url` 指向字体 CSS 文件；`family` 用于生成 `font-family`。中文字体、英文字体、标题字体可以分别开启。

## 内容宽度与侧栏宽度

```ts
global: {
  contentMaxWidth: '1000px',
  sidebarWidth: '210px',
},
```

`contentMaxWidth` 控制主内容最大宽度；`sidebarWidth` 控制首页侧栏和文章目录宽度。

## 悬浮效果

```ts
global: {
  hover: { shadow: true, scale: false },
},
```

- `shadow`：卡片、分页、侧栏等组件的悬浮阴影
- `scale`：首页文章卡片是否轻微放大

## 阅读进度

```ts
global: {
  scrollProgress: { bar: false, percentage: true },
},
```

`bar` 在页面顶部显示进度条；`percentage` 在右下角工具中显示百分比。两者可以同时开启。

## 站点访问量

```ts
global: {
  websiteCounter: {
    url: 'https://counter.example.com/js',
    enable: true,
    sitePv: true,
    siteUv: true,
    postPv: true,
  },
},
```

默认使用 vercount 兼容脚本；也可以接入同协议的第三方统计服务。关闭时页脚不会注入统计脚本。

## 单页体验

```ts
global: {
  singlePage: true,
},
```

开启后使用 Astro ClientRouter 做页面切换，保留滚动位置并避免整页刷新。文章内自定义脚本如果需要重新执行，请使用 `astro:page-load` 事件。

关闭后每次导航都是普通静态页面跳转。

## 预加载动画

```ts
global: {
  preloader: {
    enable: false,
    customMessage: 'Loading…',
  },
},
```

开启后会在页面加载时显示全屏文字动画；`customMessage` 留空时使用站点标题。

## Open Graph 与 SEO

```ts
global: {
  openGraph: {
    enable: true,
    image: '/images/redefine-og.webp',
    description: '我的博客',
  },
},
seo: {
  openGraph: true,
  robots: 'index,follow',
},
```

`global.openGraph` 控制 OG 标签是否输出；`images.og` 是默认分享图。文章 frontmatter 的 `description`、`keywords` 会覆盖站点默认值。

## Google Analytics

```ts
global: {
  googleAnalytics: {
    enable: true,
    id: 'G-XXXXXXXXXX',
  },
},
```

填写 Measurement ID 后会在 `<head>` 注入 gtag.js。关闭时不会加载任何统计脚本。

## 页脚

```ts
footer: {
  runtime: true,
  icon: '<i class="fa-solid fa-heart"></i>',
  start: '2026/01/01 00:00:00',
  statistics: true,
  customize: '',
  icp: {
    enable: false,
    number: '备案号',
    url: 'https://beian.example.com',
  },
},
```

- `runtime`：显示站点运行时间
- `statistics`：显示文章总数与总字数
- `customize`：页脚自定义 HTML
- `icp`：备案信息

## 注入自定义代码

```ts
inject: {
  enable: true,
  head: ['<meta name="custom" content="value">'],
  footer: ['<script src="https://cdn.example.com/script.js"></script>'],
},
```

`head` 注入到 `<head>`，`footer` 注入到页脚。请只注入可信代码。
