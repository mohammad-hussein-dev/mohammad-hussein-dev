/**
 * @fileoverview ModeSelector — 4-way entry mode picker.
 * @description
 *   First screen the user sees. Presents four paths into the inquiry:
 *   - Guided   : browse the intent grid
 *   - Freeform : write a natural-language description
 *   - Chat     : jump straight to Telegram/Email
 *   - Terminal : open the MH-COCKPIT terminal
 *
 * The 4th option (Terminal) is shown only when `showTerminal` is true
 * (i.e., user has terminal access enabled).
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Grid3x3, PenLine, MessageSquare, Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import type { EntryMode, Language } from '../../types';
import { getTranslations } from '../../lib/i18n';

export interface ModeSelectorProps {
  lang: Language;
  onSelect: (mode: EntryMode) => void;
  /** Show the 4th 'terminal' option (default: false). */
  showTerminal?: boolean;
  className?: string;
}

interface ModeCard {
  mode: EntryMode;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  labelKey: keyof ReturnType<typeof getTranslations>['entry']['modes'];
}

const CARDS: ModeCard[] = [
  { mode: 'guided',   icon: Grid3x3,       labelKey: 'guided' },
  { mode: 'freeform', icon: PenLine,       labelKey: 'freeform' },
  { mode: 'chat',     icon: MessageSquare, labelKey: 'chat' },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  lang,
  onSelect,
  showTerminal = false,
  className = '',
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';
  const cards = showTerminal
    ? [...CARDS, { mode: 'terminal' as EntryMode, icon: Terminal, labelKey: 'terminal' as const }]
    : CARDS;

  return (
    <div className={className}>
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
          {t.entry.title}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {t.entry.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map(({ mode, icon: Icon, labelKey }) => (
          <button
            key={mode}
            type="button"
            onClick={() => onSelect(mode)}
            className={[
              'group p-5 rounded-xl border text-start transition-all cursor-pointer',
              'border-[var(--border-subtle)] bg-[var(--bg-card)]',
              'hover:border-[var(--accent-cyan)]/60 hover:bg-[var(--accent-cyan)]/5',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
            ].join(' ')}
          >
            <div className="flex flex-col items-start gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                {t.entry.modes[labelKey]}
              </span>
              {isFa ? (
                <ArrowLeft className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
