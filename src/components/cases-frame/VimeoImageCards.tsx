"use client";

import Image from "next/image";
import { useRef } from "react";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

type Props = {
  video: {
    dataSrc: string;
    dataRatio?: string;
    src: string;
    alt?: string;
  };
  image: {
    src: string;
    alt?: string;
  };
  imagePosition?: "left" | "right";
};

export default function VimeoImageCards({ video, image, imagePosition = "right" }: Props) {
  const embedRef = useRef<HTMLDivElement>(null);

  useVimeoPlayer({ embedRef, dataSrc: video.dataSrc, dataRatio: video.dataRatio });

  return (
    <div className="vimeo-image-cards_component">
      <div className="vimeo-image-cards_container relative">
        <div className="vimeo-image-cards_wrapper aspect-video max-[992px]:aspect-auto grid grid-cols-2 max-[992px]:flex max-[992px]:flex-col gap-4 w-full relative overflow-hidden z-4">
          {imagePosition === "left" && (
            <div className="vimeo-image-cards_card w-full h-full max-[992px]:h-auto max-[992px]:aspect-video relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          )}
          <div className="vimeo-image-cards_card w-full h-full max-[992px]:h-auto max-[992px]:aspect-video relative overflow-hidden">
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
                className="projet-card_vimeo-image object-cover z-1 scale-[1.01]"
              />
            </div>
          </div>
          {imagePosition === "right" && (
            <div className="vimeo-image-cards_card w-full h-full max-[992px]:h-auto max-[992px]:aspect-video relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
