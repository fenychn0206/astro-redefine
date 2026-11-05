---
title: 评论设置
description: Artalk 及其他评论系统的完整配置。
---

评论配置位于 `src/config.user.ts` 的 `comment` 字段。一次只会启用 `comment.system` 指定的系统。

```ts
comment: {
  enable: true,
  system: 'artalk',
  config: {
    // 各系统的具体配置
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
      locale: 'zh-CN',
      darkMode: 'auto',
      flatMode: 'auto',
      nestMax: 2,
      nestSort: 'DATE_ASC',
      placeholder: '欢迎交流，请文明评论...',
      sendBtn: '发送评论',
      noComment: '「此时无声胜有声」',
      editorTravel: true,
      emoticons: true,
      pagination: {
        pageSize: 20,
        readMore: true,
        autoLoad: true,
      },
      heightLimit: {
        content: 300,
        children: 400,
        scrollable: false,
      },
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

`server` 和 `site` 必填。`site` 必须与 Artalk 控制台中的站点名称一致。

| 字段 | 说明 |
| --- | --- |
| `pageKey` | 页面唯一标识，支持 `pathname`、`url`、`title` 或固定路径 |
| `pageTitle` | 评论列表中显示的标题，留空使用页面标题 |
| `preferRemoteConf` | 是否优先使用 Artalk 控制台的远程配置 |
| `locale` | 界面语言 |
| `darkMode` | `auto` 跟随主题，或 `true` / `false` |
| `flatMode` | 平铺模式，`auto` 在小屏自动开启 |
| `nestMax` / `nestSort` | 嵌套层数与排序 |
| `pagination` | 分页大小、加载更多、自动加载 |
| `heightLimit` | 评论内容限高 |
| `placeholder` / `sendBtn` / `noComment` | 输入框、发送按钮、空评论文案 |
| `emoticons` | 表情包配置 |
| `pvEl` / `countEl` | 浏览量与评论数绑定元素 |
| `version` / `cdn` | 客户端版本与 CDN，`server` 表示使用后端内置客户端 |
| `gravatar` | Gravatar 镜像与参数 |

### 跨域与站点

Artalk 后端需要允许站点域名跨域，并在控制台创建同名站点。例如：

```text
站点地址：https://blog.example.com
Artalk 后端：https://artalk.example.com
Artalk 站点名：example-site
```

如果本地开发访问 `http://localhost:4321`，需要在 Artalk 的 CORS / 可信域名中额外允许该地址，否则浏览器会拦截 API 请求。

## Waline

```ts
comment: {
  enable: true,
  system: 'waline',
  config: {
    waline: {
      serverUrl: 'https://waline.example.com',
      lang: 'zh-CN',
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
      lang: 'zh-CN',
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

文章 frontmatter 中设置 `comment: false` 可以关闭单篇文章的评论区。
