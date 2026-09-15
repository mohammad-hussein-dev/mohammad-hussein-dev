/**
 * @fileoverview Runtime validation schemas (Zod).
 * @description
 *   Every external input (parser output, localStorage load, form submit)
 *   passes through these schemas before entering the app state.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import { z } from 'zod';

// ─── Primitives ─────────────────────────────────────────────────────────

const LanguageSchema = z.enum(['fa', 'en']);
const EntryModeSchema = z.enum(['guided', 'freeform', 'chat', 'terminal']);
const DepthSchema = z.enum(['quick', 'detailed']);

const IntentCodeSchema = z.enum([
  'A1','A2','A3','A4','A5',
  'B1','B2','B3','B4','B5',
  'C1','C2','C3','C4','C5',
  'D1','D2','D3',
  'E1','E2','E3',
  'OTHER',
]);

const DomainIdSchema = z.enum([
  'rest-api','auth-rbac','realtime','database',
  'llm-rag','ml-training','cv-nlp','pinn',
  'numerical-sim','optimization','sci-data',
  'docker','cicd','linux-cloud',
  'frontend','fullstack','admin-dash',
  'tech-writing','localization','code-audit',
]);

const TimelineOptionSchema = z.enum(['urgent','standard','relaxed','longterm']);
const BudgetTierSchema = z.enum(['starter','standard','professional','enterprise','open']);

// ─── Contact ────────────────────────────────────────────────────────────

/**
 * Email validation — intentionally permissive (RFC 5322 is too strict
 * for real-world use). Requires local@domain.tld with at least one dot.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation for Iranian numbers (accepts both FA/EN digits).
 * Loose format: optional +98 or 0, then 10 digits.
 */
const PHONE_REGEX = /^(\+98|0)?9\d{9}$/;

export const ContactInfoSchema = z.object({
  name: z.string().trim().min(2, 'name_too_short').max(120),
  email: z.string().trim().toLowerCase().regex(EMAIL_REGEX, 'invalid_email'),
  phone: z.string().trim().regex(PHONE_REGEX, 'invalid_phone').optional().or(z.literal('')),
  telegram: z.string().trim().max(64).optional(),
  github: z.string().trim().max(64).optional(),
  organization: z.string().trim().max(120).optional(),
});

// ─── Draft ──────────────────────────────────────────────────────────────

export const InquiryDraftSchema = z.object({
  version: z.literal('1.0'),
  entryMode: EntryModeSchema,
  intentCode: IntentCodeSchema.nullable(),
  domains: z.array(DomainIdSchema).max(20),
  depth: DepthSchema,
  scope: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  engagement: z.string().max(64).optional(),
  timeline: TimelineOptionSchema.optional(),
  budget: BudgetTierSchema.optional(),
  contact: ContactInfoSchema,
  description: z.string().trim().max(4000),
  currentStep: z.number().int().min(0).max(20),
  startedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ─── Parser Output ──────────────────────────────────────────────────────

export const ParsedIntentSchema = z.object({
  intent: IntentCodeSchema.nullable(),
  domains: z.array(DomainIdSchema),
  stack: z.array(z.string()).max(10),
  scale: z.string().nullable(),
  timeline: TimelineOptionSchema.nullable(),
  budget: BudgetTierSchema.nullable(),
  confidence: z.number().min(0).max(1),
  ambiguous: z.array(z.string()),
});

// ─── Exported Types (Zod-inferred) ──────────────────────────────────────

export type ContactInfoInput = z.infer<typeof ContactInfoSchema>;
export type InquiryDraftInput = z.infer<typeof InquiryDraftSchema>;
export type ParsedIntentResult = z.infer<typeof ParsedIntentSchema>;

// ─── Helper: Empty Draft Factory ────────────────────────────────────────

/**
 * Creates a fresh, valid draft with sensible defaults.
 * @param entryMode - How the user entered the flow.
 * @param nowIso - Optional ISO timestamp override (useful for tests).
 */
export function createEmptyDraft(entryMode: 'guided' | 'freeform' | 'chat' | 'terminal' = 'guided', nowIso?: string): InquiryDraftInput {
  const now = nowIso ?? new Date().toISOString();
  return {
    version: '1.0',
    entryMode,
    intentCode: null,
    domains: [],
    depth: 'detailed',
    scope: {},
    contact: { name: '', email: '' },
    description: '',
    currentStep: 0,
    startedAt: now,
    updatedAt: now,
  };
}
