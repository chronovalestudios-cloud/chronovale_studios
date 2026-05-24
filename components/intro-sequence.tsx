'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { AnimatedLotus } from '@/components/ui/dynasty-animations'

interface IntroSequenceProps {
  onComplete?: () => void
}

export function IntroSequence({ onComplete }: IntroSequenceProps = {}) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Skip if already seen this session (optional, but good practice)
    if (typeof window !== 'undefined' && sessionStorage.getItem('cv_intro_seen')) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      sessionStorage.setItem('cv_intro_seen', 'true')
      setIsComplete(true)
      onComplete?.()
      return
    }

    // GSAP animation for the progress counter (0 to 100)
    const progressObj = { val: 0 }
    gsap.to(progressObj, {
      val: 100,
      duration: 4.5, // Increased from 2.8 to 4.5 for a slower, more majestic experience
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.val))
      },
      onComplete: () => {
        // When 100% is reached, do the magical circle clip-path exit animation
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1.5, // Smooth, slow cinematic reveal
            ease: 'power3.inOut',
            onComplete: () => {
              sessionStorage.setItem('cv_intro_seen', 'true')
              setIsComplete(true)
              onComplete?.()
            }
          })
        }
      }
    })

  }, [onComplete])

  if (isComplete) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'var(--warm-black)',
        clipPath: 'circle(150% at 50% 50%)' // Start fully visible covering the screen
      }}
    >
      {/* Center Padma looping animation */}
      <motion.div 
        className="w-32 h-32 md:w-48 md:h-48 text-[var(--amber-ember)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // Slowed rotation from 10s to 20s
      >
        <AnimatedLotus />
      </motion.div>

      {/* Bottom Right Progress Number */}
      <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 flex items-end">
        <span className="font-display text-[var(--white-pure)] text-6xl md:text-8xl lg:text-[140px] leading-none tracking-tighter">
          {progress}
        </span>
        <span className="font-display text-[var(--amber-ember)] text-3xl md:text-5xl lg:text-7xl mb-2 lg:mb-4 ml-2">
          %
        </span>
      </div>
    </div>
  )
}
