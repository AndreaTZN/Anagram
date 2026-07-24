import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Financial Services Branding Agency — Anagram",
  description:
    "Anagram is a financial services branding agency with a proven track record — from Fortuneo to Qonto. Strategy, identity, motion, and web for brands that earn trust.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function FinancialServicesBrandingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="financial-services-branding-agency"
      verticalDividerDots={300}
      title="Financial Services Branding Agency With a Proven Track Record"
      description="Anagram is a financial services branding agency with deep experience across banking, fintech, insurance, and B2B financial products. From Fortuneo to Qonto, Spendesk, Pennylane, Nabla, and others, we help financial brands build identities that feel trustworthy, premium, and human simultaneously. Financial branding exists in constant tension: brands need to inspire confidence without feeling cold, premium without becoming inaccessible, modern without feeling risky. Our role is to resolve those tensions strategically and creatively — the same way we helped transform Fortuneo into a more desirable brand while preserving the accessibility that made it successful."
      vision={{
        eyebrow: "Approach",
        heading: "Branding for Financial Services",
        intro:
          "Financial branding operates under unique constraints. Trust is visual long before it becomes rational. Typography, photography, motion, interfaces, and tone of voice all influence whether a company feels credible within seconds. Financial brands also evolve across regulated environments and multiple markets, which means the brand system has to remain coherent while adapting operationally at scale.",
        blocks: [
          {
            id: "trust-as-a-visual-asset",
            title: "Trust as a Visual Asset",
            description:
              "In financial services, credibility is designed. Typography signals seriousness, photography shapes relatability, and motion determines whether a product feels stable or chaotic. For Fortuneo, the “0” became a strategic visual asset transforming the concept of free banking into something both premium and emotionally engaging.",
          },
          {
            id: "premium-without-being-out-of-reach",
            title: "Premium Without Being Out of Reach",
            description:
              "Financial brands that feel excessively premium often alienate the very audiences they want to attract. The challenge is building aspiration without intimidation — identities that feel elevated, trustworthy, and modern while remaining accessible and human.",
          },
          {
            id: "brand-systems-that-scale-across-markets",
            title: "Brand Systems That Scale Across Markets",
            description:
              "Financial companies frequently operate across multiple products, countries, and regulatory frameworks. The brand system must remain flexible enough for local adaptation without losing consistency. Clear guidelines and scalable design systems become operational tools as much as creative ones.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Financial Services Branding Services",
        subtitle:
          "Anagram delivers full-scope branding services for financial companies — strategy, identity, motion, product design, photography, and web development, all produced internally under one creative direction.",
        items: [
          {
            id: "brand-strategy-for-financial-brands",
            name: "Brand Strategy for Financial Brands",
            tag: "Foundation",
            description:
              "Market positioning, competitive audits, messaging platforms, and brand architecture tailored specifically to the strategic, regulatory, and cultural realities of financial services businesses.",
          },
          {
            id: "visual-identity",
            name: "Visual Identity",
            tag: "Core",
            description:
              "Logo systems, typography, iconography, color palettes, and brand guidelines designed to communicate credibility, differentiation, warmth, and premium perception simultaneously.",
          },
          {
            id: "design-system-at-scale",
            name: "Design System at Scale",
            tag: "Scale",
            description:
              "Component libraries, responsive frameworks, usage documentation, and governance systems robust enough for multi-market and multi-product financial organizations.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX systems for dashboards, onboarding flows, apps, and financial products — connecting the brand identity directly to the customer experience.",
          },
          {
            id: "motion-design-brand-content",
            name: "Motion Design and Brand Content",
            tag: "Alive",
            description:
              "Animated identity systems, product demos, photography direction, and brand films designed to make financial products feel contemporary, dynamic, and emotionally engaging.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom web design and front-end/back-end development built to convert prospects while reflecting the premium positioning of the financial brand.",
          },
        ],
      }}
      results={{
        eyebrow: "Results",
        heading: "The Fortuneo Project",
        intro:
          "Fortuneo is one of France's leading online banks. The challenge was clear: attract younger audiences through the Fosfo card while encouraging upgrades toward the Black card — but the existing brand no longer reflected the company's premium ambitions.",
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
              "Anagram rebuilt the identity around one strategic idea: the “0” representing free banking. Rather than treating it as a functional feature, the symbol became a dynamic visual element integrated across motion, interfaces, illustration, and communication systems — positioning “free” as desirable rather than purely transactional. The project covered strategy, copywriting, identity systems, product design, motion, illustration, photography, video, web development, and rollout assets. Photography direction focused on authentic lifestyle moments elevated through premium styling and art direction — balancing aspiration with relatability.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% submitted documents",
              "+77% awareness and consideration",
            ],
          },
        ],
        note: {
          title: "Financial Brands We Have Shaped",
          description:
            "From challenger banks and fintech SaaS platforms to investment products and financial tools, Anagram has shaped the brands of companies redefining modern financial services.",
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
        heading: "Sectors Within Financial Services",
        items: [
          {
            id: "banking-neobanks",
            name: "Banking and Neobanks",
            description:
              "Banking brands need to establish trust immediately while differentiating themselves from traditional incumbents. The challenge is creating identities that feel modern and frictionless without appearing unstable or overly experimental.",
          },
          {
            id: "fintech-saas-b2b",
            name: "Fintech SaaS and B2B",
            description:
              "B2B financial platforms require visual authority, rigorous messaging systems, and scalable design frameworks capable of reassuring enterprise buyers and supporting sales enablement.",
          },
          {
            id: "investment-wealth-management",
            name: "Investment and Wealth Management",
            description:
              "Investment brands must balance aspiration with restraint — creating premium visual worlds that feel sophisticated without reproducing outdated financial stereotypes.",
          },
          {
            id: "insurance-regtech",
            name: "Insurance and RegTech",
            description:
              "Insurance and compliance products often feel complex or stressful. Strong branding reduces friction and creates clarity through approachable design systems and accessible communication.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Process for Financial Services Clients",
        blocks: [
          {
            id: "discovery-sector-immersion",
            title: "Discovery and Sector Immersion",
            description:
              "We begin with a deep understanding of the client's market, competitors, regulatory environment, customer expectations, and operational constraints before defining a strategic direction.",
          },
          {
            id: "strategic-positioning",
            title: "Strategic Positioning",
            description:
              "Messaging systems, positioning frameworks, and strategic differentiation define the brand's place within crowded and trust-sensitive financial categories.",
          },
          {
            id: "identity-system-design",
            title: "Identity and System Design",
            description:
              "Visual identity systems, product UI, and scalable frameworks are designed to support operational consistency across products, teams, and international markets.",
          },
          {
            id: "build-evolve",
            title: "Build and Evolve",
            description:
              "Motion systems, photography, websites, and rollout assets are produced internally while the brand continues evolving alongside the business itself.",
          },
        ],
      }}
      faqCta={{
        faqTitle:
          "Frequently Asked Questions About Financial Services Branding",
        ctaHeading: "Build a Financial Brand That Earns Trust",
        ctaDescription:
          "Financial services remains one of the most demanding branding environments. The right studio needs to understand both the strategic realities of trust and the creative systems capable of making a financial brand feel contemporary, premium, and human. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a financial services branding agency do?",
            answer:
              "A financial services branding agency defines positioning, messaging, visual identity systems, motion assets, and digital experiences for financial companies while understanding the trust and regulatory dynamics specific to the sector.",
          },
          {
            question:
              "Why does a financial services brand need a specialist agency?",
            answer:
              "Financial branding requires balancing credibility, accessibility, regulation, and premium perception simultaneously. These strategic tensions are highly specific to the sector and difficult for generalist studios to navigate effectively.",
          },
          {
            question:
              "What financial services clients has Anagram worked with?",
            answer:
              "Anagram has collaborated with Fortuneo, Qonto, Spendesk, Pennylane, Nabla, and other fintech and financial companies across Europe.",
          },
          {
            question: "How long does a financial services brand project take?",
            answer:
              "Core identity systems generally take between 6 and 12 weeks. Larger projects involving product design, design systems, motion, and web development typically extend across several months.",
          },
          {
            question:
              "Can you handle the website build for a financial services company?",
            answer:
              "Yes. Anagram designs and develops custom websites internally, built to meet the performance, scalability, and compliance expectations required within financial services.",
          },
          {
            question:
              "Do you work with early-stage fintechs as well as established banks?",
            answer:
              "Yes. We work with early-stage fintech startups building their first brand as well as established financial institutions undergoing strategic repositioning and rebranding.",
          },
        ],
      }}
    />
  );
}
