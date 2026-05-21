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
import ShirtRotation from "@/components/ShirtRotation";

const studioImages = ["/studio/1.webp", "/studio/2.webp", "/studio/3.webp"];

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
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]"
        />
      ))}
    </div>
  );
}

export default function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: "100%", duration: 4, ease: "none" },
    );
  }, [activeSlide]);
  const baseRef = useRef<HTMLImageElement>(null);
  const topRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef(false);
  const currentImage = useRef(team[0].image);

  function handleNameHover(index: number) {
    setHoveredIndex(index);
    const member = team[index];
    if (
      !member.image ||
      member.image === currentImage.current ||
      isAnimating.current
    )
      return;

    isAnimating.current = true;
    const top = topRef.current!;
    const base = baseRef.current!;

    top.src = member.image;
    gsap.set(top, { opacity: 0 });
    gsap.to(top, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        base.src = member.image!;
        gsap.set(top, { opacity: 0 });
        currentImage.current = member.image;
        isAnimating.current = false;
      },
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col gap-6 flex-1">
        {/* Hero */}
        <div id="about-hero-container" className="flex gap-6 flex-1">
          {/* colonne gauche */}
          <div className="w-[55%] shrink-0 flex flex-col gap-8">
            {/* Hero image */}
            <div
              id="about-hero"
              className="relative bg-[#f4f4f4] rounded-sm overflow-hidden"
              style={{ aspectRatio: "855 / 790" }}
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

            {/* Our studio */}
            <div id="about-our-studio" className="flex flex-col gap-6 mt-auto">
              <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem]">
                Our studio
              </h2>
              <p className="text-[#7e7e7e] text-sm leading-[1.3]">
                Anagram is a creative studio founded in 2020. We bring together
                multidisciplinary talents driven by a shared ambition: to craft
                unique experiences through iteration, creativity, and an eye for
                detail. Passionate about craft in all its forms, we love pushing
                the boundaries of design to help our clients&apos; projects
                grow.
              </p>
            </div>
          </div>
          {/* colonne droite */}
          <div className="flex-1 flex flex-col ">
            {/* Manifesto text */}
            <p
              id="about-manifesto"
              className="text-[#0c0c0c] leading-[1.1] tracking-[-0.03125rem]"
              style={{
                fontSize:
                  "clamp(1.5rem, calc(1.5rem + (100vw - 62.5rem) * 1.5 / 65.5), 3rem)",
                marginBottom: "2rem",
              }}
            >
              <span className="uppercase">anagram</span>
              {` was founded on the ambition to help companies define a distinct position and express it with clarity, relevance, and impact.`}
              <br />
              <br />
              Through a balance of strategic thinking and refined design, we
              build identities that resonate, differentiate, and endure in an
              increasingly complex landscape.
            </p>

            {/* Clocks */}
            <div
              id="about-clocks"
              className="flex gap-8 justify-center mt-auto"
            >
              <div className="flex flex-col items-center gap-4">
                <AnalogClock timezone="America/New_York" color="#03c8ff" />
                <ClockLabel
                  city="NEW YORK"
                  timezone="America/New_York"
                  offsetLabel="GMT-4"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <AnalogClock timezone="Europe/Paris" color="#e3cefc" />
                <ClockLabel
                  city="PARIS"
                  timezone="Europe/Paris"
                  offsetLabel="CEST"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="about-col-contain" className="flex gap-6 flex-1">
          {/* Left column */}
          <div
            id="about-col-left"
            className="flex flex-col gap-6 w-[55%] shrink-0 flex-none"
          >
            <DotDivider />
            {/* Meet the team */}
            <div id="about-meet-the-team" className="flex flex-col gap-6">
              <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem]">
                Meet the team
              </h2>
              <div className="flex gap-8 items-start">
                {/* Rows — full row is hoverable */}
                <div className="flex flex-col gap-2">
                  {team.map((member, i) => (
                    <div
                      key={member.name}
                      className="flex gap-14 items-baseline cursor-default transition-opacity duration-200"
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

                {/* Photo — double-buffered crossfade */}
                <div
                  className="relative rounded-sm overflow-hidden flex-1"
                  style={{
                    height: "12rem",
                    maxWidth: "12rem",
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
            </div>

            <DotDivider />

            {/* Offerings */}
            <div
              id="about-offerings"
              className="flex flex-col gap-6 text-[#0c0c0c]"
            >
              <h2 className="text-2xl leading-[1.1] tracking-[-0.0075rem]">
                Offerings
              </h2>
              <div className="flex flex-wrap gap-8 items-start">
                {[
                  {
                    category: "Strategy",
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
                    items: [
                      "UI/UX Design",
                      "Product design",
                      "Web Design",
                      "Development",
                    ],
                  },
                  {
                    category: "Marketing & Activation",
                    items: [
                      "TV & Display Campaigns",
                      "Brand Launch",
                      "Social Media Campaigns",
                      "Advertising Campaigns",
                    ],
                  },
                  {
                    category: "Production",
                    items: [
                      "Photography",
                      "Video Production",
                      "Music & Sound Design",
                    ],
                  },
                ].map((col) => (
                  <div key={col.category} className="flex flex-col w-37.5">
                    <span className="text-[#7e7e7e] text-sm leading-[1.6]">
                      {col.category}
                    </span>
                    {col.items.map((item) => (
                      <span key={item} className="text-base leading-[1.6]">
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <DotDivider />

            {/* We worked for */}
            <div id="about-worked-for" className="flex flex-col gap-6">
              <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem]">
                We worked for
              </h2>
              <div className="flex gap-8 items-start text-[#7e7e7e] text-sm leading-[1.6]">
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

          {/* Right — content */}
          <div id="about-col-right" className="flex flex-col gap-8 flex-1">
            <DotDivider />

            {/* Open roles */}
            <div id="about-open-roles" className="flex flex-col gap-6">
              <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem]">
                Open roles
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Web Designer",
                    description:
                      "Designs clear, intuitive, and visually refined web interfaces, aligned with both user experience and brand identity.",
                    dot: "green",
                  },
                  {
                    title: "Dev Ingeneer",
                    description:
                      "Builds and implements robust technical solutions, ensuring performance, reliability, and scalability across projects.",
                    dot: "green",
                  },
                  {
                    title: "Project Manager",
                    description:
                      "Leads projects end-to-end, balancing creative vision, technical constraints, and timelines.",
                    dot: "green",
                  },
                  {
                    title: "Brand Designer",
                    description:
                      "Creates strong and cohesive brand identities through thoughtful and impactful visual systems.",
                    dot: "red",
                  },
                ].map((role) => (
                  <div key={role.title} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-2 rounded-full shrink-0 ${role.dot === "green" ? "bg-[#57E085]" : "bg-[#FF381E]"}`}
                        />
                        <span className="text-[#0c0c0c] text-sm font-medium leading-[1.6]">
                          {role.title}
                        </span>
                      </div>
                      <span className="bg-[#f5f5f5] rounded-full px-2 py-2 text-[#0c0c0c] text-sm leading-none">
                        Remote
                      </span>
                    </div>
                    <p className="text-[#7e7e7e] text-sm leading-[1.3]">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <DotDivider />

            {/* Merch — T-shirt */}
            <div
              id="about-merch"
              className="relative bg-[#f4f4f4] rounded-sm overflow-hidden flex justify-center items-start pb-8"
              style={{ minHeight: "28rem" }}
            >
              <ShirtRotation />
              <div className="absolute bottom-8 left-4 right-4 flex gap-2">
                <div className="flex flex-1 items-center justify-between px-4 py-4 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)]">
                  <span className="text-white text-sm font-medium opacity-50 whitespace-nowrap">
                    Anagram 30g Teeshirt
                  </span>
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    39.99$
                  </span>
                </div>
                <button className="flex items-center justify-center px-4 py-4 rounded-full bg-white shrink-0">
                  <span className="text-[#0c0c0c] text-sm font-medium whitespace-nowrap">
                    Add to bag
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
