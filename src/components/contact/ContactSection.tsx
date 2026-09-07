import React, { useState } from 'react';
import { PROFILE } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { Mail, Send, Copy, Check, ExternalLink, MessageSquare, Terminal, Code2, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CircularFreelanceBadges } from '../common/CircularFreelanceBadges';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formMessage) return;

    // Compose direct mailto link
    const subject = encodeURIComponent(`Project Inquiry from ${formName}`);
    const body = encodeURIComponent(`Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#090d16] relative border-t border-cyan-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'کانال‌های مستقیم و قراردادها' : 'Direct Channels & Contracts'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isFa ? 'بیایید سیستمی پایدار و مهندسی‌شده بسازیم' : "Let's Build Something Reliable"}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {isFa
              ? 'چه به دنبال طراحی وب‌سرویس بک‌اند با Django/FastAPI باشید، چه موتور شبیه‌سازی علمی یا مستندسازی عمیق فنی — آماده آغاز همکاری هستم.'
              : 'Whether you need a backend API built with Django/FastAPI, a scientific simulation engine, or technical documentation — I am open to discussing new projects and roles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Direct Links & Freelance Platforms */}
          <div className="space-y-6">
            {/* Primary Contacts */}
            <div className="bg-[#050810] rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                {isFa ? 'راه‌های ارتباط مستقیم' : 'Direct Channels'}
              </div>

              {/* Email Item */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0b101c] border border-cyan-950/80">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-cyan-950/80 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">{isFa ? 'ایمیل مستقیم' : 'Direct Email'}</div>
                    <div className="text-xs font-mono font-semibold text-slate-200">{PROFILE.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition text-xs flex items-center space-x-1"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Telegram Item */}
              <a
                href={PROFILE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#0b101c] border border-cyan-950/80 hover:border-cyan-700/60 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-sky-950/80 text-sky-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">{isFa ? 'پیام‌رسان تلگرام' : 'Telegram Messenger'}</div>
                    <div className="text-xs font-mono font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                      {PROFILE.telegramHandle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
              </a>

              {/* GitHub Item */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#0b101c] border border-cyan-950/80 hover:border-cyan-700/60 transition group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-slate-900 text-slate-300">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">{isFa ? 'مخزن‌های گیت‌هاب' : 'GitHub Workspace'}</div>
                    <div className="text-xs font-mono font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                      mohammad-hussein-dev
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
              </a>
            </div>

            {/* Freelance Platforms Badges with Rotating Radar Rings & Glow */}
            <CircularFreelanceBadges />
          </div>

          {/* Right Column: Interactive Code Snippet & Message Form */}
          <div className="space-y-6">
            {/* Interactive Python Code Snippet */}
            <div className="bg-[#050810] rounded-xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="px-4 py-2 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-cyan-400 font-semibold">contact.py</span>
                </div>
                <span className="text-slate-500 text-[11px]">Python 3.12</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#03050a] ltr:text-left" dir="ltr">
                <code>
                  <span className="text-slate-500"># Engineering Collaboration Protocol</span>{'\n'}
                  <span className="text-purple-400">class</span> <span className="text-amber-300">EngineeringCollaboration</span>:{'\n'}
                  {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-cyan-300">self</span>):{'\n'}
                  {'        '}<span className="text-cyan-300">self</span>.engineer = <span className="text-emerald-300">"Mohammad Hussein"</span>{'\n'}
                  {'        '}<span className="text-cyan-300">self</span>.status = <span className="text-emerald-300">"Available for Contracts / Roles"</span>{'\n'}
                  {'        '}<span className="text-cyan-300">self</span>.response_time = <span className="text-emerald-300">"&lt; 24 hours"</span>{'\n\n'}
                  {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">start_project</span>(<span className="text-cyan-300">self</span>, requirement: <span className="text-indigo-300">str</span>):{'\n'}
                  {'        '}<span className="text-purple-400">return</span> <span className="text-emerald-300">f"Designing: &#123;requirement&#125; with 96%+ test coverage"</span>{'\n\n'}
                  session = <span className="text-amber-300">EngineeringCollaboration</span>(){'\n'}
                  session.<span className="text-blue-400">start_project</span>(<span className="text-emerald-300">"Your Backend or Scientific System"</span>)
                </code>
              </pre>
            </div>

            {/* Direct Message Composer Form */}
            <form onSubmit={handleSendForm} className="bg-[#050810] rounded-xl p-5 border border-slate-800 space-y-3.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-1 flex items-center justify-between">
                <span>{isFa ? 'ارسال پیام مستقیم' : 'Send a Direct Message'}</span>
                {sentSuccess && <span className="text-emerald-400 text-xs font-mono">{isFa ? 'نرم‌افزار ایمیل باز شد!' : 'Mail client opened!'}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={isFa ? 'نام شما' : 'Your Name'}
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#0b101c] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
                <input
                  type="email"
                  placeholder={isFa ? 'آدرس ایمیل شما' : 'Your Email Address'}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#0b101c] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <textarea
                placeholder={isFa ? 'توضیحات پروژه، نیازمندی‌های وب‌سرویس یا موقعیت شغلی مورد نظر خود را بنویسید...' : 'Tell me about your project, API requirements, or role...'}
                rows={3}
                required
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                className="w-full bg-[#0b101c] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition active:scale-98 shadow-md shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isFa ? 'انتقال پیام از طریق ایمیل' : 'Transmit Message via Email'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

