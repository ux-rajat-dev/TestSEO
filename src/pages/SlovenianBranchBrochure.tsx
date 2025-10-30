import React from 'react'

export function SlovenianBranchBrochure() {
  return (
    <div className="min-h-screen bg-[#0F0B1F] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            Slovenia Branch Registration & Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Expand your business to Slovenia with a flexible, cost-effective branch structure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-white to-blue-600 hover:from-gray-200 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Get Started Now →
            </button>
            <button className="border border-gray-300 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* What is a Slovenian Branch? */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">What is a Slovenian Branch?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-lg">
              <p className="text-lg mb-6">
                A Slovenian branch is a permanent establishment of a foreign company and is not a separate legal entity. 
                It functions as an extension of the parent company, which retains full liability for the branch's obligations and activities.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Business Capabilities:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Conduct business operations in Slovenia and throughout the EU
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Enter into contracts and business relationships under Slovenian law
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Own or lease property and assets within Slovenia
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Employ staff under Slovenian employment legislation
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
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Legal Considerations:</h3>
              <p className="text-gray-300 mb-4">
                The parent company remains fully liable for the obligations of the Slovenian branch. Registration requires 
                filing notarized and apostilled documents such as the certificate of incorporation, memorandum and articles 
                of association of the foreign company, and appointing a local representative in Slovenia.
              </p>
              <p className="text-gray-300 mb-4">
                The branch must be registered with the Slovenian Business Register within one month of establishment. 
                All documents must be translated into Slovenian or English.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Taxation:</h3>
              <p className="text-gray-300">
                The branch is taxed on income generated in Slovenia at the corporate tax rate of 19%. 
                Slovenia offers various tax incentives for certain business activities and has a well-developed tax system.
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
                  <td className="px-6 py-4 text-gray-300">Separate Slovenian legal entity (d.o.o.)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Liability</td>
                  <td className="px-6 py-4 text-gray-300">Parent company fully liable</td>
                  <td className="px-6 py-4 text-gray-300">Limited to the subsidiary's assets</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Capital Requirements</td>
                  <td className="px-6 py-4 text-gray-300">No minimum capital requirement</td>
                  <td className="px-6 py-4 text-gray-300">Minimum share capital of €7,500 for d.o.o.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Profit Taxation</td>
                  <td className="px-6 py-4 text-gray-300">Taxed on Slovenian-sourced income at 19%</td>
                  <td className="px-6 py-4 text-gray-300">Taxed as separate entity on worldwide income</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Setup Complexity</td>
                  <td className="px-6 py-4 text-gray-300">Moderate; registration with Business Register</td>
                  <td className="px-6 py-4 text-gray-300">More complex; incorporation process required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose Slovenia */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Slovenia for Your Branch?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/20 to-blue-500/20 p-6 rounded-lg border border-white/30">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Central European Hub</h3>
              <p className="text-gray-300">
                Slovenia serves as a strategic gateway between Western and Eastern Europe with excellent infrastructure and connectivity.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-6 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-semibold mb-4 text-green-400">EU Access</h3>
              <p className="text-gray-300">
                Full access to the EU single market with simplified cross-border trade and services.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Skilled Workforce</h3>
              <p className="text-gray-300">
                Slovenia has a highly educated workforce with strong technical and language skills, particularly in English and German.
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
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Document Preparation</h3>
              <p className="text-gray-300 text-sm">Prepare and notarize parent company documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Translation & Legalization</h3>
              <p className="text-gray-300 text-sm">Translate documents to Slovenian/English and apostille</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Register</h3>
              <p className="text-gray-300 text-sm">Register with Slovenian Business Register</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <div className="bg-gradient-to-r from-white/20 to-blue-500/20 p-8 rounded-lg border border-white/30">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">What's Included:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Complete branch registration with Business Register
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
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Pricing:</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">€1,300</div>
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
              <h3 className="text-xl font-semibold mb-3 text-blue-400">How long does Slovenian branch registration take?</h3>
              <p className="text-gray-300">
                The registration process typically takes 2-3 weeks, including document preparation, translation, and Business Register filing.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Do I need a local representative in Slovenia?</h3>
              <p className="text-gray-300">
                Yes, you must appoint a local representative who is a resident of Slovenia or the EU to handle branch operations and compliance.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">What are the ongoing compliance requirements?</h3>
              <p className="text-gray-300">
                The branch must file annual reports, maintain accounting records, and comply with Slovenian tax obligations including VAT registration if applicable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

