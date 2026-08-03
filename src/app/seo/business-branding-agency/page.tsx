import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Business Branding Agency: Anagram Studio",
  description:
    "Anagram is the business branding agency that turns ambitious companies into brands people remember: strategy, identity, motion, and web built to drive growth.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function BusinessBrandingAgencyPage() {
  return (
    <AgencyPageTemplate
      idPrefix="business-branding-agency"
      verticalDividerDots={350}
      title="Business Branding Agency for Companies That Refuse to Blend In"
      description="Anagram is a Paris-based business branding agency building brands designed to stand apart, not just through logos or color palettes, but through complete identity systems that work across every touchpoint. Founded in 2020, the studio has shaped more than 50 brands across technology, fintech, SaaS, and consumer industries, working with companies ranging from early-stage startups to established market leaders. Through strategy, identity, motion, photography, and web development, we create brands designed to grow with the businesses behind them."
      services={{
        eyebrow: "Services",
        heading: "Business Branding Services",

        items: [
          {
            id: "brand-strategy",
            name: "Brand Strategy",
            tag: "Foundation",
            description:
              "Market positioning, competitive audits, brand architecture, messaging platforms, and tone of voice systems define the strategic foundations of the brand before any visual execution begins.",
          },
          {
            id: "visual-identity",
            name: "Visual Identity",
            tag: "Core",
            description:
              "Logo systems, typography, color palettes, iconography, and brand guidelines create distinctive visual identities designed for scalability, consistency, and long-term recognition across every platform.",
          },
          {
            id: "design-system",
            name: "Design System",
            tag: "Scale",
            description:
              "Component libraries, responsive frameworks, usage documentation, and operational guidelines help internal teams deploy the brand consistently without losing coherence as the business scales.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX systems and digital product interfaces bring the brand identity directly into the user experience, ensuring the product feels as aligned as the website and communication ecosystem.",
          },
          {
            id: "motion-design-visual-content",
            name: "Motion Design and Visual Content",
            tag: "Alive",
            description:
              "Animated identity systems, motion assets, brand films, photography, and social content create dynamic brand experiences designed to feel memorable across modern digital environments.",
          },
          {
            id: "website-design-development",
            name: "Website Design and Development",
            tag: "Platform",
            description:
              "Custom front-end and back-end development produces websites designed specifically around the brand itself, not templates retrofitted with a logo, but digital platforms built for conversion and scalability.",
          },
        ],
      }}
      whyAnagram={{
        eyebrow: "Why Anagram",
        heading: "Why Businesses Choose Anagram",
        blocks: [
          {
            id: "full-service-under-one-roof",
            title: "Full-Service Under One Roof",
            description:
              "Strategy, identity, motion, photography, product design, and web development are all handled internally by the same multidisciplinary team. This creates stronger creative consistency and eliminates fragmentation between external vendors.",
          },
          {
            id: "results-that-justify-the-investment",
            title: "Results That Justify the Investment",
            description:
              "Strong branding creates measurable business impact. Following its rebrand, Fortuneo experienced a 45% increase in subscription funnel entry, a 27% increase in prospects starting a project, and a 63% increase in submitted documents. Planity achieved a 50% increase in appointment bookings per second after its brand evolution. Branding is not a cost center. It is a growth lever.",
          },
          {
            id: "long-term-creative-partnership",
            title: "Long-Term Creative Partnership",
            description:
              "Our collaboration with Planity has evolved over more than three years, spanning product launches, campaign systems, photography, and expansion into new markets. A business branding agency should remain invested in the long-term evolution of the brand, not only the launch moment.",
          },
          {
            id: "boutique-studio-senior-talent",
            title: "Boutique Studio, Senior Talent",
            description:
              "Our smaller structure allows every project to receive senior-level attention from strategy through execution. No junior handoffs, no black-box production, direct collaboration with the people building the work.",
          },
        ],
      }}
      results={{
        eyebrow: "Work",
        heading: "Business Brands We Have Shaped",
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
              "Fortuneo partnered with Anagram to modernize its identity, attract younger audiences, and support premium card adoption. The project included strategy, identity systems, product design, motion, photography, and web development.",
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
              "As France's leading salon booking platform prepared for European expansion, Planity collaborated with Anagram on a three-year brand evolution covering identity systems, product design, photography, and B2C/B2B touchpoints.",
            metrics: ["+50% appointment bookings per second"],
          },
        ],
        note: {
          title: "50 Brands and Counting",
          description:
            "Qonto, Spendesk, Pennylane, Ringover, Nabla, Bonsai, Gorgias, and many more. From early-stage startups to category leaders, every brand Anagram shapes is designed to remain memorable as it grows.",
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
        heading: "Sectors We Work In",
        items: [
          {
            id: "technology-saas",
            name: "Technology and SaaS",
            description:
              "We transform complex software products into brands that feel clear, desirable, and strategically differentiated.",
          },
          {
            id: "fintech-financial-services",
            name: "Fintech and Financial Services",
            description:
              "We build financial brands that balance trust, credibility, and personality within one of the most demanding strategic categories.",
          },
          {
            id: "consumer-lifestyle",
            name: "Consumer and Lifestyle",
            description:
              "We create brands designed to live inside culture, brands that earn attention and emotional connection across physical and digital touchpoints.",
          },
          {
            id: "b2b-professional-services",
            name: "B2B and Professional Services",
            description:
              "We develop identities that signal expertise, authority, and clarity to enterprise buyers and professional audiences.",
          },
          {
            id: "startups-scale-ups",
            name: "Startups and Scale-Ups",
            description:
              "From zero-to-one brand systems to full-scale rebrands ahead of expansion, we help ambitious companies evolve through branding.",
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
              "Market research, stakeholder interviews, and competitive analysis help define the strategic realities surrounding the business before any creative direction begins.",
          },
          {
            id: "creative-direction",
            title: "Creative Direction",
            description:
              "Positioning systems, visual concepts, messaging frameworks, and identity design are developed collaboratively through structured review and refinement phases.",
          },
          {
            id: "build",
            title: "Build",
            description:
              "Motion systems, photography, websites, and rollout assets are produced internally, ensuring every touchpoint remains aligned with the original strategy.",
          },
          {
            id: "evolve",
            title: "Evolve",
            description:
              "As businesses launch products, enter new markets, and expand audiences, the brand continues evolving through long-term collaboration and ongoing creative support.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Business Branding",
        ctaHeading: "Build the Brand Your Business Deserves",
        ctaDescription:
          "The right branding agency is not necessarily the biggest. It is the one that remains invested in the success of the brand long after launch. Through strategy, identity, motion, photography, and web development, Anagram builds brands designed to stay relevant as businesses evolve. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What does a business branding agency do?",
            answer:
              "A business branding agency defines positioning, messaging, and visual identity systems while producing the broader ecosystem surrounding the brand: motion assets, photography, websites, and product experiences.",
          },
          {
            question:
              "How is a business branding agency different from a marketing agency?",
            answer:
              "A branding agency creates the identity, positioning, and voice of the company itself. Marketing agencies focus on distributing and promoting that brand once it exists.",
          },
          {
            question: "How much does business branding cost?",
            answer:
              "Every project is scoped individually depending on the strategic and creative requirements involved. Contact Anagram with your brief to receive a tailored proposal.",
          },
          {
            question: "How long does a branding project take?",
            answer:
              "A core identity system generally takes between 6 and 12 weeks. Full ecosystems involving motion, photography, and web development usually extend across several months.",
          },
          {
            question:
              "Do you work with established businesses or only startups?",
            answer:
              "Both. We collaborate with startups building their first brand as well as established companies undertaking repositioning or full-scale rebrands.",
          },
          {
            question: "Can we hire Anagram for brand strategy only?",
            answer:
              "Yes. Strategy can exist independently as a standalone engagement, although many clients continue into identity design and implementation afterward.",
          },
          {
            question: "Do you offer rebranding services?",
            answer:
              "Yes. Anagram handles complete rebrands, from strategic audits and repositioning through identity redesign, motion systems, and full rollout execution.",
          },
        ],
      }}
    />
  );
}
