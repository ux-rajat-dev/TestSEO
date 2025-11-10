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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

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

    setLoading(true)

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      // Check if qualification exists with this email
      const qualificationResult = await getQualificationByEmail(formData.email)
      let existingQualification = null

      if (qualificationResult.success && qualificationResult.data) {
        existingQualification = qualificationResult.data
        console.log('Found qualification with matching email:', existingQualification)
      }

      // Create Supabase account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: fullName,
            company_name: formData.companyName,
            phone: formData.phone,
          },
        },
      })

      if (signUpError) {
        // Check if account already exists
        if (
          signUpError.message.includes('already registered') ||
          signUpError.message.includes('User already registered') ||
          signUpError.message.includes('already have an account') ||
          signUpError.message.includes('already exists') ||
          signUpError.message.includes('Email already registered')
        ) {
          setError('An account with this email already exists. Please log in instead.')
          setLoading(false)
          return
        }
        throw new Error(signUpError.message || 'Failed to create account')
      }

      if (!authData.user) {
        throw new Error('Account creation failed. Please try again.')
      }

      const userId = authData.user.id
      console.log('Created new user account with ID:', userId)

      // Check if user already exists in user_roles table
      const { data: existingUsers, error: checkError } = await supabase
        .from('user_roles')
        .select('id, user_id, email')
        .eq('user_id', userId)

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing account:', checkError)
      }

      // If user doesn't exist in user_roles, create entry
      if (!existingUsers || existingUsers.length === 0) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            {
              user_id: userId,
              email: formData.email,
              fullName: fullName,
              phone: formData.phone || null,
              company_name: formData.companyName || null,
              role: 'lead',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])

        if (roleError) {
          console.error('Error creating user role:', roleError)
          // Continue anyway - the account is created
        }
      } else {
        // Clean up duplicates if they exist
        if (existingUsers.length > 1) {
          const idsToDelete = existingUsers.slice(1).map((user) => user.id)
          await supabase.from('user_roles').delete().in('id', idsToDelete)
        }
      }

      // Link qualification to user account
      // Priority 1: Link by qualificationId if provided
      if (qualificationId) {
        const linkResult = await linkQualificationToUser(qualificationId, userId)
        if (linkResult.success) {
          console.log('Successfully linked qualification by ID:', qualificationId)
        } else {
          console.error('Error linking qualification by ID:', linkResult.error)
        }
      }
      
      // Priority 2: If no qualificationId but email matches a qualification, link that one
      if (!qualificationId && existingQualification) {
        // Only link if it doesn't already have a user_id
        if (!existingQualification.user_id) {
          const linkResult = await linkQualificationToUser(existingQualification.id, userId)
          if (linkResult.success) {
            console.log('Successfully linked qualification by email match:', existingQualification.id)
          } else {
            console.error('Error linking qualification by email:', linkResult.error)
          }
        } else {
          console.log('Qualification already linked to user:', existingQualification.user_id)
        }
      }

      // Show success message
      setSuccessMessage('Account created successfully! Redirecting to dashboard...')

      // Redirect to external dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = 'https://clientdashboard.houseofcompanies.io/'
      }, 2000)

    } catch (error: any) {
      console.error('Error in handleSubmit:', error)
      setError(error.message || 'Failed to create account. Please try again.')
      setLoading(false)
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

              <form onSubmit={handleSubmit} className="space-y-6">

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

                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 text-sm">
                    {successMessage}
                  </div>
                )}

                <button

                  type="submit"

                  disabled={loading}

                  className="w-full bg-[#EA3A70] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  {loading ? (
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account & Continue
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </>
                  )}

                </button>

              </form>

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

