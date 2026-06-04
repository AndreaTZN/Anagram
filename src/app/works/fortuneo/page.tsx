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

const navData: CaseNavData = {
  title: "Fortuneo",
  description:
    "Strategy, Copywriting, Brand Identity, Design System, Product Design, Motion, Illustration, Website, Photography, Video, Development",
  liveUrl: "https://fortuneo.fr",
  release: {
    sections: [
      {
        id: "context",
        label: "Context",
        description:
          "Fortuneo, a profitable French online bank, aimed to boost growth by attracting younger users with the Fosfo card and increasing upgrades to the Black card, but its outdated brand no longer matched its premium ambitions.",
      },
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Fortuneo set out to become more desirable while staying true to its core strength: being France's most affordable online bank. To support growth, it refreshed its brand to attract younger users with Fosfo and drive premium adoption with the Black Card.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          'Fortuneo made the "0" — symbol of free banking — its core brand asset, turning it into a dynamic graphic element that adds motion and desirability.',
      },
      {
        id: "application",
        label: "Application",
        description:
          "Fortuneo stood out by turning its numbers into both emotional storytelling and clear proof points, combining accessible messaging with premium visuals.",
      },
      {
        id: "results",
        label: "Results",
        description:
          "Our collaboration with Fortuneo led to a 45% increase in subscription funnel entry, a 27% rise in prospects starting a project, and a 63% growth in documents submitted.",
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
      {
        id: "Team",
        label: "Team",
        description: "Discover the team behind this project.",
      },
    ],
  },
};

export default function FortuneoCasePage() {
  return (
    <>
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-10">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-6">
              <Frame01
                src="/works/Fortuneo/release/1.webp"
                alt="Fortuneo release 1"
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
                  { role: "Fonts", names: "Söhne" },
                ]}
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
            </div>
          }
          backstage={
            <div className="flex flex-col gap-6">
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
                    role: "Client",
                    names:
                      "Priscillia Vebret, Léa Carpentier, Madison Loco, Marie-Emmanuelle Hamon, Guillain Chauffert-Yvart, Grégory Guermonprez",
                  },
                ]}
              />
            </div>
          }
        />
      </div>
    </>
  );
}
