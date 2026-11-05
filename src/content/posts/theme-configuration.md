---
title: 主题配置指南
date: 2026-11-05 20:30:00
tags:
  - Astro
  - Redefine
  - 配置
  - 教程
categories:
  - 指南
  - Astro
sticky: 999
description: Redefine for Astro 的简单配置指南：站点信息、主题选项、Markdown 特殊语法与数据文件。
---

## 配置文件

配置拆分为两个文件，并保留一个合并入口：

| 文件 | 作用 |
| --- | --- |
| `src/config.user.ts` | 用户配置，平时只需要编辑这个文件 |
| `src/config.default.ts` | 主题默认值与 TypeScript 类型 |
| `src/config.ts` | 深度合并上面两个文件并导出 `config` |

`src/config.user.ts` 只需要写想覆盖的字段。对象会递归合并，数组（导航、社交链接等）会整体替换默认值：

```ts
import type { DeepPartial, RedefineConfig } from './config.default';

const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: '我的博客',
    author: 'Your Name',
  },
  colors: {
    primary: '#0066CC',
  },
  navbar: {
    search: { enable: true },
  },
};

export default userConfig;
```

页面和组件中仍然从合并后的入口读取配置：

```ts
import config from '../config';

config.site.title;        // 站点标题
config.colors.primary;    // 主题色
config.images.avatar;     // 头像
config.articles.toc;      // 文章目录
config.comment.system;    // 评论系统
```

主要配置分组如下：

| 配置组 | 作用 |
| --- | --- |
| `site` | 标题、描述、作者、语言、URL、分页数量 |
| `images` | favicon、logo、头像、社交分享图 |
| `colors` | 主题色、默认明暗模式 |
| `global` | 字体、内容宽度、侧栏宽度、搜索、单页体验、统计 |
| `homeBanner` | 首页大图、打字机副标题、社交链接 |
| `navbar` | 导航链接、配色、搜索入口 |
| `home` | 首页侧栏、摘要长度、分类和标签显示 |
| `articles` | 正文字号、目录、版权、代码块、推荐阅读 |
| `comment` | Waline、Giscus、Twikoo、Gitalk、Artalk、Utterances |
| `footer` | 运行时间、站点统计、备案号 |
| `plugins` | RSS、APlayer、Mermaid |

:::note{type=info title="修改后自动生效"}
开发模式下保存 `src/config.user.ts` 会触发页面刷新；生产环境请重新执行 `npm run build`。`src/config.default.ts` 一般只在维护主题默认值时修改。
:::

## 站点信息

最小配置只需要修改 `site`、`images` 和 `colors`：

```ts
// src/config.user.ts
const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: '我的博客',
    subtitle: '记录与分享',
    description: '一个使用 Astro 与 Redefine 构建的博客。',
    author: 'Your Name',
    language: 'zh-CN',
    url: 'https://example.com',
    postsPerPage: 10,
  },
  images: {
    favicon: '/images/redefine-favicon.svg',
    logo: '/images/redefine-favicon.svg',
    avatar: '/images/redefine-avatar.svg',
    og: '/images/redefine-og.webp',
  },
  colors: {
    primary: '#A31F34',
    defaultMode: 'light',
  },
};
```

## 编写文章

文章放在 `src/content/posts/`，使用 Markdown 与 YAML frontmatter：

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

支持的常用字段包括 `title`、`date`、`updated`、`tags`、`categories`、`thumbnail`、`cover`、`banner`、`sticky`、`excerpt`、`author`、`license`、`comment`、`expires` 和 `description`。其中 `sticky: 999` 会把文章置顶。

## 特殊语法

所有原本使用 Nunjucks/EJS 标签的模块，现在都使用 `remark-directive` 的 `:::` 语法。语法与 Markdown 完全兼容，可以放在列表、引用和正文中。

### 提示块

简单提示块使用 `:::note`：

```md
:::note{type=info title="提示"}
这是一条提示信息，支持 **Markdown**。
:::
```

`type` 可以是 `default`、`primary`、`success`、`info`、`warning`、`danger`、`red`、`yellow`、`green`、`blue`、`orange`、`purple` 等。加上 `title` 或使用 `:::notel` 会显示标题与左侧色条。

:::note{type=info}
默认样式的提示块适合补充说明。
:::

:::note{type=success title="完成"}
带标题的提示块由 `title` 控制，也可以使用 `:::notel`。
:::

### 折叠面板

折叠面板会渲染为原生 `<details>`，对 SEO 和无 JavaScript 环境都友好：

```md
::::folding[点击展开]{style=blue}
折叠区域内的内容。
::::
```

::::folding[点击展开：一个折叠面板]{style=blue}
折叠区域可以包含标题、列表、代码和提示块。

- 支持 Markdown
- 支持嵌套模块
- 支持 `open` 属性默认展开
::::

### 标签页

标签页使用 `tabs` 与 `tab`。因为 `remark-directive` 用冒号数量表示嵌套层级，**外层 `tabs` 使用四个冒号，内层 `tab` 使用三个冒号**：

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

