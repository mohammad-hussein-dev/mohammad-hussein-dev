/**
 * @fileoverview ReviewStep — pre-submission summary.
 * @description
 *   Displays a live preview of the exact message the user will send.
 *   Two tabs: full and compact. Helps the user verify before submit.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useState } from 'react';
import type { BuildOutput, Language } from '../../types';
import { getTranslations } from '../../lib/i18n';
import { CopyButton } from '../primitives';

export interface ReviewStepProps {
  lang: Language;
  output: BuildOutput;
}

type Mode = 'full' | 'compact';

export const ReviewStep: React.FC<ReviewStepProps> = ({ lang, output }) => {
  const t = getTranslations(lang);
  const [mode, setMode] = useState<Mode>('full');
  const isFa = lang === 'fa';

  const text = mode === 'full' ? output.message : output.compactMessage;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode('full')}
          className={[
            'px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer',
            mode === 'full'
              ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
          ].join(' ')}
        >
          {isFa ? 'کامل' : 'Full'}
        </button>
        <button
          type="button"
          onClick={() => setMode('compact')}
          className={[
            'px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer',
            mode === 'compact'
              ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
          ].join(' ')}
        >
          {isFa ? 'خلاصه' : 'Compact'}
        </button>
        <span className="ms-auto text-[10px] font-mono text-[var(--text-muted)] tabular-nums">
          {text.length} chars
        </span>
      </div>

      <pre
        dir={isFa ? 'rtl' : 'ltr'}
        className={[
          'p-4 rounded-lg text-xs leading-relaxed whitespace-pre-wrap break-words',
          'bg-[var(--bg-card)] border border-[var(--border-subtle)]',
          'text-[var(--text-secondary)] font-mono max-h-72 overflow-y-auto',
        ].join(' ')}
      >
        {text}
      </pre>

      <div className="flex items-center justify-between">
        <p className="text-[10px] text-[var(--text-muted)]">
          {isFa ? `کد پیگیری: ${output.trackingCode}` : `Tracking: ${output.trackingCode}`}
        </p>
        <CopyButton
          text={text}
          label={isFa ? 'کپی متن' : 'Copy message'}
          copiedLabel={t.success.copied}
        />
      </div>
    </div>
  );
};

export default ReviewStep;
