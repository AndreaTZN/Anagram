"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const VARIANTS = {
  dark: {
    className: "bg-[#0c0c0c] text-white",
    rest: "#0c0c0c",
    hover: "#2e2e2e",
  },
  light: {
    className: "bg-[#f5f5f5] text-[#0c0c0c]",
    rest: "#f5f5f5",
    hover: "#ededed",
  },
};

export default function CtaLink({
  id,
  href,
  label,
  variant,
}: {
  id: string;
  href: string;
  label: string;
  variant: keyof typeof VARIANTS;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { rest, hover, className } = VARIANTS[variant];
  const { contextSafe } = useGSAP({ scope: linkRef });

  const animate = contextSafe((hovered: boolean) => {
    gsap.to(linkRef.current, {
      backgroundColor: hovered ? hover : rest,
      duration: 0.3,
      ease: hovered ? "power2.out" : "power2.in",
      overwrite: true,
    });
  });

  return (
    <a
      id={id}
      ref={linkRef}
      href={href}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      className={`w-fit rounded-full text-sm px-5 py-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0c0c0c] ${className}`}
    >
      {label}
    </a>
  );
}
