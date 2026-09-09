# TAFAWOK Engineering Decision Journal

Chronological decision log tracking major architectural milestones and engineering implementations.

---

## Milestone 1: Core Types, State & Bilingual Architecture (Phase 1)

- **Date:** September 2026
- **Scope:**
  - Strict TypeScript schema defining Commercial Real Estate domain entities (`Property`, `PropertySpec`, `StoreItem`, `OwnerContact`, `CorporateMetric`, `ClientPartner`, `CommercialDiscipline`).
  - Bilingual single-source-of-truth content inventory (`content/cre-data.ts`) with zero untyped strings and full English/Arabic parity.
  - Client state stores (`stores/useLocaleStore.ts` and `stores/useUiStore.ts`) powered by Zustand for lightweight UI state and dynamic RTL HTML attributes.
  - BiDi isolation primitives (`<PhoneNumber />`, `<FormattedUnit />`) and CSS utilities preventing number/unit inversion in RTL layouts.

---

## Milestone 2: Global Navigation & Architectural Footer (Phase 2)

- **Date:** September 2026
- **Scope:**
  - Modern sticky Header with backdrop blur, responsive sheet navigation for mobile devices, and dark/light theme switching.
  - Interactive Properties Mega-Dropdown (`PropertyDropdown.tsx`) showcasing all 3 flagship developments directly from the navigation bar.
  - 4-column architectural Footer (`Footer.tsx`) with corporate sitemap, location links, legal licensing, and direct owner access.
  - SVG Emblem & Brand Logo (`Logo.tsx`) combining geometric structural mark with bilingual typography.

---

## Milestone 3: Interactive Commercial Real Estate Home Page (Phase 3)

- **Date:** September 2026
- **Scope:**
  - **Motion Animation Utilities:** Created reusable viewport scroll triggers (`MotionFade.tsx`), ease-out animated counter tickers (`CounterTicker.tsx`), and continuous CSS-based marquees (`Marquee.tsx`) respecting `prefers-reduced-motion`.
  - **Architectural Hero (`HeroSection.tsx`):** High-impact kinetic typography, dual CTAs ("Explore Commercial Assets" & "Connect with Company Owner"), fast credentials bar, and interactive preview cards for the 3 flagship properties.
  - **Track Record & Scale (`MetricsSection.tsx`):** Animated numerical counters highlighting the 25-year track record, 5 decades of Gulf heritage, 77,500 m² GLA, and 50+ core engineers.
  - **Flagship CRE Showcase (`FeaturedProperties.tsx`):** 3-column architectural cards detailing Building 360 Business Park, Tafawok Retail Center, and Tafawok Logistics Park with key specs (GLA, floors, parking, occupancy) and highlights.
  - **Commercial Disciplines (`DisciplinesSection.tsx`):** 2x2 capability grid breaking down Office Towers, Destination Malls, Logistics Parks, and Turnkey EPC Contracting.
  - **Executive Perspective (`CeoQuoteSection.tsx`):** Executive statement quoting Eng. Tarek Ahmed (CEO & Owner) paired with a high-utility Direct Owner Reach Card (direct telephone, WhatsApp, email, HQ coordinates).
  - **Institutional Credentials (`ClientMarquee.tsx`):** Continuous infinite marquee presenting Tier-1 partners (Saudi Aramco, ADNOC, Bechtel, Petrofac, Samsung Engineering, Grand Hypermarket, etc.).
  - **Closing Commercial CTA (`HomeContactCta.tsx`):** Dual conversion action prompts directing tenants and investors to official inquiry channels.
  - **Verification:** 100% passes on `tsc --noEmit`, ESLint (`npm run lint`), and static page pre-rendering (`next build`).

---

## Milestone 3.1: Dedicated Bilingual Dictionaries (`en.json` & `ar.json`)

