import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";

export const metadata: Metadata = {
  title: "Allo — Anagram",
  description: "",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Allo",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://www.withallo.com/",
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

export default function AlloCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Allo/1.webp" alt="Allo 1" priority />
              <Frame01 src="/works/Allo/2.webp" alt="Allo 2" />
              <Frame01 src="/works/Allo/3.webp" alt="Allo 3" />
              <Frame01 src="/works/Allo/4.webp" alt="Allo 4" />
              <Frame01 src="/works/Allo/5.webp" alt="Allo 5" />
              <Frame01 src="/works/Allo/6.webp" alt="Allo 6" />
              <Frame01 src="/works/Allo/7.webp" alt="Allo 7" />
              <Frame01 src="/works/Allo/8.webp" alt="Allo 8" />
              <Frame01 src="/works/Allo/9.webp" alt="Allo 9" />
              <Frame01 src="/works/Allo/10.webp" alt="Allo 10" />
              <Frame01 src="/works/Allo/11.webp" alt="Allo 11" />
              <Frame01 src="/works/Allo/12.webp" alt="Allo 12" />
              <Frame01 src="/works/Allo/13.webp" alt="Allo 13" />
            </div>
          }
        />
        <NextCase
          projectName="Tilt"
          href="/works/tilt"
          media={{
            type: "vimeo",
            dataSrc: "1172158224",
            dataRatio: "1920/1080",
            posterSrc: "/works/Tilt/1.avif",
            posterAlt: "Tilt",
          }}
        />
      </div>
    </main>
  );
}
