'use client'

import { useState, startTransition } from 'react'

interface HamburgerMenuProps {
  /** Line color */
  strokeColor?: string
  /** SVG stroke width */
  strokeWidth?: number
  /** Button size in px */
  size?: number
  /** Controlled open state (optional) */
  isOpen?: boolean
  /** Called when toggled, receives new open state */
  onToggle?: (open: boolean) => void
  className?: string
}

/**
 * Ported from https://framer.com/m/HamburgerMenu-Qm4u.js
 * Originally by Pixelcot — https://www.pixelcot.com
 * Removed Framer-specific addPropertyControls; pure React.
 */
export function HamburgerMenu({
  strokeColor = '#FFFFFF',
  strokeWidth = 3,
  size = 40,
  isOpen,
  onToggle,
  className = '',
}: HamburgerMenuProps) {
  const [internalChecked, setInternalChecked] = useState(false)

  // Support both controlled (isOpen prop) and uncontrolled modes
  const checked = isOpen !== undefined ? isOpen : internalChecked

  const handleChange = () => {
    const next = !checked
    if (isOpen === undefined) {
      startTransition(() => setInternalChecked(next))
    }
    onToggle?.(next)
  }

  return (
    <label
      className={className}
      style={{ cursor: 'pointer', display: 'inline-block', width: size, height: size }}
      aria-label={checked ? 'Close menu' : 'Open menu'}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-hidden
      />
      <svg
        viewBox="0 0 32 32"
        style={{
          width: '100%',
          height: '100%',
          transform: checked ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Top / bottom morphing path */}
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={checked ? '20 300' : '12 63'}
          strokeDashoffset={checked ? -32.42 : 0}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {/* Middle line */}
        <path
          d="M7 16 27 16"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          style={{
            transition:
              'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
    </label>
  )
}
