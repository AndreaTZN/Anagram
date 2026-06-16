import type { Metadata } from "next";
import Image from "next/image";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import Frame02 from "@/components/cases-frame/Frame02";
import TeamCredits from "@/components/cases-frame/TeamCredits";

export const metadata: Metadata = {
  title: "Amo Social App — Brand Assets & 3D Design by Anagram Club",
  description:
    "Anagram Club produced core 3D visual assets and animations for Amo, the social platform bringing real friendship back to the center of the digital experience.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Amo",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
  liveUrl: "https://amo.co/",
  release: {
    sections: [
      {
        id: "objectives",
        label: "Objectives",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
      {
        id: "strategy",
        label: "Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare.",
      },
    ],
  },
};

export default function AmoCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Amo/1.avif" alt="Amo 1" priority />
              <Vimeo169
                src="/works/Amo/2.avif"
                alt="poster 2"
                dataSrc="1172495593"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Amo/3.avif" alt="Amo 3" />
              <Frame02
                img1={{ src: "/works/Amo/4.avif", alt: "Amo 4" }}
                img2={{ src: "/works/Amo/5.avif", alt: "Amo 5" }}
              />
              <Frame01 src="/works/Amo/6.avif" alt="Amo 6" />
              <Frame02
                img1={{ src: "/works/Amo/7.avif", alt: "Amo 7" }}
                img2={{ src: "/works/Amo/8.avif", alt: "Amo 8" }}
              />
              <Frame01 src="/works/Amo/9.avif" alt="Amo 9" />
              <Vimeo169
                src="/works/Amo/10.avif"
                alt="poster 10"
                dataSrc="1172495642"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Amo/11.avif" alt="Amo 11" />
              <Frame02
                img1={{ src: "/works/Amo/12.avif", alt: "Amo 12" }}
                img2={{ src: "/works/Amo/13.avif", alt: "Amo 13" }}
              />
              <Frame01 src="/works/Amo/14.avif" alt="Amo 14" />
              <Image
                src="/works/Amo/15.avif"
                alt="Amo 15"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
              <Vimeo169
                src="/works/Amo/16.avif"
                alt="poster 16"
                dataSrc="1172495620"
                dataRatio="1920/1080"
              />
              <TeamCredits
                rows={[
                  { role: "Global direction", names: "Valentin Salmon" },
                  { role: "Project management", names: "Valentin Salmon" },
                  {
                    role: "Strategy",
                    names:
                      "Valentin Fougères, Nicolas Fallourd Paoletti, Julien Martin",
                  },
                  {
                    role: "Creative direction",
                    names:
                      "Valentin Fougères, Nicolas Fallourd Paoletti, Julien Martin",
                  },
                  {
                    role: "3D Design",
                    names: "Julien Brisson, André Nicolas, Clément Perron",
                  },
                  {
                    role: "Motion Design",
                    names: "André Nicolas, Clément Perron",
                  },
                  {
                    role: "Interactive Design",
                    names: "André Nicolas, Clément Perron",
                  },
                  { role: "UX/UI", names: "Valentin Fougères" },
                ]}
                projectDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius tristique suscipit. Sed ornare ex sed nulla bibendum lobortis. Maecenas auctor facilisis ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat."
              />
            </div>
          }
        />
        <NextCase
          projectName="Henoo"
          href="/works/henoo"
          media={{
            type: "vimeo",
            dataSrc: "1172136135",
            dataRatio: "1920/1080",
            posterSrc: "/works/Henoo/2.avif",
            posterAlt: "Henoo",
          }}
        />
      </div>
    </main>
  );
}
