import Image from "next/image";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  logo1: { src: string; alt?: string };
  logo2: { src: string; alt?: string };
  stats: Stat[];
};

export default function CaseStats({ logo1, logo2, stats }: Props) {
  return (
    <div className="casestats_component relative aspect-video w-full overflow-hidden bg-[#0c0c0c] flex flex-col items-center justify-center max-[992px]:aspect-auto max-[992px]:py-16 max-[992px]:gap-12">

      <div className="casestats_logo absolute top-28 flex items-center gap-3 max-[992px]:static">
        <Image
          src={logo1.src}
          alt={logo1.alt ?? ""}
          width={120}
          height={32}
          className="max-h-25 w-auto object-contain"
        />
        <span className="text-white text-[0.75rem]">×</span>
        <Image
          src={logo2.src}
          alt={logo2.alt ?? ""}
          width={120}
          height={32}
          className="max-h-25 w-auto object-contain"
        />
      </div>

      <div className="casestats_stats flex items-start justify-center gap-6 w-full px-10 max-[992px]:flex-col max-[992px]:items-center max-[992px]:gap-10 max-[992px]:px-6">
        {stats.map((stat, i) => (
          <div key={i} className="casestats_stat flex flex-col items-center gap-4 w-65">
            <p className="text-white text-[4.5rem] max-[992px]:text-[3rem] leading-none text-center">{stat.value}</p>
            <p className="text-white text-base leading-normal text-center">{stat.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
