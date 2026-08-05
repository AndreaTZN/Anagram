"use client";

import * as React from "react";

import type { StoredConsent } from "./types";

// Re-exported so existing imports from this module keep working; the constant
// lives in a directive-free module so server components can read it too.
export { CONSENT_STORAGE_KEY } from "./consent-signals";
import { CONSENT_STORAGE_KEY } from "./consent-signals";

/** Same-tab change notification (the storage event only fires in OTHER tabs). */
const LOCAL_CHANGE_EVENT = "cookie-consent-change";

/**
 * The record is mirrored to a cookie so the server can read it and emit the
 * Consent Mode defaults that match the user's actual choice. Without it the
 * server has to guess from the region, and a returning visitor who refused is
 * served `granted` until the client update lands — a window in which non-Google
 * tags (which ignore `wait_for_update`) already fired. See <ConsentModeDefaults>.
 */
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

function writeCookie(value: StoredConsent) {
  const encoded = encodeURIComponent(JSON.stringify(value));
  // Lax keeps it on top-level navigations, which is all the server render needs.
  const attributes = [
    `${CONSENT_STORAGE_KEY}=${encoded}`,
    "path=/",
    `max-age=${CONSENT_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ];
  if (window.location.protocol === "https:") attributes.push("Secure");
  document.cookie = attributes.join("; ");
}

// Keyed on the raw string so getSnapshot returns a referentially stable value
// — without this, useSyncExternalStore re-renders forever.
let cache: { raw: string | null; value: StoredConsent | null } | null = null;

function getSnapshot(): StoredConsent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    raw = null; // Storage can throw in private mode / with cookies blocked.
  }
  if (!cache || cache.raw !== raw) {
    cache = { raw, value: raw ? parse(raw) : null };
  }
  return cache.value;
}

/** Never trust what another tab — or the user — put in storage. */
function parse(raw: string): StoredConsent | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }
  const { categories } = parsed as { categories?: unknown };
  if (
    typeof categories !== "object" ||
    categories === null ||
    Array.isArray(categories)
  ) {
    return null;
  }
  // Rebuilt field by field rather than cast: a v1 record still carries a
  // `services` map, and spreading it through would keep resurrecting a key
  // nothing reads any more.
  const { version, updatedAt, consentVersion } = parsed as StoredConsent;
  return { version, updatedAt, consentVersion, categories } as StoredConsent;
}

/** On the server nothing is known yet, so nothing is consented to. */
function getServerSnapshot(): StoredConsent | null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    // key === null means localStorage.clear()
    if (event.key === CONSENT_STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCAL_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCAL_CHANGE_EVENT, onChange);
  };
}

/**
 * The persistence layer, kept apart from the consent logic: a localStorage-backed
 * consent record that is safe to render on the server and stays in sync across
 * tabs. Swap this one file to store consent somewhere else — a cookie, say —
 * and nothing else has to change.
 */
export function useStoredConsent() {
  const stored = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Visitors who chose before the cookie existed only have the localStorage
  // record, so the server would keep guessing for them. Mirror it once.
  React.useEffect(() => {
    if (!stored) return;
    if (document.cookie.includes(`${CONSENT_STORAGE_KEY}=`)) return;
    writeCookie(stored);
  }, [stored]);

  const persist = React.useCallback((value: StoredConsent) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
    writeCookie(value);
    window.dispatchEvent(new Event(LOCAL_CHANGE_EVENT));
  }, []);

  return [stored, persist] as const;
}
