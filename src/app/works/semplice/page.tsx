import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import VimeoSound from "@/components/cases-frame/VimeoSound";
import Vimeo169 from "@/components/cases-frame/Vimeo169";

export const metadata: Metadata = {
  title: "Semplice Branding — Brand Identity & Website by Anagram Club",
  description:
    "Explore Anagram Club's branding and website design for Semplice — a clean, distinctive brand identity built to stand out and make a lasting impression on the market.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Semplice",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://www.semplice.com/",
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

export default function SempliceCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Semplice/1.avif" alt="Semplice 1" priority />
              <VimeoSound
                dataSrc="1201691523"
                dataRatio="1920/1080"
                src="/works/Semplice/poster1.webp"
                alt="Semplice 2"
                priority
              />
              <Vimeo169
                src="/works/Semplice/2.avif"
                alt="poster video"
                dataSrc="1172503560"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Semplice/3.avif"
                alt="poster video 3"
                dataSrc="1172503590"
                dataRatio="1920/1080"
              />
              <VimeoSound
                dataSrc="1201691803"
                dataRatio="1920/1080"
                src="/works/Semplice/poster4.webp"
                alt="Semplice 4"
                priority
              />
            </div>
          }
        />
        <NextCase
          projectName="Everyday"
          href="/works/everyday"
          media={{
            type: "vimeo",
            dataSrc: "1172585361",
            dataRatio: "1920/1080",
            posterSrc: "/works/Everyday/release/3.avif",
            posterAlt: "Everyday",
          }}
        />
      </div>
    </main>
  );
}
