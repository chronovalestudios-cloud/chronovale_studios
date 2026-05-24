# design.md — Chronovale Studios
> Version 2.0 · Complete rebuild.
> This is the single source of truth. Change anything here first, then apply it to code.
> When instructing an AI: *"Follow design.md exactly for all visual decisions."*

---

## 0. The Vision — Read This First

### What is Chronovale?

The name breaks into two roots:

- **Chrono** — from Greek *chronos* (χρόνος), meaning **time**. Ancient. Inevitable. The force that builds and destroys civilisations.
- **Vale** — a valley. A place held between two heights. A **threshold** — the space between eras.

Together: **Chronovale is the valley between time periods.** A studio that stands at the intersection of ancient narrative and future technology. The past and the future meet here and become games.

This name is not decoration — it is the design brief. Every visual decision must ask: *does this feel like it exists at the edge of two eras?*

### The Three Pillars

| Pillar | Meaning | Visual Expression |
|---|---|---|
| **Time** | Ancient + future coexisting | Stone-dark surfaces, sharp modern type, old geometry meeting clean grids |
| **South India** | Cultural root, not tourist souvenir | Temple geometry, Kolam patterns, Dravidian arch forms, bronze material language |
| **Studio Grade** | Professional, not indie-hobbyist | Tight spacing, confident type, no clutter, no decoration for decoration's sake |

### The Tone in One Line
> *"A Chola dynasty temple, if it were built in the year 2400."*

---

## 1. Colour Palette

### Philosophy

Three families. Each earns its place.

- **Warm Black** — the stone. Ancient, heavy, grounded. The walls of the temple.
- **Warm White** — the light through the gopuram. Calm, sacred, legible.
- **Amber Ember** — the deepa lamp. The single flame in the dark. Every CTA, every accent, every moment of energy.

No blue. No purple. No neon. Nothing that breaks the warmth.

### CSS Custom Properties

Define in `globals.css` `:root`. Every other file uses variables — never hardcoded hex.

```css
:root {

  /* WARM BLACK FAMILY
     Brown-black, not grey-black.
     Each step is a layer of depth —
     like moving deeper into a temple. */
  --void:          #0F0A06;   /* Deepest. The sanctum sanctorum. Page background. */
  --bg-deep:       #160D08;   /* Main section backgrounds. */
  --bg-surface:    #1E140C;   /* Cards, panels, nav backdrop. */
  --bg-raised:     #232018;   /* Hover states, active inputs, raised elements. */
  --bg-border:     #2A1A10;   /* Dividers, separators, input borders at rest. */
  --bg-subtle:     #3A3530;   /* Disabled states, placeholder backgrounds. */

  /* WARM WHITE FAMILY
     Not cold white. Aged stone.
     Like light hitting a temple wall at dawn. */
  --white-pure:    #F5F0E8;   /* Logo on dark bg. Hero headings. Max contrast text. */
  --white-warm:    #EDE8DF;   /* H2, H3. Slightly dimmed from pure. */
  --text-body:     #C8C0B4;   /* All body paragraphs. */
  --text-secondary:#A09A8E;   /* Captions, taglines, labels, metadata. */
  --text-muted:    #5C5650;   /* Placeholder, disabled. */

  /* AMBER EMBER — THE FLAME
     Use with intention. This is the
     only colour with real saturation.
     Every use must feel deliberate. */
  --amber-ember:              #D85C1F;               /* Primary accent. CTAs, active states, section labels. */
  --amber-ember-deep:         #C04B14;               /* Hover state of --amber-ember. Deeper warmth. */
  --amber-ember-glow:         rgba(216,92,31,0.15);  /* Ambient halo for box-shadow, hover tints. */
  --amber-ember-glow-strong:  rgba(216,92,31,0.25);  /* Stronger glow. Focus rings, card hover shadows. */
  --amber-ember-dim:          rgba(216,92,31,0.08);  /* Barely-there tint. Active nav background. */

  /* GRADIENTS */
  --gradient-amber: linear-gradient(135deg, #E8943A, #C97B35);
  --gradient-stone: linear-gradient(180deg, #080705 0%, #1A1410 100%);
  --gradient-card:  linear-gradient(180deg, transparent 35%, rgba(8,7,5,0.96) 100%);
  --gradient-veil:  linear-gradient(180deg, rgba(8,7,5,0) 0%, #080705 100%);
}
```

### Colour Role Reference

