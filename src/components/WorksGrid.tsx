'use client'

import { useState } from 'react'
import MerchCard from './MerchCard'
import ToolCard from './ToolCard'

type Work = {
  name: string
  description?: string
  price?: string
  badge?: string
  externalLink?: string
  tag?: string
  media: {
    type: 'image' | 'video'
    src: string
    aspect: string
    bg?: string
  }
}

const works: Work[] = [
  {
    name: 'Matis',
    tag: 'All',
    description: 'The art market is shaped by networks, timing, and a body of implicit knowledge. It remains largely accessible to those who know how to navigate its subtleties and grasp the mechanisms that drive value. Matis operates within this reality, not aiming to disrupt it, but rather to integrate seamlessly into it.',
    media: { type: 'image', src: '/works/matis/1.jpg', aspect: 'aspect-[1/1.1]' },
  },
  {
    name: 'Incard',
    tag: 'All',
    description: 'Wastetide reframes waste as untapped value.\nBuilt on the belief that nothing is truly discarded,',
    media: { type: 'image', src: '/works/incard/1.jpg', aspect: 'aspect-[1581/1799]' },
  },
  {
    name: 'Wastetide',
    tag: 'Coming project',
    description: 'Wastetide reframes waste as untapped value. Built on the belief that nothing is truly discarded, the brand positions industrial waste as a resource. A hidden asset waiting to be captured, optimized, and monetized.',
    badge: 'Coming soon',
    media: { type: 'image', src: '/works/wastetide/1.jpg', aspect: 'aspect-[582/351]' },
  },
  {
    name: 'Symbl',
    tag: 'Tools',
    description: 'Test your logo before the world does.\nDesigners are already using it',
    externalLink: 'https://www.symbl.space/',
    media: { type: 'image', src: '/works/symbl/1.jpg', aspect: 'aspect-[432/324]', bg: '#f5f5f5' },
  },
  {
    name: 'Casquette Anagram',
    tag: 'Merch',
    price: '$30.00',
    media: { type: 'image', src: '/works/anagram/casquette.jpg', aspect: 'aspect-[1/1.45]', bg: '#f5f5f5' },
  },
  {
    name: 'Omnia',
    tag: 'All',
    description: 'Position Arcads as a new standard for AI-powered advertising. The challenge was to clarify a complex and emerging offering, helping brands understand they can create high-performing ads using AI-generated talent.',
    media: { type: 'image', src: '/works/Omnia/1.jpg', aspect: 'aspect-video' },
  },
  {
    name: 'Bitstack',
    tag: 'All',
    description: 'Redefine industrial automation through real-time vision-guided robotics. Inbolt enables robots to see.',
    media: { type: 'image', src: '/works/bitstack/1.jpg', aspect: 'aspect-[3/4]' },
  },
  {
    name: 'Geobrowser',
    tag: 'All',
    description: 'Redefine industrial automation through real-time vision-guided robotics. Inbolt enables robots to see, think and adapt in real time, removing the need.',
    media: { type: 'video', src: '/_videos/v1/e8a6ffb8d332a22fa8980945cc71432aefb4ba6a', aspect: 'aspect-[16/9]' },
  },
]

const FILTERS = ['All', 'Merch', 'News', 'Coming project', 'Tools']

function WorkCard({ work }: { work: Work }) {
  if (work.tag === 'Merch' && work.price) {
    return <MerchCard name={work.name} price={work.price} src={work.media.src} />
  }

  if (work.tag === 'Tools') {
    return <ToolCard name={work.name} description={work.description} src={work.media.src} href={work.externalLink} aspect={work.media.aspect} />
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative ${work.media.aspect} rounded-sm overflow-hidden w-full`}
        style={{ backgroundColor: work.media.bg }}
      >
        {work.media.type === 'image' ? (
          <img
            src={work.media.src}
            alt={work.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video autoPlay loop playsInline muted className="absolute inset-0 w-full h-full object-cover">
            <source src={work.media.src} />
          </video>
        )}
        {work.badge && (
          <div className="absolute top-5 left-5 flex items-center justify-center px-4 py-3 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)]">
            <span className="text-white leading-[0.8] whitespace-nowrap text-base">{work.badge}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#0c0c0c] font-medium leading-[0.9] text-base">{work.name}</span>
          {work.price && <span className="text-[#7e7e7e] leading-[1.3] text-base">{work.price}</span>}
          {work.externalLink && (
            <a href={work.externalLink} target="_blank" rel="noopener noreferrer" className="text-[#0c0c0c] leading-[0.9] text-base">
              Try now ↗
            </a>
          )}
        </div>
        {work.description && (
          <p className="text-[#7e7e7e] leading-[1.3] text-base">{work.description}</p>
        )}
      </div>
    </div>
  )
}

export default function WorksGrid() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? works : works.filter(w => w.tag === activeFilter)

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center gap-4 justify-end">
        <span className="text-[#7e7e7e] text-base leading-[0.8]">Filters</span>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-4 rounded-full text-base leading-[0.8] cursor-pointer transition-colors ${
                activeFilter === filter
                  ? 'bg-[#0c0c0c] text-white'
                  : 'bg-[#f5f5f5] text-[#0c0c0c]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4 items-start">
        {filtered.map(work => (
          <WorkCard key={work.name} work={work} />
        ))}
      </div>
    </div>
  )
}
