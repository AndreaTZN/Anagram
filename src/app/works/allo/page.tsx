import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Allo Branding | Brand Identity for AI Phone System | anagram",
  description:
    "anagram created the brand identity for Allo, the AI phone system for small teams. Brand design and website for a SaaS startup freeing entrepreneurs from their phones.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Allo",
  description:
    "Allo is the AI phone system built for small teams, handling inbound calls and qualification so entrepreneurs can focus on their business instead of their phone. We partnered with Allo to create a brand identity and website capable of expressing that simplicity: an instantly trustworthy identity for small businesses with no bandwidth for complexity.",
  liveUrl: "https://www.withallo.com/",
};

const projectDescription = (
  <Fragment key="allo-project-description">
    <p>
      Allo is the AI phone system built for small teams. It handles inbound
      calls, automates qualification and responses, and lets entrepreneurs
      focus on their business instead of their phone.
    </p>
    <p className="mt-4">
      anagram created the logo, brand identity, and website for Allo with a
      clear objective: build a reassuring, instantly trustworthy identity for
      a target audience of small businesses and solo founders who have no
      bandwidth for complexity and need to trust a brand immediately.
    </p>
    <p className="mt-4">
      The result is an identity that directly reflects Allo&apos;s core
      promise: simplicity, efficiency, and time saved. Accessible and
      professional, making AI feel like a natural tool rather than an
      intimidating one.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What did anagram create for Allo?",
    answer: "Logo, full brand identity, and website.",
  },
  {
    question: "What was the creative challenge for the Allo brand?",
    answer:
      "Building a brand that makes AI telephony feel simple and trustworthy for small business owners who want results, not complexity, accessibility without sacrificing professionalism.",
  },
  {
    question: "How do you brand an AI product for non-technical users?",
    answer:
      "By centering the identity on the concrete benefit, saving time, staying focused, rather than the technology. For Allo, that meant a clear, direct, and reassuring brand voice and visual language.",
  },
];

export default function AlloCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-allo-seo-title" className="sr-only">
        Allo Branding: brand identity and website for the AI phone system that handles your calls for you
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Allo/1.webp" alt="Allo 1" priority />
              <Frame01 src="/works/Allo/2.webp" alt="Allo 2" />
              <Frame01 src="/works/Allo/3.webp" alt="Allo 3" />
              <Frame01 src="/works/Allo/4.webp" alt="Allo 4" />
              <Frame01 src="/works/Allo/5.webp" alt="Allo 5" />
              <Frame01 src="/works/Allo/6.webp" alt="Allo 6" />
              <Frame01 src="/works/Allo/7.webp" alt="Allo 7" />
              <Frame01 src="/works/Allo/8.webp" alt="Allo 8" />
              <Frame01 src="/works/Allo/9.webp" alt="Allo 9" />
              <Frame01 src="/works/Allo/10.webp" alt="Allo 10" />
              <Frame01 src="/works/Allo/11.webp" alt="Allo 11" />
              <Frame01 src="/works/Allo/12.webp" alt="Allo 12" />
              <Frame01 src="/works/Allo/13.webp" alt="Allo 13" />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="allo-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Tilt"
          href="/works/tilt"
          media={{
            type: "vimeo",
            dataSrc: "1172158224",
            dataRatio: "1920/1080",
            posterSrc: "/works/Tilt/1.avif",
            posterAlt: "Tilt",
          }}
        />
      </div>
    </main>
  );
}
