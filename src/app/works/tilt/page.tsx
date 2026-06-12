import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";

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
  description: "Assembling tomorrow's energy puzzle",
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
            </div>
          }
        />
      </div>
    </main>
  );
}
