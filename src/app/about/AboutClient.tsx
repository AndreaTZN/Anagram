"use client";

import { useRef, useState, useEffect } from "react";
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
import OpenRoles, { type OpenRole } from "@/components/OpenRoles";

const studioImages = ["/studio/1.webp", "/studio/2.webp", "/studio/3.webp"];

const manifesto = (
  <>
    <span className="uppercase">anagram </span>
    was founded on the ambition to help companies define a distinct position and
    express it with clarity, relevance, and impact.
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
  { name: "Valentin Salomon", role: "Co-founder", image: "/team/valentin.jpg" },
  { name: "Emmanuel Julliot", role: "Co-founder", image: "/team/manu.jpg" },
  {
    name: "Guillaume Berthonneau",
    role: "Lead Designer",
    image: "/team/guillaume.jpg",
  },
  { name: "Andrea Tuysuzian", role: "Developer", image: "/team/andrea.jpg" },
  { name: "Kevin Robin", role: "Motion Designer", image: "/team/kevin.jpg" },
  { name: "Lou Bontemps", role: "Design Director", image: "/team/lou.jpg" },
  {
    name: "Alexandre Tuysuzian",
    role: "Developer",
    image: "/team/alexandre.jpg",
  },
  { name: "Rémy Godet", role: "Lead Designer", image: "/team/remy.jpg" },
  { name: "Vicenzo Tilleul", role: "Web Designer", image: null },
  { name: "Bérengère Morel", role: "Motion Designer", image: null },
];

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

