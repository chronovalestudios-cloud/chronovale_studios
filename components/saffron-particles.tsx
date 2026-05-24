'use client'

import { useMemo, useCallback } from 'react'
import Particles, { ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions, Engine } from '@tsparticles/engine'

/* ══════════════════════════════════════════════════════════════════════════════
   §3.6 — Saffron + Gold particle system (design.md)
   v4 API: ParticlesProvider wraps; useParticlesProvider().loaded gates render.
   Colors: saffron (#FF6B00), gold (#C9A84C), marigold (#FFA500)
   50 desktop / 20 mobile, upward drift, no connections
   ══════════════════════════════════════════════════════════════════════════════ */

/* Register the slim preset once (called by ParticlesProvider) */
async function registerPlugins(engine: Engine) {
  await loadSlim(engine)
}

/* Inner — renders only when engine is loaded */
function ParticlesInner({
  className,
  options,
}: {
  className?: string
  options: ISourceOptions
}) {
  const { loaded } = useParticlesProvider()
  if (!loaded) return null

  return (
    <Particles
      id="saffron-particles"
      className={className}
      options={options}
    />
  )
}

interface SaffronParticlesProps {
  className?: string
}

export function SaffronParticles({ className }: SaffronParticlesProps) {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen:  { enable: false },     /* contain within parent, not full viewport */
      background:  { color: { value: 'transparent' } },
      fpsLimit:    60,
      particles: {
        color: {
          value: ['#FF6B00', '#C9A84C', '#FFA500'], /* saffron, gold, marigold — design.md §1 only */
        },
        move: {
          enable:    true,
          speed:     0.5,
          direction: 'top' as const,        /* drift upward */
          random:    true,
          straight:  false,
          drift:     0.4,                   /* gentle horizontal wander */
          outModes:  { default: 'out' as const },
        },
        number: {
          density: { enable: true, width: 1920, height: 1080 },
          value:   55,
        },
        opacity: {
          value: { min: 0.05, max: 0.55 },
          animation: { enable: true, speed: 0.3, sync: false },
        },
        shape: { type: 'circle' },
        size:  { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
      /* Mobile: 20 particles for performance */
      responsive: [
        {
          maxWidth: 640,
          options:  { particles: { number: { value: 20 } } },
        },
      ],
    }),
    []
  )

  return (
    <ParticlesProvider init={registerPlugins}>
      <ParticlesInner className={className} options={options} />
    </ParticlesProvider>
  )
}
