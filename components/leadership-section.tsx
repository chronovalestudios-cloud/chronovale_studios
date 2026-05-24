'use client'

import { SectionLabel } from './ui/section-label'
import { TiltedCard } from './ui/tilted-card'
import { AnimatedLotus } from './ui/dynasty-animations'
import { BlurText } from './ui/blur-text'
import { Particles } from './ui/particles'
import { GodRays } from './ui/god-rays'
import { motion } from 'framer-motion'

const team = [
  {
    name: 'Atharv Mirgal',
    role: 'Founder of ChronoVale Studios',
    quote: '"Great games are not just played — they are experienced."',
    description: 'Building narrative-driven games that bring Indian stories and culture to the global gaming stage.',
    image: '/assets/atharva.png',
  },
  {
    name: 'Aarya Bhansali',
    role: 'Founder of ChronoVale Studios',
    quote: '"Every world we create begins with a story worth experiencing."',
    description: 'Dedicated to bringing Indian stories to global audiences through interactive experiences.',
    image: '/assets/yash.png',
  }
]

export function LeadershipSection() {
  return (
    <section id="team" className="py-32 bg-bg-deep relative overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Cinematic Background Animations */}
      <GodRays className="opacity-40" />
      <Particles quantity={150} color="#FF6B00" className="opacity-50" />

      <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-30" />
      
      <div className="w-full relative z-10">
        
        <div className="flex flex-col items-center mb-24 text-center max-w-[1280px] mx-auto px-6">
          <SectionLabel>LEADERSHIP</SectionLabel>
          <h2 className="text-h1 text-warm-white">
            The minds behind the <span className="text-[var(--gold)]">mythos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-32 w-full max-w-[1800px] mx-auto px-6 lg:px-16">
          {team.map((member, i) => (
            <div key={member.name} className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Photo Side - Left (or Top on smaller screens) */}
              <motion.div 
                initial={{ opacity: 0, filter: 'blur(20px)', y: 40 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: i * 0.3, ease: 'easeOut' }}
                className="relative shrink-0"
              >
                {/* South Indian Decorative Frame */}
                <div className="absolute -inset-4 border border-[var(--gold)] opacity-30 rounded-xl pointer-events-none" />
                <div className="absolute -inset-6 border border-dashed border-[var(--gold)] opacity-20 rounded-xl pointer-events-none" />
                
                {/* Corner Lotuses */}
                <div className="absolute -top-6 -left-6 w-6 h-6 text-[var(--gold)] opacity-80"><AnimatedLotus /></div>
                <div className="absolute -top-6 -right-6 w-6 h-6 text-[var(--gold)] opacity-80"><AnimatedLotus /></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 text-[var(--gold)] opacity-80"><AnimatedLotus /></div>
                <div className="absolute -bottom-6 -right-6 w-6 h-6 text-[var(--gold)] opacity-80"><AnimatedLotus /></div>

                {/* Tilted Card Component */}
                <TiltedCard
                  imageSrc={member.image}
                  altText={member.name}
                  captionText={member.name}
                  containerHeight="400px"
                  containerWidth="280px"
                  imageHeight="400px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </motion.div>

              {/* Text Side - Right (or Bottom) */}
              <div className="flex flex-col text-center md:text-left mt-8 md:mt-0 flex-1">
                <h3 className="text-4xl lg:text-5xl font-display text-[var(--warm-white)] mb-4 whitespace-nowrap">
                  <BlurText text={member.name} delay={i * 0.2} />
                </h3>
                <div className="text-xs lg:text-sm tracking-widest text-[var(--gold)] font-mono uppercase mb-8 opacity-80">
                  <BlurText text={member.role} delay={i * 0.2 + 0.1} />
                </div>
                <div className="text-xl lg:text-2xl text-[var(--text-primary)] font-serif italic mb-6 leading-relaxed pr-4">
                  <BlurText text={member.quote} delay={i * 0.2 + 0.2} />
                </div>
                <div className="text-base lg:text-lg text-[var(--text-secondary)] font-sans leading-relaxed pr-4">
                  <BlurText text={member.description} delay={i * 0.2 + 0.3} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
