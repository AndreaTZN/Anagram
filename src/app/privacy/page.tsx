import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CookieSettingsLink from "./CookieSettingsLink";

export const metadata: Metadata = {
  title: "Privacy Policy | anagram",
  description:
    "How anagram collects, uses and protects personal data across anagram.club, including cookies, third-party services and your rights under the GDPR.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | anagram",
    description:
      "How anagram collects, uses and protects personal data across anagram.club, including cookies, third-party services and your rights under the GDPR.",
    url: "/privacy",
    images: ["/opengraph.webp"],
  },
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "6 August 2026";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const cookieCategories = [
  {
    name: "Strictly necessary",
    purpose:
      "Keep the site working and store your consent choices. These cannot be disabled.",
    services: "Consent preferences (stored locally on your device)",
    retention: "6 months",
  },
  {
    name: "Analytics",
    purpose:
      "Understand how the site is used — pages viewed, time spent, navigation paths — so we can improve it.",
    services: "Google Analytics 4, Mixpanel, Microsoft Clarity",
    retention: "Up to 14 months",
  },
  {
    name: "Marketing",
    purpose:
      "Measure the performance of our campaigns and show relevant content on third-party platforms.",
    services: "Meta Pixel",
    retention: "Up to 13 months",
  },
];

const rights = [
  {
    name: "Access",
    text: "Obtain a copy of the personal data we hold about you.",
  },
  {
    name: "Rectification",
    text: "Ask us to correct data that is inaccurate or incomplete.",
  },
  {
    name: "Erasure",
    text: "Ask us to delete your data when we no longer have grounds to keep it.",
  },
  {
    name: "Restriction",
    text: "Ask us to limit how we process your data while a request is reviewed.",
  },
  {
    name: "Portability",
    text: "Receive the data you provided in a structured, machine-readable format.",
  },
  {
    name: "Objection",
    text: "Object to processing based on our legitimate interest, including profiling.",
  },
  {
    name: "Withdraw consent",
    text: "Withdraw your consent at any time, without affecting processing already carried out.",
  },
];

