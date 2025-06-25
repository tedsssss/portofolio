'use client';
import { useLanguage } from '@/context/LangContext';
import { FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const { currentTranslations } = useLanguage();

  return (
    <footer className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] text-gray-800 text-sm">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Contact & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
          <p className="mb-3 text-gray-600">{currentTranslations.contactPrompt}</p>
          <div className="flex space-x-4 text-lg">
            <a href="mailto:theodorekasyfillah06@gmail.com" className="hover:text-brand-teal" title="Email">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com/in/theodore-kasyfillah-0ba985247/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/tedikasyfillah" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal" title="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Custom Content */}
        <div>
          <h4 className="text-lg font-medium mb-3">A Note from Me</h4>
          <p className="text-gray-600 leading-relaxed">
            { 'Great design is born of simplicity and clarity.'}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Theodore Kasyfillah. {currentTranslations.footerRightsReserved}
      </div>
    </footer>
  );
}
