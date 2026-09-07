import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Server, Database, Terminal, CheckCircle2, Cpu, BookOpen, Layers, ShieldCheck, Zap, GitPullRequest } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EngineeringStack: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-cyan-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'CheckCircle': return <CheckCircle2 className="w-4 h-4 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-400" />;
      default: return <Server className="w-4 h-4 text-cyan-400" />;
    }
  };

  const engineeringPrinciples = [
    {
      title: isFa ? "معماری ماژولار و تمیز" : "Clean Modular Architecture",
      desc: isFa
        ? "جداسازی کامل لایه‌ها، منطق دامنه مستقل و تعریف شفاف مرزهای API بر اساس الگوهای SOLID و Clean Architecture."
        : "Separation of concerns, decoupled domain logic, and well-defined API boundaries.",
      icon: <Layers className="w-4 h-4 text-cyan-400" />
    },
    {
      title: isFa ? "توسعه مبتنی بر تست (TDD)" : "Test-Driven Reliability",
      desc: isFa
        ? "پوشش تست ۹۶٪+ با pytest، تست‌های ایزوله واحد و یکپارچه‌سازی خودکار در خط لوله CI/CD."
        : "Standardizing 96%+ test coverage via pytest with automated CI gates before merging.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
    },
    {
      title: isFa ? "بهینه‌سازی دیتابیس و کشینگ" : "Data & Caching Efficiency",
      desc: isFa
        ? "ایندکس‌گذاری دقیق، جلوگیری از N+1 با prefetch_related و کشینگ چندلایه‌ای Redis جهت حداقل زمان تاخیر."
        : "Proactive database indexing, prefetching, and multi-tier Redis caching to minimize query latency.",
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      title: isFa ? "پایه‌های علمی و ریاضی" : "Mathematical Grounding",
      desc: isFa
        ? "به‌کارگیری مدل‌سازی فیزیک و دقت تحلیلی در بهینه‌سازی الگوریتم‌ها و خطوط پردازش داده."
        : "Applying physics modeling and analytical rigor to optimize algorithms and data pipelines.",
      icon: <Cpu className="w-4 h-4 text-indigo-400" />
    }
  ];

  return (
    <section id="skills" className="py-20 bg-[#070a12] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'قابلیت‌های فنی و مهندسی' : 'Technical Capabilities'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isFa ? 'استک مهندسی و ابزارهای توسعه سیستم' : 'Engineering Stack & System Tools'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {isFa
              ? 'ماتریس تکنولوژی اثبات‌شده متمرکز بر سیستم‌های بک‌اند پایتون، دیتابیس‌های رابطه‌ای مقیاس‌پذیر و محاسبات علمی.'
              : 'A production-proven technology matrix centered on Python backend systems, scalable relational databases, and scientific computing.'}
          </p>
        </div>

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#050810] border border-slate-800/90 rounded-xl p-5 hover:border-cyan-900/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 font-mono tracking-tight">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-900">
                {cat.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs font-mono bg-[#090d16] px-2.5 py-1.5 rounded border border-slate-800/80"
                  >
                    <span className={skill.highlight ? 'text-cyan-300 font-medium' : 'text-slate-300'}>
                      {skill.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Mindset & Principles */}
        <div className="mt-12 bg-[#090d18] rounded-xl p-6 border border-cyan-950/80">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">
            {isFa ? 'اصول بنیادین مهندسی نرم‌افزار' : 'Core Engineering Principles'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {engineeringPrinciples.map((prin, i) => (
              <div key={i} className="p-3.5 rounded-lg bg-[#05070d] border border-slate-800/90">
                <div className="flex items-center space-x-2 mb-1.5">
                  {prin.icon}
                  <h4 className="text-xs font-bold text-slate-200 font-mono">{prin.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {prin.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
