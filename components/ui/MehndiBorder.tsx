'use client'

import React, { useEffect, useRef, useState } from 'react'

export type MehndiVariant = 'vine' | 'medallion' | 'geometric-floral' | 'lattice' | 'fringe' | 'block-floral'
export type MehndiColor = 'amber' | 'subtle' | 'white'

interface MehndiBorderProps {
  variant: MehndiVariant
  color?: MehndiColor
  height?: number
  animated?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  flip?: boolean
  className?: string
}

export function MehndiBorder({
  variant,
  color = 'amber',
  height = 48,
  animated = true,
  speed = 'normal',
  flip = false,
  className = ''
}: MehndiBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer for scroll entry
  useEffect(() => {
    if (!animated) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [animated])

  const getColors = () => {
    switch (color) {
      case 'amber':
        return { stroke: 'var(--amber)', fill: 'transparent', opacity: 0.7, solidFill: 'var(--amber)', cutout: 'var(--void)' }
      case 'subtle':
        return { stroke: 'var(--bg-border)', fill: 'transparent', opacity: 0.5, solidFill: 'var(--bg-border)', cutout: 'var(--void)' }
      case 'white':
        return { stroke: 'var(--white-pure)', fill: 'transparent', opacity: 0.4, solidFill: 'var(--white-pure)', cutout: 'var(--void)' }
    }
  }

  const { stroke, fill, opacity, solidFill, cutout } = getColors()

  const getDuration = () => {
    switch (speed) {
      case 'slow': return '2.8s'
      case 'fast': return '1.0s'
      default: return '1.8s'
    }
  }

  const duration = getDuration()
  const patternId = `mehndi-${variant}-${color}`

  // Render SVG content based on variant
  const renderPaths = () => {
    const commonProps = {
      fill: fill,
      stroke: stroke,
      strokeWidth: 1.5,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      className: isVisible ? 'mehndi-draw mehndi-glow-pulse' : 'opacity-0'
    }

    // For geometric floral, it's solid filled
    const solidProps = {
      fill: solidFill,
      stroke: 'none',
      className: isVisible ? 'mehndi-fade-in mehndi-glow-pulse' : 'opacity-0'
    }

    const cutoutProps = {
      fill: cutout,
      stroke: 'none'
    }

    const renderPathsContent = () => {
      switch (variant) {
        case 'vine':
          return (
            <g {...commonProps}>
              <path d="M0,4 H120 M0,8 H120 M0,40 H120 M0,44 H120" />
              <path d="M0,24 C20,10 40,38 60,24 C80,10 100,38 120,24" />
              <path d="M0,24 C20,38 40,10 60,24 C80,38 100,10 120,24" />
              <circle cx="30" cy="24" r="3" fill={stroke} />
              <circle cx="90" cy="24" r="3" fill={stroke} />
              <path d="M15,8 Q20,16 30,16 Q40,16 45,8 M75,8 Q80,16 90,16 Q100,16 105,8" />
              <path d="M15,40 Q20,32 30,32 Q40,32 45,40 M75,40 Q80,32 90,32 Q100,32 105,40" />
            </g>
          )
        case 'medallion':
          return (
            <g {...commonProps}>
              <path d="M0,2 H120 M0,6 H120 M0,42 H120 M0,46 H120" />
              <circle cx="60" cy="24" r="14" />
              <circle cx="60" cy="24" r="8" />
              <path d="M60,16 L63,20 L68,20 L64,24 L68,28 L63,28 L60,32 L57,28 L52,28 L56,24 L52,20 L57,20 Z" fill={stroke} />
              <path d="M20,12 C30,12 35,24 20,36 M100,12 C90,12 85,24 100,36" />
              <circle cx="35" cy="24" r="2" fill={stroke} />
              <circle cx="85" cy="24" r="2" fill={stroke} />
            </g>
          )
        case 'geometric-floral':
          return (
            <g>
              <path {...solidProps} d="M0,4 Q15,0 30,4 Q45,8 60,4 Q75,0 90,4 Q105,8 120,4 V44 Q105,40 90,44 Q75,48 60,44 Q45,40 30,44 Q15,48 0,44 Z" />
              <polygon {...cutoutProps} points="60,8 72,24 60,40 48,24" />
              <polygon {...cutoutProps} points="0,8 12,24 0,40 -12,24" />
              <polygon {...cutoutProps} points="120,8 132,24 120,40 108,24" />
              <path {...cutoutProps} d="M60,14 Q65,19 60,24 Q55,19 60,14 M60,34 Q65,29 60,24 Q55,29 60,34 M50,24 Q55,19 60,24 Q55,29 50,24 M70,24 Q65,19 60,24 Q65,29 70,24" fill={solidFill} />
              <circle cx="60" cy="24" r="2" fill={cutout} />
            </g>
          )
        case 'lattice':
          return (
            <g {...commonProps}>
              <path d="M0,12 H120 M0,36 H120" strokeDasharray="2 4" />
              <path d="M15,12 L45,36 M45,12 L15,36 M75,12 L105,36 M105,12 L75,36" />
              <circle cx="30" cy="24" r="4" fill={stroke} />
              <circle cx="90" cy="24" r="4" fill={stroke} />
              <path d="M0,24 H15 M45,24 H75 M105,24 H120" />
              <circle cx="60" cy="24" r="2" fill={stroke} />
            </g>
          )
        case 'fringe':
          return (
            <g {...commonProps}>
              <path d="M0,6 H120 M0,10 H120" />
              <path d="M10,6 A5,5 0 0,1 20,6 M40,6 A5,5 0 0,1 50,6 M70,6 A5,5 0 0,1 80,6 M100,6 A5,5 0 0,1 110,6" />
              <path d="M15,10 V25 C15,35 25,35 25,25 V10 M75,10 V25 C75,35 85,35 85,25 V10" />
              <path d="M45,10 V35 C45,45 55,45 55,35 V10 M105,10 V35 C105,45 115,45 115,35 V10" />
              <circle cx="20" cy="28" r="1.5" fill={stroke} />
              <circle cx="80" cy="28" r="1.5" fill={stroke} />
              <circle cx="50" cy="38" r="1.5" fill={stroke} />
              <circle cx="110" cy="38" r="1.5" fill={stroke} />
            </g>
          )
        case 'block-floral':
          return (
            <g {...commonProps}>
              <path d="M0,2 H120 M0,46 H120" strokeWidth="2" />
              <rect x="10" y="8" width="32" height="32" rx="4" />
              <rect x="78" y="8" width="32" height="32" rx="4" />
              <path d="M42,24 H78" strokeDasharray="4 4" />
              <path d="M26,12 Q32,18 26,24 Q20,18 26,12 M26,36 Q32,30 26,24 Q20,30 26,36 M14,24 Q20,18 26,24 Q20,30 14,24 M38,24 Q32,18 26,24 Q32,30 38,24" fill={stroke} />
              <path d="M94,12 Q100,18 94,24 Q88,18 94,12 M94,36 Q100,30 94,24 Q88,30 94,36 M82,24 Q88,18 94,24 Q88,30 82,24 M106,24 Q100,18 94,24 Q100,30 106,24" fill={stroke} />
            </g>
          )
      }
    }

    const addPathLength = (children: React.ReactNode): React.ReactNode => {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        if (child.type === 'g') {
          return React.cloneElement(child, {}, addPathLength(child.props.children))
        }
        return React.cloneElement(child, { pathLength: 1 } as any)
      })
    }

    return addPathLength(renderPathsContent())
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden group ${className}`} 
      style={{ height: `${height}px`, opacity, transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .mehndi-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mehndiDraw ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .mehndi-fade-in {
          opacity: 0;
          animation: mehndiFadeIn ${duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .mehndi-glow-pulse {
          animation-name: mehndiDraw, mehndiGlow;
          animation-duration: ${duration}, 1.2s;
          animation-delay: 0s, ${duration};
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94), ease-in-out;
          animation-fill-mode: forwards, none;
        }
        @keyframes mehndiDraw {
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes mehndiFadeIn {
          to { opacity: 1; }
        }
        @keyframes mehndiGlow {
          0% { filter: drop-shadow(0 0 0px transparent); }
          50% { filter: drop-shadow(0 0 6px var(--amber-glow)); }
          100% { filter: drop-shadow(0 0 0px transparent); }
        }
        .group:hover .mehndi-draw, .group:hover .mehndi-fade-in {
          opacity: 1 !important;
          transition: opacity 0.3s ease;
        }
      `}} />
      <svg
        className="w-full h-full transition-opacity duration-300 group-hover:!opacity-100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="120"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {renderPaths()}
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

export function SectionDivider({ variant, flip = false }: { variant: MehndiVariant, flip?: boolean }) {
  return (
    <div className="relative w-full my-0 overflow-hidden" style={{ height: '48px' }}>
      <MehndiBorder variant={variant} animated color="amber" flip={flip} />
    </div>
  )
}
