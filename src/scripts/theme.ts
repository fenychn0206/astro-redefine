/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Redefine for Astro — browser runtime.
 * Ported from the original theme's ES modules and consolidated into a single
 * dependency-light entry point.
 */

type ThemeConfig = any;

function readConfig(): ThemeConfig {
  const element = document.getElementById('redefine-config');
  if (!element?.textContent) return {};
  try {
    return JSON.parse(element.textContent);
  } catch {
    return {};
  }
}

const theme: ThemeConfig = readConfig();
const BASE = (document.body?.dataset.base || '/').replace(/\/?$/, '/');
const THEME_KEY = 'REDEFINE-THEME-STATUS';

function url(path: string): string {
  if (!path) return BASE;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  return `${BASE}${path.replace(/^\//, '')}`;
}

function $(selector: string, root: ParentNode = document): HTMLElement | null {
  return root.querySelector(selector) as HTMLElement | null;
}

function $$(selector: string, root: ParentNode = document): HTMLElement[] {
  return Array.from(root.querySelectorAll(selector)) as HTMLElement[];
}

function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function storedStatus(): any {
  try {
    return JSON.parse(localStorage.getItem(THEME_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function saveStatus(patch: any): void {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify({ ...storedStatus(), ...patch }));
  } catch {
    /* ignore */
  }
}

/* -------------------------------------------------------------------------- */
/* Theme mode                                                                 */
/* -------------------------------------------------------------------------- */

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

function setTheme(dark: boolean): void {
  const root = document.documentElement;
  const body = document.body;
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  body?.classList.toggle('dark-mode', dark);
  body?.classList.toggle('light-mode', !dark);
  const icon = $('.tool-dark-light-toggle i');
  if (icon) icon.className = dark ? 'fa-regular fa-brightness' : 'fa-regular fa-moon';
  saveStatus({ isDark: dark });
  updateGiscusTheme(dark);
  updateUtterancesTheme(dark);
  renderMermaid(true);
}

function toggleTheme(): void {
  setTheme(!isDark());
}

/* -------------------------------------------------------------------------- */
/* Font size                                                                  */
/* -------------------------------------------------------------------------- */

let fontLevel = Number(storedStatus().fontSizeLevel ?? 0);

function applyFontLevel(): void {
  const base = 16;
  document.documentElement.style.fontSize = `${base * (1 + fontLevel * 0.05)}px`;
  saveStatus({ fontSizeLevel: fontLevel });
}

function changeFont(delta: number): void {
  fontLevel = Math.min(5, Math.max(0, fontLevel + delta));
  applyFontLevel();
}

/* -------------------------------------------------------------------------- */
/* Navbar / mobile drawer                                                     */
/* -------------------------------------------------------------------------- */

function closeDrawer(): void {
  document.body.classList.remove('navbar-drawer-show');
}

function initNavbar(): void {
  const header = $('.main-content-header');
  const navbar = $('.navbar-container');
  const threshold = navbar?.getBoundingClientRect().height || 70;
  const scrollTop = window.scrollY;
  document.body.classList.toggle('navbar-shrink', scrollTop > threshold);

  if (theme.navbar?.autoHide && header) {
    const previous = Number((window as any).__redefineLastScroll ?? 0);
    const hide = scrollTop > window.innerHeight && scrollTop > previous;
    header.classList.toggle('hide', hide);
  }
  (window as any).__redefineLastScroll = scrollTop;
}

/* -------------------------------------------------------------------------- */
/* Side tools / scroll                                                        */
/* -------------------------------------------------------------------------- */

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom(): void {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function updateScrollUI(): void {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight;
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const percent = Math.min(100, Math.max(0, Math.round((scrollTop / Math.max(1, height - viewport)) * 100)));

  const bar = $('.scroll-progress-bar');
  if (bar) {
    bar.style.width = `${percent}%`;
    bar.style.visibility = percent === 0 ? 'hidden' : 'visible';
  }

  const percentElement = $('.tool-scroll-to-top .percent');
  const topButton = $('.tool-scroll-to-top');
  if (percentElement) percentElement.textContent = String(percent);
  topButton?.classList.toggle('show', percent > 0);

  const tools = $('.right-side-tools-container');
  if (tools) {
    const atTop = scrollTop <= 100 && location.pathname === BASE;
    const atBottom = scrollTop + viewport >= height - 20;
    tools.classList.toggle('hide', atTop || atBottom);
  }

  if (theme.homeBanner?.enable && theme.homeBanner?.style === 'fixed') {
    const background = $('.home-banner-background');
    if (background && location.pathname === BASE) {
      const blur = scrollTop > 60 ? 15 : 0;
      background.style.filter = `blur(${blur}px)`;
    }
  }

  updateTocActive();
  initNavbar();
}

function updateTocActive(): void {
  const container = $('.toc-content-container');
  if (!container) return;
  const links = $$('.post-toc a.nav-link', container);
  if (!links.length) return;

  const targets = links
    .map((link) => {
      const href = link.getAttribute('href') || '';
      return document.getElementById(decodeURIComponent(href.replace('#', '')));
    })
    .filter(Boolean) as HTMLElement[];

  let index = targets.findIndex((element) => element.getBoundingClientRect().top - 110 > 0);
  if (index === -1) index = targets.length - 1;
  else if (index > 0) index -= 1;

  links.forEach((link, i) => {
    link.classList.toggle('active', i === index);
    link.parentElement?.classList.toggle('active', i === index);
    link.parentElement?.classList.toggle('active-current', i === index);
  });
}

function toggleToc(): void {
  const container = $('.post-page-container');
  const main = $('.main-content');
  if (!container || !main) return;
  const open = !container.classList.contains('show-toc');
  container.classList.toggle('show-toc', open);
  main.classList.toggle('has-toc', open);
  saveStatus({ isOpenPageAside: open });
  const icon = $('.page-aside-toggle i');
  if (icon) icon.className = open ? 'fas fa-indent' : 'fa-regular fa-outdent';
}

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

let searchCache: any[] | null = null;
let searchLoading = false;

async function loadSearchData(): Promise<any[]> {
  if (searchCache) return searchCache;
  if (searchLoading) return [];
  searchLoading = true;
  try {
    const response = await fetch(url('/search.json'));
    if (!response.ok) throw new Error(String(response.status));
    const data = await response.json();
    searchCache = Array.isArray(data) ? data : [];
    return searchCache;
  } catch (error) {
    console.error('[redefine] search data failed', error);
    searchCache = [];
    return [];
  } finally {
    searchLoading = false;
  }
}

function openSearch(): void {
  const overlay = $('.search-pop-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  const input = $('.search-input') as HTMLInputElement | null;
  setTimeout(() => input?.focus(), 100);
  if (theme.navbar?.search?.preload) void loadSearchData();
}

function closeSearch(): void {
  const overlay = $('.search-pop-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function highlight(text: string, keywords: string[]): string {
  let output = escapeHtml(text);
  for (const keyword of keywords) {
    if (!keyword) continue;
    output = output.replace(
      new RegExp(escapeRegExp(escapeHtml(keyword)), 'gi'),
      (match) => `<b class="search-keyword">${match}</b>`,
    );
  }
  return output;
}

function renderSearchResults(query: string): void {
  const result = $('#search-result');
  if (!result) return;
  const search = query.trim();
  if (!search) {
    result.innerHTML = '<div id="no-result"><i class="fa-solid fa-magnifying-glass fa-5x"></i></div>';
    return;
  }
  if (!searchCache) {
    result.innerHTML = '<div id="no-result"><i class="fa-solid fa-spinner fa-spin-pulse fa-5x fa-fw"></i></div>';
    return;
  }

  const keywords = search.toLowerCase().split(/[-\s]+/).filter(Boolean);
  const matches: Array<{ title: string; content: string; url: string; score: number }> = [];

  for (const item of searchCache) {
    const title = String(item.title || '');
    const content = String(item.content || '');
    const haystack = `${title} ${content}`.toLowerCase();
    let score = 0;
    if (title.toLowerCase().includes(search.toLowerCase())) score += 8;
    for (const keyword of keywords) {
      if (title.toLowerCase().includes(keyword)) score += 4;
      if (content.toLowerCase().includes(keyword)) score += 1;
    }
    if (score > 0 || haystack.includes(search.toLowerCase())) {
      matches.push({ title, content, url: item.url, score });
    }
  }

  if (!matches.length) {
    result.innerHTML = '<div id="no-result"><i class="fa-solid fa-box-open fa-5x"></i></div>';
    return;
  }

  const html = matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((item) => {
      const lower = item.content.toLowerCase();
      const first = keywords
        .map((keyword) => lower.indexOf(keyword))
        .filter((index) => index >= 0)
        .sort((a, b) => a - b)[0];
      const start = first === undefined ? 0 : Math.max(0, first - 60);
      const end = first === undefined ? 180 : Math.min(item.content.length, first + 140);
      const snippet = item.content.slice(start, end);
      return `<li><a href="${escapeHtml(item.url)}" class="search-result-title">${highlight(item.title, keywords)}</a><a href="${escapeHtml(item.url)}"><p class="search-result">${highlight(snippet, keywords)}…</p></a></li>`;
    })
    .join('');

  result.innerHTML = `<ul class="search-result-list">${html}</ul>`;
}

function handleSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target.matches('.search-input')) return;
  void loadSearchData().then(() => renderSearchResults(target.value));
}

/* -------------------------------------------------------------------------- */
/* Code blocks, tabs and mermaid                                              */
/* -------------------------------------------------------------------------- */

function prepareCodeBlocks(): void {
  $$('pre.astro-code').forEach((pre) => {
    if (pre.closest('.code-container')) return;
    const language = (pre.dataset.language || '').toLowerCase();
    if (language === 'mermaid') {
      const raw = pre.textContent || '';
      const mermaid = document.createElement('pre');
      mermaid.className = 'mermaid';
      mermaid.textContent = raw;
      mermaid.dataset.originalCode = raw;
      pre.replaceWith(mermaid);
      return;
    }

    const container = document.createElement('div');
    container.className = 'code-container';
    container.dataset.rel = language ? language.charAt(0).toUpperCase() + language.slice(1) : 'Code';
    pre.parentNode?.insertBefore(container, pre);
    container.appendChild(pre);
    pre.classList.add('highlight');

    if (theme.articles?.codeBlock?.copy !== false) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-button';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML = '<i class="fa-regular fa-copy"></i>';
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = '<i class="fa-regular fa-check"></i>';
          setTimeout(() => {
            button.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 1000);
        } catch {
          /* ignore */
        }
      });
      container.appendChild(button);
    }
  });
}

