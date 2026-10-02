#!/usr/bin/env node
/**
 * Verifies a production static export (./out) is ready for search engines.
 * Runs in the deploy workflow after `npm run build`; fails the deploy if the
 * build is not crawlable, mis-canonicalised or missing social images.
 *
 * Usage: node scripts/verify-seo-build.mjs [outDir] [expectedOrigin]
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2] || 'out';
const ORIGIN = (process.argv[3] || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
const failures = [];
const fail = (msg) => failures.push(msg);

if (!ORIGIN.startsWith('https://')) fail(`Expected an https origin, got "${ORIGIN}"`);

const robots = readFileSync(join(OUT, 'robots.txt'), 'utf8');
if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots)) fail('robots.txt does not allow crawling');
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('robots.txt does not reference the production sitemap');

const sitemap = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length < 15) fail(`sitemap.xml lists only ${locs.length} URLs`);

const fileFor = (url) => {
  const path = url.slice(ORIGIN.length) || '/';
  return join(OUT, path, 'index.html');
};
const meta = (html, re) => (html.match(re) || [])[1];
const titles = new Map();

for (const loc of locs) {
  if (!loc.startsWith(`${ORIGIN}/`)) fail(`${loc}: not on ${ORIGIN}`);
  if (!loc.endsWith('/')) fail(`${loc}: missing trailing slash (static export serves /path/)`);
  const file = fileFor(loc);
  if (!existsSync(file)) {
    fail(`${loc}: no page at ${file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
  const robotsMeta = meta(html, /<meta name="robots" content="([^"]+)"/);
  const title = meta(html, /<title>([^<]+)<\/title>/);
  const description = meta(html, /<meta name="description" content="([^"]+)"/);
  const ogImage = meta(html, /<meta property="og:image" content="([^"]+)"/);
  if (canonical !== loc) fail(`${loc}: canonical is ${canonical}`);
  if (robotsMeta !== 'index, follow') fail(`${loc}: robots meta is "${robotsMeta}"`);
  if (!title) fail(`${loc}: missing <title>`);
  if (!description || description.length < 70) fail(`${loc}: missing or short description`);
  if (!ogImage || !ogImage.startsWith(`${ORIGIN}/og/`) || !existsSync(join(OUT, ogImage.slice(ORIGIN.length)))) fail(`${loc}: og:image missing (${ogImage})`);
  if (!/application\/ld\+json/.test(html)) fail(`${loc}: no structured data`);
  titles.set(title, [...(titles.get(title) || []), loc]);
}
for (const [title, urls] of titles) if (urls.length > 1) fail(`duplicate title "${title}": ${urls.join(', ')}`);

for (const path of ['login/index.html', 'privacy/index.html', 'terms/index.html']) {
  const html = readFileSync(join(OUT, path), 'utf8');
  if (!/<meta name="robots" content="noindex/.test(html)) fail(`${path}: should be noindex`);
  if (locs.some((l) => l.includes(`/${path.split('/')[0]}/`))) fail(`${path}: should not be in the sitemap`);
}

if (failures.length) {
  console.error(`✗ SEO build verification failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`✓ SEO build verified: ${locs.length} sitemap URLs on ${ORIGIN}, canonical, robots, titles, descriptions, OG images and structured data.`);
