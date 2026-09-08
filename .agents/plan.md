# TAFAWOK Commercial Real Estate (CRE) — Phased Execution Plan

> **Platform:** Enterprise Commercial Real Estate (CRE) Bilingual Platform & Corporate Showcase  
> **Client:** TAFAWOK Real Estate Investment & Contracting Company  
> **Lead Stakeholder:** Eng. Tarek Ahmed (CEO & Owner)  
> **Tech Stack:** Next.js 16 (App Router), TypeScript Strict, Tailwind CSS v4, shadcn/ui, Zustand, Motion, Nodemailer  
> **Status:** Phase 2 Complete (Verified) | Ready for User Review

---

## Master Progress Checklist

- [x] **Phase 1: Dependencies, Core Types & i18n Data Architecture**
  - [x] Install `zustand`, `motion`, `nodemailer`, `@types/nodemailer`
  - [x] Create strict TypeScript types (`types/cre.ts`)
  - [x] Create comprehensive bilingual data layer (`content/cre-data.ts`) with all 3 properties and owner profile
  - [x] Build locale Zustand store with dynamic RTL direction flip (`stores/useLocaleStore.ts`)
  - [x] Build UI Zustand store for drawers, filters, and lightboxes (`stores/useUiStore.ts`)
  - [x] Configure dual font system (`Cairo` for Arabic RTL, `Inter` for English LTR) in `layout.tsx` and `globals.css`
  - [x] Create client-side `LanguageProvider.tsx`
  - [x] Implement `<PhoneNumber />` component & `.phone-number` LTR isolation utility preventing RTL flipping
  - [x] Implement `<FormattedUnit />` & `<BiDiIsolate />` components and `.unit-number` utility for measurements (m², %, tons)
  - [x] Verify strict typecheck (`npm run typecheck`) and build (`npm run build`)

- [x] **Phase 2: Global Navigation (Navbar) & Architectural Footer**
  - [x] Build Brand Logo / Emblem component (`components/layout/Logo.tsx`)
  - [x] Build Properties mega-dropdown menu for the 3 locations (`components/layout/PropertyDropdown.tsx`)
  - [x] Build responsive Header/Navbar (`components/layout/Navbar.tsx`) with sticky blur, locale switch, and theme toggle
  - [x] Build mobile navigation sheet/drawer (`components/layout/MobileNav.tsx`)
  - [x] Build 4-column architectural Footer (`components/layout/Footer.tsx`) with 3 location links and direct owner reach
  - [x] Wire Navbar and Footer into `app/layout.tsx`
  - [x] Configure `images.remotePatterns` in `next.config.ts` for property visual assets
  - [x] Verify responsiveness across `sm`, `md`, `lg`, `xl`, `2xl`
  - [x] Verify layout flipping in Arabic (RTL) vs English (LTR) and theme switching (Light/Dark)

- [ ] **Phase 3: Interactive Home Page (`/`)**
  - [ ] Build Hero section with kinetic typography and dual CTAs (`components/home/HeroSection.tsx`)
  - [ ] Build 25-Year Heritage & Metric counter ticker (`components/home/MetricsSection.tsx`)
  - [ ] Build Featured 3 Commercial Properties showcase grid (`components/home/FeaturedProperties.tsx`)
  - [ ] Build Commercial Disciplines & Capabilities breakdown (`components/home/DisciplinesSection.tsx`)
  - [ ] Build CEO Message executive quote & direct owner reach preview (`components/home/CeoQuoteSection.tsx`)
  - [ ] Build Tier-1 Client & Retail Anchor infinite marquee (`components/home/ClientMarquee.tsx`)
  - [ ] Build Home Contact & RFQ inquiry CTA section (`components/home/HomeContactCta.tsx`)
  - [ ] Compose `app/page.tsx` with smooth scroll reveals (`motion`)
  - [ ] Verify typecheck, lint, and build

- [ ] **Phase 4: Commercial Properties Directory & 3 Dedicated Property Pages**
  - [ ] Build Property Card component (`components/properties/PropertyCard.tsx`)
  - [ ] Build Architectural Specs grid (`components/properties/PropertySpecs.tsx`)
  - [ ] Build Interactive Photo Gallery with full-screen Lightbox (`components/properties/PropertyGallery.tsx`)
  - [ ] Build Stores & Services Directory with category filtering (`components/properties/StoreDirectory.tsx`)
  - [ ] Build Embedded Google Maps component with directions button (`components/properties/PropertyMap.tsx`)
  - [ ] Build Dedicated On-Site Leasing & Owner Card (`components/properties/PropertyLeasingCard.tsx`)
  - [ ] Build Properties Directory catalog page (`app/properties/page.tsx`)
  - [ ] Build Dynamic Dedicated Property route (`app/properties/[slug]/page.tsx`) with `generateStaticParams`:
    - [ ] Location 1: `/properties/building-360-business-park` (New Cairo)
    - [ ] Location 2: `/properties/tafawok-retail-center` (Regional Destination Mall)
    - [ ] Location 3: `/properties/tafawok-logistics-park` (Industrial & Trade Complex)
  - [ ] Verify metadata, SEO, and static generation for all 3 routes

