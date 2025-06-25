'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LangContext';
import { ProjectItem } from '@/lib/translations';
import { FaLock } from 'react-icons/fa';

export default function PortfolioPage() {
  const { currentTranslations } = useLanguage();
  const projectsData: ProjectItem[] = currentTranslations.projectsData;

  const [activeTab, setActiveTab] = useState('All');

  const colors = {
    background: '#ffffff',
    card: '#e5e5f7',
    textPrimary: '#111111',
    textSecondary: '#555555',
    accent: '#d62828',
    border: '#003049',
  };

  // Get all unique tags for tab options
  const allCategory = useMemo(() => {
    const categorySet = new Set<string>();
    projectsData.forEach((project) => project.category.forEach((category) => categorySet.add(category)));
    return ['All', ...Array.from(categorySet)];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return projectsData;
    return projectsData.filter((project) => project.category.includes(activeTab));
  }, [activeTab, projectsData]);

  return (
    <main
      className="min-h-screen w-full pt-24 pb-32 px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        style={{ color: colors.textPrimary }}
        initial={{ opacity: 0.5, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {currentTranslations.portfolioTitle}
      </motion.h1>

    {/* Tabs */}
    <div className="flex justify-center gap-1 mb-12 bg-[#f2f2f2] p-1 rounded-xl w-fit mx-auto border border-[#003049]">
      {allCategory.map((category) => {
        const count = category === 'All'
          ? projectsData.length
          : projectsData.filter(p => p.category.includes(category)).length;

        const isActive = activeTab === category;

        return (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-md transition-all
              ${isActive
                ? 'bg-[#d62828] text-white shadow'
                : 'bg-white text-[#333] hover:bg-[#eee]'}
            `}
            style={{
              borderBottom: isActive ? '3px solid #003049' : '3px solid transparent',
              minWidth: '120px',
              justifyContent: 'center'
            }}
          >
            <span>{category}</span>
            <span className={`text-xs ${isActive ? 'text-white/80' : 'text-[#888]'}`}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white"
            style={{ borderColor: colors.border }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="h-60 w-full overflow-hidden relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: colors.textPrimary }}
              >
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${colors.accent}20`,
                      color: colors.accent,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: colors.textSecondary }}
              >
                {project.description}
              </p>

              {/* Locked or Active Button */}
              {(!project.link || project.link === '#') ? (
                <span
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-sm cursor-not-allowed opacity-60"
                  style={{
                    backgroundColor: `${colors.accent}40`,
                    color: colors.textSecondary,
                  }}
                >
                  <FaLock size={14} />
                  {currentTranslations.projectSeeDetails}
                </span>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.background,
                  }}
                >
                  {currentTranslations.projectSeeDetails}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
