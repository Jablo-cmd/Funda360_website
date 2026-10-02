# Marketing hardening changelog (Phase 3)

The Phase 1 structure and Phase 2 design system were kept. No colours, tokens
or URLs changed, so no redirects were needed.

**Validation key:**

- **TS:** `tsc --noEmit`
- **Lint:** `eslint .`
- **Build:** `next build`
- **QA:** `scripts/qa.mjs`, which covers routes, links, metadata, JSON-LD, axe, overflow, keyboard and forms.
- **SEO:** `scripts/verify-seo-build.mjs` on the production static export.

## SEO foundation

| File | Change | Reason | Marketing / SEO benefit | Risk | Validation |
| --- | --- | --- | --- | --- | --- |
| `src/content/seo.ts` (new) | Route registry: title, description, primary and secondary intent, `lastModified`, `noIndex`; content clusters | One source of truth; one intent per page | No keyword cannibalisation; consistent, unique metadata | Low; titles must stay unique | QA (unique, length), SEO |
| `src/lib/seo.ts` | `pageMetadata()` builds canonical, OG, Twitter, robots from the registry; JSON-LD builders with stable `@id`s | Metadata and schema were assembled ad hoc per page | Rich results eligibility; correct entity model | Low | QA (JSON-LD graph checks), SEO |
| `src/config/site.ts` | Indexing gate (flag **and** public https origin); `trailingSlash`; `showDraftContent`; `developerUrl` / `socialProfiles` from env (empty by default); `absoluteUrl()` matches served URLs | Canonicals pointed at non-served URLs on static export; previews could be indexed by mistake | Canonical consolidation; no accidental preview indexing | Low | QA, SEO |
| `src/app/sitemap.ts` | Built from the registry; excludes noindex, drafts, empty categories; real `lastModified`; no priority/changefreq | Sitemap listed pages that should not be indexed | Clean crawl budget, accurate freshness | Low | QA, SEO (every `loc` = canonical, indexable) |
| `src/app/robots.ts` | Production: allow `/`, disallow `/login`, sitemap and host. Otherwise disallow all | `/login` is a redirect, not content | Avoids thin page in index | Low | QA, SEO |
| `src/app/og/[image]/route.tsx`, `src/lib/og.tsx`, `src/lib/ogImages.ts` (new) | Static 1200×630 PNG OG cards per major route, capability, solution and article | No share images existed | Branded link previews in social, chat, email | Low; build time +~2s | QA (200 `image/png`), SEO (file exists) |
| `public/brand/funda360-logo.png` (new) | 512×512 logo rendered from the site icon | Organization/Brand `logo` needs a raster image | Logo eligibility in search | Logo needs approval (CONFIRM) | Manual |
| `src/components/ui/PageSchema.tsx` (new) | Emits WebPage/CollectionPage/AboutPage/ContactPage + breadcrumb + ItemList from the registry | Per-page entity data was missing | Clear page entities, breadcrumbs in results | Low | QA |
| `src/app/layout.tsx` | Site `@graph` (Organization = Auris Nexus Technologies, Brand + SoftwareApplication = Funda360, WebSite); default title | Company and product were conflated | Correct product vs company entities | Low | QA |
| All `src/app/**/page.tsx` | Use `pageMetadata(seoFor(...))` and `PageSchema` | Consistency | Unique metadata everywhere | Low | QA |
| `src/app/resources/[article]/page.tsx` | `seoTitle`, article OG, drafts `noindex` | Long headlines; drafts must not index | Clean titles; nothing unpublished indexed | Low | QA, SEO |
| `src/app/resources/category/[category]/page.tsx` | Descriptive title; `noindex` until a published article exists; CollectionPage schema | Empty categories are thin pages | No thin pages indexed | Low | QA |
| `scripts/verify-seo-build.mjs` (new), `package.json` | Production export verifier; `lint` and `verify:seo` scripts | Catch SEO regressions before deploy | Prevents broken canonicals/sitemap reaching production | Low | Runs green (18 URLs) |
| `.github/workflows/pages.yml` | Added Lint and Verify production SEO build steps | Gate deploys | Regressions block deploy instead of shipping | A failing check blocks deploy (intended) | Workflow steps mirror local commands |

## Content, marketing and truthfulness

