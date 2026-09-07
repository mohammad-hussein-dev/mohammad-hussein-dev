import React from 'react';
import { PROFILE, Project } from '../../data/portfolioData';
import { TerminalView } from '../terminal/TerminalView';
import { Terminal, FolderGit2, Download, Mail, ArrowRight, ShieldCheck, Cpu, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SocialProfileBadges } from '../common/SocialProfileBadges';

interface HeroProps {
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenContact: () => void;
  onToggleTheme: (mode?: string) => void;
  onOpenPalette: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectProject,
  onNavigateSection,
  onOpenContact,
  onToggleTheme,
  onOpenPalette,
  isFocusMode,
  onToggleFocusMode,
}) => {
  const { language, t } = useLanguage();
  const isFa = language === 'fa';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Technical Identity & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* System Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isFa ? 'مهندس بک‌اند و سیستم‌های محاسباتی هوش مصنوعی' : 'Backend Engineer & AI Systems'}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Arch Linux / Neovim</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {isFa ? 'محمد حسین' : PROFILE.name}
              </h1>
              <p className="text-base sm:text-lg font-mono text-cyan-400 mt-2 font-medium">
                {isFa
                  ? 'مهندس ارشد بک‌اند (پایتون/جنگو) · پژوهشگر فیزیک محاسباتی و شبکه‌های PINN'
                  : `${PROFILE.primaryRole} · ${PROFILE.secondaryRole}`}
              </p>
            </div>

            {/* Mission Statement */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {isFa
                ? 'طراح و توسعه‌دهنده زیرساخت‌های پایدار، میکروسرویس‌های پرسرعت جنگو و فست‌ای‌پی‌آی، پایگاه‌های داده توزیع‌شده و مدل‌های یادگیری عمیق حاکم بر معادلات دیفرانسیل فیزیک.'
                : PROFILE.missionStatement}
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {['Python', 'Django', 'DRF', 'FastAPI', 'PostgreSQL', 'Redis', 'PyTorch', 'Docker', 'pytest'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#090e18] text-slate-300 border border-slate-800/90 hover:border-cyan-800 transition"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateSection('#projects')}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center space-x-2 transition active:scale-95 shadow-lg shadow-cyan-500/25"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>{isFa ? 'مشاهده پروژه‌ها' : 'Explore Projects'}</span>
              </button>

              <a
                href={PROFILE.resumeUrl}
                download="Mohammad_Hussein_Resume.pdf"
                className="px-4 py-2.5 rounded-lg bg-[#0e1626] hover:bg-[#131e33] text-cyan-300 text-xs font-mono flex items-center space-x-2 border border-cyan-800/60 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{isFa ? 'دانلود رزومه (PDF)' : 'Resume (PDF)'}</span>
              </a>

              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center space-x-2 border border-slate-800 transition active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>{isFa ? 'ارتباط مستقیم' : 'Get in Touch'}</span>
              </button>
            </div>

            {/* 6 Circular Social Profile Badges */}
            <SocialProfileBadges className="pt-2" size="md" />

            {/* Quick Command Hint */}
            <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-slate-500">
              <span>
                {isFa ? 'برای باز کردن پالت دستورات کلیدهای ' : 'Press '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono">
                  Ctrl + K
                </kbd>
                {isFa ? ' را فشار دهید' : ' for Command Palette'}
              </span>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Terminal */}
          <div className="lg:col-span-6 w-full">
            <TerminalView
              onSelectProject={onSelectProject}
              onNavigateSection={onNavigateSection}
              onOpenContact={onOpenContact}
              onToggleTheme={onToggleTheme}
              isFocusMode={isFocusMode}
              onToggleFocusMode={onToggleFocusMode}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
