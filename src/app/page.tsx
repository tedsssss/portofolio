// app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaEnvelope, FaInstagram, FaLock, FaDotCircle } from "react-icons/fa";
import { useLanguage } from "../context/LangContext"; 
import { EducationItem, ExperienceItem, SkillItem, ProjectItem } from "../lib/translations"; 
import Blobs from '@/components/Blobs'; 

// --- Web3 Theme Colors (Conceptual Reference) ---
// const web3BgDark = "#0A0D14"; // Very dark blue/black
// const web3PrimaryAccent = "#00E0FF"; // Electric Cyan
// const web3SecondaryAccent = "#A020F0"; // Electric Purple / Magenta
// const web3TextPrimary = "#E0E0E0";
// const web3TextSecondary = "#A0A0A0";
// const web3GlassBase = "rgba(23, 30, 48, 0.5)"; // Darker, slightly bluer glass
// const web3GlassBorder = "rgba(0, 224, 255, 0.2)"; // Cyan accent border for glass

// --- Static Grid Background Component ---
const StaticGridBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-[-2] overflow-hidden" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 224, 255, 0.03)" strokeWidth="0.5"/>
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)"/>
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0, 224, 255, 0.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// --- GlobalBackgroundAnimations COMPONENT (Web3 Colors) ---
const globalShapeVariants: Variants = { 
  initial: (custom: { x: string, y: string, scale: number, opacity: number }) => ({
    x: custom.x,
    y: custom.y,
    scale: custom.scale,
    opacity: custom.opacity,
  }),
  animate: (custom: { duration: number, delay: number, xMovement?: string[], yMovement?: string[], opacityRange?: number[], scaleRange?: number[] }) => {
    const transitionSettings: Transition = {
      duration: custom.duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop" as "loop", 
      delay: custom.delay,
    };
    return {
      x: custom.xMovement || ['0%', '8%', '-8%', '0%'],
      y: custom.yMovement || ['0%', '-6%', '6%', '0%'],
      opacity: custom.opacityRange || [0.05, 0.15, 0.1, 0.05],
      scale: custom.scaleRange || [1, 1.03, 0.97, 1],
      transition: transitionSettings,
    };
  },
};

const particleVariants: Variants = {
  initial: (custom: { x: string, y: string, opacity: number }) => ({
    x: custom.x,
    y: custom.y,
    opacity: custom.opacity,
  }),
  animate: (custom: { duration: number, delay: number, xMovement: string[], yMovement: string[], opacityRange: number[] }) => ({
    x: custom.xMovement,
    y: custom.yMovement,
    opacity: custom.opacityRange,
    transition: {
      duration: custom.duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop" as "loop",
      delay: custom.delay,
    },
  }),
};


const backgroundShapes = [
  {
    id: 1,
    size: "w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] max-w-[500px] max-h-[500px]", 
    gradient: "bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent", 
    initial: { x: "-15vw", y: "-10vh", scale: 1, opacity: 0 }, 
    animateParams: { duration: 45, delay: 0, opacityRange: [0, 0.06, 0.03, 0] }, 
    blur: "blur-3xl",
    top: "5%", left: "5%", 
  },
  {
    id: 2,
    size: "w-[40vw] h-[40vw] min-w-[350px] min-h-[350px] max-w-[600px] max-h-[600px]",
    gradient: "bg-gradient-to-tl from-purple-600/10 via-transparent to-transparent", 
    initial: { x: "10vw", y: "20vh", scale: 1.1, opacity: 0 },
    animateParams: { duration: 60, delay: 3, opacityRange: [0, 0.05, 0.02, 0], xMovement: ['0%', '-7%', '7%', '0%'], yMovement: ['0%', '5%', '-5%', '0%'] },
    blur: "blur-3xl",
    bottom: "10%", right: "8%",
  },
  {
    id: 3,
    size: "w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] max-w-[450px] max-h-[450px]",
    gradient: "bg-gradient-to-tr from-blue-500/15 via-transparent to-transparent", 
    initial: { x: "5vw", y: "-15vh", scale: 0.9, opacity: 0 },
    animateParams: { duration: 50, delay: 6, opacityRange: [0, 0.08, 0.04, 0], scaleRange: [0.9, 1.05, 0.95, 0.9] },
    blur: "blur-3xl",
    top: "30%", right: "15%",
  },
   {
    id: 4,
    size: "w-[38vw] h-[38vw] min-w-[280px] min-h-[280px] max-w-[550px] max-h-[550px]",
    gradient: "bg-gradient-to-bl from-pink-500/10 via-transparent to-transparent", 
    initial: { x: "-10vw", y: "15vh", scale: 1, opacity: 0 },
    animateParams: { duration: 55, delay: 9, opacityRange: [0, 0.06, 0.02, 0], xMovement: ['0%', '6%', '-6%', '0%'] },
    blur: "blur-3xl",
    bottom: "25%", left: "12%",
  },
];

