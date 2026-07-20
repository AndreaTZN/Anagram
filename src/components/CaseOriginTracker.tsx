"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setCaseOrigin } from "@/lib/case-origin";

const isCasePath = (path: string) => /^\/works\/.+/.test(path);

// Pages depuis lesquelles on peut entrer dans un case et vers lesquelles le
// bouton close doit ramener. Toute autre provenance retombe sur /works.
const CASE_ORIGINS = ["/", "/about", "/lab"];

export default function CaseOriginTracker() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const prevPath = prev.current;
    if (isCasePath(pathname) && (!prevPath || !isCasePath(prevPath))) {
      setCaseOrigin(
        prevPath && CASE_ORIGINS.includes(prevPath) ? prevPath : "/works",
      );
    }
    prev.current = pathname;
  }, [pathname]);

  return null;
}
