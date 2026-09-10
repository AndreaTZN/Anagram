import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Brand Identity Consulting: Anagram Studio",
  description:
    "Anagram offers brand identity consulting and design: from logo and identity to full design systems, with the strategy and craft to make brands memorable.",
  alternates: { canonical: "/seo/brand-identity-consulting" },
  openGraph: {
    title: "Brand Identity Consulting: Anagram Studio",
    description: "Anagram offers brand identity consulting and design: from logo and identity to full design systems, with the strategy and craft to make brands memorable.",
    url: "/seo/brand-identity-consulting",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function BrandIdentityConsultingPage() {
  return (
    <AgencyPageTemplate
      idPrefix="brand-identity-consulting"
      verticalDividerDots={150}
      title="Brand Identity Consulting for Brands That Want to Stand Out"
      description="Anagram is a studio and brand identity consultant that approaches identity design as a strategic discipline rather than a purely visual one. Every identity system begins with positioning, messaging, and audience understanding before any aesthetic direction is explored. Founded in 2020, our multidisciplinary team has developed more than 50 brand identities across technology, fintech, SaaS, and consumer industries, building systems designed to remain coherent, scalable, and recognizable as businesses grow."
      vision={{
        eyebrow: "Approach",
        heading: "Working With Anagram",
        blocks: [
          {
            id: "strategy-drives-every-creative-decision",
            title: "Strategy Drives Every Creative Decision",
            description:
              "At Anagram, brand identity projects begin with strategy rather than moodboards. Positioning, messaging, audience perception, and competitive context define the creative direction before visual exploration begins.",
          },
          {
            id: "craft-attention-to-detail",
            title: "Craft and Attention to Detail",
            description:
              "Our multidisciplinary team combines expertise across strategy, design, illustration, motion, and product design. Every detail of the identity system is considered intentionally rather than assembled from generic templates.",
          },
          {
            id: "focused-or-full-service-engagements",
            title: "Focused or Full-Service Engagements",
            description:
              "Brand identity consulting can operate independently as a focused engagement or evolve into a larger project including motion systems, photography, product design, and web development.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Brand Identity Services",
        subtitle:
          "Anagram's identity practice covers the full process: from strategic positioning and messaging through to scalable visual systems and operational brand guidelines.",
        items: [
          {
            id: "brand-positioning-strategy",
            name: "Brand Positioning and Strategy",
            tag: "Foundation",
            description:
              "Market positioning, competitive analysis, audience understanding, and messaging systems define the strategic foundations of the identity, ensuring the brand communicates the right ideas to the right people.",
          },
          {
            id: "visual-identity-design",
            name: "Visual Identity Design",
            tag: "Core",
            description:
              "Logo systems, typography, color palettes, iconography, illustration systems, and visual languages designed to remain distinctive, scalable, and strategically aligned across every touchpoint.",
          },
          {
            id: "design-system-brand-guidelines",
            name: "Design System and Brand Guidelines",
            tag: "Scale",
            description:
              "Component libraries, responsive frameworks, usage rules, and operational documentation create consistency across products, campaigns, internal teams, and international markets.",
          },
          {
            id: "motion-identity-assets",
            name: "Motion and Identity Assets",
            tag: "Alive",
            description:
              "Motion principles, animated logos, social assets, and dynamic brand systems extend the identity beyond static visuals and create stronger recognition across digital environments.",
          },
          {
            id: "product-digital-experience",
            name: "Product and Digital Experience",
            tag: "Digital",
            description:
              "UI/UX systems and product interfaces designed to align the brand identity directly with the user experience, ensuring the product itself reflects the positioning and visual language of the company.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Selected Brand Identity Work",
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
              "For Fortuneo, Anagram transformed the “0” into a living brand asset, building a strategic identity system that turned the idea of free banking into something premium and emotionally engaging. The project included strategy, identity systems, product design, motion, photography, and web development.",
            metrics: [
              "+45% subscription funnel entry",
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
            description:
              "For Planity, the “P as a door” became the foundation of a scalable identity system designed to evolve from B2C into B2B across European markets. The collaboration covered strategy, identity systems, photography, and digital touchpoints.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
        note: {
          title: "50 Identities and Counting",
          description:
            "From early-stage startups to established market leaders, every identity Anagram creates is conceived as a scalable system, not simply a logo, but a long-term strategic asset.",
        },
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Brand Identity",
        ctaHeading: "Build an Identity Worth Remembering",
        ctaDescription:
          "The strongest identities are not simply beautiful. They are strategically true. True to the positioning, true to the audience, and designed to remain coherent as the business grows and evolves. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a brand identity consultant do?",
            answer:
              "A brand identity consultant defines the visual identity system of a company: logo, typography, color palette, iconography, and design systems, grounded in strategic positioning and audience understanding.",
          },
          {
            question:
              "What is the difference between a brand identity consultant and a graphic designer?",
            answer:
              "A graphic designer executes visual assets. A brand identity consultant develops the strategic and visual system behind those assets, defining the rules, positioning, and logic guiding the brand.",
          },
          {
            question: "What is included in a brand identity project?",
            answer:
              "Most projects include logo systems, typography, color palettes, iconography, and brand guidelines. Depending on scope, projects can also include motion systems, illustration frameworks, and scalable design systems.",
          },
          {
            question: "How long does a brand identity project take?",
            answer:
              "A core identity project generally takes between 6 and 10 weeks. Larger projects involving design systems, motion, and web development typically extend across several months.",
          },
          {
            question:
              "Can we start with brand identity and add other services later?",
            answer:
              "Yes. Many clients begin with positioning and identity systems before expanding into motion, photography, product design, and web development as the business evolves.",
          },
        ],
      }}
    />
  );
}
