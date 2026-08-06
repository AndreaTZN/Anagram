import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Branding & Marketing Agency: Anagram Creative Studio",
  description:
    "Anagram is a creative studio that builds bold, lasting brands: from strategy and identity to motion and web. We shape brands that need no introduction.",
  alternates: { canonical: "/seo/branding-marketing-agency" },
  openGraph: {
    title: "Branding & Marketing Agency: Anagram Creative Studio",
    description: "Anagram is a creative studio that builds bold, lasting brands: from strategy and identity to motion and web. We shape brands that need no introduction.",
    url: "/seo/branding-marketing-agency",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function BrandingMarketingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="branding-marketing-agency"
      title="Branding & Marketing Agency: We Shape Brands That Need No Introduction"
      description="Anagram is a branding & marketing agency, a multidisciplinary creative studio founded in 2020, working with scale-ups and ambitious companies ready to grow. We build brand strategy, identity, motion, and web development under one roof, turning positioning into a system that markets itself. The result: brands that need no introduction."
      vision={{
        eyebrow: "Content Plan",
        heading: "What Does a Branding & Marketing Agency Do?",
        blocks: [
          {
            id: "branding-vs-marketing",
            description:
              "Branding defines how a company is perceived: positioning, identity, tone, visual language. Marketing brings that identity into the world through campaigns, digital experiences, content, and communication systems. At Anagram the two are built together: we create the strategic and creative foundations of a brand while designing the tools that let businesses market themselves consistently across web, product, motion, and content.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Why Anagram",
        heading: "Why Work With Anagram?",
        intro:
          "Anagram operates as a boutique creative studio built around craft, iteration, and long-term collaboration. We work closely with ambitious teams to create brands designed not only to launch successfully, but to scale and evolve over time.",
        blocks: [
          {
            id: "craft-attention-to-detail",
            title: "Craft and Attention to Detail",
            description:
              "Our multidisciplinary team is driven by a shared ambition to craft unique experiences through iteration, creativity, and an eye for detail. Every project is approached collaboratively, pushing the boundaries of design while maintaining a strong strategic foundation behind every creative decision.",
          },
          {
            id: "results-beyond-aesthetics",
            title: "Results That Go Beyond Aesthetics",
            description:
              "Strong branding should drive measurable business results. Fortuneo: +45% subscription funnel entry, +27% prospects starting a project, +63% documents submitted. Planity: +50% appointment bookings per second. Design becomes valuable when it supports growth, engagement, and long-term performance.",
          },
          {
            id: "built-for-the-long-term",
            title: "A Studio Built for the Long Term",
            description:
              "Some of our collaborations continue for years. Our partnership with Planity evolved over more than three years across identity, product design, photography, and brand development. We believe the strongest brands are built through continuous refinement rather than one-off launches.",
          },
          {
            id: "one-team-one-vision",
            title: "One Team, One Creative Vision",
            description:
              "Strategy, identity, product design, motion, photography, and web development are all handled internally by one team. This creates a comprehensive and coherent creative process where ideas remain aligned from early strategy through launch and future evolution.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Branding & Marketing Services",
        items: [
          {
            id: "brand-strategy-positioning",
            name: "Brand Strategy and Positioning",
            tag: "Foundation",
            description:
              "Market positioning, competitive analysis, messaging platforms, brand architecture, and strategic direction: the foundations that define how the brand differentiates itself and communicates consistently across every channel.",
          },
          {
            id: "brand-identity-visual-systems",
            name: "Brand Identity and Visual Systems",
            tag: "Core",
            description:
              "Logo design, typography, color palettes, iconography, illustration, and scalable visual systems: brand identities built to remain coherent across digital products, campaigns, content, and future brand evolution.",
          },
          {
            id: "product-design-digital-experience",
            name: "Product Design and Digital Experience",
            tag: "Digital",
            description:
              "UI/UX design, product interfaces, onboarding flows, and digital design systems, connecting brand identity directly to the user experience across web platforms and digital products.",
          },
          {
            id: "motion-brand-content",
            name: "Motion and Brand Content",
            tag: "Alive",
            description:
              "Motion design, animated systems, photography direction, video production, brand films, and social assets, dynamic content designed to bring the brand to life across modern digital environments.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom web design, front-end and back-end development, and performance-focused digital experiences, websites designed as strategic brand platforms rather than templated marketing pages.",
          },
          {
            id: "creative-campaigns-launch-assets",
            name: "Creative Campaigns and Launch Assets",
            tag: "Campaign",
            description:
              "Campaign concepts, launch visuals, digital assets, presentation systems, and branded communication materials, creative tools designed to support product launches, announcements, and brand growth initiatives.",
          },
        ],
      }}
      results={{
        eyebrow: "Results",
        heading: "Selected Work",
        stats: [
          {
            id: "funnel-entry",
            value: "+45%",
            label: "subscription funnel entry (Fortuneo rebrand)",
          },
          {
            id: "appointment-bookings",
            value: "+50%",
            label: "appointment bookings per second (Planity)",
          },
          {
            id: "brands-shaped",
            value: "50+",
            label: "brands shaped across tech, fintech & consumer",
          },
        ],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo",
            industry: "Making finance feel desirable",
            description:
              "Fortuneo, one of France's leading online banks, needed a brand capable of supporting its premium ambitions while remaining accessible. Anagram developed the strategy, identity, design system, motion, product design, photography, and web ecosystem behind the rebrand. The project contributed to a 45% increase in subscription funnel entry.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects",
              "+63% documents submitted",
            ],
          },
          {
            id: "planity",
            image: {
              src: "/works/Planity/backstage/1.webp",
              alt: "Planity",
            },
            title: "Planity",
            industry: "Building a brand for European scale",
            description:
              "As Planity entered a major growth phase, the company needed a scalable identity system capable of supporting both B2C and B2B experiences. Over a three-year collaboration, Anagram developed identity systems, product design, photography, and digital touchpoints that helped support a 50% increase in appointment bookings per second.",
            metrics: [
              "+50% appointment bookings per second",
              "3-year partnership",
            ],
          },
        ],
      }}
      clients={{
        eyebrow: "50+ Brands, Counting",
        heading:
          "From ambitious startups to market leaders, we've shaped brands that stand the test of scale.",
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
            "Pennylane",
          ],
        ],
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries We Work With",
        items: [
          {
            id: "technology-saas",
            name: "Technology & SaaS",
            description:
              "We help software brands and SaaS companies transform complex products into identities that feel clear, desirable, and memorable, creating systems designed for scale and product adoption.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech & Financial Services",
            description:
              "Financial brands require a careful balance between trust, accessibility, and premium perception. We create identities that make financial products feel contemporary, human, and credible.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer & Lifestyle",
            description:
              "From beauty to food and e-commerce, we build consumer brands designed to live inside culture, brands shaped for attention, emotional connection, and long-term recognition.",
          },
          {
            id: "startups-scale-ups",
            name: "Startups & Scale-Ups",
            description:
              "From early-stage startups building their first identity to scale-ups preparing for international expansion, we help growing businesses create strategic brand systems adapted to rapid evolution.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Process",
        blocks: [
          {
            id: "discovery-strategy",
            title: "Discovery & Strategy",
            description:
              "Every project starts with market analysis, competitive audits, audience understanding, and brand positioning work. We define the strategic foundation before moving into creative development.",
          },
          {
            id: "creative-direction-identity",
            title: "Creative Direction & Identity",
            description:
              "We create visual concepts, identity systems, and design directions through an iterative review process designed to refine every detail and align the brand with its long-term ambitions.",
          },
          {
            id: "build-launch",
            title: "Build & Launch",
            description:
              "Motion systems, photography, web development, and rollout assets are developed across every touchpoint to ensure the launch feels coherent, scalable, and operationally ready.",
          },
          {
            id: "evolve-grow",
            title: "Evolve & Grow",
            description:
              "We continue supporting brands after launch through long-term partnerships, campaign assets, product updates, and evolving design systems as businesses continue to grow.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Branding & Marketing",
        ctaHeading: "Ready to Work With a Brand Design Agency That Delivers?",
        ctaDescription:
          "If you're building something that deserves to be seen, Anagram is the brand design agency that will make it impossible to ignore. From strategy to launch, under one roof, we craft brands that need no introduction, and the results to prove it. Let's talk about your project.",
        ctaEmail: "hello@anagram.club",
        faqItems: [
          {
            question: "What is the difference between branding and marketing?",
            answer:
              "Branding is who you are; marketing is how you communicate it. A strong brand doesn't compete with marketing. It makes every marketing effort more effective, because the audience already knows what you stand for.",
          },
          {
            question: "What services does a branding & marketing agency offer?",
            answer:
              "Anagram offers brand strategy, brand identity, product design, motion design, photography, and website development, all in-house, so nothing gets lost in translation between separate teams.",
          },
          {
            question: "How long does a branding project take?",
            answer:
              "A brand identity typically takes 6 to 12 weeks. A full rebrand with website development usually takes 6 months or more, depending on scope.",
          },
          {
            question: "Do you work with companies outside France?",
            answer:
              "Yes, Anagram is a Paris-based studio working with international clients, remote-first by default.",
          },
          {
            question: "How do you measure the success of a branding campaign?",
            answer:
              "Concrete business results: conversion, awareness, and engagement. Fortuneo saw a 45% lift in subscription funnel entry after its rebrand; Planity saw a 50% increase in appointment bookings per second.",
          },
          {
            question: "What industries do you specialize in?",
            answer:
              "Tech, SaaS, fintech, consumer, and startups, but Anagram works with any brand ambitious enough to want to be different.",
          },
          {
            question: "Can you handle the full build: design and development?",
            answer:
              "Yes, our team is entirely in-house: designers, motion designers, and front-end and back-end developers, all working from the same creative direction.",
          },
        ],
      }}
    />
  );
}
