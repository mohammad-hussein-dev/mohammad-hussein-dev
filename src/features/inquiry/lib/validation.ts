/**
 * @fileoverview Step-level validation helpers.
 * @description
 *   Pure functions that validate a single step's fields and return a
 *   map of field → localized error message. The parent screen calls
 *   these before advancing.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import type { BudgetTier, ContactInfo, DomainId, Language, StepId, TimelineOption } from '../types';
import { getTranslations } from './i18n';

export type FieldErrors = Record<string, string>;

export interface ValidationInput {
  step: StepId;
  lang: Language;
  domains: DomainId[];
  timeline: TimelineOption | undefined;
  budget: BudgetTier | undefined;
  contact: ContactInfo;
}

/**
 * Returns field errors for the given step (empty object = valid).
 */
export function validateStep(input: ValidationInput): FieldErrors {
  const t = getTranslations(input.lang);
  const errors: FieldErrors = {};

  switch (input.step) {
    case 'contact': {
      const name = input.contact.name.trim();
      if (name.length < 2) errors.name = t.validation.name_too_short;

      const email = (input.contact.email ?? '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = t.validation.invalid_email;
      }

      const phone = (input.contact.phone ?? '').trim();
      if (phone && !/^(\+98|0)?9\d{9}$/.test(phone.replace(/[\s-]/g, ''))) {
        errors.phone = t.validation.invalid_phone;
      }
      break;
    }
    case 'domain': {
      // Domains are optional — no validation
      break;
    }
    case 'timeline': {
      // Timeline + budget are optional — no validation
      break;
    }
    default:
      break;
  }

  return errors;
}

/** True when the error map is empty. */
export function isValid(errors: FieldErrors): boolean {
  return Object.keys(errors).length === 0;
}
