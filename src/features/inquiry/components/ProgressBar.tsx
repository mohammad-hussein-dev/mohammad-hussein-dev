/**
 * @fileoverview ProgressBar — step progress indicator.
 * @description
 *   Displays "Step N of M" plus a bar. Clickable segments allow
 *   jumping to prior steps. RTL-aware.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import type { Language, StepId } from '../types';
import { getTranslations } from '../lib/i18n';

export interface ProgressBarProps {
  steps: StepId[];
  currentIndex: number;
  lang: Language;
  onJump?: (step: StepId) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentIndex,
  lang,
  onJump,
  className = '',
}) => {
  const t = getTranslations(lang);
  const current = steps[currentIndex];
  const isFa = lang === 'fa';
  const total = steps.length;
  const stepLabel = isFa
    ? `گام ${currentIndex + 1} از ${total}`
    : `Step ${currentIndex + 1} of ${total}`;
  const currentLabel = current ? t.steps[current] : '';

  const progress = total > 1 ? (currentIndex / (total - 1)) * 100 : 0;

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
        <span className="text-[var(--text-muted)]">{stepLabel}</span>
        <span className="text-[var(--text-secondary)] font-semibold">{currentLabel}</span>
      </div>

      <div className="relative h-1.5 w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden">
        <div
          className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-cyan)]/70 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        {onJump ? (
          <div className="absolute inset-0 flex">
            {steps.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => i < currentIndex && onJump(s)}
                disabled={i >= currentIndex}
                aria-label={`Jump to ${t.steps[s]}`}
                className={`flex-1 ${i < currentIndex ? 'cursor-pointer' : 'cursor-default'}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProgressBar;
