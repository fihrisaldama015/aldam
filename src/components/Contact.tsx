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
