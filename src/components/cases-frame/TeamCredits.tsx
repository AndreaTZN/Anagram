type Row = {
  role: string;
  names: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  rows: Row[];
};

export default function TeamCredits({
  title = "Team",
  subtitle = "The team behind this project",
  rows,
}: Props) {
  return (
    <div className="teamcredits_component w-full rounded-lg bg-[#0c0c0c] p-10">
      <div className="teamcredits_inner flex flex-col gap-10">

        <div className="teamcredits_header flex flex-col gap-2">
          <p className="text-white text-[2rem] leading-none">{title}</p>
          <p className="text-white text-[0.875rem] leading-normal opacity-50">{subtitle}</p>
        </div>

        <div className="teamcredits_list flex flex-col gap-2">
          {rows.map((row, i) => (
            <div key={i} className="teamcredits_row grid grid-cols-[17rem_1fr]">
              <p className="text-[#828282] text-[0.875rem] leading-normal">{row.role}</p>
              <p className="text-white text-[0.875rem] leading-normal">{row.names}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
