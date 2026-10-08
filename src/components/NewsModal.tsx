"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { scrollLockRef } from "@/lib/lenis";

gsap.registerPlugin(useGSAP, CustomEase, Flip);

// Sampled from the spring on paulsoulhiard.com: fast settle with a ~1% overshoot.
CustomEase.create(
  "newsSpring",
  "M0,0 L0.04,0.077 0.08,0.242 0.12,0.427 0.16,0.595 0.2,0.733 0.24,0.837 0.28,0.909 0.32,0.957 0.36,0.986 0.4,1.002 0.44,1.01 0.48,1.012 0.52,1.011 0.56,1.01 0.6,1.007 0.64,1.005 0.68,1.004 0.72,1.002 0.76,1.001 0.8,1.001 0.86,1 1,1",
);

export type NewsSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type NewsArticle = {
  title: string;
  date?: string;
  subtitle?: string;
  image: string;
  // Same Tailwind aspect class as the card, so the morph is a uniform scale.
  aspect: string;
  sections?: NewsSection[];
  link?: string;
};

type NewsModalProps = {
  article: NewsArticle;
  // The card's media trigger the panel grows out of and shrinks back into.
  source: HTMLElement;
  onClosed: () => void;
};

export default function NewsModal({
  article,
  source,
  onClosed,
}: NewsModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closingRef = useRef(false);
  // Base UI's portal mounts its content a render after the dialog, so the
  // opening morph waits for the panel to actually exist.
  const [panelMounted, setPanelMounted] = useState(false);
  const setPanel = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
    setPanelMounted(Boolean(node));
  }, []);
  // The card's already-decoded image stands in during the morph; the larger
  // variant only loads once it has landed, so no decode lands mid-animation.
  const [placeholderSrc] = useState(
    () => source.querySelector("img")?.currentSrc,
  );
  const [showFullImage, setShowFullImage] = useState(!placeholderSrc);

  useEffect(() => {
    // Base UI locks the document, while the site scrolls inside Lenis's wrapper.
    const previousLock = scrollLockRef.current;
    scrollLockRef.current = true;
    return () => {
      scrollLockRef.current = previousLock;
      gsap.set(source, { clearProps: "visibility" });
    };
  }, [source]);

  // Flip pairs elements by data-flip-id and tags the card's on capture, so the
  // modal's white surface mirrors the card frame and its media the card image.
  function captureCard(surface: HTMLElement, media: HTMLElement) {
    const cardMedia = source.firstElementChild as HTMLElement;
    const state = Flip.getState([source, cardMedia], {
      props: "borderRadius",
    });
    surface.dataset.flipId = source.dataset.flipId;
    media.dataset.flipId = cardMedia.dataset.flipId;
    return state;
  }

  // The media leaves the panel's box mid-morph, and the separate surface paints
  // the panel's white shape meanwhile.
  function detachPanelChrome(panel: HTMLElement) {
    gsap.set(panel, { overflow: "visible", backgroundColor: "transparent" });
  }

  // Base UI can't restore focus itself: the dialog is unmounted rather than
  // closed, and the trigger stays hidden until the morph lands on it.
  function finishClose() {
    gsap.set(source, { clearProps: "visibility" });
    source.focus({ preventScroll: true });
    onClosed();
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  const { contextSafe } = useGSAP(
    () => {
      const panel = panelRef.current;
      const media = mediaRef.current;
      const surface = surfaceRef.current;
      if (!panel || !media || !surface) return;

      if (prefersReducedMotion()) {
        setShowFullImage(true);
        gsap.from([backdropRef.current, panel], { opacity: 0, duration: 0.2 });
        return;
      }

      const state = captureCard(surface, media);
      // The image travels into the modal, so only its slot in the card empties out.
      gsap.set(source, { visibility: "hidden" });
      detachPanelChrome(panel);

      const morph = { duration: 1.06, ease: "newsSpring" };
      const timeline = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            gsap.set(panel, { clearProps: "overflow,backgroundColor" });
            setShowFullImage(true);
          },
        })
        // The surface is empty, so animating its real size can't reflow text.
        .add(Flip.from(state, { targets: surface, ...morph }), 0)
        // Card and modal share the image's aspect ratio: a uniform scale.
        .add(Flip.from(state, { targets: media, scale: true, ...morph }), 0)
        .from(
          backdropRef.current,
          { opacity: 0, duration: 0.45, ease: "power2.out" },
          0,
        )
        .from(
          panel.querySelectorAll("[data-news-fade]"),
          {
            opacity: 0,
            y: "0.75rem",
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
          },
          0.25,
        );
      timelineRef.current = timeline;

      // Mounting the modal blocks the main thread for a few frames; starting
      // the clock after that keeps the spring's fast first stretch on screen.
      const frame = requestAnimationFrame(() => timeline.play());
      return () => cancelAnimationFrame(frame);
    },
    { dependencies: [panelMounted] },
  );

  const requestClose = contextSafe(() => {
    const panel = panelRef.current;
    const media = mediaRef.current;
    const surface = surfaceRef.current;
    if (closingRef.current || !panel || !media || !surface) return;
    closingRef.current = true;

    if (prefersReducedMotion()) {
      gsap.to([backdropRef.current, panel], {
        opacity: 0,
        duration: 0.2,
        onComplete: finishClose,
      });
      return;
    }

    timelineRef.current?.kill();
    panel.scrollTop = 0;
    detachPanelChrome(panel);
    const state = captureCard(surface, media);
    const morph = { duration: 0.8, ease: "newsSpring" };

    gsap
      .timeline({ onComplete: finishClose })
      .to(
        panel.querySelectorAll("[data-news-fade]"),
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        0,
      )
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        0,
      )
      .add(Flip.to(state, { targets: surface, ...morph }), 0)
      .add(Flip.to(state, { targets: media, scale: true, ...morph }), 0);
  });

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          id="home-news-modal-backdrop"
          ref={backdropRef}
          className="fixed inset-0 z-50 bg-[rgba(12,12,12,0.3)] backdrop-blur-[0.625rem]"
        />
        <div
          id="home-news-modal"
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <Dialog.Popup
            id="home-news-modal-panel"
            ref={setPanel}
            data-lenis-prevent
            finalFocus={false}
            className="pointer-events-auto relative isolate flex h-[43.75rem] max-h-full w-full max-w-[31.25rem] flex-col items-center gap-6 overflow-x-clip overflow-y-auto rounded-[1.25rem] bg-white px-4 pt-4 pb-16 outline-none"
          >
            <div
              id="home-news-modal-surface"
              ref={surfaceRef}
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-[1.25rem] bg-white"
            />
            <div
              id="home-news-modal-header"
              data-news-fade
              className="sticky top-0 z-10 flex w-full shrink-0 justify-end"
            >
              <Dialog.Close
                id="home-news-modal-close"
                aria-label="Close article"
                className="flex size-[2.3125rem] cursor-pointer items-center justify-center rounded-full bg-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c]"
              >
                <Image
                  src="/icons/news-modal-close.svg"
                  alt=""
                  width={8}
                  height={8}
                  className="size-[0.515625rem]"
                />
              </Dialog.Close>
            </div>

            <div
              id="home-news-modal-intro"
              data-news-fade
              className="flex w-full shrink-0 flex-col gap-2 text-center"
            >
              {article.date && (
                <p
                  id="home-news-modal-date"
                  className="text-[#7c7c7c] text-sm leading-[1.3]"
                >
                  {article.date}
                </p>
              )}
              <Dialog.Title
                id="home-news-modal-title"
                className="font-medium text-2xl leading-[1.1] tracking-[-0.0075rem] text-black"
              >
                {article.title}
              </Dialog.Title>
              {article.subtitle && (
                <p
                  id="home-news-modal-subtitle"
                  className="px-4 text-[#7c7c7c] text-sm leading-[1.3] md:px-16"
                >
                  {article.subtitle}
                </p>
              )}
            </div>

            <div
              id="home-news-modal-media"
              ref={mediaRef}
              className={`relative ${article.aspect} w-full shrink-0 overflow-hidden`}
            >
              {placeholderSrc && (
                // Plain <img>: it must reuse the card's exact cached URL.
                <img
                  src={placeholderSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              {showFullImage && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 31.25rem, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            {(article.sections?.length || article.link) && (
              <div
                id="home-news-modal-body"
                className="flex w-full flex-col items-center gap-8 px-4 md:px-16"
              >
                {article.sections?.map((section) => (
                  <section
                    key={section.title}
                    data-news-fade
                    className="flex w-full flex-col gap-4"
                  >
                    <h3 className="text-lg leading-[1.1] tracking-[-0.005625rem] text-black">
                      {section.title}
                    </h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-[#7c7c7c] text-sm leading-[1.3]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.items && (
                      <ul className="list-disc text-[#7c7c7c] text-sm leading-[1.3]">
                        {section.items.map((item) => (
                          <li key={item} className="ms-[1.3125rem]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
                {article.link && (
                  <a
                    id="home-news-modal-cta"
                    data-news-fade
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#f5f5f5] px-4 py-3 text-sm leading-[0.9] text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c]"
                  >
                    Read full article ↗
                  </a>
                )}
              </div>
            )}
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
