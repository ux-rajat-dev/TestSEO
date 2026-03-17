import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ReceiptIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  CalculatorIcon,
  FileTextIcon,
  CalendarIcon,
  StarIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  GlobeIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { countries } from '../../components/countries';
import { SEO } from '../../components/common/SEO';

export function VATFilingProductPage() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('netherlands');

  const handleGetStarted = () => {
    navigate('/qualification', {
      state: {
        primaryFocus: 'vat-filing',
        to: selectedCountry,
        from: '',
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />
      <SEO
        title="VAT Filing Services | House of Companies"
        description="Simplify your EU VAT filing with our quarterly and monthly VAT compliance services, ensuring accuracy and peace of mind."
      />
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] via-[#0F0B1F] to-[#0F0B1F]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-red-500/10 px-6 py-3 rounded-full text-orange-400 backdrop-blur-sm mb-8">
              <ReceiptIcon className="h-5 w-5 mr-2" />
              VAT Filing Services
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              VAT Filing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                Made Effortless
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Automated VAT return preparation and submission. Never miss a
              deadline with our intelligent filing system
            </p>

            {/* Target Market Selection */}
            <div className="max-w-md mx-auto mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3 text-left">
                Select Your Target Market
              </label>
              <div className="relative">
                <GlobeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-[#1B1537] border-2 border-[#2D2755] rounded-lg pl-12 pr-4 py-4 text-white text-lg focus:outline-none focus:border-[#EA3A70] hover:border-[#EA3A70]/50 transition-colors cursor-pointer appearance-none"
                >
                  {Object.entries(countries).map(([key, name]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>

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
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-[#0F0B1F]"
                    />
                  ))}
                </div>
                <span className="text-sm">500+ VAT returns filed monthly</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm">4.9/5 rating</span>
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
                Complete VAT Filing Solution
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need for compliant VAT returns
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <CalculatorIcon className="h-8 w-8" />,
                  title: 'Automated Calculations',
                  description:
                    'AI calculates VAT automatically from your transactions',
                },
                {
                  icon: <FileTextIcon className="h-8 w-8" />,
                  title: 'Return Preparation',
                  description: 'Professional VAT return forms prepared for you',
                },
                {
                  icon: <CalendarIcon className="h-8 w-8" />,
                  title: 'Deadline Reminders',
                  description:
                    'Never miss a filing deadline with automated alerts',
                },
                {
                  icon: <ShieldCheckIcon className="h-8 w-8" />,
                  title: 'Compliance Guarantee',
                  description: '100% compliant with EU VAT regulations',
                },
                {
                  icon: <ClockIcon className="h-8 w-8" />,
                  title: 'Quick Processing',
                  description: 'Fast turnaround for all VAT filings',
                },
                {
                  icon: <AlertCircleIcon className="h-8 w-8" />,
                  title: 'Error Detection',
                  description: 'Automatic validation before submission',
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
              Ready to Simplify Your VAT Filing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let us handle your VAT returns so you can focus on your business
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-[#EA3A70] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center mx-auto group"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
