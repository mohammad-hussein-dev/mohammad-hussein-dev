/**
 * @fileoverview EscapeHatch — always-available step escape actions.
 * @description
 *   Renders a compact footer with three optional actions:
 *     - Custom   : let the user type a custom answer
 *     - Discuss  : open a direct human channel
 *     - Skip     : move past this step without answering
 *
 *   Any of the actions can be omitted by not passing the callback.
 *   If no actions are provided, the component renders nothing.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Pencil, MessageCircle, SkipForward } from 'lucide-react';

export interface EscapeHatchProps {
  onCustom?: () => void;
  onDiscuss?: () => void;
  onSkip?: () => void;
  /** Localized label for the "custom" action. */
  customLabel: string;
  /** Localized label for the "discuss" action. */
  discussLabel: string;
  /** Localized label for the "skip" action. */
  skipLabel: string;
  /** Optional clarifying hint shown above the buttons. */
  hint?: string;
  className?: string;
}

export const EscapeHatch: React.FC<EscapeHatchProps> = ({
  onCustom,
  onDiscuss,
  onSkip,
  customLabel,
  discussLabel,
  skipLabel,
  hint,
  className = '',
}) => {
  const hasAny = onCustom || onDiscuss || onSkip;
  if (!hasAny) return null;

  return (
    <div
      className={`mt-6 pt-4 border-t border-[var(--border-subtle)] ${className}`}
    >
      {hint ? (
        <p className="text-[10px] text-[var(--text-muted)] mb-2.5 text-center">
          {hint}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {onCustom ? (
          <HatchButton icon={Pencil} label={customLabel} onClick={onCustom} />
        ) : null}
        {onDiscuss ? (
          <HatchButton icon={MessageCircle} label={discussLabel} onClick={onDiscuss} />
        ) : null}
        {onSkip ? (
          <HatchButton icon={SkipForward} label={skipLabel} onClick={onSkip} />
        ) : null}
      </div>
    </div>
  );
};

// ─── Internal button ────────────────────────────────────────────────────

interface HatchButtonProps {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  label: string;
  onClick: () => void;
}

const HatchButton: React.FC<HatchButtonProps> = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
      'text-[11px] font-medium transition-colors cursor-pointer',
      'text-[var(--text-secondary)] bg-[var(--bg-elevated)]',
      'border border-[var(--border-subtle)]',
      'hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
    ].join(' ')}
  >
    <Icon className="w-3 h-3" aria-hidden="true" />
    <span>{label}</span>
  </button>
);

export default EscapeHatch;