function DotDividerVertical() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(60);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      // dot size 1.5px + gap 4px = 5.5px per dot
      setCount(Math.floor(el.clientHeight / 5.5));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-between self-stretch max-[766px]:hidden"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
        />
      ))}
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
  const baseRef = useRef<HTMLImageElement>(null);
  const topRef = useRef<HTMLImageElement>(null);
  const baseMobileRef = useRef<HTMLImageElement>(null);
  const topMobileRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef(false);
  const currentImage = useRef(team[0].image);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function animatePair(
    top: HTMLImageElement,
    base: HTMLImageElement,
    src: string,
    onDone?: () => void,
  ) {
    top.src = src;
    gsap.set(top, { opacity: 0 });
    gsap.to(top, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        base.src = src;
        gsap.set(top, { opacity: 0 });
        onDone?.();
      },
    });
  }

  function swapImage(src: string) {
    if (!src || src === currentImage.current || isAnimating.current) return;

    isAnimating.current = true;
    if (topRef.current && baseRef.current)
      animatePair(topRef.current, baseRef.current, src, () => {
        currentImage.current = src;
        isAnimating.current = false;
      });
    if (topMobileRef.current && baseMobileRef.current)
      animatePair(topMobileRef.current, baseMobileRef.current, src);
  }

  function handleNameHover(index: number) {
    setHoveredIndex(index);
    const member = team[index];
    if (!member.image) return;

    // Only crossfade once the hover "settles" on a member, instead of on
    // every mouseenter — sweeping across several names in quick succession
    // would otherwise flash through each intermediate photo before landing
    // on the final one.
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => swapImage(member.image!), 80);
  }

  return (
    <main className="pt-4 pr-4 pl-2 pb-4 max-[766px]:px-4 max-[766px]:pt-4 max-[992px]:mt-12">
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
          {/* Hero image */}
          <div
            id="about-hero"
            className="grow-2 shrink-0 basis-0 self-start relative bg-[#f4f4f4] overflow-hidden aspect-800/490 max-[766px]:order-2 max-[766px]:grow-0 max-[766px]:shrink max-[766px]:basis-auto max-[766px]:self-auto max-[766px]:aspect-square max-[766px]:rounded"
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
                  <img
                    src={src}
                    alt={`Studio ${i + 1}`}
                    className="w-full h-full object-cover"
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

          {/* Merch — T-shirt */}
          <div
            id="about-merch"
            className="grow shrink-0 basis-0 relative bg-[#f4f4f4] overflow-hidden flex justify-center items-start max-[766px]:order-14 max-[766px]:grow-0 max-[766px]:shrink max-[766px]:basis-auto max-[766px]:flex-col max-[766px]:items-center max-[766px]:rounded max-[766px]:aspect-100/100"
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
        </section>

        <section
          id="about-col-contain"
          className="flex gap-4 flex-1 max-[766px]:contents"
        >
          {/* Left column */}
          <div
            id="about-col-left"
            className="flex flex-col gap-8 w-[50%] shrink-0 flex-none max-[766px]:contents"
          >
            <div
              id="about-our-studio"
              className="flex flex-col gap-6 mt-auto max-[766px]:order-3"
            >
              <h2 className="text-[#0c0c0c] text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:text-2xl">
                {ourStudio.title}
              </h2>
              <p className="text-[#7e7e7e] text-sm leading-[1.3] max-[766px]:text-base">
                {ourStudio.description}
              </p>
            </div>

            {/* Offerings */}
            <div
              id="about-offerings"
              className="flex flex-col gap-6 text-[#0c0c0c] max-[766px]:order-5"
            >
              <h2 className="text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:text-2xl">
                Offerings
              </h2>
              <div className="grid grid-cols-3 gap-6 max-[766px]:grid-cols-2 max-[766px]:gap-8">
                {[
                  {
                    category: "Strategy",
                    mobileOrder: "max-[766px]:order-1",
                    items: [
                      "Brand Architecture",
                      "Brand Positioning",
                      "Market & Consumer",
                      "Analysis",
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
                      "Brand Production",
                      "Illustrations",
                      "Graphic Guidelines",
                      "3D & Motion Design",
                    ],
                  },
                  {
                    category: "Digital Experience",
                    mobileOrder: "max-[766px]:order-4",
                    items: [
                      "UI/UX Design",
                      "Product design",
                      "Web Design",
                      "Development",
                    ],
                  },

                  {
                    category: "Production",
                    mobileOrder: "max-[766px]:order-5",
                    items: [
                      "Photography",
                      "Video Production",
                      "Music & Sound Design",
                    ],
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
                ].map((col) => (
                  <div
                    key={col.category}
                    className={`flex flex-col max-[766px]:w-auto ${col.mobileOrder}`}
                  >
                    <span className="text-[#0C0C0C] text-sm leading-[1.6] max-[766px]:text-base max-[766px]:text-[#7e7e7e]">
                      {col.category}
                    </span>
                    {col.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm leading-[1.6] text-[#7e7e7e] max-[766px]:text-base max-[766px]:text-[#0c0c0c]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* We worked for */}
            <div
              id="about-worked-for"
              className="flex flex-col gap-6 max-[766px]:order-12"
            >
              <h2 className="text-[#0c0c0c] text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:text-2xl">
                We worked for
              </h2>
              <div className="flex gap-8 items-start text-[#7e7e7e] text-sm leading-[1.6] max-[766px]:grid max-[766px]:grid-cols-2 max-[766px]:gap-x-4 max-[766px]:gap-y-0 max-[766px]:text-base">
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
                    "Madomiciliation",
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
                    "Pearl",
                  ].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DotDividerVertical />

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

          {/* Right — content */}
          <div
            id="about-col-right"
            className="flex flex-col gap-8 flex-1 max-[766px]:contents"
          >
            {/* Open roles */}
            {openRoles.length > 0 && (
              <div
                id="about-open-roles"
                className="flex flex-col gap-6 max-[766px]:order-8"
              >
                <h2 className="text-[#0c0c0c] text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:text-2xl">
                  Open roles
                </h2>
                <OpenRoles roles={openRoles} />
              </div>
            )}

            {/* Meet the team */}
            <div
              id="about-meet-the-team"
              className="flex flex-col gap-6 max-[766px]:order-10"
            >
              <h2 className="text-[#0c0c0c] text-lg leading-[1.1] tracking-[-0.0075rem] max-[766px]:text-2xl">
                Meet the team
              </h2>
              {/* Desktop */}
              <div className="flex gap-8 items-start max-[766px]:hidden">
                <div className="flex flex-col gap-4">
                  {team.map((member, i) => (
                    <div
                      key={member.name}
                      className="flex gap-14 items-baseline cursor-default"
                      style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                      onMouseEnter={() => handleNameHover(i)}
                    >
                      <span className="text-[#0c0c0c] text-sm leading-[1.3] whitespace-nowrap w-48 shrink-0">
                        {member.name}
                      </span>
                      <span className="text-[#7e7e7e] text-sm leading-[1.3] whitespace-nowrap">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Photo desktop — double-buffered crossfade */}
                <div
                  className="relative overflow-hidden flex-1"
                  style={{
                    aspectRatio: "1.7 / 1.9",
                    maxWidth: "10rem",
                    marginLeft: "auto",
                  }}
                >
                  <img
                    ref={baseRef}
                    src={team[0].image!}
                    alt="Team member"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <img
                    ref={topRef}
                    src={team[0].image!}
                    alt="Team member"
                    className="absolute inset-0 w-full h-full object-cover opacity-0"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="hidden max-[766px]:block relative">
                {/* Photo — centered, floating over text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative size-37.5 overflow-hidden rounded">
                    <img
                      ref={baseMobileRef}
                      src={team[0].image!}
                      alt="Team member"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <img
                      ref={topMobileRef}
                      src={team[0].image!}
                      alt="Team member"
                      className="absolute inset-0 w-full h-full object-cover opacity-0"
                    />
                  </div>
                </div>

                {/* Text list */}
                <div className="flex justify-between text-base leading-[1.3]">
                  <div className="flex flex-col gap-2">
                    {team.map((member, i) => (
                      <p
                        key={member.name}
                        className="text-[#0c0c0c] whitespace-nowrap transition-opacity duration-200 cursor-pointer"
                        style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                        onClick={() => handleNameHover(i)}
                      >
                        {member.name}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {team.map((member, i) => (
                      <p
                        key={member.name}
                        className="text-[#7e7e7e] whitespace-nowrap transition-opacity duration-200 cursor-pointer"
                        style={{ opacity: hoveredIndex === i ? 1 : 0.3 }}
                        onClick={() => handleNameHover(i)}
                      >
                        {member.role}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
