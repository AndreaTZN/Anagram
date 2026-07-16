import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Everyday Branding | Brand Identity for AI Game Studio | anagram",
  description:
    "anagram created the brand identity for Everyday, an AI-powered mobile game studio. Brand strategy, sun logo, and design system for daily engagement gaming.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Everyday",
  description:
    "Everyday is a mobile game studio exploring how AI can reshape play, building simple games designed to become a positive part of daily life. We partnered with Everyday to create a brand strategy and identity capable of expressing that idea: the sun as a symbol of daily rhythm, renewal, and positive energy.",
  liveUrl: "",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Create a brand that reflects the idea of daily engagement and positive routine.\n\nPosition the studio as both creative and technology driven, combining playful experiences with AI powered innovation.\n\nDesign an identity that expresses energy, optimism, and consistency while remaining simple and memorable.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The brand is built around the idea of daily presence.\n\nThe sun becomes the central symbol. It represents rhythm, renewal, and the positive energy people encounter every day.\n\nThrough this metaphor, the identity connects gaming with a small but meaningful daily ritual.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "Process",
        label: "Process",
        description:
          "The Everyday brand is built around the idea of the sun. A symbol of renewal, rhythm, and daily presence.\n\nThis reflects a simple ambition. Creating games people come back to every day. Not occasionally, but as part of a natural routine.\n\nThe identity was therefore designed to live across multiple contexts. Flexible, expressive, and capable of adapting to every moment of use.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "We chose to bring the brand directly into real life environments.\n\nThe goal was to express its entertainment value while showing that Everyday is not confined to screens. It exists beyond them.\n\nGames become something you can carry with you. In the city, at any time, as part of everyday life.",
      },
    ],
  },
};

const projectDescription = (
  <Fragment key="everyday-project-description">
    <p>
      Everyday is a mobile game studio exploring how AI can reshape play
      experiences. In a saturated market, it focuses on games players return to
      regularly, simple experiences designed to become a positive part of daily
      life.
    </p>
    <p className="mt-4">
      The brand strategy is built around the idea of daily presence. The sun
      becomes the central symbol, representing rhythm, renewal, and the positive
      energy people encounter every day. Through this metaphor, the identity
      connects gaming to a small but meaningful daily ritual, which is exactly
      what the studio is building toward.
    </p>
    <p className="mt-4">
      The logo draws from solar symbolism. Its radial composition evokes light,
      movement, and energy. The slightly imperfect circular arrangement
      introduces vitality and motion, reflecting games that evolve and stay
      engaging over time. anagram delivered the full creative scope: strategy,
      identity, design system, motion, illustration, website, and development.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Everyday logo represent?",
    answer:
      "A sun, symbolizing daily rhythm, renewal, and positive energy. Its radial composition and slightly imperfect circular arrangement introduce a sense of movement that mirrors games evolving over time.",
  },
  {
    question: "What was the brand strategy behind Everyday?",
    answer:
      "Positioning gaming as a positive daily ritual, using the sun as a universal metaphor for rhythm and renewal, giving the studio a clear emotional territory in a crowded market.",
  },
  {
    question: "What did anagram deliver for Everyday?",
    answer:
      "Brand strategy, brand identity, design system, motion design, illustration, website, and development.",
  },
];

const releaseTeamRows = [
  { role: "Global direction", names: "Guillaume Berthonneau" },
  { role: "Project management", names: "Emmanuel Julliot" },
  { role: "Strategy", names: "Lou Bontemps" },
  {
    role: "Creative direction",
    names: "Guillaume Berthonneau, Lou Bontemps",
  },
  { role: "3D Design", names: "Rémy Godet" },
  {
    role: "Motion Design",
    names: "Rémy Godet, Guillaume Berthonneau",
  },
  { role: "Interactive Design", names: "Valentin Salmon" },
  {
    role: "Photography",
    names: "Sébastien Marchand, Pénélope Torres",
  },
  { role: "Copywriting", names: "Lou Bontemps" },
  {
    role: "Integration",
    names: "Andrea Tuysuzian, Alexandre Tuysuzian",
  },
  {
    role: "Clients",
    names: "Olivier Le Bas, Jake Bales, Maxime Pham-Van, Manuel Pozo",
  },
];

