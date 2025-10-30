import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface BranchBrochureLayoutProps {
  children: React.ReactNode
}

export function BranchBrochureLayout({ children }: BranchBrochureLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
