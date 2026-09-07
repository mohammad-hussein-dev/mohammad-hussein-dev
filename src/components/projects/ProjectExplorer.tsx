import React, { useState, useMemo } from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { FolderGit2, ExternalLink, Search, FileCode2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectExplorerProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ onSelectProject }) => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: isFa ? 'همه پروژه‌ها' : 'ALL' },
    { id: 'BACKEND', label: isFa ? 'بک‌اند و دیتابیس' : 'BACKEND' },
    { id: 'AI / ML', label: isFa ? 'هوش مصنوعی و PINN' : 'AI / ML' },
    { id: 'SCIENTIFIC', label: isFa ? 'محاسبات علمی' : 'SCIENTIFIC' },
    { id: 'OPTIMIZATION', label: isFa ? 'الگوریتم‌های بهینه‌سازی' : 'OPTIMIZATION' },
    { id: 'TOOLS', label: isFa ? 'ابزارها و لینوکس' : 'TOOLS' }
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        project.category === selectedCategory ||
        (selectedCategory === 'AI / ML' && (project.category === 'SCIENTIFIC' || project.technologies.includes('PyTorch')));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 bg-[#090d16] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'کاوشگر پروژه‌های مهندسی' : 'Engineering Project Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isFa ? 'پروژه‌های شاخص و معماری سیستم‌ها' : 'Featured Work & Systems Architecture'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {isFa
                ? 'زیرساخت‌های بک‌اند مقیاس‌پذیر، حل‌کننده‌های عصبی معادلات فیزیک، و موتورهای بهینه‌سازی چندهدفه با تضمین تست و قابلیت اطمینان بالا.'
                : 'Production backends, scientific neural solvers, and multi-objective optimization systems with test-driven guarantees.'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isFa ? 'جستجوی پروژه، تکنولوژی...' : 'Search stack, project...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#05070d] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-[#0e1422] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#060910] border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-900/50">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                    {project.stars !== undefined && (
                      <span className="flex items-center space-x-1">
                        <span>★</span>
                        <span>{project.stars}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {project.oneLiner}
                </p>

                {/* Metrics Badges */}
                <div className="mt-3.5 space-y-1">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="text-[11px] font-mono text-emerald-400/90 flex items-center space-x-1.5">
                      <span className="text-emerald-500">✓</span>
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Actions Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 text-xs font-mono flex items-center justify-center space-x-1.5 transition active:scale-98"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>{isFa ? 'مطالعه فنی دقیق' : 'Case Study'}</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
