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
  title: "Inbolt Branding — AI Robotics Brand Identity by Anagram Club",
  description:
    "Discover how Anagram Club built the brand identity and website for Inbolt, the startup revolutionizing automation with 3D-vision-based AI technology.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Inbolt",
  description:
    "Inbolt aims to revolutionize automation by developing an innovative 3D-vision-based AI system. Their groundbreaking technology enables robots to navigate unconstrained environments with real-time trajectory guidance, eliminating the need for costly and inflexible jigs and indexing systems.",
  liveUrl: "https://inbolt.com",
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

export default function InboltPage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Inbolt/1.avif" alt="Inbolt 1" priority />
              <Vimeo169
                src="/works/Inbolt/inbolt-1-vimeo.webp"
                alt="Inbolt video 1"
                dataSrc="1172492298"
                dataRatio="3840/2160"
              />
              <Frame01 src="/works/Inbolt/3.avif" alt="Inbolt 3" />
              <Frame01 src="/works/Inbolt/4.avif" alt="Inbolt 4" />
              <Frame01 src="/works/Inbolt/5.avif" alt="Inbolt 5" />
              <Frame02
                img1={{
                  src: "/works/Inbolt/6.webp",
                  alt: "Inbolt 6",
                }}
                img2={{
                  src: "/works/Inbolt/7.avif",
                  alt: "Inbolt 7",
                }}
              />
              <Frame01 src="/works/Inbolt/8.avif" alt="Inbolt 8" />
              <Frame01 src="/works/Inbolt/9.avif" alt="Inbolt 9" />
              <Frame01 src="/works/Inbolt/10.avif" alt="Inbolt 10" />
              <Frame02
                img1={{
                  src: "/works/Inbolt/11.avif",
                  alt: "Inbolt 11",
                }}
                img2={{
                  src: "/works/Inbolt/12.avif",
                  alt: "Inbolt 12",
                }}
              />
              <Frame01 src="/works/Inbolt/13.avif" alt="Inbolt 13" />
              <Vimeo169
                src="/works/Inbolt/14.avif"
                alt="Inbolt video 2"
                dataSrc="1172493608"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Inbolt/15.avif" alt="Inbolt 15" />
              <Frame01 src="/works/Inbolt/16.avif" alt="Inbolt 16" />
              <Frame01 src="/works/Inbolt/17.avif" alt="Inbolt 17" />
            </div>
          }
        />
        <NextCase
          projectName="Perma"
          href="/works/perma"
          media={{
            type: "vimeo",
            dataSrc: "1172151214",
            dataRatio: "1920/1080",
            posterSrc: "/works/Perma/8.avif",
          }}
        />
      </div>
    </main>
  );
}
