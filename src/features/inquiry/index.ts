/**
 * @fileoverview Inquiry feature — public API surface.
 * @description
 *   Only re-export what the rest of the app is allowed to consume.
 *   Internal modules remain encapsulated.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 */

// Types
export type {
  Language, EntryMode, Depth, IntentCode, IntentGroup, IntentDefinition,
  DomainId, DomainDefinition, TimelineOption, BudgetTier, ContactInfo,
  InquiryDraft, StepId, MachineState, BuildOutput, Estimate,
} from './types';

// Registries
export { INTENTS, INTENT_GROUPS, GROUP_LABELS, INTENT_BY_CODE, groupIntents } from './lib/intents';
export { DOMAINS, DOMAIN_GROUPS, DOMAIN_GROUP_LABELS, DOMAIN_BY_ID, groupDomains } from './lib/domains';

// Schema
export { InquiryDraftSchema, ContactInfoSchema, ParsedIntentSchema, createEmptyDraft } from './lib/schema';

// Machine
export {
  resolveSteps, createInitialState, recomputeState, advance, retreat, jumpTo,
} from './lib/machine';

// Persistence
export { saveDraft, loadDraft, clearDraft, hasDraft } from './lib/persistence';

// Tracking
export { generateTrackingCode, isValidTrackingCode, TRACKING_CODE_REGEX } from './lib/tracker';

// Message Builder
export { buildOutput, CHANNELS, type BuildMessageInput } from './lib/messageBuilder';

// i18n
export { getTranslations, TRANSLATIONS } from './lib/i18n';

// ─── Components ───
export { InquiryShell } from './components/InquiryShell';
export type { InquiryShellProps } from './components/InquiryShell';

export * from './components/primitives';
export * from './components/entry';

// ─── Hooks ───
export { useInquiry } from './hooks/useInquiry';
export type { UseInquiryOptions, UseInquiryReturn } from './hooks/useInquiry';

// ─── Step Components ───
export * from './components/steps';
export { ProgressBar } from './components/ProgressBar';

// ─── Controller (mount this) ───
export { InquiryController } from './components/InquiryController';
export type { InquiryControllerProps } from './components/InquiryController';
