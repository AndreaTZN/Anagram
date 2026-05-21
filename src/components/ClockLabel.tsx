'use client'

import { useEffect, useState } from 'react'

interface Props {
  city: string
  timezone: string
  offsetLabel: string
}

function getFormattedTime(timezone: string) {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  })
}

export default function ClockLabel({ city, timezone, offsetLabel }: Props) {
  const [time, setTime] = useState(() => getFormattedTime(timezone))

  useEffect(() => {
    const id = setInterval(() => setTime(getFormattedTime(timezone)), 1000)
    return () => clearInterval(id)
  }, [timezone])

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-full  w-full gap-2">
      <span className="text-[#0c0c0c] text-sm font-medium leading-[0.9] opacity-50 uppercase">
        {city}
      </span>
      <span className="text-[#0c0c0c] text-sm font-medium leading-[0.9] whitespace-nowrap">
        {offsetLabel} {time}
      </span>
    </div>
  )
}
