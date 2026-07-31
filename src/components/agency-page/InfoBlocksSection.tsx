import SectionHeader from "./SectionHeader";

type Block = {
  id: string;
  title?: string;
  quote?: string;
  description: string;
};

type Props = {
  idPrefix: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  blocks: Block[];
};

export default function InfoBlocksSection({
  idPrefix,
  eyebrow,
  heading,
  intro,
  blocks,
}: Props) {
  return (
    <section id={idPrefix} className="flex flex-col gap-8">
      <SectionHeader eyebrow={eyebrow} heading={heading} />
      {intro && (
        <p className="text-[#7e7e7e] text-sm leading-[1.4] max-w-xl">
          {intro}
        </p>
      )}
      <div className="flex flex-col gap-8 pl-8 max-[766px]:pl-0">
        {blocks.map((block) => (
          <div
            key={block.id}
            id={`${idPrefix}-${block.id}`}
            className="flex flex-col gap-2"
          >
            {block.title && (
              <h3 className="text-[#0c0c0c] text-base leading-[1.2]">
                {block.title}
              </h3>
            )}
            {block.quote && (
              <p className="text-[#0c0c0c] text-[1rem] font-medium leading-[1.2]">
                &ldquo;{block.quote}&rdquo;
              </p>
            )}
            <p className="text-[#7e7e7e] text-sm leading-[1.4]">
              {block.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