async function renderMermaid(reset = false): Promise<void> {
  const mermaid = (window as any).mermaid;
  if (!mermaid || !theme.plugins?.mermaid?.enable) return;
  const blocks = $$('pre.mermaid');
  if (!blocks.length) return;

  if (reset) {
    blocks.forEach((block) => {
      block.removeAttribute('data-processed');
      block.innerHTML = block.dataset.originalCode || block.textContent || '';
    });
  }

  const mermaidTheme = isDark()
    ? theme.plugins.mermaid.theme?.dark || 'dark'
    : theme.plugins.mermaid.theme?.light || 'default';
  mermaid.initialize({ startOnLoad: false, theme: mermaidTheme, securityLevel: 'loose' });
  try {
    await mermaid.run({ nodes: blocks });
  } catch (error) {
    console.error('[redefine] mermaid failed', error);
  }
}

let mermaidTimer = 0;
function initMermaid(): void {
  if (!theme.plugins?.mermaid?.enable) return;
  if (mermaidTimer) window.clearInterval(mermaidTimer);
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if ((window as any).mermaid) {
      window.clearInterval(timer);
      void renderMermaid();
    } else if (attempts > 30) {
      window.clearInterval(timer);
    }
  }, 200);
  mermaidTimer = timer;
}

/* -------------------------------------------------------------------------- */
/* Images / EXIF                                                              */
/* -------------------------------------------------------------------------- */

