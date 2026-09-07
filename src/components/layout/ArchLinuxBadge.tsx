import React, { useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const ArchLinuxBadge: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyArchInfo = () => {
    navigator.clipboard.writeText('OS: Arch Linux x86_64 | Kernel: Linux 7.1.8-arch1-3 | DE: KDE Plasma 6.7.4 | WM: KWin (Wayland)');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCopyArchInfo}
        className="group relative flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#080d19] border border-cyan-900/60 hover:border-cyan-400 text-slate-300 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] select-none cursor-pointer"
        title="Arch Linux Workstation (Click to copy specs)"
      >
        {/* Subtle Ambient Pulse Glow */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-500/30 to-blue-500/20 blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

        {/* Animated Arch Linux SVG Icon with Radar Orbit */}
        <div className="relative flex items-center justify-center w-5 h-5">
          {/* Subtle spinning radar orbit ring on hover */}
          <div className="absolute -inset-1 rounded-full border border-cyan-400/30 border-t-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" />

          {/* Arch Linux Pure Vector */}
          <svg
            className="w-4 h-4 text-cyan-400 fill-current drop-shadow-[0_0_6px_rgba(0,229,255,0.6)] group-hover:text-cyan-300 transition-colors"
            viewBox="0 0 24 24"
          >
            <path d="M11.39.605c-1.015.487-1.626 2.113-2.755 4.527.693.735 1.543 1.589 2.923 2.554-1.484-.61-2.496-1.224-3.253-1.86-1.445 3.016-3.71 7.312-8.305 15.569 3.612-2.085 6.412-3.37 9.02-3.862a4.5 4.5 0 0 1-.172-1.547l.004-.115c.058-2.315 1.26-4.095 2.687-3.973 1.426.12 2.534 2.096 2.478 4.41-.01.435-.06.854-.146 1.242 2.581.505 5.352 1.787 8.914 3.844-.702-1.293-1.33-2.459-1.928-3.57-.944-.73-1.927-1.682-3.933-2.712 1.38.358 2.367.77 3.136 1.233C13.97 7.01 13.48 5.504 11.39.605z" />
          </svg>
        </div>

        {/* Text Label */}
        <div className="flex items-center space-x-1.5 text-xs font-mono">
          <span className="font-semibold text-white group-hover:text-cyan-200 transition-colors">Arch Linux</span>
          <span className="text-cyan-500/70 text-[11px] hidden xs:inline font-mono">7.1.8-arch1-3</span>
        </div>

        {/* Live Pulse Dot */}
        <span className="relative flex h-2 w-2 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
      </button>

      {/* Floating Interactive Micro-Tooltip on Hover */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none whitespace-nowrap transition-all duration-200 ${
          isHovered
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <div className="px-3.5 py-2.5 rounded-xl bg-[#090e1a]/95 backdrop-blur-md border border-cyan-500/40 shadow-xl shadow-cyan-950/80 text-[11px] font-mono text-slate-200 flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1.5 text-cyan-300 font-bold">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>btw, i use arch</span>
          </div>
          <div className="text-[10px] text-slate-300 flex items-center space-x-1">
            <span>Linux 7.1.8-arch1-3 · Rolling Release</span>
          </div>
          <div className="text-[9px] text-cyan-400/90 flex items-center space-x-1">
            <span>KDE Plasma 6.7.4 · KWin (Wayland)</span>
          </div>
          {copied ? (
            <div className="text-[10px] text-emerald-400 flex items-center space-x-1 font-semibold pt-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Arch Linux specs copied to clipboard!</span>
            </div>
          ) : (
            <div className="text-[9px] text-slate-500 pt-0.5">
              Click to copy system specs
            </div>
          )}

          {/* Triangle pointer */}
          <div className="w-2 h-2 bg-[#090e1a] border-r border-b border-cyan-500/40 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};
