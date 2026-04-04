# Lenis Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revamp the portfolio to a bold dark-themed, full-screen-section layout with Lenis smooth scroll and Framer Motion scroll-driven animations.

**Architecture:** Lenis wraps the entire app via `LenisProvider` in `layout.tsx`, exposing the instance through context. Each section is `min-h-screen` and uses Framer Motion `whileInView` for entry animations. Navbar uses `lenis.scrollTo('#id')` for navigation. A `ScrollProgress` bar tracks overall page progress.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/LenisProvider.tsx` | Create | Lenis init + React context |
| `src/components/ScrollProgress.tsx` | Create | Right-edge amber progress bar |
| `src/components/Projects.tsx` | Create | New projects section |
| `src/components/Contact.tsx` | Create | New contact section |
| `src/app/layout.tsx` | Modify | Wrap body with LenisProvider |
| `src/app/globals.css` | Modify | Dark body bg, disable native scroll-behavior |
| `src/app/page.tsx` | Rewrite | Dark bg, 5 sections, simplified section list |
| `src/components/Navbar.tsx` | Rewrite | Dark theme, lenis.scrollTo, amber active indicator |
| `src/components/Hero.tsx` | Rewrite | Dark theme, amber/cyan accents, new animations |
| `src/components/Highlight.tsx` | Rewrite | Dark theme, cyan accents, whileInView stagger |
| `src/components/Experience.tsx` | Rewrite | Dark theme, blue accents, timeline draw animation |

---

## Task 1: Install Lenis + Create LenisProvider + Update layout.tsx + globals.css

**Files:**
- Create: `src/components/LenisProvider.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Install lenis**

```bash
npm install lenis
```

Expected: lenis added to `package.json` dependencies.

- [ ] **Step 2: Create LenisProvider**

Create `src/components/LenisProvider.tsx`:

```tsx
"use client";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ autoRaf: true });
    setLenis(instance);
    return () => instance.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
```

- [ ] **Step 3: Update layout.tsx to wrap children with LenisProvider**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { sfprodisplay } from "@/fonts/font";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Aldam | Personal Website",
  description: "Aldam's personal website",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sfprodisplay.className}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update globals.css — disable native scroll-behavior, set dark body**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind utilities;
@tailwind components;

html {
  scroll-behavior: auto;
}

body {
  background-color: #0f172a;
}

