import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import NextCase from "@/components/cases-frame/NextCase";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Arcads Branding | Brand Identity for AI Video Ad Platform",
  description:
    "anagram created the branding for Arcads, the platform generating high-quality AI video ads. Brand design and logo for an adtech SaaS startup.",
  alternates: { canonical: "/works/arcads" },
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Arcads",
  description:
    "Arcads helps brands quickly produce high-quality video ads, turning text into polished video content using AI actors and automation. We partnered with Arcads to create a brand identity and website capable of expressing that tension: AI performance and human creativity, from idea to impact.",
  liveUrl: "https://arcads.ai/",
};

const projectDescription = (
  <Fragment key="arcads-project-description">
    <p>
      Arcads helps brands quickly produce high-quality video ads by turning text
      into polished video content using AI actors and automation, a platform at
      the crossroads of marketing performance and generative AI.
    </p>
    <p className="mt-4">
      anagram created the logo, brand identity, and website for Arcads. The
      brief was to build an identity that captures the core tension of the
      product, AI performance and human creativity, while signaling a tech-first
      positioning to demanding marketing buyers.
    </p>
    <p className="mt-4">
      The Arcads symbol is built on clarity and motion. Two geometric shapes
      form an abstract &ldquo;A&rdquo;, a mark of ascension, precision, and
      forward momentum. The diagonal conveys progress, the solid vertical block
      anchors the brand in stability and confidence. Together, they mirror the
      product&apos;s promise: from idea to impact.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Arcads logo represent?",
    answer:
      "Two geometric shapes form an abstract “A”. The diagonal conveys forward movement and progress, the vertical block anchors the brand in stability and confidence. Together they represent the product flow: from input to impact.",
  },
  {
    question: "What did anagram deliver for Arcads?",
    answer: "Logo, full brand identity, and website.",
  },
  {
    question: "Why does an AI adtech startup need strong branding?",
    answer:
      "In an exploding market, brand is a trust signal. A coherent identity accelerates buyer confidence and differentiates in a space where dozens of competitors are emerging at the same time.",
  },
];

export default function ArcadsCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-arcads-seo-title" className="sr-only">
        Arcads Branding: brand identity for the platform turning text into AI video ads
      </h1>
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Arcads/1.avif" alt="Arcads 1" priority />
              <Frame02
                img1={{
                  src: "/works/Arcads/2.webp",
                  alt: "Arcads 2",
                }}
                img2={{
                  src: "/works/Arcads/3.png",
                  alt: "Arcads 3",
                }}
              />
              {/* <DarkTextCard
                text={`The Arcads symbol is built on clarity and motion.\nIts two geometric shapes form an abstract "A", a mark of ascension, progress, and precision. The diagonal conveys forward movement, while the solid vertical block anchors the brand in stability and confidence.\n\nTogether, they represent the balance between AI performance and human creativity, the core of what Arcads enables.\nThe symbol's upward flow mirrors the process of improvement embedded in our product: from idea to impact, from input to performance.\n\nThe bold, legible typography complements this structure, expressing reliability and modernity.\nIt ensures that the logo remains both timeless and flexible across any medium, from dynamic video compositions to digital interfaces.`}
              /> */}
              <Frame02
                img1={{
                  src: "/works/Arcads/4.webp",
                  alt: "Arcads 4",
                }}
                img2={{
                  src: "/works/Arcads/5.webp",
                  alt: "Arcads 5",
                }}
              />

              <Vimeo169
                src="/works/Arcads/6.webp"
                alt="Arcads video 1"
                dataSrc="1172577307"
                dataRatio="1920/1080"
              />

              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1172577350",
                  dataRatio: "816/908",
                  src: "/works/Arcads/8.avif",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/7.webp",
                  alt: "Arcads 7",
                }}
              />
              <Frame02
                img1={{
                  src: "/works/Arcads/9.webp",
                  alt: "Arcads 2",
                }}
                img2={{
                  src: "/works/Arcads/10.webp",
                  alt: "Arcads 3",
                }}
              />
              <Frame01 src="/works/Arcads/11.webp" alt="Arcads 11" />

              <VimeoImageCards
                video={{
                  dataSrc: "1172577266",
                  dataRatio: "816/908",
                  src: "/works/Arcads/12.webp",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/13.webp",
                  alt: "Arcads 13",
                }}
              />

              <VimeoImageCards
                video={{
                  dataSrc: "1172577375",
                  dataRatio: "816/908",
                  src: "/works/Arcads/15.avif",
                  alt: "Poster image video",
                }}
                image={{
                  src: "/works/Arcads/14.webp",
                  alt: "Arcads 15",
                }}
              />
              <Frame01 src="/works/Arcads/16.webp" alt="Arcads 16" />
              <Frame02
                img1={{
                  src: "/works/Arcads/17.webp",
                  alt: "Arcads 17",
                }}
                img2={{
                  src: "/works/Arcads/18.webp",
                  alt: "Arcads 18",
                }}
              />

              <Frame02
                img1={{
                  src: "/works/Arcads/19.webp",
                  alt: "Arcads 19",
                }}
                img2={{
                  src: "/works/Arcads/20.webp",
                  alt: "Arcads 20",
                }}
              />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="arcads-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Inbolt"
          href="/works/inbolt"
          media={{
            type: "vimeo",
            dataSrc: "1172492298",
            dataRatio: "3840/2160",
            posterSrc: "/works/Inbolt/inbolt-1-vimeo.webp",
          }}
        />
      </div>
    </main>
  );
}
