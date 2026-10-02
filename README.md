# Funda360 marketing website

The public marketing website for **Funda360**, the connected school management platform.

> **Status: Phase 1 (structure), Phase 2 (visual design) and Phase 3 (marketing,
> SEO, semantic and conversion hardening) complete.** See
> [`MARKETING_WEBSITE_AUDIT.md`](./MARKETING_WEBSITE_AUDIT.md) and
> [`MARKETING_HARDENING_CHANGELOG.md`](./MARKETING_HARDENING_CHANGELOG.md).
>
> The site has its full information architecture, content model, responsive,
> accessibility and SEO foundations, and the Funda360 design system (tokens,
> typography, components and real product screenshots captured with fictional
> demo data). See [`DESIGN_HANDOFF.md`](./DESIGN_HANDOFF.md) §0.

This repository is the marketing site only. The Funda360 application is a
separate product (separate repository and deployment); the **Login** CTA links
to it. This site has no authentication.

## Stack

- Next.js (App Router) + React + TypeScript
- Plain CSS design system (`src/app/globals.css`, all values as tokens on `:root`)
- Self-hosted fonts via `@fontsource-variable` (Inter, Inter Tight, JetBrains Mono); icons via `lucide-react`
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
| `npm run lint` | ESLint (TypeScript, React hooks, jsx-a11y, Next.js rules) |
| `npm run verify:seo` | Validate a production static export in `out/`: robots, sitemap, canonicals, titles, descriptions, OG images, JSON-LD, noindex pages (run after a production `STATIC_EXPORT=1` build) |
| `npm run qa` | Full-site QA (run after `npm run build`): every route, links, fragments, SEO metadata, JSON-LD, axe WCAG 2.1 AA, overflow at 320/390/768/1280px, navigation, keyboard, demo form, login hand-off |
| `STATIC_EXPORT=1 npm run build` | Emit a plain static site into `out/` |

`npm run qa` uses `playwright-core` with a local Chromium
(`CHROMIUM_PATH`, defaults to `/opt/pw-browsers/chromium`).

## Configuration

All configuration is in environment variables, read only in `src/config/site.ts`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (canonical URLs, Open Graph, sitemap) |
| `NEXT_PUBLIC_APP_LOGIN_URL` | Where **Login** goes: the Funda360 application. Default `https://app.funda360.aurisnexus.co.za/login` |
| `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` | Request a Demo POST endpoint. Empty = not connected (form validates and says so) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only on the production domain. Indexing also requires a public `https` `NEXT_PUBLIC_SITE_URL`. Otherwise robots.txt disallows all and pages are `noindex` |
| `NEXT_PUBLIC_SHOW_DRAFT_CONTENT` | Override draft-article visibility. Default: drafts listed on non-indexed previews, hidden on the indexed site |
| `NEXT_PUBLIC_DEVELOPER_URL` | Auris Nexus Technologies website for Organization structured data. CONFIRM: leave empty until confirmed |
| `NEXT_PUBLIC_SOCIAL_PROFILES` | Comma-separated verified profile URLs for `sameAs`. Leave empty; never guess |

## SEO system

- `src/content/seo.ts`: title, description, search intent and `lastModified` for every route, plus the content-cluster plan. Edit metadata here only.
- `src/lib/seo.ts`: metadata builder (canonical, Open Graph, Twitter, robots) and JSON-LD (Organization = Auris Nexus Technologies, SoftwareApplication = Funda360, WebSite, WebPage, BreadcrumbList, Article, FAQPage).
- `src/app/og/[image]/route.tsx`: Open Graph images generated at build time as real `.png` files (`/og/<key>.png`, registry in `src/lib/ogImages.ts`).
- `src/app/sitemap.ts` / `robots.ts`: generated from the route registry; noindex routes, draft articles and empty categories are excluded.

## Project structure

```
src/
  app/                 Routes (one folder per URL) + sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/            SiteHeader (navigation), SiteFooter
    ui/                Reusable sections, cards, CTAs, product-shot frames, logo, badges, FAQs, breadcrumbs, JSON-LD
    story/             Connected hub, Manage → Understand → Act story, capability groups, product tour
    templates/         CapabilityPageTemplate, SolutionPageTemplate, ArticleTemplate
    forms/             DemoRequestForm
  content/             ALL copy and structured content (navigation, platform, AI, solutions,
                       resources/articles, FAQs, CTAs, screenshots, demo options, legal)
  config/site.ts       Environment-driven site configuration
  lib/                 SEO/metadata + structured data, demo-request validation/submission, formatting
public/screenshots/    Real Funda360 screens with fictional demo data (see DESIGN_HANDOFF.md §0)
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
