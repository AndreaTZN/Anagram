import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import NextCase from "@/components/cases-frame/NextCase";

export const metadata: Metadata = {
  title: "Tilt Branding — Energy Startup Brand Identity by Anagram Club",
  description:
    "Discover how Anagram Club built the brand identity and website for Tilt, the energy startup assembling tomorrow's energy puzzle with bold, forward-thinking design.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Tilt",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://tilt-energy.com/",
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

export default function TiltCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Vimeo169
                src="/works/Tilt/1.avif"
                alt="poster 1"
                dataSrc="1172158224"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Tilt/2.avif" alt="Tilt 2" />
              <SplitTextImage
                title="Logo"
                description={`A Flexible Visual Identity\nThe dotted and block pattern evokes an interconnected network, representing the management and optimization of electricity flows.\nThe icon is designed as an evolving system: its structure allows it to adapt and be used across various applications and media.`}
                imageSrc="/works/tilt/3.avif"
                bgColor="#fff"
                imageFit="contain"
              />
              <Frame01 src="/works/Tilt/4.avif" alt="Tilt 4" />
              <VimeoTwoCards
                card1={{
                  dataSrc: "1172158400",
                  dataRatio: " 1154/1322",
                  src: "/works/Tilt/5.avif",
                  alt: "Tilt 5",
                }}
                card2={{
                  dataSrc: "1172158268",
                  dataRatio: " 1154/1322",
                  src: "/works/Tilt/6.avif",
                  alt: "Tilt 6",
                }}
              />
              <Frame01 src="/works/Tilt/7.avif" alt="Tilt 7" />
              <Vimeo169
                src="/works/Tilt/8.avif"
                alt="poster 2"
                dataSrc="1172158291"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Tilt/9.avif"
                alt="poster 3"
                dataSrc="1172158322"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Tilt/10.avif" alt="Tilt 10" />
              <VimeoImageCards
                video={{
                  dataSrc: "1172158371",
                  dataRatio: "1154/1322",
                  src: "/works/Tilt/11.avif",
                  alt: "Poster 4",
                }}
                image={{
                  src: "/works/Tilt/12.avif",
                  alt: "Tilt 12",
                }}
              />
              <Frame01 src="/works/Tilt/13.avif" alt="Tilt 13" />
              <Vimeo169
                src="/works/Tilt/14.avif"
                alt="poster 5"
                dataSrc="1172158350"
                dataRatio="1920/1080"
              />
            </div>
          }
        />
        <NextCase
          projectName="Pennylane"
          href="/works/pennylane"
          media={{
            type: "image",
            src: "/works/Pennylane/1.avif",
            alt: "Pennylane",
          }}
        />
      </div>
    </main>
  );
}
