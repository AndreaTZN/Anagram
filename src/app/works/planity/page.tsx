import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";

const navData: CaseNavData = {
  title: "Planity",
  description:
    "Strategy, Brand Identity, Design System, Product Design, Motion, Website",
  liveUrl: "https://planity.com",
  release: {
    sections: [
      {
        id: "context",
        label: "Context",
        description:
          "The leading booking platform for hair and beauty salons in France, seeking to modernise its brand identity to match its rapid growth and position itself as the go-to app for beauty professionals and clients alike.",
      },
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Evolve Planity's visual identity to reflect its market leadership while remaining approachable and trusted by both salon owners and end users.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "Build a scalable design system rooted in a warmer, more human tone — moving away from the generic SaaS aesthetic toward a brand that feels beauty-native.",
      },
      {
        id: "application",
        label: "Application",
        description:
          "Deploy the new identity across the app, marketing site, social templates, and partner-facing materials with a consistent typographic and color language.",
      },
      {
        id: "results",
        label: "Results",
        description:
          "Increased brand recognition among independent salon owners and a measurable improvement in app store ratings following the rebrand launch.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "brief",
        label: "Brief",
        description:
          "Planity needed to move beyond its startup roots and establish a visual identity worthy of its position as market leader.",
      },
      {
        id: "process",
        label: "Process",
        description:
          "We conducted in-depth interviews with salon owners and end users to understand how they perceive the brand and what they expect from it.",
      },
      {
        id: "iterations",
        label: "Iterations",
        description:
          "Multiple creative directions were explored over 10 weeks, testing everything from typographic systems to color palettes with real users.",
      },
    ],
  },
};

export default function PlanityPage() {
  return (
    <>
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10 pb-8">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-6">
              <Frame01
                src="/works/Planity/release/1.webp"
                alt="Planity release 1"
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-6">
              <Frame01
                src="/works/Planity/backstage/1.webp"
                alt="Planity backstage 1"
              />
              <Frame01
                src="/works/Planity/backstage/1.webp"
                alt="Planity backstage 1"
              />
            </div>
          }
        />
      </div>
    </>
  );
}
