/**
 * @fileoverview Navbar — Floating Command Capsule.
 * @description
 *   A sci-fi themed floating header that occupies a compact capsule
 *   centered at the top of the viewport. Houses:
 *     - Brand mark (MH://DEV)
 *     - Sector navigation (01–07) with abbreviated codes + icons
 *     - Quick actions (⌘K, theme, language, resume)
 *
 *   Active section is tracked via IntersectionObserver so the current
 *   sector pulses subtly.
 *
 *   Mobile (< lg): collapses to a slim top bar with a full-screen
 *   drawer that mirrors the desktop actions.
 *
 * Design tokens:
 *   - Uses CSS variables (--bg-primary, --accent-cyan, ...) where
 *     possible; falls back to slate/cyan utilities for glows.
 *   - RTL-safe via logical properties.
 *   - All colors respect dark/light theme.
 *
 * @author    Mohammad Hussein
 * @version   3.0.0 (Floating Command Capsule)
 * @since     2026-09-15
 */

import React, { useEffect, useState } from 'react';
import {
  Terminal, Search, Sun, Moon, Download, Briefcase,
  Code2, FlaskConical, Cpu, User, GitPullRequest, Zap, Mail,
  ChevronRight, Languages, X, LayoutGrid,
} from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

// ─── Types ──────────────────────────────────────────────────────────────

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPalette: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onToggleRecruiterMode: () => void;
  isRecruiterMode: boolean;
  onToggleFocusMode: () => void;
}

interface SectorConfig {
  /** Two-digit sector number (01–07). */
  num: string;
  /** Three-letter code (uppercase). */
  code: string;
  /** Target hash, e.g. `#projects`. */
  href: string;
  /** Translation key inside `t.nav`. */
  labelKey: 'projects' | 'scienceLab' | 'stack' | 'about' | 'opensource' | 'services' | 'contact';
  /** Badge translation key. */
  badgeKey: 'badgeCore' | 'badgePinnRk4' | 'badgeArchitecture' | 'badgeBio' | 'badgeRepos' | 'badgeContracts' | 'badgeDirect';
  /** Lucide icon. */
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

// ─── Sector Map ─────────────────────────────────────────────────────────

const SECTORS: SectorConfig[] = [
  { num: '01', code: 'PRJ', href: '#projects',   labelKey: 'projects',   badgeKey: 'badgeCore',         icon: Code2 },
  { num: '02', code: 'SCI', href: '#science',    labelKey: 'scienceLab', badgeKey: 'badgePinnRk4',      icon: FlaskConical },
  { num: '03', code: 'TCH', href: '#skills',     labelKey: 'stack',      badgeKey: 'badgeArchitecture', icon: Cpu },
  { num: '04', code: 'ABT', href: '#about',      labelKey: 'about',      badgeKey: 'badgeBio',          icon: User },
  { num: '05', code: 'OSS', href: '#opensource', labelKey: 'opensource', badgeKey: 'badgeRepos',        icon: GitPullRequest },
  { num: '06', code: 'SRV', href: '#services',   labelKey: 'services',   badgeKey: 'badgeContracts',    icon: Zap },
  { num: '07', code: 'CTC', href: '#contact',    labelKey: 'contact',    badgeKey: 'badgeDirect',       icon: Mail },
];

// ─── Component ──────────────────────────────────────────────────────────

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  onOpenPalette,
  onToggleTheme,
  isDark,
  onToggleRecruiterMode,
  isRecruiterMode,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const isFa = language === 'fa';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // ─── Scroll state ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Active section tracking ─────────────────────────────────────────
  useEffect(() => {
    const targets = SECTORS
      .map((s) => document.querySelector(s.href))
      .filter((el): el is Element => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ─── ESC + body lock for mobile drawer ───────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string): void => {
    onNavigateSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          FLOATING CAPSULE — always rendered, adapts on scroll
          ═══════════════════════════════════════════════════════════ */}
      <header
        className={[
          'fixed z-40 pointer-events-none',
          'top-2 sm:top-3',
          'start-2 end-2 sm:start-4 sm:end-4',
        ].join(' ')}
      >
        <div className="mx-auto max-w-[1400px] pointer-events-auto">
          <div
            className={[
              'flex items-center gap-2 rounded-2xl',
              'border backdrop-blur-xl',
              'transition-[padding,background-color,border-color,box-shadow] duration-300',
              isScrolled
                ? 'py-1.5 px-2 sm:px-3 bg-[#070a12]/92 border-cyan-950/80 shadow-lg shadow-black/40'
                : 'py-2 px-2.5 sm:px-3.5 bg-[#070a12]/70 border-cyan-950/50',
            ].join(' ')}
          >
            {/* ── BRAND MARK ─────────────────────────────────────── */}
            <button
              type="button"
              onClick={() => handleLinkClick('#')}
              className="flex items-center gap-2 shrink-0 select-none group cursor-pointer"
              aria-label={isFa ? 'خانه' : 'Home'}
            >
              <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_14px_rgba(0,229,255,0.45)] transition">
                <Terminal className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="hidden md:block text-sm font-bold tracking-wider font-mono text-white group-hover:text-cyan-300 transition whitespace-nowrap">
                MH<span className="text-cyan-400">://</span>DEV
              </span>
            </button>

            {/* ── SECTOR NAV (desktop) ───────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-0.5 mx-auto bg-[#050810]/70 rounded-xl p-1 border border-slate-800/70"
              aria-label={isFa ? 'ناوبری اصلی' : 'Main navigation'}
            >
              {SECTORS.map((s) => {
                const isActive = activeSection === s.href;
                const Icon = s.icon;
                return (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => handleLinkClick(s.href)}
                    aria-current={isActive ? 'true' : undefined}
                    title={t.nav[s.labelKey]}
                    className={[
                      'group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg',
                      'text-[11px] font-mono uppercase tracking-wider',
                      'transition-all cursor-pointer whitespace-nowrap',
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50 border border-transparent',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'text-[9px] font-bold tracking-tight',
                        isActive ? 'text-cyan-500' : 'text-slate-600 group-hover:text-cyan-500/70',
                      ].join(' ')}
                    >
                      {s.num}
                    </span>
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    <span className="hidden xl:inline">{s.code}</span>

                    {/* Pulsing indicator for active sector */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 start-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.8)]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── QUICK ACTIONS (desktop) ─────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0">
              {/* Command palette */}
              <button
                type="button"
                onClick={onOpenPalette}
                title={t.nav.paletteTitle}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#050810]/70 hover:bg-[#0c1322] text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-800/70 transition cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <kbd className="text-[10px] font-mono text-slate-500">⌘K</kbd>
              </button>

