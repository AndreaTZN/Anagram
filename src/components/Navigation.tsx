"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navWorks } from "@/lib/nav-works";
import ChatBubble from "@/components/icons/ChatBubble";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Décalage entre deux cartes au repli ; la première (celle qui voyage le
// plus) part en premier.
const STACK_STAGGER = 0.06;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/works" },
  { label: "Studio", href: "/about" },
  // { label: "Lab", href: "/lab" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [pendingNavigation, setPendingNavigation] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const activePathname =
    pendingNavigation?.from === pathname ? pendingNavigation.to : pathname;
  const listRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const meetingTooltipRef = useRef<HTMLSpanElement>(null);
  const meetingIconRef = useRef<SVGSVGElement>(null);
  const emailAddressRef = useRef<HTMLSpanElement>(null);
  const emailBriefRef = useRef<HTMLSpanElement>(null);
  const emailHoverTimeline = useRef<gsap.core.Timeline | null>(null);
  const stackHandleRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -1, y: -1 });
  // `useGSAP` avec `dependencies` n'exécute les cleanups retournés qu'au
  // démontage : chaque run doit fermer lui-même ce que le précédent a ouvert.
  const stackTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const fadeCleanupRef = useRef<(() => void) | null>(null);
  // Only the initial route is instant; scroll, hover, and navigation animate.
  const hasUserDrivenStack = useRef(false);
  const stackPathnameRef = useRef(pathname);
  const [isDesktop, setIsDesktop] = useState(false);
  // Sur /works la pile est l'état par défaut, sans attendre le scroll.
  const alwaysStacked = pathname === "/works";
  const [isStacked, setIsStacked] = useState(alwaysStacked);

  const [isExpanded, setIsExpanded] = useState(false);

  const isCollapsed = (isStacked || alwaysStacked) && !isExpanded;

  useEffect(() => {
    setPendingNavigation(null);

    // The exit event announces accepted navigation before router.push runs.
    const onPageExit = (event: Event) => {
      const href = (event as CustomEvent<{ href: string }>).detail?.href;
      if (!href) return;
      setPendingNavigation({
        from: pathname,
        to: new URL(href, window.location.href).pathname,
      });
    };

    document.addEventListener("anagram:page-exit", onPageExit);
    return () => document.removeEventListener("anagram:page-exit", onPageExit);
  }, [pathname]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)", all: "all" },
        (context) => {
          const reduceMotion = context.conditions?.reduceMotion;
          const cleanups = Array.from(
            navLinksRef.current?.querySelectorAll("a:not([aria-current])") ?? [],
          ).map((link) => {
            const tween = gsap.fromTo(
              link.firstElementChild,
              { opacity: 0.3 },
              {
                opacity: 0.5,
                duration: 0.25,
                ease: "power2.out",
                paused: true,
              },
            );
            const update = () => {
              const engaged = link.matches(":hover, :focus-visible");
              if (reduceMotion) {
                tween.progress(engaged ? 1 : 0);
                return;
              }
              if (engaged) tween.play();
              else tween.reverse();
            };
            const events = ["mouseenter", "mouseleave", "focus", "blur"];
            events.forEach((event) => link.addEventListener(event, update));
            update();
            return () =>
              events.forEach((event) => link.removeEventListener(event, update));
          });
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
      return () => media.revert();
    },
    { dependencies: [activePathname], scope: navLinksRef, revertOnUpdate: true },
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 993px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (stackPathnameRef.current !== pathname) {
        hasUserDrivenStack.current = true;
        stackPathnameRef.current = pathname;
      }

      const scroller = document.getElementById("smooth-scroll-container");
      if (!scroller) return;

      const apply = (scroll: number) => {
        // Un scroll effectif est une action utilisateur : à partir de là, les
        // changements d'état s'animent.
        if (scroll > 0) hasUserDrivenStack.current = true;
        const stacked = alwaysStacked || scroll > 300;
        setIsStacked(stacked);
        if (!stacked) setIsExpanded(false);
      };

      apply(scroller.scrollTop);
      setIsExpanded(false);

      const trigger = ScrollTrigger.create({
        scroller,
        start: 300,
        end: () => ScrollTrigger.maxScroll(scroller) + 1000,
        onToggle: (self) => apply(self.scroll()),
        onRefresh: (self) => apply(self.scroll()),
      });

      return () => trigger.kill();
    },

    { dependencies: [pathname, alwaysStacked], revertOnUpdate: true },
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    const check = () => {
      const stack = stackRef.current;
      const { x, y } = pointerRef.current;
      if (!stack || x < 0) return;
      const el = document.elementFromPoint(x, y);
      const over = !!el && stack.contains(el);
      if (over) hasUserDrivenStack.current = true;
      setIsExpanded(over);
    };

    const ro = new ResizeObserver(check);
    if (stackRef.current) ro.observe(stackRef.current);

    const scroller = document.getElementById("smooth-scroll-container");
    scroller?.addEventListener("scroll", check, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      scroller?.removeEventListener("scroll", check);
    };
  }, []);

  useGSAP(() => {
    gsap.set(meetingTooltipRef.current, {
      opacity: 0,
      y: 5,
      scale: 0.96,
      xPercent: -50,
      transformOrigin: "50% 100%",
    });
    gsap.set(stackHandleRef.current, {
      y: "1.75rem",
      scaleX: 0,
      scaleY: 0.25,
      transformOrigin: "center center",
    });
  }, []);

  useGSAP(() => {
    gsap.set(emailBriefRef.current, { yPercent: 100, opacity: 1 });

    // Reversing the same timeline preserves continuity during quick re-entry.
    emailHoverTimeline.current = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.55, ease: "power2.inOut" },
      })
      .to(emailAddressRef.current, { yPercent: -150, opacity: 0 }, 0)
      .to(emailBriefRef.current, { yPercent: 0 }, 0);

    return () => {
      emailHoverTimeline.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-nav-work]", list);
      if (!items.length) return;

      const links = items.map((item) => item.parentElement as HTMLElement);

      const cardHeight = links[0].offsetHeight;
      const step = cardHeight + 6;

      const instant = !hasUserDrivenStack.current;
      const d = (value: number) => (instant ? 0 : value);

      stackTimelineRef.current?.kill();
      const tl = gsap.timeline();
      stackTimelineRef.current = tl;

      const rectTop = (el: HTMLElement) => el.getBoundingClientRect().top;
      // FLIP : applique `vars` à la liste d'un coup et reporte le déplacement de
      // layout de chaque carte sur son `y`, pour que rien ne bouge à l'écran.
      // Le mouvement n'est ainsi porté que par `y`, ce qui autorise un stagger :
      // si la hauteur était tweenée en parallèle, elle entraînerait vers le bas
      // les cartes dont le `y` n'a pas encore démarré.
      const snapListKeepingCards = (vars: gsap.TweenVars) => {
        const from = links.map(rectTop);
        gsap.set(list, vars);
        links.forEach((link, i) => {
          const y =
            Number(gsap.getProperty(link, "y")) + from[i] - rectTop(link);
          gsap.set(link, { y });
        });
      };

      if (isCollapsed) {
        snapListKeepingCards({
          height: cardHeight + parseFloat(getComputedStyle(list).paddingBottom),
          paddingTop: 0,
          overflow: "visible",
        });

        tl.to(
          links,
          {
            y: (i: number) => -i * step,
            duration: d(1),
            ease: "power3.out",
            stagger: d(STACK_STAGGER),
            transformOrigin: "center top",
            overwrite: true,
          },
          0,
        );

        if (instant) {
          // A negative overlap on a zero-duration stack hides the initial handle.
          gsap.set(stackHandleRef.current, {
            y: "-0.625rem",
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            transformOrigin: "center center",
          });
        } else {
          tl.fromTo(
            stackHandleRef.current,
            { y: "1.75rem", scaleX: 0, scaleY: 0.25, opacity: 1 },
            {
              y: "-0.625rem",
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.2)",
              transformOrigin: "center center",
              overwrite: true,
            },
            Math.max(0, tl.duration() - 0.6),
          );
        }
      } else {
        // Le padding et le scroll reviennent d'un coup (sans saut grâce au
        // FLIP) ; seule la hauteur est tweenée, mesurée avec le bon padding.
        snapListKeepingCards({ clearProps: "overflow,paddingTop" });
        tl.to(stackHandleRef.current, {
          y: "1.75rem",
          scaleX: 0,
          scaleY: 0.25,
          opacity: 0,
          duration: d(0.3),
          ease: "power3.in",
          overwrite: true,
        })
          .to(
            links,
            {
              y: 0,
              scale: 1,
              duration: d(0.5),
              ease: "power3.out",
              overwrite: true,
            },
            0,
          )
          .to(
            list,
            {
              height: "auto",
              duration: d(0.5),
              ease: "power3.out",
              overwrite: true,
            },
            0,
          );
      }

      return () => {
        tl.kill();
      };
    },
    { dependencies: [isCollapsed], scope: listRef },
  );

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-nav-work]", list);
      if (!items.length) return;

      fadeCleanupRef.current?.();
      fadeCleanupRef.current = null;

      if (isCollapsed) {
        gsap.to(items, {
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
        return;
      }

      gsap.set(items, { transformOrigin: "left center", force3D: true });

      const setters = items.map((item) => ({
        scaleX: gsap.quickTo(item, "scaleX", {
          duration: 0.45,
          ease: "power3.out",
        }),
        scaleY: gsap.quickTo(item, "scaleY", {
          duration: 0.45,
          ease: "power3.out",
        }),
        opacity: gsap.quickTo(item, "opacity", {
          duration: 0.45,
          ease: "power3.out",
        }),
        x: gsap.quickTo(item, "x", { duration: 0.45, ease: "power3.out" }),
      }));

      const update = (immediate = false) => {
        const bounds = list.getBoundingClientRect();
        const atTop = list.scrollTop <= 1;
        const atBottom =
          list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
        items.forEach((item, i) => {
          const rect = item.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const zone = rect.height * 1.6;
          const topProgress = atTop
            ? 1
            : gsap.utils.clamp(0, 1, (center - bounds.top) / zone);
          const bottomProgress = atBottom
            ? 1
            : gsap.utils.clamp(0, 1, (bounds.bottom - center) / zone);
          const progress = Math.min(topProgress, bottomProgress);
          const eased = gsap.parseEase("power2.out")(progress);
          const scale = 0.9 + 0.1 * eased;
          const opacity = 0.15 + 0.85 * eased;
          const x = -6 * (1 - eased);
          if (immediate) {
            gsap.set(item, { scaleX: scale, scaleY: scale, opacity, x });
            return;
          }
          setters[i].scaleX(scale);
          setters[i].scaleY(scale);
          setters[i].opacity(opacity);
          setters[i].x(x);
        });
      };
      // Wrapper : passé tel quel à addEventListener, `update` recevrait
      // l'Event en guise d'`immediate`.
      const onUpdate = () => update();

      // Le délai laisse le dépliage (0.5 s) se terminer avant de mesurer. Sans
      // action utilisateur la liste est déjà en place : les fades se posent
      // d'emblée, sinon les cartes du bas s'assombrissent 1 s après l'arrivée.
      const instant = !hasUserDrivenStack.current;
      const start = () => {
        update(instant);
        list.addEventListener("scroll", onUpdate, { passive: true });
        window.addEventListener("resize", onUpdate);
      };
      const startDelay = instant ? null : gsap.delayedCall(0.55, start);
      if (instant) start();

      const cleanup = () => {
        startDelay?.kill();
        list.removeEventListener("scroll", onUpdate);
        window.removeEventListener("resize", onUpdate);
      };
      fadeCleanupRef.current = cleanup;
      return cleanup;
    },
    { dependencies: [isCollapsed], scope: listRef },
  );

  function handleMeetingEnter() {
    // Le label dépasse légèrement sa position finale avant de se poser : c'est
    // le « pop » du composant de référence, impossible avec un simple ease.
    gsap
      .timeline({ defaults: { overwrite: true } })
      .to(meetingTooltipRef.current, {
        keyframes: [
          { opacity: 1, y: -0.7, scale: 1.004, duration: 0.35 },
          { y: 0, scale: 1, duration: 0.17 },
        ],
        xPercent: -50,
        ease: "power2.out",
      })
      .to(
        meetingIconRef.current,
        {
          keyframes: [
            { y: 0.55, scale: 0.97, rotateY: 0, duration: 0.16 },
            { y: -0.13, scale: 1.004, rotateY: 6, duration: 0.22 },
            { y: 0, scale: 1, rotateY: 0, duration: 0.14 },
          ],
          ease: "power2.inOut",
        },
        0,
      );
  }

  function handleMeetingLeave() {
    gsap.to(meetingTooltipRef.current, {
      opacity: 0,
      y: 5,
      scale: 0.96,
      xPercent: -50,
      duration: 0.32,
      ease: "power2.in",
      overwrite: true,
    });
  }

  function handleEmailEnter() {
    emailHoverTimeline.current?.play();
  }

  function handleEmailLeave() {
    emailHoverTimeline.current?.reverse();
  }

  return (
    <nav
      className={`relative flex flex-col bg-white h-dvh max-h-screen${pathname === "/about" ? " max-[992px]:hidden" : ""}`}
    >
      <div className="flex flex-col gap-10 pl-4 pr-1.5 pt-6 pb-4">
        {/* Logo */}
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            fill="none"
            viewBox="0 0 102 18"
            aria-label="Anagram"
          >
            <path
              id="anagram"
              fill="#0C0C0C"
              d="M0 6.23c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C8.547.835 7.278 0 5.626 0 2.442 0 0 2.84 0 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247S9.337 4.37 9.337 6.231Zm6.205 5.97h3.28V6.373c0-2.292 1.15-3.39 2.658-3.39 1.364 0 2.106 1.05 2.106 2.77v6.445h3.28V5.204c0-3.103-1.723-5.204-4.62-5.204-1.556 0-2.801.668-3.424 1.623V.263h-3.28v11.936Zm13.566-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.92-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C37.655.835 36.386 0 34.734 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm5.965 6.71c.216 2.554 2.443 4.487 5.842 4.487 3.113 0 6.034-1.647 6.034-5.968V.263h-3.28V1.6C52.407.691 51.09 0 49.558 0c-3.112 0-5.65 2.674-5.65 6.04 0 3.342 2.538 6.016 5.65 6.016 1.532 0 2.85-.692 3.448-1.576v1.409c0 1.886-1.245 2.817-2.682 2.817-1.364 0-2.298-.55-2.729-1.767h-3.184Zm8.859-6.9c0 1.814-1.365 3.056-3.017 3.056s-3.04-1.242-3.04-3.056c0-1.838 1.388-3.056 3.04-3.056 1.652 0 3.017 1.218 3.017 3.056Zm6.204 6.16h3.28V6.493c0-1.958 1.03-3.176 2.586-3.176.526 0 .981.096 1.484.263V.263a3.776 3.776 0 0 0-1.101-.144c-1.341 0-2.562.884-2.969 2.053V.262h-3.28V12.2Zm8.282-5.97c0 3.39 2.442 6.232 5.626 6.232 1.652 0 2.921-.836 3.448-1.6V12.2h3.28V.263h-3.28V1.6C76.302.835 75.033 0 73.38 0c-3.184 0-5.626 2.84-5.626 6.23Zm9.337 0c0 1.863-1.221 3.248-3.017 3.248-1.795 0-3.016-1.385-3.016-3.247 0-1.862 1.22-3.247 3.016-3.247s3.017 1.385 3.017 3.247Zm6.205 5.97h3.28V6.373c0-2.292.982-3.39 2.394-3.39 1.293 0 1.868 1.074 1.868 2.841V12.2h3.28V6.374c0-2.292.981-3.39 2.394-3.39 1.292 0 1.867 1.074 1.867 2.841V12.2h3.28V5.276c0-3.223-1.628-5.276-4.477-5.276-1.365 0-2.969.716-3.71 2.196C92.752.812 91.508 0 89.76 0c-1.46 0-2.537.692-3.184 1.623V.263h-3.28v11.936Z"
            />
          </svg>
        </Link>

        <div className="flex flex-col gap-8">
          {/* CTA card */}
          <div className="flex flex-col gap-6">
            <p className="text-[#0c0c0c] leading-[1.1] text-xl tracking-[-0.12px]">
              We shape brands that need no introduction.
            </p>

            <div className="flex items-start gap-2 self-start">
              <a
                id="nav-cta-email"
                href="mailto:hello@anagram.club"
                onMouseEnter={handleEmailEnter}
                onMouseLeave={handleEmailLeave}
                className="relative overflow-hidden flex items-center bg-[#f5f5f5] rounded-full px-4 py-3"
              >
                <span
                  ref={emailAddressRef}
                  className="block whitespace-nowrap text-[#0c0c0c] leading-[0.9] text-sm tracking-[-0.07px]"
                >
                  hello@anagram.club
                </span>
                <span
                  ref={emailBriefRef}
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[#0c0c0c] leading-[0.9] text-sm tracking-[-0.004375rem] opacity-0"
                >
                  Send your brief
                </span>
              </a>

              <a
                id="nav-cta-meeting"
                href="https://cal.com/anagram/hello"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMeetingEnter}
                onMouseLeave={handleMeetingLeave}
                aria-label="Book a call"
                className="relative grid place-items-center size-9.5 shrink-0 rounded-full bg-[#f7f7f7] transition-colors duration-500 hover:bg-[#ededed]"
              >
                <ChatBubble
                  ref={meetingIconRef}
                  className="block size-3 transform-3d"
                />
                <span
                  ref={meetingTooltipRef}
                  id="nav-cta-meeting-tooltip"
                  aria-hidden="true"
                  className="absolute bottom-full left-1/2 mb-2.5 z-2 whitespace-nowrap rounded-full bg-[#0c0c0c] px-3 py-2 text-xs leading-none text-white opacity-0 pointer-events-none"
                >
                  Book a call
                </span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div id="nav-links" ref={navLinksRef} className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activePathname === link.href;
              // CSS keeps the route state intact when GSAP reverts inline styles.
              return (
                <Link
                  id={`nav-link-${link.label.toLowerCase()}`}
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="self-start text-[#0c0c0c] font-medium leading-[0.8] text-sm"
                >
                  <span
                    className={`block ${isActive ? "opacity-100" : "opacity-30"}`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Works list + Show all works */}
      <div
        id="nav-works"
        className="relative flex flex-col justify-end flex-1 overflow-hidden"
        style={{
          // Le masque de fondu haut n'a de sens que sur la liste scrollable ;
          // sur la pile repliée il mangerait la poignée.
          maskImage: isCollapsed
            ? undefined
            : "linear-gradient(to bottom, transparent 0, #000 5rem, #000 calc(100% - 1.5rem), transparent 100%)",
          WebkitMaskImage: isCollapsed
            ? undefined
            : "linear-gradient(to bottom, transparent 0, #000 5rem, #000 calc(100% - 1.5rem), transparent 100%)",
        }}
      >
        <div
          id="nav-works-stack"
          ref={stackRef}
          onMouseEnter={() => {
            hasUserDrivenStack.current = true;
            setIsExpanded(true);
          }}
          onMouseLeave={() => setIsExpanded(false)}
          className="relative flex min-h-0 flex-col justify-end"
        >
          <div
            id="nav-works-stack-handle"
            ref={stackHandleRef}
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-0 -ml-5 h-0.5 w-10 rounded-full bg-[#EDEDED]"
          />

          <div
            id="nav-works-list"
            ref={listRef}
            // overflow / padding-top / height de l'état replié sont posés en
            // inline par GSAP (voir snapListKeepingCards) : un swap de classe
            // ici ferait sauter les cartes avant que l'animation ne démarre.
            className="flex min-h-0 flex-col gap-1.5 pl-3 pr-1.5 pb-4 pt-14 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {navWorks.map((work, i) => (
              <Link
                key={work.name}
                href={work.href}
                style={{ zIndex: navWorks.length - i }}
                className="relative shrink-0"
              >
                <div
                  data-nav-work
                  className="flex items-center gap-3 p-2 rounded-sm transition-colors bg-[#f9f9f9] hover:bg-[#ededed]"
                >
                  <div className="relative shrink-0 overflow-hidden w-25 h-15">
                    {isDesktop ? (
                      <video
                        src={work.video}
                        poster={work.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={work.poster}
                        alt={work.name}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[#7c7c7c] text-sm  leading-[0.8] font-normal">
                      {work.category}
                    </span>
                    <p className="text-[#0c0c0c] text-sm  leading-[0.8] font-medium">
                      {work.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
