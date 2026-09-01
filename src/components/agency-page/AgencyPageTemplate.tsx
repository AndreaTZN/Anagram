import { Fragment } from "react";
import Footer from "@/components/Footer";
import InfoBlocksSection from "./InfoBlocksSection";
import ServicesPanel from "./ServicesPanel";
import SectionHeader from "./SectionHeader";
import StatsRow from "./StatsRow";
import CaseHighlightCard from "./CaseHighlightCard";
import ClientsWall from "./ClientsWall";
import SectorsGrid from "./SectorsGrid";
import Faq from "./Faq";

const HERO_VIDEOS = [
  "/seo/video01.mp4",
  "/seo/video02.mp4",
  "/seo/video03.mp4",
  "/seo/video04.mp4",
  "/seo/video05.mp4",
] as const;

// Deterministic pick from idPrefix: every page keeps the same video across
// renders and reloads, so SSR and hydration agree and the file stays cached.
function heroVideoFor(idPrefix: string): string {
  let hash = 0;
  for (let i = 0; i < idPrefix.length; i++) {
    hash = (hash * 31 + idPrefix.charCodeAt(i)) | 0;
  }
  return HERO_VIDEOS[Math.abs(hash) % HERO_VIDEOS.length];
}

type InfoBlock = {
  id: string;
  title?: string;
  quote?: string;
  description: string;
};

type InfoBlocksData = {
  eyebrow: string;
  heading: string;
  intro?: string;
  blocks: InfoBlock[];
};

type ServiceItem = {
  id: string;
  name: string;
  tag: string;
  description: string;
};

type ServicesData = {
  eyebrow: string;
  heading: string;
  subtitle?: string;
  items: ServiceItem[];
};

type Stat = {
  id: string;
  value: string;
  label: string;
};

type CaseHighlight = {
  id: string;
  image: { src: string; alt: string };
  title: string;
  industry?: string;
  description: string;
  metrics: string[];
};

type ResultsNote = {
  title: string;
  description: string;
  columns?: string[][];
};

type ResultsData = {
  eyebrow: string;
  heading: string;
  intro?: string;
  stats: Stat[];
  cases: CaseHighlight[];
  note?: ResultsNote;
};

type ClientsData = {
  eyebrow: string;
  heading: string;
  columns: string[][];
};

type SectorItem = {
  id: string;
  name: string;
  description: string;
  href?: string;
};

