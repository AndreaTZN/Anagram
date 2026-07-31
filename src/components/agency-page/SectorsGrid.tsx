import SectionHeader from "./SectionHeader";

type SectorItem = {
  id: string;
  name: string;
  description: string;
  href?: string;
};

type Props = {
  idPrefix: string;
  eyebrow: string;
  heading: string;
  items: SectorItem[];
};

export default function SectorsGrid({
  idPrefix,
  eyebrow,
  heading,
  items,
}: Props) {
  return (
    <section id={idPrefix} className="flex flex-col gap-8">
      <SectionHeader eyebrow={eyebrow} heading={heading} />
      <div className="flex flex-col pl-8 max-[766px]:pl-0">
        {items.map((item) => {
          const Title = item.href ? "a" : "span";
          return (
            <div
              key={item.id}
              id={`${idPrefix}-${item.id}`}
              className="flex flex-col gap-2 py-6 border-t border-[#0c0c0c]/10 first:border-t-0 first:pt-0"
            >
              <h3 className="text-[#0c0c0c] text-base leading-[1.1] w-fit">
                <Title
                  {...(item.href
                    ? {
                        href: item.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="flex items-center gap-2"
                >
                  {item.name}
                  {item.href && <span aria-hidden>↗</span>}
                </Title>
              </h3>
              <p className="text-[#7e7e7e] text-sm leading-[1.4] max-w-xl">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
