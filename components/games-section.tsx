'use client'

import { SectionLabel } from './ui/section-label'
import { BlurText } from './ui/blur-text'
import { Particles } from './ui/particles'
import { GodRays } from './ui/god-rays'

export function GamesSection() {
  return (
    <section
      id="games"
      className="relative min-h-screen overflow-hidden bg-bg-deep flex flex-col justify-center items-center py-24"
    >
      {/* Cinematic Background Animations */}
      <GodRays className="opacity-30" />
      <Particles quantity={100} color="#FF6B00" className="opacity-60" />

      <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-30" />

      {/* Header */}
      <div className="text-center mb-16 px-6 relative z-20">
        <SectionLabel>OUR GAMES</SectionLabel>
        <h2 className="text-h1 text-warm-white">
          Worlds in <span className="text-[var(--gold)]">Progress</span>
        </h2>
      </div>

      {/* Text Content */}
      <div className="relative z-30 flex flex-col items-center justify-center gap-8 px-6 md:px-16 text-center max-w-4xl mx-auto mt-12">
        <div className="text-3xl md:text-5xl lg:text-6xl font-display text-[var(--warm-white)] leading-[1.2]">
          <BlurText 
            text="A NEW CHAPTER IN INTERACTIVE NARRATIVE IS COMING..." 
            delay={0.1} 
            className="justify-center"
          />
        </div>

        <div className="text-base md:text-xl text-[var(--text-secondary)] font-sans max-w-2xl mt-4">
          <BlurText 
            text="Follow us on social media to stay updated on our latest projects and announcements." 
            delay={0.4} 
            className="justify-center"
          />
        </div>
      </div>

    </section>
  )
}
