/**
 * @fileoverview FreeformEntry — natural-language description input.
 * @description
 *   Lets the user describe their need in their own words.
 *   On submit, the parent is expected to parse the text (rule-based)
 *   and suggest a structured interpretation for confirmation.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useState } from 'react';
import { Wand2, MessageSquare } from 'lucide-react';
import type { Language } from '../../types';
import { FreeTextArea } from '../primitives/FreeTextArea';

export interface FreeformEntryProps {
  lang: Language;
  onSubmit: (text: string) => void;
  onDiscuss: () => void;
  className?: string;
}

const PLACEHOLDER = {
  fa: 'مثال: برای یک کلینیک ۴ پزشکه به یک بک‌اند جنگو با احراز هویت و دستیار هوش مصنوعی نیاز داریم. زمان: حدود ۳ ماه.',
  en: 'Example: We need a Django backend for a 4-doctor clinic with auth and an AI triage assistant. Timeline: ~3 months.',
};

const LABEL = {
  fa: 'نیازتان را آزادانه بنویسید',
  en: 'Describe your need freely',
};

const SUBMIT_LABEL = {
  fa: 'تحلیل و ادامه',
  en: 'Parse & continue',
};

const DISCUSS_LABEL = {
  fa: 'مستقیم صحبت کنیم',
  en: 'Let\'s chat directly',
};

export const FreeformEntry: React.FC<FreeformEntryProps> = ({
  lang,
  onSubmit,
  onDiscuss,
  className = '',
}) => {
  const [text, setText] = useState('');
  const trimmed = text.trim();
  const canSubmit = trimmed.length >= 10;

  const handleSubmit = (): void => {
    if (canSubmit) onSubmit(trimmed);
  };

  return (
    <div className={className}>
      <FreeTextArea
        id="freeform-description"
        label={LABEL[lang]}
        value={text}
        onChange={setText}
        placeholder={PLACEHOLDER[lang]}
        rows={6}
        maxLength={2000}
      />

      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className={[
            'flex-1 h-11 rounded-lg text-xs font-bold transition-all',
            'flex items-center justify-center gap-2 cursor-pointer',
            canSubmit
              ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)] hover:bg-[var(--accent-cyan)]/90'
              : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
          ].join(' ')}
        >
          <Wand2 className="w-4 h-4" aria-hidden="true" />
          <span>{SUBMIT_LABEL[lang]}</span>
        </button>

        <button
          type="button"
          onClick={onDiscuss}
          className={[
            'h-11 px-5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
            'bg-[var(--bg-elevated)] text-[var(--text-secondary)]',
            'border border-[var(--border-subtle)]',
            'hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/50',
            'flex items-center justify-center gap-2',
          ].join(' ')}
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>{DISCUSS_LABEL[lang]}</span>
        </button>
      </div>
    </div>
  );
};

export default FreeformEntry;
