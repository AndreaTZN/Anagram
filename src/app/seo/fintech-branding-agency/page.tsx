import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Fintech Branding Agency: Anagram Studio",
  description:
    "Anagram is a fintech branding agency with a proven track record: Fortuneo, Qonto, Spendesk, Pennylane. Strategy, identity, and web built for financial brands.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function FintechBrandingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="fintech-branding-agency"
      title="Fintech Branding Agency for Companies Rewriting Financial Services"
      verticalDividerDots={280}
      description="Anagram is a fintech branding agency with one of the deepest financial brand portfolios in the market: from Fortuneo and Qonto to Spendesk, Pennylane, Nabla, Rauva, Fi, and others. We help fintech companies build brands that earn trust quickly, feel modern without appearing reckless, and remain human without feeling naive. Across banking, payments, investment platforms, and B2B financial SaaS, Anagram creates strategic brand systems designed to scale across products, markets, and audiences while maintaining clarity and credibility at every touchpoint."
      vision={{
        eyebrow: "Approach",
        heading: "What Makes Fintech Branding Specific",
        intro:
          "Fintech branding is not generic branding applied to financial products. The category operates under unique emotional and operational constraints that require a specific strategic and creative approach.",
        blocks: [
          {
            id: "trust-as-a-visual-language",
            title: "Trust as a Visual Language",
            description:
              "In financial services, trust is designed rather than declared. Typography, motion, photography, layout systems, and color restraint all signal whether a brand feels credible. Fintech brands managing people's money cannot rely on the same visual disruption strategies used by consumer tech startups without risking instability or loss of confidence.",
          },
          {
            id: "premium-and-accessible-in-the-same-brand",
            title: "Premium and Accessible in the Same Brand",
            description:
              "Fintech companies often target broad audiences spanning different income levels and financial literacy backgrounds. The challenge is creating brands that feel aspirational without becoming exclusive. Fortuneo resolved this tension by transforming “free banking” into a premium and emotionally desirable visual concept centered around the “0.”",
          },
          {
            id: "a-brand-system-built-for-compliance",
            title: "A Brand System Built for Compliance",
            description:
              "Fintech brands operate within regulated environments where consistency matters operationally as much as creatively. Every execution, from a legal document to a product onboarding flow, needs to remain aligned with the broader brand system while respecting regulatory expectations.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Translation",
        heading: "How positioning translates into design",
        intro:
          "Every visual decision is ultimately a positioning decision. Typography signals who the brand is for. The color palette communicates emotional territory. Photography direction reflects values and aspiration. Positioning is not a strategic document left untouched after workshops. It becomes the creative brief that every design decision is measured against. At Anagram, positioning directly informs identity systems, motion language, photography, product interfaces, and web experiences so the strategy remains visible everywhere the audience interacts with the brand.",
        blocks: [
          {
            id: "from-positioning-to-visual-identity",
            title: "From Positioning to Visual Identity",
            quote: "The strategy becomes the symbol.",
            description:
              "The positioning claim informs the visual concept, which shapes the logo, typography, motion systems, and color palette. Fortuneo's “0” functioned simultaneously as a positioning idea, free banking, and as a scalable visual asset integrated across the entire brand ecosystem.",
          },
          {
            id: "consistency-across-every-touchpoint",
            title: "Consistency Across Every Touchpoint",
            quote: "Positioning is only real when it appears everywhere.",
            description:
              "Positioning only becomes real when it appears consistently everywhere: product experiences, websites, photography, motion systems, campaigns, and social assets. Because Anagram handles strategy, identity, motion, product design, and web internally, the positioning remains coherent throughout the entire customer experience.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Fintech Branding Services",
        subtitle:
          "Anagram delivers full-scope fintech branding services internally: strategy, identity, product design, motion, photography, and web development built under one connected creative direction.",
        items: [
          {
            id: "brand-strategy-for-fintech",
            name: "Brand Strategy for Fintech",
            tag: "Foundation",
            description:
              "Market positioning, competitive analysis within the fintech landscape, brand architecture, and messaging systems designed specifically around the trust dynamics and regulatory realities of financial services.",
          },
          {
            id: "visual-identity",
            name: "Visual Identity",
            tag: "Core",
            description:
              "Logo systems, typography, color palettes, iconography, and illustration systems developed to communicate credibility and differentiation without falling into generic fintech visual clichés.",
          },
          {
            id: "design-system-at-scale",
            name: "Design System at Scale",
            tag: "Scale",
            description:
              "Component libraries, responsive frameworks, governance systems, and usage documentation designed for multi-product, multi-market fintech ecosystems operating under strict compliance expectations.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX systems, onboarding flows, dashboards, and card experiences that integrate the brand identity directly into the digital product experience itself.",
          },
          {
            id: "motion-brand-content",
            name: "Motion and Brand Content",
            tag: "Alive",
            description:
              "Animated identity systems, product demos, photography direction, and brand films designed to make fintech brands feel emotionally resonant, contemporary, and memorable.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom front-end and back-end development built for conversion, scalability, and premium brand expression while respecting the visual expectations of financial products.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "The Fortuneo Project",
        intro:
          "Fortuneo needed to attract younger users through the Fosfo card while increasing upgrades toward the Black card. The existing identity no longer reflected the company's premium ambitions and lacked emotional desirability within an increasingly competitive fintech landscape.",
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
              "Anagram rebuilt the brand around the “0”, the symbol of free banking, transforming it from a pricing feature into a strategic and visual brand asset. Motion systems, typography, illustration, product interfaces, and photography all revolved around this positioning concept, reframing “free” as something premium rather than purely economical. The collaboration included strategy, copywriting, identity systems, product design, motion, photography, video production, illustration, and web development. Even the physical credit cards became expressions of the positioning through premium print finishes, Pantone inks, and tactile varnishes designed to reinforce the perception of value.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% submitted documents",
              "+77% awareness and consideration",
            ],
          },
        ],
        note: {
          title: "Fintech Brands We Have Shaped",
          description:
            "From challenger banks and investment platforms to fintech SaaS and payment infrastructure, Anagram has shaped the brands of companies redefining financial services.",
          columns: [
            ["Qonto"],
            ["Spendesk"],
            ["Pennylane"],
            ["Nabla"],
            ["Rauva"],
            ["Fi"],
          ],
        },
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Sectors Within Fintech We Work With",
        items: [
          {
            id: "neobanks-challenger-banks",
            name: "Neobanks and Challenger Banks",
            description:
              "Brands that need to earn trust faster than traditional institutions while feeling more contemporary, accessible, and emotionally engaging.",
          },
          {
            id: "fintech-saas-b2b",
            name: "Fintech SaaS and B2B",
            description:
              "Financial software platforms that require visual authority, rigorous messaging systems, and scalable design frameworks capable of supporting enterprise sales environments.",
          },
          {
            id: "investment-wealth-management",
            name: "Investment and Wealth Management",
            description:
              "Brands balancing sophistication with accessibility, making wealth management feel understandable and relevant to a new generation of investors.",
          },
          {
            id: "payments-infrastructure",
            name: "Payments and Infrastructure",
            description:
              "Payment platforms and infrastructure providers that need to transform invisible complexity into experiences that feel reliable, seamless, and trustworthy.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Process for Fintech Brands",
        blocks: [
          {
            id: "discovery-sector-immersion",
            title: "Discovery and Sector Immersion",
            description:
              "We begin with stakeholder interviews, competitive audits, fintech category analysis, and market research to understand the strategic realities shaping the brand before proposing a direction.",
          },
          {
            id: "strategic-positioning",
            title: "Strategic Positioning",
            description:
              "Messaging systems, positioning frameworks, brand voice, and value propositions are developed to create differentiation within crowded and trust-sensitive financial categories.",
          },
          {
            id: "identity-system-design",
            title: "Identity and System Design",
            description:
              "Visual identities, design systems, motion frameworks, and product UI systems are built specifically for regulated, multi-product fintech environments.",
          },
          {
            id: "build-evolve",
            title: "Build and Evolve",
            description:
              "Motion systems, photography, product design, and web development are produced internally while the brand continues evolving alongside the company's growth and product roadmap.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Fintech Branding",
        ctaHeading: "Build the Fintech Brand That Earns Trust",
        ctaDescription:
          "In financial services, the brand is not secondary to the product. It is often the customer's first interaction with it. Through strategy, identity, motion, product design, and web development, Anagram creates fintech brands designed to feel credible, modern, and impossible to ignore. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a fintech branding agency do?",
            answer:
              "A fintech branding agency defines positioning, messaging, identity systems, product experiences, and digital ecosystems specifically adapted to the trust dynamics and operational realities of financial services.",
          },
          {
            question:
              "Why does a fintech company need a specialized branding agency?",
            answer:
              "Fintech branding involves strategic tensions that generic studios rarely navigate effectively, balancing credibility, accessibility, compliance expectations, and premium perception simultaneously.",
          },
          {
            question: "How much does fintech branding cost?",
            answer:
              "Every fintech branding project is scoped individually depending on strategic, creative, and technical requirements. Contact Anagram with your brief for a tailored proposal.",
          },
          {
            question: "How long does a fintech branding project take?",
            answer:
              "Core identity systems generally take between 6 and 12 weeks. Full fintech ecosystems involving product design, motion systems, and web development typically extend across several months.",
          },
          {
            question:
              "Do you work with early-stage fintechs or only established players?",
            answer:
              "Both. We collaborate with pre-launch fintech startups building their first identity as well as established financial brands undertaking strategic repositioning and rebranding.",
          },
          {
            question:
              "Can you handle both the brand design and the product design?",
            answer:
              "Yes. Brand designers and product designers work internally at Anagram, ensuring the identity system and the product experience remain coherent from the very beginning.",
          },
        ],
      }}
    />
  );
}
