import type { Metadata } from "next";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import WidgetPanel from "@/components/widgets/WidgetPanel";
import HomeContain from "@/components/HomeContain";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import type { OpenRole } from "@/components/OpenRoles";

function getOpenRoles() {
  return client.fetch<OpenRole[]>(
    `*[_type == "openRole"] | order(order asc) { _id, title, description, available, location }`,
  );
}

export const metadata: Metadata = {
  title: "Anagram Club — Shaping brands that need no introduction",
  description:
    "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
  openGraph: {
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
    url: "https://anagram.club",
    siteName: "Anagram Club",
    locale: "fr_FR",
    type: "website",
    images: ["/opengraph.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anagram Club — Shaping brands that need no introduction",
    description:
      "Anagram Club shapes market-defining brands through bold branding, product design, and a sharp creative process. Built for companies that want to stand out.",
    images: ["/opengraph.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function HomePage() {
  const openRoles = await getOpenRoles();

  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 md:px-4 md:pt-4 max-[62rem]:mt-12">
      <Vimeo169
        src="/home/poster-hero.webp"
        alt="Anagram Club — Hero"
        dataSrc="1213947103"
        dataRatio="16/9"
        priority
      />
      <div className="hidden md:block">
        <WidgetPanel openRoles={openRoles} />
      </div>
      <section className="pt-6">
        <HomeContain />
      </section>
      <Footer />
    </main>
  );
}
