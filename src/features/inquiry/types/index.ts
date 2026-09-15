/**
 * @fileoverview Universal Inquiry System — Type Definitions.
 * @description
 *   Canonical types shared across the inquiry feature. These types describe
 *   every legal shape the inquiry state can take, and are consumed by the
 *   schema validators, state machine, and UI components.
 *
 * Naming conventions:
 *   - Type names use PascalCase.
 *   - Enum-like unions use lowercase with hyphens or camelCase.
 *   - Interfaces use the I* prefix only when they represent component props.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

// ─── Language & Mode ────────────────────────────────────────────────────

/** Supported locales. The system is strictly FA-only or EN-only per session. */
export type Language = 'fa' | 'en';

/** How the user entered the inquiry flow. */
export type EntryMode =
  | 'guided'    // Picked from the intent grid
  | 'freeform'  // Wrote a free-form description that was parsed
  | 'chat'      // Chose to talk directly (Telegram/Email)
  | 'terminal'; // Launched from the MH-COCKPIT terminal

/** Depth toggle — quick runs skip optional steps. */
export type Depth = 'quick' | 'detailed';

// ─── Intent Taxonomy ────────────────────────────────────────────────────

/** Top-level groups used to organize intents in the UI. */
export type IntentGroup =
  | 'commercial'
  | 'collaborative'
  | 'knowledge'
  | 'strategic'
  | 'general';

/**
 * Intent codes — stable, human-readable identifiers.
 * Follow the taxonomy: A=Commercial, B=Collaborative, C=Knowledge,
 * D=Strategic, E=General, OTHER=anything not listed.
 */
export type IntentCode =
  | 'A1' | 'A2' | 'A3' | 'A4' | 'A5'
  | 'B1' | 'B2' | 'B3' | 'B4' | 'B5'
  | 'C1' | 'C2' | 'C3' | 'C4' | 'C5'
  | 'D1' | 'D2' | 'D3'
  | 'E1' | 'E2' | 'E3'
  | 'OTHER';

/** A single intent definition (used by the entry grid). */
export interface IntentDefinition {
  /** Stable code. */
  code: IntentCode;
  /** Group membership. */
  group: IntentGroup;
  /** Icon name from lucide-react. */
  icon: string;
  /** Persian label (never mixed with English). */
  labelFa: string;
  /** English label (never mixed with Persian). */
  labelEn: string;
  /** Short Persian description. */
  descriptionFa: string;
  /** Short English description. */
  descriptionEn: string;
}

// ─── Domain Taxonomy ────────────────────────────────────────────────────

/** Project domain codes (technical areas). */
export type DomainId =
  | 'rest-api' | 'auth-rbac' | 'realtime' | 'database'
  | 'llm-rag' | 'ml-training' | 'cv-nlp' | 'pinn'
  | 'numerical-sim' | 'optimization' | 'sci-data'
  | 'docker' | 'cicd' | 'linux-cloud'
  | 'frontend' | 'fullstack' | 'admin-dash'
  | 'tech-writing' | 'localization' | 'code-audit';

/** A single domain definition. */
export interface DomainDefinition {
  id: DomainId;
  /** Technical group for grouping in UI. */
  group: 'backend' | 'ai' | 'scientific' | 'devops' | 'web' | 'other';
  icon: string;
  labelFa: string;
  labelEn: string;
}

// ─── Engagement Options ─────────────────────────────────────────────────

export type TimelineOption = 'urgent' | 'standard' | 'relaxed' | 'longterm';

export type BudgetTier =
  | 'starter'    // < $500
  | 'standard'   // $500 - $2K
  | 'professional' // $2K - $10K
  | 'enterprise'   // $10K+
  | 'open';        // Let's discuss

// ─── Contact ────────────────────────────────────────────────────────────

export interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  telegram?: string;
  github?: string;
  organization?: string;
}

// ─── Draft & Persistence ────────────────────────────────────────────────

/** A resumable inquiry draft. Persisted to localStorage. */
export interface InquiryDraft {
  /** Schema version for forward-compatibility. */
  version: '1.0';
  /** Which entry mode the user chose. */
  entryMode: EntryMode;
  /** Selected intent, or null if still choosing. */
  intentCode: IntentCode | null;
  /** Selected technical domains. */
  domains: DomainId[];
  /** Depth toggle value. */
  depth: Depth;
  /** Adaptive scope — free-form key/value per intent. */
  scope: Record<string, string | string[]>;
  /** Engagement model if applicable. */
  engagement?: string;
  /** Timeline if applicable. */
  timeline?: TimelineOption;
  /** Budget if applicable. */
  budget?: BudgetTier;
  /** Contact information. */
  contact: ContactInfo;
  /** Free-form description. */
  description: string;
  /** Current step index (0-based). */
  currentStep: number;
  /** ISO timestamp when the draft was started. */
  startedAt: string;
  /** ISO timestamp of the last update. */
  updatedAt: string;
}

// ─── Step Registry ──────────────────────────────────────────────────────

export type StepId =
  | 'intent'
  | 'domain'
  | 'scope'
  | 'engagement'
  | 'timeline'
  | 'contact'
  | 'review'
  | 'success';

// ─── Machine State ──────────────────────────────────────────────────────

export interface MachineState {
  /** Current step index in the resolved step sequence. */
  index: number;
  /** Ordered list of steps for the current intent+depth. */
  steps: StepId[];
  /** Whether the user is in a terminal-style flow. */
  terminalMode: boolean;
  /** Whether the machine is complete and success screen is shown. */
  completed: boolean;
}

// ─── Output ─────────────────────────────────────────────────────────────

export interface BuildOutput {
  /** Tracking code, e.g., MHX-20260915-A3X9. */
  trackingCode: string;
  /** Full plain-text message (~600-800 chars). */
  message: string;
  /** Compact single-paragraph message (~200-300 chars). */
  compactMessage: string;
  /** Deep-link to Telegram with the full message pre-filled. */
  telegramUrl: string;
  /** mailto: URL with subject and full message. */
  emailUrl: string;
}

// ─── Estimator ──────────────────────────────────────────────────────────

export interface Estimate {
  /** Estimated weeks (min, max). */
  weeks: { min: number; max: number };
  /** Estimated cost band in USD. */
  cost: { min: number; max: number };
  /** Confidence 0..100. */
  confidence: number;
  /** Risk flags, if any. */
  risks: string[];
}
