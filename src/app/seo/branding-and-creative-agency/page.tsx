import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Branding and Creative Agency | anagram",
  description:
    "Anagram is a Paris-based branding and creative agency combining strategy, identity, motion, photography, and web development under one roof since 2020.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function BrandingAndCreativeAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="branding-and-creative-agency"
      title="Branding and Creative Agency: Anagram Studio"
      description="Anagram is a branding and creative agency that combines strategic thinking with world-class execution: identity, motion, photography, and web built to last."
      vision={{
        eyebrow: "Approach",
        heading: "Brand Strategy and Creative Direction, Combined",
        intro:
          "A branding and creative agency should deliver more than visuals or presentations alone. Strategy without execution remains theoretical. Execution without strategy becomes decoration. At Anagram, positioning, messaging, identity, motion, photography, and web experiences are developed together, creating brands that feel strategically grounded and creatively consistent from launch onward.",
        blocks: [
          {
            id: "brand-strategy",
            title: "Brand Strategy",
            description:
              "Positioning, messaging systems, brand architecture, and tone of voice define the strategic layer behind every creative decision, ensuring the brand communicates with clarity and purpose across every audience and platform.",
          },
          {
            id: "brand-identity",
            title: "Brand Identity",
            description:
              "Logo systems, typography, color palettes, design systems, and illustration create scalable visual identities designed for long-term consistency across digital products, campaigns, and evolving brand ecosystems.",
          },
          {
            id: "creative-direction-motion",
            title: "Creative Direction and Motion",
            description:
              "Art direction, motion systems, brand films, photography, and animated assets bring the identity to life, transforming static branding into a living experience across digital and physical touchpoints.",
          },
          {
            id: "website-design-development",
            title: "Website Design and Development",
            description:
              "Custom web design combined with front-end and back-end development creates digital platforms that reflect the brand strategically while supporting performance, scalability, and measurable business outcomes.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Branding and Creative Services",
        subtitle:
          "Anagram delivers comprehensive creative services designed to help brands define their positioning, build scalable identities, and deploy cohesive experiences across every digital and physical touchpoint.",
        items: [
          {
            id: "brand-positioning-messaging",
            name: "Brand Positioning and Messaging",
            tag: "Foundation",
            description:
              "Competitive analysis, market positioning, messaging architecture, and brand voice systems designed to clarify how the brand differentiates itself and communicates consistently.",
          },
          {
            id: "visual-identity-design-systems",
            name: "Visual Identity and Design Systems",
            tag: "Core",
            description:
              "Logo design, typography, color systems, iconography, illustration, and scalable design systems created to support long-term brand evolution and operational consistency.",
          },
          {
            id: "motion-design-creative-content",
            name: "Motion Design and Creative Content",
            tag: "Alive",
            description:
              "Motion systems, animated assets, photography direction, video production, and brand films designed to create dynamic, memorable brand experiences across modern channels.",
          },
          {
            id: "product-design-digital-experience",
            name: "Product Design and Digital Experience",
            tag: "Digital",
            description:
              "UI/UX systems, onboarding flows, dashboards, and product interfaces connecting the brand identity directly to the digital product experience.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom websites, front-end and back-end development, UX/UI design, and performance-focused engineering built to support conversion, scalability, and long-term brand growth.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Why Anagram",
        heading: "Why Work With Anagram",
        blocks: [
          {
            id: "craft-at-every-touchpoint",
            title: "Craft at Every Touchpoint",

            description:
              "Our multidisciplinary team is driven by craft, iteration, and attention to detail. Every touchpoint, from typography and motion to photography and development, is considered as part of one cohesive creative system rather than assembled from templates.",
          },
          {
            id: "results-behind-the-work",
            title: "Results Behind the Work",

            description:
              "Creative quality should create measurable business impact. Following its rebrand, Fortuneo saw a 45% increase in subscription funnel entry. After Planity's brand evolution, the platform experienced a 50% increase in appointment bookings per second, proof that strong creative execution supports real business growth.",
          },
          {
            id: "one-team-one-vision",
            title: "One Team, One Vision",

            description:
              "Strategy, identity, motion, photography, and web development are all produced internally. This creates full creative coherence from the initial brief through launch, without fragmentation between external teams or disconnected execution layers.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Selected Work",
        intro:
          "From fintech leaders to consumer startups, Anagram builds brands designed to scale across products, markets, and audiences.",
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
              "For Fortuneo, Anagram delivered a complete rebrand spanning strategy, identity, design systems, product design, motion, photography, and web development. The transformation helped reposition the French online bank toward a more premium and contemporary audience, contributing to a 45% increase in subscription funnel entry.",
            metrics: ["+45% subscription funnel entry"],
          },
          {
            id: "planity",
            image: {
              src: "/works/Planity/backstage/1.webp",
              alt: "Planity",
            },
            title: "Planity",
            description:
              "Over a three-year collaboration, Anagram developed Planity's identity systems, photography, product design, and B2C/B2B touchpoints as the company expanded across Europe. Following the rebrand, Planity achieved a 50% increase in appointment bookings per second.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
        note: {
          title: "The Portfolio",
          description:
            "More than 50 brands shaped: from ambitious startups to established market leaders. Selected collaborations include Qonto, Spendesk, Pennylane, Ringover, Nabla, Bonsai, and Gorgias.",
          columns: [
            ["Qonto", "Ringover", "Gorgias", "Frequentiel"],
            ["Spendesk", "Nabla", "Arcads", "Gigi"],
            ["Pennylane", "Electra", "Gigi", "Nijta"],
            ["Nabla", "Allô", "Tilt Energy", "Adagio"],
            ["Bonsai", "Allô", "Tilt Energy", "Nijta"],
          ],
        },
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries We Serve",
        items: [
          {
            id: "technology-saas",
            name: "Technology and SaaS",
            description:
              "We transform complex software products into brands that feel clear, understandable, and desirable across digital experiences.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech and Financial Services",
            description:
              "We build financial brands that balance trust, premium perception, and human warmth within one of the most demanding strategic categories.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer and Lifestyle",
            description:
              "We create brands designed to live within culture, earning attention across e-commerce, beauty, lifestyle, food, and digital-first consumer products.",
          },
          {
            id: "startups-scale-ups",
            name: "Startups and Scale-Ups",
            description:
              "From zero-to-one identity systems to full-scale rebrands ahead of international expansion, we help ambitious companies grow through branding.",
          },
        ],
      }}
      faqCta={{
        faqTitle:
          "Frequently Asked Questions About Branding and Creative Services",
        ctaHeading: "Start Building Your Brand",
        ctaDescription:
          "Anagram is the branding and creative agency for companies that want to create lasting perception, stronger positioning, and memorable digital experiences. Through strategy, identity, motion, photography, and web development, we build brands designed to remain relevant as they grow. Brands that need no introduction.",
        ctaButtons: [
          { label: "Contact us", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What is a branding and creative agency?",
            answer:
              "A branding and creative agency combines strategic thinking and creative execution under one team, covering positioning, identity systems, motion design, photography, and web experiences through one cohesive direction.",
          },
          {
            question: "What services does Anagram offer?",
            answer:
              "Anagram provides brand strategy, visual identity, design systems, illustration, product design, motion design, photography, video production, website design, and front-end/back-end development.",
          },
          {
            question: "How long does a branding project take?",
            answer:
              "A core brand identity project generally takes between 6 and 12 weeks, while larger ecosystems involving websites, motion systems, and content production can extend across several months.",
          },
          {
            question: "Do you work with international clients?",
            answer:
              "Yes. Although based in Paris, Anagram collaborates with clients internationally across technology, fintech, SaaS, and consumer sectors.",
          },
          {
            question: "How do I start a project with Anagram?",
            answer:
              "Simply contact the studio with your project brief, objectives, and timeline. The team will come back with a tailored proposal adapted to the scope of the collaboration.",
          },
        ],
      }}
    />
  );
}
