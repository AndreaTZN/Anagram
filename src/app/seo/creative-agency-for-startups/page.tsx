import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Creative Agency for Startups: Anagram Studio",
  description:
    "Anagram is the creative agency for startups that build brands with long-term ambition: strategy, identity, motion, photography, and web, built to scale.",
  alternates: { canonical: "/seo/creative-agency-for-startups" },
  openGraph: {
    title: "Creative Agency for Startups: Anagram Studio",
    description: "Anagram is the creative agency for startups that build brands with long-term ambition: strategy, identity, motion, photography, and web, built to scale.",
    url: "/seo/creative-agency-for-startups",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

export default function CreativeAgencyForStartupsPage() {
  return (
    <AgencyPageTemplate
      idPrefix="creative-agency-for-startups"
      title="Creative Agency for Startups That Build Brands With Long-Term Ambition"
      verticalDividerDots={280}
      description="Anagram is a creative agency for startups, the studio that has spent five years building brands that work today and scale for what comes next. Founded in 2020 in Paris, we've built more than 50 brands across tech, fintech, and consumer, including companies that started at seed stage and are now category leaders. Startups need to move fast and spend wisely, but the brand decisions made at launch are the hardest to undo later. Anagram solves this tension by building it right the first time: strategy, identity, motion, and web, developed as one system from day one."
      services={{
        eyebrow: "Services",
        heading: "Creative Services for Startups",
        subtitle:
          "Every creative service a startup needs, produced by one team under one creative direction.",
        items: [
          {
            id: "brand-strategy",
            name: "Brand Strategy",
            tag: "Foundation",
            description:
              "Market positioning, competitive audit, brand architecture, messaging platform, and brand voice: the strategic layer that makes every creative decision intentional. A clear brand strategy means faster decision-making as the startup scales: less debate over whether something is on-brand, because the brief makes it obvious.",
          },
          {
            id: "brand-identity-visual-system",
            name: "Brand Identity and Visual System",
            tag: "Core",
            description:
              "Logo, typography, color palette, iconography, and illustration across 2D, 3D, and AI, packaged into brand guidelines: a visual identity system that works at seed stage and still holds up at Series C. Not a logo for today, but a system built for the brand the startup is becoming.",
          },
          {
            id: "design-system",
            name: "Design System",
            tag: "Scale",
            description:
              "Component libraries and usage documentation form the operational layer that lets a startup's internal team, and future agencies, execute the brand without the studio in the room. A design system is the highest-leverage brand asset a startup can have. It compounds in value every time someone uses it.",
          },
          {
            id: "illustration-visual-language",
            name: "Illustration and Visual Language",
            tag: "Distinctive",
            description:
              "Custom illustration, 2D, 3D, and AI-generated, adds a distinctive visual dimension that makes a startup's brand recognizable beyond the logo. It's often the fastest way to differentiate in a crowded category where everyone has a clean sans-serif logo and a blue color palette.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX and product design apply the brand identity directly to the digital product itself. The product is a startup's most important marketing channel, if it doesn't feel on-brand, no amount of marketing can fix the perception.",
          },
          {
            id: "motion-design-brand-assets",
            name: "Motion Design and Brand Assets",
            tag: "Alive",
            description:
              "Animated brand identity, motion guidelines, social assets, and brand films: the moving layer that makes a startup's brand memorable on social and at events.",
          },
          {
            id: "photography-visual-direction",
            name: "Photography and Visual Direction",
            tag: "Visual",
            description:
              "Art direction, studio and lifestyle photography, casting, and styling: the human face of a startup brand. Photography is often deprioritized at early stages, but it's one of the highest-impact brand assets: the difference between a startup that looks real and one that doesn't.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom web design, front-end and back-end development: a website built to convert, built to reflect the brand, and built to grow with the startup.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Why Anagram",
        heading: "Why Startups Work With Anagram",
        blocks: [
          {
            id: "built-for-startup-speed",
            title: "Built for Startup Speed, Without Cutting Corners",
            description:
              "Anagram's process is structured to deliver a core brand identity in 6 to 12 weeks, fast enough to ship before a launch or a funding round, rigorous enough to build something that lasts.",
          },
          {
            id: "brand-systems-built-to-scale",
            title: "Brand Systems Built to Scale",
            description:
              "Every brand Anagram builds is conceived as a system, not a set of assets, a design system and guidelines the startup can execute independently as the team and the brand grow.",
          },
          {
            id: "measurable-impact-from-the-start",
            title: "Measurable Impact From the Start",
            description:
              "Fortuneo: +45% subscription funnel entry, +27% prospects starting a project, +63% documents submitted after its rebrand. Planity: +50% appointment bookings per second. Creative quality is a growth lever. The brands that invest in it early outperform the ones that treat it as a nice-to-have.",
          },
          {
            id: "one-team-one-creative-vision",
            title: "One Team, One Creative Vision",
            description:
              "Strategy, identity, product design, motion, photography, and web development: all in-house. No handoffs between agencies, no translation loss, no version control hell.",
          },
          {
            id: "long-term-creative-partner",
            title: "Long-Term Creative Partner",
            description:
              "The best creative agencies for startups aren't project shops. They're partners that stay invested in the brand's success as the startup evolves. Anagram's three-year partnership with Planity built and refined the brand through every stage of its European expansion.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Startup Brands We Have Built",
        intro:
          "From seed-stage startups to category leaders, here's a closer look at two brands we've built, and the wider portfolio behind them.",
        stats: [],
        cases: [
          {
            id: "fortuneo",
            image: {
              src: "/works/Fortuneo/release/1.webp",
              alt: "Fortuneo",
            },
            title: "Fortuneo",
            industry: "French online bank",
            description:
              "Fortuneo needed to attract younger users and drive premium card adoption, a full rebrand built around a single strategic insight. The project covered brand strategy, identity, design system, product design, motion, illustration, photography, video, and web development.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% documents submitted",
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
            industry: "B2B SaaS, Europe",
            description:
              "France's leading salon booking platform, building a brand for B2C growth and European B2B expansion, a three-year creative partnership covering brand strategy, identity, design system, B2C and B2B touchpoints, product design, and photography.",
            metrics: [
              "+50% appointment bookings per second",
              "3-year partnership",
            ],
          },
        ],
        note: {
          title: "50 Brands Built Across Every Stage",
          description:
            "From pre-launch startups with no brand to Series B companies preparing for international expansion, the full range of the startup lifecycle, represented in the Anagram portfolio.",
          columns: [
            ["Qonto"],
            ["Spendesk"],
            ["Pennylane"],
            ["Ringover"],
            ["Nabla"],
            ["Bonsai"],
            ["Gorgias"],
          ],
        },
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries We Serve",
        items: [
          {
            id: "tech-saas-startups",
            name: "Tech and SaaS Startups",
            description:
              "Making complex products feel clear, desirable, and human, the creative challenge that defines the SaaS category.",
          },
          {
            id: "fintech-startups",
            name: "Fintech Startups",
            description:
              "Brands that earn trust fast and feel modern without feeling reckless, the specific creative challenge of financial technology.",
          },
          {
            id: "consumer-d2c-startups",
            name: "Consumer and D2C Startups",
            description:
              "Brands that earn a place in culture: e-commerce, beauty, food, and lifestyle products that people want to be associated with.",
          },
          {
            id: "b2b-startups",
            name: "B2B Startups",
            description:
              "Brands that earn the trust of enterprise buyers before the startup has a long track record, visual authority that signals expertise.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Creative Process for Startups",
        blocks: [
          {
            id: "discovery-positioning",
            title: "Discovery and Positioning",
            description:
              "Market research, competitive audit, positioning: building the strategic foundation before any pixel is touched. Typically 2 to 3 weeks.",
          },
          {
            id: "creative-direction-identity-design",
            title: "Creative Direction and Identity Design",
            description:
              "Visual concept, logo design, typography, color palette, design system: iterative reviews, built in close collaboration with the founding team.",
          },
          {
            id: "build-launch",
            title: "Build and Launch",
            description:
              "Motion, photography, web development, brand rollout: everything the startup needs to go to market, produced by one team in sequence.",
          },
          {
            id: "evolve",
            title: "Evolve",
            description:
              "New product lines, new markets, new campaign assets: the brand continues to develop as the startup grows. Anagram stays in the picture.",
          },
        ],
      }}
      faqCta={{
        faqTitle:
          "Frequently Asked Questions About Creative Agency Services for Startups",
        ctaHeading: "Build Your Startup Brand With Anagram",
        ctaDescription:
          "The startups that build great brands early move faster, raise more easily, and attract better teams, the brand is the startup's first product, whether it treats it that way or not. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a creative agency for startups do?",
            answer:
              "It builds the startup's brand from strategy through launch: brand positioning, visual identity, design system, motion, photography, and website, all produced by one team under one creative direction.",
          },
          {
            question: "When should a startup hire a creative agency?",
            answer:
              "At launch, before a funding round, before a market expansion, or when the brand no longer reflects where the company is headed, the earlier the better, because brand decisions compound.",
          },
          {
            question: "How much does a startup creative agency cost?",
            answer:
              "Every project is scoped individually. Contact Anagram with a brief for a tailored proposal, the studio works across a range of budgets and startup stages.",
          },
          {
            question: "How long does a startup brand project take?",
            answer:
              "6 to 10 weeks for a core brand identity, 3 to 5 months for a full build including design system, motion, photography, and website.",
          },
          {
            question:
              "Should a startup hire a creative agency or a freelancer?",
            answer:
              "A freelancer can handle individual deliverables. A creative agency brings strategic thinking, creative direction, and a full team, the brand is built as a system, not assembled from parts.",
          },
          {
            question: "Do you work with pre-revenue startups?",
            answer:
              "Yes, Anagram works with startups from pre-launch through post-Series B. What matters is the ambition, not the stage.",
          },
          {
            question: "What is included in a startup branding package?",
            answer:
              "Brand strategy, visual identity (logo, typography, color palette, iconography), design system, and brand guidelines, plus illustration, motion, photography, and website, depending on scope.",
          },
          {
            question:
              "Do you offer ongoing creative support after the initial project?",
            answer:
              "Yes, many of Anagram's clients continue into ongoing partnerships for campaign assets, product design updates, and brand evolution as the company grows.",
          },
        ],
      }}
    />
  );
}
