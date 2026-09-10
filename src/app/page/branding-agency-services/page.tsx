import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Branding Agency Services: Anagram Studio ",
  description:
    "Anagram offers end-to-end branding agency services: brand strategy, visual identity, design systems, motion, photography, and web development, all in-house.",
  alternates: { canonical: "/seo/branding-agency-services" },
  openGraph: {
    title: "Branding Agency Services: Anagram Studio ",
    description: "Anagram offers end-to-end branding agency services: brand strategy, visual identity, design systems, motion, photography, and web development, all in-house.",
    url: "/seo/branding-agency-services",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function BrandingAgencyServicesPage() {
  return (
    <AgencyPageTemplate
      idPrefix="branding-agency-services"
      title="Branding Agency Services That Build Brands Worth Remembering"
      description="Anagram is a full-service branding studio delivering branding agency services through one connected creative system. Strategy, identity, motion, photography, product design, and web development are all produced internally by the same multidisciplinary team. We believe branding services should never function as isolated deliverables. Every discipline strengthens the others. By connecting strategic thinking with creative execution under one direction, we build brands designed to remain coherent, scalable, and memorable across every touchpoint. Brands that need no introduction."
      vision={{
        eyebrow: "Integration",
        heading: "How These Services Work Together",
        intro:
          "Integrated branding services create stronger brands because every layer reinforces the next. When strategy, identity, motion, photography, product design, and web development come from the same team, the result feels coherent across every interaction. There is no disconnect between positioning and execution, no translation loss between agencies, and no fragmentation between product and communication. This integrated approach shaped both the Fortuneo and Planity projects, where branding systems extended consistently across digital products, campaigns, photography, motion, and web experiences.",
        blocks: [],
      }}
      services={{
        eyebrow: "Services",
        heading: "The Full Scope of Anagram Branding Services",
        subtitle:
          "Eight branding services, all developed internally, all designed to operate together as one cohesive brand ecosystem.",
        items: [
          {
            id: "brand-strategy",
            name: "Brand Strategy",
            tag: "Foundation",
            description:
              "Market positioning, competitive analysis, messaging platforms, brand architecture, and tone of voice systems define how the company should be perceived within its market. The outcome is a strategic brand platform document, the foundation guiding every future creative and communication decision.",
          },
          {
            id: "brand-identity-design",
            name: "Brand Identity Design",
            tag: "Core",
            description:
              "Logo systems, typography, color palettes, iconography, and brand guidelines create the visual face of the company. Every identity is designed to scale, working equally well at launch stage and as the business grows into larger markets and more complex ecosystems.",
          },
          {
            id: "design-system-brand-guidelines",
            name: "Design System and Brand Guidelines",
            tag: "Scale",
            description:
              "Component libraries, responsive frameworks, usage documentation, and operational guidelines create consistency across products, campaigns, and teams. A strong design system allows internal stakeholders to deploy the brand correctly even when the studio is no longer directly involved.",
          },
          {
            id: "illustration-visual-language",
            name: "Illustration and Visual Language",
            tag: "Distinctive",
            description:
              "Custom illustration systems, including 2D, 3D, and AI-generated visuals, create a recognizable visual language extending beyond the logo itself. These systems help brands develop stronger memorability and a more distinctive creative presence.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX design, product interfaces, and design system integration bring the brand directly into the digital product experience. This is where brand identity and usability converge, creating products that feel strategically aligned from interface to interaction.",
          },
          {
            id: "motion-design",
            name: "Motion Design",
            tag: "Alive",
            description:
              "Animated identity systems, motion guidelines, social assets, brand films, and UI micro-interactions introduce rhythm and movement into the brand ecosystem. Motion transforms static branding into living digital experiences adapted for modern platforms and communication channels.",
          },
          {
            id: "photography-video-direction",
            name: "Photography and Video Direction",
            tag: "Visual",
            description:
              "Art direction, studio and lifestyle photography, video production, casting, and styling shape the emotional and human dimension of the brand. Photography direction developed for Fortuneo and Planity demonstrates how imagery becomes part of the broader strategic positioning rather than decorative content.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom web design combined with front-end and back-end development creates digital platforms fully aligned with the brand identity. Every website is conceived as an extension of the brand itself, never as a template adapted afterward.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "At Every Stage",
        heading: "Branding Services at Every Stage",
        blocks: [
          {
            id: "early-stage-startups",
            title: "Early-Stage Startups",
            description:
              "Early-stage companies generally require strategic positioning, a scalable identity, a design system, and a strong website foundation. The decisions made at launch become increasingly difficult to reverse later, which is why investing in the right foundations early matters.",
          },
          {
            id: "scale-ups-growth-companies",
            title: "Scale-Ups and Growth Companies",
            description:
              "As companies scale, branding systems often need to evolve. Expanded design systems, motion assets, product alignment, and refreshed positioning help growth-stage companies prepare for new markets, larger audiences, and more complex operational needs.",
          },
          {
            id: "established-brands-seeking-reinvention",
            title: "Established Brands Seeking Reinvention",
            description:
              "Rebranding is not about abandoning existing equity. It is about refining what still matters while removing what no longer reflects the business. Strategic repositioning, identity redesign, and full system rollouts allow established companies to evolve intentionally.",
          },
        ],
      }}
      results={{
        eyebrow: "Impact",
        heading: "Proof of Impact",
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
              "Fortuneo, a leading French online bank, needed a brand capable of supporting more premium ambitions while remaining accessible to younger audiences. Anagram delivered brand strategy, identity systems, product design, motion, photography, and web development through a complete rebrand.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% submitted documents",
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
              "As Planity entered a major growth phase and prepared for European expansion, Anagram developed the brand strategy, identity systems, product design, B2C and B2B touchpoints, and photography direction across a three-year collaboration.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries We Serve",
        items: [
          {
            id: "technology-saas",
            name: "Technology and SaaS",
            description:
              "We build branding systems that transform complex software products into clear, engaging, and strategically differentiated identities that feel as strong as the technology behind them.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech and Financial Services",
            description:
              "Financial brands require trust, desirability, and clarity simultaneously. We create branding systems that make financial services feel premium, accessible, and credible at scale.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer and Lifestyle",
            description:
              "From beauty and food to e-commerce and lifestyle products, we create brands designed to earn attention within culture and remain memorable across digital and physical environments.",
          },
          {
            id: "b2b-professional-services",
            name: "B2B and Professional Services",
            description:
              "B2B brands need clarity, authority, and strategic communication systems capable of earning trust with enterprise buyers and professional audiences.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Process",
        blocks: [
          {
            id: "discovery",
            title: "Discovery",
            description:
              "Market research, stakeholder interviews, audience analysis, and competitive audits help define the strategic context surrounding the brand before any creative direction is proposed.",
          },
          {
            id: "creative-direction",
            title: "Creative Direction",
            description:
              "Positioning systems, visual concepts, identity design, and iterative refinement are developed collaboratively with the client to create strategic and creative alignment throughout the process.",
          },
          {
            id: "build",
            title: "Build",
            description:
              "Motion systems, photography, product design, web development, and rollout assets are produced internally, bringing the entire brand ecosystem to life through one coordinated workflow.",
          },
          {
            id: "evolve",
            title: "Evolve",
            description:
              "Long-term collaboration allows the brand to continue evolving through campaign assets, product launches, new market entries, and updated communication systems as the business grows.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Branding Agency Services",
        ctaHeading: "Work With Anagram",
        ctaDescription:
          "Strategy, identity, motion, photography, product design, and web development: all branding agency services produced internally through one connected creative vision. Anagram builds brands designed for clarity, scalability, and long-term recognition. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our portfolio", href: "/works" },
        ],
        faqItems: [
          {
            question: "What branding services does Anagram offer?",
            answer:
              "Anagram provides brand strategy, visual identity design, design systems, illustration, product design, motion design, photography, video production, and website design and development, all produced internally.",
          },
          {
            question: "What is included in a brand identity package?",
            answer:
              "A typical brand identity package includes logo systems, typography, color palettes, iconography, and brand guidelines. Depending on scope, it can also include illustration systems, motion principles, and design system components.",
          },
          {
            question: "How much do branding agency services cost?",
            answer:
              "Every project is scoped individually depending on strategic needs, creative deliverables, and technical requirements. Contact Anagram with your project brief for a tailored proposal.",
          },
          {
            question: "Can we hire Anagram for one service only?",
            answer:
              "Yes. Individual services can operate independently, although integrated branding projects generally create stronger long-term results through greater creative consistency.",
          },
          {
            question: "How long does a full branding project take?",
            answer:
              "A core brand identity project generally takes between 6 and 12 weeks. Larger ecosystems involving motion, photography, design systems, and web development typically extend across several months.",
          },
          {
            question: "Do you offer rebranding services?",
            answer:
              "Yes. Anagram handles full rebrands, from strategic audits and repositioning through identity redesign, motion systems, rollout assets, and digital implementation.",
          },
          {
            question: "What industries do you specialize in?",
            answer:
              "We primarily work across technology, SaaS, fintech, consumer, and B2B sectors, although we collaborate with any ambitious company looking to build a differentiated brand.",
          },
        ],
      }}
    />
  );
}
