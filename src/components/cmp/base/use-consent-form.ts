"use client";

import * as React from "react";

import { useCookieConsent } from "./consent-provider";
import { OPTIONAL_CATEGORIES, type OptionalCategory } from "./types";

export type ConsentFormService = {
  id: string;
  /** Label to show the user. */
  name: string;
};

export type ConsentFormCategory = {
  category: OptionalCategory;
  checked: boolean;
  /**
   * Services registered under this category, in registration order. Display
   * only: the category's own toggle governs all of them.
   */
  services: ConsentFormService[];
  toggle: (checked: boolean) => void;
};

export type ConsentForm = {
  categories: ConsentFormCategory[];
  /** Persist the draft and leave the dialog to close itself. */
  submit: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
};

/**
 * The settings dialog's state machine, with no opinion about how it looks.
 *
 * Holds the unsaved draft and the rules that act on it, so a UI built on this
 * is only markup and event wiring. Mount it inside something that unmounts when
 * the dialog closes and the draft resets itself; there is nothing to reset by
 * hand and nothing is pre-ticked.
 */
export function useConsentForm(): ConsentForm {
  const { categories, services, save, acceptAll, rejectAll } =
    useCookieConsent();

  const [draft, setDraft] = React.useState(categories);

  const rows = OPTIONAL_CATEGORIES.map<ConsentFormCategory>((category) => ({
    category,
    checked: draft[category],
    toggle: (checked) => setDraft((prev) => ({ ...prev, [category]: checked })),
    services: services
      .filter((s) => s.category === category)
      .map((service) => ({ id: service.id, name: service.name })),
  }));

  return {
    categories: rows,
    submit: () => save(draft),
    acceptAll,
    rejectAll,
  };
}
