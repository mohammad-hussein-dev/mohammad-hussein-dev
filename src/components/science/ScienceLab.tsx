import React, { useState } from 'react';
import { ProjectileSimulator } from './ProjectileSimulator';
import { GeneticAlgorithmSim } from './GeneticAlgorithmSim';
import { PinnVisualizer } from './PinnVisualizer';
import { HeatDiffusionSim } from './HeatDiffusionSim';
import { Atom, Cpu, Activity, Network, Waves, Flame, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ScienceLab: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [activeTab, setActiveTab] = useState<'pinn' | 'heat' | 'projectile' | 'ga'>('pinn');

  return (
    <section id="science" className="py-20 bg-[#070a11] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
              <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span>{isFa ? 'آزمایشگاه تعاملی فیزیک محاسباتی و هوش مصنوعی' : 'Interactive Physics & Math Lab'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isFa ? 'پل میان محاسبات علمی و مهندسی نرم‌افزار' : 'Scientific Computing in Action'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {isFa
                ? 'حل‌کننده‌های عددی کلاینت-ساید، شبکه‌های عصبی آگاه از فیزیک (PINNs)، شبیه‌سازهای انتگرال‌گیر RK4 و الگوریتم‌های ژنتیک مبتنی بر ریپازیتوری‌های واقعی گیت‌هاب.'
                : 'Real client-side numerical solvers, Physics-Informed Neural Networks, Runge-Kutta kinematics, and genetic algorithms from real-world research repositories.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0b101c] p-1.5 rounded-xl border border-cyan-950/80 shrink-0">
            <button
              onClick={() => setActiveTab('pinn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
                activeTab === 'pinn'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>{isFa ? 'شبکه PINN' : 'PINN (PDE)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('heat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
                activeTab === 'heat'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isFa ? 'انتقال حرارت فوریه' : 'Heat Diffusion'}</span>
            </button>

            <button
              onClick={() => setActiveTab('projectile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
                activeTab === 'projectile'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isFa ? 'سینماتیک RK4' : 'Kinematics (RK4)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('ga')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
                activeTab === 'ga'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{isFa ? 'الگوریتم ژنتیک' : 'Genetic Algo'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Simulation View */}
        <div className="transition-all duration-300">
          {activeTab === 'pinn' && <PinnVisualizer />}
          {activeTab === 'heat' && <HeatDiffusionSim />}
          {activeTab === 'projectile' && <ProjectileSimulator />}
          {activeTab === 'ga' && <GeneticAlgorithmSim />}
        </div>
      </div>
    </section>
  );
};
