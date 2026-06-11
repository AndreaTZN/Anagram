import type { Metadata } from "next";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import NextCase from "@/components/cases-frame/NextCase";

export const metadata: Metadata = {
  title: "Planity Branding — Brand Identity Case Study by Anagram",
  description:
    "See how Anagram Club rebuilt Planity's brand — from strategy and identity to product design and photography for France's top beauty booking platform.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Planity",
  description:
    "Strategy, Copywriting, Brand Identity, Design System, Product Design, Motion, Illustration, Website, Photography, Video, Development",
  liveUrl: "https://www.planity.com/",
  release: {
    sections: [
      {
        id: "context",
        label: "Context",
        description:
          "As France’s market leader, the brand entered a key growth phase accelerating adoption and preparing for European expansion. Despite an efficient product, complex journeys and a functional brand no longer matched the ambition, emotion, and closeness users expect.",
      },
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Simplify booking to reduce friction and boost conversion, while evolving beyond a purely functional UI. Also build a stronger, emotional brand to drive B2C growth, reinforce B2B, and support European expansion.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "The new identity turns the “P” into a door symbol, representing entry into the salon and transformation. Flexible and scalable, it frames content and ensures consistent visual coherence across all touchpoints and markets.",
      },
      {
        id: "application",
        label: "Application",
        description:
          "The design created a modern, expressive universe that breaks beauty codes and unifies product and brand. Built around the door symbol, it rolled out across B2C then B2B touchpoints, guided by making the experience simpler, more human, and more desirable.",
      },
      {
        id: "results",
        label: "Results",
        description:
          "Over the past three years, we have progressively built and refined Planity’s brand assets through a structured, iterative process, using the brand strategy as a solid foundation to ensure long-term consistency and evolution.",
      },
    ],
  },
  backstage: {
    sections: [
      {
        id: "Process",
        label: "Process",
        description:
          "Over the past three years, we have progressively built and refined Planity’s brand assets through a structured, iterative process, using the “door” strategy as a strong foundation to ensure long-term consistency and coherent evolution.",
      },
      {
        id: "B2B Textures",
        label: "B2B Textures",
        description:
          "We extended the same strategic approach to B2B touchpoints, crafting refined textures and visual systems designed to resonate with a premium audience, strengthen credibility, and support lead generation among decision-makers.",
      },
      {
        id: "Human",
        label: "Human",
        description:
          "For the B2C audience, we adopted a more human and expressive photographic direction, shifting from black-and-white to color to bring warmth and modernity to the brand. Shot in studio and at the Niemeyer Space in Paris, the imagery was designed to fit the website’s UX constraints, especially within the hero section, ensuring clarity, impact, and visual consistency.",
      },
      {
        id: "B2C Textures",
        label: "B2C Textures",
        description:
          "The goal was to stay close to the B2C audience while remaining consistent with the visual direction established for B2B photography and the more human side of the website.",
      },
    ],
  },
};

