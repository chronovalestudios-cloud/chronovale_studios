'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { HamburgerMenu } from './ui/hamburger-menu'

const navLinks = [
  { href: '/',       label: 'HOME',   number: '01' },
  { href: '#about',  label: 'ABOUT',  number: '02' },
  { href: '#vision', label: 'VISION', number: '03' },
  { href: '#games',  label: 'GAMES',  number: '04' },
  { href: '#team',   label: 'TEAM',   number: '05' },
]

// Stagger variants for the overlay links
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: 'easeIn', delay: 0.2 },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.07 },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -40,
    transition: { duration: 0.3, ease: 'easeIn', delay: i * 0.04 },
  }),
}

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export function Navbar() {
  const [isOpen, setIsOpen]             = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hidden, setHidden]             = useState(false)

  // ── Scroll-driven morph values ─────────────────────────────────
  const { scrollY } = useScroll()

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (current) => {
    const prev = scrollY.getPrevious() ?? 0
    if (isOpen) return                  // never hide while menu is open
    if (current < 80) { setHidden(false); return }  // always show near top
    if (current > prev) setHidden(true)  // scrolling down → hide
    else                setHidden(false) // scrolling up   → show
  })

  // Raw transforms — header shrinks as user scrolls
  const rawTop         = useTransform(scrollY, [0, 120], [20,  12])
  const rawMarginX     = useTransform(scrollY, [0, 120], [20, 120])
  const rawHeight      = useTransform(scrollY, [0, 120], [100, 76])
  const rawRadius      = useTransform(scrollY, [0, 120], [ 4,  30])
  const rawBg          = useTransform(scrollY, [0, 120], [0.2, 0.82])
  const rawBlur        = useTransform(scrollY, [0, 120], [8,   24])
  const rawBorder      = useTransform(scrollY, [0, 120], [0.04, 0.12])
  const rawShadow      = useTransform(scrollY, [0, 120], [0,    0.5])

  // Apply spring physics for fluid, organic feel
  const springCfg = { stiffness: 180, damping: 28, mass: 1 }
  const top        = useSpring(rawTop,     springCfg)
  const marginX    = useSpring(rawMarginX, springCfg)
  const height     = useSpring(rawHeight,  springCfg)
  const radius     = useSpring(rawRadius,  springCfg)
  const bgAlpha    = useSpring(rawBg,      springCfg)
  const blurPx     = useSpring(rawBlur,    springCfg)
  const borderA    = useSpring(rawBorder,  springCfg)
  const shadowA    = useSpring(rawShadow,  springCfg)

  // Derived string motion values — computed once, update reactively
  const bgColor  = useTransform(bgAlpha, (v) => `rgba(10,10,10,${v})`)
  const blur     = useTransform(blurPx,  (v) => `blur(${v}px)`)
  const border   = useTransform(borderA, (v) => `1px solid rgba(255,255,255,${v})`)
  const shadow   = useTransform(shadowA, (v) => `0 8px 40px rgba(0,0,0,${v})`)

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* ── Morphic floating header ────────────────────────────────── */}
      <motion.header
        initial="hidden"
        animate={hidden && !isOpen ? 'hidden' : 'visible'}
        variants={{
          visible: { y: 0,    opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
          hidden:  { y: -110, opacity: 0, transition: { duration: 0.3,  ease: [0.55, 0,    1,    0.45] } },
        }}
        style={{
          position:     'fixed',
          zIndex:        50,
          top:           isOpen ? 20 : top,
          left:          isOpen ? 20 : marginX,
          right:         isOpen ? 20 : marginX,
          height:        isOpen ? 100 : height,
          borderRadius:  isOpen ?  4 : radius,
          backgroundColor: isOpen ? 'rgba(10,10,10,0.92)' : bgColor,
          backdropFilter:        isOpen ? 'blur(20px)' : blur,
          WebkitBackdropFilter:  isOpen ? 'blur(20px)' : blur,
          border:    isOpen ? '1px solid rgba(255,255,255,0.1)' : border,
          boxShadow: isOpen ? '0 8px 40px rgba(0,0,0,0.5)'     : shadow,
          overflow: 'hidden',
        }}
      >
        <div className="px-6 md:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <button
              onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="cursor-target z-[60] relative flex items-center h-full"
            >
              <img 
                src="/assets/logo_white.png" 
                alt="Chronovale Studios" 
                className="h-12 md:h-[4.5rem] w-auto object-contain transition-transform duration-300 hover:scale-[1.03] scale-105 origin-left"
              />
            </button>

            {/* Hamburger — always visible */}
            <div className="z-[60] relative">
              <HamburgerMenu
                isOpen={isOpen}
                onToggle={setIsOpen}
                strokeColor={isOpen ? '#FF6B00' : '#F5F0E8'}
                strokeWidth={2.5}
                size={38}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex overflow-hidden"
          >
            {/* Subtle mandala texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, #FF6B00 1px, transparent 1px),
                                  radial-gradient(circle at 70% 50%, rgba(245,240,232,0.5) 1px, transparent 1px)`,
                backgroundSize: '60px 60px, 80px 80px',
              }}
            />
            {/* Saffron glow bottom-left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 50% 40% at 0% 100%, rgba(255,107,0,0.08) 0%, transparent 60%)' }}
            />

            {/* ── Left: nav links ─── */}
            <div className="flex-1 flex flex-col justify-center pl-16 md:pl-24 lg:pl-32 pr-8 pt-24 pb-16 relative z-10">

              {/* Section label */}
              <motion.div
                custom={0}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-3 mb-12"
              >
                <div className="w-8 h-px bg-[#FF6B00]" />
                <span className="text-[11px] font-mono tracking-[0.3em] text-[#FF6B00] uppercase">
                  Navigation
                </span>
              </motion.div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="cursor-target group flex items-baseline gap-4 py-1 no-underline"
                    >
                      {/* Index number */}
                      <span
                        className="font-mono text-[12px] tracking-widest transition-colors duration-300"
                        style={{
                          color: hoveredIndex === i ? '#FF6B00' : 'rgba(245,240,232,0.2)',
                        }}
                      >
                        {link.number}
                      </span>

                      {/* Big link text */}
                      <span
                        className="font-display uppercase leading-none transition-all duration-300"
                        style={{
                          fontSize: 'clamp(44px, 7vw, 96px)',
                          color:
                            hoveredIndex === null
                              ? '#F5F0E8'
                              : hoveredIndex === i
                              ? '#FF6B00'
                              : 'rgba(245,240,232,0.2)',
                          letterSpacing: '-1px',
                        }}
                      >
                        {link.label}
                      </span>

                      {/* Arrow on hover */}
                      <motion.span
                        animate={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          x: hoveredIndex === i ? 0 : -10,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-[#FF6B00] text-2xl font-sans self-center"
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom meta */}
              <motion.div
                custom={navLinks.length + 1}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-16 flex items-center gap-8"
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="cursor-target text-[11px] font-mono tracking-[0.2em] text-[rgba(245,240,232,0.3)] hover:text-[#FF6B00] uppercase transition-colors">
                  Twitter
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="cursor-target text-[11px] font-mono tracking-[0.2em] text-[rgba(245,240,232,0.3)] hover:text-[#FF6B00] uppercase transition-colors">
                  Instagram
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="cursor-target text-[11px] font-mono tracking-[0.2em] text-[rgba(245,240,232,0.3)] hover:text-[#FF6B00] uppercase transition-colors">
                  LinkedIn
                </a>
              </motion.div>
            </div>

            {/* ── Right: mosaic-masked image ─── */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hidden lg:block w-[42%] relative overflow-visible"
            >
              {/* ── Fragment 1: main large piece (bottom-right) ── */}
              <div
                className="absolute"
                style={{
                  inset: 0,
                  top: '12%',
                  left: '6%',
                  right: '0%',
                  bottom: '0%',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 87%, 82% 87%, 82% 100%, 0% 100%)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/nav-overlay-art.png"
                  alt="Chronovale concept art"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center center' }}
                />
                {/* Subtle dark vignette over image */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.5) 0%, transparent 60%, rgba(10,10,10,0.4) 100%)' }}
                />
              </div>

              {/* ── Fragment 2: top-left offset piece ── */}
              <div
                className="absolute"
                style={{
                  top: '0%',
                  left: '0%',
                  width: '36%',
                  height: '25%',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/nav-overlay-art.png"
                  alt=""
                  aria-hidden
                  className="absolute object-cover"
                  style={{
                    width: `${100 / 0.36}%`,
                    height: `${100 / 0.25}%`,
                    top: `-${(12 / 0.25) * 0}%`,
                    left: `0%`,
                    objectPosition: 'center top',
                    filter: 'brightness(0.7)',
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.25)' }} />
              </div>

              {/* ── Fragment 3: bottom-right detached piece ── */}
              <div
                className="absolute"
                style={{
                  bottom: '0%',
                  right: '-4%',
                  width: '22%',
                  height: '16%',
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/nav-overlay-art.png"
                  alt=""
                  aria-hidden
                  className="absolute object-cover"
                  style={{
                    width: '500%',
                    height: '700%',
                    top: '-480%',
                    left: '-280%',
                    filter: 'brightness(0.65)',
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.3)' }} />
              </div>

              {/* Corner brackets on main fragment */}
              <div className="absolute top-[12%] left-[6%] w-7 h-7 border-l-2 border-t-2 border-[#FF6B00] z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-7 h-7 border-r-2 border-b-2 border-[#FF6B00] z-20 pointer-events-none" style={{ right: '0%', bottom: '13%' }} />

              {/* Label */}
              <div className="absolute bottom-[16%] left-[10%] z-20 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-px bg-[#FF6B00]" />
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#FF6B00] uppercase">Est. 2025</span>
                </div>
                <p className="font-display text-[clamp(16px,1.8vw,24px)] text-[rgba(245,240,232,0.8)] uppercase tracking-wider leading-tight">
                  Forging<br />Narrative Worlds
                </p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
