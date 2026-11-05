---
title: Deployment
description: Build output, static hosting, site URL and Artalk CORS.
---

## Build

```bash
pnpm run build
pnpm run preview
```

The output is a static `dist/` directory and can be hosted anywhere that serves static files.

## Site URL

Set the final domain in `src/config.user.ts`:

```ts
site: {
  url: 'https://blog.example.com',
  base: '/',
},
```

- `url` is used for canonical links, Open Graph, RSS and copyright links.
- Set `base` to `/subpath/` when deploying under a sub-path.
- Post URLs are built from `url` + `base` + the date path.

## Static hosting

Most platforms can publish `dist/` directly:

```text
Build command: pnpm run build
Output directory: dist
Node version: 22+
```

If the platform supports a custom 404 page, point it to `dist/404.html`.

## Comment CORS

The Artalk backend must allow the site origin and contain a matching site:

```text
Site: https://blog.example.com
Comment backend: https://artalk.example.com
Site name: example-site
```

For local development, add `http://localhost:4321` to Artalk's CORS / trusted domains.

## Caching

Astro fingerprints assets under `/_astro/`; those can be cached for a long time. HTML should use a shorter cache lifetime so new posts appear quickly.

## Checklist

- [ ] `site.url` matches the production domain
- [ ] `site.base` matches the deployment path
- [ ] Comment site name and CORS are configured
- [ ] 404 points to `dist/404.html`
- [ ] `pnpm run build` succeeds
