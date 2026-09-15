/**
 * @fileoverview FreeTextArea — labeled textarea with character counter.
 * @description
 *   A controlled textarea with soft max-length enforcement and a live
 *   character counter. Used for project descriptions and free-form
 *   natural language entry.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';

export interface FreeTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  /** Show live counter badge (recommended when maxLength is set). */
  showCounter?: boolean;
  /** Optional inline error message. */
  error?: string;
  className?: string;
}

export const FreeTextArea: React.FC<FreeTextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  maxLength = 4000,
  showCounter = true,
  error,
  className = '',
}) => {
  const remaining = maxLength - value.length;
  const nearLimit = remaining < 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-[var(--text-secondary)]"
        >
          {label}
        </label>
        {showCounter ? (
          <span
            className={[
              'text-[10px] font-mono tabular-nums transition-colors',
              nearLimit ? 'text-amber-500' : 'text-[var(--text-muted)]',
            ].join(' ')}
            aria-live="polite"
          >
            {value.length} / {maxLength}
          </span>
        ) : null}
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) onChange(e.target.value);
        }}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          'w-full p-3.5 rounded-lg text-xs resize-none transition-colors',
          'bg-[var(--bg-card)] text-[var(--text-primary)]',
          'border focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/40',
          error
            ? 'border-rose-500/60'
            : 'border-[var(--border-subtle)] focus:border-[var(--accent-cyan)]',
        ].join(' ')}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[10px] text-rose-500 mt-1.5">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default FreeTextArea;
