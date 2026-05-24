'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShimmerButton } from './ui/shimmer-button'
import Link from 'next/link'
import gsap from 'gsap'

/* ══════════════════════════════════════════════════════════════════════════════
   Data
   ══════════════════════════════════════════════════════════════════════════════ */
const socialLinks = [
  {
    href: 'https://twitter.com', label: 'Twitter',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com', label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com', label: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

const stats = [
  { value: '2025',      label: 'FOUNDED'  },
  { value: 'INDIA',     label: 'LOCATION' },
  { value: 'NARRATIVE', label: 'FOCUS'    },
]

const TITLE    = 'CHRONOVALE'
const SUBTITLE = 'STUDIOS'

/* ══════════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, 120])
  const sectionOp = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(
        ['.hero-letter', '.hero-studios', '.hero-label',
         '.hero-tagline', '.hero-buttons', '.hero-scroll',
         '.hero-stat', '.social-icon'],
        { opacity: 1, y: 0, x: 0 }
      )
      return
    }

    const introShown = sessionStorage.getItem('cv_intro_seen')
    const base = introShown ? 0.1 : 1.3

    const tl = gsap.timeline({ delay: base })

    /* A — CHRONOVALE per-letter */
    tl.from('.hero-letter', {
      opacity: 0, y: 80, rotationX: -40,
      duration: 0.8, ease: 'power4.out', stagger: 0.05,
      transformPerspective: 900,
    })
    /* B — STUDIOS block */
    tl.from('.hero-studios', { opacity: 0, y: 40, duration: 0.6, ease: 'power2.out' }, '+=0.04')

    /* C — Label / tagline / buttons / scroll cascade */
    tl.from('.hero-label',   { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '<-0.8')
    tl.from('.hero-tagline', { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' }, '-=0.45')
    tl.from('.hero-buttons', { opacity: 0, y: 24, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    
    /* D — Stats (bottom right) */
    tl.from('.hero-stat', {
      opacity: 0, y: 20,
      duration: 0.7, ease: 'power2.out', stagger: 0.15,
    }, '<-0.4')

    tl.from('.hero-scroll',  { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.5')

    /* G — Social icons from left */
    gsap.from('.social-icon', {
      opacity: 0, x: -16,
      duration: 0.5, ease: 'power2.out', stagger: 0.1,
      delay: base + 0.9,
    })
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      style={{ opacity: sectionOp }}
      className="relative min-h-svh w-full overflow-hidden flex flex-col bg-transparent"
    >
      {/* ── Gray editorial spotlight — right side depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 72% 50%, rgba(110,110,110,0.12) 0%, rgba(55,55,55,0.05) 45%, transparent 70%)',
          zIndex: 6,
        }}
        aria-hidden="true"
      />

      {/* ── z-20: Social rail (Horizontal on mobile, Vertical on desktop) ── */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 md:bottom-auto md:left-5 lg:left-10 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-20 flex flex-row md:flex-col items-center w-full md:w-auto justify-center md:justify-start"
        style={{ gap: 24 }}
      >
        <div className="hidden md:block w-px bg-[rgba(255,255,255,0.1)]" style={{ height: 60 }} />
        <div className="block md:hidden h-px bg-[rgba(255,255,255,0.1)]" style={{ width: 60 }} />
        
        {/* Amber Ember circle accent */}
        <div className="w-[18px] h-[18px] rounded-full border border-[var(--amber-ember)] flex items-center justify-center shrink-0">
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--amber-ember)]" />
        </div>
        
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon cursor-target text-[rgba(255,255,255,0.28)] hover:text-[var(--amber-ember)] transition-colors duration-200"
          >
            {s.icon}
          </a>
        ))}
        
        <div className="hidden md:block w-px bg-[rgba(255,255,255,0.1)]" style={{ height: 60 }} />
        <div className="block md:hidden h-px bg-[rgba(255,255,255,0.1)]" style={{ width: 60 }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          z-10 MAIN CONTENT (CENTERED)
          ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center w-full h-full min-h-svh max-w-[1280px] mx-auto px-6 text-center"
      >
        {/* §5.2 Section label — mb: 24px */}
        <div className="hero-label flex items-center justify-center gap-3" style={{ marginBottom: 24 }}>
          <div className="h-px bg-[var(--amber-ember)] hidden md:block" style={{ width: 32 }} />
          <span
            className="font-mono text-[var(--amber-ember)] uppercase"
            style={{ fontSize: 11, letterSpacing: '0.15em' }}
          >
            ◈ INDIE GAME STUDIO
          </span>
          <div className="h-px bg-[var(--amber-ember)] hidden md:block" style={{ width: 32 }} />
        </div>

        {/* CHRONOVALE */}
        <h1
          className="font-display text-[var(--white-pure)] uppercase flex flex-nowrap justify-center overflow-hidden"
          style={{
            fontSize:      'clamp(32px, 11vw, 150px)',
            lineHeight:    0.95,
            letterSpacing: '0.02em',
            marginBottom:  0,
          }}
          aria-label="CHRONOVALE"
        >
          {TITLE.split('').map((char, i) => (
            <span key={i} className="hero-letter inline-block" style={{ willChange: 'transform, opacity' }}>
              {char}
            </span>
          ))}
        </h1>

        {/* STUDIOS */}
        <h2
          className="hero-studios font-display uppercase"
          style={{
            fontSize:      'clamp(24px, 7vw, 100px)',
            lineHeight:    1,
            letterSpacing: '0.08em',
            color:         'var(--text-secondary)',
            marginBottom:  48,
          }}
          aria-label="STUDIOS"
        >
          {SUBTITLE}
        </h2>

        {/* Tagline */}
        <p
          className="hero-tagline font-sans mx-auto"
          style={{
            fontSize:     'clamp(16px, 1.6vw, 19px)',
            lineHeight:   1.8,
            color:        'var(--white-warm)',
            maxWidth:     540,
            marginBottom: 48,
          }}
        >
          Forging the next era of{' '}
          <span className="amber-ember-shimmer font-medium">interactive narrative</span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex items-center justify-center flex-wrap" style={{ gap: 20 }}>
          {/* Primary: gradient-fire */}
          <Link href="#games">
            <ShimmerButton
              background="var(--amber-ember)"
              shimmerColor="rgba(255, 255, 255, 0.6)"
              className="text-warm-black"
            >
              EXPLORE OUR WORLD
            </ShimmerButton>
          </Link>
          {/* Ghost: saffron border */}
          <Link href="#contact">
            <button
              className="cursor-target flex items-center gap-2.5 hover:bg-[var(--amber-ember-dim)] active:scale-[0.98] transition-all duration-150"
              style={{
                background:    'rgba(15,10,6,0.5)',
                backdropFilter: 'blur(10px)',
                border:        '1px solid var(--amber-ember)',
                color:         'var(--amber-ember)',
                fontFamily:    'var(--font-display)',
                fontSize:      14,
                letterSpacing: '0.15em',
                padding:       '16px 36px',
                borderRadius:  30,
                textTransform: 'uppercase',
                cursor:        'pointer',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--amber-ember)] animate-pulse" />
              NOW HIRING
            </button>
          </Link>
        </div>
      </motion.div>

      {/* ── Stats block — moved to bottom right to stay out of center stage ── */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 hidden lg:flex items-center" style={{ gap: 48 }}>
        {stats.map((stat, idx) => (
          <div key={stat.label} className="hero-stat text-right flex flex-col items-end">
            <div
              className="font-display uppercase tracking-wider"
              style={{
                fontSize:     '28px',
                lineHeight:   1,
                color:        'var(--white-pure)',
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            <div
              className="font-mono uppercase"
              style={{
                fontSize:      10,
                letterSpacing: '0.15em',
                color:         'var(--text-secondary)',
                lineHeight:    1,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── §E Scroll indicator — absolute bottom, centred ── */}
      <div
        className="hero-scroll absolute z-10 flex flex-col items-center gap-2"
        style={{ bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-muted)' }}
        >
          SCROLL
        </span>
        <div className="scroll-arrow" style={{ color: 'rgba(245,240,232,0.35)' }}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.section>
  )
}
