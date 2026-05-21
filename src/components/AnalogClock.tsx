'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  timezone: string
  color: string
}

function getAngles(timezone: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: timezone,
  }).formatToParts(now)

  const h = parseInt(parts.find(p => p.type === 'hour')!.value)
  const m = parseInt(parts.find(p => p.type === 'minute')!.value)
  const s = parseInt(parts.find(p => p.type === 'second')!.value)

  return {
    hour: (h % 12) * 30 + m * 0.5,
    minute: m * 6 + s * 0.1,
    second: s * 6,
  }
}

export default function AnalogClock({ timezone, color }: Props) {
  const hourRef = useRef<SVGLineElement>(null)
  const minuteRef = useRef<SVGLineElement>(null)
  const secondRef = useRef<SVGLineElement>(null)
  const cumulativeSecond = useRef<number | null>(null)

  useEffect(() => {
    function tick() {
      const { hour, minute, second } = getAngles(timezone)
      if (hourRef.current) gsap.set(hourRef.current, { rotation: hour, transformOrigin: '50% 100%' })
      if (minuteRef.current) gsap.set(minuteRef.current, { rotation: minute, transformOrigin: '50% 100%' })
      if (secondRef.current) {
        if (cumulativeSecond.current === null) {
          cumulativeSecond.current = second
        } else {
          let delta = second - (cumulativeSecond.current % 360)
          if (delta < 0) delta += 360
          cumulativeSecond.current += delta
        }
        gsap.to(secondRef.current, { rotation: cumulativeSecond.current, svgOrigin: '80 80', duration: 0.15, ease: 'back.out(2)' })
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timezone])

  const size = 160
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 2

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} suppressHydrationWarning>
      <circle cx={cx} cy={cy} r={r} fill={color} />
      {hourNumbers.map((n, i) => {
        const angle = ((i * 30) - 90) * (Math.PI / 180)
        const nr = r - 14
        const x = cx + nr * Math.cos(angle)
        const y = cy + nr * Math.sin(angle)
        return (
          <text
            key={n}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            fontFamily="Aeonik, sans-serif"
            fill="#0c0c0c"
            suppressHydrationWarning
          >
            {n}
          </text>
        )
      })}
      <line
        ref={hourRef}
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r * 0.52}
        stroke="#0c0c0c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        ref={minuteRef}
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r * 0.68}
        stroke="#0c0c0c"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        ref={secondRef}
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r * 0.78}
        stroke="#0c0c0c"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="3" fill="#0c0c0c" />
    </svg>
  )
}
