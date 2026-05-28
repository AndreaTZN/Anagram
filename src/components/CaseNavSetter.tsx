"use client";

import { useLayoutEffect } from "react";
import { useCaseNav, type CaseNavData } from "@/contexts/CaseNavContext";

export default function CaseNavSetter({ data }: { data: CaseNavData }) {
  const { setData, setActiveTab } = useCaseNav();

  useLayoutEffect(() => {
    setActiveTab("release");
    setData(data);
    return () => {
      setData(null);
      setActiveTab("release");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
