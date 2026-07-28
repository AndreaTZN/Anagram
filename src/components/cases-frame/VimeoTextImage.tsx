"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

type Props = {
  video: { dataSrc: string; dataRatio?: string; src: string; alt?: string };
  title: string;
  description: ReactNode;
  image: { src: string; alt?: string };
  layout?: "video-left" | "text-left";
};

export default function VimeoTextImage({
  video,
  title,
  description,
  image,
  layout = "video-left",
}: Props) {
  const embedRef = useRef<HTMLDivElement>(null);
  useVimeoPlayer({
    embedRef,
    dataSrc: video.dataSrc,
    dataRatio: video.dataRatio,
    title,
  });

  const vl = layout === "video-left";

  return (
    <div className="vimeotextimage_component w-full">
      <div className="vimeotextimage_wrapper aspect-video grid grid-cols-2 grid-rows-2 gap-4 w-full max-[992px]:aspect-auto max-[992px]:flex max-[992px]:flex-col">
        {/* Text — mobile: 1st (DOM order) */}
        <div
          className={`vimeotextimage_text flex flex-col gap-4 md:px-4 md:py-6 overflow-hidden max-[992px]:overflow-visible ${vl ? "col-start-2 row-start-1" : "col-start-1 row-start-1"}`}
        >
          <p className="text-[#0c0c0c] text-[1.125rem] leading-[1.1] tracking-[-0.09px]">
            {title}
          </p>
          <div className="text-[#7c7c7c] text-[0.9375rem] leading-[1.3]">
            {description}
          </div>
        </div>

        {/* Video — mobile: 2nd (DOM order) */}
        <div
          className={`vimeotextimage_video relative overflow-hidden max-[992px]:aspect-(--vt-ratio) ${vl ? "col-start-1 row-start-1 row-span-2" : "col-start-1 row-start-2"}`}
          style={
            { "--vt-ratio": video.dataRatio ?? "16/9" } as React.CSSProperties
          }
        >
          <div
            ref={embedRef}
            data-src={video.dataSrc}
            data-ratio={video.dataRatio}
            className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
          >
            <Image
              src={video.src}
              alt={video.alt ?? ""}
              fill
              loading="lazy"
              sizes="(max-width: 992px) 100vw, 50vw"
              className="projet-card_vimeo-image object-cover z-1 scale-[1.01]"
            />
          </div>
        </div>

        {/* Image — mobile: 3rd (DOM order) */}
        <div
          className={`vimeotextimage_image relative overflow-hidden max-[992px]:aspect-video ${vl ? "col-start-2 row-start-2" : "col-start-2 row-start-1 row-span-2"}`}
        >
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            loading="lazy"
            sizes="(max-width: 992px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
