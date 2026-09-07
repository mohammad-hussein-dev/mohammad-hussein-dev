import React from 'react';
import { PROFILE } from '../../data/portfolioData';
import { User, Cpu, ArrowRight, CheckCircle, Terminal, Code2, Shield, Heart, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CyberMatrixAvatar } from './CyberMatrixAvatar';

/**
 * @fileoverview AboutSection Component.
 *
 * Showcases Mohammad Hussein's engineering identity, physics & mathematical foundations,
 * real-time GitHub profile matrix synchronization, and the formula-to-production pipeline.
 *
 * Implemented following Google TypeScript style principles with full i18n & responsiveness.
 */
export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const pipelineSteps = [
    {
      title: isFa ? "فیزیک" : "Physics",
      desc: isFa ? "مدل‌سازی دینامیک جهان واقعی و قوانین بقا" : "Modeling real-world dynamics & conservation laws",
      color: "text-cyan-400"
    },
    {
      title: isFa ? "ریاضیات" : "Mathematics",
      desc: isFa ? "فرمول‌بندی تحلیلی، جبر خطی و حساب دیفرانسیل" : "Analytical formulation, linear algebra & calculus",
      color: "text-indigo-400"
    },
    {
      title: isFa ? "حل مسئله" : "Problem Solving",
      desc: isFa ? "انتزاع الگوریتمی و بهینه‌سازی تحت قیود" : "Algorithmic abstraction & constraint optimization",
      color: "text-amber-400"
    },
    {
      title: isFa ? "محاسبات علمی" : "Scientific Computing",
      desc: isFa ? "آرایه‌های برداری NumPy، شبکه‌های PINN و شبیه‌سازی" : "Vectorized NumPy, PyTorch PINNs & simulation",
      color: "text-emerald-400"
    },
    {
      title: isFa ? "سیستم‌های بک‌اند" : "Backend Systems",
      desc: isFa ? "میکروسرویس‌های جنگو، FastAPI، پستگرس و ردیس در محیط پروداکشن" : "Production Django, FastAPI, PostgreSQL & Redis",
      color: "text-cyan-300"
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#080c16] relative border-t border-cyan-950/40">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'هویت و رویکرد مهندسی' : 'Engineering Identity & Mindset'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            {isFa ? 'هویت مهندسی، دقت علمی و معماری سیستم‌ها' : 'The Scientific Mindset Behind the Code'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
            {isFa
              ? 'پیشینه تحلیلی فیزیک و ریاضیات چگونه رویکرد من را به معماری نرم‌افزار، مقیاس‌پذیری پایدار و کدنویسی بدون باگ شکل داده است.'
              : 'How analytical physics and mathematical foundations shape an uncompromising approach to backend architecture, verifiable reliability, and performance.'}
          </p>
        </div>

        {/* 5-Step Thought Process Flow: Formula to Production */}
        <div className="bg-[#05070d] p-5 sm:p-6 rounded-2xl border border-slate-800/90 mb-12 shadow-xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'خط لوله مهندسی علمی' : 'The Scientific Engineering Pipeline'}</span>
            </span>
            <span className="text-cyan-400 text-[11px] font-semibold">{isFa ? 'از فرمول تا محیط پروداکشن' : 'Formula to Production'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 relative">
            {pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0b101c] p-4 rounded-xl border border-cyan-950/80 flex flex-col justify-between relative group hover:border-cyan-500/50 hover:bg-[#0e1526] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-500">0{idx + 1}.</span>
                    <span className={`text-xs font-mono font-bold ${step.color}`}>{step.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-Column Responsive Layout: Matrix Cyber Avatar (Left) + Story Narrative & Metrics (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Cyber Matrix Avatar Component (5 Cols on Desktop) */}
          <div className="lg:col-span-5 w-full">
            <CyberMatrixAvatar username="mohammad-hussein-dev" />
          </div>

          {/* Column 2: Narrative, Technical Principles & Metrics (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Narrative Card */}
            <div className="bg-[#050810] p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed shadow-lg">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-wider pb-1 border-b border-slate-800/80">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isFa ? 'داستان و جهان‌بینی مهندسی' : 'The Story & Engineering Philosophy'}</span>
              </div>

              {isFa ? (
                <>
                  <p>
                    من <strong className="text-white font-semibold">محمد حسین</strong> هستم؛ توسعه‌دهنده بک‌اند، پژوهشگر محاسبات علمی و کاربر حرفه‌ای لینوکس. مسیر حرفه‌ای من از اشتیاق عمیق به درک نحوه کارکرد جهان فیزیکی آغاز شد و به ساخت سیستم‌های نرم‌افزاری دقیق و خودکار انجامید.
                  </p>
                  <p>
                    هنگام طراحی معماری نرم‌افزار، با سیستم‌ها همانند قوانین طبیعت برخورد می‌کنم: هر ماژول باید دارای مرزهای مشخص، نامتغیرهای بدون تغییر، و مدیریت بهینه منابع (CPU، حافظه، I/O) باشد. چه در طراحی اندپوینت‌های پرسرعت با <strong className="text-cyan-300 font-mono">FastAPI</strong> و <strong className="text-cyan-300 font-mono">Django</strong> و چه در شبیه‌سازی‌های فیزیکی و شبکه‌های عصبی فیزیک‌آگاه (<strong className="text-emerald-400 font-mono">PINNs</strong>)، اولویت نخست من نوشتن کدی شفاف، مستند و همراه با <strong className="text-white">تست‌های خودکار ۹۶٪+</strong> است.
                  </p>
                  <p>
                    محیط توسعه بومی من <strong className="text-white font-mono">Arch Linux</strong> و ادیتور قدرتمند <strong className="text-white font-mono">Neovim</strong> است. این انتخاب به من تسلط کامل بر لایه‌های زیرین سیستم، کرنل، پردازش‌ها و کانتینرسازی Docker را می‌دهد.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    I am <strong className="text-white font-semibold">Mohammad Hussein</strong>, a backend architect, scientific computing researcher, and Linux enthusiast. My journey began with an insatiable curiosity about how the physical universe operates, evolving into crafting deterministic, high-throughput software systems.
                  </p>
                  <p>
                    When architecting software, I treat systems the way physicists treat fundamental conservation laws: every service must respect strict invariants, conserve compute resources, and deliver measurable reliability. Whether developing robust asynchronous APIs with <strong className="text-cyan-300 font-mono">Django REST & FastAPI</strong> or modeling kinematic equations and neural differential solvers (<strong className="text-emerald-400 font-mono">PINNs</strong>), my standard is production-grade simplicity backed by <strong className="text-white">96%+ automated test coverage</strong>.
                  </p>
                  <p>
                    I develop natively on <strong className="text-white font-mono">Arch Linux</strong> using <strong className="text-white font-mono">Neovim (Lua / LSP)</strong>, maintaining total transparency from kernel-level performance tuning to containerized cloud orchestration.
                  </p>
                </>
              )}

              {/* Badges / Tech Specs Strip */}
              <div className="pt-2 flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] text-slate-300 border border-slate-800 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Arch Linux (x86_64)</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] text-slate-300 border border-slate-800 flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Neovim / Lua LSP</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0a0f1d] text-slate-300 border border-slate-800 flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>pytest Coverage: 96%+</span>
                </span>
              </div>
            </div>

            {/* Key Verified Performance Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROFILE.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#050810] border border-slate-800/90 hover:border-cyan-800/60 transition-colors flex flex-col justify-between"
                >
                  <span className="text-[11px] font-mono text-slate-400 mb-1">{stat.label}</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


