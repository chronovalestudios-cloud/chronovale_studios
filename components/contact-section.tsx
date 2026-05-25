'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SpotlightCard } from './magicui/spotlight-card'
import { SectionLabel } from './ui/section-label'
import { Button } from './ui/button'
import { Particles } from './ui/particles'
import { GodRays } from './ui/god-rays'

const inquiryTypes = ['Game Developer', 'Publisher', 'Investor', 'Other']

function FloatingInput({ 
  label, 
  id, 
  type = "text", 
  isTextArea = false, 
  value, 
  onChange 
}: { 
  label: string, 
  id: string, 
  type?: string, 
  isTextArea?: boolean, 
  value: string, 
  onChange: (e: any) => void 
}) {
  const [focused, setFocused] = useState(false)
  const isFilled = value.length > 0 || focused

  return (
    <div className="relative pt-6 pb-2 w-full">
      <label 
        htmlFor={id}
        className={`absolute left-0 transition-all duration-250 ease-out pointer-events-none ${
          isFilled 
            ? 'transform -translate-y-6 text-[11px] text-[var(--gold)] uppercase tracking-widest font-mono' 
            : 'transform translate-y-2 text-[16px] text-[var(--text-muted)] font-sans'
        }`}
      >
        {label}
      </label>
      
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className={`w-full bg-transparent border-0 border-b border-[var(--bg-border)] text-[var(--warm-white)] font-sans text-[16px] py-2 focus:outline-none focus:border-[var(--gold)] transition-all duration-300 resize-none ${
            focused ? 'shadow-[0_2px_12px_var(--saffron-glow)]' : ''
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent border-0 border-b border-[var(--bg-border)] text-[var(--warm-white)] font-sans text-[16px] py-2 focus:outline-none focus:border-[var(--gold)] transition-all duration-300 ${
            focused ? 'shadow-[0_2px_12px_var(--saffron-glow)]' : ''
          }`}
        />
      )}
    </div>
  )
}

export function ContactSection() {
  const [selectedType, setSelectedType] = useState('')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          type: selectedType
        })
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      setSelectedType('')
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden bg-bg-deep min-h-screen flex items-center justify-center">
      {/* Cinematic Background Animations */}
      <GodRays className="opacity-40" />
      <Particles quantity={150} color="#FF6B00" className="opacity-40" />

      <div className="absolute inset-0 opacity-[0.03] kolam-pattern pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,var(--gold),transparent)] opacity-30" />

      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <SectionLabel className="justify-center">CONTACT</SectionLabel>
          <h2 className="text-h1 text-[var(--warm-white)]">
            Let&apos;s build something <span className="text-[var(--gold)]">meaningful</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-[1280px] mx-auto rounded-3xl overflow-hidden border border-[var(--gold)]/20 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-[#0A0806]/60 relative z-10"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 items-stretch h-full">
            
            {/* Left Side: Form */}
            <div className="relative z-10">
              <SpotlightCard className="p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center bg-transparent border-0 rounded-none shadow-none">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Inquiry Type Selector */}
                  <div>
                    <label className="block text-[11px] tracking-widest font-mono text-[var(--text-muted)] mb-4">I AM A</label>
                    <div className="flex flex-wrap gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`cursor-target px-5 py-2.5 rounded-full text-sm font-sans transition-all duration-300 border ${
                            selectedType === type
                              ? 'bg-[var(--gold)] text-[#0A0806] border-[var(--gold)] font-medium'
                              : 'bg-transparent text-[var(--text-secondary)] border-[var(--bg-border)] hover:border-[var(--gold)]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FloatingInput 
                      id="name" 
                      label="Your Name" 
                      value={formState.name} 
                      onChange={(e) => setFormState(prev => ({...prev, name: e.target.value}))} 
                    />
                    <FloatingInput 
                      id="email" 
                      label="Email Address" 
                      type="email"
                      value={formState.email} 
                      onChange={(e) => setFormState(prev => ({...prev, email: e.target.value}))} 
                    />
                    <FloatingInput 
                      id="message" 
                      label="Tell us about your project..." 
                      isTextArea
                      value={formState.message} 
                      onChange={(e) => setFormState(prev => ({...prev, message: e.target.value}))} 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full h-14 mt-8 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'SENDING TRANSMISSION...' : status === 'success' ? 'TRANSMISSION SENT' : 'SEND TRANSMISSION'}
                  </Button>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm mt-4 text-center font-mono">{errorMessage}</p>
                  )}
                  {status === 'success' && (
                    <p className="text-[var(--gold)] text-sm mt-4 text-center font-mono">Message sent successfully!</p>
                  )}
                </form>
              </SpotlightCard>
            </div>

            {/* Right Side: Image */}
            <motion.div 
              className="hidden xl:block w-full h-full relative overflow-hidden"
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            >
              <img
                src="/assets/contact_bg.png"
                alt="Cinematic Ancient Indian Temple Desk"
                className="w-full h-full object-cover"
                style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)', maskImage: 'linear-gradient(to right, transparent, black 40%)' }}
              />
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
