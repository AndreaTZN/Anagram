"use client";

import { useCookieConsent } from "@/components/cmp";

export default function CookieSettingsLink() {
  const { setOpen } = useCookieConsent();

  return (
    <button
      id="privacy-cookie-settings"
      type="button"
      onClick={() => setOpen(true)}
      className="underline cursor-pointer"
    >
      cookie settings
    </button>
  );
}
