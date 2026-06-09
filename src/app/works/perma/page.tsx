import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import NextCase from "@/components/cases-frame/NextCase";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";

export const metadata: Metadata = {
  title: "Perma Branding — Photo Sharing App Brand Identity by Anagram",
  description:
    " Discover Anagram Club's branding for Perma, the social photo-sharing app — a brand identity and logo system built around community exchange and user recognition.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Perma",
  description: "A social networking app for sharing photos",
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

export default function PermaCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Perma/1.webp" alt="Perma 1" />
              <Frame01 src="/works/Perma/2.avif" alt="Perma 2" />
              <Frame01 src="/works/Perma/3.avif" alt="Perma 3" />
              <SplitTextImage
                title="Logo"
                description='The logo is based on the values and goals of the Perma brand. Exchange is at the heart of its representation, as is the unification of the community. The letter "P" from Perma is integrated into the logo so that users can appropriate it and identify with the brand.'
                imageSrc="/works/Perma/4.avif"
                bgColor="#f3f0ed"
              />
              <Frame02
                img1={{
                  src: "/works/Perma/5.avif",
                  alt: "Perma release 5",
                }}
                img2={{
                  src: "/works/Perma/6.avif",
                  alt: "Perma release 6",
                }}
              />

              <Frame01 src="/works/Perma/7.avif" alt="Perma 7" />

              <Vimeo169
                src="/works/Perma/8.avif"
                alt="Perma video 1"
                dataSrc="1172151214"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Perma/9.avif" alt="Perma 9" />
              <Frame01 src="/works/Perma/10.avif" alt="Perma 10" />

              <VimeoTwoCards
                card1={{
                  dataSrc: "1172151240",
                  dataRatio: "1094/1254",
                  src: "/works/Perma/11.avif",
                  alt: "Perma 11",
                }}
                card2={{
                  dataSrc: "1172151189",
                  dataRatio: "1094/1254",
                  src: "/works/Perma/12.avif",
                  alt: "Perma 12",
                }}
              />

              <Frame01 src="/works/Perma/13.avif" alt="Perma 13" />
              <Frame01 src="/works/Perma/14.avif" alt="Perma 14" />
              <Frame01 src="/works/Perma/15.avif" alt="Perma 15" />
              <Frame01 src="/works/Perma/16.avif" alt="Perma 16" />
              <Frame01 src="/works/Perma/17.avif" alt="Perma 17" />
            </div>
          }
        />
        <NextCase
          projectName="Vizzia"
          href="/works/vizzia"
          media={{
            type: "vimeo",
            dataSrc: "1172566718",
            dataRatio: "2000/1124",
            posterSrc: "/works/Vizzia/1.avif",
          }}
        />
      </div>
    </main>
  );
}
