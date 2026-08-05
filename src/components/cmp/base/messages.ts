import type { CookieCategory } from "./types";

/**
 * All user-facing text. Pass a partial `messages` prop to the provider to
 * override any of these — no i18n framework required.
 */
export type CmpMessages = {
  title: string;
  description: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  required: string;
  /** Text before the privacy policy link. */
  privacyPolicyPrefix: string;
  privacyPolicy: string;
  categories: Record<CookieCategory, CategoryMessages>;
};

/** A category's user-facing texts. */
export type CategoryMessages = { name: string; description: string };

/**
 * What consumers pass to `<CookieConsentProvider messages>`: any subset of
 * the texts, down to a single field of a single category. Everything omitted
 * falls back to `defaultMessages`.
 */
export type CmpMessagesOverrides = Partial<Omit<CmpMessages, "categories">> & {
  categories?: Partial<Record<CookieCategory, Partial<CategoryMessages>>>;
};

export const defaultMessages: CmpMessages = {
  title: "Cookie preferences",
  description:
    'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept all", you consent to our use of cookies.',
  acceptAll: "Accept all",
  rejectAll: "Disable all",
  customize: "Customize",
  save: "Accept selection",
  required: "Required",
  privacyPolicyPrefix:
    "For more information about how we use cookies, please read our",
  privacyPolicy: "Privacy Policy",
  categories: {
    essential: {
      name: "Essential",
      description:
        "Store your cookie choice and remember where you came from while browsing. No tracking, and these can't be turned off.",
    },
    analytics: {
      name: "Analytics",
      description: "Help us understand how visitors interact with the site.",
    },
    marketing: {
      name: "Marketing",
      description:
        "Used to deliver personalized ads and measure their performance.",
    },
  },
};

export function mergeMessages(overrides?: CmpMessagesOverrides): CmpMessages {
  if (!overrides) return defaultMessages;
  const categories = { ...defaultMessages.categories };
  for (const [key, value] of Object.entries(overrides.categories ?? {})) {
    const category = key as CookieCategory;
    categories[category] = {
      ...defaultMessages.categories[category],
      ...value,
    };
  }
  // `categories` must come after `...overrides`, which would otherwise
  // reintroduce the partial category objects.
  return { ...defaultMessages, ...overrides, categories };
}
