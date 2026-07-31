type Stat = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  idPrefix: string;
  stats: Stat[];
};

export default function StatsRow({ idPrefix, stats }: Props) {
  return (
    <div id={idPrefix} className="flex flex-col">
      {stats.map((stat) => (
        <div
          key={stat.id}
          id={`${idPrefix}-${stat.id}`}
          className="flex items-center justify-between gap-6 py-6 border-t border-[#0c0c0c]/10 first:border-t-0 first:pt-0 max-[766px]:flex-col max-[766px]:items-start max-[766px]:gap-2"
        >
          <p className="text-[#0c0c0c] text-6xl leading-none tracking-[-0.02em]">
            {stat.value}
          </p>
          <p className="text-[#7e7e7e] text-sm leading-[1.3]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
