import type { Metadata } from "next";
import LabColumns from "./LabColumns";

export const metadata: Metadata = {
  title: "Lab — Anagram Club",
  description: "Explorations créatives et expérimentations.",
};

export default function LabPage() {
  return (
    <main
      id="lab-root"
      className="relative flex-1 overflow-hidden "
      style={{
        margin: "-1.5rem -1.5rem -1.5rem -0.5rem",
        height: "calc(100vh - 1.5rem)",
      }}
    >
      <LabColumns />
    </main>
  );
}
