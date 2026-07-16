import type { Metadata } from "next";
import { Fragment } from "react";
import CaseNavSetter from "@/components/CaseNavSetter";
import CaseTabContent from "@/components/CaseTabContent";
import Frame01 from "@/components/cases-frame/Frame01";
import type { CaseNavData } from "@/contexts/CaseNavContext";
import NextCase from "@/components/cases-frame/NextCase";
import DarkTextCard from "@/components/cases-frame/DarkTextCard";
import Vimeo169 from "@/components/cases-frame/Vimeo169";
import VimeoImageCards from "@/components/cases-frame/VimeoImageCards";
import Frame02 from "@/components/cases-frame/Frame02";
import VimeoTwoCards from "@/components/cases-frame/VimeoTwoCards";
import ProjectInfoFaq from "@/components/cases-frame/ProjectInfoFaq";
import Faq from "@/components/cases-frame/Faq";

export const metadata: Metadata = {
  title: "Henoo Branding — Activity Discovery App Brand Identity",
  description:
    "Explore how Anagram Club designed the brand identity and website for Henoo, the app helping people discover activities, outings, and experiences around them.",
  openGraph: { images: ["/opengraph.webp"] },
  metadataBase: new URL("https://anagramclub.com"),
  robots: { index: true, follow: true },
};

const navData: CaseNavData = {
  title: "Henoo",
  description:
    "Henoo helps people fight isolation and hyperconnectivity by combining smart recommendations, custom activities, and friend sharing to get them out the door. We partnered with Henoo to build a brand universe, including its mascot Noo, capable of expressing that promise: the friend who always convinces you to go out.",
};

const projectDescription = (
  <Fragment key="henoo-project-description">
    <p>
      Henoo was born out of a simple but powerful observation: faced with
      information overload and hyperconnectivity, people tend to stay home
      and gradually isolate. The app responds with a mix of a smart guide and
      social media codes, combining search and recommendations with custom
      activities, friend sharing, and moment collections.
    </p>
    <p className="mt-4">
      anagram built the full brand universe: logo, brand identity, design
      system, and website. The studio also created Noo, Henoo&apos;s mascot
      and brand spokesperson. Noo embodies the ideal friend who knows your
      tastes, motivates you, and always convinces you to go out. He was
      designed to create strong emotional attachment and become synonymous
      with going out.
    </p>
    <p className="mt-4">
      In a lifestyle app, a mascot is not decoration. It&apos;s a retention
      and virality lever. Noo is the personification of Henoo&apos;s promise.
    </p>
  </Fragment>
);

const faqItems = [
  {
    question: "Who is Noo, Henoo's mascot?",
    answer:
      "Noo is Henoo's spokesperson, the explorer friend who knows your tastes and always convinces you to go out. He was designed to build emotional attachment and become the face users associate with discovering new experiences.",
  },
  {
    question: "What did anagram deliver for Henoo?",
    answer: "Logo, brand identity, design system, mascot creation, and website.",
  },
  {
    question: "Why does a lifestyle app need a mascot?",
    answer:
      "A mascot creates a unique emotional connection with users, personalizes the brand, and drives memorability. For Henoo, Noo is a retention and virality tool as much as a communication asset.",
  },
];

