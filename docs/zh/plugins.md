---
title: 插件与扩展
description: 搜索、RSS、Mermaid、APlayer、图片查看器和单页导航。
---

## 站内搜索

主题会在构建时生成 `/search.json`，无需额外插件。开启导航栏搜索：

```ts
navbar: {
  search: {
    enable: true,
    preload: true,
    topNPerArticle: 1,
  },
},
```

搜索会匹配标题和正文，并在结果中高亮关键词。

## RSS

`feed` 开启后构建 `/rss.xml`：

```ts
plugins: {
  feed: { enable: true },
},
```

RSS 包含文章标题、摘要、日期、分类和标签。

## Mermaid

```ts
plugins: {
  mermaid: {
    enable: true,
    version: '11.4.1',
    theme: { light: 'default', dark: 'dark' },
  },
},
```

在 Markdown 中使用 `mermaid` 代码块即可。Mermaid 只在包含图表的页面加载。

## APlayer

```ts
plugins: {
  aplayer: {
    enable: true,
    type: 'mini',
    audios: [
      {
        name: 'Example Song',
        artist: 'Example Artist',
        url: 'https://audio.example.com/song.mp3',
        cover: 'https://img.example.com/cover.webp',
      },
    ],
  },
},
```

`type` 支持 `mini` 和 `fixed`。音频地址必须是浏览器可访问的直链。

## 图片查看器

文章图片、相册图片和说说图片会自动启用图片查看器：

- 点击打开大图
- 左右切换
- `Esc` 关闭
- `Ctrl` + 滚轮缩放
- 相册图片可附带 EXIF 信息

## Pangu

```ts
articles: {
  pangu: true,
},
```

在中文与英文、数字之间自动添加空格。默认开启。

## 单页导航

```ts
global: {
  singlePage: true,
},
```

使用 Astro ClientRouter 在页面之间做无刷新切换。文章内自定义脚本可以监听：

```js
document.addEventListener('astro:page-load', () => {
  // 初始化你的脚本
});
```

## 未内置的插件

主题没有内置文章加密和数学公式渲染。需要时可以通过 Astro 的 Markdown 插件或自定义客户端脚本接入。
