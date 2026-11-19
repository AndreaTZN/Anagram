"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { type ArrowWebGLHandle } from "@/components/icons/ArrowWebGL";
import Badge from "./Badge";

gsap.registerPlugin(useGSAP);

interface Props {
  name: string;
  description?: string;
  src: string;
  href?: string;
  aspect: string;
}

export default function ToolCard({
  name,
  description,
  src,
  href,
  aspect,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<ArrowWebGLHandle>(null);

  useGSAP(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  function handleEnter() {
    if (!href) return;
    gsap.to(overlayRef.current, {
      opacity: 0.08,
      duration: 0.3,
      ease: "power2.out",
    });
    arrowRef.current?.play();
  }

  function handleLeave() {
    if (!href) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }

  const content = (
    <>
      {href && <Badge label="Try now" arrow arrowRef={arrowRef} />}

      {/* Logo centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1535px) 25vw, 20vw"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0c0c0c] opacity-0 pointer-events-none"
      />

      {/* Name + description bottom left */}
      <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-2">
        <span className="font-medium text-sm leading-[0.9] text-white">
          {name}
        </span>
        {description && (
          <p className="text-sm leading-[1.3] text-[#7e7e7e] whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </>
  );

  if (!href) {
    return (
      <div className={`relative ${aspect} overflow-hidden`}>{content}</div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block ${aspect} overflow-hidden`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {content}
    </a>
  );
}
