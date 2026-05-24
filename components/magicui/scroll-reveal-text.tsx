"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealTextProps {
  text: string
  className?: string
}

export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  })

  const words = text.split(" ")

  return (
    <div ref={containerRef} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

interface WordProps {
  children: string
  progress: any
  range: [number, number]
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const color = useTransform(
    progress,
    range,
    ["rgb(115, 115, 115)", "rgb(255, 255, 255)"]
  )

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] mt-[0.1em] inline-block"
    >
      {children}
    </motion.span>
  )
}
