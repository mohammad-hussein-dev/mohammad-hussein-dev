import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { RecruiterQuickView } from './components/recruiter/RecruiterQuickView';
import { ProjectExplorer } from './components/projects/ProjectExplorer';
import { CaseStudyModal } from './components/projects/CaseStudyModal';
import { ScienceLab } from './components/science/ScienceLab';
import { EngineeringStack } from './components/skills/EngineeringStack';
import { AboutSection } from './components/about/AboutSection';
import { OpenSourceSection } from './components/opensource/OpenSourceSection';
import { TechnicalCommunication } from './components/communication/TechnicalCommunication';
import { WhatICanBuild } from './components/client/WhatICanBuild';
import { ContactSection } from './components/contact/ContactSection';
import { CommandPalette } from './components/palette/CommandPalette';
import { ThemeToggleEffect } from './components/common/ThemeToggleEffect';
import { LanguageToggleEffect } from './components/common/LanguageToggleEffect';
import { useLanguage } from './context/LanguageContext';
import { Project } from './data/portfolioData';

export const App: React.FC = () => {
  const { language, languageTransitionFlash } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mh_portfolio_theme');
      if (saved) return saved === 'dark';
      return !window.matchMedia('(prefers-color-scheme: light)').matches;
    }
    return true;
  });
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [isTerminalFocusMode, setIsTerminalFocusMode] = useState(false);
  const [themeTransitionFlash, setThemeTransitionFlash] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('mh_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
      localStorage.setItem('mh_portfolio_theme', 'light');
    }
  }, [isDark]);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === '#' || !sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleTheme = (mode?: string) => {
    // Elegant transition flash trigger
    setThemeTransitionFlash(true);
    setTimeout(() => setThemeTransitionFlash(false), 500);

    const changeTheme = () => {
      if (mode === 'dark') setIsDark(true);
      else if (mode === 'light') setIsDark(false);
      else setIsDark(prev => !prev);
    };

    // Use modern View Transition API if supported
    if ('startViewTransition' in document && typeof (document as any).startViewTransition === 'function') {
      (document as any).startViewTransition(() => {
        changeTheme();
      });
    } else {
      changeTheme();
    }
  };

  const handleExecuteCommandInTerminal = (cmd: string) => {
    // Scroll to terminal if needed
    const terminalEl = document.getElementById('terminal-container');
    if (terminalEl) {
      terminalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    handleNavigateSection('#contact');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-white font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        onNavigateSection={handleNavigateSection}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onToggleTheme={() => handleToggleTheme()}
        isDark={isDark}
        onToggleRecruiterMode={() => setIsRecruiterMode(prev => !prev)}
        isRecruiterMode={isRecruiterMode}
        onToggleFocusMode={() => setIsTerminalFocusMode(prev => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Embedded MH-SHELL */}
        <Hero
          onSelectProject={(project) => setSelectedProject(project)}
          onNavigateSection={handleNavigateSection}
          onOpenContact={handleOpenContact}
          onToggleTheme={handleToggleTheme}
          onOpenPalette={() => setIsPaletteOpen(true)}
          isFocusMode={isTerminalFocusMode}
          onToggleFocusMode={() => setIsTerminalFocusMode(prev => !prev)}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Recruiter Fast-Track (Toggled or inline banner) */}
          {isRecruiterMode && (
            <RecruiterQuickView
              onOpenContact={handleOpenContact}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}
        </div>

        {/* Project Explorer & Deep Technical Case Studies */}
        <ProjectExplorer onSelectProject={(project) => setSelectedProject(project)} />

        {/* Interactive Physics & Math Science Lab */}
        <ScienceLab />

        {/* Engineering Stack & Principles */}
        <EngineeringStack />

        {/* Engineering Identity & Mindset Flow */}
        <AboutSection />

        {/* Merged Open Source Pull Requests */}
        <OpenSourceSection />

        {/* Technical Communication & Localization */}
        <TechnicalCommunication />

        {/* What I Can Build (Client Solutions) */}
        <WhatICanBuild onOpenContact={handleOpenContact} />

        {/* Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Modal Drawer */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Command Palette Modal (Ctrl + K) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
        onNavigateSection={handleNavigateSection}
        onExecuteCommand={handleExecuteCommandInTerminal}
      />

      {/* Dynamic Luminous Theme Switch Effect */}
      <ThemeToggleEffect isDark={isDark} isActive={themeTransitionFlash} />

      {/* Dynamic Language Switch Notification Effect */}
      <LanguageToggleEffect language={language} isActive={languageTransitionFlash} />
    </div>
  );
};
