import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

export default function Frame01({ src, alt = "" }: Props) {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
