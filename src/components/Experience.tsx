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
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "./LenisProvider";
import { educationAndOrg, workExperiences } from "../data/experience";

const ExperienceTimeline = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globalLenis = useLenis();

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Section pins at index 3 × viewport height
    const SECTION_INDEX = 3;

    // Create an internal Lenis instance for smooth scrolling within this section
    const innerLenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      autoRaf: true,
    });

    const wrapper = wrapperRef.current;

    const handleWheel = (e: WheelEvent) => {
      const sectionPinY = SECTION_INDEX * window.innerHeight;

      // Use global Lenis animated scroll position (visual position the user sees)
      // This lags behind window.scrollY during momentum, so gate fires at the
      // exact visual moment the section becomes fully pinned.
      const visualScrollY = globalLenis?.scroll ?? window.scrollY;
      const isPinned = visualScrollY >= sectionPinY - 8;

      // PHASE 1: section not yet fully visible — let global Lenis page-scroll continue
      if (!isPinned) return;

      // PHASE 2: pinned, internal at top, scrolling up → hand back to page
      if (e.deltaY < 0 && wrapper.scrollTop <= 0) return;

      // PHASE 3: pinned, internal at bottom, scrolling down → hand back to page
      if (e.deltaY > 0 && wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 2) return;

      // PHASE 4: pinned + internal has room → capture the wheel event
      e.stopPropagation();
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      innerLenis.destroy();
      wrapper.removeEventListener("wheel", handleWheel);
    };
  }, [globalLenis]);

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
    <div 
      ref={wrapperRef}
      className="w-full h-full flex flex-col pt-24 items-center px-6 lg:px-16 relative overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      <div ref={contentRef} className="w-full max-w-4xl mx-auto py-20 relative">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
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
    </div>
  );
};

export default ExperienceTimeline;