export const studioDescription =
  "Anagram is a creative studio founded in 2020. We bring together multidisciplinary talents driven by a shared ambition: to craft unique experiences through iteration, creativity, and an eye for detail. Passionate about craft in all its forms, we love pushing the boundaries of design to help our clients' projects grow.";

export const offeringsCategories: {
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

export const clientColumns: string[][] = [
  [
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
  ],
  [
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
  ],
  [
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
  ],
  [
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
  ],
];
