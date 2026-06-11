import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function Frame01({ src, alt = "", priority = false }: Props) {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" />
    </div>
  );
}
