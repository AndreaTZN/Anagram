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
import PortraitQuote from "@/components/cases-frame/PortraitQuote";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Founders Future Branding | VC Fund Visual Identity | anagram",
  description:
    "anagram redefined the identity of Founders Future, an entrepreneur-built tech investment platform. Brand strategy, design system and website for an international VC.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Founders Future",
  description:
    "Founders Future is an investment platform built by entrepreneurs, backing tech companies across Europe and the United States with both capital and operational expertise. We partnered with Founders Future to develop a brand strategy and identity capable of expressing that role: the carabiner as a secure connection point throughout a company's growth journey.",
  liveUrl: "https://foundersfuture.com",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Clarify the brand's positioning in a competitive global investment landscape, strengthen credibility with founders and stakeholders, and build a visual and narrative system capable of supporting international growth.\n\nThe goal was to evolve from a purely financial image to a more strategic, human, and future-oriented presence.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The brand strategy is built around the carabiner as a central symbol. Like the essential tool that enables climbers to progress safely and reach higher summits, Founders Future acts as a secure connection point throughout a company's growth journey.\n\nIt represents support, reliability, and momentum. A trusted link between ambition and achievement, opening new horizons alongside the founders it supports.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "process",
        label: "Process",
        description:
          "We have crafted and elevated Founders Future's brand assets through a strategy designed to ensure both stability and long-term evolution.\n\nAt the heart of this transformation lies the carabiner, the emblem of partnership.\n\nWe reimagined it as a living graphic element, introducing movement, fluidity and momentum into the identity, while reinforcing the strength and reliability at the core of the brand.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "For the photographic direction, we remained aligned with the brand's premium and institutional positioning. We curated imagery that balances sophistication with authority refined yet grounded.\n\nEach image is designed to convey trust, credibility and a deep mastery of the sectors in which they invest.\n\nThe result is a visual language that feels both elevated and reassuring, reinforcing their role as a confident, long-term partner.",
      },
    ],
  },
};

const projectDescription = (
  <Fragment key="founders-future-project-description">
    <p>
      Founders Future is an investment platform built by entrepreneurs,
      supporting tech companies across Europe and the United States with both
      capital and operational expertise. As the firm grew, it needed to evolve
      beyond a financial image toward something more strategic, human, and
      forward-looking.
    </p>
    <p className="mt-4">
      anagram developed a brand strategy centered on the carabiner as a core
      symbol. Like the essential tool that enables climbers to progress safely,
      Founders Future acts as a secure connection point throughout a
      company&apos;s growth journey. The carabiner itself is derived from the
      letter F, which also functions as a structural principle across all
      compositions. This creates a natural continuity between symbol,
      typography, and brand storytelling.
    </p>
    <p className="mt-4">
      The result is an identity that communicates trust, structure, and
      momentum, a premium brand capable of resonating with demanding founders
      internationally.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Founders Future logo represent?",
    answer:
      "The carabiner, a symbol of the secure link between ambition and achievement. It's derived from the letter “F” and serves as the structural foundation of the entire visual system.",
  },
  {
    question: "What is the F-frame in the Founders Future identity?",
    answer:
      "The letter F functions as a compositional principle across all brand materials. The carabiner, the typography, and the graphic system all stem from this shape, creating full visual coherence.",
  },
  {
    question: "What did anagram deliver for Founders Future?",
    answer:
      "Brand strategy, brand identity, design system, motion, illustration, website, photography, and development, a complete creative mission to reposition the firm internationally.",
  },
];

