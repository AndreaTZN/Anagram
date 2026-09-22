"use client";

import * as React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check, Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCookieConsent } from "./base/consent-provider";
import { CookieSettings } from "./cookie-settings";

gsap.registerPlugin(useGSAP);

const bannerButtonClass =
  "size-[2.3125rem] shrink-0 cursor-pointer rounded-[0.5rem] border-0 bg-[#0c0c0c]/20 p-0 text-white backdrop-blur-[2.5rem] transition-none hover:bg-[#0c0c0c]/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:not-aria-[haspopup]:translate-y-0";

export function CookieBanner() {
  const { isOpen, messages, acceptAll, rejectAll } = useCookieConsent();
  const [showSettings, setShowSettings] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  // Keep the card mounted until its exit animation has finished.
  const [mounted, setMounted] = React.useState(false);
  // Wait for the stored consent snapshot to avoid flashing on repeat visits.
  const [hydrated, setHydrated] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated && isOpen) setMounted(true);
  }, [hydrated, isOpen]);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (isOpen) {
        gsap.fromTo(
          cardRef.current,
          { autoAlpha: 0, y: "1.5rem" },
          {
            autoAlpha: 1,
            y: "0rem",
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
          },
        );
      } else if (mounted) {
        gsap.to(cardRef.current, {
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.35,
          ease: "power2.in",
          onComplete: () => {
            setMounted(false);
            setShowSettings(false);
            setPaused(false);
          },
        });
      }
    },
    {
      dependencies: [isOpen, mounted],
      scope: cardRef,
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      const text = textRef.current;
      if (!text) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const rem = parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        // Identical halves make the repeat seamless; speed follows the rem scale.
        marqueeRef.current = gsap.to(text, {
          xPercent: -50,
          duration: text.scrollWidth / 2 / rem / 2,
          ease: "none",
          repeat: -1,
          paused: paused || showSettings,
        });

        return () => {
          marqueeRef.current = null;
        };
      });

      return () => media.revert();
    },
    {
      dependencies: [mounted, messages.description],
      scope: cardRef,
      revertOnUpdate: true,
    },
  );

  React.useEffect(() => {
    marqueeRef.current?.paused(paused || showSettings || !isOpen);
  }, [paused, showSettings, isOpen]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cardRef}
        id="cookie-banner-card"
        role="region"
        aria-label={messages.title}
        className="fixed right-3 bottom-4 left-3 z-50 flex items-center gap-3 overflow-hidden rounded-[0.5rem] bg-[#0c0c0c]/20 py-2 pr-2 pl-4 text-white backdrop-blur-[2.5rem] sm:right-4 sm:left-auto sm:w-[35.375rem] sm:max-w-[calc(100%-2rem)] sm:gap-6"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={(event) =>
          setPaused(event.currentTarget.contains(document.activeElement))
        }
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(event.currentTarget.matches(":hover"));
          }
        }}
      >
        <p id="cookie-banner-description" className="sr-only">
          {messages.description}
        </p>
        <div
          id="cookie-banner-viewport"
          tabIndex={0}
          role="group"
          aria-label={messages.title}
          aria-describedby="cookie-banner-description"
          className="min-w-0 flex-1 overflow-hidden rounded-sm text-[0.875rem] leading-[1.3] font-normal [mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%_-_1rem),transparent)] focus-visible:[mask-image:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:overflow-x-auto"
        >
          <div
            ref={textRef}
            id="cookie-banner-marquee"
            aria-hidden="true"
            className="flex w-max whitespace-nowrap"
          >
            <span className="shrink-0 pr-8">{messages.description}</span>
            <span className="shrink-0 pr-8 motion-reduce:hidden">
              {messages.description}
            </span>
          </div>
        </div>
        <div
          id="cookie-banner-actions"
          className="flex shrink-0 items-center gap-1"
        >
          <Button
            id="cookie-banner-accept"
            size="icon"
            className={bannerButtonClass}
            aria-label={messages.acceptAll}
            title={messages.acceptAll}
            onClick={acceptAll}
          >
            <Check aria-hidden="true" className="size-4" strokeWidth={1.875} />
          </Button>
          <Button
            id="cookie-banner-preferences"
            size="icon"
            className={bannerButtonClass}
            aria-label={messages.customize}
            title={messages.customize}
            aria-haspopup="dialog"
            aria-expanded={showSettings}
            aria-controls={showSettings ? "cookie-settings-dialog" : undefined}
            onClick={() => setShowSettings(true)}
          >
            <Settings2
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.875}
            />
          </Button>
          <Button
            id="cookie-banner-reject"
            size="icon"
            className={bannerButtonClass}
            aria-label={messages.rejectAll}
            title={messages.rejectAll}
            onClick={rejectAll}
          >
            <X aria-hidden="true" className="size-3.5" strokeWidth={2.15} />
          </Button>
        </div>
      </div>
      <CookieSettings
        open={showSettings && isOpen}
        onOpenChange={setShowSettings}
      />
    </>
  );
}