const sections: Section[] = [
  {
    id: "privacy-section-controller",
    title: "1. Who we are",
    body: (
      <>
        <p>
          Anagram (&ldquo;anagram&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is
          a brand design studio operating from Paris and New York. We are the
          data controller for the personal data processed through
          anagram.club.
        </p>
        <p>
          For any question about this policy or about how we handle your data,
          write to{" "}
          <a href="mailto:hello@anagram.club" className="underline">
            hello@anagram.club
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-data",
    title: "2. What we collect",
    body: (
      <>
        <p>
          <span className="text-[#0c0c0c]">Data you give us.</span> When you
          contact us by email, respond to a job posting or discuss a project, we
          receive your name, email address, company, and whatever else you
          choose to include in your message or attachments.
        </p>
        <p>
          <span className="text-[#0c0c0c]">Data collected automatically.</span>{" "}
          When you browse the site, and only where you have consented to it, we
          collect technical and usage data: pages viewed, referring page,
          approximate location derived from your IP address, device type,
          browser, operating system, screen size and session duration.
        </p>
        <p>
          <span className="text-[#0c0c0c]">What we never collect.</span> We do
          not ask for special categories of data (health, political opinions,
          religious beliefs, biometrics), and we do not process payment data on
          this website.
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-purposes",
    title: "3. Why we process it, and on what legal basis",
    body: (
      <>
        <p>
          <span className="text-[#0c0c0c]">Responding to enquiries</span> —
          answering your message and, where relevant, preparing a proposal.
          Legal basis: steps taken at your request prior to entering a contract,
          or our legitimate interest in replying to you.
        </p>
        <p>
          <span className="text-[#0c0c0c]">Recruitment</span> — reviewing
          applications for open roles. Legal basis: steps taken at your request
          prior to entering a contract.
        </p>
        <p>
          <span className="text-[#0c0c0c]">Audience measurement</span> —
          understanding how the site is used so we can improve it. Legal basis:
          your consent.
        </p>
        <p>
          <span className="text-[#0c0c0c]">Marketing measurement</span> —
          measuring the performance of our campaigns. Legal basis: your consent.
        </p>
        <p>
          <span className="text-[#0c0c0c]">Security and reliability</span> —
          keeping the site available and protecting it from abuse. Legal basis:
          our legitimate interest.
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-cookies",
    title: "4. Cookies and similar technologies",
    body: (
      <>
        <p>
          Cookies and similar storage are only set after you have made a choice
          in our consent banner, except for those that are strictly necessary.
          Until you consent, analytics and marketing tags are blocked and
          Google&rsquo;s Consent Mode signals are set to denied.
        </p>
        <p>
          You can change or withdraw your choice at any time through{" "}
          <CookieSettingsLink />, or by clearing the site data in your browser.
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-sharing",
    title: "5. Who we share data with",
    body: (
      <>
        <p>
          We do not sell personal data. We share it only with service providers
          who process it on our behalf, under contract and on our instructions:
          our hosting provider (Vercel), our email provider, our tag manager
          (Google Tag Manager) and the analytics and marketing tools listed
          above.
        </p>
        <p>
          We may also disclose data where we are legally required to do so, or
          where it is necessary to establish, exercise or defend legal claims.
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-transfers",
    title: "6. International transfers",
    body: (
      <p>
        Some of our providers are established in the United States. Where
        personal data leaves the European Economic Area, the transfer is framed
        by the European Commission&rsquo;s Standard Contractual Clauses, or by
        an adequacy decision such as the EU–US Data Privacy Framework, together
        with the additional safeguards those mechanisms require.
      </p>
    ),
  },
  {
    id: "privacy-section-retention",
    title: "7. How long we keep it",
    body: (
      <>
        <p>
          Enquiries and project correspondence: 3 years from the last contact.
          Applications for open roles: 2 years from the last contact, unless you
          ask us to delete them sooner. Consent records: 6 months. Analytics and
          marketing data: as set out in the table above.
        </p>
        <p>
          Data relating to a signed engagement is kept for the duration of the
          contract and for the statutory periods that follow it.
        </p>
      </>
    ),
  },
  {
    id: "privacy-section-security",
    title: "8. Security",
    body: (
      <p>
        The site is served over HTTPS. Access to the data we hold is limited to
        the people in the studio who need it, and our providers are selected for
        the guarantees they offer. No system is perfectly secure, but we take
        appropriate technical and organisational measures to protect your data
        against loss, misuse and unauthorised access.
      </p>
    ),
  },
  {
    id: "privacy-section-children",
    title: "9. Children",
    body: (
      <p>
        This site is not directed at children under 16, and we do not knowingly
        collect their personal data. If you believe a child has provided us with
        data, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "privacy-section-changes",
    title: "10. Changes to this policy",
    body: (
      <p>
        We may update this policy to reflect changes to the site, to the tools
        we use, or to the law. The date at the top of this page always reflects
        the version in force. Material changes will be signalled on the site
        before they take effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main
      id="privacy-page"
      className="flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4 max-[992px]:mt-12"
    >
      <section
        id="privacy-hero"
        className="flex flex-col gap-4 pt-32 pb-16 md:pt-52 md:pb-24"
      >
        <p className="text-[#7c7c7c] text-[0.8125rem] leading-[1.1]">
          Last updated — {LAST_UPDATED}
        </p>
        <h1 className="text-[#0c0c0c] leading-[0.9] tracking-[-0.04em] text-[2.5rem] md:text-[4rem] max-w-[40rem]">
          Privacy Policy
        </h1>
        <p className="text-[#7e7e7e] text-[1.25rem] leading-[1.4] tracking-[-0.1px] max-w-[38.3rem]">
          This policy explains what personal data anagram collects when you use
          anagram.club, why we collect it, who we share it with, and the
          control you have over it.
        </p>
      </section>

      <section
        id="privacy-content"
        className="flex flex-col gap-16 pb-24 max-w-[48rem]"
      >
        {sections.map((section) => (
          <article key={section.id} id={section.id} className="flex flex-col gap-4">
            <h2 className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
              {section.title}
            </h2>
            <div className="flex flex-col gap-4 text-[#7e7e7e] text-sm leading-[1.6]">
              {section.body}
            </div>
          </article>
        ))}

        <article
          id="privacy-section-cookie-table"
          className="flex flex-col gap-4"
        >
          <h2 className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
            Cookie categories in detail
          </h2>
          {/* Cards rather than a <table>: the layout has to hold at 320px wide,
              where a four-column table would force horizontal scrolling. */}
          <div className="flex flex-col gap-2">
            {cookieCategories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col gap-3 border border-[#0c0c0c]/10 rounded-2xl p-5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[#0c0c0c] text-sm leading-[1.1]">
                    {category.name}
                  </p>
                  <p className="text-[#7c7c7c] text-[0.8125rem] leading-[1.1] shrink-0">
                    {category.retention}
                  </p>
                </div>
                <p className="text-[#7e7e7e] text-sm leading-[1.6]">
                  {category.purpose}
                </p>
                <p className="text-[#7c7c7c] text-[0.8125rem] leading-[1.4]">
                  {category.services}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article id="privacy-section-rights" className="flex flex-col gap-4">
          <h2 className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
            11. Your rights
          </h2>
          <p className="text-[#7e7e7e] text-sm leading-[1.6]">
            Under the GDPR and the French Data Protection Act, you have the
            following rights over your personal data:
          </p>
          <ul className="flex flex-col gap-2">
            {rights.map((right) => (
              <li
                key={right.name}
                className="text-[#7e7e7e] text-sm leading-[1.6]"
              >
                <span className="text-[#0c0c0c]">{right.name}</span> —{" "}
                {right.text}
              </li>
            ))}
          </ul>
          <p className="text-[#7e7e7e] text-sm leading-[1.6]">
            To exercise any of them, email{" "}
            <a href="mailto:hello@anagram.club" className="underline">
              hello@anagram.club
            </a>
            . We reply within one month. If you are not satisfied with our
            response, you can lodge a complaint with the CNIL (
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              cnil.fr
            </a>
            ) or with the supervisory authority of the country where you live.
          </p>
        </article>

        <article id="privacy-section-contact" className="flex flex-col gap-4">
          <h2 className="text-[#0c0c0c] text-[1.25rem] leading-[1.1] tracking-[-0.1px]">
            12. Contact
          </h2>
          <div className="flex flex-col gap-4 text-[#7e7e7e] text-sm leading-[1.6]">
            <p>
              Anagram — Paris / New York
              <br />
              <a href="mailto:hello@anagram.club" className="underline">
                hello@anagram.club
              </a>
            </p>
            <p>
              You can also review our{" "}
              <Link href="/about" className="underline">
                studio page
              </Link>{" "}
              to know more about who we are.
            </p>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
