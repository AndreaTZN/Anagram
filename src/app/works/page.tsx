import type { Metadata } from "next";
import WorksPageClient from "./WorksPageClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Work | Branding & Product Design Case Studies | anagram",
  description:
    "Explore anagram's branding and product design case studies: Pennylane, Planity, Fortuneo, Founders Future and more market-defining brands.",
  alternates: { canonical: "/works" },
  openGraph: {
    title: "Our Work | Branding & Product Design Case Studies | anagram",
    description:
      "Explore anagram's branding and product design case studies: Pennylane, Planity, Fortuneo, Founders Future and more market-defining brands.",
    url: "/works",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function WorksPage() {
  return (
    <main className=" flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4 max-[992px]:mt-12">
      <WorksPageClient />
      <Footer />
    </main>
  );
}