import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import NextCase from "@/components/cases-frame/NextCase";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title:
    "Tilt Branding | Brand Identity for Cleantech Energy Startup",
  description:
    "anagram created the brand identity for Tilt, a startup orchestrating real-time energy flow optimization. Logo, brand design and website for a cleantech deeptech",
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Tilt",
  description:
    "Tilt is the startup orchestrating energy consumption to match available supply in real time, bringing balance and resilience to an increasingly complex grid. We partnered with Tilt to create a brand identity and website capable of expressing that system: a logo built as an evolving, interconnected network of energy flows.",
  liveUrl: "https://tilt-energy.com/",
};

const projectDescription = (
  <Fragment key="tilt-project-description">
    <p>
      Tilt is the startup orchestrating energy consumption to match available
      supply in real time, bringing balance, efficiency, and resilience to an
      increasingly complex grid. A deeptech player operating at the intersection
      of engineering and environmental impact.
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

export default function TiltCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-tilt-seo-title" className="sr-only">
        Tilt Branding: brand identity and website for the startup balancing the energy grid in real time
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
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
                imageSrc="/works/Tilt/3.avif"
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
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="tilt-faq" items={faqItems} />}
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
