"use client";

import Image from "next/image";
import { useRef } from "react";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

type Props = {
  dataSrc: string;
  dataRatio?: string;
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function Vimeo169({ dataSrc, dataRatio, src, alt = "", priority = false }: Props) {
  const embedRef = useRef<HTMLDivElement>(null);

  useVimeoPlayer({ embedRef, dataSrc, dataRatio, title: alt });

  return (
    <div className="framevideo16-9_component overflow-hidden">
      <div className="framevideo16-9_container relative">
        <div className="framevideo16-9_wrapper aspect-video relative">
          <div
            ref={embedRef}
            data-src={dataSrc}
            data-ratio={dataRatio}
            className="projet-card_embed-vimeo-contain relative w-full h-full overflow-hidden"
          >
            <Image
              src={src}
              alt={alt}
              fill
              loading={priority ? undefined : "lazy"}
              priority={priority}
              sizes="100vw"
              className="projet-card_vimeo-image object-cover z-1 scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