const numParticles = 50; 
const particles = Array.from({ length: numParticles }).map((_, i) => {
  const initialXValue = Math.random() * 100;
  const initialYValue = Math.random() * 100;
  const driftXMax = 10 + Math.random() * 8; 
  const driftYMax = 10 + Math.random() * 8;

  return {
    id: i + 100, 
    size: `w-${Math.random() < 0.4 ? '1' : '0.5'} h-${Math.random() < 0.4 ? '1' : '0.5'}`, 
    color: Math.random() < 0.5 ? 'bg-cyan-400/15' : 'bg-purple-500/15', 
    initialX: `${initialXValue}vw`,
    initialY: `${initialYValue}vh`,
    animateParams: {
      duration: 25 + Math.random() * 35, 
      delay: Math.random() * 20, 
      xMovement: [`${initialXValue}vw`, `${initialXValue + (Math.random() * driftXMax * 2 - driftXMax)}vw`, `${initialXValue}vw`],
      yMovement: [`${initialYValue}vh`, `${initialYValue + (Math.random() * driftYMax * 2 - driftYMax)}vh`, `${initialYValue}vh`],
      opacityRange: [0, Math.random() * 0.25 + 0.1, 0], // Slightly brighter twinkle
    },
  };
});


const GlobalBackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]" aria-hidden="true">
      {backgroundShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full ${shape.size} ${shape.gradient} ${shape.blur}`}
          style={{ top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom }}
          variants={globalShapeVariants}
          custom={{ ...shape.initial, ...shape.animateParams }} 
          initial="initial" 
          animate="animate" 
        />
      ))}
      {particles.map((particle) => (
         <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.size} ${particle.color}`}
          variants={particleVariants}
          custom={{ x: particle.initialX, y: particle.initialY, opacity: 0, ...particle.animateParams }}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
};
// --- END OF GlobalBackgroundAnimations ---


// Animation Variants (remain the same as they are style-based)
const sectionTitleVariants: Variants = { 
  hidden: { opacity: 0, y: -40, skewY: 5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 } },
};

const portfolioCardHoverVariants: Variants = { 
  rest: { scale: 1, y: 0, boxShadow: "0px 8px 12px -3px rgba(0,0,0,0.2), 0px 4px 6px -2px rgba(0,0,0,0.1)" }, // Darker base shadow
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0px 20px 30px -5px rgba(0, 224, 255, 0.25), 0px 10px 15px -5px rgba(0, 224, 255, 0.15)" // Cyan glow
  }
};

const resumeCardItemVariants: Variants = { 
  hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.7, delay: i * 0.25, ease: [0.25, 1, 0.5, 1] }
  }),
};