let gallery: HTMLElement[] = [];
let galleryIndex = 0;
let viewerScale = 1;
let viewerX = 0;
let viewerY = 0;
let dragging = false;
let dragStart = { x: 0, y: 0 };
let exifLoaded = false;

const imageSelector = '.markdown-body img, .masonry-item img, #shuoshuo-content img';

function viewerContainer(): HTMLElement | null {
  return $('.image-viewer-container');
}

function applyViewerTransform(): void {
  const img = $('.image-viewer-frame img') as HTMLImageElement | null;
  if (img) img.style.transform = `translate(${viewerX}px, ${viewerY}px) scale(${viewerScale})`;
}

function resetViewerTransform(): void {
  viewerScale = 1;
  viewerX = 0;
  viewerY = 0;
  applyViewerTransform();
}

function updateViewer(): void {
  const container = viewerContainer();
  const target = $('.image-viewer-frame img') as HTMLImageElement | null;
  const source = gallery[galleryIndex] as HTMLImageElement | undefined;
  if (!container || !target || !source) return;

  target.src = source.dataset.src || source.currentSrc || source.src;
  target.alt = source.alt || '';
  resetViewerTransform();
  $('.image-viewer-prev')?.classList.toggle('is-disabled', galleryIndex <= 0);
  $('.image-viewer-next')?.classList.toggle('is-disabled', galleryIndex >= gallery.length - 1);

  const exifToggle = $('.image-viewer-exif-toggle');
  exifToggle?.classList.toggle('hidden', source.dataset.exif !== 'true');
  const panel = $('.image-viewer-exif-panel');
  panel?.classList.add('hidden');
  panel?.setAttribute('aria-hidden', 'true');
  exifToggle?.setAttribute('aria-expanded', 'false');
}

