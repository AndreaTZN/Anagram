"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setCaseOrigin } from "@/lib/case-origin";

const isCasePath = (path: string) => /^\/works\/.+/.test(path);

export default function CaseOriginTracker() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const prevPath = prev.current;
    if (isCasePath(pathname) && (!prevPath || !isCasePath(prevPath))) {
      setCaseOrigin(prevPath === "/" ? "/" : "/works");
    }
    prev.current = pathname;
  }, [pathname]);

  return null;
}
