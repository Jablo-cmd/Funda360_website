#!/usr/bin/env node
/**
 * Live production verification (runs in CI after every deploy, from GitHub's
 * runners, against the real site).
 *
 *   node scripts/verify-live.mjs https://funda360.aurisnexus.co.za [expectedCommit]
 *
 * 1. Waits until /build-info.json reports the expected commit (Pages and its
 *    CDN can serve the previous build for a few minutes).
 * 2. Checks HTTPS redirect, robots.txt, sitemap.xml, every sitemap URL (status,
 *    canonical, robots, title, description, Open Graph, Twitter, JSON-LD), the
 *    slash-less variant redirect, every internal link and asset on those pages,
 *    noindex utility/alias/draft pages, the 404 page and the demo endpoint.
 * Prints every route it verified. Exits 1 on any failure.
 */
const ORIGIN = (process.argv[2] || '').replace(/\/$/, '');
const EXPECTED_COMMIT = process.argv[3] || process.env.GITHUB_SHA || '';
// Dry run: VERIFY_FETCH_BASE=http://localhost:4400 fetches from a local copy while expecting production URLs.
const FETCH_BASE = (process.env.VERIFY_FETCH_BASE || '').replace(/\/$/, '');
if (!ORIGIN.startsWith('https://')) {
  console.error('Usage: node scripts/verify-live.mjs https://<host> [commit]');
  process.exit(2);
}

const failures = [];
const warnings = [];
const verified = [];
const fail = (msg) => failures.push(msg);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { 'User-Agent': 'Funda360-live-verification (+https://github.com/Jablo-cmd/Funda360_website)' };
const get = (url, init = {}) => fetch(FETCH_BASE ? url.replace(ORIGIN, FETCH_BASE) : url, { redirect: 'manual', ...init, headers: { ...UA, ...(init.headers || {}) } });
const meta = (html, re) => (html.match(re) || [])[1];

// 1. Wait for the deployed commit to be served.
if (EXPECTED_COMMIT) {
  let served = '';
  for (let i = 0; i < 40; i++) {
    try {
      const res = await get(`${ORIGIN}/build-info.json?check=${Date.now()}`);
      if (res.ok) served = (await res.json()).commit;
    } catch {
      // Not reachable yet.
    }
    if (served === EXPECTED_COMMIT) break;
    await sleep(15000);
  }
  if (served !== EXPECTED_COMMIT) fail(`live site serves commit ${served || 'unknown'}, expected ${EXPECTED_COMMIT}`);
  else console.log(`Live site serves commit ${served}.`);
}

// 2. HTTPS redirect.
if (!FETCH_BASE) try {
  const http = await get(ORIGIN.replace('https://', 'http://') + '/');
  const loc = http.headers.get('location') || '';
  if (![301, 308].includes(http.status) || !loc.startsWith(ORIGIN)) fail(`http:// does not redirect to https (HTTP ${http.status} → ${loc})`);
  else verified.push(`http:// → ${loc} (${http.status})`);
} catch (error) {
  fail(`http:// request failed: ${error.message}`);
}

// 3. robots.txt and sitemap.xml.
const robots = await (await get(`${ORIGIN}/robots.txt`)).text();
if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots) || !robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail(`robots.txt is not the production version:\n${robots}`);
else verified.push('/robots.txt');
const sitemapRes = await get(`${ORIGIN}/sitemap.xml`);
const sitemap = await sitemapRes.text();
if (sitemapRes.status !== 200 || !/xml/.test(sitemapRes.headers.get('content-type') || '')) fail(`sitemap.xml HTTP ${sitemapRes.status} ${sitemapRes.headers.get('content-type')}`);
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length < 15) fail(`sitemap.xml lists only ${locs.length} URLs`);
if (new Set(locs).size !== locs.length) fail('sitemap.xml contains duplicate URLs');
for (const loc of locs) if (!loc.startsWith(`${ORIGIN}/`) || /localhost|127\.0\.0\.1|github\.io/.test(loc)) fail(`sitemap URL on the wrong host: ${loc}`);
verified.push(`/sitemap.xml (${locs.length} URLs)`);

