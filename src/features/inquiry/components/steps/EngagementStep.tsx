/**
 * @fileoverview EngagementStep — collaboration model selection.
 * @description
 *   Single-select from four standard engagement models.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Target, Repeat, Package, Heart } from 'lucide-react';
import type { Language } from '../../types';
import { CardSelector, type CardOption } from '../primitives';

export interface EngagementStepProps {
  lang: Language;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const EngagementStep: React.FC<EngagementStepProps> = ({ lang, value, onChange }) => {
  const isFa = lang === 'fa';

  const options: CardOption<string>[] = isFa
    ? [
        { value: 'fixed-scope', icon: Package, label: 'محدوده ثابت', description: 'تحویل مشخص و پایان یافته' },
        { value: 'milestone',   icon: Target,  label: 'فازبندی‌شده',  description: 'پرداخت و تحویل مرحله‌ای' },
        { value: 'retainer',    icon: Repeat,  label: 'ماهانه / ساعتی', description: 'همکاری مستمر' },
        { value: 'pro-bono',    icon: Heart,   label: 'متن‌باز / افتخاری', description: 'بدون هزینه' },
      ]
    : [
        { value: 'fixed-scope', icon: Package, label: 'Fixed-scope',  description: 'Clear deliverable, defined end' },
        { value: 'milestone',   icon: Target,  label: 'Milestone',    description: 'Phased delivery & payment' },
        { value: 'retainer',    icon: Repeat,  label: 'Retainer',     description: 'Ongoing hours/month' },
        { value: 'pro-bono',    icon: Heart,   label: 'Pro-bono',     description: 'Open source / voluntary' },
      ];

  return (
    <CardSelector<string>
      options={options}
      value={value ?? null}
      onChange={onChange}
      columns={2}
      ariaLabel={isFa ? 'نحوه همکاری' : 'Engagement model'}
    />
  );
};

export default EngagementStep;
