/**
 * @fileoverview Inquiry state machine — step sequence resolution.
 * @description
 *   Given an intent + depth, produces the ordered list of steps the user
 *   will traverse. This is the single source of truth for step ordering.
 *
 * Design principles:
 *   - Deterministic: same (intent, depth) always yields the same sequence.
 *   - Fail-safe: unknown intents fall back to the generic sequence.
 *   - No side effects: pure function, trivially testable.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import type { Depth, IntentCode, MachineState, StepId } from '../types';

/**
 * Quick-mode sequence: only the essential steps.
 * Used when the user toggles "quick" or when the intent is exploratory.
 */
const QUICK_SEQUENCE: StepId[] = ['intent', 'contact', 'review', 'success'];

/**
 * Detailed sequence for A1 (Build a project).
 * Adds domain, adaptive scope, engagement, timeline.
 */
const A1_DETAILED: StepId[] = [
  'intent', 'domain', 'scope', 'engagement', 'timeline', 'contact', 'review', 'success',
];

/**
 * Detailed sequence for A2 (Full-time role) and A3 (Contract).
 */
const HIRE_DETAILED: StepId[] = [
  'intent', 'scope', 'timeline', 'contact', 'review', 'success',
];

/**
 * Detailed sequence for B2 (Research) and B3 (Co-authorship).
 */
const RESEARCH_DETAILED: StepId[] = [
  'intent', 'domain', 'scope', 'timeline', 'contact', 'review', 'success',
];

/**
 * Detailed sequence for D1 (Investment).
 */
const INVEST_DETAILED: StepId[] = [
  'intent', 'scope', 'engagement', 'timeline', 'contact', 'review', 'success',
];

/**
 * Generic detailed sequence — safe fallback for intents without a custom template.
 */
const GENERIC_DETAILED: StepId[] = [
  'intent', 'scope', 'timeline', 'contact', 'review', 'success',
];

/**
 * Resolves the ordered step sequence for a given intent and depth.
 *
 * @param intentCode - Selected intent, or null if still choosing.
 * @param depth - 'quick' or 'detailed'.
 * @returns Ordered array of step IDs.
 */
export function resolveSteps(intentCode: IntentCode | null, depth: Depth): StepId[] {
  if (depth === 'quick') return [...QUICK_SEQUENCE];

  switch (intentCode) {
    case 'A1':
      return [...A1_DETAILED];
    case 'A2':
    case 'A3':
    case 'A5':
      return [...HIRE_DETAILED];
    case 'B2':
    case 'B3':
      return [...RESEARCH_DETAILED];
    case 'D1':
      return [...INVEST_DETAILED];
    case 'A4':
    case 'B1':
    case 'B4':
    case 'B5':
    case 'C1':
    case 'C2':
    case 'C3':
    case 'C4':
    case 'C5':
    case 'D2':
    case 'D3':
    case 'E1':
    case 'E2':
    case 'E3':
    case 'OTHER':
    default:
      return [...GENERIC_DETAILED];
  }
}

/**
 * Creates the initial machine state.
 */
export function createInitialState(terminalMode = false): MachineState {
  return {
    index: 0,
    steps: [...QUICK_SEQUENCE],
    terminalMode,
    completed: false,
  };
}

/**
 * Recomputes the machine state when the intent or depth changes.
 * Preserves the current step if it still exists in the new sequence,
 * otherwise moves to the closest valid index.
 */
export function recomputeState(
  prev: MachineState,
  intentCode: IntentCode | null,
  depth: Depth,
): MachineState {
  const steps = resolveSteps(intentCode, depth);
  const prevStepId = prev.steps[prev.index];
  const newIndex = prevStepId ? Math.max(0, steps.indexOf(prevStepId)) : 0;
  return { ...prev, steps, index: newIndex };
}

/**
 * Advances the machine to the next step.
 * If already at the last step, marks it as completed.
 */
export function advance(state: MachineState): MachineState {
  if (state.index >= state.steps.length - 1) {
    return { ...state, completed: true };
  }
  return { ...state, index: state.index + 1 };
}

/**
 * Moves the machine back one step.
 */
export function retreat(state: MachineState): MachineState {
  if (state.index <= 0) return state;
  return { ...state, index: state.index - 1, completed: false };
}

/**
 * Jumps to a specific step by id (used by progress bar clicks).
 */
export function jumpTo(state: MachineState, stepId: StepId): MachineState {
  const idx = state.steps.indexOf(stepId);
  return idx === -1 ? state : { ...state, index: idx, completed: false };
}
