import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import PortraitQuote from "@/components/cases-frame/PortraitQuote";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";

export const metadata: Metadata = {
  title: "Politico Rebrand — Brand Identity & Website by Anagram Club",
  description:
    "See how Anagram Club redesigned Politico's brand and website in 2024, improving UX and discoverability to drive measurable traffic growth on politico.eu.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Politico",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://www.politico.eu/",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
    ],
  },
};

export default function PoliticoCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Politico/1.avif" alt="Politico 1" priority />
              <Frame01 src="/works/Politico/2.avif" alt="Politico 2" />
              <PortraitQuote
                avatarSrc="/works/Politico/3.avif"
                description="Working with Anagram contributed to measurable improvements in the performance of our digital platform politico.eu. The redesign enhanced both user experience and discoverability, which, alongside a strong news cycle, resulted in significant traffic gains. While the success reflects a combination of factors, the design and UX improvements delivered by Anagram played a key role."
              />
              <DarkTextCard text="Politico is renowned for its accuracy in disseminating information to stay ahead of its competitors, providing precisely what you need, when you need it. To accompany the merger of Politico.com and Politico.eu, a revision of the website's user experience and the editorial team's publishing process was necessary." />
              <Frame01 src="/works/Politico/4.avif" alt="Politico 4" />
              <DarkTextCard text="We have developed a simple and efficient design system. Designed with a mobile-centric approach, this system is based on a limited set of components and rules, allowing for the creation of all interface elements while maintaining consistency in the user experience. This new interface guarantees consistent branding across international markets. The new site offers a simplified yet richer experience. Our modular design system promotes both editorial selections and the dissemination of the latest news." />
              <Frame01 src="/works/Politico/5.avif" alt="Politico 5" />
              <Frame01 src="/works/Politico/6.avif" alt="Politico 6" />
              <Frame01 src="/works/Politico/7.avif" alt="Politico 7" />
              <Frame01 src="/works/Politico/8.avif" alt="Politico 8" />
              <Frame01 src="/works/Politico/9.avif" alt="Politico 9" />
              <Frame01 src="/works/Politico/10.avif" alt="Politico 10" />
              <Frame01 src="/works/Politico/11.avif" alt="Politico 11" />
              <Frame01 src="/works/Politico/12.avif" alt="Politico 12" />
              <Frame01 src="/works/Politico/13.avif" alt="Politico 13" />
              <Frame01 src="/works/Politico/14.avif" alt="Politico 14" />
              <Frame01 src="/works/Politico/15.avif" alt="Politico 15" />
            </div>
          }
        />
        <NextCase
          projectName="Twin"
          href="/works/twin"
          media={{
            type: "image",
            src: "/works/Twin/1.avif",
            alt: "Twin",
          }}
        />
      </div>
    </main>
  );
}
