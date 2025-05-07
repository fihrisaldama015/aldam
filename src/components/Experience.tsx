"use client";
import { motion } from 'framer-motion';
import {
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  Code,
  GraduationCap,
  MapPin,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { educationAndOrg, workExperiences } from '../data/experience';

const ExperienceTimeline = () => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const isExpanded = (id: number) => expandedIds.includes(id);

  const allExperiences = [...workExperiences, ...educationAndOrg].sort((a, b) => {
    const getEndYear = (duration: string) => {
      const match = duration.match(/\d{4}(?!.*\d{4})/);
      return match ? parseInt(match[0]) : 0;
    };

    return getEndYear(b.duration) - getEndYear(a.duration);
  });

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
        duration: 0.5
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="text-sky-600" />;
      case 'education':
        return <GraduationCap className="text-sky-600" />;
      case 'organization':
        return <Users className="text-sky-600" />;
      default:
        return <Briefcase className="text-sky-600" />;
    }
  };

  return (
    <div className="my-12 w-full max-w-5xl mx-auto py-16" id="projects">
      <div className="flex flex-col items-center mb-8 sm:mb-10">
        <span className="bg-sky-100 p-3 rounded-full mb-3">
          <Briefcase className="text-sky-600" size={24} />
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">
          Professional Experience & Organization
        </h2>
        <p className="text-slate-600 mt-2 text-center text-sm sm:text-base max-w-2xl">
          My journey as a software engineer, showcasing professional growth and diverse project experiences.
        </p>
      </div>

      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Timeline line - visible only on larger screens */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sky-100 rounded-full"></div>

        {/* Timeline line - visible only on mobile */}
        <div className="md:hidden absolute left-8 h-full w-1 bg-sky-100 rounded-full"></div>

        {allExperiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className={`mb-12 flex relative
                ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* Timeline dot for desktop - positioned in center */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-6 h-6 rounded-full bg-sky-600 border-4 border-sky-100 z-10 shadow-lg" />
              <span className={`text-xl w-max text-sky-600/30 font-bold absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-16' : 'left-16'}`}>
                {exp.duration.split(" - ")[0]}
              </span>
            </div>

            {/* Timeline dot for mobile - positioned on left */}
            <div className="md:hidden absolute left-8 transform -translate-x-1/2 z-10">
              <div className="w-6 h-6 rounded-full bg-sky-600 border-4 border-sky-100 z-10 shadow-lg" />
            </div>

            {/* Content - desktop: alternating sides, mobile: always right side */}
            <motion.div
              className={`md:w-1/2 pl-16 md:pl-0
                  ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start">
                    <div className="p-2 bg-sky-100 rounded-lg mr-3">
                      {getTypeIcon(exp.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                      <div className="flex items-center text-slate-600">
                        <Building size={16} className="mr-1" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="p-1 hover:bg-sky-100 rounded-full transition-colors"
                  >
                    {isExpanded(exp.id) ?
                      <ChevronUp size={20} className="text-sky-600" /> :
                      <ChevronDown size={20} className="text-sky-600" />
                    }
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-500 mb-3">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="hidden sm:block text-sky-400">•</div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-slate-600 mb-3">{exp.description}</p>
                )}

                {isExpanded(exp.id) && exp.responsibilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center">
                      <Code size={16} className="mr-2 text-sky-600" />
                      Key Contributions
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {exp.responsibilities.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="ml-4"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {exp.responsibilities.length > 0 && (
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="mt-3 text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center transition-colors"
                  >
                    {isExpanded(exp.id) ? 'Show less' : 'Show more'}
                    {isExpanded(exp.id) ?
                      <ChevronUp size={16} className="ml-1" /> :
                      <ChevronDown size={16} className="ml-1" />
                    }
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline;