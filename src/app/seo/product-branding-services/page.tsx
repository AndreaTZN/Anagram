import type { Metadata } from "next";
import AgencyPageTemplate from "@/components/agency-page/AgencyPageTemplate";

export const metadata: Metadata = {
  title: "Product Branding Services | anagram",
  description:
    "Anagram delivers product branding services bridging brand identity and product design: strategy, visual identity, UI/UX, and motion, all in-house.",
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

export default function ProductBrandingServicesPage() {
  return (
    <AgencyPageTemplate
      idPrefix="product-branding-services"
      verticalDividerDots={60}
      title="Product Branding Services That Connect Identity to Experience"
      description="Anagram delivers product branding services that bridge brand identity and product design into one coherent system. We believe a product brand should not only exist on a homepage or within marketing assets, but directly inside the user experience itself. Strategy, visual identity, product design, UI/UX, and motion are all developed internally by the same team, creating products that feel consistent across every interaction, from first impression to product usage."
      services={{
        eyebrow: "Services",
        heading: "Product Branding Services at Anagram",
        subtitle:
          "Anagram combines brand systems and product experiences into one connected creative process designed to make products feel recognizable, intuitive, and memorable.",
        items: [
          {
            id: "visual-identity-for-your-product",
            name: "Visual Identity for Your Product",
            tag: "Identity",
            description:
              "Logo systems, typography, color palettes, iconography, and brand guidelines create a scalable identity designed to function consistently across packaging, digital products, marketing assets, and product ecosystems.",
          },
          {
            id: "product-design-ui",
            name: "Product Design and UI",
            tag: "Digital",
            description:
              "UI/UX design and product systems translate the brand identity directly into the product experience, creating interfaces that feel intuitive, coherent, and aligned with the broader positioning of the brand.",
          },
          {
            id: "motion-brand-assets",
            name: "Motion and Brand Assets",
            tag: "Alive",
            description:
              "Animated identities, motion systems, product demos, and social assets bring rhythm and movement into the product ecosystem, making the brand feel more dynamic and memorable across digital platforms.",
          },
        ],
      }}
      faqCta={{
        faqTitle: "Frequently Asked Questions About Product Branding",
        ctaHeading: "Build a Product Brand That Lasts",
        ctaDescription:
          "Products should feel as strong visually as they do functionally. Through strategy, identity, UI/UX, and motion, Anagram creates product brands designed to remain coherent, scalable, and memorable over time. Brands that need no introduction.",
        ctaButtons: [
          { label: "Start a project", href: "mailto:hello@anagram.club" },
          { label: "See our work", href: "/works" },
        ],
        faqItems: [
          {
            question: "What are product branding services?",
            answer:
              "Product branding services create the visual identity, design systems, and product experience surrounding a specific product, ensuring the brand remains coherent from the homepage to the final screen inside the application itself.",
          },
          {
            question: "How much do product branding services cost?",
            answer:
              "Every project is scoped individually depending on the strategic, creative, and technical requirements involved. Contact Anagram with your brief to receive a tailored proposal.",
          },
          {
            question: "Do you handle both branding and product design?",
            answer:
              "Yes. Anagram combines brand designers and product designers internally so identity systems and digital experiences are developed together rather than separately.",
          },
        ],
      }}
    />
  );
}
