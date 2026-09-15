/**
 * @fileoverview Inquiry event bridge.
 * @description
 *   A tiny pub/sub that decouples the inquiry modal from its openers
 *   (FAB, keyboard shortcuts, terminal command, palette, contact hub).
 *   Any caller dispatches `openInquiry()`; the App subscribes once
 *   and opens the modal with the requested preset.
 *
 * @author    Mohammad Hussein
 * @version   1.1.0
 * @since     2026-09-15
 */

import type { EntryMode, IntentCode } from '../types';

export interface InquiryOpenDetail {
  /** Optional pre-selected entry mode. */
  mode?: EntryMode;
  /** Optional pre-selected intent — skips the intent step. */
  intentCode?: IntentCode;
  /** Source tag for analytics. */
  source?: 'fab' | 'terminal' | 'palette' | 'keyboard' | 'url' | 'contact-hub';
}

const EVENT_NAME = 'mh:open-inquiry';

/** Dispatches an event that the app listens for to open the modal. */
export function openInquiry(detail: InquiryOpenDetail = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<InquiryOpenDetail>(EVENT_NAME, { detail }));
}

/** Subscribes to inquiry-open events. Returns an unsubscribe function. */
export function onOpenInquiry(handler: (detail: InquiryOpenDetail) => void): () => void {
  if (typeof window === 'undefined') return () => { /* noop */ };
  const listener = (e: Event) => {
    const custom = e as CustomEvent<InquiryOpenDetail>;
    handler(custom.detail ?? {});
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