| Variable | Use | Never |
|---|---|---|
| `--warm-black` | Page background | Cards, sections |
| `--bg-surface` | Cards, panels, nav | Page background |
| `--amber-ember` | CTAs, active states, ◈ labels | Body text, large fills, backgrounds |
| `--white-pure` | Logo, hero H1, button labels on amber-ember | Body copy at 14px or smaller |
| `--text-body` | All paragraphs | Headings |
| `--bg-border` | Dividers, card borders | Hover states (use `--bg-raised`) |

### Colours to Never Use

- Any blue-grey (`#16162A`, `#0F0F1A` — removed from v1)
- Cold white (`#FFFFFF`, `#F0F0F0`) — clinical, kills warmth
- `#343434` as a background — charcoal grey, destroys amber's contrast
- Neon cyan, purple, matrix green — break cultural character

---

## 2. South Indian Temple Design Language

### Philosophy

Dravidian temple architecture is one of the most geometrically sophisticated visual traditions on earth. We do not recreate a temple. We absorb its geometry, rhythm, and proportion into a digital interface.

**What we take:**
- Layered, stacked vertical geometry (gopuram tower logic)
- Repeating geometric border friezes
- The lotus / padma concentric geometry
- The Kolam dot-grid system — mathematical, meditative
- Bronze and dark-stone material language
- The pointed arch of temple entrances (torana / gopuram gate)

**What we leave behind:**
- Literal deity imagery or temple illustrations
- Decorative overload (one motif per section, maximum)
- Anything that reads as pastiche or costume

### 2.1 Kolam Grid — Background Texture

Kolam is a South Indian mathematical art — a grid of equidistant dots connected by continuous flowing lines. We use the dot grid alone, stripped of connecting lines. Pure geometric rhythm.

```css
/* Primary kolam texture — large dot grid */
.kolam-texture {
  background-image: radial-gradient(circle, var(--bg-border) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
}

/* Dense variant for section floors */
.kolam-dense {
  background-image: radial-gradient(circle, var(--bg-border) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.3;
}
```

**Rules:**
- Always behind content (`z-index: 0`, content at `z-index: 1`).
- Fade edges with `mask-image: radial-gradient(ellipse, black 40%, transparent 80%)`.
- Never use as a full-section fill — use as a band or corner accent.

### 2.2 Gopuram Stripe — Layered Dividers

A gopuram tower reads as stacked horizontal bands, each narrower as it rises. Translated to UI as double-line dividers — heavy below, thin above — to create a sense of vertical weight.

```css
/* Standard gopuram divider — double rule */
.gopuram-divider {
  border: none;
  height: 5px;
  background:
    linear-gradient(var(--bg-border), var(--bg-border)) 0 0 / 100% 1px no-repeat,
    linear-gradient(var(--bg-border), var(--bg-border)) 0 4px / 100% 1px no-repeat;
}

/* Amber variant — for key section transitions */
.gopuram-divider-amber {
  background:
    linear-gradient(var(--amber), var(--amber)) 0 0 / 100% 1px no-repeat,
    linear-gradient(var(--bg-border), var(--bg-border)) 0 4px / 100% 1px no-repeat;
}
```

### 2.3 Torana Arch — Card and Photo Frames

The torana is the pointed gateway arch above temple entrances and shrine niches. Used as a CSS `clip-path` on photo containers and card tops.

```css
/* Standard torana — used on founder photo containers */
.torana-arch {
  clip-path: polygon(0% 12%, 50% 0%, 100% 12%, 100% 100%, 0% 100%);
}

/* Soft torana — for cards where a hard clip is too stark */
.torana-soft {
  clip-path: polygon(0% 8%, 25% 0%, 75% 0%, 100% 8%, 100% 100%, 0% 100%);
}
```

### 2.4 Lotus / Padma — Section Watermark

The padma (lotus) in Dravidian art is an 8-petal geometric form radiating from a centre point — used extensively in temple ceilings and floor mandapas. We use it as a large SVG watermark behind section numbers.

- **SVG spec:** 8-petal lotus outline, `stroke: var(--bg-border)`, `fill: none`, `stroke-width: 0.5`.
- **Size:** 240×240px (section numbers), 400×400px (Vision section background).
- **Opacity:** 0.10 default, rising to 0.18 on scroll entry.
- **Animation:** On ScrollTrigger enter — petals draw from `stroke-dashoffset: total → 0` over 2.5s, ease `power2.out`. GSAP `drawSVG` plugin.
- **Behind Devanagari numerals:** Section numbers `01, 02, 03` have their Tamil/Devanagari equivalent (`௧, ௨, ௩`) at 6% opacity behind them.

