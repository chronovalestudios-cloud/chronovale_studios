'use client'

import { motion } from 'framer-motion'

// Pre-calculated coordinates to avoid hydration mismatch from floating point precision
const mainRadialLines = [
  { x1: 260, y1: 200, x2: 380, y2: 200 },
  { x1: 251.96, y1: 230, x2: 355.88, y2: 290 },
  { x1: 230, y1: 251.96, x2: 290, y2: 355.88 },
  { x1: 200, y1: 260, x2: 200, y2: 380 },
  { x1: 170, y1: 251.96, x2: 110, y2: 355.88 },
  { x1: 148.04, y1: 230, x2: 44.12, y2: 290 },
  { x1: 140, y1: 200, x2: 20, y2: 200 },
  { x1: 148.04, y1: 170, x2: 44.12, y2: 110 },
  { x1: 170, y1: 148.04, x2: 110, y2: 44.12 },
  { x1: 200, y1: 140, x2: 200, y2: 20 },
  { x1: 230, y1: 148.04, x2: 290, y2: 44.12 },
  { x1: 251.96, y1: 170, x2: 355.88, y2: 110 },
]

const secondaryRadialLines = [
  { x1: 120, y1: 100, x2: 180, y2: 100 },
  { x1: 110, y1: 117.32, x2: 140, y2: 169.28 },
  { x1: 90, y1: 117.32, x2: 60, y2: 169.28 },
  { x1: 80, y1: 100, x2: 20, y2: 100 },
  { x1: 90, y1: 82.68, x2: 60, y2: 30.72 },
  { x1: 110, y1: 82.68, x2: 140, y2: 30.72 },
]

const lotusPetals = [
  { cx: 300, cy: 200, rotation: 90 },
  { cx: 270.71, cy: 270.71, rotation: 135 },
  { cx: 200, cy: 300, rotation: 180 },
  { cx: 129.29, cy: 270.71, rotation: 225 },
  { cx: 100, cy: 200, rotation: 270 },
  { cx: 129.29, cy: 129.29, rotation: 315 },
  { cx: 200, cy: 100, rotation: 360 },
  { cx: 270.71, cy: 129.29, rotation: 405 },
]

export function MandalaBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large central mandala pattern - very subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.02]">
          {/* Outer rings */}
          {[180, 160, 140, 120, 100, 80, 60].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
              opacity={0.3 + i * 0.1}
            />
          ))}
          
          {/* Radial lines - pre-calculated */}
          {mainRadialLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary"
            />
          ))}

          {/* Lotus petal shapes - pre-calculated */}
          {lotusPetals.map((petal, i) => (
            <ellipse
              key={i}
              cx={petal.cx}
              cy={petal.cy}
              rx="20"
              ry="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary"
              transform={`rotate(${petal.rotation} ${petal.cx} ${petal.cy})`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Secondary smaller mandala - offset */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[50vh] h-[50vh]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.015]">
          {[80, 60, 40, 20].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          ))}
          {/* Pre-calculated secondary lines */}
          {secondaryRadialLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}