const skillCardVariants: Variants = { 
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
    boxShadow: "0px 15px 30px rgba(0, 224, 255, 0.35)", // Cyan glow
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
          className={`w-3 h-3 rounded-full transition-all duration-300 ${i < activeDots
              ? 'bg-cyan-400' // Web3 Accent
              : 'bg-slate-600 opacity-60' 
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
  const heroTextContainerVariants: Variants = { 
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };
  const heroItemVariants: Variants = { 
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "circOut", delay: 0.2 } },
  };
  
  const heroImageVariants: Variants = { 
    initial: { opacity: 0, scale: 0.6, rotateY: 90 }, 
    animate: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 } }, 
    hover: { scale: 1.05, y: -10, transition: { type: "spring", stiffness: 250, damping: 15 } } 
  };

  const flipCardContainerVariants: Variants = { 
    rest: {}, 
    hover: {}  
  };

  const frontCardFlipVariant: Variants = { 
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

  const backCardFlipVariant: Variants = { 
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
  
  const heroButtonVariants: Variants = { 
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.8 + i * 0.1 } }),
    hover: { scale: 1.05, boxShadow: "0px 0px 30px rgba(0, 224, 255, 0.6)" }, // Cyan glow
    tap: { scale: 0.95 }
  };

  // Data from translations
  const aboutMeText = currentTranslations.heroAboutMe;
  const educationData: EducationItem[] = currentTranslations.educationData;
  const experienceData: ExperienceItem[] = currentTranslations.experienceData;
  const skillsData: SkillItem[] = currentTranslations.skillsData;
  const projectsData: ProjectItem[] = currentTranslations.projectsData;

  // Web3 Style Glassmorphism classes
  const glassSectionClasses = "bg-slate-900/60 backdrop-blur-lg border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 rounded-3xl p-6 md:p-10 lg:p-12 my-8 md:my-12";
  const glassCardClasses = "bg-slate-800/50 backdrop-blur-md border border-slate-700/30 shadow-xl rounded-2xl";


  return (
    <div className="overflow-x-hidden antialiased px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-200 relative"> {/* Web3 Dark BG, Lighter primary text */}
      <StaticGridBackground />
      <GlobalBackgroundAnimations /> 
      
      <AnimatePresence>
        {contactMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 bg-cyan-400 text-slate-900 p-4 rounded-lg shadow-lg z-[100]" // Web3 Accent
          >
            {contactMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO SECTION ===== */}
      <section 
        id="hero" 
        className="min-h-screen flex items-center pt-24 md:pt-20 relative overflow-hidden 
                   -mx-4 sm:-mx-6 lg:-mx-8 
                   bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10 
                   "
      >
        <Blobs /> 
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-center text-center gap-x-16 gap-y-10 z-10"> 
          {/* TEKS */}
          <motion.div
            className="md:w-7/12 flex flex-col justify-center text-left"
            variants={heroTextContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={heroItemVariants} className="text-cyan-400 text-lg font-semibold tracking-wider uppercase mb-2">
              {currentTranslations.heroGreeting}
            </motion.h2>
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.4 } }}
            >
              <Image
                src="/logo/Logo teds.png" // Consider a Web3 style logo if you have one
                alt={currentTranslations.heroNameAlt}
                width={480}
                height={96}
                priority
                className="drop-shadow-[0_2px_15px_rgba(0,224,255,0.35)]" // Cyan drop shadow
              />
            </motion.div>
            <motion.h2 variants={heroItemVariants} className="text-2xl md:text-3xl font-bold text-slate-100 mb-8"> 
              {currentTranslations.heroSubtitle}
            </motion.h2>
            <motion.p variants={heroItemVariants} className="text-slate-300 text-justify mx-auto mb-6"> 
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
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-lg border-2 border-transparent" 
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
                  className="w-full sm:w-auto border-2 border-cyan-500 text-cyan-400 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-lg hover:bg-cyan-500/20 hover:text-cyan-300" 
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
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto relative cursor-pointer group" // Added group for potential inner glow
              style={{ perspective: '1200px' }} 
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
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center p-1.5 sm:p-2 relative shadow-xl shadow-cyan-500/20"> 
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 filter blur-2xl animate-pulse-slow group-hover:opacity-50 transition-opacity duration-300"></div> 
                  <div className="w-full h-full bg-slate-900 rounded-full relative overflow-hidden z-10 border-2 border-cyan-600/60"> 
                    <Image
                      src="/logo/pic.jpg" 
                      alt={language === 'id' ? "Foto profil Teds (Depan)" : "Teds profile picture (Front)"}
                      fill
                      className="object-cover rounded-full"
                      sizes="(min-width: 768px) 20rem, (min-width: 640px) 18rem, 16rem"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/320x320/0A0D14/00E0FF?text=TEDS')}
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
                <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-full flex items-center justify-center p-1.5 sm:p-2 relative shadow-xl shadow-purple-500/20"> 
                  <div className="w-full h-full bg-slate-900 rounded-full relative overflow-hidden z-10 border-2 border-purple-600/60"> 
                    <Image
                      src="/logo/pic.jpg" 
                      alt={language === 'id' ? "Foto profil Teds (Belakang)" : "Teds profile picture (Back)"}
                      fill
                      className="object-cover rounded-full"
                      sizes="(min-width: 768px) 20rem, (min-width: 640px) 18rem, 16rem"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/320x320/0A0D14/A020F0?text=WEB3')} 
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT ME / RESUME SECTION ===== */}
      <section id="resume" className={`${glassSectionClasses} relative z-[5]`}> 
        <div className="container mx-auto"> 
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-cyan-400" 
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.aboutTitle}
            <motion.span
              className="block w-32 h-1 bg-cyan-400 rounded-full mx-auto mt-3" 
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
            className="mb-16 md:mb-20" 
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-slate-100 border-b-2 border-cyan-500/50 pb-4 text-center md:text-left">{currentTranslations.educationTitle}</h3>
            {educationData.map((edu, index) => (
              <motion.div
                key={`edu-${index}`}
                variants={resumeCardItemVariants}
                custom={index}
                className={`${glassCardClasses} p-6 md:p-8 mb-10 hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center overflow-hidden`}
              >
                <div className="w-full"> 
                  <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/70 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-md border-2 border-cyan-500/30 relative overflow-hidden p-1" 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.1 } }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={edu.logoUrl || '/logos/default-logo.png'}
                        alt={`${edu.institution} logo`}
                        fill
                        className="object-contain" 
                        sizes="80px"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/0A0D14/00E0FF?text=L')}
                      />
                    </motion.div>
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-1">{edu.degree}</h4>
                      <p className="text-slate-200 font-medium text-md sm:text-lg mb-1">{edu.institution}
                        <span className="text-xs ml-2 text-slate-400 bg-slate-700/70 px-2.5 py-1 rounded-full align-middle">{edu.year}</span> 
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">{edu.description}</p>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700/60"> 
                        <h5 className="text-sm sm:text-md font-semibold text-slate-100 mb-2">{language === 'id' ? 'Poin Penting:' : 'Key Highlights:'}</h5>
                      <ul className="space-y-1.5">
                        {edu.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            className="flex items-start text-xs sm:text-sm text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0, transition: { delay: (index * 0.1) + (hIndex * 0.05) + 0.3 } }}
                            viewport={{ once: true }}
                          >
                            <FaDotCircle className="text-cyan-400 mr-2.5 mt-1 flex-shrink-0 text-xs" /> 
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
            <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-slate-100 border-b-2 border-cyan-500/50 pb-4 text-center md:text-left">{currentTranslations.experienceTitle}</h3>
            {experienceData.map((exp, index) => (
              <motion.div
                key={`exp-${index}`}
                variants={resumeCardItemVariants}
                custom={index}
                className={`${glassCardClasses} p-6 md:p-8 mb-10 hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center overflow-hidden`}
              >
                <div className="w-full">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900/70 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 shadow-md border-2 border-cyan-500/30 relative overflow-hidden p-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.1 } }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={exp.logoUrl || '/logos/default-logo.png'}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain rounded-full" 
                        sizes="80px"
                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/80x80/0A0D14/00E0FF?text=L')}
                      />
                    </motion.div>
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-1">{exp.role}</h4>
                      <p className="text-slate-200 font-medium text-md sm:text-lg mb-1">{exp.company}
                        <span className="text-xs ml-2 text-slate-400 bg-slate-700/70 px-2.5 py-1 rounded-full align-middle">{exp.year}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700/60">
                      <h5 className="text-sm sm:text-md font-semibold text-slate-100 mb-2">{language === 'id' ? 'Poin Penting:' : 'Key Highlights:'}</h5>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            className="flex items-start text-xs sm:text-sm text-slate-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0, transition: { delay: (index * 0.1) + (hIndex * 0.05) + 0.3 } }}
                            viewport={{ once: true }}
                          >
                            <FaDotCircle className="text-cyan-400 mr-2.5 mt-1 flex-shrink-0 text-xs" />
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
      <section id="skills" className={`${glassSectionClasses} relative z-[5]`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-cyan-400"
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.skillsTitle}
            <motion.span
              className="block w-24 h-1 bg-cyan-400 rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 md:mt-16"> 
            {skillsData.map((skill, index) => (
              <motion.div
                key={index}
                className={`${glassCardClasses} p-6 flex flex-col items-center text-center hover:border-cyan-500/50 transition-colors duration-300`}
                variants={skillCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                custom={index}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-cyan-400 text-5xl mb-5"> 
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">{skill.name}</h3>
                <SkillLevelIndicator levelName={skill.levelName} currentSkillLevels={currentTranslations.skillLevels} />
                <p className="text-xs text-slate-400 mt-1">({skill.levelName})</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION (GRID) ===== */}
      <section id="portfolio" className={`${glassSectionClasses} relative z-[5]`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-cyan-400"
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.portfolioTitle}
            <motion.span
              className="block w-32 h-1 bg-cyan-400 rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className={`${glassCardClasses} overflow-hidden flex flex-col group hover:border-cyan-500/50 transition-colors duration-300`} 
                variants={portfolioCardHoverVariants}
                initial="rest" 
                animate={{opacity:50, y:50, filter:"blur(5px)"}} 
                whileHover="hover"
                whileInView={{ opacity: 1, y: 0, filter:"blur(0px)", transition: { duration: 0.6, delay: index * 0.15, ease: "circOut" } }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="w-full h-64 md:h-72 lg:h-80 relative overflow-hidden"> 
                  <Image
                    src={project.imageUrl || 'https://placehold.co/600x400/0A0D14/00E0FF?text=Project'}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                    sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                    onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/0A0D14/00E0FF?text=${encodeURIComponent(project.title)}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent group-hover:from-black/60 transition-all duration-300"></div> 
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl lg:text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors"> 
                    {project.title}
                  </h3>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4"> 
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full"> 
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-grow"> 
                    {project.description}
                  </p>
                  {project.link === "#" ? (
                    <button
                      disabled
                      className="inline-flex items-center self-start mt-auto bg-slate-700 text-slate-500 px-5 py-2.5 rounded-lg font-semibold cursor-not-allowed text-sm" 
                    >
                      <FaLock className="w-3.5 h-3.5 mr-2" /> 
                      {currentTranslations.projectAccessLocked}
                    </button>
                  ) : (
                    <Link href={project.link} legacyBehavior>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block self-start mt-auto bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/30 text-sm" 
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
      <section id="contact" className={`${glassSectionClasses} relative z-[5]`}>
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 text-cyan-400" 
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {currentTranslations.contactTitle}
            <motion.span
              className="block w-32 h-1 bg-cyan-400 rounded-full mx-auto mt-3"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>

          <div className="max-w-3xl mx-auto text-center">
            <motion.h3
              className="text-2xl md:text-3xl font-semibold text-slate-100 mb-5" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {currentTranslations.contactSubtitle}
            </motion.h3>
            <motion.p
              className="text-slate-300 text-lg mb-10" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {currentTranslations.contactPrompt}
            </motion.p>

            <motion.div
              className="flex justify-center gap-10 mt-8" 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Email */}
              <motion.a
                href="mailto:theodorekasyfillah06@gmail.com"
                whileHover={{ scale: 1.2, color: "#00E0FF" }} 
                transition={{ type: "spring", stiffness: 300 }}
                className="text-slate-400 text-4xl transition-colors duration-300" 
                aria-label="Email Theodore Kasyfillah"
              >
                <FaEnvelope />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/theodore-kasyfillah-0ba985247/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#00E0FF" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-slate-400 text-4xl transition-colors duration-300"
                aria-label="Theodore Kasyfillah LinkedIn Profile"
              >
                <FaLinkedin />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/tedikasyfillah"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#00E0FF" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-slate-400 text-4xl transition-colors duration-300"
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
