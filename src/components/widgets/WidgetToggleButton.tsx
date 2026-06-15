"use client";

import { RefObject } from "react";
import WorldClock from "./WorldClock";

interface WidgetToggleButtonProps {
  buttonRef: RefObject<HTMLButtonElement | null>;
  verticalPathRef: RefObject<SVGPathElement | null>;
  onClick: () => void;
}

export default function WidgetToggleButton({
  buttonRef,
  verticalPathRef,
  onClick,
}: WidgetToggleButtonProps) {
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-12 px-4 py-4 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)] cursor-pointer overflow-hidden opacity-0"
    >
      <div className="flex items-center gap-1.5">
        <WorldClock />
      </div>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M0 7.50293C0 7.08872 0.335786 6.75293 0.75 6.75293L14.25 6.75293C14.6642 6.75293 15 7.08872 15 7.50293C15 7.91714 14.6642 8.25293 14.25 8.25293H0.75C0.335787 8.25293 0 7.91714 0 7.50293Z"
          fill="white"
        />
        <path
          ref={verticalPathRef}
          d="M7.51172 0C7.92593 1.81058e-08 8.26172 0.335786 8.26172 0.75L8.26172 14.25C8.26172 14.6642 7.92593 15 7.51172 15C7.0975 15 6.76172 14.6642 6.76172 14.25L6.76172 0.75C6.76172 0.335787 7.09751 -1.81058e-08 7.51172 0Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
