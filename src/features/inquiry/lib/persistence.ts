/**
 * @fileoverview Local persistence for inquiry drafts.
 * @description
 *   Saves and loads inquiry drafts to/from localStorage with schema
 *   validation and automatic expiration (7 days).
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import { InquiryDraftSchema, type InquiryDraftInput } from './schema';

const STORAGE_KEY = 'mh_inquiry_draft_v1';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface StoredEnvelope {
  savedAt: number;
  draft: unknown;
}

/**
 * Saves a draft. Silently fails if localStorage is unavailable (SSR, private mode).
 * @returns true on success.
 */
export function saveDraft(draft: InquiryDraftInput): boolean {
  try {
    const envelope: StoredEnvelope = { savedAt: Date.now(), draft };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads a draft if present and still valid.
 * @returns The draft or null.
 */
export function loadDraft(): InquiryDraftInput | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const envelope = JSON.parse(raw) as StoredEnvelope;
    if (Date.now() - envelope.savedAt > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const parsed = InquiryDraftSchema.safeParse(envelope.draft);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Clears the saved draft. */
export function clearDraft(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}

/** Returns true if a valid draft exists. */
export function hasDraft(): boolean {
  return loadDraft() !== null;
}
