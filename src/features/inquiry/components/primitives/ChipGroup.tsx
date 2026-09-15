/**
 * @fileoverview ChipGroup — horizontal single-select chips.
 * @description
 *   Compact inline selector ideal for timeline, budget, or frequency
 *   options. Uses radiogroup semantics.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  /** Optional small hint shown under label. */
  hint?: string;
}

export interface ChipGroupProps<T extends string> {
  options: ReadonlyArray<ChipOption<T>>;
  value: T | null;
  onChange: (next: T) => void;
  ariaLabel: string;
  /** Wrap onto multiple rows if needed. */
  wrap?: boolean;
  className?: string;
}

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  wrap = true,
  className = '',
}: ChipGroupProps<T>): React.ReactElement {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={[
        'flex gap-2',
        wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto',
        className,
      ].join(' ')}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={[
              'min-h-[40px] sm:min-h-[36px] px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-full border text-xs font-semibold transition-all whitespace-nowrap',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
              'cursor-pointer',
              active
                ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/12 text-[var(--accent-cyan)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50',
            ].join(' ')}
          >
            {opt.label}
            {opt.hint ? (
              <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                {opt.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default ChipGroup;
