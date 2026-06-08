import Image from "next/image";

type Props = {
  avatarSrc: string;
  avatarAlt?: string;
  title: string;
  description: string;
};

export default function PortraitQuote({
  avatarSrc,
  avatarAlt = "",
  title,
  description,
}: Props) {
  return (
    <div className="portraitquote_component aspect-video w-full flex items-center justify-center overflow-hidden">
      <div className="portraitquote_content flex flex-col items-center gap-4 max-w-160 text-center px-6">
        <div className="portraitquote_avatar relative size-15 rounded-full overflow-hidden border border-[rgba(255,255,255,0.2)] shrink-0">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            fill
            sizes="3.75rem"
            className="object-cover"
          />
        </div>
        <p className="text-[#0c0c0c] text-2xl leading-normal">{title}</p>
        <p className="text-[#7C7C7C] text-base leading-normal">{description}</p>
      </div>
    </div>
  );
}
