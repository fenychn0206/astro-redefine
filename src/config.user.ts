/**
 * User configuration.
 *
 * Edit this file to customise the site. Every value here is deep-merged over
 * `src/config.default.ts`, so you only need to keep the options you want to
 * change. Arrays (navigation links, social links, …) replace the defaults.
 */
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
    url: 'https://astro-redefine.example.com',
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
        { icon: 'github', url: 'https://github.com/withastro/astro' },
        { icon: 'fa-solid fa-globe', url: 'https://astro.build' },
        { icon: 'fa-solid fa-rss', url: '/rss.xml' },
      ],
      qrs: [],
    },
  },
  navbar: {
    links: {
      Home: { path: '/', icon: 'fa-regular fa-house' },
      Archives: { path: '/archives', icon: 'fa-regular fa-archive' },
      Docs: { path: 'https://docs.astro.build', icon: 'fa-regular fa-book' },
      Github: {
        path: 'https://github.com/withastro/astro',
        icon: 'fa-brands fa-github',
      },
      More: {
        icon: 'fa-regular fa-link',
        submenus: {
          Showcase: '/showcase/',
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
  footer: {
    start: '2026/11/05 00:00:00',
  },
};

export default userConfig;