              {/* Language */}
              <button
                type="button"
                onClick={toggleLanguage}
                title={isFa ? t.nav.langSwitchToEn : t.nav.langSwitchToFa}
                className={[
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-bold transition cursor-pointer',
                  isFa
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/50'
                    : 'bg-[#050810]/70 text-slate-400 border-slate-800 hover:text-cyan-300 hover:border-cyan-800/70',
                ].join(' ')}
              >
                <Languages className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isFa ? 'FA' : 'EN'}</span>
              </button>

              {/* Theme */}
              <button
                type="button"
                onClick={onToggleTheme}
                title={isDark ? t.nav.themeTitleToLight : t.nav.themeTitleToDark}
                className="p-2 rounded-lg bg-[#050810]/70 hover:bg-[#0c1322] text-slate-400 hover:text-amber-300 border border-slate-800 hover:border-amber-800/50 transition cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5" aria-hidden="true" /> : <Moon className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>

              {/* Resume */}
              <a
                href={PROFILE.resumeUrl}
                download="Mohammad_Hussein_Resume.pdf"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] font-mono transition shadow-md shadow-cyan-500/20 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.nav.resume}</span>
              </a>
            </div>

            {/* ── MOBILE QUICK BAR (< lg) ─────────────────────────── */}
            <div className="flex lg:hidden items-center gap-1.5 ms-auto shrink-0">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={isFa ? t.nav.langSwitchToEn : t.nav.langSwitchToFa}
                className={[
                  'px-2 py-1.5 rounded-lg border text-[11px] font-mono font-bold transition cursor-pointer',
                  isFa
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60'
                    : 'bg-[#050810]/70 text-slate-400 border-slate-800',
                ].join(' ')}
              >
                {isFa ? 'FA' : 'EN'}
              </button>

              <button
                type="button"
                onClick={onOpenPalette}
                aria-label={t.nav.openPalette}
                className="p-2 rounded-lg bg-[#050810]/70 border border-cyan-900/50 text-cyan-400 active:scale-95 transition cursor-pointer"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={t.nav.toggleMenu}
                className="p-2 rounded-lg bg-[#050810]/70 border border-cyan-900/60 text-cyan-400 active:scale-95 transition cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE DRAWER — full-screen overlay
          ═══════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          <div className="fixed inset-x-2 top-2 bottom-2 z-50 lg:hidden bg-[#070a12]/98 backdrop-blur-2xl border border-cyan-950/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-950/60">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-300">
                  {t.nav.systemOnline} · {t.nav.systemWayland}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={isFa ? 'بستن' : 'Close'}
                className="p-2 rounded-lg bg-[#090e18] border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Sectors list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 font-mono">
              {SECTORS.map((s) => {
                const isActive = activeSection === s.href;
                const Icon = s.icon;
                return (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => handleLinkClick(s.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'w-full flex items-center justify-between py-2.5 px-3 rounded-xl border transition',
                      'cursor-pointer group',
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/40'
                        : 'border-transparent hover:bg-[#0c1322] hover:border-cyan-900/60',
                    ].join(' ')}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#0d1424] border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/60 transition">
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold text-cyan-500/70 tracking-tight">
                          {s.num}
                        </span>
                        <span className={[
                          'text-sm font-semibold transition',
                          isActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white',
                        ].join(' ')}>
                          {t.nav[s.labelKey]}
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {t.nav[s.badgeKey]}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Drawer footer: actions */}
            <div className="border-t border-cyan-950/60 px-3 py-3 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { onToggleRecruiterMode(); setMobileMenuOpen(false); }}
                  className={[
                    'flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer',
                    isRecruiterMode
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                      : 'bg-[#090e18] text-slate-300 border-slate-800 hover:border-cyan-900',
                  ].join(' ')}
                >
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span>{t.nav.recruiterMode}</span>
                </button>

                <button
                  type="button"
                  onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#090e18] border border-slate-800 text-slate-300 hover:border-cyan-900 text-xs transition cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      <span>{t.nav.lightMode}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                      <span>{t.nav.darkMode}</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={PROFILE.resumeUrl}
                download="Mohammad_Hussein_Resume.pdf"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition active:scale-[0.98] text-sm"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{t.nav.resume}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
