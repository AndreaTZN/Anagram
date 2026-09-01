"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navWorks } from "@/lib/nav-works";
import Calendar from "@/components/icons/Calendar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Studio", href: "/about" },
  // { label: "Lab", href: "/lab" },
];

export default function Navigation() {
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const meetingTooltipRef = useRef<HTMLSpanElement>(null);
  const emailAddressRef = useRef<HTMLSpanElement>(null);
  const emailBriefRef = useRef<HTMLSpanElement>(null);
  const emailMarqueeRef = useRef<HTMLSpanElement>(null);
  const emailMarqueeTween = useRef<gsap.core.Tween | null>(null);
  const stackHandleRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Sur /works la pile est l'état par défaut, sans attendre le scroll.
  const alwaysStacked = pathname === "/works";
  const [isStacked, setIsStacked] = useState(alwaysStacked);

  const [isExpanded, setIsExpanded] = useState(false);

  const isCollapsed = (isStacked || alwaysStacked) && !isExpanded;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 993px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const scroller = document.getElementById("smooth-scroll-container");
      if (!scroller) return;

      const sync = (self: ScrollTrigger) => {
        const stacked = alwaysStacked || self.scroll() > 300;
        setIsStacked(stacked);
        if (!stacked) setIsExpanded(false);
      };

      // La nav persiste entre les routes : sans ce set, arriver sur /works par
      // navigation client garderait l'état déplié de la page précédente.
      setIsStacked(alwaysStacked || scroller.scrollTop > 300);
      setIsExpanded(false);

      ScrollTrigger.create({
        scroller,
        start: 300,
        onUpdate: sync,
        onRefresh: sync,
      });
    },
    { dependencies: [pathname, alwaysStacked] },
  );

  useGSAP(() => {
    gsap.set(meetingTooltipRef.current, { opacity: 0, y: 4, xPercent: -50 });
    gsap.set(emailBriefRef.current, { yPercent: 100 });
  }, []);

  function handleMeetingEnter() {
    gsap.to(meetingTooltipRef.current, {
      opacity: 1,
      y: 0,
      xPercent: -50,
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function handleMeetingLeave() {
    gsap.to(meetingTooltipRef.current, {
      opacity: 0,
      y: 4,
      xPercent: -50,
      duration: 0.2,
      ease: "power2.in",
      overwrite: true,
    });
  }

  function handleEmailEnter() {
    gsap.to(emailAddressRef.current, {
      yPercent: -220,
      duration: 0.4,
      opacity: 0,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(emailBriefRef.current, {
      yPercent: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });

    // Three identical units, so one full unit is exactly a third of the track:
    // at -1/3 the second copy sits where the first started and the repeat is
    // seamless. -50% would stop mid-pattern and visibly jump.
    emailMarqueeTween.current?.kill();
    gsap.set(emailMarqueeRef.current, { xPercent: 0 });
    emailMarqueeTween.current = gsap.to(emailMarqueeRef.current, {
      xPercent: -100 / 3,
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }

  function handleEmailLeave() {
    gsap.to(emailAddressRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(emailBriefRef.current, {
      yPercent: 100,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        emailMarqueeTween.current?.kill();
        emailMarqueeTween.current = null;
        gsap.set(emailMarqueeRef.current, { xPercent: 0 });
      },
    });
  }

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-nav-work]", list);
      if (!items.length) return;

      const links = items.map((item) => item.parentElement as HTMLElement);

      const cardHeight = links[0].offsetHeight;
      const step = cardHeight + 6;

      const tl = gsap.timeline();

      if (isCollapsed) {
        list.scrollTop = 0;

        tl.to(
          stackHandleRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          0,
        )
          .to(
            links,
            {
              y: (i: number) => -i * step,
              duration: 0.5,
              ease: "power3.out",
              transformOrigin: "center top",
            },
            0,
          )
          .to(
            list,
            {
              height:
                cardHeight + parseFloat(getComputedStyle(list).paddingBottom),
              duration: 0.5,
              ease: "power3.out",
            },
            0,
          );
      } else {
        tl.to(
          stackHandleRef.current,
          { opacity: 0, y: -4, duration: 0.3, ease: "power3.in" },
          0,
        )
          .to(
            links,
            {
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            0,
          )
          .to(
            list,
            {
              height: list.scrollHeight,
              duration: 0.5,
              ease: "power3.out",
              clearProps: "height",
            },
            0,
          );
      }
    },
    { dependencies: [isCollapsed], scope: listRef },
  );

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-nav-work]", list);
      if (!items.length) return;

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

      const startDelay = gsap.delayedCall(0.55, () => {
        update();
        list.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
      });

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

      const update = () => {
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
          setters[i].scaleX(scale);
          setters[i].scaleY(scale);
          setters[i].opacity(0.15 + 0.85 * eased);
          setters[i].x(-6 * (1 - eased));
        });
      };

      return () => {
        startDelay.kill();
        list.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    },
    { dependencies: [isCollapsed], scope: listRef },
  );

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
            <h1 className="text-[#0c0c0c] leading-[1.1] text-xl tracking-[-0.12px]">
              We shape brands that need no introduction.
            </h1>

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
                  className="absolute inset-0 flex items-center overflow-hidden"
                >
                  <span
                    ref={emailMarqueeRef}
                    className="flex items-center w-max"
                  >
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="flex items-center">
                        <span className="whitespace-nowrap px-2 text-[#0c0c0c] leading-[0.9] text-sm tracking-[-0.07px]">
                          Send your brief
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#0c0c0c]"></span>
                      </span>
                    ))}
                  </span>
                </span>
              </a>

              <a
                id="nav-cta-meeting"
                href="https://cal.com/anagram/hello"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMeetingEnter}
                onMouseLeave={handleMeetingLeave}
                className="relative flex items-center justify-center size-9.25 shrink-0 rounded-full bg-[#f5f5f5]"
              >
                <Calendar />
                <span
                  ref={meetingTooltipRef}
                  id="nav-cta-meeting-tooltip"
                  className="absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-full bg-[#0c0c0c] px-3 py-1.5 text-[0.625rem] leading-[0.9] text-white opacity-0 pointer-events-none"
                >
                  Book a meeting
                </span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="self-start text-[#0c0c0c] font-medium leading-[0.8] text-sm transition-opacity"
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  {link.label}
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
          onMouseEnter={() => isStacked && setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => isStacked && setIsExpanded(true)}
          className="flex min-h-0 flex-col justify-end"
        >
          {/* Poignée affichée quand la liste est repliée en pile */}
          <div
            id="nav-works-stack-handle"
            ref={stackHandleRef}
            aria-hidden="true"
            className="mx-auto mb-1.5 h-0.75 w-8 shrink-0 rounded-full bg-[#e0e0e0] opacity-0"
          />

          <div
            id="nav-works-list"
            ref={listRef}
            className={`flex min-h-0 flex-col gap-1.5 pl-3 pr-1.5 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden ${
              isCollapsed ? "overflow-hidden pt-0" : "overflow-y-auto pt-14"
            }`}
          >
            {navWorks.map((work, i) => (
              <Link
                key={work.name}
                href={work.href}
                // Ordre d'empilement statique : la première carte au-dessus. En
                // CSS plutôt qu'animé, sinon GSAP interpole le zIndex depuis
                // `auto` et la carte 1 passe sous les suivantes au repli.
                style={{ zIndex: navWorks.length - i }}
                className="relative shrink-0"
              >
                <div
                  data-nav-work
                  className="flex items-center gap-3 p-2 transition-colors bg-[#f9f9f9] hover:bg-[#ededed]"
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
