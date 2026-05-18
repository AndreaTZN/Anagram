'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

gsap.registerPlugin(useGSAP)

interface Props {
  name: string
  price: string
  src: string
}

export default function MerchCard({ name, price, src }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const addToBagRef = useRef<HTMLDivElement>(null)
  const addToBagTextRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    gsap.set(addToBagRef.current, { width: 0, paddingLeft: 0, paddingRight: 0 })
    gsap.set(addToBagTextRef.current, { opacity: 0 })
  }, { scope: containerRef })

  function onEnter() {
    gsap.to(addToBagRef.current, { width: 'auto', paddingLeft: '1.625rem', paddingRight: '1.625rem', duration: 0.4, ease: 'power3.out' })
    gsap.to(addToBagTextRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out', delay: 0.15 })
  }

  function onLeave() {
    gsap.to(addToBagTextRef.current, { opacity: 0, duration: 0.15, ease: 'power2.in' })
    gsap.to(addToBagRef.current, { width: 0, paddingLeft: 0, paddingRight: 0, duration: 0.35, ease: 'power3.in', delay: 0.05 })
  }

  return (
    <div
      ref={containerRef}
      className="relative h-112.5 rounded-sm overflow-hidden bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover pointer-events-none"
      />

      <div className="absolute bottom-[1.47rem] left-1/2 -translate-x-1/2 flex items-center w-[calc(100%-3rem)]">
        {/* Name + price pill */}
        <div className="flex-1 min-w-0 flex items-center justify-between px-[1.625rem] py-[1.25rem] rounded-full backdrop-blur-[2.5rem] bg-[rgba(12,12,12,0.2)]">
          <span className="font-medium text-sm leading-[0.9] text-white opacity-50 whitespace-nowrap">{name}</span>
          <span className="font-medium text-sm leading-[0.9] text-white whitespace-nowrap">{price}</span>
        </div>

        {/* Add to bag pill */}
        <div
          ref={addToBagRef}
          className="shrink-0 overflow-hidden flex items-center justify-center py-[1.25rem] rounded-full backdrop-blur-[2.5rem] bg-white ml-1"
        >
          <p
            ref={addToBagTextRef}
            className="font-medium text-sm leading-[0.9] text-[#0c0c0c] whitespace-nowrap"
          >
            Add to bag
          </p>
        </div>
      </div>
    </div>
  )
}
