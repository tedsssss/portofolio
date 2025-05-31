// app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaInstagram, FaLock, FaDotCircle } from "react-icons/fa";
import { useLanguage } from "../context/LangContext"; // Assuming layout.tsx exports useLanguage
import { EducationItem, ExperienceItem, SkillItem, ProjectItem } from "../lib/translations"; // Import interfaces
import Blobs from '@/components/Blobs';


// Animation Variants (remain the same as they are style-based)
const sectionTitleVariants = {
  hidden: { opacity: 0, y: -40, skewY: 5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 } },
};

const portfolioCardHoverVariants = {
  rest: { scale: 1, y: 0, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)" },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0px 20px 25px -5px rgba(0, 240, 255, 0.2), 0px 10px 10px -5px rgba(0, 240, 255, 0.1)" // Enhanced hover shadow
  }
};

const resumeCardItemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.7, delay: i * 0.25, ease: [0.25, 1, 0.5, 1] }
  }),
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.8, rotate: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      delay: i * 0.1,
    },
  }),
  hover: {
    scale: 1.1,
    rotate: 2,
    boxShadow: "0px 15px 30px rgba(0, 240, 255, 0.3)", // Enhanced hover shadow
    transition: { type: "spring", stiffness: 300, damping: 10 }
  }
};


