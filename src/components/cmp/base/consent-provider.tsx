"use client";

import * as React from "react";

import { clearTrackingCookies } from "./clear-tracking-cookies";
import { useGoogleConsentMode } from "./consent-mode";
import {
  mergeMessages,
  type CmpMessages,
  type CmpMessagesOverrides,
} from "./messages";
import {
  FULL_CONSENT,
  isCategoryGranted,
  NO_CONSENT,
  OPTIONAL_CATEGORIES,
  STORED_CONSENT_SCHEMA_VERSION,
  type CategoryConsent,
  type CookieServiceDetails,
  type OptionalCategory,
} from "./types";
import { useStoredConsent } from "./use-stored-consent";

export type CookieConsentContextValue = {
  /** Category-level consent (essential is always granted and not listed here). */
  categories: CategoryConsent;
  /** Whether the user has made a choice yet. */
  hasConsented: boolean;

  /** Persist a full set of preferences and close the banner. */
  save: (categories: CategoryConsent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  /** Set one category, leaving the others alone. */
  setCategoryConsent: (category: OptionalCategory, granted: boolean) => void;

  /**
   * Services registered by <CookieService> components, listed under their
   * category in the settings dialog. Display only — consent is category-level,
   * so there is nothing to toggle per service.
   */
  services: CookieServiceDetails[];
  registerService: (service: CookieServiceDetails) => void;
  unregisterService: (id: string) => void;
  /**
   * Whether a service may run, i.e. whether its category is granted. An id
   * that isn't currently registered has no category to read, so it returns
   * `false` — see `services` for what's registered.
   */
  isServiceEnabled: (id: string) => boolean;

  isOpen: boolean;
  setOpen: (open: boolean) => void;

  /** Whether Google Consent Mode is running and has sent its defaults. */
  isConsentModeActive: boolean;

  messages: CmpMessages;
  privacyPolicyUrl: string;
};

const CookieConsentContext =
  React.createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a <CookieConsentProvider>"
    );
  }
  return context;
}

export function CookieConsentProvider({
  children,
  messages,
  privacyPolicyUrl = "/privacy",
  consentVersion,
  reloadOnRevoke = false,
  consentMode = true,
}: {
  children: React.ReactNode;
  messages?: CmpMessagesOverrides;
  privacyPolicyUrl?: string;
  /**
   * Bump this when your services or category meanings change; users who
   * consented under a different value are re-prompted.
   */
  consentVersion?: string;
  /**
   * Reload the page after a save that withdraws a previously granted category
   * or service, so already-loaded scripts actually stop.
   */
  reloadOnRevoke?: boolean;
  /**
   * Google Consent Mode v2, on by default. Set to `false` if you don't use
   * Google tags and would rather nothing touched `window.dataLayer`.
   */
  consentMode?: boolean;
}) {
  const [stored, persist] = useStoredConsent();
  const [services, setServices] = React.useState<CookieServiceDetails[]>([]);

  // A record from a different consent revision grants nothing — the user has
  // effectively not consented to what the site does now.
  const isStoredValid =
    stored !== null &&
    (consentVersion === undefined || stored.consentVersion === consentVersion);

  // null = automatic: open exactly while no valid choice exists.
  const [openOverride, setOpenOverride] = React.useState<boolean | null>(null);
  const isOpen = openOverride ?? !isStoredValid;
  const setOpen = React.useCallback((open: boolean) => {
    setOpenOverride(open);
  }, []);

  const resolvedMessages = React.useMemo(
    () => mergeMessages(messages),
    [messages]
  );

  const categories = isStoredValid ? stored.categories : NO_CONSENT;

  const isConsentModeActive = useGoogleConsentMode(
    categories,
    consentMode,
    isStoredValid
  );

  const save = React.useCallback<CookieConsentContextValue["save"]>(
    (nextCategories) => {
      // Categories being turned off. Only possible if the user had valid
      // consent to begin with.
      const withdrawn = isStoredValid
        ? OPTIONAL_CATEGORIES.filter((c) => categories[c] && !nextCategories[c])
        : [];

      persist({
        version: STORED_CONSENT_SCHEMA_VERSION,
        updatedAt: new Date().toISOString(),
        ...(consentVersion !== undefined && { consentVersion }),
        categories: nextCategories,
      });
      // Back to automatic: a choice now exists, so the banner is closed, and a
      // later cross-tab change still governs it.
      setOpenOverride(null);

      // Withdrawing consent has to remove what was already dropped: Consent
      // Mode only stops the next write. Must run before the reload below, or
      // the navigation cancels it.
      clearTrackingCookies(withdrawn);

      // Unmounting a <CookieService> doesn't undo a script that already ran.
      if (reloadOnRevoke && withdrawn.length > 0) {
        window.location.reload();
      }
    },
    [persist, consentVersion, reloadOnRevoke, isStoredValid, categories]
  );

  const setCategoryConsent = React.useCallback<
    CookieConsentContextValue["setCategoryConsent"]
  >(
    (category, granted) => {
      save({ ...categories, [category]: granted });
    },
    [save, categories]
  );

  const value: CookieConsentContextValue = {
    categories,
    hasConsented: isStoredValid,

    save,
    acceptAll: () => save(FULL_CONSENT),
    rejectAll: () => save(NO_CONSENT),
    setCategoryConsent,

    services,
    registerService: React.useCallback((service) => {
      setServices((prev) =>
        prev.some((s) => s.id === service.id) ? prev : [...prev, service]
      );
    }, []),
    unregisterService: React.useCallback((id) => {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }, []),
    isServiceEnabled: (id) => {
      const service = services.find((s) => s.id === id);
      if (!service) return false;
      return isCategoryGranted(service.category, categories);
    },

    isOpen,
    setOpen,

    isConsentModeActive,

    messages: resolvedMessages,
    privacyPolicyUrl,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
