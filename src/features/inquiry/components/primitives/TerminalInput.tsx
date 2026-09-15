/**
 * @fileoverview TerminalInput — labeled text input.
 * @description
 *   A minimal labeled input with optional prompt prefix and inline
 *   validation error. Designed to feel consistent with the portfolio's
 *   terminal aesthetic without being gimmicky.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';

export interface TerminalInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  /** HTML input type. */
  type?: 'text' | 'email' | 'tel' | 'url';
  /** Force LTR (for phone, email, username). */
  ltr?: boolean;
  required?: boolean;
  /** Inline error message (already localized). */
  error?: string;
  /** Optional short hint under the field. */
  hint?: string;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  ltr = false,
  required = false,
  error,
  hint,
  maxLength,
  autoFocus,
  className = '',
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
      >
        {label}
        {required ? (
          <span className="text-rose-500 ms-1" aria-hidden="true">*</span>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={ltr ? 'ltr' : undefined}
        autoFocus={autoFocus}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        className={[
          'w-full h-11 px-3.5 rounded-lg text-xs transition-colors',
          'bg-[var(--bg-card)] text-[var(--text-primary)]',
          'border focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]/40',
          error
            ? 'border-rose-500/60'
            : 'border-[var(--border-subtle)] focus:border-[var(--accent-cyan)]',
          ltr ? 'font-mono' : '',
        ].join(' ')}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-[10px] text-rose-500 mt-1.5">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[10px] text-[var(--text-muted)] mt-1.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default TerminalInput;
