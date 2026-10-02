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

---

# Phase 3.1 changelog (completion pass)

**Validation key** (in addition to Phase 3):

- **Unit:** `npm test`, 13 endpoint tests.
- **E2E:** `npm run qa:demo`, browser → site → endpoint → webhook.
- **SEO+:** the extended `verify-seo-build.mjs`: JSON-LD graph, internal links and assets, demo CTA, article funnel, orphan indexable pages, icons.
- **Preview:** `verify-seo-build.mjs --preview`.

## Demo conversion

| File | Change | Reason | Marketing / SEO benefit | Risk | Validation |
| --- | --- | --- | --- | --- | --- |
| `server/demo-request/handler.ts` (new) | Web-standard endpoint. Checks: origin/CORS, JSON-only, 16 KB limit, honeypot, timing, rate limit, server validation, optional Turnstile, de-duplication. Delivers via webhook (HMAC-signed) and/or Resend email; logs no personal data | The static site cannot run server code; the form could not send anything | Demo requests can reach the team: the core conversion | Needs deploying and configuring; in-memory limits are per instance (documented, plus a platform rule) | Unit (13), E2E |
| `server/demo-request/worker.ts`, `node-server.ts`, `wrangler.toml.example`, `README.md` (new) | Cloudflare Workers entry, Node adapter, config template and deployment guide | Portable hosting with no new dependencies | Fast, low-cost path to production | None until deployed | E2E uses the Node adapter |
| `src/lib/demoValidation.ts` (new), `src/lib/demoRequest.ts` | Validation shared by browser and server; untrusted-input normaliser; labels for delivery; client sends request id, elapsed time and Turnstile token, with a 15 s timeout, and maps server errors to clear messages | One set of rules; honest, useful errors | Fewer failed or abandoned submissions | Low | Unit, QA, E2E |
| `src/components/forms/DemoRequestForm.tsx` | In-flight guard; request id kept until success; upfront "not connected" notice; server field errors shown on the fields; success replaces the form (next steps, Explore the platform, Send another); optional Turnstile; optional contact-email fallback | Prevent duplicates and dead ends; clear confirmation | A clear, trustworthy last step of the funnel | Low; existing styles only | QA (axe, states), E2E (in-view, focus, single delivery) |
| `src/config/site.ts` | `turnstileSiteKey`, `contactEmail`, `searchVerification` (all public; empty by default) | Configuration without code changes | — | None | TS |
| `src/content/legal.ts` | Privacy facts describe the encrypted submission; mention Turnstile only when enabled; contact email when configured | Privacy text must match behaviour | Trust | Final legal text still CONFIRM | QA |
| `tsconfig.json` | `allowImportingTsExtensions` | The endpoint shares the validation module and runs under Node's type stripping | — | None (`noEmit`) | TS, build |
| `package.json`, `.gitignore` | `test`, `qa:demo`, `demo-endpoint` scripts; Node ≥ 22.18; build-only fonts moved to devDependencies; Wrangler files ignored | Tooling | — | None | All |
| `scripts/qa-demo-e2e.mjs` (new), `scripts/qa.mjs` | E2E demo test (failure keeps data, a double-click retry delivers once, confirmation focused and in view, no secrets in the bundle); QA checks the upfront notice and targets the result region | Guard the conversion path | Prevents silent funnel regressions | None | Runs green |

## SEO, structured data and indexing

| File | Change | Reason | Marketing / SEO benefit | Risk | Validation |
| --- | --- | --- | --- | --- | --- |
| `scripts/verify-seo-build.mjs` | Validates JSON-LD on every page (references, URLs, entity model, FAQ visibility, Article fields, forbidden rating/award/credential fields, `sameAs` only from config); Twitter and `og:url`; one `h1`; Request a Demo link on every sitemap URL; article → capability → solution → demo links; all internal links and assets resolve; indexable pages must be in the sitemap; drafts never indexable; icons; `--preview` mode | Catch SEO, schema and funnel regressions before deploy; prove the indexing gate | Protects rankings and rich-result eligibility | A failing check blocks deploy (intended) | Negative test: 5 injected faults, all caught |
| `.github/workflows/pages.yml` | Node 22; unit-test step; public repository variables passed to the build (endpoint, Turnstile, contact, verification tokens, developer URL, profiles) and to the verifier | Node 20 deprecated on runners; configure production without code changes | Launch configuration becomes a settings change | Unset variables are empty (same as today) | Mirrors local commands |
| `src/app/layout.tsx` | Google/Bing verification meta tags, only on indexable production builds | Search Console readiness | Faster indexing setup | None on previews (verified) | Production and preview builds |
| `src/app/favicon.ico`, `src/app/apple-icon.png` (new) | Rendered from the existing icon | `/favicon.ico` was missing; no touch icon | Brand in search results, tabs and home screens | None | SEO+ (icons exist) |
| `src/content/seo.ts` | Attendance description says "in-app" guardian notifications; content clusters replaced with the first editorial cluster | Truthfulness; editorial plan | Accurate snippet; topical cluster | None | QA, SEO+ |
| `src/content/editorial.ts` (new) | Typed briefs for 8 articles: slug, intent, required capability and solution links, outline, must-not-claim rules | Publish cleanly without fabricated content | Organic acquisition pipeline | None (not rendered) | TS |

## Documentation

| File | Change |
| --- | --- |
| `MARKETING_WEBSITE_AUDIT.md` | Phase 3.1 section (deployment status, demo form, claims audit, SEO architecture, structured data, indexing safety, production configuration, Search Console, funnel, performance); corrected Phase 3 URLs (`/platform/academics-assessments`, `/platform/finance`) |
| `README.md`, `.env.example` | Production configuration table, new variables, scripts, Search Console pointer |
| `server/demo-request/README.md` | Endpoint architecture, configuration, deployment and testing |
