/**
 * Theme defaults.
 *
 * This file intentionally contains no site-specific data. It is the fallback
 * used by `src/config.ts`; edit `src/config.user.ts` instead.
 */
export type ThemeMode = 'light' | 'dark';

export interface NavLink {
  path?: string;
  icon?: string;
  submenus?: Record<string, string | { path: string; icon?: string }>;
}

export interface SocialLink {
  name?: string;
  icon?: string;
  url?: string;
}

export interface SocialQr {
  name?: string;
  icon?: string;
  qr?: string;
}

export interface FontOption {
  enable: boolean;
  family?: string;
  url?: string;
}

export interface Audit {
  name: string;
  artist?: string;
  url: string;
  cover?: string;
  lrc?: string;
}

export interface RedefineConfig {
  site: {
    title: string;
    subtitle: string;
    description: string;
    keywords: string;
    author: string;
    language: string;
    timezone: string;
    url: string;
    base: string;
    dateFormat: string;
    timeFormat: string;
    postsPerPage: number;
  };
  images: {
    favicon: string;
    logo: string;
    avatar: string;
    og: string;
  };
  colors: {
    primary: string;
    secondary?: string;
    defaultMode: ThemeMode;
  };
  global: {
    fonts: {
      chinese: FontOption;
      english: FontOption;
      title: FontOption;
    };
    contentMaxWidth: string;
    sidebarWidth: string;
    hover: { shadow: boolean; scale: boolean };
    scrollProgress: { bar: boolean; percentage: boolean };
    websiteCounter: {
      url: string;
      enable: boolean;
      sitePv: boolean;
      siteUv: boolean;
      postPv: boolean;
    };
    singlePage: boolean;
    preloader: { enable: boolean; customMessage?: string };
    openGraph: {
      enable: boolean;
      image?: string;
      description?: string;
    };
    googleAnalytics: { enable: boolean; id?: string };
  };
  fontawesome: {
    thin: boolean;
    light: boolean;
    duotone: boolean;
    sharpSolid: boolean;
  };
  homeBanner: {
    enable: boolean;
    style: 'fixed' | 'static';
    image: { light: string; dark: string };
    title: string;
    subtitle: {
      text: string[];
      hitokoto: { enable: boolean; showAuthor: boolean; api: string };
      typingSpeed: number;
      backingSpeed: number;
      startingDelay: number;
      backingDelay: number;
      loop: boolean;
      smartBackspace: boolean;
    };
    textColor: { light: string; dark: string };
    textStyle: { titleSize: string; subtitleSize: string; lineHeight: number };
    customFont: { enable: boolean; family?: string; url?: string };
    socialLinks: {
      enable: boolean;
      style: 'default' | 'reverse' | 'center';
      links: SocialLink[];
      qrs: SocialQr[];
    };
  };
  navbar: {
    autoHide: boolean;
    color: { left: string; right: string; transparency: number };
    width: { home: string; pages: string };
    links: Record<string, NavLink>;
    search: { enable: boolean; preload: boolean; topNPerArticle: number };
  };
  home: {
    sidebar: {
      enable: boolean;
      position: 'left' | 'right';
      firstItem: 'menu' | 'info';
      announcement?: string;
      showOnMobile: boolean;
      links: Record<string, NavLink>;
    };
    articleDateFormat: 'auto' | 'relative' | string;
    excerptLength: number;
    categories: { enable: boolean; limit: number };
    tags: { enable: boolean; limit: number };
  };
  articles: {
    style: {
      fontSize: string;
      lineHeight: number;
      imageBorderRadius: string;
      imageAlignment: 'left' | 'center';
      imageCaption: boolean;
      linkIcon: boolean;
      deleteMask: boolean;
      titleAlignment: 'left' | 'center';
      headingsTopSpacing: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string>;
    };
    wordCount: { enable: boolean; count: boolean; min2read: boolean };
    authorLabel: { enable: boolean; auto: boolean; list: string[] };
    codeBlock: {
      copy: boolean;
      style: 'mac' | 'simple';
      highlightTheme: { light: string; dark: string };
      font: FontOption;
    };
    toc: {
      enable: boolean;
      maxDepth: number;
      number: boolean;
      expand: boolean;
      initOpen: boolean;
    };
    copyright: {
      enable: boolean;
      default:
        | 'cc_by_nc_sa'
        | 'cc_by_nd'
        | 'cc_by_nc'
        | 'cc_by_sa'
        | 'cc_by'
        | 'all_rights_reserved'
        | 'public_domain';
    };
    lazyload: boolean;
    pangu: boolean;
    recommendation: {
      enable: boolean;
      title: string;
      limit: number;
      mobileLimit: number;
      placeholder: string;
      skipDirs: string[];
    };
  };
  comment: {
    enable: boolean;
    system: 'waline' | 'gitalk' | 'twikoo' | 'giscus' | 'artalk' | 'utterances';
    config: {
      waline: {
        serverUrl?: string;
        lang?: string;
        emoji?: string[];
        recaptchaV3Key?: string;
        turnstileKey?: string;
        reaction?: boolean | string[];
      };
      gitalk: {
        clientID?: string;
        clientSecret?: string;
        repo?: string;
        owner?: string;
        proxy?: string;
      };
      twikoo: { version: string; serverUrl?: string; region?: string };
      giscus: {
        repo?: string;
        repoId?: string;
        category?: string;
        categoryId?: string;
        mapping?: string;
        strict?: string;
        reactionsEnabled?: string;
        emitMetadata?: string;
        lang?: string;
        inputPosition?: string;
        loading?: string;
      };
      artalk: { server?: string; site?: string };
      utterances: {
        repo?: string;
        issueTerm?: string;
        issueNumber?: string;
        label?: string;
        themeLight?: string;
        themeDark?: string;
      };
    };
  };
  footer: {
    runtime: boolean;
    icon: string;
    start: string;
    statistics: boolean;
    customize?: string;
    icp: { enable: boolean; number?: string; url?: string };
  };
  inject: { enable: boolean; head: string[]; footer: string[] };
  plugins: {
    feed: { enable: boolean };
    aplayer: { enable: boolean; type: 'fixed' | 'mini'; audios: Audit[] };
    mermaid: {
      enable: boolean;
      version: string;
      theme: { light: string; dark: string };
    };
  };
  pageTemplates: {
    friendsColumn: 2 | 3;
    tagsStyle: 'blur' | 'cloud';
    masonry: { batchSize: number; initialBatchSize: number };
  };
  seo: {
    openGraph: boolean;
    robots: string;
  };
}

