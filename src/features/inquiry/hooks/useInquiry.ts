/**
 * @fileoverview useInquiry — central state hook for the inquiry flow.
 * @description
 *   Owns the draft, the machine state, and all mutation actions.
 *   Persists automatically (debounced) to localStorage.
 *
 * Design:
 *   - Single source of truth: one draft, one machine.
 *   - All mutations go through typed action functions.
 *   - Auto-recompute machine steps when intent/depth changes.
 *   - Auto-save on every state change (best-effort).
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  BudgetTier, ContactInfo, Depth, DomainId, EntryMode,
  IntentCode, Language, MachineState, StepId, TimelineOption,
} from '../types';
import { createEmptyDraft, type InquiryDraftInput } from '../lib/schema';
import {
  advance as machineAdvance,
  createInitialState,
  jumpTo as machineJumpTo,
  recomputeState,
  retreat as machineRetreat,
} from '../lib/machine';
import { loadDraft, saveDraft, clearDraft } from '../lib/persistence';

const SAVE_DEBOUNCE_MS = 400;

export interface UseInquiryOptions {
  lang: Language;
  /** Try to restore a previous draft on mount. */
  restoreOnMount?: boolean;
}

export interface UseInquiryReturn {
  /** Current draft. */
  draft: InquiryDraftInput;
  /** Current machine state (index, steps, completed). */
  machine: MachineState;
  /** Current step ID, or undefined if at end. */
  currentStep: StepId | undefined;
  /** True if a restored draft was found and loaded. */
  restored: boolean;
  /** Progress 0..1. */
  progress: number;

  // ─── Mutations ───
  setEntryMode: (mode: EntryMode) => void;
  setIntent: (code: IntentCode) => void;
  setDepth: (depth: Depth) => void;
  toggleDomain: (id: DomainId) => void;
  setEngagement: (value: string) => void;
  setTimeline: (value: TimelineOption) => void;
  setBudget: (value: BudgetTier) => void;
  setScopeField: (key: string, value: string) => void;
  setContact: (patch: Partial<ContactInfo>) => void;
  setDescription: (text: string) => void;

  // ─── Navigation ───
  next: () => void;
  back: () => void;
  jumpTo: (stepId: StepId) => void;
  reset: () => void;
}

export function useInquiry({ lang, restoreOnMount = true }: UseInquiryOptions): UseInquiryReturn {
  // ─── Initial draft (from storage or empty) ───
  const [draft, setDraft] = useState<InquiryDraftInput>(() => {
    if (restoreOnMount) {
      const saved = loadDraft();
      if (saved) return saved;
    }
    return createEmptyDraft('guided');
  });

  const [restored, setRestored] = useState<boolean>(() => restoreOnMount && loadDraft() !== null);

  // ─── Machine state ───
  const [machine, setMachine] = useState<MachineState>(() => {
    const initial = createInitialState(false);
    return recomputeState(initial, draft.intentCode, draft.depth);
  });

  // ─── Recompute steps when intent/depth changes ───
  useEffect(() => {
    setMachine((prev) => recomputeState(prev, draft.intentCode, draft.depth));
  }, [draft.intentCode, draft.depth]);

  // ─── Debounced auto-save ───
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      const stamped: InquiryDraftInput = { ...draft, updatedAt: new Date().toISOString() };
      saveDraft(stamped);
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [draft]);

  // ─── Mutations ───
  const update = useCallback((patch: Partial<InquiryDraftInput>) => {
    setDraft((prev) => ({ ...prev, ...patch, updatedAt: new Date().toISOString() }));
  }, []);

  const setEntryMode = useCallback((mode: EntryMode) => update({ entryMode: mode }), [update]);
  const setIntent = useCallback((code: IntentCode) => update({ intentCode: code }), [update]);
  const setDepth = useCallback((d: Depth) => update({ depth: d }), [update]);

  const toggleDomain = useCallback((id: DomainId) => {
    setDraft((prev) => {
      const has = prev.domains.includes(id);
      const next = has ? prev.domains.filter((d) => d !== id) : [...prev.domains, id];
      return { ...prev, domains: next, updatedAt: new Date().toISOString() };
    });
  }, []);

  const setEngagement = useCallback((value: string) => update({ engagement: value }), [update]);
  const setTimeline = useCallback((value: TimelineOption) => update({ timeline: value }), [update]);
  const setBudget = useCallback((value: BudgetTier) => update({ budget: value }), [update]);

  const setScopeField = useCallback((key: string, value: string) => {
    setDraft((prev) => ({
      ...prev,
      scope: { ...prev.scope, [key]: value },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setContact = useCallback((patch: Partial<ContactInfo>) => {
    setDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setDescription = useCallback((text: string) => update({ description: text }), [update]);

  // ─── Navigation ───
  const next = useCallback(() => setMachine((m) => machineAdvance(m)), []);
  const back = useCallback(() => setMachine((m) => machineRetreat(m)), []);
  const jumpTo = useCallback((s: StepId) => setMachine((m) => machineJumpTo(m, s)), []);

  const reset = useCallback(() => {
    clearDraft();
    setDraft(createEmptyDraft('guided'));
    setMachine(recomputeState(createInitialState(false), null, 'detailed'));
    setRestored(false);
  }, []);

  // ─── Derived ───
  const currentStep = machine.steps[machine.index];
  const progress = useMemo(() => {
    if (machine.steps.length <= 1) return 0;
    return machine.index / (machine.steps.length - 1);
  }, [machine.index, machine.steps.length]);

  return {
    draft, machine, currentStep, restored, progress,
    setEntryMode, setIntent, setDepth, toggleDomain,
    setEngagement, setTimeline, setBudget, setScopeField,
    setContact, setDescription,
    next, back, jumpTo, reset,
  };
}
