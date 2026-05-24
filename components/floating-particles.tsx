'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Reinitialize particles on resize
      initParticles()
    }

    const initParticles = () => {
      const particleCount = 50
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2, // Randomize starting pulse
        pulseSpeed: Math.random() * 0.02 + 0.01,
      }))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Validate particle values
        if (!isFinite(particle.x) || !isFinite(particle.y)) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          return
        }

        // Update pulse
        particle.pulse += particle.pulseSpeed
        const pulseFactor = Math.sin(particle.pulse) * 0.3 + 1

        // Mouse interaction - with distance check
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150 && distance > 0.1) {
          const force = (150 - distance) / 150
          particle.speedX -= (dx / distance) * force * 0.02
          particle.speedY -= (dy / distance) * force * 0.02
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Damping
        particle.speedX *= 0.99
        particle.speedY *= 0.99

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Calculate gradient radius and ensure it's valid
        const gradientRadius = Math.max(0.1, particle.size * 4 * pulseFactor)
        
        // Ensure all values are finite before creating gradient
        if (!isFinite(particle.x) || !isFinite(particle.y) || !isFinite(gradientRadius)) {
          return
        }

        // Draw particle with glow
        try {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, gradientRadius
          )
          gradient.addColorStop(0, `rgba(212, 160, 74, ${Math.min(1, particle.opacity * pulseFactor)})`)
          gradient.addColorStop(0.5, `rgba(212, 160, 74, ${Math.min(1, particle.opacity * 0.3 * pulseFactor)})`)
          gradient.addColorStop(1, 'rgba(212, 160, 74, 0)')

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, gradientRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        } catch {
          // Skip this particle if gradient creation fails
          return
        }

        // Draw connections
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const connDx = particle.x - otherParticle.x
          const connDy = particle.y - otherParticle.y
          const connDistance = Math.sqrt(connDx * connDx + connDy * connDy)

          if (connDistance < 120 && connDistance > 0) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(212, 160, 74, ${0.1 * (1 - connDistance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isClient])

  if (!isClient) return null

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
