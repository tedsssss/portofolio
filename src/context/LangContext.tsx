'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations } from '@/lib/translations';

type LanguageType = 'en' | 'id';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageType>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('portfolioLanguage') as LanguageType;
    if (storedLang === 'en' || storedLang === 'id') {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('portfolioLanguage', lang);
    document.documentElement.lang = lang;
  };

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};