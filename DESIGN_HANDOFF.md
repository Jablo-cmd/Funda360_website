# Funda360 Website — Design Handoff

**Status:** Phase 1 (Structure) ✅ · **Phase 2 (Visual design) ✅ implemented** · Next: engineering polish and launch content.

> Process: Strategy → Structure ✅ → Design ✅ → Engineering polish (next).
>
> Phase 1 delivered the complete information architecture, routes, content
> model, components, responsive structure, accessibility and SEO foundations.
> Phase 2 applied the full visual design system on top of that structure
> without changing routes, content architecture, CTA destinations, form
> fields, login behaviour or SEO metadata. See §0 for what Phase 2 changed.

---

## 0. Phase 2 implementation (design system)

### Design tokens (all in `src/app/globals.css` `:root`)

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand / action | `--blue-600`, `--blue-700` (hover), `--blue-50`, `--blue-400` | #2563EB, #1D4ED8, #EFF6FF, #60A5FA | Primary buttons, links, active nav, selected states |
| Intelligence | `--teal-700` (text/icons), `--teal-50` (tint), `--teal-500` (fills only) | #0F766E, #F0FDFA, #14B8A6 | AI/insight content only. **teal-500 is never text, icon, border or focus** (enforced by `npm run qa`) |
| Trust | `--navy-900` | #0B1F3A | Product tour, trust, portals, closing CTA panel, demo hero, footer |
| Neutral | `--slate-900/700/500/200/50`, `--white` | | ~80% of every page |
| Status | `--amber-700/50`, `--red-700/50` | | "To be confirmed" badges, placeholders; form errors |

Typography: **Inter** (UI/body), **Inter Tight** (H1/H2/display), **JetBrains Mono** (eyebrows, data labels, metadata), self-hosted via `@fontsource-variable/*` (no third-party font requests). Scale: `--fs-display` (home H1 only), `--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-lead` per the Phase 2 specification. Spacing scale 4 → 128px (`--space-1…10`), section rhythm `--section-y` (64px → 128px). Layout: 1200px content (`.container`), 1320px showcase bands (`.container--wide`), 12-column `.split` at ≥1024px, side padding `clamp(1rem, 4vw, 2.5rem)`. Radius 6 / 10 / 16 / 20px; pills only for badges and category filters. Motion: 180ms UI transitions, gentle screenshot entrance (`[data-reveal]`), all disabled under `prefers-reduced-motion`.

Contrast: every text/background pair is WCAG AA. On navy, text uses white / `#C7D2E0`, links `#93C5FD`, insight text `#5EEAD4`, focus `--blue-400`. axe reports 0 violations on all 27 routes.

### Brand mark

`src/components/ui/Logo.tsx` reuses the identity already used inside the Funda360 application (rounded tile with the "F" stroke; Funda**360** with "360" in brand blue). Funda360 is the primary identity; Auris Nexus Technologies appears only in the footer legal line and About.

### New / restyled components

| Component | File | Purpose |
| --- | --- | --- |
| `Logo` | `ui/Logo.tsx` | Mark + wordmark, default and inverse |
| `ProductShot` | `ui/ProductShot.tsx` | Real screenshot in a desktop / phone / detail frame, "Real product · fictional demo data" caption; labelled placeholder when no image |
| `ConnectedHub` | `story/ConnectedHub.tsx` | The learner record at the centre of eight connected areas (links); lines decorative |
| `MuaStory` | `story/MuaStory.tsx` | Manage → Understand → Act on a connecting rail, one real screen per step; Act carries Available / Roadmap labels |
| `CapabilityGroups` | `story/CapabilityGroups.tsx` | Twelve areas as four connected clusters (People · Teaching · Operations → Insight) |
| `ProductTour` | `story/ProductTour.tsx` | WAI-ARIA tabs (arrow keys, Home/End) over seven real screens; all panels shown without JS |
| `ConceptPanel` | `ui/ConceptPanel.tsx` | Roadmap concept described in words, labelled "not a product screen" |
| `CategoryNav`, `FeaturedArticle` | `ui/CategoryNav.tsx`, `ui/ArticleList.tsx` | Editorial resources experience |
| `AreaIcon` | `ui/AreaIcon.tsx` | Presentation-only icon mapping (lucide-react), kept out of content |
| `MotionObserver` | `layout/MotionObserver.tsx` | Reveal-on-scroll for product visuals |
| Header | `layout/SiteHeader.tsx` | Sticky header, mega-panels with descriptions, full-height mobile sheet with scroll lock |
| Footer | `layout/SiteFooter.tsx` | Navy footer, inverse logo |

