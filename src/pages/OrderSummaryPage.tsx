import React, { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import {

  BuildingIcon,

  ArrowRightIcon,

  CheckIcon,

  PlusIcon,

  MinusIcon,

  ShoppingCartIcon,

  InfoIcon,

  ArrowLeftIcon,

  SparklesIcon,

  ClockIcon,

  ShieldCheckIcon,

  EuroIcon,

} from 'lucide-react'

import { Header } from '../components/layout/Header'
import { updateQualificationWithOrder } from '../services/qualificationService'

interface Addon {

  id: string

  name: string

  description: string

  price: number

  interval: string

  icon: React.ReactNode

}

const addons: Addon[] = [

  {

    id: 'payroll',

    name: 'Payroll Management',

    description: 'Monthly salary processing and compliance',

    price: 45,

    interval: 'month',

    icon: <EuroIcon className="h-5 w-5" />,

  },

  {

    id: 'eor',

    name: 'Employer of Record',

    description: 'Full employment compliance and risk mitigation',

    price: 495,

    interval: 'month',

    icon: <ShieldCheckIcon className="h-5 w-5" />,

  },

  {

    id: 'vat-admin',

    name: 'VAT Administration',

    description: 'Quarterly VAT returns and compliance',

    price: 95,

    interval: 'month',

    icon: <CheckIcon className="h-5 w-5" />,

  },

]

export function OrderSummaryPage() {

  const navigate = useNavigate()

  const location = useLocation()

  const {

    qualification,

    from,

    to,

    formData,

    tier = 'ebranch',

    country = 'netherlands',

    qualificationId,

  } = location.state || {}

  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>(

    {},

  )

  const [includeOrderForm, setIncludeOrderForm] = useState<boolean | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const planPrice = 1495

  const planName = 'eBranch'

  const handleAddonQuantityChange = (addonId: string, change: number) => {

    setSelectedAddons((prev) => {

      const currentQuantity = prev[addonId] || 0

      const newQuantity = Math.max(0, Math.min(10, currentQuantity + change))

      if (newQuantity === 0) {

        const { [addonId]: _, ...rest } = prev

        return rest

      }

      return {

        ...prev,

        [addonId]: newQuantity,

      }

    })

  }

  const calculateTotals = () => {

    const addonsTotal = Object.entries(selectedAddons).reduce(

      (sum, [addonId, quantity]) => {

        const addon = addons.find((a) => a.id === addonId)

        return sum + (addon ? addon.price * quantity : 0)

      },

      0,

    )

    const subtotal = planPrice + addonsTotal

    const vat = subtotal * 0.21

    const total = subtotal + vat

    return {

      addonsTotal,

      subtotal,

      vat,

      total,

    }

  }

  const totals = calculateTotals()

  const handleContinue = async () => {

    if (includeOrderForm === null) return

    setIsSaving(true)
    setSaveError(null)

    try {
      const orderSummary = {

        planName,

        planPrice,

        selectedAddons,

        ...totals,

        country,

        tier,

      }

      // Update qualification table with order summary data if qualificationId exists
      if (qualificationId) {
        const updateResult = await updateQualificationWithOrder(qualificationId, {
          planName,
          planPrice,
          selectedAddons,
          addonsTotal: totals.addonsTotal,
          subtotal: totals.subtotal,
          vat: totals.vat,
          total: totals.total,
          includeOrderForm: includeOrderForm || false,
          tier,
          country,
        })

        if (!updateResult.success) {
          setSaveError(updateResult.error || 'Failed to save order data')
          setIsSaving(false)
          return
        }
      }

      // Navigate to registration page
      navigate('/register', {

        state: {

          // Pass all qualification data
          qualification: qualification || formData || {},

          from,

          to,

          formData: formData || qualification || {},

          selectedService: 'branch-registration',

          selectedAddons,

          orderSummary,

          includeOrderForm,

          // Ensure all qualification fields are passed
          qualificationData: {

            ...qualification,

            ...formData,

          },

          // Pass qualification ID for mapping to user account
          qualificationId,

        },

      })
    } catch (error: any) {
      console.error('Error in handleContinue:', error)
      setSaveError(error.message || 'An unexpected error occurred')
      setIsSaving(false)
    }

  }

  return (

    <div className="min-h-screen bg-[#0F0B1F]">

      <Header />

      {/* Main Content */}

      <section className="py-12">

        <div className="container mx-auto px-4">

          <div className="max-w-5xl mx-auto">

            {/* Page Header */}

            <div className="text-center mb-12">

              <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full text-purple-400 backdrop-blur-sm mb-6">

                <ShoppingCartIcon className="h-5 w-5 mr-2" />

                Order Summary

              </div>

              <h1 className="text-4xl font-bold text-white mb-4">

                Review Your Package

              </h1>

              <p className="text-xl text-gray-300">

                Customize your setup and choose when to complete your order form

              </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Main Content - Left Side */}

              <div className="lg:col-span-2 space-y-6">

                {/* Base Plan Card */}

                <div className="bg-[#1B1537] rounded-lg border-2 border-[#EA3A70] p-6">

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center">

                      <div className="bg-[#EA3A70]/10 p-3 rounded-lg mr-4">

                        <BuildingIcon className="h-6 w-6 text-[#EA3A70]" />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold text-white">

                          {planName} Package

                        </h3>

                        <p className="text-gray-400 text-sm">

                          Complete branch management solution

                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-2xl font-bold text-white">

                        €{planPrice.toLocaleString()}

                      </div>

                      <div className="text-sm text-gray-400">/year</div>

                    </div>

                  </div>

                  <div className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755]">

                    <h4 className="text-white font-semibold mb-3 flex items-center">

                      <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2" />

                      Included Services

                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                      {[

                        'Full company registration',

                        'VAT & tax setup',

                        'Registered office address',

                        'Employer registration',

                        'Compliance monitoring',

                        'Software suite access',

                        'Document management',

                        'Priority support',

                      ].map((service, index) => (

                        <div

                          key={index}

                          className="flex items-start text-gray-300 text-sm"

                        >

                          <div className="w-1.5 h-1.5 rounded-full bg-[#EA3A70] mr-2 mt-1.5 flex-shrink-0" />

                          {service}

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

                {/* Add-ons Section */}

                <div className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-6">

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <h3 className="text-xl font-bold text-white mb-1">

                        Optional Add-ons

                      </h3>

                      <p className="text-gray-400 text-sm">

                        Enhance your package with additional services

                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    {addons.map((addon) => {

                      const quantity = selectedAddons[addon.id] || 0

                      const monthlyTotal = addon.price * quantity

                      return (

                        <div

                          key={addon.id}

                          className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755]"

                        >

                          <div className="flex items-start justify-between mb-3">

                            <div className="flex items-start flex-1">

                              <div className="bg-[#EA3A70]/10 p-2 rounded-lg mr-3">

                                {addon.icon}

                              </div>

                              <div className="flex-1">

                                <h4 className="text-white font-semibold mb-1">

                                  {addon.name}

                                </h4>

                                <p className="text-gray-400 text-sm mb-2">

                                  {addon.description}

                                </p>

                                <div className="text-[#EA3A70] font-semibold">

                                  €{addon.price}/{addon.interval}

                                </div>

                              </div>

                            </div>

                          </div>

                          <div className="flex items-center justify-between">

                            <div className="flex items-center space-x-3">

                              <button

                                onClick={() =>

                                  handleAddonQuantityChange(addon.id, -1)

                                }

                                disabled={quantity === 0}

                                className="w-8 h-8 rounded-lg bg-[#2D2755] text-white flex items-center justify-center hover:bg-[#EA3A70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                              >

                                <MinusIcon className="h-4 w-4" />

                              </button>

                              <span className="text-white font-semibold w-8 text-center">

                                {quantity}

                              </span>

                              <button

                                onClick={() =>

                                  handleAddonQuantityChange(addon.id, 1)

                                }

                                disabled={quantity >= 10}

                                className="w-8 h-8 rounded-lg bg-[#2D2755] text-white flex items-center justify-center hover:bg-[#EA3A70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                              >

                                <PlusIcon className="h-4 w-4" />

                              </button>

                            </div>

                            {quantity > 0 && (

                              <div className="text-white font-semibold">

                                €{monthlyTotal.toLocaleString()}/

                                {addon.interval}

                              </div>

                            )}

                          </div>

                        </div>

                      )

                    })}

                  </div>

                </div>

                {/* Workflow Choice */}

                <div className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-6">

                  <div className="flex items-start mb-6">

                    <InfoIcon className="h-5 w-5 text-[#EA3A70] mr-3 flex-shrink-0 mt-1" />

                    <div>

                      <h3 className="text-xl font-bold text-white mb-2">

                        Choose Your Workflow

                      </h3>

                      <p className="text-gray-400 text-sm">

                        Decide when you want to complete your detailed order

                        form

                      </p>

                    </div>

                  </div>

                  <div className="space-y-3">

                    <button

                      onClick={() => setIncludeOrderForm(true)}

                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${includeOrderForm === true ? 'border-[#EA3A70] bg-[#EA3A70]/10' : 'border-[#2D2755] hover:border-[#EA3A70]/50 bg-[#0F0B1F]'}`}

                    >

                      <div className="flex items-start justify-between">

                        <div className="flex-1">

                          <div className="flex items-center mb-2">

                            <ClockIcon className="h-5 w-5 text-[#EA3A70] mr-2" />

                            <span className="font-semibold text-white">

                              Complete order form now

                            </span>

                          </div>

                          <p className="text-gray-400 text-sm">

                            Fill out detailed information immediately after

                            registration. Faster processing time.

                          </p>

                        </div>

                        {includeOrderForm === true && (

                          <CheckIcon className="h-5 w-5 text-[#EA3A70] ml-3 flex-shrink-0" />

                        )}

                      </div>

                    </button>

                    <button

                      onClick={() => setIncludeOrderForm(false)}

                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${includeOrderForm === false ? 'border-[#EA3A70] bg-[#EA3A70]/10' : 'border-[#2D2755] hover:border-[#EA3A70]/50 bg-[#0F0B1F]'}`}

                    >

                      <div className="flex items-start justify-between">

                        <div className="flex-1">

                          <div className="flex items-center mb-2">

                            <SparklesIcon className="h-5 w-5 text-purple-400 mr-2" />

                            <span className="font-semibold text-white">

                              Complete after registration

                            </span>

                          </div>

                          <p className="text-gray-400 text-sm">

                            Create your account first, then complete the order

                            form at your convenience from your portal.

                          </p>

                        </div>

                        {includeOrderForm === false && (

                          <CheckIcon className="h-5 w-5 text-[#EA3A70] ml-3 flex-shrink-0" />

                        )}

                      </div>

                    </button>

                  </div>

                </div>

              </div>

              {/* Summary Sidebar - Right Side */}

              <div className="lg:col-span-1">

                <div className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-6 sticky top-6">

                  <h3 className="text-xl font-bold text-white mb-6">

                    Order Summary

                  </h3>

                  <div className="space-y-4 mb-6">

                    <div className="flex justify-between text-gray-300">

                      <span>{planName} Package</span>

                      <span>€{planPrice.toLocaleString()}</span>

                    </div>

                    {Object.entries(selectedAddons).map(

                      ([addonId, quantity]) => {

                        const addon = addons.find((a) => a.id === addonId)

                        if (!addon || quantity === 0) return null

                        return (

                          <div

                            key={addonId}

                            className="flex justify-between text-gray-300 text-sm"

                          >

                            <span>

                              {addon.name} (×{quantity})

                            </span>

                            <span>

                              €{(addon.price * quantity).toLocaleString()}

                            </span>

                          </div>

                        )

                      },

                    )}

                    <div className="border-t border-[#2D2755] pt-4">

                      <div className="flex justify-between text-gray-300 mb-2">

                        <span>Subtotal</span>

                        <span>€{totals.subtotal.toLocaleString()}</span>

                      </div>

                      <div className="flex justify-between text-gray-300 mb-2">

                        <span>VAT (21%)</span>

                        <span>€{totals.vat.toFixed(2)}</span>

                      </div>

                    </div>

                    <div className="border-t border-[#2D2755] pt-4">

                      <div className="flex justify-between text-white text-xl font-bold">

                        <span>Total</span>

                        <span>€{totals.total.toFixed(2)}</span>

                      </div>

                    </div>

                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30 mb-6">

                    <div className="flex items-start">

                      <InfoIcon className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />

                      <div>

                        <div className="text-green-400 font-semibold mb-1">

                          No Payment Required Yet

                        </div>

                        <p className="text-gray-300 text-sm">

                          Create your account first. Payment will be requested

                          after registration.

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Error Message */}
                  {saveError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm mb-4">
                      {saveError}
                    </div>
                  )}

                  <button

                    onClick={handleContinue}

                    disabled={includeOrderForm === null || isSaving}

                    className="w-full bg-[#EA3A70] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"

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
                        Saving Order...
                      </>
                    ) : (
                      <>
                        Continue to Registration
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                      </>
                    )}

                  </button>

                  {includeOrderForm === null && !isSaving && (

                    <p className="text-center text-sm text-gray-400 mt-3">

                      Please select a workflow option to continue

                    </p>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

