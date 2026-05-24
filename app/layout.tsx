import type { Metadata, Viewport } from 'next'
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import TargetCursor from '@/components/ui/TargetCursor'

// Display font - Hero headlines, studio wordmark
const cinzel = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bebas', // Keeping the variable name same to avoid breaking everywhere
  display: 'swap',
})

const cinzelSpace = Cinzel({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk', // Keeping the variable name same to avoid breaking everywhere
  display: 'swap',
})

// Body / UI - All body copy, nav links
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-dm-sans', // Keeping the variable name same to avoid breaking everywhere
  display: 'swap',
})

// Mono - Metadata, tags, coordinates
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chronovale Studios | Interactive Narrative Games',
  description: 'An independent Indian game development studio creating narrative-driven experiences inspired by India\'s rich history, mythology, and culture.',
  keywords: ['game studio', 'indie games', 'narrative games', 'Indian mythology', 'game development', 'India'],
  authors: [{ name: 'Chronovale Studios' }],
  creator: 'Chronovale Studios',
  openGraph: {
    title: 'Chronovale Studios | Interactive Narrative Games',
    description: 'Forging the next era of interactive narrative. An indie game studio from India.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronovale Studios',
    description: 'Forging the next era of interactive narrative.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      className={`${cinzel.variable} ${cinzelSpace.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: '#0A0806' }}
    >
      <body className="antialiased" style={{ backgroundColor: '#0A0806' }}>
        <TargetCursor spinDuration={1.5} hideDefaultCursor={true} parallaxOn={true} hoverDuration={0.95} />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
