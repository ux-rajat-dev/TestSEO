import React from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { EBranchHero } from '../components/ebranch/EBranchHero'
import { MiddlemenRevolution } from '../components/ebranch/MiddlemenRevolution'
import { KeyFeatures } from '../components/ebranch/KeyFeatures'
import { IntegrationLayer } from '../components/ebranch/IntegrationLayer'
import { EBranchComparison } from '../components/ebranch/EBranchComparison'
import { EBranchPricing } from '../components/ebranch/EBranchPricing'
import { BeyondAdministration } from '../components/ebranch/BeyondAdministration'
import { EBranchFAQ } from '../components/ebranch/EBranchFAQ'
import { CallToAction } from '../components/ebranch/CallToAction'

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function EBranchPortal() {
  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-b from-[#1B1537] via-[#0F0B1F] to-[#1B1537]"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <Header />
      <main className="relative">
        {/* Original eBranch Hero */}
        <EBranchHero />
        
        {/* Original eBranch Sections */}
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-[#EA3A70]/10 via-transparent to-transparent animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
          <MiddlemenRevolution />
          <KeyFeatures />
          <IntegrationLayer />
          <EBranchComparison />
          <EBranchPricing />
          <BeyondAdministration />
        </div>

        {/* Portal Services Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                House of Companies Portal
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Our Key Services - Streamline your business operations with our comprehensive portal
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <motion.section 
          className="py-16 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Inbox Management */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#EA3A70]/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Inbox Management</h3>
                <p className="text-gray-300 mb-6">
                  Keep all your business communications organized in one place. Our Inbox ensures you never miss important messages, letters, or updates, helping your team stay on top of tasks and deadlines.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Stay organized and reduce missed communications
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Speed up decision-making and approvals
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Keep your team aligned with real-time updates
                  </div>
                </div>
              </motion.div>

              {/* Archive */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#EA3A70]/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Archive – Intelligent Document Management</h3>
                <p className="text-gray-300 mb-6">
                  Store, organize, and access all your important business documents effortlessly. Our AI-powered Archive automatically categorizes invoices, bank statements, certificates, and more.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Quickly locate any document without manual sorting
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Maintain secure, GDPR-compliant storage
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Simplify audits and regulatory compliance
                  </div>
                </div>
              </motion.div>

              {/* VAT Analysis */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#EA3A70]/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">VAT Analysis</h3>
                <p className="text-gray-300 mb-6">
                  Simplify your tax reporting with automated VAT calculations. The system gathers all invoices, calculates VAT, and generates clear quarterly reports.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Reduce time spent on manual VAT calculations
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Avoid errors and ensure tax compliance
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Gain a clear, auditable view of your VAT reports
                  </div>
                </div>
              </motion.div>

              {/* Corporate Tax Analysis */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#EA3A70]/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Corporate Tax Analysis (CIT)</h3>
                <p className="text-gray-300 mb-6">
                  Automatically compute your corporate income tax with confidence. The system aggregates financial data and provides clear insights into your tax liabilities.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Save time on complex tax calculations
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Reduce the risk of penalties or compliance errors
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Make informed financial decisions with accurate tax insights
                  </div>
                </div>
              </motion.div>

              {/* Financial Dashboard */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#EA3A70]/50 transition-all duration-300 md:col-span-2 lg:col-span-1"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Financial Dashboard</h3>
                <p className="text-gray-300 mb-6">
                  Get a complete view of your company's financial health in one place. Track cash flow, income, expenses, and balances with real-time dashboards.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Understand your cash flow and financial position instantly
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Make smarter business decisions based on accurate, real-time data
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-[#EA3A70] rounded-full mr-3"></div>
                    Reconcile payments and track financial performance effortlessly
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Section */}
        <motion.section 
          className="py-16 px-4 bg-gradient-to-r from-[#EA3A70]/10 to-[#FF6B9D]/10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose House of Companies Portal
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Save Time & Reduce Stress</h3>
                <p className="text-gray-300">Automate repetitive tasks and focus on growing your business.</p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Stay Compliant</h3>
                <p className="text-gray-300">Ensure adherence to Dutch business and tax regulations.</p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Make Informed Decisions</h3>
                <p className="text-gray-300">Real-time insights and reporting for better strategy.</p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Secure & Reliable</h3>
                <p className="text-gray-300">Enterprise-grade security with GDPR-compliant document storage.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Streamline Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of businesses already using our portal to manage their operations more efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#EA3A70]/25 transition-all duration-300 transform hover:scale-105">
                  Get Started Today
                </button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Original eBranch FAQ and CTA */}
        <EBranchFAQ />
        <CallToAction />
      </main>
      <Footer />
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </motion.div>
  )
}
