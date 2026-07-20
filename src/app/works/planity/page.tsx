import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import NextCase from "@/components/cases-frame/NextCase";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Planity Branding | Brand Identity & Product Design | anagram",
  description:
    "How anagram redesigned Planity's brand for European expansion: brand strategy, design system, product design. +50% bookings per second.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Planity",
  description:
    "Planity is France's leading online booking platform for beauty and wellness professionals, used by millions of clients to find and book appointments. We partnered with Planity to create a brand identity and product design system capable of expressing its next phase of growth: turning a functional booking app into a brand ready for European expansion.",
  liveUrl: "https://www.planity.com/",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Simplify the booking experience by reducing friction and improving conversion, while evolving the product beyond a purely functional interface. \n\nBuild a stronger, more emotional and distinctive brand aligned with modern beauty codes, capable of supporting B2C adoption, reinforcing the B2B model, and enabling European expansion.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The new identity is built from the letter P in Planity, transformed into a central symbol: the door. \n\nA universal gesture, the door represents the moment you step into a salon, a threshold of transformation and well-being. \n\nFlexible by nature, it can adapt in scale and style, becoming a structuring graphic element that frames content and compositions. \n\nUsed consistently, it ensures visual coherence across all touchpoints while remaining adaptable to different contexts and markets.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "Process",
        label: "Process",
        description:
          "Over the past three years, we have progressively built and refined Planity’s brand assets through a structured, iterative process, using the “door” strategy as a strong foundation to ensure long-term consistency and coherent evolution.",
      },
      {
        id: "B2B Textures",
        label: "B2B Textures",
        description:
          "We extended the same strategic approach to B2B touchpoints, crafting refined textures and visual systems designed to resonate with a premium audience, strengthen credibility, and support lead generation among decision-makers.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "For the B2C audience, we introduced a more human and expressive photographic direction, moving from black-and-white to color to bring warmth and modernity to the brand. The shoots were conducted both in studio and at the Niemeyer Space in Paris, selected for its strong architectural presence and minimalist aesthetic. Designed with the website’s UX constraints in mind, particularly within the hero section, the imagery remains simple and focused, ensuring clarity, impact, and consistency across touchpoints.",
      },
      {
        id: "B2C Textures",
        label: "B2C Textures",
        description:
          "The goal was to stay close to the B2C audience while remaining consistent with the visual direction established for B2B photography and the more human side of the website.",
      },
    ],
  },
};

const projectDescription = (
  <Fragment key="planity-project-description">
    <p>
      As France&apos;s market leader in beauty booking, Planity was entering a
      pivotal growth phase: accelerating adoption and preparing for European
      expansion. Despite a strong product, its functional brand no longer
      matched its ambitions or the emotional expectations of its users.
    </p>
    <p className="mt-4">
      anagram led the full creative scope: brand strategy, copywriting, brand
      identity, design system, product design, motion design, illustration,
      website, photography, and development.
    </p>
    <p className="mt-4">
      The new identity is built around a door symbol, a metaphor for entering
      the salon and transformation. The &ldquo;P&rdquo; becomes a threshold,
      flexible and scalable, designed to frame content consistently across all
      touchpoints and markets. The system rolled out progressively across B2C
      then B2B surfaces, simplifying journeys and building a brand users
      actually want to engage with.
    </p>
    <p className="mt-4">
      Three years of iterative work. Measured result: +50% appointment bookings
      per second.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Planity logo represent?",
    answer:
      "The “P” was reimagined as a door, an entry point into the salon experience and a metaphor for personal transformation. It frames content across every brand touchpoint.",
  },
  {
    question: "What did anagram deliver for Planity?",
    answer:
      "A complete mission covering brand strategy, identity, design system, product design, motion, website, photography, and development across B2C and B2B markets in Europe.",
  },
  {
    question: "What results did the Planity rebrand generate?",
    answer:
      "+50% appointment bookings per second, and a coherent design system supporting Planity's ongoing European expansion.",
  },
  {
    question: "How long did the collaboration last?",
    answer:
      "Over three years, with an iterative process of building and refining brand assets in step with Planity's growth.",
  },
];

