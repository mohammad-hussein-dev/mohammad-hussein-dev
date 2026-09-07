import React, { useState } from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface FreelanceBadgeData {
  id: string;
  name: string;
  url: string;
  badge: string;
  role: string;
  score: string;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  iconText: string;
}

export const FREELANCE_PLATFORM_BADGES: FreelanceBadgeData[] = [
  {
    id: 'karlancer',
    name: 'Karlancer',
    url: 'https://karlancer.com/profile/1401608',
    badge: 'MohammadHossein.Gh',
    role: 'Top Rated Backend & Python Freelancer',
    score: '5.0 ★ · 100% On-Time',
    color: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    bgGradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
    iconText: 'KL'
  },
  {
    id: 'parscoders',
    name: 'Parscoders',
    url: 'https://parscoders.com/resume/769525/mohammad_hussein',
    badge: 'mohammad_hussein',
    role: 'Verified Python & Algorithm Specialist',
    score: 'Verified · High Reliability',
    color: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    bgGradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    iconText: 'PC'
  },
  {
    id: 'typeiran',
    name: 'Typeiran',
    url: 'https://typeiran.com/user/797507',
    badge: 'Mohammad Hussein Ghafoori',
    role: 'Technical Documentation & Typing Specialist',
    score: 'Ranked & Verified',
    color: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    bgGradient: 'from-cyan-500/15 via-cyan-500/5 to-transparent',
    iconText: 'TI'
  },
  {
    id: 'lancerify',
    name: 'Lancerify',
    url: 'https://lancerify.com/fre/10007982',
    badge: 'Mohammad Hussein',
    role: 'Software Development & API Services',
    score: 'Active Verified Freelancer',
    color: 'text-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    borderColor: 'border-indigo-500/40 hover:border-indigo-400',
    bgGradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    iconText: 'LF'
  },
  {
    id: 'jobvision',
    name: 'Jobvision',
    url: 'https://jobvision.ir/cv/56014003-151757',
    badge: 'CV: 56014003',
    role: 'Verified Engineering CV & Experience',
    score: 'CV ID: 56014003-151757',
    color: 'text-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    bgGradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    iconText: 'JV'
  },
  {
    id: 'ponisha',
    name: 'Ponisha',
    url: 'https://ponisha.ir/profile/MHussein1',
    badge: 'MHussein1',
    role: 'Python, Backend & Full-Stack Pro',
    score: 'Verified Professional Profile',
    color: 'text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    bgGradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
    iconText: 'PN'
  }
];

export const CircularFreelanceBadges: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <div className="bg-[#050810] rounded-xl p-5 border border-slate-800 space-y-4">
      {/* Label and Verified Marker Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="uppercase tracking-wider font-semibold text-slate-300">
            {isFa ? 'پروفایل‌های فریلنسری تاییدشده' : 'Verified Freelance Profiles'}
          </span>
        </div>
        <span className="text-[10px] text-cyan-400/80 bg-cyan-950/60 border border-cyan-900/60 px-2 py-0.5 rounded-full font-mono">
          6 Platforms
        </span>
      </div>

      {/* 6 Circular Animated Badges Grid / Flex Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {FREELANCE_PLATFORM_BADGES.map((item) => {
          const isHovered = hoveredBadge === item.id;

          return (
            <div key={item.id} className="relative group">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredBadge(item.id)}
                onMouseLeave={() => setHoveredBadge(null)}
                className={`relative flex items-center space-x-2 px-2.5 py-2 rounded-xl bg-[#090e1a] border ${item.borderColor} transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 shadow-sm group-hover:shadow-[0_0_16px_var(--glow)] select-none`}
                style={{ '--glow': item.glowColor } as React.CSSProperties}
                title={`${item.name} - ${item.badge} (${item.score})`}
              >
                {/* Radial Glow Layer */}
                <span
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                />

                {/* Circular Icon Orb with Rotating Radar Ring */}
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#05070d] border border-slate-700/80 group-hover:border-white/50 shrink-0">
                  {/* Subtle rotating orbit ring */}
                  <div
                    className="absolute -inset-0.5 rounded-full border border-transparent border-t-current opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300"
                    style={{ color: item.glowColor }}
                  />

                  <span className={`text-[10px] font-mono font-extrabold tracking-tighter ${item.color}`}>
                    {item.iconText}
                  </span>
                </div>

                {/* Platform Name & Badge Info */}
                <div className="flex flex-col text-left min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                      {item.name}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-1" />
                  </div>
                  <span className="text-[10px] text-slate-500 truncate group-hover:text-slate-400 transition-colors font-mono">
                    {item.badge}
                  </span>
                </div>
              </a>

              {/* Floating Dynamic Interactive Tooltip */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 pointer-events-none whitespace-nowrap transition-all duration-200 ${
                  isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}
              >
                <div className="px-3 py-2 rounded-lg bg-[#050812] border border-slate-700 text-white text-xs font-mono shadow-2xl shadow-black/95 flex flex-col space-y-1">
                  <div className="flex items-center justify-between space-x-3">
                    <span className={`font-bold ${item.color}`}>{item.name}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isFa ? 'تاییدشده' : 'Verified'}</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium">{item.role}</div>
                  <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-1 flex items-center justify-between space-x-2">
                    <span className="text-amber-300/90 font-mono">{item.score}</span>
                    <span className="text-cyan-400">{isFa ? 'مشاهده پروفایل' : 'View Profile'} →</span>
                  </div>
                </div>
                {/* Arrow */}
                <div className="w-2 h-2 bg-[#050812] border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
