import React, { useEffect } from 'react';
import { Project } from '../../data/portfolioData';
import { GithubIcon, GitlabIcon } from '../common/Icons';
import { X, ExternalLink, CheckCircle2, AlertCircle, Cpu, ShieldCheck, Layers, GitFork, Star } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090d16] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/50 flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0d1320] border-b border-cyan-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 text-xs font-mono font-semibold">
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Executive Overview & Links */}
          <div className="bg-[#060910] p-4 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>
            <div className="flex items-center space-x-2 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center space-x-1.5 border border-slate-700 transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              {project.gitlabUrl && (
                <a
                  href={project.gitlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-xs font-mono flex items-center space-x-1.5 border border-amber-800/40 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitLab</span>
                </a>
              )}
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#0e1626] border border-cyan-950 flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-cyan-200 font-semibold">{metric}</span>
              </div>
            ))}
          </div>

          {/* Problem & Constraints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070b13] border border-slate-800">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b13] border border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Engineering Constraints</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.constraints}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline */}
          <div className="p-5 rounded-xl bg-[#070b13] border border-cyan-950">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <span>System Architecture & Pipeline</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              {caseStudy.architectureDescription}
            </p>
            <div className="space-y-2">
              {caseStudy.architectureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs font-mono bg-[#0c121e] p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                  <span className="text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Highlights */}
          <div className="p-5 rounded-xl bg-[#070b13] border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Implementation Highlights</span>
            </div>
            <ul className="space-y-2">
              {caseStudy.implementationHighlights.map((hl, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testing & Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070b13] border border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                Testing & Verification
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {caseStudy.testing}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#070b13] border border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Measurable Results
              </div>
              <ul className="space-y-1.5">
                {caseStudy.results.map((res, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="p-4 rounded-xl bg-[#0c1220] border border-indigo-950/60">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-2">
              Lessons Learned & Future Horizons
            </div>
            <ul className="space-y-1.5">
              {caseStudy.lessonsLearned.map((lesson, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                  <span className="text-indigo-400">→</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0d1320] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center space-x-2">
            <span>Technologies:</span>
            <span className="text-cyan-300">{project.technologies.join(', ')}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
