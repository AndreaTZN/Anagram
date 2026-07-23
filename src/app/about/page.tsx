import type { Metadata } from "next";
import { client } from "@/sanity/client";
import AboutClient from "./AboutClient";
import type { OpenRole } from "@/components/OpenRoles";
import { colorPairs } from "./clockColors";

export const metadata: Metadata = {
  title: "About anagram | Branding & Product Design Studio Paris",
  description:
    "Meet anagram, the Paris studio shaping market-defining brands through branding and product design. Discover our team, offerings, and open roles.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About anagram | Branding & Product Design Studio Paris",
    description:
      "Meet anagram, the Paris studio shaping market-defining brands through branding and product design. Discover our team, offerings, and open roles.",
    url: "/about",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

async function getOpenRoles(): Promise<OpenRole[]> {
  return client.fetch(
    `*[_type == "openRole"] | order(order asc) { _id, title, description, available, location }`,
    {},
    { next: { revalidate: 60 } },
  );
}

export default async function AboutPage() {
  const openRoles = await getOpenRoles();
  const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
  return <AboutClient openRoles={openRoles} colorPair={colorPair} />;
}
