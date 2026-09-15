/**
 * @fileoverview IntentConfirmStep — confirm/change the selected intent.
 * @description
 *   Shown after entry selection, so the user sees what they picked
 *   and can change it. Also exposes the depth toggle.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import * as Icons from 'lucide-react';
import type { Depth, IntentCode, Language } from '../../types';
import { INTENT_BY_CODE } from '../../lib/intents';
import { getTranslations } from '../../lib/i18n';
import { ChipGroup } from '../primitives';

export interface IntentConfirmStepProps {
  lang: Language;
  intentCode: IntentCode;
  depth: Depth;
  onDepthChange: (d: Depth) => void;
  onChangeIntent: () => void;
}

export const IntentConfirmStep: React.FC<IntentConfirmStepProps> = ({
  lang, intentCode, depth, onDepthChange, onChangeIntent,
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';
  const def = INTENT_BY_CODE[intentCode];
  const Icon = def
    ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>>)[def.icon] ?? Icons.Circle
    : Icons.Circle;

  const depthOptions = [
    { value: 'quick' as Depth,    label: t.depth.quick },
    { value: 'detailed' as Depth, label: t.depth.detailed },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/5 p-4 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] shrink-0">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[var(--accent-cyan)]">
            {def ? (isFa ? def.labelFa : def.labelEn) : intentCode}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] leading-snug mt-0.5">
            {def ? (isFa ? def.descriptionFa : def.descriptionEn) : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={onChangeIntent}
          className="shrink-0 text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--accent-cyan)] underline-offset-2 hover:underline transition-colors cursor-pointer"
        >
          {isFa ? 'تغییر' : 'Change'}
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">
          {t.depth.label}
        </p>
        <ChipGroup<Depth>
          options={depthOptions}
          value={depth}
          onChange={onDepthChange}
          ariaLabel={t.depth.label}
        />
      </div>
    </div>
  );
};

export default IntentConfirmStep;
