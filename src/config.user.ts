import type { DeepPartial, RedefineConfig } from './config.default';

const userConfig: DeepPartial<RedefineConfig> = {
  site: {
    title: 'Theme Redefine',
    subtitle: 'Redefine Theme Demo Site',
    description: 'A simple, fast and pure Astro theme for writers.',
    keywords: 'Astro, Theme, Redefine, Demo, Site, astro-theme-redefine, blog, Markdown',
    author: 'Redefine',
    language: 'en',
    timezone: 'Asia/Shanghai',
    url: 'https://astro-redefine.ooowl.net',
    base: '/',
    postsPerPage: 10,
  },
  colors: {
    primary: '#A31F34',
    defaultMode: 'light',
  },
  homeBanner: {
    enable: true,
    style: 'fixed',
    title: 'Theme Redefine',
    subtitle: {
      text: ['Redefine your writing.', 'A simple, fast and pure theme.'],
      hitokoto: {
        enable: false,
        showAuthor: false,
        api: 'https://v1.hitokoto.cn',
      },
      typingSpeed: 100,
      backingSpeed: 80,
      startingDelay: 500,
      backingDelay: 1500,
      loop: true,
      smartBackspace: false,
    },
    socialLinks: {
      enable: true,
      style: 'default',
      links: [
        { icon: 'github', url: 'https://github.com/fenychn0206/astro-redefine' },
        { icon: 'fa-solid fa-rss', url: '/rss.xml' },
      ],
      qrs: [],
    },
  },
  navbar: {
    links: {
      Home: { path: '/', icon: 'fa-regular fa-house' },
      Archives: { path: '/archives', icon: 'fa-regular fa-archive' },
      Docs: { path: '/2026/11/05/theme-configuration/', icon: 'fa-regular fa-book' },
      Github: {
        path: 'https://github.com/fenychn0206/astro-redefine',
        icon: 'fa-brands fa-github',
      },
      More: {
        icon: 'fa-regular fa-link',
        submenus: {
          Friends: '/showcase/',
          Bookmarks: '/bookmarks/',
          Essays: '/essays/',
        },
      },
    },
    search: { enable: true, preload: true, topNPerArticle: 1 },
  },
  home: {
    sidebar: {
      announcement: 'Redefine your writing.',
      links: {
        Archives: { path: '/archives', icon: 'fa-regular fa-archive' },
        Tags: { path: '/tags', icon: 'fa-regular fa-tags' },
        Categories: { path: '/categories', icon: 'fa-regular fa-folder' },
        Shuoshuo: { path: '/essays', icon: 'fa-regular fa-comment-dots' },
        Photos: { path: '/masonry', icon: 'fa-regular fa-images' },
        Bookmarks: { path: '/bookmarks', icon: 'fa-regular fa-bookmark' },
      },
    },
  },
  articles: {
    authorLabel: { enable: true, auto: false, list: ['MVP++'] },
    recommendation: {
      enable: true,
      title: '推荐阅读',
      limit: 3,
      mobileLimit: 2,
      placeholder: '/images/wallhaven-wqery6-light.webp',
      skipDirs: [],
    },
  },
  comment: {
    enable: true,
    system: 'artalk',
    config: {
      artalk: {
        // Artalk 后端地址；需在控制台创建同名站点，并允许本站 Origin 跨域。
        server: 'https://artalk.ooowl.net',
        site: 'redefine-demo',
        pageKey: 'pathname',
        pageTitle: '',
        preferRemoteConf: false,
        locale: 'zh-CN',
        darkMode: 'auto',
        flatMode: 'auto',
        nestMax: 2,
        nestSort: 'DATE_ASC',
        sendBtn: '发送评论',
        placeholder: '欢迎交流，请文明评论...',
        editorTravel: true,
        emoticons: true,
        pagination: { pageSize: 20, readMore: true, autoLoad: true },
        heightLimit: { content: 300, children: 400, scrollable: false },
        versionCheck: true,
        imgUpload: false,
        imgLazyLoad: false,
        preview: true,
        vote: true,
        pageVote: true,
        listSort: true,
        reqTimeout: 15000,
        gravatar: { mirror: 'https://weavatar.com/avatar/', params: 'sha256=1&d=mp&s=240' },
        version: '2.10.0',
        cdn: 'server',
      },
    },
  },
  footer: {
    start: '2026/11/05 00:00:00',
  },
};

export default userConfig;
