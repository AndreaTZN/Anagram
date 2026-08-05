"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { useCookieConsent } from "@/components/cmp";

/**
 * SPA page views for GTM.
 *
 * App Router navigates with `history.pushState`, so no new document loads and
 * GTM never fires its own page view past the first one. GA4's built-in page
 * view is disabled in the container; every view — including the first — comes
 * through this single push, which keeps the first load and later navigations on
 * one code path and rules out double counting.
 *
 * Pair it with a Custom Event trigger on `page_view` in GTM.
 */
export function GtmPageView() {
  const pathname = usePathname();
  const { isConsentModeActive } = useCookieConsent();
  // isConsentModeActive flips false -> true twice over a visit: once when the
  // user consents, and again on the next load, where it starts false until the
  // stored choice is read. Either flip re-runs this effect on an unchanged
  // path, so the push is keyed on the path actually reported last.
  const lastReported = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!isConsentModeActive) return;
    if (lastReported.current === pathname) return;

    // Next updates document.title after the route renders, so reading it now
    // would report the previous page. Two rAFs put the read after the commit
    // that applies the new title.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        // Marked here, not before the rAFs: a cancelled effect never pushes,
        // and must not leave the path looking already reported.
        lastReported.current = pathname;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "page_view",
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href,
        });
      });
    });

    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [pathname, isConsentModeActive]);

  return null;
}
