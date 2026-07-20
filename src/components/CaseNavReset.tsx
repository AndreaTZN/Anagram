"use client";

import { useLayoutEffect } from "react";
import { useCaseNav } from "@/contexts/CaseNavContext";

// The layout seeds the case nav from the URL shape alone, so a non-existent
// /works/* slug lands on the 404 with the case nav still showing.
export default function CaseNavReset() {
  const { setData, setActiveTab } = useCaseNav();

  useLayoutEffect(() => {
    setData(null);
    setActiveTab("release");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
