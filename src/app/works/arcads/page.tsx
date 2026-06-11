import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import NextCase from "@/components/cases-frame/NextCase";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";

export const metadata: Metadata = {
  title: "Arcads Branding — AI Video Ad Platform Identity Redesign",
  description:
    "Anagram Club reimagined Arcads' brand identity — the AI platform creating video ads with virtual actors. A full rebrand blending tech, emotion, and performance.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Arcads",
  description:
    "They help brands quickly turn text into high-quality video ads using AI actors and automation.",
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

export default function ArcadsCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Arcads/1.avif" alt="Arcads 1" priority />
              <Frame02
                img1={{
                  src: "/works/Arcads/2.webp",
                  alt: "Arcads 2",
                }}
                img2={{
                  src: "/works/Arcads/3.png",
                  alt: "Arcads 3",
                }}
              />
              <DarkTextCard
                text={`The Arcads symbol is built on clarity and motion.\nIts two geometric shapes form an abstract "A", a mark of ascension, progress, and precision. The diagonal conveys forward movement, while the solid vertical block anchors the brand in stability and confidence.\n\nTogether, they represent the balance between AI performance and human creativity, the core of what Arcads enables.\nThe symbol's upward flow mirrors the process of improvement embedded in our product: from idea to impact, from input to performance.\n\nThe bold, legible typography complements this structure, expressing reliability and modernity.\nIt ensures that the logo remains both timeless and flexible across any medium, from dynamic video compositions to digital interfaces.`}
              />
              <Frame02
                img1={{
                  src: "/works/Arcads/4.webp",
                  alt: "Arcads 4",
                }}
                img2={{
                  src: "/works/Arcads/5.webp",
                  alt: "Arcads 5",
                }}
              />

              <Vimeo169
                src="/works/Arcads/6.webp"
                alt="Arcads video 1"
                dataSrc="1172577307"
                dataRatio="1920/1080"
              />

              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1172577350",
                  dataRatio: "816/908",
                  src: "/works/Arcads/8.avif",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/7.webp",
                  alt: "Arcads 7",
                }}
              />
              <Frame02
                img1={{
                  src: "/works/Arcads/9.webp",
                  alt: "Arcads 2",
                }}
                img2={{
                  src: "/works/Arcads/10.webp",
                  alt: "Arcads 3",
                }}
              />
              <Frame01 src="/works/Arcads/11.webp" alt="Arcads 11" />

              <VimeoImageCards
                video={{
                  dataSrc: "1172577266",
                  dataRatio: "816/908",
                  src: "/works/Arcads/12.webp",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/13.webp",
                  alt: "Arcads 13",
                }}
              />

              <VimeoImageCards
                video={{
                  dataSrc: "1172577375",
                  dataRatio: "816/908",
                  src: "/works/Arcads/15.avif",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/14.webp",
                  alt: "Arcads 15",
                }}
              />
              <Frame01 src="/works/Arcads/16.webp" alt="Arcads 16" />
              <Frame02
                img1={{
                  src: "/works/Arcads/17.webp",
                  alt: "Arcads 17",
                }}
                img2={{
                  src: "/works/Arcads/18.webp",
                  alt: "Arcads 18",
                }}
              />

              <Frame02
                img1={{
                  src: "/works/Arcads/19.webp",
                  alt: "Arcads 19",
                }}
                img2={{
                  src: "/works/Arcads/20.webp",
                  alt: "Arcads 20",
                }}
              />
            </div>
          }
        />
        <NextCase
          projectName="Inbolt"
          href="/works/inbolt"
          media={{
            type: "vimeo",
            dataSrc: "1172492298",
            dataRatio: "3840/2160",
            posterSrc: "/works/Inbolt/inbolt-1-vimeo.webp",
          }}
        />
      </div>
    </main>
  );
}