- **Date:** September 2026
- **Scope:**
  - Separated UI strings into standard JSON dictionaries: [`locales/en.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/en.json) and [`locales/ar.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/ar.json).
  - Upgraded [`stores/useLocaleStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useLocaleStore.ts) translation helper `t()` to dynamically support both dot-notation key paths (`t("home.heroTitle")`, `t("nav.home")`) and structured bilingual domain objects (`t(property.name)`).
  - Derived [`content/cre-data.ts`](file:///C:/Users/shine/WebProjects/Tafawok/content/cre-data.ts) `UI_DICTIONARY` directly from the JSON files to preserve full backward compatibility and strict type safety.
  - Verified static generation (`npm run build`), linting (`npm run lint`), and runtime SSR/SSG parity across all pages.

---

## Milestone 3.2: Cookie-Based SSR Persistence for Locale & Theme + Hydration Hardening

- **Date:** September 2026
- **Scope:**
  - Integrated asynchronous `await cookies()` from `next/headers` into [`app/layout.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/app/layout.tsx) to read `tafawok_locale` and `tafawok_theme` on initial server render.
  - Dynamically set `<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="... font-arabic|font-sans dark">` directly on the server, eliminating layout shifts and client-side theme/font flashing.
  - Upgraded [`stores/useLocaleStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useLocaleStore.ts) to a context-backed Zustand store (`createLocaleStore` + `LocaleContext`), isolating SSR request state and synchronizing cookie changes upon language switch.
  - Added `ThemeCookieSync` to [`components/theme-provider.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/theme-provider.tsx) to write `tafawok_theme` cookie with 1-year persistence alongside localStorage.
  - Resolved all React 19 hydration mismatches in `CounterTicker` and `MotionFade` using `useSyncExternalStore` for client mounting.

---

## Milestone 4: Commercial Properties Directory & Dedicated Property Detail Pages (Phase 4)

- **Date:** September 2026
- **Scope:**
  - **Property Card Primitives (`PropertyCard.tsx`):** Architectural card featuring category badge, occupancy badge, address locator, GLA/floors/parking specs summary, and hover zoom feedback.
  - **Engineering & Specs Grid (`PropertySpecs.tsx`):** Certified technical metrics table with icon badges, BiDi-isolated `<FormattedUnit />` values, and a dedicated mission-critical engineering standards box.
  - **Visual Photography & Lightbox (`PropertyGallery.tsx`):** Responsive architectural photo gallery featuring active showcase display, thumbnail strip, and accessible full-screen Lightbox with keyboard navigation (Esc, Arrow keys) and counter badge.
  - **Commercial Tenants Directory (`StoreDirectory.tsx`):** Real-time search and category filter for on-site businesses, bank branches, and amenities, with unit numbers, floor details, operational status, and direct dial buttons.
  - **Geographic Accessibility (`PropertyMap.tsx`):** Embedded Google Maps container with coordinates, address details card, and external directions launcher.
  - **On-Site Leasing Portal (`PropertyLeasingCard.tsx`):** Direct commercial leasing desk actions (direct telephone dialing, one-click WhatsApp chat, official proposal request, and direct owner escalation).
  - **Directory Catalog (`app/properties/page.tsx` & `PropertiesDirectoryClient.tsx`):** Searchable, filterable portfolio showcase with total GLA and parking summary chips.
  - **Dynamic Route Pre-Rendering (`app/properties/[slug]/page.tsx`):** Next.js App Router dynamic route using `generateStaticParams()` to pre-render `/properties/building-360-business-park`, `/properties/tafawok-retail-center`, and `/properties/tafawok-logistics-park` with static SEO metadata.
  - **Verification:** 100% passes on `npm run typecheck`, `npm run lint`, and `npm run build` with zero errors.

---

## Milestone 4.1: Advanced Scroll Engineering & Knockout Typography Showcase ($10k Agency Polish)

- **Date:** September 2026
- **Scope:**
  - **Knockout Image-in-Text Showcase (`TextMaskShowcase.tsx`):** High-impact architectural typography (`TAFAWOK` / `تفوق`) with live photography masked directly inside the letters (`background-clip: text`), paired with parallax vertical drifting and interactive property switcher tabs (`Building 360`, `Retail Mall`, `Logistics Park`) plus an interactive cinema view mode.
  - **Dual Opposite-Direction Parallax Scroll Bands (`ParallaxScrollBands.tsx`):** Two massive full-bleed typographic tracks reacting to page scroll velocity with spring physics (`useScroll` + `useTransform` + `useSpring`) — top track glides left, bottom track glides right, alternating solid and outlined stroke typography.
  - **Alternating Staggered Horizontal Scroll Entrances (`FeaturedProperties.tsx`):** Upgraded property showcase where cards glide smoothly from alternating left and right directions (`x: -90px` / `+90px` to `0px`) on scroll with oversized architectural numeral watermarks (`01`, `02`, `03`).
  - **Architectural Scroll Progress Bar (`ScrollProgressBar.tsx`):** Precision 3px copper/bronze indicator pinned to the viewport ceiling tracking scroll progress with spring damping.
  - **Parallax 3D Card Floating Physics (`HeroSection.tsx`):** Preview cards float and separate at divergent parallax speeds as the user scrolls past the hero section.
  - **Verification:** 100% passes on TypeScript strict check (`npm run typecheck`), ESLint (`npm run lint`), and static compilation (`npm run build`).

---

## Milestone 4.2: Continuous GPU Scroll Marquees, Hydration Elimination & Bespoke Editorial Redesign

