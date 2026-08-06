import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "amo Brand Design | Product Design & 3D for Social App",
  description:
    "anagram designed the key visual assets for amo social app: animated 3D hand, custom emoji system, and opening animation. Premium consumer product design.",
  alternates: { canonical: "/works/amo" },
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Amo",
  description:
    "amo is bringing friendship back to the center of the online experience through a suite of connected apps, ID, Bump, and Sugar, built for real relationships rather than endless feeds. We partnered with amo to produce the 3D, motion, and emoji assets capable of expressing that vision: a playful, intimate product experience built to strengthen genuine connection.",
  liveUrl: "https://amo.co/",
  release: {
    sections: [
      {
        id: "Context",
        label: "Context",
        description:
          "amo is bringing friendship back to the center of the online experience. While most social platforms evolved toward endless entertainment feeds, amo focuses on simple apps designed for real relationships.\n\nThrough a suite of connected apps including ID, Bump and Sugar, the platform allows friends to express themselves together, find each other and turn conversations into shared creations.",
      },
      {
        id: "objectives",
        label: "Objectives",
        description:
          "For the launch of its mobile ecosystem, amo needed a set of high-quality visual assets capable of translating its creative vision into a polished product experience.\n\nThe objective was to produce the key graphic elements required for the app while remaining fully aligned with the visual direction defined by the amo team.",
      },
      {
        id: "Role",
        label: "Role",
        description:
          "Creative direction and product design were led internally by the amo team.\n\nOur role was to translate their vision into refined graphic assets ready for production.",
      },
      {
        id: "Application",
        label: "Application",
        description:
          "Our agency produced several core visual assets for the application, including the animated 3D hand, the in-app emoji system and the app's opening animation.\n\nEach element was crafted to integrate seamlessly into the product experience.",
      },
    ],
  },
};

const projectDescription = (
  <Fragment key="amo-project-description">
    <p>
      amo is bringing friendship back to the center of the online experience.
      While most social platforms have evolved toward endless entertainment
      feeds, amo focuses on real relationships through a suite of connected
      apps: ID, Bump, and Sugar.
    </p>
    <p className="mt-4">
      For its mobile launch, amo needed high-quality visual assets to translate
      its creative vision into a polished product experience. Creative direction
      and product design were led internally by the amo team. anagram&apos;s
      role was to turn that vision into refined, production-ready graphic
      assets.
    </p>
    <p className="mt-4">
      The studio produced three foundational visual elements: the animated 3D
      hand, the in-app custom emoji system, and the app&apos;s opening
      animation. Each piece was crafted to integrate seamlessly into the product
      and reinforce amo&apos;s emotional identity, playful, intimate, and
      distinctly its own.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What did anagram produce for amo?",
    answer:
      "Three core visual assets: the animated 3D hand, a custom in-app emoji system, and the app's opening animation, all built to integrate into amo's existing product experience.",
  },
  {
    question: "What does the animated 3D hand represent?",
    answer:
      "It's a central expression of amo's identity, tactile, human, and playful. It physically embodies the idea of connection between friends in a digital space.",
  },
  {
    question:
      "Why does a consumer app need premium motion and 3D assets at launch?",
    answer:
      "First impressions define brand perception and emotional attachment. High-quality motion design at launch reduces churn and amplifies word-of-mouth before any marketing budget kicks in.",
  },
];

export default function AmoCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-amo-seo-title" className="sr-only">
        amo Brand Design: 3D product design and motion for the app putting
        friendship back at the center
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Amo/1.avif" alt="Amo 1" priority />
              <Vimeo169
                src="/works/Amo/2.avif"
                alt="poster 2"
                dataSrc="1172495593"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Amo/3.avif" alt="Amo 3" />
              <Frame02
                img1={{ src: "/works/Amo/4.avif", alt: "Amo 4" }}
                img2={{ src: "/works/Amo/5.avif", alt: "Amo 5" }}
              />
              <Frame01 src="/works/Amo/6.avif" alt="Amo 6" />
              <Frame02
                img1={{ src: "/works/Amo/7.avif", alt: "Amo 7" }}
                img2={{ src: "/works/Amo/8.avif", alt: "Amo 8" }}
              />
              <Frame01 src="/works/Amo/9.avif" alt="Amo 9" />
              <Vimeo169
                src="/works/Amo/10.avif"
                alt="poster 10"
                dataSrc="1172495642"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Amo/11.avif" alt="Amo 11" />
              <Frame02
                img1={{ src: "/works/Amo/12.avif", alt: "Amo 12" }}
                img2={{ src: "/works/Amo/13.avif", alt: "Amo 13" }}
              />
              <Frame01 src="/works/Amo/14.avif" alt="Amo 14" />
              <Image
                src="/works/Amo/15.avif"
                alt="Amo 15"
                width={2592}
                height={5619}
                sizes="100vw"
                className="w-full h-auto"
              />
              <Vimeo169
                src="/works/Amo/16.avif"
                alt="poster 16"
                dataSrc="1172495620"
                dataRatio="1920/1080"
              />
              <TeamCredits
                rows={[
                  { role: "Global direction", names: "Valentin Salmon" },
                  { role: "Project management", names: "Valentin Salmon" },
                  {
                    role: "Strategy",
                    names:
                      "Valentin Fougères, Nicolas Fallourd Paoletti, Julien Martin",
                  },
                  {
                    role: "Creative direction",
                    names:
                      "Valentin Fougères, Nicolas Fallourd Paoletti, Julien Martin",
                  },
                  {
                    role: "3D Design",
                    names: "Julien Brisson, André Nicolas, Clément Perron",
                  },
                  {
                    role: "Motion Design",
                    names: "André Nicolas, Clément Perron",
                  },
                  {
                    role: "Interactive Design",
                    names: "André Nicolas, Clément Perron",
                  },
                  { role: "UX/UI", names: "Valentin Fougères" },
                  {
                    role: "Clients",
                    names:
                      "Valentin Fougères, Nicolas Fallourd Paoletti, Julien Martin, Antoine Martin",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq key="amo-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Henoo"
          href="/works/henoo"
          media={{
            type: "vimeo",
            dataSrc: "1172136135",
            dataRatio: "1920/1080",
            posterSrc: "/works/Henoo/2.avif",
            posterAlt: "Henoo",
          }}
        />
      </div>
    </main>
  );
}
