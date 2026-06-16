import Image from "next/image";

type Props = {
  avatarSrc: string;
  avatarAlt?: string;
  title?: string;
  description: string;
};

export default function PortraitQuote({
  avatarSrc,
  avatarAlt = "",
  title,
  description,
}: Props) {
  return (
    <div className="portraitquote_component aspect-video w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      <div className="portraitquote_content flex flex-col items-center gap-4 max-w-160 text-center px-6">
        <div className="portraitquote_avatar size-15 rounded-full overflow-hidden shrink-0">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={0}
            height={0}
            sizes="100%"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {title && (
          <p className="text-[#ffffff] text-2xl leading-normal">{title}</p>
        )}
        <p className="text-[#ffffff] text-base leading-normal">{description}</p>
      </div>
    </div>
  );
}
