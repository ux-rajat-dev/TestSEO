import React, { useState } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  timeline: string;
  included: boolean;
}

interface ServiceDetailsProps {
  services: Record<string, Service>;
  countryName: string;
}

export function ServiceDetails({ services, countryName }: ServiceDetailsProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          What's Included
        </h2>
        <p className="text-gray-400">
          Comprehensive services for your {countryName} branch registration
        </p>
      </div>

      {Object.entries(services).map(([key, service]) => (
        <div
          key={key}
          className="bg-[#0F0B1F] rounded-lg border border-[#2D2755] overflow-hidden transition-all hover:border-[#EA3A70]/50"
        >
          <button
            onClick={() => toggleService(key)}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="bg-[#EA3A70]/10 p-3 rounded-lg">
                {service.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-xl font-bold text-white">
                    {service.name}
                  </h3>
                  {service.included && (
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium">
                      Included
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">
                  {service.shortDescription}
                </p>
              </div>
            </div>
            <div className="ml-4">
              {expandedService === key ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </button>

          {expandedService === key && (
            <div className="px-6 pb-6 border-t border-[#2D2755] pt-4">
              <p className="text-gray-300 mb-6">{service.fullDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-300 text-sm"
                      >
                        <CheckIcon className="h-4 w-4 text-[#EA3A70] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Process</h4>
                  <ul className="space-y-2">
                    {service.process.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-300 text-sm"
                      >
                        <span className="bg-[#EA3A70]/20 text-[#EA3A70] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2D2755]">
                <div className="flex items-center text-gray-400 text-sm">
                  <span className="font-medium mr-2">Timeline:</span>
                  <span>{service.timeline}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}











