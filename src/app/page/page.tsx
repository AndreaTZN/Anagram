import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import IndexHubGrid from "@/components/index-hub/IndexHubGrid";
import Footer from "@/components/Footer";
import {
  clientColumns,
  offeringsCategories,
  studioDescription,
} from "@/lib/studio-content";

export const metadata: Metadata = {
  title: "Branding Agency Services Index | Anagram Studio",
  description:
    "Every branding service Anagram offers in one place: brand identity, positioning, strategy, design, rebranding, and branding for startups and fintech.",
  alternates: { canonical: "/page" },
  openGraph: {
    title: "Branding Agency Services Index | Anagram Studio",
    description:
      "Every branding service Anagram offers in one place: brand identity, positioning, strategy, design, rebranding, and branding for startups and fintech.",
    url: "/page",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: true },
};

// Pairs of `offeringsCategories` indexes per row, matching the About page grid.
const SERVICE_ROWS = [[0, 1], [2, 3], [4]];

function Divider() {
  return <div className="h-[0.5px] w-full bg-[#0c0c0c]/15" />;
}

function HubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="flex items-start justify-between gap-4 text-[#0c0c0c] max-[766px]:flex-col max-[766px]:gap-6"
    >
      <h2 className="w-50 shrink-0 text-lg leading-[1.1] tracking-[-0.005625rem] max-[766px]:w-auto max-[766px]:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function IndexHubPage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-4 pb-4 max-[992px]:mt-12">
      <h1 className="sr-only">Branding agency services by Anagram</h1>

      <Vimeo169
        src="/home/poster-hero.webp"
        alt="Anagram Club — Hero"
        dataSrc="1213947103"
        dataRatio="16/9"
        priority
      />

      <div className="flex flex-col gap-16 pt-8 pb-14">
        <HubSection title="Index">
          <IndexHubGrid />
        </HubSection>

        <Divider />

        <HubSection title="Services">
          <div className="flex w-150 min-w-0 flex-col gap-8 text-sm font-medium max-[766px]:w-full">
            {SERVICE_ROWS.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                {rowIndex > 0 && <Divider />}
                <div className="flex gap-4 pr-4 max-[766px]:flex-col max-[766px]:gap-8 max-[766px]:pr-0">
                  {row.map((index) => {
                    const { category, items } = offeringsCategories[index];
                    return (
                      <div
                        key={category}
                        className="flex min-w-0 flex-1 flex-col gap-2"
                      >
                        <span className="leading-[0.9] text-[#8b8b8b]">
                          {category}
                        </span>
                        <div className="flex flex-col leading-[1.3]">
                          {items.map((item) => {
                            const lines = Array.isArray(item) ? item : [item];
                            return (
                              <span key={lines.join("-")}>
                                {lines.map((line, i) => (
                                  <Fragment key={line}>
                                    {i > 0 && <br />}
                                    {line}
                                  </Fragment>
                                ))}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </div>
        </HubSection>

        <Divider />

        <HubSection title="Our studio">
          <div className="flex w-150 min-w-0 items-start gap-4 text-sm font-medium max-[766px]:w-full max-[766px]:flex-col max-[766px]:gap-6">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col">
                <span className="leading-[0.9] text-[#8b8b8b]">
                  New Business
                </span>
                <a href="mailto:hello@anagram.club" className="leading-[1.3]">
                  hello@anagram.club
                </a>
              </div>
              <div className="flex flex-col">
                <span className="leading-[0.9] text-[#8b8b8b]">Careers</span>
                <a
                  href="mailto:careers@anagram.club"
                  className="leading-[1.3]"
                >
                  careers@anagram.club
                </a>
              </div>
            </div>
            <p className="flex-1 leading-[1.3] text-[#8b8b8b]">
              {studioDescription}
            </p>
          </div>
        </HubSection>

        <Divider />

        <HubSection title="We worked for">
          <div className="flex w-150 min-w-0 items-start gap-4 text-sm font-medium leading-[1.3] text-[#8b8b8b] max-[766px]:w-full max-[766px]:flex-col max-[766px]:gap-0">
            {[clientColumns.slice(0, 2), clientColumns.slice(2)].map(
              (group, groupIndex) => (
                <div key={groupIndex} className="flex w-full flex-1">
                  {group.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-1 flex-col">
                      {column.map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        </HubSection>
      </div>

      <Footer />
    </main>
  );
}
