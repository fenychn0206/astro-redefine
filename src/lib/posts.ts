import { getCollection } from 'astro:content';

import config from '../config';
import { datePath, formatPostDate } from './date';

export type PostEntry = {
  id: string;
  slug?: string;
  body?: string;
  data: {
    title: string;
    date: Date;
    updated?: Date;
    tags: string[];
    categories: string[];
    thumbnail?: string | boolean;
    cover?: string;
    banner?: string;
    sticky?: number | boolean;
    excerpt?: boolean | string;
    author?: string | { name?: string; avatar?: string; url?: string };
    avatar?: string;
    license?: string;
    copyright?: string;
    comment?: boolean;
    expires?: Date;
    description?: string;
    keywords?: string;
    draft?: boolean;
  };
};

export function slugify(input: string): string {
  return String(input)
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/['"’“”]/g, '')
    .replace(/[^\p{Letter}\p{Number}\u4e00-\u9fa5]+/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPostSlug(post: PostEntry): string {
  return post.slug ? slugify(post.slug) : slugify(post.id.replace(/\.md$/, ''));
}

export function getPostPath(post: PostEntry): string {
  const { year, month, day } = datePath(post.data.date);
  return `${config.site.base}${year}/${month}/${day}/${getPostSlug(post)}/`;
}

export function getPostUrl(post: PostEntry): string {
  return new URL(getPostPath(post), config.site.url).toString();
}

export async function getAllPosts(): Promise<PostEntry[]> {
  const posts = (await getCollection('posts')) as unknown as PostEntry[];
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => {
      const stickyA = typeof a.data.sticky === 'number' ? a.data.sticky : a.data.sticky ? 1 : 0;
      const stickyB = typeof b.data.sticky === 'number' ? b.data.sticky : b.data.sticky ? 1 : 0;
      if (stickyA !== stickyB) return stickyB - stickyA;
      return b.data.date.getTime() - a.data.date.getTime();
    });
}

export function getPostImage(post: PostEntry): string | null {
  if (post.data.thumbnail === false) return null;
  if (typeof post.data.thumbnail === 'string') return post.data.thumbnail;
  if (post.data.cover) return post.data.cover;
  if (post.data.banner) return post.data.banner;
  return null;
}

export function stripMarkdown(input: string): string {
  return String(input ?? '')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{%[\s\S]*?%\}/g, ' ')
    .replace(/:::[a-zA-Z-]+[^\n]*/g, ' ')
    .replace(/::[a-zA-Z-]+\[[^\]]*\](?:\{[^}]*\})?/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/::+/g, ' ')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(post: PostEntry, length = config.home.excerptLength): string {
  const dataExcerpt = post.data.excerpt;
  if (dataExcerpt === false) return '';
  if (typeof dataExcerpt === 'string' && dataExcerpt.trim()) return dataExcerpt;

  const body = String(post.body ?? '');
  const moreIndex = body.indexOf('<!-- more -->');
  const source = moreIndex >= 0 ? body.slice(0, moreIndex) : body;
  const plain = stripMarkdown(source);
  if (plain.length <= length) return plain;
  return `${plain.slice(0, length).trimEnd()}…`;
}

export function getWordCount(text: string): number {
  const plain = stripMarkdown(text);
  const cjk = (plain.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length;
  const latin = plain
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return cjk + latin;
}

export function getReadingTime(words: number): number {
  return Math.max(1, Math.ceil(words / 300));
}

export function getAuthor(post: PostEntry): {
  name: string;
  avatar: string;
  url?: string;
} {
  const author = post.data.author;
  if (typeof author === 'string' && author.trim()) {
    return {
      name: author,
      avatar: post.data.avatar || config.images.avatar,
    };
  }
  if (author && typeof author === 'object') {
    return {
      name: author.name || config.site.author,
      avatar: author.avatar || post.data.avatar || config.images.avatar,
      url: author.url,
    };
  }
  return {
    name: config.site.author,
    avatar: post.data.avatar || config.images.avatar,
  };
}

export function getAuthorLabel(postCount: number): string {
  const { auto, list } = config.articles.authorLabel;
  let level = Math.floor(Math.log2(Math.max(postCount, 1)));
  level = level < 2 ? 1 : level - 1;
  if (!auto && Array.isArray(list) && list.length > 0) {
    return level > list.length ? list[list.length - 1] : list[level - 1];
  }
  return `Lv${level}`;
}

export function getPostTaxonomies(posts: PostEntry[]) {
  const categories = new Map<string, number>();
  const tags = new Map<string, number>();

  for (const post of posts) {
    for (const category of post.data.categories) {
      categories.set(category, (categories.get(category) ?? 0) + 1);
    }
    for (const tag of post.data.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }

  const toList = (map: Map<string, number>) =>
    [...map.entries()]
      .map(([name, count]) => ({ name, count, slug: slugify(name) }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return { categories: toList(categories), tags: toList(tags) };
}

export function getArchiveGroups(posts: PostEntry[]) {
  const groups = new Map<string, PostEntry[]>();
  for (const post of posts) {
    const { year } = datePath(post.data.date);
    const list = groups.get(year) ?? [];
    list.push(post);
    groups.set(year, list);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, list]) => ({
      year,
      posts: list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    }));
}

export function getAdjacentPosts(posts: PostEntry[], current: PostEntry) {
  const sorted = [...posts].sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const index = sorted.findIndex((post) => post.id === current.id);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function getRecommendations(
  posts: PostEntry[],
  current: PostEntry,
  limit = config.articles.recommendation.limit,
): PostEntry[] {
  const currentTags = new Set(current.data.tags);
  const currentCategories = new Set(current.data.categories);

  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      const tagScore = post.data.tags.filter((tag) => currentTags.has(tag)).length * 3;
      const categoryScore = post.data.categories.filter((category) => currentCategories.has(category)).length * 2;
      return { post, score: tagScore + categoryScore };
    })
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}

export function formatDateForPost(post: PostEntry): string {
  return formatPostDate(post.data.date);
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * perPage, current * perPage),
    current,
    totalPages,
    perPage,
    total: items.length,
  };
}
