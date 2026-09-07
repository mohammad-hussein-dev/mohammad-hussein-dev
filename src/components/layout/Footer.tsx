import React from 'react';
import { PROFILE } from '../../data/portfolioData';
import { GithubIcon, GitlabIcon, LinkedinIcon, XIcon, TelegramIcon, MailIcon } from '../common/Icons';
import { Terminal } from 'lucide-react';
import { ArchLinuxBadge } from './ArchLinuxBadge';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';

  const footerSocials = [
    {
      name: 'GitHub',
      url: PROFILE.github,
      icon: GithubIcon,
      hoverClass: 'hover:text-white hover:border-slate-400',
      glow: 'rgba(255,255,255,0.25)',
      isEmail: false,
    },
    {
      name: 'GitLab',
      url: PROFILE.gitlab,
      icon: GitlabIcon,
      hoverClass: 'hover:text-amber-400 hover:border-amber-500/60',
      glow: 'rgba(245,158,11,0.25)',
      isEmail: false,
    },
    {
      name: 'LinkedIn',
      url: PROFILE.linkedin,
      icon: LinkedinIcon,
      hoverClass: 'hover:text-sky-400 hover:border-sky-500/60',
      glow: 'rgba(14,165,233,0.25)',
      isEmail: false,
    },
    {
      name: 'X (Twitter)',
      url: PROFILE.xTwitter,
      icon: XIcon,
      hoverClass: 'hover:text-slate-100 hover:border-slate-300',
      glow: 'rgba(203,213,225,0.25)',
      isEmail: false,
    },
    {
      name: 'Telegram',
      url: PROFILE.telegram,
      icon: TelegramIcon,
      hoverClass: 'hover:text-cyan-400 hover:border-cyan-500/60',
      glow: 'rgba(34,211,238,0.25)',
      isEmail: false,
    },
    {
      name: 'Email',
      url: `mailto:${PROFILE.email}`,
      icon: MailIcon,
      hoverClass: 'hover:text-rose-400 hover:border-rose-500/60',
      glow: 'rgba(244,63,94,0.25)',
      isEmail: true,
    }
  ];

  return (
    <footer className="bg-[#05070d] border-t border-cyan-950/60 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wider">
                {isFa ? 'محمد حسین' : PROFILE.name}
              </div>
              <div className="text-[11px] text-slate-500">
                {isFa ? 'مهندس ارشد بک‌اند و سیستم‌های هوش مصنوعی' : `${PROFILE.primaryRole} · ${PROFILE.location}`}
              </div>
            </div>
          </div>

          {/* 6 Social Profiles in Exact Order */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
            {footerSocials.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target={item.isEmail ? '_self' : '_blank'}
                  rel={item.isEmail ? undefined : 'noopener noreferrer'}
                  className={`px-2.5 py-1.5 rounded-lg bg-[#080d19] border border-slate-800/80 transition-all duration-200 flex items-center space-x-1.5 text-slate-400 ${item.hoverClass} hover:-translate-y-0.5 active:scale-95`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="font-semibold">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Arch Linux Banner & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>{isFa ? 'توسعه‌یافته بر بستر' : 'Built on'}</span>
            <ArchLinuxBadge />
            <span>{isFa ? 'با Neovim و TypeScript' : 'with Neovim & TypeScript'}</span>
          </div>

          <div>
            © 2026 {isFa ? 'محمد حسین' : PROFILE.name}. {isFa ? 'تمام حقوق محفوظ است.' : 'All rights reserved.'}
          </div>
        </div>
      </div>
    </footer>
  );
};
