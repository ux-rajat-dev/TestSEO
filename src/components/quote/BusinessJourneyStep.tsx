import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, BuildingIcon, PlusIcon, LayersIcon } from 'lucide-react';
import { QuoteUserData } from '../../pages/QuotePage';

interface BusinessJourneyStepProps {
  nextStep: () => void;
  prevStep: () => void;
  updateUserData: (data: Partial<QuoteUserData>) => void;
  userData: QuoteUserData;
  primaryFocus?: string;
}

export const BusinessJourneyStep: React.FC<BusinessJourneyStepProps> = ({
  nextStep,
  updateUserData,
  primaryFocus = 'branch-registration'
}) => {
  const handleSelection = (option: string) => {
    updateUserData({
      businessJourney: option
    });
    nextStep();
  };

  // Context-specific journey options based on primaryFocus
  const getJourneyOptions = () => {
    if (primaryFocus === 'accounting' || primaryFocus === 'ai-bookkeeping') {
      return [
        {
          id: 'new-accounting',
          title: 'New to Accounting Software',
          description: 'Looking to set up accounting for the first time',
          icon: <LightbulbIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-amber-500'
        },
        {
          id: 'existing-accounting',
          title: 'Current Accounting System',
          description: 'Using accounting software but need better solution',
          icon: <BuildingIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-blue-500'
        },
        {
          id: 'manual-processes',
          title: 'Manual Processes',
          description: 'Currently using spreadsheets or manual bookkeeping',
          icon: <PlusIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-emerald-500'
        },
        {
          id: 'multiple-entities',
          title: 'Multiple Entities',
          description: 'Managing accounting for multiple companies',
          icon: <LayersIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-purple-500'
        }
      ];
    }
    
    if (primaryFocus === 'tax-registration' || primaryFocus === 'vat-filing' || primaryFocus === 'cit-filing') {
      return [
        {
          id: 'new-registration',
          title: 'New Tax Registration',
          description: 'Need to register for taxes for the first time',
          icon: <LightbulbIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-amber-500'
        },
        {
          id: 'existing-company',
          title: 'Existing Company',
          description: 'Already have a company, need tax setup',
          icon: <BuildingIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-blue-500'
        },
        {
          id: 'expanding',
          title: 'Expanding Operations',
          description: 'Expanding to new markets requiring tax registration',
          icon: <PlusIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-emerald-500'
        },
        {
          id: 'compliance',
          title: 'Compliance Needs',
          description: 'Need help maintaining tax compliance',
          icon: <LayersIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-purple-500'
        }
      ];
    }
    
    if (primaryFocus === 'virtual-office') {
      return [
        {
          id: 'new-address',
          title: 'Need Business Address',
          description: 'Looking for a professional business address',
          icon: <LightbulbIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-amber-500'
        },
        {
          id: 'existing-company',
          title: 'Existing Company',
          description: 'Have a company, need virtual office services',
          icon: <BuildingIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-blue-500'
        },
        {
          id: 'remote-work',
          title: 'Remote Operations',
          description: 'Fully remote team, need virtual presence',
          icon: <PlusIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-emerald-500'
        },
        {
          id: 'multiple-locations',
          title: 'Multiple Locations',
          description: 'Need virtual offices in multiple countries',
          icon: <LayersIcon className="h-5 w-5 text-white" />,
          bgColor: 'bg-purple-500'
        }
      ];
    }

    // Default options for branch-registration or no primaryFocus
    return [
    {
      id: 'exploring',
      title: 'Exploring Ideas',
      description: 'Just getting started with business concepts',
      icon: <LightbulbIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-amber-500'
    },
    {
      id: 'existing',
      title: 'Existing Company',
      description: 'Running a business and looking to expand',
      icon: <BuildingIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-blue-500'
    },
    {
      id: 'new-entity',
      title: 'Need New Entity',
      description: 'Want to set up a new business structure',
      icon: <PlusIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-emerald-500'
    },
    {
      id: 'multiple',
      title: 'Managing Multiple',
      description: 'Operating several business entities',
      icon: <LayersIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    }
  ];
  };

  const journeyOptions = getJourneyOptions();

  const getTitle = () => {
    if (primaryFocus === 'accounting' || primaryFocus === 'ai-bookkeeping') {
      return "What's your accounting situation?";
    }
    if (primaryFocus === 'tax-registration' || primaryFocus === 'vat-filing' || primaryFocus === 'cit-filing') {
      return "What's your tax situation?";
    }
    if (primaryFocus === 'virtual-office') {
      return "What's your virtual office need?";
    }
    return "What's your business journey?";
  };

  const getDescription = () => {
    if (primaryFocus === 'accounting' || primaryFocus === 'ai-bookkeeping') {
      return "Help us understand your current accounting setup";
    }
    if (primaryFocus === 'tax-registration' || primaryFocus === 'vat-filing' || primaryFocus === 'cit-filing') {
      return "Help us understand your tax registration needs";
    }
    if (primaryFocus === 'virtual-office') {
      return "Help us understand your virtual office requirements";
    }
    return "Help us understand where you are in your business journey";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{getTitle()}</h2>
        <p className="text-gray-300">{getDescription()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journeyOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl flex items-start transition-all duration-200 hover:shadow-lg hover:scale-105"
            onClick={() => handleSelection(option.title)}
          >
            <div className={`${option.bgColor} p-3 rounded-lg mr-4 flex-shrink-0`}>
              {option.icon}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
