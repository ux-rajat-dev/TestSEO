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

  DownloadIcon,

  MailIcon,

} from 'lucide-react'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

    id: 'registered-office',

    name: 'Registered Office Address',

    description: 'Professional business address and mail handling',

    price: 500,

    interval: 'year',

    icon: <BuildingIcon className="h-5 w-5" />,

  },

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

  const [includeOrderForm] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const basePlanPrice = 1495
  const planName = 'eBranch'
  
  // Calculate plan price: base price + Registered Office Address if selected
  const hasRegisteredOffice = selectedAddons['registered-office'] > 0
  const planPrice = hasRegisteredOffice ? 1995 : basePlanPrice

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
    // Calculate addons total (excluding registered-office which is already in planPrice)
    const addonsTotal = Object.entries(selectedAddons).reduce(
      (sum, [addonId, quantity]) => {
        // Skip registered-office as it's included in planPrice
        if (addonId === 'registered-office') return sum
        
        const addon = addons.find((a) => a.id === addonId)
        if (!addon) return sum
        
        // Convert monthly prices to yearly for calculation
        const yearlyPrice = addon.interval === 'month' 
          ? addon.price * quantity * 12 
          : addon.price * quantity
        
        return sum + yearlyPrice
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

  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Website color scheme
    const colors = {
      primary: [234, 58, 112], // #EA3A70
      darkBg: [15, 11, 31], // #0F0B1F
      cardBg: [27, 21, 55], // #1B1537
      border: [45, 39, 85], // #2D2755
      text: [255, 255, 255],
      textGray: [200, 200, 200],
    }

    let yPos = 20

    // Header with dark background
    doc.setFillColor(...colors.darkBg)
    doc.rect(0, 0, 210, 50, 'F')
    
    // Title
    doc.setTextColor(...colors.text)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(`${planName} Package Summary`, 105, 25, { align: 'center' })
    
    // Subtitle
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.textGray)
    doc.text('Complete branch management solution', 105, 35, { align: 'center' })
    
    // Date
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    doc.setFontSize(10)
    doc.text(`Generated on: ${date}`, 105, 45, { align: 'center' })

    yPos = 60

    // Package Details Section
    doc.setFillColor(...colors.cardBg)
    doc.rect(10, yPos, 190, 30, 'F')
    doc.setDrawColor(...colors.primary)
    doc.setLineWidth(0.5)
    doc.rect(10, yPos, 190, 30, 'S')
    
    yPos += 10
    doc.setTextColor(...colors.text)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(`${planName} Package`, 15, yPos)
    
    yPos += 8
    doc.setFontSize(20)
    doc.setTextColor(...colors.primary)
    doc.text(`€${planPrice.toLocaleString()} / year`, 15, yPos)
    
    if (hasRegisteredOffice) {
      yPos += 7
      doc.setFontSize(9)
      doc.setTextColor(...colors.textGray)
      doc.text(`(€${basePlanPrice.toLocaleString()}/year + €500 Registered Office)`, 15, yPos)
    }

    yPos += 20

    // Included Features Section
    // Header bar with pink accent
    doc.setFillColor(...colors.darkBg)
    doc.rect(10, yPos, 190, 8, 'F')
    doc.setDrawColor(...colors.primary)
    doc.setLineWidth(0.5)
    doc.rect(10, yPos, 190, 8, 'S')
    
    // Pink accent line
    doc.setFillColor(...colors.primary)
    doc.rect(10, yPos + 7.5, 190, 0.5, 'F')
    
    doc.setTextColor(...colors.primary)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Included Features', 15, yPos + 5.5)

    yPos += 12

    const includedFeatures = [
      'Full company registration',
      'VAT & tax setup',
      'Employer registration',
      'Compliance monitoring',
      'Software suite access',
      'Document management',
      'AI Bookkeeping (included, excluding €0.09 per uploaded/processed document)',
      'Financial Reporting (included)',
      'Document Generation (included)',
      'Corporate Agent (included)',
      'Priority support',
    ]

    // White background for features list
    const featuresHeight = includedFeatures.length * 7 + 10
    doc.setFillColor(255, 255, 255)
    doc.rect(10, yPos, 190, featuresHeight, 'F')
    doc.setDrawColor(...colors.border)
    doc.setLineWidth(0.2)
    doc.rect(10, yPos, 190, featuresHeight, 'S')

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0) // Black text on white background
    
    let featureYPos = yPos + 7
    includedFeatures.forEach((feature, index) => {
      if (featureYPos > 270) {
        doc.addPage()
        featureYPos = 20
        // Redraw white background on new page
        doc.setFillColor(255, 255, 255)
        doc.rect(10, featureYPos - 7, 190, featuresHeight - (featureYPos - yPos), 'F')
        doc.setDrawColor(...colors.border)
        doc.rect(10, featureYPos - 7, 190, featuresHeight - (featureYPos - yPos), 'S')
      }
      
      // Pink bullet point
      doc.setFillColor(...colors.primary)
      doc.circle(15, featureYPos - 2, 1.5, 'F')
      
      // Feature text in black
      doc.setTextColor(0, 0, 0)
      doc.text(feature, 20, featureYPos)
      featureYPos += 7
    })

    yPos = featureYPos + 5

    // Optional Add-ons Section
    const selectedAddonsList = Object.entries(selectedAddons)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const addon = addons.find(a => a.id === id)
        if (!addon) return null
        
        const yearlyPrice = addon.interval === 'month' 
          ? addon.price * qty * 12 
          : addon.price * qty
        
        return {
          name: addon.name,
          quantity: qty,
          price: addon.price,
          interval: addon.interval,
          yearlyPrice,
        }
      })
      .filter(Boolean)

    if (selectedAddonsList.length > 0) {
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }

      // Header bar with pink accent
      doc.setFillColor(...colors.darkBg)
      doc.rect(10, yPos, 190, 8, 'F')
      doc.setDrawColor(...colors.primary)
      doc.setLineWidth(0.5)
      doc.rect(10, yPos, 190, 8, 'S')
      
      // Pink accent line
      doc.setFillColor(...colors.primary)
      doc.rect(10, yPos + 7.5, 190, 0.5, 'F')
      
      doc.setTextColor(...colors.primary)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('Optional Add-ons', 15, yPos + 5.5)

      yPos += 12

      // Add-ons table
      const addonTableData = selectedAddonsList.map(addon => [
        addon.name,
        addon.interval === 'month' ? `${addon.quantity} × €${addon.price}/${addon.interval}` : `${addon.quantity} × €${addon.price}/${addon.interval}`,
        `€${addon.yearlyPrice.toLocaleString()}/year`,
      ])

      autoTable(doc, {
        startY: yPos,
        head: [['Add-on', 'Details', 'Yearly Price']],
        body: addonTableData,
        theme: 'plain',
        headStyles: {
          fillColor: colors.primary,
          textColor: colors.text,
          fontStyle: 'bold',
        },
        bodyStyles: {
          fillColor: colors.cardBg,
          textColor: colors.text,
        },
        alternateRowStyles: {
          fillColor: colors.darkBg,
        },
        styles: {
          lineColor: colors.border,
          lineWidth: 0.1,
        },
        margin: { left: 10, right: 10 },
      })

      yPos = (doc as any).lastAutoTable.finalY + 10
    }

    // Pricing Summary
    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }

    // Header bar with pink accent
    doc.setFillColor(...colors.darkBg)
    doc.rect(10, yPos, 190, 8, 'F')
    doc.setDrawColor(...colors.primary)
    doc.setLineWidth(0.5)
    doc.rect(10, yPos, 190, 8, 'S')
    
    // Pink accent line
    doc.setFillColor(...colors.primary)
    doc.rect(10, yPos + 7.5, 190, 0.5, 'F')
    
    doc.setTextColor(...colors.primary)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Pricing Summary', 15, yPos + 5.5)

    yPos += 15

    // Summary table
    const summaryData = [
      [`${planName} Package`, `€${planPrice.toLocaleString()}`],
    ]

    // Add addons to summary
    selectedAddonsList.forEach(addon => {
      summaryData.push([
        `${addon.name}${addon.interval === 'month' ? ` (×${addon.quantity})` : ''}`,
        `€${addon.yearlyPrice.toLocaleString()}/year`,
      ])
    })

    summaryData.push(
      ['Subtotal', `€${totals.subtotal.toLocaleString()}`],
      ['VAT (21%)', `€${totals.vat.toFixed(2)}`],
    )

    autoTable(doc, {
      startY: yPos,
      body: summaryData,
      theme: 'plain',
      bodyStyles: {
        fillColor: colors.cardBg,
        textColor: colors.text,
        fontStyle: 'normal',
      },
      alternateRowStyles: {
        fillColor: colors.darkBg,
      },
      styles: {
        lineColor: colors.border,
        lineWidth: 0.1,
      },
      margin: { left: 10, right: 10 },
      columnStyles: {
        0: { cellWidth: 140 },
        1: { cellWidth: 50, halign: 'right' },
      },
    })

    yPos = (doc as any).lastAutoTable.finalY + 5

    // Total
    doc.setFillColor(...colors.primary)
    doc.rect(10, yPos, 190, 12, 'F')
    doc.setTextColor(...colors.text)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Total', 15, yPos + 7)
    doc.text(`€${totals.total.toFixed(2)}`, 195, yPos + 7, { align: 'right' })

    yPos += 20

    // Footer note
    if (yPos < 280) {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(...colors.textGray)
      doc.text('No payment required yet. Create your account first. Payment will be requested after registration.', 105, yPos, { align: 'center', maxWidth: 190 })
    }

    // Save PDF
    doc.save(`${planName}-package-summary.pdf`)
  }

  const handleContinue = async () => {

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
      // Pass all qualification data including email matching fields
      // Merge qualification and formData, prioritizing qualification data
      const allQualificationData = {
        // Start with formData as base
        ...formData,
        // Override with qualification data (more authoritative)
        ...qualification,
        // Explicitly ensure email matching fields are present (critical for linking)
        email: qualification?.email || formData?.email || '',
        phone: qualification?.phone || formData?.phone || '',
        companyName: qualification?.companyName || formData?.companyName || '',
        // Include other qualification fields that might be needed
        industry: qualification?.industry || formData?.industry || '',
        currentRevenue: qualification?.currentRevenue || formData?.currentRevenue || '',
        targetRevenue: qualification?.targetRevenue || formData?.targetRevenue || '',
        timeline: qualification?.timeline || formData?.timeline || '',
        mainGoal: qualification?.mainGoal || formData?.mainGoal || '',
        challenges: qualification?.challenges || formData?.challenges || '',
        teamSize: qualification?.teamSize || formData?.teamSize || '',
        primaryFocus: qualification?.primaryFocus || formData?.primaryFocus || 'branch-registration',
        selectedServices: qualification?.selectedServices || formData?.selectedServices || [],
      }

      navigate('/register', {

        state: {

          // Pass all qualification data
          qualification: allQualificationData,

          from,

          to,

          formData: allQualificationData,

          selectedService: 'branch-registration',

          selectedAddons,

          orderSummary,

          includeOrderForm,

          // Ensure all qualification fields are passed (including email matching fields)
          qualificationData: allQualificationData,

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

                      <div className="text-sm text-gray-400">
                        /year
                        {hasRegisteredOffice && (
                          <span className="block text-xs text-gray-500 mt-1">
                            (€{basePlanPrice.toLocaleString()}/year + €500 Registered Office)
                          </span>
                        )}
                      </div>

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

                        'Employer registration',

                        'Compliance monitoring',

                        'Software suite access',

                        'Document management',

                        'AI Bookkeeping (included, excluding €0.09 per uploaded/processed document)',

                        'Financial Reporting (included)',

                        'Document Generation (included)',

                        'Corporate Agent (included)',

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

                                  {addon.interval === 'month' && (
                                    <span className="text-xs text-gray-400 ml-1">
                                      (€{addon.price * 12}/year)
                                    </span>
                                  )}

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

                              <div className="text-white font-semibold text-right">

                                <div>

                                  €{addon.interval === 'month' 
                                    ? (addon.price * quantity * 12).toLocaleString() 
                                    : monthlyTotal.toLocaleString()}

                                  {addon.interval === 'month' ? '/year' : `/${addon.interval}`}

                                </div>

                                {addon.interval === 'month' && quantity > 0 && (

                                  <div className="text-xs text-gray-400 mt-1">

                                    (€{monthlyTotal.toLocaleString()}/month)

                                  </div>

                                )}

                              </div>

                            )}

                          </div>

                        </div>

                      )

                    })}

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

                        // Calculate yearly price for display
                        const yearlyPrice = addon.interval === 'month' 
                          ? addon.price * quantity * 12 
                          : addon.price * quantity

                        return (

                          <div

                            key={addonId}

                            className="flex justify-between text-gray-300 text-sm"

                          >

                            <span>

                              {addon.name} {addon.interval === 'month' && `(×${quantity})`}

                            </span>

                            <span>

                              €{yearlyPrice.toLocaleString()}

                              {addon.interval === 'month' && '/year'}

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

                  {/* Package Download/Email Options */}
                  <div className="mb-6 space-y-3">
                    <div className="text-sm font-semibold text-white mb-3">
                      Get Your Package Details
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsDownloading(true)
                        try {
                          generatePDF()
                        } catch (error) {
                          console.error('Error generating PDF:', error)
                        } finally {
                          setTimeout(() => setIsDownloading(false), 500)
                        }
                      }}
                      disabled={isDownloading}
                      className="w-full border-2 border-[#2D2755] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2D2755]/50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
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
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <DownloadIcon className="h-5 w-5 mr-2" />
                          Download Package Summary
                        </>
                      )}
                    </button>

                    <button
                      onClick={async () => {
                        setIsSendingEmail(true)
                        setEmailSent(false)
                        setSaveError(null)
                        
                        try {
                          const userEmail = formData?.email || qualification?.email
                          if (!userEmail) {
                            setSaveError('Email address is required to send package summary')
                            setIsSendingEmail(false)
                            return
                          }

                          // Prepare addons list for email
                          const addonsList = Object.entries(selectedAddons)
                            .filter(([_, qty]) => qty > 0)
                            .map(([id, qty]) => {
                              const addon = addons.find(a => a.id === id)
                              if (!addon) return null
                              return {
                                name: addon.name,
                                quantity: qty,
                                price: addon.price,
                                interval: addon.interval
                              }
                            })
                            .filter(Boolean)

                          // Prepare data for Google Apps Script
                          const emailData = {
                            name: formData?.name || qualification?.name || formData?.companyName || qualification?.companyName || 'Customer',
                            email: userEmail,
                            phone: formData?.phone || qualification?.phone || '',
                            companyName: formData?.companyName || qualification?.companyName || '',
                            planName: planName,
                            basePlanPrice: basePlanPrice,
                            hasRegisteredOffice: hasRegisteredOffice,
                            selectedAddons: selectedAddons,
                            addonsList: addonsList,
                            addonsTotal: totals.addonsTotal,
                            subtotal: totals.subtotal,
                            vat: totals.vat,
                            total: totals.total,
                            country: country || '',
                            primaryFocus: qualification?.primaryFocus || formData?.primaryFocus || 'branch-registration',
                            qualificationId: qualificationId || '',
                            notes: ''
                          }

                          // Save order summary to qualification table as JSON (similar to handleContinue)
                          if (qualificationId) {
                            try {
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
                              
                              if (updateResult.success) {
                                console.log('Order summary saved to qualification table successfully')
                              } else {
                                console.warn('Failed to save order summary to qualification table:', updateResult.error)
                                // Don't fail the whole process if this fails
                              }
                            } catch (dbError) {
                              console.error('Error saving order summary to qualification table:', dbError)
                              // Don't fail the whole process if this fails
                            }
                          }

                          // Save to Google Sheets using Apps Script (no popup, handles auth server-side)
                          // Using GET request with URL parameters to avoid CORS issues (same approach as PricingPlans)
                          // The Apps Script handles authentication automatically, no user interaction needed
                          const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyAFnHmIxivhMYWXm04aH8ArzSsMyxckKsThL3qeyXieWaRrG4dXq85ZJdWdKnasklKPQ/exec'
                          
                          console.log('Saving data to Google Sheets via Apps Script:', emailData)
                          
                          // Prepare URL parameters (same format as PricingPlans.tsx)
                          const params = new URLSearchParams({
                            name: emailData.name || '',
                            email: emailData.email || '',
                            phone: emailData.phone || '',
                            companyName: emailData.companyName || '',
                            planName: emailData.planName || '',
                            basePlanPrice: emailData.basePlanPrice?.toString() || '0',
                            hasRegisteredOffice: emailData.hasRegisteredOffice ? 'true' : 'false',
                            selectedAddons: JSON.stringify(emailData.selectedAddons || {}),
                            addonsList: JSON.stringify(emailData.addonsList || []),
                            addonsTotal: emailData.addonsTotal?.toString() || '0',
                            subtotal: emailData.subtotal?.toString() || '0',
                            vat: emailData.vat?.toString() || '0',
                            total: emailData.total?.toString() || '0',
                            country: emailData.country || '',
                            primaryFocus: emailData.primaryFocus || '',
                            qualificationId: emailData.qualificationId?.toString() || '',
                            notes: emailData.notes || '',
                            timestamp: new Date().toISOString()
                          })
                          
                          // Use GET request with no-cors mode to avoid CORS issues
                          // Note: We can't read the response with no-cors, but the request will succeed if it reaches the server
                          const response = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
                            method: 'GET',
                            mode: 'no-cors'
                          })
                          
                          // Since we're using no-cors mode, we can't read the response
                          // But the request should succeed if it reaches the server
                          console.log('Package summary submitted to Google Sheets (no-cors mode)')
                          setEmailSent(true) // Show success message
                          setTimeout(() => setEmailSent(false), 5000)
                        } catch (error: any) {
                          console.error('Error sending email:', error)
                          setSaveError(error.message || 'Failed to send email. Please try again.')
                        } finally {
                          setIsSendingEmail(false)
                        }
                      }}
                      disabled={isSendingEmail || emailSent}
                      className="w-full border-2 border-[#EA3A70] text-[#EA3A70] py-3 px-4 rounded-lg font-medium hover:bg-[#EA3A70]/10 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#EA3A70]"
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
                          Sending Email...
                        </>
                      ) : emailSent ? (
                        <>
                          <CheckIcon className="h-5 w-5 mr-2" />
                          Email Sent!
                        </>
                      ) : (
                        <>
                          <MailIcon className="h-5 w-5 mr-2" />
                          Receive via Email
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error Message */}
                  {saveError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm mb-4">
                      {saveError}
                    </div>
                  )}

                  <button

                    onClick={handleContinue}

                    disabled={isSaving}

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

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

// TypeScript declaration for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (tokenResponse: { access_token: string }) => void
            error_callback?: (error: any) => void
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void
          }
        }
      }
    }
  }
}

