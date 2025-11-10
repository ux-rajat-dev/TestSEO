import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import {

  BuildingIcon,

  ArrowRightIcon,

  CheckIcon,

  SparklesIcon,

  GlobeIcon,

  ShieldCheckIcon,

  ClockIcon,

  UsersIcon,

  ZapIcon,

  StarIcon,

  ChevronDownIcon,

} from 'lucide-react'

import { countries } from '../components/countries'
import { Header } from '../components/layout/Header'

export function PromoPage() {

  const [selectedCountry, setSelectedCountry] = useState('netherlands')

  return (

    <div className="min-h-screen bg-[#0F0B1F]">

      <Header />

      {/* Hero Section */}

      <section className="relative pt-20 pb-20 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] via-[#0F0B1F] to-[#0F0B1F]" />

        <div className="absolute inset-0 opacity-20">

          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />

          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />

        </div>

        <div className="container mx-auto px-4 relative">

          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3 rounded-full text-purple-400 backdrop-blur-sm mb-8">

              <SparklesIcon className="h-5 w-5 mr-2" />

              Limited Time Offer - Save €600

            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">

              Launch Your EU Business

              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">

                In 48 Hours

              </span>

            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">

              Complete branch registration, legal compliance, and business setup

              - all managed through our AI-powered platform

            </p>

            {/* Target Market Selection - NEW */}

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

              <Link

                to="/qualification"

                state={{

                  to: selectedCountry,

                  from: '',

                  when: '',

                }}

                className="bg-[#EA3A70] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center group"

              >

                Start Your eBranch Today

                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />

              </Link>

              <Link

                to="/"

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

                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0F0B1F]"

                    />

                  ))}

                </div>

                <span className="text-sm">500+ businesses launched</span>

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

      {/* Special Offer Banner */}

      <section className="py-6 bg-gradient-to-r from-[#EA3A70] to-[#FF6B9D]">

        <div className="container mx-auto px-4">

          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">

            <div className="flex items-center mb-4 md:mb-0">

              <ZapIcon className="h-8 w-8 text-white mr-3" />

              <div>

                <div className="text-white font-bold text-lg">

                  Early Bird Special

                </div>

                <div className="text-white/90 text-sm">

                  Save €600 on your first year - Offer ends soon

                </div>

              </div>

            </div>

            <div className="flex items-baseline">

              <span className="text-3xl font-bold text-white line-through opacity-75 mr-3">

                €2,595

              </span>

              <span className="text-5xl font-bold text-white">€1,995</span>

              <span className="text-white/90 ml-2">/year</span>

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

                Everything You Need to Succeed

              </h2>

              <p className="text-xl text-gray-400">

                One platform, complete solution

              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[

                {

                  icon: <BuildingIcon className="h-8 w-8" />,

                  title: 'Full Registration',

                  description:

                    'Complete KVK registration, tax setup, and legal documentation',

                  value: '€1,200 value',

                },

                {

                  icon: <ShieldCheckIcon className="h-8 w-8" />,

                  title: 'Legal Compliance',

                  description:

                    'Automated monitoring and alerts for all regulatory requirements',

                  value: 'Included',

                },

                {

                  icon: <GlobeIcon className="h-8 w-8" />,

                  title: 'EU Market Access',

                  description: 'VAT number and access to 500M+ EU consumers',

                  value: 'Included',

                },

                {

                  icon: <SparklesIcon className="h-8 w-8" />,

                  title: 'AI-Powered Platform',

                  description: 'Intelligent insights and automated workflows',

                  value: '€795 value',

                },

                {

                  icon: <ClockIcon className="h-8 w-8" />,

                  title: '48-Hour Setup',

                  description:

                    'Fast-track processing to get you operational quickly',

                  value: 'Priority',

                },

                {

                  icon: <UsersIcon className="h-8 w-8" />,

                  title: 'Expert Support',

                  description: 'Dedicated account manager and 24/7 assistance',

                  value: 'Included',

                },

              ].map((feature, index) => (

                <div

                  key={index}

                  className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755] hover:border-[#EA3A70]/50 transition-all group"

                >

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-[#EA3A70] group-hover:scale-110 transition-transform">

                    {feature.icon}

                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">

                    {feature.title}

                  </h3>

                  <p className="text-gray-400 mb-3">{feature.description}</p>

                  <div className="inline-flex items-center text-[#EA3A70] text-sm font-semibold">

                    <CheckIcon className="h-4 w-4 mr-1" />

                    {feature.value}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Pricing Comparison */}

      <section className="py-20 bg-[#1B1537]">

        <div className="container mx-auto px-4">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">

              <h2 className="text-4xl font-bold text-white mb-4">

                Why Choose eBranch?

              </h2>

              <p className="text-xl text-gray-400">

                Compare traditional setup vs our platform

              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Traditional Way */}

              <div className="bg-[#0F0B1F] rounded-lg p-8 border border-[#2D2755]">

                <h3 className="text-2xl font-bold text-gray-400 mb-6">

                  Traditional Setup

                </h3>

                <div className="space-y-4">

                  {[

                    {

                      label: 'Legal fees',

                      value: '€3,000+',

                    },

                    {

                      label: 'Accounting setup',

                      value: '€1,500+',

                    },

                    {

                      label: 'Office address',

                      value: '€2,400/year',

                    },

                    {

                      label: 'Compliance tools',

                      value: '€1,200/year',

                    },

                    {

                      label: 'Setup time',

                      value: '4-8 weeks',

                    },

                    {

                      label: 'Support',

                      value: 'Pay per hour',

                    },

                  ].map((item, index) => (

                    <div

                      key={index}

                      className="flex justify-between items-center py-2 border-b border-[#2D2755]"

                    >

                      <span className="text-gray-400">{item.label}</span>

                      <span className="text-gray-300 font-semibold">

                        {item.value}

                      </span>

                    </div>

                  ))}

                  <div className="pt-4 border-t-2 border-[#2D2755]">

                    <div className="flex justify-between items-center">

                      <span className="text-xl font-bold text-gray-400">

                        Total Year 1

                      </span>

                      <span className="text-2xl font-bold text-gray-300">

                        €8,100+

                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* eBranch Way */}

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-8 border-2 border-[#EA3A70] relative">

                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">

                  <span className="bg-[#EA3A70] text-white px-4 py-1 rounded-full text-sm font-bold">

                    BEST VALUE

                  </span>

                </div>

                <h3 className="text-2xl font-bold text-white mb-6">

                  eBranch Platform

                </h3>

                <div className="space-y-4">

                  {[

                    {

                      label: 'Full registration',

                      value: 'Included',

                    },

                    {

                      label: 'Accounting software',

                      value: 'Included',

                    },

                    {

                      label: 'Registered office',

                      value: 'Included',

                    },

                    {

                      label: 'Compliance tools',

                      value: 'Included',

                    },

                    {

                      label: 'Setup time',

                      value: '48 hours',

                    },

                    {

                      label: 'Support',

                      value: '24/7 included',

                    },

                  ].map((item, index) => (

                    <div

                      key={index}

                      className="flex justify-between items-center py-2 border-b border-[#2D2755]"

                    >

                      <span className="text-gray-300">{item.label}</span>

                      <div className="flex items-center">

                        <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2" />

                        <span className="text-white font-semibold">

                          {item.value}

                        </span>

                      </div>

                    </div>

                  ))}

                  <div className="pt-4 border-t-2 border-[#EA3A70]">

                    <div className="flex justify-between items-center">

                      <span className="text-xl font-bold text-white">

                        Total Year 1

                      </span>

                      <span className="text-3xl font-bold text-[#EA3A70]">

                        €1,995

                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">

                  <div className="text-center">

                    <div className="text-green-400 font-bold text-2xl">

                      Save €6,105

                    </div>

                    <div className="text-green-400/80 text-sm">

                      in your first year

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Final CTA */}

      <section className="py-20 bg-[#0F0B1F] relative overflow-hidden">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />

        </div>

        <div className="container mx-auto px-4 relative">

          <div className="max-w-4xl mx-auto text-center">

            <h2 className="text-5xl font-bold text-white mb-6">

              Ready to Launch Your EU Business?

            </h2>

            <p className="text-xl text-gray-300 mb-8">

              Join hundreds of businesses expanding into Europe with confidence

            </p>

            <div className="bg-[#1B1537] rounded-2xl p-8 border border-[#2D2755] mb-8">

              {/* Target Market Selection - Bottom CTA */}

              <div className="max-w-md mx-auto mb-6">

                <label className="block text-sm font-medium text-gray-300 mb-3">

                  Select Your Target Market

                </label>

                <div className="relative">

                  <GlobeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                  <select

                    value={selectedCountry}

                    onChange={(e) => setSelectedCountry(e.target.value)}

                    className="w-full bg-[#0F0B1F] border-2 border-[#2D2755] rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#EA3A70] hover:border-[#EA3A70]/50 transition-colors cursor-pointer appearance-none"

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {[

                  {

                    icon: <ClockIcon className="h-6 w-6" />,

                    label: '48-hour setup',

                  },

                  {

                    icon: <ShieldCheckIcon className="h-6 w-6" />,

                    label: 'Money-back guarantee',

                  },

                  {

                    icon: <UsersIcon className="h-6 w-6" />,

                    label: '24/7 support',

                  },

                ].map((item, index) => (

                  <div key={index} className="flex items-center justify-center">

                    <div className="text-[#EA3A70] mr-2">{item.icon}</div>

                    <span className="text-white font-semibold">

                      {item.label}

                    </span>

                  </div>

                ))}

              </div>

              <Link

                to="/qualification"

                state={{

                  to: selectedCountry,

                  from: '',

                  when: '',

                }}

                className="inline-flex items-center bg-[#EA3A70] text-white px-12 py-5 rounded-lg font-bold text-xl hover:bg-[#EA3A70]/90 transition-colors group"

              >

                Get Started Now - Save €600

                <ArrowRightIcon className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />

              </Link>

              <p className="text-gray-400 text-sm mt-4">

                No credit card required • Cancel anytime after 1 year

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

