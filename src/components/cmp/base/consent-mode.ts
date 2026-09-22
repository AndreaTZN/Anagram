"use client";

import * as React from "react";

import { clearTrackingCookies } from "./clear-tracking-cookies";
import { OPTIONAL_CATEGORIES, type CategoryConsent } from "./types";

type MixpanelConsent = {
  opt_in_tracking?: (options: { track: () => void }) => void;
  opt_out_tracking?: (options: {
    clear_persistence: boolean;
    delete_user: boolean;
  }) => void;
};

type ClarityConsent = {
  (command: "start" | "stop"): void;
  (
    command: "consentv2",
    signals: {
      ad_Storage: "granted" | "denied";
      analytics_Storage: "granted" | "denied";
    }
  ): void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    mixpanel?: MixpanelConsent;
    clarity?: ClarityConsent;
    fbq?: (command: "consent", value: "grant" | "revoke") => void;
  }
}

type AppliedServiceConsent = {
  mixpanel?: { sdk: MixpanelConsent; analytics: boolean };
  clarity?: { sdk: ClarityConsent; categories: CategoryConsent };
  meta?: { sdk: NonNullable<Window["fbq"]>; marketing: boolean };
};

function syncLoadedServices(
  categories: CategoryConsent,
  applied: AppliedServiceConsent
) {
  // GTM gates new tags, but already-loaded SDKs need their own opt-out commands.
  try {
    const mixpanel = window.mixpanel;
    if (
      mixpanel &&
      (applied.mixpanel?.sdk !== mixpanel ||
        applied.mixpanel.analytics !== categories.analytics)
    ) {
      if (categories.analytics) {
        // Restoring consent must not add a synthetic analytics event.
        mixpanel.opt_in_tracking?.({ track: () => {} });
      } else {
        mixpanel.opt_out_tracking?.({
          clear_persistence: true,
          // Withdrawing consent is not a request to delete a remote user profile.
          delete_user: false,
        });
      }
      applied.mixpanel = { sdk: mixpanel, analytics: categories.analytics };
    }
  } catch (error) {
    console.warn("Could not update Mixpanel consent", error);
  }

  try {
    const clarity = window.clarity;
    if (clarity) {
      const analyticsChanged =
        applied.clarity?.categories.analytics !== categories.analytics;
      const marketingChanged =
        applied.clarity?.categories.marketing !== categories.marketing;

      if (!categories.analytics && analyticsChanged) {
        // ConsentV2 denial alone restarts Clarity in cookieless mode; stop it instead.
        clarity("stop");
      } else if (
        categories.analytics &&
        (analyticsChanged || marketingChanged || applied.clarity?.sdk !== clarity)
      ) {
        if (applied.clarity?.categories.analytics === false) clarity("start");
        // stop/start can replace the global function with a queue or the live SDK.
        window.clarity?.("consentv2", {
          ad_Storage: categories.marketing ? "granted" : "denied",
          analytics_Storage: "granted",
        });
      }
      applied.clarity = { sdk: window.clarity!, categories: { ...categories } };
    }
  } catch (error) {
    console.warn("Could not update Clarity consent", error);
  }

  try {
    const fbq = window.fbq;
    if (
      fbq &&
      (applied.meta?.sdk !== fbq || applied.meta.marketing !== categories.marketing)
    ) {
      fbq("consent", categories.marketing ? "grant" : "revoke");
      applied.meta = { sdk: fbq, marketing: categories.marketing };
    }
  } catch (error) {
    console.warn("Could not update Meta Pixel consent", error);
  }

  // Run after SDK shutdown too, including when an in-flight script finishes loading.
  clearTrackingCookies(OPTIONAL_CATEGORIES.filter((category) => !categories[category]));
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
  const previousCategories = React.useRef<CategoryConsent | null>(null);
  const appliedServices = React.useRef<AppliedServiceConsent>({});

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
    const previous = previousCategories.current;
    previousCategories.current = { ...categories };
    if (isFirstPass) {
      bootstrapped.current = true;
      setActive(true);
      // A returning visitor's stored choice still has to be replayed, or the
      // server-side denied default would silently override it on every load.
      if (!hasStoredConsent) return;
    }

    window.gtag?.("consent", "update", signals);
    syncLoadedServices(categories, appliedServices.current);

    // A `consent update` is a state change, not an event: GTM never re-evaluates
    // tags on it. A Custom HTML tag denied at page_view was therefore never
    // injected at all — unlike GA4, which stays loaded and picks the update up
    // by itself. So grant the tags a second trigger to fire on.
    //
    // Only on a real in-page transition (not the first pass, which is either the
    // initial render or a returning visitor's replay), or the tags that already
    // fired normally would fire a second time.
    const granted = OPTIONAL_CATEGORIES.filter(
      (category) => categories[category] && !previous?.[category]
    );
    if (!isFirstPass && granted.length > 0) {
      window.dataLayer!.push({
        event: CONSENT_GRANTED_EVENT,
        consentGrantedCategories: granted.join(","),
      });
    }
  }, [categories, enabled, hasStoredConsent]);

  React.useEffect(() => {
    if (!enabled || !hasStoredConsent) return;

    // A tag requested before withdrawal may finish loading after the preference changed.
    const onScriptLoad = (event: Event) => {
      if (event.target instanceof HTMLScriptElement) {
        syncLoadedServices(categories, appliedServices.current);
      }
    };
    document.addEventListener("load", onScriptLoad, true);
    return () => document.removeEventListener("load", onScriptLoad, true);
  }, [categories, enabled, hasStoredConsent]);

  return enabled && isActive;
}
