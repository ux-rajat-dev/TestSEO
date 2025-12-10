import React, { useState } from 'react'

import { useNavigate, useLocation, Link } from 'react-router-dom'

import {

  BuildingIcon,

  ArrowRightIcon,

  CheckIcon,

  SparklesIcon,

  EyeIcon,

  EyeOffIcon,

} from 'lucide-react'

import { Header } from '../components/layout/Header'
import { supabase } from '../utils/supabase'
import { linkQualificationToUser, getQualificationByEmail } from '../services/qualificationService'

export function RegistrationPage() {

  const navigate = useNavigate()

  const location = useLocation()

  const {

    qualification,

    from,

    to,

    formData: qualificationData,

    fromMemo,

    selectedService,

    selectedAddons,

    orderSummary,

    includeOrderForm,

    qualificationId,

  } = location.state || {}

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1) // 1: Email, 2: OTP, 3: Account Creation
  const [otp, setOtp] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const [formData, setFormData] = useState({

    email: qualificationData?.email || '',

    password: '',

    confirmPassword: '',

    firstName: '',

    lastName: '',

    phone: qualificationData?.phone || '',

    companyName: qualificationData?.companyName || '',

    agreeToTerms: false,

  })

  // Password validation
  const validatePassword = () => {
    if (formData.password.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(formData.password)) return 'Password must contain at least one uppercase letter'
    if (!/[a-z]/.test(formData.password)) return 'Password must contain at least one lowercase letter'
    if (!/[0-9]/.test(formData.password)) return 'Password must contain at least one number'
    if (!/[!@#$%^&*]/.test(formData.password)) return 'Password must contain at least one special character'
    return null
  }

  // Step 1: Send OTP
  const sendOTP = async () => {
    setOtpLoading(true)
    setError(null)
    setSuccessMessage(null)

    if (!formData.email) {
      setError('Please enter your email address')
      setOtpLoading(false)
      return
    }

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          // No redirect URL needed for OTP
        },
      })

      if (otpError) {
        // Check if account already exists
        if (
          otpError.message.includes('already registered') ||
          otpError.message.includes('User already registered') ||
          otpError.message.includes('already have an account') ||
          otpError.message.includes('already exists') ||
          otpError.message.includes('Email already registered')
        ) {
          setError('An account with this email already exists. Please log in instead.')
        } else {
          setError('Failed to send OTP. Please try again.')
        }
        setOtpLoading(false)
        return
      }

      setCurrentStep(2)
      setSuccessMessage('OTP sent to your email! Please check your inbox and enter the 6-digit code.')
    } catch (error: any) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setOtpLoading(false)
    }
  }

  // Step 2: Verify OTP
  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a complete 6-digit verification code.')
      return
    }

    setVerifying(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: otp,
        type: 'email',
      })

      if (verifyError) {
        if (
          verifyError.message.includes('Invalid token') ||
          verifyError.message.includes('Token has expired') ||
          verifyError.message.includes('Invalid OTP') ||
          verifyError.message.includes('expired') ||
          verifyError.message.includes('Invalid verification code')
        ) {
          setError('Invalid or expired OTP. Please try again or request a new code.')
        } else {
          setError('OTP verification failed. Please try again.')
        }
        setVerifying(false)
        return
      }

      setCurrentStep(3)
      setSuccessMessage('Email verified! Now create your account.')
    } catch (error: any) {
      setError('Invalid OTP. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  // Step 3: Create Account - Optimized for speed
  const createAccount = async () => {
    setError(null)
    setSuccessMessage(null)

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    const passwordError = validatePassword()
    if (passwordError) {
      setError(passwordError)
      return
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.companyName) {
      setError('Please fill in all required fields')
      return
    }

    // Don't show loading state - make it instant
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      // Get the current user from the verified session (from OTP verification)
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        setError('User session not found. Please start over.')
        return
      }

      const userId = user.id

      // Run all operations in parallel for speed
      const [
        updateResult,
        qualificationResult,
        existingUsersResult
      ] = await Promise.all([
        // Update user password and metadata
        supabase.auth.updateUser({
          password: formData.password,
          data: {
            full_name: fullName,
            company_name: formData.companyName,
            phone: formData.phone,
          },
        }),
        // Check if qualification exists (in parallel)
        getQualificationByEmail(formData.email),
        // Check if user already exists in user_roles (in parallel)
        supabase
          .from('user_roles')
          .select('id, user_id, email')
          .eq('user_id', userId)
      ])

      // Handle update error
      if (updateResult.error) {
        setError('Failed to set password. Please try again.')
        return
      }

      // Get qualification data
      let existingQualification = null
      if (qualificationResult.success && qualificationResult.data) {
        existingQualification = qualificationResult.data
      }

      // Handle user_roles creation/update
      const existingUsers = existingUsersResult.data
      if (existingUsersResult.error && existingUsersResult.error.code !== 'PGRST116') {
        console.error('Error checking existing account:', existingUsersResult.error)
      }

      // Create user_roles entry if needed (non-blocking)
      const userRolePromise = !existingUsers || existingUsers.length === 0
        ? supabase.from('user_roles').insert([{
            user_id: userId,
            email: formData.email,
            fullName: fullName,
            phone: formData.phone || null,
            company_name: formData.companyName || null,
            role: 'lead',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
        : existingUsers.length > 1
        ? supabase.from('user_roles').delete().in('id', existingUsers.slice(1).map((u) => u.id))
        : Promise.resolve({ error: null })

      // Link qualification (non-blocking, run in parallel)
      const linkPromises = []
      if (qualificationId) {
        linkPromises.push(linkQualificationToUser(qualificationId, userId))
      } else if (!qualificationId && existingQualification && !existingQualification.user_id) {
        linkPromises.push(linkQualificationToUser(existingQualification.id, userId))
      }

      // Execute all remaining operations in parallel (non-blocking for redirect)
      Promise.all([userRolePromise, ...linkPromises]).catch(err => {
        console.error('Non-critical error during account setup:', err)
        // Don't block redirect for these
      })

      // Immediate redirect - don't wait for everything
      window.location.href = 'https://clientdashboard.houseofcompanies.io/'

    } catch (error: any) {
      console.error('Error in createAccount:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    }
  }

  return (

    <div className="min-h-screen bg-[#0F0B1F]">

      <Header />

      <section className="py-16">

        <div className="container mx-auto px-4">

          <div className="max-w-2xl mx-auto">

            <div className="text-center mb-12">

              <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full text-purple-400 backdrop-blur-sm mb-6">

                <SparklesIcon className="h-5 w-5 mr-2" />

                Create Your Account

              </div>

              <h1 className="text-4xl font-bold text-white mb-4">

                Welcome to Your Business Portal

              </h1>

              <p className="text-xl text-gray-300">

                One account to manage your entire global expansion

              </p>

            </div>

            <div className="bg-[#1B1537] rounded-lg border border-[#2D2755] p-8">

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {/* Step 1 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 1 ? 'bg-[#EA3A70] text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-[#EA3A70]' : 'bg-gray-600'}`}></div>
                  
                  {/* Step 2 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 2 ? 'bg-[#EA3A70] text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    2
                  </div>
                  <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-[#EA3A70]' : 'bg-gray-600'}`}></div>
                  
                  {/* Step 3 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 3 ? 'bg-[#EA3A70] text-white' : 'bg-gray-600 text-gray-400'
                  }`}>
                    3
                  </div>
                </div>
              </div>

              {/* Step 1: Email Input */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={otpLoading || !formData.email}
                    className="w-full bg-[#EA3A70] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpLoading ? (
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-300 mb-4">
                      We sent a 6-digit code to <strong className="text-white">{formData.email}</strong>
                    </p>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5, 6].map((digit) => (
                        <div
                          key={digit}
                          className={`w-3 h-3 rounded-full ${
                            otp.length >= digit
                              ? 'bg-[#EA3A70]'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Verification code *
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setOtp(value)
                        if (error) setError(null)
                      }}
                      maxLength={6}
                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest font-mono focus:outline-none focus:border-[#EA3A70]"
                      placeholder="123456"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={verifying || otp.length !== 6}
                      className="flex-1 bg-[#EA3A70] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {verifying ? 'Verifying...' : otp.length === 6 ? 'Verify email' : 'Enter 6-digit code'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-4 text-gray-300 border border-[#2D2755] rounded-lg hover:bg-[#0F0B1F] transition"
                    >
                      Back
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={sendOTP}
                      disabled={otpLoading}
                      className="text-sm text-[#EA3A70] hover:underline disabled:opacity-50"
                    >
                      {otpLoading ? 'Sending...' : "Didn't receive a code? Resend"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Creation */}
              {currentStep === 3 && (
                <form onSubmit={(e) => { e.preventDefault(); createAccount(); }} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      First Name

                    </label>

                    <input

                      type="text"

                      value={formData.firstName}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          firstName: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-gray-300 mb-2">

                      Last Name

                    </label>

                    <input

                      type="text"

                      value={formData.lastName}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          lastName: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Company Name

                  </label>

                  <input

                    type="text"

                    value={formData.companyName}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        companyName: e.target.value,

                      })

                    }

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Email

                  </label>

                  <input

                    type="email"

                    value={formData.email}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        email: e.target.value,

                      })

                    }

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Phone

                  </label>

                  <input

                    type="tel"

                    value={formData.phone}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        phone: e.target.value,

                      })

                    }

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Password

                  </label>

                  <div className="relative">

                    <input

                      type={showPassword ? 'text' : 'password'}

                      value={formData.password}

                      onChange={(e) =>

                        setFormData({

                          ...formData,

                          password: e.target.value,

                        })

                      }

                      className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70] pr-12"

                    />

                    <button

                      type="button"

                      onClick={() => setShowPassword(!showPassword)}

                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"

                    >

                      {showPassword ? (

                        <EyeOffIcon className="h-5 w-5" />

                      ) : (

                        <EyeIcon className="h-5 w-5" />

                      )}

                    </button>

                  </div>

                  <p className="text-xs text-gray-400 mt-1">

                    Must be at least 8 characters

                  </p>

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-300 mb-2">

                    Confirm Password

                  </label>

                  <input

                    type={showPassword ? 'text' : 'password'}

                    value={formData.confirmPassword}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        confirmPassword: e.target.value,

                      })

                    }

                    className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]"

                  />

                </div>

                <div className="flex items-start">

                  <input

                    type="checkbox"

                    id="terms"

                    checked={formData.agreeToTerms}

                    onChange={(e) =>

                      setFormData({

                        ...formData,

                        agreeToTerms: e.target.checked,

                      })

                    }

                    className="mt-1 h-4 w-4 rounded border-[#2D2755] bg-[#0F0B1F] text-[#EA3A70] focus:ring-[#EA3A70]"

                  />

                  <label htmlFor="terms" className="ml-3 text-sm text-gray-300">

                    I agree to the{' '}

                    <a

                      href="#"

                      className="text-[#EA3A70] hover:text-[#EA3A70]/80"

                    >

                      Terms of Service

                    </a>{' '}

                    and{' '}

                    <a

                      href="#"

                      className="text-[#EA3A70] hover:text-[#EA3A70]/80"

                    >

                      Privacy Policy

                    </a>

                  </label>

                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                    {error}
                    {error.includes('account with this email already exists') && (
                      <div className="mt-3">
                        <Link
                          to="/login"
                          className="inline-block px-4 py-2 bg-[#EA3A70] text-white text-sm rounded-lg hover:bg-[#EA3A70]/90 transition-colors"
                        >
                          Go to Login
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                  <button
                    type="submit"
                    className="w-full bg-[#EA3A70] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center"
                  >
                    Create Account & Continue
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </button>
                </form>
              )}

              {/* Error and Success Messages - Show on all steps */}
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                  {error}
                  {error.includes('account with this email already exists') && (
                    <div className="mt-3">
                      <Link
                        to="/login"
                        className="inline-block px-4 py-2 bg-[#EA3A70] text-white text-sm rounded-lg hover:bg-[#EA3A70]/90 transition-colors"
                      >
                        Go to Login
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {successMessage && currentStep !== 1 && (
                <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 text-sm flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[#2D2755]">

                <p className="text-center text-sm text-gray-400">

                  By creating an account, you'll get access to:

                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">

                  {[

                    'AI-powered entity management',

                    'Real-time compliance tracking',

                    'Document management',

                    'Dedicated support team',

                  ].map((benefit) => (

                    <div

                      key={benefit}

                      className="flex items-center text-sm text-gray-300"

                    >

                      <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2 flex-shrink-0" />

                      <span>{benefit}</span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}

