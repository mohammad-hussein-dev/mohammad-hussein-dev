/**
 * @fileoverview GuidedEntry — browse intents by group.
 * @description
 *   The primary entry point: a grid of intent cards grouped by category,
 *   plus a persistent "Something else" card that always lets the user
 *   type freely.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useMemo } from 'react';
import * as Icons from 'lucide-react';
import type { IntentCode, Language } from '../../types';
import { INTENTS, INTENT_GROUPS, GROUP_LABELS } from '../../lib/intents';
import { getTranslations } from '../../lib/i18n';

export interface GuidedEntryProps {
  lang: Language;
  onSelect: (code: IntentCode) => void;
  onSomethingElse: () => void;
  className?: string;
}

/** Resolves a lucide icon by name, with a safe fallback. */
function resolveIcon(name: string): React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> {
  const lib = Icons as unknown as Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>>;
  return lib[name] ?? Icons.Circle;
}

export const GuidedEntry: React.FC<GuidedEntryProps> = ({
  lang,
  onSelect,
  onSomethingElse,
  className = '',
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';

  const grouped = useMemo(() => {
    const result: Record<string, typeof INTENTS> = {};
    for (const g of INTENT_GROUPS) result[g] = [];
    for (const intent of INTENTS) {
      if (intent.code === 'OTHER') continue;
      result[intent.group].push(intent);
    }
    return result;
  }, []);

  return (
    <div className={className}>
      {INTENT_GROUPS.map((group) => {
        const items = grouped[group] ?? [];
        if (items.length === 0) return null;
        return (
          <section key={group} className="mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
              {isFa ? GROUP_LABELS[group].fa : GROUP_LABELS[group].en}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((intent) => {
                const Icon = resolveIcon(intent.icon);
                return (
                  <button
                    key={intent.code}
                    type="button"
                    onClick={() => onSelect(intent.code)}
                    className={[
                      'p-3 rounded-lg border text-start transition-all cursor-pointer',
                      'border-[var(--border-subtle)] bg-[var(--bg-card)]',
                      'hover:border-[var(--accent-cyan)]/60 hover:bg-[var(--accent-cyan)]/5',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
                      'flex items-start gap-3',
                    ].join(' ')}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-[var(--text-primary)] leading-tight">
                        {isFa ? intent.labelFa : intent.labelEn}
                      </span>
                      <span className="block text-[10px] text-[var(--text-muted)] leading-snug mt-0.5">
                        {isFa ? intent.descriptionFa : intent.descriptionEn}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* ── Something Else (always present) ── */}
      <section className="mt-2 pt-6 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onSomethingElse}
          className={[
            'w-full p-4 rounded-xl border border-dashed text-start transition-all cursor-pointer',
            'border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/5',
            'hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
            'flex items-center gap-3',
          ].join(' ')}
        >
          <Icons.Sparkles className="w-5 h-5 text-[var(--accent-cyan)] shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-[var(--accent-cyan)]">
              {t.entry.somethingElse}
            </span>
            <span className="block text-[10px] text-[var(--text-muted)] leading-snug mt-0.5">
              {t.entry.somethingElseHint}
            </span>
          </span>
        </button>
      </section>
    </div>
  );
};

export default GuidedEntry;
