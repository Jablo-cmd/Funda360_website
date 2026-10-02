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
| `/platform/academics` | school academic management | assessment and marks, report cards, homework |
| `/platform/attendance` | school attendance management software | attendance register, absence alerts, guardian attendance notifications |
| `/platform/fees` | school fee management software | fee billing, payment reconciliation, fee statements |
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
| Academics | `/platform/academics` | assessment workflows, report cards, homework follow-through |
| Finance | `/platform/fees` | fee statements, reconciliation, communicating about fees |
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
| Assessments, marks and report cards (with a review workflow) | `/platform/academics` | Assessment and report-card modules and approval states | AVAILABLE |
| Homework | `/platform/academics`, communication | Homework module and notifications | AVAILABLE |
| Attendance registers | `/platform/attendance` | Attendance capture | AVAILABLE |
| Guardian notifications for present, absent or late | `/platform/attendance` | Attendance notification logic | AVAILABLE (wording narrowed to what the code does) |
| Absence alerts after 3 consecutive school days | `/platform/attendance` | Consecutive-absence rule | AVAILABLE (exact rule stated) |
| Fee billing, statements and payments | `/platform/fees` | Finance module | AVAILABLE |
| Payment reconciliation | `/platform/fees` | Reconciliation is confirmed by a person; no automatic matching suggestions | AVAILABLE (described as human-confirmed) |
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
| Payment and accounting integrations | `/platform/fees` |
| Logo file | Organization/Brand logo in JSON-LD |
| Article publication | `/resources` |
