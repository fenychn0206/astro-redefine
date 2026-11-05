import config from '../config';

export const base = config.site.base.endsWith('/')
  ? config.site.base
  : `${config.site.base}/`;

export function urlFor(path = '/'): string {
  if (!path || path === '/') return base;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path;
  }
  if (path.startsWith('#')) return path;
  const clean = path.replace(/^\//, '');
  if (!clean.endsWith('/') && !/\.[a-z0-9]+$/i.test(clean)) {
    return `${base}${clean}/`;
  }
  return `${base}${clean}`;
}

export function isExternal(path = ''): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(path) && !path.startsWith(config.site.url);
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, config.site.url).toString();
}
