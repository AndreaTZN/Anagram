type Props = {
  eyebrow: string;
  heading: string;
};

export default function SectionHeader({ eyebrow, heading }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-6 max-[766px]:flex-col max-[766px]:gap-2">
      <span className="text-[#7e7e7e] text-sm leading-[0.9] shrink-0">
        {eyebrow}
      </span>
      <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.02em] text-right max-[766px]:text-left">
        {heading}
      </h2>
    </div>
  );
}
