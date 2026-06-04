import type { Metadata } from "next";
import Image from "next/image";
import WidgetPanel from "@/components/WidgetPanel";
import WorksGrid from "@/components/WorksGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anagram Club — Shaping brands that need no introduction",
  description:
    "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
  openGraph: {
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
    url: "https://anagramclub.com",
    siteName: "Anagram Club",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
  },
  metadataBase: new URL("https://anagramclub.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main className="relative flex-1 pt-6 pr-6 pl-2 pb-6 max-[766px]:px-4 max-[766px]:pt-4">
      <section
        className="relative bg-[#a6f1e4] w-full rounded-sm overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src="/home/hero.jpg"
          alt="Anagram Club — Hero"
          fill
          priority
          className="object-cover"
        />
      </section>
      <WidgetPanel />
      <section className="py-6">
        <WorksGrid />
      </section>
      <Footer />
    </main>
  );
}
