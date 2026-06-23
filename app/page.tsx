import { Navbar } from "@/components/navbar"
import { IntroSequence } from "@/components/intro-sequence"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VisionSection } from "@/components/vision-section"
import { GamesSection } from "@/components/games-section"
import { LeadershipSection } from "@/components/leadership-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { GlobalDynastyBackground } from "@/components/global-dynasty-background"
import { SectionDivider } from "@/components/ui/MehndiBorder"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-warm-black">
      <GlobalDynastyBackground />
      <Navbar />
      <IntroSequence />
      {/* Page sections */}
      <HeroSection />
      <SectionDivider variant="medallion" />
      <AboutSection />
      <SectionDivider variant="lattice" />
      <VisionSection />
      <SectionDivider variant="geometric-floral" />
      <GamesSection />
      {/* <SectionDivider variant="fringe" />
      <LeadershipSection /> */}
      <SectionDivider variant="block-floral" flip />
      <ContactSection />
      <Footer />
    </main>
  )
}
