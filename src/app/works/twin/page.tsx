import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Frame02 from "@/components/cases-frame/Frame02";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";

export const metadata: Metadata = {
  title: "Twin — Anagram Club",
  description:
    "Explore Twin, the wearable AI that understands you. Branding and website design by Anagram Club. View the complete project showcase.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Twin",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://twin.so/",
};

export default function TwinCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/twin/1.avif" alt="Twin 1" priority />
              <Frame02
                img1={{ src: "/works/twin/2.avif", alt: "Twin 2" }}
                img2={{ src: "/works/twin/3.avif", alt: "Twin 3" }}
              />
              <Frame01 src="/works/twin/4.avif" alt="Twin 4" />
              <Frame01 src="/works/twin/5.avif" alt="Twin 5" />
              <Frame01 src="/works/twin/6.avif" alt="Twin 6" />
              <Vimeo169
                src="/works/twin/7.avif"
                alt="poster 7"
                dataSrc="1172541302"
                dataRatio="1920/1080"
              />
              <VimeoImageCards
                video={{
                  dataSrc: "1172541326",
                  dataRatio: "1094/1254",
                  src: "/works/twin/8.avif",
                  alt: "Poster 8",
                }}
                image={{
                  src: "/works/twin/9.avif",
                  alt: "Twin 9",
                }}
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/twin/10.avif",
                  alt: "Twin 10",
                  dataSrc: "1172541340",
                  dataRatio: "1094/1254",
                }}
                card2={{
                  src: "/works/twin/11.avif",
                  alt: "Twin 11",
                  dataSrc: "1172541372",
                  dataRatio: "1094/1254",
                }}
              />
              <Frame01 src="/works/twin/12.avif" alt="Twin 12" />
            </div>
          }
        />
        <NextCase
          projectName="Henoo"
          href="/works/henoo"
          media={{
            type: "vimeo",
            dataSrc: "1172136135",
            dataRatio: "1920/1080",
            posterSrc: "/works/Henoo/2.avif",
            posterAlt: "Henoo",
          }}
        />
      </div>
    </main>
  );
}