### 2.5 Frieze Border — Repeating Geometric Band

Temple friezes are horizontal bands of repeating interlocking geometry. Used as section edge decorations.

```css
/* Chevron frieze — neutral */
.frieze-border {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8'%3E%3Cpath d='M0 8 L4 0 L8 8 L12 0 L16 8' stroke='%232E2A22' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  height: 8px;
  opacity: 0.6;
}

/* Amber frieze — hero section and key dividers */
.frieze-border-amber {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='8'%3E%3Cpath d='M0 8 L4 0 L8 8 L12 0 L16 8' stroke='%23E8943A' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  height: 8px;
  opacity: 0.35;
}
```

**Usage:** Hero section top/bottom edges. Footer divider. One use per section maximum.

### 2.6 Deepam Glow — The Lamp Light

A *deepam* (oil lamp) creates a localised warm amber glow that fades softly. This is the physical model for all glow effects in the UI.

```css
/* Deepam glow — hover states, CTAs, active elements */
.deepam-glow {
  box-shadow:
    0 0 0 1px var(--amber-glow),
    0 0 20px var(--amber-glow),
    0 0 60px rgba(232, 148, 58, 0.05);
}

/* Section label text glow */
.deepam-text-glow {
  text-shadow: 0 0 24px var(--amber-glow-strong);
}
```

---

## 3. Typography

### Font Stack

```css
/* Import via next/font/google */
/* Cinzel            — weights: 400, 500, 600, 700 */
/* Inter             — variable weights */
/* JetBrains Mono    — weights: 400, 500 */
```

Note: Do NOT use Bebas Neue or Space Grotesk. The Chronovale logo uses Cinzel.

### Font Roles

| Font | Weight | Role |
|---|---|---|
| Cinzel | Regular | Hero display, all section headings (H1–H2), logo |
| Cinzel | Regular | H3, card titles, large display elements |
| Inter | Medium | UI labels, nav links, meta text, stat numbers |
| Inter | Regular | All body copy, form labels, small text |
| JetBrains Mono | Regular | Section labels (◈ …), genre tags, coordinates, version numbers |

### Type Scale

```js
// tailwind.config.ts
fontSize: {
  'display':  ['clamp(72px,11vw,160px)', { lineHeight:'0.92', letterSpacing:'-0.03em', fontWeight:'700' }],
  'h1':       ['clamp(40px,6vw,80px)',   { lineHeight:'1.05', letterSpacing:'-0.02em', fontWeight:'700' }],
  'h2':       ['clamp(28px,3.5vw,52px)', { lineHeight:'1.15', letterSpacing:'-0.01em', fontWeight:'700' }],
  'h3':       ['clamp(20px,2.5vw,32px)', { lineHeight:'1.25', letterSpacing:'0',       fontWeight:'500' }],
  'body-lg':  ['18px', { lineHeight:'1.75', letterSpacing:'0',      fontWeight:'400' }],
  'body':     ['16px', { lineHeight:'1.7',  letterSpacing:'0',      fontWeight:'400' }],
  'body-sm':  ['14px', { lineHeight:'1.65', letterSpacing:'0.01em', fontWeight:'400' }],
  'label':    ['11px', { lineHeight:'1',    letterSpacing:'0.14em', fontWeight:'500' }],
  'mono':     ['13px', { lineHeight:'1.4',  letterSpacing:'0.06em', fontWeight:'400' }],
}
```

### Typography Rules

- **Weight contrast within a heading:** Pair Space Grotesk 300 + 700 in the same line. Example: `<span class="font-light">Forging the</span> <span class="font-bold">next era</span>`.
- **Section labels:** Always `JetBrains Mono`, `text-label`, `uppercase`, `tracking-widest`, `text-amber`. Always preceded by `◈ `.
- **All-caps letter-spacing:** Minimum `0.10em` at display sizes, `0.14em` at label sizes.
- **Body copy max-width:** `65ch`. Never wider.
- **No centred body text.** Centre only single-line headings and labels.
- Never use more than 3 font families simultaneously on one screen.

---

## 4. Spacing and Layout