export default function PlanityPage() {
  return (
    <main className="relative flex-1 pt-6 pr-6 pl-2 pb-6 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Planity/release/1.webp"
                alt="Planity release 1"
                priority
              />
              <Vimeo169
                src="/works/Planity/release/2.webp"
                alt="poster image video 1"
                dataSrc="1160987001"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/3.webp"
                alt="poster image video 2"
                dataSrc="1160987043"
                dataRatio="2220/1380"
              />
              <Frame01
                src="/works/Planity/release/4.webp"
                alt="Planity release 4"
              />
              <Vimeo169
                src="/works/Planity/release/5.webp"
                alt="poster image video 3"
                dataSrc="1160987078"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/6.webp"
                alt="poster image video 4"
                dataSrc="1160987125"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/7.webp"
                alt="poster image video 5"
                dataSrc="1160987173"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/release/8.webp"
                alt="Planity release 8"
              />
              <Vimeo169
                src="/works/Planity/release/9.webp"
                alt="poster image video 6"
                dataSrc="1160987224"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/10.webp"
                alt="poster image video 7"
                dataSrc="1160987271"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/release/11.webp"
                alt="poster image video 8"
                dataSrc="1160987325"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/release/12.webp"
                alt="Planity release 12"
              />
              <Vimeo169
                src="/works/Planity/release/13.webp"
                alt="poster image video 9"
                dataSrc="1160987373"
                dataRatio="2220/1380"
              />
              <Vimeo169
                src="/works/Planity/release/14.webp"
                alt="poster image video 10"
                dataSrc="1160987425"
                dataRatio="3840/2160"
              />
              <Frame02
                img1={{ src: "/works/Planity/release/15.webp", alt: "..." }}
                img2={{ src: "/works/Planity/release/16.webp", alt: "..." }}
              />
              <Frame01
                src="/works/Planity/release/17.webp"
                alt="Planity release 17"
              />
              <Frame02
                img1={{ src: "/works/Planity/release/18.webp", alt: "..." }}
                img2={{ src: "/works/Planity/release/19.webp", alt: "..." }}
              />
              <Frame01
                src="/works/Planity/release/20.webp"
                alt="Planity release 20"
              />
              <Frame01
                src="/works/Planity/release/21.webp"
                alt="Planity release 21"
              />
              <Frame01
                src="/works/Planity/release/22.webp"
                alt="Planity release 22"
              />

              <TeamCredits
                rows={[
                  {
                    role: "Global direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Strategy", names: "Emmanuel Julliot" },
                  {
                    role: "Creative direction",
                    names: "Valentin Salmon, Emmanuel Julliot, Anthony Velen",
                  },
                  {
                    role: "3D Design",
                    names: "Anthony Velen, Emmanuel Julliot",
                  },
                  {
                    role: "Motion Design",
                    names: "Valentin Salmon, Anthony Velen",
                  },
                  { role: "Interactive Design", names: "Valentin Salmon" },
                  { role: "UX/UI", names: "Valentin Salmon, Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Video", names: "Gurvann Touzé" },
                  {
                    role: "Copywriting",
                    names: "Ameerah Musbally, Camille Guilgaut, Pauline Katz",
                  },
                  {
                    role: "Integration",
                    names: "Alexandre Tuysuzian, Andrea Tuysuzian, Planity",
                  },
                  { role: "Fonts", names: "Aeonik" },
                ]}
                projectDescription={
                  <>
                    <p>
                      Planity is France&apos;s leading beauty booking platform,
                      connecting millions of clients with salons and beauty
                      professionals across the country. As the market leader,
                      the brand entered a pivotal growth phase — accelerating
                      adoption and preparing for European expansion.
                    </p>
                    <p className="mt-4">
                      Anagram rebuilt Planity&apos;s identity around the
                      &ldquo;P&rdquo; as a door symbol — a metaphor for entry
                      into the salon and personal transformation. Flexible and
                      scalable, this system unified product and brand across
                      every B2C and B2B touchpoint, from app UI to photography
                      and motion.
                    </p>
                    <p className="mt-4">
                      A three-year collaboration built progressively, with each
                      iteration strengthening the foundation for long-term
                      consistency and coherent evolution across markets.
                    </p>
                  </>
                }
              />
            </div>
          }
          backstage={
            <div className="flex flex-col gap-4">
              <Frame01
                src="/works/Planity/backstage/1.webp"
                alt="Planity backstage 1"
              />
              <Frame01
                src="/works/Planity/backstage/25.webp"
                alt="Planity backstage 25"
              />
              <Frame01
                src="/works/Planity/backstage/26.webp"
                alt="Planity backstage 26"
              />
              <VimeoImageCards
                video={{
                  dataSrc: "1160986982",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/27.webp",
                  alt: "Poster image video backstage",
                }}
                image={{
                  src: "/works/Planity/backstage/28.webp",
                  alt: "Image backstage 28",
                }}
              />
              <Vimeo169
                src="/works/Planity/backstage/29.webp"
                alt="poster image video 29"
                dataSrc="1160987062"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/backstage/30.webp"
                alt="poster image video 30"
                dataSrc="1160987102"
                dataRatio="3456/1944"
              />
              <Frame02
                img1={{ src: "/works/Planity/backstage/31.webp", alt: "..." }}
                img2={{ src: "/works/Planity/backstage/32.webp", alt: "..." }}
              />
              <Vimeo169
                src="/works/Planity/backstage/33.webp"
                alt="poster image video 33"
                dataSrc="1160987149"
                dataRatio="3456/1944"
              />
              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1160987193",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/35.webp",
                  alt: "Poster image video backstage",
                }}
                image={{
                  src: "/works/Planity/backstage/34.webp",
                  alt: "Image backstage 34",
                }}
              />
              <Frame01
                src="/works/Planity/backstage/35.webp"
                alt="Planity backstage 35"
              />
              <Frame01
                src="/works/Planity/backstage/36.webp"
                alt="Planity backstage 36"
              />
              <Vimeo169
                src="/works/Planity/backstage/37.webp"
                alt="poster image video 37"
                dataSrc="1160987349"
                dataRatio="3456/1944"
              />
              <Vimeo169
                src="/works/Planity/backstage/38.webp"
                alt="poster image video 38"
                dataSrc="1160987405"
                dataRatio="3456/1944"
              />
              <Frame01
                src="/works/Planity/backstage/39.webp"
                alt="Planity backstage 39"
              />
              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1160987441",
                  dataRatio: "1684/1944",
                  src: "/works/Planity/backstage/42.webp",
                  alt: "Poster image video backstage 42",
                }}
                image={{
                  src: "/works/Planity/backstage/41.webp",
                  alt: "Image backstage 41",
                }}
              />
              <Frame01
                src="/works/Planity/backstage/43.webp"
                alt="Planity backstage 43"
              />
              <Vimeo169
                src="/works/Planity/backstage/44.webp"
                alt="poster image video 44"
                dataSrc="1160987478"
                dataRatio="3456/1944"
              />

              <TeamCredits
                rows={[
                  {
                    role: "Global direction",
                    names: "Valentin Salmon, Emmanuel Julliot",
                  },
                  { role: "Project management", names: "Emmanuel Julliot" },
                  { role: "Strategy", names: "Emmanuel Julliot" },
                  {
                    role: "Creative direction",
                    names: "Valentin Salmon, Emmanuel Julliot, Anthony Velen",
                  },
                  {
                    role: "3D Design",
                    names: "Anthony Velen, Emmanuel Julliot",
                  },
                  {
                    role: "Motion Design",
                    names: "Valentin Salmon, Anthony Velen",
                  },
                  { role: "Interactive Design", names: "Valentin Salmon" },
                  { role: "UX/UI", names: "Valentin Salmon, Emmanuel Julliot" },
                  { role: "Production", names: "anagram production" },
                  { role: "Photography", names: "Sébastien Marchand" },
                  { role: "Video", names: "Gurvann Touzé" },
                  {
                    role: "Copywriting",
                    names: "Ameerah Musbally, Camille Guilgaut, Pauline Katz",
                  },
                  {
                    role: "Integration",
                    names: "Alexandre Tuysuzian, Andrea Tuysuzian, Planity",
                  },
                  { role: "Fonts", names: "Aeonik" },
                ]}
                projectDescription={
                  <>
                    <p>
                      Planity is France&apos;s leading beauty booking platform,
                      connecting millions of clients with salons and beauty
                      professionals across the country. As the market leader,
                      the brand entered a pivotal growth phase — accelerating
                      adoption and preparing for European expansion.
                    </p>
                    <p className="mt-4">
                      Anagram rebuilt Planity&apos;s identity around the
                      &ldquo;P&rdquo; as a door symbol — a metaphor for entry
                      into the salon and personal transformation. Flexible and
                      scalable, this system unified product and brand across
                      every B2C and B2B touchpoint, from app UI to photography
                      and motion.
                    </p>
                    <p className="mt-4">
                      A three-year collaboration built progressively, with each
                      iteration strengthening the foundation for long-term
                      consistency and coherent evolution across markets.
                    </p>
                  </>
                }
              />
            </div>
          }
        />
        <NextCase
          projectName="Fortuneo"
          href="/works/fortuneo"
          media={{
            type: "vimeo",
            dataSrc: "1164024409",
            dataRatio: "1920/1080",
            posterSrc: "/works/Fortuneo/release/2.webp",
          }}
        />
      </div>
    </main>
  );
}
