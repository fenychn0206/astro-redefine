---
title: 部署
description: 构建、静态托管、站点地址和 Artalk 跨域。
---

## 构建

```bash
pnpm run build
pnpm run preview
```

构建结果是 `dist/` 目录中的静态文件，可以部署到任何支持静态文件的平台。

## 站点地址

在 `src/config.user.ts` 中设置最终域名：

```ts
site: {
  url: 'https://blog.example.com',
  base: '/',
},
```

- `url` 用于 canonical、Open Graph、RSS 和版权链接。
- 部署在子目录时，`base` 设置为 `/subpath/`。
- 文章链接由 `url` + `base` + 日期路径组成。

## 静态托管

常见平台都可以直接发布 `dist/`：

```text
Build command: pnpm run build
Output directory: dist
Node version: 22+
```

如果平台支持自定义 404 页面，请指向 `dist/404.html`。

## 评论跨域

Artalk 服务端需要允许站点域名跨域，并在控制台创建同名站点。例如：

```text
站点：https://blog.example.com
评论后端：https://artalk.example.com
站点名：example-site
```

如果本地开发也要加载评论，需要把 `http://localhost:4321` 加入 Artalk 的 CORS / 可信域名。

## 缓存

主题资源使用 Astro 的文件名哈希，静态托管可以长期缓存 `/_astro/` 下的文件。HTML 建议使用较短的缓存时间，方便发布新文章。

## 检查清单

- [ ] `site.url` 与最终域名一致
- [ ] `site.base` 与部署路径一致
- [ ] 评论服务的站点名和 CORS 已配置
- [ ] 404 页面已指向 `dist/404.html`
- [ ] `pnpm run build` 成功
