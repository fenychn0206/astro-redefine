import YAML from 'yaml';

import friendsRaw from '../data/friends.json?raw';
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

interface RemoteFriend {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const remoteFriends = (JSON.parse(friendsRaw) ?? []) as RemoteFriend[];

export const friendGroups: FriendGroup[] = remoteFriends.length
  ? [
      {
        links_category: '',
        has_thumbnail: false,
        list: remoteFriends
          .filter((friend) => friend.name && friend.url)
          .map((friend) => ({
            name: friend.name,
            link: friend.url,
            avatar: friend.avatar,
            description: friend.description || hostnameOf(friend.url),
          })),
      },
    ]
  : [];
export const essays = (YAML.parse(essaysRaw) ?? []) as Essay[];
export const masonryItems = (YAML.parse(masonryRaw) ?? []) as MasonryItem[];
export const bookmarkGroups = (YAML.parse(bookmarksRaw) ?? []) as BookmarkGroup[];
