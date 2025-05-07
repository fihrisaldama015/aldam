import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  sections: any;
  scrollToSection: any;
}

function Navbar({ sections, scrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Determine which section is currently in view
      const sectionInView = determineActiveSection();
      if (sectionInView && sectionInView !== activeSection) {
        setActiveSection(sectionInView);
      }
    };
    
    // Helper function to determine which section is in view
    const determineActiveSection = () => {
      for (const section of sections) {
        if (!section.ref.current) continue;
        
        const rect = section.ref.current.getBoundingClientRect();
        // If the top of the section is near the top of the viewport
        if (rect.top <= 100 && rect.bottom > 100) {
          return section.id;
        }
      }
      return activeSection;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection]);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      color: "#0284c7",
      transition: { duration: 0.3 }
    }
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.4, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`py-4 sm:px-6 px-4 rounded-xl flex flex-col md:flex-row justify-between items-center backdrop-blur-sm ${scrolled ? "shadow-md bg-white/80" : "bg-transparent"} transition-all duration-300 sticky top-3 z-10`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="w-full md:w-auto flex justify-between items-center">
        <div className="relative flex gap-4 items-center">
          <motion.div 
            className="absolute -right-8 -bottom-[150px] bg-sky-600/30 w-[180px] h-[180px] rounded-full blur-3xl"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
          
          <motion.div 
            className="absolute left-4 -bottom-[100px] bg-indigo-500/20 w-[120px] h-[120px] rounded-full blur-2xl"
            variants={glowVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1.5 }}
          />
          
          <motion.h1 
            className="font-semibold text-lg text-[#1e293b] relative z-10"
            variants={logoVariants}
            whileHover="hover"
            onClick={() => scrollToSection(sections[0].ref)}
          >
            fihrisaldama.com
          </motion.h1>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="block md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </motion.button>
      </div>

      {/* Navigation for desktop */}
      <div className="hidden md:flex relative">
        <motion.div 
          className="flex gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {sections.map((section : any, index : any) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.ref)}
              className={`text-gray-700 font-medium cursor-pointer text-sm relative ${activeSection === section.id ? "text-sky-600" : "hover:text-sky-600"}`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-sky-600"
                  layoutId="activeSection"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
          
          <motion.button
            className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={ () => window.open("https://wa.me/6285156549426?text=Halo%20Fihris%20Aldama, i want to discuss about my project", "_blank")}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="w-full md:hidden mt-4"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div className="flex flex-col gap-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              {sections.map((section : any, index : any) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(section.ref);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-left text-gray-700 font-medium ${activeSection === section.id ? "bg-sky-100 text-sky-600" : "hover:bg-gray-100"}`}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  {section.label}
                </motion.button>
              ))}
              <motion.button
                className="mx-4 my-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;