export default function PlanityPage() {
  return (
    <main className="relative flex-1 pt-6 pr-6 pl-2 pb-6 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-planity-seo-title" className="sr-only">
        Planity Branding: brand identity and product design for Europe&apos;s number one beauty booking platform
      </h1>
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Planity/release/1.webp"
                alt="Planity release 1"
                priority
              />
              <Vimeo169
                src="/works/Planity/release/2.webp"
                alt="poster image video 1"
                dataSrc="1160987001"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/3.webp"
                alt="poster image video 2"
                dataSrc="1160987043"
                dataRatio="2220/1380"
              />
              <Frame01
                src="/works/Planity/release/4.webp"
                alt="Planity release 4"
              />
              <Vimeo169
                src="/works/Planity/release/5.webp"
                alt="poster image video 3"
                dataSrc="1160987078"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/6.webp"
                alt="poster image video 4"
                dataSrc="1160987125"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/7.webp"
                alt="poster image video 5"
                dataSrc="1160987173"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/release/8.webp"
                alt="Planity release 8"
              />
              <Vimeo169
                src="/works/Planity/release/9.webp"
                alt="poster image video 6"
                dataSrc="1160987224"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/10.webp"
                alt="poster image video 7"
                dataSrc="1160987271"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/11.webp"
                alt="poster image video 8"
                dataSrc="1160987325"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/release/12.webp"
                alt="Planity release 12"
              />
              <Vimeo169
                src="/works/Planity/release/13.webp"
                alt="poster image video 9"
                dataSrc="1160987373"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/14.webp"
                alt="poster image video 10"
                dataSrc="1160987425"
                dataRatio="3840/2160"
              />
              <Frame02
                img1={{ src: "/works/Planity/release/15.webp", alt: "..." }}
                img2={{ src: "/works/Planity/release/16.webp", alt: "..." }}
              />
              <Frame01
                src="/works/Planity/release/17.webp"
                alt="Planity release 17"
              />
              <Frame02
                img1={{ src: "/works/Planity/release/18.webp", alt: "..." }}
                img2={{ src: "/works/Planity/release/19.webp", alt: "..." }}
              />
              <Frame01
                src="/works/Planity/release/20.webp"
                alt="Planity release 20"
              />
              <Frame01
                src="/works/Planity/release/21.webp"
                alt="Planity release 21"
              />
              <Frame01
                src="/works/Planity/release/22.webp"
                alt="Planity release 22"
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
                    names: "Valentin Salmon, Emmanuel Julliot, Anthony Velen",
                  },
                  {
                    role: "3D Design",
                    names: "Anthony Velen, Emmanuel Julliot",
                  },
                  {
                    role: "Motion Design",
                    names: "Valentin Salmon, Anthony Velen",
                  },
                  { role: "Interactive Design", names: "Valentin Salmon" },
                  { role: "UX/UI", names: "Valentin Salmon, Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Video", names: "Gurvann Touzé" },
                  {
                    role: "Copywriting",
                    names: "Ameerah Musbally, Camille Guilgaut, Pauline Katz",
                  },
                  {
                    role: "Integration",
                    names: "Alexandre Tuysuzian, Andrea Tuysuzian, Planity",
                  },
                  {
                    role: "Clients",
                    names:
                      "Ameerah Musbally, Camille Guilgaut, Antoine Puymirat, Pauline Katz, Chiraz Hassen, Jérémy Queroy",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq key="planity-faq-release" items={faqItems} />}
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Planity/backstage/1.webp"
                alt="Planity backstage 1"
              />
              <Frame01
                src="/works/Planity/backstage/25.webp"
                alt="Planity backstage 25"
              />
              <Frame01
                src="/works/Planity/backstage/26.webp"
                alt="Planity backstage 26"
              />
              <VimeoImageCards
                video={{
                  dataSrc: "1160986982",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/27.webp",
                  alt: "Poster image video backstage",
                }}
                image={{
                  src: "/works/Planity/backstage/28.webp",
                  alt: "Image backstage 28",
                }}
              />
              <Vimeo169
                src="/works/Planity/backstage/29.webp"
                alt="poster image video 29"
                dataSrc="1160987062"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/backstage/30.webp"
                alt="poster image video 30"
                dataSrc="1160987102"
                dataRatio="3456/1944"
              />
              <Frame02
                img1={{ src: "/works/Planity/backstage/31.webp", alt: "..." }}
                img2={{ src: "/works/Planity/backstage/32.webp", alt: "..." }}
              />
              <Vimeo169
                src="/works/Planity/backstage/33.webp"
                alt="poster image video 33"
                dataSrc="1160987149"
                dataRatio="3456/1944"
              />
              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1160987193",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/35.webp",
                  alt: "Poster image video backstage",
                }}
                image={{
                  src: "/works/Planity/backstage/34.webp",
                  alt: "Image backstage 34",
                }}
              />
              <Frame01
                src="/works/Planity/backstage/35.webp"
                alt="Planity backstage 35"
              />
              <Frame01
                src="/works/Planity/backstage/36.webp"
                alt="Planity backstage 36"
              />
              <Vimeo169
                src="/works/Planity/backstage/37.webp"
                alt="poster image video 37"
                dataSrc="1160987349"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/backstage/38.webp"
                alt="poster image video 38"
                dataSrc="1160987405"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/backstage/39.webp"
                alt="Planity backstage 39"
              />
              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1160987441",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/42.webp",
                  alt: "Poster image video backstage 42",
                }}
                image={{
                  src: "/works/Planity/backstage/41.webp",
                  alt: "Image backstage 41",
                }}
              />
              <Frame01
                src="/works/Planity/backstage/43.webp"
                alt="Planity backstage 43"
              />
              <Vimeo169
                src="/works/Planity/backstage/44.webp"
                alt="poster image video 44"
                dataSrc="1160987478"
                dataRatio="3456/1944"
              />

              <TeamCredits
                rows={[
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  {
                    role: "Photography assistant",
                    names: "Camille Poildessous",
                  },
                  { role: "Video", names: "Gurvann Touzé" },
                  { role: "Set design", names: "Pénélope Torres" },
                  { role: "Lighting", names: "Gurvann Touzé" },
                  { role: "Makeup artist", names: "Allison le Fur" },
                  { role: "Hairdresser", names: "Dylan Lebahy, Gabin Ahmed" },
                  { role: "Barber", names: "Aldrick Quéval" },
                  {
                    role: "Stylist",
                    names:
                      "Camille Poildessous, Ameerah Musbally, Camille Guilgaut, Pauline Katz",
                  },
                  {
                    role: "Models",
                    names:
                      "Marion Delorme, Yéro Mbow, Shannon Durand, Valentin Soares, Anthony Lewis, Agathe Fournier, Wissal Baroudi, Faiz Mahmoud, Nahil Mahmoud, Triana Muñoz, Lucas Meslet, Fanny Andriamasy, Silvestri Alan, Louann Pinel",
                  },
                  {
                    role: "Clients",
                    names:
                      "Ameerah Musbally, Camille Guilgaut, Antoine Puymirat, Pauline Katz, Chiraz Hassen, Jérémy Queroy",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq key="planity-faq-backstage" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Fortuneo"
          href="/works/fortuneo"
          media={{
            type: "vimeo",
            dataSrc: "1164024409",
            dataRatio: "1920/1080",
            posterSrc: "/works/Fortuneo/release/2.webp",
          }}
        />
      </div>
    </main>
  );
}