::::tabs{name="config-example"}
:::tab[配置文件]
修改 `src/config.user.ts` 中的 `site` 与 `colors`。
:::
:::tab[文章目录]
文章放在 `src/content/posts/`，目录由 `articles.toc` 控制。
:::
:::tab[评论]
在 `comment.system` 中选择 Waline、Giscus 或 Twikoo。
:::
::::

### 按钮

按钮使用叶子指令 `::button`：

```md
::button[阅读文档]{href="https://docs.astro.build" icon="fa-solid fa-book" size=lg align=center}
```

不设置 `href` 时也可以作为普通按钮使用。`size` 支持 `sm`/`md`/`lg`，`align` 支持 `left`/`center`/`right`。

::button[查看归档]{href="/archives/" icon="fa-solid fa-box-archive" align=center size=lg}

### 网格

`:::grid` 可以把多个按钮或其他块级内容并排显示：

```md
:::grid{cols=2 gap=16}
::button[首页]{href="/" icon="fa-solid fa-house"}
::button[归档]{href="/archives/" icon="fa-solid fa-box-archive"}
:::
```

:::grid{cols=2 gap=16}
::button[首页]{href="/" icon="fa-solid fa-house"}
::button[归档]{href="/archives/" icon="fa-solid fa-box-archive"}
:::

## 数据文件

演示站点的友情链接、说说、书签和瀑布流数据放在 `src/data/`：

- `links.yml`：友情链接分组与缩略图。
- `essays.yml`：说说内容与日期。
- `bookmarks.yml`：书签分类与条目。
- `masonry.yml`：相册图片、标题与描述。

它们会被对应的页面模板读取，无需修改模板代码。

## 评论、搜索与统计

演示站使用 **Artalk**，配置写在 `src/config.user.ts` 的 `comment` 中：

```ts
comment: {
  enable: true,
  system: 'artalk',
  config: {
    artalk: {
      // Artalk 后端地址
      server: 'https://artalk.ooowl.net',
      // 必须与 Artalk 控制台中的站点名称一致
      site: 'redefine-demo',
      pageKey: 'pathname',
      pageTitle: '',
      locale: 'zh-CN',
      darkMode: 'auto',
      flatMode: 'auto',
      nestMax: 2,
      nestSort: 'DATE_ASC',
      pagination: { pageSize: 20, readMore: true, autoLoad: true },
      heightLimit: { content: 300, children: 400, scrollable: false },
      version: '2.10.0',
      cdn: 'server',
    },
  },
}
```

`server` 和 `site` 是必填项。`site` 为空或与后端站点不一致时，Artalk 会返回“未找到站点”。

> 演示站使用 `https://artalk.ooowl.net`，站点名为 `redefine-demo`。Artalk 服务端只允许 `https://astro-redefine.ooowl.net` 跨域，因此本地 `localhost` 开发时评论请求会被浏览器拦截；部署到该域名后可正常加载。

常用 Artalk 配置：

| 字段 | 作用 |
| --- | --- |
| `pageKey` | 页面唯一标识，支持 `pathname`、`url`、`title` 或固定路径 |
| `pageTitle` | 评论列表中显示的页面标题，留空时使用页面标题 |
| `preferRemoteConf` | 是否优先使用 Artalk 控制台中的远程配置 |
| `locale` | 界面语言，例如 `zh-CN`、`en` |
| `darkMode` | `auto` 跟随主题明暗模式，也可设为 `true` / `false` |
| `flatMode` | 平铺模式，`auto` 会在小屏自动开启 |
| `nestMax` / `nestSort` | 最大嵌套层数与嵌套排序 |
| `pagination` | `pageSize`、`readMore`、`autoLoad` |
| `heightLimit` | 评论与子评论内容限高 |
| `placeholder` / `sendBtn` / `noComment` | 输入框、发送按钮和空评论文案 |
| `emoticons` | 表情包配置，`true` 使用默认表情包 |
| `pvEl` / `countEl` | 页面浏览量与评论数绑定元素 |
| `version` / `cdn` | 客户端版本与 CDN，`cdn: 'server'` 使用 Artalk 后端内置客户端 |
| `gravatar` | Gravatar 镜像与参数 |

主题会在明暗模式切换时同步调用 Artalk 的 `setDarkMode`。其他评论系统（Waline、Giscus、Twikoo、Gitalk、Utterances）仍可在 `comment.system` 中切换。

站内搜索由主题自动生成 `search.json`，无需额外插件；在 `src/config.user.ts` 的 `navbar.search.enable` 中开启即可。页脚访问量使用 `global.websiteCounter`，默认接入 vercount。

## 常用命令

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建静态站点
npm run preview   # 预览构建结果
```

:::note{type=warning title="关于嵌套"}
`tabs` 和 `folding` 如果内部还包含其他 `:::` 容器，请把外层写成四个冒号 `::::`，内部保持三个冒号。这是 Markdown 容器指令表示嵌套层级的标准方式。
:::
