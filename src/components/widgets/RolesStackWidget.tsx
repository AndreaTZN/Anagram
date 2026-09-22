"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { OpenRole } from "../OpenRoles";

gsap.registerPlugin(useGSAP);

const CARD_STEP_REM = 4.875;
const CARD_SHADOW = "0 0.1875rem 0.875rem rgba(0, 0, 0, 0.025)";
const ACTIVE_SHADOW = "0 1rem 1.875rem rgba(0, 0, 0, 0.11)";

export default function RolesStackWidget({
  roles,
  active = true,
}: {
  roles: OpenRole[];
  active?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const stack = stackRef.current;
      if (!stack || !contextSafe) return;

      const cards = Array.from(
        stack.querySelectorAll<HTMLElement>("[data-role-card]"),
      );
      const extraCards = cards.slice(1);
      const trigger = stack.querySelector<HTMLButtonElement>("button");
      const badge = stack.querySelector("[data-role-count]");
      const bridge = stack.querySelector("[data-role-bridge]");
      const videos = Array.from(stack.querySelectorAll("video"));
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let open = false;
      let pointerInside = false;
      let closeTimer: ReturnType<typeof setTimeout> | undefined;
      let badgeTimeline: gsap.core.Timeline | undefined;

      setExpanded(false);
      if (extraCards.length) {
        gsap.set(extraCards, { autoAlpha: 0, y: 0, pointerEvents: "none" });
      }

      function syncVideos() {
        videos.forEach((video, index) => {
          if (
            active &&
            !document.hidden &&
            !motion.matches &&
            (index === 0 || open)
          ) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }

      const animateBadge = contextSafe((visible: boolean) => {
        if (!badge) return;
        badgeTimeline?.kill();
        if (motion.matches) {
          gsap.set(badge, { autoAlpha: visible ? 1 : 0, scale: 1, x: 0, y: 0 });
          return;
        }

        badgeTimeline = gsap.timeline();
        if (visible) {
          badgeTimeline
            .set(badge, {
              autoAlpha: 0,
              scale: 0.76,
              x: "-0.1875rem",
              y: "0.1875rem",
            })
            .to(badge, {
              autoAlpha: 1,
              scale: 1.05,
              x: 0,
              y: 0,
              duration: 0.36,
              ease: "back.out(1.35)",
            })
            .to(badge, { scale: 1, duration: 0.14, ease: "sine.inOut" });
        } else {
          badgeTimeline
            .to(badge, { scale: 1.04, duration: 0.1, ease: "sine.out" })
            .to(badge, {
              autoAlpha: 0,
              scale: 0.76,
              x: "-0.1875rem",
              y: "0.1875rem",
              duration: 0.2,
              ease: "back.in(1.25)",
            });
        }
      });

      const resetMagnification = contextSafe(() => {
        gsap.to(cards, {
          scale: 1,
          boxShadow: CARD_SHADOW,
          duration: motion.matches ? 0 : 0.42,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      const magnifyCard = contextSafe((activeIndex: number) => {
        if (!active || motion.matches) return;
        cards.forEach((card, index) => {
          const distance = Math.abs(index - activeIndex);
          gsap.set(card, {
            zIndex: distance === 0 ? 5 : distance === 1 ? 3 : 1,
          });
          gsap.to(card, {
            scale: distance === 0 ? 1.035 : distance === 1 ? 1.012 : 1,
            boxShadow: distance === 0 ? ACTIVE_SHADOW : CARD_SHADOW,
            duration: 0.65,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      });

      const finishClose = contextSafe(() => {
        if (extraCards.length) {
          gsap.set(extraCards, {
            autoAlpha: 0,
            pointerEvents: "none",
            zIndex: -1,
          });
        }
        if (bridge) gsap.set(bridge, { pointerEvents: "none" });
        gsap.set(cards[0], { zIndex: 10 });
        animateBadge(true);
      });

      // Reverse the same timeline so rapid pointer changes never queue a second opening.
      const timeline = gsap.timeline({
        paused: true,
        onReverseComplete: finishClose,
      });
      if (extraCards.length) {
        timeline.to(extraCards, {
          y: (index) => `${CARD_STEP_REM * (index + 1)}rem`,
          duration: 0.38,
          stagger: 0.02,
          ease: "power3.inOut",
        });
      }

      const openStack = contextSafe(() => {
        clearTimeout(closeTimer);
        if (!active || open || !extraCards.length) return;
        open = true;
        setExpanded(true);
        if (bridge) gsap.set(bridge, { pointerEvents: "auto" });
        gsap.set(cards[0], { zIndex: 2 });
        gsap.set(extraCards, {
          autoAlpha: 1,
          pointerEvents: "auto",
          zIndex: 1,
        });
        animateBadge(false);
        if (motion.matches) timeline.progress(1).pause();
        else timeline.timeScale(1).play();
        syncVideos();
      });

      const closeStack = contextSafe(() => {
        clearTimeout(closeTimer);
        resetMagnification();
        if (!open) return;
        open = false;
        setExpanded(false);
        gsap.set(cards[0], { zIndex: 10 });
        gsap.set(extraCards, { pointerEvents: "none", zIndex: 1 });
        if (motion.matches || timeline.progress() === 0) {
          timeline.pause(0, true);
          finishClose();
        } else {
          timeline.timeScale(1.35).reverse();
        }
        syncVideos();
      });

      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(
          () => {
            const focused = document.activeElement;
            const keyboardFocusInside =
              focused instanceof HTMLElement &&
              stack?.contains(focused) &&
              focused.matches(":focus-visible");
            if (pointerInside || keyboardFocusInside) return;
            closeStack();
          },
          motion.matches ? 0 : 45,
        );
      }

      function handleEnter(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        pointerInside = true;
        openStack();
      }

      function handleLeave(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        pointerInside = false;
        resetMagnification();
        scheduleClose();
      }

      function handleFocus(event: FocusEvent) {
        const target = event.target;
        if (
          !(target instanceof HTMLElement) ||
          !target.matches(":focus-visible")
        )
          return;
        openStack();
        const card = target.closest<HTMLElement>("[data-role-card]");
        if (card) magnifyCard(cards.indexOf(card));
      }

      function handleClick(event: MouseEvent) {
        // Mouse users already open on hover; clicks also support keyboard and touch.
        if (
          event.detail > 0 &&
          (event as PointerEvent).pointerType !== "touch" &&
          window.matchMedia("(hover: hover)").matches
        )
          return;
        if (open) closeStack();
        else openStack();
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key !== "Escape" || !open) return;
        event.preventDefault();
        event.stopPropagation();
        trigger?.focus({ preventScroll: true });
        closeStack();
      }

      const handleMotionChange = contextSafe(() => {
        if (motion.matches) {
          resetMagnification();
          timeline.pause(open ? timeline.duration() : 0, true);
          if (!open) finishClose();
          animateBadge(!open);
        }
        syncVideos();
      });

      const cardHandlers = cards.map((card, index) => {
        const enter = (event: PointerEvent) => {
          if (event.pointerType !== "touch") magnifyCard(index);
        };
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", resetMagnification);
        return { card, enter };
      });

      stack.addEventListener("pointerenter", handleEnter);
      stack.addEventListener("pointerleave", handleLeave);
      stack.addEventListener("focusin", handleFocus);
      stack.addEventListener("focusout", scheduleClose);
      stack.addEventListener("keydown", handleKeyDown);
      trigger?.addEventListener("click", handleClick);
      document.addEventListener("visibilitychange", syncVideos);
      motion.addEventListener("change", handleMotionChange);
      syncVideos();

      return () => {
        clearTimeout(closeTimer);
        stack.removeEventListener("pointerenter", handleEnter);
        stack.removeEventListener("pointerleave", handleLeave);
        stack.removeEventListener("focusin", handleFocus);
        stack.removeEventListener("focusout", scheduleClose);
        stack.removeEventListener("keydown", handleKeyDown);
        trigger?.removeEventListener("click", handleClick);
        document.removeEventListener("visibilitychange", syncVideos);
        motion.removeEventListener("change", handleMotionChange);
        cardHandlers.forEach(({ card, enter }) => {
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", resetMagnification);
        });
        videos.forEach((video) => video.pause());
      };
    },
    { scope: stackRef, dependencies: [roles, active], revertOnUpdate: true },
  );

  if (!roles.length) return null;

  return (
    <div id="home-roles" inert={!active} className="flex w-full justify-center">
      <div
        id="home-roles-stack"
        ref={stackRef}
        role="group"
        aria-label="Open roles"
        className="relative isolate w-max max-w-full"
      >
        <RoleCard
          role={roles[0]}
          index={0}
          count={roles.length}
          expanded={expanded}
          active={active}
        />
        {roles.length > 1 && (
          <>
            <div
              id="home-roles-extra-cards"
              aria-hidden={!expanded}
              inert={!expanded}
            >
              {roles.slice(1).map((role, index) => (
                <RoleCard
                  key={role._id}
                  role={role}
                  index={index + 1}
                  count={roles.length}
                  expanded={expanded}
                  active={active}
                />
              ))}
            </div>
            <span
              id="home-roles-hover-bridge"
              data-role-bridge
              aria-hidden="true"
              className="pointer-events-none absolute -left-2.5 top-0 z-0 w-[calc(100%+1.25rem)]"
              style={{
                height: `${4.25 + CARD_STEP_REM * (roles.length - 1)}rem`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function RoleCard({
  role,
  index,
  count,
  expanded,
  active,
}: {
  role: OpenRole;
  index: number;
  count: number;
  expanded: boolean;
  active: boolean;
}) {
  const isFirst = index === 0;
  const isTrigger = isFirst && count > 1;
  const Card = isTrigger ? "button" : "article";
  const id = `home-roles-card-${index}`;
  // Sanity provides text only; pair code roles with the supplied coding artwork.
  const video = /cod|develop|engineer|dévelop/i.test(role.title)
    ? "/roles/creative-coder.mp4"
    : "/roles/visual-designer.mp4";

  return (
    <Card
      id={id}
      data-role-card
      type={isTrigger ? "button" : undefined}
      tabIndex={isFirst || expanded ? 0 : -1}
      aria-expanded={isTrigger ? expanded : undefined}
      aria-controls={isTrigger ? "home-roles-extra-cards" : undefined}
      aria-describedby={`${id}-description`}
      className={`flex max-w-full cursor-default origin-bottom items-center gap-4 rounded-lg border-[0.0625rem] border-white/70 bg-white p-2 pr-8 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c0c0c] ${
        isFirst
          ? "relative z-2"
          : "pointer-events-none invisible absolute left-0 top-0 z-[-1] w-full opacity-0"
      }`}
      style={{ boxShadow: CARD_SHADOW }}
    >
      {isFirst && (
        <span
          id="home-roles-count"
          data-role-count
          aria-label={`${count} ${count === 1 ? "role" : "roles"}`}
          className="absolute -right-2.5 -top-2.5 z-2 grid size-6 place-items-center rounded-full bg-[#f5f5f5] text-xs font-medium leading-none text-black"
        >
          {count}
        </span>
      )}
      <video
        id={`${id}-video`}
        src={active ? video : undefined}
        preload={active ? "auto" : "none"}
        loop
        muted
        playsInline
        aria-hidden="true"
        className="block size-[3.125rem] shrink-0 rounded-lg bg-[#f5f5f5] object-cover"
      />
      <span id={`${id}-content`} className="flex min-w-0 flex-col gap-1">
        <span
          id={`${id}-location`}
          className="truncate text-sm leading-tight text-[#b5b5b8]"
        >
          {role.location === "onsite" ? "On-site" : "Remote"}
          {!role.available && " · Not available"}
        </span>
        <span
          id={`${id}-title`}
          className="truncate text-sm font-medium leading-tight text-[#252525]"
        >
          {role.title}
        </span>
      </span>
      <span id={`${id}-description`} className="sr-only">
        {role.description}
      </span>
    </Card>
  );
}