// SkillLevelIndicator Component
const SkillLevelIndicator = ({ levelName, currentSkillLevels }: { levelName: string, currentSkillLevels: { basic: string, intermediate: string, expert: string } }) => {
  const totalDots = 3;
  let activeDots = 0;
  if (levelName === currentSkillLevels.basic) activeDots = 1;
  else if (levelName === currentSkillLevels.intermediate) activeDots = 2;
  else if (levelName === currentSkillLevels.expert) activeDots = 3;

  return (
    <div className="flex space-x-1.5 my-2">
      {[...Array(totalDots)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${i < activeDots
              ? 'bg-brand-teal'
              : 'bg-gray-500 opacity-50' // Adjusted for better visibility on glass
            }`}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.15 + 0.6 } }}
          viewport={{ once: true, amount: 0.8 }}
        />
      ))}
    </div>
  );
};


export default function HomePage() {
  const { language, currentTranslations } = useLanguage();
  const [contactMessage, setContactMessage] = useState("");

  // Hero Section Animation Variants
  const heroTextContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const heroItemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "circOut", delay: 0.2 } },
  };
  
  const heroImageVariants = {
    initial: { opacity: 0, scale: 0.6, rotateY: 90 }, 
    animate: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 } }, 
    hover: { scale: 1.05, y: -10, transition: { type: "spring", stiffness: 250, damping: 15 } } 
  };

  const flipCardContainerVariants = { 
    rest: {}, 
    hover: {}  
  };

  const frontCardFlipVariant = {
    rest: { 
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
      zIndex: 2,
    },
    hover: { 
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" },
      zIndex: 1,
    }
  };

  const backCardFlipVariant = {
    rest: { 
      rotateY: -180,
      transition: { duration: 0.6, ease: "easeInOut" },
      zIndex: 1,
    },
    hover: { 
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
      zIndex: 2,
    }
  };
  
  const heroButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.8 + i * 0.1 } }),
    hover: { scale: 1.05, boxShadow: "0px 0px 25px rgba(0, 240, 255, 0.7)" },
    tap: { scale: 0.95 }
  };

  // Data from translations
  const aboutMeText = currentTranslations.heroAboutMe;
  const educationData: EducationItem[] = currentTranslations.educationData;
  const experienceData: ExperienceItem[] = currentTranslations.experienceData;
  const skillsData: SkillItem[] = currentTranslations.skillsData;
  const projectsData: ProjectItem[] = currentTranslations.projectsData;

  // Base classes for glassmorphism sections - ADJUSTED PADDING AND MARGIN
  const glassSectionClasses = "bg-slate-800/50 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-3xl p-6 md:p-10 lg:p-12 my-8 md:my-12";
  // Base classes for glassmorphism cards
  const glassCardClasses = "bg-slate-700/40 backdrop-blur-lg border border-slate-600/50 shadow-xl rounded-2xl";


  return (
    // Outermost div with page padding. The actual page background can be set on <body> or a wrapper if needed.
    // For this example, sections will create their own "glass" layers over the default dark background.
    <div className="overflow-x-hidden antialiased px-4 sm:px-6 lg:px-8 bg-brand-dark"> {/* Added bg-brand-dark as base */}
      <AnimatePresence>
        {contactMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 bg-brand-teal text-brand-dark p-4 rounded-lg shadow-lg z-[100]"
          >
            {contactMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO SECTION ===== */}
      {/* Hero section uses negative margins to make its background (with Blobs) appear full-width */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center pt-24 md:pt-20 relative overflow-hidden 
                   -mx-4 sm:-mx-6 lg:-mx-8  /* Counteract parent padding for full-width effect */
                   bg-brand-dark/80 backdrop-blur-2xl border-b border-slate-700/50 /* Glass effect for hero bg */
                   "
      >
        <Blobs /> {/* Blobs should be behind the glass layer of the section */}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-center text-center gap-x-16 gap-y-10 z-10">
          {/* TEKS */}
          <motion.div
            className="md:w-7/12 flex flex-col justify-center text-left"
            variants={heroTextContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={heroItemVariants} className="text-brand-teal text-lg font-semibold tracking-wider uppercase mb-2">
              {currentTranslations.heroGreeting}
            </motion.h2>
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } }}
            >
              <Image
                src="/logo/Logo teds.png"
                alt={currentTranslations.heroNameAlt}
                width={480}
                height={96}
                priority
                className="drop-shadow-[0_2px_10px_rgba(0,240,255,0.3)]"
              />
            </motion.div>
            <motion.h2 variants={heroItemVariants} className="text-2xl md:text-3xl text-bold text-gray-200 mb-8"> {/* Adjusted text color for better contrast on glass */}
              {currentTranslations.heroSubtitle}
            </motion.h2>
            <motion.p variants={heroItemVariants} className="text-gray-300 text-justify mx-auto mb-6"> {/* Adjusted text color */}
              {aboutMeText}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <motion.a
                href="https://drive.google.com/file/d/1e6AGh2AhrgTG1F3z0MvplkqXK1EYf-gx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                variants={heroButtonVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  className="w-full sm:w-auto bg-brand-teal text-brand-dark px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-lg border-2 border-transparent hover:border-brand-teal" // Increased rounding
                >
                  {currentTranslations.heroButtonResume}
                </button>
              </motion.a>
              <motion.a
                href="#contact"
                variants={heroButtonVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <button
                  className="w-full sm:w-auto border-2 border-brand-teal text-brand-teal px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-lg hover:bg-brand-teal/20" // Increased rounding and hover effect
                >
                  {currentTranslations.heroButtonContact}
                </button>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* FOTO PROFIL - FLIP EFFECT */}
          <motion.div
            className="md:w-3/12 mb-12 md:mb-0" 
            variants={heroImageVariants}      
            initial="initial"
            animate="animate"
            whileHover="hover"                 
          >
            <motion.div 
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto relative cursor-pointer"
              style={{ perspective: '1200px' }} // Increased perspective for smoother flip
              variants={flipCardContainerVariants} 
              initial="rest"                     
              whileHover="hover"                 
            >
              {/* Front Side */}
              <motion.div
                className="absolute w-full h-full"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }} 
                variants={frontCardFlipVariant} 
              >
                <div className="w-full h-full bg-gradient-to-br from-brand-teal to-teal-700 rounded-full flex items-center justify-center p-2 sm:p-3 relative shadow-xl"> {/* Added padding and shadow */}
                  <div className="absolute inset-0 rounded-full bg-brand-teal opacity-30 filter blur-2xl animate-pulse-slow"></div> {/* Adjusted blur */}
                  <div className="w-full h-full bg-brand-dark rounded-full relative overflow-hidden z-10 border-2 border-teal-500/50"> {/* Added subtle border */}
                    <Image
                      src="/logo/pic.jpg" 
                      alt={language === 'id' ? "Foto profil Teds (Depan)" : "Teds profile picture (Front)"}
                      fill
                      className="object-cover rounded-full"
                      sizes="(min-width: 768px) 20rem, (min-width: 640px) 18rem, 16rem"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/320x320/1a202c/00f0ff?text=Teds')}
                      priority 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Back Side */}
              <motion.div
                className="absolute w-full h-full"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }} 
                variants={backCardFlipVariant} 
              >
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center p-2 sm:p-3 relative shadow-xl"> {/* Added padding and shadow */}
                <div className="w-full h-full bg-brand-dark rounded-full relative overflow-hidden z-10 border-2 border-teal-500/50"> {/* Added subtle border */}
                  <Image
                      src="/logo/pic.jpg" 
                      alt={language === 'id' ? "Foto profil Teds (Belakang)" : "Teds profile picture (Back)"}
                      fill
                      className="object-cover rounded-full"
                      sizes="(min-width: 768px) 20rem, (min-width: 640px) 18rem, 16rem"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/320x320/3A006F/FFFFFF?text=Back')} 
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ME / RESUME SECTION ===== */}
      <section id="resume" className={`${glassSectionClasses}`}>
        <div className="container mx-auto"> {/* Container for content width, section has padding now */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-teal" // Increased bottom margin
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.aboutTitle}
            <motion.span
              className="block w-32 h-1 bg-brand-teal rounded-full mx-auto mt-3" // Increased top margin
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          {/* Education Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.2 }}
            className="mb-16 md:mb-20" // Increased bottom margin
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-100 border-b-2 border-brand-teal/70 pb-4 text-center md:text-left">{currentTranslations.educationTitle}</h3>
            {educationData.map((edu, index) => (
              <motion.div
                key={`edu-${index}`}
                variants={resumeCardItemVariants}
                custom={index}
                className={`${glassCardClasses} p-6 md:p-8 mb-10 hover:shadow-brand-teal/30 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center overflow-hidden`}
              >
                <div className="w-full"> {/* Removed extra px from here, card has padding */}
                  <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/70 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-md border-2 border-brand-teal/50 relative overflow-hidden p-1" // Added padding for logo
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.1 } }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={edu.logoUrl || '/logos/default-logo.png'}
                        alt={`${edu.institution} logo`}
                        fill
                        className="object-contain" // Removed p-2, parent has padding now
                        sizes="80px"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/1a202c/00f0ff?text=Logo')}
                      />
                    </motion.div>
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-teal mb-1">{edu.degree}</h4>
                      <p className="text-gray-200 font-medium text-md sm:text-lg mb-1">{edu.institution}
                        <span className="text-xs ml-2 text-gray-400 bg-slate-800/80 px-2.5 py-1 rounded-full align-middle">{edu.year}</span> {/* Adjusted badge style */}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">{edu.description}</p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-600/60"> {/* Adjusted border color */}
                        <h5 className="text-sm sm:text-md font-semibold text-gray-100 mb-2">{language === 'id' ? 'Poin Penting:' : 'Key Highlights:'}</h5>
                      <ul className="space-y-1.5">
                        {edu.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            className="flex items-start text-xs sm:text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0, transition: { delay: (index * 0.1) + (hIndex * 0.05) + 0.3 } }}
                            viewport={{ once: true }}
                          >
                            <FaDotCircle className="text-brand-teal mr-2.5 mt-1 flex-shrink-0 text-xs" /> {/* Adjusted margin */}
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-100 border-b-2 border-brand-teal/70 pb-4 text-center md:text-left">{currentTranslations.experienceTitle}</h3>
            {experienceData.map((exp, index) => (
              <motion.div
                key={`exp-${index}`}
                variants={resumeCardItemVariants}
                custom={index}
                className={`${glassCardClasses} p-6 md:p-8 mb-10 hover:shadow-brand-teal/30 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center overflow-hidden`}
              >
                <div className="w-full">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/70 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-md border-2 border-brand-teal/50 relative overflow-hidden p-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.1 } }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={exp.logoUrl || '/logos/default-logo.png'}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain rounded-full" // Logo is already rounded, parent provides padding
                        sizes="80px"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/1a202c/00f0ff?text=Logo')}
                      />
                    </motion.div>
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-teal mb-1">{exp.role}</h4>
                      <p className="text-gray-200 font-medium text-md sm:text-lg mb-1">{exp.company}
                        <span className="text-xs ml-2 text-gray-400 bg-slate-800/80 px-2.5 py-1 rounded-full align-middle">{exp.year}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-600/60">
                      <h5 className="text-sm sm:text-md font-semibold text-gray-100 mb-2">{language === 'id' ? 'Poin Penting:' : 'Key Highlights:'}</h5>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            className="flex items-start text-xs sm:text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0, transition: { delay: (index * 0.1) + (hIndex * 0.05) + 0.3 } }}
                            viewport={{ once: true }}
                          >
                            <FaDotCircle className="text-brand-teal mr-2.5 mt-1 flex-shrink-0 text-xs" />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className={`${glassSectionClasses}`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-brand-teal"
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.skillsTitle}
            <motion.span
              className="block w-24 h-1 bg-brand-teal rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 md:mt-16"> {/* Adjusted gap and responsive columns */}
            {skillsData.map((skill, index) => (
              <motion.div
                key={index}
                className={`${glassCardClasses} p-6 flex flex-col items-center text-center`}
                variants={skillCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                custom={index}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-brand-teal text-5xl mb-5"> {/* Increased icon size and margin */}
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{skill.name}</h3>
                <SkillLevelIndicator levelName={skill.levelName} currentSkillLevels={currentTranslations.skillLevels} />
                <p className="text-xs text-gray-400 mt-1">({skill.levelName})</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION (GRID) ===== */}
      <section id="portfolio" className={`${glassSectionClasses}`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-brand-teal"
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.portfolioTitle}
            <motion.span
              className="block w-32 h-1 bg-brand-teal rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className={`${glassCardClasses} overflow-hidden flex flex-col group`} // glassCardClasses already has rounding and shadow
                variants={portfolioCardHoverVariants}
                initial="rest" 
                animate={{opacity:0, y:50, filter:"blur(5px)"}} 
                whileHover="hover"
                whileInView={{ opacity: 1, y: 0, filter:"blur(0px)", transition: { duration: 0.6, delay: index * 0.15, ease: "circOut" } }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* ADJUSTED: Image container height */}
                <div className="w-full h-64 md:h-72 lg:h-80 relative overflow-hidden"> 
                  <Image
                    src={project.imageUrl || 'https://placehold.co/600x400/0d1a2e/00f0ff?text=Project+Image'}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                    sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                    onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/0d1a2e/00f0ff?text=${encodeURIComponent(project.title)}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div> {/* Darker gradient */}
                </div>

                {/* ADJUSTED: Padding for text content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-teal mb-3 group-hover:text-teal-300 transition-colors"> {/* Adjusted font size */}
                    {project.title}
                  </h3>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4"> {/* Adjusted gap and margin */}
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-brand-teal/25 text-brand-teal px-3 py-1 rounded-full"> {/* Adjusted font size and padding */}
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow"> {/* Adjusted font size and margin */}
                    {project.description}
                  </p>
                  {project.link === "#" ? (
                    <button
                      disabled
                      className="inline-flex items-center self-start mt-auto bg-slate-600 text-gray-400 px-5 py-2.5 rounded-lg font-semibold cursor-not-allowed text-sm" // Adjusted padding and font size
                    >
                      <FaLock className="w-3.5 h-3.5 mr-2" /> {/* Adjusted icon size */}
                      {currentTranslations.projectAccessLocked}
                    </button>
                  ) : (
                    <Link href={project.link} legacyBehavior>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block self-start mt-auto bg-brand-teal text-brand-dark px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-teal/30 text-sm" // Adjusted padding and font size
                      >
                        {currentTranslations.projectSeeDetails}
                      </a>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className={`${glassSectionClasses}`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 text-brand-teal" // Increased margin
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.contactTitle}
            <motion.span
              className="block w-32 h-1 bg-brand-teal rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          <div className="max-w-3xl mx-auto text-center">
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-gray-100 mb-5" // Increased margin
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentTranslations.contactSubtitle}
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg mb-10" // Increased margin
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {currentTranslations.contactPrompt}
            </motion.p>

            <motion.div
              className="flex justify-center gap-10 mt-8" // Increased gap
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Email */}
              <motion.a
                href="mailto:theodorekasyfillah06@gmail.com"
                whileHover={{ scale: 1.2, color: "#00F0FF" }} // Hover color to brand-teal
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-400 text-4xl transition-colors duration-300" // Increased size
                aria-label="Email Theodore Kasyfillah"
              >
                <FaEnvelope />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/theodore-kasyfillah-0ba985247/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-400 text-4xl transition-colors duration-300"
                aria-label="Theodore Kasyfillah LinkedIn Profile"
              >
                <FaLinkedin />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/tedikasyfillah"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#00F0FF" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-400 text-4xl transition-colors duration-300"
                aria-label="Theodore Kasyfillah Instagram Profile"
              >
                <FaInstagram />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
