"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const photoContainerVariants: Variants = {
    hover: {
      scale: 1.05,
      background: "linear-gradient(to bottom, rgba(14, 116, 144, 0.6), rgba(55, 65, 81, 0.1))",
      transition: { duration: 0.3 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const socialItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 0.5, x: 0 },
    hover: { opacity: 1, scale: 1.2 },
  };

  const waveAnimation: Variants = {
    initial: { rotate: -10 },
    animate: {
      rotate: [0, 14, 0, 14, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        repeatDelay: 1,
      },
    },
  };

  const [gradientClass, setGradientClass] = useState("bg-gradient-to-b from-[rgba(14,116,144,0.4)] to-transparent");

  return (
    <motion.div
      className="min-h-[60vh] mt-12 mb-36 px-12 flex xl:flex-row flex-col justify-around items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="about"
    >
      <motion.div className="flex flex-col gap-8" variants={containerVariants}>
        <motion.div className="flex items-center" variants={itemVariants}>
          <h1 className="text-6xl md:text-7xl font-light tracking-tight">
            Hi, I'm{" "}
            <motion.span
              className="font-bold text-sky-600"
              whileHover={{
                color: "#0284c7",
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              Aldam
            </motion.span>
          </h1>
          <motion.div
            className="ml-3 text-4xl md:text-5xl origin-bottom"
            variants={waveAnimation}
            initial="initial"
            animate="animate"
          >
            👋
          </motion.div>
        </motion.div>

        <motion.p
          className="text-slate-700 tracking-wide max-w-md text-sm leading-relaxed"
          variants={itemVariants}
        >
          Informatics Undergraduate at UPN "Veteran" Jawa Timur | Passionate in Software Engineering. Motivated and fast-learning informatics
          student with a strong interest in software engineering. Skilled in building scalable front-end applications and robust back-end APIs.
          Experienced in team collaboration, project coordination, and effective communication. Proven ability to adapt quickly, perform under
          pressure, and deliver high-quality results through academic projects, internships, and freelance work.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05, backgroundColor: "#0284c7" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://wa.me/6285156549426?text=Halo%20Fihris%20Aldama, i want to discuss about my project", "_blank")}
          >
            <span>Get in touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-12 xl:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
       <motion.div 
          className={`elemenFoto relative rounded-tl-full rounded-tr-full translate-y-8 p-6 ${gradientClass}`}
          variants={photoContainerVariants}
          whileHover="hover"
          onHoverStart={() => {
            setIsHovered(true);
            setGradientClass("bg-gradient-to-b from-[rgba(14,116,144,0.6)] to-[rgba(55,65,81,0.1)]");
          }}
          onHoverEnd={() => {
            setIsHovered(false);
            setGradientClass("bg-gradient-to-b from-[rgba(14,116,144,0.4)] to-transparent");
          }}
        >
          <motion.div
            className="social absolute w-full sm:w-fit flex sm:flex-col flex-row gap-4 [&>a]:p-3 items-center justify-center sm:top-0 bottom-0 sm:bottom-0 sm:-left-[100px] left-0"
            variants={socialVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              href="https://www.instagram.com/muhamadfihris/"
              target="_blank"
              whileHover="hover"
              variants={socialItemVariants}
            >
              <img
                src="/img/pngkey.com-instagram-png-775860.png"
                alt="Instagram"
                width="24"
              />
            </motion.a>
            <motion.a
              href="https://github.com/fihrisaldama015/"
              target="_blank"
              whileHover="hover"
              variants={socialItemVariants}
            >
              <img src="/img/github.png" alt="GitHub" width="24" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/fihrisaldama/"
              target="_blank"
              whileHover="hover"
              variants={socialItemVariants}
            >
              <img src="/img/linkedin.png" alt="LinkedIn" width="24" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ y: 0 }}
            animate={isHovered ? { y: -8 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/img/foto.png"
              alt="profile-pic"
              width={1000}
              height={1000}
              className="hero-picture w-[300px] md:w-[350px] -translate-y-16"
              style={{
                filter: "drop-shadow(0 0 1rem rgba(0, 0, 0, 0.25))",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div className="info relative flex flex-col justify-center items-center">
          <motion.div
            className="red absolute -right-[100px] -top-[100px] bg-[#fca5a580] w-[150px] h-[150px] rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="blue absolute -left-[80px] -bottom-[60px] bg-[#a5c4fc80] w-[120px] h-[120px] rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;