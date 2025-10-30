import React from 'react'
import { EBranchHero } from '../components/ebranch/EBranchHero'
import { EBranchFeatures } from '../components/ebranch/EBranchFeatures'
import { DashboardExperience } from '../components/ebranch/DashboardExperience'
import { EBranchComparison } from '../components/ebranch/EBranchComparison'
import { PathToIndependence } from '../components/ebranch/PathToIndependence'
import { EBranchPricing } from '../components/ebranch/EBranchPricing'
import { EBranchFAQ } from '../components/ebranch/EBranchFAQ'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
export function EBranch() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1B1537] via-[#0F0B1F] to-[#1B1537]">
      <Header />
      <main>
        <EBranchHero />
        <EBranchFeatures />
        <DashboardExperience />
        <EBranchComparison />
        <PathToIndependence />
        <EBranchPricing />
        <EBranchFAQ />
      </main>
      <Footer />
    </div>
  )
}
