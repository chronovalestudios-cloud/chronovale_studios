"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FounderCardProps {
  name: string
  role: string
  quote: string
  image: string
  delay?: number
  className?: string
}

export function FounderCard({ name, role, quote, image, delay = 0, className }: FounderCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={cn("group bg-bg-surface border border-bg-border border-t-0 flex flex-col relative rounded-sm h-full", className)}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--gradient-fire)]" />
      
      <div className="p-6 pb-0">
        <div className="w-full aspect-[4/5] overflow-hidden temple-arch mb-6 relative bg-warm-black">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover filter grayscale-[20%] transition-all duration-400 group-hover:grayscale-0 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full border border-bg-border border-dashed flex items-center justify-center text-text-muted font-mono text-xs">
              PORTRAIT
            </div>
          )}
        </div>
      </div>
      
      <div className="px-6 flex flex-col flex-1 pb-6">
        <h3 className="font-heading font-bold text-2xl text-warm-white">{name}</h3>
        <p className="font-mono text-[11px] uppercase tracking-widest text-saffron mt-1 mb-4">{role}</p>
        <p className="font-sans italic text-[15px] text-text-secondary flex-1 leading-relaxed">"{quote}"</p>
      </div>
      
      <div className="h-[1px] w-full bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] mt-auto" />
    </motion.div>
  )
}
