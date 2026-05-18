'use client'

import Image from 'next/image'

interface Props {
  name: string
  description?: string
  src: string
  href?: string
  aspect: string
}

export default function ToolCard({ name, description, src, href, aspect }: Props) {
  return (
    <div className={`relative ${aspect} rounded-sm overflow-hidden `}>
      {/* Try now button */}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-10 flex items-center px-4 py-4 rounded-full bg-[#1c1c1c]"
        >
          <span className="text-base leading-[0.8] text-white whitespace-nowrap">Try now ↗</span>
        </a>
      )}

      {/* Logo centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image src={src} alt={name} fill className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name + description bottom left */}
      <div className="absolute bottom-0 left-0 p-4 flex flex-col gap-2">
        <span className="font-medium text-base leading-[0.9] text-white">{name}</span>
        {description && (
          <p className="text-base leading-[1.3] text-[#7e7e7e] whitespace-pre-line">{description}</p>
        )}
      </div>
    </div>
  )
}
