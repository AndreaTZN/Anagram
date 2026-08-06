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
import SplitTextImage from "@/components/cases-frame/SplitTextImage";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Perma Branding | Brand Identity for Social Photo App",
  description:
    "anagram created the logo and brand identity for Perma, the photo sharing app built around community and exchange. Consumer brand design by anagram Paris.",
  alternates: { canonical: "/works/perma" },
  openGraph: { images: ["/opengraph.webp"] },
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Perma",
  description:
    "Perma is a social networking app for sharing photos, built around authentic exchange and community connection rather than competing on the scale of the giants dominating the category. We partnered with Perma to create a logo and brand identity capable of expressing that intimacy: a visual signature users wear as much as they see.",
};

const projectDescription = (
  <Fragment key="perma-project-description">
    <p>
      Perma is a social networking app for sharing photos, built around
      authentic exchange and community connection. In a landscape dominated
      by a handful of giants, Perma bets on intimacy and real connection to
      create a more meaningful sharing experience.
    </p>
    <p className="mt-4">
      anagram created the logo and brand identity for Perma with two guiding
      principles: exchange as the core value, and community unification as
      the brand&apos;s ambition. The logo integrates the letter
      &ldquo;P&rdquo; in a way that invites users to make it their own, a
      visual signature they wear as much as they see.
    </p>
    <p className="mt-4">
      For a consumer app, the logo is often the first and sometimes the only
      touchpoint before a download decision. It needs to communicate
      belonging instantly and create a pull toward the community it
      represents.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What does the Perma logo represent?",
    answer:
      "The letter “P” is integrated into the logo to invite user ownership and identification, a visual signature built around the values of exchange and community belonging.",
  },
  {
    question: "What did anagram deliver for Perma?",
    answer: "Logo and full brand identity.",
  },
  {
    question: "Why is a strong logo critical for a consumer social app?",
    answer:
      "The logo is often the only brand signal before a download decision. It needs to communicate community belonging instantly, making users feel like they want to be part of what it represents.",
  },
];

export default function PermaCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <h1 id="case-perma-seo-title" className="sr-only">
        Perma Branding: brand identity and logo for the photo sharing application
      </h1>
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Perma/1.webp" alt="Perma 1" priority />
              <Frame01 src="/works/Perma/2.avif" alt="Perma 2" />
              <Frame01 src="/works/Perma/3.avif" alt="Perma 3" />
              <SplitTextImage
                title="Logo"
                description='The logo is based on the values and goals of the Perma brand. Exchange is at the heart of its representation, as is the unification of the community. The letter "P" from Perma is integrated into the logo so that users can appropriate it and identify with the brand.'
                imageSrc="/works/Perma/4.avif"
                bgColor="#f3f0ed"
              />
              <Frame02
                img1={{
                  src: "/works/Perma/5.avif",
                  alt: "Perma release 5",
                }}
                img2={{
                  src: "/works/Perma/6.avif",
                  alt: "Perma release 6",
                }}
              />

              <Frame01 src="/works/Perma/7.avif" alt="Perma 7" />

              <Vimeo169
                src="/works/Perma/8.avif"
                alt="Perma video 1"
                dataSrc="1172151214"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Perma/9.avif" alt="Perma 9" />
              <Frame01 src="/works/Perma/10.avif" alt="Perma 10" />

              <VimeoTwoCards
                card1={{
                  dataSrc: "1172151240",
                  dataRatio: "1094/1254",
                  src: "/works/Perma/11.avif",
                  alt: "Perma 11",
                }}
                card2={{
                  dataSrc: "1172151189",
                  dataRatio: "1094/1254",
                  src: "/works/Perma/12.avif",
                  alt: "Perma 12",
                }}
              />

              <Frame01 src="/works/Perma/13.avif" alt="Perma 13" />
              <Frame01 src="/works/Perma/14.avif" alt="Perma 14" />
              <Frame01 src="/works/Perma/15.avif" alt="Perma 15" />
              <Frame01 src="/works/Perma/16.avif" alt="Perma 16" />
              <Frame01 src="/works/Perma/17.avif" alt="Perma 17" />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="perma-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Vizzia"
          href="/works/vizzia"
          media={{
            type: "vimeo",
            dataSrc: "1172566718",
            dataRatio: "2000/1124",
            posterSrc: "/works/Vizzia/1.avif",
          }}
        />
      </div>
    </main>
  );
}
