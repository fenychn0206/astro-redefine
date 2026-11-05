import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import config from '../config';
import { getAllPosts, getPostPath, stripMarkdown } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();
  const entries = posts.map((post) => ({
    title: post.data.title,
    content: stripMarkdown(post.body ?? ''),
    url: getPostPath(post),
    categories: post.data.categories,
    tags: post.data.tags,
  }));

  const pages = await getCollection('pages');
  for (const page of pages) {
    const type = String(page.data.type || page.data.template || '').toLowerCase();
    if (['masonry', 'bookmarks'].includes(type)) continue;
    entries.push({
      title: page.data.title,
      content: stripMarkdown(page.body ?? ''),
      url: `${config.site.base}${page.id.replace(/\.md$/, '')}/`,
      categories: [],
      tags: [],
    });
  }

  return new Response(JSON.stringify(entries), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
