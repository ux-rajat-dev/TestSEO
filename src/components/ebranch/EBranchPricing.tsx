import React, { useEffect, useState } from 'react'
import { CheckIcon, ArrowRightIcon, ShieldIcon, GlobeIcon } from 'lucide-react'
import { countries } from '../../constants/countries'
export function EBranchPricing() {
  const [selectedCountry, setSelectedCountry] = useState('nl')
  const [billingCycle, setBillingCycle] = useState('monthly')
  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry')
    if (savedCountry && countries[savedCountry]) {
      setSelectedCountry(savedCountry)
    }
  }, [])
  // Get country name based on code
  const getCountryName = (code) => countries[code] || 'European'
  const features = [
    'Complete company or branch registration',
    'Prestigious business address',
    'Mail handling and forwarding',
    'VAT registration and compliance',
    'Corporate secretary services',
    'Digital document management',
    'AI-powered compliance monitoring',
    'Automated accounting system',
    'Tax filing assistance',
    'Business banking support',
    'Dedicated account manager',
    '24/7 phone answering service',
    'Access to legal templates',
    'Digital dashboard access',
    'Mobile app access',
  ]
  const addons = [
    {
      name: 'Employee Management',
      description: 'Payroll, contracts, and HR compliance',
      price: 25,
      unit: 'per employee/month',
    },
    {
      name: 'Advanced Accounting',
      description: 'Full-service bookkeeping and financial reporting',
      price: 299,
      unit: 'per month',
    },
    {
      name: 'Legal Support',
      description: 'Dedicated legal assistance for your business',
      price: 199,
      unit: 'per month',
    },
  ]
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EA3A70]/20 text-[#EA3A70] mb-4 backdrop-blur-sm">
            <ShieldIcon className="h-4 w-4 mr-2" />
            <span>All-Inclusive Package</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            One Simple Plan for Your {getCountryName(selectedCountry)} Business
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to establish and manage your business operations
            in one subscription
          </p>
          <div className="flex justify-center mt-8 mb-12">
            <div className="inline-flex items-center bg-[#1B1537] rounded-lg p-1 border border-[#2D2755]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${billingCycle === 'monthly' ? 'bg-[#EA3A70] text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${billingCycle === 'annual' ? 'bg-[#EA3A70] text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Annual (Save 10%)
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-2xl border border-[#EA3A70]/30 overflow-hidden shadow-xl shadow-[#0F0B1F]/50">
            <div className="p-8 text-center">
              <div className="inline-flex items-center mb-4">
                <GlobeIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                <span className="text-white font-medium">
                  {getCountryName(selectedCountry)} eBranch
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                All-Inclusive Plan
              </h3>
              <p className="text-gray-300 mb-6">
                Complete business management solution
              </p>
              <div className="flex items-baseline justify-center mb-8">
                <span className="text-5xl font-bold text-white">
                  {billingCycle === 'monthly' ? '€499' : '€449'}
                </span>
                <span className="text-gray-300 ml-2">/ month</span>
              </div>
              {billingCycle === 'annual' && (
                <div className="bg-[#EA3A70]/10 text-[#EA3A70] rounded-lg py-2 px-4 inline-block mb-6">
                  Save €600 with annual billing
                </div>
              )}
              <button
                onClick={() => window.open('https://clientdashboard.houseofcompanies.io', '_blank')}
                className="w-full px-6 py-4 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors font-medium shadow-md shadow-[#EA3A70]/20 flex items-center justify-center"
              >
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
              <div className="mt-4 flex items-center justify-center text-gray-400 text-sm">
                <ShieldIcon className="h-4 w-4 mr-1" />
                <span>30-day satisfaction guarantee</span>
              </div>
            </div>
            <div className="border-t border-[#2D2755] p-8">
              <h4 className="text-xl font-bold text-white mb-6">
                Everything Included:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-1 rounded-full bg-[#EA3A70]/20 mr-3 mt-1">
                      <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#2D2755]">
                <h4 className="text-lg font-medium text-white mb-4">
                  Optional Add-ons
                </h4>
                <div className="space-y-4">
                  {addons.map((addon, index) => (
                    <div
                      key={index}
                      className="bg-[#2D2755]/30 rounded-lg p-4 border border-[#2D2755] flex flex-wrap items-center justify-between"
                    >
                      <div className="mr-4">
                        <h5 className="text-white font-medium">{addon.name}</h5>
                        <p className="text-gray-400 text-sm">
                          {addon.description}
                        </p>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold text-white">
                          €{addon.price}
                        </span>
                        <span className="text-gray-400 text-xs ml-1">
                          {addon.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Prices shown are for {getCountryName(selectedCountry)}. Pricing
              may vary slightly for other EU countries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
