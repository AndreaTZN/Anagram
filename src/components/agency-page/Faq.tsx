"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  idPrefix: string;
  items: FaqItem[];
};

export default function Faq({ idPrefix, items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const openIndexRef = useRef<number | null>(0);

  useGSAP(
    () => {
      const answers = gsap.utils.toArray<HTMLElement>(
        ".agency-faq_answer",
        containerRef.current,
      );
      answers.forEach((el, i) => {
        gsap.set(
          el,
          i === 0 ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 },
        );
      });

      const verticals = gsap.utils.toArray<HTMLElement>(
        ".agency-faq_icon-vertical",
        containerRef.current,
      );
      verticals.forEach((el, i) => {
        gsap.set(el, { scaleY: i === 0 ? 0 : 1, transformOrigin: "50% 50%" });
      });
    },
    { scope: containerRef },
  );

  function toggle(index: number) {
    const el = containerRef.current;
    if (!el) return;
    const answers = el.querySelectorAll<HTMLElement>(".agency-faq_answer");
    const verticals = el.querySelectorAll<HTMLElement>(
      ".agency-faq_icon-vertical",
    );
    const current = openIndexRef.current;
    const next = current === index ? null : index;

    if (current !== null && answers[current]) {
      gsap.to(answers[current], {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      if (verticals[current]) {
        gsap.to(verticals[current], {
          scaleY: 1,
          duration: 0.35,
          ease: "power2.inOut",
        });
      }
    }
    if (next !== null && answers[next]) {
      gsap.to(answers[next], {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      });
      if (verticals[next]) {
        gsap.to(verticals[next], {
          scaleY: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
      }
    }

    openIndexRef.current = next;
    setOpenIndex(next);
  }

  return (
    <div ref={containerRef} id={idPrefix} className="flex flex-col w-full">
      {items.map((item, i) => (
        <div
          key={item.question}
          id={`${idPrefix}-item-${i}`}
          className="flex flex-col gap-1 w-full py-6 border-t border-[#0c0c0c]/10 first:border-t-0 first:pt-0 last:pb-0"
        >
          <h3>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              className="flex items-center justify-between gap-4 w-full cursor-pointer text-left"
            >
              <span className="text-[#0c0c0c] text-lg leading-[1.1]">
                {item.question}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="none"
                className="shrink-0"
              >
                <line
                  x1="0"
                  y1="5"
                  x2="10"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[#0c0c0c]"
                />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="agency-faq_icon-vertical text-[#0c0c0c]"
                />
              </svg>
            </button>
          </h3>
          <div className="agency-faq_answer overflow-hidden">
            <p className="text-[#7e7e7e] text-sm leading-[1.4] pr-16 pt-1">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
