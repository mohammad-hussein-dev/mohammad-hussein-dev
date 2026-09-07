import React from 'react';
import { Languages, Globe, Sparkles } from 'lucide-react';
import { Language } from '../../data/translations';

interface LanguageToggleEffectProps {
  language: Language;
  isActive: boolean;
}

export const LanguageToggleEffect: React.FC<LanguageToggleEffectProps> = ({ language, isActive }) => {
  if (!isActive) return null;

  const isFa = language === 'fa';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-start justify-center pt-20 px-4">
      {/* Dynamic Toast Pill */}
      <div
        className={`relative px-5 py-3 rounded-2xl shadow-2xl border flex items-center space-x-3 transition-all duration-300 transform animate-in fade-in slide-in-from-top-4 ${
          isFa
            ? 'bg-[#09131e]/95 border-cyan-400/70 text-white shadow-cyan-950/70'
            : 'bg-[#0b101c]/95 border-indigo-400/60 text-white shadow-indigo-950/70'
        }`}
        style={{
          fontFamily: isFa
            ? 'Vazirmatn, system-ui, -apple-system, sans-serif'
            : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Glow icon badge */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isFa
              ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-400/60 shadow-[0_0_16px_rgba(34,211,238,0.45)]'
              : 'bg-indigo-950/90 text-indigo-300 border border-indigo-400/60 shadow-[0_0_16px_rgba(129,140,248,0.45)]'
          }`}
        >
          {isFa ? (
            <span className="font-bold text-xs font-mono tracking-wider">FA</span>
          ) : (
            <span className="font-bold text-xs font-mono tracking-wider">EN</span>
          )}
        </div>

        {/* Text Details with High Contrast */}
        <div className="flex flex-col pr-1 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold tracking-tight">
              {isFa ? 'زبان فارسی فعال شد' : 'English Mode Activated'}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                isFa
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80'
                  : 'bg-indigo-950 text-indigo-300 border border-indigo-800/80'
              }`}
            >
              {isFa ? 'RTL · فارسی' : 'LTR · EN'}
            </span>
          </div>
          <span className="text-xs mt-0.5 text-slate-300">
            {isFa
              ? 'چیدمان راست‌به‌چپ با فونت استاندارد وزیرمتن'
              : 'Left-to-Right engineering layout with JetBrains Mono'}
          </span>
        </div>
      </div>
    </div>
  );
};
