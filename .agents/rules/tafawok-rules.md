---
trigger: always_on
---

# TAFAWOK — Project Rules & Standards

> Multilingual (AR/EN) Enterprise Platform & Corporate Showcase for **TAFAWOK Real Estate Investment & Contracting Company** — specialized in **Commercial Real Estate (CRE)**: Prime Office Developments, Business Parks, Retail Hubs, Mixed-Use Commercial Assets, and Turnkey EPC Execution.

---

## Tech Stack

| Layer           | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Framework       | Next.js 16 (App Router — SSG / Static Content)            |
| Language        | TypeScript strict mode (no `any`)                         |
| Styling         | Tailwind CSS v4 (`@tailwindcss/postcss`)                  |
| UI Components   | shadcn/ui (Tailwind v4 + `@base-ui/react`, Lucide)        |
| Client State    | Zustand — UI state only (drawer, modals, active tabs)     |
| Content / i18n  | Bilingual structured data (AR/EN) with true RTL support   |
| Package Manager | npm                                                       |

**State Rule:**
- **Static Content:** Typed JSON/TS layer is the single source of truth (`content/` or `TAFAWOK_ASSETS_AND_CONTENT.md`).
- **UI State Only:** Locale toggle, mobile drawer, active property/sector filters, RFQ dialogs live in Zustand.
- **Never** put static text or mock databases in Zustand. No Redux.

---

## Modules & Sections (CRE Information Architecture)

| Module / Section           | Scope & Authority                                                            |
| -------------------------- | ---------------------------------------------------------------------------- |
| **Hero & Corporate**       | 25+ yrs track record, regional CRE heritage, key metrics, CEO vision         |
| **Commercial Disciplines** | Office Towers, Retail Hubs, Mixed-Use Assets, Business Parks, Turnkey EPC   |
| **Featured CRE Portfolio** | Flagship commercial assets, retail flagships, medical hubs, strategic specs  |
| **Engineering & Materials**| Precision MEP, industrial sourcing, structural specs, certified suppliers    |
| **HSE & Quality**          | Zero-Harm policy, safety charters, ISO & commercial quality compliance       |
| **Clients & Partners**     | Tier-1 institutional credentials (Energy, EPC, commercial tenants, partners) |
| **Contact & RFQ Portal**   | Cairo HQ coordinates, regional offices, investor & tenant inquiry dialogs    |

**Architecture Rules:**
- Modular sections live under `/components/sections/<section-name>/`.
- Shared UI primitives live in `/components/ui/` (shadcn) and `/components/shared/`.
- No duplicate content strings: All corporate metrics, asset specs, and case studies derive from typed bilingual content files.

---

## Agent Skills

Always load the relevant skill before performing a task — never rely on memory:

| Skill | When to Use | Core Directive |
| --- | --- | --- |
| `frontend-design` | Building any UI, page, layout, or section | High-end CRE aesthetic: architectural, institutional, prestigious, and dense |
| `web-design-guidelines` | Auditing design, accessibility, and layouts | High contrast (WCAG), responsive across all breakpoints (`sm` to `2xl`) |
| `emil-design-eng` | Micro-interactions, transitions, hover states | Refined, snappy transitions; subtle hover/active feedback without lag |
| `vercel-react-best-practices` | Writing or reviewing React/Next.js components | RSC by default; `"use client"` only for interactivity; no barrel imports |
| `vercel-composition-patterns` | Designing component APIs & layouts | Compound components, flexible layouts, clean prop interfaces |
| `nextjs-app-router-patterns` | App Router routing, layouts, metadata, SSG | Static generation (SSG), layout nesting, SEO metadata |
| `shadcn` | Adding, configuring, or styling shadcn/ui | Search registries first; semantic tokens only; never hand-edit `/components/ui/` |
| `zustand` | Client-side UI state stores | Scoped UI slices only (drawer, filter, modals); no server data |
| `i18n` | Bilingual translations & RTL handling | EN/AR parity; all keys mirrored; dynamic RTL (`dir="rtl"`); no hardcoded strings |

---

## Brand Identity & Theme Styling

**Single Source of Truth:** `app/globals.css` showcases and defines the authoritative brand color selection for TAFAWOK CRE.

**CRE Brand Aesthetic:**
- **Tone:** Prestigious Commercial Real Estate (CRE) developer & investment authority — architectural elegance, structural permanence, institutional gravitas.
- **Brand Palette (Defined in `globals.css` via OKLCH):**
  - **Primary (`--primary`):** Architectural Bronze/Copper (`oklch(0.553 0.195 38.402)` light / `oklch(0.47 0.157 37.304)` dark).
  - **Surfaces (`--background` / `--card`):** Pure white / dark obsidian (`oklch(0.141 0.005 285.823)`).
  - **Text (`--foreground`):** Deep obsidian / crisp light (`oklch(0.985 0 0)`).
  - **Borders & Muted (`--border`, `--muted`):** Architectural framing with high contrast ratios.
  - **Data/Chart Accents (`--chart-1` to `--chart-5`):** Warm ochre, bronze, and amber scale.
