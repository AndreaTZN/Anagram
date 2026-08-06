import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import NextCase from "@/components/cases-frame/NextCase";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import FourPhones from "@/components/cases-frame/FourPhones";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Bee Branding | Brand Identity for Wearable AI | anagram",
  description:
    "anagram created the brand identity for Bee, the wearable AI assistant that adapts to you. Logo, brand design and website for a hardware AI startup.",
  alternates: { canonical: "/works/bee" },
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Bee",
  description:
    "Bee is the wearable AI assistant designed to understand and adapt to each user, betting on hardware in a market flooded with software-based AI interfaces. We partnered with Bee to create a brand identity, website, and photography direction capable of expressing that bet: making AI feel desirable and reassuring as an everyday physical object.",
  liveUrl: "https://bee.computer/",
};

const projectDescription = (
  <Fragment key="bee-project-description">
    <p>
      Bee is the wearable AI assistant designed to understand and adapt to
      each user. In a market flooded with software-based AI interfaces, Bee
      bets on hardware: a discreet, always-available physical device that
      learns from you over time. Bee was acquired by Amazon in 2025, marking
      its entry into the wearable AI space.
    </p>
    <p className="mt-4">
      anagram created the logo, full brand identity, website, and photography
      direction for Bee. Every element of the logo carries intentional
      meaning. The organic curves evoke modularity and adaptability, the
      connected wings symbolize seamless connectivity, and the 20 degree
      upward tilt signals evolution and forward momentum.
    </p>
    <p className="mt-4">
      The creative challenge was to make AI feel both desirable and
      reassuring as a physical everyday object. Not too technical, not too
      generic, a premium brand capable of owning a space that barely existed
      yet.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Bee logo represent?",
    answer:
      "Each element is intentional. The curves evoke modularity and adaptability, the connected wings symbolize connectivity, and the 20 degree upward tilt signals evolution and progress.",
  },
  {
    question: "What did anagram deliver for Bee?",
    answer: "Logo, full brand identity, website, and photography direction.",
  },
  {
    question: "How do you brand a wearable AI product for mainstream appeal?",
    answer:
      "By centering the identity on daily use and personal adaptation rather than the underlying technology, making AI feel tangible, comfortable, and emotionally desirable rather than intimidating.",
  },
];

export default function BeeCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-bee-seo-title" className="sr-only">
        Bee Branding: brand identity for the wearable AI assistant that understands you
      </h1>
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Bee/1.avif" alt="Bee 1" priority />
              <Frame01 src="/works/Bee/2.avif" alt="Bee 2" />
              <SplitTextImage
                title="Logo"
                description={`This logo represents a bee in an abstract manner. Its curves and graphic rendering evoke modularity, symbolizing Bee's ability to adapt to any user. The "wings" of the bee are organically connected to represent connectivity. The relatively smooth curves convey a sense of security and make the idea of using an AI device in everyday life more comforting. The icon is tilted 20% upwards to symbolize evolution.`}
                imageSrc="/works/Bee/3.avif"
                bgColor="#f3f0ed"
                imageFit="contain"
              />
              <Vimeo169
                src="/works/Bee/4.avif"
                alt="poster video"
                dataSrc="1172066576"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Bee/5.avif" alt="Bee 5" />
              <Frame01 src="/works/Bee/6.avif" alt="Bee 6" />
              <Frame02
                img1={{ src: "/works/Bee/7.avif", alt: "Bee 7" }}
                img2={{ src: "/works/Bee/8.avif", alt: "Bee 8" }}
              />
              <Frame01 src="/works/Bee/9.avif" alt="Bee 9" />
              <Frame01 src="/works/Bee/10.avif" alt="Bee 10" />
              <Frame02
                img1={{ src: "/works/Bee/11.avif", alt: "Bee 11" }}
                img2={{ src: "/works/Bee/12.avif", alt: "Bee 12" }}
              />
              <FourPhones
                bgColor="#000000"
                phone1={{ src: "/works/Bee/13.avif", alt: "Bee 13" }}
                phone2={{ src: "/works/Bee/14.avif", alt: "Bee 14" }}
                phone3={{ src: "/works/Bee/15.avif", alt: "Bee 15" }}
                phone4={{ src: "/works/Bee/16.avif", alt: "Bee 16" }}
              />
              <VimeoImageCards
                video={{
                  dataSrc: "1172066565",
                  dataRatio: "2000/2500",
                  src: "/works/Bee/17.webp",
                  alt: "Poster image",
                }}
                image={{
                  src: "/works/Bee/18.avif",
                  alt: "Bee 18",
                }}
              />
              <Frame01 src="/works/Bee/19.avif" alt="Bee 19" />
              <Frame01 src="/works/Bee/20.avif" alt="Bee 20" />
              <Frame01 src="/works/Bee/21.avif" alt="Bee 21" />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="bee-faq" items={faqItems} />}
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
