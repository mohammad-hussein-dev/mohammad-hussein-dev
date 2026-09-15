/**
 * @fileoverview Bilingual message builder with full and compact modes.
 * @description
 *   Produces the final plain-text message used for all channels:
 *   - Telegram deep-link
 *   - Email mailto
 *   - Plain copy-paste (Instagram DM, WhatsApp, SMS, etc.)
 *
 * Two output modes:
 *   - 'full'    → detailed, multi-section, ~600-800 chars.
 *                 Used for Telegram and Email.
 *   - 'compact' → short single-paragraph, ~200-300 chars.
 *                 Used for Instagram DM and other char-limited channels.
 *
 * Design principles:
 *   - Strict FA-only or EN-only.
 *   - Pure functions, no side effects.
 *   - Never expose internal codes to the recipient — always localized labels.
 *
 * @author    Mohammad Hussein
 * @version   1.1.0
 * @since     2026-09-15
 */

import type {
  BuildOutput, BudgetTier, ContactInfo, DomainId, IntentCode,
  Language, TimelineOption,
} from '../types';
import { DOMAIN_BY_ID } from './domains';
import { INTENT_BY_CODE } from './intents';
import { generateTrackingCode } from './tracker';

// ─── Public Channels ────────────────────────────────────────────────────

/** Developer's public channels (single source of truth). */
export const CHANNELS = {
  telegram: 'mohammad_hussein_dev',
  email: 'king.mohamd.09876@gmail.com',
} as const;

// ─── Label Dictionaries ─────────────────────────────────────────────────

const L = {
  fa: {
    header: '📩 درخواست جدید',
    client: '👤 کارفرما',
    intent: '🎯 نوع درخواست',
    domains: '📦 حوزه‌ها',
    timeline: '⏱ زمان',
    budget: '💰 بودجه',
    description: '📝 توضیحات',
    footer: '🔗 وب‌سایت محمدحسین',
    noDesc: '(بدون توضیحات)',
    trackCode: 'کد',
  },
  en: {
    header: '📩 New Inquiry',
    client: '👤 Client',
    intent: '🎯 Intent',
    domains: '📦 Domains',
    timeline: '⏱ Timeline',
    budget: '💰 Budget',
    description: '📝 Description',
    footer: '🔗 Mohammad Hussein\'s website',
    noDesc: '(no description)',
    trackCode: 'Code',
  },
} as const;

const TIMELINE_LABEL: Record<TimelineOption, { fa: string; en: string }> = {
  urgent:   { fa: 'فوری (کمتر از ۲ هفته)', en: 'Urgent (< 2 weeks)' },
  standard: { fa: 'معمولی (۱ تا ۲ ماه)',   en: 'Standard (1–2 months)' },
  relaxed:  { fa: 'آرام (۳ تا ۶ ماه)',     en: 'Relaxed (3–6 months)' },
  longterm: { fa: 'بلندمدت',                en: 'Long-term' },
};

const BUDGET_LABEL: Record<BudgetTier, { fa: string; en: string }> = {
  starter:      { fa: 'پایه (کمتر از ۵۰۰ دلار)',  en: 'Starter (< $500)' },
  standard:     { fa: 'استاندارد (۵۰۰ تا ۲۰۰۰ دلار)', en: 'Standard ($500–2K)' },
  professional: { fa: 'حرفه‌ای (۲ تا ۱۰ هزار دلار)', en: 'Professional ($2K–10K)' },
  enterprise:   { fa: 'سازمانی (بیش از ۱۰ هزار دلار)', en: 'Enterprise ($10K+)' },
  open:         { fa: 'قابل مذاکره',               en: 'Open to discussion' },
};

// ─── Input Type ─────────────────────────────────────────────────────────

export interface BuildMessageInput {
  intentCode: IntentCode | null;
  domains: DomainId[];
  timeline?: TimelineOption;
  budget?: BudgetTier;
  contact: ContactInfo;
  description: string;
  /** Optional override for tracking code. */
  trackingCode?: string;
}

// ─── Full Message (~600-800 chars) ──────────────────────────────────────

/**
 * Builds the full message body — used for Telegram and Email.
 * Structured with sections, one field per line, easy to scan.
 */