### Truthfulness decisions made during Phase 2

- **Audience taglines** (`tagline` in `content/solutions.ts`). Schools and Leadership use the suggested lines. *Education Groups* uses "Run every school in your group on one consistent, connected platform." and *Funders* "Strengthen participation and performance information in the schools you support." because centralised group visibility and programme-level reporting are **roadmap** in the application; the suggested lines would have implied they exist.
- **AI** is presented with real, available evidence (attendance trend + below-threshold alert, dashboards) and a clearly labelled roadmap. The former "AI screenshot" slot is now a `ConceptPanel` in words, never a mock UI.
- Check marks mean "available"; roadmap / unconfirmed items use a dashed-circle marker and a text badge.
- Homepage H1 is now "The operating platform for modern schools." with the brand line "Smarter Schools. Better Outcomes." as its eyebrow; the page `<title>` is unchanged. The demo page H1 is "Ready to see Funda360 in action?"; its `<title>` is unchanged.

### Product screenshots (provenance)

All 13 images in `public/screenshots/` are **real Funda360 application screens**, captured by running a *copy* of the application locally (in a scratch directory, never inside the application repository) against a network-mocked backend populated with an entirely **fictional "Funda360 Demo School"** (generated names, numbers, amounts). No real learners, guardians, staff, schools, pilot sites or records appear. Before capture, two session-specific elements were hidden: the per-user two-factor set-up reminder, and the data-protection status card (to avoid implying a compliance status). Three images are crops of the same screens (`detail-*.webp`) used in the Manage → Understand → Act story. Images are WebP (~30–60 KB each), with intrinsic sizes to prevent layout shift and alt text describing what is visible. To replace or add an image, update `src/content/screenshots.ts`.

---

## 1. Product positioning

**Funda360 — Smarter Schools. Better Outcomes.**

Funda360 is a connected school management platform. It brings learner records,
academics, attendance, fees and communication together so school teams can
**manage** daily work, **understand** what is happening, and **act** where
attention is needed.

- **Primary identity:** Funda360 is the product brand. The developer,
  Auris Nexus Technologies, appears only in the footer and About page.
- **Core idea:** *connected school information*. The learner record sits at the
  centre; everything else connects to it.
- **Framework:** Manage → Understand → Act (used on Home, AI, articles).
- **Market context:** South African schools (en-ZA, "learners", "educators",
  POPIA). Avoid language that implies a global footprint.
- **Tone:** clear, calm, credible, practical. Not hype. Not childish.

### Truthfulness rules (non-negotiable for design and copy)

The content was verified against the Funda360 application's own current-state
register. Design must not undo this:

- No customers, partners, logos, statistics, testimonials, certifications,
  awards, deployments, user/school counts, countries or outcome numbers.
  There are **no** trust-logo bars, metric counters or testimonial carousels,
  and none should be added until verified, permissioned material exists.
- Every content item carries an **availability** flag (`available`,
  `roadmap`, `confirm`). Roadmap and to-be-confirmed items **must keep a
  visible text label** (`.badge[data-availability]`). Colour alone is not enough.
- AI is **roadmap**. See §6.

---

## 2. Audiences

