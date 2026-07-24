import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import PortraitQuote from "@/components/cases-frame/PortraitQuote";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Politico.eu Redesign | Design System & UX for Media",
  description:
    "anagram redesigned the UX and design system for Politico.eu to support the .com/.eu merger. Result: improved UX, better discoverability, and significant traffic gains.",
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Politico",
  description:
    "Politico is renowned for the accuracy and speed of its political and institutional coverage, and needed a unified experience to support the merger of Politico.com and Politico.eu. We partnered with Politico to build a mobile-first design system and UX capable of expressing that merger: one consistent, modular experience across international markets.",
  liveUrl: "https://www.politico.eu/",
};

const projectDescription = (
  <Fragment key="politico-project-description">
    <p>
      Politico is renowned for the accuracy and speed of its political and
      institutional coverage. To support the merger of Politico.com and
      Politico.eu, a full redesign of the user experience and the editorial
      team&apos;s publishing process was necessary.
    </p>
    <p className="mt-4">
      anagram developed a simple, efficient design system built mobile-first.
      The system is based on a limited set of components and rules that
      allow every interface element to be created while maintaining
      experience consistency across international markets.
    </p>
    <p className="mt-4">
      The new site delivers a simplified yet richer experience where the
      modular system promotes both editorial selections and breaking news.
      According to Politico, the collaboration delivered measurable
      improvements: stronger UX, better content discoverability, and
      significant traffic gains.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What did anagram deliver for Politico?",
    answer:
      "A full UX redesign and design system for Politico.eu, built mobile-first to support the merger of the .com and .eu platforms across international markets.",
  },
  {
    question: "What results did the Politico redesign generate?",
    answer:
      "According to Politico, the redesign contributed to measurable improvements in platform performance: stronger UX, better content discoverability, and significant traffic gains.",
  },
  {
    question: "Why does a global media platform need a design system?",
    answer:
      "A design system ensures visual consistency across all markets, accelerates editorial production, and guarantees a unified user experience regardless of language or platform.",
  },
];

export default function PoliticoCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-politico-seo-title" className="sr-only">
        Politico Redesign: design system and UX redesign for the international editorial platform merger
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Politico/1.avif" alt="Politico 1" priority />
              <Frame01 src="/works/Politico/2.avif" alt="Politico 2" />
              <PortraitQuote
                avatarSrc="/works/Politico/3.avif"
                description="Working with Anagram contributed to measurable improvements in the performance of our digital platform politico.eu. The redesign enhanced both user experience and discoverability, which, alongside a strong news cycle, resulted in significant traffic gains. While the success reflects a combination of factors, the design and UX improvements delivered by Anagram played a key role."
              />
              <DarkTextCard text="Politico is renowned for its accuracy in disseminating information to stay ahead of its competitors, providing precisely what you need, when you need it. To accompany the merger of Politico.com and Politico.eu, a revision of the website's user experience and the editorial team's publishing process was necessary." />
              <Frame01 src="/works/Politico/4.avif" alt="Politico 4" />
              <DarkTextCard text="We have developed a simple and efficient design system. Designed with a mobile-centric approach, this system is based on a limited set of components and rules, allowing for the creation of all interface elements while maintaining consistency in the user experience. This new interface guarantees consistent branding across international markets. The new site offers a simplified yet richer experience. Our modular design system promotes both editorial selections and the dissemination of the latest news." />
              <Frame01 src="/works/Politico/5.avif" alt="Politico 5" />
              <Frame01 src="/works/Politico/6.avif" alt="Politico 6" />
              <Frame01 src="/works/Politico/7.avif" alt="Politico 7" />
              <Frame01 src="/works/Politico/8.avif" alt="Politico 8" />
              <Frame01 src="/works/Politico/9.avif" alt="Politico 9" />
              <Frame01 src="/works/Politico/10.avif" alt="Politico 10" />
              <Frame01 src="/works/Politico/11.avif" alt="Politico 11" />
              <Frame01 src="/works/Politico/12.avif" alt="Politico 12" />
              <Frame01 src="/works/Politico/13.avif" alt="Politico 13" />
              <Frame01 src="/works/Politico/14.avif" alt="Politico 14" />
              <Frame01 src="/works/Politico/15.avif" alt="Politico 15" />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="politico-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Twin"
          href="/works/twin"
          media={{
            type: "image",
            src: "/works/twin/1.avif",
            alt: "Twin",
          }}
        />
      </div>
    </main>
  );
}
