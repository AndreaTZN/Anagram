import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Brand Positioning Agency | anagram",
  description:
    "Anagram is a brand positioning agency: every project starts by defining the unique market position that makes a brand worth choosing over the rest.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function BrandPositioningAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="brand-positioning-agency"
      title="Brand Positioning Agency That Defines Where You Stand, and Makes It Impossible to Ignore"
      description="Anagram is a brand positioning agency, a branding studio whose every project starts with positioning: defining the unique place in the market that makes a brand worth choosing over everything else. Positioning is not a tagline. It's a strategic claim about what the brand is for, who it's for, and why it wins. For Fortuneo, that claim was the “0”, free banking repositioned as premium desirability rather than a discount. Every identity, campaign, and product decision Anagram makes starts from a position this clear, because a brand without one is forced to compete on price."
      vision={{
        eyebrow: "Approach",
        heading: "Brand Positioning as a Strategic Discipline",
        intro:
          "Brand positioning is the decision that determines how every other brand decision gets made. It's not a tagline or a mood board. It's a clear claim about what a brand is for, who it's for, and why it wins. Change the positioning, and the logo, the messaging, the photography direction, and the product experience all need to follow. Get it right once, and every creative decision downstream becomes faster and clearer.",
        blocks: [
          {
            id: "positioning-as-a-strategic-asset",
            title: "Positioning as a Strategic Asset",
            description:
              "A well-defined position gives a brand permission to do some things and rules out others. It's a creative constraint that makes every downstream decision clearer and faster. Brands without clear positioning are forced to compete on price, because they can't articulate why they're worth choosing over the alternative sitting right next to them.",
          },
          {
            id: "differentiation-in-crowded-markets",
            title: "Differentiation in Crowded Markets",
            description:
              "In saturated categories, differentiation isn't about being better. It's about being different in a way that matters to the right audience. Fortuneo differentiated in the crowded French banking market by owning the “free” positioning in a premium way, rather than competing on features everyone already claims to have.",
          },
          {
            id: "positioning-that-scales",
            title: "Positioning That Scales",
            description:
              "A positioning built for where a company is today may not hold as it grows. Anagram's positioning work is designed to be durable, not just relevant to the current moment, Planity's “P as a door” scaled from B2C France to B2B expansion across Europe without losing its meaning.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Brand Positioning Services",
        subtitle:
          "Anagram's positioning practice covers the full scope, from research to a finished brand platform.",
        items: [
          {
            id: "competitive-landscape-analysis",
            name: "Competitive Landscape Analysis",
            tag: "Research",
            description:
              "A systematic audit of the competitive set, visual codes, messaging, positioning claims, and whitespace in the market, to identify where a brand can own something distinct rather than compete on the same ground as everyone else.",
          },
          {
            id: "brand-architecture",
            name: "Brand Architecture",
            tag: "Structure",
            description:
              "Defining the structure of the brand: how sub-brands, product lines, and audience segments relate to each other and to the parent brand, so the whole system stays legible as it grows.",
          },
          {
            id: "value-proposition-development",
            name: "Value Proposition Development",
            tag: "Value",
            description:
              "Articulating what the brand offers that is uniquely valuable, not a list of features, but a compelling reason to choose this brand over every other option in the category.",
          },
          {
            id: "messaging-platform",
            name: "Messaging Platform",
            tag: "Voice",
            description:
              "The core message, the proof points, the audience-specific message variants, and the brand voice guidelines, everything a copywriter or marketing team needs to communicate the positioning consistently across every channel.",
          },
          {
            id: "brand-voice-narrative",
            name: "Brand Voice and Narrative",
            tag: "Narrative",
            description:
              "How the brand sounds: a verbal identity as distinctive and consistent as the visual one. Positioning expressed through words is just as important as positioning expressed through design; both need to tell the same story.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Translation",
        heading: "How Positioning Translates Into Design",
        intro:
          "Every visual decision is ultimately a positioning decision. Typography signals who the brand is for. The color palette makes a promise. Photography direction says something about the brand's values. Positioning is not a strategy document that sits in a drawer after the workshop ends. It's the brief that every creative decision gets held against, from the first logo sketch to the last line of website copy.",
        blocks: [
          {
            id: "from-positioning-to-visual-identity",
            title: "From Positioning to Visual Identity",
            quote: "The strategy becomes the symbol.",
            description:
              "The positioning claim informs the visual concept, which informs the logo, typography, and color palette. Anagram's process keeps this chain of logic explicit throughout: for Fortuneo, the “0” is both a strategic claim, free banking, and a visual asset, a dynamic graphic element carried across the entire brand system.",
          },
          {
            id: "consistency-across-every-touchpoint",
            title: "Consistency Across Every Touchpoint",
            quote: "Positioning is only real when it appears everywhere.",
            description:
              "Positioning is only real if it shows up everywhere: the website, the product, the social presence, the photography, the motion assets. Because Anagram handles strategy through web development internally, the positioning stays consistent across every touchpoint, not just inside a guidelines document nobody opens again.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Positioning Work in Practice",
        stats: [],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo",
            industry: "France's most affordable online bank",
            description:
              "Fortuneo is France's most affordable online bank, but affordable had come to mean cheap. The strategic challenge was to make “free” feel premium. Anagram's solution: the “0” as a brand asset, the symbol of free banking transformed into a dynamic, desirable graphic element carried across identity, motion, and product.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+77% awareness and consideration",
            ],
          },
          {
            id: "planity",
            image: {
              src: "/works/Planity/backstage/1.webp",
              alt: "Planity",
            },
            title: "Planity",
            industry: "Market leader in salon bookings",
            description:
              "Planity was the market leader in salon bookings, but its brand felt functional. It didn't match the emotional significance of a salon visit for its users. Anagram's solution: the “P as a door”, entry and transformation, the emotional core of the salon experience made visual.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Brand Positioning Across Industries",
        items: [
          {
            id: "technology-saas",
            name: "Technology and SaaS",
            description:
              "Making a complex, often invisible product feel clear, desirable, and human, especially in crowded categories where every product claims to be the all-in-one solution.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech and Financial Services",
            description:
              "Finding the distinct space between legacy incumbents (trustworthy but stodgy) and new entrants (modern but unproven). The brands that win own a specific emotional territory.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer and Lifestyle",
            description:
              "In D2C and consumer brands, positioning is inseparable from culture: the brand needs to stand for something people want to be associated with, not just something they want to buy.",
          },
          {
            id: "b2b-professional-services",
            name: "B2B and Professional Services",
            description:
              "Enterprise buyers evaluate vendors through a rational lens, but they choose on emotional grounds. The positioning has to satisfy both.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Brand Positioning Process",
        blocks: [
          {
            id: "market-research-competitive-audit",
            title: "Market Research and Competitive Audit",
            description:
              "A deep dive into the market: who the competitors are, what they claim, how they look, and where there is whitespace, the research phase that prevents the positioning from being a guess.",
          },
          {
            id: "positioning-workshop",
            title: "Positioning Workshop",
            description:
              "A collaborative session with the client team: aligning on the brand's purpose, its audience, its differentiation, and the territory it wants to own, building internal alignment before the external positioning is defined.",
          },
          {
            id: "brand-platform-development",
            title: "Brand Platform Development",
            description:
              "The positioning document: purpose, vision, values, positioning statement, messaging hierarchy, brand voice, the strategic brief that guides every creative and communication decision that follows.",
          },
          {
            id: "identity-alignment",
            title: "Identity Alignment",
            description:
              "Translating the positioning into visual identity, ensuring the logo, typography, color palette, and photography direction all express the strategic position, not just look good in isolation.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Brand Positioning",
        ctaHeading: "Define Your Position With Anagram",
        ctaDescription:
          "The brands that win their category don't win by accident. They win because they made a clear decision about what they stand for and held every decision against it. Brands that need no introduction.",
        ctaButtons: [
          {
            label: "Start a positioning project",
            href: "mailto:hello@anagram.club",
          },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a brand positioning agency do?",
            answer:
              "A brand positioning agency defines the unique strategic position a brand occupies in its market, who it's for, what it stands for, why it wins, and translates that position into a messaging platform and visual identity.",
          },
          {
            question: "What is brand positioning?",
            answer:
              "Brand positioning is the strategic definition of how a brand is different from its competitors in a way that is relevant and meaningful to its target audience. It's the claim the brand makes about what it uniquely offers.",
          },
          {
            question: "How do you choose the right brand positioning agency?",
            answer:
              "Look for a studio with a structured strategic process, a track record of positioning work that translated into measurable business results, and the ability to take the positioning through to visual identity.",
          },
          {
            question: "How long does brand positioning take?",
            answer:
              "The positioning phase typically takes 3 to 5 weeks: research, workshop, and brand platform development. It is the fastest investment a brand can make, and the highest-leverage one.",
          },
          {
            question:
              "What is the deliverable from a brand positioning engagement?",
            answer:
              "A brand platform document, positioning statement, value proposition, messaging hierarchy, brand voice guidelines, plus an internal presentation for stakeholder alignment.",
          },
          {
            question: "Can brand positioning be done independently of visual identity?",
            answer:
              "Yes, positioning is a standalone engagement. That said, the identity is most powerful when it flows directly from the positioning, which is why most clients continue into identity design after the strategy is complete.",
          },
          {
            question:
              "How do you measure the success of brand positioning work?",
            answer:
              "Through the business metrics the brand drives: awareness, consideration, conversion, and customer retention. Fortuneo's rebrand, which started with a repositioning, drove a 45% lift in subscription funnel entry.",
          },
        ],
      }}
    />
  );
}
