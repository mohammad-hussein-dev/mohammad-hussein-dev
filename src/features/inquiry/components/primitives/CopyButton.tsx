/**
 * @fileoverview CopyButton — copy-to-clipboard with visual feedback.
 * @description
 *   Copies provided text to the clipboard and shows a temporary
 *   "copied" confirmation. Handles the (rare) case where the Clipboard
 *   API is unavailable by silently failing.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useCallback, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CopyButtonProps {
  /** Text to copy on click. */
  text: string;
  /** Localized default label. */
  label: string;
  /** Localized "copied" confirmation label. */
  copiedLabel: string;
  /** Visual variant. */
  variant?: 'solid' | 'ghost';
  /** Optional icon override (defaults to Copy). */
  className?: string;
  /** Duration in ms to show the "copied" state. */
  resetAfterMs?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  copiedLabel,
  variant = 'ghost',
  className = '',
  resetAfterMs = 1800,
}) => {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), resetAfterMs);
    } catch {
      /* Clipboard unavailable — silent fail (non-critical) */
    }
  }, [text, resetAfterMs]);

  const styles =
    variant === 'solid'
      ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)] hover:bg-[var(--accent-cyan)]/90'
      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className={[
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg',
        'text-xs font-semibold transition-all cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
        styles,
        className,
      ].join(' ')}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
