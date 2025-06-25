// app/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "../context/LangContext";
import { EducationItem, ExperienceItem, SkillItem, ProjectItem } from "../lib/translations";
import Blobs from '@/components/Blobs';
import Link from "next/link";

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

  // Warna tema merah-putih-biru
  const colors = {
    background: '#ffffff',      // Putih
    card: '#e5e5f7',            // Putih kebiruan / abu terang
    textPrimary: '#111111',     // Hitam gelap untuk teks utama
    textSecondary: '#555555',   // Abu netral untuk teks sekunder
    accent: '#d62828',          // Merah terang untuk aksen
    border: '#003049'           // Biru tua sebagai warna border
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
            <motion.a href="/about" variants={heroButtonVariants} whileHover="hover" whileTap="tap">
              <button
                style={{ backgroundColor: colors.accent, color: colors.background }}
                className="w-full sm:w-auto px-8 py-3 rounded-lg font-bold transition-all duration-300 text-base tracking-wide"
              >
                About Me
              </button>
            </motion.a>
            <motion.a href="/portfolio" variants={heroButtonVariants} whileHover="hover" whileTap="tap">
              <button
                style={{ borderColor: colors.accent, color: colors.accent }}
                className="w-full sm:w-auto border-2 px-8 py-3 rounded-lg font-bold transition-all duration-300 text-base tracking-wide hover:bg-teal-500/10"
              >
                My Portfolio
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

      {/* ===== PROJECT PREVIEW SECTION =====
      <section id="preview-projects" className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            {currentTranslations.portfolioTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {projectsData.slice(0, 3).map((project) => (
              <div key={project.id} className="group cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="w-full h-48 overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400?text=${encodeURIComponent(project.title)}`)}
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold" style={{ color: colors.textPrimary }}>
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
          <Link href="/portfolio">
            <button className="mt-12 px-8 py-3 rounded-lg font-semibold transition-all text-white" style={{ backgroundColor: colors.accent }}>
              View All Projects
            </button>
          </Link>
        </div>
      </section> */}
    </main>
  );
}
