export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'BACKEND' | 'AI / ML' | 'SCIENTIFIC' | 'OPTIMIZATION' | 'TOOLS';
  oneLiner: string;
  description: string;
  technologies: string[];
  metrics: string[];
  stars?: number;
  forks?: number;
  featuredOrder: number;
  githubUrl: string;
  gitlabUrl?: string;
  liveUrl?: string;
  caseStudy: {
    problem: string;
    constraints: string;
    approach: string;
    architectureDescription: string;
    architectureSteps: string[];
    implementationHighlights: string[];
    testing: string;
    results: string[];
    lessonsLearned: string[];
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export interface OpenSourceContribution {
  id: string;
  repository: string;
  repoUrl: string;
  prUrl: string;
  title: string;
  description: string;
  highlights: string[];
  status: 'Merged' | 'Active';
  technologies: string[];
}

export interface ContentDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  url: string;
  badge: string;
}

export const PROFILE = {
  name: "Mohammad Hussein",
  fullName: "Mohammad Hussein Ghafoori",
  primaryRole: "Backend Engineer",
  secondaryRole: "Systems & Scientific Computing",
  tagline: "Simulating the Universe, One Repo at a Time",
  missionStatement: "Building reliable backend systems, APIs, and scientific software with a strong foundation in physics and mathematics.",
  location: "Tehran, Iran",
  email: "king.mohamd.09876@gmail.com",
  github: "https://github.com/mohammad-hussein-dev",
  gitlab: "https://gitlab.com/mohammad-hussein-dev",
  linkedin: "https://www.linkedin.com/in/mohammad-hussein-dev/",
  telegram: "https://t.me/mohammad_hussein_dev",
  telegramHandle: "@mohammad_hussein_dev",
  xTwitter: "https://x.com/mohammad_h_dev",
  xTwitterHandle: "@mohammad_h_dev",
  youtube: "https://www.youtube.com/@mohammad_hussein_dev",
  resumeUrl: "https://mohammad-hussein-dev.github.io/mohammad-hussein-dev/Resume/Resume.pdf",
  contentStudioUrl: "https://github.com/mohammad-hussein-dev/content-studio",
  freelancePlatforms: [
    { name: "Karlancer", url: "https://karlancer.com/profile/1401608", badge: "MohammadHossein.Gh" },
    { name: "Parscoders", url: "https://parscoders.com/resume/769525/mohammad_hussein", badge: "mohammad_hussein" },
    { name: "Typeiran", url: "https://typeiran.com/user/797507", badge: "Mohammad Hussein Ghafoori" },
    { name: "Lancerify", url: "https://lancerify.com/fre/10007982", badge: "Mohammad Hussein" },
    { name: "Jobvision", url: "https://jobvision.ir/cv/56014003-151757", badge: "CV: 56014003" },
    { name: "Ponisha", url: "https://ponisha.ir/profile/MHussein1", badge: "MHussein1" }
  ],
  stats: [
    { label: "Production APIs Shipped", value: "5+" },
    { label: "Test Coverage Benchmark", value: "96%+" },
    { label: "GA Convergence Accuracy", value: "98%" },
    { label: "Latency Reduction via Caching", value: "40%" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "pinn",
    slug: "electro-thermal-pinn",
    title: "Electro-Thermal Physics-Informed Neural Network",
    category: "SCIENTIFIC",
    oneLiner: "Mesh-free deep learning PDE solver coupling Maxwell's equations and heat transfer with Joule heating.",
    description: "A physics-informed neural network (PINN) capable of modeling coupled electromagnetic-thermal dynamics without finite element grid discretization, using modern transformer and MLP backbones.",
    technologies: ["PyTorch", "PINN", "RoPE", "GQA", "SwiGLU", "Python", "NumPy", "Matplotlib"],
    metrics: ["Relative L2 Error < 9.09e-04", "3 Architectures: MLP / MLPPINN / TransformerPINN", "CPU Convergence in ~5 mins"],
    featuredOrder: 1,
    githubUrl: "https://github.com/mohammad-hussein-dev/electro-thermal-pinn",
    gitlabUrl: "https://gitlab.com/mohammad-hussein-dev/electro-thermal-pinn",
    caseStudy: {
      problem: "Traditional Finite Element Method (FEM) and Finite Volume Method (FVM) electromagnetic-thermal simulations require dense spatial meshes and high compute clusters, creating massive bottlenecks for multi-parameter sweeps.",
      constraints: "Non-linear coupled PDEs (heat diffusion with temperature-dependent electrical conductivity $\\sigma(T)$ and Joule heat generation $Q = \\sigma |E|^2$), requiring exact physical constraint enforcement at every domain point.",
      approach: "Formulated a mesh-free continuous solver that incorporates governing Maxwell and Fourier PDE residuals directly into the loss function via automatic differentiation, training neural weights to satisfy boundary conditions and field dynamics simultaneously.",
      architectureDescription: "Multi-branch coordinate embedding coupled to modern transformer blocks with Rotary Position Embeddings (RoPE) and Grouped-Query Attention (GQA), evaluated against analytical differential operators.",
      architectureSteps: [
        "Spatial-Temporal Coordinates (x, y, t) Input",
        "Multi-Layer Perceptron / Transformer Backbone (RoPE + SwiGLU)",
        "Automatic Differentiation for $\\nabla T$, $\\nabla \\cdot (k \\nabla T)$, and $\\sigma |E|^2$",
        "Physics Residual Loss + Boundary Condition Loss Calculation",
        "Adam Optimization followed by fine-tuning with L-BFGS",
        "Continuous Field Output: Temperature $T(x,y,t)$ & Potential $\\Phi(x,y,t)$"
      ],
      implementationHighlights: [
        "Implemented 3 interchangeable architectures: standard MLP baseline, MLPPINN with skip residual connections, and modern TransformerPINN.",
        "Integrated Rotary Position Embeddings (RoPE) and Grouped-Query Attention (GQA) to capture long-range gradient interactions in the spatial domain.",
        "Optimized PyTorch tensor operations allowing full training on a standard workstation CPU in approximately 5 minutes."
      ],
      testing: "Verified against analytical 1D/2D electro-thermal benchmark solutions with rigorous L2 relative norm computation across 10,000 spatial evaluation points.",
      results: [
        "Achieved relative L2 error < 9.09e-04 for electric field distribution.",
        "Completely eliminated spatial grid discretization overhead and mesh regeneration errors.",
        "Zero GPU dependency for standard test domains, running efficiently in Python."
      ],
      lessonsLearned: [
        "Physics-informed loss regularizers act as powerful inductive priors that prevent neural hallucination even in low-data regimes.",
        "Adaptive loss weighting between PDE residuals and Dirichlet boundaries is essential to prevent stiffness during Adam optimization."
      ]
    }
  },
  {
    id: "django",
    slug: "django-task-manager",
    title: "Django Task Manager",
    category: "BACKEND",
    oneLiner: "Production-ready task management backend with JWT authentication, RBAC, Redis caching, and bilingual UI.",
    description: "A robust task orchestration system designed for high concurrency and zero-downtime migrations, featuring Celery asynchronous background queues and a 96% pytest coverage suite.",
    technologies: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "Docker", "pytest", "GitHub Actions"],
    metrics: ["96% Test Coverage", "Sub-200ms API Latency", "Automated CI/CD Pipeline"],
    stars: 12,
    forks: 3,
    featuredOrder: 2,
    githubUrl: "https://github.com/mohammad-hussein-dev/django-task-manager",
    caseStudy: {
      problem: "Need for a production-grade, multi-tenant task orchestration API capable of handling concurrent user requests, role-based permissions, asynchronous status transitions, and bilingual interfaces without latency degradation.",
      constraints: "Sub-200ms P95 API response budget, strict JWT token lifecycle security, and automated deployment guarantees.",
      approach: "Engineered modular Django apps with Django REST Framework viewsets, custom JWT authentication middleware, Redis-based query caching, and Celery worker workers for asynchronous notifications.",
      architectureDescription: "Nginx reverse proxy routing to Gunicorn WSGI processes, backed by PostgreSQL relational storage and Redis for session cache and Celery message broker.",
      architectureSteps: [
        "Client Request with Bearer JWT Token",
        "Authentication & Role-Based Access Control (RBAC) Verification",
        "Query Optimization Layer with Redis Cache Read-Through",
        "Django ORM with selective prefetch_related & select_related joins",
        "Celery Task Dispatch for asynchronous email & priority updates",
        "Standardized JSON Response with pagination & HATEOAS links"
      ],
      implementationHighlights: [
        "Implemented JWT authentication with token rotation and secure blacklist handling.",
        "Structured comprehensive database indexing on status, priority, and user relations reducing query execution times by 40%.",
        "Built bilingual Persian (RTL) and English (LTR) interface capabilities."
      ],
      testing: "Comprehensive pytest test suite containing unit, integration, and security test cases achieving 96% overall code coverage with automated GitHub Actions verification.",
      results: [
        "Consistently maintains sub-200ms response times under 1,200 concurrent simulated requests.",
        "Reduced deployment duration from manual 2-hour procedures to 12 minutes via Dockerized CI/CD."
      ],
      lessonsLearned: [
        "Early integration of automated linting and coverage gates in CI prevents technical debt from accumulating.",
        "Proper Redis cache invalidation strategies are critical when dealing with concurrent state transitions."
      ]
    }
  },
  {
    id: "ga",
    slug: "site-selection-ga",
    title: "Site Selection Using Genetic Algorithm",
    category: "OPTIMIZATION",
    oneLiner: "Multi-objective evolutionary optimization engine selecting optimal locations from 100+ candidate sites.",
    description: "An evolutionary computation pipeline utilizing Python and DEAP to solve NP-hard combinatorial facility location problems under population coverage and cost constraints.",
    technologies: ["Python", "DEAP", "NumPy", "Matplotlib", "Docker", "pytest", "GitHub Actions"],
    metrics: ["98% Convergence Accuracy", "40% Gain over Greedy Baseline", "5,000+ Spatial Data Points"],
    stars: 5,
    featuredOrder: 3,
    githubUrl: "https://github.com/mohammad-hussein-dev/site-selection-ga",
    caseStudy: {
      problem: "Selecting optimal public facility sites (e.g. schools, clinics) from large candidate spaces where greedy heuristics get trapped in sub-optimal local minima due to competing cost, distance, and capacity objectives.",
      constraints: "Combinatorial search space ($C(100, k)$ candidate sets), strict budget caps, maximum travel radii, and exclusion zones.",
      approach: "Designed a Genetic Algorithm using DEAP with custom chromosome encoding, tournament selection, two-point crossover, Gaussian mutation, and Pareto frontier optimization.",
      architectureDescription: "GIS spatial point ingestion → Population initialization → Multi-objective fitness evaluation → Selection & recombination → Mutation → Elitism preservation → Pareto convergence output.",
      architectureSteps: [
        "Load 5,000+ spatial demographic and distance points",
        "Initialize randomized binary/integer chromosome population",
        "Evaluate multi-objective fitness (Coverage vs. Infrastructure Cost)",
        "Tournament Selection & Crossover operator application",
        "Adaptive Mutation to maintain genetic diversity",
        "Extract non-dominated Pareto front of optimal site configurations"
      ],
      implementationHighlights: [
        "Vectorized distance matrix computation using NumPy broadcasting for 20x evaluation acceleration.",
        "Implemented adaptive mutation rate decay to balance exploration and fine-grained exploitation.",
        "Built containerized Docker execution environment with 20+ automated pytest tests."
      ],
      testing: "Unit and stochastic convergence test suite verifying invariant properties, boundary constraint adherence, and reproducibility across random seeds.",
      results: [
        "Achieved 98% convergence stability to the global Pareto frontier across 50 independent trials.",
        "Delivered a 40% improvement in service coverage relative to traditional greedy location algorithms."
      ],
      lessonsLearned: [
        "Stochastic optimization requires deterministic seeding strategies and statistical ensemble verification to ensure production reliability."
      ]
    }
  },
  {
    id: "projectile",
    slug: "projectile-simulator",
    title: "Projectile Physics Simulator",
    category: "SCIENTIFIC",
    oneLiner: "Vectorized 2D kinematic trajectory simulator with air drag, variable gravity, and real-time visualization.",
    description: "A precision physical simulation engine modeling 2D trajectory dynamics with quadratic air resistance and numerical integration, complete with a 100% test coverage suite.",
    technologies: ["Python", "NumPy", "Matplotlib", "SymPy", "pytest"],
    metrics: ["100% Test Coverage", "10x Vectorized Speedup", "RK4 Numerical Solver"],
    stars: 6,
    featuredOrder: 4,
    githubUrl: "https://github.com/mohammad-hussein-dev/projectile-physics-simulator",
    caseStudy: {
      problem: "Simulating projectile motion under realistic atmospheric drag forces where closed-form analytical solutions are intractable and standard naive iterative loops are too slow.",
      constraints: "Non-linear ordinary differential equations ($m \\ddot{\\vec{r}} = m \\vec{g} - \\frac{1}{2} C_d \\rho A |\\vec{v}| \\vec{v}$) requiring stable step-size integration.",
      approach: "Built a vectorized NumPy numerical core implementing 4th-order Runge-Kutta (RK4) integration with symbolic SymPy verification of ideal baseline equations.",
      architectureDescription: "Physics Parameters → Kinematic Vectorization Engine → RK4 Step Integrator → Validation Gate → Matplotlib Animated Plot & Metrics Exporter.",
      architectureSteps: [
        "Input velocity ($v_0$), angle ($\\theta$), drag coeff ($C_d$), and mass ($m$)",
        "Construct 2nd-order vector differential equations of motion",
        "Execute RK4 numerical integration with adaptive time-stepping",
        "Compute maximum height ($H_{max}$), flight time ($t_{flight}$), and range ($R$)",
        "Render animated trajectory plot with velocity and acceleration vectors"
      ],
      implementationHighlights: [
        "100% test coverage validating conservation of energy in the drag-free limit.",
        "Vectorized calculations yielding 10x execution speedup over naive Python loops.",
        "Modular architecture allowing custom gravity fields (Earth, Moon, Mars) and fluid densities."
      ],
      testing: "Complete pytest test suite with parameter sweeps testing asymptotic convergence to analytical drag-free solutions.",
      results: [
        "Instantaneous trajectory computation (<1 ms per simulation run).",
        "Clean, maintainable scientific codebase used as educational and benchmark reference."
      ],
      lessonsLearned: [
        "Clean mathematical abstraction and vectorization make scientific code both highly performant and readable."
      ]
    }
  },
  {
    id: "widgetify",
    slug: "widgetify-extension",
    title: "Widgetify Extension",
    category: "TOOLS",
    oneLiner: "High-performance modular browser dashboard replacing default new-tab pages with developer productivity widgets.",
    description: "A lightweight, privacy-focused browser extension dashboard built with modern React, TypeScript, and the WXT framework.",
    technologies: ["React", "TypeScript", "WXT Framework", "Browser Storage API", "Tailwind CSS"],
    metrics: ["150+ Active Installs", "Sub-50ms Cold Load", "100% Local Storage"],
    stars: 8,
    featuredOrder: 5,
    githubUrl: "https://github.com/mohammad-hussein-dev/widgetify-extension",
    caseStudy: {
      problem: "Standard browser start tabs are cluttered with telemetry and lack customizable developer utilities.",
      constraints: "Browser extension security boundaries (Manifest V3), strict permission limits, and zero external tracking.",
      approach: "Architected a modular component framework where users can toggle clock, quick bookmarks, notes scratchpad, and system monitors with local browser storage persistence.",
      architectureDescription: "Manifest V3 Background Service Worker → React Dashboard Client → Local Storage Sync Engine.",
      architectureSteps: [
        "Browser New Tab Event Trigger",
        "Fast local hydration from Chrome Storage API",
        "Dynamic widget rendering with draggable layout grid",
        "Debounced automatic persistence of widget state"
      ],
      implementationHighlights: [
        "Built using WXT cross-browser extension framework supporting Chrome, Firefox, and Edge.",
        "Zero remote dependencies ensuring instant cold-start load times under 50ms."
      ],
      testing: "Tested on Chrome and Firefox extension runtimes with automated build validation.",
      results: [
        "150+ installs across developer communities.",
        "High user satisfaction with zero reported memory leaks or UI jank."
      ],
      lessonsLearned: [
        "Client-side local storage and clean React memoization create snappy, privacy-respecting browser tools."
      ]
    }
  },
  {
    id: "memory-opt",
    slug: "large-file-memory-optimization",
    title: "Large-File Memory Optimization Pipeline",
    category: "OPTIMIZATION",
    oneLiner: "Automated Pandas memory footprint optimizer with CLI auto-detection, multi-format compression, and CI matrix.",
    description: "A production data engineering utility that reduces DataFrame memory usage by up to 70% through intelligent downcasting and multi-format compression.",
    technologies: ["Python", "Pandas", "pytest", "GitHub Actions CI Matrix", "argparse"],
    metrics: ["25+ Pytest Tests", "Up to 70% RAM Reduction", "CI Tested Across Python 3.9–3.12"],
    featuredOrder: 6,
    githubUrl: "https://github.com/artin-saberi-ai/large-file-memory-optimization/pull/1",
    caseStudy: {
      problem: "Large tabular datasets frequently cause Out-Of-Memory (OOM) crashes in standard Python analysis workflows due to unoptimized 64-bit default types.",
      constraints: "Must preserve precision for numerical columns while minimizing memory without data loss.",
      approach: "Built an automated inspection pipeline that evaluates column value ranges and downcasts integer/float types to optimal representations, converts low-cardinality strings to categories, and enables Snappy/Zstd compression.",
      architectureDescription: "Raw Dataset Stream → Column Type Analyzer → Safe Downcaster → Structured Logger → Compressed Output Exporter.",
      architectureSteps: [
        "Stream or chunk large CSV/Parquet dataset",
        "Analyze min/max ranges of numerical columns and string uniqueness",
        "Downcast int64/float64 to int16/int32/float32 without truncation",
        "Convert repetitive object columns to category dtype",
        "Export with user-selected compression (Snappy, Zstd, Gzip, Brotli)"
      ],
      implementationHighlights: [
        "Built a complete argparse CLI with structured logging replacing print statements.",
        "Added Google-style docstrings, PEP 484 type hints, and full CONTRIBUTING guidelines."
      ],
      testing: "25+ test cases across 5 test modules run via GitHub Actions matrix across Python 3.9, 3.10, 3.11, and 3.12.",
      results: [
        "Reduces memory consumption of typical e-commerce and scientific datasets by 50%–70%.",
        "Merged into open-source upstream repository with full CI coverage."
      ],
      lessonsLearned: [
        "Proactive data pipeline optimization at ingestion prevents downstream infrastructure scaling costs."
      ]
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Engineering",
    iconName: "Server",
    description: "Architecting resilient, production-ready server backends, RESTful APIs, and asynchronous message queues.",
    skills: [
      { name: "Python", level: "Core / Advanced", highlight: true },
      { name: "Django", level: "Production", highlight: true },
      { name: "Django REST Framework", level: "Production", highlight: true },
      { name: "FastAPI", level: "Production", highlight: true },
      { name: "Celery & Message Queues", level: "Advanced", highlight: true },
      { name: "API Security & JWT/RBAC", level: "Production" }
    ]
  },
  {
    id: "data",
    title: "Databases & Caching",
    iconName: "Database",
    description: "Designing efficient schemas, indexing strategies, query optimization, and memory caching.",
    skills: [
      { name: "PostgreSQL", level: "Production", highlight: true },
      { name: "Redis (Cache & Queues)", level: "Production", highlight: true },
      { name: "SQLite", level: "Advanced" },
      { name: "Query & Index Optimization", level: "Advanced", highlight: true },
      { name: "Schema Migration Strategy", level: "Advanced" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Systems",
    iconName: "Terminal",
    description: "Deploying reproducible environments with containers, automated CI/CD pipelines, and Linux administration.",
    skills: [
      { name: "Docker & Compose", level: "Production", highlight: true },
      { name: "Linux (Arch Linux)", level: "Power User", highlight: true },
      { name: "Git & GitHub Workflows", level: "Advanced", highlight: true },
      { name: "GitHub Actions CI/CD", level: "Production", highlight: true },
      { name: "Neovim Workstation", level: "Daily Driver" }
    ]
  },
  {
    id: "testing",
    title: "Testing & Code Quality",
    iconName: "CheckCircle",
    description: "Ensuring long-term software correctness through thorough test suites, TDD, and static verification.",
    skills: [
      { name: "pytest", level: "Core / 96%+ Coverage", highlight: true },
      { name: "Unit & Integration Testing", level: "Production", highlight: true },
      { name: "CI Coverage Gates (Codecov)", level: "Advanced" },
      { name: "PEP 8 & Type Hints (PEP 484)", level: "Standard" }
    ]
  },
  {
    id: "scientific",
    title: "Scientific Computing & AI",
    iconName: "Cpu",
    description: "Bridging physics and computer science via numerical modeling, PINNs, and evolutionary optimization.",
    skills: [
      { name: "Physics-Informed NNs (PINNs)", level: "Advanced", highlight: true },
      { name: "PyTorch & Transformers", level: "Advanced", highlight: true },
      { name: "NumPy Vectorization", level: "Advanced", highlight: true },
      { name: "Genetic Algorithms (DEAP)", level: "Advanced", highlight: true },
      { name: "Matplotlib & Data Viz", level: "Advanced" },
      { name: "SymPy (Symbolic Math)", level: "Proficient" }
    ]
  },
  {
    id: "communication",
    title: "Technical Communication",
    iconName: "BookOpen",
    description: "Translating complex engineering and scientific ideas into clear, accessible documentation and RTL interfaces.",
    skills: [
      { name: "Technical Documentation", level: "Expert", highlight: true },
      { name: "Bilingual (English ↔ Persian)", level: "Native / B2", highlight: true },
      { name: "RTL & Localization (i18n)", level: "Production", highlight: true },
      { name: "Academic Writing & LaTeX", level: "Advanced" }
    ]
  }
];

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: "os-django-boilerplate",
    repository: "uzafirahmad/django-boilerplate",
    repoUrl: "https://github.com/uzafirahmad/django-boilerplate",
    prUrl: "https://github.com/uzafirahmad/django-boilerplate/pull/1",
    title: "Production-ready Dockerization & Dev Tooling",
    description: "Delivered multi-stage Docker builds, PostgreSQL service integration, and automated developer bootstrapping. Reduced local environment setup duration from 30 minutes to under 2 minutes.",
    highlights: [
      "Multi-stage Dockerfile optimizing container image footprint",
      "Docker Compose orchestration with PostgreSQL database container",
      "Developer onboarding time cut by >90%"
    ],
    status: "Merged",
    technologies: ["Docker", "Django", "PostgreSQL", "Shell"]
  },
  {
    id: "os-memory-opt",
    repository: "artin-saberi-ai/large-file-memory-optimization",
    repoUrl: "https://github.com/artin-saberi-ai/large-file-memory-optimization",
    prUrl: "https://github.com/artin-saberi-ai/large-file-memory-optimization/pull/1",
    title: "CLI Engine, Type Hints & 25+ Pytest Test Suite",
    description: "Overhauled the entire codebase with Google-style docstrings, PEP 484 type annotations, an argparse CLI, and a 25-case pytest test suite run across a multi-version Python CI matrix.",
    highlights: [
      "Built full CLI interface with multi-format compression support (Snappy, Zstd, Gzip)",
      "25+ automated pytest unit and edge-case tests",
      "GitHub Actions CI matrix covering Python 3.9, 3.10, 3.11, and 3.12"
    ],
    status: "Merged",
    technologies: ["Python", "Pandas", "pytest", "GitHub Actions"]
  },
  {
    id: "os-customer-analysis",
    repository: "StudyBuildCommunity/studybuild-customer-analysis-02",
    repoUrl: "https://github.com/StudyBuildCommunity/studybuild-customer-analysis-02",
    prUrl: "https://github.com/StudyBuildCommunity/studybuild-customer-analysis-02/pull/2",
    title: "Customer Behavior Segmentation & Executive Dashboard",
    description: "Engineered RFM customer segmentation, 80/20 Pareto analysis, churn risk detection models, and delivered executive visual dashboards with actionable strategic insights.",
    highlights: [
      "RFM behavioral segmentation and churn indicator modeling",
      "Cleaned production dataset pipeline for downstream analytics",
      "4-chart executive visual dashboard and business reporting"
    ],
    status: "Merged",
    technologies: ["Python", "Pandas", "Matplotlib", "Data Analysis"]
  },
  {
    id: "os-linear-regression",
    repository: "artin-saberi-ai/linear-regression-project",
    repoUrl: "https://github.com/artin-saberi-ai/linear-regression-project",
    prUrl: "https://github.com/artin-saberi-ai/linear-regression-project/pull/1",
    title: "Architecture Refactoring, Visualizations & Documentation",
    description: "Refactored linear regression modeling pipeline with structured subplots, error handling, PEP 8 standards, and comprehensive CONTRIBUTING / CODE_OF_CONDUCT documentation.",
    highlights: [
      "Unified train/test subplots with accessibility-focused color schemes",
      "Type hints, Google-style docstrings, and robust exception handlers",
      "Comprehensive developer guides and contribution checklists"
    ],
    status: "Merged",
    technologies: ["Python", "NumPy", "Matplotlib", "Scikit-Learn"]
  }
];

export const CONTENT_STUDIO_DOCS: ContentDoc[] = [
  {
    id: "cs-python-docs",
    title: "Python Official Documentation (FA Localization)",
    category: "Technical Localization",
    description: "Accurate translation and cultural adaptation of core Python tutorials and library documentation for Persian developers.",
    format: "Markdown / Sphinx",
    url: "https://github.com/mohammad-hussein-dev/content-studio/tree/main/translations",
    badge: "In Progress"
  },
  {
    id: "cs-academic-papers",
    title: "Physics & Mathematical Modeling Reports",
    category: "Academic Writing",
    description: "Rigorous scientific research manuscripts, computational mechanics papers, and laboratory experiment reports formatted in LaTeX (IEEE/APA standards).",
    format: "LaTeX / PDF",
    url: "https://github.com/mohammad-hussein-dev/content-studio/tree/main/academic-writing",
    badge: "8+ Papers"
  },
  {
    id: "cs-django-guides",
    title: "Django REST Architecture & Testing Tutorials",
    category: "Developer Documentation",
    description: "In-depth technical guides covering test-driven development with pytest, Docker containerization, and token security for modern backend engineering.",
    format: "Articles & Video Notes",
    url: "https://github.com/mohammad-hussein-dev/content-studio",
    badge: "Completed"
  }
];

export const WHAT_I_CAN_BUILD = [
  {
    title: "High-Performance RESTful APIs",
    description: "Designing structured, versioned, and documented REST APIs using Django REST Framework and FastAPI with JWT authentication and RBAC.",
    icon: "Server",
    tag: "APIs & Microservices"
  },
  {
    title: "Scalable Backend Architectures",
    description: "Building production Django applications with PostgreSQL, Redis caching, Celery asynchronous task queues, and Docker containerization.",
    icon: "Layers",
    tag: "Systems"
  },
  {
    title: "Scientific & Physics Simulations",
    description: "Transforming mathematical equations into fast, vectorized numerical simulation software using NumPy, PyTorch, and SymPy.",
    icon: "Cpu",
    tag: "Scientific Computing"
  },
  {
    title: "Optimization & Heuristic Engines",
    description: "Solving complex multi-objective scheduling and spatial site selection problems with Genetic Algorithms and combinatorial solvers.",
    icon: "Zap",
    tag: "Optimization"
  },
  {
    title: "Automated Testing & CI/CD Pipelines",
    description: "Implementing comprehensive pytest test suites (96%+ coverage), Docker multi-stage builds, and automated GitHub Actions delivery workflows.",
    icon: "CheckCircle",
    tag: "Reliability"
  },
  {
    title: "Technical Documentation & Localization",
    description: "Authoring clear developer manuals, API specifications, and Persian (RTL) localization for software platforms and scientific projects.",
    icon: "BookOpen",
    tag: "Communication"
  }
];

export const VIRTUAL_FILESYSTEM = {
  "/": ["about/", "projects/", "skills/", "research/", "science/", "opensource/", "services/", "contact/", "resume/", "README.md"],
  "/about": ["bio.txt", "education.txt", "mindset.txt"],
  "/projects": [
    "electro-thermal-pinn/",
    "django-task-manager/",
    "site-selection-ga/",
    "projectile-simulator/",
    "widgetify-extension/",
    "large-file-memory-opt/"
  ],
  "/projects/electro-thermal-pinn": ["README.md", "architecture.txt", "metrics.json", "models.py"],
  "/projects/django-task-manager": ["README.md", "docker-compose.yml", "test_coverage.txt"],
  "/projects/site-selection-ga": ["README.md", "deap_pipeline.py", "results.txt"],
  "/projects/projectile-simulator": ["README.md", "rk4_solver.py", "test_kinematics.py"],
  "/projects/widgetify-extension": ["README.md", "manifest.json"],
  "/projects/large-file-memory-opt": ["README.md", "cli.py", "test_suite.py"],
  "/skills": ["backend.json", "databases.json", "devops.json", "testing.json", "scientific.json"],
  "/research": ["pinn-maxwell-heat.pdf", "genetic-algorithms-gis.txt"],
  "/science": ["projectile-engine/", "ga-visualizer/", "pinn-architecture/"],
  "/opensource": ["merged-prs.txt", "organizations.txt"],
  "/services": ["what-i-can-build.txt", "collaboration.py"],
  "/contact": ["contact.json", "social_links.txt"],
  "/resume": ["Resume.pdf", "Resume-1.pdf", "summary.txt"]
};