| File | Change | Reason | Marketing / SEO benefit | Risk | Validation |
| --- | --- | --- | --- | --- | --- |
| `src/content/home.ts`, `src/app/page.tsx` | Category sentence, audience line, reordered flow, "Why Funda360" section replacing generic impact copy, trust link to `/security`, insights only when published | Visitors could not tell quickly what Funda360 is and who it is for | Clear positioning; stronger home intent match | Low | QA, visual review |
| `src/content/platform.ts`, `CapabilityPageTemplate.tsx` | Overview ("What is …?"), who uses it, related solutions, related reading on each capability page; attendance claims made precise; notification claim narrowed | Capability pages were not standalone landing pages; some claims broader than the product | Long-tail definitional queries; accurate claims | Low | QA, claims checked against the app |
| `src/content/solutions.ts`, `SolutionPageTemplate.tsx` | "Why" section, capability links per audience, related reading, descriptive question links | Audience pages lacked depth and links | Role-specific intent coverage | Low | QA |
| `src/content/security.ts`, `src/app/security/page.tsx` (new) | `/security` page with verified controls and an explicit "do not claim" list | Trust content had no home; certifications must not be implied | Trust for buyers; captures security queries | Hosting/DPA details CONFIRM | QA, axe |
| `src/content/resources.ts`, `src/app/resources/page.tsx`, `ArticleTemplate.tsx` | Visibility helpers; drafts hidden on indexed site; "In preparation" clusters; honest team author; descriptive related links; new School operations category | Drafts must not publish automatically; placeholder bios removed | No thin/unfinished content indexed; clear content plan | Low | QA, SEO (no drafts in production) |
| `src/content/screenshots.ts`, `types.ts`, `ProductShot.tsx` | Value caption per screenshot + "Real product · fictional demo data" | Screenshots lacked a message | Screenshots sell a benefit honestly | Low | QA (images, alt) |
| `src/content/demo.ts`, `src/app/request-demo/page.tsx`, `DemoRequestForm.tsx` | Audience, what the demo covers, what happens next, why we ask, field hints, alternative paths | Reduce hesitation before submitting | Higher demo intent conversion | Endpoint still CONFIRM | QA (form) |
| `src/content/about.ts`, `src/app/about/page.tsx` | Product vs company sentence; responsible-building section; links to security and AI; placeholder removed | About mixed product and company | Clear entity story | Company details CONFIRM | QA |
| `src/content/ai.ts`, `src/app/ai/page.tsx` | Metadata moved to the registry ("AI in Education & School Intelligence"); WebPage schema added. Existing responsibility principles and ROADMAP labels kept unchanged | Audit found the AI page already truthful (nothing not built is presented as available) | AI intent captured without overclaiming | Low | QA |
| `src/content/legal.ts`, privacy/terms pages | Visible placeholders replaced with factual status statements; pages stay `noindex` | Placeholder text looked unfinished | Professional trust pages | Legal text CONFIRM | QA |
| `src/content/navigation.ts` | Footer "Security & data protection" link | Trust discoverability | Internal link equity to `/security` | Low | QA (links) |
| `src/lib/links.ts` (new), `FeatureList.tsx` | Descriptive anchor text for internal links | Generic "Learn more" anchors | Better anchor relevance and accessibility | Low | QA (generic link-text check) |

## Code quality and accessibility

| File | Change | Reason | Benefit | Risk | Validation |
| --- | --- | --- | --- | --- | --- |
| `eslint.config.mjs` (new), dev dependencies | ESLint 9 with typescript-eslint, react-hooks, jsx-a11y, Next.js rules | No linter existed | Catches a11y and hook bugs in CI | Low | `eslint .` clean |
| `SiteHeader.tsx` | Route-change reset during render; hydration marker via effect; close handlers on links rather than `nav` | Lint (set-state-in-effect, a11y on non-interactive element) | Same behaviour, cleaner semantics | Low | QA (navigation, keyboard) |
| `ProductTour.tsx` | Arrow-key handler on tab buttons | a11y lint | Correct keyboard semantics | Low | QA (keyboard) |
| `src/app/globals.css` | Styles for new sections (audience line, overview, who-uses, security, captions) using existing tokens only | New content | Consistent design | Low | QA (overflow 320–1280), visual review |
| `scripts/qa.mjs` | `/security`; entity graph checks; title/description length; OG/Twitter image checks; stricter link text; sitemap exclusions; app login URL | Guard Phase 3 rules | Prevents regressions | Low | Runs green |
| `README.md`, `.env.example` | New env vars, scripts, SEO system | Documentation | Correct setup for the next developer | None | Review |
