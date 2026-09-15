/**
 * @fileoverview ScopeStep — free-form technical scope description.
 * @description
 *   Single textarea where the user provides any technical context not
 *   covered by structured fields. Kept intentionally simple — verbose
 *   per-intent forms are out of scope for this MVP.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import type { IntentCode, Language } from '../../types';
import { getTranslations } from '../../lib/i18n';
import { FreeTextArea } from '../primitives';

export interface ScopeStepProps {
  lang: Language;
  intentCode: IntentCode | null;
  description: string;
  onChange: (text: string) => void;
}

const HINTS = {
  fa: {
    A1: 'اگر جزئیات فنی، محدودیت‌ها یا ایده‌های خاصی دارید، اینجا بنویسید.',
    A2: 'شماره تیم، فرهنگ فنی، یا انتظارات مشخص از نقش را بنویسید.',
    B2: 'حوزه تحقیقاتی، مقالات مرتبط یا متدلوژی مدنظر را بنویسید.',
    default: 'هر جزئیات یا الزام خاصی که باید بدانم را اینجا بنویسید.',
  },
  en: {
    A1: 'Share any technical constraints, existing systems, or specific ideas.',
    A2: 'Team size, tech culture, or specific expectations for the role.',
    B2: 'Research area, related papers, or preferred methodology.',
    default: 'Any specific requirements or context I should know about.',
  },
} as const;

export const ScopeStep: React.FC<ScopeStepProps> = ({
  lang, intentCode, description, onChange,
}) => {
  const t = getTranslations(lang);
  const hintMap = HINTS[lang];
  const hint = (intentCode && intentCode in hintMap)
    ? (hintMap as Record<string, string>)[intentCode]
    : hintMap.default;

  return (
    <div className="space-y-3">
      <FreeTextArea
        id="scope-description"
        label={t.contact.description}
        value={description}
        onChange={onChange}
        placeholder={hint}
        rows={6}
        maxLength={2000}
      />
    </div>
  );
};

export default ScopeStep;
