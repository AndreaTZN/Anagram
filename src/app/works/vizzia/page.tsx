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
  title: "Vizzia Branding | Brand Identity for Deeptech B2B | anagram",
  description:
    "anagram created the brand identity and website for Vizzia, a deeptech startup building legally robust mobile systems for ground-level action",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Vizzia",
  description:
    "Vizzia designs legally robust mobile systems that make action visible and accountable on the ground, where operations actually happen. We partnered with Vizzia to build a brand identity and website capable of expressing that credibility: turning a technically demanding value proposition into an immediate signal of trust for institutional buyers.",
  liveUrl: "https://www.vizzia.com/",
};

const projectDescription = (
  <Fragment key="vizzia-project-description">
    <p>
      Vizzia designs mobile systems that are legally robust and instantly
      effective, built to make action visible where it truly matters: on the
      ground, among people. A technically demanding value proposition that
      needed a brand capable of communicating clarity, reliability, and
      operational credibility.
    </p>
    <p className="mt-4">
      anagram created the logo, brand identity, and website for Vizzia. The
      challenge was to translate the robustness and ground-level efficiency of
      the solution into a visual identity that builds immediate trust with
      institutional and private decision-makers.
    </p>
    <p className="mt-4">
      For a deeptech startup, the logo and brand are the first signals of
      seriousness sent to prospects before any product demo. Every creative
      decision on this project was guided by that principle: credibility first.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What did anagram create for Vizzia?",
    answer:
      "Logo, full brand identity, and website, designed to communicate robustness and operational credibility to institutional and private B2B buyers.",
  },
  {
    question: "What was the creative challenge on this project?",
    answer:
      "Translating a technically complex, ground-level solution into a visual identity that reads as trustworthy and professional at first glance, before the product is even explained.",
  },
  {
    question: "Why does a deeptech B2B startup need a strong brand identity?",
    answer:
      "In complex B2B sales cycles, the brand signals seriousness before any conversation happens. A credible identity accelerates trust and reduces friction with institutional decision-makers.",
  },
];

export default function VizziaPage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Vimeo169
                src="/works/Vizzia/1.avif"
                alt="Vizzia video 1"
                dataSrc="1172566718"
                dataRatio="2000/1124"
                priority
              />
              <Frame01 src="/works/Vizzia/2.avif" alt="Vizzia 2 " />
              <Vimeo169
                src="/works/Vizzia/3.avif"
                alt="Vizzia video 3"
                dataSrc="1172566742"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Vizzia/4.avif"
                alt="Vizzia video 4"
                dataSrc="1172566769"
                dataRatio="1920/1080"
              />

              <Frame01 src="/works/Vizzia/5.avif" alt="Vizzia 5" />
              <Frame01 src="/works/Vizzia/6.avif" alt="Vizzia 6" />
              <Vimeo169
                src="/works/Vizzia/7.avif"
                alt="Vizzia video 7"
                dataSrc="1172566802"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/8.avif" alt="Vizzia 8" />
              <Frame01 src="/works/Vizzia/9.avif" alt="Vizzia 9" />
              <Vimeo169
                src="/works/Vizzia/10.avif"
                alt="Vizzia video 10"
                dataSrc="1172566828"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/11.avif" alt="Vizzia 11" />
              <Frame01 src="/works/Vizzia/12.avif" alt="Vizzia 12" />
              <Vimeo169
                src="/works/Vizzia/13.avif"
                alt="Vizzia video 13"
                dataSrc="1172566855"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Vizzia/14.avif" alt="Vizzia 14" />
              <Frame01 src="/works/Vizzia/15.avif" alt="Vizzia 15" />
              <Frame01 src="/works/Vizzia/16.avif" alt="Vizzia 16" />
              <Frame01 src="/works/Vizzia/17.avif" alt="Vizzia 17" />
              <Frame01 src="/works/Vizzia/18.avif" alt="Vizzia 18" />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="vizzia-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Founders Future"
          href="/works/founders-future"
          media={{
            type: "vimeo",
            dataSrc: "1167644462",
            dataRatio: "1920/1080",
            posterSrc: "/works/FoundersFuture/release/2.webp",
          }}
        />
      </div>
    </main>
  );
}
