"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(useGSAP);

type ServiceItem = {
  id: string;
  name: string;
  tag: string;
  description: string;
};

type Props = {
  idPrefix: string;
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: ServiceItem[];
};

function ServicesAccordion({
  idPrefix,
  items,
}: {
  idPrefix: string;
  items: ServiceItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openIndexRef = useRef<number | null>(null);

  useGSAP(
    () => {
      const answers = gsap.utils.toArray<HTMLElement>(
        ".services-accordion_answer",
        containerRef.current,
      );
      answers.forEach((el) => gsap.set(el, { height: 0, opacity: 0 }));
    },
    { scope: containerRef },
  );

  function toggle(index: number) {
    const el = containerRef.current;
    if (!el) return;
    const answers = el.querySelectorAll<HTMLElement>(
      ".services-accordion_answer",
    );
    const verticals = el.querySelectorAll<HTMLElement>(
      ".services-accordion_icon-vertical",
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
    <div ref={containerRef} className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={item.id}
          id={`${idPrefix}-${item.id}`}
          className="flex flex-col gap-2 py-4 border-t border-[#0c0c0c]/10 first:border-t-0"
        >
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            className="flex items-center justify-between gap-4 w-full cursor-pointer text-left"
          >
            <h3 className="text-[#0c0c0c] text-sm font-medium leading-[1.1]">
              {item.name}
            </h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[#7e7e7e] text-xs leading-[1.1]">
                {item.tag}
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
                  className="text-[#0c0c0c]"
                />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="services-accordion_icon-vertical text-[#0c0c0c]"
                />
              </svg>
            </div>
          </button>
          <div className="services-accordion_answer overflow-hidden">
            <p className="text-[#7e7e7e] text-sm leading-[1.4] pt-1">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPanel({
  idPrefix,
  eyebrow,
  heading,
  subtitle,
  items,
}: Props) {
  const useAccordion = items.length > 5;

  return (
    <aside
      id={idPrefix}
      className="sticky top-4 flex flex-col gap-8 self-start max-[992px]:static"
    >
      <div className="flex flex-col gap-2">
        <SectionHeader eyebrow={eyebrow} heading={heading} />

        {subtitle && (
          <p className="text-[#7e7e7e] text-sm leading-[1.4]">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-col gap-8 pl-8 max-[766px]:pl-0">
        {useAccordion ? (
          <>
            <div className="max-[992px]:hidden">
              <ServicesAccordion idPrefix={idPrefix} items={items} />
            </div>
            <div className="hidden max-[992px]:flex max-[992px]:flex-col">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 py-4 border-t border-[#0c0c0c]/10 first:border-t-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[#0c0c0c] text-sm font-medium leading-[1.1]">
                      {item.name}
                    </h3>
                    <span className="text-[#7e7e7e] text-xs leading-[1.1] shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[#7e7e7e] text-sm leading-[1.4]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                id={`${idPrefix}-${item.id}`}
                className="flex flex-col gap-2 py-4 border-t border-[#0c0c0c]/10 first:border-t-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[#0c0c0c] text-sm font-medium leading-[1.1]">
                    {item.name}
                  </h3>
                  <span className="text-[#7e7e7e] text-xs leading-[1.1] shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[#7e7e7e] text-sm leading-[1.4]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
