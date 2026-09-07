import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { VirtualShell } from '../../terminal/shellEngine';
import { Project, PROFILE, PROJECTS } from '../../data/portfolioData';
import { renderAnsiWithHighlight, stripAnsi } from '../../utils/ansiParser';
import { useLanguage } from '../../context/LanguageContext';
import {
  Terminal as TerminalIcon,
  Search,
  Activity,
  Cpu,
  Zap,
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  ChevronRight,
  X,
  CornerDownLeft,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalViewProps {
  onSelectProject?: (project: Project) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenContact?: () => void;
  onToggleTheme?: (mode?: string) => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

interface OutputEntry {
  id: string;
  type: 'command' | 'output' | 'matrix';
  prompt?: string;
  command?: string;
  lines: string[];
  action?: {
    type: string;
    payload?: any;
  };
  timestamp: string;
}

type CockpitTab = 'terminal' | 'telemetry' | 'benchmarks' | 'logs';

export const TerminalView: React.FC<TerminalViewProps> = ({
  onSelectProject,
  onNavigateSection,
  onOpenContact,
  onToggleTheme,
  isFocusMode = false,
  onToggleFocusMode,
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const shellRef = useRef<VirtualShell>(new VirtualShell());
  const [activeTab, setActiveTab] = useState<CockpitTab>('terminal');
  const [entries, setEntries] = useState<OutputEntry[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [historyList, setHistoryList] = useState<string[]>([]);
  
  // Customization state
  const [fontSize, setFontSize] = useState<number>(13.5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isMatrixRunning, setIsMatrixRunning] = useState<boolean>(false);
  const [matrixLines, setMatrixLines] = useState<string[]>([]);

  // Telemetry simulation state
  const [benchRunning, setBenchRunning] = useState<boolean>(false);
  const [benchProgress, setBenchProgress] = useState<number>(0);
  const [benchResults, setBenchResults] = useState<{
    latency: string;
    throughput: string;
    pdeResidual: string;
    pytestStatus: string;
  } | null>(null);

  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Audio Click Synthesizer
  const playKeySound = useCallback((freq = 800) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio suppression guard
    }
  }, [soundEnabled]);

  // Initial welcome message
  useEffect(() => {
    const welcomeEntry: OutputEntry = {
      id: 'init-welcome',
      type: 'output',
      lines: [
        '\x1b[1;36m┌─────────────────────────────────────────────────────────────┐\x1b[0m',
        '\x1b[1;36m│\x1b[0m  \x1b[1;32mMH-COCKPIT v3.0\x1b[0m [High-Performance Systems & AI Console]   \x1b[1;36m│\x1b[0m',
        '\x1b[1;36m│\x1b[0m  \x1b[1;33mCommands:\x1b[0m help | neofetch | projects | physics | sudo hire \x1b[1;36m│\x1b[0m',
        '\x1b[1;36m└─────────────────────────────────────────────────────────────┘\x1b[0m',
        '\x1b[90mTip: Type commands or use quick chips. Press Tab for autocomplete or search with the icon.\x1b[0m'
      ],
      timestamp: new Date().toLocaleTimeString()
    };
    setEntries([welcomeEntry]);
  }, []);

  // Auto-scroll to bottom on new output if user is near bottom
  useEffect(() => {
    if (activeTab === 'terminal' && terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [entries, matrixLines, activeTab]);

  // Quick Action Handler
  const handleAction = useCallback((action?: { type: string; payload?: any }) => {
    if (!action) return;
    switch (action.type) {
      case 'NAVIGATE':
        if (action.payload && onNavigateSection) {
          onNavigateSection(action.payload);
        }
        break;
      case 'OPEN_PROJECT':
        if (action.payload && onSelectProject) {
          onSelectProject(action.payload);
        }
        break;
      case 'DOWNLOAD_RESUME':
        const link = document.createElement('a');
        link.href = action.payload || './Resume/Resume.pdf';
        link.download = 'Mohammad_Hussein_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case 'TOGGLE_THEME':
        if (onToggleTheme) {
          onToggleTheme(action.payload);
        }
        break;
      case 'SWITCH_LANGUAGE':
        if (action.payload === 'fa' || action.payload === 'en') {
          setLanguage(action.payload);
        } else {
          toggleLanguage();
        }
        break;
      case 'TRIGGER_CONFETTI':
        confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
        break;
      case 'TRIGGER_MATRIX':
        runMatrixRain();
        break;
      case 'OPEN_CONTACT':
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
        if (onOpenContact) {
          onOpenContact();
        }
        break;
      default:
        break;
    }
  }, [onNavigateSection, onSelectProject, onToggleTheme, onOpenContact]);

  const runMatrixRain = () => {
    setIsMatrixRunning(true);
    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜλπσ√∆∇∫≈≠≤≥';
    let frame = 0;
    const interval = setInterval(() => {
      const generated: string[] = [];
      for (let row = 0; row < 10; row++) {
        let line = '';
        for (let col = 0; col < 32; col++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          line += `${char} `;
        }
        generated.push(line);
      }
      setMatrixLines(generated);
      frame++;
      if (frame > 22) {
        clearInterval(interval);
        setIsMatrixRunning(false);
        setEntries(prev => [
          ...prev,
          {
            id: `matrix-done-${Date.now()}`,
            type: 'output',
            lines: [
              '\x1b[1;36m[Matrix Simulation Complete. Neural Channels Synchronized.]\x1b[0m'
            ],
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
    }, 80);
  };

  // Run Benchmark Simulation
  const runLiveBenchmark = () => {
    setBenchRunning(true);
    setBenchProgress(0);
    setBenchResults(null);

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setBenchProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setBenchRunning(false);
        setBenchResults({
          latency: '48.2 ms (Redis Cache Hit)',
          throughput: '2,450 req/sec',
          pdeResidual: '8.42e-04 (L2 Converged)',
          pytestStatus: '96.4% Coverage (34/34 Passing)'
        });
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    }, 120);
  };

  // Command Execution Engine
  const executeCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    playKeySound(500);

    // Add to command history
    setHistoryList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const promptStr = 'mohammad@arch:~$';
    const shell = shellRef.current;
    shell.addToHistory(trimmed);

    if (trimmed.toLowerCase() === 'clear') {
      setEntries([
        {
          id: `welcome-${Date.now()}`,
          type: 'output',
          lines: [
            '\x1b[1;36m┌─────────────────────────────────────────────────────────────┐\x1b[0m',
            '\x1b[1;36m│\x1b[0m  \x1b[1;32mMH-COCKPIT v3.0\x1b[0m [Terminal Buffer Reset]                   \x1b[1;36m│\x1b[0m',
            '\x1b[1;36m└─────────────────────────────────────────────────────────────┘\x1b[0m'
          ],
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setInputVal('');
      return;
    }

    const res = shell.execute(trimmed);
    const outputLines = Array.isArray(res.output) ? res.output : [res.output];

    const newEntry: OutputEntry = {
      id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'command',
      prompt: promptStr,
      command: trimmed,
      lines: outputLines,
      action: res.action,
      timestamp: new Date().toLocaleTimeString()
    };

    setEntries(prev => [...prev, newEntry]);
    setInputVal('');

    if (res.action) {
      handleAction(res.action);
    }
  };

  // Autocomplete Suggestions as user types
  const commandCatalog = useMemo(() => [
    { cmd: 'help', desc: 'Display command catalog' },
    { cmd: 'neofetch', desc: 'System specs & workstation setup' },
    { cmd: 'projects', desc: 'Interactive project directory' },
    { cmd: 'project pinn', desc: 'PINN Transformer case study' },
    { cmd: 'project django', desc: 'Django REST API case study' },
    { cmd: 'physics', desc: 'Run RK4 kinematics simulation' },
    { cmd: 'benchmark', desc: 'Execute system performance tests' },
    { cmd: 'skills', desc: 'Technical stack & architectures' },
    { cmd: 'resume', desc: 'Download official PDF resume' },
    { cmd: 'matrix', desc: 'Simulate neural matrix stream' },
    { cmd: 'sudo hire-mohammad', desc: 'Recruiter priority channel' },
    { cmd: 'contact', desc: 'Open direct message form' },
    { cmd: 'clear', desc: 'Reset console viewport' }
  ], []);

  const matchingSuggestions = useMemo(() => {
    if (!inputVal.trim()) return [];
    const prefix = inputVal.trim().toLowerCase();
    return commandCatalog.filter(c => c.cmd.toLowerCase().startsWith(prefix) && c.cmd.toLowerCase() !== prefix);
  }, [inputVal, commandCatalog]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeySound(750 + Math.random() * 200);

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyList.length === 0) return;
      const nextIdx = historyIndex === -1 ? historyList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(historyList[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyList.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= historyList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(historyList[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (matchingSuggestions.length > 0) {
        setInputVal(matchingSuggestions[0].cmd);
      } else {
        const auto = shellRef.current.autocomplete(inputVal);
        setInputVal(auto.completed);
      }
    }
  };

  const handleCopyBuffer = () => {
    const text = entries
      .map(e => `${e.command ? `> ${e.command}\n` : ''}${e.lines.map(stripAnsi).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    executeCommand('clear');
  };

  // Quick Chips
  const quickChips = [
    { label: 'help', cmd: 'help' },
    { label: 'neofetch', cmd: 'neofetch' },
    { label: 'projects', cmd: 'projects' },
    { label: 'pinn', cmd: 'project pinn' },
    { label: 'physics (RK4)', cmd: 'physics' },
    { label: 'benchmark', cmd: 'benchmark' },
    { label: 'skills', cmd: 'skills' },
    { label: 'matrix', cmd: 'matrix' },
    { label: 'sudo hire', cmd: 'sudo hire-mohammad' },
  ];

  // Filtered entries for search
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return entries;
    const q = searchQuery.toLowerCase();
    return entries.filter(entry => {
      const matchCmd = entry.command?.toLowerCase().includes(q);
      const matchLines = entry.lines.some(l => stripAnsi(l).toLowerCase().includes(q));
      return matchCmd || matchLines;
    });
  }, [entries, searchQuery]);

  return (
    <div
      id="terminal-cockpit"
      className={`rounded-2xl border border-cyan-500/30 bg-[#06080e]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col transition-all duration-300 ${
        isFocusMode
          ? 'fixed inset-3 md:inset-6 z-50 shadow-2xl ring-2 ring-cyan-400 bg-[#06080e]'
          : 'w-full h-[490px] lg:h-[520px]'
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="px-3.5 py-2.5 bg-[#090d16] border-b border-cyan-950/70 flex items-center justify-between select-none">
        {/* Left: Window Controls & Title */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handleReset}
              title="Reset Console Buffer"
              className="w-3 h-3 rounded-full bg-red-500/90 hover:brightness-125 transition"
            />
            <button
              onClick={() => onToggleTheme && onToggleTheme('toggle')}
              title="Switch Theme"
              className="w-3 h-3 rounded-full bg-yellow-500/90 hover:brightness-125 transition"
            />
            <button
              onClick={onToggleFocusMode}
              title={isFocusMode ? 'Exit Fullscreen' : 'Fullscreen Workstation'}
              className="w-3 h-3 rounded-full bg-emerald-500/90 hover:brightness-125 transition"
            />
          </div>

          <div className="flex items-center space-x-2 ml-2 pl-3 border-l border-slate-800 text-xs font-mono text-cyan-400">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-bold tracking-wider text-cyan-300">MH-COCKPIT</span>
            <span className="text-slate-500 hidden sm:inline text-[11px]">| Arch Linux x86_64</span>
            <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px]">
              ONLINE
            </span>
          </div>
        </div>

        {/* Center/Right: Cockpit Mode Tabs */}
        <div className="hidden sm:flex items-center space-x-1 bg-[#04060a] p-1 rounded-lg border border-slate-800/90 font-mono text-xs">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded transition flex items-center space-x-1.5 ${
              activeTab === 'terminal'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            <span>CLI</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-2.5 py-1 rounded transition flex items-center space-x-1.5 ${
              activeTab === 'telemetry'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>Telemetry</span>
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-2.5 py-1 rounded transition flex items-center space-x-1.5 ${
              activeTab === 'benchmarks'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3 h-3" />
            <span>Benchmarks</span>
          </button>
        </div>

        {/* Right Tools: Search, Audio, Font Size, Copy, Fullscreen */}
        <div className="flex items-center space-x-1.5">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            title="Search Terminal Outputs"
            className={`p-1.5 rounded transition text-xs ${
              showSearch || searchQuery
                ? 'text-amber-300 bg-amber-950/60 border border-amber-800/70'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Key audio enabled' : 'Enable key audio click'}
            className={`p-1.5 rounded transition text-xs ${
              soundEnabled
                ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Font Sizer */}
          <div className="hidden md:flex items-center bg-[#05070d] border border-slate-800 rounded px-1">
            <button
              onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
              disabled={fontSize <= 11}
              title="Decrease Font Size"
              className="p-1 text-slate-400 hover:text-cyan-300 disabled:opacity-30 text-xs transition"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 px-1">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(17, prev + 1))}
              disabled={fontSize >= 17}
              title="Increase Font Size"
              className="p-1 text-slate-400 hover:text-cyan-300 disabled:opacity-30 text-xs transition"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Copy Buffer */}
          <button
            onClick={handleCopyBuffer}
            title="Copy Console Output"
            className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Buffer */}
          <button
            onClick={handleReset}
            title="Reset Terminal"
            className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Expand */}
          {onToggleFocusMode && (
            <button
              onClick={onToggleFocusMode}
              title={isFocusMode ? 'Exit Fullscreen' : 'Fullscreen Focus'}
              className="p-1.5 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition text-xs"
            >
              {isFocusMode ? <Minimize2 className="w-3.5 h-3.5 text-cyan-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* 2. Optional Live Search & Filter Bar */}
      {showSearch && (
        <div className="px-3.5 py-2 bg-[#0d121e] border-b border-cyan-950 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-2 flex-1 mr-3">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search output logs, commands, or telemetry..."
              className="w-full bg-transparent border-none text-slate-200 placeholder:text-slate-500 focus:outline-hidden text-xs"
              autoFocus
            />
          </div>
          <div className="flex items-center space-x-2">
            {searchQuery && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                {filteredEntries.length} entries found
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Body Content Switcher */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* CRT Scanline Retro Effect */}
        {crtEnabled && (
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20 opacity-30" />
        )}

        {/* TAB 1: INTERACTIVE CLI TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#06080e]">
            {/* Scrollable Output Viewport */}
            <div
              ref={terminalScrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 font-mono scrollbar-thin select-text"
              style={{ fontSize: `${fontSize}px` }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Matrix rain animation state */}
              {isMatrixRunning && (
                <div className="space-y-1 text-emerald-400 font-mono text-xs opacity-90">
                  <div className="text-cyan-400 font-bold mb-2">[Simulating High-Density Neural Stream]</div>
                  {matrixLines.map((ml, idx) => (
                    <div key={idx} className="tracking-widest truncate">{ml}</div>
                  ))}
                </div>
              )}

              {/* Render Standard Terminal Entries */}
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="space-y-1">
                  {/* If user typed a command, show prompt line */}
                  {entry.command && (
                    <div className="flex items-center space-x-2 text-slate-300">
                      <span className="text-cyan-400 font-bold">mohammad@arch</span>
                      <span className="text-slate-500">:</span>
                      <span className="text-sky-400 font-semibold">~</span>
                      <span className="text-slate-500">$</span>
                      <span className="text-white font-bold">{entry.command}</span>
                      <span className="text-[10px] text-slate-600 ml-auto hidden sm:inline">{entry.timestamp}</span>
                    </div>
                  )}

                  {/* Output lines parsed with ANSI styling & search highlight */}
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap pl-0.5">
                    {entry.lines.map((line, lIdx) => (
                      <div key={lIdx} className="min-h-[1.2em]">
                        {renderAnsiWithHighlight(line, searchQuery, `${entry.id}-${lIdx}`)}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons if output returned navigable items */}
                  {entry.action?.type === 'OPEN_PROJECT' && entry.action.payload && (
                    <div className="pt-2 flex items-center space-x-2">
                      <button
                        onClick={() => onSelectProject && onSelectProject(entry.action?.payload)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/70 text-cyan-300 text-xs hover:bg-cyan-500 hover:text-slate-950 transition flex items-center space-x-1.5 font-bold"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Open Deep Technical Case Study</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestions Popover above input */}
            {matchingSuggestions.length > 0 && (
              <div className="px-3 py-1.5 bg-[#0b101c] border-t border-cyan-900/50 flex items-center space-x-2 overflow-x-auto text-xs font-mono">
                <span className="text-slate-500 text-[11px] shrink-0">Tab complete:</span>
                {matchingSuggestions.slice(0, 4).map((s) => (
                  <button
                    key={s.cmd}
                    onClick={() => {
                      setInputVal(s.cmd);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900 transition shrink-0 flex items-center space-x-1"
                  >
                    <span>{s.cmd}</span>
                    <span className="text-slate-500 text-[10px]">({s.desc})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Prompt Input Line */}
            <div className="p-3 bg-[#080b13] border-t border-cyan-950/80 flex items-center space-x-2 font-mono text-sm">
              <span className="text-cyan-400 font-bold shrink-0">Mohammad-Hussein@archlinux</span>
              <span className="text-slate-500 shrink-0">:</span>
              <span className="text-sky-400 font-semibold shrink-0">~</span>
              <span className="text-slate-500 shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command (e.g. help, neofetch, fastfetch, projects, physics)..."
                className="flex-1 bg-transparent border-none text-white focus:outline-hidden font-mono text-sm placeholder:text-slate-600"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                disabled={!inputVal.trim()}
                title="Execute Command"
                className="p-1.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-500 hover:text-slate-950 transition disabled:opacity-30"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SYSTEM ARCHITECTURE & TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-4 bg-[#06080e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Box 1: Arch Linux Software Environment */}
              <div className="p-3.5 rounded-xl bg-[#0a0f1c] border border-cyan-900/60 space-y-2">
                <div className="flex items-center justify-between text-cyan-400 font-bold border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Arch Linux Environment</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">Linux 7.1.8-arch1-3</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between"><span className="text-slate-500">OS:</span><span className="text-white font-semibold">Arch Linux x86_64</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">DE:</span><span className="text-cyan-300">KDE Plasma 6.7.4</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">WM:</span><span className="text-sky-300">KWin (Wayland)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Shell:</span><span>bash 5.3.15</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Terminal:</span><span>konsole 26.4.3</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Theme / WM Theme:</span><span className="text-slate-200">Breeze / WhiteSur-dark</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Packages:</span><span className="text-emerald-400">2418 (pacman), 16 (flatpak)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Locale:</span><span>en_US.UTF-8</span></div>
                </div>
              </div>

              {/* Box 2: Production Metrics */}
              <div className="p-3.5 rounded-xl bg-[#0a0f1c] border border-cyan-900/60 space-y-2">
                <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Production Test Coverage</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">pytest PASS</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between"><span className="text-slate-500">Test Coverage:</span><span className="text-emerald-400 font-bold">96.4% on DRF Core</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Query Optimization:</span><span className="text-cyan-300 font-semibold">340ms → 48ms (-85.8%)</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">PINN L2 Loss:</span><span className="text-amber-300 font-mono">&lt; 9.09e-04</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Memory Profiling:</span><span className="text-purple-300">__slots__ -40% RAM</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">CI/CD:</span><span>GitHub Actions Pipeline</span></div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Actions */}
            <div className="p-3.5 rounded-xl bg-[#0a0f1c] border border-cyan-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Interactive CLI Integration</div>
                <div className="text-slate-400 text-xs">Run real-time commands or jump into case studies directly.</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setActiveTab('terminal');
                    executeCommand('neofetch');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition font-bold"
                >
                  Run neofetch
                </button>
                <button
                  onClick={() => {
                    setActiveTab('terminal');
                    executeCommand('skills');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
                >
                  List Stack
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BENCHMARKS & SIMULATIONS */}
        {activeTab === 'benchmarks' && (
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-4 bg-[#06080e]">
            <div className="p-4 rounded-xl bg-[#090e1a] border border-cyan-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Benchmark & Physics Solver</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Executes simulated Runge-Kutta (RK4) kinematics, PINN residual evaluations, and Redis latency benchmarks.</p>
                </div>
                <button
                  onClick={runLiveBenchmark}
                  disabled={benchRunning}
                  className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center space-x-1.5 shadow-md shadow-cyan-500/25 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{benchRunning ? 'Evaluating...' : 'Run Benchmark Suite'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              {benchRunning && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-cyan-400">
                    <span>Evaluating differential operators & cache indices...</span>
                    <span>{benchProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-150"
                      style={{ width: `${benchProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Benchmark Results Display */}
              {benchResults && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#050810] border border-emerald-900/60">
                    <div className="text-slate-500 text-[11px]">API Query Latency</div>
                    <div className="text-emerald-400 font-bold text-sm mt-0.5">{benchResults.latency}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050810] border border-cyan-900/60">
                    <div className="text-slate-500 text-[11px]">Throughput Capacity</div>
                    <div className="text-cyan-300 font-bold text-sm mt-0.5">{benchResults.throughput}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050810] border border-amber-900/60">
                    <div className="text-slate-500 text-[11px]">PINN PDE Residual L2 Error</div>
                    <div className="text-amber-300 font-bold text-sm mt-0.5">{benchResults.pdeResidual}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050810] border border-purple-900/60">
                    <div className="text-slate-500 text-[11px]">Automated Pytest Suite</div>
                    <div className="text-purple-300 font-bold text-sm mt-0.5">{benchResults.pytestStatus}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Link to Physics Lab in Main Page */}
            <div className="p-3 rounded-xl bg-[#0a0f1c] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 text-xs">Want full interactive 2D graphical physics canvas?</span>
              <button
                onClick={() => onNavigateSection && onNavigateSection('#science')}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition text-xs font-bold"
              >
                Jump to Physics Lab →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Quick Run Command Chips Footer */}
      <div className="px-3 py-2 bg-[#090d16] border-t border-cyan-950/70 flex items-center space-x-1.5 overflow-x-auto scrollbar-thin text-xs font-mono">
        <span className="text-cyan-400/80 text-[11px] font-semibold flex items-center pr-1.5 uppercase tracking-wider shrink-0">
          <Sparkles className="w-3 h-3 mr-1 text-cyan-400 animate-pulse" /> Run:
        </span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => {
              setActiveTab('terminal');
              executeCommand(chip.cmd);
            }}
            className="px-2.5 py-1 rounded-md bg-[#0d1322] text-cyan-300 hover:text-white hover:bg-cyan-950/80 border border-cyan-900/60 hover:border-cyan-400 transition shrink-0 active:scale-95 shadow-sm shadow-cyan-950/40"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};
