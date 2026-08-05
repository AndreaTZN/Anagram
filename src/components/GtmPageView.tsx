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

  React.useEffect(() => {
    if (!isConsentModeActive) return;

    // Next updates document.title after the route renders, so reading it now
    // would report the previous page. Two rAFs put the read after the commit
    // that applies the new title.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
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
