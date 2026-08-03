import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Brand Strategy Consulting | anagram",
  description:
    "Anagram is a brand strategy consultant leading every project through positioning, differentiation, and messaging before any visual design begins.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function BrandStrategyConsultingPage() {
  return (
    <AgencyPageTemplate
      idPrefix="brand-strategy-consulting"
      verticalDividerDots={150}
      title="Brand Strategy Consulting: Anagram Studio"
      description="Anagram offers brand strategy consulting that defines how your market sees you: positioning, messaging, and brand architecture built for growth."
      vision={{
        eyebrow: "Approach",
        heading: "Brand Strategy Approach",
        intro:
          "Every branding project at Anagram starts with strategy. Before identity systems, motion, or websites are designed, we define how the company should be perceived, who it needs to resonate with, and what space it should own within its market.",
        blocks: [
          {
            id: "positioning-before-execution",
            title: "Positioning Before Execution",
            description:
              "A strong brand strategy creates alignment across every future touchpoint: product, communication, marketing, and design. The objective is not simply to look different, but to become strategically distinct in the eyes of the audience.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Brand Strategy Services",
        subtitle:
          "Anagram's strategy practice helps companies define positioning, messaging, and brand direction through concise strategic systems designed to support growth, differentiation, and long-term consistency.",
        items: [
          {
            id: "brand-positioning-differentiation",
            name: "Brand Positioning and Differentiation",
            tag: "Positioning",
            description:
              "We define the market position the brand should own, identifying target audiences, competitive opportunities, and strategic differentiation. Deliverables include positioning statements, competitive mapping, and value propositions designed to clarify why the brand wins against alternatives.",
          },
          {
            id: "messaging-architecture",
            name: "Messaging Architecture",
            tag: "Messaging",
            description:
              "Core messaging, proof points, audience-specific variants, and tone of voice guidelines are structured into a coherent narrative system designed to align teams and strengthen communication consistency.",
          },
          {
            id: "brand-platform",
            name: "Brand Platform",
            tag: "Platform",
            description:
              "Mission, vision, values, positioning, and messaging are consolidated into one strategic platform, the foundational document guiding every creative and communication decision that follows.",
          },
          {
            id: "audience-market-analysis",
            name: "Audience and Market Analysis",
            tag: "Insight",
            description:
              "Audience expectations, market dynamics, and competitor positioning are analyzed to identify strategic opportunities and define how the brand should evolve within its category.",
          },
          {
            id: "brand-naming-narrative-direction",
            name: "Brand Naming and Narrative Direction",
            tag: "Narrative",
            description:
              "We help brands explore naming systems, narrative territories, and conceptual directions capable of creating stronger memorability, differentiation, and long-term strategic clarity.",
          },
        ],
      }}
      results={{
        eyebrow: "In Action",
        heading: "Strategy in Action",
        intro:
          "Two examples of how a single strategic idea can shape an entire brand system.",
        stats: [],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo",
            industry: "Online Banking · France",
            description:
              "The strategic insight: transform the concept of “free banking” into something desirable and premium. The “0” became a recognizable emotional and visual brand asset, a feature turned into a strategic anchor that unified positioning, identity, and communication.",
            metrics: [
              "Strategic positioning",
              "“0” as brand asset",
              "Premium repositioning",
            ],
          },
          {
            id: "planity",
            image: {
              src: "/works/Planity/backstage/1.webp",
              alt: "Planity",
            },
            title: "Planity",
            industry: "B2B SaaS · Europe",
            description:
              "The “P as a door” positioning became a scalable strategic concept representing entry, transformation, and accessibility, flexible enough to carry both B2C and B2B markets across Europe, coherent enough to remain instantly recognizable everywhere.",
            metrics: [
              "“P as a door” concept",
              "B2C & B2B alignment",
              "European scale",
            ],
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Brand Strategy",
        ctaHeading: "Start With Strategy",
        ctaDescription:
          "Every strong brand begins with a clear point of view. Through positioning, messaging, and strategic direction, Anagram helps companies define how they want to be perceived before the market defines it for them. Brands that need no introduction.",
        ctaButtons: [
          {
            label: "Start a strategy session",
            href: "mailto:hello@anagram.club",
          },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a brand strategy consultant do?",
            answer:
              "A brand strategy consultant defines the positioning, messaging, and differentiation strategy behind a company, creating the strategic foundation that guides future design, communication, and marketing decisions.",
          },
          {
            question: "When does a company need brand strategy consulting?",
            answer:
              "Companies generally invest in strategy at launch, before a rebrand, ahead of fundraising, or when entering new markets, any moment where the brand needs to evolve intentionally and coherently.",
          },
          {
            question: "Can brand strategy be a standalone engagement?",
            answer:
              "Yes. Strategy can operate as an independent engagement, although many clients continue into identity design and execution once the strategic platform has been validated.",
          },
          {
            question: "How long does brand strategy take?",
            answer:
              "The strategy phase typically takes between 3 and 6 weeks depending on the project scope, the complexity of the market, and the depth of research required.",
          },
        ],
      }}
    />
  );
}
