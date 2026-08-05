"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";

import { useCookieConsent } from "./base/consent-provider";
import { SettingsForm, consentButtonClass } from "./cookie-settings";

gsap.registerPlugin(useGSAP);

/**
 * The consent banner: a compact card in the bottom corner. "Customize" swaps
 * the card's contents for the full category list in place, rather than opening
 * a separate dialog over it.
 */
export function CookieBanner() {
  return <SideBanner />;
}

function SideBanner() {
  const { isOpen, messages, privacyPolicyUrl, acceptAll, rejectAll } =
    useCookieConsent();
  const [showSettings, setShowSettings] = React.useState(false);
  // Stays mounted for the exit animation: unmounting on `!isOpen` would cut
  // it instantly, so the DOM node is only dropped once GSAP has finished.
  const [mounted, setMounted] = React.useState(false);
  // useStoredConsent's server snapshot is always null (to avoid a hydration
  // mismatch), so `isOpen` is true during the hydration commit even for a
  // visitor who already chose. Mounting is gated behind a second commit, by
  // which point useSyncExternalStore has swapped in the real stored value —
  // otherwise the banner mounts and plays its enter/exit pair on every reload.
  const [hydrated, setHydrated] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<HTMLDivElement>(null);
  // Captured on click, before React swaps the view: once the new view has
  // rendered the old height is gone, and the tween needs somewhere to start.
  const previousHeight = React.useRef<number | null>(null);

  const openSettings = () => {
    previousHeight.current = viewportRef.current?.offsetHeight ?? null;
    setShowSettings(true);
  };

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated && isOpen) setMounted(true);
  }, [hydrated, isOpen]);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      if (isOpen) {
        gsap.fromTo(
          cardRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );
      } else if (mounted) {
        // A close landing mid-crossfade would otherwise leave the view stuck
        // at a partial opacity, which the next opening would inherit.
        gsap.killTweensOf([viewportRef.current, viewRef.current]);
        gsap.to(cardRef.current, {
          autoAlpha: 0,

          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            setMounted(false);
            // Reset once the card is invisible: doing it on the click instead
            // would rewind the view to the intro mid-fade, in plain sight.
            setShowSettings(false);
          },
        });
      }
    },
    { dependencies: [isOpen, mounted], scope: cardRef },
  );

  useGSAP(
    () => {
      const viewport = viewportRef.current;
      const view = viewRef.current;
      const from = previousHeight.current;
      // Only set by openSettings, so the card's own entrance doesn't get a
      // crossfade on top of it.
      if (!viewport || !view || from === null) return;
      previousHeight.current = null;

      const to = view.offsetHeight;

      gsap
        .timeline({
          // Back to auto so the card can still reflow — on a resize, or when an
          // accordion inside the settings view expands.
          onComplete: () => gsap.set(viewport, { height: "auto" }),
        })
        .fromTo(
          viewport,
          { height: from },
          { height: to, duration: 0.4, ease: "power3.inOut" },
        )
        .fromTo(
          view,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
          0.1,
        );
    },
    { dependencies: [showSettings], scope: cardRef },
  );

  if (!mounted) return null;

  return (
    <div
      ref={cardRef}
      id="cookie-banner-card"
      className="fixed inset-x-4 bottom-4 z-50 overflow-hidden rounded-lg border border-[#0c0c0c]/10 bg-white p-6 text-[#0c0c0c] shadow-lg sm:inset-x-auto sm:right-4 sm:max-w-md w-full"
    >
      {/* The height tween runs on this wrapper, so the card's padding and
          border stay out of the animated value. */}
      <div ref={viewportRef} id="cookie-banner-viewport">
        <div ref={viewRef} key={showSettings ? "settings" : "intro"}>
          {showSettings ? (
            <SettingsForm inline />
          ) : (
            <>
              <h2 className="text-base font-semibold">{messages.title}</h2>
              <p className="mt-2 text-sm text-[#0c0c0c]/60">
                {messages.description}{" "}
                <a
                  href={privacyPolicyUrl}
                  className="underline underline-offset-4 hover:text-[#0c0c0c]"
                >
                  {messages.privacyPolicy}
                </a>
                .
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className={`${consentButtonClass} sm:flex-1 border-[#0c0c0c]/20 text-[#0c0c0c] hover:bg-[#0c0c0c]/5`}
                  onClick={rejectAll}
                >
                  {messages.rejectAll}
                </Button>
                <Button
                  variant="outline"
                  className={`${consentButtonClass} sm:flex-1 border-[#0c0c0c]/20 text-[#0c0c0c] hover:bg-[#0c0c0c]/5`}
                  onClick={openSettings}
                >
                  {messages.customize}
                </Button>
                <Button
                  className={`${consentButtonClass} sm:flex-1 bg-[#0c0c0c] text-white hover:bg-[#0c0c0c]/90`}
                  onClick={acceptAll}
                >
                  {messages.acceptAll}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
