import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import FourPhones from "@/components/cases-frame/FourPhones";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";

export const metadata: Metadata = {
  title: "Bee Wearable AI — Brand Identity & Website by Anagram Club",
  description:
    "Discover how Anagram Club crafted the brand identity, website, and photography for Bee — the wearable AI device with a bold, human-first tech identity.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Bee",
  description: "The wearable AI that understands you",
  liveUrl: "https://bee.computer/",
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

export default function BeeCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Bee/1.avif" alt="Bee 1" priority />
              <Frame01 src="/works/Bee/2.avif" alt="Bee 2" />
              <SplitTextImage
                title="Logo"
                description={`This logo represents a bee in an abstract manner. Its curves and graphic rendering evoke modularity, symbolizing Bee's ability to adapt to any user. The "wings" of the bee are organically connected to represent connectivity. The relatively smooth curves convey a sense of security and make the idea of using an AI device in everyday life more comforting. The icon is tilted 20% upwards to symbolize evolution.`}
                imageSrc="/works/Bee/3.avif"
                bgColor="#f3f0ed"
                imageFit="contain"
              />
              <Vimeo169
                src="/works/Bee/4.avif"
                alt="poster video"
                dataSrc="1172066576"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Bee/5.avif" alt="Bee 5" />
              <Frame01 src="/works/Bee/6.avif" alt="Bee 6" />
              <Frame02
                img1={{ src: "/works/Bee/7.avif", alt: "Bee 7" }}
                img2={{ src: "/works/Bee/8.avif", alt: "Bee 8" }}
              />
              <Frame01 src="/works/Bee/9.avif" alt="Bee 9" />
              <Frame01 src="/works/Bee/10.avif" alt="Bee 10" />
              <Frame02
                img1={{ src: "/works/Bee/11.avif", alt: "Bee 11" }}
                img2={{ src: "/works/Bee/12.avif", alt: "Bee 12" }}
              />
              <FourPhones
                bgColor="#000000"
                phone1={{ src: "/works/Bee/13.avif", alt: "Bee 13" }}
                phone2={{ src: "/works/Bee/14.avif", alt: "Bee 14" }}
                phone3={{ src: "/works/Bee/15.avif", alt: "Bee 15" }}
                phone4={{ src: "/works/Bee/16.avif", alt: "Bee 16" }}
              />
              <VimeoImageCards
                video={{
                  dataSrc: "1172066565",
                  dataRatio: "2000/2500",
                  src: "/works/Bee/17.webp",
                  alt: "Poster image",
                }}
                image={{
                  src: "/works/Bee/18.avif",
                  alt: "Bee 18",
                }}
              />
              <Frame01 src="/works/Bee/19.avif" alt="Bee 19" />
              <Frame01 src="/works/Bee/20.avif" alt="Bee 20" />
              <Frame01 src="/works/Bee/21.avif" alt="Bee 21" />
            </div>
          }
        />
      </div>
    </main>
  );
}