- **Date:** September 2026
- **Scope:**
  - **Zero-Hydration-Error Architecture:**
    - Root-caused and permanently eradicated the Next.js 16 / React 19 attribute mismatch on `initial={{ transform }}` in `FeaturedProperties` and `DisciplinesSection` caused by client-side `useReducedMotion()`.
    - Eliminated shorthand/longhand CSS conflict in `TextMaskShowcase` (`backgroundPosition` vs `backgroundPositionY`) to comply with React 19 style rules.
    - Used `useSyncExternalStore` mounted checks to guarantee 100% byte-for-byte attribute matching between server HTML and initial client hydration.
  - **Continuous Moving Scroll Bands (`ParallaxScrollBands.tsx`):**
    - Fixed RTL coordinate system bug where flex containers in `dir="rtl"` translated offscreen: added `dir="ltr"` coordinate isolation with Arabic BiDi isolation on items.
    - Structured tracks into two seamless halves (`w-max flex shrink-0 items-center gap-8 animate-marquee-left / right`) with edge vignette masks, guaranteeing continuous 60/120fps hardware-accelerated movement in all browsers and locales.
    - Measured and verified live movement in Chrome DevTools: `moving: true` with continuous velocity in opposite directions.
  - **Architectural Editorial Portfolio Layout (`FeaturedProperties.tsx`):**
    - Moved away from generic SaaS 3-box card kit into a prestigious editorial hierarchy:
      - **Flagship Asset (Building 360):** Full-width panoramic architectural feature with 2-column desk, 4-cell architectural specs matrix (18,500 m² GLA, G+5 Floors, Dual Substation, 380 Vehicles), blueprint coordinates, and high-impact photography.
      - **Companion Powerhouses (Retail Center & Logistics Complex):** 2-column balanced split with tailored retail and industrial metrics, eliminating text truncation and cramped cards.
      - **Alternating Slide Entrances:** Flagship asset and companion cards glide in from alternating left and right directions via deterministic `MotionFade`.
  - **Showstopper Knockout Typography (`TextMaskShowcase.tsx`):**
    - Giant knockout brand typography (`TAFAWOK` / `تفــوق` and `COMMERCIAL ASSETS` / `ريادة الأصول التجارية`) with live building photography masked inside the letterforms via `-webkit-background-clip: text`.
    - Razor-sharp bronze border strokes and luxury drop shadows ensure maximum contrast in both light and dark themes.
    - Interactive property pills (01, 02, 03) dynamically switch the masked architectural image in real time with an expandable cinema view toggle.
  - **Disciplines Architectural Elevation (`DisciplinesSection.tsx`):**
    - Added blueprint discipline codes (`DISC-01 // CORPORATE TOWERS`, `DISC-02 // RETAIL MALLS`, `DISC-03 // HEAVY LOGISTICS`, `DISC-04 // TURNKEY EPC`) with alternating sliding entrances and zero hydration divergence.
  - **Verification & Quality Gate:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 pages statically pre-rendered successfully.
    - Browser DevTools console: 0 errors, 0 warnings, Next.js issue overlay is completely clean.

---

## Milestone 4.3: React Bits Interactive Components Integration, Living SVG Knockout Mask & Motion Normalization

- **Date:** September 2026
- **Scope:**
  - **Motion Normalization & Warning Eradication:**
    - Eradicated the `[browser] You have Reduced Motion enabled on your device` console warning by removing `useReducedMotion()` from `CounterTicker.tsx` and configuring `<MotionConfig reducedMotion="never">` in `LanguageProvider.tsx`.
    - Enabled metric counter tickers to animate smoothly on all devices without being suppressed by OS/browser accessibility flags.
  - **Integrated Three Interactive Components from `prompt.md`:**
    - **`ScrollExpandShowcase.tsx` (`ScrollExpand`):** Full-bleed stage expansion driven by page scroll where the media frame expands from 50% to 100% full bleed, resting title lifts away, and rich architectural metrics (GLA, occupancy, parking) fade in over the flagship asset (Building 360 Business Park).
    - **`FeaturedProperties.tsx` (`AccordionGallery`):** Integrated GSAP-powered interactive accordion gallery with 3D perspective tilt (`6deg`), internal image parallax drift as panels resize, desaturation transitions on collapsed panels, and illuminated bronze accent bars (`oklch(0.553 0.195 38.402)`).
    - **`CeoQuoteSection.tsx` (`BorderGlow`):** Wrapped the CEO executive statement in an interactive cursor-following mesh gradient border with warm copper/amber glow (`#d97706`, `#b45309`, `#f59e0b`) and soft ambient depth.
  - **Living Architectural SVG Knockout Mask (`TextMaskShowcase.tsx`):**
    - Replaced CSS text-clipping with a true physical SVG knockout mask (`mask="url(#creKnockoutMask)"`) where the letters `TAFAWOK` / `تــفـــوق` are a transparent aperture cut directly through the page surface.
    - Behind the letters, high-res architectural photography travels vertically with deep parallax (`imageY: [-130px, 130px]`, `scale: [1.18, 1.06]`) and mouse micro-drift, creating palpable, unmistakable motion inside the typography.
    - Sub-pixel precision SVG stroke (`strokeWidth="2.5"`) directly aligned in SVG coordinate space, eliminating kerning discrepancies.
  - **Balanced Information Architecture & Page Pacing:**
    - Unified the home page layout so sections have clear breathing room: Hero -> Metrics -> ScrollExpand -> TextMaskShowcase -> FeaturedProperties (AccordionGallery) -> DisciplinesSection -> CeoQuoteSection (BorderGlow) -> ParallaxScrollBands -> ClientMarquee -> HomeContactCta.
  - **Verification & Quality Gate:**
    - Browser DevTools console: 0 errors, 0 warnings.

