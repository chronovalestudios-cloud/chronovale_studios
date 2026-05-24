'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

// Custom cursor with saffron/gold trail - per design.md §6.4
export function GamingCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only enable custom cursor on desktop
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isLargeScreen = window.innerWidth >= 1024

    if (isTouchDevice || !isLargeScreen) {
      setIsMobile(true)
      return
    }

    setIsMobile(false)

    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add to trail
      trailRef.current.push({ x: e.clientX, y: e.clientY })
      if (trailRef.current.length > 15) {
        trailRef.current.shift()
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Draw trail on canvas with saffron color
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const drawTrail = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const trail = trailRef.current
        if (trail.length < 2) {
          animationRef.current = requestAnimationFrame(drawTrail)
          return
        }

        for (let i = 0; i < trail.length - 1; i++) {
          const alpha = (i / trail.length) * 0.4
          const width = (i / trail.length) * 2

          ctx.beginPath()
          ctx.moveTo(trail[i].x, trail[i].y)
          ctx.lineTo(trail[i + 1].x, trail[i + 1].y)
          // Use gold color for trail - #C9A84C
          ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        animationRef.current = requestAnimationFrame(drawTrail)
      }

      drawTrail()
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      // Re-check screen size
      if (window.innerWidth < 1024) {
        setIsMobile(true)
        document.body.style.cursor = 'auto'
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cursorX, cursorY])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer ring - saffron border */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            width: isHovering ? 50 : isClicking ? 16 : 32,
            height: isHovering ? 50 : isClicking ? 16 : 32,
            x: isHovering ? -25 : isClicking ? -8 : -16,
            y: isHovering ? -25 : isClicking ? -8 : -16,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            border: `2px solid ${isHovering ? '#FF6B00' : '#C9A84C'}`,
          }}
        />

        {/* Inner dot - saffron fill */}
        <motion.div
          className="absolute rounded-full"
          animate={{
            width: isClicking ? 10 : 6,
            height: isClicking ? 10 : 6,
            x: isClicking ? -5 : -3,
            y: isClicking ? -5 : -3,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{ backgroundColor: '#FF6B00' }}
        />
      </motion.div>

      {/* Diamond corner accents */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: isHovering ? 45 : 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {[0, 90, 180, 270].map((rotation) => (
            <motion.div
              key={rotation}
              className="absolute w-2 h-2"
              style={{
                rotate: rotation,
                borderLeft: '1.5px solid rgba(201, 168, 76, 0.5)',
                borderTop: '1.5px solid rgba(201, 168, 76, 0.5)',
              }}
              animate={{
                x:
                  isHovering
                    ? Math.cos((rotation * Math.PI) / 180) * 30 - 4
                    : Math.cos((rotation * Math.PI) / 180) * 22 - 4,
                y:
                  isHovering
                    ? Math.sin((rotation * Math.PI) / 180) * 30 - 4
                    : Math.sin((rotation * Math.PI) / 180) * 22 - 4,
                opacity: isHovering ? 1 : 0.4,
              }}
              transition={{ type: 'spring', damping: 20 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  )
}
