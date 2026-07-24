import Image from "next/image";

type Props = {
  idPrefix: string;
  image: { src: string; alt: string };
  title: string;
  industry?: string;
  description: string;
  metrics: string[];
};

export default function CaseHighlightCard({
  idPrefix,
  image,
  title,
  industry,
  description,
  metrics,
}: Props) {
  return (
    <article
      id={idPrefix}
      className="flex gap-6 items-start max-[766px]:flex-col"
    >
      <div className="relative w-58.75 aspect-235/183 overflow-hidden rounded-lg shrink-0 max-[766px]:w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#0c0c0c] text-xl leading-[1.1] tracking-[-0.01em]">
            {title}
          </h3>
          {industry && (
            <p className="text-[#7e7e7e] text-sm leading-[1.3]">{industry}</p>
          )}
        </div>
        <p className="text-[#7e7e7e] text-sm leading-[1.4]">{description}</p>
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="rounded-full bg-[#f5f5f5] text-[#0c0c0c] text-xs leading-[1.1] px-3 py-2"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