| Audience | Who | Primary need | Page |
| --- | --- | --- | --- |
| Schools | Administrators, teachers, finance, admissions staff | Less duplicate work; one place for daily operations | `/solutions/schools` |
| School owners & leadership | Principals, deputies, owners, governing leadership | Visibility and oversight without waiting for reports | `/solutions/school-leadership` |
| Education groups | Organisations running/supporting several schools | Consistency across schools; separated data | `/solutions/education-groups` |
| Funders | Foundations, donors, development partners | Reliable school information as a programme foundation | `/solutions/funders` |
| Existing users | Anyone with a Funda360 account | Get to the application | Login (external) |

Parents and learners are users of the product (portals) but not a primary
marketing audience.

---

## 3. Site architecture and routes

Primary navigation (in order): **Platform ▾ · Solutions ▾ · AI & Intelligence ·
Resources · About · [Request a Demo] · [Login]**

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Explain Funda360 and route each audience onward |
| `/platform` | Platform overview | All 12 capability areas; links to detail pages |
| `/platform/learner-management` | Learner Management | Detail page |
| `/platform/academics-assessments` | Academics & Assessments | Detail page (covers Academics & Curriculum + Assessments & Results) |
| `/platform/attendance` | Attendance | Detail page |
| `/platform/finance` | Fees & Finance | Detail page |
| `/platform/communication` | Communication | Detail page |
| `/platform/analytics` | Analytics & Reporting | Detail page (covers Performance Analytics + Reporting) |
| `/ai` | AI & Intelligence | Positioning; available vs roadmap |
| `/solutions` | Solutions overview | *Added in Phase 1* so the "Solutions" nav item has a landing page |
| `/solutions/schools` | Schools | Audience page |
| `/solutions/school-leadership` | School Owners & Leadership | Audience page |
| `/solutions/education-groups` | Education Groups | Audience page |
| `/solutions/funders` | Funders | Audience page |
| `/about` | About | What, why, problem, connected information, vision |
| `/resources` | Resources | Categories, featured and latest insights |
| `/resources/[article]` | Article template | 4 draft articles |
| `/resources/category/[category]` | Category listing | *Added in Phase 1* for SEO and browsing (4 categories) |
| `/request-demo` | Request a Demo | Conversion form |
| `/login` | Login hand-off | *Utility.* Instantly forwards to the application; `noindex` |
| `/privacy`, `/terms` | Legal | *Placeholders* pending legal text; `noindex` |
| 404 | Not found | Recovery links |

Areas **without** a detail page (Educator Management, School Administration,
Roles & Permissions) are fully described in their own section on `/platform`
(`/platform#educator-management` etc.). AI & Intelligence links to `/ai`.

Login is **not** a page on this site: header/footer Login links go directly to
`NEXT_PUBLIC_APP_LOGIN_URL` (default `https://funda360.aurisnexus.co.za/login`).

---

## 4. Page structures (content hierarchy)

Every page has exactly one `h1`; sections are `h2`; items within sections are
`h3` (`h4` when nested). Section `id`s are stable anchors; keep them.

### Home `/`
1. **Hero** (`data-section="hero"`): eyebrow *Smarter Schools. Better Outcomes.*, display h1 *The operating platform for modern schools.*, one-line explanation, CTAs [Request a Demo] [Explore Funda360], module strip, dashboard + phone product visual
2. **Introduction** `#introduction`: what Funda360 is
3. **Problem** `#problem`: 4 fragmentation pain points
4. **Connected platform** `#connected-platform`
5. **Manage → Understand → Act** `#manage-understand-act`: 3 steps
6. **Platform capabilities** `#capabilities`: 12 area cards (AI card labelled Roadmap)
7. **Product UI showcase** `#product`: 6 screenshot slots
8. **AI & Intelligence** `#ai`: two columns: Available today | On the roadmap
9. **Solutions** `#solutions`: 4 audience cards
10. **Trust & security** `#trust`: 6 items + "no third-party certification claimed" note
11. **Impact/outcomes** `#impact`: 4 qualitative outcomes (no numbers)
12. **Insights** `#insights`: 3 latest articles
13. **Request a demo CTA** `#request-demo`
14. Footer

