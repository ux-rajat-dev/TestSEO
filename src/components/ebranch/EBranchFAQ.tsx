import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
export function EBranchFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [{
    question: 'What exactly is included in the eBranch package?',
    answer: 'eBranch is a comprehensive solution that includes Dutch company formation, registered business address, mail handling, bookkeeping, tax compliance (VAT and corporate tax), corporate secretary services, banking assistance, and access to our digital dashboard. Everything you need to establish and run your Dutch business is covered under one fixed monthly fee.'
  }, {
    question: 'How quickly can my Dutch company be operational?',
    answer: 'With eBranch, your Dutch BV can be operational within 48 hours. This is significantly faster than the traditional approach, which typically takes 4-6 weeks. Our digital-first approach and streamlined processes allow us to expedite the company formation while ensuring full compliance with Dutch regulations.'
  }, {
    question: 'Do I need to travel to the Netherlands to set up my company?',
    answer: 'No, our entire process can be completed remotely. We handle all local requirements, allowing you to establish and manage your Dutch company from anywhere in the world. All necessary meetings and document signings can be conducted online through our secure digital platform.'
  }, {
    question: 'How does the digital dashboard work?',
    answer: 'Our digital dashboard is a secure online platform that provides real-time access to all aspects of your Dutch business. You can view financial statements, tax filings, compliance deadlines, important documents, and communicate with your dedicated account manager. The dashboard is accessible 24/7 from any device with internet access.'
  }, {
    question: 'Are there any additional costs beyond the monthly fee?',
    answer: 'No, our monthly fee is all-inclusive. There are no hidden costs or surprise fees. The only exceptions would be extraordinary services not covered in your selected plan, which would be clearly communicated in advance. We believe in transparent pricing and predictable costs for your business.'
  }, {
    question: 'What kind of support is included with eBranch?',
    answer: "All eBranch packages include dedicated support from our team of Dutch business experts. Depending on your package, you'll have access to email support, phone support, or a dedicated account manager. Our team can assist with any questions or issues related to your Dutch business operations."
  }, {
    question: 'How do I open a Dutch business bank account?',
    answer: 'Opening a Dutch business bank account is included in our Professional and Enterprise packages. We handle the entire application process with our partner banks, prepare all necessary documentation, and guide you through any required verification steps. For Essential package clients, we can provide this service for an additional fee.'
  }, {
    question: 'What happens if I want to cancel my eBranch subscription?',
    answer: "You can cancel your eBranch subscription with 30 days' notice. We'll provide you with all your company documents and data, and assist with the transition to ensure continuity for your business. There are no cancellation penalties, and we offer prorated refunds for any unused portion of your paid subscription."
  }];
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return <section className="py-20 relative bg-[#1B1537]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about establishing and running your
            Dutch business with eBranch
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative rounded-xl overflow-hidden border border-[#2D2755] shadow-2xl">
            <img src="https://uploadthingy.s3.us-west-1.amazonaws.com/9EfnDwQL91wGs8fBLsPb5T/banners.png" alt="eBranch Community Platform" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B1F] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Join Our Community
              </h3>
              <p className="text-gray-300">
                Connect with other business owners who have expanded to the
                Netherlands using eBranch
              </p>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#2D2755] shadow-2xl">
            <img src="https://uploadthingy.s3.us-west-1.amazonaws.com/osQA9AYWibpfFAkrUjLCwg/profile.jpg" alt="eBranch Dashboard" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B1F] via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Powerful Dashboard
              </h3>
              <p className="text-gray-300">
                Manage your Dutch business operations from a single platform
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#1B1537]/80 backdrop-blur-sm rounded-xl border border-[#2D2755] overflow-hidden">
          <div className="divide-y divide-[#2D2755]">
            {faqs.map((faq, index) => <div key={index} className="overflow-hidden">
                <button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" onClick={() => toggleFAQ(index)}>
                  <h3 className="text-lg font-medium text-white">
                    {faq.question}
                  </h3>
                  <div className="ml-4">
                    {openIndex === index ? <ChevronUpIcon className="h-5 w-5 text-[#EA3A70]" /> : <ChevronDownIcon className="h-5 w-5 text-gray-400" />}
                  </div>
                </button>
                <div className={`px-6 pb-5 ${openIndex === index ? 'block' : 'hidden'}`}>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>)}
          </div>
        </div>
        <div className="mt-16 bg-[#1B1537]/80 backdrop-blur-sm rounded-xl p-8 border border-[#2D2755] shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-6">
                Our team of Dutch business experts is ready to help you with any
                questions you might have about establishing and operating your
                business in the Netherlands.
              </p>
              <button className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors flex items-center font-medium shadow-md shadow-[#EA3A70]/20">
                Schedule a Consultation
              </button>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-[#2D2755] shadow-xl">
                <img src="https://uploadthingy.s3.us-west-1.amazonaws.com/bFHsRc5susHAH33RfByqrU/Rocket_banner.png" alt="Launch your business" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#1B1537]/80 backdrop-blur-sm rounded-lg p-3 border border-[#2D2755] shadow-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-[#EA3A70]/20 mr-3">
                    <div className="h-3 w-3 rounded-full bg-[#EA3A70]"></div>
                  </div>
                  <p className="text-white text-sm">
                    Expert Advisors Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}