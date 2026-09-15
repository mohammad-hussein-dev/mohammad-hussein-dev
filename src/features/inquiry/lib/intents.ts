/**
 * @fileoverview Intent Registry — 19 canonical inquiry intents.
 * @description
 *   Every intent the user can select (or that the parser can infer) is
 *   registered here exactly once. Adding a new intent requires:
 *     1. Adding its code to IntentCode in types/index.ts
 *     2. Appending its definition to INTENTS below
 *     3. (Optional) Adding its step template in machine.ts
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import type { IntentCode, IntentDefinition, IntentGroup } from '../types';

/** Ordered list of intent groups for UI rendering. */
export const INTENT_GROUPS: IntentGroup[] = [
  'commercial',
  'collaborative',
  'knowledge',
  'strategic',
  'general',
];

/** Localized group labels. Kept here (not in i18n) since they're purely structural. */
export const GROUP_LABELS: Record<IntentGroup, { fa: string; en: string }> = {
  commercial:    { fa: 'تجاری',   en: 'Commercial' },
  collaborative: { fa: 'همکاری',  en: 'Collaborative' },
  knowledge:     { fa: 'دانشی',   en: 'Knowledge' },
  strategic:     { fa: 'راهبردی', en: 'Strategic' },
  general:       { fa: 'عمومی',   en: 'General' },
};

/**
 * Canonical intent registry.
 * Ordering here defines the display order within each group.
 */
