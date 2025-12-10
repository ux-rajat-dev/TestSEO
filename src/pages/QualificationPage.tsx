import React, { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import {

  BuildingIcon,

  ArrowRightIcon,

  CheckIcon,

  SparklesIcon,

  FileIcon,

  CalculatorIcon,

  ClipboardCheckIcon,

  PlusIcon,

} from 'lucide-react'

import { Header } from '../components/layout/Header'
import { saveQualificationData } from '../services/qualificationService'

export function QualificationPage() {

  const navigate = useNavigate()

  const location = useLocation()

  const { from, to, when, selectedServices: initialSelectedServices, primaryFocus } = location.state || {}

  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedServices || []);
  const [otherService, setOtherService] = useState<string>('');

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

    address: '',

  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setIsSaving(true)
    setSaveError(null)

    try {
      // Combine selected services
      const allSelectedServices = [...selectedServices];
      if (selectedServices.includes('Other') && otherService) {
        allSelectedServices.push(`Other: ${otherService}`);
      }
      
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
        address: formData.address,
        from,
        to,
        primaryFocus,
        selectedServices: allSelectedServices,
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

      // Determine target route based on target country
      // Always redirect to country-specific branch route if country is selected
      // This works regardless of which page the user entered from (product pages, branch-registration-product, etc.)
      let targetRoute = '/quote';
      
      if (to) {
        // If a target country is selected, redirect to that country's branch page
        targetRoute = countryRoutes[to] || '/quote';
      } else if (primaryFocus && primaryFocus !== 'branch-registration') {
        // Only go to quote page if no country is selected and it's not branch registration
        targetRoute = '/quote';
      }

      navigate(targetRoute, {
        state: {
          // Pass qualification data in multiple formats for compatibility
          qualification: formData,
          from,
          to,
          primaryFocus,
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
                {primaryFocus === 'accounting' && "Let's Understand Your Accounting Needs"}
                {primaryFocus === 'tax-registration' && "Let's Understand Your Tax Registration Needs"}
                {primaryFocus === 'ai-bookkeeping' && "Let's Understand Your Bookkeeping Needs"}
                {primaryFocus === 'virtual-office' && "Let's Understand Your Virtual Office Needs"}
                {primaryFocus === 'vat-filing' && "Let's Understand Your VAT Filing Needs"}
                {primaryFocus === 'cit-filing' && "Let's Understand Your CIT Filing Needs"}
                {(!primaryFocus || primaryFocus === 'branch-registration') && "Let's Understand Your Needs"}
              </h1>

              <p className="text-xl text-gray-300">
                {primaryFocus === 'accounting' && "Help us understand your accounting requirements and tailor the perfect financial management solution"}
                {primaryFocus === 'tax-registration' && "Help us understand your tax registration needs and ensure full compliance"}
                {primaryFocus === 'ai-bookkeeping' && "Help us understand your bookkeeping needs and automate your financial processes"}
                {primaryFocus === 'virtual-office' && "Help us understand your business address needs and set up your virtual office"}
                {primaryFocus === 'vat-filing' && "Help us understand your VAT filing requirements and streamline your tax compliance"}
                {primaryFocus === 'cit-filing' && "Help us understand your corporate tax filing needs and optimize your tax position"}
                {(!primaryFocus || primaryFocus === 'branch-registration') && "Help us understand your needs and tailor the perfect solution for your business"}
              </p>

            </div>

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

                {/* Service Selection - Context-Specific */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {primaryFocus === 'accounting' && "Which accounting services do you need? *"}
                    {primaryFocus === 'tax-registration' && "Which tax registration services do you need? *"}
                    {primaryFocus === 'ai-bookkeeping' && "Which bookkeeping services do you need? *"}
                    {primaryFocus === 'virtual-office' && "Which virtual office services do you need? *"}
                    {primaryFocus === 'vat-filing' && "Which VAT filing services do you need? *"}
                    {primaryFocus === 'cit-filing' && "Which corporate tax services do you need? *"}
                    {(!primaryFocus || primaryFocus === 'branch-registration') && "Which services do you need help with? *"}
                  </label>
                  <p className="text-xs text-gray-400 mb-4">Select all services you're interested in</p>
                  
                  <div className="space-y-3">
                    {(() => {
                      // Context-specific service lists
                      if (primaryFocus === 'accounting') {
                        return [
                          {
                            id: 'financial-reporting',
                            name: 'Financial Reporting',
                            description: 'Automated financial statements and reports',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'bookkeeping',
                            name: 'Bookkeeping',
                            description: 'Automated transaction recording and categorization',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'tax-preparation',
                            name: 'Tax Preparation',
                            description: 'Tax return preparation and filing',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'payroll',
                            name: 'Payroll Management',
                            description: 'Employee payroll processing',
                            icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      if (primaryFocus === 'tax-registration') {
                        return [
                          {
                            id: 'vat-id',
                            name: 'VAT ID Registration',
                            description: 'European VAT number registration',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'wage-tax',
                            name: 'Wage Tax Registration',
                            description: 'Employer tax registration and setup',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'corporate-tax',
                            name: 'Corporate Tax Setup',
                            description: 'Corporate income tax registration',
                            icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      if (primaryFocus === 'ai-bookkeeping') {
                        return [
                          {
                            id: 'automated-categorization',
                            name: 'Automated Categorization',
                            description: 'AI-powered transaction categorization',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'bank-sync',
                            name: 'Bank Synchronization',
                            description: 'Automatic bank account synchronization',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'receipt-scanning',
                            name: 'Receipt Scanning',
                            description: 'AI-powered receipt and invoice processing',
                            icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      if (primaryFocus === 'virtual-office') {
                        return [
                          {
                            id: 'business-address',
                            name: 'Business Address',
                            description: 'Professional registered business address',
                            icon: <BuildingIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'mail-handling',
                            name: 'Mail Handling',
                            description: 'Mail forwarding and scanning services',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'phone-services',
                            name: 'Phone Services',
                            description: 'Virtual phone number and call handling',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      if (primaryFocus === 'vat-filing') {
                        return [
                          {
                            id: 'quarterly-filing',
                            name: 'Quarterly VAT Filing',
                            description: 'Regular quarterly VAT return submissions',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'monthly-filing',
                            name: 'Monthly VAT Filing',
                            description: 'Monthly VAT return submissions',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'vat-consulting',
                            name: 'VAT Consulting',
                            description: 'VAT compliance and optimization advice',
                            icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      if (primaryFocus === 'cit-filing') {
                        return [
                          {
                            id: 'annual-filing',
                            name: 'Annual CIT Filing',
                            description: 'Annual corporate income tax return',
                            icon: <FileIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]',
                            popular: true
                          },
                          {
                            id: 'tax-planning',
                            name: 'Tax Planning',
                            description: 'Strategic tax planning and optimization',
                            icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'audit-support',
                            name: 'Audit Support',
                            description: 'Support during tax authority audits',
                            icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-[#EA3A70]'
                          },
                          {
                            id: 'other',
                            name: 'Other',
                            description: 'Tell us what else you need',
                            icon: <PlusIcon className="h-5 w-5 text-white" />,
                            bgColor: 'bg-gray-600'
                          }
                        ];
                      }
                      
                      // Default services for branch-registration or no primaryFocus
                      return [
                        {
                          id: 'virtual-office',
                          name: 'Virtual Office',
                          description: 'Professional business address and mail handling',
                          icon: <BuildingIcon className="h-5 w-5 text-white" />,
                          bgColor: 'bg-[#EA3A70]',
                          popular: true
                        },
                        {
                          id: 'branch-registration',
                          name: 'Branch Registration',
                          description: 'Company registration and legal structure',
                          icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
                          bgColor: 'bg-[#EA3A70]',
                          popular: true
                        },
                        {
                          id: 'vat-id',
                          name: 'VAT ID Application',
                          description: 'European VAT registration for tax compliance',
                          icon: <FileIcon className="h-5 w-5 text-white" />,
                          bgColor: 'bg-[#EA3A70]'
                        },
                        {
                          id: 'vat-filing',
                          name: 'VAT Filing',
                          description: 'Quarterly VAT return submissions',
                          icon: <CalculatorIcon className="h-5 w-5 text-white" />,
                          bgColor: 'bg-[#EA3A70]'
                        },
                        {
                          id: 'other',
                          name: 'Other',
                          description: 'Tell us what else you need',
                          icon: <PlusIcon className="h-5 w-5 text-white" />,
                          bgColor: 'bg-gray-600'
                        }
                      ];
                    })().map((service) => (
                      <div
                        key={service.id}
                        className={`border-2 rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                          selectedServices.includes(service.name)
                            ? 'border-[#EA3A70] bg-[#EA3A70]/10 shadow-lg shadow-[#EA3A70]/20'
                            : 'border-[#2D2755] bg-[#1B1537]/50 hover:border-[#EA3A70]/50 hover:bg-[#1B1537]/70'
                        }`}
                        onClick={() => {
                          if (selectedServices.includes(service.name)) {
                            setSelectedServices(selectedServices.filter(s => s !== service.name));
                          } else {
                            setSelectedServices([...selectedServices, service.name]);
                          }
                        }}
                      >
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.name)}
                            onChange={() => {
                              if (selectedServices.includes(service.name)) {
                                setSelectedServices(selectedServices.filter(s => s !== service.name));
                              } else {
                                setSelectedServices([...selectedServices, service.name]);
                              }
                            }}
                            className="h-5 w-5 mt-1 text-[#EA3A70] border-[#2D2755] rounded bg-[#0F0B1F] focus:ring-2 focus:ring-[#EA3A70] focus:ring-offset-2 focus:ring-offset-[#1B1537] cursor-pointer"
                          />
                          <div className="ml-4 flex items-start flex-1">
                            <div className={`${service.bgColor} p-2.5 rounded-lg mr-3 flex-shrink-0`}>
                              {service.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center flex-wrap gap-2">
                                <h3 className="font-semibold text-white text-base">{service.name}</h3>
                                {service.popular && (
                                  <span className="text-xs bg-[#EA3A70]/20 text-[#EA3A70] border border-[#EA3A70]/30 px-2.5 py-0.5 rounded-full font-medium">
                                    Popular
                                  </span>
                                )}
                        </div>
                              <p className="text-sm text-gray-300 mt-1.5">{service.description}</p>
                            </div>
                          </div>
                        </label>
                        
                        {service.name === 'Other' && selectedServices.includes('Other') && (
                          <div className="mt-4 ml-9">
                            <input
                              type="text"
                              value={otherService}
                              onChange={(e) => setOtherService(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Please specify other service"
                              className="w-full p-3 border border-[#2D2755] rounded-lg text-sm bg-[#0F0B1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA3A70] focus:border-[#EA3A70]"
                            />
                        </div>
                        )}
                        </div>
                    ))}
                  </div>

                  {selectedServices.length === 0 && (
                    <p className="text-xs text-red-400 mt-3 flex items-center">
                      <span className="mr-1">⚠</span>
                      Please select at least one service
                    </p>
                  )}
                </div>

                {/* Main Intentions and Concerns - Context-Specific */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {primaryFocus === 'accounting' && "What are your main accounting goals? *"}
                    {primaryFocus === 'tax-registration' && "What are your main tax registration goals? *"}
                    {primaryFocus === 'ai-bookkeeping' && "What are your main bookkeeping goals? *"}
                    {primaryFocus === 'virtual-office' && "What are your main virtual office needs? *"}
                    {primaryFocus === 'vat-filing' && "What are your main VAT filing goals? *"}
                    {primaryFocus === 'cit-filing' && "What are your main corporate tax filing goals? *"}
                    {(!primaryFocus || primaryFocus === 'branch-registration') && "What are your main intentions to use our AI-Powered portal? *"}
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
                    placeholder={
                      primaryFocus === 'accounting' 
                        ? "e.g., Automate financial reporting, improve cash flow visibility, ensure tax compliance, streamline month-end closing..."
                        : primaryFocus === 'tax-registration'
                        ? "e.g., Get VAT ID for EU sales, register for wage tax, ensure tax compliance, set up tax accounts..."
                        : primaryFocus === 'ai-bookkeeping'
                        ? "e.g., Automate transaction categorization, reduce manual data entry, improve accuracy, save time on bookkeeping..."
                        : primaryFocus === 'virtual-office'
                        ? "e.g., Need professional business address, mail forwarding services, phone answering, meeting room access..."
                        : primaryFocus === 'vat-filing'
                        ? "e.g., Automate VAT return preparation, never miss deadlines, ensure accurate calculations, reduce filing errors..."
                        : primaryFocus === 'cit-filing'
                        ? "e.g., Optimize tax deductions, ensure compliance, prepare accurate returns, minimize tax liability..."
                        : "e.g., Streamline accounting processes, automate tax filings, manage compliance, improve financial reporting..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {primaryFocus === 'accounting' && "What accounting challenges are you facing?"}
                    {primaryFocus === 'tax-registration' && "What tax registration challenges are you facing?"}
                    {primaryFocus === 'ai-bookkeeping' && "What bookkeeping challenges are you facing?"}
                    {primaryFocus === 'virtual-office' && "What virtual office challenges are you facing?"}
                    {primaryFocus === 'vat-filing' && "What VAT filing challenges are you facing?"}
                    {primaryFocus === 'cit-filing' && "What corporate tax filing challenges are you facing?"}
                    {(!primaryFocus || primaryFocus === 'branch-registration') && "What specific concerns do you hope to resolve with our help?"}
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
                    placeholder={
                      primaryFocus === 'accounting'
                        ? "e.g., Manual data entry is time-consuming, lack of real-time financial visibility, complex reporting requirements..."
                        : primaryFocus === 'tax-registration'
                        ? "e.g., Unclear registration requirements, language barriers with tax authorities, complex documentation needed..."
                        : primaryFocus === 'ai-bookkeeping'
                        ? "e.g., Too much time spent on categorization, frequent errors in data entry, difficulty tracking expenses..."
                        : primaryFocus === 'virtual-office'
                        ? "e.g., Need professional address for registration, mail handling when traveling, phone coverage during business hours..."
                        : primaryFocus === 'vat-filing'
                        ? "e.g., Missing filing deadlines, calculation errors, complex VAT rules, time-consuming preparation..."
                        : primaryFocus === 'cit-filing'
                        ? "e.g., Complex tax calculations, maximizing deductions, ensuring compliance, preparing for audits..."
                        : "e.g., Time-consuming manual bookkeeping, complex tax regulations, compliance deadlines, lack of financial visibility..."
                    }
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

                {/* Address */}

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Address

                  </label>

                  <input

                    type="text"

                    value={formData.address}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        address: e.target.value,

                      })

                    }

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    placeholder="Street address, City, Country"

                  />

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
                  disabled={isSaving || selectedServices.length === 0}
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

