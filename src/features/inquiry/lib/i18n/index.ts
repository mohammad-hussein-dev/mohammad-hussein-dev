/**
 * @fileoverview i18n facade — strict FA/EN switching.
 * @author    Mohammad Hussein
 * @version   1.0.0
 */

import type { Language } from '../../types';
import { fa, type TranslationSchema } from './fa';
import { en } from './en';

/** Registry of all available translations. */
export const TRANSLATIONS: Record<Language, TranslationSchema> = { fa, en };

/**
 * Returns the translation tree for a given language.
 * @param lang - 'fa' or 'en'.
 */
export function getTranslations(lang: Language): TranslationSchema {
  return TRANSLATIONS[lang];
}

export type { TranslationSchema };
export { fa, en };
