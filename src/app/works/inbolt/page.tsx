import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import NextCase from "@/components/cases-frame/NextCase";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Inbolt Branding | Brand Identity for AI Robotics Startup | anagram",
  description:
    "anagram created the branding and website for Inbolt, pioneer of 3D vision-guided industrial robotics. Accessible deeptech B2B brand design.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Inbolt",
  description:
    "Inbolt is pioneering AI-powered 3D vision that lets industrial robots navigate unconstrained environments in real time, without costly jigs or rigid indexing systems. We partnered with Inbolt to create a brand identity and website capable of expressing that breakthrough: making a highly technical innovation feel accessible and reassuring to industrial decision-makers.",
  liveUrl: "https://inbolt.com",
};

const projectDescription = (
  <Fragment key="inbolt-project-description">
    <p>
      Inbolt is revolutionizing industrial automation with an AI-powered 3D
      vision system that enables robots to navigate unconstrained environments
      in real time, no costly jigs, no rigid indexing systems. Breakthrough
      technology that needed a brand capable of carrying its ambition.
    </p>
    <p className="mt-4">
      The branding challenge was to make cutting-edge innovation feel
      accessible. anagram created the brand identity and website with a dual
      objective: communicate the pioneering nature of the solution while
      making it immediately legible and reassuring for industrial
      decision-makers.
    </p>
    <p className="mt-4">
      The studio used 3D and animation to create a sense of real product
      usage, anchoring the brand in a tangible experience rather than
      technological abstraction. The visual language translates Inbolt&apos;s
      three core values, innovation, reliability, adaptability, into a
      coherent identity that holds up in long enterprise sales cycles.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What was anagram's creative approach for Inbolt?",
    answer:
      "Using 3D and animation to make the brand feel tangible, grounding the identity in a real product experience rather than abstract technology, to build trust with industrial buyers.",
  },
  {
    question: "What did anagram deliver for Inbolt?",
    answer: "Full brand identity and website.",
  },
  {
    question:
      "Why does a deeptech startup need strong branding before its Series A?",
    answer:
      "A professional, differentiated brand validates the technology, accelerates investor confidence, and reduces friction in early B2B sales cycles, all before a product demo.",
  },
];

export default function InboltPage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-inbolt-seo-title" className="sr-only">
        Inbolt Branding: brand identity and website for the pioneer of 3D vision in industrial robotics
      </h1>
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
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="inbolt-faq" items={faqItems} />}
              />
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
