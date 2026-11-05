---
title: 页面模板
description: 归档、分类、标签、友链、说说、相册、书签和 404 页面。
---

## 自动生成的页面

| 路径 | 内容 |
| --- | --- |
| `/` | 首页文章列表 |
| `/page/:page/` | 首页分页 |
| `/archives/` | 按年份归档 |
| `/categories/` | 分类索引 |
| `/categories/:slug/` | 分类文章列表 |
| `/tags/` | 标签索引 |
| `/tags/:slug/` | 标签文章列表 |
| `/rss.xml` | RSS 订阅 |
| `/search.json` | 本地搜索索引 |

文章地址为 `/:year/:month/:day/:slug/`。

## 独立页面

在 `src/content/pages/` 中创建 Markdown 文件，路由为 `/:slug/`。通过 `type` 或 `template` 选择模板：

```yaml
---
title: 友情链接
type: links
comment: true
---
```

| 模板 | 用途 |
| --- | --- |
| `page` | 普通 Markdown 页面 |
| `links` | 友情链接 |
| `essays` | 说说 |
| `masonry` | 瀑布流相册 |
| `bookmarks` | 书签导航 |

## 友情链接

数据位于 `src/data/friends.json`：

```json
[
  {
    "name": "Example Blog",
    "url": "https://friend.example.com",
    "avatar": "https://img.example.com/avatar.webp"
  }
]
```

如果数据没有 `description`，页面会使用链接域名作为副标题。列数由 `pageTemplates.friendsColumn` 控制，可选 `2` 或 `3`。

远程数据可以通过脚本同步：

```bash
node scripts/fetch-friends.mjs
```

也可以直接执行 `pnpm run friends:sync`。

## 说说

数据位于 `src/data/essays.yml`：

```yaml
- content: 今天写了新的主题文档。
  date: 2026-11-05 10:00:00
```

内容支持 Markdown，日期会格式化为本地时间。

## 相册

数据位于 `src/data/masonry.yml`：

```yaml
- image: https://img.example.com/photo-1.webp
  title: 山间
  description: 清晨的雾
```

页面使用 CSS columns 实现瀑布流，支持图片查看器。批量参数在 `pageTemplates.masonry` 中配置。

## 书签

数据位于 `src/data/bookmarks.yml`：

```yaml
- category: 工具
  icon: fa-toolbox
  items:
    - name: Example
      link: https://tool.example.com
      description: 示例工具
      image: https://img.example.com/tool.webp
```

## 404

`src/pages/404.astro` 使用主题布局渲染 404 页面；静态托管平台需要把 404 请求指向 `dist/404.html`。

## 评论

在页面 frontmatter 中设置 `comment: true` 可以开启该页面的评论。文章默认继承 `comment.enable`，也可以通过 `comment: false` 单独关闭。
