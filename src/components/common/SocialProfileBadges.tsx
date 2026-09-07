import React, { useState } from 'react';
import { PROFILE } from '../../data/portfolioData';
import { GithubIcon, GitlabIcon, LinkedinIcon, XIcon, TelegramIcon, MailIcon } from './Icons';
import { useLanguage } from '../../context/LanguageContext';

export interface SocialBadgeItem {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: React.FC<{ className?: string }>;
  brandColor: string;
  glowColor: string;
  borderColor: string;
  hoverBg: string;
}

export const SOCIAL_PROFILES: SocialBadgeItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: PROFILE.github,
    handle: 'mohammad-hussein-dev',
    icon: GithubIcon,
    brandColor: 'text-slate-100 group-hover:text-white',
    glowColor: 'rgba(255, 255, 255, 0.35)',
    borderColor: 'border-slate-700/80 hover:border-slate-300',
    hoverBg: 'hover:bg-slate-800/80',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    url: PROFILE.gitlab,
    handle: 'mohammad-hussein-dev',
    icon: GitlabIcon,
    brandColor: 'text-amber-400 group-hover:text-amber-300',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    borderColor: 'border-amber-500/30 hover:border-amber-400',
    hoverBg: 'hover:bg-amber-950/40',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: PROFILE.linkedin,
    handle: 'mohammad-hussein-dev',
    icon: LinkedinIcon,
    brandColor: 'text-sky-400 group-hover:text-sky-300',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    borderColor: 'border-sky-500/30 hover:border-sky-400',
    hoverBg: 'hover:bg-sky-950/40',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    url: PROFILE.xTwitter,
    handle: PROFILE.xTwitterHandle,
    icon: XIcon,
    brandColor: 'text-slate-200 group-hover:text-white',
    glowColor: 'rgba(203, 213, 225, 0.4)',
    borderColor: 'border-slate-700/80 hover:border-white',
    hoverBg: 'hover:bg-slate-800/80',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    url: PROFILE.telegram,
    handle: PROFILE.telegramHandle,
    icon: TelegramIcon,
    brandColor: 'text-cyan-400 group-hover:text-cyan-300',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    borderColor: 'border-cyan-500/30 hover:border-cyan-400',
    hoverBg: 'hover:bg-cyan-950/40',
  },
  {
    id: 'email',
    name: 'Email',
    url: `mailto:${PROFILE.email}`,
    handle: PROFILE.email,
    icon: MailIcon,
    brandColor: 'text-rose-400 group-hover:text-rose-300',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    borderColor: 'border-rose-500/30 hover:border-rose-400',
    hoverBg: 'hover:bg-rose-950/40',
  }
];

interface SocialProfileBadgesProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const SocialProfileBadges: React.FC<SocialProfileBadgesProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="uppercase tracking-wider font-semibold">
            {isFa ? 'شبکه‌های اجتماعی و کانال‌های ارتباطی' : 'Social Profiles & Direct Channels'}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {SOCIAL_PROFILES.map((item) => {
          const IconComp = item.icon;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="relative group">
              <a
                href={item.url}
                target={item.id === 'email' ? '_self' : '_blank'}
                rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={`${item.name} profile`}
                className={`relative flex items-center justify-center ${sizeClasses[size]} rounded-full bg-[#080d1a] border ${item.borderColor} ${item.hoverBg} transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-sm group-hover:shadow-[0_0_18px_var(--glow)] select-none`}
                style={{ '--glow': item.glowColor } as React.CSSProperties}
              >
                {/* Rotating subtle ring on hover */}
                <div
                  className="absolute -inset-0.5 rounded-full border border-transparent border-t-current opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300 pointer-events-none"
                  style={{ color: item.glowColor }}
                />

                <IconComp className={`${iconSizeClasses[size]} ${item.brandColor} transition-colors duration-200`} />
              </a>

              {/* Tooltip on Hover */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 pointer-events-none whitespace-nowrap transition-all duration-200 ${
                  isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`}
              >
                <div className="px-2.5 py-1.5 rounded-lg bg-[#050812] border border-slate-700 text-white text-xs font-mono shadow-2xl shadow-black/95 flex flex-col items-center">
                  <span className="font-bold text-slate-100">{item.name}</span>
                  <span className="text-[10px] text-slate-400">{item.handle}</span>
                </div>
                <div className="w-2 h-2 bg-[#050812] border-r border-b border-slate-700 transform rotate-45 mx-auto -mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
