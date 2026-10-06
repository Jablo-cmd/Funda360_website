#!/usr/bin/env node
/**
 * Full-site structural QA for the Funda360 marketing website.
 *
 * Usage:  npm run build && npm run qa
 *   QA_BASE_URL   use an already-running server instead of starting one
 *   CHROMIUM_PATH Chromium executable (defaults to /opt/pw-browsers/chromium)
 *
 * Checks every required route for: HTTP 200, exactly one h1, no skipped
 * heading levels, unique title + meta description, canonical, Open Graph,
 * valid JSON-LD, image alt text, console/runtime errors, axe WCAG 2.1 AA,
 * and no horizontal overflow at phone/tablet/desktop widths. Then crawls
 * every internal link and #fragment, and exercises the navigation (desktop
 * disclosure menus, mobile menu, keyboard Escape) and the demo form.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

const PORT = 3100;
const BASE = process.env.QA_BASE_URL || `http://localhost:${PORT}`;
const EXPECTED_LOGIN = process.env.NEXT_PUBLIC_APP_LOGIN_URL || 'https://app.funda360.aurisnexus.co.za/login';

const REQUIRED_ROUTES = [
  '/',
  '/platform',
  '/platform/learner-management',
  '/platform/academics-assessments',
  '/platform/attendance',
  '/platform/finance',
  '/platform/communication',
  '/platform/analytics',
  '/ai',
  '/solutions',
  '/solutions/schools',
  '/solutions/school-leadership',
  '/solutions/education-groups',
  '/solutions/funders',
  '/about',
  '/resources',
  '/resources/why-school-data-fragmentation-matters',
  '/resources/manage-understand-act',
  '/resources/using-attendance-information-well',
  '/resources/responsible-ai-in-schools',
  '/resources/category/school-leadership',
  '/resources/category/connected-data',
  '/resources/category/teaching-learning',
  '/resources/category/ai-in-education',
  '/request-demo',
  '/security',
  '/privacy',
  '/terms',
];
const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 640 },
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 800 },
];

const failures = [];
const notes = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server not up yet; retry.
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not start at ${url}`);
}

let server;
if (!process.env.QA_BASE_URL) {
  // A server left over from an earlier build would serve stale chunks; refuse to test against it.
  const inUse = await fetch(BASE).then(() => true, () => false);
  if (inUse) throw new Error(`Port ${PORT} is already in use. Stop the old server first.`);
  // Own process group so the whole tree (npx → next-server) can be stopped.
  server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', detached: true, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } });
  await waitForServer(BASE);
}
const stopServer = () => {
  if (server?.pid) {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      // Already stopped.
    }
  }
};

const executablePath = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath });

try {
  /* ------------------------------------------------------------ */
  /* 1. Per-page structure, SEO, a11y, runtime                    */
  /* ------------------------------------------------------------ */
  const titles = new Map();
  const descriptions = new Map();
  const internalLinks = new Set();
  const fragmentLinks = new Set();

  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  for (const route of REQUIRED_ROUTES) {
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));

    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) fail(route, `HTTP ${res?.status()}`);

    const info = await page.evaluate(() => {
      const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
      const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        ogTitle: meta('meta[property="og:title"]'),
        ogUrl: meta('meta[property="og:url"]'),
        ogType: meta('meta[property="og:type"]'),
        ogImage: meta('meta[property="og:image"]'),
        twitterImage: meta('meta[name="twitter:image"]'),
        twitterCard: meta('meta[name="twitter:card"]'),
        robots: meta('meta[name="robots"]'),
        lang: document.documentElement.lang,
        h1Count: document.querySelectorAll('h1').length,
        headings,
        jsonLd,
        imagesWithoutAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
        placeholdersWithoutLabel: [...document.querySelectorAll('.product-shot__placeholder')].filter((p) => !p.getAttribute('aria-label')).length,
        hasMain: Boolean(document.querySelector('main#main-content')),
        hasSkipLink: Boolean(document.querySelector('a.skip-link[href="#main-content"]')),
        links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), text: (a.textContent || '').trim() })),
        loginHrefs: [...document.querySelectorAll('header a, footer a')].filter((a) => /^Login/.test((a.textContent || '').trim())).map((a) => a.getAttribute('href')),
      };
    });

    if (info.h1Count !== 1) fail(route, `expected 1 h1, found ${info.h1Count}`);
    if (info.headings[0] !== 1) fail(route, `first heading is h${info.headings[0]}, not h1`);
    for (let i = 1; i < info.headings.length; i++) {
      if (info.headings[i] > info.headings[i - 1] + 1) {
        fail(route, `heading level skipped: h${info.headings[i - 1]} → h${info.headings[i]}`);
        break;
      }
    }
    if (!info.title) fail(route, 'missing <title>');
    if (!info.description) fail(route, 'missing meta description');
    // next start canonicals have no trailing slash; the static export's do (/platform/).
    if (!info.canonical || !(info.canonical.endsWith(route === '/' ? '' : route) || info.canonical.endsWith(`${route}/`))) fail(route, `bad canonical ${info.canonical}`);
    if (!info.ogTitle || !info.ogUrl || !info.ogType) fail(route, 'missing Open Graph fields');
    if (info.lang !== 'en-ZA') fail(route, `html lang is "${info.lang}"`);
    if (!info.hasMain || !info.hasSkipLink) fail(route, 'missing main landmark or skip link');
    if (info.imagesWithoutAlt) fail(route, `${info.imagesWithoutAlt} images without alt`);
    if (info.placeholdersWithoutLabel) fail(route, `${info.placeholdersWithoutLabel} screenshot placeholders without label`);
    for (const block of info.jsonLd) {
      try {
        JSON.parse(block);
      } catch {
        fail(route, 'invalid JSON-LD');
      }
    }
    // Entity graph: company and product are distinct, linked entities; the page entity matches the canonical.
    const nodes = info.jsonLd.flatMap((block) => {
      try {
        const data = JSON.parse(block);
        return data['@graph'] ?? [data];
      } catch {
        return [];
      }
    });
    const org = nodes.find((n) => n['@type'] === 'Organization');
    const app = nodes.find((n) => n['@type'] === 'SoftwareApplication');
    if (!org || org.name !== 'Auris Nexus Technologies') fail(route, 'missing Organization (Auris Nexus Technologies)');
    if (!app || app.name !== 'Funda360' || app.creator?.['@id'] !== org?.['@id']) fail(route, 'SoftwareApplication must be Funda360, created by the Organization');
    const pageEntity = nodes.find((n) => ['WebPage', 'CollectionPage', 'AboutPage', 'ContactPage', 'Article'].includes(n['@type']));
    if (!pageEntity) fail(route, 'missing page-level structured data (WebPage/CollectionPage/Article)');
    else if (pageEntity.url !== info.canonical) fail(route, `page entity url ${pageEntity.url} ≠ canonical ${info.canonical}`);
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList');
    if (route !== '/' && !crumbs) fail(route, 'missing BreadcrumbList');

    // Titles and descriptions: written per page, sensible length, brand present once.
    if (!info.title.includes('Funda360') || (info.title.match(/\| Funda360/g) || []).length > 1) fail(route, `title brand issue: "${info.title}"`);
    if (info.title.length > 75) fail(route, `title too long (${info.title.length}): "${info.title}"`);
    if (info.description && (info.description.length < 70 || info.description.length > 175)) fail(route, `description length ${info.description.length}`);

    // Social cards: explicit PNG images for Open Graph and X.
    if (!info.ogImage || !info.twitterImage || info.twitterCard !== 'summary_large_image') fail(route, 'missing og:image / twitter:image / large card');
    else {
      const img = await fetch(BASE + new URL(info.ogImage).pathname);
      if (img.status !== 200 || img.headers.get('content-type') !== 'image/png') fail(route, `og:image ${info.ogImage} → ${img.status} ${img.headers.get('content-type')}`);
    }
    for (const href of info.loginHrefs) if (href !== EXPECTED_LOGIN) fail(route, `Login links to ${href}`);
    if (info.loginHrefs.length < 2) fail(route, 'Login CTA missing from header or footer');

    for (const link of info.links) {
      if (!link.text) fail(route, `link without text: ${link.href}`);
      if (/^(click here|here|read more|more|learn more|explore|link)$/i.test(link.text)) fail(route, `non-descriptive link text "${link.text}"`);
      if (link.href.startsWith('#')) fragmentLinks.add(route + link.href);
      else if (link.href.startsWith('/')) {
        const [path, hash] = link.href.split('#');
        internalLinks.add(path);
        if (hash) fragmentLinks.add(`${path}#${hash}`);
      }
    }

    titles.set(info.title, [...(titles.get(info.title) ?? []), route]);
    descriptions.set(info.description, [...(descriptions.get(info.description) ?? []), route]);

    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of axe.violations) fail(route, `axe ${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.help}`);

    if (errors.length) fail(route, `console/runtime errors: ${errors.join(' | ')}`);
    await page.close();
  }
  for (const [title, routes] of titles) if (routes.length > 1) fail('SEO', `duplicate title "${title}" on ${routes.join(', ')}`);
  for (const [, routes] of descriptions) if (routes.length > 1) fail('SEO', `duplicate description on ${routes.join(', ')}`);
  notes.push(`Checked ${REQUIRED_ROUTES.length} routes for structure, SEO, axe and runtime errors.`);

  /* ------------------------------------------------------------ */
  /* 2. Internal link + fragment crawl                             */
  /* ------------------------------------------------------------ */
  for (const path of internalLinks) {
    const res = await fetch(BASE + path, { redirect: 'manual' });
    if (res.status !== 200) fail('links', `${path} → HTTP ${res.status}`);
  }
  const fragPage = await context.newPage();
  for (const target of fragmentLinks) {
    const [path, hash] = target.split('#');
    await fragPage.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    const exists = await fragPage.evaluate((id) => Boolean(document.getElementById(id)), hash);
    if (!exists) fail('links', `fragment #${hash} not found on ${path}`);
  }
  await fragPage.close();
  notes.push(`Crawled ${internalLinks.size} internal URLs and ${fragmentLinks.size} fragment links.`);

  // Unknown slugs must 404, not render.
  for (const path of ['/platform/does-not-exist', '/solutions/nope', '/resources/nope', '/resources/category/nope', '/nope']) {
    const res = await fetch(BASE + path);
    if (res.status !== 404) fail('routing', `${path} returned ${res.status}, expected 404`);
  }

  // SEO files.
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!/User-Agent/i.test(robots)) fail('SEO', 'robots.txt malformed');
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/(.)\/$/, '$1'));
  for (const route of REQUIRED_ROUTES.filter((r) => !r.startsWith('/resources/') && !['/privacy', '/terms'].includes(r))) {
    if (!sitemapLocs.includes(route)) fail('SEO', `sitemap missing ${route}`);
  }
  for (const loc of sitemapLocs) {
    if (['/login', '/privacy', '/terms'].includes(loc)) fail('SEO', `sitemap must not list ${loc}`);
    const res = await fetch(BASE + loc);
    if (res.status !== 200) fail('SEO', `sitemap URL ${loc} → HTTP ${res.status}`);
  }
  // Drafts and categories without a published article stay out of the sitemap.
  for (const route of REQUIRED_ROUTES.filter((r) => r.startsWith('/resources/'))) {
    if (sitemapLocs.includes(route)) fail('SEO', `sitemap lists unpublished ${route}`);
  }
  await context.close();

  /* ------------------------------------------------------------ */
  /* 3. Responsive: no horizontal overflow                         */
  /* ------------------------------------------------------------ */
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    for (const route of REQUIRED_ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(`${vp.name} ${route}`, `horizontal overflow of ${overflow}px`);
      // Layout defects that do not show up as page overflow.
      const problems = await page.evaluate(() => {
        const out = [];
        const W = window.innerWidth;
        const visible = (el) => {
          const r = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[aria-hidden="true"], .visually-hidden, .honeypot, #site-nav:not([data-open="true"])');
        };
        const label = (el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}"`;
        // Buttons and CTAs must not touch the screen edges.
        const inScroller = (el) => {
          for (let p = el.parentElement; p; p = p.parentElement) if (['auto', 'scroll'].includes(getComputedStyle(p).overflowX)) return true;
          return false;
        };
        for (const el of document.querySelectorAll('main .cta, main button')) {
          if (!visible(el) || inScroller(el)) continue; // items in a horizontal scroll strip are meant to run off-screen
          const r = el.getBoundingClientRect();
          if (r.left < 8 || r.right > W - 8) out.push(`touches the screen edge: ${label(el)}`);
        }
        // Touch targets: at least 24x24 CSS px (WCAG 2.2 target size), inline text links excepted.
        for (const el of document.querySelectorAll('a, button, input, select, textarea, summary')) {
          if (!visible(el)) continue;
          const cs = getComputedStyle(el);
          if (el.tagName === 'A' && cs.display === 'inline') continue;
          if (el.type === 'checkbox' || el.type === 'radio') continue; // labelled controls; the label is the target
          if (getComputedStyle(el, '::after').position === 'absolute') continue; // stretched link: the whole card is the target
          const r = el.getBoundingClientRect();
          if (r.width < 24 || r.height < 24) out.push(`small target ${Math.round(r.width)}x${Math.round(r.height)}: ${label(el)}`);
        }
        // Clipped text: content wider than its box inside a clipping container.
        for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main a, main span, main dd, main dt, main td, main th')) {
          if (!visible(el)) continue;
          const cs = getComputedStyle(el);
          if (['hidden', 'clip'].includes(cs.overflowX) && cs.textOverflow !== 'ellipsis' && el.scrollWidth > el.clientWidth + 1) out.push(`clipped text: ${label(el)}`);
          if (parseFloat(cs.fontSize) < 12 && el.textContent.trim()) out.push(`text below 12px (${cs.fontSize}): ${label(el)}`);
        }
        // Images must stay inside the viewport.
        for (const img of document.querySelectorAll('main img')) {
          if (!visible(img)) continue;
          const r = img.getBoundingClientRect();
          if (r.right > W + 1 || r.left < -1) out.push(`image outside viewport: ${img.getAttribute('src')}`);
        }
        return [...new Set(out)].slice(0, 15);
      });
      for (const problem of problems) fail(`${vp.name} ${route}`, problem);
    }
    // Mobile nav must be collapsed and operable below the breakpoint.
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.locator('header[data-hydrated]').waitFor();
    const menuButton = page.locator('.site-header__menu-button');
    if (vp.width < 960) {
      if (!(await menuButton.isVisible())) fail(vp.name, 'menu button not visible');
      if (await page.locator('#site-nav').isVisible()) fail(vp.name, 'nav should start collapsed');
      await menuButton.click();
      if ((await menuButton.getAttribute('aria-expanded')) !== 'true') fail(vp.name, 'menu button aria-expanded not true');
      if (!(await page.locator('#site-nav').isVisible())) fail(vp.name, 'nav not shown after opening menu');
      await page.locator('#nav-button-platform').click();
      await page.locator('#nav-submenu-platform a', { hasText: 'Attendance' }).click();
      await page.waitForURL(/\/platform\/attendance\/?$/);
      await page.locator('header[data-hydrated]').waitFor();
      try {
        await page.locator('#site-nav').waitFor({ state: 'hidden', timeout: 2000 });
      } catch {
        fail(vp.name, 'menu did not close after navigation');
      }
      await menuButton.click();
      await page.keyboard.press('Escape');
      if ((await menuButton.getAttribute('aria-expanded')) !== 'false') fail(vp.name, 'Escape did not close mobile menu');
      const focused = await page.evaluate(() => document.activeElement?.className);
      if (!String(focused).includes('site-header__menu-button')) fail(vp.name, 'focus did not return to menu button');
    } else if (await menuButton.isVisible()) {
      fail(vp.name, 'menu button should be hidden on desktop');
    }
    await ctx.close();
  }
  notes.push(`Checked overflow on ${REQUIRED_ROUTES.length} routes × ${VIEWPORTS.length} viewports.`);

  /* ------------------------------------------------------------ */
  /* 4. Desktop navigation: every primary item works               */
  /* ------------------------------------------------------------ */
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.locator('header[data-hydrated]').waitFor();
    for (const [label, path] of [
      ['AI & Intelligence', '/ai'],
      ['Resources', '/resources'],
      ['About', '/about'],
      ['Request a Demo', '/request-demo'],
    ]) {
      await page.locator('#site-nav').getByRole('link', { name: label, exact: true }).click();
      await page.waitForURL(new RegExp(`${path.replace(/[/-]/g, '\\$&')}/?$`));
      // Static export links carry a trailing slash (/ai/); next start does not (/ai).
      const current = await page.locator(`#site-nav a[href="${path}"], #site-nav a[href="${path}/"]`).first().getAttribute('aria-current');
      if (current !== 'page') fail('nav', `${label} not marked aria-current on ${path}`);
    }
    for (const id of ['platform', 'solutions']) {
      const button = page.locator(`#nav-button-${id}`);
      await button.click();
      if ((await button.getAttribute('aria-expanded')) !== 'true') fail('nav', `${id} submenu did not open`);
      const links = await page.locator(`#nav-submenu-${id} a`).count();
      if (links < 5) fail('nav', `${id} submenu has ${links} links`);
      await page.keyboard.press('Escape');
      if ((await button.getAttribute('aria-expanded')) !== 'false') fail('nav', `Escape did not close ${id}`);
      if (!(await button.evaluate((el) => el === document.activeElement))) fail('nav', `focus not returned to ${id} button`);
    }
    // Keyboard: Tab from the top reaches the skip link first.
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
    if (first !== 'Skip to main content') fail('keyboard', `first tab stop is "${first}"`);
    await ctx.close();
  }

  /* ------------------------------------------------------------ */
  /* 5. Request a demo form                                        */
  /* ------------------------------------------------------------ */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/request-demo', { waitUntil: 'networkidle' });
    await page.locator('header[data-hydrated]').waitFor();
    for (const label of ['Full name (required)', 'School or organisation (required)', 'Work email address (required)', 'Phone number (optional)', 'Your role (required)', 'Number of learners or schools (required)', 'Message (optional)']) {
      if ((await page.getByLabel(label, { exact: true }).count()) !== 1) fail('form', `no control labelled "${label}"`);
    }
    const notice = page.locator('.form-status[data-notice="endpoint"]');
    if (!process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT && !(await notice.isVisible())) fail('form', 'no upfront notice that online submission is not connected');
    await page.getByRole('button', { name: 'Request a demo' }).click();
    const summary = page.locator('.error-summary');
    if (!(await summary.isVisible())) fail('form', 'error summary not shown on empty submit');
    const errorCount = await summary.locator('li').count();
    if (errorCount !== 7) fail('form', `expected 7 errors on empty submit, got ${errorCount}`);
    if (!(await summary.evaluate((el) => el === document.activeElement))) fail('form', 'error summary not focused');
    if ((await page.locator('#demo-name').getAttribute('aria-invalid')) !== 'true') fail('form', 'aria-invalid not set');
    await page.getByLabel('Full name (required)').fill('Test Person');
    await page.getByLabel('School or organisation (required)').fill('Example School');
    await page.getByLabel('Work email address (required)').fill('not-an-email');
    await page.getByLabel('Phone number (optional)').fill('12');
    await page.getByRole('button', { name: 'Request a demo' }).click();
    const errs = await page.locator('.error-summary li').allTextContents();
    if (!errs.some((e) => e.includes('email'))) fail('form', 'invalid email not reported');
    if (!errs.some((e) => e.includes('phone'))) fail('form', 'invalid phone not reported');
    await page.getByLabel('Work email address (required)').fill('person@example.com');
    await page.getByLabel('Phone number (optional)').fill('+27 12 345 6789');
    await page.getByLabel('Your role (required)').selectOption('principal');
    await page.getByLabel('Number of learners or schools (required)').selectOption('300-700');
    await page.getByLabel('Attendance').check();
    await page.getByLabel(/I agree that Funda360 may contact me/).check();
    // The endpoint rejects forms completed faster than a person could (bot protection).
    if (process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT) await page.waitForTimeout(3200);
    await page.getByRole('button', { name: 'Request a demo' }).click();
    // The submission result region (the upfront notice has no role).
    const status = page.locator('.form-status[role]');
    await status.waitFor();
    const kind = await status.getAttribute('data-status');
    const expected = process.env.NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT ? 'success' : 'not-configured';
    if (kind !== expected) fail('form', `valid submit produced "${kind}", expected "${expected}"`);
    if (await page.locator('.error-summary').count()) fail('form', 'error summary still visible after valid submit');
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of axe.violations) fail('form (after submit)', `axe ${v.id}: ${v.help}`);
    await ctx.close();
  }

  /* ------------------------------------------------------------ */
  /* 6. Login hand-off route                                       */
  /* ------------------------------------------------------------ */
  {
    const html = await (await fetch(`${BASE}/login`)).text();
    if (!html.includes(`http-equiv="refresh" content="0;url=${EXPECTED_LOGIN}"`)) fail('login', '/login does not forward to the application');
    if (!html.includes('noindex')) fail('login', '/login should be noindex');
    // Short alias URLs forward to the real pages and stay out of search.
    for (const [alias, target] of [['/demo', '/request-demo'], ['/product', '/platform'], ['/features', '/platform']]) {
      const page = await (await fetch(`${BASE}${alias}`)).text();
      if (!new RegExp(`http-equiv="refresh" content="0;url=${target}/?"`).test(page)) fail(alias, `does not forward to ${target}`);
      if (!page.includes('noindex')) fail(alias, 'should be noindex');
      if (!new RegExp(`<link rel="canonical" href="[^"]*${target}/?"`).test(page)) fail(alias, `canonical should be ${target}`);
    }
  }

  /* ------------------------------------------------------------ */
  /* 7. Phase 2 design: images, fonts, motion, product tour       */
  /* ------------------------------------------------------------ */
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const assets = new Set();
    for (const route of REQUIRED_ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' });
      // Scroll so lazy images load, then require every image to have decoded.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForLoadState('networkidle');
      const imgs = await page.evaluate(() =>
        [...document.images]
          // Images inside unselected tabs are not rendered (and load on selection); the tour test covers them.
          .filter((img) => img.getClientRects().length > 0)
          .map((img) => ({ src: img.getAttribute('src'), ok: img.complete && img.naturalWidth > 0, alt: img.getAttribute('alt') })),
      );
      for (const img of imgs) {
        assets.add(img.src);
        if (!img.ok) fail(route, `image failed to load: ${img.src}`);
        if (!img.alt || img.alt.length < 20) fail(route, `image alt text too short: ${img.src}`);
      }
      // With reduced motion, nothing may be left hidden by entrance animations.
      const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((el) => getComputedStyle(el).opacity !== '1').length);
      if (hidden) fail(route, `${hidden} element(s) hidden under prefers-reduced-motion`);
    }
    for (const src of assets) {
      const res = await fetch(BASE + src);
      if (res.status !== 200) fail('assets', `${src} → HTTP ${res.status}`);
    }
    notes.push(`Verified ${assets.size} distinct product images load with alt text.`);

    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const fonts = await page.evaluate(() => ({
      inter: document.fonts.check('16px "Inter Variable"'),
      tight: document.fonts.check('600 32px "Inter Tight Variable"'),
      mono: document.fonts.check('12px "JetBrains Mono Variable"'),
      body: getComputedStyle(document.body).fontFamily,
    }));
    if (!fonts.inter || !fonts.tight || !fonts.mono) fail('fonts', `self-hosted fonts not loaded: ${JSON.stringify(fonts)}`);

    // Product tour: WAI-ARIA tabs with arrow-key navigation.
    await page.locator('header[data-hydrated]').waitFor();
    const tabs = page.getByRole('tab');
    const tabCount = await tabs.count();
    if (tabCount < 5) fail('tour', `expected product tour tabs, found ${tabCount}`);
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    if ((await tabs.nth(1).getAttribute('aria-selected')) !== 'true') fail('tour', 'ArrowRight did not select the next tab');
    if (!(await page.locator('#tour-panel-learners').isVisible())) fail('tour', 'selected tab panel not visible');
    if (await page.locator('#tour-panel-dashboard').isVisible()) fail('tour', 'previous tab panel still visible');
    await page.keyboard.press('End');
    if ((await tabs.nth(tabCount - 1).getAttribute('aria-selected')) !== 'true') fail('tour', 'End did not select the last tab');
    // Every tab's screenshot loads once its tab is selected.
    for (let i = 0; i < tabCount; i++) {
      await tabs.nth(i).click();
      const panel = page.locator('[role="tabpanel"][data-active]');
      await panel.locator('img').evaluate((img) => (img.complete ? null : new Promise((r) => img.addEventListener('load', r, { once: true }))));
      const ok = await panel.locator('img').evaluate((img) => img.naturalWidth > 0);
      if (!ok) fail('tour', `tab ${i + 1} screenshot did not load`);
      assets.add(await panel.locator('img').getAttribute('src'));
    }
    await ctx.close();
  }

  /* ------------------------------------------------------------ */
  /* 8. Design-system guard: teal-500 is a fill colour only        */
  /* ------------------------------------------------------------ */
  {
    const { readFileSync } = await import('node:fs');
    const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8').split('\n');
    css.forEach((line, i) => {
      if (/teal-500|#14b8a6/i.test(line) && !/^\s*(--teal-500:|background(-color)?:|\*)/.test(line)) {
        fail('design tokens', `globals.css:${i + 1} uses teal-500 outside a background fill: ${line.trim()}`);
      }
    });
  }
} finally {
  await browser.close();
  stopServer();
}

for (const n of notes) console.log(`✓ ${n}`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} QA failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('\n✓ All QA checks passed.');
