#!/usr/bin/env node
/**
 * Refresh the friend-links data from the ooowl.net repository.
 * Usage: node scripts/fetch-friends.mjs
 */
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SOURCE =
  'https://raw.githubusercontent.com/fenychn0206/ooowl.net/refs/heads/main/src/data/friends.json';
const OUTPUT = resolve(process.cwd(), 'src/data/friends.json');

const response = await fetch(SOURCE);
if (!response.ok) {
  throw new Error(`Failed to fetch friend links: ${response.status} ${response.statusText}`);
}

const data = await response.json();
if (!Array.isArray(data)) {
  throw new Error('Friend links source must be an array.');
}

const friends = data
  .filter((item) => item && typeof item.name === 'string' && typeof item.url === 'string')
  .map((item) => ({
    name: item.name.trim(),
    url: item.url.trim(),
    avatar: typeof item.avatar === 'string' ? item.avatar.trim() : '',
    ...(typeof item.description === 'string' && item.description.trim()
      ? { description: item.description.trim() }
      : {}),
  }));

await writeFile(OUTPUT, `${JSON.stringify(friends, null, 2)}\n`, 'utf8');
console.log(`Wrote ${friends.length} friend links to ${OUTPUT}`);
