import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  BuildingIcon, 
  CheckIcon, 
  ClockIcon, 
  EuroIcon, 
  FileTextIcon, 
  GlobeIcon, 
  ShieldIcon,
  UsersIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react'

export function GreekBranchBrochure() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#0F0B1F] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EA3A70]/10 to-[#2D2755]/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <BuildingIcon className="h-12 w-12 text-[#EA3A70] mr-4" />
            <span className="text-2xl font-bold">🇬🇷 Greece</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#EA3A70] bg-clip-text text-transparent">
            Greece Branch Registration & Management
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Expand your business to Greece with a flexible, cost-effective branch structure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/greek-branch" 
              className="bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
            >
              Get Started Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <a 
              href="https://calendly.com/your-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-[#EA3A70] text-[#EA3A70] hover:bg-[#EA3A70] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* What is a Greek Branch Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What is a Greek Branch?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A Greek branch is a permanent establishment of a foreign company and is not a separate legal entity. It functions as an extension of the parent company, which retains full liability for the branch's obligations and activities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#EA3A70]">Business Capabilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Conduct business operations in Greece and throughout the EU</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Enter into contracts and business relationships under Greek law</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Own or lease property and assets locally</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Employ staff under Greek employment regulations</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Open Greek bank accounts for operational needs</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Register for VAT and fulfill tax obligations</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Obtain necessary licenses, permits, and registrations</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Bid on government contracts and public tenders</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-[#EA3A70]">Legal Considerations</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  The parent company remains fully liable for the obligations of the Greek branch. Registration requires filing notarized and apostilled documents such as the certificate of incorporation, memorandum and articles of association of the foreign company, and appointing a local representative in Greece.
                </p>
                <p>
                  The branch must be registered with the Greek General Commercial Registry (GEMI) within one month of establishment. All documents must be translated into Greek by a certified translator.
                </p>
                <p>
                  <strong>Taxation:</strong> The branch is taxed on profits generated in Greece at the corporate tax rate of 22%. The branch files separate tax returns for Greek business activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch vs Subsidiary Comparison */}
      <section className="py-16 px-4 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Branch vs Subsidiary Comparison</h2>
            <p className="text-xl text-gray-300">
              Choose the right structure for your Greek business expansion
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-[#0F0B1F] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#EA3A70] text-white">
                  <th className="px-6 py-4 text-left font-semibold">Aspect</th>
                  <th className="px-6 py-4 text-left font-semibold">Branch</th>
                  <th className="px-6 py-4 text-left font-semibold">Subsidiary</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">Legal Status</td>
                  <td className="px-6 py-4">Extension of foreign parent company</td>
                  <td className="px-6 py-4">Separate Greek legal entity (e.g., ΑΕ, ΕΠΕ)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">Liability</td>
                  <td className="px-6 py-4">Parent company fully liable</td>
                  <td className="px-6 py-4">Limited to the subsidiary's assets</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">Capital Requirements</td>
                  <td className="px-6 py-4">No minimum capital requirement</td>
                  <td className="px-6 py-4">Minimum share capital varies by entity type</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">Profit Taxation</td>
                  <td className="px-6 py-4">Taxed on Greek-sourced profits at 22%</td>
                  <td className="px-6 py-4">Taxed as separate entity on worldwide income</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 font-medium">Setup Complexity</td>
                  <td className="px-6 py-4">Registration with GEMI; notarized, apostilled documents</td>
                  <td className="px-6 py-4">Incorporation under Greek Companies Law; more complex setup</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Management</td>
                  <td className="px-6 py-4">Managed by appointed local representative</td>
                  <td className="px-6 py-4">Independent management with local directors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-300">
              No hidden fees, no surprises. Everything you need to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A2E] rounded-lg p-8 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Basic Setup</h3>
                <div className="text-4xl font-bold text-[#EA3A70] mb-2">€995</div>
                <p className="text-gray-400">One-time setup fee</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>GEMI registration</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Document translation</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Local representative appointment</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Tax registration</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg p-8 border-2 border-[#EA3A70] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#EA3A70] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Complete Package</h3>
                <div className="text-4xl font-bold text-[#EA3A70] mb-2">€1,495</div>
                <p className="text-gray-400">Everything you need</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Everything in Basic Setup</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Bank account opening assistance</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>VAT registration</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>First-year compliance support</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg p-8 border border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Service</h3>
                <div className="text-4xl font-bold text-[#EA3A70] mb-2">€2,495</div>
                <p className="text-gray-400">Full-service solution</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Everything in Complete Package</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span>Ongoing compliance management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Registration Timeline</h2>
            <p className="text-xl text-gray-300">
              Get your Greek branch up and running quickly
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#EA3A70] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Document Preparation</h3>
              <p className="text-gray-400">1-2 days</p>
              <p className="text-sm text-gray-500 mt-2">Gather and prepare all required documents</p>
            </div>

            <div className="text-center">
              <div className="bg-[#EA3A70] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Translation & Legalization</h3>
              <p className="text-gray-400">2-3 days</p>
              <p className="text-sm text-gray-500 mt-2">Certified translation and apostille</p>
            </div>

            <div className="text-center">
              <div className="bg-[#EA3A70] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">GEMI Registration</h3>
              <p className="text-gray-400">3-5 days</p>
              <p className="text-sm text-gray-500 mt-2">Official registration with Greek authorities</p>
            </div>

            <div className="text-center">
              <div className="bg-[#EA3A70] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tax Registration</h3>
              <p className="text-gray-400">1-2 days</p>
              <p className="text-sm text-gray-500 mt-2">VAT and tax number registration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ongoing Compliance</h2>
            <p className="text-xl text-gray-300">
              Stay compliant with Greek regulations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#EA3A70]">Annual Requirements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FileTextIcon className="h-6 w-6 text-[#EA3A70] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Financial Statements</h4>
                    <p className="text-gray-400 text-sm">Annual financial statements in Greek</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ShieldIcon className="h-6 w-6 text-[#EA3A70] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Tax Returns</h4>
                    <p className="text-gray-400 text-sm">Corporate income tax returns</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <UsersIcon className="h-6 w-6 text-[#EA3A70] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Employee Reporting</h4>
                    <p className="text-gray-400 text-sm">Social security and payroll reporting</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#EA3A70]">Our Support</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Compliance Monitoring</h4>
                    <p className="text-gray-400 text-sm">We track all deadlines and requirements</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Document Preparation</h4>
                    <p className="text-gray-400 text-sm">All forms and filings prepared for you</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Local Expertise</h4>
                    <p className="text-gray-400 text-sm">Greek legal and tax professionals</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about Greek branch registration
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long does it take to register a Greek branch?",
                answer: "The complete registration process typically takes 7-12 business days, including document preparation, translation, and official registration with GEMI."
              },
              {
                question: "What documents are required for registration?",
                answer: "You'll need the parent company's certificate of incorporation, articles of association, board resolution, and power of attorney for the local representative. All documents must be apostilled and translated into Greek."
              },
              {
                question: "Can I open a bank account for the branch?",
                answer: "Yes, once registered, you can open a Greek bank account. We provide assistance with the bank account opening process and required documentation."
              },
              {
                question: "What are the ongoing compliance requirements?",
                answer: "Greek branches must file annual financial statements, corporate tax returns, and maintain proper accounting records. We handle all compliance requirements for you."
              },
              {
                question: "Is there a minimum capital requirement?",
                answer: "No, there's no minimum capital requirement for establishing a Greek branch. The parent company's capital is considered sufficient."
              },
              {
                question: "Can the branch hire employees?",
                answer: "Yes, Greek branches can hire employees and must comply with Greek labor laws, including social security contributions and employment contracts."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#0F0B1F] rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1A1A2E] transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-[#EA3A70]" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-[#EA3A70]" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Expand to Greece?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your Greek branch registration today and access the EU market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/greek-branch" 
              className="bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
            >
              Get Started Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <a 
              href="https://calendly.com/your-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-[#EA3A70] text-[#EA3A70] hover:bg-[#EA3A70] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}















