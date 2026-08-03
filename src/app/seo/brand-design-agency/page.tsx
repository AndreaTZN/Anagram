import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Brand Design Agency | anagram",
  description:
    "Anagram is a Paris-based brand design agency founded in 2020. We've shaped 50+ brands across tech, fintech, and consumer: from strategy and visual identity to motion, photography, and web.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function BrandDesignAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="brand-design-agency"
      title="Brand Design Agency: Anagram Studio"
      description="Anagram is a Paris-based brand design agency crafting bold, scalable identities for ambitious companies: from strategy and visual identity to motion and web."
      vision={{
        eyebrow: "Vision",
        heading: "What is our vision of brand design?",
        blocks: [
          {
            id: "more-than-a-logo",
            title: "Brand Design Is More Than a Logo",
            quote: "The logo is a starting point,",
            description:
              "A brand identity is built from typography, color palette, iconography, illustration, photography direction, motion design, and design system, all working in concert across every touchpoint. What we design isn't a mark; it's a recognizable world.",
          },
          {
            id: "business-outcomes",
            title: "Why Brand Design Determines Business Outcomes",
            quote: "Design isn't a cost center. It's a growth lever.",
            description:
              "A strong identity reduces acquisition costs, builds trust before the first conversation, and improves conversion at every stage of the funnel. After Fortuneo's rebrand, subscription funnel entry increased by 45%. The numbers are real.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Why Anagram",
        heading: "Why choose Anagram as your brand design agency?",
        blocks: [
          {
            id: "business-outcomes",
            title: "Why Brand Design Determines Business Outcomes",
            description:
              "A boutique studio of multidisciplinary talents driven by a shared ambition to craft unique experiences through iteration, creativity, and an eye for detail. Not a factory, each project gets our full focus.",
          },
          {
            id: "real-business-results",
            title: "Design That Drives Real Business Results",
            quote: "Design isn't a cost center. It's a growth lever.",
            description:
              "Fortuneo: +45% subscription funnel entry, +27% prospects starting a project, +63% documents sent. Planity: +50% appointment bookings per second. Design is a growth strategy, not an aesthetic choice.",
          },
          {
            id: "end-to-end",
            title: "End-to-End: Strategy to Launch, Under One Roof",
            quote: "Design isn't a cost center. It's a growth lever.",
            description:
              "Fortuneo: +45% subscription funnel entry, +27% prospects starting a project, +63% documents sent. Planity: +50% appointment bookings per second. Design is a growth strategy, not an aesthetic choice.",
          },
          {
            id: "long-term-partnership",
            title: "Long-Term Creative Partnership",
            quote: "Design isn't a cost center. It's a growth lever.",
            description:
              "Fortuneo: +45% subscription funnel entry, +27% prospects starting a project, +63% documents sent. Planity: +50% appointment bookings per second. Design is a growth strategy, not an aesthetic choice.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Our Brand Design Services",
        subtitle:
          "An integrated system where each service feeds into the others producing a coherent, scalable identity. Nothing siloed. Everything intentional.",
        items: [
          {
            id: "brand-strategy",
            name: "Brand Strategy",
            tag: "Foundation",
            description:
              "Market positioning, competitive audit, brand architecture, messaging platform, brand voice. Strategy precedes every pixel.",
          },
          {
            id: "visual-identity-design",
            name: "Visual Identity Design",
            tag: "Core",
            description:
              "Logo design, typography, color palette, brand guidelines scalable and adaptable across every format and context.",
          },
          {
            id: "design-system-guidelines",
            name: "Design System & Brand Guidelines",
            tag: "Scale",
            description:
              "Complete design system, UI components, usage rules, documentation the key deliverable that lets a brand grow without losing coherence.",
          },
          {
            id: "illustration-visual-language",
            name: "Illustration & Visual Language",
            tag: "Distinctive",
            description:
              "Creates strong and cohesive brand identities through thoughtful and impactful visual systems.",
          },
          {
            id: "product-design",
            name: "Product Design",
            tag: "Digital",
            description:
              "2D, 3D, and AI-generated illustration a distinctive visual language that makes a brand truly ownable beyond the logo.",
          },
          {
            id: "motion-design-photography",
            name: "Motion Design & Photography",
            tag: "Alive",
            description:
              "Motion design, brand films, photography direction, video production a static identity is an incomplete identity in 2026.",
          },
          {
            id: "website-design-development",
            name: "Website Design & Development",
            tag: "Platform",
            description:
              "Front-end, back-end, web design not a template, a brand experience built from scratch and owned entirely by you.",
          },
        ],
      }}
      results={{
        eyebrow: "Results",
        heading: "Selected Brand Design Work",
        stats: [
          {
            id: "funnel-entry",
            value: "45%",
            label: "entry into the subscription funnel",
          },
          {
            id: "documents-sent",
            value: "+63%",
            label: "documents sent on the course",
          },
          {
            id: "prospect-starts-project",
            value: "+27%",
            label: "prospect who starts a project",
          },
        ],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo: Making Finance Feel Desirable",
            industry: "Fintech, French Online Bank",
            description:
              "France's most affordable online bank needed to become its most desirable. Full transformation: brand strategy, identity, design system, product design, motion, photography, and web, to attract younger users and increase premium adoption, while keeping the price-leadership that made Fortuneo unique.",
            metrics: [
              "+45% subscription funnel entry",
              "+77% awareness consideration",
              "+63% documents sent",
            ],
          },
          {
            id: "planity",
            image: {
              src: "/works/Planity/backstage/1.webp",
              alt: "Planity",
            },
            title: "Planity: A System Built to Scale",
            industry: "B2B SaaS, Europe",
            description:
              "France's leading salon booking platform, expanding across Europe, needed a brand system built to scale. Over three years we built the full identity, design system, B2C and B2B touchpoints, product design, and photography direction, creating coherence across markets without losing distinctiveness.",
            metrics: [
              "+50% appointment bookings per second",
              "3-year partnership",
            ],
          },
        ],
      }}
      clients={{
        eyebrow: "We worked for",
        heading:
          "From ambitious startups to category leaders, we've designed brands that stand the test of scale across tech, fintech, consumer, and healthcare.",
        columns: [
          [
            "Everyday",
            "Peeps",
            "Incard",
            "Frequentiel",
            "Fortuneo",
            "Planity",
            "Omnia",
            "Wastetide",
            "Bonsai",
            "Buybox",
            "Rauva",
          ],
          [
            "Twin",
            "Nabla",
            "Rauva",
            "Gigi",
            "Aiup",
            "Drop",
            "Swaive",
            "Omi",
            "Trezy",
            "Evy",
            "Vizzia",
          ],
          [
            "RockFi",
            "Electra",
            "Pearl",
            "Nijta",
            "Shift",
            "TMFC",
            "Gorgias",
            "Spendesk",
            "Wave",
            "Qonto",
            "Vybe",
          ],
          [
            "Perma",
            "Allô",
            "Tilt Energy",
            "Adagio",
            "Pimento",
            "Homaio",
            "May",
            "Eplaque",
            "QSTNMRK",
            "Ringover",
          ],
        ],
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries we design for",
        items: [
          {
            id: "technology-saas",
            name: "Technology & SaaS",
            description:
              "Transforming complex products into clear, desirable, memorable identities, where technology becomes culture.",
          },
          {
            id: "fintech-financial",
            name: "Fintech & Financial",
            description:
              "Making financial brands premium, human, and trustworthy, design that builds credibility before the first meeting.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer & Lifestyle",
            description:
              "Brands that live in culture: e-commerce, D2C, beauty, food and beverage. We build identity people want to belong to.",
          },
          {
            id: "startups-scale-ups",
            name: "Startups & Scale-Ups",
            description:
              "From 0-to-1 brand identity to full rebrands ahead of a funding round or international expansion. What matters is ambition, not size.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Brand Design Process",
        blocks: [
          {
            id: "discovery-strategy",
            title: "Discovery & Strategy",
            description:
              "Every project begins with a deep immersion: competitive audit, brand positioning, messaging platform, naming when relevant. We understand before we create. The strategy becomes the creative brief that guides every decision that follows.",
          },
          {
            id: "creative-direction-identity-design",
            title: "Creative Direction & Identity Design",
            description:
              "Moodboards, visual concepts, logo design, typography, color palette, design system, exploration and iteration, co-constructed with the client rather than imposed. The creative direction is a conversation, not a dictate.",
          },
          {
            id: "build-launch",
            title: "Build & Launch",
            description:
              "Motion design, photography, web development, brand rollout across all touchpoints, from strategy to pixel, everything comes out of the same vision, one team, no handoffs. The brand launches with total coherence.",
          },
          {
            id: "evolve-grow",
            title: "Evolve & Grow",
            description:
              "Brand updates, new product lines, new markets, campaign assets, the best brands are never finished, they evolve. We stay close through growth phases, ensuring the identity scales without losing what makes it distinctive.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Brand Design",
        ctaHeading: "Ready to Work With a Brand Design Agency That Delivers?",
        ctaDescription:
          "If you're building something that deserves to be seen, Anagram is the brand design agency that will make it impossible to ignore. From strategy to launch, under one roof, we craft brands that need no introduction, and the results to prove it. Let's talk about your project.",
        ctaEmail: "hello@anagram.club",
        faqItems: [
          {
            question: "What does a brand design agency do?",
            answer:
              "A brand design agency defines brand strategy, designs the visual identity, logo, typography, colors, design system, and deploys the brand across every digital and physical touchpoint. It's the difference between making something look good and building something that works at scale.",
          },
          {
            question:
              "What is the difference between a brand design agency and a graphic design studio?",
            answer:
              "A graphic design studio executes visuals on demand. A brand design agency starts from strategy, positioning, audience, competitive landscape, then builds a coherent, scalable, and differentiated identity around it. One produces assets; the other builds a system.",
          },
          {
            question: "How long does a brand design project take?",
            answer:
              "A brand identity typically takes 6 to 12 weeks. A full rebrand, including design system and website development, usually runs 4 to 6 months, depending on scope.",
          },
          {
            question: "What is included in a brand identity design?",
            answer:
              "Logo, typography, color palette, iconography, brand guidelines, and design system as a baseline. Depending on scope, this can extend to illustration, motion design, and photography direction.",
          },
          {
            question: "How much does brand design cost?",
            answer:
              "Every project is scoped and priced individually based on your needs and ambition. Get in touch and we'll put together a brief together.",
          },
          {
            question: "Can you help us rebrand an existing company?",
            answer:
              "Yes, Anagram handles full rebrands end to end: auditing the existing brand, defining a new strategy, designing a new identity, and rolling it out across every touchpoint. Fortuneo is a good example of this process in practice.",
          },
          {
            question:
              "Do you work with startups or only established companies?",
            answer:
              "Both, Anagram works with early-stage startups as well as scale-ups and established brands. What matters is ambition, not company size.",
          },
        ],
      }}
    />
  );
}
