import Image from "next/image";

type Props = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  bgColor?: string;
  imagePosition?: "left" | "right";
};

export default function SplitTextImage({
  title,
  description,
  imageSrc,
  imageAlt = "",
  bgColor = "#f3f0ed",
  imagePosition = "right",
}: Props) {
  const textBlock = (
    <div className="splittextimage_text flex flex-col gap-4 justify-center px-10 py-10 w-[42%] max-[992px]:w-full max-[992px]:px-6 max-[992px]:pt-8 max-[992px]:pb-0 max-[992px]:order-2 shrink-0">
      <p className="text-[#0c0c0c] text-[2.5rem] leading-[1.35]">{title}</p>
      <p className="text-[#0c0c0c] text-base leading-normal">{description}</p>
    </div>
  );

  const imageBlock = (
    <div className="splittextimage_image relative flex-1 self-stretch max-[992px]:w-full max-[992px]:aspect-square max-[992px]:flex-none max-[992px]:order-1">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 992px) 100vw, 58vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <div
      className="splittextimage_component aspect-video w-full overflow-hidden flex max-[992px]:aspect-auto max-[992px]:flex-col max-[992px]:pb-8"
      style={{ backgroundColor: bgColor }}
    >
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
