import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import config from '../config';
import { getAllPosts, getExcerpt, getPostUrl } from '../lib/posts';

export const GET: APIRoute = async (context) => {
  const posts = await getAllPosts();
  return rss({
    title: config.site.title,
    description: config.site.description,
    site: context.site ?? config.site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: getExcerpt(post, 200),
      pubDate: post.data.date,
      link: getPostUrl(post),
      categories: [...post.data.categories, ...post.data.tags],
    })),
    customData: `<language>${config.site.language}</language>`,
  });
};
