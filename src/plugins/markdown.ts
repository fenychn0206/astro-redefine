// @ts-nocheck
/**
 * Markdown extensions for the Redefine Astro theme.
 *
 * Hexo themes often rely on Nunjucks/EJS tag plugins for things like notes,
 * tabs and buttons. This plugin implements the same components with standard
 * `remark-directive` container/leaf syntax, so everything stays valid
 * Markdown:
 *
 *   :::note{type=info}
 *   Content
 *   :::
 *
 *   :::folding[Click to expand]{style=blue}
 *   Content
 *   :::
 *
 *   :::tabs{name=example}
 *   :::tab[First tab]
 *   ...
 *   :::
 *   :::
 *
 *   ::button[Read the docs]{href=/docs icon="fa-solid fa-book"}
 */
import { visit } from 'unist-util-visit';

const ELEMENT = 'redefineElement';

const NOTE_TYPES = new Set([
  'note',
  'notes',
  'subnote',
  'notel',
  'noteL',
  'notelarge',
  'note-large',
  'notes-large',
  'subwarning',
  'callout',
]);

const FOLDING_TYPES = new Set(['folding', 'fold', 'collapse', 'details']);
const TABS_TYPES = new Set(['tabs', 'subtabs', 'subsubtabs']);
const TAB_TYPES = new Set(['tab']);
const GRID_TYPES = new Set(['grid', 'btns', 'buttons']);
const BUTTON_TYPES = new Set(['button', 'btn', 'cell']);

const ICON_STYLES = new Set([
  'fa-solid',
  'fa-regular',
  'fa-light',
  'fa-thin',
  'fa-duotone',
  'fa-brands',
  'fa-sharp',
  'fa-sharp-solid',
  'fa-sharp-regular',
  'fa-sharp-light',
  'fa-sharp-thin',
]);

function element(tagName: string, properties: Record<string, any> = {}, children: any[] = []): any {
  return {
    type: ELEMENT,
    data: { hName: tagName, hProperties: properties },
    children,
  };
}

function text(value: unknown): any {
  return { type: 'text', value: String(value ?? '') };
}

function hastElement(tagName: string, properties: Record<string, any> = {}, children: any[] = []): any {
  return { type: 'element', tagName, properties, children };
}

function cls(...values: any[]): string[] {
  return values
    .flat()
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean);
}

function hasAttribute(node: any, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(node.attributes ?? {}, name);
}

function attr(node, name, fallback = '') {
  const value = node.attributes?.[name];
  if (value === undefined || value === null) return fallback;
  return String(value);
}

function flag(node, name) {
  if (!hasAttribute(node, name)) return false;
  const value = attr(node, name, 'true').toLowerCase();
  return !['false', '0', 'no', 'off'].includes(value);
}

function splitIcon(raw) {
  const tokens = String(raw ?? '')
    .split(/\s+/)
    .filter(Boolean);
  if (!tokens.length) return { iconClass: '', extra: [] };

  let style = '';
  let icon = '';
  const extra = [];

  for (const token of tokens) {
    if (token.startsWith('fa-')) {
      if (ICON_STYLES.has(token)) {
        if (!style) style = token;
      } else if (!icon) {
        icon = token;
      }
    } else {
      extra.push(token);
    }
  }

  return {
    iconClass: icon ? `${style || 'fa-solid'} ${icon}` : '',
    extra,
  };
}

function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function nodeText(node: any): string {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') return String(node.value ?? '');
  if (Array.isArray(node.children)) return node.children.map(nodeText).join('');
  return '';
}

function getDirectiveLabel(node: any): string {
  if (typeof node.label === 'string' && node.label.trim()) return node.label.trim();
  const first = node.children?.[0];
  if (first?.data?.directiveLabel) return nodeText(first).trim();
  if (node.type === 'leafDirective' || node.type === 'textDirective') {
    return nodeText(node).trim();
  }
  return '';
}

function stripDirectiveLabel(children: any[] = []): any[] {
  return children.filter((child) => !child?.data?.directiveLabel);
}

function parseType(node, fallback = 'default') {
  return attr(node, 'type', fallback) || fallback;
}

function renderIcon(iconClass, extraClass = '') {
  if (!iconClass) return null;
  return element('i', {
    className: cls(iconClass, extraClass),
    'aria-hidden': 'true',
  });
}

