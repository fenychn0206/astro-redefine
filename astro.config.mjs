// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';

import config from './src/config.ts';
import { rehypeRedefine, remarkRedefine } from './src/plugins/markdown.ts';

// https://astro.build/config
export default defineConfig({
  site: config.site.url,
  base: config.site.base,
  trailingSlash: 'always',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [remarkDirective, remarkRedefine],
      rehypePlugins: [
        [
          rehypeRedefine,
          {
            siteUrl: config.site.url,
            linkIcon: config.articles.style.linkIcon,
            imageCaption: config.articles.style.imageCaption,
            lazyload: config.articles.lazyload,
            deleteMask: config.articles.style.deleteMask,
          },
        ],
      ],
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
