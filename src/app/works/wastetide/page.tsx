import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import VimeoSound from "@/components/cases-frame/VimeoSound";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import NextCase from "@/components/cases-frame/NextCase";
import VimeoTextImage from "@/components/cases-frame/VimeoTextImage";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title:
    "Wastetide | Brand Identity for Industrial Waste Intelligence | anagram",
  description:
    "anagram built the full brand and digital experience for Wastetide, an AI platform turning industrial waste into measurable financial value. Identity, strategy, and concept.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Wastetide",
  description:
    "Using artificial intelligence, Wastetide helps industrial companies identify, value and monetize materials hidden within their waste streams. We partnered with Wastetide to create a brand and digital experience capable of expressing this shift in perspective: transforming what appears worthless into something valuable.",
  liveUrl: "https://www.wastetide.ai/",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Wastetide needed a brand capable of making this hidden value visible while positioning itself as a new generation AI company operating at the intersection of industry, sustainability and finance.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The brand strategy is built around a torn paper pattern inspired by shredded industrial waste. Simple yet highly versatile, it provides a consistent visual system across imagery, typography, and motion while reflecting Wastetide's core idea: uncovering hidden value beneath the surface.",
      },
    ],
  },
};

const projectDescription = (
  <>
    <p>
      The scope covered brand strategy, identity, motion design, UX/UI,
      product design, 3D, website, sound design, and development. A complete
      mission from concept to shipped experience.
    </p>
    <p className="mt-4">
      The brand sits deliberately outside conventional sustainability codes.
      No green messaging, no earnest climate narrative. The tone is
      industrial, performance-driven, and financial in register, built for
      procurement leads and CFOs who think in terms of material recovery and
      return on asset, not ESG communications teams. Wastetide&apos;s
      positioning is simple: waste is a hidden financial asset, and their
      technology makes it visible and tradeable.
    </p>
    <p className="mt-4">
      The visual system comes from a torn paper pattern pulled directly from
      shredded industrial waste. It&apos;s a texture that becomes a working
      tool, flexible enough to frame photography, drive typographic
      composition, and generate motion, while anchoring every touchpoint in
      the same core idea: value already exists beneath the surface, it just
      needs to be uncovered.
    </p>
    <p className="mt-4">
      The logo carries three meanings compressed into one mark. The flag
      signals identification, the ability to locate opportunity. The wave
      references the continuous flow of materials across industrial cycles.
      The ascending line marks value creation over time. Combined with the
      &ldquo;W&rdquo;, these elements form a visual equation that describes
      what Wastetide actually does: detect, transform, extract value from
      overlooked waste.
    </p>
    <p className="mt-4">
      The iceberg, wave, and segmentation motifs extend this logic into the
      full identity system. Each is a visual metaphor for Wastetide&apos;s
      analytical process. Together, they make an invisible service
      immediately legible to decision-makers who have no patience for
      abstraction.
    </p>
  </>
);

const faqItems = [
  {
    question: "What did anagram deliver for Wastetide?",
    answer:
      "A complete creative mission: brand strategy, identity, motion design, UX/UI, product design, 3D, sound design, website, and development, from the first strategic brief to the live digital experience.",
  },
  {
    question: "What does the Wastetide logo represent?",
    answer:
      "Three elements converge in one mark. A flag for identification and discovery. A wave for the continuous flow of materials and transformation. An ascending line for value creation over time. Combined with the initial “W”, they form a visual equation describing exactly what Wastetide does.",
  },
  {
    question: "Why did anagram avoid green branding for Wastetide?",
    answer:
      "Because Wastetide's buyers are industrial operators and financial decision-makers, not sustainability teams. The brief was to position waste as a financial asset, not a cause. The identity is bold, direct, and performance-driven, closer to a fintech or data platform in register than to a cleantech startup.",
  },
  {
    question: "What is the torn paper pattern in the Wastetide identity?",
    answer:
      "The structural motif of the entire visual system, inspired directly by shredded industrial waste. It frames photography, drives typographic composition, and generates motion. A single visual principle that connects every touchpoint to the same idea: hidden value just beneath the surface.",
  },
];

