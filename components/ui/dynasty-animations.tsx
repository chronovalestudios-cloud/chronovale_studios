"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: custom * 0.1, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: custom * 0.1, duration: 0.1 }
    }
  })
};

const drawFill = {
  hidden: { fillOpacity: 0 },
  visible: (custom: number = 0) => ({
    fillOpacity: 1,
    transition: { delay: custom * 0.1 + 1, duration: 0.8 }
  })
};

// --- LOTUS ANIMATION ---
export function AnimatedLotus({ className }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 32 32" 
      className={cn("w-full h-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <g stroke="#D4A017" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer petals (8) */}
        {[
          "M16 4 C14 8, 12 12, 16 16 C20 12, 18 8, 16 4Z",
          "M28 16 C24 14, 20 12, 16 16 C20 20, 24 18, 28 16Z",
          "M16 28 C18 24, 20 20, 16 16 C12 20, 14 24, 16 28Z",
          "M4 16 C8 18, 12 20, 16 16 C12 12, 8 14, 4 16Z",
        ].map((d, i) => (
          <motion.path 
            key={i} 
            d={d} 
            custom={i} 
            variants={drawPath} 
            fill="#D4A017" 
            fillOpacity={0}
            animate="visible"
            initial="hidden"
            style={{ opacity: 0.7 }}
            onAnimationComplete={() => {}}
          />
        ))}
        {/* Inner petals (4) */}
        {[
          "M8 8 C10 12, 12 13, 16 16 C13 12, 12 10, 8 8Z",
          "M24 8 C20 10, 19 12, 16 16 C20 13, 22 12, 24 8Z",
          "M24 24 C22 20, 20 19, 16 16 C19 20, 20 22, 24 24Z",
          "M8 24 C12 22, 13 20, 16 16 C12 19, 10 20, 8 24Z"
        ].map((d, i) => (
          <motion.path 
            key={i + 4} 
            d={d} 
            custom={i + 4} 
            variants={drawPath} 
            fill="#D4A017" 
            fillOpacity={0} 
          />
        ))}
        {/* Center */}
        <motion.circle 
          cx="16" cy="16" r="3.5" 
          custom={8} variants={drawPath} 
          fill="#9B3B2A" 
          fillOpacity={0}
        />
        <motion.circle 
          cx="16" cy="16" r="2" 
          custom={9} variants={drawPath} 
          fill="#D4A017" 
          fillOpacity={0} 
        />
      </g>
    </motion.svg>
  );
}

// --- CHAKRA ANIMATION ---
export function AnimatedChakra({ className }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 64 64" 
      className={cn("w-full h-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <g stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" fill="none">
        {/* Outer Ring */}
        <motion.circle 
          cx="32" cy="32" r="30" 
          custom={0} variants={drawPath} 
        />
        {/* Inner Hub */}
        <motion.circle 
          cx="32" cy="32" r="6" 
          custom={1} variants={drawPath} 
          strokeWidth="2"
        />
        {/* Spokes (16) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const x1 = 32 + Math.cos(angle) * 6;
          const y1 = 32 + Math.sin(angle) * 6;
          const x2 = 32 + Math.cos(angle) * 30;
          const y2 = 32 + Math.sin(angle) * 30;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              custom={i % 4 + 2} // Groups of 4 animating together
              variants={drawPath}
            />
          );
        })}
        {/* Outer Hub Ring */}
        <motion.circle cx="32" cy="32" r="12" strokeWidth="0.5" strokeDasharray="2 2" custom={6} variants={drawPath} />
        {/* Inner Decorative Circle */}
        <motion.circle cx="32" cy="32" r="24" strokeWidth="0.5" strokeDasharray="4 4" custom={7} variants={drawPath} />
      </g>
    </motion.svg>
  );
}

// --- KOLAM / RANGOLI PATTERN ---
// Represents continuous geometric knotwork
export function AnimatedKolam({ className }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className={cn("w-full h-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <g stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Continuous single line kolam pattern approximation */}
        <motion.path
          d="M50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10"
          custom={0} variants={drawPath}
        />
        <motion.path
          d="M20 20 L80 80 M20 80 L80 20"
          custom={3} variants={drawPath}
          strokeWidth="1.5"
        />
        <motion.path
          d="M50 20 C 65 20, 80 35, 80 50 C 80 65, 65 80, 50 80 C 35 80, 20 65, 20 50 C 20 35, 35 20, 50 20"
          custom={5} variants={drawPath}
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      </g>
      {/* 3x3 Grid Dots */}
      {[20, 50, 80].map((y, i) => (
        [20, 50, 80].map((x, j) => (
          <motion.circle
            key={`${i}-${j}`}
            cx={x} cy={y} r="2.5"
            fill="#D4A017"
            custom={(i * 3 + j) % 5 + 8}
            variants={drawPath}
          />
        ))
      ))}
    </motion.svg>
  );
}

// --- TORANA ARCH / DOORWAY ---
export function AnimatedTorana({ className }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 100 120" 
      className={cn("w-full h-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <g stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Inner Arch */}
        <motion.path
          d="M 20 120 L 20 50 C 20 20, 50 10, 50 10 C 50 10, 80 20, 80 50 L 80 120"
          custom={0} variants={drawPath}
        />
        {/* Outer Arch */}
        <motion.path
          d="M 10 120 L 10 45 C 10 10, 50 0, 50 0 C 50 0, 90 10, 90 45 L 90 120"
          custom={2} variants={drawPath}
        />
        {/* Pillars Detail */}
        <motion.line x1="20" y1="110" x2="10" y2="110" custom={4} variants={drawPath} />
        <motion.line x1="80" y1="110" x2="90" y2="110" custom={4} variants={drawPath} />
        <motion.line x1="20" y1="50" x2="10" y2="50" custom={5} variants={drawPath} />
        <motion.line x1="80" y1="50" x2="90" y2="50" custom={5} variants={drawPath} />
        
        {/* Top Kirtimukha (Face of Glory) placeholder */}
        <motion.circle cx="50" cy="15" r="5" custom={6} variants={drawPath} />
      </g>
    </motion.svg>
  );
}
