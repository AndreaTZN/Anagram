"use client";

import * as React from "react";

import { OPTIONAL_CATEGORIES, type CategoryConsent } from "./types";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Pushed when consent is granted mid-page, for tags that GTM can only fire on
 * an event — Custom HTML tags, which are never injected while denied. Add it as
 * a second trigger alongside the page view, with "once per page" set so a tag
 * that already fired normally doesn't fire twice.
 */
export const CONSENT_GRANTED_EVENT = "consent_granted";

/**
 * Google Consent Mode v2. `<CookieConsentProvider>` calls this for you — there
 * is nothing to mount. Pass `consentMode={false}` to the provider if you don't
 * use Google tags and would rather it left `window.dataLayer` alone.
 *
 * Takes the categories as an argument rather than reading the context, so the
 * provider can call it without a circular import.
 *
 * @returns whether the `consent default` call has gone out. Services that opt
 * into consent mode must wait for this, or their tag could initialise before
 * the defaults are on the dataLayer.
 */
export function useGoogleConsentMode(
  categories: CategoryConsent,
  enabled: boolean,
  hasStoredConsent: boolean
): boolean {
  const [isActive, setActive] = React.useState(false);
  // A ref, not `isActive`, so flipping the state doesn't re-run the effect and
  // fire a pointless `update` straight after the `default`.
  const bootstrapped = React.useRef(false);

  React.useEffect(() => {
    if (!enabled) return;

    // Consent Mode v2's four signals, the only ones sent: services that ignore
    // Consent Mode are gated in GTM on these same signals, not on one of their
    // own. Google reads a missing signal as denied. Marketing drives the three
    // ad signals.
    const signals = {
      ad_storage: categories.marketing ? "granted" : "denied",
      ad_user_data: categories.marketing ? "granted" : "denied",
      ad_personalization: categories.marketing ? "granted" : "denied",
      analytics_storage: categories.analytics ? "granted" : "denied",
    };

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        // Google's snippet contract: push the `arguments` object itself.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };

    // The `default` command is emitted server-side by <ConsentModeDefaults>,
    // which is the only place that knows the visitor's region and the only
    // point early enough for Google to honour it. Sending a second `default`
    // here would be ignored, so the first pass just marks consent mode ready.
    const isFirstPass = !bootstrapped.current;
    if (isFirstPass) {
      bootstrapped.current = true;
      setActive(true);
      // A returning visitor's stored choice still has to be replayed, or the
      // server-side denied default would silently override it on every load.
      if (!hasStoredConsent) return;
    }

    window.gtag?.("consent", "update", signals);

    // A `consent update` is a state change, not an event: GTM never re-evaluates
    // tags on it. A Custom HTML tag denied at page_view was therefore never
    // injected at all — unlike GA4, which stays loaded and picks the update up
    // by itself. So grant the tags a second trigger to fire on.
    //
    // Only on a real in-page transition (not the first pass, which is either the
    // initial render or a returning visitor's replay), or the tags that already
    // fired normally would fire a second time.
    const granted = OPTIONAL_CATEGORIES.filter((c) => categories[c]);
    if (!isFirstPass && granted.length > 0) {
      window.dataLayer!.push({
        event: CONSENT_GRANTED_EVENT,
        consentGrantedCategories: granted.join(","),
      });
    }
  }, [categories, enabled, hasStoredConsent]);

  return enabled && isActive;
}
