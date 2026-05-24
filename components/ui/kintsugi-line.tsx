"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"

export function KintsugiLine({ className }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className={`w-full h-8 relative overflow-hidden ${className || ""}`}>
      <svg 
        viewBox="0 0 1200 24" 
        preserveAspectRatio="none" 
        className="w-full h-full absolute inset-0"
        fill="none" 
        stroke="var(--gold)" 
        strokeWidth="0.5"
      >
        <motion.path
          d="M0,12 L150,15 L180,8 L250,18 L320,5 L400,12 L480,16 L550,6 L650,15 L720,10 L850,18 L950,5 L1050,12 L1150,16 L1200,12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M250,18 L270,24"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        />
        <motion.path
          d="M650,15 L660,0"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.path
          d="M950,5 L960,15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
        />
      </svg>
    </div>
  )
}
