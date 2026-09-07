import { PROFILE, PROJECTS, SKILL_CATEGORIES, OPEN_SOURCE_CONTRIBUTIONS, VIRTUAL_FILESYSTEM, Project } from '../data/portfolioData';

export interface CommandResult {
  output: string | string[];
  action?: {
    type: 'NAVIGATE' | 'OPEN_PROJECT' | 'DOWNLOAD_RESUME' | 'TOGGLE_THEME' | 'TRIGGER_CONFETTI' | 'TRIGGER_MATRIX' | 'OPEN_CONTACT' | 'SWITCH_LANGUAGE';
    payload?: any;
  };
}

export class VirtualShell {
  private currentPath: string = '/';
  private history: string[] = [];
  private historyIndex: number = -1;

  constructor() {}

  public getCurrentPath(): string {
    return this.currentPath;
  }

  public getPrompt(): string {
    const formatted = this.currentPath === '/' ? '~' : `~${this.currentPath.replace(/\/$/, '')}`;
    return `\x1b[1;36mMohammad-Hussein@archlinux\x1b[0m:\x1b[1;34m${formatted}\x1b[0m$ `;
  }

  public getHistory(): string[] {
    return this.history;
  }

  public addToHistory(cmd: string) {
    if (cmd.trim() && (this.history.length === 0 || this.history[this.history.length - 1] !== cmd)) {
      this.history.push(cmd);
    }
    this.historyIndex = this.history.length;
  }

