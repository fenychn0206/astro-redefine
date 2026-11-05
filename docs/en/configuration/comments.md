---
title: Comments
description: Artalk and other comment systems.
---

Comment settings live in `src/config.user.ts` under `comment`. Only the system named by `comment.system` is active.

```ts
comment: {
  enable: true,
  system: 'artalk',
  config: {
    // per-system options
  },
},
```

## Artalk

```ts
comment: {
  enable: true,
  system: 'artalk',
  config: {
    artalk: {
      server: 'https://artalk.example.com',
      site: 'example-site',
      pageKey: 'pathname',
      pageTitle: '',
      preferRemoteConf: false,
      locale: 'en',
      darkMode: 'auto',
      flatMode: 'auto',
      nestMax: 2,
      nestSort: 'DATE_ASC',
      placeholder: 'Leave a comment...',
      sendBtn: 'Send',
      noComment: 'No comments yet.',
      editorTravel: true,
      emoticons: true,
      pagination: { pageSize: 20, readMore: true, autoLoad: true },
      heightLimit: { content: 300, children: 400, scrollable: false },
      pvEl: '.artalk-pv-count',
      countEl: '.artalk-comment-count',
      versionCheck: true,
      imgUpload: true,
      imgLazyLoad: false,
      preview: true,
      vote: true,
      voteDown: false,
      pageVote: true,
      uaBadge: false,
      listSort: true,
      reqTimeout: 15000,
      gravatar: {
        mirror: 'https://avatar.example.com/avatar/',
        params: 'sha256=1&d=mp&s=240',
      },
      version: '2.10.0',
      cdn: 'server',
    },
  },
},
```

`server` and `site` are required. `site` must match the site name in the Artalk dashboard.

| Field | Description |
| --- | --- |
| `pageKey` | Page identity: `pathname`, `url`, `title` or a fixed path |
| `pageTitle` | Title shown in the comment list; empty uses the page title |
| `preferRemoteConf` | Prefer remote configuration from Artalk |
| `locale` | UI language |
| `darkMode` | `auto` follows the theme; or `true` / `false` |
| `flatMode` | Flat layout; `auto` enables it on small screens |
| `nestMax` / `nestSort` | Nesting depth and sort order |
| `pagination` | Page size, read more and auto load |
| `heightLimit` | Limit the height of long comments |
| `placeholder` / `sendBtn` / `noComment` | Editor labels |
| `emoticons` | Emoji configuration |
| `pvEl` / `countEl` | Page view and comment count targets |
| `version` / `cdn` | Client version and CDN; `server` uses the backend client |
| `gravatar` | Avatar mirror and params |

### CORS and site name

The Artalk backend must allow the site origin and contain a matching site:

```text
Site: https://blog.example.com
Artalk backend: https://artalk.example.com
Artalk site name: example-site
```

For local development at `http://localhost:4321`, add that origin to Artalk's CORS / trusted domains as well.

## Waline

```ts
comment: {
  enable: true,
  system: 'waline',
  config: {
    waline: {
      serverUrl: 'https://waline.example.com',
      lang: 'en',
      emoji: [],
      reaction: false,
    },
  },
},
```

## Giscus

```ts
comment: {
  enable: true,
  system: 'giscus',
  config: {
    giscus: {
      repo: 'you/example-repo',
      repoId: 'R_xxx',
      category: 'Comments',
      categoryId: 'DIC_xxx',
      mapping: 'pathname',
      lang: 'en',
      inputPosition: 'bottom',
      loading: 'lazy',
    },
  },
},
```

## Twikoo

```ts
comment: {
  enable: true,
  system: 'twikoo',
  config: {
    twikoo: {
      version: '1.6.10',
      serverUrl: 'https://twikoo.example.com',
      region: '',
    },
  },
},
```

## Gitalk

```ts
comment: {
  enable: true,
  system: 'gitalk',
  config: {
    gitalk: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      repo: 'example-repo',
      owner: 'your-name',
      proxy: 'https://proxy.example.com',
    },
  },
},
```

## Utterances

```ts
comment: {
  enable: true,
  system: 'utterances',
  config: {
    utterances: {
      repo: 'you/example-repo',
      issueTerm: 'pathname',
      label: 'comment',
      themeLight: 'github-light',
      themeDark: 'github-dark',
    },
  },
},
```

Set `comment: false` in an article's frontmatter to hide comments on that post.
