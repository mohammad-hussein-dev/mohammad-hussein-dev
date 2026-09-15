/**
 * @fileoverview EstimateBadge — live estimate display.
 * @description
 *   Compact card showing effort (weeks), cost band (USD), and an
 *   optional confidence indicator. Renders nothing when estimate
 *   is undefined.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Clock, Wallet, TrendingUp } from 'lucide-react';
import type { Estimate } from '../../types';

export interface EstimateBadgeProps {
  estimate: Estimate | null | undefined;
  /** Localized label for "weeks". */
  weeksLabel: string;
  /** Localized label for "cost". */
  costLabel: string;
  /** Localized unit for week count, e.g. "هفته" / "weeks". */
  weeksUnit: string;
  className?: string;
}

export const EstimateBadge: React.FC<EstimateBadgeProps> = ({
  estimate,
  weeksLabel,
  costLabel,
  weeksUnit,
  className = '',
}) => {
  if (!estimate) return null;

  const { weeks, cost, confidence } = estimate;
  const confidenceColor =
    confidence >= 75 ? 'text-emerald-500'
    : confidence >= 45 ? 'text-amber-500'
    : 'text-rose-500';

  return (
    <div
      className={[
        'rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60',
        'p-4 grid grid-cols-1 sm:grid-cols-3 gap-3',
        className,
      ].join(' ')}
    >
      <Cell
        icon={<Clock className="w-4 h-4" aria-hidden="true" />}
        label={weeksLabel}
        value={`${weeks.min}–${weeks.max} ${weeksUnit}`}
      />
      <Cell
        icon={<Wallet className="w-4 h-4" aria-hidden="true" />}
        label={costLabel}
        value={`$${formatUsd(cost.min)} – $${formatUsd(cost.max)}`}
      />
      <Cell
        icon={<TrendingUp className={`w-4 h-4 ${confidenceColor}`} aria-hidden="true" />}
        label="Confidence"
        value={`${confidence}%`}
      />
    </div>
  );
};

// ─── Sub-components ─────────────────────────────────────────────────────

interface CellProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Cell: React.FC<CellProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <span className="text-[var(--accent-cyan)] shrink-0 mt-0.5">{icon}</span>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
        {label}
      </p>
      <p className="text-xs font-bold text-[var(--text-primary)] tabular-nums">
        {value}
      </p>
    </div>
  </div>
);

/** Formats an integer with thousands separators. */
function formatUsd(n: number): string {
  return n.toLocaleString('en-US');
}

export default EstimateBadge;