### Platform overview `/platform`
Breadcrumb → Hero (+ dashboard slot) → How the platform connects → capability
index (anchor links) → one section per area (12) → Portals (parent portal phone
slot) → FAQs → CTA.

### Platform detail pages (shared `CapabilityPageTemplate`)
Breadcrumb → Hero/introduction → Problem/context `#context` → Capabilities
`#capabilities` → Key workflows `#workflows` (numbered steps) → Product UI
`#product` → Benefits/outcomes `#outcomes` → Related capabilities `#related` →
FAQs `#faqs` → CTA.

### AI & Intelligence `/ai`
Hero → Our approach `#approach` (4 principles) → From information to attention
`#information-to-attention` (Connect → Understand → Highlight → Act) →
**Available today** `#available-today` (`data-tone="available"`) →
**On the roadmap** `#roadmap` (`data-tone="roadmap"`) → FAQs → CTA.

### Solution pages (`SolutionPageTemplate`, composed differently per audience)
Shared frame: Breadcrumb → Hero + "Who this is for" → *audience-specific
sections* → FAQs → CTA.

| Page | Section sequence |
| --- | --- |
| Schools | Challenges → Workspace per role (5 roles) → A school day (timeline) → Screenshots |
| Leadership | Questions leadership can answer → Leadership view (screenshots) → Oversight capabilities |
| Education Groups | Challenges → Group capabilities (with Roadmap/To be confirmed labels) → Rollout considerations |
| Funders | Why information matters → How Funda360 can help (labels) → Questions to explore |

### About `/about`
Hero → What Funda360 is → Why it exists → The problem → Connected school
information → Vision → How we work (values) → Who builds Funda360 (placeholder) → CTA.

### Resources `/resources`, categories, articles
- Landing: Categories → Featured → Latest → "More resources are coming" → CTA
- Category: hero → articles → other categories → CTA
- Article: Breadcrumb (Resources › Category › Article) → draft label → category
  eyebrow → h1 → summary → meta (author, published, updated, reading time) →
  body blocks (paragraph, h2, list, quote, callout) → About the author →
  Related on Funda360 (internal links) → Related articles → CTA.
- Hero image slot is reserved in the template (comment) for Phase 2.

### Request a Demo `/request-demo`
Hero → two columns: **form** | What to expect · Already using Funda360? (Login) ·
Not ready? (links). Stacks to one column on phones.

---

## 5. Components (design these as a system)

| Component | File | Notes for design |
| --- | --- | --- |
| `SiteHeader` | `components/layout/SiteHeader.tsx` | Disclosure nav: Platform/Solutions are buttons that open link lists (`aria-expanded`). Mobile (< 60rem): single Menu button. `data-active` marks the current section, `aria-current="page"` the current page. Keep 44px targets. |
| `SiteFooter` | `components/layout/SiteFooter.tsx` | 4 link columns + brand block + legal line |
| `PageHero` | `ui/PageHero.tsx` | The page `h1`, eyebrow, lead, CTA pair, optional media |
| `Section` | `ui/Section.tsx` | Labelled `<section>`; `data-tone` hook for visual variety (`available`, `roadmap`, `cta` used today) |
| `CtaLink` / `CtaGroup` | `ui/CtaLink.tsx` | Variants: `primary`, `secondary`, `text`. External (Login) adds hidden "(opens the Funda360 application)" |
| `CtaBanner` | `ui/CtaBanner.tsx` | Closing conversion block on almost every page |
| `FeatureList` | `ui/FeatureList.tsx` | Title + description cards; shows `AvailabilityBadge` |
| `LinkCardList` | `ui/LinkCardList.tsx` | Cards where the title is the link |
| `StepList` | `ui/StepList.tsx` | Ordered steps (Manage → Understand → Act) |
| `AvailabilityBadge` | `ui/AvailabilityBadge.tsx` | "Available today" / "Roadmap" / "To be confirmed". **Must remain visible text.** |
| `ProductShot` / `ProductShotGallery` | `ui/ProductShot.tsx` | Screenshot slot; placeholder until `src` is set; fixed aspect ratio prevents layout shift |
| `FaqSection` | `ui/FaqList.tsx` | Native `<details>` + FAQPage JSON-LD |
| `Breadcrumbs` | `ui/Breadcrumbs.tsx` | + BreadcrumbList JSON-LD |
| `ArticleList` | `ui/ArticleList.tsx` | Article cards (category, title link, summary, meta) |
| `Placeholder` | `ui/Placeholder.tsx` | Marks content to be supplied; must be gone before launch |
| `DemoRequestForm` | `forms/DemoRequestForm.tsx` | See §9 |
| Templates | `components/templates/*` | Capability, Solution, Article |

