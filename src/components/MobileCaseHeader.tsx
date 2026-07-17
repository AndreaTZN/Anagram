"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCaseNav } from "@/contexts/CaseNavContext";
import { getCaseOrigin } from "@/lib/case-origin";

export default function MobileCaseHeader() {
  const router = useRouter();
  const { data, activeTab, setActiveTab } = useCaseNav();
  if (!data?.title) return null;

  const dark = activeTab === "backstage";
  const primary = dark ? "text-white" : "text-[#0c0c0c]";

  return (
    <div
      id="case-mobile-header"
      className="hidden max-[992px]:flex flex-col gap-4 pb-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={`text-[1.5rem] font-medium leading-[1.1] tracking-[-0.14px] ${primary}`}
        >
          {data.title}
        </p>
        <Link
          id="case-mobile-close"
          href="/works"
          className="flex items-center gap-2 shrink-0 pt-2 text-sm leading-[0.9] tracking-[-0.07px] text-[#868686]"
          onClick={(e) => {
            e.preventDefault();
            router.push(getCaseOrigin());
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Close project
        </Link>
      </div>

      <p className={`text-base leading-[1.3] ${primary}`}>{data.description}</p>

      {data.liveUrl && (
        <a
          id="case-mobile-live"
          href={data.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-base leading-[0.9] font-medium tracking-[-0.07px] underline w-fit ${primary}`}
        >
          See it live
        </a>
      )}

      {data.release && data.backstage && (
        <div id="case-mobile-tabs" className="flex gap-2 pt-2 justify-center">
          <button
            onClick={() => setActiveTab("release")}
            className={`cursor-pointer px-4 py-4 rounded-full text-sm font-medium leading-[0.9] ${
              dark ? "bg-[#161616] text-white" : "bg-[#0c0c0c] text-white"
            }`}
          >
            Release
          </button>
          <button
            onClick={() => setActiveTab("backstage")}
            className={`cursor-pointer px-4 py-4 rounded-full text-sm font-medium leading-[0.9] ${
              dark ? "bg-white text-[#0c0c0c]" : "bg-[#f5f5f5] text-[#0c0c0c]"
            }`}
          >
            Backstage
          </button>
        </div>
      )}
    </div>
  );
}
