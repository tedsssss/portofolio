'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LangContext';
import { SkillItem, EducationItem, ExperienceItem } from '@/lib/translations';

export default function AboutPage() {
  const { currentTranslations } = useLanguage();
  const skillsData: SkillItem[] = currentTranslations.skillsData;
  const educationData: EducationItem[] = currentTranslations.educationData;
  const experienceData: ExperienceItem[] = currentTranslations.experienceData;

  const colors = {
    background: '#ffffff',
    card: '#f7f7ff',
    textPrimary: '#111111',
    textSecondary: '#666666',
    accent: '#d62828',
    border: '#003049',
  };

  return (
    <main className="pt-24 pb-16 px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: colors.textPrimary }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {currentTranslations.aboutTitle}
        </motion.h2>

        {/* === Profile with Stats === */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Foto */}
          <div className="w-full md:w-1/3">
            <img
              src="/logo/pic.jpg"
              alt="Profile"
              className="rounded-2xl w-full object-cover"
            />
          </div>

          {/* Deskripsi + Stats */}
          <div className="w-full md:w-2/3">
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "#666666" }}>
              Hi! I'm Theodore Kasyfillah—feel free to call me Theo, Teddy, or Teds. As a penultimate-year Information Systems student at the University of Indonesia, I'm passionate about both UI/UX design and Product Management. I love creating interactive, user-centric experiences while also thinking about how products solve real problems and deliver value.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { label: "Projects", value: "10+" },
                { label: "Years of Experience", value: "2+" },
                { label: "Organizations", value: "6" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="border rounded-xl p-4 bg-[#f7f7ff] border-[#003049]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl font-bold text-[#d62828]">{stat.value}</div>
                  <div className="text-xs text-[#666666] font-medium uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === Education Section === */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 border-b pb-4" style={{ color: colors.accent, borderColor: colors.border }}>
            {currentTranslations.educationTitle}
          </h3>
          <div className="space-y-8">
            {educationData.map((edu, i) => (
              <motion.div
                key={`edu-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-white shrink-0">
                  <img src={edu.logoUrl} alt={edu.institution} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>{edu.degree}</h4>
                  <p className="text-sm font-medium mb-1" style={{ color: colors.accent }}>
                    {edu.institution}
                    <span className="text-xs font-normal ml-2" style={{ color: colors.textSecondary }}>
                      ({edu.year})
                    </span>
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* === Experience Section === */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 border-b pb-4" style={{ color: colors.accent, borderColor: colors.border }}>
            {currentTranslations.experienceTitle}
          </h3>
          <div className="space-y-8">
            {experienceData.map((exp, i) => (
              <motion.div
                key={`exp-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-white shrink-0">
                  <img src={exp.logoUrl} alt={exp.company} className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>{exp.role}</h4>
                  <p className="text-sm font-medium mb-1" style={{ color: colors.accent }}>
                    {exp.company}
                    <span className="text-xs font-normal ml-2" style={{ color: colors.textSecondary }}>
                      ({exp.year})
                    </span>
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      {/* === Skills Section === */}
      <div className="mt-20 space-y-16">
        {/* Hard Skills */}
        <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 border-b pb-4" style={{ borderColor: "#003049", color: "#d62828" }}>
            Hard Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
                { name: "UI/UX Design", level: "Expert", highlight: true },
                { name: "Figma", level: "Advanced", highlight: true },
                { name: "Wireframing", level: "Advanced", highlight: true },
                { name: "User Research", level: "Advanced", highlight: true },
                { name: "Product Management", level: "Intermediate", highlight: true },
                { name: "Prototyping", level: "Advanced" },
                { name: "HTML & CSS", level: "Advanced" },
                { name: "Tailwind CSS", level: "Advanced" },
                { name: "Next.js", level: "Intermediate" },
                { name: "Framer Motion", level: "Intermediate" },
                { name: "Scrum / Agile", level: "Intermediate" },
                { name: "Python & Django", level: "Intermediate" },
                { name: "Java", level: "Intermediate" },
                { name: "Flutter", level: "Basic" },
                { name: "Adobe Premiere Pro", level: "Intermediate" },
                { name: "Vue.js", level: "Basic" },
            ].map((skill, i) => (
                <motion.div
                key={i}
                className={`border rounded-lg px-4 py-3 shadow-sm ${
                    skill.highlight ? "bg-[#fff0f0] border-[#d62828] text-[#000]" : "bg-[#f7f7ff] border-[#003049] text-[#000]"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                >
                <div className="font-semibold text-sm">{skill.name}</div>
                <div className="text-xs text-gray-600">{skill.level}</div>
                </motion.div>
            ))}
            </div>
        </div>

        {/* Soft Skills */}
        <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 border-b pb-4" style={{ borderColor: "#003049", color: "#d62828" }}>
            Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
                { name: "Communication", level: "Strong" },
                { name: "Teamwork", level: "Strong" },
                { name: "Problem Solving", level: "Strong" },
                { name: "Leadership", level: "Strong" },
                { name: "Creativity & Innovation", level: "Strong" },
                { name: "Organizational Culture", level: "Intermediate" },
                { name: "Event Organizing", level: "Intermediate" },
                { name: "Human Capital Management", level: "Intermediate" },
                { name: "Managerial", level: "Intermediate" },
                { name: "Marketing", level: "Intermediate" },
                { name: "Team Leadership", level: "Intermediate" },
            ].map((skill, i) => (
                <motion.div
                key={i}
                className="border rounded-lg px-4 py-3 shadow-sm bg-[#f7f7ff] border-[#003049] text-[#111]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                >
                <div className="font-semibold text-sm">{skill.name}</div>
                <div className="text-xs text-gray-600">{skill.level}</div>
                </motion.div>
            ))}
            </div>
        </div>
        </div>
      </div>
    </main>
  );
}
