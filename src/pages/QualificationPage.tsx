import React, { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import {

  BuildingIcon,

  ArrowRightIcon,

  ClockIcon,

  CheckIcon,

  SparklesIcon,

} from 'lucide-react'

import { Header } from '../components/layout/Header'
import { saveQualificationData } from '../services/qualificationService'

export function QualificationPage() {

  const navigate = useNavigate()

  const location = useLocation()

  const { from, to, when, selectedServices } = location.state || {}

  const [formData, setFormData] = useState({

    companyName: '',

    industry: '',

    currentRevenue: '',

    targetRevenue: '',

    timeline: when || '',

    mainGoal: '',

    challenges: '',

    teamSize: '',

    email: '',

    phone: '',

  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setIsSaving(true)
    setSaveError(null)

    try {
      // Save qualification data to database
      const qualificationData = {
        companyName: formData.companyName,
        industry: formData.industry,
        currentRevenue: formData.currentRevenue,
        targetRevenue: formData.targetRevenue,
        teamSize: formData.teamSize,
        mainGoal: formData.mainGoal,
        challenges: formData.challenges,
        timeline: formData.timeline,
        email: formData.email,
        phone: formData.phone,
        from,
        to,
        selectedServices,
      }

      const result = await saveQualificationData(qualificationData)

      if (!result.success) {
        setSaveError(result.error || 'Failed to save qualification data')
        setIsSaving(false)
        return
      }

      // Data saved successfully, continue with navigation

    // Determine the country-specific route based on target market

    const countryRoutes: Record<string, string> = {

      netherlands: '/netherlands-branch',

      belgium: '/belgium-branch',

      germany: '/germany-branch',

      austria: '/austria-branch',

      bulgaria: '/bulgaria-branch',

      croatia: '/croatia-branch',

      cyprus: '/cyprus-branch',

      czechrepublic: '/czech-republic-branch',

      denmark: '/denmark-branch',

      estonia: '/estonia-branch',

      finland: '/finland-branch',

      france: '/france-branch',

      greece: '/greece-branch',

      hungary: '/hungary-branch',

      ireland: '/ireland-branch',

      italy: '/italy-branch',

      latvia: '/latvia-branch',

      lithuania: '/lithuania-branch',

      luxembourg: '/luxembourg-branch',

      malta: '/malta-branch',

      poland: '/poland-branch',

      portugal: '/portugal-branch',

      romania: '/romania-branch',

      slovakia: '/slovakia-branch',

      slovenia: '/slovenia-branch',

      spain: '/spain-branch',

      sweden: '/sweden-branch',

    }

      // Get the route for the selected country, fallback to generic product page
      const targetRoute = countryRoutes[to] || '/product'

      navigate(targetRoute, {
        state: {
          // Pass qualification data in multiple formats for compatibility
          qualification: formData,
          from,
          to,
          selectedServices,
          formData,
          // Also pass as qualificationData for consistency
          qualificationData: formData,
          // Include the saved qualification ID for later mapping
          qualificationId: result.id,
        },
      })
    } catch (error: any) {
      console.error('Error in handleSubmit:', error)
      setSaveError(error.message || 'An unexpected error occurred')
      setIsSaving(false)
    }
  }

  const timelineOptions = [

    {

      value: 'asap',

      label: 'ASAP',

      subtitle: 'Ready to start now',

      color: 'from-red-500 to-orange-500',

    },

    {

      value: '1-3months',

      label: '1-3 Months',

      subtitle: 'Planning phase',

      color: 'from-yellow-500 to-orange-500',

    },

    {

      value: '3+months',

      label: '3+ Months',

      subtitle: 'Researching options',

      color: 'from-blue-500 to-purple-500',

    },

  ]

  return (

    <div className="min-h-screen bg-[#0F0B1F]">

      <Header />

      <section className="py-16">

        <div className="container mx-auto px-4">

          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-12">

              <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full text-purple-400 backdrop-blur-sm mb-6">

                <SparklesIcon className="h-5 w-5 mr-2" />

                Intelligent Qualification

              </div>

              <h1 className="text-4xl font-bold text-white mb-4">

                Let's Understand Your Needs

              </h1>

              <p className="text-xl text-gray-300">

                Help us tailor the perfect solution for your expansion from{' '}

                {from || 'your location'} to {to || 'your target market'}

              </p>

            </div>

            {/* Target Market Display */}

            {to && (

              <div className="bg-gradient-to-r from-[#EA3A70]/10 to-purple-500/10 rounded-lg p-6 border border-[#EA3A70]/30 mb-8">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-sm text-gray-400 mb-1">

                      Target Market

                    </div>

                    <div className="text-2xl font-bold text-white capitalize">

                      {to}

                    </div>

                  </div>

                  <div className="bg-[#EA3A70]/20 p-4 rounded-lg">

                    <BuildingIcon className="h-8 w-8 text-[#EA3A70]" />

                  </div>

                </div>

              </div>

            )}

            <div className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-8">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Company & Industry */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Company Name *

                    </label>

                    <input

                      type="text"

                      required

                      value={formData.companyName}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          companyName: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                      placeholder="Your company name"

                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Industry *

                    </label>

                    <select

                      required

                      value={formData.industry}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          industry: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    >

                      <option value="">Select industry</option>

                      <option value="tech">Technology & Software</option>

                      <option value="ecommerce">E-commerce & Retail</option>

                      <option value="manufacturing">Manufacturing</option>

                      <option value="services">Professional Services</option>

                      <option value="consulting">Consulting</option>

                      <option value="finance">Finance & Fintech</option>

                      <option value="healthcare">Healthcare</option>

                      <option value="other">Other</option>

                    </select>

                  </div>

                </div>

                {/* Revenue & Team Size */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Current Annual Revenue *

                    </label>

                    <select

                      required

                      value={formData.currentRevenue}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          currentRevenue: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    >

                      <option value="">Select range</option>

                      <option value="<100k">Less than €100k</option>

                      <option value="100k-500k">€100k - €500k</option>

                      <option value="500k-1m">€500k - €1M</option>

                      <option value="1m-5m">€1M - €5M</option>

                      <option value=">5m">More than €5M</option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Team Size *

                    </label>

                    <select

                      required

                      value={formData.teamSize}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          teamSize: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    >

                      <option value="">Select size</option>

                      <option value="1-5">1-5 employees</option>

                      <option value="6-20">6-20 employees</option>

                      <option value="21-50">21-50 employees</option>

                      <option value="51-200">51-200 employees</option>

                      <option value=">200">More than 200</option>

                    </select>

                  </div>

                </div>

                {/* Timeline - Pre-filled from BookingWidget */}

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-3">

                    Timeline for Expansion{' '}

                    {when && (

                      <span className="text-[#EA3A70]">(Confirmed)</span>

                    )}

                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {timelineOptions.map((option) => (

                      <button

                        key={option.value}

                        type="button"

                        onClick={() =>

                          setFormData({

                            ...formData,

                            timeline: option.value,

                          })

                        }

                        className={`relative p-6 rounded-lg border-2 transition-all ${formData.timeline === option.value ? 'border-[#EA3A70] bg-[#EA3A70]/5' : 'border-[#2D2755] hover:border-[#EA3A70]/50'}`}

                      >

                        <div

                          className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.timeline === option.value ? 'border-[#EA3A70] bg-[#EA3A70]' : 'border-[#2D2755]'}`}

                        >

                          {formData.timeline === option.value && (

                            <CheckIcon className="h-3 w-3 text-white" />

                          )}

                        </div>

                        <ClockIcon

                          className={`h-8 w-8 mb-3 bg-gradient-to-r ${option.color} bg-clip-text text-transparent`}

                        />

                        <div className="text-lg font-semibold text-white mb-1">

                          {option.label}

                        </div>

                        <div className="text-sm text-gray-400">

                          {option.subtitle}

                        </div>

                      </button>

                    ))}

                  </div>

                  {when && (

                    <p className="text-sm text-gray-400 mt-2">

                      You can change your timeline selection if needed

                    </p>

                  )}

                </div>

                {/* Goals and Challenges */}

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Main Goal for Expansion *

                  </label>

                  <textarea

                    required

                    value={formData.mainGoal}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        mainGoal: e.target.value,

                      })

                    }

                    rows={3}

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    placeholder="e.g., Access EU market, hire local talent, establish legal presence..."

                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Main Challenges or Concerns

                  </label>

                  <textarea

                    value={formData.challenges}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        challenges: e.target.value,

                      })

                    }

                    rows={3}

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    placeholder="e.g., Compliance requirements, tax implications, finding local partners..."

                  />

                </div>

                {/* Contact Information */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Email *

                    </label>

                    <input

                      type="email"

                      required

                      value={formData.email}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          email: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                      placeholder="your@email.com"

                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Phone *

                    </label>

                    <input

                      type="tel"

                      required

                      value={formData.phone}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          phone: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                      placeholder="+31 6 12345678"

                    />

                  </div>

                </div>

                {/* Error Message */}
                {saveError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                    {saveError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-[#EA3A70] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue Your Journey
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