**Styling contract.** `src/app/globals.css` is deliberately neutral and can be
replaced wholesale. Keep the class names/`data-*` attributes (or update
components together). Structural behaviours to preserve: `.grid` reflow,
`.two-column` stacking, header breakpoint (60rem), `html[data-js]` progressive
enhancement for menus, visible focus, 44px targets, 16px form inputs.

---

## 6. AI positioning

Positioning statement (use verbatim or close to it):

> *Funda360 connects school information so that people can understand what is
> happening and identify where attention may be needed.*

| Available today (may be shown as current) | Roadmap (must be labelled; concept only) |
| --- | --- |
| Connected school information | Learner attention areas |
| Role-based dashboards | Performance trends |
| Attendance trends and attendance alerts | Attendance concerns (patterns over time) |
| Reports across school areas + exports | Learner insights · Leadership insights |
| | Operational intelligence · Early-warning concepts |

Design guidance:
- Give AI real prominence (nav item, Home section, dedicated page), but keep the
  **Available** and **Roadmap** groups visually distinct and never merged.
- No "AI magic" visuals: no robots, brains, glowing orbs, sparkles, generic AI art.
- The `ai` screenshot slot is a **roadmap concept**. If filled, label it as a
  concept, or use the real dashboard/attendance screens instead.
- Principles to reflect: people decide; explainable; privacy-respecting; honest
  about maturity.

---

## 7. Product screenshots

Slots are defined in `src/content/screenshots.ts`; all have real images (see §0 for provenance) except `ai`, which is deliberately a roadmap concept rendered as a `ConceptPanel`.

| Slot | Image | Application screen | Used on |
| --- | --- | --- | --- |
| `dashboard` | `dashboard.webp` | `/dashboard` (principal) | Home hero + tour, Platform hero, Analytics, Leadership hero, AI, Demo |
| `learnerManagement` | `learner-profile.webp` | `/learners/:id` | Home tour, Learner Management |
| `learnerDirectory` | `learners.webp` | `/learners` | Platform, Learner Management |
| `academicPerformance` | `assessment.webp` | `/academic/assessments/:id` | Home tour, Platform, Academics |
| `attendance` | `attendance.webp` | `/attendance` | Platform, Attendance, Schools hero |
| `analytics` | `attendance-report.webp` | `/reports/attendance` | Home tour, Platform, Attendance, Analytics, AI, Funders hero |
| `finance` | `finance.webp` | `/fees` | Home tour, Platform, Finance, Leadership |
| `communication` | `messages.webp` | `/messages` | Home tour, Platform, Communication |
| `reporting` | `report-cards.webp` | `/report-cards` | Home tour, Platform, Academics |
| `parentPortal` | `parent-portal.webp` (phone) | `/parent/children/:id` | Home hero, Platform portals, Learner Mgmt, Attendance |
| `detailRegister` / `detailTrend` / `detailAttention` | `detail-*.webp` (crops) | attendance, attendance report, learner profile | Manage → Understand → Act story, AI |
| `ai` | — (concept panel) | none: roadmap | — |