function openViewer(image: HTMLElement): void {
  gallery = $$(imageSelector).filter(
    (element) => !element.closest('.image-viewer-container'),
  ) as HTMLImageElement[];
  galleryIndex = Math.max(0, gallery.indexOf(image as HTMLImageElement));
  const container = viewerContainer();
  if (!container) return;
  updateViewer();
  container.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeViewer(): void {
  const container = viewerContainer();
  if (!container) return;
  container.classList.remove('active');
  document.body.style.overflow = '';
  resetViewerTransform();
}

function moveViewer(delta: number): void {
  const next = galleryIndex + delta;
  if (next < 0 || next >= gallery.length) return;
  galleryIndex = next;
  updateViewer();
}

function initExif(): void {
  if (exifLoaded) return;
  exifLoaded = true;
  const script = document.createElement('script');
  script.src = url('/js/libs/exif-reader.js');
  script.onload = () => {
    const image = gallery[galleryIndex] as HTMLImageElement | undefined;
    if (image) void showExif(image);
  };
  document.body.appendChild(script);
}

async function showExif(image: HTMLImageElement): Promise<void> {
  const body = $('.image-viewer-exif-body');
  if (!body) return;
  body.textContent = 'Loading…';
  try {
    const response = await fetch(image.currentSrc || image.src);
    const buffer = await response.arrayBuffer();
    const ExifReader = (window as any).ExifReader;
    if (!ExifReader) throw new Error('ExifReader missing');
    const tags = ExifReader.load(buffer);
    const rows = [
      ['Camera', [tags.Make?.description, tags.Model?.description].filter(Boolean).join(' ')],
      ['Lens', tags.LensModel?.description || tags.Lens?.description || ''],
      ['Date', tags.DateTimeOriginal?.description || tags.DateTime?.description || ''],
      ['Exposure', tags.ExposureTime?.description || ''],
      ['Aperture', tags.FNumber?.description || ''],
      ['ISO', tags.ISO?.value?.[0] || tags.PhotographicSensitivity?.value?.[0] || ''],
    ].filter(([, value]) => value);
    body.innerHTML = rows.length
      ? rows.map(([label, value]) => `<div class="flex justify-between gap-4 py-0.5"><span class="text-third-text-color">${escapeHtml(String(label))}</span><span class="text-first-text-color">${escapeHtml(String(value))}</span></div>`).join('')
      : 'No EXIF available';
  } catch {
    body.textContent = 'EXIF unavailable';
  }
}

function bindImageViewer(): void {
  const container = viewerContainer();
  if (!container || container.dataset.bound) return;
  container.dataset.bound = 'true';

  const target = $('.image-viewer-frame img') as HTMLImageElement | null;
  target?.addEventListener('wheel', (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    viewerScale = Math.min(4, Math.max(0.5, viewerScale + (event.deltaY < 0 ? 0.1 : -0.1)));
    applyViewerTransform();
  }, { passive: false });
  target?.addEventListener('mousedown', (event) => {
    event.preventDefault();
    dragging = true;
    dragStart = { x: event.clientX - viewerX, y: event.clientY - viewerY };
    target.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (event) => {
    if (!dragging) return;
    viewerX = event.clientX - dragStart.x;
    viewerY = event.clientY - dragStart.y;
    applyViewerTransform();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    if (target) target.style.cursor = 'grab';
  });
}

/* -------------------------------------------------------------------------- */
/* Comments                                                                  */
/* -------------------------------------------------------------------------- */

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    });
    script.addEventListener('error', reject);
    document.body.appendChild(script);
  });
}

function loadStylesheet(href: string, id: string): void {
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.id = id;
  document.head.appendChild(link);
}

