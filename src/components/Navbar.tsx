'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LangContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { language, setLanguage, currentTranslations } = useLanguage();
  const pathname = usePathname();
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
      className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-md"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <Image src="/logo/Logo teds.png" alt="Logo" width={60} height={60} priority />
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`text-sm px-3 py-2 transition-colors duration-200 ${
                    isActive
                      ? 'text-red-600 font-semibold'
                      : 'text-gray-800 hover:text-red-600'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
