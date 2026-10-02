#!/usr/bin/env node
/**
 * Verifies a production static export (./out) is ready for search engines.
 * Runs in the deploy workflow after `npm run build`; fails the deploy if the
 * build is not crawlable, mis-canonicalised or missing social images.
 *
 * Checks every sitemap URL (canonical, robots, title, description, Open
 * Graph, Twitter, JSON-LD), validates the JSON-LD graph on every page,
 * resolves every internal link and asset in every HTML file, and confirms
 * noindex pages, drafts and icons are handled correctly.
 *
 * Usage: node scripts/verify-seo-build.mjs [outDir] [expectedOrigin]
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const args = process.argv.slice(2);
const PREVIEW = args.includes('--preview');
const [OUT = 'out', ORIGIN_ARG = ''] = args.filter((a) => !a.startsWith('--'));
const ORIGIN = (ORIGIN_ARG || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
const failures = [];
const fail = (msg) => failures.push(msg);

/*
 * --preview: assert the indexing safety gate held for a non-production build
 * (robots.txt disallows everything and every page is noindex).
 *   node scripts/verify-seo-build.mjs out --preview
 */
if (PREVIEW) {
  const walkAll = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkAll(join(dir, e.name)) : [join(dir, e.name)]));
  const robotsTxt = readFileSync(join(OUT, 'robots.txt'), 'utf8');
  if (!/Disallow: \/\s*$/m.test(robotsTxt) || /Allow: \//.test(robotsTxt) || /Sitemap:/.test(robotsTxt)) fail(`preview robots.txt is not "Disallow: /":\n${robotsTxt}`);
  const pages = walkAll(OUT).filter((f) => f.endsWith('.html'));
  for (const file of pages) {
    const html = readFileSync(file, 'utf8');
    const robotsMeta = (html.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || '';
    if (!robotsMeta.startsWith('noindex')) fail(`${relative(OUT, file)}: preview page is not noindex (${robotsMeta || 'no robots meta'})`);
    if (/google-site-verification|msvalidate\.01/.test(html)) fail(`${relative(OUT, file)}: verification tag on a preview build`);
  }
  if (failures.length) {
    console.error(`✗ Preview build is indexable (${failures.length}):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`✓ Preview build is safe: robots.txt disallows all and ${pages.length} HTML files are noindex.`);
  process.exit(0);
}

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
  if (meta(html, /<meta name="twitter:card" content="([^"]+)"/) !== 'summary_large_image') fail(`${loc}: twitter:card missing`);
  if (meta(html, /<meta name="twitter:image" content="([^"]+)"/) !== ogImage) fail(`${loc}: twitter:image does not match og:image`);
  if (meta(html, /<meta property="og:url" content="([^"]+)"/) !== loc) fail(`${loc}: og:url does not match canonical`);
  // Every marketing page offers the primary next step.
  if (!loc.endsWith('/request-demo/') && !html.includes('href="/request-demo/"')) fail(`${loc}: no Request a Demo link`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(`${loc}: expected exactly one <h1>`);
  titles.set(title, [...(titles.get(title) || []), loc]);
}
for (const required of ['/', '/platform/', '/security/', '/request-demo/', '/platform/finance/', '/platform/attendance/']) {
  if (!locs.includes(`${ORIGIN}${required}`)) fail(`sitemap.xml is missing ${required}`);
}
for (const [title, urls] of titles) if (urls.length > 1) fail(`duplicate title "${title}": ${urls.join(', ')}`);

for (const path of ['login/index.html', 'privacy/index.html', 'terms/index.html']) {
  const html = readFileSync(join(OUT, path), 'utf8');
  if (!/<meta name="robots" content="noindex/.test(html)) fail(`${path}: should be noindex`);
  if (locs.some((l) => l.includes(`/${path.split('/')[0]}/`))) fail(`${path}: should not be in the sitemap`);
}

/* ------------------------------------------------------------------ */
/* Every HTML page: JSON-LD, internal links, assets, indexing intent    */
/* ------------------------------------------------------------------ */
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const htmlFiles = walk(OUT).filter((f) => f.endsWith('.html'));
const resolvesTo = (href) => {
  const path = decodeURI(href.split(/[?#]/)[0]);
  if (path === '' || path === '/') return existsSync(join(OUT, 'index.html'));
  if (path.endsWith('/')) return existsSync(join(OUT, path, 'index.html'));
  return existsSync(join(OUT, path)) || existsSync(join(OUT, `${path}.html`));
};
// Invented evidence must never appear in structured data.
const FORBIDDEN = ['aggregateRating', 'review', 'award', 'hasCredential', 'numberOfEmployees', 'foundingDate'];
const configuredProfiles = (process.env.NEXT_PUBLIC_SOCIAL_PROFILES || '').split(',').map((v) => v.trim()).filter(Boolean);
let jsonLdBlocks = 0;
let linksChecked = 0;

for (const file of htmlFiles) {
  const page = `/${relative(OUT, file)}`;
  const html = readFileSync(file, 'utf8');
  const isNotFound = page === '/404.html' || page.startsWith('/_not-found');

  // JSON-LD: parse, check types, ids and forbidden properties.
  const nodes = [];
  for (const [, body] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdBlocks++;
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      fail(`${page}: JSON-LD is not valid JSON`);
      continue;
    }
    if (data['@context'] !== 'https://schema.org') fail(`${page}: JSON-LD @context is ${data['@context']}`);
    nodes.push(...(Array.isArray(data['@graph']) ? data['@graph'] : [data]));
  }
  const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));
  const visit = (value, path) => {
    if (Array.isArray(value)) return value.forEach((v, i) => visit(v, `${path}[${i}]`));
    if (!value || typeof value !== 'object') return;
    for (const key of FORBIDDEN) if (key in value) fail(`${page}: JSON-LD ${path} has forbidden "${key}"`);
    if ('sameAs' in value && [].concat(value.sameAs).some((u) => !configuredProfiles.includes(u))) fail(`${page}: JSON-LD sameAs not from NEXT_PUBLIC_SOCIAL_PROFILES`);
    // A bare {"@id"} is a reference and must resolve within the page.
    if (Object.keys(value).length === 1 && value['@id'] && !ids.has(value['@id'])) fail(`${page}: JSON-LD reference ${value['@id']} does not resolve`);
    for (const [k, v] of Object.entries(value)) if (typeof v === 'object') visit(v, `${path}.${k}`);
    for (const k of ['url', 'item', 'logo', 'image']) {
      const u = value[k];
      if (typeof u === 'string' && u.startsWith(ORIGIN) && !resolvesTo(u.slice(ORIGIN.length) || '/')) fail(`${page}: JSON-LD ${k} ${u} does not exist in the build`);
    }
  };
  nodes.forEach((n, i) => visit(n, `#${i}`));
  const byType = (t) => nodes.filter((n) => [].concat(n['@type']).includes(t));
  if (!isNotFound && html.includes('application/ld+json')) {
    const org = byType('Organization')[0];
    const app = byType('SoftwareApplication')[0];
    if (!org || org.name !== 'Auris Nexus Technologies') fail(`${page}: Organization must be Auris Nexus Technologies`);
    if (!app || app.name !== 'Funda360' || app.creator?.['@id'] !== org?.['@id']) fail(`${page}: SoftwareApplication Funda360 must be created by the Organization`);
    if (!byType('WebSite').length) fail(`${page}: WebSite missing`);
  }
  for (const crumb of byType('BreadcrumbList')) {
    crumb.itemListElement.forEach((el, i) => {
      if (el.position !== i + 1) fail(`${page}: breadcrumb positions are not sequential`);
    });
  }
  for (const faq of byType('FAQPage')) {
    for (const q of faq.mainEntity) {
      if (!q.acceptedAnswer?.text) fail(`${page}: FAQ "${q.name}" has no answer`);
      // FAQ markup is only justified when the question is visible on the page.
      const visible = q.name.replace(/&/g, '&amp;').replace(/'/g, '&#x27;').replace(/"/g, '&quot;');
      if (!html.includes(visible) && !html.includes(q.name)) fail(`${page}: FAQ "${q.name}" is not visible on the page`);
    }
  }
  for (const article of byType('Article')) {
    for (const k of ['headline', 'datePublished', 'author', 'publisher', 'image']) if (!article[k]) fail(`${page}: Article missing ${k}`);
  }

  // Indexing intent: indexable pages must be in the sitemap; drafts must not be indexable.
  const robotsMeta = meta(html, /<meta name="robots" content="([^"]+)"/) || '';
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
  if (!isNotFound && canonical && robotsMeta.startsWith('index') && !locs.includes(canonical)) fail(`${page}: indexable but not in sitemap.xml`);
  if (/data-status="draft"|>Draft</.test(html) && robotsMeta.startsWith('index')) fail(`${page}: draft content is indexable`);

  // Internal links and assets resolve to files in the build.
  for (const [, attr, href] of html.matchAll(/\s(href|src)="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    linksChecked++;
    if (!resolvesTo(href)) fail(`${page}: ${attr}="${href}" does not resolve`);
  }
  // Article funnel: article -> capability -> solution -> Request a Demo.
  if (/^\/resources\/(?!category\/)[^/]+\/index\.html$/.test(page)) {
    if (!/href="\/(platform|ai)\/[^"]*"/.test(html)) fail(`${page}: article does not link to a capability page`);
    if (!/href="\/solutions\/[^"]+\/"/.test(html)) fail(`${page}: article does not link to a solution page`);
    if (!html.includes('href="/request-demo/"')) fail(`${page}: article does not link to Request a Demo`);
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(img)) fail(`${page}: <img> without alt`);
}

for (const icon of ['favicon.ico', 'icon.svg', 'apple-icon.png', 'brand/funda360-logo.png']) if (!existsSync(join(OUT, icon))) fail(`missing ${icon}`);
const demo = readFileSync(join(OUT, 'request-demo/index.html'), 'utf8');
if (!demo.includes('data-form="demo-request"')) fail('/request-demo/: demo form missing');

if (failures.length) {
  console.error(`✗ SEO build verification failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `✓ SEO build verified: ${locs.length} sitemap URLs on ${ORIGIN} (canonical, robots, titles, descriptions, Open Graph, Twitter, demo CTA); ` +
    `${htmlFiles.length} HTML files, ${jsonLdBlocks} JSON-LD blocks validated, ${linksChecked} internal links and assets resolved.`,
);