async function initWaline(root: HTMLElement): Promise<void> {
  const config = theme.comment?.config?.waline || {};
  if (!config.serverUrl) return;
  try {
    const dynamicImport = new Function('u', 'return import(u)') as (u: string) => Promise<any>;
    const module = await dynamicImport(url('/js/libs/waline.js'));
    (window as any).__redefineWaline?.destroy?.();
    const instance = (module as any).init({
      el: '#waline',
      serverURL: config.serverUrl,
      path: location.pathname,
      dark: 'body[class~="dark-mode"]',
      lang: config.lang || 'en',
      emoji: config.emoji?.length ? config.emoji : undefined,
      reaction: Boolean(config.reaction),
      requiredMeta: ['nick', 'mail'],
      recaptchaV3Key: config.recaptchaV3Key || undefined,
      turnstileKey: config.turnstileKey || undefined,
    });
    (window as any).__redefineWaline = instance;
  } catch (error) {
    console.error('[redefine] waline failed', error);
  }
}

function initGiscus(root: HTMLElement): void {
  const config = theme.comment?.config?.giscus || {};
  const container = $('#giscus-container', root);
  if (!container || !config.repo || !config.repoId || !config.categoryId) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  const attrs: Record<string, string> = {
    'data-repo': config.repo,
    'data-repo-id': config.repoId,
    'data-category': config.category || '',
    'data-category-id': config.categoryId,
    'data-mapping': config.mapping || 'pathname',
    'data-strict': config.strict || '0',
    'data-reactions-enabled': config.reactionsEnabled || '1',
    'data-emit-metadata': config.emitMetadata || '0',
    'data-input-position': config.inputPosition || 'bottom',
    'data-theme': isDark() ? 'dark' : 'light',
    'data-lang': config.lang || 'en',
    'data-loading': config.loading || 'lazy',
  };
  for (const [key, value] of Object.entries(attrs)) script.setAttribute(key, value);
  container.appendChild(script);
}

function initUtterances(root: HTMLElement): void {
  const config = theme.comment?.config?.utterances || {};
  const container = $('#utterances-container', root);
  if (!container || !config.repo) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.setAttribute('repo', config.repo);
  if (config.issueNumber) script.setAttribute('issue-number', config.issueNumber);
  else script.setAttribute('issue-term', config.issueTerm || 'pathname');
  if (config.label) script.setAttribute('label', config.label);
  script.setAttribute('theme', isDark() ? config.themeDark || 'github-dark' : config.themeLight || 'github-light');
  container.appendChild(script);
}

async function initTwikoo(root: HTMLElement): Promise<void> {
  const config = theme.comment?.config?.twikoo || {};
  if (!config.serverUrl) return;
  await loadScript(
    `https://cdnjs.cloudflare.com/ajax/libs/twikoo/${config.version || '1.6.10'}/twikoo.all.min.js`,
    'twikoo-script',
  );
  const twikoo = (window as any).twikoo;
  const container = $('#twikoo-comment', root);
  if (!twikoo || !container) return;
  container.innerHTML = '';
  twikoo.init({
    el: '#twikoo-comment',
    envId: config.serverUrl,
    region: config.region || undefined,
    path: location.pathname,
  });
}

async function initGitalk(root: HTMLElement): Promise<void> {
  const config = theme.comment?.config?.gitalk || {};
  if (!config.clientID || !config.owner || !config.repo) return;
  loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/gitalk/1.8.0/gitalk.min.css', 'gitalk-css');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gitalk/1.8.0/gitalk.min.js', 'gitalk-script');
  const Gitalk = (window as any).Gitalk;
  const container = $('#gitalk-container', root);
  if (!Gitalk || !container) return;
  container.innerHTML = '';
  let key = decodeURI(location.pathname);
  if (key.length > 50) key = `${key.slice(0, 47)}...`;
  new Gitalk({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    repo: config.repo,
    owner: config.owner,
    admin: [config.owner],
    id: key,
    language: theme.site?.language || 'en',
    proxy: config.proxy || 'https://github.com/login/oauth/access_token',
  }).render(container);
}

async function initArtalk(root: HTMLElement): Promise<void> {
  const config = theme.comment?.config?.artalk || {};
  if (!config.server || !config.site) return;
  loadStylesheet('https://cdn.jsdelivr.net/npm/artalk/dist/Artalk.css', 'artalk-css');
  await loadScript('https://cdn.jsdelivr.net/npm/artalk/dist/Artalk.js', 'artalk-script');
  const Artalk = (window as any).Artalk;
  if (!Artalk || !$('#artalk-comment', root)) return;
  (window as any).__redefineArtalk?.destroy?.();
  (window as any).__redefineArtalk = Artalk.init({
    el: '#artalk-comment',
    server: config.server,
    site: config.site,
  });
}