```js
// tailwind.config.ts
spacing: {
  'section':        '140px',   /* Desktop vertical section gap */
  'section-sm':     '80px',    /* Mobile vertical section gap */
  'content-max':    '1320px',  /* Maximum content width */
  'content-mid':    '960px',   /* Mid-width (about, vision) */
  'content-narrow': '640px',   /* Narrow (forms, manifestos) */
}
```

- All sections: `px-6 md:px-12 lg:px-24` horizontal padding.
- Content containers: `max-w-[--content-max] mx-auto`.
- Every section heading group: `◈ LABEL` + Heading + optional tagline, stacked with `gap-3`.
- Two-column desktop grids collapse to single column at `md:` breakpoint.

---

## 5. Component Specifications

### 5.1 Buttons

```
PRIMARY (Filled)
  background:    var(--gradient-amber)
  color:         var(--warm-black)
  font:          Space Grotesk 600, text-label, uppercase, tracking-widest
  padding:       14px 36px
  border-radius: 30px  ← rounded, pill-shaped. Smooth and modern.
  hover:         background → --amber-ember-deep, box-shadow: deepam-glow
  active:        scale(0.97)
  transition:    all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)

GHOST (Outline)
  background:    transparent
  border:        1px solid var(--amber-ember)
  color:         var(--amber-ember)
  padding:       13px 34px
  border-radius: 30px
  hover:         background: var(--amber-ember-dim), border-color: var(--amber-ember-deep)
  active:        scale(0.97)

TEXT LINK
  color:         var(--text-secondary)
  hover:         color: var(--white-warm), underline scaleX 0→1
  No border, no background.
```

### 5.2 Section Label

```
◈ WHO WE ARE

Font:       JetBrains Mono, text-label (11px), uppercase
Color:      var(--amber)
Tracking:   0.14em
Prefix:     ◈  with margin-right: 8px
Usage:      Always above a heading. Never alone.
```

### 5.3 Game Card

```
Width: 420px, Height: 560px
background: var(--bg-surface)
border: 1px solid var(--bg-border)
border-radius: 3px

Layers (back to front):
  Image:    full-bleed, object-fit cover, z-index 0
            filter: brightness(0.7) default → brightness(0.85) on hover
            transform: scale(1.0) → scale(1.06) on hover
  Overlay:  var(--gradient-card), z-index 1
  Content:  z-index 2, position absolute bottom-0, padding 28px 24px

  Genre tag: JetBrains Mono, text-label, uppercase, var(--amber)
             background: var(--bg-raised), padding: 4px 10px, border-radius: 2px
  Title:     Space Grotesk 700, text-h3, var(--white-pure)
  Status:    DM Sans 400, text-body-sm, var(--text-secondary)

Hover:
  border-color: var(--amber)
  box-shadow: 0 0 0 1px var(--amber-glow), 0 20px 60px rgba(0,0,0,0.5)
  card: scale(1.02)
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)

Frieze border (.frieze-border) at card bottom, opacity 0.3
```

### 5.4 Founder Card

```
background: var(--bg-surface)
border: 1px solid var(--bg-border)
border-radius: 3px

Photo container:
  Apply .torana-arch clip-path
  height: 280px
  filter: grayscale(15%) → grayscale(0%) on hover

Content (padding 24px):
  Name:   Space Grotesk 700, text-h3, var(--white-pure)
  Role:   JetBrains Mono, text-label, uppercase, var(--amber), margin-top 4px
  Quote:  DM Sans 400 italic, text-body-sm, var(--text-secondary), margin-top 12px
  Rule:   1px solid var(--bg-border), margin-top 16px

Entry: left founder slides from x:-60, right from x:+60. Framer Motion, viewport once:true.
```

### 5.5 Navbar

```
fixed top-0, full width, z-index: 100, height: 64px

Over hero:    background transparent, no border
Scrolled:     background rgba(8,7,5,0.88), backdrop-filter blur(24px), border-bottom 1px solid var(--bg-border)
Transition:   all 0.5s ease

Left:    "CHRONOVALE STUDIOS" — Space Grotesk 700, var(--white-pure), click → scroll top
Centre:  Nav links — DM Sans 500, 14px, var(--text-secondary)
         Hover: var(--white-warm). Active section: var(--amber) + 3px dot below.
Right:   Ghost CTA button — small, "ENTER THE STUDIO"
```

### 5.6 Contact Form

