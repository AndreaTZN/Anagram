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
      className="relative flex-1 overflow-hidden max-h-[100vh]"
    >
      <LabColumns />
    </main>
  );
}