type SectorsData = {
  eyebrow: string;
  heading: string;
  items: SectorItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type CtaButton = {
  label: string;
  href: string;
};

type FaqCtaData = {
  faqTitle: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaEmail?: string;
  ctaButtons?: CtaButton[];
  faqItems: FaqItem[];
};

type Props = {
  idPrefix: string;
  title: string;
  description: string;
  // Omit to use the video derived from idPrefix; pass a path to override.
  heroVideo?: string;
  vision?: InfoBlocksData;
  whyAnagram?: InfoBlocksData;
  services: ServicesData;
  results?: ResultsData;
  clients?: ClientsData;
  sectors?: SectorsData;
  process?: InfoBlocksData;
  faqCta: FaqCtaData;
  verticalDividerDots?: number;
};

export default function AgencyPageTemplate({
  idPrefix,
  title,
  description,
  heroVideo,
  vision,
  whyAnagram,
  services,
  results,
  clients,
  sectors,
  process,
  faqCta,
  verticalDividerDots = 600,
}: Props) {
  return (
    <main
      id={`${idPrefix}-page`}
      className="relative flex-1 pt-4 pr-4 pl-4 pb-4 max-[766px]:px-4 max-[766px]:pt-4 max-[992px]:mt-12 flex flex-col gap-16"
    >
      <section id={`${idPrefix}-hero`} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#0c0c0c] leading-[1.1] tracking-[-0.02em] text-[2.5rem] max-w-3xl">
            {title}
          </h1>
          <p className="text-[#7e7e7e] text-base leading-[1.4] max-w-2xl">
            {description}
          </p>
        </div>
        <div className="relative w-full aspect-1166/476 overflow-hidden">
          <video
            src={heroVideo ?? heroVideoFor(idPrefix)}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
      </section>

      <div
        id={`${idPrefix}-intro`}
        className="grid grid-cols-[1fr_auto_1fr] gap-10 max-[992px]:grid-cols-1 max-[992px]:gap-12"
      >
        <div className="flex flex-col gap-16">
          {[
            vision && (
              <InfoBlocksSection
                key="vision"
                idPrefix={`${idPrefix}-vision`}
                eyebrow={vision.eyebrow}
                heading={vision.heading}
                intro={vision.intro}
                blocks={vision.blocks}
              />
            ),

            whyAnagram && (
              <InfoBlocksSection
                key="why-anagram"
                idPrefix={`${idPrefix}-why-anagram`}
                eyebrow={whyAnagram.eyebrow}
                heading={whyAnagram.heading}
                intro={whyAnagram.intro}
                blocks={whyAnagram.blocks}
              />
            ),

            results && (
              <section
                key="results"
                id={`${idPrefix}-results`}
                className="flex flex-col gap-4"
              >
                <SectionHeader
                  eyebrow={results.eyebrow}
                  heading={results.heading}
                />
                {results.intro && (
                  <p className="text-[#7e7e7e] text-sm leading-[1.4] max-w-xl pl-8 max-[766px]:pl-0">
                    {results.intro}
                  </p>
                )}
                <div className="flex flex-col gap-6 pl-8 max-[766px]:pl-0">
                  {results.stats.length > 0 && (
                    <StatsRow
                      idPrefix={`${idPrefix}-results-stats`}
                      stats={results.stats}
                    />
                  )}
                  <div className="flex flex-col gap-10">
                    {results.cases.map((item) => (
                      <CaseHighlightCard
                        key={item.id}
                        idPrefix={`${idPrefix}-results-case-${item.id}`}
                        image={item.image}
                        title={item.title}
                        industry={item.industry}
                        description={item.description}
                        metrics={item.metrics}
                      />
                    ))}
                  </div>
                  {results.note && (
                    <div
                      id={`${idPrefix}-results-note`}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#0c0c0c] text-xl leading-[1.1] tracking-[-0.01em]">
                          {results.note.title}
                        </h3>
                        <p className="text-[#7e7e7e] text-sm leading-[1.4]">
                          {results.note.description}
                        </p>
                      </div>
                      {results.note.columns && (
                        <div
                          className="grid gap-4 max-[766px]:grid-cols-2"
                          style={{
                            gridTemplateColumns: `repeat(${results.note.columns.length}, 1fr)`,
                          }}
                        >
                          {results.note.columns.map((column, i) => (
                            <div key={i} className="flex flex-col gap-3">
                              {column.map((name, j) => (
                                <span
                                  key={`${name}-${j}`}
                                  className="text-[#7e7e7e] text-sm leading-[1.3]"
                                >
                                  {name}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            ),

            clients && (
              <ClientsWall
                key="clients"
                idPrefix={`${idPrefix}-clients`}
                eyebrow={clients.eyebrow}
                heading={clients.heading}
                columns={clients.columns}
              />
            ),

            sectors && (
              <SectorsGrid
                key="sectors"
                idPrefix={`${idPrefix}-sectors`}
                eyebrow={sectors.eyebrow}
                heading={sectors.heading}
                items={sectors.items}
              />
            ),

            process && (
              <InfoBlocksSection
                key="process"
                idPrefix={`${idPrefix}-process`}
                eyebrow={process.eyebrow}
                heading={process.heading}
                intro={process.intro}
                blocks={process.blocks}
              />
            ),
          ]
            .filter(Boolean)
            .map((section, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="h-[0.5px] w-full bg-[#0c0c0c26]" />}
                {section}
              </Fragment>
            ))}
        </div>

        <div className="w-[0.5px] self-stretch bg-[#0c0c0c26] max-[992px]:hidden" />

        <ServicesPanel
          idPrefix={`${idPrefix}-services`}
          eyebrow={services.eyebrow}
          heading={services.heading}
          subtitle={services.subtitle}
          items={services.items}
        />
      </div>

      <section
        id={`${idPrefix}-faq-cta`}
        className="grid grid-cols-2 gap-16 max-[992px]:grid-cols-1 max-[992px]:gap-12"
      >
        <div className="flex flex-col justify-between gap-16">
          <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.02em]">
            {faqCta.faqTitle}
          </h2>
          <div className="flex flex-col gap-4">
            <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.02em]">
              {faqCta.ctaHeading}
            </h2>
            <p className="text-[#7e7e7e] text-sm leading-[1.4] max-w-md">
              {faqCta.ctaDescription}
            </p>
            {faqCta.ctaButtons ? (
              <div className="flex flex-wrap gap-3">
                {faqCta.ctaButtons.map((button, i) => (
                  <a
                    key={button.label}
                    href={button.href}
                    className={
                      i === 0
                        ? "w-fit rounded-full bg-[#0c0c0c] text-white text-sm px-5 py-3"
                        : "w-fit rounded-full bg-[#f5f5f5] text-[#0c0c0c] text-sm px-5 py-3"
                    }
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            ) : (
              faqCta.ctaEmail && (
                <a
                  href={`mailto:${faqCta.ctaEmail}`}
                  className="w-fit rounded-full bg-[#f5f5f5] text-[#0c0c0c] text-sm px-5 py-3"
                >
                  {faqCta.ctaEmail}
                </a>
              )
            )}
          </div>
        </div>

        <Faq idPrefix={`${idPrefix}-faq`} items={faqCta.faqItems} />
      </section>

      <Footer />
    </main>
  );
}
