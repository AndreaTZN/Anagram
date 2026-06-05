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
};

export default function ThreePhones({ phone1, phone2, phone3 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);
  const phone3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const phones = [phone1Ref.current, phone2Ref.current, phone3Ref.current];
    const container = containerRef.current;
    if (!container || phones.some((p) => !p)) return;

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

  const phones = [
    { ...phone1, ref: phone1Ref },
    { ...phone2, ref: phone2Ref },
    { ...phone3, ref: phone3Ref },
  ];

  return (
    <div className="threephones_component w-full overflow-hidden">
      <div
        ref={containerRef}
        className="threephones_container aspect-video flex items-end justify-center gap-6 py-10"
      >
        {phones.map(({ src, alt, ref }, i) => (
          <div key={i} ref={ref} className="threephones_phone relative h-[80%] max-w-80 aspect-170/348">
            <Image
              src={src}
              alt={alt ?? ""}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
