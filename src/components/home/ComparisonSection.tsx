import { useState } from 'react'
import {
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  GlobeIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCountry } from '../../contexts/CountryContext'

export function ComparisonSection() {
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const { selectedCountry, setSelectedCountry, getCountryName, getCountryFlag, countries } = useCountry()
  // Country complexity groups
  const countryComplexity = {
    fast: ['nl', 'ie', 'ee', 'lt', 'lv'],
    medium: ['de', 'fr', 'es', 'it', 'be', 'lu'],
    complex: ['at', 'pl', 'hu', 'gr', 'ro', 'bg'],
  }
  // Get country complexity level
  const getCountryComplexity = (code: string) => {
    if (countryComplexity.fast.includes(code)) return 'Fast'
    if (countryComplexity.medium.includes(code)) return 'Medium'
    if (countryComplexity.complex.includes(code)) return 'Complex'
    return 'Medium'
  }
  // Country-specific data
  const countryData = {
    nl: {
      registrationTime: '48 hours',
      monthlyTaxes: 'Monthly VAT returns',
      corporateTax: '15-25.8%',
      bankingDifficulty: 'Easy',
      remoteManagement: 'Fully remote',
      monthlyFees: '€499',
    },
    de: {
      registrationTime: '2-3 weeks',
      monthlyTaxes: 'Monthly VAT returns',
      corporateTax: '15-30%',
      bankingDifficulty: 'Medium',
      remoteManagement: 'Partially remote',
      monthlyFees: '€599',
    },
    fr: {
      registrationTime: '2-4 weeks',
      monthlyTaxes: 'Monthly VAT returns',
      corporateTax: '25%',
      bankingDifficulty: 'Medium',
      remoteManagement: 'Partially remote',
      monthlyFees: '€599',
    },
    es: {
      registrationTime: '3-5 weeks',
      monthlyTaxes: 'Quarterly VAT returns',
      corporateTax: '25%',
      bankingDifficulty: 'Medium',
      remoteManagement: 'Partially remote',
      monthlyFees: '€549',
    },
    ie: {
      registrationTime: '1-2 weeks',
      monthlyTaxes: 'Bi-monthly VAT returns',
      corporateTax: '12.5%',
      bankingDifficulty: 'Easy',
      remoteManagement: 'Fully remote',
      monthlyFees: '€549',
    },
  }
  // Default data for countries without specific data
  const defaultData = {
    registrationTime: '3-4 weeks',
    monthlyTaxes: 'Varies by country',
    corporateTax: 'Varies by country',
    bankingDifficulty: 'Medium',
    remoteManagement: 'Partially remote',
    monthlyFees: '€599',
  }
  // Get data for selected country
  const getCountrySpecificData = (code: string) => {
    return countryData[code as keyof typeof countryData] || defaultData
  }
  const currentCountryData = getCountrySpecificData(selectedCountry)
  const comparisonData = [
    {
      feature: 'Registration Time',
      traditional: '4-6 weeks',
      ebranch: currentCountryData.registrationTime,
      limited: '2-3 weeks',
    },
    {
      feature: 'Local Address',
      traditional: <CheckIcon className="h-5 w-5 text-green-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <CheckIcon className="h-5 w-5 text-green-500" />,
    },
    {
      feature: 'VAT Registration',
      traditional: <CheckIcon className="h-5 w-5 text-green-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      feature: 'Employer Registration',
      traditional: <CheckIcon className="h-5 w-5 text-green-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      feature: 'Banking Assistance',
      traditional: <XIcon className="h-5 w-5 text-red-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      feature: 'Accounting Services',
      traditional: <XIcon className="h-5 w-5 text-red-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      feature: 'Digital Dashboard',
      traditional: <XIcon className="h-5 w-5 text-red-500" />,
      ebranch: <CheckIcon className="h-5 w-5 text-green-500" />,
      limited: <XIcon className="h-5 w-5 text-red-500" />,
    },
    {
      feature: 'Monthly Cost',
      traditional: '€1,500+',
      ebranch: currentCountryData.monthlyFees,
      limited: '€250+',
    },
  ]
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your Market Entry Strategy
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare different approaches to establishing your business in Europe
            and find the right fit for your needs
          </p>
        </div>
        {/* Country selector for comparison */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowCountrySelector(!showCountrySelector)}
            className="flex items-center px-4 py-2 bg-[#1B1537]/80 rounded-xl border border-[#2D2755] hover:bg-[#2D2755]/50 transition-colors"
          >
            <GlobeIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {getCountryFlag(selectedCountry)}
              </span>
              <span className="text-white mr-2">
                {getCountryName(selectedCountry)}
              </span>
              <div className="flex items-center bg-[#2D2755]/50 rounded-full px-2 py-0.5 text-xs text-white mr-2">
                {getCountryComplexity(selectedCountry)}
              </div>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-gray-300" />
          </button>
        </div>
        {/* Country selector dropdown */}
        {showCountrySelector && (
          <div className="bg-[#1B1537]/90 backdrop-blur-sm rounded-xl border border-[#2D2755] p-4 max-w-2xl mx-auto mb-8 animate-fadeIn">
            <h3 className="text-white font-medium mb-4">
              Select a country to compare
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {Object.entries(countries).map(([code, country]) => (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedCountry(code)
                    setShowCountrySelector(false)
                  }}
                  className={`flex items-center p-2 rounded-lg transition-colors ${selectedCountry === code ? 'bg-[#EA3A70]/20 border border-[#EA3A70]/30' : 'hover:bg-[#2D2755]/50 border border-transparent'}`}
                >
                  <span className="text-lg mr-2">{getCountryFlag(code)}</span>
                  <span className="text-white text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <div className="bg-[#1B1537]/80 rounded-xl border border-[#2D2755] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Traditional Setup
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Legal firm & accountant
                  </p>
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div className="bg-gradient-to-br from-[#1B1537] to-[#0F0B1F] rounded-xl border border-[#EA3A70] p-4 relative">
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#EA3A70] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      RECOMMENDED
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">eBranch</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      All-in-one solution
                    </span>
                    <span className="text-lg ml-2">
                      {getCountryFlag(selectedCountry)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div className="bg-[#1B1537]/80 rounded-xl border border-[#2D2755] p-4">
                  <h3 className="text-xl font-bold text-white">
                    Limited Presence
                  </h3>
                  <p className="text-gray-400 text-sm">Address only</p>
                </div>
              </div>
            </div>
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 ${index % 2 === 0 ? 'bg-[#1B1537]/30' : 'bg-transparent'} rounded-lg p-2`}
              >
                <div className="col-span-1 flex items-center">
                  <span className="text-white font-medium">{row.feature}</span>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  {typeof row.traditional === 'string' ? (
                    <span className="text-gray-300">{row.traditional}</span>
                  ) : (
                    row.traditional
                  )}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  {typeof row.ebranch === 'string' ? (
                    <span className="text-white font-bold">{row.ebranch}</span>
                  ) : (
                    row.ebranch
                  )}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  {typeof row.limited === 'string' ? (
                    <span className="text-gray-300">{row.limited}</span>
                  ) : (
                    row.limited
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Additional country info */}
        <div className="mt-10 bg-[#1B1537]/50 rounded-xl border border-[#2D2755] p-6">
          <div className="flex items-center mb-4">
            <GlobeIcon className="h-6 w-6 text-[#EA3A70] mr-3" />
            <h3 className="text-xl font-medium text-white">
              {getCountryName(selectedCountry)} Business Environment
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1B1537]/80 rounded-lg p-4 border border-[#2D2755]">
              <h4 className="text-white font-medium mb-2">Tax Environment</h4>
              <p className="text-gray-300 text-sm mb-2">
                Corporate Tax Rate:{' '}
                <span className="text-white">
                  {currentCountryData.corporateTax}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                VAT Reporting:{' '}
                <span className="text-white">
                  {currentCountryData.monthlyTaxes}
                </span>
              </p>
            </div>
            <div className="bg-[#1B1537]/80 rounded-lg p-4 border border-[#2D2755]">
              <h4 className="text-white font-medium mb-2">Banking</h4>
              <p className="text-gray-300 text-sm mb-2">
                Opening Difficulty:{' '}
                <span className="text-white">
                  {currentCountryData.bankingDifficulty}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                Remote Management:{' '}
                <span className="text-white">
                  {currentCountryData.remoteManagement}
                </span>
              </p>
            </div>
            <div className="bg-[#1B1537]/80 rounded-lg p-4 border border-[#2D2755]">
              <h4 className="text-white font-medium mb-2">Setup Complexity</h4>
              <p className="text-gray-300 text-sm mb-2">
                Registration Time:{' '}
                <span className="text-white">
                  {currentCountryData.registrationTime}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                Complexity Level:{' '}
                <span className="text-white">
                  {getCountryComplexity(selectedCountry)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/ebranch"
            className="inline-flex items-center px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors font-medium shadow-md shadow-[#EA3A70]/20"
          >
            Learn more about eBranch
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