---

## Milestone 4.4: shadcn/ui Component Standardization

- **Date:** September 2026
- **Scope:**
  - **Installed Core shadcn/ui Primitives via CLI:**
    - `Card` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`) via `npx shadcn@latest add card`.
    - `Tabs` (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) via `npx shadcn@latest add tabs`.
    - `Avatar` (`Avatar`, `AvatarImage`, `AvatarFallback`) via `npx shadcn@latest add avatar`.
  - **Standardized UI Across Platform Components:**
    - **`MetricsSection.tsx`:** Standardized 4 corporate metric tiles into full shadcn `Card` composition (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) and `Badge` tags.
    - **`FeaturedProperties.tsx`:** Standardized the 3 companion powerhouse cards into `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and `Badge` occupancy/category pills.
    - **`DisciplinesSection.tsx`:** Converted the 4 commercial discipline grids into standardized `Card` composition with `CardHeader`, `CardTitle`, `CardDescription`, and feature checklist in `CardFooter`.
    - **`PropertyCard.tsx`:** Refactored the core catalog property card (`/properties`) into full shadcn `Card`, `Badge`, and `Separator` composition.
    - **`StoreDirectory.tsx`:** Transformed tenant and service directory cards into semantic `Card` items with `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`, and status `Badge` indicators.
  - **Resolved Turbopack HMR Exception:**
    - Removed redundant `MotionConfig` from `LanguageProvider.tsx`.
  - **Applied All 23 Canonical Tailwind CSS IntelliSense Classes:**
    - Cleaned up arbitrary values to standardized shorthand equivalents (`aspect-video`, `h-0.75`, `inset-s-0`, `min-h-80`, `grayscale-15`, `contrast-105`, `max-w-50`).
  - **Verification:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 static routes generated successfully.
    - Browser DevTools console: Clean, 0 errors.

---

## Milestone 4.5: Clean UI Refinement, TargetCursor Integration & Codebase De-Cluttering

- **Date:** September 2026
- **Scope:**
  - **Removed All Background Effects:**
    - Stripped ambient glowing radial gradients, blueprint grids, and decorative overlays from `HeroSection`, `FeaturedProperties`, and `ParallaxScrollBands`.
    - Removed `ArchitecturalBackground` from `app/layout.tsx` and deleted `components/motion/ArchitecturalBackground.tsx`.
    - Restored pristine, clean architectural surfaces with high contrast.
  - **Pruned Dead & Obsolete Code:**
    - Removed orphaned and superseded components: `components/home/DisciplinesSection.tsx`, `components/home/HomeContactCta.tsx`, `components/home/TextMaskShowcase.tsx`, and `components/motion/BorderGlow.tsx`.
    - Zero dead component imports across the entire codebase.
  - **React Bits TargetCursor Integration:**
    - Installed and configured `TargetCursor` with dynamic frame-by-frame target geometry tracking (`tickerFn` updates `activeTarget.getBoundingClientRect()` continuously) ensuring flawless tracking even on animated components like `AccordionGallery`.
    - Fixed all Tailwind Intellisense canonical classes (`translate-x-[-150%]`, `translate-y-[-150%]`).
  - **Scrollbar Hidden via Built-In Progress Indicator:**
    - Added global scrollbar hiding (`scrollbar-width: none; -ms-overflow-style: none; display: none;`) as scroll position is clearly displayed via the top architectural copper progress bar.
  - **Verification & Build Gate:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 static routes generated successfully.
    - Browser DevTools console: Clean, 0 errors.

