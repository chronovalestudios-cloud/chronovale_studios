"use client"

import { animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const element = ref.current
    if (!element) return
    element.textContent = String(from)
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = value.toFixed(0)
      },
    })
    return () => controls.stop()
  }, [ref, inView, from, to, duration])

  return <span ref={ref} className={className} />
}
