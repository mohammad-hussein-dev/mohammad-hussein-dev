import React from 'react';
import { OPEN_SOURCE_CONTRIBUTIONS } from '../../data/portfolioData';
import { GitPullRequest, GitMerge, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OpenSourceSection: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  return (
    <section id="opensource" className="py-20 bg-[#070a11] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'اکوسیستم و متن‌باز' : 'Open Source & Ecosystem'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isFa ? 'پول ریکوئست‌ها و مشارکت‌های ادغام‌شده' : 'Merged Pull Requests & Contributions'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {isFa
              ? 'مشارکت‌های واقعی در ابزارهای توسعه‌دهندگان، زیرساخت داکر، آنالیتیکس و فریم‌ورک‌های تست پایتون.'
              : 'Real contributions to upstream developer tooling, Docker infrastructure, customer analytics, and Python testing frameworks.'}
          </p>
        </div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OPEN_SOURCE_CONTRIBUTIONS.map((contrib) => (
            <div
              key={contrib.id}
              className="bg-[#050810] border border-slate-800/90 hover:border-cyan-900/60 rounded-xl p-5 flex flex-col justify-between transition"
            >
              <div>
                {/* Header with status badge & repo */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 text-[11px] font-mono font-semibold">
                    <GitMerge className="w-3.5 h-3.5 text-purple-400" />
                    <span>{contrib.status}</span>
                  </span>
                  <a
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>{isFa ? 'مشاهده PR' : 'View PR'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-mono">
                  {contrib.repository}
                </h3>
                <h4 className="text-xs font-semibold text-cyan-300 mt-0.5">
                  {contrib.title}
                </h4>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {contrib.description}
                </p>

                {/* Highlights List */}
                <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-900">
                  {contrib.highlights.map((hl, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-start space-x-1.5">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies footer */}
              <div className="mt-4 pt-3 border-t border-slate-900/80 flex flex-wrap gap-1.5">
                {contrib.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