- [ ] **Phase 5: Corporate About Us & Dedicated CEO Message Pages**
  - [ ] Build About Us page (`app/about/page.tsx`):
    - [ ] 25+ years track record & 5 decades Gulf heritage timeline
    - [ ] CRE investment thesis and development philosophy
    - [ ] Zero-Harm HSE policy and quality assurance standards
  - [ ] Build Dedicated CEO Message page (`app/ceo-message/page.tsx`):
    - [ ] Strategic vision by Eng. Tarek Ahmed
    - [ ] Full executive bio and career milestones
    - [ ] Direct Owner Access Card (phone, email, WhatsApp, Cairo HQ)
  - [ ] Verify typecheck and build

- [ ] **Phase 6: Contact & RFQ Portal + SMTP Backend Delivery Service**
  - [ ] Build Next.js API Route for SMTP (`app/api/contact/route.ts`) using Nodemailer
  - [ ] Support standard SMTP env vars (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`)
  - [ ] Add graceful dev-mode preview fallback (logs payload safely when SMTP credentials are not yet set)
  - [ ] Build Bilingual Inquiry & RFQ Form (`components/contact/ContactForm.tsx`) with validation
  - [ ] Build Executive Owner Reach Card (`components/contact/OwnerCard.tsx`)
  - [ ] Build Interactive Cairo HQ Map (`components/contact/HqMap.tsx`)
  - [ ] Build Contact Portal page (`app/contact/page.tsx`)
  - [ ] Test form submission, error handling, and SMTP delivery

- [ ] **Phase 7: Animation Polish, Performance & Final Verification**
  - [ ] Fine-tune Motion scroll triggers and viewport reveals (inspired by `animejs.com` and `reactbits.dev`)
  - [ ] Verify WCAG accessibility and contrast in light and dark modes
  - [ ] Verify full responsive fidelity across mobile (375px), tablet (768px), and desktop (1280px+)
  - [ ] Execute `npm run typecheck`, `npm run lint`, and `npm run build`
  - [ ] Update `journal.md` and walkthrough documentation

---

## Detailed Phase Breakdown

### Phase 1: Dependencies, Core Types & i18n (COMPLETED)
- **Status:** Done & Verified.
- **Files Created:**
  - [`types/cre.ts`](file:///C:/Users/shine/WebProjects/Tafawok/types/cre.ts)
  - [`content/cre-data.ts`](file:///C:/Users/shine/WebProjects/Tafawok/content/cre-data.ts)
  - [`stores/useLocaleStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useLocaleStore.ts)
  - [`stores/useUiStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useUiStore.ts)
  - [`components/layout/LanguageProvider.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/LanguageProvider.tsx)
  - Updated [`app/layout.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/app/layout.tsx) & [`app/globals.css`](file:///C:/Users/shine/WebProjects/Tafawok/app/globals.css)
- **Outcome:** Full bilingual switching (AR/EN), dynamic `<html dir="rtl|ltr">`, font pairing (`Cairo` + `Inter`), and complete data models for the 3 locations and company owner.

---

### Phase 2: Global Navigation (Navbar) & Architectural Footer (COMPLETED)
- **Status:** Done & Verified.
- **Files Created / Modified:**
  - [`components/layout/Logo.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/Logo.tsx): SVG architectural brand mark + bilingual typography
  - [`components/layout/Navbar.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/Navbar.tsx): Sticky responsive header with backdrop-blur
  - [`components/layout/PropertyDropdown.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/PropertyDropdown.tsx): Centered mega-dropdown showcasing the 3 properties
  - [`components/layout/MobileNav.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/MobileNav.tsx): Accessible slide-out navigation sheet for mobile/tablet
  - [`components/layout/Footer.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/Footer.tsx): 4-column architectural footer with direct owner reach & sitemap
  - [`components/layout/ThemeToggle.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/ThemeToggle.tsx): Accessible light/dark switcher
  - [`components/layout/LanguageToggle.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/layout/LanguageToggle.tsx): Instant AR/EN language switch with BiDi alignment
  - Updated [`app/layout.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/app/layout.tsx) & [`next.config.ts`](file:///C:/Users/shine/WebProjects/Tafawok/next.config.ts)
- **Outcome:** Full responsive navigation across all screen sizes (`sm` to `2xl`), seamless Arabic RTL / English LTR flipping, light & dark theme switching, interactive property mega-dropdown previewing the 3 locations, direct owner access card, and zero build or type errors.

---

### Phase 3: Interactive Home Page (`/`)
- **Objectives:**
  1. High-impact architectural Hero section highlighting TAFAWOK's CRE authority and 25-year track record.
  2. Animated counter ticker for key metrics (77,500 m² portfolio, 25+ years, 50+ engineers).
  3. Interactive 3-card showcase highlighting the 3 properties with direct exploration buttons.
  4. Commercial disciplines overview (Prime Offices, Retail Centers, Logistics Parks, Turnkey EPC).
  5. Executive statement teaser quoting Eng. Tarek Ahmed with a direct link to the full message.
  6. Infinite horizontal marquee of Tier-1 institutional clients and retail anchors.
  7. Quick inquiry CTA section at the base.
- **Files to Create / Modify:**
  - `components/motion/MotionFade.tsx`: Viewport scroll animation wrapper
  - `components/motion/CounterTicker.tsx`: Number counting ticker
  - `components/motion/Marquee.tsx`: Continuous partner marquee
  - `components/home/HeroSection.tsx`
  - `components/home/MetricsSection.tsx`
  - `components/home/FeaturedProperties.tsx`
  - `components/home/DisciplinesSection.tsx`
  - `components/home/CeoQuoteSection.tsx`
  - `components/home/ClientMarquee.tsx`
  - `app/page.tsx`: Compose full homepage
- **Verification:** Test smooth animations, verify layout density, verify AR/EN copy.

---

### Phase 4: Dedicated Commercial Property Pages
- **Objectives:**
  1. Dedicated landing page for each of the 3 locations with rich architectural presentations.
  2. Individual routes:
     - `/properties/building-360-business-park`
     - `/properties/tafawok-retail-center`
     - `/properties/tafawok-logistics-park`
  3. Detailed components:
     - Hero banner with badge, category, and direct leasing phone
     - Architectural specs table (GLA, floorplate, clear height, parking, occupancy)
     - Interactive photo gallery with full-screen lightbox
     - Comprehensive store & services directory (floor, unit number, description, category filter)
     - Embedded Google Map with direct directions link
     - Direct on-site leasing contact card
  4. General properties directory page at `/properties`.
- **Files to Create:**
  - `components/properties/PropertySpecs.tsx`
  - `components/properties/PropertyGallery.tsx`
  - `components/properties/StoreDirectory.tsx`
  - `components/properties/PropertyMap.tsx`
  - `components/properties/PropertyCard.tsx`
  - `app/properties/page.tsx`
  - `app/properties/[slug]/page.tsx`
- **Verification:** Test all 3 dynamic routes via `npm run build` static pre-rendering, verify store directory filters and gallery lightbox.

---

### Phase 5: About Us & Dedicated CEO Message
- **Objectives:**
  1. **About Us (`/about`)**: Corporate heritage, regional Gulf experience, multidisciplinary execution, Zero-Harm safety policy, and ISO quality standards.
  2. **CEO Message (`/ceo-message`)**: Full executive address from Eng. Tarek Ahmed outlining TAFAWOK's CRE vision, values, and direct owner accessibility.
- **Files to Create:**
  - `app/about/page.tsx`
  - `app/ceo-message/page.tsx`
- **Verification:** Verify text formatting, bilingual parity, and responsive reading flow.

---

### Phase 6: Contact & RFQ Portal + SMTP Backend
- **Objectives:**
  1. Complete contact portal with interactive form, executive owner reach card, and Cairo HQ map.
  2. Server-side API route `/api/contact` using `nodemailer` to dispatch inquiries via SMTP.
  3. Provide `.env.example` documentation and safe local preview logging when SMTP is not yet configured.
- **Files to Create:**
  - `app/api/contact/route.ts`
  - `components/contact/ContactForm.tsx`
  - `components/contact/OwnerCard.tsx`
  - `app/contact/page.tsx`
  - `.env.example`
- **Verification:** Submit test inquiry, verify API responses (200 OK, validation errors), verify email formatting.

---

### Phase 7: Final Animation Polish & Verification
- **Objectives:**
  1. Audit contrast ratios and WCAG accessibility across all pages in both Light and Dark themes.
  2. Fine-tune animation easing curves and scroll reveals.
  3. Run full automated test suites (`typecheck`, `lint`, `build`).
  4. Update `journal.md` logging the architectural milestone.
