/**
 * @fileoverview DomainStep — multi-select technical domains.
 * @description
 *   Grouped multi-select of all 20 domains. Uses MultiSelectGrid
 *   primitive with icons resolved from the registry.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useMemo } from 'react';
import { resolveIcon, Circle } from '../iconRegistry';
import type { DomainId, Language } from '../../types';
import { DOMAINS, DOMAIN_GROUP_LABELS, DOMAIN_GROUPS } from '../../lib/domains';
import { MultiSelectGrid, type GridOption } from '../primitives';

export interface DomainStepProps {
  lang: Language;
  values: DomainId[];
  onChange: (next: DomainId[]) => void;
}

export const DomainStep: React.FC<DomainStepProps> = ({ lang, values, onChange }) => {
  const isFa = lang === 'fa';

  const groupedOptions = useMemo(() => {
    const result: Record<string, GridOption<DomainId>[]> = {};
    for (const g of DOMAIN_GROUPS) result[g] = [];
    for (const d of DOMAINS) {
      result[d.group].push({
        value: d.id,
        label: isFa ? d.labelFa : d.labelEn,
        icon: resolveIcon(d.icon),
      });
    }
    return result;
  }, [isFa]);

  return (
    <div className="space-y-6">
      {DOMAIN_GROUPS.map((group) => {
        const options = groupedOptions[group] ?? [];
        if (options.length === 0) return null;
        return (
          <section key={group}>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              {isFa ? DOMAIN_GROUP_LABELS[group].fa : DOMAIN_GROUP_LABELS[group].en}
            </h4>
            <MultiSelectGrid<DomainId>
              options={options}
              values={values}
              onChange={onChange}
              ariaLabel={isFa ? DOMAIN_GROUP_LABELS[group].fa : DOMAIN_GROUP_LABELS[group].en}
            />
          </section>
        );
      })}
    </div>
  );
};

export default DomainStep;
