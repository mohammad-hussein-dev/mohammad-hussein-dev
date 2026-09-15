/**
 * @fileoverview Domain Registry — 20 canonical technical domains.
 * @description
 *   Domains represent the technical areas of an inquiry. They are
 *   orthogonal to intents (an A1 "build project" may span several domains).
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import type { DomainDefinition, DomainId } from '../types';

/** Domain groups, in display order. */
export const DOMAIN_GROUPS = [
  'backend', 'ai', 'scientific', 'devops', 'web', 'other',
] as const;

export type DomainGroup = (typeof DOMAIN_GROUPS)[number];

/** Localized group labels. */
export const DOMAIN_GROUP_LABELS: Record<DomainGroup, { fa: string; en: string }> = {
  backend:    { fa: 'بک‌اند و API',      en: 'Backend & APIs' },
  ai:         { fa: 'هوش مصنوعی',        en: 'AI & ML' },
  scientific: { fa: 'محاسبات علمی',      en: 'Scientific Computing' },
  devops:     { fa: 'دواپس و زیرساخت',   en: 'DevOps & Infra' },
  web:        { fa: 'وب و فول‌استک',     en: 'Web / Full-Stack' },
  other:      { fa: 'سایر',              en: 'Other' },
};

/** Canonical domain registry. */
export const DOMAINS: DomainDefinition[] = [
  // Backend
  { id: 'rest-api',   group: 'backend',    icon: 'Server',        labelFa: 'REST / GraphQL API',   labelEn: 'REST / GraphQL API' },
  { id: 'auth-rbac',  group: 'backend',    icon: 'ShieldCheck',   labelFa: 'احراز هویت و نقش‌ها',  labelEn: 'Auth & RBAC' },
  { id: 'realtime',   group: 'backend',    icon: 'Radio',         labelFa: 'بلادرنگ (WebSocket/MQ)', labelEn: 'Real-time (WS / MQ)' },
  { id: 'database',   group: 'backend',    icon: 'Database',      labelFa: 'طراحی / بهینه‌سازی دیتابیس', labelEn: 'DB design / Optimization' },

  // AI
  { id: 'llm-rag',    group: 'ai',         icon: 'Bot',           labelFa: 'LLM / RAG / ایجنت',    labelEn: 'LLM / RAG / Agents' },
  { id: 'ml-training',group: 'ai',         icon: 'BrainCircuit',  labelFa: 'آموزش مدل اختصاصی',    labelEn: 'Custom model training' },
  { id: 'cv-nlp',     group: 'ai',         icon: 'Eye',           labelFa: 'بینایی / پردازش زبان', labelEn: 'CV / NLP' },
  { id: 'pinn',       group: 'ai',         icon: 'Atom',          labelFa: 'شبکه‌های فیزیک‌محور (PINN)', labelEn: 'Physics-Informed NN (PINN)' },

  // Scientific
  { id: 'numerical-sim', group: 'scientific', icon: 'Sigma',      labelFa: 'شبیه‌سازی عددی (PDE/ODE)', labelEn: 'Numerical simulation (PDE/ODE)' },
  { id: 'optimization',  group: 'scientific', icon: 'Target',     labelFa: 'موتور بهینه‌سازی',     labelEn: 'Optimization engine' },
  { id: 'sci-data',      group: 'scientific', icon: 'LineChart',  labelFa: 'تحلیل داده علمی',      labelEn: 'Scientific data analysis' },

  // DevOps
  { id: 'docker',     group: 'devops',     icon: 'Container',     labelFa: 'داکر / کوبرنتیز',      labelEn: 'Docker / Kubernetes' },
  { id: 'cicd',       group: 'devops',     icon: 'GitBranch',     labelFa: 'CI/CD Pipeline',       labelEn: 'CI/CD pipeline' },
  { id: 'linux-cloud',group: 'devops',     icon: 'Cloud',         labelFa: 'لینوکس / کلاد',        labelEn: 'Linux / Cloud deploy' },

  // Web
  { id: 'frontend',   group: 'web',        icon: 'Layout',        labelFa: 'فرانت‌اند (React/Next)', labelEn: 'Frontend (React / Next)' },
  { id: 'fullstack',  group: 'web',        icon: 'Layers',        labelFa: 'فول‌استک',              labelEn: 'Full-Stack platform' },
  { id: 'admin-dash', group: 'web',        icon: 'Gauge',         labelFa: 'داشبورد مدیریت',       labelEn: 'Admin dashboard' },

  // Other
  { id: 'tech-writing', group: 'other',    icon: 'PenLine',       labelFa: 'مستندسازی فنی',         labelEn: 'Technical writing' },
  { id: 'localization', group: 'other',    icon: 'Languages',     labelFa: 'بومی‌سازی / RTL',      labelEn: 'Localization / RTL' },
  { id: 'code-audit',   group: 'other',    icon: 'ScanSearch',    labelFa: 'بررسی کد / ریفکتور',    labelEn: 'Code audit / Refactor' },
];

/** Fast lookup by id. */
export const DOMAIN_BY_ID: Record<DomainId, DomainDefinition> =
  Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<DomainId, DomainDefinition>;

/** Grouped domains for UI rendering. */
export function groupDomains(): Record<DomainGroup, DomainDefinition[]> {
  const result: Record<DomainGroup, DomainDefinition[]> = {
    backend: [], ai: [], scientific: [], devops: [], web: [], other: [],
  };
  for (const d of DOMAINS) result[d.group].push(d);
  return result;
}
