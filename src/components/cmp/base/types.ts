export type CookieCategory = "essential" | "analytics" | "marketing";

/** Categories the user can toggle. `essential` is always granted. */
export const OPTIONAL_CATEGORIES = ["analytics", "marketing"] as const;
export type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];

export type CategoryConsent = Record<OptionalCategory, boolean>;

export type CookieServiceDetails = {
  id: string;
  name: string;
  category: CookieCategory;
};

/**
 * Current schema version of the persisted record.
 *
 * v2 dropped the per-service overrides: consent is category-level only, so a
 * v1 record's `services` map is ignored on read and never written again.
 */
export const STORED_CONSENT_SCHEMA_VERSION = 2;

/** Shape persisted to localStorage. `null`/absent means "no choice made yet". */
export type StoredConsent = {
  /** Schema version of this record (absent on records written before v1). */
  version?: number;
  /** ISO timestamp of when the choice was made (absent on legacy records). */
  updatedAt?: string;
  /** Site-defined consent revision — see the provider's `consentVersion` prop. */
  consentVersion?: string;
  categories: CategoryConsent;
};

export const NO_CONSENT: CategoryConsent = {
  analytics: false,
  marketing: false,
};

export const FULL_CONSENT: CategoryConsent = {
  analytics: true,
  marketing: true,
};

/**
 * Whether a category is granted. `essential` is always on and isn't part of
 * `CategoryConsent`, so it needs the explicit case.
 *
 * Kept here as a pure function so the gate in `<CookieService>` and the
 * revocation check decide the same way.
 */
export function isCategoryGranted(
  category: CookieCategory,
  categories: CategoryConsent
): boolean {
  if (category === "essential") return true;
  return categories[category];
}
