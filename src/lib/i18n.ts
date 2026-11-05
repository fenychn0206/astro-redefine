import YAML from 'yaml';

import enRaw from '../i18n/en.yml?raw';
import esRaw from '../i18n/es.yml?raw';
import frRaw from '../i18n/fr.yml?raw';
import jaRaw from '../i18n/ja.yml?raw';
import zhCNRaw from '../i18n/zh-CN.yml?raw';
import zhTWRaw from '../i18n/zh-TW.yml?raw';

import config from '../config';

type Dict = Record<string, any>;

const locales: Record<string, Dict> = {
  en: YAML.parse(enRaw),
  es: YAML.parse(esRaw),
  fr: YAML.parse(frRaw),
  ja: YAML.parse(jaRaw),
  'zh-CN': YAML.parse(zhCNRaw),
  'zh-TW': YAML.parse(zhTWRaw),
};

const aliases: Record<string, string> = {
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  es: 'es',
  fr: 'fr',
  ja: 'ja',
  'ja-jp': 'ja',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-TW',
};

export function resolveLanguage(language = config.site.language): string {
  const normalized = String(language || 'en').toLowerCase();
  if (aliases[normalized]) return aliases[normalized];
  const prefix = normalized.split('-')[0];
  return aliases[prefix] || 'en';
}

export function getDictionary(language = config.site.language): Dict {
  return locales[resolveLanguage(language)] || locales.en;
}

function lookup(dict: Dict, path: string): unknown {
  return path.split('.').reduce<unknown>((value, part) => {
    if (value && typeof value === 'object') {
      return (value as Dict)[part];
    }
    return undefined;
  }, dict);
}

/**
 * Translate a dotted key. Supports sprintf-style `%s` / `%d` replacements.
 * Missing keys fall back to English and then to the key itself.
 */
export function useTranslations(language = config.site.language) {
  const dict = getDictionary(language);
  return function t(key: string, ...args: Array<string | number>): string {
    let value = lookup(dict, key);
    if (value === undefined) value = lookup(locales.en, key);
    if (value === undefined) return key;
    if (typeof value !== 'string') return String(value);

    let index = 0;
    return value.replace(/%[sd]/g, () => String(args[index++] ?? ''));
  };
}

export const i18n = getDictionary(config.site.language);