export type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export const defaultConfig: RedefineConfig = {
  site: {
    title: 'Redefine',
    subtitle: 'Redefine Your Writing.',
    description: 'A simple, fast and pure Astro theme for writers.',
    keywords: 'Astro, blog, theme, Redefine, Markdown',
    author: 'Redefine',
    language: 'en',
    timezone: '',
    url: 'https://example.com',
    base: '/',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
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
  global: {
    fonts: {
      chinese: { enable: false },
      english: { enable: false },
      title: { enable: false },
    },
    contentMaxWidth: '1000px',
    sidebarWidth: '210px',
    hover: { shadow: true, scale: false },
    scrollProgress: { bar: false, percentage: true },
    websiteCounter: {
      url: 'https://cn.vercount.one/js',
      enable: true,
      sitePv: true,
      siteUv: true,
      postPv: true,
    },
    singlePage: true,
    preloader: { enable: false },
    openGraph: {
      enable: true,
      image: '/images/redefine-og.webp',
      description: 'Redefine your writing with a simple, fast and pure blog theme.',
    },
    googleAnalytics: { enable: false },
  },
  fontawesome: {
    thin: true,
    light: true,
    duotone: true,
    sharpSolid: false,
  },
  homeBanner: {
    enable: true,
    style: 'fixed',
    image: {
      light: '/images/wallhaven-wqery6-light.webp',
      dark: '/images/wallhaven-wqery6-dark.webp',
    },
    title: 'Redefine',
    subtitle: {
      text: ['Redefine your writing.'],
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
    textColor: { light: '#fff', dark: '#d1d1b6' },
    textStyle: { titleSize: '2.8rem', subtitleSize: '1.5rem', lineHeight: 1.2 },
    customFont: { enable: false },
    socialLinks: {
      enable: false,
      style: 'default',
      links: [],
      qrs: [],
    },
  },
  navbar: {
    autoHide: false,
    color: { left: '#f78736', right: '#367df7', transparency: 35 },
    width: { home: '1200px', pages: '1000px' },
    links: {
      Home: { path: '/', icon: 'fa-regular fa-house' },
      Archives: { path: '/archives', icon: 'fa-regular fa-archive' },
    },
    search: { enable: false, preload: true, topNPerArticle: 1 },
  },
  home: {
    sidebar: {
      enable: true,
      position: 'left',
      firstItem: 'menu',
      announcement: '',
      showOnMobile: true,
      links: {},
    },
    articleDateFormat: 'auto',
    excerptLength: 200,
    categories: { enable: true, limit: 3 },
    tags: { enable: true, limit: 3 },
  },
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
    wordCount: { enable: true, count: true, min2read: true },
    authorLabel: { enable: true, auto: false, list: [] },
    codeBlock: {
      copy: true,
      style: 'mac',
      highlightTheme: { light: 'github', dark: 'vs2015' },
      font: { enable: false },
    },
    toc: {
      enable: true,
      maxDepth: 3,
      number: false,
      expand: true,
      initOpen: true,
    },
    copyright: { enable: true, default: 'cc_by_nc_sa' },
    lazyload: true,
    pangu: true,
    recommendation: {
      enable: true,
      title: 'Related Posts',
      limit: 3,
      mobileLimit: 2,
      placeholder: '/images/wallhaven-wqery6-light.webp',
      skipDirs: [],
    },
  },
  comment: {
    enable: false,
    system: 'waline',
    config: {
      waline: {
        serverUrl: '',
        lang: 'en',
        emoji: [],
        reaction: false,
      },
      gitalk: {},
      twikoo: { version: '1.6.10' },
      giscus: {
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        lang: 'en',
        inputPosition: 'bottom',
        loading: 'lazy',
      },
      artalk: {},
      utterances: {
        issueTerm: 'pathname',
        themeLight: 'github-light',
        themeDark: 'github-dark',
      },
    },
  },
  footer: {
    runtime: true,
    icon: '<i class="fa-solid fa-code-pull-request"></i>',
    start: '2024/01/01 00:00:00',
    statistics: true,
    icp: { enable: false },
  },
  inject: {
    enable: false,
    head: [],
    footer: [],
  },
  plugins: {
    feed: { enable: true },
    aplayer: { enable: false, type: 'mini', audios: [] },
    mermaid: {
      enable: true,
      version: '11.4.1',
      theme: { light: 'default', dark: 'dark' },
    },
  },
  pageTemplates: {
    friendsColumn: 2,
    tagsStyle: 'blur',
    masonry: { batchSize: 12, initialBatchSize: 24 },
  },
  seo: {
    openGraph: true,
    robots: 'index,follow',
  },
};

export default defaultConfig;
