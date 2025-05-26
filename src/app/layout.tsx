// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Image from 'next/image'; // Next/Image bisa juga digunakan untuk gambar eksternal dengan konfigurasi
import Link from "next/link";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor"; // Assuming CustomCursor.tsx is in src/components/
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { translations, NavItem } from "../lib/translations"; // Pastikan path ini benar

const inter = Inter({ subsets: ["latin"] });

// 1. Language Context
interface LanguageContextType {
  language: 'en' | 'id';
  setLanguage: (language: 'en' | 'id') => void;
  currentTranslations: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// 2. Language Provider Component
const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<'en' | 'id'>('en'); // Default ke Inggris

  const setLanguage = (lang: 'en' | 'id') => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
        localStorage.setItem('portfolioLanguage', lang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
        const storedLang = localStorage.getItem('portfolioLanguage') as 'en' | 'id';
        if (storedLang && (storedLang === 'en' || storedLang === 'id')) {
            setLanguageState(storedLang);
        }
    }
  }, []);

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Navbar Component
const Navbar = () => {
  const { language, setLanguage, currentTranslations } = useLanguage();
  const navItems: NavItem[] = currentTranslations.navItems;
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  let flagCode: string;
  let flagAltText: string;
  let tooltipText: string;

  if (language === 'en') {
    flagCode = 'gb'; // Kode untuk Great Britain (Inggris Raya)
    flagAltText = "British Flag";
    tooltipText = "Ganti ke Bahasa Indonesia";
  } else {
    flagCode = 'id'; // Kode untuk Indonesia
    flagAltText = "Indonesian Flag";
    tooltipText = "Switch to English";
  }

  const flagUrl = `https://flagcdn.com/${flagCode}.svg`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-brand-dark/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="#hero" className="inline-block flex-shrink-0">
          <Image
            src="/logo/Logo teds.png" // Gambar logo Anda
            alt={currentTranslations.heroNameAlt || "T.K Logo"}
            width={60}
            height={60}
            priority
          />
        </Link>
        <div className="hidden md:flex flex-grow justify-center space-x-6 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-brand-teal transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center p-1.5 rounded-md hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-teal"
            aria-label="Switch language"
            title={tooltipText}
          >
            {/* Menggunakan tag <img> standar untuk CDN */}
            <Image
              src={flagUrl}
              alt={flagAltText}
              width="28" // Sesuaikan ukuran sesuai kebutuhan
              height="21" // Sesuaikan ukuran (biasanya rasio 4:3 atau 3:2 untuk bendera)
              className="rounded-sm" // Sedikit lengkungan pada sudut bendera
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

// Footer Component
const Footer = () => {
  const { currentTranslations } = useLanguage();
  return (
    <footer className="bg-brand-gray border-t border-brand-light-gray py-8 text-center">
      <div className="container mx-auto px-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Theodore Kasyfillah. {currentTranslations.footerRightsReserved}
        </p>
        <p className="text-gray-600 text-xs mt-1">
          {currentTranslations.footerDesignedWith} <span className="text-brand-teal">&hearts;</span> {currentTranslations.footerCodedWith}
        </p>
      </div>
    </footer>
  );
};

// Komponen internal untuk mengatur atribut lang pada <html> dan merender <head>
const RootElements = ({ children, lang }: { children: ReactNode, lang: string }) => {
  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <title>Theodore Kasyfillah</title>
        <meta name="description" content="Portfolio Theodore Kasyfillah" />
        <link rel="icon" href="/Logo teds.png" sizes="any" />
      </head>
      <body className={`${inter.className} bg-brand-dark text-white`}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}

// Komponen baru untuk mengakses context bahasa dan menerapkannya ke RootElements
const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage(); 

  useEffect(() => {
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <RootElements lang={language}>
      {children}
    </RootElements>
  );
};