function initComments(): void {
  $$('.comment-root').forEach((root) => {
    if ((root as HTMLElement).dataset.initialized === 'true') return;
    (root as HTMLElement).dataset.initialized = 'true';
    const system = (root as HTMLElement).dataset.commentSystem;
    if (!system) return;
    if (system === 'waline') void initWaline(root);
    else if (system === 'giscus') initGiscus(root);
    else if (system === 'utterances') initUtterances(root);
    else if (system === 'twikoo') void initTwikoo(root);
    else if (system === 'gitalk') void initGitalk(root);
    else if (system === 'artalk') void initArtalk(root);
  });
}

function updateGiscusTheme(dark: boolean): void {
  const frame = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null;
  frame?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? 'dark' : 'light' } } },
    'https://giscus.app',
  );
}

function updateUtterancesTheme(dark: boolean): void {
  const frame = document.querySelector('iframe.utterances-frame') as HTMLIFrameElement | null;
  const themeLight = $('#utterances-container')?.dataset.utterancesThemeLight || 'github-light';
  const themeDark = $('#utterances-container')?.dataset.utterancesThemeDark || 'github-dark';
  frame?.contentWindow?.postMessage(
    { type: 'set-theme', theme: dark ? themeDark : themeLight },
    'https://utteranc.es',
  );
}

/* -------------------------------------------------------------------------- */
/* Footer runtime / counters / essays / bookmarks                            */
/* -------------------------------------------------------------------------- */

let runtimeTimer = 0;

function initRuntime(): void {
  if (runtimeTimer) {
    window.clearInterval(runtimeTimer);
    runtimeTimer = 0;
  }
  const holder = $('[data-runtime-start]');
  if (!holder) return;
  const start = new Date(holder.dataset.runtimeStart || '');
  if (Number.isNaN(start.getTime())) return;

  const elements = {
    days: $('#runtime_days'),
    hours: $('#runtime_hours'),
    minutes: $('#runtime_minutes'),
    seconds: $('#runtime_seconds'),
  };

  const update = () => {
    const diff = Math.max(0, Date.now() - start.getTime());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const values = { days, hours, minutes, seconds };
    for (const [key, element] of Object.entries(elements)) {
      if (!element) continue;
      const value = Number(String(values[key as keyof typeof values]).padStart(key === 'days' ? 3 : 2, '0'));
      if ((element as any).odometer) (element as any).odometer.update(value);
      else element.textContent = String(value).padStart(key === 'days' ? 3 : 2, '0');
    }
  };

  update();
  runtimeTimer = window.setInterval(update, 1000);
}

function initCounter(): void {
  if (!theme.global?.websiteCounter?.enable) return;
  document.getElementById('redefine-vercount')?.remove();
  const script = document.createElement('script');
  script.id = 'redefine-vercount';
  script.src = theme.global.websiteCounter.url || 'https://cn.vercount.one/js';
  script.defer = true;
  document.body.appendChild(script);
}

function initEssayDates(): void {
  $$('.essay-date').forEach((element) => {
    const raw = element.dataset.date;
    if (!raw) return;
    try {
      const date = new Date(raw);
      const locale = theme.site?.language || 'en';
      element.textContent = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      /* ignore */
    }
  });
}

