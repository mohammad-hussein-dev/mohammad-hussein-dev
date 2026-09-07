import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Search,
  Sun,
  Moon,
  Download,
  Briefcase,
  Sparkles,
  Code2,
  FlaskConical,
  Cpu,
  User,
  GitPullRequest,
  Zap,
  Mail,
  ChevronRight,
  ShieldCheck,
  Command,
  Globe,
  Languages,
  X
} from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPalette: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
  onToggleRecruiterMode: () => void;
  isRecruiterMode: boolean;
  onToggleFocusMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateSection,
  onOpenPalette,
  onToggleTheme,
  isDark,
  onToggleRecruiterMode,
  isRecruiterMode,
  onToggleFocusMode,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const isFa = language === 'fa';

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: isFa ? 'پروژه‌ها' : 'Projects', href: '#projects', icon: Code2, badge: '4 Core' },
    { label: isFa ? 'آزمایشگاه فیزیک' : 'Science Lab', href: '#science', icon: FlaskConical, badge: 'PINN & RK4' },
    { label: isFa ? 'تکنولوژی‌ها' : 'Stack', href: '#skills', icon: Cpu, badge: 'Architecture' },
    { label: isFa ? 'درباره من' : 'About', href: '#about', icon: User, badge: 'Bio' },
    { label: isFa ? 'متن‌باز' : 'Open Source', href: '#opensource', icon: GitPullRequest, badge: 'Repos' },
    { label: isFa ? 'خدمات' : 'Services', href: '#services', icon: Zap, badge: 'Contracts' },
    { label: isFa ? 'تماس' : 'Contact', href: '#contact', icon: Mail, badge: 'Direct' },
  ];

  const handleLinkClick = (href: string) => {
    onNavigateSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#070a12]/95 backdrop-blur-md border-b border-cyan-950/70 shadow-lg shadow-black/50 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('#')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-950/90 border border-cyan-500/60 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_14px_rgba(0,229,255,0.45)] transition">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider font-mono text-white group-hover:text-cyan-300 transition">
              MH<span className="text-cyan-400">://</span>DEV
            </div>
            <div className="text-[10px] font-mono text-slate-400 leading-none">
              {isFa ? 'مهندسی بک‌اند و هوش مصنوعی' : 'Backend & AI'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs text-slate-300 bg-[#060910]/70 px-3 py-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="px-3 py-1 rounded-full hover:text-cyan-300 hover:bg-slate-800/70 transition"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Quick Actions */}
        <div className="hidden sm:flex items-center space-x-2 font-mono text-xs">
          {/* Language Toggle: FA <-> EN */}
          <button
            onClick={toggleLanguage}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition active:scale-95 shadow-xs ${
              isFa
                ? 'bg-cyan-950/70 hover:bg-cyan-900/60 text-cyan-300 border-cyan-500/60 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                : 'bg-[#090e18] hover:bg-[#11192b] text-slate-300 hover:text-cyan-300 border-slate-800 hover:border-cyan-800'
            }`}
            title={isFa ? 'Switch to English (EN)' : 'تغییر به فارسی (FA)'}
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold tracking-wider font-mono">{isFa ? 'FA' : 'EN'}</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-[#060910] text-cyan-400/80 border border-cyan-950">
              {isFa ? 'EN' : 'FA'}
            </span>
          </button>

          {/* Recruiter Fast-track Toggle */}
          <button
            onClick={onToggleRecruiterMode}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1.5 transition ${
              isRecruiterMode
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-xs shadow-cyan-500/30 font-semibold'
                : 'bg-[#090e18] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
            title="Toggle Recruiter Executive Summary View"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isFa ? 'حالت کارفرما' : 'Recruiter View'}</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenPalette}
            className="px-2.5 py-1.5 rounded-lg bg-[#090e18] hover:bg-[#11192b] text-slate-300 border border-slate-800 hover:border-cyan-800 flex items-center space-x-2 transition"
            title="Command Palette (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <kbd className="text-[10px] text-slate-500 px-1 py-0.5 rounded bg-slate-900 border border-slate-800">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-[#090e18] hover:bg-[#11192b] text-slate-400 hover:text-amber-300 border border-slate-800 transition"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Resume Download */}
          <a
            href={PROFILE.resumeUrl}
            download="Mohammad_Hussein_Resume.pdf"
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center space-x-1.5 transition active:scale-95 shadow-md shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isFa ? 'رزومه' : 'Resume'}</span>
          </a>
        </div>

        {/* Mobile Header Controls: Lang + Search + Hamburger */}
        <div className="flex items-center space-x-2 sm:hidden">
          <button
            onClick={toggleLanguage}
            className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold active:scale-95 transition flex items-center space-x-1 ${
              isFa
                ? 'bg-cyan-950/80 border-cyan-500/70 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                : 'bg-[#090e18] border-slate-800 text-slate-300'
            }`}
            title="Toggle Language (FA / EN)"
          >
            <Languages className="w-3 h-3 text-cyan-400" />
            <span>{isFa ? 'FA' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenPalette}
            aria-label="Open Command Palette"
            className="p-2 rounded-lg bg-[#090e18] border border-cyan-900/50 text-cyan-400 active:scale-95 transition"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Morphing Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="relative w-9 h-9 rounded-lg bg-[#090e18] border border-cyan-900/60 hover:border-cyan-500 flex flex-col items-center justify-center space-y-1.5 p-2 active:scale-95 transition-all shadow-xs"
          >
            <span
              className={`w-4.5 h-0.5 bg-cyan-400 rounded-full block transform transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-3.5 h-0.5 bg-cyan-300 rounded-full block transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0 -translate-x-2' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4.5 h-0.5 bg-cyan-400 rounded-full block transform transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Advanced Animated Mobile Sheet Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[53px] bg-black/70 backdrop-blur-sm z-30 sm:hidden animate-fade-in"
          />

          {/* Slide Down Mobile Drawer */}
          <div className="relative z-40 sm:hidden bg-[#070a14]/98 backdrop-blur-2xl border-b border-cyan-950/80 shadow-2xl shadow-cyan-950/50 overflow-hidden transition-all duration-300">
            <div className="max-h-[82vh] overflow-y-auto px-4 pt-3 pb-6 space-y-4 font-mono text-xs">
              {/* System Status Header */}
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0b101c] border border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-slate-300 font-semibold">MH-ARCH-SYSTEM</span>
                </div>
                <span className="text-cyan-400 text-[10px]">ONLINE · Wayland</span>
              </div>

              {/* Main Nav Links with Icons & Badges */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const IconComp = link.icon;
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#0c1322] border border-transparent hover:border-cyan-900/60 text-slate-200 active:bg-cyan-950/50 transition group select-none"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-lg bg-[#0d1424] border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/60 group-hover:text-cyan-300 transition">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-sm group-hover:text-white transition">
                          {link.label}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {link.badge}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Utility Section */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  {/* Recruiter fast-track button */}
                  <button
                    onClick={() => {
                      onToggleRecruiterMode();
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl border text-xs font-semibold transition ${
                      isRecruiterMode
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                        : 'bg-[#090e18] text-slate-300 border-slate-800 hover:border-cyan-900'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isFa ? 'حالت کارفرما' : 'Recruiter View'}</span>
                  </button>

                  {/* Theme switcher */}
                  <button
                    onClick={onToggleTheme}
                    className="flex items-center justify-center space-x-2 p-2.5 rounded-xl bg-[#090e18] border border-slate-800 text-slate-300 hover:border-cyan-900 text-xs transition"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Resume PDF Download CTA */}
                <a
                  href={PROFILE.resumeUrl}
                  download="Mohammad_Hussein_Resume.pdf"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 transition active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>{isFa ? 'دانلود رزومه رسمی (PDF)' : 'Download Official Resume (PDF)'}</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
