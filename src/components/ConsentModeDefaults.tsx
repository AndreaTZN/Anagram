import { cookies, headers } from "next/headers";

// Imported from the directive-free modules, not the "use client" barrel: a
// server component cannot pull runtime values out of a client module.
import { CONSENT_STORAGE_KEY } from "@/components/cmp/base/consent-signals";
import {
  NO_CONSENT,
  type CategoryConsent,
  type StoredConsent,
} from "@/components/cmp/base/types";

// EEA + UK + Switzerland: the regions where consent must be denied until the
// user opts in. Elsewhere the default is granted.
const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU member states
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR",
  "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO",
  "SE", "SI", "SK",
  // Non-EU EEA
  "IS", "LI", "NO",
  // UK + Switzerland
  "GB", "CH",
]);

function readStoredConsent(raw: string | undefined): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (typeof parsed !== "object" || parsed === null) return null;
    const { categories } = parsed as { categories?: unknown };
    if (typeof categories !== "object" || categories === null) return null;
    return parsed as StoredConsent;
  } catch {
    return null; // A tampered or truncated cookie grants nothing.
  }
}

/**
 * Consent Mode v2 defaults, emitted server-side so they land on the dataLayer
 * before gtm.js runs — a default sent after the tag has loaded is ignored.
 *
 * A returning visitor's stored choice is read from the consent cookie and
 * emitted as the default. This matters for non-Google tags: they ignore
 * `wait_for_update`, so they fire on the very first GTM event, and a region
 * default of `granted` would let them drop cookies before the client's `update`
 * could deny it. Region is only the fallback for a visitor with no record yet.
 */
export async function ConsentModeDefaults() {
  const [headersList, cookieStore] = await Promise.all([headers(), cookies()]);

  const stored = readStoredConsent(
    cookieStore.get(CONSENT_STORAGE_KEY)?.value
  );

  let categories: CategoryConsent;
  if (stored) {
    categories = { ...NO_CONSENT, ...stored.categories };
  } else {
    const country = headersList.get("x-vercel-ip-country");
    // An undetected country (local dev, VPN, missing header) counts as the EEA:
    // a failed lookup must never be what opens consent by default.
    const granted = country !== null && !CONSENT_REQUIRED_COUNTRIES.has(country);
    categories = { analytics: granted, marketing: granted };
  }

  const signals: Record<string, string> = {
    ad_storage: categories.marketing ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
    analytics_storage: categories.analytics ? "granted" : "denied",
  };

  const snippet = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',${JSON.stringify({ ...signals, wait_for_update: 500 })});`;

  return (
    <script
      id="consent-mode-defaults"
      dangerouslySetInnerHTML={{ __html: snippet }}
    />
  );
}
