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
