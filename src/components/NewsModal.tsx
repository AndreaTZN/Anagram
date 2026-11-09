"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { scrollLockRef } from "@/lib/lenis";
import {
  NEWS_DURATION,
  NEWS_EASE,
  panelEase,
  prefersReducedMotion,
} from "@/lib/newsMotion";
import OffsiteExperience, {
  type OffsiteExperienceKind,
} from "./summer-offsite/OffsiteExperience";

gsap.registerPlugin(useGSAP);

export type NewsSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  // Interactive block shown full width after the section's text.
  experience?: OffsiteExperienceKind;
};

export type NewsClosing = {
  paragraphs: string[];
  image?: { src: string; alt: string; width: number; height: number };
};

export type NewsArticle = {
  title: string;
  subtitle?: string;
  image: string;
  // Same Tailwind aspect class as the card, so the image morph is a uniform scale.
  aspect: string;
  sections?: NewsSection[];
  closing?: NewsClosing;
  link?: string;
};

type NewsModalProps = {
  article: NewsArticle;
  // The card's media trigger the panel grows out of.
  source: HTMLElement;
  onClosed: () => void;
};

function revealText(sheet: HTMLElement) {
  const timeline = gsap.timeline();
  sheet.querySelectorAll("[data-news-group]").forEach((group) => {
    Array.from(group.children).forEach((element, index) => {
      const heading = element.matches("h1, h2, h3");
      timeline.from(
        element,
        {
          opacity: 0,
          y: heading ? "0.625rem" : "0.375rem",
          duration: heading ? NEWS_DURATION.title : NEWS_DURATION.text,
          ease: NEWS_EASE.standard,
        },
        NEWS_DURATION.textDelay + index * NEWS_DURATION.stagger,
      );
    });
  });
  return timeline;
}

