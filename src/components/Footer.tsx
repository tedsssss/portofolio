'use client';
import { useLanguage } from '@/context/LangContext';

export default function Footer() {
  const { currentTranslations } = useLanguage();

  return (
    <footer className="bg-brand-gray border-t border-brand-light-gray py-8 text-center">
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Theodore Kasyfillah. {currentTranslations.footerRightsReserved}
      </p>
      <p className="text-gray-600 text-xs mt-1">
        {currentTranslations.footerDesignedWith} <span className="text-brand-teal">♥</span> {currentTranslations.footerCodedWith}
      </p>
    </footer>
  );
}
