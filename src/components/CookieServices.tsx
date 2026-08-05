"use client";

import { CookieService } from "@/components/cmp";

/**
 * Declares the third-party services for the consent dialog. Everything here
 * loads through GTM, so nothing mounts a script — these entries exist so the
 * dialog can name the third parties each category covers.
 *
 * GA4 reads Consent Mode signals itself, so it carries `consentMode` and stays
 * loaded while Google gates the data. Mixpanel, Clarity and Meta Pixel don't
 * understand Consent Mode at all, so they are blocked in GTM: the first two on
 * `analytics_storage`, Meta Pixel on `ad_storage`.
 */
export function CookieServices() {
  return (
    <>
      <CookieService
        id="ga4"
        name="Google Analytics"
        category="analytics"
        consentMode
      />
      <CookieService id="mixpanel" name="Mixpanel" category="analytics" />
      <CookieService id="clarity" name="Microsoft Clarity" category="analytics" />
      <CookieService id="meta-pixel" name="Meta Pixel" category="marketing" />
    </>
  );
}
