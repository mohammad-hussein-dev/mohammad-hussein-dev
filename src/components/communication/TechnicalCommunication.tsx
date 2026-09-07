import React from 'react';
import { CONTENT_STUDIO_DOCS, PROFILE } from '../../data/portfolioData';
import { BookOpen, Globe2, FileText, ArrowRight, ExternalLink, Code2 } from 'lucide-react';

export const TechnicalCommunication: React.FC = () => {
  return (
    <section id="communication" className="py-20 bg-[#090d16] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Communication & Localization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Documentation & Bilingual Engineering
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Precision technical writing, RTL localization, and academic LaTeX manuscripts bridging English and Persian technical communities.
            </p>
          </div>

          <a
            href={PROFILE.contentStudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-[#0e1626] hover:bg-[#131e33] text-cyan-300 border border-cyan-800/60 text-xs font-mono flex items-center space-x-2 transition shrink-0"
          >
            <span>Content Studio Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONTENT_STUDIO_DOCS.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#050810] border border-slate-800/90 hover:border-cyan-900/60 rounded-xl p-5 flex flex-col justify-between transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                    {doc.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {doc.format}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-mono">
                  {doc.title}
                </h3>
                <div className="text-xs text-cyan-400 font-mono mt-1">
                  {doc.category}
                </div>

                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between">
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 transition"
                >
                  <span>Explore Documents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
