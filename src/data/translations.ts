export type Language = 'en' | 'fa';

export interface TranslationDictionary {
  nav: {
    projects: string;
    scienceLab: string;
    stack: string;
    about: string;
    opensource: string;
    services: string;
    contact: string;
    resume: string;
    recruiterMode: string;
    quickPalette: string;
    terminalFocus: string;
    language: string;
    badgeCore: string;
    badgePinnRk4: string;
    badgeArchitecture: string;
    badgeBio: string;
    badgeRepos: string;
    badgeContracts: string;
    badgeDirect: string;
    systemOnline: string;
    systemWayland: string;
    lightMode: string;
    darkMode: string;
    brandTagline: string;
    langSwitchToEn: string;
    langSwitchToFa: string;
    recruiterTitle: string;
    paletteTitle: string;
    themeTitleToLight: string;
    themeTitleToDark: string;
    openPalette: string;
    toggleMenu: string;
  };
  hero: {
    greeting: string;
    name: string;
    rolePrimary: string;
    roleSecondary: string;
    tagline: string;
    bio: string;
    ctaProjects: string;
    ctaResume: string;
    ctaContact: string;
    statusOpen: string;
    openToWork: string;
    terminalBadge: string;
    focusModePrompt: string;
    archBadge: string;
    statusTag: string;
    roleDetail: string;
    missionDetail: string;
    commandHintBefore: string;
    commandHintAfter: string;
  };
  stats: {
    apisShipped: string;
    apisShippedVal: string;
    testCoverage: string;
    testCoverageVal: string;
    gaAccuracy: string;
    gaAccuracyVal: string;
    latencyReduction: string;
    latencyReductionVal: string;
  };
  scienceLab: {
    badge: string;
    title: string;
    subtitle: string;
    tabKinematics: string;
    tabGA: string;
    tabPinn: string;
    tabDiffusion: string;
    repoLink: string;
    verifiedOnGithub: string;
    pinnTitle: string;
    pinnDesc: string;
    gaTitle: string;
    gaDesc: string;
    kinematicsTitle: string;
    kinematicsDesc: string;
    diffusionTitle: string;
    diffusionDesc: string;
    runSim: string;
    pauseSim: string;
    resetSim: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    allFilter: string;
    backendFilter: string;
    scientificFilter: string;
    optFilter: string;
    toolsFilter: string;
    viewCaseStudy: string;
    githubRepo: string;
    liveDemo: string;
    featured: string;
    searchPlaceholder: string;
    live: string;
    viewLiveSite: string;
    viewGithub: string;
    clientWorkFilter: string;
    personalFilter: string;
    aiMlFilter: string;
    csProblem: string;
    csConstraints: string;
    csArchitecture: string;
    csHighlights: string;
    csTesting: string;
    csResults: string;
    csLessons: string;
    csSourceCode: string;
    csTechnologies: string;
    csClose: string;
    csCloseEsc: string;
    categoryArchive: string;
  };
  stack: {
    badge: string;
    title: string;
    subtitle: string;
    coreCompetencies: string;
    architecturalPrinciples: string;
    principle1Title: string;
    principle1Desc: string;
    principle2Title: string;
    principle2Desc: string;
    principle3Title: string;
    principle3Desc: string;
    principle4Title: string;
    principle4Desc: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    philosophyTitle: string;
    philosophyBody: string;
    systemsTitle: string;
    systemsBody: string;
    pipelineHeading: string;
    pipelineTag: string;
    storyHeading: string;
    pipe1Title: string;
    pipe1Desc: string;
    pipe2Title: string;
    pipe2Desc: string;
    pipe3Title: string;
    pipe3Desc: string;
    pipe4Title: string;
    pipe4Desc: string;
    pipe5Title: string;
    pipe5Desc: string;
    cyberBadge: string;
    cyberSubtitle: string;
    cyberVisitGithub: string;
    cyberCopied: string;
    cyberCopyLink: string;
    archBadgeTitle: string;
    archBadgeCopied: string;
    archBadgeClickToCopy: string;
  };
  opensource: {
    badge: string;
    title: string;
    subtitle: string;
    mergedBadge: string;
    viewPr: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    requestProject: string;
    requestEstimate: string;
    discussRequirements: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directChannels: string;
    freelanceProfiles: string;
    sendEmail: string;
    telegramDirect: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitBtn: string;
    githubLabel: string;
    sendMessageLabel: string;
    mailClientOpened: string;
    copyEmailTooltip: string;
    verifiedFreelance: string;
    verifiedLabel: string;
    viewProfileLink: string;
  };
  recruiter: {
    bannerTitle: string;
    bannerSubtitle: string;
    coreHighlights: string;
    downloadResumePdf: string;
    scheduleInterview: string;
    targetRolesHeading: string;
    targetRolesTitle: string;
    trackRecordHeading: string;
    track1: string;
    track2: string;
    track3: string;
    architectureHeading: string;
    reviewLink: string;
  };
  terminal: {
    headerTitle: string;
    tabShell: string;
    tabTelemetry: string;
    tabManual: string;
    inputPlaceholder: string;
    desktopSessions: string;
  };
  sim: {
    pinn: {
      heading: string;
      subheading: string;
      canvasLabel: string;
      statTemp: string;
      statPotential: string;
      statResidual: string;
      trustBadge: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
      step5Title: string;
      step5Desc: string;
    };
    ga: {
      heading: string;
      subheading: string;
      pauseGA: string;
      evolveGA: string;
      genLabel: string;
      activeSitesLabel: string;
      legend: string;
      chromosomeLabel: string;
      paretoHeading: string;
      maxFitness: string;
      coverageScore: string;
      capitalCost: string;
      avgFitness: string;
      mutationRate: string;
      populationSize: string;
    };
    heat: {
      heading: string;
      subheading: string;
      modeHeat: string;
      modeWave: string;
      canvasLabel: string;
      canvasHint: string;
      legendLow: string;
      legendHigh: string;
      legendWaveLow: string;
      legendWaveHigh: string;
      governingLabel: string;
      governingTag: string;
      heatDesc: string;
      waveDesc: string;
      sourceLabel: string;
      sourceGaussian: string;
      sourceDipole: string;
      sourceSine: string;
      diffusivityHeat: string;
      diffusivityWave: string;
      dampingLabel: string;
      pauseTitle: string;
      playTitle: string;
      resetTitle: string;
    };
    projectile: {
      heading: string;
      subheading: string;
      vacuumOn: string;
      vacuumOff: string;
      airDragTrajectory: string;
      vacuumIdealPath: string;
      flightTimeLabel: string;
      flightTimeUnit: string;
      paramsHeading: string;
      initialVelocity: string;
      launchAngle: string;
      airDragCoeff: string;
      gravityPresetLabel: string;
      planetEarth: string;
      planetMoon: string;
      planetMars: string;
      planetJupiter: string;
      metricsHeading: string;
      maxRange: string;
      maxAltitude: string;
      impactVelocity: string;
      initialEnergy: string;
      equationLabel: string;
    };
  };
  communication: {
    badge: string;
    title: string;
    subtitle: string;
    contentStudioRepo: string;
    exploreDocuments: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      projects: 'Projects',
      scienceLab: 'Science Lab',
      stack: 'Tech Stack',
      about: 'About',
      opensource: 'Open Source',
      services: 'Services',
      contact: 'Contact',
      resume: 'Resume (PDF)',
      recruiterMode: 'Recruiter View',
      quickPalette: 'Command Menu',
      terminalFocus: 'Focus Terminal',
      language: 'FA / EN',
      badgeCore: 'Core',
      badgePinnRk4: 'PINN & RK4',
      badgeArchitecture: 'Architecture',
      badgeBio: 'Bio',
      badgeRepos: 'Repos',
      badgeContracts: 'Contracts',
      badgeDirect: 'Direct',
      systemOnline: 'ONLINE',
      systemWayland: 'Wayland',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      brandTagline: 'Backend & AI',
      langSwitchToEn: 'Switch to English (EN)',
      langSwitchToFa: 'تغییر به فارسی (FA)',
      recruiterTitle: 'Toggle Recruiter Executive Summary View',
      paletteTitle: 'Command Palette (Ctrl + K)',
      themeTitleToLight: 'Switch to Light Mode',
      themeTitleToDark: 'Switch to Dark Mode',
      openPalette: 'Open Command Palette',
      toggleMenu: 'Toggle Navigation Menu',
    },
    hero: {
      greeting: 'Hello, World! I am',
      name: 'Mohammad Hussein',
      rolePrimary: 'Backend Software Engineer',
      roleSecondary: 'Systems & Scientific Computing',
      tagline: 'Simulating the Universe, One Repo at a Time',
      bio: 'Engineering scalable backend systems, robust APIs, and numerical scientific solvers with mathematical rigor. Powered by Python, Django REST, FastAPI, PostgreSQL, and Linux.',
      ctaProjects: 'Explore Production Work',
      ctaResume: 'Download Resume',
      ctaContact: 'Get in Touch',
      statusOpen: 'Available for Backend Roles & Contracts',
      openToWork: 'Open to Work',
      terminalBadge: 'Interactive Arch Linux Shell',
      focusModePrompt: 'Terminal Cockpit',
      archBadge: 'Arch Linux · Rolling Release',
      statusTag: 'Backend Engineer & AI Systems',
      roleDetail: 'Backend Engineer · Computational Physics Researcher',
      missionDetail: 'Designing and building resilient infrastructure, high-performance Django & FastAPI microservices, distributed databases, and deep learning models that respect the laws of physics.',
      commandHintBefore: 'Press ',
      commandHintAfter: ' for Command Palette',
    },
    stats: {
      apisShipped: 'Production Systems & APIs',
      apisShippedVal: '5+',
      testCoverage: 'Test Coverage Benchmark',
      testCoverageVal: '96%+',
      gaAccuracy: 'Optimization Convergence',
      gaAccuracyVal: '98%',
      latencyReduction: 'Query Latency Reduction',
      latencyReductionVal: '40%',
    },
    scienceLab: {
      badge: 'Interactive Physics & Math Lab',
      title: 'Scientific Computing in Action',
      subtitle: 'Vectorized numerical solvers, continuous neural differential equations, and evolutionary Pareto optimization running live in client-side WebAssembly and JavaScript.',
      tabKinematics: 'Kinematics (RK4)',
      tabGA: 'Genetic Algorithm',
      tabPinn: 'Electro-Thermal PINN',
      tabDiffusion: 'PDE Heat Diffusion',
      repoLink: 'View Real Code on GitHub',
      verifiedOnGithub: 'Verified GitHub Repository',
      pinnTitle: 'Coupled Electro-Thermal Physics-Informed Neural Network',
      pinnDesc: 'Mesh-free deep learning solver incorporating Maxwell equations and Fourier heat transfer with Joule heating into neural loss residuals.',
      gaTitle: 'Multi-Objective Combinatorial Site Selection',
      gaDesc: 'Pareto-optimal genetic algorithm optimizing demographic coverage versus infrastructure deployment cost across 100+ candidate sites.',
      kinematicsTitle: 'Runge-Kutta 4th Order Kinematics Simulator',
      kinematicsDesc: 'Non-linear quadratic aerodynamic drag integration with energy conservation validation across variable planetary gravitational fields.',
      diffusionTitle: '1D/2D Continuous PDE Heat & Wave Solver',
      diffusionDesc: 'Spectral finite-difference PDE integrator with live thermal source injection and dynamic dissipation physics.',
      runSim: 'Run Simulation',
      pauseSim: 'Pause',
      resetSim: 'Reset Parameters',
    },
    projects: {
      badge: 'Featured Engineering Work',
      title: 'Production Projects & Case Studies',
      subtitle: 'Real-world backend architectures, high-performance APIs, optimization engines, and scientific neural networks.',
      allFilter: 'All Projects',
      backendFilter: 'Backend & APIs',
      scientificFilter: 'Scientific & Physics',
      optFilter: 'Optimization',
      toolsFilter: 'Developer Tools',
      viewCaseStudy: 'Read Full Architecture Case Study',
      githubRepo: 'GitHub Repository',
      liveDemo: 'Live Demo',
      featured: 'Featured Project',
      searchPlaceholder: 'Search stack, project...',
      live: 'Live',
      viewLiveSite: 'View Live Site',
      viewGithub: 'View GitHub Repository',
      clientWorkFilter: 'CLIENT WORK',
      personalFilter: 'PERSONAL',
      aiMlFilter: 'AI / ML',
      csProblem: 'The Problem',
      csConstraints: 'Engineering Constraints',
      csArchitecture: 'System Architecture & Pipeline',
      csHighlights: 'Implementation Highlights',
      csTesting: 'Testing & Verification',
      csResults: 'Measurable Results',
      csLessons: 'Lessons Learned & Future Horizons',
      csSourceCode: 'Source Code',
      csTechnologies: 'Technologies:',
      csClose: 'Close',
      csCloseEsc: 'Close (Esc)',
      categoryArchive: 'ARCHIVE',
    },
    stack: {
      badge: 'Engineering Arsenal',
      title: 'Core Technologies & Architecture',
      subtitle: 'Tested methodologies, clean design patterns, and high-performance server architectures.',
      coreCompetencies: 'Core Competencies',
      architecturalPrinciples: 'Architectural Principles',
      principle1Title: 'Clean Modular Architecture',
      principle1Desc: 'Separation of concerns, decoupled domain logic, and well-defined API boundaries.',
      principle2Title: 'Test-Driven Reliability',
      principle2Desc: 'Standardizing 96%+ test coverage via pytest with automated CI gates before merging.',
      principle3Title: 'Data & Caching Efficiency',
      principle3Desc: 'Proactive database indexing, prefetching, and multi-tier Redis caching to minimize query latency.',
      principle4Title: 'Mathematical Grounding',
      principle4Desc: 'Applying physics modeling and analytical rigor to optimize algorithms and data pipelines.',
    },
    about: {
      badge: 'Engineering Identity',
      title: 'Mindset, Rigor & Systems Thinking',
      subtitle: 'How physics-grounded intuition and software craftsmanship shape reliable backend architectures.',
      philosophyTitle: 'Mathematical Rigor & First Principles',
      philosophyBody: 'Viewing software as a dynamic physical system: state transitions obey conservation laws, race conditions are entropy, and optimized algorithms minimize computational friction.',
      systemsTitle: 'Linux-Native Engineering Environment',
      systemsBody: 'Crafted on Arch Linux with KDE Plasma 6.7 and Hyprland (Wayland), utilizing Neovim, Git, Docker, and terminal-first workflows for maximum velocity and zero overhead.',
      pipelineHeading: 'The Scientific Engineering Pipeline',
      pipelineTag: 'Formula to Production',
      storyHeading: 'The Story & Engineering Philosophy',
      pipe1Title: 'Physics',
      pipe1Desc: 'Modeling real-world dynamics & conservation laws',
      pipe2Title: 'Mathematics',
      pipe2Desc: 'Analytical formulation, linear algebra & calculus',
      pipe3Title: 'Problem Solving',
      pipe3Desc: 'Algorithmic abstraction & constraint optimization',
      pipe4Title: 'Scientific Computing',
      pipe4Desc: 'Vectorized NumPy, PyTorch PINNs & simulation',
      pipe5Title: 'Backend Systems',
      pipe5Desc: 'Production Django, FastAPI, PostgreSQL & Redis',
      cyberBadge: 'GitHub Verified Identity',
      cyberSubtitle: 'Python & Django Backend Architect · Linux & Simulation Specialist',
      cyberVisitGithub: 'Visit GitHub',
      cyberCopied: 'Copied',
      cyberCopyLink: 'Copy',
      archBadgeTitle: 'Arch Linux Workstation (Click to copy specs)',
      archBadgeCopied: 'Arch Linux specs copied to clipboard!',
      archBadgeClickToCopy: 'Click to copy system specs',
    },
    opensource: {
      badge: 'Community & Collaboration',
      title: 'Merged Open Source Contributions',
      subtitle: 'Real-world contributions to community tools, memory optimization utilities, and open research repositories.',
      mergedBadge: 'Merged Upstream',
      viewPr: 'View Pull Request on GitHub',
    },
    services: {
      badge: 'Technical Capabilities',
      title: 'What I Can Build & Deliver',
      subtitle: 'High-impact backend services, custom APIs, and scientific computational pipelines.',
      requestProject: 'Initiate Project Discussion',
      requestEstimate: 'Request Project Estimate',
      discussRequirements: 'Discuss requirements',
    },
    contact: {
      badge: 'Let us Connect',
      title: 'Get In Touch & Collaborate',
      subtitle: 'Available for full-time backend engineering positions, freelance systems contracts, and scientific computing projects.',
      directChannels: 'Direct Communication Channels',
      freelanceProfiles: 'Freelance & Contract Platforms',
      sendEmail: 'Send Direct Email',
      telegramDirect: 'Chat on Telegram',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      messageLabel: 'Project Details / Inquiries',
      submitBtn: 'Send Message',
      githubLabel: 'GitHub Workspace',
      sendMessageLabel: 'Send a Direct Message',
      mailClientOpened: 'Mail client opened!',
      copyEmailTooltip: 'Copy email to clipboard',
      verifiedFreelance: 'Verified Freelance Profiles',
      verifiedLabel: 'Verified',
      viewProfileLink: 'View Profile',
    },
    recruiter: {
      bannerTitle: 'Recruiter Quick Summary',
      bannerSubtitle: 'Backend Software Engineer (Python, Django REST, FastAPI, PostgreSQL, Redis) with 96%+ test coverage standard.',
      coreHighlights: 'Core Engineering Highlights',
      downloadResumePdf: 'Download Official Resume (PDF)',
      scheduleInterview: 'Schedule Technical Discussion',
      targetRolesHeading: 'Target Roles & Stack',
      targetRolesTitle: 'Backend Engineer / Python Developer / AI Systems',
      trackRecordHeading: 'Production Track Record',
      track1: '5+ Production APIs Deployed',
      track2: '96%+ Test Coverage Standard',
      track3: '40% Latency Drop via Indexing & Redis',
      architectureHeading: 'Key Architecture Reviews',
      reviewLink: 'Review →',
    },
    terminal: {
      headerTitle: 'Arch Linux Engineering Cockpit (MH-SHELL v2.4)',
      tabShell: 'Interactive Shell',
      tabTelemetry: 'System Environment',
      tabManual: 'Commands Manual',
      inputPlaceholder: 'Type command (e.g. help, fastfetch, hyprland, projects, physics, resume)...',
      desktopSessions: 'Dual Sessions: KDE Plasma 6.7.4 & Hyprland (Wayland)',
    },
    sim: {
      pinn: {
        heading: 'Electro-Thermal PINN Architecture Flow',
        subheading: 'Deep learning solver for coupled nonlinear Fourier & Maxwell PDEs using Rotary Position Embeddings and GQA.',
        canvasLabel: '2D Solution Field (Click to Probe)',
        statTemp: 'Temp (T)',
        statPotential: 'Potential (Φ)',
        statResidual: 'Residual L2',
        trustBadge: 'Exact Energy & Charge Conservation Guaranteed',
        step1Title: '1. Collocation Sampling',
        step1Desc: 'Continuous domain & boundary point sampling without spatial mesh discretization, eliminating grid artifacts.',
        step2Title: '2. Transformer Backbone',
        step2Desc: 'RoPE rotational embeddings + Grouped-Query Attention (GQA) + SwiGLU activations predicting coupled scalar fields.',
        step3Title: '3. Exact Autograd',
        step3Desc: 'Analytical 1st and 2nd order spatial partial derivatives extracted analytically via PyTorch computational graph.',
        step4Title: '4. Coupled Physics Loss',
        step4Desc: 'Energy conservation residual loss combining Fourier thermal conduction and Maxwell electrostatic Joule heating.',
        step5Title: '5. Converged Solution',
        step5Desc: 'High-fidelity differentiable solution fields queryable at arbitrary resolution with sub-millikelvin accuracy.',
      },
      ga: {
        heading: 'Multi-Objective Facility Site Selection (DEAP)',
        subheading: 'Evolutionary pipeline solving NP-hard facility location problems under population coverage and cost constraints via Pareto optimization.',
        pauseGA: 'Pause GA',
        evolveGA: 'Evolve Gen',
        genLabel: 'Gen',
        activeSitesLabel: 'Active Sites',
        legend: 'Cyan: Demand | Green Circles: Sites',
        chromosomeLabel: 'Best Chromosome Bitstring (16-bit):',
        paretoHeading: 'Pareto Fitness Telemetry',
        maxFitness: 'Max Fitness',
        coverageScore: 'Coverage Score',
        capitalCost: 'Capital Cost',
        avgFitness: 'Avg Fitness',
        mutationRate: 'Mutation Rate (pₘ):',
        populationSize: 'Population Size (N):',
      },
      heat: {
        heading: 'Continuous PDE Finite Difference Solver',
        subheading: 'Real-time numerical 5-point discrete Laplacian stencil for 2D Fourier heat diffusion & wave propagation.',
        modeHeat: 'Heat PDE',
        modeWave: 'Wave PDE',
        canvasLabel: '2D Discrete Spatial Field (40x40 Grid)',
        canvasHint: 'Click / Drag on canvas to inject energy',
        legendLow: 'Cold (0 K)',
        legendHigh: 'Peak Heat (T_max)',
        legendWaveLow: 'Valley (-1)',
        legendWaveHigh: 'Crest (+1)',
        governingLabel: 'Governing PDE Formulation',
        governingTag: 'FTCS & Central Diff',
        heatDesc: 'Fourier thermal conduction: Rate of temperature change proportional to second spatial derivatives (Laplacian).',
        waveDesc: 'Hyperbolic wave equation with linear damping, modeling acoustic membrane and electromagnetic ripple modes.',
        sourceLabel: 'Initial Impulse Source Geometry:',
        sourceGaussian: 'Gaussian Pulse',
        sourceDipole: 'Dipole Source',
        sourceSine: 'Fourier Harmonic',
        diffusivityHeat: 'Diffusivity (α):',
        diffusivityWave: 'Wave Speed (c):',
        dampingLabel: 'Damping Factor (γ):',
        pauseTitle: 'Pause Simulation',
        playTitle: 'Run Simulation',
        resetTitle: 'Reset Grid Field',
      },
      projectile: {
        heading: 'Vectorized Projectile Kinematics Simulator',
        subheading: 'Precision numerical integrator for non-linear quadratic aerodynamic drag with selectable planetary gravity presets.',
        vacuumOn: 'Vacuum Baseline: ON',
        vacuumOff: 'Vacuum Baseline: OFF',
        airDragTrajectory: 'Air Drag Trajectory (RK4)',
        vacuumIdealPath: 'Vacuum Ideal Path',
        flightTimeLabel: 'Flight Time',
        flightTimeUnit: 's',
        paramsHeading: 'Launch & Atmospheric Parameters',
        initialVelocity: 'Initial Velocity (v₀):',
        launchAngle: 'Launch Angle (θ):',
        airDragCoeff: 'Air Drag Coeff (Cd·A):',
        gravityPresetLabel: 'Planetary Gravity Preset:',
        planetEarth: 'Earth',
        planetMoon: 'Moon',
        planetMars: 'Mars',
        planetJupiter: 'Jupiter',
        metricsHeading: 'Kinematic Metrics & Energy',
        maxRange: 'Max Range',
        maxAltitude: 'Max Altitude',
        impactVelocity: 'Impact Velocity',
        initialEnergy: 'Initial Energy',
        equationLabel: 'Differential Vector Equation:',
      },
    },
    communication: {
      badge: 'Technical Communication & Localization',
      title: 'Documentation & Bilingual Engineering',
      subtitle: 'Precision technical writing, RTL localization, and academic LaTeX manuscripts bridging English and Persian technical communities.',
      contentStudioRepo: 'Content Studio Repo',
      exploreDocuments: 'Explore Documents',
    }
  },
  fa: {
    nav: {
      projects: 'پروژه‌ها',
      scienceLab: 'آزمایشگاه علمی',
      stack: 'استک فنی',
      about: 'درباره من',
      opensource: 'اوپن سورس',
      services: 'خدمات',
      contact: 'تماس',
      resume: 'رزومه (PDF)',
      recruiterMode: 'دیدگاه کارفرما',
      quickPalette: 'منوی دستورات',
      terminalFocus: 'تمرکز بر ترمینال',
      language: 'English / فارسی',
      badgeCore: 'هسته',
      badgePinnRk4: 'PINN و RK4',
      badgeArchitecture: 'معماری',
      badgeBio: 'بیوگرافی',
      badgeRepos: 'مخازن کد',
      badgeContracts: 'قراردادها',
      badgeDirect: 'مستقیم',
      systemOnline: 'آنلاین',
      systemWayland: 'ویلند',
      lightMode: 'حالت روشن',
      darkMode: 'حالت تاریک',
      brandTagline: 'مهندسی بک‌اند و هوش مصنوعی',
      langSwitchToEn: 'Switch to English (EN)',
      langSwitchToFa: 'تغییر به فارسی (FA)',
      recruiterTitle: 'نمایش خلاصه اجرایی برای کارفرما',
      paletteTitle: 'منوی دستورات (Ctrl + K)',
      themeTitleToLight: 'تغییر به حالت روشن',
      themeTitleToDark: 'تغییر به حالت تاریک',
      openPalette: 'باز کردن منوی دستورات',
      toggleMenu: 'باز/بستن منوی ناوبری',
    },
    hero: {
      greeting: 'سلام، من',
      name: 'محمدحسین غفوری',
      rolePrimary: 'مهندس بک‌اند و سیستم',
      roleSecondary: 'محاسبات علمی و هوش مصنوعی فیزیک‌محور',
      tagline: 'شبیه‌سازی جهان هستی، با هر ریپازیتوری کد',
      bio: 'توسعه‌دهنده سیستم‌های بک‌اند مقیاس‌پذیر، وب‌سرویس‌های امن و الگوریتم‌های محاسبات علمی مبتنی بر فیزیک و ریاضیات محض با استفاده از Python، Django REST، FastAPI، PostgreSQL و محیط‌های تخصصی لینوکس.',
      ctaProjects: 'مشاهده پروژه‌ها و مستندات',
      ctaResume: 'دریافت فایل رزومه',
      ctaContact: 'شروع همکاری و تماس',
      statusOpen: 'آماده همکاری برای موقعیت‌های شغلی بک‌اند و پروژه‌ای',
      openToWork: 'آماده به کار',
      terminalBadge: 'ترمینال تعاملی آرچ لینوکس',
      focusModePrompt: 'کابین ترمینال مهندسی',
      archBadge: 'آرچ لینوکس · توزیع Rolling Release',
      statusTag: 'مهندس بک‌اند و سیستم‌های محاسباتی هوش مصنوعی',
      roleDetail: 'مهندس ارشد بک‌اند (پایتون/جنگو) · پژوهشگر فیزیک محاسباتی و شبکه‌های PINN',
      missionDetail: 'طراح و توسعه‌دهنده زیرساخت‌های پایدار، میکروسرویس‌های پرسرعت جنگو و فست‌ای‌پی‌آی، پایگاه‌های داده توزیع‌شده و مدل‌های یادگیری عمیق حاکم بر معادلات دیفرانسیل فیزیک.',
      commandHintBefore: 'برای باز کردن پالت دستورات کلیدهای ',
      commandHintAfter: ' را فشار دهید',
    },
    stats: {
      apisShipped: 'وب‌سرویس‌ها و سیستم‌های پیاده‌شده',
      apisShippedVal: '+۵',
      testCoverage: 'پوشش تست‌های خودکار (Pytest)',
      testCoverageVal: '+۹۶٪',
      gaAccuracy: 'دقت همگرایی الگوریتم ژنتیک',
      gaAccuracyVal: '۹۸٪',
      latencyReduction: 'بهینه‌سازی زمان پاسخ با کشینگ',
      latencyReductionVal: '۴۰٪',
    },
    scienceLab: {
      badge: 'آزمایشگاه تعاملی فیزیک و ریاضیات',
      title: 'محاسبات علمی و هوش مصنوعی در عمل',
      subtitle: 'شبیه‌سازهای عددی برداری، شبکه‌های عصبی فیزیک‌محور (PINN) و بهینه‌سازی چندمعیاره پارتو با اجرای مستقیم در مرورگر.',
      tabKinematics: 'سینماتیک و درگ هوا (RK4)',
      tabGA: 'الگوریتم ژنتیک (DEAP)',
      tabPinn: 'شبکه عصبی PINN الکتروترمال',
      tabDiffusion: 'انتشار حرارت و موج (PDE)',
      repoLink: 'مشاهده کد اصلی در گیت‌هاب',
      verifiedOnGithub: 'ریپازیتوری رسمی گیت‌هاب',
      pinnTitle: 'شبکه عصبی دیفرانسیلی فیزیک‌محور (Electro-Thermal PINN)',
      pinnDesc: 'حل پیوسته و بدون مش‌بندی معادلات ماکسول و انتقال حرارت فوریه با گرمایش ژول بر پایه گرادیان‌های تحلیلی اتوگراد PyTorch.',
      gaTitle: 'بهینه‌سازی چندمعیاره مکان‌یابی با الگوریتم ژنتیک',
      gaDesc: 'الگوریتم تکاملی مبتنی بر DEAP جهت انتخاب بهینه مکان مراکز از میان صدها نقطه کاندید با حداکثر پوشش جمعیتی و کمترین هزینه ساخت.',
      kinematicsTitle: 'شبیه‌ساز سینماتیک مرتبه چهارم رانگ-کوتا (RK4)',
      kinematicsDesc: 'انتگرال‌گیری عددی مقاومت غیرخطی هوا با بررسی بقای انرژی و امکان انتخاب میدان‌های گرانشی زمین، ماه و مریخ.',
      diffusionTitle: 'حل‌کننده پیوسته معادلات دیفرانسیل جزئی حرارت و موج',
      diffusionDesc: 'محاسبه فوریه و تفاضل متناهی با تزریق مستقیم پالس‌های حرارتی و شبیه‌سازی پخش انرژی در بستر زمان.',
      runSim: 'اجرای شبیه‌سازی',
      pauseSim: 'توقف',
      resetSim: 'تنظیم مجدد پارامترها',
    },
    projects: {
      badge: 'پروژه‌های شاخص مهندسی',
      title: 'سیستم‌های بک‌اند و نمونه‌کارهای فنی',
      subtitle: 'معماری‌های نرم‌افزاری واقعی، وب‌سرویس‌های پرسرعت، موتورهای بهینه‌سازی داده و کدهای علمی تست‌شده.',
      allFilter: 'همه پروژه‌ها',
      backendFilter: 'بک‌اند و API',
      scientificFilter: 'محاسبات علمی و فیزیک',
      optFilter: 'الگوریتم‌های بهینه‌سازی',
      toolsFilter: 'ابزارهای توسعه‌دهنده',
      viewCaseStudy: 'مطالعه مستندات کامل معماری (Case Study)',
      githubRepo: 'ریپازیتوری گیت‌هاب',
      liveDemo: 'دموی آنلاین',
      featured: 'پروژه شاخص',
      searchPlaceholder: 'جستجوی پروژه، تکنولوژی...',
      live: 'زنده',
      viewLiveSite: 'مشاهده سایت زنده',
      viewGithub: 'مخزن گیت‌هاب',
      clientWorkFilter: 'پروژه‌های واقعی مشتری',
      personalFilter: 'پروژه‌های شخصی',
      aiMlFilter: 'هوش مصنوعی و PINN',
      csProblem: 'مشکل اصلی',
      csConstraints: 'محدودیت‌های مهندسی',
      csArchitecture: 'معماری سیستم و خط لوله',
      csHighlights: 'نکات برجسته پیاده‌سازی',
      csTesting: 'تست و اعتبارسنجی',
      csResults: 'نتایج قابل اندازه‌گیری',
      csLessons: 'درس‌های آموخته و چشم‌انداز آینده',
      csSourceCode: 'کد منبع',
      csTechnologies: 'تکنولوژی‌ها:',
      csClose: 'بستن',
      csCloseEsc: 'بستن (Esc)',
      categoryArchive: 'آرشیو',
    },
    stack: {
      badge: 'تکنولوژی‌ها و ابزارها',
      title: 'استک فنی و اصول معماری',
      subtitle: 'الگوهای تمیز طراحی، معماری سرویس‌گرا و اصول مهندسی سیستم‌های پایدار.',
      coreCompetencies: 'مهارت‌های تخصصی هسته',
      architecturalPrinciples: 'اصول و استانداردهای مهندسی',
      principle1Title: 'معماری ماژولار و تمیز',
      principle1Desc: 'جداسازی کامل لایه‌ها، منطق دامنه مستقل و تعریف شفاف مرزهای API بر اساس الگوهای SOLID و Clean Architecture.',
      principle2Title: 'توسعه مبتنی بر تست (TDD)',
      principle2Desc: 'پوشش تست ۹۶٪+ با pytest، تست‌های ایزوله واحد و یکپارچه‌سازی خودکار در خط لوله CI/CD.',
      principle3Title: 'بهینه‌سازی دیتابیس و کشینگ',
      principle3Desc: 'ایندکس‌گذاری دقیق، جلوگیری از N+1 با prefetch_related و کشینگ چندلایه‌ای Redis جهت حداقل زمان تاخیر.',
      principle4Title: 'پایه‌های علمی و ریاضی',
      principle4Desc: 'به‌کارگیری مدل‌سازی فیزیک و دقت تحلیلی در بهینه‌سازی الگوریتم‌ها و خطوط پردازش داده.',
    },
    about: {
      badge: 'هویت مهندسی و بینش',
      title: 'دیدگاه فیزیکی، دقت و تفکر سیستمی',
      subtitle: 'چگونه نگرش ریاضی و فیزیک پایه ساختار نرم‌افزارهای بک‌اند را مستحکم و خطاناپذیر می‌سازد.',
      philosophyTitle: 'دقت ریاضی و درک از اصول اولیه (First Principles)',
      philosophyBody: 'نگاه به نرم‌افزار به عنوان یک سیستم فیزیکی پویا: تغییر وضعیت‌ها تابع قوانین بقا هستند، رفتارهای ناهمگام (Race Conditions) آنتروپی سیستمند و کدهای بهینه اصطکاک محاسباتی را به صفر می‌رسانند.',
      systemsTitle: 'محیط مهندسی لینوکس با دو رابط تخصصی',
      systemsBody: 'توسعه روزمره روی Arch Linux با رابط‌های مدرن KDE Plasma 6.7 و Hyprland (Wayland)، استفاده از Neovim، Git، Docker و ترمینال برای دستیابی به حداکثر بازدهی بدون بار اضافه.',
      pipelineHeading: 'خط لوله مهندسی علمی',
      pipelineTag: 'از فرمول تا محیط پروداکشن',
      storyHeading: 'داستان و جهان‌بینی مهندسی',
      pipe1Title: 'فیزیک',
      pipe1Desc: 'مدل‌سازی دینامیک جهان واقعی و قوانین بقا',
      pipe2Title: 'ریاضیات',
      pipe2Desc: 'فرمول‌بندی تحلیلی، جبر خطی و حساب دیفرانسیل',
      pipe3Title: 'حل مسئله',
      pipe3Desc: 'انتزاع الگوریتمی و بهینه‌سازی تحت قیود',
      pipe4Title: 'محاسبات علمی',
      pipe4Desc: 'آرایه‌های برداری NumPy، شبکه‌های PINN و شبیه‌سازی',
      pipe5Title: 'سیستم‌های بک‌اند',
      pipe5Desc: 'میکروسرویس‌های جنگو، FastAPI، پستگرس و ردیس در محیط پروداکشن',
      cyberBadge: 'هویت گیت‌هاب و وضعیت زنده',
      cyberSubtitle: 'توسعه‌دهنده بک‌اند پایتون و جنگو · مسلط به آرچ لینوکس و سیستم‌های علمی',
      cyberVisitGithub: 'مشاهده پروفایل گیت‌هاب',
      cyberCopied: 'کپی شد',
      cyberCopyLink: 'کپی لینک',
      archBadgeTitle: 'ایستگاه کاری آرچ لینوکس (برای کپی مشخصات کلیک کنید)',
      archBadgeCopied: 'مشخصات آرچ لینوکس در کلیپ‌بورد کپی شد!',
      archBadgeClickToCopy: 'برای کپی مشخصات سیستم کلیک کنید',
    },
    opensource: {
      badge: 'جامعه کاربری و اشتراک دانش',
      title: 'مشارکت‌های تاییدشده در اوپن سورس',
      subtitle: 'پول ریکوئست‌های مرج‌شده در پروژه‌های عمومی، ابزارهای کاهش مصرف رم و کارهای اشتراکی.',
      mergedBadge: 'مرج‌شده در سورس اصلی',
      viewPr: 'مشاهده Pull Request در گیت‌هاب',
    },
    services: {
      badge: 'توانمندی‌های فنی',
      title: 'آنچه برای شما می‌سازم و تحویل می‌دهم',
      subtitle: 'سیستم‌های قدرتمند بک‌اند، طراحی پایگاه‌های داده مقیاس‌پذیر و پایپ‌لاین‌های محاسباتی.',
      requestProject: 'ثبت درخواست و شروع مذاکره',
      requestEstimate: 'درخواست برآورد پروژه',
      discussRequirements: 'بحث درباره نیازمندی‌ها',
    },
    contact: {
      badge: 'ارتباط مستقیم',
      title: 'شروع همکاری و راه‌های ارتباطی',
      subtitle: 'آماده همکاری برای موقعیت‌های شغلی تمام‌وقت بک‌اند، پروژه‌های فریلنسری و مشاوره مهندسی نرم‌افزار.',
      directChannels: 'کانال‌های ارتباط مستقیم',
      freelanceProfiles: 'پروفایل‌های فریلنسری و کاریابی',
      sendEmail: 'ارسال مستقیم ایمیل',
      telegramDirect: 'پیام مستقیم در تلگرام',
      nameLabel: 'نام شما',
      emailLabel: 'آدرس ایمیل شما',
      messageLabel: 'جزییات پروژه یا پیام شما',
      submitBtn: 'ارسال پیام',
      githubLabel: 'مخزن‌های گیت‌هاب',
      sendMessageLabel: 'ارسال پیام مستقیم',
      mailClientOpened: 'نرم‌افزار ایمیل باز شد!',
      copyEmailTooltip: 'کپی ایمیل در کلیپ‌بورد',
      verifiedFreelance: 'پروفایل‌های فریلنسری تاییدشده',
      verifiedLabel: 'تاییدشده',
      viewProfileLink: 'مشاهده پروفایل',
    },
    recruiter: {
      bannerTitle: 'خلاصه فنی برای کارفرمایان و مدیران فنی',
      bannerSubtitle: 'مهندس بک‌اند پایتون (Django REST، FastAPI، PostgreSQL، Redis) با استاندارد بالای تست‌نویسی (+۹۶٪ پوشش خودکار).',
      coreHighlights: 'نکات کلیدی برجسته',
      downloadResumePdf: 'دریافت رزومه رسمی (PDF)',
      scheduleInterview: 'تنظیم جلسه مصاحبه فنی',
      targetRolesHeading: 'جایگاه‌های شغلی و مهارت‌ها',
      targetRolesTitle: 'مهندس ارشد بک‌اند / پایتون / سیستم‌های هوش مصنوعی',
      trackRecordHeading: 'شاخص‌های عملیاتی اثبات‌شده',
      track1: '۵+ سرویس بک‌اند مستقر در پروداکشن',
      track2: 'استاندارد پوشش تست ۹۶٪+ با pytest',
      track3: '۴۰٪ کاهش زمان تاخیر کوئری‌ها با کش Redis',
      architectureHeading: 'معماری‌های کلیدی پیشنهادی',
      reviewLink: 'بررسی ←',
    },
    terminal: {
      headerTitle: 'کابین مهندسی آرچ لینوکس (MH-SHELL نسخه ۲.۴)',
      tabShell: 'شل تعاملی',
      tabTelemetry: 'وضعیت سیستم',
      tabManual: 'راهنمای دستورات',
      inputPlaceholder: 'دستور مورد نظر را وارد کنید (مانند help, fastfetch, hyprland, projects, physics)...',
      desktopSessions: 'پشتیبانی از دو محیط: KDE Plasma 6.7.4 و Hyprland (Wayland)',
    },
    sim: {
      pinn: {
        heading: 'شبکه عصبی آگاه از فیزیک (PINN) الکتروترمال',
        subheading: 'حل‌کننده یادگیری عمیق معادلات دیفرانسیل جزئی غیرخطی کوپل‌شده ماکسول و انتقال حرارت فوریه با RoPE و GQA.',
        canvasLabel: 'میدان دما و پتانسیل (کلیک برای پروب)',
        statTemp: 'دما T',
        statPotential: 'پتانسیل Φ',
        statResidual: 'خطای PDE',
        trustBadge: 'قوانین بقای ترمودینامیک و الکترومغناطیس اثبات شده',
        step1Title: '۱. مختصات فضا-زمان بدون شبکه',
        step1Desc: 'نمونه‌برداری بدون مشبکه‌بندی (Mesh-Free) از کل دامنه فیزیکی و مرزها. حذف کامل خطای گسسته‌سازی المان محدود (FEM).',
        step2Title: '۲. معماری ترنسفورمر / MLP',
        step2Desc: 'مجهز به بردار موقعیت چرخشی (RoPE)، مکانیزم توجه چندگروهی (GQA) و فعال‌ساز SwiGLU برای تخمین همزمان گرادیان‌ها.',
        step3Title: '۳. مشتق‌گیری خودکار دقیق (Autograd)',
        step3Desc: 'محاسبه مشتقات جزئی مرتبه اول و دوم تحلیلی از طریق گراف محاسباتی پای‌تورچ بدون هیچ تقریب تفاضل متناهی.',
        step4Title: '۴. تابع زیان فیزیکی کوپل‌شده',
        step4Desc: 'تضمین قانون بقای انرژی و انتقال حرارت ژول: ρ c_p ∂T/∂t − ∇·(k∇T) − σ|∇Φ|² = 0.',
        step5Title: '۵. میدان حل همگرا و کوئری‌پذیر',
        step5Desc: 'میدان پیوسته و مشتق‌پذیر حرارتی و پتانسیل الکتریکی با خطای L2 کمتر از 0.0009، قابل کوئری در هر رزولوشن دلخواه.',
      },
      ga: {
        heading: 'بهینه‌سازی چندهدفه مکان‌یابی با الگوریتم ژنتیک',
        subheading: 'خط لوله تکاملی برای حل مسائل NP-hard مکان‌یابی تسهیلات با تضمین پوشش جمعیتی و محدودیت هزینه از طریق بهینه‌سازی پارتو.',
        pauseGA: 'توقف تکامل',
        evolveGA: 'اجرای تکامل',
        genLabel: 'نسل',
        activeSitesLabel: 'سایت‌های فعال',
        legend: 'نقاط فیروزه‌ای: تقاضا | دایره‌های سبز: تسهیلات',
        chromosomeLabel: 'ژنوم کروموزوم برتر (۱۶ بیتی):',
        paretoHeading: 'شاخص‌های شایستگی پارتو',
        maxFitness: 'امتیاز شایستگی',
        coverageScore: 'پوشش جمعیت',
        capitalCost: 'هزینه سرمایه‌ای',
        avgFitness: 'میانگین جمعیت',
        mutationRate: 'نرخ جهش ژنتیکی (pₘ):',
        populationSize: 'اندازه جمعیت اولیه (N):',
      },
      heat: {
        heading: 'شبیه‌ساز پیوسته معادلات دیفرانسیل جزئی (PDE)',
        subheading: 'حل عددی تفاضل متناهی معادلات دیفرانسیل انتقال حرارت فوریه و موج پیوسته دو بعدی.',
        modeHeat: 'انتقال حرارت',
        modeWave: 'انتشار موج',
        canvasLabel: 'شبکه ۲ بعدی پیوسته (۴۰×۴۰ المان)',
        canvasHint: 'برای تزریق حرارت/موج روی صفحه کلیک و درگ کنید',
        legendLow: 'Cold (0 K)',
        legendHigh: 'Peak Heat (T_max)',
        legendWaveLow: 'Valley (-1)',
        legendWaveHigh: 'Crest (+1)',
        governingLabel: 'معادله حاکم بر سیستم',
        governingTag: 'FTCS & Central Diff',
        heatDesc: 'قانون هدایت گرمایی فوریه: سرعت تغییر دما با لاپلاسین میدان دما و ضریب نفوذ حرارتی تناسب مستقیم دارد.',
        waveDesc: 'معادله موج هایپربولیک دو بعدی با اصطکاک و میرایی خطی، مدل‌کننده نوسانات امواج آکوستیک و الکترومغناطیسی.',
        sourceLabel: 'الگوی چگالی اولیه منبع:',
        sourceGaussian: 'گوسی متمرکز',
        sourceDipole: 'دوقطبی پلار',
        sourceSine: 'هارمونیک سینوسی',
        diffusivityHeat: 'ضریب نفوذ حرارتی (α):',
        diffusivityWave: 'سرعت فاز موج (c):',
        dampingLabel: 'ضریب میرایی محیط (γ):',
        pauseTitle: 'توقف شبیه‌سازی',
        playTitle: 'اجرای شبیه‌سازی',
        resetTitle: 'بازنشانی میدان شبکه',
      },
      projectile: {
        heading: 'شبیه‌ساز سینماتیک پرتابه با انتگرال‌گیر RK4',
        subheading: 'انتگرال‌گیر عددی دقیق برای درگ غیرخطی درجه دوم هوا با پیش‌تنظیم‌های گرانش سیارات.',
        vacuumOn: 'مقایسه با خلاء: فعال',
        vacuumOff: 'مقایسه با خلاء: خاموش',
        airDragTrajectory: 'مسیر واقعی با درگ RK4',
        vacuumIdealPath: 'مسیر بدون مقاومت هوا (خلاء)',
        flightTimeLabel: 'مدت پرواز',
        flightTimeUnit: ' ثانیه',
        paramsHeading: 'پارامترهای پرتاب و محیط',
        initialVelocity: 'سرعت اولیه (v₀):',
        launchAngle: 'زاویه پرتاب (θ):',
        airDragCoeff: 'ضریب درگ هوا (Cd·A):',
        gravityPresetLabel: 'میدان گرانش جرم آسمانی:',
        planetEarth: 'زمین',
        planetMoon: 'ماه',
        planetMars: 'مریخ',
        planetJupiter: 'مشتری',
        metricsHeading: 'داده‌های عددی و اتلاف انرژی',
        maxRange: 'برد پرتابه (X)',
        maxAltitude: 'اوج ارتفاع (Y)',
        impactVelocity: 'سرعت برخورد',
        initialEnergy: 'انرژی جنبشی اولیه',
        equationLabel: 'معادله دیفرانسیل برداری حرکت:',
      },
    },
    communication: {
      badge: 'ارتباط فنی و بومی‌سازی',
      title: 'مستندسازی و مهندسی دوزبانه',
      subtitle: 'مستندسازی فنی دقیق، بومی‌سازی راست‌به‌چپ و مقالات آکادمیک LaTeX که جوامع فنی انگلیسی و فارسی را به هم متصل می‌کند.',
      contentStudioRepo: 'مخزن Content Studio',
      exploreDocuments: 'مشاهده اسناد',
    }
  }
};
