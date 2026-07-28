"use client";

import Image from "next/image";
import { useRef } from "react";
import { useVimeoPlayer } from "@/hooks/useVimeoPlayer";

type CardProps = {
  dataSrc: string;
  dataRatio?: string;
  src: string;
  alt?: string;
};

type Props = {
  card1: CardProps;
  card2: CardProps;
};

export default function VimeoTwoCards({ card1, card2 }: Props) {
  const embedRef1 = useRef<HTMLDivElement>(null);
  const embedRef2 = useRef<HTMLDivElement>(null);

  useVimeoPlayer({ embedRef: embedRef1, dataSrc: card1.dataSrc, dataRatio: card1.dataRatio, title: card1.alt });
  useVimeoPlayer({ embedRef: embedRef2, dataSrc: card2.dataSrc, dataRatio: card2.dataRatio, title: card2.alt });

  return (
    <div className="video-vimeo-two_component">
      <div className="video-vimeo-two_container relative">
        <div className="video-vimeo-two_wrapper aspect-video grid grid-cols-2 gap-4 w-full relative overflow-hidden z-4">
          {[
            { ref: embedRef1, card: card1 },
            { ref: embedRef2, card: card2 },
          ].map(({ ref, card }, i) => (
            <div key={i} className="video-vimeo-two_card w-full h-full relative overflow-hidden">
              <div
                ref={ref}
                data-src={card.dataSrc}
                data-ratio={card.dataRatio}
                className="video-vimeo-two_embed-contain relative w-full h-full overflow-hidden"
              >
                <Image
                  src={card.src}
                  alt={card.alt ?? ""}
                  fill
                  loading="lazy"
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className="video-vimeo-two_image object-cover z-1 scale-[1.01]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
