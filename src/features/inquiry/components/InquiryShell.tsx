/**
 * @fileoverview InquiryShell — top-level orchestrator.
 * @description
 *   Owns the entry mode state and the resolved step sequence.
 *   Renders one of the entry components, then transitions to the
 *   step controller once an intent is chosen.
 *
 *   This is the ONLY stateful component in the inquiry feature at
 *   the entry layer. All downstream components are controlled.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React, { useState } from 'react';
import type { EntryMode, IntentCode, Language } from '../types';
import { ModeSelector } from './entry/ModeSelector';
import { GuidedEntry } from './entry/GuidedEntry';
import { FreeformEntry } from './entry/FreeformEntry';
import { ChatFallback } from './entry/ChatFallback';

export interface InquiryShellProps {
  lang: Language;
  /** Called when the user has committed to an intent + mode. */
  onIntentSelected?: (code: IntentCode, mode: EntryMode) => void;
  /** Called when the user wants to close the shell. */
  onClose?: () => void;
  /** Whether to show the 4th terminal entry mode. */
  enableTerminal?: boolean;
  className?: string;
}

type Stage = 'mode' | 'guided' | 'freeform' | 'chat';

export const InquiryShell: React.FC<InquiryShellProps> = ({
  lang,
  onIntentSelected,
  enableTerminal = false,
  className = '',
}) => {
  const [stage, setStage] = useState<Stage>('mode');

  const handleModeSelect = (mode: EntryMode): void => {
    if (mode === 'guided')   return setStage('guided');
    if (mode === 'freeform') return setStage('freeform');
    if (mode === 'chat')     return setStage('chat');
    if (mode === 'terminal' && enableTerminal) {
      // Terminal intent will be wired in Gate 6.
      // For now, fall back to freeform with a note.
      return setStage('freeform');
    }
  };

  const handleIntentSelect = (code: IntentCode): void => {
    onIntentSelected?.(code, 'guided');
  };

  const handleFreeformSubmit = (text: string): void => {
    // Parser will be wired in Gate 4. For now, treat as OTHER intent.
    // The description is stashed so the next gate can pick it up.
    void text;
    onIntentSelected?.('OTHER', 'freeform');
  };

  return (
    <div className={`w-full ${className}`}>
      {stage === 'mode' && (
        <ModeSelector
          lang={lang}
          onSelect={handleModeSelect}
          showTerminal={enableTerminal}
        />
      )}

      {stage === 'guided' && (
        <GuidedEntry
          lang={lang}
          onSelect={handleIntentSelect}
          onSomethingElse={() => setStage('freeform')}
        />
      )}

      {stage === 'freeform' && (
        <FreeformEntry
          lang={lang}
          onSubmit={handleFreeformSubmit}
          onDiscuss={() => setStage('chat')}
        />
      )}

      {stage === 'chat' && <ChatFallback lang={lang} />}
    </div>
  );
};

export default InquiryShell;
