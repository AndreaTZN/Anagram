"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { OpenRole } from "../OpenRoles";

gsap.registerPlugin(useGSAP);

const VISIBLE = 3;
const ROTATE_DELAY = 3.5;

export default function RolesStackWidget({ roles }: { roles: OpenRole[] }) {
  const [front, setFront] = useState(0);
  const [maxHeight, setMaxHeight] = useState<number>();
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useGSAP(
    () => {
      if (roles.length <= 1) return;
      intervalRef.current = setInterval(
        () => setFront((f) => (f + 1) % roles.length),
        ROTATE_DELAY * 1000,
      );
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    },
    { scope: stackRef, dependencies: [roles.length] },
  );

  function handleAdvance() {
    if (roles.length <= 1) return;
    setFront((f) => (f + 1) % roles.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setFront((f) => (f + 1) % roles.length),
      ROTATE_DELAY * 1000,
    );
  }

  useGSAP(
    () => {
      const measure = () =>
        setMaxHeight(
          Math.max(
            ...cardRefs.current.map(
              (c) =>
                (c.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0,
            ),
            0,
          ) + 32, // p-4 top + bottom (2rem)
        );
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    },
    { scope: stackRef, dependencies: [roles.length] },
  );

  if (!roles.length) return null;

  return (
    <div
      id="widget-roles"
      ref={stackRef}
      onClick={handleAdvance}
      className="relative w-full cursor-pointer"
      style={{ height: maxHeight }}
    >
      {roles.map((role, i) => {
        const depth = (i - front + roles.length) % roles.length;
        return (
          <RoleCard
            key={role._id}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            role={role}
            depth={depth >= VISIBLE ? VISIBLE : depth}
            hidden={depth >= VISIBLE}
            stretch={maxHeight !== undefined}
          />
        );
      })}
    </div>
  );
}

function RoleCard({
  role,
  depth,
  hidden = false,
  stretch = false,
  ref,
}: {
  role: OpenRole;
  depth: number;
  hidden?: boolean;
  stretch?: boolean;
  ref?: (el: HTMLDivElement | null) => void;
}) {
  const localRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(localRef.current, {
        y: depth * 11,
        scale: 1 - depth * 0.03,
        opacity: hidden ? 0 : 1 - depth * 0.15,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { dependencies: [depth, hidden] },
  );

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        ref?.(el);
      }}
      className={`absolute inset-x-0 ${stretch ? "inset-y-0" : "top-0"} flex items-start p-4 rounded-lg bg-white drop-shadow-[0_0.25rem_5rem_rgba(0,0,0,0.1)] will-change-transform`}
      style={{ zIndex: 10 - depth }}
    >
      <div className="flex flex-1 flex-col gap-2 items-center justify-center min-w-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center min-w-0">
            <div
              className={`size-2 rounded-full shrink-0 ${role.available ? "bg-[#57E085]" : "bg-[#FF381E]"}`}
            />
            <span className="text-base font-medium leading-[1.6] text-[#0c0c0c] whitespace-nowrap">
              {role.title}
            </span>
          </div>
          <div className="flex items-center justify-center rounded-full bg-[#f5f5f5] backdrop-blur-md p-2">
            <span className="text-sm leading-[0.8] text-center text-[#0c0c0c] whitespace-nowrap">
              {role.location === "onsite" ? "On-site" : "Remote"}
            </span>
          </div>
        </div>
        <p className="w-full text-sm leading-[1.3] text-[#7e7e7e]">
          {role.description}
        </p>
      </div>
    </div>
  );
}
