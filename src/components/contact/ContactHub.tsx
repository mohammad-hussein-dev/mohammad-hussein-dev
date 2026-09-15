/**
 * @fileoverview ContactHub — Mission Control contact section.
 * @description
 *   Replaces the legacy contact form with a sci-fi themed command
 *   center. Three primary CTAs open the inquiry modal with a preset
 *   intent (Build / Hire / Collaborate), plus two secondary actions
 *   (Write freely / Direct chat).
 *
 *   Direct channels, freelance badges, and the Python code snippet
 *   are preserved below the control panel.
 *
 * Design notes:
 *   - Uses CSS variables so both dark and light themes render.
 *   - All colors are derived from existing tokens; no hardcoded hex.
 *   - Mobile-first layout: stacked cards, safe touch targets.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useState } from 'react';
import {
  Mail, Send, Copy, Check, ExternalLink, MessageSquare,
  Rocket, Briefcase, Handshake, PenLine, ArrowUpRight, Radio,
} from 'lucide-react';
import { PROFILE } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { CircularFreelanceBadges } from '../common/CircularFreelanceBadges';
import { openInquiry } from '../../features/inquiry/lib/bridge';
import type { IntentCode } from '../../features/inquiry';

// ─── Types ─────────────────────────────────────────────────────────────

interface IntentCardConfig {
  index: string;
  intent: IntentCode;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  tags: string[];
}

// ─── Config ────────────────────────────────────────────────────────────

const INTENT_CARDS: IntentCardConfig[] = [
  {
    index: '01',
    intent: 'A1',
    icon: Rocket,
    titleFa: 'ساخت پروژه',
    titleEn: 'Build a project',
    descFa: 'طراحی و پیاده‌سازی یک سیستم از صفر',
    descEn: 'Design and ship a new system from scratch',
    tags: ['Django', 'FastAPI', 'Postgres', 'Docker'],
  },
  {
    index: '02',
    intent: 'A2',
    icon: Briefcase,
    titleFa: 'استخدام در نقش',
    titleEn: 'Hire for a role',
    descFa: 'تمام‌وقت · پاره‌وقت · قراردادی',
    descEn: 'Full-time · Part-time · Contract',
    tags: ['Remote', 'Visa-ready', 'Immediate'],
  },
  {
    index: '03',
    intent: 'B2',
    icon: Handshake,
    titleFa: 'همکاری',
    titleEn: 'Collaborate',
    descFa: 'پژوهش · متن‌باز · هم‌بنیان‌گذار',
    descEn: 'Research · Open source · Co-founder',
    tags: ['PINN', 'Optimization', 'Systems'],
  },
];

const COPY = {
  fa: {
    badge: 'تماس · مرکز فرمان',
    title: 'بیایید چیزی بسازیم',
    subtitle: 'یک مسیر را انتخاب کنید — یا آزادانه بنویسید',
    statusReady: 'آماده',
    statusResponse: 'پاسخ < ۲۴ ساعت',
    statusAccepting: 'پذیرش فعال',
    panelTitle: 'سیستم آماده است. حالت عملیات خود را انتخاب کنید.',
    or: 'یا',
    freeform: 'نوشتن آزاد',
    chat: 'گفتگوی مستقیم',
    initiate: 'شروع',
    channelsTitle: 'کانال‌های مستقیم',
    email: 'ایمیل',
    telegram: 'تلگرام',
    github: 'گیت‌هاب',
    copyTooltip: 'کپی ایمیل',
  },
  en: {
    badge: 'Contact · Mission Control',
    title: "Let's build something",
    subtitle: 'Pick a path — or write freely',
    statusReady: 'System ready',
    statusResponse: 'Response < 24h',
    statusAccepting: 'Accepting',
    panelTitle: 'System ready. Select your operation mode.',
    or: 'or',
    freeform: 'Write freely',
    chat: 'Direct chat',
    initiate: 'Initiate',
    channelsTitle: 'Direct channels',
    email: 'Email',
    telegram: 'Telegram',
    github: 'GitHub',
    copyTooltip: 'Copy email',
  },
} as const;

// ─── Component ─────────────────────────────────────────────────────────

export const ContactHub: React.FC = () => {
  const { language } = useLanguage();
  const isFa = language === 'fa';
  const t = COPY[isFa ? 'fa' : 'en'];

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (): void => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleIntent = (intent: IntentCode): void => {
    openInquiry({ intentCode: intent, source: 'contact-hub' });
  };

  const handleFreeform = (): void => {
    openInquiry({ source: 'contact-hub' });
  };

  const handleChat = (): void => {
    openInquiry({ mode: 'chat', source: 'contact-hub' });
  };

  return (
    <section
      id="contact"
      className="py-20 relative border-t border-cyan-950/40"
    >
      {/* Ambient grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.35) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,229,255,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)] text-[10px] font-mono uppercase tracking-wider mb-3">
            <Radio className="w-3 h-3" aria-hidden="true" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {t.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1.5 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* ─── MISSION CONTROL PANEL ─── */}
        <div className="relative rounded-2xl border border-[var(--accent-cyan)]/25 bg-[var(--bg-card)]/70 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Status bar */}
          <div className="px-4 sm:px-6 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.statusReady}
              </span>
              <span className="text-[var(--text-muted)]/40">│</span>
              <span className="text-[var(--text-muted)]">{t.statusResponse}</span>
              <span className="text-[var(--text-muted)]/40 hidden sm:inline">│</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">
                {t.statusAccepting}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--accent-cyan)]/50">
              MH-NEXUS // v3.0
            </span>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
            <p className="text-center text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
              {t.panelTitle}
            </p>

            {/* 3 intent cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {INTENT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.intent}
                    type="button"
                    onClick={() => handleIntent(card.intent)}
                    className={[
                      'group relative p-4 sm:p-5 rounded-xl border text-start overflow-hidden',
                      'border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40',
                      'hover:border-[var(--accent-cyan)]/60 hover:bg-[var(--accent-cyan)]/5',
                      'transition-all cursor-pointer',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
                    ].join(' ')}
                  >
                    {/* Corner glow */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-8 -end-8 w-32 h-32 rounded-full bg-[var(--accent-cyan)]/0 group-hover:bg-[var(--accent-cyan)]/10 blur-3xl transition-all pointer-events-none"
                    />

                    {/* Index + arrow */}
                    <div className="relative flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[var(--accent-cyan)]/70">
                        ▸ {card.index}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Icon */}
                    <div className="relative w-10 h-10 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 flex items-center justify-center text-[var(--accent-cyan)] mb-3">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    {/* Title + description */}
                    <h3 className="relative text-sm font-bold text-[var(--text-primary)] mb-1">
                      {isFa ? card.titleFa : card.titleEn}
                    </h3>
                    <p className="relative text-[11px] text-[var(--text-muted)] leading-snug mb-3">
                      {isFa ? card.descFa : card.descEn}
                    </p>

                    {/* Tags */}
                    <div className="relative flex flex-wrap gap-1 mb-4">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)]/60 border border-[var(--border-subtle)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* INITIATE bar */}
                    <div className="relative mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                        {t.initiate}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                {t.or}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
            </div>

            {/* Secondary actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleFreeform}
                className={[
                  'h-12 rounded-xl flex items-center justify-center gap-2.5',
                  'text-xs font-semibold transition-all cursor-pointer',
                  'bg-[var(--bg-elevated)] text-[var(--text-secondary)]',
                  'border border-[var(--border-subtle)]',
                  'hover:border-[var(--accent-cyan)]/60 hover:text-[var(--accent-cyan)]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
                ].join(' ')}
              >
                <PenLine className="w-4 h-4" aria-hidden="true" />
                <span>{t.freeform}</span>
              </button>
              <button
                type="button"
                onClick={handleChat}
                className={[
                  'h-12 rounded-xl flex items-center justify-center gap-2.5',
                  'text-xs font-semibold transition-all cursor-pointer',
                  'bg-gradient-to-br from-sky-500/15 to-sky-600/15',
                  'text-sky-400 border border-sky-500/30',
                  'hover:from-sky-500/25 hover:to-sky-600/25 hover:border-sky-500/60',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                ].join(' ')}
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>{t.chat}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Direct channels + snippet ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-10 sm:mt-12 items-start">
          {/* Left: channels + freelance badges */}
          <div className="space-y-6">
            <div className="rounded-xl p-5 border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-cyan)] mb-1">
                {t.channelsTitle}
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)]/50 border border-[var(--border-subtle)]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2 rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">
                      {t.email}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[var(--text-secondary)] truncate">
                      {PROFILE.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 w-8 h-8 rounded bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)] transition flex items-center justify-center cursor-pointer"
                  title={t.copyTooltip}
                  aria-label={t.copyTooltip}
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Telegram */}
              <a
                href={PROFILE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)]/50 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/60 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2 rounded bg-sky-500/10 text-sky-400">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">
                      {t.telegram}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition truncate">
                      {PROFILE.telegramHandle}
                    </div>
                  </div>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition shrink-0"
                  aria-hidden="true"
                />
              </a>

              {/* GitHub */}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)]/50 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/60 transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 p-2 rounded bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">
                      {t.github}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition truncate">
                      mohammad-hussein-dev
                    </div>
                  </div>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition shrink-0"
                  aria-hidden="true"
                />
              </a>
            </div>

            <CircularFreelanceBadges />
          </div>

          {/* Right: python snippet */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 overflow-hidden shadow-lg">
            <div className="px-4 py-2 bg-[var(--bg-elevated)]/70 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ms-2 text-[var(--accent-cyan)] font-semibold">
                  contact.py
                </span>
              </div>
              <span className="text-[10px]">Python 3.12</span>
            </div>
            <pre
              className="p-4 text-[11px] sm:text-xs font-mono text-[var(--text-secondary)] overflow-x-auto leading-relaxed"
              dir="ltr"
            >
              <code>
                <span className="text-[var(--text-muted)]"># Engineering Collaboration Protocol</span>{'\n'}
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
        </div>
      </div>
    </section>
  );
};

export default ContactHub;
