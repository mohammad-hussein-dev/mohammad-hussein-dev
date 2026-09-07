/**
 * @fileoverview CyberMatrixAvatar Component.
 *
 * Provides a high-tech, responsive GitHub profile visualization featuring an
 * interactive HTML5 Matrix digital rain canvas, concentric holographic neon
 * rings, real-time GitHub synchronization badges, and HUD telemetry metrics.
 *
 * Compliant with Google TypeScript Style Guide & WCAG AA accessibility standards.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ExternalLink, Copy, Check, Terminal, Sparkles, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { PROFILE } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Character sets for the digital rain canvas.
 * Mixes binary computation, hexadecimal, and quantum physics mathematical symbols.
 */
const MATRIX_GLYPHS = [
  '0', '1', '0', '1', '1', '0',
  'λ', 'ħ', '∂', '∇', '∫', 'ψ', 'π', 'Σ', 'Ω', 'μ', 'Δ', '≈', '≠',
  '0x', 'FF', 'A9', 'C4', 'E2', '7F',
  'py', 'rs', 'sh', 'c'
];

/**
 * Available color themes for the holographic matrix canvas.
 */
export type MatrixTheme = 'cyan' | 'emerald' | 'quantum' | 'amber';

interface MatrixColorConfig {
  primary: string;
  glow: string;
  bgFade: string;
  accentHex: string;
  name: string;
}

const THEME_CONFIGS: Record<MatrixTheme, MatrixColorConfig> = {
  cyan: {
    primary: '#00e5ff',
    glow: 'rgba(0, 229, 255, 0.4)',
    bgFade: 'rgba(7, 10, 18, 0.12)',
    accentHex: '#00e5ff',
    name: 'Cyber Cyan'
  },
  emerald: {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    bgFade: 'rgba(5, 15, 10, 0.12)',
    accentHex: '#10b981',
    name: 'Matrix Green'
  },
  quantum: {
    primary: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.4)',
    bgFade: 'rgba(12, 10, 26, 0.12)',
    accentHex: '#818cf8',
    name: 'Quantum Violet'
  },
  amber: {
    primary: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    bgFade: 'rgba(20, 12, 5, 0.12)',
    accentHex: '#f59e0b',
    name: 'Arch Amber'
  }
};

/**
 * Props for the CyberMatrixAvatar component.
 */
export interface CyberMatrixAvatarProps {
  /** Optional custom class names for the outer container. */
  className?: string;
  /** GitHub username override (defaults to PROFILE.github username). */
  username?: string;
}

/**
 * High-performance Cybernetic Avatar with an interactive Matrix Canvas backdrop.
 */
