/**
 * @fileoverview Inquiry event bridge.
 * @description
 *   A tiny pub/sub that decouples the inquiry modal from its openers
 *   (FAB, keyboard shortcuts, terminal command, palette item). Any
 *   caller dispatches `openInquiry()`; the App subscribes once and
 *   opens the modal.
 *
 *   This avoids prop-drilling the modal state through the terminal
 *   and palette layers, which live outside the React tree that owns
 *   the modal.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import type { EntryMode } from '../types';

export interface InquiryOpenDetail {
  /** Optional pre-selected entry mode. */
  mode?: EntryMode;
  /** Optional source tag for analytics. */
  source?: 'fab' | 'terminal' | 'palette' | 'keyboard' | 'url';
}

const EVENT_NAME = 'mh:open-inquiry';

/**
 * Dispatches an event that the app listens for to open the modal.
 * Safe to call from anywhere (terminal, palette, keyboard handler).
 */
export function openInquiry(detail: InquiryOpenDetail = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<InquiryOpenDetail>(EVENT_NAME, { detail }));
}

/**
 * Subscribes to inquiry-open events. Returns an unsubscribe function.
 */
export function onOpenInquiry(handler: (detail: InquiryOpenDetail) => void): () => void {
  if (typeof window === 'undefined') return () => { /* noop */ };
  const listener = (e: Event) => {
    const custom = e as CustomEvent<InquiryOpenDetail>;
    handler(custom.detail ?? {});
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