let bookmarkScrollHandler: (() => void) | null = null;
function initBookmarkNav(): void {
  const items = $$('.bookmark-nav-item');
  const sections = $$('section[id]');
  if (!items.length || !sections.length) return;
  const update = () => {
    const fromTop = window.scrollY + 110;
    let current: HTMLElement | null = null;
    for (const section of sections) {
      if (fromTop >= section.offsetTop && fromTop < section.offsetTop + section.offsetHeight) {
        current = section;
      }
    }
    items.forEach((item) => {
      item.classList.toggle('active', Boolean(current && item.dataset.category === current.id));
    });
  };
  if (bookmarkScrollHandler) window.removeEventListener('scroll', bookmarkScrollHandler);
  bookmarkScrollHandler = update;
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* -------------------------------------------------------------------------- */
/* Home banner typewriter                                                     */
/* -------------------------------------------------------------------------- */

let typewriterTimer = 0;
let typewriterToken = 0;

function initTypewriter(): void {
  const target = $('#subtitle');
  if (!target) return;
  if (typewriterTimer) window.clearTimeout(typewriterTimer);
  const token = ++typewriterToken;

  const subtitle = theme.homeBanner?.subtitle || {};
  const strings: string[] = Array.isArray(subtitle.text)
    ? subtitle.text.filter(Boolean)
    : subtitle.text
      ? [subtitle.text]
      : [];
  const hitokoto = subtitle.hitokoto || {};

  const start = async () => {
    if (token !== typewriterToken) return;
    if (hitokoto.enable && hitokoto.api) {
      try {
        const response = await fetch(hitokoto.api);
        const data = await response.json();
        const author = hitokoto.showAuthor && data.from_who ? `——${data.from_who}` : '';
        strings.push(`${data.hitokoto || ''}${author}`);
      } catch {
        /* ignore */
      }
    }
    if (!strings.length || token !== typewriterToken) return;

    const typeSpeed = Number(subtitle.typingSpeed ?? 100);
    const backSpeed = Number(subtitle.backingSpeed ?? 80);
    const backDelay = Number(subtitle.backingDelay ?? 1500);
    const startDelay = Number(subtitle.startingDelay ?? 500);
    const loop = subtitle.loop !== false;

    let stringIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      if (token !== typewriterToken) return;
      const current = strings[stringIndex] || '';
      if (!deleting) {
        charIndex += 1;
        target.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          if (!loop && stringIndex === strings.length - 1) return;
          deleting = true;
          typewriterTimer = window.setTimeout(tick, backDelay);
          return;
        }
        typewriterTimer = window.setTimeout(tick, typeSpeed);
      } else {
        charIndex -= 1;
        target.textContent = current.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
          typewriterTimer = window.setTimeout(tick, 250);
          return;
        }
        typewriterTimer = window.setTimeout(tick, backSpeed);
      }
    };

    typewriterTimer = window.setTimeout(tick, startDelay);
  };

  void start();
}

/* -------------------------------------------------------------------------- */
/* Misc                                                                       */
/* -------------------------------------------------------------------------- */

let panguTimer = 0;
function initPangu(): void {
  if (!theme.articles?.pangu) return;
  if (panguTimer) window.clearInterval(panguTimer);
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const pangu = (window as any).pangu;
    if (pangu) {
      window.clearInterval(timer);
      try {
        pangu.spacingElementByClassName('markdown-body');
      } catch {
        /* ignore */
      }
    } else if (attempts > 20) {
      window.clearInterval(timer);
    }
  }, 250);
  panguTimer = timer;
}

function initAPlayer(): void {
  const config = theme.plugins?.aplayer;
  if (!config?.enable) return;
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const APlayer = (window as any).APlayer;
    const container = document.getElementById('aplayer');
    if (!APlayer || !container) {
      if (attempts > 30) window.clearInterval(timer);
      return;
    }
    window.clearInterval(timer);
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';
    const audios = (config.audios || []).map((audio: any) => ({
      name: audio.name,
      artist: audio.artist,
      url: audio.url,
      cover: audio.cover,
      lrc: audio.lrc,
    }));
    if (!audios.length) return;
    if (config.type === 'mini') new APlayer({ container, mini: true, audio: audios });
    else new APlayer({ container, fixed: true, lrcType: 3, audio: audios });
  }, 200);
}

function initOdometer(): void {
  const Odometer = (window as any).Odometer;
  if (!Odometer) return;
  $$('.odometer').forEach((element) => {
    if ((element as any).odometer) return;
    (element as any).odometer = new Odometer({
      el: element,
      format: '( ddd).dd',
      duration: 200,
    });
  });
}

function initPage(): void {
  applyFontLevel();
  const icon = $('.tool-dark-light-toggle i');
  if (icon) icon.className = isDark() ? 'fa-regular fa-brightness' : 'fa-regular fa-moon';

  prepareCodeBlocks();
  bindImageViewer();
  initMermaid();
  initComments();
  initRuntime();
  initOdometer();
  initTypewriter();
  initPangu();
  initAPlayer();
  initCounter();
  initEssayDates();
  initBookmarkNav();
  updateScrollUI();
  renderMermaid();

  if (theme.navbar?.search?.preload) void loadSearchData();
}