```
Max-width: 600px, centred

Inputs:
  background: transparent
  border: none
  border-bottom: 1px solid var(--bg-border)
  color: var(--white-pure)
  font: DM Sans 400, 16px
  padding: 14px 0

Focus:
  border-bottom: 1px solid var(--amber)
  box-shadow: 0 3px 12px var(--amber-glow)

Floating labels:
  Default:    inside input, font-size 16px, color var(--text-muted)
  Focus/fill: translateY(-22px), font-size 11px, color var(--amber)
  Transition: all 0.25s ease

Role selector: pill toggle group, JetBrains Mono
  Default: transparent bg, border var(--bg-border)
  Active:  background var(--amber), color var(--void)

Submit: full-width Primary button, label "SEND TRANSMISSION"
```

---

## 6. Section Specifications

### Section 01 — Hero

```
Height: 100svh
Background (layers, back to front):
  1. var(--void) base
  2. Kolam texture (.kolam-texture), full section, masked at edges
  3. Radial vignette — transparent centre → var(--void) at edges
  4. Aceternity Background Beams, amber-toned
  5. tsParticles — amber + amber-deep ONLY, 50 particles desktop / 20 mobile
  6. Content

Content (centred, vertical stack):
  ◈ INDIA · EST. 2025 · CHRONOVALE STUDIOS
    JetBrains Mono, text-label, amber — fadeIn delay 1.4s

  "CHRONOVALE"
    Space Grotesk 700, text-display, var(--white-pure)
    Letter stagger: y:60→0, opacity:0→1, stagger 0.04s, delay 1.4s

  "STUDIOS"
    Space Grotesk 300, ~60% of display size, var(--text-secondary)
    Same stagger, offset +0.3s

  1px amber rule, width 80px — fadeIn delay 1.8s

  Tagline: "The valley between eras. We build worlds at the edge of time."
    DM Sans 400, text-body-lg, var(--text-secondary), max-width 480px
    fadeUp delay 2.0s

  [ENTER THE STUDIO] + [OUR GAMES]
    fadeUp delay 2.2s

Frieze: .frieze-border-amber at hero top and bottom edges.
Parallax: content moves at 0.3× scroll speed, particles at 0.6× (GSAP + Lenis)
```

### Section 02 — The Chronicle (About)

```
Background: var(--bg-deep)
Gopuram divider at top

Mandala SVG: top-right corner, 300×300, drawSVG on ScrollTrigger enter, 2.5s

Layout: two-column desktop (5/7 split)
  Left:  "01" section number (Space Grotesk 700, 120px, var(--bg-raised))
         Lotus SVG watermark behind it
         Tamil numeral ௧ at 6% opacity
         ◈ THE CHRONICLE label
         H2 heading

  Right: Body copy + stat row

Heading: "BUILT IN INDIA. BUILT ACROSS TIME."
  "ACROSS TIME" in var(--amber)

Body copy (reference the name meaning):
  "Chronovale — the valley between eras. We stand at the threshold
   where ancient storytelling meets future technology.
   Every game we build is a bridge across time."

Stats (animated count-up on first scroll-into-view):
  "2" — FOUNDERS
  "∞" — STORIES
  "1" — STUDIO
  Number: Space Grotesk 700, text-h2, var(--amber)
  Label:  JetBrains Mono, text-label, var(--text-secondary)
```

### Section 03 — The Vision

```
Background: var(--void)
Lotus SVG: 400×400, centred, opacity 0.04, behind pull quote

Pull quote (scroll-lit words):
  "WE DON'T MAKE GAMES.
   WE BUILD WORLDS
   WORTH LIVING IN."
  Space Grotesk 700, text-h1
  Each word: opacity 0.08 default → opacity 1.0 as it enters viewport centre
  GSAP ScrollTrigger scrub: true on each word span

Supporting paragraph below — DM Sans 400, var(--text-secondary), max-width --content-narrow

Marquee ribbon (full width, infinite auto-scroll):
  "NARRATIVE · TIME · CULTURE · SOUTH INDIA · IMMERSION · WORLDS ·"
  JetBrains Mono, text-label, uppercase, var(--amber), opacity 0.5
  Speed: 40s cycle. Pause on hover.
  Frieze borders above and below.
```

### Section 04 — Games Showcase