export const INTENTS: IntentDefinition[] = [
  // ─── Commercial ────────────────────────────────────────────────────
  {
    code: 'A1', group: 'commercial', icon: 'Rocket',
    labelFa: 'ساخت پروژه',       labelEn: 'Build a project',
    descriptionFa: 'طراحی و پیاده‌سازی یک سیستم نرم‌افزاری جدید',
    descriptionEn: 'Design and build a new software system',
  },
  {
    code: 'A2', group: 'commercial', icon: 'Briefcase',
    labelFa: 'استخدام تمام‌وقت',  labelEn: 'Full-time role',
    descriptionFa: 'موقعیت شغلی تمام‌وقت در تیم شما',
    descriptionEn: 'A full-time position on your team',
  },
  {
    code: 'A3', group: 'commercial', icon: 'Clock',
    labelFa: 'قراردادی / پاره‌وقت', labelEn: 'Contract / Part-time',
    descriptionFa: 'همکاری قراردادی یا پروژه‌ای محدود',
    descriptionEn: 'Fixed-term contract or scoped engagement',
  },
  {
    code: 'A4', group: 'commercial', icon: 'Search',
    labelFa: 'مشاوره / بررسی کد',  labelEn: 'Audit / Consulting',
    descriptionFa: 'بازبینی معماری، امنیت یا عملکرد سیستم',
    descriptionEn: 'Architecture, security, or performance review',
  },
  {
    code: 'A5', group: 'commercial', icon: 'Handshake',
    labelFa: 'پیمانکاری فرعی',    labelEn: 'Subcontracting',
    descriptionFa: 'اجرای بخشی از پروژه به‌عنوان پیمانکار',
    descriptionEn: 'Execute a portion of a larger project',
  },

  // ─── Collaborative ─────────────────────────────────────────────────
  {
    code: 'B1', group: 'collaborative', icon: 'Sprout',
    labelFa: 'مشارکت در متن‌باز', labelEn: 'Open Source contribution',
    descriptionFa: 'مشارکت در پروژه‌های متن‌باز موجود',
    descriptionEn: 'Contribute to existing open source projects',
  },
  {
    code: 'B2', group: 'collaborative', icon: 'FlaskConical',
    labelFa: 'همکاری تحقیقاتی',   labelEn: 'Research partnership',
    descriptionFa: 'همکاری در پژوهش علمی یا فنی',
    descriptionEn: 'Joint scientific or technical research',
  },
  {
    code: 'B3', group: 'collaborative', icon: 'FileText',
    labelFa: 'نویسندگی مشترک مقاله', labelEn: 'Co-authorship',
    descriptionFa: 'نوشتن مقاله علمی به‌صورت مشترک',
    descriptionEn: 'Co-author a scientific paper',
  },
  {
    code: 'B4', group: 'collaborative', icon: 'Rocket',
    labelFa: 'هم‌بنیان‌گذار / استارتاپ', labelEn: 'Co-founder / Startup',
    descriptionFa: 'همکاری در ساخت یک استارتاپ',
    descriptionEn: 'Build a startup together',
  },
  {
    code: 'B5', group: 'collaborative', icon: 'Users',
    labelFa: 'بازبینی کد متقابل', labelEn: 'Peer code review',
    descriptionFa: 'تبادل بازبینی کد بین مهندسان',
    descriptionEn: 'Exchange code reviews between engineers',
  },

  // ─── Knowledge ─────────────────────────────────────────────────────
  {
    code: 'C1', group: 'knowledge', icon: 'GraduationCap',
    labelFa: 'منتورشیپ',           labelEn: 'Mentoring',
    descriptionFa: 'آموزش و راهنمایی برنامه‌نویسان جوان',
    descriptionEn: 'Teach and guide junior developers',
  },
  {
    code: 'C2', group: 'knowledge', icon: 'MessageCircle',
    labelFa: 'سوال فنی',          labelEn: 'Technical question',
    descriptionFa: 'پرسش تخصصی درباره یک موضوع فنی',
    descriptionEn: 'A specific technical question',
  },
  {
    code: 'C3', group: 'knowledge', icon: 'Mic',
    labelFa: 'سخنرانی / کنفرانس', labelEn: 'Speaking / Conference',
    descriptionFa: 'ارائه در رویداد یا کنفرانس',
    descriptionEn: 'Speak at an event or conference',
  },
  {
    code: 'C4', group: 'knowledge', icon: 'Podcast',
    labelFa: 'پادکست / مصاحبه',  labelEn: 'Podcast / Interview',
    descriptionFa: 'حضور در پادکست یا مصاحبه رسانه‌ای',
    descriptionEn: 'Appear on a podcast or media interview',
  },
  {
    code: 'C5', group: 'knowledge', icon: 'PenLine',
    labelFa: 'نوشتن مستندات',    labelEn: 'Technical writing',
    descriptionFa: 'نگارش مستندات فنی یا ترجمه',
    descriptionEn: 'Write documentation or translate content',
  },

  // ─── Strategic ─────────────────────────────────────────────────────
  {
    code: 'D1', group: 'strategic', icon: 'Coins',
    labelFa: 'سرمایه‌گذاری',       labelEn: 'Investment',
    descriptionFa: 'سرمایه‌گذاری روی پروژه یا استارتاپ',
    descriptionEn: 'Invest in a project or startup',
  },
  {
    code: 'D2', group: 'strategic', icon: 'Compass',
    labelFa: 'هیئت مشاوران',      labelEn: 'Advisory board',
    descriptionFa: 'حضور در هیئت مشاوران یا راهبری',
    descriptionEn: 'Serve on an advisory board',
  },
  {
    code: 'D3', group: 'strategic', icon: 'Link2',
    labelFa: 'شراکت استراتژیک',   labelEn: 'Strategic partnership',
    descriptionFa: 'همکاری بلندمدت بین دو مجموعه',
    descriptionEn: 'Long-term partnership between organizations',
  },

  // ─── General ───────────────────────────────────────────────────────
  {
    code: 'E1', group: 'general', icon: 'Bug',
    labelFa: 'گزارش باگ',          labelEn: 'Bug report',
    descriptionFa: 'گزارش اشکال در یک پروژه یا سرویس',
    descriptionEn: 'Report a defect in a project or service',
  },
  {
    code: 'E2', group: 'general', icon: 'Lightbulb',
    labelFa: 'درخواست ویژگی',     labelEn: 'Feature request',
    descriptionFa: 'پیشنهاد یک ویژگی جدید',
    descriptionEn: 'Suggest a new feature',
  },
  {
    code: 'E3', group: 'general', icon: 'HelpCircle',
    labelFa: 'سوال عمومی',         labelEn: 'General question',
    descriptionFa: 'هر پرسش یا موضوع دیگر',
    descriptionEn: 'Any other question or topic',
  },

  // ─── Catch-all ─────────────────────────────────────────────────────
  {
    code: 'OTHER', group: 'general', icon: 'Sparkles',
    labelFa: 'موضوع دیگر',         labelEn: 'Something else',
    descriptionFa: 'هر چیزی که در لیست نیست — آزادانه بنویسید',
    descriptionEn: 'Anything not in the list — write freely',
  },
];

/** Fast lookup by code. */
export const INTENT_BY_CODE: Record<IntentCode, IntentDefinition> =
  Object.fromEntries(INTENTS.map((i) => [i.code, i])) as Record<IntentCode, IntentDefinition>;

/** Grouped intents for UI rendering. */
export function groupIntents(): Record<IntentGroup, IntentDefinition[]> {
  const result = {
    commercial: [], collaborative: [], knowledge: [],
    strategic: [], general: [],
  } as Record<IntentGroup, IntentDefinition[]>;
  for (const intent of INTENTS) {
    result[intent.group].push(intent);
  }
  return result;
}
