"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type ArchiveRow = {
  name: string;
  description: string;
  href: string;
  sector: string;
  year: string;
  expertises: string[];
  platforms: string[];
};

type Selection = {
  sectors: string[];
  year: string[];
  expertise: string[];
  platforms: string[];
};

type FilterConfig = {
  id: keyof Selection;
  label: string;
  options: string[];
};

const emptySelection: Selection = {
  sectors: [],
  year: [],
  expertise: [],
  platforms: [],
};

const filters: FilterConfig[] = [
  {
    id: "sectors",
    label: "Sectors",
    options: [
      "Fintech & Insurtech",
      "ClimateTech",
      "Brands & Services",
      "IA",
      "Applicative Saas",
    ],
  },
  {
    id: "year",
    label: "Year of support",
    options: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  },
  {
    id: "expertise",
    label: "Expertise",
    options: [
      "Sound design",
      "Video shooting",
      "Photo shooting",
      "Design system",
      "Product design",
      "Illustrations 2D, 3D, AI",
      "Back end development",
      "Front end development",
      "Brand Identity",
      "Brand Strategy",
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    options: ["SaaS", "Mobile App", "Web"],
  },
];

const rows: ArchiveRow[] = [
  {
    name: "Omi",
    description: "Set the scene your products in 3D",
    href: "https://omi.so/",
    sector: "IA",
    year: "2024",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI", "Design system"],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Spendesk",
    description: "Where Finance Connects.",
    href: "https://www.spendesk.com/",
    sector: "Fintech & Insurtech",
    year: "2021",
    expertises: ["Brand Identity", "Illustrations 2D, 3D, AI", "Design system"],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Qonto",
    description: "The business account that gets jobs done.",
    href: "https://qonto.com/",
    sector: "Fintech & Insurtech",
    year: "2022",
    expertises: ["Illustrations 2D, 3D, AI", "Design system"],
    platforms: ["Mobile App", "SaaS"],
  },
  {
    name: "Nabla",
    description: "Enjoy care again.",
    href: "https://www.nabla.com/",
    sector: "Brands & Services",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Illustrations 2D, 3D, AI",
      "Design system",
      "Front end development",
    ],
    platforms: ["Mobile App", "SaaS", "Web"],
  },
  {
    name: "Aiup",
    description: "More human, more tech.",
    href: "https://www.aiup.fr/",
    sector: "IA",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Electra",
    description: "Ultra-fast charging stations: 400 kW in 20 minutes.",
    href: "https://www.go-electra.com/",
    sector: "ClimateTech",
    year: "2023",
    expertises: ["Illustrations 2D, 3D, AI", "Design system"],
    platforms: ["Mobile App"],
  },
  {
    name: "Shift",
    description:
      "Crypto-focus investment firm backing teams, protocols and currencies aiming to build a more decentralized world.",
    href: "https://x.com/shiftcapital",
    sector: "Fintech & Insurtech",
    year: "2022",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Trezy",
    description: "Trezy makes cash management a breeze!",
    href: "https://www.trezy.io/fr",
    sector: "Fintech & Insurtech",
    year: "2021",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI", "Design system"],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Wave",
    description: "A Human-Centric Coaching Solution.",
    href: "https://www.maddyness.com/2024/06/27/alan-sempare-de-wave-ai-pour-monter-en-gamme-dans-le-coaching-professionnel/",
    sector: "Brands & Services",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Buybox",
    description: "The omnichannel gift card solution of the finest brands.",
    href: "https://www.buybox.net/",
    sector: "Brands & Services",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Sound design",
    ],
    platforms: ["Web"],
  },
  {
    name: "Rauva",
    description: "Portugal’s first business super-app.",
    href: "https://get.rauva.com/",
    sector: "Fintech & Insurtech",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Drop",
    description:
      "The Future Of CRM Is Social. Less Cost, More Engagement, Maximum ROI.",
    href: "https://www.usedrop.io/",
    sector: "Applicative Saas",
    year: "2024",
    expertises: ["Product design", "Design system"],
    platforms: ["SaaS"],
  },
  {
    name: "Madomiciliation",
    description: "New generation domiciliation from €1/month.",
    href: "https://ma-domiciliation.fr/",
    sector: "Brands & Services",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "TMFC",
    description: "Your Business, in your Pocket. Mobile Apps for Every Need.",
    href: "https://www.themobilefirstcompany.com/",
    sector: "Brands & Services",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Swypex",
    description: "One Platform For Business Banking.",
    href: "https://www.swypex.com/",
    sector: "Fintech & Insurtech",
    year: "2022",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "Mobile App", "SaaS"],
  },
  {
    name: "Hero",
    description: "The professional account that finances your ambitions.",
    href: "https://www.heropay.eu/",
    sector: "Fintech & Insurtech",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "Mobile App", "SaaS"],
  },
  {
    name: "Lazy",
    description: "Capture at the speed of thought.",
    href: "https://lazy.so/",
    sector: "Applicative Saas",
    year: "2023",
    expertises: ["Brand Strategy", "Design system"],
    platforms: ["SaaS"],
  },
  {
    name: "Bitit",
    description: "Instant, easy and secure cryptocurrency purchases.",
    href: "https://bitit.io/",
    sector: "Fintech & Insurtech",
    year: "2022",
    expertises: ["Product design", "Design system"],
    platforms: ["Mobile App"],
  },
  {
    name: "Waltio",
    description: "Your Crypto Tax Return. In one Click.",
    href: "https://www.waltio.com/fr/",
    sector: "Fintech & Insurtech",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "Mobile App", "SaaS"],
  },
  {
    name: "Carbometrix",
    description: "Act on climate today. Lead tomorrow.",
    href: "https://carbometrix.com/",
    sector: "ClimateTech",
    year: "2023",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Comet",
    description: "The new standard for working with freelancers.",
    href: "https://www.comet.co/",
    sector: "Applicative Saas",
    year: "2022",
    expertises: ["Product design", "Design system"],
    platforms: ["SaaS"],
  },
  {
    name: "Bonsai",
    description: "The unified platform for service businesses.",
    href: "https://www.hellobonsai.com/",
    sector: "Applicative Saas",
    year: "2024",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "Evy",
    description: "Protect your products, simply.",
    href: "https://www.evy.eu/",
    sector: "Applicative Saas",
    year: "2022",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Ringover",
    description: "The cloud communications platform, powered by AI.",
    href: "https://www.ringover.fr/",
    sector: "Applicative Saas",
    year: "2021",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "RockFi",
    description: "The new private management.",
    href: "https://www.rockfi.fr/",
    sector: "Fintech & Insurtech",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
    ],
    platforms: ["Web"],
  },
  {
    name: "Nijta",
    description: "The #1 voice data privacy solution.",
    href: "https://www.nijta.com/",
    sector: "IA",
    year: "2024",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Adagio",
    description: "Breaking the glass ceiling for proactive publishers.",
    href: "https://adagio.io/",
    sector: "Applicative Saas",
    year: "2024",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "May",
    description: "Offer your employees 100% tax-free compensation.",
    href: "https://www.may.fr/",
    sector: "Fintech & Insurtech",
    year: "2025",
    expertises: ["Brand Strategy", "Front end development", "Design system"],
    platforms: ["Mobile App"],
  },
  {
    name: "Pimento",
    description: "Your tailor-made AI studio.",
    href: "https://www.pimento.design/",
    sector: "Applicative Saas",
    year: "2024",
    expertises: ["Product design", "Design system"],
    platforms: ["SaaS"],
  },
  {
    name: "Eplaque",
    description: "Get your registration certificate and plates in 2 minutes.",
    href: "https://www.eplaque.fr/",
    sector: "Brands & Services",
    year: "2020",
    expertises: ["Product design", "Design system"],
    platforms: ["SaaS"],
  },
  {
    name: "LocService",
    description: "Locservice, the key to trust.",
    href: "https://www.locservice.fr/",
    sector: "Brands & Services",
    year: "2025",
    expertises: [
      "Brand Strategy",
      "Front end development",
      "Illustrations 2D, 3D, AI",
      "Design system",
    ],
    platforms: ["Web", "SaaS"],
  },
  {
    name: "Orus",
    description: "The professional insurance you've been waiting for.",
    href: "https://www.orus.eu/",
    sector: "Fintech & Insurtech",
    year: "2025",
    expertises: ["Front end development"],
    platforms: ["Web"],
  },
  {
    name: "Shotgun",
    description: "Grab your ticket, make memories.",
    href: "https://shotgun.live",
    sector: "Brands & Services",
    year: "2022",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "Gorgias",
    description:
      "Sell more and resolve support inquiries with Conversational AI.",
    href: "https://www.gorgias.com/",
    sector: "Applicative Saas",
    year: "2025",
    expertises: ["Product design"],
    platforms: ["SaaS"],
  },
  {
    name: "homaio",
    description: "Invest in climate.",
    href: "https://www.homaio.com",
    sector: "ClimateTech",
    year: "2023",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "QSTNMRK",
    description:
      "anonymous collective of engaged creatives forming a voice to challenge the state of the modern human experience.",
    href: "https://www.qstnmrk.com/",
    sector: "Brands & Services",
    year: "2024",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "Shine",
    description: "The free pro account that speaks to professionals.",
    href: "https://www.shine.fr/",
    sector: "Fintech & Insurtech",
    year: "2019",
    expertises: ["Brand Strategy", "Illustrations 2D, 3D, AI"],
    platforms: ["Web"],
  },
  {
    name: "Kard",
    description: "Teens' favorite payment card and app.",
    href: "https://www.kard.eu/",
    sector: "Fintech & Insurtech",
    year: "2019",
    expertises: ["Product design", "Design system"],
    platforms: ["Mobile App"],
  },
  {
    name: "Évolt",
    description: "From feedback to insights.",
    href: "https://evolt.io/",
    sector: "Applicative Saas",
    year: "2018",
    expertises: ["Product design", "Design system"],
    platforms: ["SaaS"],
  },
];

