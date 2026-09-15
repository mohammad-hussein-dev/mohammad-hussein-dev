/**
 * @fileoverview Tracking code generator.
 * @description
 *   Generates stable, human-readable tracking codes of the form
 *   MHX-YYYYMMDD-XXXX where XXXX is 4 uppercase alphanumeric characters.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

/** Alphanumeric alphabet, excluding easily-confused chars (0, O, I, 1, L). */
const SAFE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Formats a Date into YYYYMMDD in local time.
 * @param date - Source date.
 */
function formatDatePart(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

/**
 * Generates a cryptographically random suffix of length 4.
 * Uses crypto.getRandomValues when available, falls back to Math.random.
 */
function randomSuffix(length = 4): string {
  const out: string[] = [];
  const alphabet = SAFE_ALPHABET;
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const buf = new Uint8Array(length);
    crypto.getRandomValues(buf);
    for (let i = 0; i < length; i++) {
      out.push(alphabet[buf[i] % alphabet.length]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      out.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
  }
  return out.join('');
}

/**
 * Generates a new tracking code.
 * @param date - Optional date override (useful for tests).
 * @returns e.g., "MHX-20260915-A3X9"
 */
export function generateTrackingCode(date: Date = new Date()): string {
  return `MHX-${formatDatePart(date)}-${randomSuffix(4)}`;
}

/** Regex to validate a tracking code. */
export const TRACKING_CODE_REGEX = /^MHX-\d{8}-[2-9A-HJ-NP-Z]{4}$/;

/** Checks whether a string is a valid tracking code. */
export function isValidTrackingCode(code: string): boolean {
  return TRACKING_CODE_REGEX.test(code);
}
