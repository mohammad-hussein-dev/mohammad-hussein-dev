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
  };
  stack: {
    badge: string;
    title: string;
    subtitle: string;
    coreCompetencies: string;
    architecturalPrinciples: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    philosophyTitle: string;
    philosophyBody: string;
    systemsTitle: string;
    systemsBody: string;
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
  };
  recruiter: {
    bannerTitle: string;
    bannerSubtitle: string;
    coreHighlights: string;
    downloadResumePdf: string;
    scheduleInterview: string;
  };
  terminal: {
    headerTitle: string;
    tabShell: string;
    tabTelemetry: string;
    tabManual: string;
    inputPlaceholder: string;
    desktopSessions: string;
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
    },
    stack: {
      badge: 'Engineering Arsenal',
      title: 'Core Technologies & Architecture',
      subtitle: 'Tested methodologies, clean design patterns, and high-performance server architectures.',
      coreCompetencies: 'Core Competencies',
      architecturalPrinciples: 'Architectural Principles',
    },
    about: {
      badge: 'Engineering Identity',
      title: 'Mindset, Rigor & Systems Thinking',
      subtitle: 'How physics-grounded intuition and software craftsmanship shape reliable backend architectures.',
      philosophyTitle: 'Mathematical Rigor & First Principles',
      philosophyBody: 'Viewing software as a dynamic physical system: state transitions obey conservation laws, race conditions are entropy, and optimized algorithms minimize computational friction.',
      systemsTitle: 'Linux-Native Engineering Environment',
      systemsBody: 'Crafted on Arch Linux with KDE Plasma 6.7 and Hyprland (Wayland), utilizing Neovim, Git, Docker, and terminal-first workflows for maximum velocity and zero overhead.',
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
    },
    recruiter: {
      bannerTitle: 'Recruiter Quick Summary',
      bannerSubtitle: 'Backend Software Engineer (Python, Django REST, FastAPI, PostgreSQL, Redis) with 96%+ test coverage standard.',
      coreHighlights: 'Core Engineering Highlights',
      downloadResumePdf: 'Download Official Resume (PDF)',
      scheduleInterview: 'Schedule Technical Discussion',
    },
    terminal: {
      headerTitle: 'Arch Linux Engineering Cockpit (MH-SHELL v2.4)',
      tabShell: 'Interactive Shell',
      tabTelemetry: 'System Environment',
      tabManual: 'Commands Manual',
      inputPlaceholder: 'Type command (e.g. help, fastfetch, hyprland, projects, physics, resume)...',
      desktopSessions: 'Dual Sessions: KDE Plasma 6.7.4 & Hyprland (Wayland)',
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
    },
    stack: {
      badge: 'تکنولوژی‌ها و ابزارها',
      title: 'استک فنی و اصول معماری',
      subtitle: 'الگوهای تمیز طراحی، معماری سرویس‌گرا و اصول مهندسی سیستم‌های پایدار.',
      coreCompetencies: 'مهارت‌های تخصصی هسته',
      architecturalPrinciples: 'اصول و استانداردهای مهندسی',
    },
    about: {
      badge: 'هویت مهندسی و بینش',
      title: 'دیدگاه فیزیکی، دقت و تفکر سیستمی',
      subtitle: 'چگونه نگرش ریاضی و فیزیک پایه ساختار نرم‌افزارهای بک‌اند را مستحکم و خطاناپذیر می‌سازد.',
      philosophyTitle: 'دقت ریاضی و درک از اصول اولیه (First Principles)',
      philosophyBody: 'نگاه به نرم‌افزار به عنوان یک سیستم فیزیکی پویا: تغییر وضعیت‌ها تابع قوانین بقا هستند، رفتارهای ناهمگام (Race Conditions) آنتروپی سیستمند و کدهای بهینه اصطکاک محاسباتی را به صفر می‌رسانند.',
      systemsTitle: 'محیط مهندسی لینوکس با دو رابط تخصصی',
      systemsBody: 'توسعه روزمره روی Arch Linux با رابط‌های مدرن KDE Plasma 6.7 و Hyprland (Wayland)، استفاده از Neovim، Git، Docker و ترمینال برای دستیابی به حداکثر بازدهی بدون بار اضافه.',
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
    },
    recruiter: {
      bannerTitle: 'خلاصه فنی برای کارفرمایان و مدیران فنی',
      bannerSubtitle: 'مهندس بک‌اند پایتون (Django REST، FastAPI، PostgreSQL، Redis) با استاندارد بالای تست‌نویسی (+۹۶٪ پوشش خودکار).',
      coreHighlights: 'نکات کلیدی برجسته',
      downloadResumePdf: 'دریافت رزومه رسمی (PDF)',
      scheduleInterview: 'تنظیم جلسه مصاحبه فنی',
    },
    terminal: {
      headerTitle: 'کابین مهندسی آرچ لینوکس (MH-SHELL نسخه ۲.۴)',
      tabShell: 'شل تعاملی',
      tabTelemetry: 'وضعیت سیستم',
      tabManual: 'راهنمای دستورات',
      inputPlaceholder: 'دستور مورد نظر را وارد کنید (مانند help, fastfetch, hyprland, projects, physics)...',
      desktopSessions: 'پشتیبانی از دو محیط: KDE Plasma 6.7.4 و Hyprland (Wayland)',
    }
  }
};
