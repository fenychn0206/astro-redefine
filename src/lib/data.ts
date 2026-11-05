import YAML from 'yaml';

import linksRaw from '../data/links.yml?raw';
import essaysRaw from '../data/essays.yml?raw';
import masonryRaw from '../data/masonry.yml?raw';
import bookmarksRaw from '../data/bookmarks.yml?raw';

export interface FriendLink {
  name: string;
  link: string;
  description?: string;
  avatar?: string;
  thumbnail?: string;
}

export interface FriendGroup {
  links_category: string;
  has_thumbnail?: boolean;
  list: FriendLink[];
}

export interface Essay {
  content: string;
  date: string;
}

export interface MasonryItem {
  image: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  exif?: boolean;
}

export interface BookmarkItem {
  name: string;
  link: string;
  description?: string;
  image?: string;
}

export interface BookmarkGroup {
  category: string;
  icon?: string;
  items: BookmarkItem[];
}

export const friendGroups = (YAML.parse(linksRaw) ?? []) as FriendGroup[];
export const essays = (YAML.parse(essaysRaw) ?? []) as Essay[];
export const masonryItems = (YAML.parse(masonryRaw) ?? []) as MasonryItem[];
export const bookmarkGroups = (YAML.parse(bookmarksRaw) ?? []) as BookmarkGroup[];
