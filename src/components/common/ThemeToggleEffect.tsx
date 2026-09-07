import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface ThemeToggleEffectProps {
  isDark: boolean;
  isActive: boolean;
}

export const ThemeToggleEffect: React.FC<ThemeToggleEffectProps> = ({ isDark, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-start justify-center pt-20 px-4">
      {/* Dynamic Toast Pill */}
      <div
        className={`relative px-5 py-3 rounded-2xl shadow-2xl border flex items-center space-x-3 transition-all duration-300 transform animate-in fade-in slide-in-from-top-4 ${
          isDark
            ? 'bg-[#0b101c]/95 border-cyan-500/50 text-white shadow-cyan-950/60'
            : 'bg-white/98 border-amber-300/80 text-slate-900 shadow-slate-400/20'
        }`}
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Glow accent */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isDark
              ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.4)]'
              : 'bg-amber-100 text-amber-600 border border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
          }`}
        >
          {isDark ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          )}
        </div>

        {/* Text Details with High Legibility */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold tracking-tight">
              {isDark ? 'Dark Protocol Activated' : 'Light Mode Activated'}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isDark
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isDark ? 'Night' : 'Day'}
            </span>
          </div>
          <span
            className={`text-xs mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500 font-medium'
            }`}
          >
            {isDark ? 'High-contrast engineering workspace' : 'Clean & bright reading environment'}
          </span>
        </div>
      </div>
    </div>
  );
};
