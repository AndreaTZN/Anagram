"use client";

import { createContext, useContext, useState } from "react";

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

export function CaseNavProvider({
  children,
  isCasePage = false,
}: {
  children: React.ReactNode;
  isCasePage?: boolean;
}) {
  const [data, setData] = useState<CaseNavData | null>(
    isCasePage ? ({} as CaseNavData) : null,
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