  public getPreviousHistory(): string | null {
    if (this.history.length === 0) return null;
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex];
    }
    return this.history[0];
  }

  public getNextHistory(): string | null {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    this.historyIndex = this.history.length;
    return '';
  }

  public autocomplete(input: string): { completed: string; suggestions: string[] } {
    const parts = input.trimStart().split(/\s+/);
    if (parts.length === 0 || (parts.length === 1 && !input.endsWith(' '))) {
      // Autocomplete command name
      const prefix = parts[0] || '';
      const commands = [
        'help', 'clear', 'whoami', 'about', 'skills', 'projects', 'project',
        'experience', 'research', 'science', 'opensource', 'services', 'contact',
        'resume', 'github', 'social', 'status', 'neofetch', 'fastfetch', 'history', 'pwd',
        'ls', 'cd', 'cat', 'theme', 'open', 'hire-mohammad', 'sudo', 'matrix', 'cowsay'
      ];
      const matches = commands.filter(c => c.startsWith(prefix.toLowerCase()));
      if (matches.length === 1) {
        return { completed: matches[0] + ' ', suggestions: [] };
      }
      return { completed: input, suggestions: matches };
    }

    const cmd = parts[0].toLowerCase();
    const arg = parts[1] || '';

    if (cmd === 'project' || cmd === 'open') {
      const projectIds = PROJECTS.map(p => p.id).concat(PROJECTS.map(p => p.slug));
      const matches = projectIds.filter(id => id.startsWith(arg.toLowerCase()));
      if (matches.length === 1) {
        return { completed: `${cmd} ${matches[0]}`, suggestions: [] };
      }
      return { completed: input, suggestions: matches };
    }

    if (cmd === 'cd' || cmd === 'ls' || cmd === 'cat') {
      // Path autocomplete based on virtual filesystem
      const currentItems = (VIRTUAL_FILESYSTEM as Record<string, string[]>)[this.currentPath] || [];
      const matches = currentItems.filter(item => item.startsWith(arg));
      if (matches.length === 1) {
        return { completed: `${cmd} ${matches[0]}`, suggestions: [] };
      }
      return { completed: input, suggestions: matches };
    }

    return { completed: input, suggestions: [] };
  }

  public execute(commandLine: string): CommandResult {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      return { output: '' };
    }

    this.addToHistory(trimmed);

    // Handle sudo easter egg
    if (trimmed.startsWith('sudo hire-mohammad') || trimmed === 'sudo hire') {
      return {
        output: [
          `\x1b[33m[sudo] password for recruiter:\x1b[0m ********`,
          `\x1b[1;32mAccess Granted.\x1b[0m Welcome to the engineering workspace.`,
          ``,
          `\x1b[1;36mCandidate Profile:\x1b[0m Mohammad Hussein`,
          `\x1b[1;37mRole:\x1b[0m Backend Engineer & AI Systems`,
          `\x1b[1;37mCore Stack:\x1b[0m Python · Django · Django REST · FastAPI · PostgreSQL · Redis`,
          `\x1b[1;37mStatus:\x1b[0m Open to backend engineering roles & high-impact contracts.`,
          ``,
          `\x1b[32mInitiating direct contact interface...\x1b[0m`
        ],
        action: { type: 'OPEN_CONTACT' }
      };
    }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        return this.cmdHelp();

      case 'whoami':
        return {
          output: [
            `\x1b[1;36m${PROFILE.name}\x1b[0m (${PROFILE.fullName})`,
            `\x1b[1;32mRole:\x1b[0m ${PROFILE.primaryRole} · ${PROFILE.secondaryRole}`,
            `\x1b[1;33mFoundation:\x1b[0m Physics & Mathematics × Backend Software Systems`,
            `\x1b[90mLocation:\x1b[0m ${PROFILE.location}`,
            `\x1b[90mTagline:\x1b[0m "${PROFILE.tagline}"`
          ]
        };

      case 'about':
        return {
          output: [
            `\x1b[1;36m=== About Mohammad Hussein ===\x1b[0m`,
            `Backend engineer with a deep foundation in Physics and Mathematics.`,
            `I turn complex formulas and non-linear systems into reliable, high-performance software.`,
            ``,
            `\x1b[1;33mCore Mindset:\x1b[0m`,
            `Physics → Mathematics → Problem Solving → Scientific Computing → Backend Engineering`,
            ``,
            `\x1b[1;32mKey Metrics:\x1b[0m`,
            `• 5+ Production-grade APIs designed and deployed with Django/DRF/FastAPI`,
            `• 96%+ Automated pytest test coverage benchmark`,
            `• 40% Latency reduction through database query optimization and Redis caching`,
            `• 98% Genetic Algorithm convergence accuracy across multi-objective constraints`,
            ``,
            `\x1b[90mType 'open about' to scroll to the detailed visual section.\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#about' }
        };

      case 'skills':
        return {
          output: [
            `\x1b[1;36m=== Engineering Stack ===\x1b[0m`,
            ``,
            ...SKILL_CATEGORIES.map(cat => {
              const skillList = cat.skills.map(s => s.highlight ? `\x1b[1;32m${s.name}\x1b[0m` : `\x1b[37m${s.name}\x1b[0m`).join(', ');
              return `\x1b[1;33m[${cat.title}]\x1b[0m\n  ${skillList}\n`;
            }),
            `\x1b[90mType 'open skills' to view the interactive matrix.\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#skills' }
        };

      case 'projects':
        return {
          output: [
            `\x1b[1;36m=== Featured Engineering Projects ===\x1b[0m`,
            ``,
            ...PROJECTS.map((p, idx) => {
              return `\x1b[1;32m${idx + 1}. ${p.title}\x1b[0m [\x1b[35m${p.category}\x1b[0m]\n   ID: \x1b[1;36m${p.id}\x1b[0m | Slug: \x1b[90m${p.slug}\x1b[0m\n   ${p.oneLiner}\n   Stack: ${p.technologies.join(', ')}\n   Inspect: \x1b[33mproject ${p.id}\x1b[0m\n`;
            }),
            `\x1b[90mType 'project <id>' to inspect a specific case study.\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#projects' }
        };

      case 'project':
        if (args.length === 0) {
          return {
            output: `\x1b[31mUsage: project <id>\x1b[0m\nAvailable project IDs: pinn, django, ga, projectile, widgetify, memory-opt`
          };
        }
        const targetId = args[0].toLowerCase();
        const project = PROJECTS.find(p => p.id === targetId || p.slug === targetId);
        if (!project) {
          return {
            output: `\x1b[31mbash: project '${targetId}' not found.\x1b[0m\nRun \x1b[1;36mprojects\x1b[0m to list all available projects.`
          };
        }
        return {
          output: [
            `\x1b[1;36m=== ${project.title} ===\x1b[0m`,
            `\x1b[35mCategory:\x1b[0m ${project.category}`,
            `\x1b[33mOverview:\x1b[0m ${project.oneLiner}`,
            `\x1b[32mKey Metrics:\x1b[0m ${project.metrics.join(' | ')}`,
            `\x1b[37mTechnologies:\x1b[0m ${project.technologies.join(', ')}`,
            ``,
            `\x1b[1mProblem:\x1b[0m ${project.caseStudy.problem}`,
            `\x1b[1mApproach:\x1b[0m ${project.caseStudy.approach}`,
            `\x1b[1mTesting:\x1b[0m ${project.caseStudy.testing}`,
            ``,
            `\x1b[34mGitHub:\x1b[0m ${project.githubUrl}`,
            `\x1b[1;32mOpening full interactive Case Study in UI...\x1b[0m`
          ],
          action: { type: 'OPEN_PROJECT', payload: project }
        };

      case 'experience':
        return {
          output: [
            `\x1b[1;36m=== Production Experience ===\x1b[0m`,
            `\x1b[1;33mBackend Developer & AI Engineer\x1b[0m | Self-Employed (2023 - Present)`,
            `• Architected and deployed 5 production-grade REST APIs with Django & FastAPI.`,
            `• Reduced query and response latency by 40% with PostgreSQL indexing and Redis caching.`,
            `• Engineered multi-objective Genetic Algorithm processing 5,000+ spatial points (98% convergence).`,
            `• Standardized 96%+ test coverage using pytest with automated GitHub Actions CI/CD.`
          ]
        };

      case 'research':
      case 'science':
        return {
          output: [
            `\x1b[1;36m=== Scientific Computing & Physics Lab ===\x1b[0m`,
            `1. \x1b[1;32mElectro-Thermal PINN\x1b[0m: Coupled Maxwell + Fourier PDE solver (PyTorch, RoPE, GQA, SwiGLU). L2 error < 9.09e-04.`,
            `2. \x1b[1;32mProjectile Physics Simulator\x1b[0m: RK4 non-linear aerodynamic drag trajectory modeling with 100% test coverage.`,
            `3. \x1b[1;32mSpatial Site Selection GA\x1b[0m: Combinatorial Pareto optimization with DEAP.`,
            ``,
            `\x1b[33mNavigating to interactive Science Lab...\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#science' }
        };

      case 'opensource':
        return {
          output: [
            `\x1b[1;36m=== Open Source Contributions (Merged PRs) ===\x1b[0m`,
            ...OPEN_SOURCE_CONTRIBUTIONS.map(os => {
              return `\x1b[1;32m[${os.status}]\x1b[0m \x1b[1m${os.repository}\x1b[0m\n  • ${os.title}\n  • PR: \x1b[34m${os.prUrl}\x1b[0m\n`;
            }),
            `\x1b[90mType 'open opensource' to scroll to the section.\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#opensource' }
        };

      case 'services':
      case 'what-i-can-build':
        return {
          output: [
            `\x1b[1;36m=== What I Can Build ===\x1b[0m`,
            `• \x1b[1;32mRESTful APIs & Microservices:\x1b[0m Django REST Framework, FastAPI, JWT, RBAC, OpenAPI docs`,
            `• \x1b[1;32mBackend Architectures:\x1b[0m PostgreSQL schema design, Redis caching, Celery worker queues`,
            `• \x1b[1;32mScientific Software:\x1b[0m Physics simulations, numerical modeling, PyTorch PINNs, NumPy`,
            `• \x1b[1;32mOptimization Engines:\x1b[0m Genetic algorithms, heuristic solvers, spatial analytics`,
            `• \x1b[1;32mReliability & DevOps:\x1b[0m 96%+ pytest test suites, Docker containers, GitHub Actions CI/CD`,
            `• \x1b[1;32mTechnical Documentation:\x1b[0m API references, bilingual localization (English ↔ Persian)`
          ]
        };

      case 'contact':
      case 'hire-mohammad':
        return {
          output: [
            `\x1b[1;36m=== Contact & Collaboration ===\x1b[0m`,
            `\x1b[1;37mEmail:\x1b[0m    \x1b[34m${PROFILE.email}\x1b[0m`,
            `\x1b[1;37mTelegram:\x1b[0m \x1b[34m${PROFILE.telegram}\x1b[0m (${PROFILE.telegramHandle})`,
            `\x1b[1;37mLinkedIn:\x1b[0m \x1b[34m${PROFILE.linkedin}\x1b[0m`,
            `\x1b[1;37mGitHub:\x1b[0m   \x1b[34m${PROFILE.github}\x1b[0m`,
            `\x1b[1;37mX / Twitter:\x1b[0m \x1b[34m${PROFILE.xTwitter}\x1b[0m`,
            ``,
            `\x1b[1;32mOpening contact form in UI...\x1b[0m`
          ],
          action: { type: 'OPEN_CONTACT' }
        };

      case 'resume':
        return {
          output: [
            `\x1b[1;32mInitiating resume download...\x1b[0m`,
            `File: \x1b[1;36mResume.pdf\x1b[0m (Mohammad Hussein - Backend Engineer)`,
            `URL: ${PROFILE.resumeUrl}`
          ],
          action: { type: 'DOWNLOAD_RESUME', payload: PROFILE.resumeUrl }
        };

      case 'github':
        return {
          output: [
            `\x1b[1;36mGitHub Profile:\x1b[0m \x1b[34m${PROFILE.github}\x1b[0m`,
            `\x1b[1;36mGitLab Profile:\x1b[0m \x1b[34m${PROFILE.gitlab}\x1b[0m`,
            `Featured Repositories: electro-thermal-pinn, django-task-manager, site-selection-ga, projectile-physics-simulator`
          ]
        };

      case 'social':
        return {
          output: [
            `\x1b[1;36m=== Professional & Social Links ===\x1b[0m`,
            `GitHub:    ${PROFILE.github}`,
            `GitLab:    ${PROFILE.gitlab}`,
            `LinkedIn:  ${PROFILE.linkedin}`,
            `Telegram:  ${PROFILE.telegram}`,
            `X/Twitter: ${PROFILE.xTwitter}`,
            `YouTube:   ${PROFILE.youtube}`,
            `Content:   ${PROFILE.contentStudioUrl}`
          ]
        };

      case 'physics':
      case 'rk4':
        return {
          output: [
            `\x1b[1;36m=== Real-Time Numerical Kinematics Solver (RK4) ===\x1b[0m`,
            `Integrating ODE: d²r/dt² = g - (1/2·ρ·v·Cd·A/m)·v`,
            `Initial Parameters: v₀ = 45.0 m/s, θ = 45.0°, m = 0.145 kg, Cd = 0.30`,
            `Simulating flight trajectory...`,
            `\x1b[1;32m[RK4 Trajectory Computed]\x1b[0m`,
            `  • Max Altitude (H_max):  48.24 m`,
            `  • Flight Range (X_max):   164.71 m`,
            `  • Time of Flight (T_tot): 6.18 s`,
            `  • Impact Speed:           32.40 m/s`,
            ``,
            `\x1b[1;33mOpening interactive physics simulator in UI...\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#science' }
        };

      case 'benchmark':
      case 'perf':
        return {
          output: [
            `\x1b[1;36m=== Performance & Engineering Benchmarks ===\x1b[0m`,
            `• \x1b[1;32mAPI Query Latency:\x1b[0m Reduced from 340ms to 48ms (85.8% drop via Redis + DB indices)`,
            `• \x1b[1;32mPINN PDE Residual Loss:\x1b[0m L2 relative error < 9.09e-04 (RoPE + GQA + SwiGLU)`,
            `• \x1b[1;32mAutomated Test Coverage:\x1b[0m 96.4% pytest coverage on Django REST APIs`,
            `• \x1b[1;32mGenetic Algorithm Convergence:\x1b[0m 98.2% across 5,000 spatial constraint coordinates`,
            `• \x1b[1;32mMemory Footprint:\x1b[0m 40% memory optimization via Python __slots__ and generators`
          ]
        };

      case 'neofetch':
      case 'fastfetch':
        return this.cmdNeofetch(args[0]);

      case 'hyprland':
        return this.cmdHyprland();

      case 'kde':
      case 'plasma':
        return this.cmdKde();

      case 'physics':
      case 'sciencelab':
      case 'pinn':
        return {
          output: [
            `\x1b[1;36m=== Interactive Physics & Math Lab ===\x1b[0m`,
            `• \x1b[1;32mElectro-Thermal PINN:\x1b[0m Deep Learning solver for Maxwell & Fourier PDEs (RoPE + GQA)`,
            `• \x1b[1;32mRunge-Kutta RK4 Kinematics:\x1b[0m Aerodynamic drag & energy conservation validator`,
            `• \x1b[1;32mGenetic Algorithm (DEAP):\x1b[0m Pareto-optimal demographic facility site selection`,
            `• \x1b[1;32mFourier Heat Diffusion PDE:\x1b[0m Spectral finite-difference thermal conduction solver`,
            ``,
            `\x1b[90mNavigating to #science laboratory section...\x1b[0m`
          ],
          action: { type: 'NAVIGATE', payload: '#science' }
        };

      case 'lang':
      case 'language':
        const targetLang = args[0] ? args[0].toLowerCase() : 'toggle';
        return {
          output: `\x1b[1;32mLanguage switched: ${targetLang === 'fa' ? 'فارسی (Persian)' : targetLang === 'en' ? 'English' : 'Toggled'}\x1b[0m`,
          action: { type: 'SWITCH_LANGUAGE', payload: targetLang }
        };

      case 'pwd':
        return { output: this.currentPath };

      case 'ls':
        return this.cmdLs(args[0]);

      case 'cd':
        return this.cmdCd(args[0]);

      case 'cat':
        return this.cmdCat(args[0]);

      case 'history':
        return {
          output: this.history.map((h, i) => `  ${(i + 1).toString().padStart(3, ' ')}  ${h}`)
        };

      case 'theme':
        const mode = args[0] ? args[0].toLowerCase() : 'toggle';
        return {
          output: `\x1b[33mTheme mode switched to: ${mode}\x1b[0m`,
          action: { type: 'TOGGLE_THEME', payload: mode }
        };

      case 'open':
        if (args.length === 0) {
          return { output: `Usage: open <about|projects|skills|science|opensource|contact|pinn|django>` };
        }
        const target = args[0].toLowerCase();
        if (['about', 'projects', 'skills', 'science', 'opensource', 'contact'].includes(target)) {
          return {
            output: `Navigating to #${target}...`,
            action: { type: 'NAVIGATE', payload: `#${target}` }
          };
        }
        const prj = PROJECTS.find(p => p.id === target || p.slug === target);
        if (prj) {
          return {
            output: `Opening case study: ${prj.title}...`,
            action: { type: 'OPEN_PROJECT', payload: prj }
          };
        }
        return { output: `Section or project '${target}' not found.` };

      case 'matrix':
        return {
          output: `\x1b[1;32mInitializing Matrix neural visualization stream...\x1b[0m`,
          action: { type: 'TRIGGER_MATRIX' }
        };

      case 'cowsay':
        const cowText = args.join(' ') || 'Simulating the universe, one repo at a time.';
        return {
          output: [
            `  ${'_'.repeat(cowText.length + 2)}`,
            `< ${cowText} >`,
            `  ${'-'.repeat(cowText.length + 2)}`,
            `        \\   ^__^`,
            `         \\  (oo)\\_______`,
            `            (__)\\       )\\/\\`,
            `                ||----w |`,
            `                ||     ||`
          ]
        };

      case 'clear':
        return { output: '__CLEAR__' };

      default:
        return {
          output: [
            `\x1b[31mbash: ${cmd}: command not found\x1b[0m`,
            `Type \x1b[1;36mhelp\x1b[0m to see available commands or \x1b[1;36mneofetch\x1b[0m for system overview.`
          ]
        };
    }
  }

  private cmdHelp(): CommandResult {
    return {
      output: [
        `\x1b[1;36mMH-SHELL v2.0 — Virtual Portfolio Workstation\x1b[0m`,
        ``,
        `\x1b[1;33mCORE COMMANDS:\x1b[0m`,
        `  \x1b[1;32mwhoami\x1b[0m        Show brief professional identity`,
        `  \x1b[1;32mabout\x1b[0m         Read story, engineering mindset, and background`,
        `  \x1b[1;32mskills\x1b[0m        Display categorized technology stack`,
        `  \x1b[1;32mprojects\x1b[0m      List all featured production projects`,
        `  \x1b[1;32mproject <id>\x1b[0m  Open detailed project case study (\x1b[36mpinn\x1b[0m, \x1b[36mdjango\x1b[0m, \x1b[36mga\x1b[0m...)`,
        `  \x1b[1;32mscience\x1b[0m       Open the scientific computing and physics lab`,
        `  \x1b[1;32mopensource\x1b[0m    List merged upstream PRs & open source work`,
        `  \x1b[1;32mservices\x1b[0m      View 'What I Can Build' capabilities`,
        `  \x1b[1;32mresume\x1b[0m        Download official PDF resume`,
        `  \x1b[1;32mcontact\x1b[0m       Get direct contact & social channels`,
        ``,
        `\x1b[1;33mSYSTEM & UTILITIES:\x1b[0m`,
        `  \x1b[1;32mneofetch\x1b[0m      System specification & developer banner`,
        `  \x1b[1;32mstatus\x1b[0m        Check website and repository status`,
        `  \x1b[1;32mpwd / ls / cd\x1b[0m Navigate virtual filesystem`,
        `  \x1b[1;32mcat <file>\x1b[0m    Print virtual file contents`,
        `  \x1b[1;32mtheme\x1b[0m         Toggle dark / light display mode`,
        `  \x1b[1;32mclear\x1b[0m         Clear the terminal screen (or Ctrl+L)`,
        `  \x1b[1;32mmatrix\x1b[0m        Easter egg matrix code stream`,
        `  \x1b[1;32msudo hire\x1b[0m     Recruiter fast-track easter egg`,
        ``,
        `\x1b[90mTip: Use Tab for autocomplete, Up/Down for command history.\x1b[0m`
      ]
    };
  }

  private cmdNeofetch(targetEnv?: string): CommandResult {
    const isHyprland = targetEnv === 'hypr' || targetEnv === 'hyprland';

    return {
      output: [
        `\x1b[1;36m      /\\        \x1b[1;36mMohammad-Hussein\x1b[0m@\x1b[1;36marchlinux\x1b[0m`,
        `\x1b[1;36m     /  \\       \x1b[0m------------------------------------`,
        `\x1b[1;36m    /\\   \\      \x1b[1;33mOS:\x1b[0m Arch Linux x86_64`,
        `\x1b[1;36m   /      \\     \x1b[1;33mKernel:\x1b[0m Linux 7.1.8-arch1-3`,
        `\x1b[1;36m  /   ,,   \\    \x1b[1;33mUptime:\x1b[0m 4 hours, 59 mins`,
        `\x1b[1;36m /   |  |  -\\   \x1b[1;33mPackages:\x1b[0m 2418 (pacman), 16 (flatpak)`,
        `\x1b[1;36m/_-''    ''-_\\  \x1b[1;33mShell:\x1b[0m bash 5.3.15`,
        `                \x1b[1;33mSessions:\x1b[0m \x1b[1;36mKDE Plasma 6.7.4\x1b[0m & \x1b[1;35mHyprland\x1b[0m (Wayland)`,
        `                \x1b[1;33mActive WM:\x1b[0m ${isHyprland ? '\x1b[1;35mHyprland (v0.42.0 Wayland)\x1b[0m' : '\x1b[1;36mKWin (Wayland Plasma 6.7.4)\x1b[0m'}`,
        `                \x1b[1;33mTheme:\x1b[0m Breeze-Dark / WhiteSur-Dark [Qt/GTK]`,
        `                \x1b[1;33mIcons & Font:\x1b[0m Tela-black-dark | Noto Sans (10pt)`,
        `                \x1b[1;33mTerminal:\x1b[0m konsole 26.4.3 / kitty 0.35`,
        `                \x1b[1;32mStack:\x1b[0m Python · Django REST · FastAPI · PostgreSQL · Redis`,
        `                \x1b[1;32mScientific:\x1b[0m PyTorch PINNs · DEAP Genetic Algo · RK4 Kinematics`,
        `                \x1b[1;32mStatus:\x1b[0m Open to Opportunities (Backend & Scientific Computing)`,
        ``,
        `\x1b[90mTip: Type 'hyprland' for Hyprland config or 'kde' for Plasma session details.\x1b[0m`
      ]
    };
  }

  private cmdHyprland(): CommandResult {
    return {
      output: [
        `\x1b[1;35m╔══════════════════════════════════════════════════════════════════╗\x1b[0m`,
        `\x1b[1;35m║             HYPRLAND WAYLAND WORKSTATION CONFIG                  ║\x1b[0m`,
        `\x1b[1;35m╚══════════════════════════════════════════════════════════════════╝\x1b[0m`,
        `\x1b[1;33mCompositor:\x1b[0m    Hyprland Dynamic Tiling Wayland Compositor (v0.42.0)`,
        `\x1b[1;33mStatus Bar:\x1b[0m    Waybar (Custom CSS with CPU, GPU, Mem, Audio, Network)`,
        `\x1b[1;33mApp Launcher:\x1b[0m  Rofi-Wayland / Wofi with Wayland protocol integration`,
        `\x1b[1;33mTerminal:\x1b[0m      Kitty with JetBrains Mono Nerd Font & Fuzzel`,
        `\x1b[1;33mNotifications:\x1b[0m Dunst / SwayNC notification center`,
        `\x1b[1;33mIdle / Lock:\x1b[0m   Hypridle + Hyprlock with GPU blur shader`,
        `\x1b[1;33mAnimations:\x1b[0m    Bezier curves with smooth window borders & opacity rules`,
        `\x1b[1;33mWorkspaces:\x1b[0m    10 dynamic workspaces with multi-monitor layout rules`,
        ``,
        `\x1b[1;32mKeybindings:\x1b[0m`,
        `  • \x1b[1mSUPER + Q:\x1b[0m Launch Kitty Terminal`,
        `  • \x1b[1mSUPER + E:\x1b[0m Dolphin File Manager`,
        `  • \x1b[1mSUPER + SPACE:\x1b[0m Rofi Application Launcher`,
        `  • \x1b[1mSUPER + SHIFT + Q:\x1b[0m Kill Active Window`,
        `  • \x1b[1mSUPER + 1..9:\x1b[0m Switch to Workspace`
      ]
    };
  }

  private cmdKde(): CommandResult {
    return {
      output: [
        `\x1b[1;36m╔══════════════════════════════════════════════════════════════════╗\x1b[0m`,
        `\x1b[1;36m║             KDE PLASMA 6.7.4 WORKSTATION PROFILE                 ║\x1b[0m`,
        `\x1b[1;36m╚══════════════════════════════════════════════════════════════════╝\x1b[0m`,
        `\x1b[1;33mDesktop:\x1b[0m       KDE Plasma 6.7.4 (Qt 6.7 / Frameworks 6.4)`,
        `\x1b[1;33mWindow Manager:\x1b[0m KWin (Native Wayland session)`,
        `\x1b[1;33mWM Theme:\x1b[0m      WhiteSur-dark with rounded corners & blurred shadows`,
        `\x1b[1;33mLook & Feel:\x1b[0m   Breeze (WhiteSurDark) [Qt], Breeze-Dark [GTK2/3/4]`,
        `\x1b[1;33mIcon Pack:\x1b[0m     Tela-black-dark icons`,
        `\x1b[1;33mTerminal:\x1b[0m      Konsole 26.4.3 with custom zsh / bash profile`,
        `\x1b[1;33mCursor:\x1b[0m        ArchCursor large version (24px)`
      ]
    };
  }

  private cmdLs(pathArg?: string): CommandResult {
    const targetPath = this.resolvePath(pathArg || '.');
    const items = (VIRTUAL_FILESYSTEM as Record<string, string[]>)[targetPath];

    if (!items) {
      return { output: `\x1b[31mbash: ls: cannot access '${pathArg}': No such file or directory\x1b[0m` };
    }

    const coloredItems = items.map(item => {
      if (item.endsWith('/')) {
        return `\x1b[1;34m${item}\x1b[0m`;
      }
      if (item.endsWith('.py') || item.endsWith('.json') || item.endsWith('.yml')) {
        return `\x1b[1;32m${item}\x1b[0m`;
      }
      return `\x1b[37m${item}\x1b[0m`;
    });

    return { output: coloredItems.join('  ') };
  }

  private cmdCd(pathArg?: string): CommandResult {
    if (!pathArg || pathArg === '~' || pathArg === '') {
      this.currentPath = '/';
      return { output: '' };
    }

    const resolved = this.resolvePath(pathArg);
    if ((VIRTUAL_FILESYSTEM as Record<string, string[]>)[resolved]) {
      this.currentPath = resolved;
      return { output: '' };
    }

    return { output: `\x1b[31mbash: cd: ${pathArg}: No such directory\x1b[0m` };
  }

  private cmdCat(fileArg?: string): CommandResult {
    if (!fileArg) {
      return { output: `\x1b[31mUsage: cat <filename>\x1b[0m` };
    }

    const targetFile = fileArg.trim();
    if (targetFile === 'README.md') {
      return {
        output: [
          `# Mohammad Hussein — Backend Engineer`,
          `Simulating the Universe, One Repo at a Time.`,
          `Building reliable backend systems, APIs, and scientific software with a strong foundation in physics and mathematics.`
        ]
      };
    }

    if (targetFile === 'bio.txt') {
      return {
        output: [
          `Mohammad Hussein is a Backend & AI Engineer with a strong foundation in Physics and Mathematics.`,
          `Focuses on architecting scalable backend APIs with Django, FastAPI, PostgreSQL, and Redis.`,
          `Brings mathematical precision and test-driven development to every software project.`
        ]
      };
    }

    if (targetFile.includes('pinn') || targetFile.includes('electro-thermal')) {
      const prj = PROJECTS.find(p => p.id === 'pinn');
      return {
        output: [
          `=== Electro-Thermal PINN ===`,
          prj?.description || '',
          `Relative L2 Error: < 9.09e-04`,
          `PyTorch models: MLP, MLPPINN, TransformerPINN (RoPE + GQA + SwiGLU)`
        ]
      };
    }

    return {
      output: `\x1b[37m[File: ${targetFile}]\x1b[0m\nContents for '${targetFile}' verified in virtual memory.\nRun \x1b[1;36mproject <id>\x1b[0m or visit UI section for full details.`
    };
  }

  private resolvePath(target: string): string {
    if (target === '/') return '/';
    if (target === '~') return '/';
    if (target === '..') {
      if (this.currentPath === '/') return '/';
      const parts = this.currentPath.split('/').filter(Boolean);
      parts.pop();
      return parts.length === 0 ? '/' : `/${parts.join('/')}`;
    }

    if (target.startsWith('/')) {
      return target.replace(/\/$/, '');
    }

    const cleanCurrent = this.currentPath === '/' ? '' : this.currentPath;
    const cleanTarget = target.replace(/\/$/, '');
    return `${cleanCurrent}/${cleanTarget}`;
  }
}
