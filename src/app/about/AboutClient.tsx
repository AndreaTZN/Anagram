"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import AnalogClock from "@/components/AnalogClock";
import ClockLabel from "@/components/ClockLabel";
import Footer from "@/components/Footer";
import ArpeRotation from "@/components/ArpeRotation";
import { type OpenRole } from "@/components/OpenRoles";

const studioImages = ["/studio/1.webp", "/studio/2.webp", "/studio/3.webp"];

const manifesto = (
  <>
    Anagram was founded on the ambition to help companies define a distinct
    position and express it with clarity, relevance, and impact.
    <br />
    <br />
    Through a balance of strategic thinking and refined design, we build
    identities that resonate, differentiate, and endure in an increasingly
    complex landscape. with clarity, relevance, and impact.
  </>
);

const ourStudio = {
  title: "Our studio",
  description:
    "Anagram is a creative studio founded in 2020. We bring together multidisciplinary talents driven by a shared ambition: to craft unique experiences through iteration, creativity, and an eye for detail. Passionate about craft in all its forms, we love pushing the boundaries of design to help our clients' projects grow.",
};

const clockBases = [
  { timezone: "America/New_York", city: "NEW YORK", offsetLabel: "GMT-4" },
  { timezone: "Europe/Paris", city: "PARIS", offsetLabel: "CEST" },
];

const team = [
  {
    name: "Valentin Salomon",
    role: "Co-founder",
    year: "2020",
    image: "/team/valentin.jpg",
  },
  {
    name: "Emmanuel Julliot",
    role: "Co-founder",
    year: "2020",
    image: "/team/manu.jpg",
  },
  {
    name: "Guillaume Berthonneau",
    role: "Brand designer",
    year: "2021",
    image: "/team/guillaume.jpg",
  },
  {
    name: "Andrea Tuysuzian",
    role: "Developer",
    year: "2024",
    image: "/team/andrea.jpg",
  },
  {
    name: "Kevin Robin",
    role: "Motion Designer",
    year: "2024",
    image: "/team/kevin.jpg",
  },
  {
    name: "Lou Bontemps",
    role: "Design Director",
    year: "2025",
    image: "/team/lou.jpg",
  },
  {
    name: "Alexandre Tuysuzian",
    role: "Developer",
    year: "2025",
    image: "/team/alexandre.jpg",
  },
  {
    name: "Rémy Godet",
    role: "Lead Designer",
    year: "2025",
    image: "/team/remy.jpg",
  },
  {
    name: "Vicenzo Tilleul",
    role: "Digital Designer",
    year: "2025",
    image: null,
  },
  {
    name: "Bérengère Morel",
    role: "Motion Designer",
    year: "2026",
    image: null,
  },
  {
    name: "Quentin Belluc",
    role: "Motion Designer",
    year: "2026",
    image: null,
  },
  {
    name: "Tanguy Caruel",
    role: "Brand & Digital Designer",
    year: "2026",
    image: null,
  },
];

function LineDivider() {
  return <div className="h-[0.5px] w-full bg-[#0c0c0c26] max-[766px]:hidden" />;
}

function DotDivider() {
  return (
    <div className="flex items-center justify-between w-full">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#0c0c0c] opacity-10 rounded-full shrink-0 size-0.75"
        />
      ))}
    </div>
  );
}

const offeringsCategories: {
  category: string;
  mobileOrder: string;
  items: (string | string[])[];
}[] = [
  {
    category: "Strategy",
    mobileOrder: "max-[766px]:order-1",
    items: [
      "Brand Architecture",
      "Brand Positioning",
      "Market & Consumer Analysis",
      "Brand Narrative",
      "Brand Pitch",
      "Tone of Voice",
    ],
  },
  {
    category: "Visual Identity",
    mobileOrder: "max-[766px]:order-2",
    items: [
      "Logo Design",
      "Art Direction",
      ["Brand Production", "Illustrations"],
      "Graphic Guidelines",
      "3D & Motion Design",
    ],
  },
  {
    category: "Digital",
    mobileOrder: "max-[766px]:order-4",
    items: [["UI/UX Design", "Product design"], "Web Design", "Development"],
  },
  {
    category: "Marketing & Activation",
    mobileOrder: "max-[766px]:order-3",
    items: [
      "TV & Display Campaigns",
      "Brand Launch",
      "Social Media Campaigns",
      "Advertising Campaigns",
    ],
  },
  {
    category: "Production",
    mobileOrder: "max-[766px]:order-5",
    items: ["Photography", "Video Production", "Music & Sound Design"],
  },
];

