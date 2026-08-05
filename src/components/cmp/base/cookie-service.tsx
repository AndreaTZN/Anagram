"use client";

import * as React from "react";

import { useCookieConsent } from "./consent-provider";
import { isCategoryGranted, type CookieCategory } from "./types";

/**
 * Wrap any script, component or markup that should only load once the user has
 * consented to its category. The service also registers itself so its name is
 * listed under that category in the settings dialog.
 */
export function CookieService({
  id,
  name,
  category,
  children,
  consentMode = false,
  fallback = null,
}: {
  id: string;
  name: string;
  category: CookieCategory;
  children?: React.ReactNode;
  /**
   * Set for services driven by Google Consent Mode: the script always loads
   * and Google gates the data instead. Needs consent mode enabled on the
   * provider (it is by default).
   */
  consentMode?: boolean;
  /** Rendered instead of children when consent is missing. */
  fallback?: React.ReactNode;
}) {
  const { categories, registerService, unregisterService, isConsentModeActive } =
    useCookieConsent();

  React.useEffect(() => {
    registerService({ id, name, category });
    return () => unregisterService(id);
  }, [id, name, category, registerService, unregisterService]);

  React.useEffect(() => {
    if (consentMode && !isConsentModeActive) {
      // Delayed: the provider's bootstrap effect runs after this one, so on the
      // first pass consent mode is legitimately not active yet.
      const timeout = setTimeout(() => {
        console.warn(
          `react-cmp: "${name}" opted into Google Consent Mode, but the provider has consentMode={false}. The script will stay gated behind its category instead.`
        );
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [consentMode, isConsentModeActive, name]);

  // Reads the category directly rather than going through the context's
  // isServiceEnabled(id): registration only lands in an effect, so on the first
  // render this service isn't in the registry yet and a lookup would miss —
  // flashing the fallback for an already-consented service.
  const granted = isCategoryGranted(category, categories);

  // With consent mode, the script always loads and Google gates the data itself.
  const useConsentMode = consentMode && isConsentModeActive;
  if (!useConsentMode && !granted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
