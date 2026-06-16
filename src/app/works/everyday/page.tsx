import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";

export const metadata: Metadata = {
  title: "Everyday Rebrand — Brand Identity for an AI Mobile Game Studio",
  description:
    "Anagram Club rebranded Everyday, an AI game studio, with a sun-centered brand identity capturing daily engagement, playful routine, and creative momentum.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Everyday",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "",
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
  backstage: {
    sections: [
      {
        id: "Process",
        label: "Process",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
    ],
  },
};

export default function EverydayCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Everyday/release/1.webp"
                alt="Everyday 1"
                priority
              />
              <Frame01 src="/works/Everyday/release/2.avif" alt="Everyday 2" />
              <Vimeo169
                src="/works/Everyday/release/3.avif"
                alt="poster 3"
                dataSrc="1172585361"
                dataRatio="1920/1080"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/4.webp",
                  alt: "Everyday 4",
                }}
                img2={{
                  src: "/works/Everyday/release/5.avif",
                  alt: "Everyday 5",
                }}
              />
              <Frame01 src="/works/Everyday/release/6.avif" alt="Everyday 6" />
              <Vimeo169
                src="/works/Everyday/release/7.avif"
                alt="poster 7"
                dataSrc="1172585205"
                dataRatio="1920/1080"
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/Everyday/release/8.avif",
                  alt: "Everyday 8",
                  dataSrc: "1172585332",
                  dataRatio: "970/1080",
                }}
                card2={{
                  src: "/works/Everyday/release/9.avif",
                  alt: "Everyday 9",
                  dataSrc: "1172585399",
                  dataRatio: "970/1080",
                }}
              />
              <Frame01
                src="/works/Everyday/release/10.webp"
                alt="Everyday 10"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/11.avif",
                  alt: "Everyday 11",
                }}
                img2={{
                  src: "/works/Everyday/release/12.webp",
                  alt: "Everyday 12",
                }}
              />
              <Frame01
                src="/works/Everyday/release/13.avif"
                alt="Everyday 13"
              />
              <Frame01
                src="/works/Everyday/release/14.avif"
                alt="Everyday 14"
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/Everyday/release/15.avif",
                  alt: "Everyday 15",
                  dataSrc: "1172585257",
                  dataRatio: "970/1080",
                }}
                card2={{
                  src: "/works/Everyday/release/16.avif",
                  alt: "Everyday 16",
                  dataSrc: "1172585291",
                  dataRatio: "970/1080",
                }}
              />
              <Frame01
                src="/works/Everyday/release/17.avif"
                alt="Everyday 17"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/18.avif",
                  alt: "Everyday 18",
                }}
                img2={{
                  src: "/works/Everyday/release/19.avif",
                  alt: "Everyday 19",
                }}
              />

              <Frame01
                src="/works/Everyday/release/20.avif"
                alt="Everyday 20"
              />
              <Frame01
                src="/works/Everyday/release/21.avif"
                alt="Everyday 21"
              />
              <Frame01
                src="/works/Everyday/release/22.avif"
                alt="Everyday 22"
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Everyday/backstage/23.webp"
                alt="Everyday backstage 23"
                priority
              />
              <Frame01
                src="/works/Everyday/backstage/24.webp"
                alt="Everyday backstage 24"
              />
              <Frame01
                src="/works/Everyday/backstage/25.webp"
                alt="Everyday backstage 25"
              />
              <Frame01
                src="/works/Everyday/backstage/26.webp"
                alt="Everyday backstage 26"
              />
            </div>
          }
        />
        <NextCase
          projectName="Amo"
          href="/works/amo"
          media={{
            type: "vimeo",
            dataSrc: "1172495642",
            dataRatio: "1920/1080",
            posterSrc: "/works/Amo/10.avif",
            posterAlt: "Amo",
          }}
        />
      </div>
    </main>
  );
}
