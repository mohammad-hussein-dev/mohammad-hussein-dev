/**
 * @fileoverview TimelineStep — timeline + budget selection.
 * @description
 *   Two ChipGroups (timeline, budget) stacked vertically.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import type { BudgetTier, Language, TimelineOption } from '../../types';
import { getTranslations } from '../../lib/i18n';
import { ChipGroup, type ChipOption } from '../primitives';

export interface TimelineStepProps {
  lang: Language;
  timeline: TimelineOption | undefined;
  budget: BudgetTier | undefined;
  onTimelineChange: (t: TimelineOption) => void;
  onBudgetChange: (b: BudgetTier) => void;
}

const TIMELINE_OPTS = {
  fa: {
    urgent:   { label: 'فوری',   hint: '< 2 هفته' },
    standard: { label: 'معمولی', hint: '1–2 ماه' },
    relaxed:  { label: 'آرام',   hint: '3–6 ماه' },
    longterm: { label: 'بلندمدت', hint: '6 ماه+' },
  },
  en: {
    urgent:   { label: 'Urgent',   hint: '< 2 weeks' },
    standard: { label: 'Standard', hint: '1–2 months' },
    relaxed:  { label: 'Relaxed',  hint: '3–6 months' },
    longterm: { label: 'Long-term', hint: '6+ months' },
  },
} as const;

const BUDGET_OPTS = {
  fa: {
    starter:      { label: 'پایه',       hint: '< $500' },
    standard:     { label: 'استاندارد',  hint: '$500–2K' },
    professional: { label: 'حرفه‌ای',    hint: '$2K–10K' },
    enterprise:   { label: 'سازمانی',    hint: '$10K+' },
    open:         { label: 'قابل مذاکره', hint: '—' },
  },
  en: {
    starter:      { label: 'Starter',      hint: '< $500' },
    standard:     { label: 'Standard',     hint: '$500–2K' },
    professional: { label: 'Professional', hint: '$2K–10K' },
    enterprise:   { label: 'Enterprise',   hint: '$10K+' },
    open:         { label: 'Open',         hint: '—' },
  },
} as const;

export const TimelineStep: React.FC<TimelineStepProps> = ({
  lang, timeline, budget, onTimelineChange, onBudgetChange,
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';

  const timelineOptions: ChipOption<TimelineOption>[] = (
    ['urgent', 'standard', 'relaxed', 'longterm'] as TimelineOption[]
  ).map((id) => ({
    value: id,
    label: TIMELINE_OPTS[lang][id].label,
    hint: TIMELINE_OPTS[lang][id].hint,
  }));

  const budgetOptions: ChipOption<BudgetTier>[] = (
    ['starter', 'standard', 'professional', 'enterprise', 'open'] as BudgetTier[]
  ).map((id) => ({
    value: id,
    label: BUDGET_OPTS[lang][id].label,
    hint: BUDGET_OPTS[lang][id].hint,
  }));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2.5">
          {t.estimate.weeks}
        </p>
        <ChipGroup<TimelineOption>
          options={timelineOptions}
          value={timeline ?? null}
          onChange={onTimelineChange}
          ariaLabel={isFa ? 'زمان تحویل' : 'Timeline'}
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2.5">
          {t.estimate.cost}
        </p>
        <ChipGroup<BudgetTier>
          options={budgetOptions}
          value={budget ?? null}
          onChange={onBudgetChange}
          ariaLabel={isFa ? 'بازه بودجه' : 'Budget range'}
        />
      </div>
    </div>
  );
};

export default TimelineStep;