function renderTitle(title, iconClass) {
  const children = [];
  const icon = renderIcon(iconClass, 'leading-none');
  if (icon) children.push(icon);
  if (children.length) children.push(text(' '));
  children.push(text(title));
  return element(
    'div',
    {
      className: cls(
        'callout__title',
        'flex',
        'items-center',
        'gap-2',
        'font-semibold',
        'tracking-tight',
      ),
    },
    children,
  );
}

function renderCallout(node, label = '') {
  const name = node.name;
  const titledByName = name === 'notel' || name === 'noteL' || name === 'notelarge' || name === 'note-large' || name === 'notes-large' || name === 'subwarning';
  const title = (label || node.label || attr(node, 'title', '')).trim();
  const titled = titledByName || Boolean(title) || flag(node, 'large');
  const type = parseType(node);
  const rawIcon = flag(node, 'icon') ? 'fa-solid fa-circle-info' : attr(node, 'icon');
  const { iconClass, extra } = splitIcon(rawIcon);
  const extraClasses = cls(attr(node, 'class'), attr(node, 'classes'), extra);
  const content = node.children ?? [];

  const contentWrapper = element(
    'div',
    {
      className: cls(
        'callout__content',
        'markdown-body',
        'flex-1',
        'min-w-0',
        'not-markdown',
      ),
    },
    content,
  );

  const bar = element('div', {
    role: 'none',
    className:
      'rounded-full self-stretch w-0.5 bg-(--callout-primary-color) shrink-0 opacity-60',
  });

  if (titled) {
    return element(
      'div',
      {
        className: cls(
          'callout',
          'callout--titled',
          type,
          extraClasses,
          'mb-4 rounded-small shadow-redefine-flat bg-(--callout-bg-color) p-3 pl-1 relative flex flex-row gap-2',
        ),
      },
      [
        bar,
        element('div', { className: 'flex flex-col gap-2' }, [
          renderTitle(title || 'Warning', iconClass),
          contentWrapper,
        ]),
      ],
    );
  }

  const icon = renderIcon(
    iconClass,
    'callout__icon leading-none text-(--callout-primary-color) text-sm shrink-0',
  );

  const children = [bar];
  if (icon) children.push(icon);
  children.push(contentWrapper);

  return element(
    'div',
    {
      className: cls(
        'callout',
        'callout--simple',
        type,
        extraClasses,
        'mb-4 rounded-small shadow-redefine-flat bg-(--callout-bg-color) p-3 pl-1 relative flex flex-row gap-2 items-center',
      ),
    },
    children,
  );
}

function renderFolding(node, label = '') {
  const style = attr(node, 'style') || attr(node, 'class');
  const title = (label || node.label || attr(node, 'title', '')).trim() || 'Details';
  const open = flag(node, 'open');

  const summaryChildren = [
    element('i', { className: 'fa-solid fa-chevron-right', 'aria-hidden': 'true' }),
    text(title),
  ];

  return element(
    'details',
    {
      className: cls(
        'relative',
        'my-4',
        'border',
        'border-border-color',
        'bg-second-background-color',
        'rounded-md',
        style,
        attr(node, 'classes'),
      ),
      open: open ? true : undefined,
      'data-header-exclude': '',
    },
    [
      element(
        'summary',
        {
          className:
            'px-4 py-2 rounded-md shadow-[0_0_2px_0_var(--shadow-color-1)] cursor-pointer not-markdown',
        },
        summaryChildren,
      ),
      element('div', { className: 'content p-4' }, node.children ?? []),
    ],
  );
}

