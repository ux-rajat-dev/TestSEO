// Country-specific data for branch registration pages
export interface CountryBranchData {
  name: string;
  registrationAuthority: string;
  registrationFee: string;
  processingTime: string;
  notaryRequired: boolean;
  capitalRequirement: string;
  documents: {
    title: string;
    description: string;
  }[];
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  advantage: {
    title: string;
    description: string;
  };
}

export const countryBranchData: Record<string, CountryBranchData> = {
  netherlands: {
    name: 'Netherlands',
    registrationAuthority: 'KVK (Chamber of Commerce)',
    registrationFee: '€80 KVK registration fee',
    processingTime: '48 hours',
    notaryRequired: false,
    capitalRequirement: 'None',
    documents: [
      {
        title: 'KVK Extract',
        description: 'Official Dutch Chamber of Commerce registration confirmation'
      },
      {
        title: 'Tax Registration',
        description: 'Official Dutch tax office registration documentation'
      },
      {
        title: 'VAT Registration',
        description: 'EU VAT number confirmation letter'
      },
      {
        title: 'Verified Proof of Address',
        description: 'Official verification of business location'
      }
    ],
    benefits: [
      {
        icon: 'BuildingIcon',
        title: 'Official Registration',
        description: 'Complete KVK (Chamber of Commerce) registration with all required documentation'
      },
      {
        icon: 'FileTextIcon',
        title: 'Legal Documentation',
        description: 'Dutch commercial register extract and official documentation'
      },
      {
        icon: 'GlobeIcon',
        title: 'EU VAT Number',
        description: 'Dutch tax number and EU VAT registration'
      },
      {
        icon: 'MapPinIcon',
        title: 'Legal Address',
        description: '3 months of official business address service included'
      },
      {
        icon: 'UsersIcon',
        title: 'Account Manager',
        description: 'AI + Community support throughout the registration process'
      },
      {
        icon: 'ClockIcon',
        title: '48-Hour Processing',
        description: 'Expedited service to get your branch operational quickly'
      }
    ],
    advantage: {
      title: 'Netherlands Advantage',
      description: 'The Netherlands offers one of the most efficient and straightforward branch registration processes in the EU, with no notary requirements and a fully digital registration system. Our Dutch branch registration service leverages this efficiency to get your business operational quickly and with minimal bureaucracy.'
    }
  },
  belgium: {
    name: 'Belgium',
    registrationAuthority: 'CBE (Crossroads Bank for Enterprises)',
    registrationFee: '€100 CBE registration fee',
    processingTime: '5-7 business days',
    notaryRequired: false,
    capitalRequirement: 'None',
    documents: [
      {
        title: 'CBE Extract',
        description: 'Official Belgian Crossroads Bank registration confirmation'
      },
      {
        title: 'Tax Registration',
        description: 'Official Belgian tax office registration documentation'
      },
      {
        title: 'VAT Registration',
        description: 'EU VAT number confirmation letter'
      },
      {
        title: 'Verified Proof of Address',
        description: 'Official verification of business location'
      }
    ],
    benefits: [
      {
        icon: 'BuildingIcon',
        title: 'Official Registration',
        description: 'Complete CBE registration with all required documentation'
      },
      {
        icon: 'FileTextIcon',
        title: 'Legal Documentation',
        description: 'Belgian commercial register extract and official documentation'
      },
      {
        icon: 'GlobeIcon',
        title: 'EU VAT Number',
        description: 'Belgian tax number and EU VAT registration'
      },
      {
        icon: 'MapPinIcon',
        title: 'Legal Address',
        description: '3 months of official business address service included'
      },
      {
        icon: 'UsersIcon',
        title: 'Account Manager',
        description: 'AI + Community support throughout the registration process'
      },
      {
        icon: 'ClockIcon',
        title: 'Fast Processing',
        description: 'Expedited service to get your branch operational quickly'
      }
    ],
    advantage: {
      title: 'Belgium Advantage',
      description: 'Belgium offers excellent connectivity to major European markets and a multilingual business environment. Our Belgian branch registration service provides streamlined access to the EU market with comprehensive support throughout the process.'
    }
  },
  // Add default template for other countries
};

// Default data for countries not specifically configured
export const getDefaultCountryData = (countryKey: string, countryName: string): CountryBranchData => {
  return {
    name: countryName,
    registrationAuthority: 'Local Business Registry',
    registrationFee: '€100 registration fee',
    processingTime: '7-10 business days',
    notaryRequired: false,
    capitalRequirement: 'None',
    documents: [
      {
        title: 'Business Registry Extract',
        description: `Official ${countryName} business registry registration confirmation`
      },
      {
        title: 'Tax Registration',
        description: `Official ${countryName} tax office registration documentation`
      },
      {
        title: 'VAT Registration',
        description: 'EU VAT number confirmation letter'
      },
      {
        title: 'Verified Proof of Address',
        description: 'Official verification of business location'
      }
    ],
    benefits: [
      {
        icon: 'BuildingIcon',
        title: 'Official Registration',
        description: `Complete ${countryName} business registry registration with all required documentation`
      },
      {
        icon: 'FileTextIcon',
        title: 'Legal Documentation',
        description: `${countryName} commercial register extract and official documentation`
      },
      {
        icon: 'GlobeIcon',
        title: 'EU VAT Number',
        description: `${countryName} tax number and EU VAT registration`
      },
      {
        icon: 'MapPinIcon',
        title: 'Legal Address',
        description: '3 months of official business address service included'
      },
      {
        icon: 'UsersIcon',
        title: 'Account Manager',
        description: 'AI + Community support throughout the registration process'
      },
      {
        icon: 'ClockIcon',
        title: 'Fast Processing',
        description: 'Expedited service to get your branch operational quickly'
      }
    ],
    advantage: {
      title: `${countryName} Advantage`,
      description: `${countryName} offers excellent access to the European single market. Our ${countryName} branch registration service provides streamlined access to the EU market with comprehensive support throughout the process.`
    }
  };
};















