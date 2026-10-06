# Funda360 marketing website: marketing, SEO, semantic and conversion audit

Phase 3 audit of the Funda360 marketing site (this repository only; the
Funda360 application was used as read-only evidence and was not modified).

- **Product:** Funda360, the operating platform for modern schools.
- **Company:** Auris Nexus Technologies (About, footer, legal and Organization structured data only).
- **Audit date:** 2026-10-02.
- **Status words:** `AVAILABLE` (verified in the application), `ROADMAP` (shown with a visible label), `CONFIRM` (needs an owner's confirmation; nothing invented), `REMOVED` (claim taken off the site).

---

## 1. Completed

| Area | What is now true |
| --- | --- |
| Positioning | Home hero states the category: "The operating platform for modern schools", followed by the category sentence and a "who it is for" line. Funda360 is the subject of every product page; Auris Nexus Technologies appears only as the company. |
| Keyword map | `src/content/seo.ts` holds one title, description, primary intent, secondary intents and `lastModified` per route. Every page reads its metadata from it. No keyword stuffing; each intent has exactly one owning page. |
| Homepage flow | What it is → problem → who it is for → what it does (hub, Manage → Understand → Act, capabilities) → what it looks like (tour) → AI (honest roadmap) → trust (security) → why Funda360 → insights (only when published) → next step. |
| Capability pages | Six standalone landing pages, each with: definition section ("What is school attendance management?"), context, capabilities, who uses it, workflows, real product screenshot, outcomes, related capabilities, role links, related reading, FAQ, CTA. |
| Solution pages | Four audience pages with a "why" section, audience-specific capability links and related reading. |
| Security page | New `/security` route: data separation per school, role-based access, protected sensitive records, audit trail, secure sign-in, POPIA-minded consent, and an explicit "what we do and do not claim" section. |
| Metadata | Unique absolute titles (≤ 75 characters, brand once), descriptions of 70–175 characters, canonical URLs that match the served trailing-slash URLs, Open Graph and Twitter `summary_large_image` on every page. |
| OG images | 1200×630 PNG cards generated at build time for every major route, capability, solution and article (`/og/<key>.png`). |
| Structured data | One `@graph`: Organization (Auris Nexus Technologies) → Brand + SoftwareApplication (Funda360, `creator`/`publisher` = Organization, `featureList` = available capabilities only) → WebSite. Per page: WebPage / CollectionPage / AboutPage / ContactPage, BreadcrumbList, ItemList, Article, FAQPage. No `sameAs` or company URL until confirmed. |
| Robots and indexing | Indexing requires `NEXT_PUBLIC_ALLOW_INDEXING=true` **and** a public https site URL. Production robots.txt allows `/`, disallows `/login`, references the sitemap. Every other build disallows everything and is `noindex`. Noindex pages keep `follow`. |
| Sitemap | Generated from the route registry. Includes indexable routes only, with real `lastModified`; no `priority`/`changefreq` manipulation. Excludes `/login`, `/privacy`, `/terms` (placeholder legal text), draft articles and empty categories. |
| Internal linking | Capability ↔ capability, capability → solutions (role pills), solution → capabilities, articles → capabilities and solutions, capability/solution → related reading, home → security, about → security and AI, demo page → platform/solutions/security/resources. Generic anchors replaced with descriptive ones (`src/lib/links.ts`). |
| Resources | Drafts are never listed on the indexed site. Draft pages are built only because static export needs at least one route; they are unlisted, labelled "Draft", `noindex` and absent from the sitemap. When no article is published the Resources page shows the planned topic clusters instead of empty listings. |
| Authors | Placeholder bios removed. The single honest author is "The Funda360 Team" (Auris Nexus Technologies), published as an Organization in Article schema. |
| Trust without fabrication | Trust content is limited to verifiable product controls. No testimonials, customers, logos, statistics, awards, certifications, case studies or ROI figures anywhere. |
| Screenshots | Every product shot carries a value caption plus "Real product · fictional demo data". |
| Demo page | States who the demo is for, what it covers, what happens next and why each field is asked, with field hints for role and school size. |
| Legal | Visible placeholder copy replaced with factual status statements; pages stay `noindex` until counsel-approved text exists. |
| CI | GitHub Pages workflow now runs lint and `scripts/verify-seo-build.mjs` against the production export before deploying. |

## 2. Remaining

| Item | Owner | Status |
| --- | --- | --- |
| Publish first articles after editorial review (set `status: 'published'`) | Content | CONFIRM |
| Final privacy policy and terms of use from counsel; then remove `noIndex` in `seo.ts` | Legal | CONFIRM |
| Company website URL and verified social profiles (`NEXT_PUBLIC_DEVELOPER_URL`, `NEXT_PUBLIC_SOCIAL_PROFILES`) | Auris Nexus | CONFIRM |
| Registered company details (registration number, address) for About/legal | Auris Nexus | CONFIRM |
| Demo request endpoint (`NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT`); the form currently validates and says it is not connected | Engineering | CONFIRM |
| Hosting region, sub-processors and data processing agreement wording for `/security` | Auris Nexus | CONFIRM |
| Google Search Console / Bing Webmaster verification and sitemap submission | Marketing | Not configured; nothing is claimed |
| Final logo approval (`public/brand/funda360-logo.png` is rendered from the current site icon) | Brand | CONFIRM |
| Case studies, only with verified and permissioned stories | Marketing | Not started (intentionally) |

## 3. SEO map

One owning page per intent. Titles are in `src/content/seo.ts`.

| Route | Primary intent | Secondary intents |
| --- | --- | --- |
| `/` | school management platform | school management software, school management system, connected school platform |
| `/platform` | school management software platform | school ERP, school information system, all-in-one school software |
| `/platform/learner-management` | learner management system | learner records, admissions and enrolment, learner profiles |
| `/platform/academics-assessments` | school academic management | assessment and marks, report cards, homework |
| `/platform/attendance` | school attendance management software | attendance register, absence alerts, guardian attendance notifications |
| `/platform/finance` | school fee management software | fee billing, payment reconciliation, fee statements |
| `/platform/communication` | school communication platform | parent portal, school announcements, parent communication app |
| `/platform/analytics` | school analytics and dashboards | school reporting, school performance data, leadership reports |
| `/ai` | AI in education / school intelligence | responsible AI in schools, AI for school leaders |
| `/solutions` | school management solutions by role | — |
| `/solutions/schools` | school administration software | school office software, school admin system |
| `/solutions/school-leadership` | school leadership dashboard | principal dashboard, school owner reporting |
| `/solutions/education-groups` | multi-school management platform | school group management, multi-campus school software |
| `/solutions/funders` | reliable school information for funders | education programme reporting, school data for funders |
| `/about` | about Funda360 / Auris Nexus Technologies | who builds Funda360 |
| `/security` | school data security and protection | POPIA school data, role-based access for schools |
| `/resources` | school management insights | school leadership articles |
| `/request-demo` | school management software demo | Funda360 demo, school software pricing conversation |
| `/privacy`, `/terms`, `/login` | — | `noindex` |

**Deliberately not created:** `/platform/reporting`. Reporting intent is owned by
`/platform/analytics`; a second page would duplicate content and split ranking.
No URLs changed in Phase 3, so no redirects were required.

## 4. Content gaps

Content clusters planned in `contentClusters` (`src/content/seo.ts`) and shown on
`/resources` while no article is published:

| Cluster | Supports | Topics |
| --- | --- | --- |
| School management | `/platform` | connected school information, choosing school management software, moving off spreadsheets |
| Attendance | `/platform/attendance` | using attendance patterns, following up absence, guardian notifications |
| Academics | `/platform/academics-assessments` | assessment workflows, report cards, homework follow-through |
| Finance | `/platform/finance` | fee statements, reconciliation, communicating about fees |
| Communication | `/platform/communication` | parent communication, announcements, portal adoption |
| AI and school data | `/ai` | responsible AI, data foundations, questions to ask vendors |

Other gaps:

- Four draft articles exist; none is published. All four need editorial sign-off.
- Transport module: present in the application in part; not marketed. CONFIRM before any page mentions it.
- Case studies, quotes and outcome figures: none exist and none were written. Only add with written permission and real data.

## 5. Product claims

Verified against the Funda360 application (read-only; `origin/main` at `6857975`).

| Claim | Where | Evidence | Status |
| --- | --- | --- | --- |
| Learner records, admissions and enrolment | `/platform/learner-management`, home | Learner, admission and enrolment modules | AVAILABLE |
| Assessments, marks and report cards (with a review workflow) | `/platform/academics-assessments` | Assessment and report-card modules and approval states | AVAILABLE |
| Homework | `/platform/academics-assessments`, communication | Homework module and notifications | AVAILABLE |
| Attendance registers | `/platform/attendance` | Attendance capture | AVAILABLE |
| Guardian notifications for present, absent or late | `/platform/attendance` | Attendance notification logic | AVAILABLE (wording narrowed to what the code does) |
| Absence alerts after 3 consecutive school days | `/platform/attendance` | Consecutive-absence rule | AVAILABLE (exact rule stated) |
| Fee billing, statements and payments | `/platform/finance` | Finance module | AVAILABLE |
| Payment reconciliation | `/platform/finance` | Reconciliation is confirmed by a person; no automatic matching suggestions | AVAILABLE (described as human-confirmed) |
| Parent portal | `/platform/communication` | Guardian portal routes | AVAILABLE |
| Notifications for homework and attendance | `/platform/communication` | Notification triggers | AVAILABLE (narrowed from "all activity") |
| SMS / email / WhatsApp delivery | communication | Channels depend on configured providers | CONFIRM (not claimed as available) |
| Leadership dashboards and reports | `/platform/analytics`, leadership | Dashboard screens | AVAILABLE |
| Advanced BI / custom report builder | `/platform/analytics` | Not built | ROADMAP (labelled) |
| Multi-school (one organisation, several schools) | education groups | Tenant / school separation | AVAILABLE |
| Group-level administration | education groups | Partial | CONFIRM (labelled) |
| Consolidated group reporting | education groups | Not built | ROADMAP (labelled) |
| AI insights, risk prediction, assistants | `/ai`, home | Not built | ROADMAP (every item labelled) |
| Role-based access, data separation per school | `/security` | Database policies and role model | AVAILABLE |
| Audit trail and learner-record access logging | `/security` | Audit tables | AVAILABLE |
| MFA | `/security` | Required for some privileged roles | AVAILABLE (scope stated, not "MFA for everyone") |
| POPIA | `/security` | Consent and privacy features | "Designed with POPIA in mind"; compliance not claimed |
| SOC 2 / ISO 27001 | `/security` | None | Explicitly **not** claimed |
| Third-party integrations (payment gateways, accounting) | fees | Not confirmed | CONFIRM (not claimed) |
| Customer counts, testimonials, logos, awards, ROI | — | None exist | None on the site |

## 6. Technical SEO

| Check | Result |
| --- | --- |
| Canonical = served URL | Fixed. Static export serves `/path/`; `absoluteUrl()` now adds the trailing slash, so canonical, `og:url`, JSON-LD and sitemap `loc` all match. |
| Titles | Unique, absolute, brand once, ≤ 75 characters (enforced by QA). Long article headlines use `seoTitle`. |
| Descriptions | Unique, 70–175 characters (enforced by QA and the build verifier). |
| Open Graph / Twitter | Title, description, URL, type, locale, site name and a real 1200×630 PNG on every page; articles use `og:type=article` with published/modified time and author. |
| Structured data | Validated by QA: Organization name, SoftwareApplication `creator` → Organization `@id`, page entity URL = canonical, BreadcrumbList on every page except home. |
| Robots | Production: allow `/`, disallow `/login`, sitemap and host. Every other build: `Disallow: /` plus `noindex`. |
| Sitemap | 18 URLs in production; every `loc` resolves, matches its canonical and is indexable (verified by `scripts/verify-seo-build.mjs`). |
| Indexing gate | Requires both the env flag and a public https origin, so a mis-set preview cannot be indexed. |
| Drafts | Never in the sitemap; `noindex` on any build. |
| Search Console | Not configured. Nothing on the site claims verification. |
| CI | Typecheck, lint, production build and the SEO verifier run before every Pages deploy. |

## 7. Accessibility

- axe-core (WCAG 2.1 A/AA rules) on 28 routes: **0 violations**.
- Landmarks: one `header`, `nav` (labelled Primary / Footer / Breadcrumb), `main`, `footer` per page. Every section has a heading referenced by `aria-labelledby`; one `h1` per page; no skipped heading levels (checked by QA).
- Lists styled without bullets keep `role="list"` (Safari drops list semantics otherwise).
- Navigation is a disclosure pattern with `aria-expanded`, Escape to close and focus return; keyboard-tested by QA. Tour tabs handle arrow keys on the tab buttons themselves.
- Descriptive link text throughout; QA fails on "learn more", "explore", "read more", "click here" or "link" used alone.
- Every content image has alt text describing what the screenshot shows; decorative icons are `aria-hidden`.
- No horizontal overflow at 320, 390, 768 and 1280 px on any route.
- ESLint `jsx-a11y` is now part of CI.

### Contrast (WCAG 2.1, token pairs in use)

| Foreground on background | Ratio | Use | Result |
| --- | --- | --- | --- |
| slate-900 on white | 17.85 | Headings | AAA |
| slate-700 on white | 10.35 | Body text | AAA |
| slate-700 on slate-50 | 9.90 | Body on muted sections | AAA |
| slate-500 on white | 4.76 | Meta text | AA |
| slate-500 on slate-50 | 4.55 | Meta on muted sections | AA |
| white on blue-600 | 5.17 | Primary button | AA |
| white on blue-700 | 6.70 | Primary button hover | AA |
| blue-700 on white | 6.70 | Links | AA |
| blue-700 on blue-50 | 6.16 | Badges, tinted panels | AA |
| teal-700 on white | 5.47 | Intelligence accents, borders | AA |
| teal-700 on teal-50 | 5.25 | Roadmap/intelligence badges | AA |
| white on navy-900 | 16.52 | Navy sections | AAA |
| blue-400 on navy-900 | 6.50 | Links and eyebrows on navy | AA |
| teal-500 on navy-900 | 6.64 | Accents on navy only | AA |
| amber-700 on amber-50 | 4.84 | "Confirm" badges | AA |
| red-700 on white | 6.47 | Form errors | AA |

teal-500 is used only on navy (it fails on white and was removed from light borders in Phase 2).

### Colour balance (rendered pixels, 1440 px, 18 routes)

Target about 80% neutral / 15% navy (brand) / 5% accent.

| Route | Neutral | Navy | Teal | Blue |
| --- | --- | --- | --- | --- |
| `/` | 64% | 5% | 10% | 21% |
| `/platform` | 81% | 6% | 1% | 11% |
| Capability pages | 78–81% | 7–9% | 0% | 12–13% |
| `/ai` | 68% | 10% | 18% | 5% |
| `/solutions` | 74% | 15% | 3% | 8% |
| Solution pages | 79–86% | 8–11% | 0% | 4–12% |
| `/about` | 72% | 12% | 0% | 16% |
| `/security` | 79% | 14% | 0% | 7% |
| `/resources` | 80% | 13% | 0% | 7% |
| `/request-demo` | 67% | 21% | 0% | 12% |
| **All routes** | **77.2%** | **8.9%** | **2.1%** | **11.8%** |

Site-wide balance is close to target; blue (the brand action colour) carries
what navy would otherwise carry. Teal is concentrated on `/ai` and the home AI
section, where it signals intelligence, as intended. The home page is the
most colourful because of the tinted hero and capability dots; no palette
change was made (out of scope for Phase 3).

## 8. Conversion

- CTA hierarchy applied everywhere: **Request a Demo** (primary, blue) > Explore the Platform > Explore Solutions > Read Insights (secondary/tertiary styles).
- Every page ends in a CTA banner; capability and solution pages also link sideways so a visitor never hits a dead end.
- Demo page answers the questions that block a request: who it is for, what the demo covers, what happens next, why each field is asked. "Not ready for a demo?" offers platform, role, security and insights paths.
- Trust before the ask: the home trust section links to `/security`; the demo page links to it as well.
- Login is clearly separated (secondary button, opens the application) so existing users do not land in the demo funnel.
- Risk: the demo endpoint is not connected yet (CONFIRM). The form says so honestly instead of pretending to submit.

## 9. Performance

- Every route is statically generated (57 pages); no client data fetching.
- Hero screenshots load eagerly with `fetchpriority="high"`; all other screenshots lazy-load with intrinsic width and height (no layout shift).
- Screenshots are WebP, about 50 KB each.
- Fonts are self-hosted (`@fontsource`), no third-party font requests.
- OG images are generated at build time; no runtime image service.
- No analytics, tag managers or advertising scripts.
- Only the header, product tour, demo form and the scroll-reveal observer are client components (FAQs use native `<details>`).

## 10. CONFIRM register

| Item | Where it matters |
| --- | --- |
| Company website URL and social profiles | Organization JSON-LD `url` / `sameAs` |
| Registered company details | About, legal pages, footer |
| Privacy policy and terms text | `/privacy`, `/terms` (`noindex` until supplied) |
| Demo request endpoint | `/request-demo` |
| Hosting region, sub-processors, DPA | `/security` |
| Messaging channels (SMS, email, WhatsApp) | `/platform/communication` |
| Group-level administration scope | `/solutions/education-groups` |
| Payment and accounting integrations | `/platform/finance` |
| Logo file | Organization/Brand logo in JSON-LD |
| Article publication | `/resources` |

---

# Phase 3.1: completion pass (2026-10-02)

Scope: production verification, demo conversion, final product-truth audit,
SEO and structured-data validation, indexing safety, Search Console
readiness, funnel and performance checks. No redesign, no URL changes, no
changes to the Funda360 application or any database.

## 3.1.1 Production deployment verification

| Check | Result | Evidence |
| --- | --- | --- |
| Branch / HEAD before this pass | `ccr-d8e3ba6b-jy0prt` at `f7c8619`, clean tree, equal to `origin` | `git status`, `git rev-parse` |
| Deploy of `f7c8619` | **Succeeded.** Workflow run 3 (id 37024933259): typecheck, lint, build, production SEO verification, upload and deploy all green | GitHub Actions API |
| Deployed URL | Pages reported `https://funda360.aurisnexus.co.za/` (custom domain configured in repository Pages settings; there is no CNAME file, which the Actions deploy does not need) | `deploy-pages` log |
| Deployed artifact | `github-pages` artifact 11234522067, sha256 `bb27a3b3…40c5`, built from `f7c8619` | Actions artifact API |
| **Live-site checks** (HTTP status, HTTPS, live robots/sitemap/canonicals, live mobile rendering) | **Not verified from this environment.** The session's egress policy blocks `funda360.aurisnexus.co.za`, `*.github.io` and the artifact download host (proxy 403). Nothing here claims the live site was inspected | Proxy log |
| Equivalent build checks | The deployed build passed `verify-seo-build.mjs` in CI on the exact `out/` that was uploaded. In this pass an identical production export was rebuilt locally and verified with the extended checks below | CI step 8; local run |

**Do after every deploy (from a normal network):** run the post-deploy
checklist in section 3.1.8.

## 3.1.2 Demo conversion (highest priority): implemented

The form previously could not send anything. It now submits to a server-side
endpoint built for this static site.

- **Architecture:**
  - The browser form (static) POSTs JSON to `server/demo-request`, which is deployed separately. Cloudflare Workers is recommended; a Node adapter is included.
  - The endpoint delivers to a **webhook** and/or **email via Resend**.
  - No CRM is assumed or invented: the webhook is the clean interface for whichever CRM or form service is chosen.
- **Security:**
  - All credentials exist only on the endpoint.
  - The browser holds only the endpoint's public URL and an optional public Turnstile site key.
  - The E2E test checks the browser bundle for secret variable names.
- **Validation:** one shared module (`src/lib/demoValidation.ts`) runs in the browser and again on the server. The server ignores unknown fields and returns field-level errors that the form shows next to each field.
- **Spam protection:**
  - honeypot (silent drop);
  - minimum completion time;
  - per-client rate limit;
  - origin allow-list;
  - optional Cloudflare Turnstile;
  - 16 KB body limit;
  - JSON-only.
- **Duplicate prevention:**
  - in-flight guard and disabled button;
  - a request id kept until success;
  - server-side de-duplication by id;
  - `X-Request-Id` and a Resend `Idempotency-Key` downstream;
  - the form is replaced by the confirmation after success.
- **States:**
  - an upfront notice when no endpoint is configured;
  - validation summary;
  - specific errors (too fast, rate limited, verification failed, not connected, delivery failed, network), with the person's details kept in the form;
  - a success confirmation that is focused and scrolled into view, with next steps and a link to the platform;
  - an optional contact-email fallback.
- **Fields:**
  - unchanged and minimal: name, organisation, work email, optional phone, role, size, interests, optional message, consent;
  - each one either qualifies the demo or is needed to reply.
- **Design:** existing form styles and tokens only.
- **Tests:**
  - 13 unit tests (`npm test`);
  - a browser end-to-end test (`npm run qa:demo`) proving that a failed delivery keeps the person's details, a double-clicked retry delivers exactly once, the confirmation is focused and in view, and no secrets reach the bundle;
  - the existing QA covers the unconfigured state.
- **Status:**
  - The code is ready; production is **not yet connected**.
  - It needs the endpoint deployed and `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` set (section 3.1.7).
  - Until then the live form says, before anyone fills it in, that online requests are not connected and nothing is sent.

## 3.1.3 Product-truth final audit

Re-verified against the application repository (read-only), `main` at
`6857975`. That commit includes the 2026-09-29 completion wave, and its
current-state register and known-limitations documents agree with the
findings below.

| Claim area | Website wording | Evidence in the application | Status |
| --- | --- | --- | --- |
| School fee management | Fee structures, charges, payments, allocations, adjustments, refunds, statements, ageing, finance CSV | `src/features/fees`, current-state §2.5 | AVAILABLE |
| Payment reconciliation | Bank-statement CSV import; a person confirms each match | "Human-confirmed bank reconciliation" | AVAILABLE |
| Online payments | "Built to support online payment providers; availability depends on provider activation for each school" | Gateway architecture present; not live without provider credentials | CONFIRM (labelled) |
| Accounting / payment integrations | Not claimed; "not a general-ledger accounting or payroll system" | No accounting integration | Not claimed (correct) |
| Parent portal | Children, results, report cards, attendance, homework, documents, timetable, messaging, consent | `parentPortal`, current-state §2.9 | AVAILABLE |
| Attendance notifications | In-app notification to guardians for present, absent or late; alert after 3 consecutive absences | Migration `20260919090001` (trigger per record); `20260829130000` (3-day alert) | AVAILABLE. **Rewritten:** the attendance meta description now says "in-app" |
| Homework notifications | In-app notifications for homework and attendance | Homework module notifications | AVAILABLE |
| Report cards | Grading scales, templates, governed review/approval/publication, PDFs | `reportCards`, REPORT_CARDS.md | AVAILABLE |
| Analytics | Role-based dashboards, standard reports (learners, staff, academic, assessment, attendance), finance KPIs, CSV, attendance trend charts | `reports`, `dashboard`, `AttendanceTrendChart` | AVAILABLE |
| Advanced BI | Roadmap | Register: "Enterprise BI is not complete". The new `/operations` panel shows raw KPI JSON, which is not a BI product | ROADMAP (labelled) |
| AI | Every AI capability is labelled roadmap | Register roadmap item 14 | ROADMAP (labelled) |
| Group administration | CONFIRM label | Multi-tenant model with platform-level tenant switching; group-admin scope not documented | CONFIRM (labelled) |
| Multi-school reporting | Roadmap | No consolidated group reporting | ROADMAP (labelled) |
| SMS / email / WhatsApp | "In-app today; email, SMS and WhatsApp depend on provider configuration" | Adapter architecture; delivery gated on provider secrets and a scheduler | CONFIRM (labelled) |
| Two-factor authentication | "Multi-factor authentication, which some privileged roles are required to use" | `mfa`, `mfaRequiredRoles.ts` | AVAILABLE |
| Security | Data separated per school and enforced in the database, RBAC, audit logging, record-access logging, consent records; no certification claimed; POPIA "in mind" | RLS/FORCE RLS, register §3; certification explicitly not claimed by the app | AVAILABLE; no overclaim |
| Transport, boarding, library, sports, assets, procurement, governance, events, POPIA/DSAR workflows | Not marketed | Present on `main` as early "production foundations" (completion wave); the register still lists them as expansion areas | **Not marketed.** CONFIRM with the product owner before any page mentions them |
| SA-SAMS / CEMIS | Not claimed | CSV staging only; "official endpoints intentionally not fabricated" | Not claimed (correct) |
| Native mobile apps | "Native mobile apps are not currently available" | Responsive web only | Correct |

No claim needed removal. One wording fix was made (attendance meta
description). SEO targeting such as "school fee management software" is kept:
the fee management functionality is real. Only payment-provider activation
and integrations are unconfirmed, and the page says so.

## 3.1.4 SEO architecture and content depth

The live URLs differ from two labels in the Phase 3.1 brief. The existing
URLs are kept (changing them would break indexed links for no SEO gain):

| Brief label | Actual URL (unchanged) | Primary intent |
| --- | --- | --- |
| /platform/academics-assessments | `/platform/academics-assessments` | academic and assessment management |
| /platform/fees | `/platform/finance` | school fee management software (title: "School Fee Management Software") |

Every other route in the brief matches. Every primary landing page has:

- a first-screen definition (hero, then a "What is …?" overview section);
- an H2/H3 structure (verified: one `h1`, no skipped levels);
- related capability and solution links;
- a Request a Demo link (now enforced by the build verifier on every sitemap URL).

Related resource links appear automatically once articles are published.
No duplicate or synonym pages were created.

## 3.1.5 Resources, authorship and structured data

- **Editorial cluster:**
  - The 8 recommended articles are defined as typed briefs in `src/content/editorial.ts`: slug, intent, required capability and solution links, outline, and claims each must not make.
  - The briefs are shown as "In preparation" topics on `/resources`.
  - Three existing drafts map onto briefs.
  - Nothing is published automatically.
- **Funnel enforcement:** the build verifier fails the deploy if any article page lacks a capability link, a solution link or the Request a Demo link.
- **Authorship:**
  - "The Funda360 Team" (Auris Nexus Technologies) is kept as the byline. **CONFIRM** this is the approved editorial identity.
  - No named authors were created.
  - Named authors need: full name, approved role or title, a short factual bio written or approved by the person, optional headshot with consent, optional verified profile URL. The `Author` type already supports name, role and bio.
- **Structured data:** validated on all 33 HTML files (103 JSON-LD blocks). The checks:
  - valid JSON with the schema.org context;
  - Organization = Auris Nexus Technologies;
  - SoftwareApplication = Funda360, created and published by that Organization;
  - WebSite present;
  - every `@id` reference resolves;
  - every URL in the JSON-LD exists in the build;
  - breadcrumb positions are sequential;
  - every FAQ question is visible on its page;
  - Article has headline, dates, author, publisher and image;
  - no `aggregateRating`, `review`, `award`, `hasCredential`, employee counts or founding dates;
  - `sameAs` only from the configured variable.
- **Rich-result caveats:**
  - Google shows software rich results only with price or rating data. None is invented, so that result is not expected.
  - FAQ rich results are limited by Google to authoritative government and health sites. The markup stays valid but will rarely display.

## 3.1.6 Indexing safety

| Check | Result |
| --- | --- |
| Production requires `NEXT_PUBLIC_ALLOW_INDEXING=true` **and** a public https origin | Verified in `src/config/site.ts` |
| Preview with flag on but http origin | `verify-seo-build.mjs --preview`: robots `Disallow: /`, all 33 HTML files noindex, a verification token supplied but not rendered |
| Flag off with the https production origin | Same result: not indexable |
| Production robots.txt | `Allow: /`, `Disallow: /login`, Host, Sitemap |
| Sitemap | 18 URLs; every one matches its canonical, is indexable and exists; no indexable page is missing from it |
| Intentional noindex | `/login`, `/privacy`, `/terms` (pending legal text), 4 draft articles, 5 empty categories, 404 |

## 3.1.7 Exact production configuration still required

1. **Demo endpoint (blocks conversion):**
   1. Deploy `server/demo-request` (see its README).
   2. Set `ALLOWED_ORIGINS=https://funda360.aurisnexus.co.za`.
   3. Configure at least one delivery option: `DEMO_REQUEST_WEBHOOK_URL` (with `DEMO_REQUEST_WEBHOOK_SECRET`), or `RESEND_API_KEY` + `DEMO_REQUEST_EMAIL_TO` + `DEMO_REQUEST_EMAIL_FROM` on a Resend-verified domain.
   4. Recommended: `TURNSTILE_SECRET_KEY`, plus a platform rate-limiting rule.
2. **GitHub repository variables** (Settings > Secrets and variables > Actions > Variables), then re-run the Pages workflow:
   - `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` (required);
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (recommended);
   - `NEXT_PUBLIC_CONTACT_EMAIL` (CONFIRM);
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` (only for HTML-tag verification);
   - `NEXT_PUBLIC_DEVELOPER_URL` and `NEXT_PUBLIC_SOCIAL_PROFILES` (CONFIRM).
3. **Legal:** final privacy policy and terms, then remove `noIndex` for `/privacy` and `/terms` in `src/content/seo.ts`. The privacy text must name the demo-request processor(s) chosen in step 1 and a retention period (CONFIRM).
4. **Editorial:** write, review and publish the first cluster (section 3.1.5).

## 3.1.8 Search Console readiness

- **Canonical production URL:** `https://funda360.aurisnexus.co.za/` (every canonical URL has a trailing slash).
- **Sitemap:** `https://funda360.aurisnexus.co.za/sitemap.xml`.
- **Verification:** prefer a **Domain property** with a DNS TXT record on `funda360.aurisnexus.co.za` (or the parent domain). No repository change is needed for that. Alternatively, use a URL-prefix property with the HTML tag: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy; the tag renders only on indexable production builds. Bing works the same way via `NEXT_PUBLIC_BING_SITE_VERIFICATION`, or import from Search Console.

**Steps after each production deploy (from a normal network):**

1. Open `https://funda360.aurisnexus.co.za/`. It must load over HTTPS with a valid certificate, and `http://` must redirect. (CONFIRM "Enforce HTTPS" is ticked in the repository's Pages settings; it could not be checked from here.)
2. Open `/robots.txt` and `/sitemap.xml` and check them against section 3.1.6.
3. View the source of `/`, `/platform/finance/` and `/request-demo/`. Check: canonical, `index, follow`, `og:image` (open the PNG URL), `twitter:card`, JSON-LD.
4. On a phone: open the home page, the menu, `/platform/attendance/`, `/security/` and `/request-demo/`. Submit a real test demo request and confirm exactly one delivery.
5. In Search Console:
   1. Verify the property and submit the sitemap.
   2. Use URL Inspection on `/`, run "Test live URL" and request indexing.
   3. Check Pages > Indexing for unexpected exclusions after a few days.
6. Validate a page in the Rich Results Test and the Schema Markup Validator.
7. **Do not report the site as indexed** until Search Console shows indexed pages. As of this pass, indexing is **not verified**.

## 3.1.9 Funnel and performance

- **Funnel:** search → landing page (capability or solution) → related capability or solution → Request a Demo → form → endpoint → confirmation.
  - Every sitemap URL links to `/request-demo/` (enforced by the build).
  - All 74 primary-button instances across the built pages point to Request a Demo, except the 404 page ("Home") and `/login` ("Continue to the application"), which are utility pages.
  - The secondary actions are Explore the Platform, Explore Solutions and Read Insights.
  - There are no competing primary CTAs.
- **Performance:**
  - All 59 pages are statically generated.
  - Client components: header, product tour, demo form, scroll-reveal observer.
  - Modern-browser JavaScript is about 158 KB gzipped, almost all Next.js/React runtime. The 39 KB legacy polyfill is `nomodule`, so modern browsers skip it.
  - Images: WebP screenshots of about 50 KB each, with width and height set (no layout shift).
  - Fonts: self-hosted.
  - Turnstile loads only when configured, and only on `/request-demo`.
  - The build-only font packages for OG images were moved to devDependencies.
  - Added `favicon.ico` and a 180×180 `apple-icon.png`, rendered from the existing icon.

---

# Launch hardening (2026-10-06)

Scope: verify and harden the approved Phase 3.1 site for launch. No redesign,
no route changes, no changes to the Funda360 application.

## L.1 Production verification approach

This development environment cannot reach `funda360.aurisnexus.co.za` (the
egress proxy refuses it). The live site is therefore verified **from GitHub's
runners**. A new `verify-live` job runs after every deploy:

1. **Commit check:** waits until `/build-info.json` reports the deployed commit, because the Pages CDN can serve the previous build for a few minutes.
2. **`scripts/verify-live.mjs`** checks:
   - `http://` redirects to `https://`;
   - production `robots.txt`;
   - `sitemap.xml`: content type, duplicates, correct host;
   - every sitemap URL: HTTP 200, `text/html`, canonical, `index, follow`, title, description, `og:url`, Twitter card, `og:image` (fetched; must be `image/png`), valid JSON-LD, no localhost or preview hosts;
   - unique titles and descriptions;
   - the slash-less variant of each URL must redirect (301) to the canonical;
   - every internal link and asset on those pages must return 200;
   - `/login/`, `/privacy/`, `/terms/`, `/demo/`, `/product/`, `/features/` and a draft article must be 200, noindex and absent from the sitemap;
   - an unknown URL must return a 404 with the "Page not found" page;
   - icons;
   - the demo endpoint: a warning if not connected; if connected, a CORS preflight and a 405 for GET.
3. **`scripts/qa.mjs` with `QA_BASE_URL` set to production:**
   - the full browser QA: axe WCAG 2.1 AA on 28 routes, six viewports, navigation, keyboard, demo form, crawl.

Section L.6 gives the result of the first run. Before pushing, both scripts
were dry-run locally against the production export served by a GitHub Pages
emulator (301 for slash-less URLs, `404.html`). Both passed.

## L.2 Defects found and fixed

| # | Defect | Impact | Fix |
| --- | --- | --- | --- |
| 1 | On the static export `usePathname()` returns `/ai/` while nav hrefs are `/ai` | **Production:** the current page was never marked `aria-current` and the active nav state was lost | `SiteHeader` compares paths without the trailing slash |
| 2 | The demo endpoint's Node adapter trusted client-sent `CF-Connecting-IP` / `X-Forwarded-For` | Rate limit could be bypassed by forging headers | The address comes from the TCP connection; `TRUST_PROXY=1` for exactly one trusted proxy; regression test proves the old code failed |
| 3 | Two concurrent copies of the same request could both be delivered | Possible duplicate leads | The request id is claimed before delivery; a concurrent copy gets `409 in-progress` (tested) |
| 4 | Unexpected handler errors would crash the Node process or return a 500 without CORS | Endpoint downtime; misleading "network" error in the form | Top-level wrapper returns a generic 500 JSON with CORS and no internals (tested) |
| 5 | Rate-limit memory grew without bound | Slow memory growth under abuse | Bounded and pruned |
| 6 | The email pattern accepted `a@b.co,evil@x.org` and display-name forms | Reply-to could address several recipients | One plain address only (tested) |
| 7 | A non-HTTPS demo endpoint would have been used | Personal data could be posted in plain text | Only `https://` (or `http://localhost` for testing) is accepted |
| 8 | 404 page emitted two `robots` meta tags | Conflicting head tags | Only Next.js's own `noindex` remains |
| 9 | 11px labels (badges, card categories, article meta, demo-data note, footer headings) | Hard to read on phones | 12px |
| 10 | "Read more" style links and the article category link were 19–22px tall | Small touch targets on mobile | Minimum 24px height |
| 11 | `/demo`, `/product`, `/features` returned 404 | Lost visitors from typed or shared links | Noindex forwarding pages with canonical to the real page |
| 12 | About: "School information is protected by default" | Vague claim | "Access is restricted by school and by role by default, and enforced in the database" |
| 13 | QA assumed slash-less URLs | QA could not run against production | URL checks accept the trailing slash |

## L.3 Mobile and accessibility QA

- **Viewports:** 320, 375, 390, 414, 768 and 1280 px, on all 28 routes.
- **New automated checks, per page and viewport:**
  - CTAs or buttons touching the screen edge (items in horizontal scroll strips excepted);
  - touch targets under 24×24 px (inline text links and stretched-link cards excepted);
  - clipped text;
  - text under 12 px;
  - images outside the viewport;
  - plus the existing horizontal-overflow check.
- **Results:** all pass after the fixes in L.2.
- **Unchanged and still passing:**
  - axe: 0 violations;
  - one `h1` per page and no skipped heading levels;
  - keyboard: skip link, menus, Escape and focus return;
  - form labels, error summary and focus;
  - alt text;
  - reduced-motion handling.

## L.4 Security review (marketing site)

- **No secrets anywhere:**
  - only `NEXT_PUBLIC_*` public values reach the browser;
  - endpoint secrets live only on the endpoint host;
  - the E2E test scans the bundle;
  - the repository was grepped for key patterns.
- **HTML injection:** JSON-LD is serialised with `<` escaped. The only other `dangerouslySetInnerHTML` is a constant one-line script. No user content is rendered as HTML.
- **No open redirects:** `/login` and the alias pages forward to build-time constants, never to query parameters.
- **Endpoint:**
  - origin allow-list with no wildcard;
  - CORS echoed only for allowed origins;
  - POST and JSON only, 16 KB limit;
  - honeypot, timing check, per-client rate limit (spoof-proof in the Node adapter; Cloudflare's `CF-Connecting-IP` on Workers);
  - optional Turnstile;
  - de-duplication;
  - generic errors only;
  - no personal data in logs.
- **Known limits (documented, not code defects):**
  - The timing value is client-reported, so it only deters naive bots. Turnstile and the platform rate-limiting rule are the strong controls.
  - GitHub Pages cannot set HTTP security headers such as CSP or HSTS preload. A CDN in front (for example Cloudflare) would be needed for that.

## L.5 Remaining external configuration (not complete until done)

| Item | Where | Status |
| --- | --- | --- |
| Deploy the demo endpoint (`server/demo-request`), set `ALLOWED_ORIGINS`, at least one delivery option (Resend API key + to/from addresses on a verified domain, or a webhook URL + secret), recommended `TURNSTILE_SECRET_KEY` and a rate-limiting rule | Cloudflare (or another host), Resend | **Not configured.** The live form says online requests are not connected |
| `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT` (and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) as repository variables, then re-run the workflow | GitHub > Settings > Secrets and variables > Actions > Variables | **Not set** (confirmed: the live page shows the "not connected" notice; the workflow log shows the variables empty) |
| Search Console: Domain property via DNS TXT (preferred) or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; submit `https://funda360.aurisnexus.co.za/sitemap.xml` | DNS, Google Search Console | **Not verified.** No token in the repository or the variables |
| Bing Webmaster Tools: import from Search Console or `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing | **Not verified** |
| "Enforce HTTPS" in the repository's Pages settings | GitHub > Settings > Pages | Checked by `verify-live` (`http://` must 301 to `https://`) |
| Final privacy policy and terms; then remove `noIndex` for `/privacy`, `/terms` | Legal | Pending |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DEVELOPER_URL`, `NEXT_PUBLIC_SOCIAL_PROFILES` | Repository variables | CONFIRM; leave empty until confirmed |