export default function NewsModal({
  article,
  source,
  onClosed,
}: NewsModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closingRef = useRef(false);
  // Base UI's portal mounts its content a render after the dialog, so the
  // opening animation waits for the panel to actually exist.
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
  // Interactive blocks start loading only once the panel has landed.
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Base UI locks the document, while the site scrolls inside Lenis's wrapper.
    const previousLock = scrollLockRef.current;
    scrollLockRef.current = true;
    return () => {
      scrollLockRef.current = previousLock;
    };
  }, [source]);

  // Base UI can't restore focus itself: the dialog is unmounted rather than closed.
  function finishClose() {
    source.focus({ preventScroll: true });
    onClosed();
  }

  const { contextSafe } = useGSAP(
    () => {
      const panel = panelRef.current;
      const close = closeRef.current;
      const surface = surfaceRef.current;
      const sheet = sheetRef.current;
      const media = mediaRef.current;
      if (!panel || !close || !surface || !sheet || !media) return;

      sheet.scrollTop = 0;

      if (prefersReducedMotion()) {
        setShowFullImage(true);
        setOpened(true);
        return;
      }

      const card = source.getBoundingClientRect();
      const bounds = panel.getBoundingClientRect();
      const target = media.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(surface).borderRadius);

      // One outline drives both the white surface and the content clip, so the
      // opaque content is revealed by exactly the shape that grows. Insets can
      // be negative when the card sits outside the panel's footprint.
      const outline = {
        top: card.top - bounds.top,
        right: bounds.right - card.right,
        bottom: bounds.bottom - card.bottom,
        left: card.left - bounds.left,
        radius: 0,
      };
      const paintOutline = () => {
        const { top, right, bottom, left, radius: round } = outline;
        surface.style.top = `${top}px`;
        surface.style.left = `${left}px`;
        surface.style.width = `${bounds.width - left - right}px`;
        surface.style.height = `${bounds.height - top - bottom}px`;
        surface.style.borderRadius = `${round}px`;
        sheet.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${round}px)`;
      };
      paintOutline();
      // The clip frames the content instead of the sheet's own box, so the image
      // stays visible while it flies in from a card outside the panel.
      gsap.set(sheet, { overflow: "visible" });

      const morph = { duration: NEWS_DURATION.open, ease: panelEase };
      const timeline = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            gsap.set(sheet, { clearProps: "overflow,clipPath" });
            gsap.set(surface, {
              clearProps: "top,left,width,height,borderRadius",
            });
            gsap.set([media, close], { clearProps: "transform" });
            setOpened(true);
            setShowFullImage(true);
          },
        })
        .to(
          outline,
          {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            radius,
            ...morph,
            onUpdate: paintOutline,
          },
          0,
        )
        .fromTo(
          media,
          {
            x: card.left - target.left,
            y: card.top - target.top,
            scaleX: card.width / target.width,
            scaleY: card.height / target.height,
            transformOrigin: "0 0",
          },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, ...morph },
          0,
        )
        .from(
          backdropRef.current,
          {
            opacity: 0,
            duration: NEWS_DURATION.open,
            ease: NEWS_EASE.standard,
          },
          0,
        )
        .fromTo(
          close,
          { scale: 0 },
          {
            scale: 1,
            duration: NEWS_DURATION.control,
            ease: NEWS_EASE.standard,
          },
          NEWS_DURATION.textDelay,
        )
        .add(revealText(sheet), 0);
      timelineRef.current = timeline;

      // Mounting the modal blocks the main thread for a few frames; starting
      // the clock after that keeps the fast first stretch on screen.
      const frame = requestAnimationFrame(() => timeline.play());
      return () => cancelAnimationFrame(frame);
    },
    { dependencies: [panelMounted] },
  );

  const requestClose = contextSafe(() => {
    const panel = panelRef.current;
    if (closingRef.current || !panel) return;
    closingRef.current = true;
    timelineRef.current?.kill();
    // The reader's scroll position is left alone while the panel shrinks away.

    if (prefersReducedMotion()) {
      finishClose();
      return;
    }

    gsap
      .timeline({ onComplete: finishClose })
      .to(
        panel,
        {
          y: "0.75rem",
          scale: 0.92,
          opacity: 0,
          duration: NEWS_DURATION.close,
          ease: NEWS_EASE.standard,
        },
        0,
      )
      .to(
        backdropRef.current,
        { opacity: 0, duration: NEWS_DURATION.close, ease: NEWS_EASE.exit },
        0,
      );
  });

  const textInset = "px-[clamp(0.75rem,4vw,1.5rem)] md:px-[7.25rem]";

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
          className="fixed inset-0 z-50 bg-white/10 backdrop-blur-[0.625rem]"
        />
        <div
          id="home-news-modal"
          className="pointer-events-none fixed inset-0 z-50 flex justify-center px-3 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:items-center md:p-0"
        >
          <Dialog.Popup
            id="home-news-modal-panel"
            ref={setPanel}
            finalFocus={false}
            className="pointer-events-auto relative w-full max-w-150 outline-none md:h-175 md:max-h-[calc(100dvh-10rem)]"
          >
            <Dialog.Close
              id="home-news-modal-close"
              ref={closeRef}
              aria-label="Close article"
              className="absolute inset-x-0 -top-14 z-10 mx-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#e9e9e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c] md:-top-13.5 md:size-9"
            >
              <Image
                src="/icons/news-modal-close.svg"
                alt=""
                width={8}
                height={8}
                className="size-[0.515625rem]"
              />
            </Dialog.Close>

            <div
              id="home-news-modal-surface"
              ref={surfaceRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-white"
            />

            <div
              id="home-news-modal-sheet"
              ref={sheetRef}
              data-lenis-prevent
              data-news-sheet
              tabIndex={0}
              aria-label="Article content"
              className="relative h-full overflow-y-auto overscroll-contain rounded-[1.25rem] px-3 pb-8 outline-none md:px-4 md:pb-12"
            >
              <header
                id="home-news-modal-header"
                data-news-group
                className="px-3 pt-9 pb-7 text-center md:px-5 md:pt-19.5"
              >
                <p
                  id="home-news-modal-type"
                  className="flex items-center justify-center gap-2 text-sm leading-4.5 text-[#151515]"
                >
                  <svg
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                    focusable="false"
                    className="size-4 shrink-0"
                  >
                    <path
                      d="M12 16h40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <rect
                      x="7"
                      y="25"
                      width="50"
                      height="36"
                      rx="5"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Article</span>
                </p>
                <Dialog.Title
                  id="home-news-modal-title"
                  className="my-4 font-medium whitespace-pre-line text-[clamp(1.3125rem,5.6vw,1.625rem)] leading-[1.12] tracking-tight text-[#0c0c0c] md:text-2xl md:leading-6.5"
                >
                  {article.title}
                </Dialog.Title>
                {article.subtitle && (
                  <p
                    id="home-news-modal-subtitle"
                    className="text-[0.9375rem] leading-5.25 text-[#828282] md:text-sm md:leading-4.5"
                  >
                    {article.subtitle}
                  </p>
                )}
              </header>

              <div
                id="home-news-modal-media"
                ref={mediaRef}
                className={`relative ${article.aspect} w-full overflow-hidden`}
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
                    sizes="(min-width: 768px) 35.5rem, 100vw"
                    className="object-cover"
                  />
                )}
              </div>

              {article.sections?.map((section, index) => (
                <Fragment key={section.title}>
                  <section
                    id={`home-news-modal-section-${index + 1}`}
                    data-news-group
                    className={`${textInset} py-9 md:py-16`}
                  >
                    <h3 className="mb-4 text-[1.1875rem] leading-6.25 tracking-[-0.02em] text-[#0c0c0c] md:text-lg md:leading-5.5">
                      {section.title}
                    </h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mb-4 text-base leading-6 text-[#777] last:mb-0 md:text-sm md:leading-4.5 md:text-[#929292]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.items && (
                      <ul className="list-disc text-base leading-6 text-[#777] md:text-sm md:leading-4.5 md:text-[#929292]">
                        {section.items.map((item) => (
                          <li key={item} className="ms-5.25">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                  {section.experience && (
                    <OffsiteExperience
                      kind={section.experience}
                      active={opened}
                    />
                  )}
                </Fragment>
              ))}

              {(article.closing || article.link) && (
                <footer
                  id="home-news-modal-footer"
                  data-news-group
                  className={`${textInset} pt-9 pb-6 md:pt-16 md:pb-4`}
                >
                  {article.closing?.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mb-4 text-base leading-6 text-[#777] last-of-type:mb-0 md:text-sm md:leading-4.5 md:text-[#929292]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {article.closing?.image && (
                    <Image
                      id="home-news-modal-closing-image"
                      src={article.closing.image.src}
                      alt={article.closing.image.alt}
                      width={article.closing.image.width}
                      height={article.closing.image.height}
                      sizes="6.25rem"
                      className="mx-auto mt-12 block h-auto w-25"
                    />
                  )}
                  {article.link && (
                    <a
                      id="home-news-modal-cta"
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mx-auto block w-fit rounded-full bg-[#f5f5f5] px-4 py-3 text-sm leading-[0.9] text-[#0c0c0c] not-first:mt-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c]"
                    >
                      Read full article ↗
                    </a>
                  )}
                </footer>
              )}
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
