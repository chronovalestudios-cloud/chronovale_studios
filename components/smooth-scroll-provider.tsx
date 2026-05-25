'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  // Sync Lenis scroll with GSAP ScrollTrigger
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    // Disable lag smoothing for perfect sync with ScrollTrigger
    gsap.ticker.lagSmoothing(0)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        e.preventDefault()
        lenisRef.current?.lenis?.scrollTo(anchor.hash, { 
          offset: -50, 
          duration: 4.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      }
    }

    document.documentElement.addEventListener('click', handleAnchorClick)

    return () => {
      gsap.ticker.remove(update)
      document.documentElement.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false, // Let GSAP ticker drive the RAF loop for perfect sync
        lerp: 0.08, // Adjust lerp for buttery smoothness (0.05 - 0.1 is usually best)
        duration: 1.2, // Keep a comfortable base duration
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
