import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  GlobeIcon,
  MessageSquareIcon,
  PhoneIcon,
  BuildingIcon,
  ShieldCheckIcon,
  CheckIcon,
  MailIcon,
  CalendarIcon,
  PlusIcon,
  MinusIcon,
  FileIcon,
  EyeIcon,
  ClipboardIcon,
  BarChart3Icon,
  UserIcon,
  UsersIcon,
  InboxIcon,
  ArchiveIcon,
  BrainCircuitIcon,
  ScaleIcon,
  BookOpenIcon,
  EuroIcon,
  PercentIcon,
} from 'lucide-react'

export function SlovakBranchBrochure() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Compliance timeline
  const complianceTimeline = [
    {
      title: 'Quarterly VAT Returns',
      description:
        'File VAT returns every quarter with the Slovak tax authorities',
      frequency: 'Every 3 months',
      icon: <PercentIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Annual Corporate Income Tax Return',
      description: 'Prepare and submit your annual corporate income tax return',
      frequency: 'Annually',
      icon: <EuroIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Annual Financial Statement Filing',
      description:
        'File annual financial statements with the Slovak Trade Register',
      frequency: 'Annually',
      icon: <BarChart3Icon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: 'Annual UBO Registration Update',
      description:
        'Review and update Ultimate Beneficial Owner information if needed',
      frequency: 'Annually',
      icon: <UsersIcon className="h-6 w-6 text-blue-600" />,
    },
  ]

  // Branch vs Subsidiary comparison
  const comparisonPoints = [
    {
      aspect: 'Legal Status',
      branch: 'Extension of foreign parent; no separate legal entity',
      subsidiary: 'Separate Slovak legal entity (usually s.r.o.)',
      icon: <ScaleIcon className="h-5 w-5 text-blue-600" />,
    },
    {
      aspect: 'Liability',
      branch: 'Parent company fully liable for branch activities',
      subsidiary: 'Liability limited to subsidiary assets',
      icon: <ShieldCheckIcon className="h-5 w-5 text-blue-600" />,
    },
    {
      aspect: 'Capital Requirement',
      branch: 'No minimum capital required',
      subsidiary: 'Minimum share capital €5,000',
      icon: <EuroIcon className="h-5 w-5 text-blue-600" />,
    },
    {
      aspect: 'Profit Taxation',
      branch: 'Taxed on Slovak-sourced income at 21% corporate tax',
      subsidiary: 'Taxed as a separate legal entity on worldwide income',
      icon: <PercentIcon className="h-5 w-5 text-blue-600" />,
    },
    {
      aspect: 'Setup Complexity',
      branch: 'Faster registration with Trade Register',
      subsidiary: 'More complex incorporation and local compliance',
      icon: <ClipboardIcon className="h-5 w-5 text-blue-600" />,
    },
  ]

  // eBranch features
  const ebranchFeatures = [
    {
      title: 'Virtual Office Management',
      description:
        'All your physical mail digitized, analyzed, and presented in your portal with actionable items',
      icon: <InboxIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'AI-powered Archive',
      description:
        'Upload and manage all your branch documents with intelligent categorization and retrieval',
      icon: <ArchiveIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Compliance Automation',
      description:
        'Automatic reminders and guidance for all Slovak regulatory requirements',
      icon: <ShieldCheckIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'AI Memo Generator',
      description:
        'Get instant answers to your questions about Slovak business regulations and compliance',
      icon: <BrainCircuitIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Financial Dashboard',
      description:
        "Real-time overview of your branch's financial performance and tax obligations",
      icon: <BarChart3Icon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Priority Support',
      description:
        'Direct access to our team of Slovak business experts via dedicated Slack channel',
      icon: <PhoneIcon className="h-8 w-8 text-blue-600" />,
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: 'What is a Slovak branch company?',
      answer:
        'A Slovak branch (pobočka) is not a separate legal entity but an extension of your existing foreign company in Slovakia. It operates under the name and legal responsibility of the parent company but allows you to conduct business activities in Slovakia with full access to the EU market.',
    },
    {
      question:
        'What are the main advantages of a Slovak branch vs. a subsidiary?',
      answer:
        'The main advantages of a Slovak branch include: 1) No minimum capital requirements, 2) Simpler and less expensive setup process, 3) No dividend withholding tax on profit repatriation, 4) Possibility to offset initial losses against parent company profits, and 5) Less administrative burden compared to a subsidiary.',
    },
    {
      question: 'Do I need a local director for my Slovak branch?',
      answer:
        'No, a Slovak branch does not require a local Slovak director. Since a branch is not a separate legal entity but an extension of your foreign company, the management structure remains that of the parent company. However, you will need to appoint a local representative (branch manager) who must be a resident of the EU or hold a Slovak residency permit.',
    },
    {
      question: 'What activities can a Slovak branch perform?',
      answer:
        'A Slovak branch can perform all the same activities as a Slovak legal entity, but it cannot undertake activities outside the scope of the parent company\'s business. There are no legal restrictions on the business activities a branch can conduct compared to a subsidiary, as long as they align with the parent company\'s business scope.',
    },
    {
      question: 'Can a Slovak branch own property and enter into contracts?',
      answer:
        'Yes, a Slovak branch can own property, enter into contracts, and conduct all normal business operations. However, legally it is the foreign parent company that owns these assets and is party to these contracts, as the branch is not a separate legal entity.',
    },
    {
      question:
        'What are the tax implications of having a branch in Slovakia?',
      answer:
        "A Slovak branch is subject to corporate income tax on income generated in Slovakia at the corporate tax rate of 21%. Branches must maintain separate accounting and file tax returns in Slovakia. Unlike a subsidiary, a branch doesn't have separate legal personality, which means there's no dividend withholding tax on profit transfers to the parent company.",
    },
    {
      question: 'What ongoing compliance obligations will my branch have?',
      answer:
        'Your Slovak branch will need to comply with: 1) Annual financial statement filing with the Slovak Trade Register, 2) Corporate income tax returns, 3) VAT returns (typically quarterly), 4) Wage tax returns if you have employees, and 5) Various industry-specific regulatory requirements depending on your business activities.',
    },
    {
      question: 'How does the eBranch platform simplify branch management?',
      answer:
        'The eBranch platform streamlines branch management by: 1) Digitalizing all incoming mail through our virtual office service, 2) Providing AI-powered document management and data extraction, 3) Automating compliance reminders and form preparation, 4) Offering self-serve tools for tax filing and financial reporting, and 5) Giving you direct access to Slovak business experts via a dedicated Slack channel for any questions that arise.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0826] text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1E1B3F] to-[#0A0826]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#EA3A70]/20 text-[#EA3A70] px-4 py-1 rounded-full text-sm font-medium mb-4">
              COMPANY BROCHURE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Slovakia Branch Registration & Management
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expand your business to Slovakia with a flexible,
              cost-effective branch structure
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/slovak-branch"
                className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center"
              >
                Get Started Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://zcal.co/i/oqT-n0Aq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-900/50 text-white border border-indigo-500/30 rounded-lg font-bold text-lg hover:bg-indigo-800/50 transition-colors flex items-center justify-center"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* What is a Slovak Branch Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                What is a Slovak Branch?
              </h2>
              <p className="text-xl text-blue-100">
                Understanding the Slovak branch structure and how it works
              </p>
            </div>
            <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/30 mb-8">
              <h3 className="text-2xl font-bold mb-4">
                Definition & Legal Status
              </h3>
              <p className="text-blue-100 mb-6">
                A Slovak branch (pobočka) is a permanent establishment of a foreign company in Slovakia and is not a separate legal entity. It functions as an extension of the parent company, which remains fully liable for the branch's activities and obligations.
              </p>
              <h3 className="text-2xl font-bold mb-4">Business Capabilities</h3>
              <p className="text-blue-100 mb-6">
                A Slovak branch can perform all the same business activities as a Slovak legal entity, but it cannot undertake activities outside the scope of the parent company's business. Your branch can:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  'Conduct business operations in Slovakia and the EU markets',
                  'Enter into contracts and legal agreements under Slovak law',
                  'Own or lease assets and property',
                  'Employ staff under Slovak employment legislation',
                  'Open Slovak bank accounts',
                  'Register for VAT and corporate tax obligations',
                  'Obtain necessary licenses and permits depending on activity',
                  'Participate in government tenders and public contracts',
                ].map((capability, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{capability}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-4">Legal Considerations</h3>
              <p className="text-blue-100 mb-6">
                The branch must be registered with the Slovak Trade Register (Commercial Register). Registration documents include authenticated corporate documents of the parent company, a decision of the parent company to open the branch, designation of a local representative (branch manager), and proof of registered office in Slovakia. Documents must be notarized and officially translated into Slovak. The branch operates under the parent company's name and cannot undertake activities outside the scope of the parent company's business. The local representative must be a resident of the EU or hold a Slovak residency permit.
              </p>
              <h3 className="text-2xl font-bold mb-4">Taxation</h3>
              <p className="text-blue-100">
                Slovak branches are subject to corporate income tax on income generated in Slovakia at the corporate tax rate of 21%. Branches must maintain separate accounting and file tax returns in Slovakia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branch vs Subsidiary Comparison */}
      <section className="py-16 bg-[#0A0826]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Branch vs Subsidiary: Key Differences
              </h2>
              <p className="text-xl text-blue-100">
                Understanding your options for establishing a presence in Slovakia
              </p>
            </div>
            <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-500/30">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-900/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Aspect
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Slovak Branch
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        Slovak Subsidiary (s.r.o.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-500/30">
                    {comparisonPoints.map((point, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-indigo-900/20' : ''}
                      >
                        <td className="px-6 py-4 text-sm flex items-center">
                          {point.icon}
                          <span className="ml-2 font-medium text-white">
                            {point.aspect}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-100">
                          {point.branch}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-100">
                          {point.subsidiary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Slovak Branch Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E1B3F] to-[#0A0826]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Why Choose a Slovak Branch?
              </h2>
              <p className="text-xl text-blue-100">
                A cost-effective and flexible way to establish your presence in Slovakia
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                  Key Advantages
                </h3>
                <ul className="space-y-3">
                  {[
                    'No minimum capital requirements',
                    'Simplified setup process compared to a subsidiary',
                    'No dividend withholding tax on profit repatriation',
                    'Ability to offset initial losses against parent company profits',
                    'Reduced administrative burden',
                    'Full access to the EU single market',
                    'Benefit from Slovakia\'s competitive 21% corporate tax rate',
                    'Access to Slovakia\'s skilled and multilingual workforce',
                    'Strategic gateway to Central and Eastern European markets',
                    'Access to Slovakia\'s growing automotive and tech ecosystem',
                  ].map((advantage, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-100">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                  Ideal For
                </h3>
                <ul className="space-y-3">
                  {[
                    'Companies expanding to Central and Eastern Europe',
                    'Service providers testing the Slovak market before full commitment',
                    'Companies seeking competitive tax rates in the EU',
                    'Businesses wanting to establish EU presence with minimal setup costs',
                    'Organizations needing a legal presence without incorporating a separate entity',
                    'Companies with existing operations looking to centralize European activities',
                    "Startups seeking to leverage Slovakia's business-friendly environment",
                    'Companies targeting the Central and Eastern European markets',
                    'Automotive and manufacturing businesses',
                    'Organizations requiring access to Slovakia\'s skilled workforce',
                  ].map((ideal, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-100">{ideal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Timeline - Summarized */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Registration Process Overview
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                The Slovak branch registration process typically takes 5-7 weeks
                from start to finish
              </p>
              <Link
                to="/slovak-branch"
                className="inline-flex items-center text-[#EA3A70] hover:text-[#EA3A70]/80 transition-colors"
              >
                View detailed registration timeline in our proposal{' '}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
                <div className="p-3 bg-indigo-900/50 rounded-lg w-fit mb-4">
                  <ClipboardIcon className="h-8 w-8 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Preparation Phase</h3>
                <p className="text-blue-200 mb-3">
                  Initial consultation, document collection, and translation preparation
                </p>
                <div className="text-[#EA3A70] font-semibold">Weeks 1-2</div>
              </div>
              <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
                <div className="p-3 bg-indigo-900/50 rounded-lg w-fit mb-4">
                  <FileTextIcon className="h-8 w-8 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Documentation Phase</h3>
                <p className="text-blue-200 mb-3">
                  Document notarization, translation, and Slovak Trade Register registration
                </p>
                <div className="text-[#EA3A70] font-semibold">Weeks 3-5</div>
              </div>
              <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30">
                <div className="p-3 bg-indigo-900/50 rounded-lg w-fit mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Completion Phase</h3>
                <p className="text-blue-200 mb-3">
                  Registration finalization and receipt of official numbers
                </p>
                <div className="text-[#EA3A70] font-semibold">Weeks 6-7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our eBranch Plan Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E1B3F] to-[#0A0826]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Our eBranch Plan
              </h2>
              <p className="text-xl text-blue-100">
                A comprehensive solution for Slovak branch registration and
                management
              </p>
            </div>
            <div className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-indigo-500/30">
              <div className="bg-gradient-to-r from-[#1E1B3F] to-[#0A0826] p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">eBranch Plan</h3>
                <div className="text-4xl font-bold mb-1">
                  €2,095<span className="text-lg font-normal">/year</span>
                </div>
                <p className="text-blue-200">Excludes VAT</p>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-blue-100 mb-6">
                  Our eBranch Plan includes everything you need to establish and
                  manage your Slovak branch, including registration services,
                  compliance tools, and ongoing support.
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/slovak-branch"
                    className="px-6 py-3 bg-indigo-900/50 text-white border border-indigo-500/30 rounded-lg font-bold text-lg hover:bg-indigo-800/50 transition-colors inline-flex items-center"
                  >
                    View Full Plan Details{' '}
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="text-center mt-8">
                  <Link
                    to="/slovak-branch"
                    className="px-8 py-4 bg-[#EA3A70] text-white rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors inline-flex items-center w-full justify-center"
                  >
                    Check Quotation <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Ongoing Compliance Timeline
              </h2>
              <p className="text-xl text-blue-100">
                Key compliance requirements for your Slovak branch after
                formation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceTimeline.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-indigo-900/50 rounded-lg mr-3">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <div className="text-[#EA3A70] font-medium">
                        {item.frequency}
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-200">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
              <p className="text-sm text-blue-200">
                <strong className="text-white">Note:</strong> Our eBranch
                platform provides automated reminders and self-serve tools to
                help you meet all these compliance requirements efficiently and
                accurately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* eBranch Features Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E1B3F] to-[#0A0826]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                eBranch Platform Features
              </h2>
              <p className="text-xl text-blue-100">
                Simplifying Slovak branch management with cutting-edge technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ebranchFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30 hover:border-[#EA3A70]/50 transition-all"
                >
                  <div className="p-3 bg-indigo-900/50 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-blue-100">
                Common questions about Slovak branch registration and management
              </p>
            </div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1E1B3F]/70 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-indigo-500/30"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-medium focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-white">{item.question}</span>
                    {openFaq === index ? (
                      <MinusIcon className="h-5 w-5 text-[#EA3A70]" />
                    ) : (
                      <PlusIcon className="h-5 w-5 text-[#EA3A70]" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-blue-200">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E1B3F] to-[#0A0826]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Establish Your Slovak Branch?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get started with our comprehensive Slovak branch registration and
              management solution
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/slovak-branch"
                className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg font-bold text-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center"
              >
                Check your Quotation
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://zcal.co/i/oqT-n0Aq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-900/50 text-white border border-indigo-500/30 rounded-lg font-bold text-lg hover:bg-indigo-800/50 transition-colors flex items-center justify-center"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <div className="bg-green-500 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <svg
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>
              Have questions? Chat directly with our Slovak business experts on
              WhatsApp:{' '}
            </span>
            <a
              href="https://wa.me/31638515956"
              className="ml-2 font-bold underline"
            >
              +31 6 38 51 59 56
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

















