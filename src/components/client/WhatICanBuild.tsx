import React from 'react';
import { WHAT_I_CAN_BUILD } from '../../data/portfolioData';
import { Server, Layers, Cpu, Zap, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';

interface WhatICanBuildProps {
  onOpenContact: () => void;
}

export const WhatICanBuild: React.FC<WhatICanBuildProps> = ({ onOpenContact }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle': return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-purple-400" />;
      default: return <Server className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#070a12] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Solutions & Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              What I Can Build For Your Team
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Concrete engineering deliverables designed for stability, high performance, and rapid deployment.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center space-x-2 transition active:scale-95 shadow-md shadow-cyan-500/20 shrink-0"
          >
            <span>Request Project Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHAT_I_CAN_BUILD.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#050810] border border-slate-800/90 hover:border-cyan-900/60 rounded-xl p-5 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-900/80 transition">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-900/50">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100 font-mono tracking-tight group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900">
                <button
                  onClick={onOpenContact}
                  className="text-xs font-mono text-cyan-400/90 hover:text-cyan-300 flex items-center space-x-1 transition"
                >
                  <span>Discuss requirements</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
