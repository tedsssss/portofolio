'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LangContext';

export default function Navbar() {
  const { language, setLanguage, currentTranslations } = useLanguage();
  const navItems = currentTranslations.navItems;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const flagCode = language === 'en' ? 'gb' : 'id';
  const flagAltText = language === 'en' ? 'British Flag' : 'Indonesian Flag';
  const tooltipText = language === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English';
  const flagUrl = `https://flagcdn.com/${flagCode}.svg`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-dark/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="#hero">
          <Image src="/logo/Logo teds.png" alt="Logo" width={60} height={60} priority />
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-brand-teal px-3 py-2 text-sm"
            >
              {item.name}
            </a>
          ))}
        </div>
        <button
          onClick={toggleLanguage}
          title={tooltipText}
          className="p-2 hover:bg-gray-700/50 rounded-md"
        >
          <Image src={flagUrl} alt={flagAltText} width={28} height={21} className="rounded-sm" />
        </button>
      </div>
    </motion.nav>
  );
}
