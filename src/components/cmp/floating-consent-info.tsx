"use client";

import * as React from "react";
import { CookieIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCookieConsent } from "./base/consent-provider";
import { CookieSettings } from "./cookie-settings";

/**
 * A small floating button (bottom-left) that reopens the consent settings, so
 * users can change their mind after the banner is gone.
 */
export function FloatingConsentInfo() {
  const { isOpen, messages } = useCookieConsent();
  const [showSettings, setShowSettings] = React.useState(false);

  // Don't compete with the banner.
  if (isOpen) return null;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-40 size-11 rounded-full shadow-md"
        aria-label={messages.title}
        title={messages.title}
        onClick={() => setShowSettings(true)}
      >
        <CookieIcon className="size-5" />
      </Button>

      <CookieSettings open={showSettings} onOpenChange={setShowSettings} />
    </>
  );
}
