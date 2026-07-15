import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import ThreePhones from "@/components/cases-frame/ThreePhones";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import CaseStats from "@/components/cases-frame/CaseStats";
import NextCase from "@/components/cases-frame/NextCase";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Fortuneo Rebranding | Online Bank Visual Identity | anagram",
  description:
    "anagram rebranded Fortuneo: +45% funnel entry, +63% documents submitted. Online bank rebranding, brand strategy and product design.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Fortuneo",
  description:
    "Fortuneo is a profitable French online bank looking to attract younger users and grow upgrades to its premium Black Card, without losing its core promise as the most affordable online bank in France. We partnered with Fortuneo to build a brand strategy and identity capable of expressing that ambition: turning the “0” of free banking into a dynamic, premium, and human brand asset.",
  liveUrl: "https://fortuneo.fr",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Transform Fortuneo into a more desirable brand while preserving what makes it unique: being France's most affordable online bank.\n\nTo fuel its next growth phase, the brand refreshed its image to attract younger users with the Fosfo card and increase premium adoption with the Black Card. The challenge was to balance a premium and expert positioning while remaining price led.\n\nThe ambition was a clear promise that feels premium yet accessible, competitive yet human, and always free.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The “0”, symbol of free banking, became Fortuneo's central brand asset. We transformed it into a dynamic graphic element that brings motion, playfulness and desirability to the brand. \n\nBecause banking is about numbers such as how much you earn, how much you spend and where your money goes, we built the proposition around a simple truth. Numbers matter, turning “free” into something premium and emotional.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "Process",
        label: "Process",
        description:
          "We elevated Fortuneo's brand assets through a strategy built for both consistency and evolution. At its core, the “0”, symbol of free banking became a living graphic element, bringing energy, fluidity, and desirability to the brand.",
      },
      {
        id: "Credit card",
        label: "Credit card",
        description:
          "In designing the credit cards, we centered the logo to anchor the brand visually. \n\nWe then elevated the physical experience through advanced print finishes: Pantone inks, tactile inks, varnish, and other premium treatments ensuring a highly qualitative and distinctive outcome.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "For the photo direction, we stayed true to the lifestyle positioning defined in the original strategy, curating imagery that feels authentic yet elevated balancing everyday moments with a premium sensibility tailored to Fortuneo's audience.",
      },
    ],
  },
};

const projectDescription = (
  <>
    <p>
      Fortuneo, a profitable French online bank, needed to attract younger users
      with the Fosfo card and increase upgrades to the Black Card. Its outdated
      brand no longer matched those premium ambitions.
    </p>
    <p className="mt-4">
      The goal was to make Fortuneo more desirable while staying true to its
      core strength: being France&apos;s most affordable online bank. anagram
      turned the &ldquo;0&rdquo;, the symbol of free banking, into a dynamic
      brand asset. A graphic element that generates motion, desirability, and
      emotional storytelling. The identity elevated &ldquo;free&rdquo; into
      something both premium and human.
    </p>
    <p className="mt-4">
      The full creative scope covered brand strategy, identity, design system,
      product design, motion, illustration, website, photography, video, and
      development.
    </p>
    <p className="mt-4">
      Results: +45% increase in subscription funnel entry, +27% rise in
      prospects starting a project, +63% growth in documents submitted, and a
      77% increase in awareness, consideration, and account openings.
    </p>
  </>
);

const faqItems = [
  {
    question: 'What does the "0" represent in the Fortuneo brand identity?',
    answer:
      "The zero, symbol of free banking, was transformed into a dynamic graphic element that generates movement and desirability, turning a functional proof point into an emotional brand asset.",
  },
  {
    question: "What results did the Fortuneo rebrand generate?",
    answer:
      "+45% funnel entry, +27% prospects starting a project, +63% documents submitted, and +77% on awareness, consideration, and account openings.",
  },
  {
    question: "What did anagram deliver for Fortuneo?",
    answer:
      "A complete creative and technical mission: brand strategy, identity, design system, product design, motion, illustration, website, photography, video, and development.",
  },
  {
    question:
      "How do you rebrand a bank to feel premium without losing its value positioning?",
    answer:
      'By reframing what "affordable" means. For Fortuneo, zero fees became a symbol of freedom, not just a discount.',
  },
];

