import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Startup Branding Agency — Anagram Studio",
  description:
    "Anagram builds startup brands that are built to last — from zero-to-one identity to scalable design systems. Strategy, design, motion, and web under one roof",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function StartupBrandingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="startup-branding-agency"
      title="Startup Branding Agency for Companies Ready to Make Their Mark"
      description="Anagram is a startup branding agency that builds brands from the ground up — combining brand strategy, visual identity, design systems, motion, and web development into one unified creative system from day one. Since 2020, we've partnered with ambitious startups across tech, fintech, SaaS, and consumer industries to create brands designed not only to launch, but to scale. From early-stage companies to category leaders, we've shaped more than 50 brands built to grow into names people recognize instantly. Brands that need no introduction."
      vision={{
        eyebrow: "Approach",
        heading: "The Anagram Approach to Startup Branding",
        intro:
          "Great startup brands are not built overnight. They are designed with the future in mind from the very beginning. At Anagram, branding starts with strategy rather than aesthetics — defining positioning, audience, and differentiation before moving into visual execution. The goal is not to create something temporarily attractive, but to build a scalable identity system capable of supporting long-term growth across products, markets, and communication channels.",
        blocks: [
          {
            id: "strategy-before-design",
            title: "Strategy Before Design",
            description:
              "Every startup branding project begins with strategic groundwork: market positioning, competitive analysis, target audience definition, and messaging development. For startups, these decisions are critical. A weak positioning strategy at launch becomes significantly more expensive to correct once the business starts scaling.",
          },
          {
            id: "identity-systems-built-to-scale",
            title: "Identity Systems Built to Scale",
            description:
              "We build scalable identity systems — logo, typography, color palette, iconography, and design systems — designed to work equally well at seed stage and Series B. Documentation and usage guidelines ensure internal teams can deploy the identity consistently without relying on the studio for every implementation.",
          },
          {
            id: "speed-without-compromising-craft",
            title: "Speed Without Compromising Craft",
            description:
              "Startups move quickly, and our process is structured to deliver core identity systems in 6–12 weeks. But speed never comes at the expense of craft. A rushed brand identity creates long-term inconsistencies that often cost more to fix later than building the right system from the beginning.",
          },
        ],
      }}
      services={{
        eyebrow: "Services",
        heading: "Startup Branding Services",
        subtitle:
          "From early-stage positioning to scalable digital experiences, Anagram delivers comprehensive branding services for startups under one roof — strategy, identity, motion, content, and web development built as one cohesive system from day one.",
        items: [
          {
            id: "brand-strategy-positioning",
            name: "Brand Strategy and Positioning",
            tag: "Foundation",
            description:
              "Market positioning, messaging platforms, competitive analysis, brand architecture, and tone of voice — strategic foundations designed to help startups launch with clarity and differentiate themselves within crowded markets.",
          },
          {
            id: "visual-identity-design-system",
            name: "Visual Identity and Design System",
            tag: "Core",
            description:
              "Logo design, typography, color systems, iconography, illustration, and scalable design systems — identities built to support growth from launch phase through future expansion.",
          },
          {
            id: "product-design-digital-experience",
            name: "Product Design and Digital Experience",
            tag: "Digital",
            description:
              "UI/UX systems, onboarding flows, dashboards, and product interfaces — connecting the brand identity directly to the digital experience and making the product itself part of the brand.",
          },
          {
            id: "motion-design-brand-assets",
            name: "Motion Design and Brand Assets",
            tag: "Alive",
            description:
              "Animated logos, motion systems, launch visuals, social assets, brand films, and digital content — transforming static identities into dynamic brand experiences adapted for modern platforms.",
          },
          {
            id: "photography-art-direction",
            name: "Photography and Art Direction",
            tag: "Visual",
            description:
              "Lifestyle photography, studio shoots, casting, styling, and visual direction — building a recognizable visual world around the startup and giving the brand a strong human presence.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom web design, front-end and back-end development, UX/UI design, and performance optimization — websites built to reflect the startup's positioning while supporting conversion and long-term scalability.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Startup Brands We Have Built",
        intro:
          "From fintech platforms to consumer startups and SaaS businesses, Anagram has helped shape ambitious companies at defining moments of growth.",
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
              "Fortuneo needed to attract younger audiences while strengthening its premium positioning around the Fosfo and Black cards. Anagram delivered brand strategy, identity, design systems, product design, motion, photography, and web development through a complete rebrand. Following launch, Fortuneo saw a 45% increase in subscription funnel entry, a 27% increase in prospects starting a project, and a 63% increase in submitted documents.",
            metrics: [
              "+45% subscription funnel entry",
              "+27% prospects starting a project",
              "+63% submitted documents",
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
              "As Planity entered a major expansion phase across Europe, the company partnered with Anagram on a three-year brand evolution spanning identity systems, photography, product design, B2C and B2B touchpoints, and scalable brand assets. Following the rebrand, Planity experienced a 50% increase in appointment bookings per second.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
        note: {
          title: "50 Brands and Growing",
          description:
            "From early-stage startups to established market leaders, we've shaped brands across technology, fintech, consumer, and B2B industries.",
          columns: [
            ["Qonto", "Ringover", "Gorgias", "Frequentiel"],
            ["Spendesk", "Nabla", "Arcads", "Gigi"],
            ["Pennylane", "Electra", "Gigi", "Nijta"],
            ["Nabla", "Allô", "Tilt Energy", "Adagio"],
            ["Bonsai", "Allô", "Tilt Energy", "Nijta"],
          ],
        },
      }}
      whyAnagram={{
        eyebrow: "When to Start",
        heading: "When Startups Need a Branding Agency",
        intro:
          "Branding creates the most impact when introduced at moments where the business is evolving rapidly or preparing for visibility at scale.",
        blocks: [
          {
            id: "at-launch",
            title: "At Launch",
            description:
              "The first identity, website, and communication assets define how the market perceives the company from day one. Strong foundations create consistency across every future touchpoint.",
          },
          {
            id: "before-a-funding-round",
            title: "Before a Funding Round",
            description:
              "Investors evaluate the brand as much as the product itself. A coherent visual identity and positioning system signal maturity, ambition, and strategic clarity during fundraising conversations.",
          },
          {
            id: "before-market-expansion",
            title: "Before Market Expansion",
            description:
              "Expanding into new markets or launching additional products requires a flexible identity system capable of evolving without losing consistency across regions, audiences, or digital experiences.",
          },
        ],
      }}
      sectors={{
        eyebrow: "Sectors",
        heading: "Industries We Work With",
        items: [
          {
            id: "tech-saas",
            name: "Tech and SaaS",
            description:
              "We create identities that transform complex software products into brands people immediately understand, remember, and want to engage with.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech and Financial Services",
            description:
              "Financial brands require trust, modernity, and accessibility simultaneously — one of the most demanding branding challenges for startups today.",
          },
          {
            id: "consumer-d2c",
            name: "Consumer and D2C",
            description:
              "We build lifestyle and consumer brands designed to live within culture, whether across e-commerce, beauty, food, or digital-first products.",
          },
          {
            id: "b2b-professional-services",
            name: "B2B and Professional Services",
            description:
              "Enterprise-focused businesses require clarity, authority, and strong visual positioning to earn credibility with professional buyers and decision-makers.",
          },
        ],
      }}
      process={{
        eyebrow: "Process",
        heading: "Our Process",
        blocks: [
          {
            id: "discovery-strategy",
            title: "Discovery and Strategy",
            description:
              "We begin with market research, positioning analysis, messaging development, and competitive audits to define the strategic direction before any visual exploration begins.",
          },
          {
            id: "creative-direction-identity-design",
            title: "Creative Direction and Identity Design",
            description:
              "Logo systems, typography, color palettes, visual concepts, and design systems are developed through an iterative process that allows refinement at every stage.",
          },
          {
            id: "build-launch",
            title: "Build and Launch",
            description:
              "Motion systems, photography, web development, and rollout assets are produced internally and launched as one coherent ecosystem across every touchpoint.",
          },
          {
            id: "evolve",
            title: "Evolve",
            description:
              "As the company grows, the brand evolves alongside it — new product launches, campaigns, market expansion, and updated systems become part of a long-term collaboration.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Startup Branding",
        ctaHeading: "Build Your Startup Brand with Anagram",
        ctaDescription:
          "The strongest startup brands are built with long-term ambition from the very beginning. Through strategy, identity, motion, and web development, Anagram creates scalable systems designed to grow alongside the companies behind them. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a startup branding agency do?",
            answer:
              "A startup branding agency defines brand strategy and positioning, designs scalable visual identities and design systems, produces motion assets, and builds digital experiences aligned under one creative direction.",
          },
          {
            question: "How much does startup branding cost?",
            answer:
              "Pricing depends on the scope of the project, including strategy, identity, motion, photography, and website development. Contact Anagram for a tailored proposal adapted to your startup's stage and objectives.",
          },
          {
            question: "How long does a startup brand build take?",
            answer:
              "A core identity project generally takes between 6 and 12 weeks. Full brand ecosystems involving websites, motion assets, and content production can extend between 3 and 6 months.",
          },
          {
            question: "Do you work with pre-revenue startups?",
            answer:
              "Yes. We work with startups at every stage, from pre-launch companies to post-Series B organizations. What matters most is the ambition behind the project rather than current ARR.",
          },
          {
            question: "Can we start with brand strategy only?",
            answer:
              "Yes. Strategy can exist as a standalone engagement, although most clients continue into identity design and execution once the strategic platform has been validated.",
          },
          {
            question: "Do you handle both design and development?",
            answer:
              "Yes. Designers, motion designers, strategists, and front-end and back-end developers all work internally at Anagram as part of the same creative process.",
          },
          {
            question:
              "What makes Anagram different from a freelancer or a generic design agency?",
            answer:
              "Anagram combines strategy, identity, motion, photography, product design, and development under one roof with a proven track record of delivering measurable business results — not only visual deliverables.",
          },
        ],
      }}
    />
  );
}
