/**
 * @fileoverview ContactStep — contact information form.
 * @description
 *   Name (required) + Email (required) + optional phone/telegram/github
 *   /organization. Validation is delegated to the parent — this component
 *   only shows errors passed via props.
 *
 * @author    Mohammad Hussein
 * @version   1.0.0
 * @since     2026-09-15
 */

import React from 'react';
import type { ContactInfo, Language } from '../../types';
import { getTranslations } from '../../lib/i18n';
import { TerminalInput } from '../primitives';

export interface ContactStepProps {
  lang: Language;
  contact: ContactInfo;
  onPatch: (patch: Partial<ContactInfo>) => void;
  /** Validation errors keyed by field name. */
  errors?: Partial<Record<keyof ContactInfo, string>>;
}

export const ContactStep: React.FC<ContactStepProps> = ({
  lang, contact, onPatch, errors = {},
}) => {
  const t = getTranslations(lang);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <TerminalInput
        id="contact-name"
        label={t.contact.name}
        value={contact.name}
        onChange={(v) => onPatch({ name: v })}
        placeholder={lang === 'fa' ? 'دکتر احمدی' : 'Dr. Smith'}
        required
        error={errors.name}
        autoFocus
      />
      <TerminalInput
        id="contact-email"
        label={t.contact.email}
        value={contact.email}
        onChange={(v) => onPatch({ email: v })}
        placeholder="you@example.com"
        type="email"
        ltr
        required
        error={errors.email}
      />
      <TerminalInput
        id="contact-phone"
        label={t.contact.phone}
        value={contact.phone ?? ''}
        onChange={(v) => onPatch({ phone: v })}
        placeholder="0912..."
        type="tel"
        ltr
        error={errors.phone}
      />
      <TerminalInput
        id="contact-telegram"
        label={t.contact.telegram}
        value={contact.telegram ?? ''}
        onChange={(v) => onPatch({ telegram: v.replace(/^@/, '') })}
        placeholder="username"
        ltr
      />
      <TerminalInput
        id="contact-github"
        label={t.contact.github}
        value={contact.github ?? ''}
        onChange={(v) => onPatch({ github: v.replace(/^@/, '') })}
        placeholder="username"
        ltr
      />
      <TerminalInput
        id="contact-org"
        label={t.contact.organization}
        value={contact.organization ?? ''}
        onChange={(v) => onPatch({ organization: v })}
        placeholder={lang === 'fa' ? 'کلینیک نیکان' : 'Acme Inc.'}
      />
    </div>
  );
};

export default ContactStep;
