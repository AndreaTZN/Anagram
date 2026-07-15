"use client";

import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCaseNav } from "@/contexts/CaseNavContext";

gsap.registerPlugin(useGSAP);

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  title?: string;
};

export default function Faq({ items, title = "FAQ" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const openIndexRef = useRef<number | null>(0);
  const { activeTab } = useCaseNav();
  const isFirst = useRef(true);

  useGSAP(
    () => {
      const answers = gsap.utils.toArray<HTMLElement>(
        ".faq_answer",
        containerRef.current,
      );
      answers.forEach((el, i) => {
        gsap.set(el, i === 0 ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 });
      });

      const verticals = gsap.utils.toArray<HTMLElement>(
        ".faq_icon-vertical",
        containerRef.current,
      );
      verticals.forEach((el, i) => {
        gsap.set(el, { scaleY: i === 0 ? 0 : 1, transformOrigin: "50% 50%" });
      });
    },
    { scope: containerRef },
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const dark = activeTab === "backstage";
    const duration = isFirst.current ? 0 : 0.5;
    isFirst.current = false;

    gsap.to(el.querySelectorAll(".faq-primary"), {
      color: dark ? "#ffffff" : "#0c0c0c",
      duration,
      ease: "power2.inOut",
    });
    gsap.to(el.querySelectorAll(".faq-muted"), {
      color: dark ? "#9e9e9e" : "#7c7c7c",
      duration,
      ease: "power2.inOut",
    });
  }, [activeTab]);

  function toggle(index: number) {
    const el = containerRef.current;
    if (!el) return;
    const answers = el.querySelectorAll<HTMLElement>(".faq_answer");
    const verticals = el.querySelectorAll<HTMLElement>(".faq_icon-vertical");
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
        gsap.to(verticals[current], { scaleY: 1, duration: 0.35, ease: "power2.inOut" });
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
        gsap.to(verticals[next], { scaleY: 0, duration: 0.35, ease: "power2.inOut" });
      }
    }

    openIndexRef.current = next;
    setOpenIndex(next);
  }

  return (
    <div ref={containerRef} className="faq_component flex flex-col gap-4 pt-8 w-full">
      <p className="faq-primary text-[#0c0c0c] text-[1.125rem] leading-[1.1] tracking-[-0.09px]">
        {title}
      </p>

      <div className="faq_list flex flex-col gap-4 w-full">
        {items.map((item, i) => (
          <div key={i} className="faq_item flex flex-col gap-1 w-full">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              className="flex items-center justify-between gap-4 w-full cursor-pointer text-left"
            >
              <span className="faq-primary text-[#0c0c0c] text-[0.8125rem] leading-[0.9]">
                {item.question}
              </span>
              <svg
                width="10"
                height="10"
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
                  className="faq-primary text-[#0c0c0c]"
                />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="faq_icon-vertical faq-primary text-[#0c0c0c]"
                />
              </svg>
            </button>
            <div className="faq_answer overflow-hidden">
              <p className="faq-muted text-[#7c7c7c] text-sm leading-[1.3] pr-16 pt-1">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
