"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  continuous?: boolean
  delay?: number
}

export function GlitchText({ 
  text, 
  className = "", 
  glitchOnHover = false,
  continuous = false,
  delay = 0 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    if (continuous) {
      const startGlitch = () => {
        setIsGlitching(true)
        let iteration = 0
        
        intervalRef.current = setInterval(() => {
          setDisplayText(
            text
              .split("")
              .map((char, index) => {
                if (index < iteration) return text[index]
                if (char === " ") return " "
                return glitchChars[Math.floor(Math.random() * glitchChars.length)]
              })
              .join("")
          )
          
          iteration += 1/3
          
          if (iteration >= text.length) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setDisplayText(text)
            setIsGlitching(false)
          }
        }, 30)
      }

      const timeoutId = setTimeout(startGlitch, delay)
      return () => {
        clearTimeout(timeoutId)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [text, continuous, delay])

  const handleMouseEnter = () => {
    if (!glitchOnHover || isGlitching) return
    
    setIsGlitching(true)
    let iteration = 0
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index]
            if (char === " ") return " "
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join("")
      )
      
      iteration += 1/2
      
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, 30)
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-primary opacity-80 z-0"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              opacity: [0.8, 0.5, 0.8, 0.5, 0.8],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
            aria-hidden
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-secondary opacity-80 z-0"
            animate={{
              x: [0, 2, -2, 1, -1, 0],
              opacity: [0.8, 0.5, 0.8, 0.5, 0.8],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
            aria-hidden
          >
            {displayText}
          </motion.span>
        </>
      )}
    </motion.span>
  )
}

// Typewriter effect with glitch
export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  onComplete,
}: {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const charTimeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
        return () => clearTimeout(charTimeout)
      } else {
        onComplete?.()
      }
    }, delay)
    
    return () => clearTimeout(startTimeout)
  }, [currentIndex, text, speed, delay, onComplete])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-[2px] h-[1em] bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`} />
    </span>
  )
}

// Scramble text on scroll
export function ScrambleText({
  text,
  className = "",
  triggerOnView = true,
}: {
  text: string
  className?: string
  triggerOnView?: boolean
}) {
  const [displayText, setDisplayText] = useState(text.split("").map(() => " ").join(""))
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  useEffect(() => {
    if (!triggerOnView) {
      scramble()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          scramble()
          setHasAnimated(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggerOnView, hasAnimated])

  const scramble = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index]
            if (char === " ") return " "
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )
      iteration += 1/3
      if (iteration >= text.length) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, 30)
  }

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  )
}
