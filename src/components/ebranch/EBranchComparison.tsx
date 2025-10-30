import React, { useEffect, useState } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  BuildingIcon,
} from 'lucide-react'
import { countries } from '../../constants/countries'
export function EBranchComparison() {
  const [selectedCountry, setSelectedCountry] = useState('nl')
  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry')
    if (savedCountry && countries[savedCountry]) {
      setSelectedCountry(savedCountry)
    }
  }, [])
  // Get country name based on code
  const getCountryName = (code) => countries[code] || 'European'
  const comparisonData = [
    {
      feature: 'Registration Time',
      individual: '4-6 weeks',
      ebranch: '48 hours',
    },
    {
      feature: 'Business Address',
      individual: (
        <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />
      ),
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'VAT Registration',
      individual: (
        <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />
      ),
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'Employer Registration',
      individual: (
        <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />
      ),
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'Banking Assistance',
      individual: <XCircleIcon className="h-5 w-5 text-red-400 mx-auto" />,
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'Accounting Services',
      individual: <XCircleIcon className="h-5 w-5 text-red-400 mx-auto" />,
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'AI-Powered Tools',
      individual: <XCircleIcon className="h-5 w-5 text-red-400 mx-auto" />,
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'Digital Dashboard',
      individual: <XCircleIcon className="h-5 w-5 text-red-400 mx-auto" />,
      ebranch: <CheckCircleIcon className="h-5 w-5 text-green-400 mx-auto" />,
    },
    {
      feature: 'Monthly Cost',
      individual: '€1,500+',
      ebranch: '€499',
    },
  ]
  const eliminatedCosts = [
    {
      item: 'External Accounting Firm',
      savings: '€500-1,000/month',
    },
    {
      item: 'Legal Consultants',
      savings: '€300-600/month',
    },
    {
      item: 'Compliance Specialists',
      savings: '€400-800/month',
    },
    {
      item: 'Administrative Staff',
      savings: '€2,000-3,000/month',
    },
  ]
  return (
    <section className="py-20 relative bg-gradient-to-b from-[#1B1537] to-[#0F0B1F]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose eBranch?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our all-in-one solution compares to purchasing individual
            services
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-[#2D2755] shadow-2xl">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/bFHsRc5susHAH33RfByqrU/Rocket_banner.png"
                alt="Launch your business quickly"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Launch Your Business in 48 Hours
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              With our streamlined process and digital-first approach, we can
              get your {getCountryName(selectedCountry)} business operational in
              just 48 hours - while traditional methods can take weeks or
              months.
            </p>
            <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-6 border border-[#2D2755]">
              <p className="text-gray-300">
                "The eBranch solution allowed us to enter the{' '}
                {getCountryName(selectedCountry)} market in record time. What
                would have taken months with traditional service providers took
                just days."
              </p>
              <p className="text-white font-medium mt-4">
                — Sarah K., Tech Startup Founder
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] overflow-hidden shadow-lg shadow-[#0F0B1F]/50 mb-16">
          <div className="p-6 border-b border-[#2D2755]">
            <div className="flex items-center">
              <BuildingIcon className="h-6 w-6 text-[#EA3A70] mr-3" />
              <h3 className="text-xl font-bold text-white">
                eBranch vs. Individual Services in{' '}
                {getCountryName(selectedCountry)}
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2D2755]">
                  <th className="py-4 px-6 text-left text-white font-medium">
                    Feature
                  </th>
                  <th className="py-4 px-6 text-center text-white font-medium">
                    Individual Services
                  </th>
                  <th className="py-4 px-6 text-center text-white font-medium bg-[#EA3A70]/10">
                    eBranch Package
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index !== comparisonData.length - 1
                        ? 'border-b border-[#2D2755]'
                        : ''
                    }
                  >
                    <td className="py-4 px-6 text-white">{item.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-300">
                      {item.individual}
                    </td>
                    <td className="py-4 px-6 text-center bg-[#EA3A70]/5 text-white font-medium">
                      {item.ebranch}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#2D2755] bg-[#2D2755]/20">
                  <td className="py-6 px-6 text-white font-bold text-lg">
                    Total Monthly Cost
                  </td>
                  <td className="py-6 px-6 text-center text-white font-bold">
                    ~€1,500/month
                  </td>
                  <td className="py-6 px-6 text-center bg-[#EA3A70]/10 text-[#EA3A70] font-bold text-xl">
                    €499/month
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              What You Don't Need with eBranch
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Our all-inclusive platform eliminates the need for multiple
              service providers, saving you both time and money.
            </p>
            <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] overflow-hidden">
              <div className="p-6 border-b border-[#2D2755]">
                <h4 className="text-lg font-medium text-white">
                  Eliminated Costs
                </h4>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {eliminatedCosts.map((cost, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <XCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                        <span className="text-white">{cost.item}</span>
                      </div>
                      <span className="text-gray-300">{cost.savings}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[#2D2755]">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      Total Potential Savings
                    </span>
                    <span className="text-[#EA3A70] font-bold">
                      €3,200-5,400/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-[#2D2755] shadow-2xl">
              <img
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/bZNG5MdRRekwV4xspc2rgb/footer_popup_sample.png"
                alt="Mobile App Interface"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 right-6 bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-4 border border-[#2D2755] shadow-xl max-w-xs">
              <h3 className="text-lg font-bold text-white mb-2">
                Access Anywhere
              </h3>
              <p className="text-gray-300 text-sm">
                Manage your {getCountryName(selectedCountry)} business from
                anywhere with our mobile-friendly platform
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-8 border border-[#EA3A70]/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">
              One Subscription, Everything Included
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              No hidden fees, no surprise charges. Just one simple monthly
              subscription for all your {getCountryName(selectedCountry)}{' '}
              business needs.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="bg-[#2D2755]/50 rounded-xl p-6 border border-[#2D2755] text-center md:w-64">
              <p className="text-gray-300 mb-2">Starting from</p>
              <p className="text-4xl font-bold text-white mb-1">€499</p>
              <p className="text-gray-400 text-sm mb-4">per month</p>
              <div className="flex items-center justify-center text-[#EA3A70] text-sm font-medium">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span>No hidden fees</span>
              </div>
            </div>
            <button
              onClick={() => window.open('https://clientdashboard.houseofcompanies.io', '_blank')}
              className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors inline-flex items-center font-medium shadow-md shadow-[#EA3A70]/20"
            >
              Get Started
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            * Individual service prices are estimates and may vary based on
            specific business needs
          </p>
        </div>
      </div>
    </section>
  )
}
