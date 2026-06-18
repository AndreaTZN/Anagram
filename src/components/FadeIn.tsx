"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function FadeIn({ children, className, id }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className} id={id}>
      {children}
    </div>
  );
}
