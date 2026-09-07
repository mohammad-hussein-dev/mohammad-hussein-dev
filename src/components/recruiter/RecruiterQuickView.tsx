import React from 'react';
import { PROFILE, PROJECTS, Project } from '../../data/portfolioData';
import { Briefcase, Download, Mail, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface RecruiterQuickViewProps {
  onOpenContact: () => void;
  onSelectProject: (project: Project) => void;
}

export const RecruiterQuickView: React.FC<RecruiterQuickViewProps> = ({ onOpenContact, onSelectProject }) => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  return (
    <div className="bg-[#0b101c] border border-cyan-500/40 rounded-xl p-5 sm:p-6 mb-12 shadow-xl shadow-cyan-950/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cyan-900/50 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              {isFa ? 'داشبورد دسترسی سریع کارفرمایان و مدیران فنی' : 'Recruiter & Hiring Manager Fast-Track'}
            </h3>
            <p className="text-xs text-slate-400">
              {isFa ? 'خلاصه اجرایی شاخص‌های کلیدی جهت بررسی سریع تیم فنی' : 'Executive summary for engineering leads & technical recruiters'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <a
            href={PROFILE.resumeUrl}
            download="Mohammad_Hussein_Resume.pdf"
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isFa ? 'دانلود رزومه (PDF)' : 'Download Resume (PDF)'}</span>
          </a>
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-lg bg-[#162238] hover:bg-[#1d2d4a] text-cyan-300 text-xs font-mono flex items-center space-x-1.5 border border-cyan-700/60 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isFa ? 'تنظیم مصاحبه / پیام' : 'Schedule Intro'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {/* Core Stack */}
        <div className="bg-[#070b13] p-4 rounded-lg border border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-2">
            {isFa ? 'جایگاه‌های شغلی و مهارت‌ها' : 'Target Roles & Stack'}
          </div>
          <div className="text-xs font-semibold text-slate-200 mb-2 font-mono">
            {isFa ? 'مهندس ارشد بک‌اند / پایتون / سیستم‌های هوش مصنوعی' : 'Backend Engineer / Python Developer / AI Systems'}
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'pytest'].map(t => (
              <span key={t} className="px-2 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-900/60">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Proven Metrics */}
        <div className="bg-[#070b13] p-4 rounded-lg border border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-2">
            {isFa ? 'شاخص‌های عملیاتی اثبات‌شده' : 'Production Track Record'}
          </div>
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isFa ? '۵+ سرویس بک‌اند مستقر در پروداکشن' : '5+ Production APIs Deployed'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isFa ? 'استاندارد پوشش تست ۹۶٪+ با pytest' : '96%+ Test Coverage Standard'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isFa ? '۴۰٪ کاهش زمان تاخیر کوئری‌ها با کش Redis' : '40% Latency Drop via Indexing & Redis'}</span>
            </div>
          </div>
        </div>

        {/* Top 2 Recommended Case Studies */}
        <div className="bg-[#070b13] p-4 rounded-lg border border-slate-800">
          <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 mb-2">
            {isFa ? 'معماری‌های کلیدی پیشنهادی' : 'Key Architecture Reviews'}
          </div>
          <div className="space-y-2">
            {PROJECTS.slice(0, 2).map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="w-full text-left p-2 rounded bg-[#0b101c] hover:bg-[#11192b] border border-slate-800 hover:border-cyan-800/60 transition flex items-center justify-between text-xs font-mono"
              >
                <span className="text-slate-200 truncate pr-2">{p.title}</span>
                <span className="text-cyan-400 shrink-0">{isFa ? 'بررسی ←' : 'Review →'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

