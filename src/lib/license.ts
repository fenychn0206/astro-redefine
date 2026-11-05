import config from '../config';
import { useTranslations } from './i18n';

const LICENSES: Record<string, { label: string; url: string | null }> = {
  cc_by: {
    label: '<a class="license" href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>',
    url: 'https://creativecommons.org/licenses/by/4.0',
  },
  cc_by_sa: {
    label: '<a class="license" href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>',
    url: 'https://creativecommons.org/licenses/by-sa/4.0',
  },
  cc_by_nc: {
    label: '<a class="license" href="https://creativecommons.org/licenses/by-nc/4.0">CC BY-NC 4.0</a>',
    url: 'https://creativecommons.org/licenses/by-nc/4.0',
  },
  cc_by_nd: {
    label: '<a class="license" href="https://creativecommons.org/licenses/by-nd/4.0">CC BY-ND 4.0</a>',
    url: 'https://creativecommons.org/licenses/by-nd/4.0',
  },
  cc_by_nc_sa: {
    label: '<a class="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</a>',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0',
  },
  public_domain: { label: '', url: null },
  all_rights_reserved: { label: '', url: null },
};

export function resolveLicense(license?: string, custom?: string) {
  const t = useTranslations();
  if (custom && custom.trim()) {
    return { html: custom, url: null, type: 'custom' };
  }
  const type = license && LICENSES[license] ? license : config.articles.copyright.default;
  if (type === 'all_rights_reserved') {
    return {
      html: t('copyright.all_rights_reserved', config.site.author),
      url: null,
      type,
    };
  }
  if (type === 'public_domain') {
    return { html: t('copyright.public_domain'), url: null, type };
  }
  return {
    html: t('copyright.license_content', LICENSES[type].label),
    url: LICENSES[type].url,
    type,
  };
}
