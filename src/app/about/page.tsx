'use client'

import AnalogClock from '@/components/AnalogClock'
import ClockLabel from '@/components/ClockLabel'

const imgHero = 'http://localhost:3845/assets/02f7ca9d6fef634bc1c963882e269c337f5bae9e.png'

function DotDivider() {
  return (
    <div className="flex items-center justify-between w-full">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="bg-[#0c0c0c] opacity-30 rounded-full shrink-0 size-[1.5px]" />
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="flex gap-6 min-h-screen bg-white">
      {/* Left — hero image */}
      <div className="relative bg-[#f4f4f4] rounded-sm overflow-hidden w-[46%] shrink-0 flex-none self-start" style={{ aspectRatio: '855 / 890' }}>
        <img
          src={imgHero}
          alt="Anagram studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Slide indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-2 rounded-full backdrop-blur-xl bg-[rgba(12,12,12,0.2)]">
          <div className="bg-white rounded-full h-1.25 w-5.25 shrink-0" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white opacity-30 rounded-full shrink-0 size-1.25" />
          ))}
        </div>
      </div>

      {/* Right — content */}
      <div className="flex flex-col gap-8 flex-1 py-4">

        {/* Manifesto text */}
        <p className="text-[#0c0c0c] text-[2rem] leading-[1.1] tracking-[-0.03125rem]">
          <span className="uppercase">anagram</span>
          {` was founded on the ambition to help companies define a distinct position and express it with clarity, relevance, and impact.`}
          <br /><br />
          Through a balance of strategic thinking and refined design, we build identities that resonate, differentiate, and endure in an increasingly complex landscape.
        </p>

        <DotDivider />

        {/* Clocks */}
        <div className="flex gap-8">
          {/* New York */}
          <div className="flex flex-col items-center gap-4">
            <AnalogClock timezone="America/New_York" color="#03c8ff" />
            <ClockLabel city="NEW YORK" timezone="America/New_York" offsetLabel="GMT-4" />
          </div>

          {/* Paris */}
          <div className="flex flex-col items-center gap-4">
            <AnalogClock timezone="Europe/Paris" color="#e3cefc" />
            <ClockLabel city="PARIS" timezone="Europe/Paris" offsetLabel="CEST" />
          </div>
        </div>

        <DotDivider />

        {/* Our studio */}
        <div className="flex gap-6">
          <h2 className="text-[#0c0c0c] text-2xl leading-[1.1] tracking-[-0.0075rem] shrink-0 w-40">
            Our studio
          </h2>
          <p className="text-[#7e7e7e] text-sm leading-[1.3] flex-1">
            Anagram is a creative studio founded in 2020. We bring together multidisciplinary talents driven by a shared ambition: to craft unique experiences through iteration, creativity, and an eye for detail. Passionate about craft in all its forms, we love pushing the boundaries of design to help our clients&apos; projects grow.
          </p>
        </div>

      </div>
    </main>
  )
}
