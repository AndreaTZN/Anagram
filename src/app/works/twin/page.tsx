import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Frame02 from "@/components/cases-frame/Frame02";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Twin — Anagram Club",
  description:
    "Explore Twin, the wearable AI that understands you. Branding and website design by Anagram Club. View the complete project showcase.",
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Twin",
  description:
    "Twin is the wearable AI built to understand its user, an invisible and highly technical system that needed to become immediately legible. We partnered with Twin to create a brand identity and website capable of expressing that system: a logo conceived as an evolving pattern of points and blocks, evoking an interconnected network.",
  liveUrl: "https://twin.so/",
};

const projectDescription = (
  <Fragment key="twin-project-description">
    <p>
      Twin is the wearable AI that understands you. Branding and website design
      by Anagram Club.
    </p>
    <p className="mt-4">
      anagram created the brand identity and website for Twin with the goal of
      making an invisible, highly technical system immediately legible. The logo
      is conceived as an evolving system: its pattern of points and blocks
      evokes an interconnected network representing the management and
      optimization of energy flows.
    </p>
    <p className="mt-4">
      The visual identity is designed as a flexible system, structured to adapt
    </p>
    <p className="mt-4">
      anagram created the brand identity and website for Tilt with the goal of
      making an invisible, highly technical system immediately legible. The logo
      is conceived as an evolving system: its pattern of points and blocks
      evokes an interconnected network representing the management and
      optimization of energy flows.
    </p>
    <p className="mt-4">
      The visual identity is designed as a flexible system, structured to adapt
      and work across multiple applications and formats. A brand that embodies
      the idea of an intelligent, coherent, and constantly evolving energy
      network, precisely the technological promise Tilt delivers.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Tilt logo represent?",
    answer:
      "A pattern of points and blocks forming an interconnected network, symbolizing the management and optimization of electrical flows. A flexible and scalable visual system, like Tilt's own technology.",
  },
  {
    question: "What did anagram deliver for Tilt?",
    answer: "Brand identity and website.",
  },
  {
    question: "How do you brand a cleantech deeptech startup to stand out?",
    answer:
      "By anchoring the identity in the metaphor of the system, network, flow, interconnection, rather than generic green sector codes. For Tilt, this creates a distinctive, technical, and aspirational brand.",
  },
];

export default function TwinCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4">
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
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="twin-faq" items={faqItems} />}
              />
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
