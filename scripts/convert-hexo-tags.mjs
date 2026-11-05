#!/usr/bin/env node
/**
 * Convert the Nunjucks/Swig tag syntax used by Hexo themes into the
 * remark-directive `:::` syntax used by this Astro theme.
 *
 * Usage:
 *   node scripts/convert-hexo-tags.mjs src/content
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'src/content';
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
}

function quote(value) {
  return String(value ?? '').replace(/"/g, '&quot;');
}

function attrs(entries) {
  const parts = entries
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}="${quote(value)}"`);
  return parts.length ? `{${parts.join(' ')}}` : '';
}

function splitTag(raw) {
  const match = raw.match(/^\{%\s*([A-Za-z][\w-]*)\s*([\s\S]*?)\s*%\}$/);
  if (!match) return null;
  return { name: match[1], args: match[2].trim() };
}

function parseButtonArgs(args) {
  const parts = args
    .split('::')
    .map((part) => part.trim())
    .filter(Boolean);
  let style = '';
  let text = '';
  let url = '';
  let icon = '';

  if (parts.length >= 4) {
    [style, text, url, icon] = parts;
  } else if (parts.length === 3) {
    if (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(parts[1])) {
      [text, url, icon] = parts;
    } else {
      [style, text, url] = parts;
    }
  } else if (parts.length === 2) {
    [text, url] = parts;
  } else {
    [text] = parts;
  }

  const tokens = style.toLowerCase().split(/\s+/);
  const size = tokens.includes('large') || tokens.includes('lg')
    ? 'lg'
    : tokens.includes('small') || tokens.includes('sm')
      ? 'sm'
      : '';
  const align = ['left', 'center', 'right'].find((value) => tokens.includes(value)) || '';

  return {
    text,
    href: url,
    icon: icon.includes('fa-') ? icon : '',
    size,
    align,
  };
}

function convertLine(line) {
  const trimmed = line.trim();

  if (/^\<!--\s*tab\b[\s\S]*?--\>$/.test(trimmed)) {
    const raw = trimmed.replace(/^\<!--\s*tab\b/, '').replace(/--\>$/, '').trim();
    const [title, icon] = raw.split('@').map((value) => value.trim());
    return `:::tab[${title}]${attrs([['icon', icon]])}`;
  }

  if (/^\<!--\s*endtab\s*--\>$/.test(trimmed)) return ':::';

  const tag = splitTag(trimmed);
  if (!tag) return line;

  const { name, args } = tag;

  if (name === 'btn' || name === 'button' || name === 'cell') {
    const parsed = parseButtonArgs(args);
    return `::button[${parsed.text}]${attrs([
      ['href', parsed.href],
      ['icon', parsed.icon],
      ['size', parsed.size],
      ['align', parsed.align],
    ])}`;
  }

  if (name === 'tabs' || name === 'subtabs' || name === 'subsubtabs') {
    const [setName, active] = args.split('::').map((value) => value.trim());
    return `::::${name}${attrs([['name', setName], ['active', active]])}`;
  }

  if (name === 'endtabs' || name === 'endsubtabs' || name === 'endsubsubtabs') {
    return '::::';
  }

  if (name === 'folding' || name === 'fold') {
    const delimiter = args.includes('::') ? '::' : '';
    const pieces = delimiter ? args.split(delimiter).map((value) => value.trim()) : [args, ''];
    const [style, title] = pieces;
    const open = /open/i.test(style) ? 'true' : '';
    return `::::folding[${title || style}]${attrs([
      ['style', style.replace(/\bopen\b/i, '').trim()],
      ['open', open],
    ])}`;
  }

  if (name.startsWith('endfolding') || name === 'endfold') return '::::';

  if (['note', 'notes', 'subnote', 'notel', 'noteL', 'notelarge', 'note-large', 'notes-large', 'subwarning', 'callout'].includes(name)) {
    const isTitled = !['note', 'notes', 'subnote', 'callout'].includes(name);
    const tokens = args.split(/\s+/).filter(Boolean);
    let type = tokens.shift() || 'default';
    let icon = '';
    const remaining = [];
    for (const token of tokens) {
      if (token.startsWith('fa-') && !icon) icon = token;
      else remaining.push(token);
    }
    return `:::${name}${attrs([
      ['type', type],
      ['title', isTitled ? remaining.join(' ') : ''],
      ['icon', icon],
    ])}`;
  }

  if (/^end(note|notes|subnote|notel|noteL|notelarge|note-large|notes-large|subwarning|callout)$/.test(name)) {
    return ':::';
  }

  return line;
}

function convertSource(source) {
  const lines = source.split('\n');
  const out = [];

  for (const line of lines) {
    const converted = convertLine(line);
    if (converted !== line) {
      if (out.length && out.at(-1).trim() !== '') out.push('');
      out.push(converted);
      out.push('');
    } else {
      out.push(line);
    }
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

walk(root);

let changed = 0;
for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const converted = convertSource(original);
  if (converted !== original) {
    fs.writeFileSync(file, converted);
    changed += 1;
    console.log(`converted ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`\n${changed} markdown file(s) converted.`);
