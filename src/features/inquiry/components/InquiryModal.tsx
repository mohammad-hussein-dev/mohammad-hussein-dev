/**
 * @fileoverview InquiryModal — responsive full-screen dialog.
 * @description
 *   Renders the InquiryController inside a dialog. Mobile-first:
 *   - Full-screen on small (<640px), centered card on desktop
 *   - Safe-area insets for notched devices (iOS)
 *   - ESC / click-outside to close
 *   - Body scroll lock while open
 *   - Auto-focus of first interactive element
 *
 * @author    Mohammad Hussein
 * @version   1.1.0
 * @since     2026-09-15
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Language } from '../types';
import { getTranslations } from '../lib/i18n';
import { InquiryController } from './InquiryController';

export interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
  enableTerminal?: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  open, onClose, lang, enableTerminal = false,
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);

  // Auto-focus
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, textarea, select'
      );
      first?.focus();
    }, 100);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="inquiry-modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={[
            'fixed inset-0 z-[100]',
            // Mobile: full-screen flex column
            // Desktop: centered card
            'flex items-stretch sm:items-center justify-center',
            'sm:p-6',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label={t.entry.title}
          dir={isFa ? 'rtl' : 'ltr'}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={[
              // Full-screen on mobile, card on desktop
              'relative z-10 w-full',
              'sm:max-w-2xl sm:rounded-2xl',
              'flex flex-col',
              'border border-[var(--border-subtle)]',
              'bg-[var(--bg-primary)] sm:shadow-2xl',
              // Height: full on mobile, capped on desktop
              'h-[100dvh] sm:h-auto sm:max-h-[calc(100dvh-3rem)]',
              'overflow-hidden',
            ].join(' ')}
            style={{
              backgroundColor: 'var(--bg-primary)',
              // Safe-area insets for notched devices
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            {/* Sticky header */}
            <div
              className={[
                'flex-none flex items-center justify-between',
                'px-4 sm:px-6 py-3 sm:py-4',
                'border-b border-[var(--border-subtle)]',
                'bg-[var(--bg-primary)]/95 backdrop-blur-sm',
              ].join(' ')}
            >
              <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate">
                {isFa ? 'استعلام پروژه' : 'Project Inquiry'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={isFa ? 'بستن' : 'Close'}
                className={[
                  'shrink-0 w-10 h-10 -me-2 rounded-lg',
                  'flex items-center justify-center',
                  'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  'hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
                ].join(' ')}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-4 sm:px-6 py-5 sm:py-6">
                <InquiryController
                  lang={lang}
                  onClose={onClose}
                  enableTerminal={enableTerminal}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default InquiryModal;
