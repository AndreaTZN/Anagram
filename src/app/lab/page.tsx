import type { Metadata } from "next";
import LabColumns from "./LabColumns";

export const metadata: Metadata = {
  title: "Lab | Creative Explorations & Experiments | anagram",
  description:
    "The anagram Lab: creative explorations, experiments and visual research from the Paris branding and product design studio.",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "Lab | Creative Explorations & Experiments | anagram",
    description:
      "The anagram Lab: creative explorations, experiments and visual research from the Paris branding and product design studio.",
    url: "/lab",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function LabPage() {
  return (
    <main
      id="lab-root"
      className="relative flex-1 overflow-hidden max-h-screen"
    >
      <LabColumns />
    </main>
  );
}
