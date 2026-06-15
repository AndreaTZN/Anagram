"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const TARGET = 12365;

export default function VisitorsWidget() {
  const countRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: TARGET,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.2,
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(obj.value).toLocaleString(
              "en-US",
            );
          }
        },
      });
    },
    { scope: countRef },
  );

  return (
    <div
      id="widget-visitors"
      className="flex flex-col items-start gap-8 justify-between bg-white rounded-lg p-2 overflow-hidden"
    >
      <div className="flex items-center justify-between w-full">
        <div className="h-5 w-3.5 shrink-0 text-[#0c0c0c]">
          <svg
            viewBox="0 0 13.5781 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block size-full"
            aria-label="Visitor"
          >
            <path
              fill="currentColor"
              d="M4.98664 2.50302C4.97026 2.50536 4.91763 2.51355 4.86967 2.52056C4.76673 2.53577 4.56671 2.60011 4.46728 2.6504C4.14093 2.81534 3.8871 3.09958 3.76778 3.43178C3.69994 3.61894 3.67187 3.88681 3.69877 4.0763C3.81106 4.84949 4.54214 5.38055 5.33522 5.26358C6.0394 5.15947 6.55408 4.57929 6.55408 3.88915C6.55408 3.13935 5.94114 2.52641 5.16795 2.50185C5.0849 2.49951 5.00302 2.49951 4.98664 2.50302Z"
            />
            <path
              fill="currentColor"
              d="M4.1253 5.61092C4.27668 5.52801 4.45282 5.49962 4.6239 5.53196L5.00991 5.60507C5.15971 5.63339 5.29773 5.70626 5.4047 5.81489L7.7288 8.17555L9.5894 9.41619C9.93341 9.64553 10.0264 10.1103 9.79702 10.4543C9.56766 10.7983 9.10288 10.8913 8.75889 10.6619L6.83469 9.3789C6.79207 9.35049 6.75219 9.31744 6.71625 9.28094L5.2731 7.81585L4.68166 10.1875L7.61402 13.1293C7.70754 13.2231 7.77493 13.3404 7.80849 13.4686L8.61852 16.5618C8.7232 16.9616 8.48393 17.3708 8.0841 17.4756C7.68421 17.5803 7.27509 17.341 7.17025 16.9412L6.40993 14.0425L4.21084 11.8361L3.60331 13.8721C3.58082 13.9475 3.54639 14.0187 3.50169 14.0834L1.36402 17.1766C1.12901 17.5167 0.663099 17.6023 0.322957 17.3674C-0.0171955 17.1324 -0.102158 16.6658 0.132876 16.3256L2.20183 13.3304L3.12811 10.2291L3.76781 7.66452L2.42408 8.58495L1.92402 10.8023C1.83284 11.2055 1.43166 11.4585 1.02845 11.3674C0.625241 11.2763 0.372274 10.8751 0.463324 10.4719L1.02845 7.96865C1.0701 7.78453 1.17977 7.62281 1.3355 7.51611L4.0617 5.64966L4.1253 5.61092Z"
            />
          </svg>
        </div>

        <div className="flex items-center justify-center rounded-full bg-[#f5f5f5] backdrop-blur-md px-2 py-2">
          <span className="text-base leading-[0.8] text-[#0c0c0c] whitespace-nowrap">
            Visitors
          </span>
        </div>
      </div>

      <p
        ref={countRef}
        className="text-[2rem] leading-[1.6] text-[#0c0c0c] whitespace-nowrap"
      >
        0
      </p>
    </div>
  );
}
