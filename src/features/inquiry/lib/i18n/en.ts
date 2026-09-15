/**
 * @fileoverview English strings — English only, no mixing.
 * @author    Mohammad Hussein
 * @version   1.0.1
 */

import type { TranslationSchema } from './fa';

/** English translations. English only — never mix languages. */
export const en: TranslationSchema = {
  entry: {
    title: 'How can I help you?',
    subtitle: 'Pick a path or write freely',
    modes: {
      guided:   'Browse list',
      freeform: 'Write freely',
      chat:     'Direct chat',
      terminal: 'Terminal',
    },
    somethingElse: 'Something else',
    somethingElseHint: 'Anything not in the list — write freely',
    chatHint: "Not sure? Let's chat first",
  },
  steps: {
    intent:     'Intent',
    domain:     'Project domains',
    scope:      'Technical scope',
    engagement: 'Engagement',
    timeline:   'Timeline & budget',
    contact:    'Contact info',
    review:     'Review',
    success:    'Done',
  },
  nav: {
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    submit: 'Submit inquiry',
    reset: 'Submit another',
    discuss: 'Discuss with me',
    custom: 'Custom answer',
  },
  depth: {
    label: 'Depth',
    quick: 'Quick',
    detailed: 'Detailed',
  },
  contact: {
    name:         'Full name',
    email:        'Email',
    phone:        'Phone (optional)',
    telegram:     'Telegram (optional)',
    github:       'GitHub (optional)',
    organization: 'Organization (optional)',
    description:  'Additional details (optional)',
  },
  validation: {
    name_too_short: 'Name must be at least 2 characters',
    invalid_email:  'Invalid email format',
    invalid_phone:  'Invalid phone number',
  },
  success: {
    title: 'Your inquiry is submitted',
    subtitle: 'To complete, dispatch the pre-filled message via one of the channels below.',
    trackingCode: 'Tracking code',
    sendTelegram: 'Send via Telegram',
    sendEmail:    'Send via Email',
    copyMessage:  'Copy full message',
    copyCompact:  'Copy compact message',
    copied:       'Copied',
    copyHint:     'For Instagram, WhatsApp, or any other channel',
  },
  estimate: {
    weeks: 'Estimated time',
    cost: 'Cost band',
    weeksUnit: 'weeks',
  },
};
