"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

export type CaseSection = {
  id: string;
  label: string;
  description: string;
};

export type CaseTab = {
  sections?: CaseSection[];
};

export type CaseNavData = {
  title: string;
  description: string;
  liveUrl?: string;
  release?: CaseTab;
  backstage?: CaseTab;
};

type CaseNavContextType = {
  data: CaseNavData | null;
  setData: (data: CaseNavData | null) => void;
  activeTab: "release" | "backstage";
  setActiveTab: (tab: "release" | "backstage") => void;
};

const CaseNavContext = createContext<CaseNavContextType>({
  data: null,
  setData: () => {},
  activeTab: "release",
  setActiveTab: () => {},
});

// Derived here rather than passed from the root layout: reading the pathname
// from headers() there made every route in the app dynamically rendered.
export function CaseNavProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [data, setData] = useState<CaseNavData | null>(() =>
    /^\/works\/.+/.test(pathname) ? ({} as CaseNavData) : null,
  );
  const [activeTab, setActiveTab] = useState<"release" | "backstage">("release");

  return (
    <CaseNavContext.Provider value={{ data, setData, activeTab, setActiveTab }}>
      {children}
    </CaseNavContext.Provider>
  );
}

export function useCaseNav() {
  return useContext(CaseNavContext);
}
