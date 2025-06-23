// app/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../context/LangContext";
import { EducationItem, ExperienceItem, SkillItem, ProjectItem } from "../lib/translations";
import Blobs from '@/components/Blobs';

// SVG Icons
const FaLinkedin: React.FC = () => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.2 53.79 54.3.01 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>);
const FaEnvelope: React.FC = () => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>);
const FaInstagram: React.FC = () => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"></path></svg>);

export default function HomePage() {
  const { language, currentTranslations } = useLanguage();
  const [contactMessage, setContactMessage] = useState("");

  if (!currentTranslations) {
    return (
        <div style={{backgroundColor: '#121212'}} className="w-screen h-screen flex items-center justify-center">
            <p style={{color: '#27F4D2'}} className="text-xl">Memuat...</p>
        </div>
    );
  }

  // Mercedes-AMG F1 Inspired Color Palette
  const colors = {
    background: '#121212', // Near-black
    card: '#1F2937',      // Dark Gray for cards/sections
    textPrimary: '#FFFFFF', // White
    textSecondary: '#A0AEC0', // Light Gray
    accent: '#27F4D2',      // Petronas Green/Teal
    border: '#2D3748'       // Dark border
  };

  const heroTextContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };
  
  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
 
  const heroButtonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.5, stiffness: 150, damping: 15 } },
    hover: { scale: 1.05, boxShadow: `0px 10px 25px -5px ${colors.accent}40` },
    tap: { scale: 0.98 }
  };

  const aboutMeText = currentTranslations.heroAboutMe;
  const educationData: EducationItem[] = currentTranslations.educationData;
  const experienceData: ExperienceItem[] = currentTranslations.experienceData;
  const skillsData: SkillItem[] = currentTranslations.skillsData;
  const projectsData: ProjectItem[] = currentTranslations.projectsData;

  const cardClasses = `border shadow-lg rounded-xl`;

  return (
    <main className="overflow-x-hidden antialiased font-sans" style={{backgroundColor: colors.background, color: colors.textPrimary}}>
      <AnimatePresence>
        {contactMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-5 right-5 p-3 rounded-lg shadow-lg z-[100] text-sm"
            style={{backgroundColor: colors.accent, color: colors.background}}
          >
            {contactMessage}
          </motion.div>
        )}
      </AnimatePresence>

  {/* ===== HERO SECTION ===== */}
  <section id="hero" className="min-h-screen flex items-center relative py-24 md:py-32 overflow-hidden">
    <Blobs />
    <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
      <div className="flex justify-center items-center">
        
        {/* Left Floating Image */}
        <motion.div 
          className="w-1/4 h-[500px] relative hidden lg:flex flex-col gap-8 mt-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full h-1/2 rounded-2xl overflow-hidden"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="logo/glasslogo.webp" alt="Showcase A" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Center Text Content */}
        <motion.div
          className="relative z-10 text-center w-full lg:w-1/2 px-8"
          variants={heroTextContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={heroItemVariants}
            style={{ color: colors.textPrimary }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4  leading-tight tracking-tighter"
          >
            {currentTranslations.heroGreeting}
          </motion.h1>
          <motion.h2
            variants={heroItemVariants}
            style={{ color: colors.accent }}
            className="text-2xl md:text-3xl font-semibold mb-6"
          >
            {currentTranslations.heroSubtitle}
          </motion.h2>
          <motion.p
            variants={heroItemVariants}
            style={{ color: colors.textSecondary }}
            className="max-w-xl mx-auto mb-10 text-base md:text-lg"
          >
            {aboutMeText}
          </motion.p>
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.a href="#portfolio" variants={heroButtonVariants} whileHover="hover" whileTap="tap">
              <button
                style={{ backgroundColor: colors.accent, color: colors.background }}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold transition-all duration-300 text-base tracking-wide"
              >
                Lihat Portofolio
              </button>
            </motion.a>
            <motion.a href="#contact" variants={heroButtonVariants} whileHover="hover" whileTap="tap">
              <button
                style={{ borderColor: colors.accent, color: colors.accent }}
                className="w-full sm:w-auto border-2 px-8 py-3 rounded-lg font-bold transition-all duration-300 text-base tracking-wide hover:bg-teal-500/10"
              >
                {currentTranslations.heroButtonContact}
              </button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Floating Image */}
        <motion.div 
          className="w-1/4 h-[500px] relative hidden lg:flex flex-col gap-8 mt-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full h-1/2 rounded-2xl overflow-hidden self-start"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <img src="logo/figlogo.webp" alt="Showcase D" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  </section>


      {/* ===== PORTFOLIO SECTION ===== */}
      <section id="portfolio" className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl text-center relative z-10">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block" style={{color: colors.textPrimary}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 0.5}} viewport={{once:true}}>
                {currentTranslations.portfolioTitle}
            </motion.h2>
            <motion.div className="w-24 h-1 mx-auto mb-16 rounded-full" style={{backgroundColor: colors.accent}} initial={{scaleX:0}} whileInView={{scaleX:1}} transition={{duration:0.5, delay: 0.2}} viewport={{once:true}}></motion.div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {projectsData.map((project, index) => (
                    <motion.div 
                        key={project.id} 
                        className={`${cardClasses} overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                        style={{backgroundColor: colors.card, borderColor: colors.border}}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className="w-full h-60 relative overflow-hidden"> 
                            <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/${colors.background.slice(1)}/${colors.textPrimary.slice(1)}?text=${encodeURIComponent(project.title)}`)} />
                        </div>
                        <div className="p-6 flex flex-col flex-grow"> 
                            <h3 className="text-xl font-semibold mb-2" style={{color: colors.textPrimary}}>{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4"> 
                                {project.tags.map((tag) => (<span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{backgroundColor: `${colors.accent}20`, color: colors.accent}}>{tag}</span>))}
                            </div>
                            <p className="text-sm leading-relaxed mb-6 flex-grow" style={{color: colors.textSecondary}}>{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block self-start mt-auto px-6 py-2.5 rounded-lg font-bold transition-all duration-300 text-sm tracking-wide" style={{backgroundColor: colors.accent, color: colors.background}}>
                                {currentTranslations.projectSeeDetails}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
      
      {/* ===== ABOUT & RESUME SECTION ===== */}
        <section id="about" className="py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              style={{ color: colors.textPrimary }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {currentTranslations.aboutTitle}
            </motion.h2>

            {/* === Profile Summary === */}
            <motion.p
              className="text-center max-w-3xl mx-auto mb-16 text-base md:text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Hi, I'm Theo — a passionate Information Systems student who blends UI/UX design with product thinking to build digital experiences that are useful, elegant, and accessible.
            </motion.p>

            {/* === Skills Carousel === */}
            <div className="mb-20">
              <h3
                className="text-2xl md:text-3xl font-semibold mb-6 border-b-2 pb-4"
                style={{ borderColor: colors.border, color: colors.accent }}
              >
                {currentTranslations.skillsTitle}
              </h3>
              <motion.div
                className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent py-2 px-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {skillsData.map((skill, i) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center px-4 py-2 border rounded-xl min-w-[100px]"
                    style={{
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      flex: "0 0 auto",
                    }}
                  >
                    <img
                      src={"logo/ui.png"}
                      alt={skill.name}
                      className="w-8 h-8 object-contain mb-2"
                      onError={(e) =>
                        (e.currentTarget.src = `https://placehold.co/64x64/${colors.card.slice(1)}/${colors.accent.slice(1)}?text=?`)
                      }
                    />
                    <span className="text-sm font-medium text-center" style={{ color: colors.textSecondary }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* === Education & Experience === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Education */}
              <div>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-8 border-b-2 pb-4"
                  style={{ borderColor: colors.border, color: colors.accent }}
                >
                  {currentTranslations.educationTitle}
                </h3>
                <div className="space-y-8">
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={`edu-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center border"
                          style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                          <img
                            src={edu.logoUrl}
                            alt={`${edu.institution} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) =>
                              (e.currentTarget.src = `https://placehold.co/80x80/${colors.card.slice(1)}/${colors.accent.slice(1)}?text=E`)
                            }
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                            {edu.degree}
                          </h4>
                          <p className="font-medium text-sm mb-2" style={{ color: colors.accent }}>
                            {edu.institution}
                            <span className="ml-2 text-xs font-normal" style={{ color: colors.textSecondary }}>
                              ({edu.year})
                            </span>
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3
                  className="text-2xl md:text-3xl font-semibold mb-8 border-b-2 pb-4"
                  style={{ borderColor: colors.border, color: colors.accent }}
                >
                  {currentTranslations.experienceTitle}
                </h3>
                <div className="space-y-8">
                  {experienceData.map((exp, index) => (
                    <motion.div
                      key={`exp-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center border"
                          style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                          <img
                            src={exp.logoUrl}
                            alt={`${exp.company} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) =>
                              (e.currentTarget.src = `https://placehold.co/80x80/${colors.card.slice(1)}/${colors.accent.slice(1)}?text=E`)
                            }
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
                            {exp.role}
                          </h4>
                          <p className="font-medium text-sm mb-2" style={{ color: colors.accent }}>
                            {exp.company}
                            <span className="ml-2 text-xs font-normal" style={{ color: colors.textSecondary }}>
                              ({exp.year})
                            </span>
                          </p>
                          <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center relative z-10">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-3" style={{color: colors.accent}} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5}} viewport={{once:true}}>
            {currentTranslations.contactTitle}
          </motion.h2>
          <motion.p className="text-lg md:text-xl mb-8" style={{color: colors.textSecondary}} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, delay:0.1}} viewport={{once:true}}>
              {currentTranslations.contactPrompt}
          </motion.p>
          <motion.div className="flex justify-center gap-8 mt-8 text-3xl" style={{color: colors.textSecondary}} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.5, delay:0.2}} viewport={{once:true}}>
              <a href="mailto:theodorekasyfillah06@gmail.com" className="transition-colors hover:text-[#27F4D2]"><FaEnvelope /></a>
              <a href="https://www.linkedin.com/in/theodore-kasyfillah-0ba985247/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#27F4D2]"><FaLinkedin /></a>
              <a href="https://www.instagram.com/tedikasyfillah" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#27F4D2]"><FaInstagram /></a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