const backstageTeamRows = [
  { role: "Project management", names: "Emmanuel Julliot" },
  {
    role: "Creative direction",
    names: "Emmanuel Julliot, Guillaume Berthonneau, Lou Bontemps",
  },
  { role: "Photography", names: "Sébastien Marchand" },
  { role: "Photography assistant", names: "Vincenzo Tilleul" },
  { role: "Set design", names: "Pénélope Torres" },
  { role: "Lighting", names: "Vincenzo Tilleul" },
  { role: "Models", names: "Pénélope Torres" },
  {
    role: "Clients",
    names: "Olivier Le Bas, Jake Bales, Maxime Pham-Van, Manuel Pozo",
  },
];

export default function EverydayCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Everyday/release/1.webp"
                alt="Everyday 1"
                priority
              />
              <Frame01 src="/works/Everyday/release/2.avif" alt="Everyday 2" />
              <Vimeo169
                src="/works/Everyday/release/3.avif"
                alt="poster 3"
                dataSrc="1172585361"
                dataRatio="1920/1080"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/4.webp",
                  alt: "Everyday 4",
                }}
                img2={{
                  src: "/works/Everyday/release/5.avif",
                  alt: "Everyday 5",
                }}
              />
              <Frame01 src="/works/Everyday/release/6.avif" alt="Everyday 6" />
              <Vimeo169
                src="/works/Everyday/release/7.avif"
                alt="poster 7"
                dataSrc="1172585205"
                dataRatio="1920/1080"
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/Everyday/release/8.avif",
                  alt: "Everyday 8",
                  dataSrc: "1172585332",
                  dataRatio: "970/1080",
                }}
                card2={{
                  src: "/works/Everyday/release/9.avif",
                  alt: "Everyday 9",
                  dataSrc: "1172585399",
                  dataRatio: "970/1080",
                }}
              />
              <Frame01
                src="/works/Everyday/release/10.webp"
                alt="Everyday 10"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/11.avif",
                  alt: "Everyday 11",
                }}
                img2={{
                  src: "/works/Everyday/release/12.webp",
                  alt: "Everyday 12",
                }}
              />
              <Frame01
                src="/works/Everyday/release/13.avif"
                alt="Everyday 13"
              />
              <Frame01
                src="/works/Everyday/release/14.avif"
                alt="Everyday 14"
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/Everyday/release/15.avif",
                  alt: "Everyday 15",
                  dataSrc: "1172585257",
                  dataRatio: "970/1080",
                }}
                card2={{
                  src: "/works/Everyday/release/16.avif",
                  alt: "Everyday 16",
                  dataSrc: "1172585291",
                  dataRatio: "970/1080",
                }}
              />
              <Frame01
                src="/works/Everyday/release/17.avif"
                alt="Everyday 17"
              />
              <Frame02
                img1={{
                  src: "/works/Everyday/release/18.avif",
                  alt: "Everyday 18",
                }}
                img2={{
                  src: "/works/Everyday/release/19.avif",
                  alt: "Everyday 19",
                }}
              />

              <Frame01
                src="/works/Everyday/release/20.avif"
                alt="Everyday 20"
              />
              <Frame01
                src="/works/Everyday/release/21.avif"
                alt="Everyday 21"
              />
              <Frame01
                src="/works/Everyday/release/22.avif"
                alt="Everyday 22"
              />
              <TeamCredits
                rows={releaseTeamRows}
                projectDescription={projectDescription}
                faq={<Faq key="everyday-faq-release" items={faqItems} />}
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Everyday/backstage/23.webp"
                alt="Everyday backstage 23"
                priority
              />
              <Frame01
                src="/works/Everyday/backstage/24.webp"
                alt="Everyday backstage 24"
              />
              <Frame01
                src="/works/Everyday/backstage/25.webp"
                alt="Everyday backstage 25"
              />
              <Frame01
                src="/works/Everyday/backstage/26.webp"
                alt="Everyday backstage 26"
              />
              <TeamCredits
                rows={backstageTeamRows}
                projectDescription={projectDescription}
                faq={<Faq key="everyday-faq-backstage" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Amo"
          href="/works/amo"
          media={{
            type: "vimeo",
            dataSrc: "1172495642",
            dataRatio: "1920/1080",
            posterSrc: "/works/Amo/10.avif",
            posterAlt: "Amo",
          }}
        />
      </div>
    </main>
  );
}
