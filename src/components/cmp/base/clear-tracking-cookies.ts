import type { CookieCategory } from "./types";

/**
 * Cookies to drop when a category's consent is withdrawn. See
 * TRACKED_STORAGE_PREFIXES below for the localStorage side.
 *
 * Consent Mode only stops new writes: a visitor who accepted and later refused
 * keeps every cookie already on their device until it expires on its own, which
 * is not a withdrawal in any meaningful sense. Matched by prefix because the GA4
 * and Mixpanel names carry a per-property suffix (`_ga_G-XXXX`, `mp_<token>_…`).
 */
const TRACKED_COOKIE_PREFIXES: { prefix: string; category: CookieCategory }[] = [
  { prefix: "_ga", category: "analytics" }, // covers _ga and _ga_<id>
  { prefix: "_gid", category: "analytics" },
  { prefix: "_gat", category: "analytics" },
  { prefix: "mp_", category: "analytics" }, // Mixpanel
  { prefix: "_clck", category: "analytics" }, // Clarity: user id, 1 year
  { prefix: "_clsk", category: "analytics" }, // Clarity: session id, 1 day
  { prefix: "_fbp", category: "marketing" }, // Meta Pixel
  { prefix: "_fbc", category: "marketing" },
];

/**
 * Every domain a cookie could have been set on, from the most specific to the
 * registrable domain. A cookie is only removed by an expiry that matches the
 * domain it was written with, and Google writes on the parent domain — so
 * `anagram.club` and `.anagram.club` both have to be tried.
 */
function candidateDomains(): (string | undefined)[] {
  const host = window.location.hostname;
  // undefined = no domain attribute, which is how a host-only cookie is cleared.
  const domains: (string | undefined)[] = [undefined, host, `.${host}`];

  const parts = host.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const parent = parts.slice(i).join(".");
    domains.push(parent, `.${parent}`);
  }
  return domains;
}

/** Every path the cookie could be scoped to, from the current one up to "/". */
function candidatePaths(): string[] {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const paths = ["/"];
  let current = "";
  for (const segment of segments) {
    current += `/${segment}`;
    paths.push(current);
  }
  return paths;
}

function expire(name: string) {
  for (const domain of candidateDomains()) {
    for (const path of candidatePaths()) {
      const attributes = [
        `${name}=`,
        "expires=Thu, 01 Jan 1970 00:00:00 GMT",
        `path=${path}`,
      ];
      if (domain) attributes.push(`domain=${domain}`);
      document.cookie = attributes.join("; ");
    }
  }
}

/**
 * localStorage keys to drop alongside the cookies. Not every tag uses cookies:
 * Mixpanel keeps its `distinct_id` and `$device_id` in localStorage only, so a
 * cookie-only cleanup leaves the identifier that ties sessions together intact.
 */
const TRACKED_STORAGE_PREFIXES: { prefix: string; category: CookieCategory }[] =
  [
    { prefix: "mp_", category: "analytics" }, // Mixpanel: mp_<token>_mixpanel
    { prefix: "_clck", category: "analytics" }, // Clarity mirrors its ids here
    { prefix: "clarity", category: "analytics" },
    { prefix: "_gcl_ls", category: "marketing" }, // Google Ads link storage
  ];

/**
 * Delete the client-side storage belonging to the categories the user just
 * withdrew — cookies and localStorage alike.
 *
 * Only reaches what JavaScript can read: an `HttpOnly` cookie can only be
 * cleared by the server that set it. None of the tags here set that flag.
 */
export function clearTrackingCookies(withdrawn: CookieCategory[]) {
  if (withdrawn.length === 0) return;

  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name));

  for (const name of names) {
    const match = TRACKED_COOKIE_PREFIXES.find(
      (tracked) =>
        name.startsWith(tracked.prefix) && withdrawn.includes(tracked.category)
    );
    if (match) expire(name);
  }

  try {
    for (const key of Object.keys(window.localStorage)) {
      const match = TRACKED_STORAGE_PREFIXES.find(
        (tracked) =>
          key.startsWith(tracked.prefix) && withdrawn.includes(tracked.category)
      );
      if (match) window.localStorage.removeItem(key);
    }
  } catch {
    // Storage can throw in private mode / with cookies blocked.
  }
}
