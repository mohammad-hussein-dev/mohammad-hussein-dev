/**
 * @fileoverview ChatFallback — direct human channel options.
 * @description
 *   Shown when the user is unsure, opts out of the form, or reaches
 *   the "Discuss" escape hatch. Presents immediate channels to reach
 *   the developer directly, bypassing the structured flow.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import { Send, Mail } from 'lucide-react';
import type { Language } from '../../types';
import { CHANNELS } from '../../lib/messageBuilder';

export interface ChatFallbackProps {
  lang: Language;
  className?: string;
}

const LABELS = {
  fa: {
    title: 'مستقیم صحبت کنیم',
    subtitle: 'مطمئن نیستید؟ هر کانالی که راحت‌ترید انتخاب کنید.',
    telegram: 'گفتگو در تلگرام',
    email: 'ارسال ایمیل',
  },
  en: {
    title: 'Let\'s talk directly',
    subtitle: 'Not sure? Pick whichever channel you prefer.',
    telegram: 'Chat on Telegram',
    email: 'Send an email',
  },
};

export const ChatFallback: React.FC<ChatFallbackProps> = ({ lang, className = '' }) => {
  const t = LABELS[lang];
  return (
    <div className={className}>
      <div className="text-center mb-5">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
          {t.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={`https://t.me/${CHANNELS.telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            'h-14 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all',
            'bg-gradient-to-br from-sky-500 to-sky-600 text-white',
            'hover:from-sky-600 hover:to-sky-700 shadow-sm hover:shadow-md',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
          ].join(' ')}
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          <span>{t.telegram}</span>
        </a>

        <a
          href={`mailto:${CHANNELS.email}`}
          className={[
            'h-14 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all',
            'bg-gradient-to-br from-amber-500 to-amber-600 text-white',
            'hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow-md',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
          ].join(' ')}
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          <span>{t.email}</span>
        </a>
      </div>
    </div>
  );
};

export default ChatFallback;
