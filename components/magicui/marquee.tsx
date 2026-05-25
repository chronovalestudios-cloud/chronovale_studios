"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  duration?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  duration = 40,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        pauseOnHover && "[&:hover_.marquee-content]:pause",
        className
      )}
    >
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="marquee-content flex shrink-0 [gap:var(--gap)]"
          animate={{
            x: reverse ? ["-100%", "0%"] : ["0%", "-100%"],
          }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  )
}
