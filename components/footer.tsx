'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#0A0806] pt-16 pb-6 overflow-hidden border-t border-[var(--gold)]/20">
      
      {/* TOP: Massive Text Logo */}
      <div className="w-full px-6 flex justify-center mb-12">
        <h2 className="text-[13vw] leading-[0.8] font-display text-[var(--warm-white)] tracking-tighter lowercase">
          chronovale
        </h2>
      </div>

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-[var(--gold)]/20 mb-16" />

      {/* MIDDLE: Newsletter + Links Grid */}
      <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0">
        
        {/* Newsletter (Left Column) */}
        <div className="md:col-span-4 lg:col-span-3 md:pr-16 md:border-r border-[var(--gold)]/20 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono text-[var(--gold)] mb-8 opacity-90">Newsletter</h3>
            
            <div className="relative border-b border-white/20 pb-3 mb-3 flex items-center group">
              <input 
                type="email" 
                placeholder="your.email@mail.com" 
                className="bg-transparent w-full text-sm outline-none text-[var(--warm-white)] placeholder:text-white/30"
              />
              <button className="text-white/50 group-hover:text-[var(--gold)] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[9px] text-white/40 uppercase tracking-widest mb-12 font-mono">
              I accept the conditions
            </p>
          </div>
          
          <div className="flex gap-6 mt-8 md:mt-0">
            <a href="#" className="text-white/50 hover:text-[var(--gold)] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-[var(--gold)] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-[var(--gold)] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links (Right Columns) */}
        <div className="md:col-span-8 lg:col-span-9 md:pl-16 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div>
            <h4 className="text-sm font-mono text-[var(--gold)] mb-8 opacity-90">Games</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="#games" className="hover:text-[var(--warm-white)] transition-colors">Our Titles</Link></li>
              <li><Link href="#vision" className="hover:text-[var(--warm-white)] transition-colors">In Development</Link></li>
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Merch Store</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono text-[var(--gold)] mb-8 opacity-90">Studio</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="#about" className="hover:text-[var(--warm-white)] transition-colors">About Us</Link></li>
              <li><Link href="#team" className="hover:text-[var(--warm-white)] transition-colors">Careers</Link></li>
              <li><Link href="#team" className="hover:text-[var(--warm-white)] transition-colors">Leadership</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono text-[var(--gold)] mb-8 opacity-90">Community</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Discord Server</Link></li>
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Dev Blog</Link></li>
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-mono text-[var(--gold)] mb-8 opacity-90">Support</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-[var(--warm-white)] transition-colors">Terms of Service</Link></li>
              <li><Link href="#contact" className="hover:text-[var(--warm-white)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-[var(--gold)]/20 mt-20 mb-6" />

      {/* BOTTOM: Copyright */}
      <div className="max-w-[1800px] mx-auto px-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
          COPYRIGHT CHRONOVALE {new Date().getFullYear()}
        </p>
      </div>

    </footer>
  )
}
