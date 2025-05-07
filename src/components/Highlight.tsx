"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

function Highlight() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };
  const getSkillHoverAnimation = (id: number) => ({
    scale: hoveredSkill === id ? 1.05 : 1,
    y: hoveredSkill === id ? -3 : 0,
    boxShadow: hoveredSkill === id
      ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
  });
  return (
    <div className="mt-8 mx-auto py-6 w-full flex flex-col items-center" id="skills">
      <div className="flex flex-row gap-16 justify-center">
        <div className="px-8 text-center">
          <span className="font-bold text-4xl text-sky-600">4+</span>
          <p className="mt-4 max-w-[15ch] text-slate-600 text-sm">
            years of experience
          </p>
        </div>
        <div className="px-8 text-center">
          <span className="font-bold text-4xl text-sky-600">3+</span>
          <p className="mt-4 max-w-[15ch] text-slate-600 text-sm">
            projects completed yearly
          </p>
        </div>
      </div>
      <motion.div
        className="my-16 flex flex-col items-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex gap-2 text-2xl font-bold text-slate-800 items-center bg-sky-50 px-6 py-3 rounded-full shadow-sm"
          variants={titleVariants}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
          >
            <Image src={"/icons/code.svg"} width={24} height={24} alt="code" />
          </motion.div>
          <span>Technical Skills</span>
        </motion.div>

        <motion.div
          className="p-8 mt-8 flex gap-4 justify-center flex-wrap max-w-4xl"
          variants={titleVariants}
        >
          {SKILLS.map((skill, id) => (
            <motion.div
              key={id}
              className="sm:py-3 py-2 sm:px-6 px-4 rounded-full shadow-md bg-white flex gap-3 items-center transition-all cursor-pointer border border-transparent hover:border-sky-100"
              variants={skillVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              animate={getSkillHoverAnimation(id)}
              onHoverStart={() => setHoveredSkill(id)}
              onHoverEnd={() => setHoveredSkill(null)}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={skill.img}
                  width={100}
                  height={100}
                  className="h-8 w-auto"
                  alt={skill.name}
                />
              </motion.div>
              <span className="sm:text-base text-sm font-semibold text-slate-700">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Background decoration elements */}
        <div className="absolute -z-10 opacity-5 hidden md:block">
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-sky-300 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-300 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Highlight;

type Skill = {
  img: string;
  name: string;
};

const SKILLS: Skill[] = [

  {
    img: "/icons/Next.js.svg",
    name: "Next.js",
  },
  {
    img: "/icons/react.svg",
    name: "React.js",
  },
  {
    img: "/icons/tailwind.png",
    name: "Tailwind CSS",
  },
  {
    img: "/icons/typescript.svg",
    name: "TypeScript",
  },
  {
    img: "/icons/express.svg",
    name: "Express.js",
  },
  {
    img: "/icons/node-js.svg",
    name: "Node.js",
  },
  {
    img: "/icons/react.svg",
    name: "React Native"
  },
  {
    img: "/icons/php.svg",
    name: "PHP"
  },
  {
    img: "/icons/laravel.svg",
    name: "Laravel"
  },
  {
    img: "/icons/mysql.svg",
    name: "MySQL",
  },
  {
    img: "/icons/postgresql.svg",
    name: "PostgreSQL"
  },
  {
    img: "/icons/mongodb.svg",
    name: "MongoDB",
  },
  {
    img: "/icons/gcp.svg",
    name: "Google Cloud Platform",
  },
  {
    img: "/icons/firebase.svg",
    name: "Firebase",
  },
  {
    img: "/icons/docker.svg",
    name: "Docker",
  },
  {
    img: "/icons/gitlab.svg",
    name: "GitLab",
  },
  {
    img: "/icons/github.svg",
    name: "GitHub",
  },
  {
    img: "/icons/WordPress.com.svg",
    name: "WordPress",
  },
  {
    img: "/icons/figma.svg",
    name: "Figma",
  },
];
