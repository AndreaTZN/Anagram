import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Rebranding Agency: Anagram Creative Studio",
  description:
    "Anagram is a rebranding agency that helps ambitious companies shed what no longer fits and build the brand they actually deserve. Strategy through full rollout",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function RebrandingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="rebranding-agency"
      title="Rebranding Agency for Companies Ready for Their Next Chapter"
      description="Anagram is a Paris-based rebranding agency helping ambitious companies redefine how they are perceived: from strategic audit through full rollout. A rebrand is never just a new logo. It is a complete rethink of what a brand stands for, how it positions itself in the market, and how that identity is expressed across every touchpoint. We work with companies that have outgrown their original identity: businesses entering new markets, preparing for scale, repositioning after growth, or simply realizing their brand no longer reflects the quality of the company behind it. The hardest part of a rebrand is rarely the design itself. It is knowing what to preserve, what to evolve, and what to leave behind. For Fortuneo, our rebrand helped drive +45% subscription funnel entry while repositioning the bank for a younger, more premium audience."
      vision={{
        eyebrow: "Approach",
        heading: "What a Rebrand Actually Involves",
        intro:
          "A rebranding agency does far more than redesign a logo. A full rebrand combines strategic thinking, positioning, messaging, visual identity, and deployment across every customer touchpoint. The goal is not to look different for the sake of it. It is to build a brand that better reflects the business and supports where it is going next.",
        blocks: [
          {
            id: "strategic-audit",
            title: "Strategic Audit of the Existing Brand",
            description:
              "Before redesigning anything, we map the existing brand ecosystem: what equity is worth preserving, what is holding the business back, how customers perceive the company, and how competitors position themselves. The outcome is a strategic brief grounded in reality, not assumptions.",
          },
          {
            id: "new-positioning-messaging",
            title: "New Positioning and Messaging",
            description:
              "A rebrand begins with redefining the brand's place in the market: who it is for, what it stands for, why it matters, and what makes it different. Without this strategic layer, brands often look new while continuing to feel exactly the same.",
          },
          {
            id: "new-visual-identity",
            title: "New Visual Identity",
            description:
              "Logo, typography, color palette, iconography, illustration, and motion language: a complete visual system designed to express the new positioning consistently across every platform, campaign, product, and physical touchpoint.",
          },
          {
            id: "full-rollout",
            title: "Full Rollout Across Every Touchpoint",
            description:
              "Design systems, photography, motion, product design, website redesign, brand guidelines, and content production: everything required to bring the new brand into the market as a coherent system, not a disconnected collection of assets.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Timing",
        heading: "When to Rebrand",
        intro:
          "Not every company needs a rebrand, but some signals are impossible to ignore.",
        blocks: [
          {
            id: "before-funding-round-market-expansion",
            title: "Before a Funding Round or Market Expansion",
            description:
              "When a business has evolved beyond its startup phase, the brand often lags behind. Investors, enterprise buyers, and new markets interpret branding as a signal of maturity. A strategic rebrand communicates ambition, clarity, and long-term vision before a single conversation happens.",
          },
          {
            id: "brand-no-longer-reflects-business",
            title: "When the Brand No Longer Reflects the Business",
            description:
              "Many businesses evolve faster than their identity. New products, new services, new audiences, new ambitions, yet the brand still reflects the company as it existed years ago. That disconnect creates friction internally and externally.",
          },
          {
            id: "after-merger-acquisition",
            title: "After a Merger or Acquisition",
            description:
              "A merger or acquisition creates strategic complexity: multiple cultures, products, audiences, and identities becoming one. A rebrand creates clarity around the new organization and establishes a unified direction moving forward.",
          },
          {
            id: "category-has-moved-on",
            title: "When the Category Has Moved On",
            description:
              "Markets evolve quickly. Competitors become more sophisticated, visual standards shift, and what once felt modern begins to feel outdated. Rebranding before the gap becomes obvious helps companies stay culturally and commercially relevant.",
          },
        ],
      }}
      results={{
        eyebrow: "Case Study",
        heading: "The Fortuneo Rebrand",
        intro:
          "Fortuneo is one of France's leading online banks, profitable, established, and widely recognized. The challenge was not awareness. The challenge was perception. The launch of the Fosfo card created an opportunity to attract a younger audience, while the Black card needed stronger premium positioning. But the existing identity no longer reflected the ambition of the business.",
        stats: [],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo",
            description:
              "The brand felt functional when it needed to feel desirable. Anagram built the rebrand around Fortuneo's most distinctive strategic asset: the “0” symbolizing free banking. Instead of treating it as a simple feature, we transformed it into a core brand element, fluid, dynamic, scalable, and recognizable across every touchpoint. The rebrand covered strategy, copywriting, visual identity, design system, product design, motion, illustration, photography, video, and web development. Even the physical credit cards became part of the brand experience, produced with premium Pantone inks and tactile varnish finishes designed to reinforce the repositioning physically as well as visually.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% documents submitted",
              "+77% awareness and consideration",
            ],
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Rebranding Services",
        items: [
          {
            id: "brand-strategy-positioning",
            name: "Brand Strategy and Positioning",
            tag: "Foundation",
            description:
              "Market audit, competitive analysis, messaging platform, positioning strategy, and brand architecture: the strategic foundation that gives the rebrand direction before design begins.",
          },
          {
            id: "visual-identity",
            name: "Visual Identity",
            tag: "Core",
            description:
              "Logo design, typography, color systems, iconography, and brand guidelines: a scalable visual identity designed to express the repositioned brand consistently across every format.",
          },
          {
            id: "design-system",
            name: "Design System",
            tag: "Scale",
            description:
              "Component libraries, usage rules, UI frameworks, and documentation: operational systems that allow the new identity to scale internally without losing coherence.",
          },
          {
            id: "motion-content",
            name: "Motion and Content",
            tag: "Alive",
            description:
              "Motion systems, animated assets, photography direction, brand films, and social content: the new identity translated into dynamic media built for digital environments.",
          },
          {
            id: "website-redesign-development",
            name: "Website Redesign and Development",
            tag: "Platform",
            description:
              "Custom website design and development built from the ground up, creating a digital platform that reflects the new positioning and supports future growth.",
          },
        ],
      }}
      sectors={{
        eyebrow: "Why Anagram",
        heading: "Why Companies Choose Anagram as Their Rebranding Agency",
        items: [
          {
            id: "strategy-before-design",
            name: "Strategy Before Design",
            description:
              "The strongest rebrands are not cosmetic exercises. They are strategic decisions about perception, positioning, and growth. We define the strategy first, then build the identity around it.",
          },
          {
            id: "built-for-scale",
            name: "Built for Scale",
            description:
              "From startup scale-ups to established businesses entering new markets, we create brand systems designed to evolve over time without losing consistency or recognition.",
          },
          {
            id: "one-team-strategy-to-rollout",
            name: "One Team From Strategy to Rollout",
            description:
              "Brand strategy, visual identity, motion, photography, product design, and development: all handled internally by one creative studio carrying the same vision across the entire project.",
          },
          {
            id: "proven-business-impact",
            name: "Proven Business Impact",
            description:
              "Our work is measured beyond aesthetics. Fortuneo's rebrand increased subscription funnel entry by +45%. The best creative work produces measurable business results.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Rebranding Process",
        blocks: [
          {
            id: "brand-audit",
            title: "Brand Audit",
            description:
              "We analyze the existing identity in depth: what carries valuable brand equity, what creates friction, and how the competitive landscape has evolved. The goal is understanding before redesigning.",
          },
          {
            id: "strategic-repositioning",
            title: "Strategic Repositioning",
            description:
              "We define the new positioning: audience, messaging, differentiation, perception goals, and strategic direction. This phase creates the foundation every creative decision will build upon.",
          },
          {
            id: "identity-redesign",
            title: "Identity Redesign",
            description:
              "Creative direction, typography, logo systems, color palette, motion language, and design systems are developed collaboratively through structured review and iteration cycles with the client team.",
          },
          {
            id: "full-deployment",
            title: "Full Deployment",
            description:
              "Motion, photography, digital product design, website development, and rollout across every touchpoint, ensuring the rebrand launches as one coherent ecosystem rather than fragmented deliverables.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Rebranding",
        ctaHeading: "Start Your Rebrand With Anagram",
        ctaDescription:
          "A rebrand is one of the highest-leverage decisions a company can make. The right identity changes perception, attracts better opportunities, aligns teams internally, and creates momentum externally. Choose a studio that understands both the strategic and creative side of transformation, and can prove the results. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start your rebrand", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a rebranding agency do?",
            answer:
              "A rebranding agency audits the existing brand, defines a new strategic positioning, redesigns the visual identity and design system, and manages the rollout across every customer touchpoint.",
          },
          {
            question: "How long does a rebrand take?",
            answer:
              "A focused rebrand covering strategy, identity, and brand guidelines usually takes 8–14 weeks. A complete rebrand including motion, photography, website redesign, and deployment typically takes 4–7 months.",
          },
          {
            question: "How much does a rebrand cost?",
            answer:
              "Every rebrand is scoped individually depending on the size of the company, the complexity of the system, and the depth of the strategic work required. Contact Anagram for a tailored proposal.",
          },
          {
            question:
              "Is it possible to rebrand without losing existing brand equity?",
            answer:
              "Yes, and preserving valuable equity is one of the main goals of a strategic rebrand. The audit phase identifies what should evolve and what should remain recognizable.",
          },
          {
            question: "When is the right time to rebrand?",
            answer:
              "Common moments include funding rounds, market expansion, mergers, acquisitions, major product evolution, or simply when the existing brand no longer reflects the business accurately.",
          },
          {
            question: "Do you handle the full rebrand, or just the design?",
            answer:
              "The full process: strategy, positioning, visual identity, design systems, motion, photography, website design, and development, all produced internally by the Anagram team.",
          },
          {
            question:
              "Can you rebrand a company that already has strong brand awareness?",
            answer:
              "Yes. Rebranding an established company is about evolving perception without destroying recognition. The goal is not to erase the past. It is to make the brand stronger for what comes next.",
          },
        ],
      }}
    />
  );
}
