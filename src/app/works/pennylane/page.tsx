import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import CaseStats from "@/components/cases-frame/CaseStats";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import NextCase from "@/components/cases-frame/NextCase";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Frame02 from "@/components/cases-frame/Frame02";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Pennylane Branding | Fintech Visual Identity Redesign | anagram",
  description:
    "anagram redesigned Pennylane's website: -13.5pt bounce rate, +15% conversion. Brand design and UX for the French Tech 120 accounting software.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Pennylane",
  description:
    "Pennylane is the all-in-one financial and accounting management software and a French Tech 120 scale-up, simplifying the financial life of entrepreneurs and accountants. We partnered with Pennylane on a brand identity and full website redesign capable of expressing that promise: a measurable growth lever, with a 13.5 point drop in bounce rate and a 15% increase in conversion, according to Pennylane's own data.",
  liveUrl: "https://www.pennylane.com/",
};

const projectDescription = (
  <Fragment key="pennylane-project-description">
    <p>
      Pennylane is the all-in-one financial and accounting management software
      and a member of the French Tech 120, one of France&apos;s most promising
      tech scale-ups. The platform simplifies the financial life of
      entrepreneurs and accountants, but its brand no longer reflected that
      promise clearly enough.
    </p>
    <p className="mt-4">
      anagram partnered with the Pennylane team on brand identity and a full
      website redesign, with one clear objective: improve commercial performance
      while strengthening brand coherence.
    </p>
    <p className="mt-4">
      The result speaks for itself. According to Pennylane, the work contributed
      to a 13.5 point drop in bounce rate and a 15% increase in website
      conversion rate, concrete proof that design is a growth lever, not a
      communication expense.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "What results did the Pennylane redesign generate?",
    answer:
      "A 13.5 point drop in bounce rate and a 15% increase in website conversion rate, according to Pennylane's own data.",
  },
  {
    question: "What did anagram deliver for Pennylane?",
    answer:
      "Brand identity and a full website redesign, focused on improving commercial performance and brand coherence.",
  },
  {
    question: "Why does a fintech need to invest in branding and UX?",
    answer:
      "In fintech, trust is the primary buying criterion. Coherent branding and polished UX reduce conversion friction and build credibility with accountants and CFOs who have zero tolerance for complexity.",
  },
];

export default function PennylaneCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Pennylane/1.avif"
                alt="Pennylane 1"
                priority
              />
              <Frame01 src="/works/Pennylane/2.avif" alt="Pennylane 2" />
              <CaseStats
                logo1={{
                  src: "/works/Pennylane/logo-pennylane.png",
                  alt: "Pennylane",
                }}
                logo2={{
                  src: "/works/Fortuneo/release/anagram-logo.png",
                  alt: "Anagram",
                }}
                stats={[
                  { value: "-13,5%", label: "Drop website bounce rate" },
                  { value: "+15%", label: "Increase website conversion rate" },
                ]}
              />
              {/* <DarkTextCard
                text={`Pennylane is the all-in-one financial and accounting management software part of the French Tech 120 for being one of the most promising start-ups in the French tech ecosystem.\n\nWe partnered with this incredible team to better reflect what they do daily: simplify your financial and accounting life!`}
              /> */}

              <Frame02
                img1={{
                  src: "/works/Pennylane/4.avif",
                  alt: "Pennylane 4",
                }}
                img2={{
                  src: "/works/Pennylane/5.avif",
                  alt: "Pennylane 5",
                }}
              />
              <Frame01 src="/works/Pennylane/6.avif" alt="Pennylane 6" />
              <Frame02
                img1={{
                  src: "/works/Pennylane/7.avif",
                  alt: "Pennylane 7",
                }}
                img2={{
                  src: "/works/Pennylane/8.avif",
                  alt: "Pennylane 8",
                }}
              />
              <Frame02
                img1={{
                  src: "/works/Pennylane/9.avif",
                  alt: "Pennylane 9",
                }}
                img2={{
                  src: "/works/Pennylane/10.avif",
                  alt: "Pennylane 10",
                }}
              />
              {/* <DarkTextCard
                text={`According to Pennylane, our designs helped them drop their bounce rate by -13,5 points and increase the conversion rate of their website by +15%.\n\nIt's always gratifying to see concrete results like these, especially when they translate into business success for our clients.\n\nAt anagram, we believe that design isn't just about aesthetics – it's about solving problems and achieving goals. Whether you're looking to improve your brand image, streamline your user experience, or boost your conversion rates, we're here to help.`}
              /> */}
              <Frame01 src="/works/Pennylane/11.avif" alt="Pennylane 11" />
              <Frame01 src="/works/Pennylane/12.avif" alt="Pennylane 12" />
              <Frame02
                img1={{
                  src: "/works/Pennylane/13.avif",
                  alt: "Pennylane 13",
                }}
                img2={{
                  src: "/works/Pennylane/14.avif",
                  alt: "Pennylane 14",
                }}
              />
              <Frame01 src="/works/Pennylane/15.avif" alt="Pennylane 15" />
              <Frame01 src="/works/Pennylane/16.avif" alt="Pennylane 16" />
              {/* <DarkTextCard
                text={`A huge thanks to the Pennylane team for this collaboration.\nMaxime Baumard, François Desazars, Jean de Colombel, Audrey Fournié`}
              /> */}
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="pennylane-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Bee"
          href="/works/bee"
          media={{
            type: "image",
            src: "/works/Bee/1.avif",
            alt: "Bee",
          }}
        />
      </div>
    </main>
  );
}
