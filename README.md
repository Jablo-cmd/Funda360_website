# Funda360 marketing website

The public marketing website for **Funda360**, the connected school management platform.

> **Status: Phase 1 complete (structure).** The full information architecture,
> routing, content hierarchy, components, responsive behaviour, accessibility
> and SEO foundations are in place, using neutral, functional styling only.
> **Phase 2 = full visual design by Claude Design.** See [`DESIGN_HANDOFF.md`](./DESIGN_HANDOFF.md).

This repository is the marketing site only. The Funda360 application is a
separate product (separate repository and deployment); the **Login** CTA links
to it. This site has no authentication.

## Stack

- Next.js (App Router) + React + TypeScript
- Plain CSS (`src/app/globals.css`) with neutral structural styles
- Every page is statically generated; optional fully static export

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages prerendered) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run qa` | Full-site QA (run after `npm run build`): every route, links, fragments, SEO metadata, JSON-LD, axe WCAG 2.1 AA, overflow at 320/390/768/1280px, navigation, keyboard, demo form, login hand-off |
| `STATIC_EXPORT=1 npm run build` | Emit a plain static site into `out/` |

`npm run qa` uses `playwright-core` with a local Chromium
(`CHROMIUM_PATH`, defaults to `/opt/pw-browsers/chromium`).

## Configuration

All configuration is in environment variables, read only in `src/config/site.ts`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (canonical URLs, Open Graph, sitemap) |
| `NEXT_PUBLIC_APP_LOGIN_URL` | Where **Login** goes: the Funda360 application. Default `https://funda360.aurisnexus.co.za/login` |
| `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` | Request a Demo POST endpoint. Empty = not connected (form validates and says so) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only on the production domain at launch. Otherwise robots.txt disallows all and pages are `noindex` |

## Project structure

```
src/
  app/                 Routes (one folder per URL) + sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/            SiteHeader (navigation), SiteFooter
    ui/                Reusable sections, cards, CTAs, product-shot slots, FAQs, breadcrumbs, JSON-LD
    templates/         CapabilityPageTemplate, SolutionPageTemplate, ArticleTemplate
    forms/             DemoRequestForm
  content/             ALL copy and structured content (navigation, platform, AI, solutions,
                       resources/articles, FAQs, CTAs, screenshots, demo options, legal)
  config/site.ts       Environment-driven site configuration
  lib/                 SEO/metadata + structured data, demo-request validation/submission, formatting
scripts/qa.mjs         End-to-end QA
```

Content is separated from presentation: pages render objects from `src/content/`.
To change copy, edit content files; to change presentation, edit components/CSS.

## Content rules

- No invented customers, partners, statistics, testimonials, certifications, awards,
  deployments, user or school numbers, countries or outcomes.
- Capabilities are labelled `available`, `roadmap` or `confirm` (to be confirmed),
  verified against the Funda360 application's current-state register. Roadmap and
  unconfirmed items always render with a visible label.
- Search for `TODO(content)` and `<Placeholder>` to find content that must be supplied before launch.
