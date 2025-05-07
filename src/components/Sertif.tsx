"use client";
import { motion } from 'framer-motion';
import {
  Award,
  BadgeCheck,
  Calendar,
  ChevronRight,
  ExternalLink,
  Scroll
} from 'lucide-react';
import { useState } from 'react';
import certificates from '../data/sertificate';

const Sertif = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="my-12 sm:my-16 mx-auto max-w-5xl" id="certification">
      <div className="flex flex-col items-center mb-8 sm:mb-10">
        <div className="bg-sky-100 p-3 rounded-full mb-3">
          <Scroll className="text-sky-600" size={24} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">Certificates & Credentials</h2>
        <p className="text-slate-600 mt-2 text-center text-sm sm:text-base max-w-2xl">
          Professional certifications and achievements highlighting my skills and continued learning
        </p>
      </div>

      <motion.div
        className="mx-auto bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="relative overflow-hidden"
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-sky-50 to-white rounded-lg sm:rounded-xl overflow-hidden border border-slate-100 shadow-md transition-all"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.1), 0 8px 10px -6px rgba(14, 165, 233, 0.05)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-28 sm:h-36 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>

                  <motion.img
                    src={cert.img}
                    alt={cert.issuer}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredId === cert.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center z-20">
                    <BadgeCheck size={14} className="text-sky-600 mr-1 sm:mr-2" />
                    <span className="text-xs font-medium text-slate-800 line-clamp-1">{cert.issuer}</span>
                  </div>

                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center z-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center">
                      <Calendar size={12} className="text-sky-600 mr-1" />
                      <span className="text-xs font-medium text-slate-800">{cert.date}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <div className="flex items-start sm:items-center">
                        <Award size={16} className="text-sky-600 mr-1.5 sm:mr-2 mt-0.5 sm:mt-0" />
                        <h3 className="font-bold text-base sm:text-lg text-slate-800 leading-tight">{cert.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section - Now Always Visible */}
                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-medium text-slate-700 text-sm sm:text-base mb-1.5 sm:mb-2">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {cert.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium"
                          variants={skillVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: idx * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.a
                    href={cert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-700 text-sm sm:text-base font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span>View Credential</span>
                    <ExternalLink size={14} className="ml-1.5 sm:ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Sertif;