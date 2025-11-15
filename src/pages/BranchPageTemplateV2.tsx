import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BuildingIcon,
  CheckIcon,
  ArrowRightIcon,
  MessageSquareIcon,
  FileTextIcon,
  SparklesIcon,
  ClockIcon,
  XIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  ShoppingCartIcon,
  StarIcon,
  BadgeCheckIcon,
} from 'lucide-react';
import { ServiceDetails } from '../components/ServiceDetails';
import { Header } from '../components/layout/Header';

interface BranchPageTemplateV2Props {
  countryKey: string;
  countryName: string;
  countryFlag: string;
  registrationFee: string;
  processingTime: string;
  notaryRequired: boolean;
  heroDescription: string;
  serviceDetails: Record<string, any>;
  price: string;
}

export function BranchPageTemplateV2({
  countryKey,
  countryName,
  countryFlag,
  registrationFee,
  processingTime,
  notaryRequired,
  heroDescription,
  serviceDetails,
  price,
}: BranchPageTemplateV2Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    qualification, 
    from, 
    to, 
    formData,
    completeOrderData,
    registrationSuccess,
    qualificationId,
  } = location.state || {};

  // Log complete order data for database storage (when registration is complete)
  useEffect(() => {
    if (completeOrderData && registrationSuccess) {
      console.log('Complete Order Data (Ready for Database):', JSON.stringify(completeOrderData, null, 2));
      // TODO: Send to database API endpoint
      // Example: await fetch('/api/orders', { method: 'POST', body: JSON.stringify(completeOrderData) })
    }
  }, [completeOrderData, registrationSuccess]);

  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expertForm, setExpertForm] = useState({
    name: qualification?.companyName || '',
    email: qualification?.email || '',
    phone: qualification?.phone || '',
    message: '',
    preferredTime: '',
  });

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Expert consultation requested:', expertForm);
    setShowConfirmation(true);
  };

  const handleProceedToMemo = () => {
    setShowExpertModal(false);
    setShowConfirmation(false);
    navigate('/memo-intake', {
      state: {
        qualification,
        from,
        to: countryKey,
        formData: {
          ...formData,
          ...expertForm,
        },
        fromExpertCall: true,
      },
    });
  };

  const handleSkipToWait = () => {
    setShowExpertModal(false);
    setShowConfirmation(false);
    setExpertForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      preferredTime: '',
    });
  };

  const handleViewPackage = () => {
    navigate('/order-summary', {
      state: {
        tier: 'ebranch',
        country: countryKey,
        // Pass all qualification data
        qualification: qualification || formData || {},
        from,
        to: countryKey,
        formData: formData || qualification || {},
        // Ensure all qualification fields are preserved
        qualificationData: {
          ...qualification,
          ...formData,
        },
        // Pass qualification ID for mapping to user account
        qualificationId,
      },
    });
  };

  const handleGetMemo = () => {
    navigate('/memo-intake', {
      state: {
        qualification,
        from,
        to: countryKey,
        formData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0B1F]">
      <Header />

      {/* Hero Section with Country Header */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1537] via-[#0F0B1F]/95 to-[#0F0B1F]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full text-orange-400 backdrop-blur-sm mb-6">
              <MapPinIcon className="h-5 w-5 mr-2" />
              {countryFlag} {countryName} Branch Registration
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Launch Your Business in {countryName}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{heroDescription}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {!notaryRequired && (
                <div className="flex items-center bg-[#1B1537] px-4 py-2 rounded-lg border border-[#2D2755]">
                  <ShieldCheckIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                  <span className="text-white">No notary required</span>
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

      {/* Pricing Card */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1B1537] rounded-lg border-2 border-[#EA3A70] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#EA3A70] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Complete Solution
                </span>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    eBranch Package
                  </h2>
                  <p className="text-gray-400">
                    Everything you need to launch in {countryName}
                  </p>
                </div>
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{price}</span>
                    <span className="text-gray-400 ml-2">/year</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Plus {registrationFee}
                  </p>
                </div>
                <div className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755] mb-6">
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
                      <div key={index} className="flex items-start text-gray-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EA3A70] mr-2 mt-1.5 flex-shrink-0" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-[#1B1537]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ServiceDetails services={serviceDetails} countryName={countryName} />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <StarIcon className="h-6 w-6" />,
                  label: '500+ Companies',
                },
                {
                  icon: <ShieldCheckIcon className="h-6 w-6" />,
                  label: '100% Compliant',
                },
                {
                  icon: <ClockIcon className="h-6 w-6" />,
                  label: `${processingTime} Processing`,
                },
                {
                  icon: <BadgeCheckIcon className="h-6 w-6" />,
                  label: 'Verified Partner',
                },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="bg-[#1B1537] rounded-lg p-6 border border-[#2D2755] text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EA3A70]/10 rounded-lg text-[#EA3A70] mb-3">
                    {badge.icon}
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three-Path CTA Section */}
      <section className="py-16 bg-[#1B1537]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Choose Your Next Step
              </h2>
              <p className="text-gray-400">
                Select the option that best fits your timeline and needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Path A: View Package */}
              <div className="bg-[#0F0B1F] rounded-lg p-6 border-2 border-[#EA3A70] hover:border-[#EA3A70]/80 transition-all">
                <div className="bg-[#EA3A70]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCartIcon className="h-6 w-6 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  View Full Package
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Ready to start? Review the complete package and configure your
                  services.
                </p>
                <button
                  onClick={handleViewPackage}
                  className="w-full bg-[#EA3A70] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center"
                >
                  View Package
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>

              {/* Path B: Get Memo */}
              <div className="bg-[#0F0B1F] rounded-lg p-6 border-2 border-[#2D2755] hover:border-[#EA3A70]/50 transition-all">
                <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileTextIcon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Get Tax Memo
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Need more details? Get a personalized analysis and
                  recommendations.
                </p>
                <button
                  disabled
                  className="w-full border border-[#EA3A70] text-[#EA3A70] py-3 px-4 rounded-lg font-medium opacity-50 cursor-not-allowed flex items-center justify-center"
                >
                  Get Memo
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>

              {/* Path C: Schedule Call */}
              <div className="bg-[#0F0B1F] rounded-lg p-6 border-2 border-[#2D2755] hover:border-[#EA3A70]/50 transition-all">
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CalendarIcon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Schedule Expert Call
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Have questions? Book a free consultation with our experts.
                </p>
                <a
                  href="https://calendly.com/dennis-houseofcompanies/new-meeting?month=2025-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-[#2D2755] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2D2755]/50 transition-colors flex items-center justify-center"
                >
                  Schedule Call
                  <CalendarIcon className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {!showConfirmation ? (
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
              <p className="text-gray-300 text-sm mb-6">
                Book a free 30-minute consultation with our expansion experts.
              </p>
              <form onSubmit={handleExpertSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={expertForm.name}
                    onChange={(e) =>
                      setExpertForm({
                        ...expertForm,
                        name: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setExpertForm({
                        ...expertForm,
                        email: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setExpertForm({
                        ...expertForm,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={expertForm.preferredTime}
                    onChange={(e) =>
                      setExpertForm({
                        ...expertForm,
                        preferredTime: e.target.value,
                      })
                    }
                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="evening">Evening (5PM - 8PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    value={expertForm.message}
                    onChange={(e) =>
                      setExpertForm({
                        ...expertForm,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"
                    placeholder="Tell us about your expansion plans..."
                  />
                </div>
                <a
                  href="https://calendly.com/dennis-houseofcompanies/new-meeting?month=2025-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#EA3A70] text-white py-3 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors text-center"
                >
                  Schedule Consultation
                </a>
              </form>
            </div>
          ) : (
            <div className="bg-[#1B1537] rounded-lg max-w-md w-full p-6 border border-[#2D2755]">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                  <CheckIcon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Schedule!
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Click below to select your preferred time slot
                </p>
              </div>

              {/* Direct Calendly Link */}
              <a
                href="https://calendly.com/dennis-houseofcompanies/new-meeting?month=2025-06"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#EA3A70] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center mb-6"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule on Calendly
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </a>

              <div className="space-y-4 mb-6">
                <h4 className="text-white font-bold text-center">
                  What would you like to do next?
                </h4>

                {/* Option 1: Complete Tax Memo - Recommended */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border-2 border-purple-500/30">
                  <div className="flex items-start mb-3">
                    <div className="bg-purple-500/20 rounded-full px-2 py-0.5 text-xs font-bold text-purple-400 mr-2">
                      RECOMMENDED
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <SparklesIcon className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="text-white font-semibold mb-1">
                        Complete Tax Memo
                      </h5>
                      <p className="text-gray-300 text-sm mb-2">
                        Get a personalized analysis before your call for better
                        recommendations
                      </p>
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span>5-10 minutes</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleProceedToMemo}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-500/90 transition-colors flex items-center justify-center"
                  >
                    Complete Tax Memo
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>

                {/* Option 2: View Package & Create Account */}
                <div className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755]">
                  <div className="flex items-start mb-3">
                    <BuildingIcon className="h-5 w-5 text-[#EA3A70] mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="text-white font-semibold mb-1">
                        View Package & Create Account
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Review the full eBranch package and set up your account
                        now
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleViewPackage}
                    className="w-full bg-[#EA3A70] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center"
                  >
                    View Full Package
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>

                {/* Option 3: Wait for Call */}
                <div className="bg-[#0F0B1F] rounded-lg p-4 border border-[#2D2755]">
                  <div className="flex items-start mb-3">
                    <CalendarIcon className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h5 className="text-white font-semibold mb-1">
                        Wait for Your Call
                      </h5>
                      <p className="text-gray-300 text-sm">
                        We'll handle everything during your consultation
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSkipToWait}
                    className="w-full border border-[#2D2755] text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#2D2755]/50 transition-colors"
                  >
                    I'll Wait for the Call
                  </button>
                </div>
              </div>

              <p className="text-center text-xs text-gray-500">
                You can always access these options later from your email
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

