type Props = {
  eyebrow: string;
  heading: string;
};

export default function SectionHeader({ eyebrow, heading }: Props) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="text-[#7e7e7e] text-sm leading-[0.9] shrink-0">
        {eyebrow}
      </span>
      <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.02em] text-left pl-8 mt-6 max-[766px]:pl-0 max-[766px]:mt-4">
        {heading}
      </h2>
    </div>
  );
}
