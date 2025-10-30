import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RocketIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  GlobeIcon,
  BrainIcon,
  LayoutDashboardIcon,
} from 'lucide-react'
import { countries } from '../../constants/countries'
export function EBranchHero() {
  const [selectedCountry, setSelectedCountry] = useState('nl')
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry')
    if (savedCountry && countries[savedCountry]) {
      setSelectedCountry(savedCountry)
    }
  }, [])
  // Handle country selection
  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode)
    setShowCountrySelector(false)
    // Save country preference to localStorage
    localStorage.setItem('preferredCountry', countryCode)
  }
  // Filter countries based on search query
  const filteredCountries = Object.entries(countries).filter(
    ([code, name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  // Get country flag emoji
  const getCountryFlag = (countryCode) => {
    const flagEmojis = {
      nl: '🇳🇱',
      de: '🇩🇪',
      fr: '🇫🇷',
      es: '🇪🇸',
      ie: '🇮🇪',
      be: '🇧🇪',
      it: '🇮🇹',
      lu: '🇱🇺',
      at: '🇦🇹',
      pl: '🇵🇱',
      hu: '🇭🇺',
      gr: '🇬🇷',
      ro: '🇷🇴',
      bg: '🇧🇬',
      ee: '🇪🇪',
      lt: '🇱🇹',
      lv: '🇱🇻',
      dk: '🇩🇰',
      fi: '🇫🇮',
      se: '🇸🇪',
      pt: '🇵🇹',
      cy: '🇨🇾',
      cz: '🇨🇿',
      sk: '🇸🇰',
      si: '🇸🇮',
      hr: '🇭🇷',
      mt: '🇲🇹',
    }
    return flagEmojis[countryCode] || '🇪🇺'
  }
  // Get country name based on code
  const getCountryName = (code) => countries[code] || 'European'
  const benefits = [
    `Complete AI-powered portal for your ${getCountryName(selectedCountry)} business operations`,
    'Launch your business in 48 hours, not weeks or months',
    'All essential services bundled in one subscription',
    'Full compliance management with automated monitoring',
  ]
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] to-[#0F0B1F]"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl animate-fadeInUp">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#EA3A70]/20 text-[#EA3A70] mb-6 backdrop-blur-sm">
              <BrainIcon className="h-4 w-4 mr-2" />
              <span>AI-Powered Business Management</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              eBranch: Your Complete European Business Portal
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Everything you need to establish and operate your business across
              Europe—all in one subscription with our AI-powered platform.
            </p>
            {/* Country selection button */}
            <div className="mb-8">
              <button
                onClick={() => setShowCountrySelector(true)}
                className="w-full md:w-auto flex items-center justify-between px-6 py-4 bg-indigo-900/50 border border-indigo-500/30 rounded-xl hover:bg-indigo-800/50 transition-colors text-white"
              >
                <div className="flex items-center">
                  <GlobeIcon className="h-5 w-5 mr-3 text-[#EA3A70]" />
                  <div className="text-left">
                    <div className="text-xs text-indigo-300 mb-1">
                      Currently viewing
                    </div>
                    <div className="font-medium">
                      <span className="flex items-center">
                        <span className="mr-2 text-lg">
                          {getCountryFlag(selectedCountry)}
                        </span>
                        {getCountryName(selectedCountry)} eBranch
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 ml-3 text-indigo-300" />
              </button>
            </div>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="p-1 rounded-full bg-[#EA3A70]/20 mr-3">
                    <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.open('https://clientdashboard.houseofcompanies.io', '_blank')}
                className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center font-medium shadow-md shadow-[#EA3A70]/20"
              >
                Start Your eBranch
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
              <Link
                to="/watch-demo"
                className="px-6 py-3 bg-[#1B1537] text-white rounded-lg border border-[#2D2755] hover:bg-[#2D2755]/50 transition-colors flex items-center font-medium"
              >
                <PlayCircleIcon className="h-5 w-5 mr-2" />
                Watch Demo
              </Link>
            </div>
          </div>
          <div className="relative animate-fadeInRight">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2D2755] bg-[#1B1537]/20 backdrop-blur-sm">
              <div className="aspect-video w-full">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/24t42cBe4oWwMUwS2xaPtn/sample_dashboard_banner.png"
                  alt="eBranch Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B1F] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-4 border border-[#2D2755]">
                  <div className="flex items-center mb-2">
                    <LayoutDashboardIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                    <p className="text-white text-sm font-medium">
                      AI-Powered Dashboard
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Manage your entire European business operations from a
                    single intelligent platform
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#EA3A70]/10 backdrop-blur-sm rounded-full p-6 border border-[#EA3A70]/30 shadow-xl">
              <div className="text-center">
                <p className="text-[#EA3A70] font-bold text-xl">48h</p>
                <p className="text-white text-xs">Launch Time</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-4 border border-[#2D2755] shadow-xl max-w-xs">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-[#EA3A70]/20 mr-3">
                  <RocketIcon className="h-5 w-5 text-[#EA3A70]" />
                </div>
                <p className="text-white font-medium">From €499/month</p>
              </div>
              <p className="text-gray-300 text-sm">
                All-inclusive subscription with no hidden fees
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Country Selector Modal */}
      {showCountrySelector && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1B1537] rounded-xl border border-[#2D2755] max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-[#2D2755] flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Select Your Target Market
              </h3>
              <button
                onClick={() => setShowCountrySelector(false)}
                className="p-2 rounded-full hover:bg-[#2D2755]/50 transition-colors"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-indigo-200 mb-6">
                Choose your target European market to get information about
                eBranch services specific to that country.
              </p>
              {/* Search Box */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg pl-10 pr-4 py-3 text-white placeholder-indigo-400 focus:outline-none focus:border-[#EA3A70]/50"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {filteredCountries.map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => handleCountrySelect(code)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${selectedCountry === code ? 'bg-[#EA3A70]/20 border border-[#EA3A70]/30' : 'hover:bg-[#2D2755]/50 border border-transparent'}`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">
                        {getCountryFlag(code)}
                      </span>
                      <span className="text-white">{name}</span>
                    </div>
                    {selectedCountry === code && (
                      <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-[#2D2755] bg-[#0F0B1F]/50">
              <div className="flex justify-between items-center">
                <p className="text-xs text-indigo-300">
                  Your selection will be remembered across the site
                </p>
                <button
                  onClick={() => setShowCountrySelector(false)}
                  className="px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors text-sm font-medium"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
