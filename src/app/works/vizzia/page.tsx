import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import NextCase from "@/components/cases-frame/NextCase";
import type { CaseNavData } from "@/contexts/CaseNavContext";

export const metadata: Metadata = {
  title: "Vizzia Branding — Brand Identity & Website by Anagram Club",
  description:
    "See how Anagram Club designed the brand identity and website for Vizzia — legally robust mobile systems for field-level visibility, crafted for real-world impact.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Vizzia",
  description:
    "Vizzia designs mobile systems that are legally robust and instantly effective, to make your action visible where it truly matters, on the ground, among the people.",
  liveUrl: "https://www.vizzia.com/",
  release: {
    sections: [
      {
        id: "context",
        label: "Context",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
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
      {
        id: "application",
        label: "Application",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
    ],
  },
};

export default function VizziaPage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Vimeo169
                src="/works/Vizzia/1.avif"
                alt="Vizzia video 1"
                dataSrc="1172566718"
                dataRatio="2000/1124"
                priority
              />
              <Frame01 src="/works/Vizzia/2.avif" alt="Vizzia 2 " />
              <Vimeo169
                src="/works/Vizzia/3.avif"
                alt="Vizzia video 3"
                dataSrc="1172566742"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Vizzia/4.avif"
                alt="Vizzia video 4"
                dataSrc="1172566769"
                dataRatio="1920/1080"
              />

              <Frame01 src="/works/Vizzia/5.avif" alt="Vizzia 5" />
              <Frame01 src="/works/Vizzia/6.avif" alt="Vizzia 6" />
              <Vimeo169
                src="/works/Vizzia/7.avif"
                alt="Vizzia video 7"
                dataSrc="1172566802"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/8.avif" alt="Vizzia 8" />
              <Frame01 src="/works/Vizzia/9.avif" alt="Vizzia 9" />
              <Vimeo169
                src="/works/Vizzia/10.avif"
                alt="Vizzia video 10"
                dataSrc="1172566828"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/11.avif" alt="Vizzia 11" />
              <Frame01 src="/works/Vizzia/12.avif" alt="Vizzia 12" />
              <Vimeo169
                src="/works/Vizzia/13.avif"
                alt="Vizzia video 13"
                dataSrc="1172566855"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/14.avif" alt="Vizzia 14" />
              <Frame01 src="/works/Vizzia/15.avif" alt="Vizzia 15" />
              <Frame01 src="/works/Vizzia/16.avif" alt="Vizzia 16" />
              <Frame01 src="/works/Vizzia/17.avif" alt="Vizzia 17" />
              <Frame01 src="/works/Vizzia/18.avif" alt="Vizzia 18" />
            </div>
          }
        />
        <NextCase
          projectName="Founders Future"
          href="/works/founders-future"
          media={{
            type: "vimeo",
            dataSrc: "1167644462",
            dataRatio: "1920/1080",
            posterSrc: "/works/FoundersFuture/release/2.webp",
          }}
        />
      </div>
    </main>
  );
}
