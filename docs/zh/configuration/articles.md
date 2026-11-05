---
title: 文章设置
description: 文章排版、目录、代码块、版权与推荐阅读。
---

## 排版

```ts
articles: {
  style: {
    fontSize: '16px',
    lineHeight: 1.5,
    imageBorderRadius: '14px',
    imageAlignment: 'center',
    imageCaption: false,
    linkIcon: true,
    deleteMask: false,
    titleAlignment: 'left',
    headingsTopSpacing: {
      h1: '3.2rem',
      h2: '2.4rem',
      h3: '1.9rem',
      h4: '1.6rem',
      h5: '1.4rem',
      h6: '1.3rem',
    },
  },
},
```

- `imageCaption`：图片 `alt` 是否自动转成 `<figcaption>`。
- `linkIcon`：外部链接是否追加右上箭头图标。
- `deleteMask`：`<del>` 内容是否默认隐藏，悬停显示。
- `titleAlignment`：文章标题 `left` 或 `center`。

## 字数与阅读时间

```ts
articles: {
  wordCount: {
    enable: true,
    count: true,
    min2read: true,
  },
},
```

字数统计同时处理中文与英文，阅读时间按每分钟约 300 字估算。

## 作者等级

```ts
articles: {
  authorLabel: {
    enable: true,
    auto: false,
    list: ['Lv1', 'Lv2', 'Lv3'],
  },
},
```

`auto: true` 时根据文章数量自动生成等级；否则按 `list` 顺序取用。

## 代码块

```ts
articles: {
  codeBlock: {
    copy: true,
    style: 'mac',
    highlightTheme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    font: {
      enable: false,
      family: 'Geist Mono',
      url: 'https://fonts.example.com/mono.css',
    },
  },
},
```

- `style`：`mac` 带窗口圆点和语言标题；`simple` 使用简洁容器。
- `copy`：显示复制按钮。
- `highlightTheme`：Shiki 主题名称。
- `font`：自定义代码字体。

## 目录

```ts
articles: {
  toc: {
    enable: true,
    maxDepth: 3,
    number: false,
    expand: true,
    initOpen: true,
  },
},
```

`maxDepth` 控制目录层级；`number` 自动编号；`expand` 展开子目录；`initOpen` 首次进入文章时默认打开目录。移动端目录会隐藏。

## 版权声明

```ts
articles: {
  copyright: {
    enable: true,
    default: 'cc_by_nc_sa',
  },
},
```

可选值：`cc_by`、`cc_by_sa`、`cc_by_nc`、`cc_by_nd`、`cc_by_nc_sa`、`all_rights_reserved`、`public_domain`。文章 frontmatter 的 `license` 和 `copyright` 可以覆盖。

## 图片懒加载与 Pangu

```ts
articles: {
  lazyload: true,
  pangu: true,
},
```

- `lazyload`：图片使用浏览器原生懒加载。
- `pangu`：在中文与英文之间自动插入空格。

## 推荐阅读

```ts
articles: {
  recommendation: {
    enable: true,
    title: '推荐阅读',
    limit: 3,
    mobileLimit: 2,
    placeholder: '/images/placeholder.webp',
    skipDirs: [],
  },
},
```

推荐基于标签和分类的重叠程度计算，不依赖额外分词服务。`skipDirs` 中的路径前缀会跳过推荐模块。

## 评论

评论系统单独配置，见[评论设置](./comments.md)。
