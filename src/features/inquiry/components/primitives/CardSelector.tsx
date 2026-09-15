/**
 * @fileoverview CardSelector — single-select card grid.
 * @description
 *   Renders a responsive grid of icon cards. Exactly one option can be
 *   selected at a time. Fully controlled: parent owns the value.
 *
 * Design:
 *   - Icons come from lucide-react; caller passes the component.
 *   - 2 columns on mobile, 3 on desktop.
 *   - Active state uses --accent-cyan token with subtle background.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface CardOption<T extends string> {
  /** Stable value returned on selection. */
  value: T;
  /** Lucide icon component. */
  icon: LucideIcon;
  /** Localized primary label. */
  label: string;
  /** Optional localized description. */
  description?: string;
}

export interface CardSelectorProps<T extends string> {
  options: ReadonlyArray<CardOption<T>>;
  value: T | null;
  onChange: (next: T) => void;
  /** Number of columns on desktop (default: 3). */
  columns?: 2 | 3 | 4;
  /** Grid aria-label for screen readers. */
  ariaLabel: string;
  className?: string;
}

export function CardSelector<T extends string>({
  options,
  value,
  onChange,
  columns = 3,
  ariaLabel,
  className = '',
}: CardSelectorProps<T>): React.ReactElement {
  const gridCols =
    columns === 2 ? 'grid-cols-2'
    : columns === 4 ? 'grid-cols-2 sm:grid-cols-4'
    : 'grid-cols-2 sm:grid-cols-3';

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`grid ${gridCols} gap-3 ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={[
              'group relative p-4 rounded-xl border text-start transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
              'cursor-pointer',
              active
                ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/8 shadow-sm'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-cyan)]/50',
            ].join(' ')}
          >
            <div className="flex flex-col items-start gap-2">
              <span
                className={[
                  'inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors',
                  active
                    ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)]',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p
                  className={[
                    'text-xs font-semibold leading-tight',
                    active ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  {opt.label}
                </p>
                {opt.description ? (
                  <p className="text-[10px] text-[var(--text-muted)] leading-snug mt-1">
                    {opt.description}
                  </p>
                ) : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default CardSelector;
