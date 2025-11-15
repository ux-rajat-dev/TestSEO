import React from 'react'

export function LithuanianBranchBrochure() {
  return (
    <div className="min-h-screen bg-[#0F0B1F] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
            Lithuania Branch Registration & Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Expand your business to Lithuania with a flexible, cost-effective branch structure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-500 to-green-600 hover:from-yellow-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Get Started Now →
            </button>
            <a
              href="https://calendly.com/dennis-houseofcompanies/new-meeting?month=2025-06"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-block text-center"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* What is a Lithuanian Branch? */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">What is a Lithuanian Branch?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-lg">
              <p className="text-lg mb-6">
                A Lithuanian branch is a permanent establishment of a foreign company and is not a separate legal entity. 
                It functions as an extension of the parent company, which retains full liability for the branch's obligations and activities.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Business Capabilities:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Conduct business operations in Lithuania and throughout the EU
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Enter into contracts and business relationships under Lithuanian law
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Own or lease property and assets within Lithuania
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Employ staff under Lithuanian employment legislation
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Open local bank accounts for operational needs
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Register for VAT and fulfill tax obligations
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Obtain necessary licenses, permits, and registrations
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Bid on government contracts and public tenders
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Legal Considerations:</h3>
              <p className="text-gray-300 mb-4">
                The parent company remains fully liable for the obligations of the Lithuanian branch. Registration requires 
                filing notarized and apostilled documents such as the certificate of incorporation, memorandum and articles 
                of association of the foreign company, and appointing a local representative in Lithuania.
              </p>
              <p className="text-gray-300 mb-4">
                The branch must be registered with the Lithuanian Register of Legal Entities within one month of establishment. 
                All documents must be translated into Lithuanian or English.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Taxation:</h3>
              <p className="text-gray-300">
                The branch is taxed on income generated in Lithuania at the corporate tax rate of 15%. 
                Lithuania offers one of the lowest corporate tax rates in the EU and has various tax incentives for certain business activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branch vs Subsidiary Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Branch vs Subsidiary Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800/50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-4 text-left text-lg font-semibold">Aspect</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Branch</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Subsidiary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 font-medium">Legal Status</td>
                  <td className="px-6 py-4 text-gray-300">Extension of the foreign parent company</td>
                  <td className="px-6 py-4 text-gray-300">Separate Lithuanian legal entity (UAB)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Liability</td>
                  <td className="px-6 py-4 text-gray-300">Parent company fully liable</td>
                  <td className="px-6 py-4 text-gray-300">Limited to the subsidiary's assets</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Capital Requirements</td>
                  <td className="px-6 py-4 text-gray-300">No minimum capital requirement</td>
                  <td className="px-6 py-4 text-gray-300">Minimum share capital of €2,500 for UAB</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Profit Taxation</td>
                  <td className="px-6 py-4 text-gray-300">Taxed on Lithuanian-sourced income at 15%</td>
                  <td className="px-6 py-4 text-gray-300">Taxed as separate entity on worldwide income</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Setup Complexity</td>
                  <td className="px-6 py-4 text-gray-300">Moderate; registration with Register of Legal Entities</td>
                  <td className="px-6 py-4 text-gray-300">More complex; incorporation process required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose Lithuania */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Lithuania for Your Branch?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-500/20 to-green-500/20 p-6 rounded-lg border border-yellow-500/30">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Lowest EU Tax Rate</h3>
              <p className="text-gray-300">
                Lithuania offers one of the lowest corporate tax rates in the EU at just 15%, making it highly attractive for businesses.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-semibold mb-4 text-green-400">EU Access</h3>
              <p className="text-gray-300">
                Full access to the EU single market with simplified cross-border trade and services.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Growing Tech Hub</h3>
              <p className="text-gray-300">
                Lithuania is becoming a major tech hub in the Baltic region with a skilled workforce and modern infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Registration Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Document Preparation</h3>
              <p className="text-gray-300 text-sm">Prepare and notarize parent company documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Translation & Legalization</h3>
              <p className="text-gray-300 text-sm">Translate documents to Lithuanian/English and apostille</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Register of Legal Entities</h3>
              <p className="text-gray-300 text-sm">Register with Lithuanian Register of Legal Entities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tax Registration</h3>
              <p className="text-gray-300 text-sm">Register for VAT and corporate tax</p>
            </div>
          </div>
        </div>
      </section>

      {/* eBranch Plan */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">eBranch Plan</h2>
          <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 p-8 rounded-lg border border-yellow-500/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-yellow-400">What's Included:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Complete branch registration with Register of Legal Entities
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Document preparation and translation services
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Local representative appointment
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Tax registration and compliance setup
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Bank account opening assistance
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Pricing:</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2">€1,000</div>
                <p className="text-gray-300 mb-4">One-time setup fee</p>
                <div className="text-lg font-semibold text-green-400">Timeline: 2-3 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">How long does Lithuanian branch registration take?</h3>
              <p className="text-gray-300">
                The registration process typically takes 2-3 weeks, including document preparation, translation, and Register of Legal Entities filing.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">Do I need a local representative in Lithuania?</h3>
              <p className="text-gray-300">
                Yes, you must appoint a local representative who is a resident of Lithuania or the EU to handle branch operations and compliance.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">What are the ongoing compliance requirements?</h3>
              <p className="text-gray-300">
                The branch must file annual reports, maintain accounting records, and comply with Lithuanian tax obligations including VAT registration if applicable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

