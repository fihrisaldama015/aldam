"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";

interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  index: number;
  /** Pass true for sections that manage their own scroll-chaining (e.g. Experience) */
  noDwell?: boolean;
}

const DWELL_THRESHOLD = 500; // total wheel deltaY needed to leave the section

/** True once the user has scrolled to this section (fires once, never resets) */
const SectionActiveContext = createContext(false);

export function useSectionActive() {
  return useContext(SectionActiveContext);
}

export default function ScrollSection({
  children,
  id,
  index,
  noDwell = false,
}: ScrollSectionProps) {
  const { scrollY } = useScroll();
  const globalLenis = useLenis();
  const [vh, setVh] = useState(1000);
  const [isActive, setIsActive] = useState(index === 0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  // Mark section as active once scroll reaches it (fires once, never resets)
  useEffect(() => {
    if (index === 0) return; // hero is active by default
    const threshold = index * vh * 0.9; // activate just before section is fully pinned
    return scrollY.on("change", (v) => {
      if (v >= threshold) setIsActive(true);
    });
  }, [scrollY, index, vh]);

  // Scale/fade this section as the NEXT one slides over it
  const startScroll = index * vh;
  const endScroll = (index + 1) * vh;
  const scale = useTransform(scrollY, [startScroll, endScroll], [1, 0.85]);
  const opacity = useTransform(scrollY, [startScroll, endScroll], [1, 0.3]);
  const y = useTransform(scrollY, [startScroll, endScroll], ["0%", "5%"]);

  // Dwell logic: freeze the page when this section is fully pinned
  useEffect(() => {
    if (noDwell || !globalLenis) return;

    // Touch devices have native momentum — dwell would permanently freeze scroll
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const PIN_Y = index * window.innerHeight;

    // Hero (index=0) starts already "at" its pin point, so engage from the start
    let engaged = index === 0;
    let dwellAccumulator = 0;
    let prevScroll = globalLenis.scroll ?? 0;

    if (engaged) {
      globalLenis.stop();
    }

    // Detect when global scroll crosses this section's pin point in either direction
    const unsubscribe = globalLenis.on(
      "scroll",
      ({ scroll }: { scroll: number }) => {
        if (!engaged) {
          const crossedDown = prevScroll < PIN_Y && scroll >= PIN_Y;
          const crossedUp = prevScroll > PIN_Y && scroll <= PIN_Y;

          if (crossedDown || crossedUp) {
            engaged = true;
            dwellAccumulator = 0;
            globalLenis.stop();
          }
        }
        prevScroll = scroll;
      }
    );

    // Count wheel delta silently; release only after DWELL_THRESHOLD is met
    const handleWheel = (e: WheelEvent) => {
      if (!engaged) return;
      dwellAccumulator += Math.abs(e.deltaY);
      if (dwellAccumulator >= DWELL_THRESHOLD) {
        engaged = false;
        dwellAccumulator = 0;
        globalLenis.start();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("wheel", handleWheel);
      if (engaged) globalLenis.start();
    };
  }, [globalLenis, index, noDwell]);

  return (
    <SectionActiveContext.Provider value={isActive}>
      <motion.section
        id={id}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#0f172a]"
      >
        <motion.div
          style={{ scale, opacity, y }}
          className="w-full h-full flex flex-col items-center justify-center origin-top relative"
        >
          {children}
        </motion.div>
      </motion.section>
    </SectionActiveContext.Provider>
  );
}
