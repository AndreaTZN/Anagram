import Image from "next/image";

type Props = {
  img1: { src: string; alt?: string };
  img2: { src: string; alt?: string };
};

export default function Frame02({ img1, img2 }: Props) {
  return (
    <div className="frame02_component aspect-video grid grid-cols-2 gap-4 w-full">
      <div className="frame02_card relative overflow-hidden">
        <Image
          src={img1.src}
          alt={img1.alt ?? ""}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="frame02_card relative overflow-hidden">
        <Image
          src={img2.src}
          alt={img2.alt ?? ""}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