function ChevronDownIcon({
  iconRef,
}: {
  iconRef: React.RefObject<SVGSVGElement | null>;
}) {
  return (
    <svg
      ref={iconRef}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M3.5 6.41667L7 9.91667L10.5 6.41667"
        stroke="#0c0c0c"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M2.917 7.292 5.542 9.917 11.083 4.083"
        stroke="#0c0c0c"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterDropdown({
  id,
  label,
  options,
  selected,
  onToggle,
  onClear,
}: FilterConfig & {
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const idPrefix = `works-archive-list-filter-${id}`;
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    gsap.set(panelRef.current, { height: 0, opacity: 0 });
  }, []);

  function setState(next: boolean) {
    setOpen(next);
    gsap.to(panelRef.current, {
      height: next ? "auto" : 0,
      opacity: next ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
    gsap.to(chevronRef.current, {
      rotate: next ? 180 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }

  return (
    <div
      id={idPrefix}
      className="relative"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className="flex gap-0.5 items-center cursor-pointer"
      >
        <span className="text-[#0c0c0c] text-sm font-medium leading-[0.9]">
          {label}
          {selected.length > 0 && ` (${selected.length})`}
        </span>
        <ChevronDownIcon iconRef={chevronRef} />
      </button>

      <div
        ref={panelRef}
        className="absolute top-full left-0 mt-2 overflow-hidden bg-white border border-[#0c0c0c]/10 z-10"
      >
        <div className="flex flex-col gap-1 p-2 w-52 max-h-62.5 overflow-y-auto">
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-[#0c0c0c] text-left cursor-pointer transition-colors hover:bg-[#f5f5f5]"
          >
            All
            {selected.length === 0 && <CheckIcon />}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              id={`${idPrefix}-option-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              onClick={() => onToggle(option)}
              className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-[#0c0c0c] text-left cursor-pointer transition-colors hover:bg-[#f5f5f5]"
            >
              <span>{option}</span>
              {selected.includes(option) && <CheckIcon />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RowArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path
        d="M11.459 5.625L16.0423 10L11.459 14.375"
        stroke="#0c0c0c"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.834 10H3.95898"
        stroke="#0c0c0c"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExpertiseCell({ expertises }: { expertises: string[] }) {
  const others = expertises.slice(1);
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // The tooltip node only renders when there are extra expertises to list.
    if (!tooltipRef.current) return;
    gsap.set(tooltipRef.current, { opacity: 0, y: 4 });
  }, []);

  function setState(next: boolean) {
    if (others.length === 0) return;
    setOpen(next);
    gsap.to(tooltipRef.current, {
      opacity: next ? 1 : 0,
      y: next ? 0 : 4,
      duration: 0.2,
      ease: "power2.out",
    });
  }

  return (
    <span
      className="relative text-[#0c0c0c] text-sm text-center flex-1 max-[766px]:hidden font-light"
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
    >
      {expertises[0]}
      {expertises.length > 1 && (
        <span className="opacity-50"> +{expertises.length - 1}</span>
      )}
      {others.length > 0 && (
        <div
          ref={tooltipRef}
          aria-hidden={!open}
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap bg-white border border-[#0c0c0c]/10 px-4 py-3 text-left"
        >
          {others.map((item) => (
            <p
              key={item}
              className="text-[#0c0c0c] text-xs font-light leading-[1.6]"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </span>
  );
}

function matchesRow(row: ArchiveRow, selection: Selection) {
  if (selection.sectors.length > 0 && !selection.sectors.includes(row.sector))
    return false;
  if (selection.year.length > 0 && !selection.year.includes(row.year))
    return false;
  if (
    selection.expertise.length > 0 &&
    !row.expertises.some((expertise) => selection.expertise.includes(expertise))
  )
    return false;
  if (
    selection.platforms.length > 0 &&
    !row.platforms.some((platform) => selection.platforms.includes(platform))
  )
    return false;
  return true;
}

export default function WorksArchiveList() {
  const [selection, setSelection] = useState<Selection>(emptySelection);

  function toggleValue(id: keyof Selection, value: string) {
    setSelection((prev) => {
      const current = prev[id];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });
  }

  function clearFilter(id: keyof Selection) {
    setSelection((prev) => ({ ...prev, [id]: [] }));
  }

  const visibleRows = rows.filter((row) => matchesRow(row, selection));

  return (
    <div id="works-archive-list" className="flex flex-col gap-4 mt-14">
      <div
        id="works-archive-list-filters"
        className="flex gap-8 items-center max-[766px]:hidden"
      >
        {filters.map((filter) => (
          <FilterDropdown
            key={filter.id}
            {...filter}
            selected={selection[filter.id]}
            onToggle={(value) => toggleValue(filter.id, value)}
            onClear={() => clearFilter(filter.id)}
          />
        ))}
      </div>

      <div id="works-archive-list-rows" className="flex flex-col">
        {visibleRows.map((row) => (
          <a
            key={row.name}
            id={`works-archive-list-row-${row.name.toLowerCase()}`}
            href={row.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 py-4 max-[766px]:border-t max-[766px]:border-[#0c0c0c]/10 max-[766px]:first:border-t-0"
          >
            <div className="flex items-center gap-3 flex-1 max-[766px]:flex-col max-[766px]:items-start max-[766px]:gap-1">
              <span className="text-[#000000] text-sm w-37.5 max-[766px]:w-full">
                {row.name}
              </span>
              <span className="text-[#0c0c0c] text-sm w-85 max-[766px]:w-full font-light">
                {row.description}
              </span>
              <span className="text-[#0c0c0c] text-sm w-37.5 max-[766px]:w-full max-[766px]:hidden font-light">
                {row.sector}
              </span>
              <span className="text-[#0c0c0c] text-sm text-center w-20 max-[766px]:hidden font-light">
                {row.year}
              </span>
              <ExpertiseCell expertises={row.expertises} />
            </div>
            <RowArrowIcon className="hidden max-[766px]:block" />
          </a>
        ))}
      </div>
    </div>
  );
}
