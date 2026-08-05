/**
 * Where the consent record lives — the localStorage key and the name of the
 * cookie mirroring it. Clear both to forget a choice.
 *
 * No "use client" here on purpose: <ConsentModeDefaults> is a server component
 * and has to read the cookie name before gtm.js runs.
 */
export const CONSENT_STORAGE_KEY = "cookie-consent";
