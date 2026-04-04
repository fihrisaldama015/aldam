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
