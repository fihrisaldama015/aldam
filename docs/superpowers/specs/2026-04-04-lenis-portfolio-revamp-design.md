# Portfolio Revamp — Lenis + Scroll Animation Design

**Date:** 2026-04-04  
**Status:** Approved

---

## Goal

Revamp the portfolio landing page to be memorable and unique. Replace the current light-themed, section-stacked layout with a bold dark theme, buttery smooth scrolling via Lenis, and dramatic full-screen section reveal animations using Framer Motion.

---

## Design Direction

**Style:** Bold & Expressive  
**Theme:** Dark navy base (`#0f172a`) with three accent colors:

| Color | Hex | Used in |
|-------|-----|---------|
| Amber | `#f59e0b` | Hero, Projects, primary CTA |
| Cyan | `#06b6d4` | Skills, Contact, secondary elements |
| Blue | `#3b82f6` | Experience section |
| White | `#ffffff` | Body text |

---

## Architecture

### Smooth Scroll: Lenis
- Install `lenis` package
- Create a `LenisProvider` client component that initializes Lenis with `autoRaf: true`
- Wrap `<body>` content in `layout.tsx` with `LenisProvider`
- Replace all `scrollIntoView` calls in `page.tsx` with `lenis.scrollTo()`
- Navbar section navigation uses `lenis.scrollTo('#section-id')`

### Scroll Animations: Framer Motion `useScroll`
- Each section uses `useRef` + `useInView` (or `whileInView`) to trigger entry animations
- No CSS scroll-snap — sections flow naturally, Lenis provides the smooth feel
- Existing Framer Motion dependency stays, no new animation libraries added

---

## Page Structure

5 sections, each `min-h-screen` (100vh minimum):

### 01 — Hero
- Full-screen entry with photo, name, role, tagline, CTA button, social links
- **Entry animation:** Name text splits and slides up, tagline fades in with delay, CTA button scales in, photo fades from right
- Amber accent on name/CTA

### 02 — Skills  
- Stats row (4+ years, 3+ projects/year)
- Skill pills grid (existing 24 skills)
- **Entry animation:** Section title slides down, stats counter fade in, skill pills stagger in with spring
- Cyan accent

### 03 — Projects *(new)*
- 2–4 project cards: title, short description, tech stack tags, link
- Cards alternate slide-in (left/right) as section enters
- **Entry animation:** Section number + title reveal, cards slide in from alternating sides
- Amber accent
- **Note:** Placeholder project data used initially — user to supply real projects post-implementation

### 04 — Experience
- Vertical timeline (existing data from `experience.ts`)
- Timeline line draws downward on entry, each item fades in staggered
- **Entry animation:** Line draws from top, items slide in left with stagger
- Blue accent

### 05 — Contact
- Large headline CTA ("Let's Work Together")
- WhatsApp, GitHub, LinkedIn links as styled buttons
- **Entry animation:** Headline zooms in from center, links stagger up
- Cyan accent

---

## Persistent UI

### Navbar
- Stays fixed at top throughout scroll
- Active section highlighted with amber dot indicator
- Uses Lenis `scrollTo` for navigation clicks
- Background becomes slightly opaque on scroll (backdrop blur)

### Scroll Progress Bar
- Thin vertical line on right edge of viewport
- Fills amber as user scrolls through the page
- Driven by Framer Motion `useScroll` `scrollYProgress`

---

## Component Plan

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add `LenisProvider` wrapping children |
| `src/components/LenisProvider.tsx` | New — Lenis init + context |
| `src/app/page.tsx` | Full rewrite: dark theme, 5 sections, scroll refs |
| `src/components/Navbar.tsx` | Update: active section tracking, lenis.scrollTo, dark style |
| `src/components/Hero.tsx` | Revamp: dark theme, new animation |
| `src/components/Highlight.tsx` | Revamp: dark theme, whileInView animations |
| `src/components/Experience.tsx` | Revamp: dark theme, timeline draw animation |
| `src/components/Projects.tsx` | New — project cards with scroll animation |
| `src/components/Contact.tsx` | New — contact section |
| `src/components/ScrollProgress.tsx` | New — right-edge progress bar |

---

## Out of Scope

- No CSS scroll-snap (conflicts with Lenis smoothness)
- No GSAP (unnecessary complexity given Framer Motion coverage)
- No new fonts beyond existing SF Pro Display
- No backend/API changes
- Real project data to be added by user after scaffolding