function buildTabs(node) {
  const tabNodes = (node.children ?? []).filter(
    (child) => child.type === 'containerDirective' && TAB_TYPES.has(child.name),
  );

  if (!tabNodes.length) {
    return element('div', { className: 'tabs' }, node.children ?? []);
  }

  const setLabel = (getDirectiveLabel(node) || attr(node, 'name') || attr(node, 'id') || 'tabs').trim();
  const activeIndex = Number(attr(node, 'active', '1')) || 1;
  const setId = `tab-${slugify(setLabel) || 'tabs'}`;

  const buttons = [];
  const panes = [];

  tabNodes.forEach((tab, index) => {
    const paneId = `${setId}-${index + 1}`;
    const caption = (getDirectiveLabel(tab) || attr(tab, 'title', '') || `Tab ${index + 1}`).trim();
    const iconClass = attr(tab, 'icon');
    const active = index + 1 === activeIndex;

    const buttonChildren = [];
    if (iconClass) {
      const icon = renderIcon(iconClass);
      if (icon) {
        buttonChildren.push(icon);
        buttonChildren.push(text(' '));
      }
    }
    buttonChildren.push(text(caption));

    buttons.push(
      element(
        'button',
        {
          type: 'button',
          role: 'tab',
          'aria-selected': active ? 'true' : 'false',
          'data-state': active ? 'active' : 'inactive',
          'data-tab': paneId,
          tabindex: active ? '0' : '-1',
          className:
            'inline-flex items-center gap-2 whitespace-nowrap text-third-text-color border-b-2 border-transparent py-2 text-sm font-medium transition-colors hover:text-second-text-color data-[state=active]:border-primary data-[state=active]:text-primary',
        },
        buttonChildren,
      ),
    );

    panes.push(
      element(
        'div',
        {
          className: 'tab-pane',
          'data-state': active ? 'active' : 'inactive',
          id: paneId,
          hidden: active ? undefined : true,
        },
        stripDirectiveLabel(tab.children ?? []),
      ),
    );
  });

  return element(
    'div',
    {
      className:
        'tabs relative my-4 bg-second-background-color border border-border-color rounded-md',
      id: setId,
    },
    [
      element(
        'div',
        {
          role: 'tablist',
          'aria-orientation': 'horizontal',
          className:
            'flex gap-3.5 overflow-x-auto px-4 not-markdown scrollbar-hide',
          tabindex: '0',
        },
        buttons,
      ),
      element(
        'div',
        {
          className:
            'tab-content p-4 bg-background-color/70 rounded-md shadow-[0_0_2px_0_var(--shadow-color-1)]',
        },
        panes,
      ),
    ],
  );
}

function renderGrid(node) {
  const cols = Math.max(2, Number(attr(node, 'cols', attr(node, 'columns', '2'))) || 2);
  const gap = attr(node, 'gap', '16px');
  const gapValue = /^[0-9.]+$/.test(gap) ? `${gap}px` : gap;

  return element(
    'div',
    {
      className: cls('grid', 'my-4', attr(node, 'class'), attr(node, 'classes')),
      style: `grid-template-columns: repeat(${cols}, minmax(0, 1fr)); gap: ${gapValue};`,
    },
    node.children ?? [],
  );
}

function renderButton(node) {
  const label = (getDirectiveLabel(node) || attr(node, 'text') || attr(node, 'label') || 'Button').trim();
  const href = attr(node, 'href') || attr(node, 'url');
  const iconClass = attr(node, 'icon');
  const image = attr(node, 'image') || attr(node, 'img');
  const align = ['left', 'center', 'right'].includes(attr(node, 'align'))
    ? attr(node, 'align')
    : '';
  const sizeAttr = attr(node, 'size').toLowerCase();
  const size =
    sizeAttr === 'small' || sizeAttr === 'sm'
      ? 'small'
      : sizeAttr === 'large' || sizeAttr === 'lg'
        ? 'large'
        : '';
  const target = attr(node, 'target');
  const rel = attr(node, 'rel') || (target === '_blank' ? 'noopener noreferrer' : undefined);

  const children = [];
  if (iconClass) {
    children.push(element('i', { className: cls(iconClass), 'aria-hidden': 'true' }));
    children.push(text(' '));
  } else if (image) {
    children.push(
      element('img', {
        src: image,
        alt: label,
        loading: 'lazy',
        style: 'display:inline-block;width:1.1em;height:1.1em;vertical-align:-0.15em;margin-right:.35em;',
      }),
    );
  }
  children.push(text(label));

  return element(
    'a',
    {
      className: cls('button', 'not-markdown', size, align, attr(node, 'class')),
      href: href || undefined,
      title: attr(node, 'title') || label,
      target: target || undefined,
      rel,
    },
    children,
  );
}

