/**
 * @fileoverview InquiryFAB — floating action button (responsive).
 * @description
 *   Bottom-end floating button. On mobile it shrinks to a circular
 *   icon-only button to avoid covering content; on desktop it shows
 *   the full label. Respects iOS safe-area insets.
 *
 * @author    Mohammad Hussein
 * @version   1.1.0
 * @since     2026-09-15
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import type { Language } from '../types';

export interface InquiryFABProps {
  onClick: () => void;
  lang: Language;
  hidden?: boolean;
}

export const InquiryFAB: React.FC<InquiryFABProps> = ({ onClick, lang, hidden = false }) => {
  if (hidden) return null;
  const isFa = lang === 'fa';
  const label = isFa ? 'شروع گفتگو' : 'Start a conversation';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={[
        'fixed z-[90]',
        // Position: end + bottom + safe area
        'end-4 sm:end-6',
        'bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)]',
        'sm:bottom-6',
        // Size: circle on mobile, pill on desktop
        'h-12 w-12 sm:w-auto sm:ps-4 sm:pe-5',
        'rounded-full',
        // Style
        'bg-[var(--accent-cyan)] text-[var(--bg-primary)]',
        'font-bold text-xs shadow-xl',
        'flex items-center justify-center sm:gap-2',
        // Interactions
        'transition-all hover:scale-[1.05] active:scale-[0.97]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-cyan)]',
        'cursor-pointer',
      ].join(' ')}
      style={{ boxShadow: '0 8px 24px -6px rgba(0,229,255,0.55)' }}
    >
      <Sparkles className="w-5 h-5 sm:w-4 sm:h-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default InquiryFAB;