Rules for future captures: demo tenant with fictional data only; consistent 1440×900 desktop / 390×844 phone viewports at 2× scale, light theme; WebP ~80 quality, 1600px wide (desktop) / 780px (phone); keep alt text accurate.

## 8. CTA strategy

| Priority | CTA | Destination | Where |
| --- | --- | --- | --- |
| Primary | **Request a demo** | `/request-demo` | Header (always), every hero, closing banner on every page |
| Secondary | Explore the platform / Find your solution / See AI approach / Read insights | `/platform`, `/solutions`, `/ai`, `/resources` | Heroes, section ends |
| Existing users | **Login** | Funda360 application (external) | Header, footer, demo page sidebar |

Every CTA renders through `CtaLink`, carries `data-cta="<label>"` for future
analytics, and has a real destination (verified by `npm run qa`).

---

## 9. Request a Demo form

Fields: Full name\*, School or organisation\*, Work email\*, Phone (optional),
Role\* (select), Number of learners or schools\* (select), Interests\*
(checkbox group), Message (optional), Consent\* (checkbox) + hidden honeypot.

- Validation rules: `src/lib/demoRequest.ts` (pure; reuse on the server).
- Errors: summary at top (focused, links to fields) + inline per field,
  `aria-invalid`/`aria-describedby`. Errors are text-prefixed ("Error:"), not colour-only.
- **Integration boundary:** `submitDemoRequest()` POSTs JSON to
  `NEXT_PUBLIC_DEMO_REQUEST_ENDPOINT`. Not configured in Phase 1, so a valid
  submission shows "online submission is not connected yet". A backend (CRM,
  form service or Edge Function) must be chosen; it must re-validate and rate-limit.
- Design needs: states for default, focus, invalid, submitting, success,
  not-configured and error.

---

## 10. SEO structure

- Unique `<title>` (template `%s | Funda360`) and meta description per page, from content files.
- Canonical URL, Open Graph (title, description, url, type, site name, locale) and Twitter card on every page (`src/lib/seo.ts`).
- Structured data: Organization + WebSite (all pages), SoftwareApplication (`/platform`), BreadcrumbList (inner pages), FAQPage (pages with FAQs), Article (articles).
- `sitemap.xml` lists every indexable page; excludes `/login`, legal placeholders and **draft** articles.
- `robots.txt` **disallows everything until `NEXT_PUBLIC_ALLOW_INDEXING=true`** (production launch only).
- Clean, descriptive URLs; strong internal linking (related capabilities, related articles, article → platform links, breadcrumbs).
- Articles have `status: 'draft' | 'published'`. Drafts render a visible label and are `noindex`.
- **Phase 2 deliverables:** Open Graph images (`src/app/opengraph-image.*`), favicon/app icons (replace placeholder `src/app/icon.svg`), logo URL in Organization JSON-LD.

---

## 11. Accessibility foundations (preserve)

Verified with axe (WCAG 2.1 A/AA) on every route: **0 violations**.

- Landmarks: skip link → header → `nav[aria-label=Primary]` → `main#main-content` → footer `nav[aria-label=Footer]`; breadcrumb nav.
- One `h1` per page; no skipped heading levels (checked automatically).
- Disclosure navigation with `aria-expanded`/`aria-controls`, Escape closes and returns focus, click-outside closes, closes on navigation. Works without JavaScript (menus render expanded).
- Visible focus outline on everything; logical DOM order equals visual order.
- Link text is meaningful; repeated "Learn more" links carry hidden context; external Login links announce "(opens the Funda360 application)".
- Forms: visible labels, "(required)" in text, fieldset/legend for groups, error summary and inline errors.
- Screenshot slots have mandatory alt text; placeholders expose `role="img"` + label.
- 44px touch targets; 16px inputs on phones.