@keyframes wave {
  0%   { transform: rotate(0deg); }
  10%  { transform: rotate(14deg); }
  20%  { transform: rotate(-8deg); }
  30%  { transform: rotate(14deg); }
  40%  { transform: rotate(-4deg); }
  50%  { transform: rotate(10deg); }
  60%  { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/LenisProvider.tsx src/app/layout.tsx src/app/globals.css package.json package-lock.json
git commit -m "feat: add Lenis smooth scroll provider and dark body base"
```

---

## Task 2: Create ScrollProgress Component

**Files:**
- Create: `src/components/ScrollProgress.tsx`

- [ ] **Step 1: Create ScrollProgress**

Create `src/components/ScrollProgress.tsx`:

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-32 w-0.5 bg-white/10 z-50 rounded-full overflow-hidden">
      <motion.div
        className="w-full h-full bg-amber-400 rounded-full origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollProgress.tsx
git commit -m "feat: add scroll progress bar component"
```

---

## Task 3: Rewrite page.tsx + Update Navbar Interface

**Files:**
- Rewrite: `src/app/page.tsx`
- Rewrite: `src/components/Navbar.tsx`

These two are done together because Navbar's prop interface changes: refs and `scrollToSection` are removed — Navbar now uses section IDs directly via Lenis context.

- [ ] **Step 1: Rewrite page.tsx**

Replace `src/app/page.tsx` with:

```tsx
"use client";
import Contact from "@/components/Contact";
import ExperienceTimeline from "@/components/Experience";
import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen">
      <Navbar sections={SECTIONS} />
      <ScrollProgress />
      <Hero />
      <Highlight />
      <Projects />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Rewrite Navbar.tsx**

Replace `src/components/Navbar.tsx` with:

```tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";

interface Section {
  id: string;
  label: string;
}

interface NavbarProps {
  sections: Section[];
}

export default function Navbar({ sections }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: 0 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="text-white font-black text-lg tracking-tight"
        onClick={() => scrollTo("home")}
        whileHover={{ color: "#f59e0b" }}
        transition={{ duration: 0.2 }}
      >
        aldam<span className="text-amber-400">.</span>me
      </motion.button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`text-sm font-semibold relative transition-colors ${
              activeSection === section.id
                ? "text-amber-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {section.label}
            {activeSection === section.id && (
              <motion.div
                layoutId="navDot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
        <motion.button
          className="bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            window.open(
              "https://wa.me/6285156549426?text=Halo%20Fihris%20Aldama, i want to discuss about my project",
              "_blank"
            )
          }
        >
          Contact Me
        </motion.button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-slate-400 hover:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              menuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/5 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeSection === section.id
                      ? "bg-amber-400/10 text-amber-400"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
```

- [ ] **Step 3: Create placeholder Projects and Contact so page.tsx compiles**

Create `src/components/Projects.tsx`:

```tsx
export default function Projects() {
  return <section id="projects" className="min-h-screen" />;
}
```

Create `src/components/Contact.tsx`:

```tsx
export default function Contact() {
  return <section id="contact" className="min-h-screen" />;
}
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/Navbar.tsx src/components/Projects.tsx src/components/Contact.tsx
git commit -m "feat: rewrite page structure and navbar for dark theme + lenis nav"
```

---

## Task 4: Revamp Hero Section

**Files:**
- Rewrite: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace `src/components/Hero.tsx` with:

```tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 py-24">
        {/* Left: Text */}
        <div className="flex flex-col gap-6 xl:max-w-xl">
          <motion.span
            className="text-cyan-400 text-sm font-semibold tracking-[4px] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Full-Stack Engineer
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl font-black leading-none tracking-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            Hi. I&apos;m{" "}
            <span className="text-amber-400">Aldam.</span>
          </motion.h1>

          <motion.p
            className="text-slate-400 text-base leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Full-Stack Software Engineer specializing in the React ecosystem and
            Node.js backend. I turn complex business requirements into
            high-performance, production-ready solutions.
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open(
                  "https://wa.me/6285156549426?text=Halo%20Fihris%20Aldama, i want to discuss about my project",
                  "_blank"
                )
              }
            >
              Get in touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>

            <motion.a
              href="https://github.com/fihrisaldama015/"
              target="_blank"
              className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:border-amber-400/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-6 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {[
              {
                href: "https://www.instagram.com/muhamadfihris/",
                src: "/img/pngkey.com-instagram-png-775860.png",
                label: "Instagram",
              },
              {
                href: "https://github.com/fihrisaldama015/",
                src: "/img/github.png",
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/fihrisaldama/",
                src: "/img/linkedin.png",
                label: "LinkedIn",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                className="opacity-40 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={social.src}
                  alt={social.label}
                  width={20}
                  className="invert"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-tl-full rounded-tr-full" />
          <Image
            src="/img/foto.png"
            alt="Aldam"
            width={350}
            height={350}
            className="w-[250px] md:w-[320px] relative z-10"
            style={{
              filter: "drop-shadow(0 0 2rem rgba(251, 191, 36, 0.15))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: revamp Hero section with dark theme and amber/cyan accents"
```

---

## Task 5: Revamp Skills/Highlight Section

**Files:**
- Rewrite: `src/components/Highlight.tsx`

- [ ] **Step 1: Rewrite Highlight.tsx**

Replace `src/components/Highlight.tsx` with:

```tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type Skill = { img: string; name: string };

const SKILLS: Skill[] = [
  { img: "/icons/Next.js.svg", name: "Next.js" },
  { img: "/icons/react.svg", name: "React.js" },
  { img: "/icons/tailwind.png", name: "Tailwind CSS" },
  { img: "/icons/typescript.svg", name: "TypeScript" },
  { img: "/icons/express.svg", name: "Express.js" },
  { img: "/icons/node-js.svg", name: "Node.js" },
  { img: "/icons/react.svg", name: "React Native" },
  { img: "/icons/nestjs.svg", name: "NestJS" },
  { img: "/icons/prisma.svg", name: "Prisma" },
  { img: "/icons/rabbitmq.svg", name: "RabbitMQ" },
  { img: "/icons/expo.svg", name: "Expo" },
  { img: "/icons/sqlite.svg", name: "SQLite" },
  { img: "/icons/mysql.svg", name: "MySQL" },
  { img: "/icons/postgresql.svg", name: "PostgreSQL" },
  { img: "/icons/mongodb.svg", name: "MongoDB" },
  { img: "/icons/gcp.svg", name: "Google Cloud Platform" },
  { img: "/icons/firebase.svg", name: "Firebase" },
  { img: "/icons/docker.svg", name: "Docker" },
  { img: "/icons/mqtt.svg", name: "MQTT" },
  { img: "/icons/nginx.svg", name: "Nginx" },
  { img: "/icons/bitbucket.svg", name: "Bitbucket CI/CD" },
  { img: "/icons/gitlab.svg", name: "GitLab" },
  { img: "/icons/github.svg", name: "GitHub" },
  { img: "/icons/figma.svg", name: "Figma" },
];

export default function Highlight() {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[4px] uppercase">
            What I work with
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tight">
            Technical <span className="text-cyan-400">Arsenal</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-16 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center">
            <span className="text-5xl font-black text-amber-400">4+</span>
            <p className="text-slate-400 text-sm mt-2 max-w-[12ch] mx-auto">
              years of experience
            </p>
          </div>
          <div className="text-center">
            <span className="text-5xl font-black text-amber-400">3+</span>
            <p className="text-slate-400 text-sm mt-2 max-w-[12ch] mx-auto">
              projects completed yearly
            </p>
          </div>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                },
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all cursor-default"
            >
              <Image
                src={skill.img}
                width={20}
                height={20}
                className="h-5 w-auto"
                alt={skill.name}
              />
              <span className="text-sm font-semibold text-slate-300">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Highlight.tsx
git commit -m "feat: revamp Skills section with dark theme and staggered pill reveal"
```

---

## Task 6: Build Projects Section

**Files:**
- Rewrite: `src/components/Projects.tsx` (replaces the placeholder from Task 3)

- [ ] **Step 1: Write Projects.tsx**

Replace `src/components/Projects.tsx` with:

```tsx
"use client";
import { motion } from "framer-motion";

type Accent = "amber" | "cyan" | "blue";

const PROJECTS: {
  id: number;
  name: string;
  description: string;
  tech: string[];
  link: string;
  accent: Accent;
}[] = [
  {
    id: 1,
    name: "Axora IoT Platform",
    description:
      "Real-time IoT telemetry pipeline connecting smart restroom devices to a multi-tenant SaaS dashboard. Handles 500K–1M+ records with sub-minute Power BI refresh.",
    tech: ["NestJS", "MQTT", "RabbitMQ", "PostgreSQL", "MongoDB", "Docker"],
    link: "https://github.com/fihrisaldama015",
    accent: "amber",
  },
  {
    id: 2,
    name: "Multi-Tenant POS SaaS",
    description:
      "4 React Native / Expo apps (POS, Owner, Employee, Client) with BLE thermal printing, offline-first SQLite queues, and Zustand state management.",
    tech: ["React Native", "Expo", "SQLite", "Zustand", "React Query", "BLE"],
    link: "https://github.com/fihrisaldama015",
    accent: "cyan",
  },
  {
    id: 3,
    name: "Sekufu.id — Taaruf Platform",
    description:
      "Muslim matchmaking platform with swipe-based profile interaction, gesture face verification on registration, and a structured chat Q&A system.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/fihrisaldama015",
    accent: "blue",
  },
];

const ACCENT_MAP: Record<
  Accent,
  { text: string; border: string; bg: string; tag: string }
> = {
  amber: {
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    tag: "bg-amber-400/10 text-amber-400 border border-amber-400/20",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/5",
    tag: "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    tag: "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto py-20">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-400 text-sm font-semibold tracking-[4px] uppercase">
            Things I&apos;ve built
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tight">
            Selected <span className="text-amber-400">Work</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, i) => {
            const accent = ACCENT_MAP[project.accent];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`border ${accent.border} ${accent.bg} rounded-2xl p-6 md:p-8 group hover:border-opacity-60 transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className={`text-xs font-bold tracking-[3px] uppercase ${accent.text} opacity-60`}
                    >
                      0{project.id}
                    </span>
                    <h3
                      className={`text-xl md:text-2xl font-black text-white mt-1 group-hover:${accent.text} transition-colors`}
                    >
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`text-xs px-3 py-1 rounded-full ${accent.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    className={`self-start border ${accent.border} ${accent.text} px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors flex items-center gap-2 whitespace-nowrap`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View →
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add Projects section with alternating slide-in animations"
```

---

## Task 7: Revamp Experience Section

**Files:**
- Rewrite: `src/components/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx**

Replace `src/components/Experience.tsx` with:

```tsx
"use client";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { useState } from "react";
import { educationAndOrg, workExperiences } from "../data/experience";

const ExperienceTimeline = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const allExperiences = [...workExperiences, ...educationAndOrg].sort(
    (a, b) => {
      const getEndYear = (d: string) => {
        const m = d.match(/\d{4}(?!.*\d{4})/);
        return m ? parseInt(m[0]) : 0;
      };
      return getEndYear(b.duration) - getEndYear(a.duration);
    }
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return <Briefcase size={14} className="text-blue-400" />;
      case "education":
        return <GraduationCap size={14} className="text-blue-400" />;
      case "organization":
        return <Users size={14} className="text-blue-400" />;
      default:
        return <Briefcase size={14} className="text-blue-400" />;
    }
  };

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto py-20">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-[4px] uppercase">
            Where I&apos;ve been
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tight">
            Work <span className="text-blue-400">History</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-blue-400/20 md:-translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {allExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className={`mb-8 flex relative ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Desktop dot */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10 mt-5">
                <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-[#0f172a] shadow-lg shadow-blue-400/30" />
              </div>

              {/* Mobile dot */}
              <div className="md:hidden absolute left-4 -translate-x-1/2 z-10 mt-5">
                <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-[#0f172a]" />
              </div>

              {/* Card */}
              <div
                className={`md:w-[45%] pl-12 md:pl-0 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                }`}
              >
                <div className="bg-white/5 border border-blue-400/10 rounded-xl p-5 hover:border-blue-400/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 bg-blue-400/10 rounded-lg mt-0.5 flex-shrink-0">
                        {getTypeIcon(exp.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm leading-tight">
                          {exp.role}
                        </h3>
                        <div className="flex items-center text-slate-400 text-xs mt-0.5">
                          <Building size={11} className="mr-1" />
                          {exp.company}
                        </div>
                      </div>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="p-1 hover:bg-blue-400/10 rounded-full transition-colors flex-shrink-0"
                      >
                        {expandedIds.includes(exp.id) ? (
                          <ChevronUp size={16} className="text-blue-400" />
                        ) : (
                          <ChevronDown size={16} className="text-blue-400" />
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {exp.duration}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {expandedIds.includes(exp.id) &&
                    exp.responsibilities.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 space-y-1 list-disc list-inside"
                      >
                        {exp.responsibilities.map((r, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="text-xs text-slate-400 ml-2"
                          >
                            {r}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: revamp Experience section with blue accents and timeline draw animation"
```

---

## Task 8: Build Contact Section

**Files:**
- Rewrite: `src/components/Contact.tsx` (replaces the placeholder from Task 3)

- [ ] **Step 1: Write Contact.tsx**

Replace `src/components/Contact.tsx` with:

```tsx
"use client";
import { motion } from "framer-motion";

type Accent = "amber" | "cyan" | "blue";

const LINKS: { label: string; sub: string; href: string; accent: Accent }[] = [
  {
    label: "WhatsApp",
    sub: "Let's talk about your project",
    href: "https://wa.me/6285156549426?text=Halo%20Fihris%20Aldama, i want to discuss about my project",
    accent: "amber",
  },
  {
    label: "GitHub",
    sub: "See my code",
    href: "https://github.com/fihrisaldama015/",
    accent: "cyan",
  },
  {
    label: "LinkedIn",
    sub: "Connect professionally",
    href: "https://www.linkedin.com/in/fihrisaldama/",
    accent: "blue",
  },
];

const ACCENT_MAP: Record<Accent, string> = {
  amber: "border-amber-400/30 text-amber-400 hover:bg-amber-400/10",
  cyan: "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10",
  blue: "border-blue-400/30 text-blue-400 hover:bg-blue-400/10",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 lg:px-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl w-full mx-auto py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-[4px] uppercase">
            Get in touch
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mt-4 tracking-tight leading-none">
            Let&apos;s Work
            <br />
            <span className="text-cyan-400">Together.</span>
          </h2>
          <p className="text-slate-400 text-base mt-6 max-w-md mx-auto leading-relaxed">
            Have a project in mind? I&apos;m available for freelance work and
            full-time opportunities. Let&apos;s build something great.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
        >
          {LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`border rounded-xl px-6 py-4 transition-all ${ACCENT_MAP[link.accent]}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="font-bold text-base">{link.label}</div>
              <div className="text-slate-500 text-xs mt-1">{link.sub}</div>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-slate-600 text-sm mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Aldam · {new Date().getFullYear()} · Full-Stack Engineer
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify final build passes**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with staggered link reveal"
```

---

## Done

All 5 sections are built and the full revamp is complete. Run `npm run dev` and open `http://localhost:3000` to verify:

- [ ] Lenis smooth scroll feels buttery on wheel/trackpad
- [ ] Navbar `aldam.me` logo scrolls to top; each link navigates correctly
- [ ] Amber dot on navbar slides between active sections as you scroll
- [ ] Right-edge scroll progress bar fills amber as you scroll
- [ ] Hero: text and photo animate in on load
- [ ] Skills: pills stagger in when section enters viewport
- [ ] Projects: cards slide in from alternating sides
- [ ] Experience: timeline line draws downward, cards fade in staggered
- [ ] Contact: heading scales in, links stagger up