export default function FoundersFuturePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/FoundersFuture/release/1.webp"
                alt="Founders Future release 1"
                priority
              />
              <Vimeo169
                src="/works/FoundersFuture/release/2.webp"
                alt="Founders Future video 1"
                dataSrc="1167644462"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/3.webp"
                alt="Founders Future video 3"
                dataSrc="1175118792"
                dataRatio="1920/1080"
              />

              <Frame01
                src="/works/FoundersFuture/release/4.webp"
                alt="Founders Future release 4"
              />

              <PortraitQuote
                avatarSrc="/works/FoundersFuture/release/5.jpg"
                avatarAlt="Portrait"
                title="F-frame"
                description="In addition to the carabiner, the central element of our visual language and a symbol of connection, trust, and strength between entrepreneurs and Founders Future, we introduced the letter F, the brand’s emblematic signature, as a structural principle within our compositions. The carabiner itself is derived from this letter, as is the broader graphic system. This approach establishes a natural continuity between symbol, typography, and brand storytelling, reinforcing the coherence and distinctiveness of the Founders Future identity."
              />
              <Frame01
                src="/works/FoundersFuture/release/6.webp"
                alt="Founders Future release 6"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/7.webp"
                alt="Founders Future video 7"
                dataSrc="1167307913"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/8.webp"
                alt="Founders Future video 8"
                dataSrc="1167307927"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/9.webp"
                alt="Founders Future video 9"
                dataSrc="1172829785"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/10.webp"
                alt="Founders Future video 10"
                dataSrc="1167307950"
                dataRatio="1920/1080"
              />

              <Frame01
                src="/works/FoundersFuture/release/11.webp"
                alt="Founders Future release11"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/12.webp"
                alt="Founders Future video 12"
                dataSrc="1167307976"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/FoundersFuture/release/13.webp"
                alt="Founders Future video 13"
                dataSrc="1175427594"
                dataRatio="1920/1080"
              />

              <Frame02
                img1={{
                  src: "/works/FoundersFuture/release/14.webp",
                  alt: "...",
                }}
                img2={{
                  src: "/works/FoundersFuture/release/15.avif",
                  alt: "...",
                }}
              />
              <Vimeo169
                src="/works/FoundersFuture/release/16.webp"
                alt="Founders Future video 16"
                dataSrc="1167307998"
                dataRatio="1920/1080"
              />

              <Frame02
                img1={{
                  src: "/works/FoundersFuture/release/17.webp",
                  alt: "...",
                }}
                img2={{
                  src: "/works/FoundersFuture/release/18.webp",
                  alt: "...",
                }}
              />
              <Frame01
                src="/works/FoundersFuture/release/19.avif"
                alt="Founders Future release 19"
              />

              <TeamCredits
                rows={[
                  {
                    role: "Global direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Strategy", names: "Emmanuel Julliot" },
                  {
                    role: "Creative direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  {
                    role: "3D Design",
                    names: "Julien Brisson, Emmanuel Julliot, Rémy Godet",
                  },
                  {
                    role: "Motion Design",
                    names: "Valentin Salmon, Rémy Godet, Kévin Robin",
                  },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Video", names: "Gurvann Touzé" },
                  { role: "Copywriting", names: "Clara Perrot" },
                  {
                    role: "Integration",
                    names: "Alexandre Tuysuzian, Andrea Tuysuzian",
                  },
                  {
                    role: "Clients",
                    names:
                      "Marc Menasé, Louis Sautet, Paul Varrasso, Thibault Magnen, Thomas Bajas, Sophie Duval, Maxence Blanchy, Diane Conqueret, Matthieu Benkerant, Gabrielle Fourey, Ruben Koubi, Guillaume Ambar, Camille Aubery, Cyril Chiche, Fabien Cazes, Flore Lestrade, Benoit Koenig,  Thibault David",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq key="founders-future-faq-release" items={faqItems} />}
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/FoundersFuture/backstage/20.webp"
                alt="Founders Future backstage 1"
              />
              <Vimeo169
                src="/works/FoundersFuture/backstage/21.png"
                alt="Founders Future video 21"
                dataSrc="1172179330"
                dataRatio="1948/1108"
              />
              <Vimeo169
                src="/works/FoundersFuture/backstage/22.png"
                alt="Founders Future video 22"
                dataSrc="1175445560"
                dataRatio="1920/1080"
              />
              <Frame01
                src="/works/FoundersFuture/backstage/23.webp"
                alt="Founders Future backstage 23"
              />
              <Frame01
                src="/works/FoundersFuture/backstage/24.webp"
                alt="Founders Future backstage 24"
              />

              <Frame02
                img1={{
                  src: "/works/FoundersFuture/backstage/25.webp",
                  alt: "...",
                }}
                img2={{
                  src: "/works/FoundersFuture/backstage/26.webp",
                  alt: "...",
                }}
              />
              <Frame01
                src="/works/FoundersFuture/backstage/27.webp"
                alt="Founders Future backstage 27"
              />
              <Frame01
                src="/works/FoundersFuture/backstage/28.webp"
                alt="Founders Future backstage 28"
              />
              <Frame01
                src="/works/FoundersFuture/backstage/29.webp"
                alt="Founders Future backstage 29"
              />

              <TeamCredits
                rows={[
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  {
                    role: "Lighting",
                    names: "Gurvann Touzé, François-Xavier Manceau",
                  },
                  {
                    role: "Models",
                    names:
                      "Marc Menasé, Louis Sautet, Paul Varrasso, Thibault Magnen, Thomas Bajas, Sophie Duval, Maxence Blanchy, Diane Conqueret, Matthieu Benkerant, Gabrielle Fourey, Ruben Koubi, Guillaume Ambar, Camille Aubery, Cyril Chiche, Fabien Cazes, Flore Lestrade, Benoit Koenig, Thibault David",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq key="founders-future-faq-backstage" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Planity"
          href="/works/planity"
          media={{
            type: "image",
            src: "/works/Planity/release/1.webp",
            alt: "Planity",
          }}
        />
      </div>
    </main>
  );
}