function OfferingCategory({
  category,
  items,
  mobileOrder,
  className = "",
}: {
  category: string;
  items: (string | string[])[];
  mobileOrder: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${mobileOrder} ${className}`}>
      <span className="text-[#0c0c0c] text-sm font-medium leading-[0.9] max-[766px]:text-base max-[766px]:font-normal max-[766px]:text-[#7e7e7e]">
        {category}
      </span>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-sm leading-[1.3] text-[#7c7c7c] max-[766px]:text-base max-[766px]:leading-[1.6] max-[766px]:text-[#0c0c0c]"
          >
            {Array.isArray(item)
              ? item.map((line, li) => (
                  <span key={li}>
                    {line}
                    {li < item.length - 1 && <br />}
                  </span>
                ))
              : item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamPhotoStack({
  displayedIndex,
  className,
  sizes,
}: {
  displayedIndex: number;
  className: string;
  sizes: string;
}) {
  return (
    <div className={className}>
      {team.map((member, i) =>
        member.image ? (
          <div
            key={member.image}
            className="absolute inset-0"
            style={{ opacity: displayedIndex === i ? 1 : 0 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </div>
        ) : null,
      )}
    </div>
  );
}

export default function AboutPage({
  openRoles,
  colorPair,
}: {
  openRoles: OpenRole[];
  colorPair: readonly [string, string];
}) {
  const clocks = clockBases.map((base, i) => ({
    ...base,
    color: colorPair[i],
  }));
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeClockSlide, setActiveClockSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const clockSwiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const clockProgressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "none" },
    );
  }, [activeSlide]);

  useEffect(() => {
    if (!clockProgressRef.current) return;
    gsap.killTweensOf(clockProgressRef.current);
    gsap.fromTo(
      clockProgressRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "none" },
    );
  }, [activeClockSlide]);
  // All team photos are stacked on top of each other; only the displayed
  // one is switched to opacity 1, instantly.
  const [displayedIndex, setDisplayedIndex] = useState(0);

  function handleNameHover(index: number) {
    setHoveredIndex(index);
    if (team[index].image) setDisplayedIndex(index);
  }

  return (
    <main className="pt-4 pr-4 pl-4 pb-4 max-[766px]:px-4 max-[766px]:pt-4 max-[992px]:mt-12">
      {/* Hero */}

      <div className="flex flex-col gap-6 flex-1 max-[766px]:gap-8">
        {/* colonne droite */}
        <section className="flex gap-8 mb-8 max-[766px]:contents">
          {/* Manifesto text */}
          <div className="max-w-141.75 max-[766px]:order-1">
            <p
              id="about-manifesto"
              className="text-[#0c0c0c] leading-[1.1] tracking-[-0.03125rem] text-2xl"
            >
              {manifesto}
            </p>
          </div>

          {/* Clocks */}
          <div id="about-clocks" className="flex-1 max-[766px]:order-7">
            {/* Desktop */}
            <div className="flex gap-8 justify-center w-full max-[766px]:hidden">
              {clocks.map((clock) => (
                <div
                  key={clock.city}
                  className="flex flex-col items-center gap-4 max-w-62.5 w-full"
                >
                  <AnalogClock timezone={clock.timezone} color={clock.color} />
                  <ClockLabel
                    city={clock.city}
                    timezone={clock.timezone}
                    offsetLabel={clock.offsetLabel}
                  />
                </div>
              ))}
            </div>

            {/* Mobile — Swiper */}
            <div className="hidden max-[766px]:block overflow-hidden">
              <Swiper
                loop
                effect="fade"
                modules={[EffectFade, Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSwiper={(s) => {
                  clockSwiperRef.current = s;
                }}
                onSlideChange={(s) => setActiveClockSlide(s.realIndex)}
              >
                {clocks.map((clock) => (
                  <SwiperSlide key={clock.city}>
                    <div className="flex flex-col items-center gap-4 max-w-56 mx-auto bg-white">
                      <AnalogClock
                        timezone={clock.timezone}
                        color={clock.color}
                      />
                      <ClockLabel
                        city={clock.city}
                        timezone={clock.timezone}
                        offsetLabel={clock.offsetLabel}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex justify-center items-center gap-2 mt-4">
                {clocks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => clockSwiperRef.current?.slideToLoop(i)}
                    className="cursor-pointer"
                  >
                    <span
                      className={`relative rounded-full shrink-0 overflow-hidden block transition-[width] duration-300 ${i === activeClockSlide ? "h-1.25 w-5.25 bg-[#0c0c0c]/20" : "size-1.25 bg-[#0c0c0c] opacity-30"}`}
                    >
                      {i === activeClockSlide && (
                        <span
                          ref={clockProgressRef}
                          className="absolute inset-y-0 left-0 bg-[#0c0c0c] rounded-full w-0"
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* colonne gauche */}
        <section className="flex gap-4 max-[766px]:contents">
          {/* Swiper + content column */}
          <div
            id="about-content-col"
            className="grow-2 shrink-0 basis-0 min-w-0 flex flex-col gap-8 max-[766px]:contents"
          >
            {/* Hero image */}
            <div
              id="about-hero"
              className="relative bg-[#f4f4f4] overflow-hidden aspect-800/490 max-[766px]:order-2 max-[766px]:aspect-square max-[766px]:rounded"
            >
              <Swiper
                loop
                effect="fade"
                modules={[EffectFade, Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSwiper={(s) => {
                  swiperRef.current = s;
                }}
                onSlideChange={(s) => setActiveSlide(s.realIndex)}
                className="h-full"
              >
                {studioImages.map((src, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={src}
                      alt={`Studio ${i + 1}`}
                      fill
                      sizes="(max-width: 766px) 100vw, 55vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center rounded-full backdrop-blur-xl bg-[rgba(12,12,12,0.2)] px-2">
                {studioImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    className="flex items-center justify-center px-1 py-3 cursor-pointer"
                  >
                    <span
                      className={`relative rounded-full shrink-0 overflow-hidden transition-[width,opacity] duration-300 ${i === activeSlide ? "h-1.25 w-5.25 bg-white/30 opacity-100" : "h-1.25 w-1.25 bg-white opacity-30"}`}
                    >
                      {i === activeSlide && (
                        <span
                          ref={progressRef}
                          className="absolute inset-y-0 left-0 bg-white rounded-full w-0"
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10 max-[766px]:contents">
              {/* Offerings */}
              <div
                id="about-offerings"
                className="flex gap-4 text-[#0c0c0c] max-[766px]:order-5 max-[766px]:flex-col max-[766px]:gap-6"
              >
                <h2 className="w-62.5 shrink-0 text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:w-auto max-[766px]:text-2xl">
                  Informations
                </h2>
                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-8 max-[766px]:gap-x-8 max-[766px]:gap-y-8">
                  <OfferingCategory
                    category={offeringsCategories[0].category}
                    mobileOrder={offeringsCategories[0].mobileOrder}
                    items={offeringsCategories[0].items}
                  />
                  <OfferingCategory
                    category={offeringsCategories[1].category}
                    mobileOrder={offeringsCategories[1].mobileOrder}
                    items={offeringsCategories[1].items}
                  />
                  <div className="col-span-2 h-[0.5px] bg-[#0c0c0c]/15 max-[766px]:hidden" />
                  <OfferingCategory
                    category={offeringsCategories[2].category}
                    mobileOrder={offeringsCategories[2].mobileOrder}
                    items={offeringsCategories[2].items}
                  />
                  <OfferingCategory
                    category={offeringsCategories[3].category}
                    mobileOrder={offeringsCategories[3].mobileOrder}
                    items={offeringsCategories[3].items}
                  />
                  <div className="col-span-2 h-[0.5px] bg-[#0c0c0c]/15 max-[766px]:hidden" />
                  <OfferingCategory
                    category={offeringsCategories[4].category}
                    mobileOrder={offeringsCategories[4].mobileOrder}
                    items={offeringsCategories[4].items}
                    className="col-span-2 max-[766px]:col-span-1"
                  />
                </div>
              </div>

              <LineDivider />

              <div
                id="about-our-studio"
                className="flex gap-4 text-[#0c0c0c] max-[766px]:order-3 max-[766px]:flex-col max-[766px]:gap-6"
              >
                <h2 className="w-62.5 shrink-0 text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:w-auto max-[766px]:text-2xl">
                  {ourStudio.title}
                </h2>
                <div className="flex-1 flex gap-4 max-[766px]:flex-col max-[766px]:gap-6">
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-[0.9] text-[#0c0c0c] max-[766px]:text-base">
                        New Business
                      </span>
                      <a
                        href="mailto:hello@anagram.club"
                        className="text-sm leading-[1.3] text-[#7c7c7c] max-[766px]:text-base"
                      >
                        hello@anagram.club
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-[0.9] text-[#0c0c0c] max-[766px]:text-base">
                        Careers
                      </span>
                      <a
                        href="mailto:careers@anagram.club"
                        className="text-sm leading-[1.3] text-[#7c7c7c] max-[766px]:text-base"
                      >
                        careers@anagram.club
                      </a>
                    </div>
                  </div>
                  <p className="flex-1 text-sm leading-[1.3] text-[#7c7c7c] max-[766px]:text-base">
                    {ourStudio.description}
                  </p>
                </div>
              </div>

              <LineDivider />

              {/* We worked for */}
              <div
                id="about-worked-for"
                className="flex gap-4 text-[#0c0c0c] max-[766px]:order-12 max-[766px]:flex-col max-[766px]:gap-6"
              >
                <h2 className="w-62.5 shrink-0 text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:w-auto max-[766px]:text-2xl">
                  We worked for
                </h2>
                <div className="flex-1 flex gap-4 items-start text-[#7c7c7c] text-sm leading-[1.3] max-[766px]:grid max-[766px]:grid-cols-2 max-[766px]:gap-x-4 max-[766px]:gap-y-0 max-[766px]:text-base">
                  <div className="flex-1 flex flex-col">
                    {[
                      "Everyday",
                      "Peeps",
                      "Incard",
                      "Frequentiel",
                      "Fortuneo",
                      "Planiti",
                      "Omnia",
                      "Wastetide",
                      "Bonsai",
                      "Buybox",
                      "Rauva",
                    ].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col">
                    {[
                      "Twin",
                      "Nabla",
                      "Rauva",
                      "Gigi",
                      "Aiup",
                      "Drop",
                      "Swaive",
                      "Omi",
                      "Trezy",
                      "Evy",
                      "Vizzia",
                    ].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col">
                    {[
                      "RockFi",
                      "Electra",
                      "Pearl",
                      "Nijta",
                      "Shift",
                      "TMFC",
                      "Gorgias",
                      "Spendesk",
                      "Wave",
                      "Qonto",
                      "Vybe",
                    ].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  <div className="flex-1 flex flex-col">
                    {[
                      "Perma",
                      "Allô",
                      "Tilt Energy",
                      "Adagio",
                      "Pimento",
                      "Homaio",
                      "May",
                      "Eplaque",
                      "QSTNMRK",
                      "Ringover",
                    ].map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Open roles */}
              {openRoles.length > 0 && (
                <>
                  <LineDivider />
                  <div
                    id="about-open-roles"
                    className="flex gap-4 text-[#0c0c0c] max-[766px]:order-8 max-[766px]:flex-col max-[766px]:gap-6"
                  >
                    <h2 className="w-62.5 shrink-0 text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:w-auto max-[766px]:text-2xl">
                      Open roles
                    </h2>
                    <div className="flex-1 flex gap-4 max-[766px]:flex-col max-[766px]:gap-6">
                      <div className="flex-1 flex flex-col gap-2">
                        {openRoles.map((role) => (
                          <span
                            key={role._id}
                            className="text-sm font-medium leading-[0.9] text-[#0c0c0c] max-[766px]:text-base"
                          >
                            {role.title}
                          </span>
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-[1.3] text-[#7c7c7c] max-[766px]:text-base">
                        All of these roles are fully remote. Please send all
                        resumes and work examples to{" "}
                        <a href="mailto:careers@anagram.club">
                          careers@anagram.club
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Meet the team */}
            <div
              id="about-meet-the-team"
              className="flex flex-col gap-6 max-[766px]:order-10"
            >
              <LineDivider />
              {/* Desktop */}
              <div className="flex gap-4 items-stretch max-[766px]:hidden">
                <div className="flex w-62.5 shrink-0 flex-col items-start justify-between">
                  <h2 className="text-[#0c0c0c] text-lg leading-[1.1] tracking-[-0.0075rem]">
                    Meet the team
                  </h2>

                  <TeamPhotoStack
                    displayedIndex={displayedIndex}
                    className="relative h-50 w-37.5 overflow-hidden"
                    sizes="9.375rem"
                  />
                </div>

                <div className="grid flex-1 grid-cols-[1fr_auto_auto] items-baseline gap-x-8 gap-y-4">
                  {team.map((member, i) => (
                    <Fragment key={member.name}>
                      <span
                        className="text-[#0c0c0c] text-sm leading-[1.3] whitespace-nowrap cursor-default"
                        style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                        onMouseEnter={() => handleNameHover(i)}
                      >
                        {member.name}
                      </span>
                      <span
                        className="text-[#7c7c7c] text-sm leading-[1.3] whitespace-nowrap text-right cursor-default"
                        style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                        onMouseEnter={() => handleNameHover(i)}
                      >
                        {member.role}
                      </span>
                      <span
                        className="text-[#7c7c7c] text-sm leading-[1.3] whitespace-nowrap text-right cursor-default"
                        style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                        onMouseEnter={() => handleNameHover(i)}
                      >
                        {member.year}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="hidden max-[766px]:block">
                <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem] mb-6">
                  Meet the team
                </h2>

                <div className="relative">
                  {/* Photo — centered, floating over text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <TeamPhotoStack
                      displayedIndex={displayedIndex}
                      className="relative size-37.5 overflow-hidden rounded"
                      sizes="9.375rem"
                    />
                  </div>

                  {/* Text list */}
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 text-base leading-[1.3]">
                    {team.map((member, i) => (
                      <Fragment key={member.name}>
                        <p
                          className="text-[#0c0c0c] whitespace-nowrap transition-opacity duration-200 cursor-pointer"
                          style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                          onClick={() => handleNameHover(i)}
                        >
                          {member.name}
                        </p>
                        <p
                          className="text-[#7e7e7e] whitespace-nowrap text-right transition-opacity duration-200 cursor-pointer"
                          style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                          onClick={() => handleNameHover(i)}
                        >
                          {member.role}
                        </p>
                        <p
                          className="text-[#7e7e7e] whitespace-nowrap text-right transition-opacity duration-200 cursor-pointer"
                          style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                          onClick={() => handleNameHover(i)}
                        >
                          {member.year}
                        </p>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Merch — T-shirt */}
          <div
            id="about-merch"
            className="grow shrink-0 basis-0 self-start sticky top-4 bg-[#f4f4f4] overflow-hidden flex justify-center items-start aspect-40/49 max-[766px]:relative max-[766px]:top-0 max-[766px]:self-auto max-[766px]:order-14 max-[766px]:grow-0 max-[766px]:shrink max-[766px]:basis-auto max-[766px]:flex-col max-[766px]:items-center max-[766px]:rounded max-[766px]:aspect-100/100 max-[766px]:mb-2"
          >
            <div className="absolute inset-0 blur-[20px]">
              <ArpeRotation />
            </div>
            <div className="absolute bottom-8 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-full bg-[#c4c4c4]">
              <span className="text-white text-sm font-medium whitespace-nowrap">
                Available soon
              </span>
              <span className="text-white text-sm  whitespace-nowrap">
                2027
              </span>
            </div>
          </div>

          {/* Mobile — dot dividers */}
          <div className="hidden max-[766px]:block max-[766px]:order-4">
            <DotDivider />
          </div>
          <div className="hidden max-[766px]:block max-[766px]:order-6">
            <DotDivider />
          </div>
          <div className="hidden max-[766px]:block max-[766px]:order-9">
            <DotDivider />
          </div>
          <div className="hidden max-[766px]:block max-[766px]:order-11">
            <DotDivider />
          </div>
          <div className="hidden max-[766px]:block max-[766px]:order-13">
            <DotDivider />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
