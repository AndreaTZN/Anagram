import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import CaseStats from "@/components/cases-frame/CaseStats";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import NextCase from "@/components/cases-frame/NextCase";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Frame02 from "@/components/cases-frame/Frame02";

export const metadata: Metadata = {
  title: "Pennylane Branding — Brand & Website Redesign by Anagram",
  description:
    "Anagram Club redesigned Pennylane's brand and website, helping this French Tech 120 accounting SaaS reduce bounce rate by 13.5 points and boost conversions by 15%.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Pennylane",
  description:
    "Pennylane is the all-in-one financial and accounting management software part of the French Tech 120 for being one of the most promising start-ups in the French tech ecosystem. We partnered with this incredible team to better reflect what they do daily: simplify your financial and accounting life!",
  liveUrl: "https://www.pennylane.com/",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
    ],
  },
};

export default function PennylaneCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
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
              <DarkTextCard
                text={`Pennylane is the all-in-one financial and accounting management software part of the French Tech 120 for being one of the most promising start-ups in the French tech ecosystem.\n\nWe partnered with this incredible team to better reflect what they do daily: simplify your financial and accounting life!`}
              />

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
              <DarkTextCard
                text={`According to Pennylane, our designs helped them drop their bounce rate by -13,5 points and increase the conversion rate of their website by +15%.\n\nIt's always gratifying to see concrete results like these, especially when they translate into business success for our clients.\n\nAt anagram, we believe that design isn't just about aesthetics – it's about solving problems and achieving goals. Whether you're looking to improve your brand image, streamline your user experience, or boost your conversion rates, we're here to help.`}
              />
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
              <DarkTextCard
                text={`A huge thanks to the Pennylane team for this collaboration.\nMaxime Baumard, François Desazars, Jean de Colombel, Audrey Fournié`}
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