```
GSAP horizontal pin-scroll:
  Pin: .games-section at top:top
  Translate: .games-track x:0 → x:-(totalWidth - viewportWidth)
  scrub: 1, ease: none
  Progress: 2px amber line at section top, scaleX 0→1

Sticky left panel (visible during scroll):
  ◈ OUR GAMES
  Section number "04" + Lotus watermark
  "→ SCROLL TO EXPLORE" — fades after 300px scroll

Cards: GameCard component (§5.3), gap 32px, outer padding 96px
First card: "COMING SOON" treatment if no released games

Mobile fallback:
  overflow-x: auto
  scroll-snap-type: x mandatory
  Cards: scroll-snap-align: center
```

### Section 05 — The Founders

```
Background: var(--bg-deep)
Gopuram divider at top
Kolam texture behind section, opacity 0.25

◈ THE FOUNDERS
Sub: "Two builders. One studio. Infinite timelines."

Two FounderCard components (§5.4), side by side desktop, stacked mobile
```

### Section 06 — Enter the Studio

```
Background: var(--void)
Frieze border at top
Kolam dense texture (.kolam-dense), heavy edge fade
Lotus SVG: large, centred, behind form, opacity 0.03

"ENTER THE STUDIO"
  Space Grotesk 700, text-h1
  On entry: amber underline draws (scaleX: 0→1), 0.6s duration

Sub: "Tell us who you are. We'll take it from there."

ContactForm (§5.6)
```

---

## 7. Animation System

### 7.1 Lenis Smooth Scroll

```ts
// lib/lenis.ts
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 2,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
// NEVER use scroll-behavior: smooth on <html>
```

### 7.2 Easing Tokens

```ts
// lib/easing.ts
export const ease = {
  out:      'power2.out',       // Standard section entry
  inOut:    'power2.inOut',     // State transitions
  snap:     'expo.out',         // Snappy UI (button press, nav toggle)
  smooth:   'sine.inOut',       // Ambient motion
  dramatic: 'power4.out',       // Hero letters, intro sequence
  reveal:   [0.25, 0.46, 0.45, 0.94] as const,  // Framer Motion
}
```

### 7.3 Page Load Intro Sequence

Check `sessionStorage.getItem('cv_intro_seen')` — skip if true.

```
T=0.0s  --void screen. Amber frieze border draws around viewport.
         SVG stroke-dashoffset: perimeter→0, 0.5s, power2.out

T=0.5s  "CHRONOVALE" centre screen, Space Grotesk 700, --white-pure.
         y:10→0, opacity:0→1, 0.35s

T=0.6s  "STUDIOS" below, Space Grotesk 300, --text-secondary.
         Same animation.

T=0.95s "CHRONOVALE" slides to navbar position (top-left).
         "STUDIOS" fades out.
         Duration: 0.45s, expo.out

T=1.4s  Hero content enters. Particles begin. Frieze borders appear.
```

### 7.4 Default Section Entry

```ts
// GSAP
gsap.from(element, {
  opacity: 0, y: 36, duration: 0.85, ease: 'power2.out', stagger: 0.12,
  scrollTrigger: { trigger: section, start: 'top 72%', once: true }
})

// Framer Motion
initial={{ opacity: 0, y: 36 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.2 }}
transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
```

### 7.5 Custom Cursor (Desktop Only)

```
Outer ring: 32px circle, border: 1px solid var(--amber), opacity 0.6
  Follows with lerp 0.12 (lagged)
Inner dot:  4px, filled var(--amber), follows exactly

On link/button hover: ring scale(1.8), inner dot disappears
On card hover:        ring scale(2.4), background var(--amber-dim)
Disable on touch devices.
```

### 7.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Gate all GSAP animations: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

---

## 8. Logo Usage Rules

The Chronovale logo is a geometric monochrome wordmark.
- The **spiral aperture in the R** = a rotating shutter. A time reference. Rhymes with amber particles.
- The **circular aperture in the O** = a lens, a portal, a threshold.

These motifs connect to the Kolam grid, the lotus geometry, and the name's meaning. They are the visual anchor.

| Context | Treatment |
|---|---|
| Site (dark bg) | `var(--white-pure)` — never coloured |
| Press kit (light bg) | Original black |
| Navbar | White wordmark, click → top |
| Intro sequence | White → animates to navbar (§7.3) |
| Minimum size | 120px width |
| Clear space | 1× cap-height on all sides |
| Never | Amber fill, drop shadow, glow, rotate, stretch |

---

## 9. UI Libraries

Mix freely — use whatever serves each section best.

