import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import VimeoSound from "@/components/cases-frame/VimeoSound";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Semplice Branding | Brand Identity & Website for SaaS",
  description:
    "anagram created the brand identity and website for Semplice. Brand design for a SaaS startup by the Paris branding agency specializing in tech scale-ups.",
  alternates: { canonical: "/works/semplice" },
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Semplice",
  description:
    "Semplice is a tech product co-founded by Tobias Van Schneider, operating in a SaaS landscape where visual identities too often look alike. We partnered with Semplice to build a brand identity and website capable of expressing real differentiation: an identity built to convert and build credibility, not just to win design awards.",
  liveUrl: "https://www.semplice.com/",
};

const projectDescription = (
  <Fragment key="semplice-project-description">
    <p>
      Co-founded by Tobias Van Schneider, Semplice is a tech product for
      which anagram created the logo, full brand identity, and website in
      2025. The mission was to build a clear, memorable, and differentiated
      brand in a SaaS landscape where visual identities too often look
      alike.
    </p>
    <p className="mt-4">
      In a competitive SaaS market, a brand is a trust signal before the
      product demo even happens. It shapes first impressions with buyers,
      accelerates confidence in B2B sales cycles, and strengthens
      credibility during fundraising conversations.
    </p>
    <p className="mt-4">
      anagram&apos;s approach was to start from Semplice&apos;s business
      objectives and build an identity that works commercially, one that
      converts, builds credibility, and creates brand preference. Not a
      brand to win awards, but a brand built to drive growth.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What did anagram create for Semplice?",
    answer:
      "Logo, full brand identity, and website, designed to differentiate Semplice in a crowded SaaS market.",
  },
  {
    question: "What is anagram's approach to branding a SaaS product?",
    answer:
      "Starting from business objectives, conversion, credibility, differentiation, to build an identity that works commercially, not just aesthetically.",
  },
  {
    question: "Why does a SaaS startup need strong branding early?",
    answer:
      "A clear, distinctive brand creates immediate preference, lowers acquisition costs, and strengthens credibility with investors and enterprise buyers before the product sells itself.",
  },
];

export default function SempliceCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-semplice-seo-title" className="sr-only">
        Semplice Branding: brand identity and website by anagram, SaaS branding agency Paris
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Semplice/1.avif" alt="Semplice 1" priority />
              <VimeoSound
                dataSrc="1201691523"
                dataRatio="1920/1080"
                src="/works/Semplice/poster1.webp"
                alt="Semplice 2"
                priority
              />
              <Vimeo169
                src="/works/Semplice/2.avif"
                alt="poster video"
                dataSrc="1172503560"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Semplice/3.avif"
                alt="poster video 3"
                dataSrc="1172503590"
                dataRatio="1920/1080"
              />
              <VimeoSound
                dataSrc="1201691803"
                dataRatio="1920/1080"
                src="/works/Semplice/poster4.webp"
                alt="Semplice 4"
                priority
              />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="semplice-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Everyday"
          href="/works/everyday"
          media={{
            type: "vimeo",
            dataSrc: "1172585361",
            dataRatio: "1920/1080",
            posterSrc: "/works/Everyday/release/3.avif",
            posterAlt: "Everyday",
          }}
        />
      </div>
    </main>
  );
}
