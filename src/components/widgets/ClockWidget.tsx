'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnalogClock from '../AnalogClock'

gsap.registerPlugin(useGSAP)

const CITIES = [
  { label: 'New York', timezone: 'America/New_York', color: '#f981fe' },
  { label: 'Paris', timezone: 'Europe/Paris', color: '#f981fe' },
]

function getOffset(timezone: string) {
  const now = new Date()
  const diff = (new Date(now.toLocaleString('en-US', { timeZone: timezone })).getTime() - new Date(now.toLocaleString('en-US', { timeZone: 'UTC' })).getTime()) / 3600000
  const sign = diff >= 0 ? '+' : '-'
  const abs = Math.abs(diff)
  return `GMT${sign}${abs % 1 === 0 ? abs : abs.toFixed(1)}`
}

function getTime(timezone: string) {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  }).replace(' ', '')
}

export default function ClockWidget() {
  const [active, setActive] = useState(0)
  const [times, setTimes] = useState<string[]>([])
  const [offsets, setOffsets] = useState<string[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function tick() {
      setTimes(CITIES.map(c => getTime(c.timezone)))
      setOffsets(CITIES.map(c => getOffset(c.timezone)))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  function goTo(i: number) {
    if (i === active) return
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActive(i)
        gsap.to(contentRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      },
    })
  }

  const city = CITIES[active]

  return (
    <div className="flex flex-col items-center rounded-[0.5rem] bg-[#f5f5f5] pt-4 px-4 overflow-hidden">
      <div ref={contentRef}>
        <AnalogClock timezone={city.timezone} color={city.color} />
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2 mt-4">
        {CITIES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={[
              'rounded-full bg-[#0c0c0c] transition-none cursor-pointer',
              i === active ? 'w-5.25 h-1.25' : 'w-1.25 h-1.25 opacity-30',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-2 px-4 py-3 mt-4 w-full rounded-full backdrop-blur-[2.5rem]">
        <span className="text-base font-medium leading-[0.9] text-[#0c0c0c] opacity-50 uppercase tracking-wide whitespace-nowrap">
          {city.label}
        </span>
        <span className="text-base font-medium leading-[0.9] text-[#0c0c0c] whitespace-nowrap">
          {offsets[active] ?? ''} {times[active] ?? ''}
        </span>
      </div>
    </div>
  )
}