**Phase 2 must:** meet 4.5:1 text contrast (3:1 large text/UI), keep focus visible
on every new colour, never use colour alone for availability or errors, honour
`prefers-reduced-motion` for any animation, and keep targets ≥ 44px.

---

## 12. Responsive behaviour

Verified with no horizontal overflow at 320, 390, 768 and 1280px on every route.

- Mobile-first; grids reflow by available width (`auto-fit`, min 14–22rem).
- Header collapses to a Menu button below 64rem (full-height sheet with scroll lock); submenus become inline lists.
- Two-column layouts (home hero, demo page) stack below 48rem.
- Product slots keep their aspect ratio; portrait slots are width-capped.

---

## 13. Visual design applied (Phase 2)

Implemented across every route: brand system and logo, colour/typography/spacing tokens, sticky header with mega-panels and mobile sheet, home hero with layered product visual, connected-platform hub, Manage → Understand → Act story, capability clusters, navy product tour, intelligence section with Available / Roadmap split, audience cards, navy trust band, editorial outcomes, editorial resources and article reading experience, conversion-focused demo page with form card, centred utility pages, navy footer.

Possible engineering-polish follow-ups (not required for launch): Open Graph images per route, an optional dark theme, analytics on `data-cta`, and a CMS for `src/content/resources.ts`.

## 14. Open content items (before launch)

Search the code for `TODO(content)` and `<Placeholder>`.

- Confirm the brand mark (reused from the application) and supply Open Graph images.
- Re-capture screenshots if the application UI changes (§7).
- Company description, team and contact details for About (`content/about.ts`).
- Privacy policy and terms (legal owner); POPIA-compliant demo-form notice.
- Demo form backend and response-time commitment.
- Named authors/bios and editorial review of the 4 draft articles; then set `status: 'published'`.
- Confirm "To be confirmed" items: online payments, email/SMS/WhatsApp delivery, group administration model, funder partnership models.
- Production domain (`NEXT_PUBLIC_SITE_URL`), social profiles, analytics/cookie decision.
- Case studies or testimonials only with verified, permissioned stories.

---

## 15. Verification record

### Phase 2 (2026-10-01)

`npm run typecheck` clean · `npm run build` 33 static pages · `STATIC_EXPORT=1` build OK · `npm run qa` **all checks passed**, now including: every rendered image loads with descriptive alt text; every screenshot asset returns 200; each product-tour tab's screenshot loads; tour keyboard navigation (Arrow/End); self-hosted fonts loaded; no `[data-reveal]` content hidden under reduced motion; teal-500 used only as a fill colour. Also checked manually: no-JS rendering (navigation visible, all tour panels shown), 320/390/768/1280/1440px screenshots of every major route, mobile menu, desktop mega-panels, demo form states.

### Phase 1

`npm run build` → 33 static pages, no errors. `npm run typecheck` → clean.
`npm run qa` → **all checks passed**:
- 27 content routes: HTTP 200, one h1, heading order, unique titles/descriptions,
  canonical, Open Graph, valid JSON-LD, image alt, no console/runtime errors,
  axe WCAG 2.1 AA with 0 violations.
- All internal links (27 URLs) and 41 `#fragment` links resolve; unknown slugs return 404.
- Sitemap and robots present and correct.
- No horizontal overflow at 320/390/768/1280px on every route.
- Mobile menu: collapsed by default, opens, submenu navigation, closes on navigation, Escape returns focus.
- Desktop: every primary nav item navigates and is marked current; submenus open/close via keyboard; first Tab reaches the skip link.
- Demo form: all labelled fields; empty submit gives 7 errors with focused summary; invalid email/phone reported; valid submit reaches the integration boundary.
- `/login` forwards to the application and is `noindex`; all Login CTAs point to the configured application URL.
- `STATIC_EXPORT=1` build produces a working static site.
- The existing Funda360 application repository was read for reference only and was **not modified**.
