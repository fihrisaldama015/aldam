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
