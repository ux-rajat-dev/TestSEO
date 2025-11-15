import { Link } from 'react-router-dom'
import {
  BuildingIcon,
  MailIcon,
  LineChartIcon,
  PercentIcon,
  FileTextIcon,
  ShieldIcon,
  ArrowRightIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  BriefcaseIcon,
  MegaphoneIcon,
} from 'lucide-react'
import { useCountry } from '../../contexts/CountryContext'

export function ServicesSection() {
  const { selectedCountry, getCountryName, getCountryFlag } = useCountry()
  // Comprehensive services based on available service pages
  const services = [
    {
      title: 'Company Formation',
      description: `Establish your business entity in ${getCountryName(selectedCountry)} with our streamlined formation service`,
      icon: BuildingIcon,
      href: `/services/${selectedCountry}/company-formation`,
    },
    {
      title: 'Company Essentials',
      description: `Get everything you need to operate in ${getCountryName(selectedCountry)} with our comprehensive business package`,
      icon: LayoutDashboardIcon,
      href: '/services/company-essentials',
    },
    {
      title: 'Branch Registration',
      description: `Register your company branch in ${getCountryName(selectedCountry)} and expand your business operations`,
      icon: BriefcaseIcon,
      href: '/branch-registration-product',
    },
    {
      title: 'Corporate Secretary',
      description: `Ensure legal compliance and proper administration of your ${getCountryName(selectedCountry)} entity`,
      icon: FileTextIcon,
      href: `/services/${selectedCountry}/corporate-secretary`,
    },
    {
      title: 'Accounting Services',
      description:
        'Professional bookkeeping, financial statements, and tax compliance',
      icon: LineChartIcon,
      href: '/accounting-product',
    },
    {
      title: 'Tax Registration',
      description: `Expert tax registration and compliance for your ${getCountryName(selectedCountry)} business`,
      icon: PercentIcon,
      href: '/tax-registration-product',
    },
    {
      title: 'AI Bookkeeping',
      description: 'AI-powered bookkeeping and financial management',
      icon: LineChartIcon,
      href: '/ai-bookkeeping-product',
    },
    {
      title: 'Virtual Office',
      description: `Get a prestigious business address in ${getCountryName(selectedCountry)}`,
      icon: MailIcon,
      href: '/virtual-office-product',
    },
    {
      title: 'VAT Filing',
      description: `Quarterly and monthly VAT filing services for ${getCountryName(selectedCountry)}`,
      icon: PercentIcon,
      href: '/vat-filing-product',
    },
    {
      title: 'CIT Filing',
      description: `Corporate income tax filing for your ${getCountryName(selectedCountry)} business`,
      icon: PercentIcon,
      href: '/cit-filing-product',
    },
    {
      title: 'Marketing Services',
      description: 'Grow your business with our AI-powered marketing solutions',
      icon: MegaphoneIcon,
      href: '/services/marketing',
    },
    {
      title: 'Legal Support',
      description: `Ongoing legal assistance for your ${getCountryName(selectedCountry)} operations`,
      icon: ShieldIcon,
      href: `/services/${selectedCountry}/legal`,
    },
  ]
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Comprehensive European Business Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to establish and grow your business across
            Europe
          </p>
        </div>
        {/* Country indicator */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/30">
            <GlobeIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
            <span className="text-lg mr-2">
              {getCountryFlag(selectedCountry)}
            </span>
            <span className="text-white">
              Currently viewing services for{' '}
              <span className="font-medium">
                {getCountryName(selectedCountry)}
              </span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] p-6 hover:border-[#EA3A70]/30 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-[#2D2755]/50 border border-[#2D2755]">
                  <service.icon className="h-6 w-6 text-[#EA3A70]" />
              </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <Link
                to={service.href}
                className="inline-flex items-center text-white hover:text-[#EA3A70] font-medium"
              >
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
