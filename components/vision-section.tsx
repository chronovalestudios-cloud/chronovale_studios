'use client'

import { useRef, useEffect } from 'react'
import { SectionLabel } from './ui/section-label'
import { KintsugiLine } from './ui/kintsugi-line'
import { Marquee } from './magicui/marquee'
import { ScrollRevealText } from './magicui/scroll-reveal-text'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const themes = [
  "INTERACTIVE NARRATIVE",
  "◈",
  "CULTURAL HERITAGE",
  "◈",
  "CINEMATIC GAMEPLAY",
  "◈",
  "INDIAN MYTHOLOGY",
  "◈",
  "GLOBAL APPEAL",
  "◈",
  "UNFORGETTABLE STORIES",
  "◈"
]

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vision-fade',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-warm-black"
    >
      <div className="absolute top-0 left-0 right-0 z-20">
        <KintsugiLine />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 pt-16">
        <div className="vision-fade flex flex-col items-center mb-16">
          <SectionLabel>THE VISION</SectionLabel>
        </div>

        <div className="vision-fade max-w-5xl mx-auto text-center mb-24">
          <div className="text-h1 leading-[1.2] font-heading">
            <ScrollRevealText
              text="Stories are the threads that connect generations. Games are the looms that weave them into immortality."
            />
          </div>
        </div>
      </div>

      {/* Marquee Ribbon */}
      <div className="vision-fade w-full py-8 bg-amber-ember text-warm-black mt-20 border-y-2 border-gold -rotate-2 scale-105 origin-center transform-gpu">
        <Marquee className="[--duration:20s]">
          {themes.map((theme, i) => (
            <span key={i} className={`text-xl font-display px-4 ${theme === '◈' ? 'opacity-50 text-sm' : ''}`}>
              {theme}
            </span>
          ))}
        </Marquee>
      </div>
      
      <div className="vision-fade w-full py-4 bg-transparent text-warm-white mt-1 rotate-1 scale-105 origin-center transform-gpu">
        <Marquee className="[--duration:25s]" reverse>
          {themes.map((theme, i) => (
            <span key={i} className={`text-xl font-display px-4 opacity-30 ${theme === '◈' ? 'opacity-20 text-sm' : ''}`}>
              {theme}
            </span>
          ))}
        </Marquee>
      </div>

    </section>
  )
}
