import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const authorSchema = z.union([
  z.string(),
  z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    url: z.string().optional(),
  }),
]);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    thumbnail: z.union([z.string(), z.boolean()]).optional(),
    cover: z.string().optional(),
    banner: z.string().optional(),
    sticky: z.union([z.number(), z.boolean()]).optional(),
    excerpt: z.union([z.boolean(), z.string()]).optional(),
    author: authorSchema.optional(),
    avatar: z.string().optional(),
    license: z
      .enum([
        'cc_by_nc_sa',
        'cc_by_nd',
        'cc_by_nc',
        'cc_by_sa',
        'cc_by',
        'all_rights_reserved',
        'public_domain',
      ])
      .optional(),
    copyright: z.string().optional(),
    comment: z.boolean().optional(),
    expires: z.coerce.date().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    type: z.string().optional(),
    template: z.string().optional(),
    comment: z.boolean().default(false),
    description: z.string().optional(),
    keywords: z.string().optional(),
    sort: z.number().optional(),
  }),
});

export const collections = { posts, pages };