/* -------------------------------------------------------------------------- */
/* Global listeners                                                           */
/* -------------------------------------------------------------------------- */

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  if (target.closest('.search-popup-trigger')) {
    event.preventDefault();
    openSearch();
    return;
  }
  if (target.closest('.popup-btn-close')) {
    closeSearch();
    return;
  }
  if (target === $('.search-pop-overlay')) {
    closeSearch();
    return;
  }
  if (target.closest('.search-input-field-pre')) {
    const input = $('.search-input') as HTMLInputElement | null;
    if (input) {
      input.value = '';
      input.focus();
      renderSearchResults('');
    }
    return;
  }

  if (target.closest('.tool-dark-light-toggle')) {
    toggleTheme();
    return;
  }
  if (target.closest('.tool-font-adjust-plus')) {
    changeFont(1);
    return;
  }
  if (target.closest('.tool-font-adjust-minus')) {
    changeFont(-1);
    return;
  }
  if (target.closest('.toggle-tools-list')) {
    $('.hidden-tools-list')?.classList.toggle('show');
    return;
  }
  if (target.closest('.tool-scroll-to-top')) {
    scrollToTop();
    return;
  }
  if (target.closest('.tool-scroll-to-bottom')) {
    scrollToBottom();
    return;
  }
  if (target.closest('.page-aside-toggle')) {
    toggleToc();
    return;
  }
  if (target.closest('.go-comment')) {
    const anchor = $('#comment-anchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const submenuToggle = target.closest('[navbar-data-toggle]') as HTMLElement | null;
  if (submenuToggle) {
    const id = submenuToggle.getAttribute('navbar-data-toggle');
    const submenu = id ? document.querySelector(`[data-target="${id}"]`) : null;
    submenu?.classList.toggle('hidden');
    submenuToggle.querySelector('.fa-chevron-right')?.classList.toggle('icon-rotated');
    return;
  }

  if (target.closest('.navbar-bar') || target.closest('.window-mask')) {
    document.body.classList.toggle('navbar-drawer-show');
    return;
  }
  if (target.closest('.navbar-drawer a')) {
    closeDrawer();
    return;
  }

  const tab = target.closest('.tabs [role="tablist"] button[data-tab]') as HTMLElement | null;
  if (tab) {
    const parent = tab.closest('.tabs');
    const id = tab.dataset.tab;
    if (parent && id) {
      $$('[role="tab"]', parent).forEach((button) => {
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('data-state', 'inactive');
        button.setAttribute('tabindex', '-1');
      });
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('data-state', 'active');
      tab.setAttribute('tabindex', '0');
      $$('.tab-pane', parent).forEach((pane) => {
        const active = pane.id === id;
        pane.hidden = !active;
        pane.dataset.state = active ? 'active' : 'inactive';
      });
    }
    return;
  }

  const image = target.closest(imageSelector) as HTMLElement | null;
  if (image && !target.closest('.image-viewer-container')) {
    openViewer(image);
    return;
  }

  if (target.closest('.image-viewer-prev')) {
    event.stopPropagation();
    moveViewer(-1);
    return;
  }
  if (target.closest('.image-viewer-next')) {
    event.stopPropagation();
    moveViewer(1);
    return;
  }
  if (target.closest('.image-viewer-close')) {
    closeViewer();
    return;
  }
  const viewer = $('.image-viewer-container');
  if (viewer && target === viewer) {
    closeViewer();
    return;
  }
  if (target.closest('.image-viewer-exif-toggle')) {
    const panel = $('.image-viewer-exif-panel');
    if (!panel) return;
    const open = panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !open);
    panel.setAttribute('aria-hidden', String(!open));
    $('.image-viewer-exif-toggle')?.setAttribute('aria-expanded', String(open));
    if (open) {
      const current = gallery[galleryIndex] as HTMLImageElement | undefined;
      if (current) {
        initExif();
        if (exifLoaded) void showExif(current);
      }
    }
    return;
  }
  if (target.closest('.image-viewer-exif-close')) {
    $('.image-viewer-exif-panel')?.classList.add('hidden');
    $('.image-viewer-exif-toggle')?.setAttribute('aria-expanded', 'false');
    return;
  }
});

document.addEventListener('input', handleSearchInput);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSearch();
    closeViewer();
  }
  const viewer = $('.image-viewer-container');
  if (viewer?.classList.contains('active')) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') moveViewer(-1);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') moveViewer(1);
  }
});

window.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateScrollUI);
}, { passive: true });

(window as any).scrollToMain = () => {
  const target = $('.main-content-container');
  target?.scrollIntoView({ behavior: 'smooth' });
};

document.addEventListener('astro:before-swap', () => {
  if (typewriterTimer) window.clearTimeout(typewriterTimer);
  (window as any).__redefineWaline?.destroy?.();
  closeSearch();
  closeViewer();
});

if (theme.global?.singlePage) {
  let receivedPageLoad = false;
  document.addEventListener('astro:page-load', () => {
    receivedPageLoad = true;
    initPage();
  });
  window.setTimeout(() => {
    if (!receivedPageLoad) initPage();
  }, 300);
} else {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage, { once: true });
  } else {
    initPage();
  }
}
