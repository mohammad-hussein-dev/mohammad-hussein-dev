/**
 * @fileoverview MultiSelectGrid — multi-select checkbox grid.
 * @description
 *   Renders a grouped list of checkable items. Uses roving ARIA roles
 *   (listbox + option with aria-selected) for accessibility.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Check } from 'lucide-react';

/**
 * Icon type — intentionally broader than LucideIcon so that
 * dynamically-resolved components (via lookup tables) can be passed.
 */
export type IconComponent = React.ComponentType<{
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

export interface GridOption<T extends string> {
  value: T;
  label: string;
  icon?: IconComponent;
  /** Optional group key — items are grouped in render order. */
  group?: string;
}

export interface MultiSelectGridProps<T extends string> {
  options: ReadonlyArray<GridOption<T>>;
  values: ReadonlyArray<T>;
  onChange: (next: T[]) => void;
  ariaLabel: string;
  /** Optional max selections (soft cap, prevents over-select). */
  max?: number;
  className?: string;
}

export function MultiSelectGrid<T extends string>({
  options,
  values,
  onChange,
  ariaLabel,
  max,
  className = '',
}: MultiSelectGridProps<T>): React.ReactElement {
  const selected = new Set(values);

  const toggle = (val: T): void => {
    const isOn = selected.has(val);
    if (isOn) {
      onChange(values.filter((v) => v !== val));
      return;
    }
    if (max && values.length >= max) return;
    onChange([...values, val]);
  };

  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      aria-multiselectable="true"
      className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${className}`}
    >
      {options.map((opt) => {
        const active = selected.has(opt.value);
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => toggle(opt.value)}
            className={[
              'p-3 rounded-lg border text-start flex items-center justify-between gap-2 transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
              'cursor-pointer',
              active
                ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/8'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-cyan)]/50',
            ].join(' ')}
          >
            <span className="flex items-center gap-2 min-w-0">
              {Icon ? (
                <Icon
                  className={[
                    'w-4 h-4 shrink-0',
                    active ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-muted)]',
                  ].join(' ')}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={[
                  'text-xs font-medium truncate',
                  active ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-primary)]',
                ].join(' ')}
              >
                {opt.label}
              </span>
            </span>
            <span
              className={[
                'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                active
                  ? 'bg-[var(--accent-cyan)] border-[var(--accent-cyan)] text-[var(--bg-primary)]'
                  : 'border-[var(--border-subtle)]',
              ].join(' ')}
            >
              {active ? <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MultiSelectGrid;
