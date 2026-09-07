import React, { useState, useEffect, useMemo } from 'react';
import { PROJECTS, PROFILE, Project } from '../../data/portfolioData';
import { Search, Terminal, FolderGit2, FileText, ArrowRight, X, Sparkles, ExternalLink } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
  onExecuteCommand: (cmd: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onNavigateSection,
  onExecuteCommand,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = useMemo(() => {
    const list: {
      id: string;
      category: 'Section' | 'Project' | 'Command' | 'Link';
      title: string;
      subtitle?: string;
      action: () => void;
    }[] = [
      // Sections
      { id: 'sec-projects', category: 'Section', title: 'Projects Explorer', subtitle: 'View production backend and scientific projects', action: () => onNavigateSection('#projects') },
      { id: 'sec-science', category: 'Section', title: 'Science & Physics Lab', subtitle: 'Interactive RK4 kinematics, GA & PINN visualizers', action: () => onNavigateSection('#science') },
      { id: 'sec-skills', category: 'Section', title: 'Engineering Stack', subtitle: 'Python, Django, FastAPI, PostgreSQL, Redis, Docker, PyTorch', action: () => onNavigateSection('#skills') },
      { id: 'sec-about', category: 'Section', title: 'About & Mindset', subtitle: 'Physics foundation and systems thinking', action: () => onNavigateSection('#about') },
      { id: 'sec-opensource', category: 'Section', title: 'Open Source Work', subtitle: 'Merged pull requests and contributions', action: () => onNavigateSection('#opensource') },
      { id: 'sec-services', category: 'Section', title: 'What I Can Build', subtitle: 'APIs, simulations, and scalable architectures', action: () => onNavigateSection('#services') },
      { id: 'sec-contact', category: 'Section', title: 'Contact & Collaboration', subtitle: 'Direct email, Telegram, and social links', action: () => onNavigateSection('#contact') },

      // Projects
      ...PROJECTS.map((p) => ({
        id: `prj-${p.id}`,
        category: 'Project' as const,
        title: p.title,
        subtitle: `${p.category} · ${p.technologies.slice(0, 3).join(', ')}`,
        action: () => onSelectProject(p),
      })),

      // Commands
      { id: 'cmd-neofetch', category: 'Command', title: 'neofetch / fastfetch', subtitle: 'Arch Linux system specs & developer info in terminal', action: () => onExecuteCommand('fastfetch') },
      { id: 'cmd-resume', category: 'Command', title: 'Download Resume (PDF)', subtitle: 'Mohammad Hussein official engineering resume', action: () => onExecuteCommand('resume') },
      { id: 'cmd-hire', category: 'Command', title: 'sudo hire-mohammad', subtitle: 'Recruiter fast-track easter egg', action: () => onExecuteCommand('sudo hire-mohammad') },
      { id: 'cmd-matrix', category: 'Command', title: 'matrix', subtitle: 'Run Matrix neural visualizer in shell', action: () => onExecuteCommand('matrix') },

      // External
      { id: 'ext-github', category: 'Link', title: 'GitHub Profile', subtitle: 'github.com/mohammad-hussein-dev', action: () => window.open(PROFILE.github, '_blank') },
      { id: 'ext-telegram', category: 'Link', title: 'Telegram Channel', subtitle: PROFILE.telegramHandle, action: () => window.open(PROFILE.telegram, '_blank') },
    ];

    const q = query.toLowerCase().trim();
    if (!q) return list;

    return list.filter(item =>
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  }, [query, onNavigateSection, onSelectProject, onExecuteCommand]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(items.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(items.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#090d16] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownInMenu}
      >
        {/* Search Input Bar */}
        <div className="px-4 py-3.5 bg-[#0d1320] border-b border-cyan-900/50 flex items-center space-x-3">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Search projects, skills, science lab, commands, or sections..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-400 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800 font-mono text-xs">
          {items.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No matching results found for "{query}".
            </div>
          ) : (
            items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-500/50 shadow-md shadow-cyan-950/30'
                      : 'hover:bg-[#0c1220] text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                      {item.category}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-100 truncate">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</div>
                      )}
                    </div>
                  </div>

                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#070b13] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-500">MH-PALETTE</span>
        </div>
      </div>
    </div>
  );
};
