import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FileTextIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  CalculatorIcon,
  ReceiptIcon,
  StarIcon,
  ZapIcon,
  GlobeIcon,
  BuildingIcon,
} from 'lucide-react'
import { Header } from '../../components/layout/Header'

export function TaxRegistrationProductPage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/qualification', {
      state: {
        primaryFocus: 'tax-registration'
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] via-[#0F0B1F] to-[#0F0B1F]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/10 to-blue-500/10 px-6 py-3 rounded-full text-green-400 backdrop-blur-sm mb-8">
              <FileTextIcon className="h-5 w-5 mr-2" />
              Tax Registration Services
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Tax Registration
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400">
                Made Simple
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Get your VAT ID, wage tax registration, and all tax credentials
              set up quickly and compliantly
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleGetStarted}
                className="bg-[#EA3A70] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center group"
              >
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/services/tax-filing"
                className="border-2 border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 border-2 border-[#0F0B1F]"
                    />
                  ))}
                </div>
                <span className="text-sm">300+ tax registrations completed</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm">4.8/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Complete Tax Registration Services
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need for tax compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <ReceiptIcon className="h-8 w-8" />,
                  title: 'VAT Registration',
                  description: 'EU VAT ID and local tax number registration',
                },
                {
                  icon: <CalculatorIcon className="h-8 w-8" />,
                  title: 'Wage Tax Setup',
                  description: 'Employer tax registration and payroll setup',
                },
                {
                  icon: <ShieldCheckIcon className="h-8 w-8" />,
                  title: 'Tax Compliance',
                  description: 'Ongoing compliance monitoring and support',
                },
                {
                  icon: <ClockIcon className="h-8 w-8" />,
                  title: 'Fast Processing',
                  description: 'Quick turnaround for all tax registrations',
                },
                {
                  icon: <GlobeIcon className="h-8 w-8" />,
                  title: 'EU-Wide Coverage',
                  description: 'Support across all EU member states',
                },
                {
                  icon: <FileTextIcon className="h-8 w-8" />,
                  title: 'Document Management',
                  description: 'All tax documents organized and accessible',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-6 hover:border-[#EA3A70]/50 transition-colors"
                >
                  <div className="text-[#EA3A70] mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1B1537] to-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Your Tax Registration?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your tax registration process today
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#EA3A70] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center mx-auto group"
            >
              Begin Registration
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}