| Library | Use For |
|---|---|
| Aceternity UI | Background beams (hero), spotlight effect |
| Magic UI | Marquee ribbon, shimmer button variant, animated beam |
| ReactBits | Micro-interactions, animated counters, staggered reveals |
| GSAP + ScrollTrigger | Horizontal scroll, scroll-lit words, drawSVG (lotus/mandala), letter stagger |
| Framer Motion | Component animations, AnimatePresence, hover states |
| Lenis | Smooth scroll — wraps entire app |
| tsParticles | Hero particles (amber + amber-deep ONLY) |
| React Three Fiber | Optional wireframe geometry on hero (lazy, ssr:false, mobile disabled) |
| shadcn/ui | Form inputs, toggle group — re-themed to dark palette |

---

## 10. Responsive Behaviour

| Breakpoint | Key Changes |
|---|---|
| `< 640px` | Single column. Games → touch scroll-snap. Particles ≤ 20. No custom cursor. R3F disabled. |
| `640–1024px` | Two-column where possible. Type uses lower clamp end. |
| `> 1024px` | Full experience. Horizontal scroll. Custom cursor. |

### Mobile Nav Overlay

```
Trigger: hamburger → ×
Overlay: full-screen, var(--void) background, Kolam texture at 0.12 opacity
Animation: x:100%→0, 0.4s, expo.out

Links: Space Grotesk 700, text-h1, var(--white-warm)
       Stagger: y:30→0, opacity:0→1, 0.08s per link
       Hover: var(--amber)

Bottom: ◈ CHRONOVALE STUDIOS — JetBrains Mono, amber
```

---

## 11. File Architecture

```
app/
  layout.tsx            ← Lenis provider, fonts, custom cursor, metadata
  page.tsx              ← All 6 sections + intro sequence
  globals.css           ← CSS variables (§1 — colour source of truth)

components/
  layout/
    Navbar.tsx
    MobileNav.tsx
    Footer.tsx
    CustomCursor.tsx     ← Desktop only

  sections/
    Hero.tsx
    Chronicle.tsx        ← About
    Vision.tsx
    GamesShowcase.tsx
    Founders.tsx
    Contact.tsx

  ui/
    Button.tsx
    SectionLabel.tsx
    GameCard.tsx
    FounderCard.tsx
    ContactForm.tsx
    AnimatedText.tsx     ← Letter stagger
    KolamTexture.tsx     ← Dot grid overlay
    LotusWatermark.tsx   ← SVG lotus with drawSVG
    FriezeBorder.tsx
    MarqueeRibbon.tsx

  three/
    HeroGeometry.tsx     ← R3F wireframe (lazy, ssr:false)

lib/
  lenis.ts
  easing.ts
  gsap.ts

public/
  assets/               ← founder photos
  textures/             ← lotus.svg, mandala.svg
```

---

## 12. Build Order

1. Setup — Next.js 14, TypeScript, Tailwind, shadcn/ui, fonts, CSS variables.
2. Static layout — all 6 sections, real copy, no animation. Get colour and type right first.
3. Lenis + GSAP — smooth scroll wired. All animations depend on this.
4. Hero — intro sequence → letter stagger → particles → parallax.
5. Temple motifs — Kolam textures, Frieze borders, Lotus watermarks, Torana arch clips.
6. Section entries — Chronicle, Vision scroll-lit words, Founders slide-in.
7. Games horizontal scroll — GSAP pin + translateX.
8. Vision marquee.
9. Custom cursor — desktop only.
10. Mobile — nav overlay, scroll-snap games, type adjustments.
11. Performance pass — lazy imports, next/image, font preload. Target: Lighthouse ≥90.

---

## 13. Copy Principles

- Sentences under 15 words. Write like a film title card.
- Use em-dashes for pause — not commas.
- Reference time, thresholds, eras, and worlds in all headlines.
- **The name in copy:** Always *Chronovale* — one word, capital C. Never "Chrono Vale". Display: `CHRONOVALE`.

**Recommended tagline:** "The valley between eras." — directly encodes the name's meaning.

---

## 14. Changelog

| Version | Change |
|---|---|
| v1.0 | Initial system — saffron + blue-black palette, Bebas Neue type |
| v2.0 | Full rebuild — warm black family, amber ember (#E8943A), South Indian temple design language, Chronovale name meaning integrated, Space Grotesk type system |

> **How to use:** Find the relevant section. Update the value. Add a changelog row. Tell your AI: *"Update code to match design.md section X."*