// 4. Every sitemap URL.
const internal = new Set();
const titles = new Map();
const descriptions = new Map();
const checkedImages = new Set();
for (const loc of locs) {
  const res = await get(loc);
  if (res.status !== 200) {
    fail(`${loc}: HTTP ${res.status}`);
    continue;
  }
  if (!/text\/html/.test(res.headers.get('content-type') || '')) fail(`${loc}: content-type ${res.headers.get('content-type')}`);
  const html = await res.text();
  const canonical = meta(html, /<link rel="canonical" href="([^"]+)"/);
  const robotsMeta = meta(html, /<meta name="robots" content="([^"]+)"/);
  const title = meta(html, /<title>([^<]+)<\/title>/);
  const description = meta(html, /<meta name="description" content="([^"]+)"/);
  const ogImage = meta(html, /<meta property="og:image" content="([^"]+)"/);
  if (canonical !== loc) fail(`${loc}: canonical ${canonical}`);
  if (robotsMeta !== 'index, follow') fail(`${loc}: robots "${robotsMeta}"`);
  if (!title) fail(`${loc}: no title`);
  if (!description) fail(`${loc}: no description`);
  if (meta(html, /<meta property="og:url" content="([^"]+)"/) !== loc) fail(`${loc}: og:url mismatch`);
  if (meta(html, /<meta name="twitter:card" content="([^"]+)"/) !== 'summary_large_image') fail(`${loc}: twitter:card missing`);
  if (/localhost|127\.0\.0\.1|\.github\.io/.test(html)) fail(`${loc}: development or preview URL in the page`);
  for (const [, block] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block);
    } catch {
      fail(`${loc}: invalid JSON-LD`);
    }
  }
  if (ogImage && !checkedImages.has(ogImage)) {
    checkedImages.add(ogImage);
    const img = await get(ogImage);
    if (img.status !== 200 || img.headers.get('content-type') !== 'image/png') fail(`${loc}: og:image ${ogImage} → ${img.status} ${img.headers.get('content-type')}`);
  } else if (!ogImage) fail(`${loc}: no og:image`);
  titles.set(title, [...(titles.get(title) || []), loc]);
  descriptions.set(description, [...(descriptions.get(description) || []), loc]);
  for (const [, href] of html.matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)) if (!href.startsWith('//')) internal.add(href);

  // The slash-less variant must redirect to the canonical URL.
  const bare = loc.endsWith('/') && loc !== `${ORIGIN}/` ? loc.slice(0, -1) : null;
  if (bare) {
    const r = await get(bare);
    const to = new URL(r.headers.get('location') || '', bare).href;
    if (![301, 308].includes(r.status) || to !== loc) fail(`${bare}: HTTP ${r.status} → ${to} (expected 301 → ${loc})`);
  }
  verified.push(new URL(loc).pathname);
}
for (const [t, urls] of titles) if (urls.length > 1) fail(`duplicate title "${t}": ${urls.join(', ')}`);
for (const [, urls] of descriptions) if (urls.length > 1) fail(`duplicate description on ${urls.join(', ')}`);

// 5. Every internal link and asset referenced by those pages.
let assets = 0;
for (const path of internal) {
  const res = await get(ORIGIN + path, { method: 'HEAD' });
  // Directory links without a slash are redirected by Pages; follow once.
  const status = [301, 308].includes(res.status) ? (await get(new URL(res.headers.get('location'), ORIGIN + path).href, { method: 'HEAD' })).status : res.status;
  if (status !== 200) fail(`internal link or asset ${path} → HTTP ${status}`);
  assets++;
}
verified.push(`${assets} internal links and assets`);

// 6. Pages that must exist but stay out of search.
const NOINDEX = ['/login/', '/privacy/', '/terms/', '/demo/', '/product/', '/features/', '/resources/why-school-data-fragmentation-matters/'];
for (const path of NOINDEX) {
  const res = await get(ORIGIN + path);
  const html = res.status === 200 ? await res.text() : '';
  if (res.status !== 200) fail(`${path}: HTTP ${res.status}`);
  else if (!/<meta name="robots" content="noindex/.test(html)) fail(`${path}: should be noindex`);
  else verified.push(`${path} (noindex)`);
  if (locs.some((l) => l.endsWith(path))) fail(`${path}: must not be in the sitemap`);
}

// 7. 404 behaviour.
const missing = await get(`${ORIGIN}/this-page-does-not-exist-${Date.now()}/`);
const missingHtml = await missing.text();
if (missing.status !== 404 || !missingHtml.includes('Page not found')) fail(`unknown URL returned HTTP ${missing.status}`);
else verified.push('/<unknown>/ (404 page)');

// 8. Icons.
for (const icon of ['/favicon.ico', '/icon.svg', '/apple-icon.png', '/brand/funda360-logo.png']) {
  const res = await get(ORIGIN + icon, { method: 'HEAD' });
  if (res.status !== 200) fail(`${icon}: HTTP ${res.status}`);
}
verified.push('icons');

// 9. Demo endpoint configuration.
const demoHtml = await (await get(`${ORIGIN}/request-demo/`)).text();
if (demoHtml.includes('data-notice="endpoint"')) {
  warnings.push('Request a Demo is NOT connected in production (NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT is not set). The form says so to visitors.');
} else {
  const endpoint = process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT;
  if (endpoint) {
    try {
      const pre = await fetch(endpoint, { method: 'OPTIONS', headers: { Origin: ORIGIN, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
      if (pre.status !== 204 || pre.headers.get('access-control-allow-origin') !== ORIGIN) fail(`demo endpoint preflight: HTTP ${pre.status}, allow-origin ${pre.headers.get('access-control-allow-origin')}`);
      else verified.push('demo endpoint CORS preflight');
      const get405 = await fetch(endpoint, { headers: { Origin: ORIGIN } });
      if (get405.status !== 405) fail(`demo endpoint GET should be 405, got ${get405.status}`);
    } catch (error) {
      fail(`demo endpoint unreachable: ${error.message}`);
    }
  }
}

console.log(`\nVerified ${FETCH_BASE ? `(dry run, served from ${FETCH_BASE})` : `in production (${ORIGIN})`}:\n  ${verified.join('\n  ')}`);
for (const w of warnings) console.log(`\n⚠ ${w}`);
if (failures.length) {
  console.error(`\n✗ Live verification failed (${failures.length}):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('\n✓ Live production verification passed.');
