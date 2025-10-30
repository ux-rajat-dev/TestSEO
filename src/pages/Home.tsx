import React from 'react'
import { HeroSection } from '../components/home/HeroSection'
import { ServicesSection } from '../components/home/ServicesSection'
import { EBranchSection } from '../components/home/EBranchSection'
import { ComparisonSection } from '../components/home/ComparisonSection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { InteractiveDemoSection } from '../components/home/InteractiveDemoSection'
import { CtaSection } from '../components/home/CtaSection'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
export function Home() {
  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <EBranchSection />
        <ComparisonSection />
        <TestimonialsSection />
        <InteractiveDemoSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
