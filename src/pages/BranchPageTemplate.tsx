import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, CheckIcon, ArrowRightIcon, MessageSquareIcon, FileTextIcon, SparklesIcon, ClockIcon, XIcon, MapPinIcon, ShieldCheckIcon, TrendingUpIcon, UsersIcon, GlobeIcon, CalendarIcon } from 'lucide-react';
import { Header } from '../components/layout/Header';

interface BranchPageProps {
  countryKey: string;
  countryName: string;
  registrationAuthority: string;
  registrationFee: string;
  processingTime: string;
  notaryRequired: boolean;
  heroDescription: string;
  advantageTitle: string;
  advantageDescription: string;
}

export function BranchPageTemplate({
  countryKey,
  countryName,
  registrationAuthority,
  registrationFee,
  processingTime,
  notaryRequired,
  heroDescription,
  advantageTitle,
  advantageDescription,
}: BranchPageProps) {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<'package' | 'memo' | 'call' | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertForm, setExpertForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const pricingTiers = [
    {
      id: 'oneoff',
      name: 'One-Off Branch Registration',
      price: 895,
      interval: 'one-time fee',
      additionalFee: registrationFee,
      description: 'Branch registration without subscription',
      features: [
        `Complete ${registrationAuthority} registration`,
        `${countryName} commercial register extract`,
        'EU VAT number registration',
        '3 months registered office',
        notaryRequired ? 'Notary services included' : 'No notary requirement',
        'AI + Community support',
        `${processingTime} processing`
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 'ebranch',
      name: 'eBranch',
      originalPrice: 2595,
      price: 1995,
      discount: '€600 OFF',
      interval: 'yearly',
      additionalFee: registrationFee,
      description: 'Complete branch management solution',
      features: [
        'Everything in One-Off registration',
        'Registered Office (€1,200 value)',
        'Advanced Software Suite (€795 value)',
        'AI + Community Support',
        'Pause, modify, or cancel anytime after 1 year',
        'Priority processing',
        'Dedicated account manager'
      ],
      cta: 'Choose eBranch',
      popular: true
    },
    {
      id: 'gotomarket',
      name: 'eBranch & Go-to-Market Report',
      originalPrice: 2490,
      price: 2290,
      discount: '€200 OFF',
      interval: 'yearly',
      additionalFee: registrationFee,
      description: 'Full market entry package',
      features: [
        'Everything in eBranch',
        'Comprehensive market analysis',
        'Strategic entry roadmap',
        'Competitive landscape report',
        'Regulatory compliance guide',
        'Local partner introductions',
        'Quarterly business reviews'
      ],
      cta: 'Go Premium',
      popular: false
    }
  ];

  const coreBenefits = [
    {
      icon: <BuildingIcon className="h-6 w-6" />,
      title: 'Official Registration',
      description: `Complete ${registrationAuthority} registration with all required documentation`
    },
    {
      icon: <FileTextIcon className="h-6 w-6" />,
      title: 'Legal Documentation',
      description: `${countryName} commercial register extract and official documentation`
    },
    {
      icon: <GlobeIcon className="h-6 w-6" />,
      title: 'EU VAT Number',
      description: `${countryName} tax number and EU VAT registration`
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Legal Address',
      description: '3 months of official business address service included'
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      title: 'Account Manager',
      description: 'AI + Community support throughout the registration process'
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: `${processingTime} Processing`,
      description: 'Expedited service to get your branch operational quickly'
    }
  ];

  const documents = [
    {
      title: 'Business Registry Extract',
      description: `Official ${countryName} business registry registration confirmation`
    },
    {
      title: 'Tax Registration',
      description: `Official ${countryName} tax office registration documentation`
    },
    {
      title: 'VAT Registration',
      description: 'EU VAT number confirmation letter'
    },
    {
      title: 'Verified Proof of Address',
      description: 'Official verification of business location'
    }
  ];

  const timeline = [
    {
      day: 'Day 1',
      title: 'Document Submission',
      description: 'Upload required documents and information'
    },
    {
      day: 'Day 1',
      title: 'Initial Processing',
      description: 'Document review and preparation for submission'
    },
    {
      day: processingTime.includes('48') ? 'Day 2' : 'Day 2-3',
      title: 'Official Registration',
      description: `Filing with ${registrationAuthority}`
    },
    {
      day: processingTime.includes('48') ? 'Day 2' : 'Day 2-3',
      title: 'Tax Registration',
      description: 'Application for tax number and verification'
    }
  ];

  const handleProceedToCheckout = () => {
    if (selectedTier) {
      navigate('/payment', {
        state: {
          tier: selectedTier,
          country: countryKey
        }
      });
    }
  };

  const handlePathSelection = (path: 'package' | 'memo' | 'call') => {
    setSelectedPath(path);
    if (path === 'call') {
      setShowExpertModal(true);
    }
  };

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Expert consultation requested:', expertForm);
    
    alert(`Thank you for your interest! We'll contact you within 24 hours to schedule your consultation.\n\n💡 While you wait, try our AI assistant Memo for instant answers to your questions about ${countryName} branch registration!`);
    
    setShowExpertModal(false);
    setExpertForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&q=80)'
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] via-[#0F0B1F]/95 to-[#0F0B1F]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full text-orange-400 backdrop-blur-sm mb-6">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {countryName} Branch Registration
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Launch Your Business in {countryName}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {heroDescription}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {!notaryRequired && (
                <div className="flex items-center bg-[#1B1537] px-4 py-2 rounded-lg border border-[#2D2755]">
                  <ShieldCheckIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                  <span className="text-white">No notary requirement</span>
                </div>
              )}
              <div className="flex items-center bg-[#1B1537] px-4 py-2 rounded-lg border border-[#2D2755]">
                <ClockIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                <span className="text-white">{processingTime} processing</span>
              </div>
              <div className="flex items-center bg-[#1B1537] px-4 py-2 rounded-lg border border-[#2D2755]">
                <TrendingUpIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                <span className="text-white">EU market access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Branch Office
            </h2>
            <p className="text-gray-400">
              Select the option that best suits your business needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map(tier => (
              <div 
                key={tier.id} 
                className={`bg-[#1B1537] rounded-lg border-2 transition-all cursor-pointer ${
                  selectedTier === tier.id 
                    ? 'border-[#EA3A70] shadow-lg shadow-[#EA3A70]/20' 
                    : 'border-[#2D2755] hover:border-[#EA3A70]/50'
                } ${tier.popular ? 'relative' : ''}`} 
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#EA3A70] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-6">
                  {tier.discount && (
                    <div className="inline-block bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {tier.discount}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {tier.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      {tier.originalPrice && (
                        <span className="text-2xl text-gray-500 line-through mr-2">
                          €{tier.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-white">
                        €{tier.price}
                      </span>
                      <span className="text-gray-400 ml-2">
                        /{tier.interval}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      {tier.additionalFee}
                    </p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setSelectedTier(tier.id)} 
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      selectedTier === tier.id 
                        ? 'bg-[#EA3A70] text-white' 
                        : 'border border-[#EA3A70] text-[#EA3A70] hover:bg-[#EA3A70]/10'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              No hidden fees • Money-back guarantee • 100% secure checkout
            </p>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="py-16 bg-[#1B1537] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Core Benefits
            </h2>
            <p className="text-gray-400">What's Included in Your Package</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreBenefits.map((benefit, index) => (
              <div key={index} className="bg-[#0F0B1F] rounded-lg p-6 border border-[#2D2755] hover:border-[#EA3A70]/50 transition-all">
                <div className="bg-[#EA3A70]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-[#EA3A70]">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Documentation */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Official Documentation
            </h2>
            <p className="text-gray-400">Documents You'll Receive</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {documents.map((doc, index) => (
              <div key={index} className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
                <FileTextIcon className="h-8 w-8 text-[#EA3A70] mb-4" />
                <h3 className="text-white font-semibold mb-2">{doc.title}</h3>
                <p className="text-gray-400 text-sm">{doc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Timeline */}
      <section className="py-16 bg-[#1B1537]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Processing Timeline
            </h2>
            <p className="text-gray-400">{processingTime} Delivery</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#2D2755]" />
              <div className="space-y-8">
                {timeline.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center">
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 order-2'}`}>
                        <div className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755]">
                          <div className="text-[#EA3A70] font-bold mb-1">
                            {step.day}
                          </div>
                          <h3 className="text-white font-semibold mb-1">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#EA3A70] rounded-full flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-[#0F0B1F] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Required Documents
            </h2>
            <p className="text-gray-400">
              To register your {countryName} branch, you'll need to provide the
              following documents
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <BuildingIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                Parent Company Documents
              </h3>
              <ul className="space-y-2">
                {[
                  'Certificate of Incorporation',
                  'Articles of Association',
                  'Recent extract from home country register',
                  'Proof of registered address',
                  'Financial statements (if available)'
                ].map((doc, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755]">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <UsersIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                Director/Representative Documents
              </h3>
              <ul className="space-y-2">
                {[
                  'Passport or ID copy of all directors',
                  'Proof of address (utility bill, bank statement)',
                  'Power of Attorney (if applicable)',
                  'Tax identification numbers',
                  'Brief professional biography'
                ].map((doc, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-[#EA3A70]/10 border border-[#EA3A70]/20 rounded-lg p-6">
              <p className="text-gray-300 text-sm">
                Don't have all documents? No problem! You can start the
                registration process with just the basic information. Our team
                will guide you through obtaining any missing documents and can
                provide alternatives where possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Advantage */}
      <section className="py-16 bg-[#1B1537]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&q=80" 
                  alt={`${countryName} Business District`} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1537] to-transparent" />
              </div>
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-8 border border-orange-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {advantageTitle}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {advantageDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Decision Paths */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your Path to {countryName} Branch Registration
              </h2>
              <p className="text-gray-400">
                Select the approach that best fits your needs and timeline
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Path A: View Package → Cart → Registration */}
              <div className={`bg-[#1B1537] rounded-lg border-2 transition-all cursor-pointer ${
                selectedPath === 'package' 
                  ? 'border-[#EA3A70] shadow-lg shadow-[#EA3A70]/20' 
                  : 'border-[#2D2755] hover:border-[#EA3A70]/50'
              }`} onClick={() => handlePathSelection('package')}>
                <div className="p-6">
                  <div className="bg-[#EA3A70]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-[#EA3A70]">
                    <BuildingIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Path A: Direct Registration
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Ready to proceed? Choose your package and start registration immediately.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-[#EA3A70]" />
                      <span>View Package Options</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-[#EA3A70]" />
                      <span>Add to Cart</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-[#EA3A70]" />
                      <span>Complete Registration</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePathSelection('package')} 
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      selectedPath === 'package' 
                        ? 'bg-[#EA3A70] text-white' 
                        : 'border border-[#EA3A70] text-[#EA3A70] hover:bg-[#EA3A70]/10'
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              </div>

              {/* Path B: Get Tax Memo → Analysis → Registration */}
              <div className={`bg-[#1B1537] rounded-lg border-2 transition-all cursor-not-allowed opacity-50 ${
                selectedPath === 'memo' 
                  ? 'border-gray-600' 
                  : 'border-gray-600'
              }`} onClick={() => {}}>
                <div className="p-6">
                  <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                    <SparklesIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Path B: AI-Powered Analysis
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get instant tax analysis and personalized recommendations from our AI assistant.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-400" />
                      <span>Get Tax Memo</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-400" />
                      <span>AI Analysis</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-blue-400" />
                      <span>Guided Registration</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {}} 
                    disabled
                    className="w-full py-3 rounded-lg font-medium cursor-not-allowed opacity-50 border border-gray-600 text-gray-500"
                  >
                    Start with Memo
                  </button>
                </div>
              </div>

              {/* Path C: Schedule Call → Confirmation → Registration */}
              <div className={`bg-[#1B1537] rounded-lg border-2 transition-all cursor-pointer ${
                selectedPath === 'call' 
                  ? 'border-[#EA3A70] shadow-lg shadow-[#EA3A70]/20' 
                  : 'border-[#2D2755] hover:border-[#EA3A70]/50'
              }`} onClick={() => handlePathSelection('call')}>
                <div className="p-6">
                  <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-green-400">
                    <MessageSquareIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Path C: Expert Consultation
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Schedule a call with our experts for personalized guidance and support.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-green-400" />
                      <span>Schedule Call</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-green-400" />
                      <span>Expert Confirmation</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <ArrowRightIcon className="h-4 w-4 mr-2 text-green-400" />
                      <span>Assisted Registration</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePathSelection('call')} 
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      selectedPath === 'call' 
                        ? 'bg-green-500 text-white' 
                        : 'border border-green-500 text-green-400 hover:bg-green-500/10'
                    }`}
                  >
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Path Actions */}
            {selectedPath && (
              <div className="mt-8 text-center">
                <div className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755] max-w-2xl mx-auto">
                  {selectedPath === 'package' && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Ready to Choose Your Package?</h3>
                      <p className="text-gray-400 mb-6">Select from our three registration options above and proceed to checkout.</p>
                      <button 
                        onClick={handleProceedToCheckout} 
                        disabled={!selectedTier} 
                        className="bg-[#EA3A70] text-white py-3 px-8 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Configure Your Registration
                      </button>
                    </div>
                  )}
                  
                  {selectedPath === 'memo' && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Start with Memo AI Analysis</h3>
                      <p className="text-gray-400 mb-6">Get instant tax analysis and personalized recommendations for your {countryName} branch registration.</p>
                      <button 
                        onClick={() => {/* Navigate to Memo */}} 
                        className="bg-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-500/90 transition-colors"
                      >
                        Launch Memo Assistant
                      </button>
                    </div>
                  )}
                  
                  {selectedPath === 'call' && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Expert Consultation Scheduled</h3>
                      <p className="text-gray-400 mb-6">We'll contact you within 24 hours to schedule your consultation. In the meantime, try Memo for instant answers!</p>
                      <div className="flex gap-4 justify-center">
                        <button 
                          onClick={() => setShowExpertModal(true)} 
                          className="bg-green-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-500/90 transition-colors"
                        >
                          Modify Request
                        </button>
                        <button 
                          onClick={() => {/* Navigate to Memo */}} 
                          className="border border-blue-500 text-blue-400 py-3 px-8 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
                        >
                          Try Memo While Waiting
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expert Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1B1537] rounded-lg max-w-md w-full p-6 border border-[#2D2755]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                Schedule Expert Consultation
              </h3>
              <button 
                onClick={() => setShowExpertModal(false)} 
                className="text-gray-400 hover:text-white"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Memo Promotion Banner */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <SparklesIcon className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium text-sm">Instant Help Available</span>
              </div>
              <p className="text-gray-300 text-sm">
                While you wait for your consultation, try our AI assistant <strong>Memo</strong> for instant answers to your {countryName} branch registration questions!
              </p>
            </div>
            
            <form onSubmit={handleExpertSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Full Name*
                </label>
                <input 
                  type="text" 
                  required 
                  value={expertForm.name} 
                  onChange={e => setExpertForm({
                    ...expertForm,
                    name: e.target.value
                  })} 
                  className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email*
                </label>
                <input 
                  type="email" 
                  required 
                  value={expertForm.email} 
                  onChange={e => setExpertForm({
                    ...expertForm,
                    email: e.target.value
                  })} 
                  className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Phone*
                </label>
                <input 
                  type="tel" 
                  required 
                  value={expertForm.phone} 
                  onChange={e => setExpertForm({
                    ...expertForm,
                    phone: e.target.value
                  })} 
                  className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea 
                  value={expertForm.message} 
                  onChange={e => setExpertForm({
                    ...expertForm,
                    message: e.target.value
                  })} 
                  rows={4} 
                  className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" 
                  placeholder="Tell us about your business needs and any specific questions..." 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#EA3A70] text-white py-3 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors"
              >
                Request Consultation
              </button>
            </form>
            
            {/* Additional Memo Promotion */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                Need immediate answers? Try our AI assistant <strong className="text-blue-400">Memo</strong> for instant support!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

