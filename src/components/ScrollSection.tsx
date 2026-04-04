"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  id: string;
  index: number;
}

export default function ScrollSection({ children, id, index }: ScrollSectionProps) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000); // Default fallback

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  // Map the exact pixel bounds where this section is covered by the NEXT section
  const startScroll = index * vh;
  const endScroll = (index + 1) * vh;

  const scale = useTransform(scrollY, [startScroll, endScroll], [1, 0.85]);
  const opacity = useTransform(scrollY, [startScroll, endScroll], [1, 0.3]);
  const y = useTransform(scrollY, [startScroll, endScroll], ["0%", "5%"]);

  return (
    <motion.section
      id={id}
      className="sticky top-0 h-screen w-full flex object-cover flex-col justify-center overflow-hidden bg-[#0f172a]"
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="w-full h-full flex flex-col items-center justify-center origin-top relative"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