function buildFullMessage(input: BuildMessageInput, lang: Language, trackingCode: string): string {
  const label = L[lang];
  const dash = '─'.repeat(28);

  const intentDef = input.intentCode ? INTENT_BY_CODE[input.intentCode] : null;
  const intentLabel = intentDef ? (lang === 'fa' ? intentDef.labelFa : intentDef.labelEn) : '—';

  const domainLabels = input.domains
    .map((id) => DOMAIN_BY_ID[id])
    .filter(Boolean)
    .map((d) => (lang === 'fa' ? d.labelFa : d.labelEn));

  const lines: string[] = [
    `${label.header} · ${trackingCode}`,
    dash,
    `${label.client}: ${input.contact.name}${input.contact.organization ? ` (${input.contact.organization})` : ''}`,
  ];

  if (input.contact.email)    lines.push(`📧 ${input.contact.email}`);
  if (input.contact.phone)    lines.push(`📞 ${input.contact.phone}`);
  if (input.contact.telegram) lines.push(`✈️ @${input.contact.telegram.replace(/^@/, '')}`);
  if (input.contact.github)   lines.push(`🐙 github.com/${input.contact.github.replace(/^@/, '')}`);

  lines.push('', `${label.intent}: ${intentLabel}`);

  if (domainLabels.length > 0) {
    lines.push(`${label.domains}: ${domainLabels.join(' · ')}`);
  }

  if (input.timeline) lines.push(`${label.timeline}: ${TIMELINE_LABEL[input.timeline][lang]}`);
  if (input.budget)   lines.push(`${label.budget}: ${BUDGET_LABEL[input.budget][lang]}`);

  if (input.description.trim()) {
    const desc = input.description.trim().slice(0, 300);
    lines.push('', `${label.description}:`, `«${desc}»`);
  }

  lines.push('', dash, label.footer);

  return lines.filter((l) => l !== '').join('\n');
}

// ─── Compact Message (~200-300 chars) ───────────────────────────────────

/**
 * Builds the compact message body — used for copy-paste into
 * character-limited channels (Instagram DM, WhatsApp status, etc.).
 * Single paragraph, no sections, still complete.
 */
function buildCompactMessage(input: BuildMessageInput, lang: Language, trackingCode: string): string {
  const label = L[lang];

  const intentDef = input.intentCode ? INTENT_BY_CODE[input.intentCode] : null;
  const intentLabel = intentDef ? (lang === 'fa' ? intentDef.labelFa : intentDef.labelEn) : '—';

  const domainLabels = input.domains
    .map((id) => DOMAIN_BY_ID[id])
    .filter(Boolean)
    .slice(0, 3) // top 3 only for brevity
    .map((d) => (lang === 'fa' ? d.labelFa : d.labelEn));

  const parts: string[] = [
    `${label.header} · ${trackingCode}`,
    `${input.contact.name}${input.contact.organization ? ` (${input.contact.organization})` : ''}`,
    `${intentLabel}${domainLabels.length ? ` — ${domainLabels.join(' · ')}` : ''}`,
  ];

  if (input.timeline) parts.push(TIMELINE_LABEL[input.timeline][lang]);
  if (input.budget)   parts.push(BUDGET_LABEL[input.budget][lang]);

  if (input.description.trim()) {
    const desc = input.description.trim().slice(0, 120);
    parts.push(`«${desc}${input.description.length > 120 ? '…' : ''}»`);
  }

  parts.push(label.footer);

  return parts.join('\n');
}

// ─── Public Builder ─────────────────────────────────────────────────────

/**
 * Builds the final output with both full and compact variants,
 * plus channel URLs.
 *
 * @param input - Inquiry payload.
 * @param lang - Output language (strict: FA-only or EN-only).
 * @returns BuildOutput containing both variants and all URLs.
 */
export function buildOutput(input: BuildMessageInput, lang: Language): BuildOutput {
  const trackingCode = input.trackingCode ?? generateTrackingCode();

  const fullMessage    = buildFullMessage(input, lang, trackingCode);
  const compactMessage = buildCompactMessage(input, lang, trackingCode);

  // Telegram deep-link uses the full message.
  const telegramUrl = `https://t.me/${CHANNELS.telegram}?text=${encodeURIComponent(fullMessage)}`;

  // Email uses full message with subject.
  const subject = lang === 'fa'
    ? `[${trackingCode}] درخواست — ${input.contact.name}`
    : `[${trackingCode}] Inquiry — ${input.contact.name}`;
  const emailUrl = `mailto:${CHANNELS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage)}`;

  return {
    trackingCode,
    message: fullMessage,           // backward-compatible
    compactMessage,                 // new
    telegramUrl,
    emailUrl,
  };
}