function transformNode(node) {
  if (!node || typeof node !== 'object') return node;

  if (node.type === 'containerDirective') {
    if (TABS_TYPES.has(node.name)) {
      // Process the content of each tab first so nested directives work, but
      // keep the tab container nodes themselves intact for buildTabs().
      const tabNodes = (node.children ?? []).filter(
        (child) => child.type === 'containerDirective' && TAB_TYPES.has(child.name),
      );
      for (const tab of tabNodes) {
        tab.children = (tab.children ?? []).map(transformNode);
      }
      node.children = (node.children ?? []).map((child) =>
        tabNodes.includes(child) ? child : transformNode(child),
      );
      return buildTabs(node);
    }

    const label = getDirectiveLabel(node);
    node.children = stripDirectiveLabel(node.children ?? []).map(transformNode);

    if (NOTE_TYPES.has(node.name)) return renderCallout(node, label);
    if (FOLDING_TYPES.has(node.name)) return renderFolding(node, label);
    if (GRID_TYPES.has(node.name)) return renderGrid(node);
    if (TAB_TYPES.has(node.name)) {
      // Orphan tab: render its content without a tabset.
      return element('div', { className: 'tab-pane' }, node.children);
    }
  }

  if (node.type === 'leafDirective' && BUTTON_TYPES.has(node.name)) {
    return renderButton(node);
  }

  if (node.type === 'textDirective' && BUTTON_TYPES.has(node.name)) {
    return renderButton(node);
  }

  if (Array.isArray(node.children)) {
    node.children = node.children.map(transformNode);
  }

  return node;
}

export function remarkRedefine() {
  return (tree) => {
    if (Array.isArray(tree.children)) {
      tree.children = tree.children.map(transformNode);
    }
  };
}

/**
 * Rehype additions: image captions, external-link icons, lazy images and the
 * optional delete mask. These mirror the theme's `after_post_render` filters.
 */
export function rehypeRedefine(options = {}) {
  const {
    siteUrl = '',
    linkIcon = true,
    imageCaption = false,
    lazyload = true,
    deleteMask = false,
  } = options;

  let siteHost = '';
  try {
    siteHost = new URL(siteUrl).hostname;
  } catch {
    siteHost = '';
  }

  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === undefined || index === null) return;

      if (node.tagName === 'img') {
        if (lazyload && !node.properties.loading) {
          node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
        }

        if (imageCaption && node.properties.alt) {
          const siblings = parent.children ?? [];
          const meaningful = siblings.filter(
            (child) => !(child.type === 'text' && !child.value.trim()),
          );
          if (parent.tagName === 'p' && meaningful.length === 1) {
            const figure = hastElement('figure', { className: 'image-caption' }, [
              node,
              hastElement('figcaption', {}, [text(node.properties.alt)]),
            ]);
            const parentIndex = tree.children?.indexOf(parent) ?? -1;
            if (parentIndex !== -1) {
              tree.children[parentIndex] = figure;
            }
            return;
          }
        }
        return;
      }

      if (node.tagName === 'a') {
        const href = String(node.properties.href ?? '');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }

        let isExternal = false;
        try {
          const url = new URL(href, siteUrl || 'https://example.com');
          isExternal = Boolean(siteHost) && url.hostname !== siteHost;
        } catch {
          isExternal = /^https?:\/\//i.test(href);
        }

        if (!isExternal) return;

        node.properties.className = cls(node.properties.className, 'link');
        node.properties.target = node.properties.target || '_blank';
        node.properties.rel = node.properties.rel || 'noopener noreferrer';

        if (linkIcon) {
          const already = (node.children ?? []).some(
            (child) =>
              child.type === 'element' &&
              Array.isArray(child.properties?.className) &&
              child.properties.className.includes('link-icon'),
          );
          if (!already) {
            node.children = [
              ...(node.children ?? []),
              hastElement('i', {
                className: cls(
                  'fa-solid',
                  'fa-arrow-up-right',
                  'ml-[0.2em]',
                  'font-light',
                  'align-text-top',
                  'text-[0.7em]',
                  'link-icon',
                ),
                'aria-hidden': 'true',
              }),
            ];
          }
        }
        return;
      }

      if (node.tagName === 'del' && deleteMask) {
        node.properties.className = cls(node.properties.className, 'mask');
      }
    });
  };
}
