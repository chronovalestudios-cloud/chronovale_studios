'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

// Background canvas with subtle kolam-inspired grid and saffron/gold particles
// Per design.md: only use saffron #FF6B00 and gold #C9A84C for accents
export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  // Only saffron and gold colors - no cyan/teal per design.md
  const colors = ['#FF6B00', '#C9A84C', '#E8C96B']

  const createParticle = useCallback(
    (x?: number, y?: number): Particle => {
      const canvas = canvasRef.current
      if (!canvas) return {} as Particle

      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 300 + 150,
      }
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles - lower count for subtlety
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle())
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Spawn particles near mouse occasionally
      if (Math.random() > 0.85) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Very subtle fade for trailing effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw kolam-style dot grid - very subtle
      const gridSize = 40
      ctx.fillStyle = 'rgba(30, 30, 53, 0.5)'

      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.arc(x, y, 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw and update particles
      const particles = particlesRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Gentle mouse attraction
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150) {
          p.vx += (dx / dist) * 0.01
          p.vy += (dy / dist) * 0.01
        }

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.life++

        // Damping
        p.vx *= 0.995
        p.vy *= 0.995

        // Fade based on life
        const lifeRatio = 1 - p.life / p.maxLife
        const currentAlpha = p.alpha * lifeRatio

        // Draw particle with subtle glow
        ctx.save()
        ctx.globalAlpha = currentAlpha

        // Subtle glow
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        ctx.restore()

        // Draw connections - very subtle
        for (let j = i - 1; j >= 0; j--) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist2 < 80) {
            ctx.save()
            ctx.globalAlpha =
              (1 - dist2 / 80) *
              0.1 *
              Math.min(currentAlpha, 1 - p2.life / p2.maxLife)
            ctx.strokeStyle = '#C9A84C'
            ctx.lineWidth = 0.3
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
            ctx.restore()
          }
        }

        // Remove dead particles
        if (
          p.life >= p.maxLife ||
          p.x < 0 ||
          p.x > canvas.width ||
          p.y < 0 ||
          p.y > canvas.height
        ) {
          particles.splice(i, 1)
          particles.push(createParticle())
        }
      }

      // Draw subtle mouse glow with saffron color
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        150
      )
      gradient.addColorStop(0, 'rgba(255, 107, 0, 0.05)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          'linear-gradient(180deg, #0A0A0F 0%, #0F0F1A 50%, #0A0A0F 100%)',
      }}
    />
  )
}
