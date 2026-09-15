/**
 * @fileoverview InquiryController — the full inquiry experience.
 * @description
 *   Wires the entry shell, the state hook, the step dispatcher,
 *   validation, and the success screen into a single component.
 *
 *   Flow:
 *     entry (ModeSelector/Guided/Freeform/Chat)
 *       ↓ on intent selected
 *     steps (rendered via switch on currentStep)
 *       ↓ on submit
 *     success screen
 *
 *   This is the ONLY component that should be exported for the app to
 *   mount. All other exports are internals used for testing.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import type { BuildOutput, Language } from '../types';
import { getTranslations } from '../lib/i18n';
import { buildOutput } from '../lib/messageBuilder';
import { useInquiry } from '../hooks/useInquiry';
import { validateStep, type FieldErrors } from '../lib/validation';
import { InquiryShell } from './InquiryShell';
import { ProgressBar } from './ProgressBar';
import {
  IntentConfirmStep,
  DomainStep,
  ScopeStep,
  EngagementStep,
  TimelineStep,
  ContactStep,
  ReviewStep,
  SuccessStep,
} from './steps';
import { EscapeHatch } from './primitives';
import { ChatFallback } from './entry';

export interface InquiryControllerProps {
  lang: Language;
  onClose?: () => void;
  enableTerminal?: boolean;
}

type Phase = 'entry' | 'steps' | 'success';

export const InquiryController: React.FC<InquiryControllerProps> = ({
  lang,
  onClose,
  enableTerminal = false,
}) => {
  const t = getTranslations(lang);
  const isFa = lang === 'fa';
  const inquiry = useInquiry({ lang });

  const [phase, setPhase] = useState<Phase>(
    inquiry.draft.intentCode ? 'steps' : 'entry'
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [output, setOutput] = useState<BuildOutput | null>(null);
  const [showChatFallback, setShowChatFallback] = useState(false);

  // ─── Entry completion ───
  const handleIntentSelected = (code: import('../types').IntentCode): void => {
    inquiry.setIntent(code);
    setPhase('steps');
  };

  // ─── Progress ───
  const progress = inquiry.progress;

  // ─── Next-step validation + advance ───
  const handleNext = (): void => {
    const step = inquiry.currentStep;
    if (!step) return;

    const stepErrors = validateStep({
      step,
      lang,
      domains: inquiry.draft.domains,
      timeline: inquiry.draft.timeline,
      budget: inquiry.draft.budget,
      contact: inquiry.draft.contact,
    });

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (step === 'review') {
      const built = buildOutput({
        intentCode: inquiry.draft.intentCode,
        domains: inquiry.draft.domains,
        timeline: inquiry.draft.timeline,
        budget: inquiry.draft.budget,
        contact: inquiry.draft.contact,
        description: inquiry.draft.description,
      }, lang);
      setOutput(built);
      setPhase('success');
      return;
    }

    inquiry.next();
  };

  const handleBack = (): void => {
    setErrors({});
    inquiry.back();
  };

  const handleReset = (): void => {
    inquiry.reset();
    setOutput(null);
    setErrors({});
    setShowChatFallback(false);
    setPhase('entry');
  };

  const handleChangeIntent = (): void => {
    setPhase('entry');
  };

  // ─── Render entry phase ───
  if (phase === 'entry') {
    if (showChatFallback) {
      return (
        <div className="space-y-4">
          <ChatFallback lang={lang} />
          <button
            type="button"
            onClick={() => setShowChatFallback(false)}
            className="w-full h-10 rounded-lg text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors cursor-pointer"
          >
            {isFa ? 'بازگشت به فرم' : 'Back to form'}
          </button>
        </div>
      );
    }

    return (
      <InquiryShell
        lang={lang}
        onIntentSelected={handleIntentSelected}
        onClose={onClose}
        enableTerminal={enableTerminal}
      />
    );
  }

  // ─── Render success phase ───
  if (phase === 'success' && output) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SuccessStep
          lang={lang}
          output={output}
          intentCode={inquiry.draft.intentCode}
          domains={inquiry.draft.domains}
          contactName={inquiry.draft.contact.name}
          contactOrg={inquiry.draft.contact.organization}
          onReset={handleReset}
        />
      </motion.div>
    );
  }

  // ─── Render steps phase ───
  const step = inquiry.currentStep;
  if (!step) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* ── Progress ── */}
      <ProgressBar
        steps={inquiry.machine.steps}
        currentIndex={inquiry.machine.index}
        lang={lang}
        onJump={(s) => {
          inquiry.jumpTo(s);
          setErrors({});
        }}
      />

      {/* ── Step body ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: isFa ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isFa ? -12 : 12 }}
          transition={{ duration: 0.2 }}
          className="min-h-[180px]"
        >
          {step === 'intent' && inquiry.draft.intentCode ? (
            <IntentConfirmStep
              lang={lang}
              intentCode={inquiry.draft.intentCode}
              depth={inquiry.draft.depth}
              onDepthChange={inquiry.setDepth}
              onChangeIntent={handleChangeIntent}
            />
          ) : null}

          {step === 'domain' ? (
            <DomainStep
              lang={lang}
              values={inquiry.draft.domains}
              onChange={(next) => {
                // Replace entire array — the hook's toggle is per-id, so use
                // setter directly via closure over the draft.
                // (Kept simple: rebuild via toggle calls if array differs.)
                const current = new Set(inquiry.draft.domains);
                const target = new Set(next);
                for (const id of target) if (!current.has(id)) inquiry.toggleDomain(id);
                for (const id of current) if (!target.has(id)) inquiry.toggleDomain(id);
              }}
            />
          ) : null}

          {step === 'scope' ? (
            <ScopeStep
              lang={lang}
              intentCode={inquiry.draft.intentCode}
              description={inquiry.draft.description}
              onChange={inquiry.setDescription}
            />
          ) : null}

          {step === 'engagement' ? (
            <EngagementStep
              lang={lang}
              value={inquiry.draft.engagement}
              onChange={inquiry.setEngagement}
            />
          ) : null}

          {step === 'timeline' ? (
            <TimelineStep
              lang={lang}
              timeline={inquiry.draft.timeline}
              budget={inquiry.draft.budget}
              onTimelineChange={inquiry.setTimeline}
              onBudgetChange={inquiry.setBudget}
            />
          ) : null}

          {step === 'contact' ? (
            <ContactStep
              lang={lang}
              contact={inquiry.draft.contact}
              onPatch={inquiry.setContact}
              errors={errors}
            />
          ) : null}

          {step === 'review' && output === null ? (
            <ReviewStep
              lang={lang}
              output={buildOutput({
                intentCode: inquiry.draft.intentCode,
                domains: inquiry.draft.domains,
                timeline: inquiry.draft.timeline,
                budget: inquiry.draft.budget,
                contact: inquiry.draft.contact,
                description: inquiry.draft.description,
              }, lang)}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* ── Escape hatch ── */}
      <EscapeHatch
        discussLabel={t.nav.discuss}
        skipLabel={t.nav.skip}
        customLabel={t.nav.custom}
        onDiscuss={() => setShowChatFallback(true)}
        hint={isFa ? 'هیچ گزینه‌ای مناسب نیست؟' : 'Nothing fits?'}
      />

      {/* ── Chat fallback (inline) ── */}
      {showChatFallback ? (
        <div className="mt-2">
          <ChatFallback lang={lang} />
        </div>
      ) : null}

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={handleBack}
          disabled={inquiry.machine.index === 0}
          aria-label={t.nav.back}
          className={[
            'h-11 min-w-[44px] px-3 sm:px-5 rounded-lg border text-xs font-semibold',
            'transition-colors cursor-pointer',
            'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)]',
            'hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'flex items-center gap-2',
          ].join(' ')}
        >
          {isFa ? <ArrowRight className="w-4 h-4" aria-hidden="true" /> : <ArrowLeft className="w-4 h-4" aria-hidden="true" />}
          <span className="hidden sm:inline">{t.nav.back}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={[
            'h-11 flex-1 sm:flex-initial sm:px-6 px-4 rounded-lg text-xs font-bold',
            'transition-all cursor-pointer',
            'bg-[var(--accent-cyan)] text-[var(--bg-primary)]',
            'hover:bg-[var(--accent-cyan)]/90',
            'flex items-center justify-center gap-2',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]',
          ].join(' ')}
        >
          <span>{step === 'review' ? t.nav.submit : t.nav.next}</span>
          {step === 'review' ? (
            <Send className="w-4 h-4" aria-hidden="true" />
          ) : isFa ? (
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InquiryController;