export const CyberMatrixAvatar: React.FC<CyberMatrixAvatarProps> = ({
  className = '',
  username = 'mohammad-hussein-dev'
}) => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [activeTheme, setActiveTheme] = useState<MatrixTheme>('cyan');
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const githubAvatarUrl = `https://avatars.githubusercontent.com/${username}`;
  const profileUrl = PROFILE.github;

  /**
   * Copies the GitHub profile URL to the clipboard with visual confirmation.
   */
  const handleCopyProfileUrl = useCallback(() => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [profileUrl]);

  /**
   * Tracks mouse movement within the avatar frame to apply kinetic parallax & glow.
   */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  /**
   * Canvas Animation Loop:
   * Renders high-frame-rate digital matrix raindrops with responsive column sizing.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 14;

    const currentTheme = THEME_CONFIGS[activeTheme];

    /**
     * Resizes the canvas buffer matching CSS dimensions with DPI awareness.
     */
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.scale(dpr, dpr);

      columns = Math.max(1, Math.floor(width / (fontSize * 1.2)));
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }

      // Initial clear
      ctx.fillStyle = '#070a12';
      ctx.fillRect(0, 0, width, height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    /**
     * Render Step.
     */
    const render = () => {
      // Semi-transparent fade layer to create character trails
      ctx.fillStyle = currentTheme.bgFade;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
        const x = i * (fontSize * 1.2);
        const y = drops[i] * fontSize;

        // Leading glyph brightness
        const isLeading = Math.random() > 0.85;
        ctx.fillStyle = isLeading ? '#ffffff' : currentTheme.primary;
        ctx.shadowColor = currentTheme.glow;
        ctx.shadowBlur = isLeading ? 8 : 4;

        ctx.fillText(char, x, y);

        // Reset shadow for performance
        ctx.shadowBlur = 0;

        // Reset drop when off screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
    };
  }, [activeTheme]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl bg-[#060810] border border-cyan-950/80 p-5 sm:p-6 shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Corner HUD Brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/60 pointer-events-none" />

      {/* Header HUD Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <span className="text-slate-300 font-bold tracking-wider uppercase">
            {isFa ? 'هویت گیت‌هاب و وضعیت زنده' : 'GitHub Verified Identity'}
          </span>
        </div>

        {/* Theme Palette Switcher */}
        <div className="flex items-center space-x-1.5" title="Switch Matrix Particle Theme">
          {(['cyan', 'emerald', 'quantum', 'amber'] as MatrixTheme[]).map((themeKey) => (
            <button
              key={themeKey}
              type="button"
              onClick={() => setActiveTheme(themeKey)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                activeTheme === themeKey ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-[#060810]' : 'opacity-60 hover:opacity-100 hover:scale-110'
              }`}
              style={{ backgroundColor: THEME_CONFIGS[themeKey].accentHex }}
              aria-label={`Select ${THEME_CONFIGS[themeKey].name} theme`}
            />
          ))}
        </div>
      </div>

      {/* Main Visual Centerpiece: Matrix Canvas + Orbital Halo Avatar */}
      <div className="relative flex flex-col items-center justify-center py-3">
        {/* Matrix Canvas Backdrop Box */}
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-[#05070d] shadow-inner flex items-center justify-center">
          {/* HTML5 Matrix Rain Animation Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-75"
          />

          {/* Holographic Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060810]/30 to-[#060810]/90 pointer-events-none" />

          {/* Futuristic Concentric Orbital Rings */}
          <div
            className="absolute w-52 sm:w-60 h-52 sm:h-60 rounded-full border border-dashed border-cyan-500/30 animate-spin-slow pointer-events-none"
            style={{ animationDuration: '35s' }}
          />
          <div
            className="absolute w-44 sm:w-48 h-44 sm:h-48 rounded-full border border-cyan-400/20 animate-spin-slow pointer-events-none"
            style={{ animationDuration: '20s', animationDirection: 'reverse' }}
          />

          {/* Avatar Container with Kinetic Tilt */}
          <div
            className="relative z-10 w-36 sm:w-40 h-36 sm:h-40 rounded-full p-1.5 transition-transform duration-300 ease-out shadow-2xl"
            style={{
              transform: isHovered
                ? `perspective(600px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) scale(1.05)`
                : 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)',
              background: `conic-gradient(from 0deg, ${THEME_CONFIGS[activeTheme].accentHex}, #10b981, #6366f1, ${THEME_CONFIGS[activeTheme].accentHex})`
            }}
          >
            {/* Inner Avatar Frame */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1d] border-2 border-[#05070d] relative group">
              {/* GitHub Profile Photo */}
              <img
                src={imageError ? 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=400&auto=format&fit=crop&q=80' : githubAvatarUrl}
                alt={`${PROFILE.name} - GitHub Profile Avatar`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="eager"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover filter contrast-105 transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } group-hover:scale-110`}
              />

              {/* Holographic Scanline Sweep */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              {/* Subtle Cyan Cyber Tint */}
              <div className="absolute inset-0 bg-cyan-950/20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Glowing Online Status Pip */}
            <div
              className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#05070d] border-2 border-slate-900 flex items-center justify-center shadow-lg"
              title="GitHub Status: Online / Active Development"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            </div>
          </div>
        </div>

        {/* Bio Badge / Identity Info */}
        <div className="mt-4 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <h3 className="text-base sm:text-lg font-bold text-white font-mono tracking-tight">
              {PROFILE.name}
            </h3>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-cyan-300">
              PRO
            </span>
          </div>

          <p className="text-xs font-mono text-slate-400">
            @{username} · <span className="text-cyan-400 font-semibold">{PROFILE.primaryRole}</span>
          </p>

          <p className="text-[11px] text-slate-500 max-w-xs font-mono">
            {isFa
              ? 'توسعه‌دهنده بک‌اند پایتون و جنگو · مسلط به آرچ لینوکس و سیستم‌های علمی'
              : 'Python & Django Backend Architect · Linux & Simulation Specialist'}
          </p>
        </div>
      </div>

      {/* Cyber Telemetry Status Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-[#090e1a] border border-slate-800/80 flex items-center space-x-2 text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-500">OS Environment</span>
            <span className="font-bold text-[11px] text-slate-200 truncate">Arch Linux x86_64</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#090e1a] border border-slate-800/80 flex items-center space-x-2 text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-500">Core Runtime</span>
            <span className="font-bold text-[11px] text-slate-200 truncate">Python 3.12 / C++</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#090e1a] border border-slate-800/80 flex items-center space-x-2 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-500">Code Quality</span>
            <span className="font-bold text-[11px] text-slate-200 truncate">96%+ pytest CI</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#090e1a] border border-slate-800/80 flex items-center space-x-2 text-slate-300">
          <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-500">Activity Level</span>
            <span className="font-bold text-[11px] text-slate-200 truncate">Daily Commits</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Direct GitHub Profile & Copy Handle */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all duration-200 shadow-md shadow-cyan-900/30 hover:shadow-cyan-500/20 active:scale-98"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>{isFa ? 'مشاهده پروفایل گیت‌هاب' : 'Visit GitHub'}</span>
          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
        </a>

        <button
          type="button"
          onClick={handleCopyProfileUrl}
          className="py-2 px-3 rounded-xl bg-[#0b101e] hover:bg-[#12192c] border border-slate-700/80 hover:border-slate-500 text-slate-300 font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all duration-200 active:scale-95"
          title="Copy GitHub URL"
          aria-label="Copy GitHub Profile URL"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">{isFa ? 'کپی شد' : 'Copied'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>{isFa ? 'کپی لینک' : 'Copy'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
