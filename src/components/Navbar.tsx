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

      // Calculate active section based on scroll position accurately for sticky 100vh elements
      if (typeof window !== "undefined") {
        const index = Math.round(window.scrollY / window.innerHeight);
        if (sections[index]) {
          setActiveSection(sections[index].id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const sectionIndex = sections.findIndex((section) => section.id === id);
    const targetY = sectionIndex >= 0 ? sectionIndex * window.innerHeight : 0;
    window.dispatchEvent(new Event("portfolio:navigation-start"));

    if (lenis) {
      lenis.start();
      lenis.scrollTo(targetY, { force: true });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[999] pointer-events-auto px-6 py-4 flex justify-between items-center transition-all duration-300 ${
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
              "_blank",
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
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
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