export default function HenooCasePage() {
  return (
    <main className="relative flex-1 pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4">
      <CaseNavSetter data={navData} />
      <div id="case-page" className="flex flex-col gap-4 max-[992px]:mt-12">
        <CaseTabContent
          release={
            <div className="flex flex-col gap-4">
              <Frame01 src="/works/Henoo/1.avif" alt="Henoo 1" priority />
              {/* <DarkTextCard
                title="Here for you"
                text="Henoo was born out of the desire to reduce loneliness. The app has the content of a guide: it allows you to find, through search or recommendation, a place to have a good time. Because there are as many ways to discover the world as there are people exploring it, Henoo offers a range of activities in line with users' tastes and desires. The app suggests activities and experiences that go with it by integrating codes close to social media: creating custom activities, sharing them with friends, collecting moments, designing or enriching guides, following recommendations, etc."
              /> */}
              <Vimeo169
                src="/works/Henoo/2.avif"
                alt="poster 2"
                dataSrc="1172136135"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Henoo/3.webp"
                alt="poster 3"
                dataSrc="1172136117"
                dataRatio="1920/1080"
              />
              {/* <DarkTextCard text="By carefully selecting colors, typography, and graphic elements, we created a cohesive visual identity that exuded expertise, and approachability. In designing Inbolt's visual language, our goal was to balance innovation and simplicity. For that reason, we opted to choose 3D and animations to create a sensation of real-life usage of the product. " /> */}
              <VimeoImageCards
                imagePosition="left"
                video={{
                  dataSrc: "1172136171",
                  dataRatio: "960/1080",
                  src: "/works/Henoo/5.avif",
                  alt: "Poster image video backstage",
                }}
                image={{
                  src: "/works/Henoo/4.avif",
                  alt: "Henoo 4",
                }}
              />
              {/* <DarkTextCard text="Disconnecting to reconnect with oneself, loved ones, hobbies, and interests, fostering curiosity, and pursuing learning opportunities" /> */}
              <Frame02
                img1={{ src: "/works/Henoo/6.avif", alt: "Henoo 6" }}
                img2={{ src: "/works/Henoo/7.avif", alt: "Henoo 7" }}
              />
              <Frame02
                img1={{ src: "/works/Henoo/8.avif", alt: "Henoo 8" }}
                img2={{ src: "/works/Henoo/9.avif", alt: "Henoo 9" }}
              />
              {/* <DarkTextCard text="Henoo is an invitation to go out. To see life as a playground to explore, traverse, and discover in order to enjoy everything it has to offer us." /> */}
              <Vimeo169
                src="/works/Henoo/10.avif"
                alt="poster 10"
                dataSrc="1172136201"
                dataRatio="1920/1080"
              />
              <Vimeo169
                src="/works/Henoo/11.avif"
                alt="poster 11"
                dataSrc="1172136239"
                dataRatio="1920/1080"
              />
              {/* <DarkTextCard text="Henoo is the ideal companion for exploration. It's that good friend who can suggest everything without imposing anything. This friend who knows our tastes, desires, affinities, and interests by heart. He knows how to speak to us, motivate us, and convince us to go. He always has great tips, ideas, and recommendations. He always suggests the right activity. He always introduces new things and new places. He unites, inspires, shares, drives, and leads. He is fearless, adventurous, curious, passionate, spontaneous, and social. One can only adore him." /> */}
              <Vimeo169
                src="/works/Henoo/12.avif"
                alt="poster 12"
                dataSrc="1172136260"
                dataRatio="1920/1080"
              />
              {/* <DarkTextCard text="Noo is the spokesperson for Henoo. He embodies the good friend, this explorer uncovering hidden gems. He facilitates the transmission of messages and carries the values ​​of your brand: authentic, passionate, and helpful. He is this reliable partner and becomes the reference when it comes to going out: we no longer just open the Henoo application, we consult Noo. He is the ambassador of your brand, with whom your users will develop an emotional attachment." /> */}
              <Vimeo169
                src="/works/Henoo/13.avif"
                alt="poster 13"
                dataSrc="1172136292"
                dataRatio="1920/1080"
              />
              <Frame01 src="/works/Henoo/14.avif" alt="Henoo 14" />
              <VimeoTwoCards
                card1={{
                  src: "/works/Henoo/15.avif",
                  alt: "Henoo 15",
                  dataSrc: "1172136315",
                  dataRatio: "960/1080",
                }}
                card2={{
                  src: "/works/Henoo/16.avif",
                  alt: "Henoo 16",
                  dataSrc: "1172136340",
                  dataRatio: "960/1080",
                }}
              />
              <Frame01 src="/works/Henoo/17.avif" alt="Henoo 17" />
              <Frame01 src="/works/Henoo/18.avif" alt="Henoo 18" />
              <Vimeo169
                src="/works/Henoo/19.avif"
                alt="poster 19"
                dataSrc="1172136368"
                dataRatio="1920/1080"
              />
              <Frame02
                img1={{ src: "/works/Henoo/20.avif", alt: "Henoo 20" }}
                img2={{ src: "/works/Henoo/21.avif", alt: "Henoo 21" }}
              />
              <ProjectInfoFaq
                projectDescription={projectDescription}
                faq={<Faq key="henoo-faq" items={faqItems} />}
              />
            </div>
          }
        />
        <NextCase
          projectName="Allo"
          href="/works/allo"
          media={{
            type: "image",
            src: "/works/Allo/1.webp",
            alt: "Allo",
          }}
        />
      </div>
    </main>
  );
}
