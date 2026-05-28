import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

export default function Frame01({ src, alt = "" }: Props) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
