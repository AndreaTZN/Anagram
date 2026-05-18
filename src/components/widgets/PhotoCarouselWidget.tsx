'use client'

import { useState } from 'react'

const photos = [
  'http://localhost:3845/assets/8619f96765e45f3529b77f897edccf52a5fb6239.png',
]

export default function PhotoCarouselWidget() {
  const [active, setActive] = useState(0)
  const total = 6

  return (
    <div className="relative w-full h-full rounded-[0.5rem] overflow-hidden bg-[#d9d9d9]">
      <img
        src={photos[0]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-[0.65rem] left-1/2 -translate-x-1/2 flex items-center gap-[0.5rem] px-[0.5rem] py-[0.5rem] rounded-full backdrop-blur-[2.5rem] bg-[rgba(12,12,12,0.2)]">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={[
              'rounded-full bg-white transition-none',
              i === active ? 'w-[1.3125rem] h-[0.3125rem]' : 'w-[0.3125rem] h-[0.3125rem] opacity-30',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