export default function FortuneoCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Fortuneo/release/1.webp"
                alt="Fortuneo release 1"
                priority
              />
              <Vimeo169
                src="/works/Fortuneo/release/2.webp"
                alt="poster image noir"
                dataSrc="1164024409"
                dataRatio="1920/1080"
              />
              <Frame01
                src="/works/Fortuneo/release/3.avif"
                alt="Fortuneo release 2"
              />
              <Frame01
                src="/works/Fortuneo/release/4.webp"
                alt="Fortuneo release 4"
              />
              <Frame01
                src="/works/Fortuneo/release/5.webp"
                alt="Fortuneo release 5"
              />
              <VimeoTwoCards
                card1={{
                  src: "/works/Fortuneo/release/6.webp",
                  alt: "Fortuneo release 6",
                  dataSrc: "1172552727",
                  dataRatio: "1920/2160",
                }}
                card2={{
                  src: "/works/Fortuneo/release/7.webp",
                  alt: "Fortuneo release 7",
                  dataSrc: "1172552765",
                  dataRatio: "1920/2160",
                }}
              />
              <Frame01
                src="/works/Fortuneo/release/8.webp"
                alt="Fortuneo release 8"
              />
              <ThreePhones
                phone1={{
                  src: "/works/Fortuneo/release/9.webp",
                  alt: "Fortuneo release 9",
                }}
                phone2={{
                  src: "/works/Fortuneo/release/10.webp",
                  alt: "Fortuneo release 10",
                }}
                phone3={{
                  src: "/works/Fortuneo/release/11.webp",
                  alt: "Fortuneo release 11",
                }}
              />
              <Frame01
                src="/works/Fortuneo/release/12.webp"
                alt="Fortuneo release 12"
              />
              <Vimeo169
                src="/works/Fortuneo/release/13.webp"
                alt="poster image 3 mobiles"
                dataSrc="1164024513"
                dataRatio="1920/1080"
              />
              <Frame02
                img1={{ src: "/works/Fortuneo/release/14.avif", alt: "..." }}
                img2={{ src: "/works/Fortuneo/release/15.avif", alt: "..." }}
              />
              <Vimeo169
                src="/works/Fortuneo/release/16.webp"
                alt="poster image 16"
                dataSrc="1164024559"
                dataRatio="1920/1080"
              />
              <Frame01
                src="/works/Fortuneo/release/17.webp"
                alt="Fortuneo release 17"
              />
              <Frame01
                src="/works/Fortuneo/release/18.webp"
                alt="Fortuneo release 18"
              />
              <Frame01
                src="/works/Fortuneo/release/19.avif"
                alt="Fortuneo release 19"
              />
              <Frame02
                img1={{
                  src: "/works/Fortuneo/release/20.avif",
                  alt: "Fortuneo release 20",
                }}
                img2={{
                  src: "/works/Fortuneo/release/21.avif",
                  alt: "Fortuneo release 21",
                }}
              />
              <CaseStats
                logo1={{
                  src: "/works/Fortuneo/release/fotuneo-logo.png",
                  alt: "Fortuneo",
                }}
                logo2={{
                  src: "/works/Fortuneo/release/anagram-logo.png",
                  alt: "Anagram",
                }}
                stats={[
                  {
                    value: "+45%",
                    label: "entry into the subscription funnel",
                  },
                  { value: "+27%", label: "prospect who starts a project" },
                  { value: "+63%", label: "documents sent on the course" },
                ]}
              />
              <TeamCredits
                rows={[
                  {
                    role: "Global direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  { role: "Project management", names: "Emmanuel Julliot" },
                  {
                    role: "Strategy",
                    names: "Emmanuel Julliot, Priscillia Vebret, Romance",
                  },
                  {
                    role: "Creative direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  {
                    role: "3D Design",
                    names: "Rémy Godet, Emmanuel Julliot, Julien Brisson",
                  },
                  { role: "Motion Design", names: "Rémy Godet, Kévin Robin" },
                  { role: "Interactive Design", names: "Valentin Salmon" },
                  {
                    role: "UX/UI",
                    names:
                      "Gael Sauzeau, Emmanuel Julliot, David Amsellem, Francois-Xavier Manceau, Vincenzo Tilleul",
                  },
                  {
                    role: "Credit card",
                    names: "Emmanuel Julliot, Anthony Velen",
                  },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Video", names: "Gurvann Touzé" },
                  {
                    role: "Copywriting",
                    names: "Marie Emmanuelle-Hamom, Julie Barthélemy",
                  },
                  { role: "Sound Design", names: "Tanguy Drobniewski" },
                  { role: "Integration", names: "Fortuneo" },
                  {
                    role: "Clients",
                    names:
                      "Priscillia Vebret, Léa Carpentier, Madison Loco, Marie-Emmanuelle Hamon, Guillain Chauffert-Yvart, Grégory Guermonprez",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq items={faqItems} />}
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Fortuneo/backstage/1.webp"
                alt="Fortuneo backstage 1"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/24.avif"
                alt="poster image 24"
                dataSrc="1174728775"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Fortuneo/backstage/25.webp"
                alt="Fortuneo backstage 25"
              />
              <Frame01
                src="/works/Fortuneo/backstage/26.webp"
                alt="Fortuneo backstage 26"
              />
              <Frame02
                img1={{
                  src: "/works/Fortuneo/backstage/27.webp",
                  alt: "Fortuneo backstage 27",
                }}
                img2={{
                  src: "/works/Fortuneo/backstage/28.webp",
                  alt: "Fortuneo backstage 28",
                }}
              />
              <Frame01
                src="/works/Fortuneo/backstage/29.webp"
                alt="Fortuneo backstage 29"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/30.avif"
                alt="poster image 30"
                dataSrc="1174728814"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Fortuneo/backstage/31.webp"
                alt="Fortuneo backstage 31"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/32.webp"
                alt="poster image 32"
                dataSrc="1178745726"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/33.avif"
                alt="poster image 33"
                dataSrc="1174728836"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/34.webp"
                alt="poster image 34"
                dataSrc="1164024760"
                dataRatio="3456/1944"
              />
              <Frame02
                img1={{
                  src: "/works/Fortuneo/backstage/35.webp",
                  alt: "Fortuneo backstage 35",
                }}
                img2={{
                  src: "/works/Fortuneo/backstage/36.webp",
                  alt: "Fortuneo backstage 36",
                }}
              />
              <Frame01
                src="/works/Fortuneo/backstage/37.webp"
                alt="Fortuneo backstage 37"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/38.webp"
                alt="poster image 38"
                dataSrc="1164024782"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Fortuneo/backstage/39.webp"
                alt="Fortuneo backstage 39"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/40.webp"
                alt="poster image 40"
                dataSrc="1164024804"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/41.webp"
                alt="poster image 41"
                dataSrc="1164024826"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Fortuneo/backstage/42.webp"
                alt="poster image 42"
                dataSrc="1164024851"
                dataRatio="3456/1944"
              />
              <TeamCredits
                rows={[
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Photography assistant", names: "Gurvann Touzé" },
                  { role: "Video", names: "Gurvann Touzé" },
                  { role: "Stylist", names: "Pierre Turbe" },
                  { role: "Lighting", names: "Gurvann Touzé" },
                  { role: "Makeup artist", names: "Allison le Fur" },
                  { role: "Hairdresser", names: "Fanny Offelman" },
                  {
                    role: "Models",
                    names:
                      "Abdel K, Charlotte P, Thibault B, Agnes T, Elodie L, Cedric O, Ida M, Sylvain Sencier, Maëlla Hauray, Jade Lukebadio, Kevin Houdu, Jeanne Bonjour, Sylvie Jourdan, Jean-Louis Tellier",
                  },
                  {
                    role: "Clients",
                    names:
                      "Priscillia Vebret, Léa Carpentier, Madison Loco, Marie-Emmanuelle Hamon, Guillain Chauffert-Yvart, Grégory Guermonprez",
                  },
                ]}
                projectDescription={projectDescription}
                faq={<Faq items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Wastetide"
          href="/works/wastetide"
          media={{
            type: "vimeo",
            dataSrc: "1198689576",
            dataRatio: "1920/1080",
            posterSrc: "/works/Wastetide/1.webp",
          }}
        />
      </div>
    </main>
  );
}
