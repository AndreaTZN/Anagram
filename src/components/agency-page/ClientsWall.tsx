import SectionHeader from "./SectionHeader";

type Props = {
  idPrefix: string;
  eyebrow: string;
  heading: string;
  columns: string[][];
};

export default function ClientsWall({
  idPrefix,
  eyebrow,
  heading,
  columns,
}: Props) {
  return (
    <section id={idPrefix} className="flex flex-col gap-8">
      <SectionHeader eyebrow={eyebrow} heading={heading} />
      <div className="grid grid-cols-4 gap-4 max-[766px]:grid-cols-2 pl-8 max-[766px]:pl-0">
        {columns.map((column, i) => (
          <div key={i} className="flex flex-col gap-3">
            {column.map((name) => (
              <span key={name} className="text-[#7e7e7e] text-sm leading-[1.3]">
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
