'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlurText } from './ui/blur-text'
import { Particles } from './ui/particles'
import { GodRays } from './ui/god-rays'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════════════════
   §3.3 — Kintsugi hairline crack at section boundary
   ══════════════════════════════════════════════════════════════ */
function KintsugiDivider() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const len = pathRef.current.getTotalLength()
    if (reduced) {
      gsap.set(pathRef.current, { strokeDashoffset: 0 })
      return
    }
    gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', delay: 0.2, scrollTrigger: { trigger: pathRef.current, start: "top 90%" } })
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 h-[8px] z-20 pointer-events-none">
      <svg viewBox="0 0 1440 8" preserveAspectRatio="none" className="w-full h-full">
        <path
          ref={pathRef}
          d="M 0 4 Q 120 1, 240 5 Q 360 7, 480 3 Q 600 1, 720 4 Q 840 7, 960 2 Q 1080 0, 1200 5 Q 1320 8, 1440 4"
          stroke="#E8943A" strokeWidth="1" fill="none" opacity="0.6"
        />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   §3.1 — Yantra / Mandala SVG (Now Highly Visible & Colored)
   ══════════════════════════════════════════════════════════════ */
function Yantra({ triggerEl }: { triggerEl: React.RefObject<HTMLElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const binduRef = useRef<SVGCircleElement>(null)
  const binduRingRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!svgRef.current || !triggerEl.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ── Measure circle circumferences ── */
    const outerCircles = Array.from(svgRef.current.querySelectorAll<SVGCircleElement>('circle[data-layer="outer"]'))
    const innerCircles = Array.from(svgRef.current.querySelectorAll<SVGCircleElement>('circle[data-layer="inner"]'))
    const lines = Array.from(svgRef.current.querySelectorAll<SVGLineElement>('line[data-draw]'))

    const prepare = (el: SVGGeometryElement) => {
      const len = el.getTotalLength()
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
    }

    if (!reduced) {
      outerCircles.forEach(prepare)
      innerCircles.forEach(prepare)
      lines.forEach((line) => {
        const dx = +line.getAttribute('x2')! - +line.getAttribute('x1')!
        const dy = +line.getAttribute('y2')! - +line.getAttribute('y1')!
        const len = Math.sqrt(dx * dx + dy * dy)
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set([binduRef.current, binduRingRef.current], { scale: 0, opacity: 0, transformOrigin: '50% 50%' })

      // The drawing animation triggers once when the section comes into view
      const drawTl = gsap.timeline({
        scrollTrigger: { trigger: triggerEl.current, start: 'top 60%', once: true },
      })

      /* Outer rings */
      drawTl.to(outerCircles, { strokeDashoffset: 0, duration: 2.5, stagger: 0.2, ease: 'power2.out' }, 0)
      /* Inner geometry + lines */
      drawTl.to(innerCircles, { strokeDashoffset: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }, 0.5)
      drawTl.to(lines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.04, ease: 'power2.out' }, 0.5)
      /* Bindu appears last */
      drawTl.to([binduRef.current, binduRingRef.current], { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, 2)

      // Removed ambient rotation to allow scroll-driven rotation instead
    }
  }, [triggerEl])

  const radials = Array.from({ length: 16 }, (_, i) => i)
  const dotAccents = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 - 90) * (Math.PI / 180)
    return { cx: 250 + 185 * Math.cos(a), cy: 250 + 185 * Math.sin(a) }
  })
  const outerTicks = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 - 90) * (Math.PI / 180)
    return { cx: 250 + 225 * Math.cos(a), cy: 250 + 225 * Math.sin(a) }
  })

  // Using strong color to make the animation visible and pop
  const chakraColor = "#E8943A"

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mandala-svg w-full h-full max-w-[600px] max-h-[600px] opacity-80 mix-blend-screen"
      aria-hidden="true"
    >
      {/* ── Outer rings ── */}
      <circle data-layer="outer" cx="250" cy="250" r="225" stroke={chakraColor} strokeWidth="1" opacity="0.4" />
      <circle data-layer="outer" cx="250" cy="250" r="185" stroke={chakraColor} strokeWidth="1.2" opacity="0.5" />
      <circle data-layer="outer" cx="250" cy="250" r="140" stroke={chakraColor} strokeWidth="2" opacity="0.7" />

      {/* ── Inner rings ── */}
      <circle data-layer="inner" cx="250" cy="250" r="95" stroke={chakraColor} strokeWidth="1.2" opacity="0.6" />
      <circle data-layer="inner" cx="250" cy="250" r="55" stroke={chakraColor} strokeWidth="2" opacity="0.8" />

      {/* ── 16 Radial lines: r=55 → r=225 ── */}
      {radials.map((i) => (
        <line
          data-draw key={i}
          x1="250" y1="25" x2="250" y2="195"
          stroke={chakraColor} strokeWidth="1" opacity="0.5"
          transform={`rotate(${i * 22.5} 250 250)`}
        />
      ))}

      {/* ── 8 Diamond petals at r=140 ── */}
      {Array.from({ length: 8 }, (_, i) => (
        <polygon
          key={i}
          points="250,100 238,112 250,124 262,112"
          fill="none" stroke={chakraColor} strokeWidth="1.5" opacity="0.7"
          transform={`rotate(${i * 45} 250 250)`}
        />
      ))}

      {/* ── Dot accents at r=185 ── */}
      {dotAccents.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="3" fill={chakraColor} opacity="0.8" />
      ))}

      {/* ── Outer tick dots at r=225 ── */}
      {outerTicks.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2" fill={chakraColor} opacity="0.6" />
      ))}

      {/* ── Inner petals at r=55 ── */}
      {Array.from({ length: 8 }, (_, i) => (
        <polygon
          key={i}
          points="250,210 244,217 250,224 256,217"
          fill="none" stroke={chakraColor} strokeWidth="1.5" opacity="0.6"
          transform={`rotate(${i * 45} 250 250)`}
        />
      ))}

      {/* ── Bindu — center ── */}
      <circle ref={binduRingRef} cx="250" cy="250" r="16" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle ref={binduRef} cx="250" cy="250" r="7" fill="#FFFFFF" opacity="1" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════
   ABOUT SECTION — main export
   ══════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)
  const chakraWrapRef = useRef<HTMLDivElement>(null)

  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)

  const statsRef = useRef<HTMLDivElement>(null)
  const yearSpan = useRef<HTMLSpanElement>(null)
  const percentSpan = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const infinityRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {

      if (!reduced) {
        // Master scroll scrubbing timeline for the text blocks around the Chakra
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapRef.current,
            start: "top top",
            end: "+=4000", // 4000px of scrolling for 4 items
            scrub: 1,
            pin: true,
            refreshPriority: 1,
          }
        })

        const texts = [text1Ref, text2Ref, text3Ref, text4Ref]

        // Set initial states
        gsap.set(texts.map(t => t.current), { opacity: 0, y: 80, filter: "blur(10px)" })

        texts.forEach((text, i) => {
          // Animate IN
          tl.to(text.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 })

          // Hold duration so the user can read it
          tl.to({}, { duration: 0.8 })

          // Animate OUT
          tl.to(text.current, { opacity: 0, y: -80, filter: "blur(10px)", duration: 1 })
        })

        // Animate the Chakra wrapper rotation and scale over the entire duration of the texts
        tl.to(chakraWrapRef.current, {
          rotation: 360, // Spins 360 degrees over the scroll
          scale: 1.6,    // Grows continuously from 1.0 to 1.6
          ease: "none",
          duration: tl.duration() // Exactly matches the total text animation time
        }, 0)

        // Force a layout refresh slightly after mount to guarantee subsequent sections 
        // (like Games Section) recalculate their start points correctly.
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      }
      /* Stat counters */
      if (statsRef.current) {
        const st = { trigger: statsRef.current, start: 'top 85%', once: true }

        /* 2025 count-up */
        const yearObj = { val: 2020 }
        gsap.to(yearObj, {
          val: 2025,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (yearSpan.current) yearSpan.current.textContent = Math.round(yearObj.val).toString()
          },
          scrollTrigger: st,
        })

        /* 100% count-up + progress bar */
        const pctObj = { val: 0 }
        gsap.to(pctObj, {
          val: 100,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (percentSpan.current) percentSpan.current.textContent = Math.round(pctObj.val) + '%'
          },
          scrollTrigger: st,
        })
        gsap.to(progressRef.current, {
          width: '100%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: st,
        })

        /* ∞ — scale-in */
        gsap.from(infinityRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
          delay: 0.4,
          scrollTrigger: st,
        })
      }
    }, sectionRef)

    if (reduced) { ctx.revert(); return }
    return () => ctx.revert()
  }, [])

  const features = [
    { label: 'NARRATIVE FIRST', desc: 'Every game begins with a story worth telling — emotional depth and meaningful choices above all else.' },
    { label: 'CULTURAL ROOTS', desc: "Drawing from India's 5000-year mythology, we weave authentic elements into modern gameplay." },
    { label: 'GLOBAL VISION', desc: 'Built in India, crafted for players everywhere. Great stories are always universal.' },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative bg-[var(--warm-black)]"
    >
      {/* ── Kintsugi divider ── */}
      <KintsugiDivider />

      {/* ── Pinned Chakra & Text Section ── */}
      <div ref={pinWrapRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Interactive Cinematic Background */}
        <GodRays className="opacity-40" />
        <Particles quantity={150} color="#FF6B00" className="opacity-80" />

        {/* Soft Ambient Glows behind Chakra */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--amber-ember)] rounded-full blur-[150px] opacity-[0.08] pointer-events-none" />

        {/* Static Tag */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 px-6 py-2 border border-[var(--amber-ember)] rounded-full bg-black/20 backdrop-blur-sm">
          <span className="font-display text-[var(--amber-ember)] text-sm tracking-[0.2em] uppercase">
            ◈ Who We Are
          </span>
        </div>

        {/* The Fixed Spinning Chakra */}
        <div ref={chakraWrapRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <Yantra triggerEl={sectionRef} />
        </div>

        {/* ── Scrolled Text Blocks ── */}

        {/* Text 1 (Left Side) */}
        <div ref={text1Ref} className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2 max-w-md z-10 p-6" style={{ willChange: 'filter, transform, opacity' }}>
          <h2 className="font-display text-[var(--white-pure)] text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-4">
            FORGING THE <br />
            <span className="text-[var(--amber-ember)]">NEXT ERA</span>
          </h2>
          <p className="font-sans text-lg text-[var(--white-muted)] leading-relaxed">
            Chronovale Studios is an independent game studio from India — crafting interactive narratives that bridge 5000 years of mythology with the future of play.
          </p>
        </div>

        {/* Text 2 (Right Side) */}
        <div ref={text2Ref} className="absolute right-[5%] md:right-[10%] lg:right-[15%] top-1/2 -translate-y-1/2 max-w-md z-10 p-6 text-right" style={{ willChange: 'filter, transform, opacity' }}>
          <div className="flex items-center justify-end gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--amber-ember)]" />
            <h3 className="font-display text-[var(--white-pure)] text-4xl md:text-5xl lg:text-6xl tracking-wide">
              NARRATIVE FIRST
            </h3>
          </div>
          <p className="font-sans text-lg text-[var(--white-muted)] leading-relaxed">
            Every game begins with a story worth telling — emotional depth and meaningful choices above all else.
          </p>
        </div>

        {/* Text 3 (Left Side) */}
        <div ref={text3Ref} className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2 max-w-md z-10 p-6" style={{ willChange: 'filter, transform, opacity' }}>
          <div className="flex items-center justify-start gap-3 mb-4">
            <h3 className="font-display text-[var(--white-pure)] text-4xl md:text-5xl lg:text-6xl tracking-wide">
              CULTURAL ROOTS
            </h3>
            <div className="w-8 h-px bg-[var(--amber-ember)]" />
          </div>
          <p className="font-sans text-lg text-[var(--white-muted)] leading-relaxed">
            Drawing from India's 5000-year mythology, we weave authentic elements into modern gameplay.
          </p>
        </div>

        {/* Text 4 (Right Side) */}
        <div ref={text4Ref} className="absolute right-[5%] md:right-[10%] lg:right-[15%] top-1/2 -translate-y-1/2 max-w-md z-10 p-6 text-right" style={{ willChange: 'filter, transform, opacity' }}>
          <div className="flex items-center justify-end gap-3 mb-4">
            <div className="w-8 h-px bg-[var(--amber-ember)]" />
            <h3 className="font-display text-[var(--white-pure)] text-4xl md:text-5xl lg:text-6xl tracking-wide">
              GLOBAL VISION
            </h3>
          </div>
          <p className="font-sans text-lg text-[var(--white-muted)] leading-relaxed">
            Built in India, crafted for players everywhere. Great stories are always universal.
          </p>
        </div>

      </div>

      {/* ── Bottom Stats Bar ── */}
      <div
        ref={statsRef}
        className="relative border-t border-white/10 z-10"
        style={{ background: 'rgba(15, 10, 6, 0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-6 gap-8 md:gap-0">

          <span className="font-display text-2xl tracking-[0.15em] text-white/30 uppercase hidden lg:block">
            CHRONOVALE
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="font-display text-[var(--white-pure)] text-5xl md:text-6xl">
                <span ref={yearSpan}>2020</span>
              </div>
              <div className="font-mono text-[var(--amber-ember)] uppercase mt-2 text-xs tracking-[0.2em]">FOUNDED</div>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center">
              <div className="font-display text-[var(--white-pure)] text-5xl md:text-6xl flex items-center gap-3">
                <span className="text-[var(--amber-ember)] text-3xl">◈</span> INDIA
              </div>
              <div className="font-mono text-[var(--amber-ember)] uppercase mt-2 text-xs tracking-[0.2em]">LOCATION</div>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center">
              <div className="font-display text-[var(--white-pure)] text-5xl md:text-6xl">
                <span ref={percentSpan}>0%</span>
              </div>
              <div className="font-mono text-[var(--amber-ember)] uppercase mt-2 text-xs tracking-[0.2em]">INDIE</div>
              <div className="mt-2 h-[2px] bg-white/10 w-full overflow-hidden rounded-full">
                <div ref={progressRef} className="h-full bg-[var(--amber-ember)]" style={{ width: 0 }} />
              </div>
            </div>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <div className="text-center">
              <div className="font-display text-[var(--white-pure)] text-5xl md:text-6xl">
                <span ref={infinityRef}>∞</span>
              </div>
              <div className="font-mono text-[var(--amber-ember)] uppercase mt-2 text-xs tracking-[0.2em]">STORIES</div>
            </div>
          </div>

          <span className="font-mono text-xs tracking-[0.2em] text-white/30 uppercase hidden lg:block">
            MUMBAI, INDIA
          </span>
        </div>
      </div>
    </section>
  )
}