- **Strict Enforcement:** Consume tokens via `@theme inline` classes (`bg-primary`, `text-foreground`, `border-border`). Never hardcode hex codes or invent arbitrary colors.
- **Dark Mode:** Seamless light/dark support via `dark:` variants and `ThemeProvider`.
- **Visual Polish:** Refined architectural borders, crisp property badges, elevated card elevations.

---

## Internationalization (i18n) & RTL

Supports **Arabic (`ar`, RTL)** and **English (`en`, LTR)**.

1. **Zero Hardcoded Strings:** User-facing strings must derive from structured bilingual dictionaries.
2. **True RTL Support:** Dynamic direction (`dir="rtl"` / `dir="ltr"`). Use logical Tailwind classes (`ms-`, `me-`, `start-`, `end-`, `ps-`, `pe-`).
3. **Typography:** Latin uses `Inter` via `--font-sans`. Arabic uses `Noto_Sans_Arabic` or `Tajawal` with proper line-height scaling.
4. **Bilingual Schema:** Static content objects require both keys:
   ```ts
   interface LocalizedString {
     en: string;
     ar: string;
   }
   ```
5. **Locale State:** Manage active locale (`"en" | "ar"`) via a lightweight Zustand slice. Sync `lang` and `dir` on `<html>`.
6. **Phone Numbers & Numeric Units:** Phone numbers, dial codes, and numbers with measuring units (e.g., m², %, tons) must never flip in RTL. Enforce BiDi isolation via `<PhoneNumber />`, `<FormattedUnit />`, and the `.unit-number` utility.

---

## Coding Standards

### Type Safety & Architecture
- TypeScript strict mode throughout. **Strictly no `any`**; use `unknown` with type guards.
- Define explicit interfaces for component props, section schemas, and navigation structures.
- **Server Components by Default:** Keep sections static and render at build time for speed and SEO.
- **Interactive Islands (`"use client"`):** Use only for components requiring browser APIs, hooks, or event handlers.
- Small, focused, single-responsibility components.

### Naming Conventions

| Artifact           | Convention            | Example                       |
| ------------------ | --------------------- | ----------------------------- |
| Components         | PascalCase            | `ProjectCard.tsx`             |
| Section Containers | PascalCase            | `HeroSection.tsx`             |
| UI Stores          | camelCase + `Store`   | `navigationStore.ts`          |
| Custom Hooks       | `use` + camelCase     | `useActiveSection.ts`         |
| Utility Functions  | camelCase             | `formatMetric.ts`             |
| Content Data Files | kebab-case            | `procurement-catalogue.ts`    |
| Constants          | UPPER_SNAKE_CASE      | `COMPANY_COORDINATES`         |

- JSDoc on all exported utilities, types, and stores.

---

## Project Documentation

- **`design.md`**: Visual language, component patterns, typography scales, and UI decisions. Update when introducing new visual patterns.
- **`journal.md`**: Chronological engineering decision log for major architectural milestones.
- **`TAFAWOK_ASSETS_AND_CONTENT.md`**: Master content inventory for historical corporate copy, project portfolio data, and specs.

---

## Performance & Commits

- **Zero Unnecessary Client Bundles:** Static marketing pages ship minimal JS.
- **Image Optimization:** Always use `next/image` with explicit aspect ratios and priority flags for above-the-fold assets.
- **Font Optimization:** Load via `next/font/google` with CSS variables to eliminate CLS.
- **Commit Prefixes:** `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `i18n` with section scope (e.g., `feat(procurement)`).
- **Strict Rule:** NEVER run `git commit` or `git push` unless explicitly requested.

---

## Checklist

- [ ] Next.js 16 App Router conventions followed; Server Components used by default
- [ ] No `any` — all props, returns, and content structures strictly typed
- [ ] No hardcoded colors — Tailwind CSS v4 variables and semantic tokens only
- [ ] Dark mode supported seamlessly via `dark:` variants
- [ ] Bilingual support verified: All content has both `en` and `ar` representations
- [ ] RTL layout verified: Correct logical properties (`ms-`, `me-`, `start-`, `end-`) and font rendering
- [ ] Zustand used exclusively for UI state (e.g., drawer, locale, modal dialogs)
- [ ] Single source of truth content models in sync with `TAFAWOK_ASSETS_AND_CONTENT.md`
- [ ] Images optimized with `next/image` (proper sizing, priority, formats)
- [ ] shadcn/ui components customized via design tokens, never editing generated internals
- [ ] Responsive across all breakpoints (`sm` to `2xl`)
- [ ] `frontend-design` skill consulted for visual hierarchy and layout density
- [ ] CRE brand identity verified: Prestigious, architectural, and institutional commercial real estate aesthetic
- [ ] `web-design-guidelines` skill consulted for accessibility and responsive layout
- [ ] `emil-design-eng` skill consulted for micro-interactions and transitions
- [ ] `vercel-react-best-practices` skill consulted before writing/reviewing React components
- [ ] `vercel-composition-patterns` skill consulted for compound component architecture
- [ ] `nextjs-app-router-patterns` skill consulted for routing, metadata, and SSG optimization
- [ ] `shadcn` skill consulted before adding or configuring UI components
- [ ] `zustand` skill consulted for interactive client UI state slices
- [ ] `i18n` skill consulted for bilingual dictionary synchronization and RTL handling
- [ ] `journal.md` updated when an architectural milestone is reached