export default function WastetidePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Wastetide/1.webp"
                alt="Wastetide 1"
                priority
              />
              <VimeoSound
                dataSrc="1199785516"
                dataRatio="1920/1080"
                src="/works/Wastetide/2.webp"
                alt="Wastetide video"
                priority
              />

              <VimeoTextImage
                video={{
                  dataSrc: "1199785514",
                  dataRatio: "1080/1228",
                  src: "/works/Wastetide/3.webp",
                  alt: "Wastetide logo concept",
                }}
                title="Logo Concept"
                description={
                  <>
                    <p>
                      The flag represents identification and discovery the
                      ability to locate hidden opportunities within industrial
                      waste streams. The wave symbolizes the tide, a continuous
                      flow of materials, resources and transformation.
                    </p>
                    <p className="mt-4">
                      The ascending line embodies progress, growth and the
                      creation of value over time. Combined with the initial
                      &ldquo;W&rdquo;, these elements merge into a single mark
                      that captures Wastetide&apos;s core promise: turning
                      overlooked waste into measurable opportunity. More than a
                      logo, the symbol acts as a visual equation a synthesis of
                      detection, transformation and value creation.
                    </p>
                  </>
                }
                image={{ src: "/works/Wastetide/4.webp", alt: "Wastetide 4" }}
              />
              <Vimeo169
                src="/works/Wastetide/5.webp"
                alt="poster video"
                dataSrc="1199785513"
                dataRatio="1920/1080"
              />
              <VimeoTextImage
                layout="text-left"
                video={{
                  dataSrc: "1199785515",
                  dataRatio: "790/440",
                  src: "/works/Wastetide/6.webp",
                  alt: "Wastetide core concept",
                }}
                title="Core Concept"
                description={
                  <>
                    <p>The identity is built around three core principles.</p>
                    <p className="mt-4">
                      The iceberg represents the contrast between visible waste
                      and the hidden value it contains, whether in the form of
                      materials, data or economic opportunities.
                    </p>
                    <p className="mt-4">
                      The wave symbolizes a shift in perspective. It embodies
                      movement, awareness and the transformation of waste into a
                      resource.
                    </p>
                    <p className="mt-4">
                      The segmentation system draws inspiration from paper-cut
                      techniques. By slicing and revealing different layers, it
                      reflects the analytical process used to understand waste
                      composition and uncover its potential. Together, these
                      principles form a visual language centered on exploration,
                      understanding and value creation.
                    </p>
                  </>
                }
                image={{ src: "/works/Wastetide/7.webp", alt: "Wastetide 7" }}
              />

              <Vimeo169
                src="/works/Wastetide/8.webp"
                alt="poster video"
                dataSrc="1199785543"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Wastetide/9.webp" alt="Wastetide 9" />

              <Vimeo169
                src="/works/Wastetide/10.webp"
                alt="poster video"
                dataSrc="1199785544"
                dataRatio="3192/1796"
              />
              <Vimeo169
                src="/works/Wastetide/11.webp"
                alt="poster video"
                dataSrc="1199785551"
                dataRatio="1500/842"
              />
              <Vimeo169
                src="/works/Wastetide/12.webp"
                alt="poster video"
                dataSrc="1199785554"
                dataRatio="1920/1080"
              />
              <VimeoTwoCards
                card1={{
                  dataSrc: "1199785560",
                  dataRatio: "790/898",
                  src: "/works/Wastetide/13.webp",
                  alt: "poster video",
                }}
                card2={{
                  dataSrc: "1199785562",
                  dataRatio: "1080/1228",
                  src: "/works/Wastetide/14.webp",
                  alt: "poster video",
                }}
              />
              <Frame01 src="/works/Wastetide/15.webp" alt="Wastetide 15" />
              <VimeoTwoCards
                card1={{
                  dataSrc: "1199785577",
                  dataRatio: "1580/1796",
                  src: "/works/Wastetide/16.webp",
                  alt: "poster video",
                }}
                card2={{
                  dataSrc: "1199785580",
                  dataRatio: "1080/1228",
                  src: "/works/Wastetide/17.webp",
                  alt: "poster video",
                }}
              />
              <Vimeo169
                src="/works/Wastetide/18.webp"
                alt="poster video"
                dataSrc="1199785582"
                dataRatio="1920/1080"
              />

              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1199785588",
                  dataRatio: "960/1080",
                  src: "/works/Wastetide/20.webp",
                  alt: "Poster video",
                }}
                image={{
                  src: "/works/Wastetide/19.webp",
                  alt: "Wastetide 19",
                }}
              />

              <Vimeo169
                src="/works/Wastetide/21.webp"
                alt="poster video"
                dataSrc="1199785602"
                dataRatio="1920/1080"
              />

              <Frame01 src="/works/Wastetide/22.webp" alt="Wastetide 22" />
              <Frame01 src="/works/Wastetide/23.webp" alt="Wastetide 23" />
              <Frame01 src="/works/Wastetide/24.webp" alt="Wastetide 24" />
              <Frame01 src="/works/Wastetide/25.webp" alt="Wastetide 25" />
              <Frame01 src="/works/Wastetide/26.webp" alt="Wastetide 26" />
              <TeamCredits
                rows={[
                  { role: "Global direction", names: "Rémy Godet" },
                  { role: "Project management", names: "Valentin Salmon" },
                  { role: "Strategy", names: "Rémy Godet, Lou Bontemps" },
                  { role: "Creative direction", names: "Lou Bontemps" },
                  { role: "3D Design", names: "Rémy Godet" },
                  {
                    role: "Motion Design",
                    names: "Rémy Godet, Bérengère Morel",
                  },
                  {
                    role: "Interactive Design",
                    names: "Rémy Godet, Valentin Salmon, Vincenzo Tilleul",
                  },
                  {
                    role: "UX/UI",
                    names:
                      "Rémy Godet, Vincenzo Tilleul, Lou Bontemps, Valentin Salmon",
                  },
                  { role: "Copywriting", names: "Lou Bontemps" },
                  { role: "Sound Design", names: "Tanguy Drobniewski" },
                  {
                    role: "Integration",
                    names: "Andrea Tuysuzian, Alexandre Tuysuzian",
                  },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Photography assistant", names: "Gurvann Touzé" },
                  { role: "Video", names: "Gurvann Touzé" },
                  { role: "Set design", names: "Pénélope Torres" },
                  { role: "Lighting", names: "Gurvann Touzé" },
                  { role: "Client", names: "Nicolas Brien" },
                ]}
                projectDescription={projectDescription}
                faq={<Faq items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Arcads"
          href="/works/arcads"
          media={{
            type: "vimeo",
            dataSrc: "1172577307",
            dataRatio: "1920/1080",
            posterSrc: "/works/Arcads/6.webp",
          }}
        />
      </div>
    </main>
  );
}
