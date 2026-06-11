"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PhoneProps = {
  src: string;
  alt?: string;
};

type Props = {
  phone1: PhoneProps;
  phone2: PhoneProps;
  phone3: PhoneProps;
  phone4: PhoneProps;
  bgColor?: string;
};

export default function FourPhones({ phone1, phone2, phone3, phone4, bgColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const phones = phoneRefs.current.filter(Boolean);
    const container = containerRef.current;
    if (!container || phones.length === 0) return;

    gsap.set(phones, { y: "2rem", opacity: 0 });

    const scroller = document.getElementById("smooth-scroll-container");

    const st = ScrollTrigger.create({
      trigger: container,
      scroller: scroller ?? undefined,
      start: "top 90%",
      onEnter: () => {
        gsap.to(phones, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
        });
      },
    });

    return () => {
      st.kill();
      gsap.set(phones, { clearProps: "all" });
    };
  }, []);

  const phones = [phone1, phone2, phone3, phone4];

  return (
    <div
      className="fourphones_component w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        ref={containerRef}
        className="fourphones_container aspect-video flex items-end justify-center gap-6 py-10"
      >
        {phones.map(({ src, alt }, i) => (
          <div
            key={i}
            ref={(el) => {
              phoneRefs.current[i] = el;
            }}
            className="fourphones_phone relative h-[80%] max-w-80 aspect-170/348"
          >
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              sizes="(max-width: 1460px) 22vw, 320px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
