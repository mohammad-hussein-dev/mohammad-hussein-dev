/**
 * @fileoverview SuccessStep — final confirmation screen.
 * @description
 *   Presents the tracking code, a compact summary grid, and three
 *   dispatch actions:
 *     - Telegram (deep-link with full message)
 *     - Email (mailto with full message)
 *     - Copy Full / Copy Compact (for Instagram, WhatsApp, etc.)
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import {
  CheckCircle2, Send, Mail, RotateCcw,
  Hash, Package, Clock, Wallet, User as UserIcon,
} from 'lucide-react';
import type { BuildOutput, DomainId, IntentCode, Language } from '../../types';
import { INTENT_BY_CODE } from '../../lib/intents';
import { DOMAIN_BY_ID } from '../../lib/domains';
import { getTranslations } from '../../lib/i18n';
import { CopyButton } from '../primitives';

export interface SuccessStepProps {
  lang: Language;
  output: BuildOutput;
  intentCode: IntentCode | null;
  domains: DomainId[];
  contactName: string;
  contactOrg?: string;
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  lang, output, intentCode, domains, contactName, contactOrg, onReset,
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';

  const intentDef = intentCode ? INTENT_BY_CODE[intentCode] : null;
  const intentLabel = intentDef ? (isFa ? intentDef.labelFa : intentDef.labelEn) : '—';

  const domainLabels = domains
    .map((id) => DOMAIN_BY_ID[id])
    .filter(Boolean)
    .slice(0, 3)
    .map((d) => (isFa ? d.labelFa : d.labelEn));

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-emerald-500" aria-hidden="true" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
          {t.success.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] max-w-md">
          {t.success.subtitle}
        </p>
      </div>

      {/* ── Tracking Code ── */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Hash className="w-3 h-3 text-[var(--text-muted)]" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {t.success.trackingCode}
          </span>
        </div>
        <code className="text-sm font-mono font-bold text-[var(--accent-cyan)] select-all" dir="ltr">
          {output.trackingCode}
        </code>
      </div>

      {/* ── Summary Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <SummaryCell
          icon={<UserIcon className="w-3.5 h-3.5" aria-hidden="true" />}
          label={isFa ? 'کارفرما' : 'Client'}
          value={`${contactName}${contactOrg ? ` (${contactOrg})` : ''}`}
        />
        <SummaryCell
          icon={<Package className="w-3.5 h-3.5" aria-hidden="true" />}
          label={isFa ? 'نوع' : 'Intent'}
          value={intentLabel}
        />
        {domainLabels.length > 0 ? (
          <SummaryCell
            icon={<Clock className="w-3.5 h-3.5" aria-hidden="true" />}
            label={isFa ? 'حوزه‌ها' : 'Domains'}
            value={domainLabels.join(' · ')}
            className="sm:col-span-2"
          />
        ) : null}
      </div>

      {/* ── Dispatch Actions ── */}
      <div className="space-y-2.5">
        <p className="text-[11px] font-semibold text-center text-[var(--text-muted)]">
          {isFa ? 'ارسال از طریق:' : 'Dispatch via:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={output.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'h-12 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all',
              'bg-gradient-to-br from-sky-500 to-sky-600 text-white',
              'hover:from-sky-600 hover:to-sky-700 shadow-sm hover:shadow-md',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
            ].join(' ')}
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>{t.success.sendTelegram}</span>
          </a>
          <a
            href={output.emailUrl}
            className={[
              'h-12 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all',
              'bg-gradient-to-br from-amber-500 to-amber-600 text-white',
              'hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow-md',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
            ].join(' ')}
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>{t.success.sendEmail}</span>
          </a>
        </div>

        {/* ── Copy variants ── */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <CopyButton
            text={output.message}
            label={t.success.copyMessage}
            copiedLabel={t.success.copied}
          />
          <CopyButton
            text={output.compactMessage}
            label={t.success.copyCompact}
            copiedLabel={t.success.copied}
          />
        </div>

        <p className="text-[10px] text-center text-[var(--text-muted)] leading-relaxed">
          {t.success.copyHint}
        </p>
      </div>

      {/* ── Reset ── */}
      <div className="pt-3 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onReset}
          className={[
            'w-full h-11 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
            'bg-[var(--bg-elevated)] text-[var(--text-secondary)]',
            'border border-[var(--border-subtle)]',
            'hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50',
            'flex items-center justify-center gap-2',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
          ].join(' ')}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t.nav.reset}</span>
        </button>
      </div>
    </div>
  );
};

// ─── Internal cell ──────────────────────────────────────────────────────

interface SummaryCellProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const SummaryCell: React.FC<SummaryCellProps> = ({ icon, label, value, className = '' }) => (
  <div className={`rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 flex items-start gap-2.5 ${className}`}>
    <span className="text-[var(--accent-cyan)] shrink-0 mt-0.5">{icon}</span>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
        {label}
      </p>
      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{value}</p>
    </div>
  </div>
);

export default SuccessStep;
