---
title: 首页与导航
description: 首页大图、导航栏、首页侧栏和文章列表的设置。
---

## 首页大图

```ts
homeBanner: {
  enable: true,
  style: 'fixed',
  image: {
    light: '/images/banner-light.webp',
    dark: '/images/banner-dark.webp',
  },
  title: '我的博客',
  subtitle: {
    text: ['记录技术与生活。', 'A simple blog.'],
    hitokoto: {
      enable: false,
      showAuthor: false,
      api: 'https://hitokoto.example.com',
    },
    typingSpeed: 100,
    backingSpeed: 80,
    startingDelay: 500,
    backingDelay: 1500,
    loop: true,
    smartBackspace: false,
  },
  textColor: { light: '#fff', dark: '#d1d1b6' },
  textStyle: {
    titleSize: '2.8rem',
    subtitleSize: '1.5rem',
    lineHeight: 1.2,
  },
  socialLinks: {
    enable: true,
    style: 'default',
    links: [
      { icon: 'github', url: 'https://social.example.com/you' },
      { icon: 'fa-solid fa-rss', url: '/rss.xml' },
    ],
    qrs: [],
  },
},
```

- `style: fixed` 背景固定，滚动时产生模糊效果；`static` 背景随页面滚动。
- `title` 支持 HTML，会直接渲染。
- `subtitle.text` 是打字机文案数组；也可以开启 hitokoto 从接口获取一言。
- `socialLinks.style` 支持 `default`、`reverse`、`center`。
- `socialLinks.qrs` 可配置带二维码的社交图标。

## 导航栏

```ts
navbar: {
  autoHide: false,
  color: {
    left: '#f78736',
    right: '#367df7',
    transparency: 35,
  },
  width: { home: '1200px', pages: '1000px' },
  links: {
    Home: { path: '/', icon: 'fa-regular fa-house' },
    Archives: { path: '/archives/', icon: 'fa-regular fa-archive' },
    Docs: { path: 'https://docs.example.com', icon: 'fa-regular fa-book' },
    More: {
      icon: 'fa-regular fa-link',
      submenus: {
        Tags: '/tags/',
        Categories: '/categories/',
      },
    },
  },
  search: {
    enable: true,
    preload: true,
    topNPerArticle: 1,
  },
},
```

- 链接键名会作为显示名称，支持通过站点语言文件翻译。
- `submenus` 可以写字符串路径或 `{ path, icon }` 对象。
- 外部链接会自动使用 `target="_blank"`。
- `autoHide` 在向下滚动时隐藏导航栏。
- `search.preload` 会提前加载搜索索引。

## 首页侧栏

```ts
home: {
  sidebar: {
    enable: true,
    position: 'left',
    firstItem: 'menu',
    announcement: '欢迎来到我的博客。',
    showOnMobile: true,
    links: {
      Archives: { path: '/archives/', icon: 'fa-regular fa-archive' },
      Tags: { path: '/tags/', icon: 'fa-regular fa-tags' },
      Categories: { path: '/categories/', icon: 'fa-regular fa-folder' },
    },
  },
  articleDateFormat: 'auto',
  excerptLength: 200,
  categories: { enable: true, limit: 3 },
  tags: { enable: true, limit: 3 },
},
```

- `sidebar.position`：`left` 或 `right`。
- `sidebar.firstItem`：`menu` 先显示链接，`info` 先显示头像和统计。
- `showOnMobile`：移动端抽屉是否显示侧栏链接。
- `articleDateFormat`：`auto`、`relative` 或日期格式字符串。
- `excerptLength`：首页摘要最大字符数。
- `categories.limit` / `tags.limit`：首页每篇文章显示的分类和标签数量，设为 `0` 表示不限制。
