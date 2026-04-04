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
