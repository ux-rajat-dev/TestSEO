import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { CountrySelector } from '../../components/services/CountrySelector';
import { ArrowRightIcon, BuildingIcon, CheckIcon, ChevronDownIcon, ClockIcon, CoinsIcon, FileTextIcon, GlobeIcon, InfoIcon, LayoutGridIcon, LightbulbIcon, MapPinIcon, ScaleIcon, ShieldIcon, TimerIcon, TrendingUpIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon, LayoutDashboardIcon, MonitorIcon, CloudIcon, ShieldCheckIcon, RocketIcon, ZapIcon, BarChartIcon, StarIcon, BriefcaseIcon, UploadIcon, DownloadIcon, MessageCircleIcon, ChevronUpIcon, UsersIcon, PlusIcon, CalendarIcon, AlertCircleIcon, BellIcon, UserIcon } from 'lucide-react';
import { SimpleImage } from '../../components/common/SimpleImage';
// Country-specific data
const COUNTRY_DATA = {
  netherlands: {
    name: 'Netherlands',
    flag: '🇳🇱',
    color: '#EA3A70',
    processingTime: '3-5 business days',
    complexity: 'Low',
    capitalRequirement: '€0.01',
    registrationFee: '€395',
    mainEntityType: 'BV (Private Limited Company)',
    secondaryEntityType: 'Branch Office',
    benefits: ['Fast registration process (3-5 days)', 'Minimal capital requirement (€0.01)', 'Extensive tax treaty network', 'Innovation-friendly business climate'],
    statistics: {
      easeOfBusiness: '#4 in EU',
      corporateTax: '25.8%',
      foreignCompanies: '15,000+',
      processingDays: '4'
    },
    entityStructures: [{
      name: 'BV (Private Limited Company)',
      description: 'Limited liability company with shares',
      capitalRequirement: '€0.01',
      timeline: '3-5 days',
      liability: 'Limited to share capital',
      suitableFor: 'Most business activities'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign company',
      capitalRequirement: 'None',
      timeline: '2-4 days',
      liability: 'Parent company fully liable',
      suitableFor: 'Testing the market before full entry'
    }],
    requirements: ['Valid passport/ID for all directors', 'Proof of address for directors', 'Articles of association', 'Parent company documents (for branch)'],
    registrationSteps: ['Digital onboarding and KYC verification', 'Document submission', 'Digital notarization', 'KVK (Chamber of Commerce) registration', 'Tax registration']
  },
  germany: {
    name: 'Germany',
    flag: '🇩🇪',
    color: '#003E6B',
    processingTime: '10-20 business days (can be 2-3 weeks with complete documents)',
    complexity: 'Moderate',
    capitalRequirement: '€1 (UG/mini-GmbH), €25,000 (standard GmbH), €50,000 (AG)',
    registrationFee: '€500-€2,000 (variable, plus notary and legal support if required)',
    mainEntityType: 'GmbH (Private Limited Company)',
    secondaryEntityType: 'UG (Entrepreneurial Company), AG (Public Company), Branch Office',
    benefits: [
      '100% foreign ownership permitted',
      'Strong legal protection and transparent processes',
      'Access to EU single market and advanced infrastructure',
      'Innovation and R&D incentives available',
      'Extensive network of tax treaties',
      'Skilled workforce, strategic location'
    ],
    statistics: {
      easeOfBusiness: '#5 in EU (varies by source)',
      corporateTax: '15% (plus 5.5% solidarity surcharge); trade tax 7-17%',
      foreignCompanies: '20,000+',
      processingDays: '14'
    },
    entityStructures: [{
      name: 'GmbH (Private Limited Company)',
      description: 'Most popular limited liability company for German and foreign founders',
      capitalRequirement: '€25,000 (at least €12,500 paid at incorporation)',
      timeline: '10-20 days',
      liability: 'Limited to share capital',
      suitableFor: 'Most businesses, startups, tech, services'
    }, {
      name: 'UG (Unternehmergesellschaft/Mini-GmbH)',
      description: 'Limited liability, minimum capital, designed for startups',
      capitalRequirement: '€1 or more',
      timeline: '10-20 days',
      liability: 'Limited to share capital',
      suitableFor: 'Startups and founders with low initial funding'
    }, {
      name: 'AG (Aktiengesellschaft/Public Company)',
      description: 'Public limited company, suitable for larger businesses seeking capital markets',
      capitalRequirement: '€50,000',
      timeline: '20-30 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Extension of a foreign company, no separate legal identity',
      capitalRequirement: 'None specifically',
      timeline: '10-20 days',
      liability: 'Parent company fully liable',
      suitableFor: 'Testing German market'
    }],
    requirements: [
      'Valid passport/ID for directors and shareholders',
      'Proof of address for directors',
      'Drafted Articles of Association (in German)',
      'Confirmation of share capital deposit',
      'Registered office address in Germany',
      'Parent company documents (for branch)',
      'Notarized documents (onsite or remote for some setups)'
    ],
    registrationSteps: [
      'Select business structure and reserve name',
      'Prepare Articles of Association (in German)',
      'Notarize documents before a German notary',
      'Open a German bank account and deposit share capital',
      'Obtain capital confirmation from bank',
      'Register in Commercial Register (Handelsregister)',
      'Register at Trade Office (Gewerbeamt)',
      'Register for tax (tax number, VAT registration)',
      'Register with social security if hiring employees',
      'Receive company certificate and extracts'
    ]
  },
  france: {
    name: 'France',
    flag: '🇫🇷',
    color: '#1B3A68',
    processingTime: '1-4 weeks (standard: 2 weeks for SARL/SAS)',
    complexity: 'Moderate',
    capitalRequirement: '€1 (SARL/SAS), €37,000 (SA, with 1/5th at registration)',
    registrationFee: '€65-€250 (Trade Register), legal support/services extra (typically €800-€1,000+)',
    mainEntityType: 'SARL (Private Limited Company), SAS (Simplified Joint Stock Company), SA (Public Limited Company)',
    secondaryEntityType: 'Branch Office, Representative Office',
    benefits: [
      'Incorporation possible within 2 weeks',
      'Minimum capital requirement as low as €1 (SARL/SAS)',
      '100% foreign ownership permitted',
      'Extensive tax treaties and incentives (R&D, startups)',
      'No residency requirement for directors/shareholders',
      'Large skilled labor pool and strategic EU location'
    ],
    statistics: {
      easeOfBusiness: 'Top 10 in EU (varies by source)',
      corporateTax: '25%',
      foreignCompanies: '13,000+',
      processingDays: '12'
    },
    entityStructures: [{
      name: 'SARL (Société à Responsabilité Limitée/Private Limited Company)',
      description: 'Most common SME structure, suitable for entrepreneurs and small businesses',
      capitalRequirement: '€1 (as per shareholders\' decision)',
      timeline: '2 weeks',
      liability: 'Limited to contribution',
      suitableFor: 'SMEs, family businesses, professionals'
    }, {
      name: 'SAS (Société par Actions Simplifiée/Simplified Joint Stock Company)',
      description: 'Flexible structure for larger businesses, often for holding companies and startups',
      capitalRequirement: '€1 (can vary by activity)',
      timeline: '2-3 weeks',
      liability: 'Limited to contribution',
      suitableFor: 'Startups, tech, holding companies'
    }, {
      name: 'SA (Société Anonyme/Public Limited Company)',
      description: 'Intended for large businesses planning to raise capital or go public',
      capitalRequirement: '€37,000 (minimum, 1/5th at registration)',
      timeline: '3-4 weeks',
      liability: 'Limited to contribution',
      suitableFor: 'Large companies'
    }, {
      name: 'Branch Office',
      description: 'Extension of a foreign parent company',
      capitalRequirement: 'None specific',
      timeline: '1-2 weeks',
      liability: 'Parent company fully liable',
      suitableFor: 'Market testing, initial local presence'
    }, {
      name: 'Representative Office',
      description: 'For marketing and research, cannot trade/commercial activity',
      capitalRequirement: 'None',
      timeline: '1 week',
      liability: 'Parent company fully liable',
      suitableFor: 'Marketing and research activities'
    }],
    requirements: [
      'Passports or ID proof for all directors/shareholders',
      'Proof of address, utility bill (recent, for all directors/shareholders)',
      'Articles of Association (Statuts), notarized',
      'Proof of capital deposit (bank attestation)',
      'Detailed business plan',
      'Company name reservation (INPI search)',
      'Office lease/registered address',
      'Board resolution (if applicable)',
      'UBO (Ultimate Beneficial Owner) declaration'
    ],
    registrationSteps: [
      'Choose business structure and reserve name (INPI)',
      'Draft and notarize Articles of Association (Statuts)',
      'Open business bank account and deposit share capital',
      'Obtain bank certificate for capital deposit',
      'Register at Centre de Formalités des Entreprises (CFE)',
      'Publish mandatory legal notice in a Journal d\'Annonces Légales',
      'Submit documents to Trade Register (Registre du Commerce et des Sociétés – RCS)',
      'Receive registration numbers (SIRET, SIRENE, NAF code)',
      'Set up tax, social security, and VAT registrations as needed'
    ]
  },
  spain: {
    name: 'Spain',
    flag: '🇪🇸',
    color: '#C60B1E',
    processingTime: '1-3 weeks (typical)',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum €3,000 (SL - Sociedad Limitada), €60,000 (SA - Sociedad Anónima)',
    registrationFee: 'Approx. €100-€300, plus legal and notary fees (varies)',
    mainEntityType: 'SL (Limited Liability Company), SA (Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Autónomo)',
    benefits: [
      'Low minimum capital for SL (€3,000)',
      '100% foreign ownership allowed',
      'Efficient electronic registration system (Registro Mercantil Central)',
      'Access to EU single market and strong infrastructure',
      'Various regional grants and R&D incentives',
      'No residency requirement for shareholders/directors'
    ],
    statistics: {
      easeOfBusiness: '#14 in EU (World Bank)',
      corporateTax: '25% (standard), reduced rates for SMEs (15%) on initial profits',
      foreignCompanies: '17,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 'SL (Sociedad Limitada - Limited Liability Company)',
      description: 'Most popular for small to medium businesses',
      capitalRequirement: 'Minimum €3,000, fully paid at incorporation',
      timeline: '1-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, family businesses'
    }, {
      name: 'SA (Sociedad Anónima - Public Limited Company)',
      description: 'For larger businesses seeking capital and stock market presence',
      capitalRequirement: 'Minimum €60,000 (25% paid up-front)',
      timeline: '3-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign companies, no separate legal entity',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Parent company fully liable',
      suitableFor: 'Market testing and presence prior to full setup'
    }, {
      name: 'Sole Proprietorship (Autónomo)',
      description: 'Individual entrepreneur, no legal entity',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or ID for all partners/directors/shareholders',
      'Proof of address (recent utility bills)',
      'Articles of Association (Estatutos Sociales), notarized',
      'Proof of capital deposit in Spanish bank',
      'Certificate of uniqueness for company name from Central Mercantile Registry (Registro Mercantil)',
      'Registered office address in Spain',
      'UBO (Ultimate Beneficial Owner) disclosure'
    ],
    registrationSteps: [
      'Name reservation at Mercantile Registry Central (Registro Mercantil Central)',
      'Draft and notarize Articles of Association',
      'Open bank account and deposit share capital',
      'Obtain bank certificate confirming capital deposit',
      'Apply for tax ID (NIF provisional) at Agencia Tributaria',
      'Register with Commercial Registry (Registro Mercantil Provincial)',
      'Register for social security (if hiring employees)',
      'Obtain definitive NIF tax identification number',
      'Publish formation announcement in Official Gazette (BORME) if required'
    ]
  },
  italy: {
    name: 'Italy',
    flag: '🇮🇹',
    color: '#008C45',
    processingTime: '1-3 weeks (standard incorporation)',
    complexity: 'Moderate',
    capitalRequirement: '€1 (SRL - Private Limited Company), €50,000 (SPA - Public Limited Company)',
    registrationFee: 'Approx. €200-€600 plus notary and legal fees (varies)',
    mainEntityType: 'SRL (Società a Responsabilità Limitata), SPA (Società per Azioni)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Impresa Individuale)',
    benefits: [
      'Low minimum share capital for SRL (€1)',
      '100% foreign ownership permitted',
      'Centralized company registration via Registro delle Imprese (Chamber of Commerce)',
      'Wide EU market access and skilled workforce',
      'Tax incentives for innovative startups and SMEs'
    ],
    statistics: {
      easeOfBusiness: '#58 worldwide (World Bank, varies by source)',
      corporateTax: '24% (IRES) plus regional production tax IRAP (~3.9%)',
      foreignCompanies: '12,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 'SRL (Società a Responsabilità Limitata - Private Limited Company)',
      description: 'Most common company type, limited liability, flexible for SMEs',
      capitalRequirement: 'Minimum €1 (often €10,000 suggested)',
      timeline: '1-3 weeks',
      liability: 'Limited to capital contribution',
      suitableFor: 'Small to medium enterprises, startups'
    }, {
      name: 'SPA (Società per Azioni - Public Limited Company)',
      description: 'Suitable for larger entities, can issue shares publicly',
      capitalRequirement: 'Minimum €50,000',
      timeline: '2-4 weeks',
      liability: 'Limited to capital contribution',
      suitableFor: 'Larger businesses and capital markets'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign company without separate legal entity status',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Impresa Individuale)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport for all shareholders and directors',
      'Proof of registered address in Italy',
      'Articles of Association (Statuto)',
      'Deposit of share capital in Italian bank account',
      'Registered office in Italy mandatory',
      'UBO declaration (≥25% ownership/voting rights)'
    ],
    registrationSteps: [
      'Choose company name and verify availability with the Registro delle Imprese',
      'Draft Articles of Association and have signed before a notary',
      'Open bank account and deposit share capital',
      'Obtain bank certificate of deposit',
      'Submit incorporation documents to Registro delle Imprese (Chamber of Commerce)',
      'Register for tax and VAT with Agenzia delle Entrate',
      'Register for social security and insurance if employing staff',
      'Receive company registration certificate (Certificato di Iscrizione) and VAT number'
    ]
  },
  belgium: {
    name: 'Belgium',
    flag: '🇧🇪',
    color: '#FEEF14',
    processingTime: '1-2 weeks (standard)',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum €18,550 (Private Limited Company - BV/SRL), €61,500 (Public Limited Company - NV/SA)',
    registrationFee: '€87-€207 plus notary and official fees',
    mainEntityType: 'BV (Besloten Vennootschap/Private Limited Company), NV (Naamloze Vennootschap/Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Eenmanszaak)',
    benefits: [
      'Low capital threshold for BV (from €18,550, flexible post-2019 reform)',
      '100% foreign ownership allowed',
      'Access to EU Single Market and Benelux region',
      'Efficient e-portal for business registration (Guichet d\'Entreprise/KBO)',
      'Tax incentives for R&D and startups',
      'Multilingual legal and business environment'
    ],
    statistics: {
      easeOfBusiness: 'Top 20 in EU',
      corporateTax: '25% standard rate',
      foreignCompanies: '10,000+',
      processingDays: '7'
    },
    entityStructures: [{
      name: 'BV (Besloten Vennootschap/Private Limited Company)',
      description: 'Most common company type since reform, flexible and limited liability',
      capitalRequirement: 'Minimum €18,550 (flexible), commonly fully paid at setup',
      timeline: '1-2 weeks',
      liability: 'Limited to capital contribution',
      suitableFor: 'SMEs, startups, family businesses'
    }, {
      name: 'NV (Naamloze Vennootschap/Public Limited Company)',
      description: 'Suitable for large companies, can issue shares publicly',
      capitalRequirement: 'Minimum €61,500',
      timeline: '2-3 weeks',
      liability: 'Limited to capital contribution',
      suitableFor: 'Large enterprises and listed companies'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign company with no separate legal identity',
      capitalRequirement: 'None',
      timeline: '1 week',
      liability: 'Parent company liable',
      suitableFor: 'Market testing and local presence'
    }, {
      name: 'Sole Proprietorship (Eenmanszaak)',
      description: 'Individual entrepreneur, unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport/ID for directors/shareholders',
      'Proof of address (recent utility bill)',
      'Articles of Association (statutes), notarial deed if BV or NV',
      'Proof of deposit of share capital in a Belgian bank account',
      'Registered office address in Belgium',
      'UBO register compliance (≥25% ownership/voting rights)'
    ],
    registrationSteps: [
      'Choose company name and check availability via Belgian Crossroads Bank for Enterprises (Kruispuntbank van Ondernemingen - KBO)',
      'Draft and notarize Articles of Association',
      'Open Belgian bank account and deposit share capital',
      'Obtain bank certificate of capital deposit',
      'Register with Crossroads Bank for Enterprises (KBO)',
      'Register with local Business One-Stop Shop (Guichet d\'Entreprise)',
      'Obtain company number (equivalent to VAT number)',
      'Register for VAT if applicable',
      'Register with social security if hiring employees'
    ]
  },
  ireland: {
    name: 'Ireland',
    flag: '🇮🇪',
    color: '#169B62',
    processingTime: '3-5 business days (standard)',
    complexity: 'Low to Moderate',
    capitalRequirement: '€1 (standard private limited company)',
    registrationFee: 'Approx. €50-€100 online',
    mainEntityType: 'Private Company Limited by Shares (LTD)',
    secondaryEntityType: 'Public Limited Company (PLC), Branch Office, Sole Trader',
    benefits: [
      'Simple and fast online company registration',
      'Minimal capital requirement (€1)',
      'Attractive corporate tax rate at 12.5%',
      'No residency requirement for directors or shareholders',
      'Robust legal system aligned with common law',
      'Access to EU single market and English-speaking environment'
    ],
    statistics: {
      easeOfBusiness: 'Top 10 in EU (World Bank)',
      corporateTax: '12.5% (standard), 25% for non-trading income',
      foreignCompanies: '25,000+',
      processingDays: '4'
    },
    entityStructures: [{
      name: 'Private Company Limited by Shares (LTD)',
      description: 'Most common type for SMEs and startups, limited liability',
      capitalRequirement: 'Minimum €1',
      timeline: '3-5 days',
      liability: 'Limited to share capital',
      suitableFor: 'Most business types'
    }, {
      name: 'Public Limited Company (PLC)',
      description: 'Suitable for larger companies or those seeking to trade publicly',
      capitalRequirement: 'Minimum €25,000 (with 25% paid upfront)',
      timeline: '1-2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Listed and large companies'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign company, no separate legal identity',
      capitalRequirement: 'None',
      timeline: '1 week',
      liability: 'Parent company liable',
      suitableFor: 'Market presence testing'
    }, {
      name: 'Sole Trader',
      description: 'Individual entrepreneur, unlimited liability',
      capitalRequirement: 'None',
      timeline: '1 day',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID for directors and shareholders',
      'Registered office address in Ireland',
      'Company constitution (Memorandum and Articles of Association)',
      'Director and secretary appointments (at least one director)',
      'Details of shareholders and share capital',
      'Bank account for deposit (if capital is required)'
    ],
    registrationSteps: [
      'Choose and reserve company name through the Companies Registration Office (CRO)',
      'Prepare company constitution documents',
      'Submit incorporation forms and documents online with CRO',
      'Register for tax and VAT with Irish Revenue Commissioners',
      'Open a corporate bank account (optional for small capital)',
      'Register for PAYE/PRSI if hiring employees',
      'Receive Certificate of Incorporation'
    ]
  },
  austria: {
    name: 'Austria',
    flag: '🇦🇹',
    color: '#ED2939',
    processingTime: '1-3 weeks',
    complexity: 'Moderate',
    capitalRequirement: '€35,000 (GmbH), €70,000 (AG)',
    registrationFee: 'Approx. €150-€400 plus notary and legal fees',
    mainEntityType: 'GmbH (Private Limited Company), AG (Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Einzelunternehmen)',
    benefits: [
      'Well-regulated legal environment',
      'GmbH with moderate capital and limited liability',
      'Access to European single market and Central European region',
      '100% foreign ownership permissible',
      'Favorable tax treaties and R&D incentives'
    ],
    statistics: {
      easeOfBusiness: 'Top 20 in EU',
      corporateTax: '25%',
      foreignCompanies: '12,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 'GmbH (Private Limited Company)',
      description: 'Most common and flexible company form with limited liability',
      capitalRequirement: 'Minimum €35,000 (at least €17,500 paid upon registration)',
      timeline: '1-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, typical business activities'
    }, {
      name: 'AG (Public Limited Company)',
      description: 'Suitable for larger companies and stock market participants',
      capitalRequirement: 'Minimum €70,000, with 25% minimum paid at registration',
      timeline: '2-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company without independent legal identity',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market testing, local presence'
    }, {
      name: 'Sole Proprietorship (Einzelunternehmen)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID/passport for all shareholders/directors',
      'Proof of registered office in Austria',
      'Draft and notarize Articles of Association (Gesellschaftsvertrag)',
      'Bank account deposit confirmation for share capital',
      'Register with Austrian Commercial Register (Firmenbuch)',
      'UBO declaration (≥25% ownership)'
    ],
    registrationSteps: [
      'Choose company name and verify availability',
      'Draft Articles of Association and notarize with Austrian notary',
      'Open bank account and deposit share capital',
      'Obtain bank certificate confirming share capital deposit',
      'Register company with Firmenbuch (Commercial Register)',
      'Register for tax at Tax Office (Finanzamt)',
      'Register social security if employing staff',
      'Obtain official incorporation documents and company ID'
    ]
  },
  bulgaria: {
    name: 'Bulgaria',
    flag: '🇧🇬',
    color: '#00966E',
    processingTime: '5-10 business days',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum BGN 2 (€1 approximately) for LLC (OOD), BGN 50,000 for Joint Stock Company (AD)',
    registrationFee: 'Approx. BGN 110-BGN 120 (~€55-€60)',
    mainEntityType: 'OOD (Limited Liability Company), AD (Joint Stock Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship',
    benefits: [
      'Lowest corporate tax rate in the EU (10%)',
      'Minimal capital requirements for LLC (OOD)',
      '100% foreign ownership permitted',
      'Strategic location with access to EU and Balkan markets',
      'EU member with access to EU legal infrastructure',
      'Fast electronic company registration system'
    ],
    statistics: {
      easeOfBusiness: 'Top 50 globally (World Bank)',
      corporateTax: '10% flat',
      foreignCompanies: '5,000+',
      processingDays: '8'
    },
    entityStructures: [{
      name: 'OOD (Limited Liability Company)',
      description: 'Most typical business entity offering limited liability',
      capitalRequirement: 'Minimum BGN 2 (~€1)',
      timeline: '5-10 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, typical business ventures'
    }, {
      name: 'AD (Joint Stock Company)',
      description: 'Suitable for larger enterprises needing to raise capital publicly or privately',
      capitalRequirement: 'Minimum BGN 50,000 (~€25,500)',
      timeline: '10+ days',
      liability: 'Limited to share capital',
      suitableFor: 'Large companies'
    }, {
      name: 'Branch Office',
      description: 'Branch of foreign company, no separate legal entity',
      capitalRequirement: 'None',
      timeline: '7-10 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence'
    }, {
      name: 'Sole Proprietorship',
      description: 'Individual entrepreneur, unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID/passport for all shareholders and directors',
      'Registered office in Bulgaria',
      'Articles of Association/Founding act in Bulgarian',
      'Bank account and proof of share capital deposit (for OOD and AD)',
      'Registration with Bulgarian Commercial Register',
      'UBO declaration (≥25% ownership)'
    ],
    registrationSteps: [
      'Verify and reserve company name with the Bulgarian Commercial Register',
      'Prepare Articles of Association (in Bulgarian)',
      'Deposit share capital in Bulgarian bank',
      'Submit application and documents to Commercial Register and Registry Agency',
      'Obtain company registration certificate and BULSTAT number',
      'Register for VAT if threshold exceeded',
      'Register with National Revenue Agency for taxes and social security',
      'Receive company ID and start operations'
    ]
  },
  croatia: {
    name: 'Croatia',
    flag: '🇭🇷',
    color: '#FF0000',
    processingTime: '7-14 business days',
    complexity: 'Moderate',
    capitalRequirement: 'HRK 10,000 (€1,300 approx.) for d.o.o. (Limited Liability Company), HRK 200,000 (€26,500 approx.) for d.d. (Joint Stock Company)',
    registrationFee: 'Approximately HRK 400-1,200 (€50-160) depending on company type',
    mainEntityType: 'd.o.o. (Društvo s Ograničenom Odgovornošću - Limited Liability Company), d.d. (Dioničko Društvo - Joint Stock Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Obrt)',
    benefits: [
      'Streamlined online business registration through centralized court and tax office services',
      'Moderate capital requirements, lower for d.o.o.',
      'Full foreign ownership allowed',
      'Access to EU market and increasing FDI incentives',
      'Efficient electronic system for company registration',
      'Growing startup ecosystem with government support programs'
    ],
    statistics: {
      easeOfBusiness: 'Top 40 globally',
      corporateTax: '18% (standard)',
      foreignCompanies: '4,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 'd.o.o. (Limited Liability Company)',
      description: 'Most common structure, limited liability, suitable for SMEs',
      capitalRequirement: 'Minimum HRK 10,000 (~€1,300)',
      timeline: '7-14 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, small to medium enterprises'
    }, {
      name: 'd.d. (Joint Stock Company)',
      description: 'For larger companies, able to raise capital through shares publicly or privately',
      capitalRequirement: 'Minimum HRK 200,000 (~€26,500)',
      timeline: '14-21 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Foreign company extension without separate legal status',
      capitalRequirement: 'None',
      timeline: '7+ days',
      liability: 'Parent company liable',
      suitableFor: 'Market entry, testing'
    }, {
      name: 'Sole Proprietorship (Obrt)',
      description: 'Individual entrepreneur with personal liability',
      capitalRequirement: 'None',
      timeline: '3-7 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID for shareholders and directors',
      'Registered office in Croatia',
      'Articles of Association (Društveni ugovor) for d.o.o.',
      'Proof of share capital deposit in Croatian bank account',
      'Registration with Croatian Court Registry (Sudski registar)',
      'Tax identification number (OIB) for company and directors',
      'Registration with tax authorities and social security'
    ],
    registrationSteps: [
      'Check and reserve company name with the Court Registry',
      'Draft Articles of Association and have them notarized',
      'Open a bank account and deposit share capital',
      'Submit application to Court Registry online or in person',
      'Obtain company registration certificate and OIB number',
      'Register for VAT if applicable',
      'Register for tax administration and social security obligations',
      'Start business operations'
    ]
  },
  cyprus: {
    name: 'Cyprus',
    flag: '🇨🇾',
    color: '#007A3D',
    processingTime: '3-7 business days',
    complexity: 'Low to Moderate',
    capitalRequirement: 'Minimum €1,000 (Private Limited Company); €25,629 (Public Limited Company)',
    registrationFee: 'Approx. €105-€150',
    mainEntityType: 'Private Limited Company (LTD), Public Limited Company (PLC)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship',
    benefits: [
      'Low corporate tax rate at 12.5%',
      'Simple and quick company registration process',
      '100% foreign ownership allowed',
      'English widely used in business and legal affairs',
      'Access to EU single market and strong network of double tax treaties',
      'No residency requirements for shareholders or directors'
    ],
    statistics: {
      easeOfBusiness: 'Top 40 globally',
      corporateTax: '12.5% (lowest in the EU)',
      foreignCompanies: '10,000+',
      processingDays: '5'
    },
    entityStructures: [{
      name: 'Private Limited Company (LTD)',
      description: 'Most common form for businesses in Cyprus; limited liability',
      capitalRequirement: 'Minimum €1,000 divided into shares of €1 each',
      timeline: '3-7 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, general business'
    }, {
      name: 'Public Limited Company (PLC)',
      description: 'Suitable for larger businesses and those seeking public funding',
      capitalRequirement: 'Minimum €25,629',
      timeline: '7-14 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent with no separate legal personality',
      capitalRequirement: 'None',
      timeline: '3-5 days',
      liability: 'Parent company fully liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship',
      description: 'Individual owner with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID for all shareholders and directors',
      'Registered office address in Cyprus',
      'Memorandum and Articles of Association (in English or Greek)',
      'Bank account with capital deposited',
      'Tax Identification Number (TIN) registration',
      'UBO register compliance for owners with ≥25% shares'
    ],
    registrationSteps: [
      'Company name reservation with the Cyprus Registrar of Companies',
      'Prepare and submit Memorandum & Articles of Association',
      'Open bank account and deposit share capital',
      'Submit incorporation documents to Registrar of Companies',
      'Obtain Certificate of Incorporation and company registration number',
      'Register for tax and VAT with the Cyprus Tax Department',
      'Register with Social Insurance Services if employing staff',
      'Commence business operations'
    ]
  },
  czech: {
    name: 'Czech Republic',
    flag: '🇨🇿',
    color: '#D7141A',
    processingTime: '7-14 business days',
    complexity: 'Moderate',
    capitalRequirement: 'CZK 1 (€40 approx.) for s.r.o. (Limited Liability Company), CZK 2,000,000 (€80,000 approx.) for a.s. (Joint Stock Company)',
    registrationFee: 'Approx. CZK 6,000-7,000 (~€240-280)',
    mainEntityType: 's.r.o. (Společnost s ručením omezeným - Limited Liability Company), a.s. (Akciová společnost - Joint Stock Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Živnostenský podnikatel)',
    benefits: [
      'Low minimum capital requirement for s.r.o.',
      '100% foreign ownership allowed',
      'Access to EU markets and central European economy',
      'Efficient electronic registration system',
      'Strong legal protections and EU aligned framework'
    ],
    statistics: {
      easeOfBusiness: 'High ranking in EU',
      corporateTax: '19%',
      foreignCompanies: '7,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 's.r.o. (Limited Liability Company)',
      description: 'Most popular type for small and medium enterprises',
      capitalRequirement: 'Minimum CZK 1 (~€40)',
      timeline: '7-14 days',
      liability: 'Limited to contributed capital',
      suitableFor: 'SMEs, startups, professionals'
    }, {
      name: 'a.s. (Joint Stock Company)',
      description: 'Suitable for large companies intending to raise capital',
      capitalRequirement: 'Minimum CZK 2,000,000 (~€80,000)',
      timeline: '14-21 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large businesses'
    }, {
      name: 'Branch Office',
      description: 'Foreign company\'s branch without separate legal entity status',
      capitalRequirement: 'None required',
      timeline: '7-10 days',
      liability: 'Parent company liable',
      suitableFor: 'Market testing and presence'
    }, {
      name: 'Sole Proprietorship (Živnostenský podnikatel)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or ID for shareholders and directors',
      'Registered office address in Czech Republic',
      'Articles of Association (Společenská smlouva) for s.r.o.',
      'Deposit of share capital into Czech bank account',
      'Registration with Czech Commercial Register (Obchodní rejstřík)',
      'Registration with tax and social security authorities',
      'UBO register compliance for persons with ≥25% ownership'
    ],
    registrationSteps: [
      'Reserve company name with the Czech Commercial Register',
      'Prepare Articles of Association notarized',
      'Open bank account and pay share capital',
      'Submit registration application to Commercial Register online or via court',
      'Register for tax (tax number) and VAT with financial office',
      'Register with social security and health insurance authorities',
      'Obtain company identification numbers and certificates',
      'Commence business activity'
    ]
  },
  denmark: {
    name: 'Denmark',
    flag: '🇩🇰',
    color: '#C60C30',
    processingTime: '1-3 business days',
    complexity: 'Low',
    capitalRequirement: 'DKK 40,000 (€5,400 approx.) for ApS (Private Limited), DKK 500,000 (€67,000 approx.) for A/S (Public Limited Company)',
    registrationFee: 'Approx. DKK 670-2,900 (€90-390)',
    mainEntityType: 'ApS (Anpartsselskab - Private Limited Company), A/S (Aktieselskab - Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Enkeltmandsvirksomhed)',
    benefits: [
      'Fast and simple online registration process',
      'Low capital requirements for ApS',
      '100% foreign ownership allowed',
      'Transparent and efficient legal system',
      'Access to Nordic and EU markets',
      'Robust digital infrastructure'
    ],
    statistics: {
      easeOfBusiness: 'Top 5 in EU',
      corporateTax: '22%',
      foreignCompanies: '15,000+',
      processingDays: '2'
    },
    entityStructures: [{
      name: 'ApS (Private Limited Company)',
      description: 'Most common company type, limited liability',
      capitalRequirement: 'Minimum DKK 40,000 (~€5,400)',
      timeline: '1-3 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, general business'
    }, {
      name: 'A/S (Public Limited Company)',
      description: 'Suitable for large companies or those wanting to list shares',
      capitalRequirement: 'Minimum DKK 500,000 (~€67,000)',
      timeline: '2-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Foreign company branch without separate legal status',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Enkeltmandsvirksomhed)',
      description: 'Individual with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-2 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID for shareholders and directors',
      'Registered office in Denmark',
      'Articles of Association (vedtægter)',
      'Deposit of share capital in Danish bank account',
      'Registration with Danish Business Authority (Erhvervsstyrelsen)',
      'UBO register compliance'
    ],
    registrationSteps: [
      'Name verification and reservation via Danish Business Authority',
      'Prepare and file Articles of Association and Incorporation documents online',
      'Open Danish bank account and deposit capital',
      'Submit registration application electronically to Erhvervsstyrelsen',
      'Receive Certificate of Incorporation and company registration number',
      'Register for tax and VAT with SKAT (Danish tax authority)',
      'Register for labor market and social security if hiring'
    ]
  },
  estonia: {
    name: 'Estonia',
    flag: '🇪🇪',
    color: '#0072CE',
    processingTime: '1-3 business days',
    complexity: 'Low',
    capitalRequirement: 'Minimum €2,500 for OÜ (Private Limited Company); Public Limited Company (AS) requires more capital',
    registrationFee: 'Approx. €190 online, higher for paper submissions',
    mainEntityType: 'OÜ (Osaühing - Private Limited Company), AS (Aktsiaselts - Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (FIE - Füüsilisest Isikust Ettevõtja)',
    benefits: [
      'Fast, fully online company formation via e-Business Register',
      'Low capital requirements for OÜ (€2,500, can be deferred)',
      '100% foreign ownership allowed',
      'Access to EU market with attractive startup incentives',
      'Transparent, digitally advanced business environment'
    ],
    statistics: {
      easeOfBusiness: 'Top 10 in EU, renowned for digital governance',
      corporateTax: '20% on distributed profits; retained earnings untaxed',
      foreignCompanies: '15,000+',
      processingDays: '2'
    },
    entityStructures: [{
      name: 'OÜ (Private Limited Company)',
      description: 'Most common company type, flexible and limited liability',
      capitalRequirement: 'Minimum €2,500 (can be deferred with certain conditions)',
      timeline: '1-3 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, contractors'
    }, {
      name: 'AS (Public Limited Company)',
      description: 'Larger companies able to raise capital on stock markets',
      capitalRequirement: 'Minimum €25,000',
      timeline: '3-5 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign company, no separate legal identity',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (FIE)',
      description: 'Individual entrepreneur, unlimited personal liability',
      capitalRequirement: 'None',
      timeline: '1 day',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport for all shareholders and management',
      'Registered Estonian address (mandatory)',
      'Articles of Association (can be standard template)',
      'Digital signature or e-Residency for online registration',
      'Share capital deposit (unless deferred by law)',
      'Registration with Estonian Business Register'
    ],
    registrationSteps: [
      'Choose and reserve company name via Estonian Business Register',
      'Prepare and submit Articles of Association electronically',
      'Register company online using ID card, Mobile-ID, or e-Residency card',
      'Deposit share capital in Estonian bank (if applicable)',
      'Obtain registration code and certificate online',
      'Register for VAT and taxes as needed',
      'Register social security if employing workers'
    ]
  },
  finland: {
    name: 'Finland',
    flag: '🇫🇮',
    color: '#003580',
    processingTime: '1-4 weeks depending on company type and document readiness',
    complexity: 'Low to Moderate',
    capitalRequirement: 'Minimum €1 for private limited company (Oy); €80,000 for public limited company (Oyj)',
    registrationFee: 'Approx. €275 for online registration (private company)',
    mainEntityType: 'Oy (Osakeyhtiö - Private Limited Company), Oyj (Julkinen Osakeyhtiö - Public Limited Company)',
    secondaryEntityType: 'Branch Office (Sivuliike), Representative Office (Edustusto), Sole Proprietorship (Toiminimi)',
    benefits: [
      'Fast and transparent company registration using online services',
      'No minimum share capital for private limited companies since 2019 (minimum €1)',
      '100% foreign ownership allowed',
      'High legal and regulatory transparency',
      'Access to Nordic and European markets',
      'Strong governmental digital infrastructure'
    ],
    statistics: {
      easeOfBusiness: 'Top 10 in EU',
      corporateTax: '20%',
      foreignCompanies: '12,000+',
      processingDays: '28'
    },
    entityStructures: [{
      name: 'Oy (Private Limited Company)',
      description: 'Most common business entity with limited liability',
      capitalRequirement: 'Minimum €1, no longer mandatory €2,500 paid-up',
      timeline: '3-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, freelancers'
    }, {
      name: 'Oyj (Public Limited Company)',
      description: 'Suitable for larger enterprises and companies listing on stock exchanges',
      capitalRequirement: 'Minimum €80,000',
      timeline: '5-6 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large businesses'
    }, {
      name: 'Branch Office (Sivuliike)',
      description: 'Foreign company branch without separate legal entity',
      capitalRequirement: 'None',
      timeline: '4-5 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Representative Office (Edustusto)',
      description: 'For non-selling activities like marketing and liaison',
      capitalRequirement: 'None',
      timeline: '3-4 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Marketing and liaison activities'
    }, {
      name: 'Sole Proprietorship (Toiminimi)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or ID for all directors and shareholders',
      'Registered Finnish business address',
      'Articles of Association in Finnish or Swedish',
      'Appointment of at least one resident director (EEA resident) unless special permission granted',
      'Company name reservation with Finnish Patent and Registration Office (PRH)',
      'Share capital deposit handled by Finnish bank (if applicable)'
    ],
    registrationSteps: [
      'Choose correct business entity',
      'Reserve company name online with PRH',
      'Draft Articles of Association and other incorporation documents',
      'Submit registration electronically via PRH system with digital identification',
      'Depositing share capital if required',
      'Obtain Business ID and registration certificate',
      'Register for VAT, tax, and employments as applicable',
      'Maintain compliance with Finnish corporate regulations'
    ]
  },
  greece: {
    name: 'Greece',
    flag: '🇬🇷',
    color: '#0D5EAF',
    processingTime: '7-15 business days',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum €4,500 for IKE (Private Company), €25,000 for AE (Public Limited Company)',
    registrationFee: 'Approx. €200-€500 depending on company type and legal fees',
    mainEntityType: 'IKE (Ιδιωτική Κεφαλαιουχική Εταιρεία - Private Company LLC equivalent), AE (Ανώνυμη Εταιρεία - Public Limited Company)',
    secondaryEntityType: 'LTD (Εταιρεία Περιορισμένης Ευθύνης- EPE), Sole Proprietorship (Ατομική Επιχείρηση)',
    benefits: [
      'Flexible company formations including IKE with low capital',
      '100% foreign ownership allowed',
      'Access to EU single market and strategic Mediterranean location',
      'Electronic registration available via General Commercial Registry (GEMI)',
      'EU legal protections and transparent corporate governance'
    ],
    statistics: {
      easeOfBusiness: 'EU top 30',
      corporateTax: '22%',
      foreignCompanies: '8,000+',
      processingDays: '11'
    },
    entityStructures: [{
      name: 'IKE (Private Company)',
      description: 'Flexible limited liability company for startups and SMEs',
      capitalRequirement: 'Minimum €4,500, often lower or flexible with amendments',
      timeline: '7-15 days',
      liability: 'Limited to injected capital',
      suitableFor: 'Small to medium enterprises, startups'
    }, {
      name: 'AE (Public Limited Company)',
      description: 'Larger company, suited for stock issuance and public investments',
      capitalRequirement: 'Minimum €25,000',
      timeline: '14-21 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large companies'
    }, {
      name: 'LTD/EPE (Limited Liability Company)',
      description: 'Traditional limited liability company structure',
      capitalRequirement: '€4,500 minimum',
      timeline: '7-14 days',
      liability: 'Limited to share capital',
      suitableFor: 'Traditional business structures'
    }, {
      name: 'Branch Office',
      description: 'Foreign company branch without independent legal entity',
      capitalRequirement: 'None',
      timeline: '7-10 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship',
      description: 'Individual entrepreneur with personal liability',
      capitalRequirement: 'None',
      timeline: '3-5 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID of shareholders/directors',
      'Registered Greek business address',
      'Articles of Association (Καταστατικό Εταιρείας)',
      'Share capital deposit confirmation (if applicable)',
      'Company registration with General Commercial Registry (GEMI)',
      'Compliance with tax and social security registrations',
      'Ultimate Beneficial Owners registration (UBO)'
    ],
    registrationSteps: [
      'Company name reservation using GEMI',
      'Draft Articles of Association, notarization may be required',
      'Open bank account and deposit share capital when necessary',
      'Submit registration application and documents to GEMI',
      'Obtain company registration certificate and tax identification number',
      'Register for VAT if turnover exceeds thresholds',
      'Register employees with social security institutions (EFKA)',
      'Begin operations'
    ]
  },
  hungary: {
    name: 'Hungary',
    flag: '🇭🇺',
    color: '#CD2A3E',
    processingTime: '3-7 business days',
    complexity: 'Moderate',
    capitalRequirement: 'HUF 3,000,000 (€8,000 approx.) for Kft (Limited Liability Company); HUF 5,000,000 (€13,000 approx.) for Rt (Public Limited Company)',
    registrationFee: 'Approx. HUF 50,000-60,000 (€135-160)',
    mainEntityType: 'Kft (Korlátolt Felelősségű Társaság - Limited Liability Company), Rt (Részvénytársaság - Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Egyéni Vállalkozó)',
    benefits: [
      'Lowest corporate tax rate in the EU at 9%',
      'Fast company registration system via electronic registration',
      '100% foreign ownership permitted without restrictions',
      'Strategic central European location with developed infrastructure',
      'Access to EU single market and favorable business environment'
    ],
    statistics: {
      easeOfBusiness: 'EU top 40',
      corporateTax: '9% (lowest in EU)',
      foreignCompanies: '7,000+',
      processingDays: '5'
    },
    entityStructures: [{
      name: 'Kft (Limited Liability Company)',
      description: 'Most popular form for SMEs and startups',
      capitalRequirement: 'Minimum HUF 3 million (~€8,000)',
      timeline: '3-7 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, small businesses'
    }, {
      name: 'Rt (Public Limited Company)',
      description: 'Suitable for large entities and stock market participants',
      capitalRequirement: 'Minimum HUF 5 million (~€13,000)',
      timeline: '7-14 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Foreign company branch without separate legal personality',
      capitalRequirement: 'None',
      timeline: '3-5 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Egyéni Vállalkozó)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '2-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid passport or national ID',
      'Registered Hungarian address',
      'Articles of Association (Alapító Okirat)',
      'Bank account with share capital deposit proof',
      'Registration with Hungarian Court of Registration (Cégbíróság)',
      'Tax and social security authority registrations',
      'UBO information registration (owners with ≥25% ownership)'
    ],
    registrationSteps: [
      'Company name reservation and verification',
      'Drafting and notarization of Articles of Association',
      'Deposit share capital into Hungarian bank account',
      'Submit registration documents electronically to Court of Registration',
      'Obtain company registration number and tax ID',
      'Register for VAT and social security',
      'Start commercial operations'
    ]
  },
  latvia: {
    name: 'Latvia',
    flag: '🇱🇻',
    color: '#B80000',
    processingTime: '3-7 business days',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum €2,800 for SIA (Limited Liability Company), €35,000 for AS (Joint Stock Company)',
    registrationFee: 'Approx. €100-150',
    mainEntityType: 'SIA (Sabiedrība ar Ierobežotu Atbildību - Limited Liability Company), AS (Akciju sabiedrība - Joint Stock Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Individuālais komersants)',
    benefits: [
      'Straightforward online registration process via Latvian Company Register',
      'Moderate capital requirements for SIA',
      '100% foreign ownership allowed without restrictions',
      'Access to EU and Baltic markets',
      'Transparent legal framework aligned with EU standards'
    ],
    statistics: {
      easeOfBusiness: 'EU top 30',
      corporateTax: '20% on distributed profits',
      foreignCompanies: '5,000+',
      processingDays: '5'
    },
    entityStructures: [{
      name: 'SIA (Limited Liability Company)',
      description: 'Most commonly used entity for SMEs and startups',
      capitalRequirement: 'Minimum €2,800',
      timeline: '3-7 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, entrepreneurs'
    }, {
      name: 'AS (Joint Stock Company)',
      description: 'For larger companies, especially those intending to raise capital publicly',
      capitalRequirement: 'Minimum €35,000',
      timeline: '7-14 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Foreign company branch without separate legal personality',
      capitalRequirement: 'None',
      timeline: '3-5 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Individuālais komersants)',
      description: 'Individual with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport for directors and shareholders',
      'Registered Latvian address (mandatory)',
      'Articles of Association (statutes)',
      'Proof of capital deposit in bank (for SIA and AS)',
      'Registration with Latvian Register of Enterprises (UR)',
      'Tax and social security registrations',
      'UBO registration for beneficial owners with ≥25% ownership'
    ],
    registrationSteps: [
      'Reserve company name through Latvian Company Register portal',
      'Submit Articles of Association and founding documents',
      'Open bank account and deposit share capital',
      'File registration application electronically or at the Register of Enterprises',
      'Processed registration certificate and VAT number if applicable',
      'Register with State Revenue Service for tax purposes',
      'Register employees with State Social Insurance Agency if hiring'
    ]
  },
  lithuania: {
    name: 'Lithuania',
    flag: '🇱🇹',
    color: '#FDB913',
    processingTime: '3-5 business days',
    complexity: 'Moderate',
    capitalRequirement: 'Minimum €2,500 for UAB (Private Limited Company); €40,000 for AB (Public Limited Company)',
    registrationFee: 'Approx. €57-€115',
    mainEntityType: 'UAB (Uždaroji Akcinė Bendrovė - Private Limited Company), AB (Akcinė Bendrovė - Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Individuali Įmonė)',
    benefits: [
      'Fast and reliable company registration via Lithuanian Centre of Registers',
      'Moderate capital requirements for UAB',
      '100% foreign ownership permitted',
      'Strategic location in Baltic region with EU market access',
      'Transparent legal and regulatory environment'
    ],
    statistics: {
      easeOfBusiness: 'High ranking in EU',
      corporateTax: '15%',
      foreignCompanies: '6,000+',
      processingDays: '4'
    },
    entityStructures: [{
      name: 'UAB (Private Limited Company)',
      description: 'Most popular form for small and medium businesses',
      capitalRequirement: 'Minimum €2,500',
      timeline: '3-5 days',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, professionals'
    }, {
      name: 'AB (Public Limited Company)',
      description: 'Suitable for larger companies and stock issuance',
      capitalRequirement: 'Minimum €40,000',
      timeline: '5-7 days',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises'
    }, {
      name: 'Branch Office',
      description: 'Foreign company extension with no separate legal identity',
      capitalRequirement: 'None',
      timeline: '3-5 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Individuali Įmonė)',
      description: 'Individual entrepreneur with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-3 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport of directors and shareholders',
      'Registered office address in Lithuania',
      'Articles of Association (Steigimo Aktas)',
      'Proof of share capital deposit',
      'Registration at Lithuanian Centre of Registers',
      'Tax and social security registrations',
      'UBO registration for beneficial owners holding ≥25%'
    ],
    registrationSteps: [
      'Company name reservation and approval',
      'Draft and notarize Articles of Association',
      'Deposit share capital in Lithuanian bank',
      'Submit registration application to Centre of Registers electronically or in person',
      'Receive registration certificate and company code',
      'Register for VAT if applicable',
      'Register employees with State Social Insurance Fund Board if hiring'
    ]
  },
  luxembourg: {
    name: 'Luxembourg',
    flag: '🇱🇺',
    color: '#E0001E',
    processingTime: '2-4 weeks',
    complexity: 'Moderate',
    capitalRequirement: '€12,000 minimum for SARL (Private Limited Company); €31,000 minimum for SA (Public Limited Company)',
    registrationFee: 'Approx. €400-€1,000 depending on company type and notary fees',
    mainEntityType: 'SARL (Société à Responsabilité Limitée – Private Limited Company), SA (Société Anonyme – Public Limited Company)',
    secondaryEntityType: 'Branch Office, Sole Proprietorship (Entrepreneur individuel)',
    benefits: [
      'Luxembourg offers a multilingual business environment (French, German, English)',
      'Attractive tax regime with extensive double tax treaties network',
      '100% foreign ownership allowed',
      'Access to EU market and strong financial sector presence',
      'Modern and flexible company laws'
    ],
    statistics: {
      easeOfBusiness: 'Among the top EU countries',
      corporateTax: 'Approximately 24.94% including municipal business tax',
      foreignCompanies: '20,000+',
      processingDays: '21'
    },
    entityStructures: [{
      name: 'SARL (Private Limited Company)',
      description: 'Suitable for SMEs and startups with limited liability',
      capitalRequirement: 'Minimum €12,000',
      timeline: '2-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, family businesses, startups'
    }, {
      name: 'SA (Public Limited Company)',
      description: 'Suitable for larger companies, especially those seeking capital market funding',
      capitalRequirement: 'Minimum €31,000',
      timeline: '3-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, public companies'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company with no separate legal identity',
      capitalRequirement: 'None',
      timeline: '2-3 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Entrepreneur individuel)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport for shareholders and directors',
      'Registered Luxembourg business address (mandatory)',
      'Drafting and notarization of Articles of Association',
      'Bank capital deposit certificate (for SARL and SA)',
      'Registration with Luxembourg Business Register (RCS)',
      'Tax and social security registration',
      'UBO registration as per EU transparency directive requirements'
    ],
    registrationSteps: [
      'Check and reserve company name with RCS',
      'Prepare and notarize Articles of Association',
      'Open bank account and deposit share capital',
      'Submit registration request to Luxembourg Business Register',
      'Receive Certificate of Incorporation and registration number',
      'Register for VAT and corporate taxes at the Luxembourg Tax Authorities',
      'Register employees with social security institutions if applicable',
      'Commence business operations'
    ]
  },
  malta: {
    name: 'Malta',
    flag: '🇲🇹',
    color: '#005BBB',
    processingTime: '1-2 weeks',
    complexity: 'Moderate',
    capitalRequirement: '€1,165 minimum for Ltd (Private Limited Company); approx. €46,600 minimum for PLC (Public Limited Company)',
    registrationFee: 'Approx. €245-€1,750 depending on company type and share capital',
    mainEntityType: 'Ltd (Private Limited Company), PLC (Public Limited Company)',
    secondaryEntityType: 'Partnership, Branch Office, Sole Proprietorship (Sole Trader)',
    benefits: [
      'Malta offers a fully EU-compliant legal and tax framework',
      'Strong network of double tax treaties (70+ countries)',
      '100% foreign ownership allowed',
      'Strategic location for EU and Mediterranean markets',
      'Government incentives for R&D, IP and innovation',
      'Business-friendly digital registration and support services'
    ],
    statistics: {
      easeOfBusiness: 'Streamlined registration process favored by investors',
      corporateTax: 'Standard 35% with effective reductions to ~5% through refundable tax credits',
      foreignCompanies: 'Thousands registered benefiting from favorable tax regime',
      processingDays: '10'
    },
    entityStructures: [{
      name: 'Ltd (Private Limited Company)',
      description: 'Suitable for SMEs and startups with limited liability',
      capitalRequirement: 'Minimum €1,165 (20% paid up)',
      timeline: '1-2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, family businesses, startups'
    }, {
      name: 'PLC (Public Limited Company)',
      description: 'Suitable for larger companies requiring capital market access',
      capitalRequirement: 'Minimum approx. €46,600 (25% paid up)',
      timeline: '~2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, public companies'
    }, {
      name: 'Partnership',
      description: 'General or limited partnerships',
      capitalRequirement: 'No minimum capital requirement',
      timeline: 'Timeline varies',
      liability: 'Varies by partnership type',
      suitableFor: 'Small businesses and joint ventures'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company without separate legal identity',
      capitalRequirement: 'None',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }, {
      name: 'Sole Proprietorship (Sole Trader)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'None',
      timeline: 'Approx. 1 week',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport of shareholders, directors, and company secretary',
      'Registered business address in Malta (mandatory)',
      'Drafting and notarization of Memorandum and Articles of Association',
      'Bank capital deposit certificate (for Ltd and PLC)',
      'Registration with Malta Business Registry (MBR)',
      'Tax identification number, VAT registration, and social security registration',
      'UBO disclosure as per EU transparency requirements'
    ],
    registrationSteps: [
      'Check and reserve company name with Malta Business Registry (MBR)',
      'Prepare and notarize Memorandum and Articles of Association',
      'Open bank account and deposit share capital',
      'Submit registration application to MBR',
      'Receive Certificate of Incorporation and registration number',
      'Register for VAT and corporate taxes at Maltese Tax Authorities',
      'Register employees with social security institutions (Jobs Plus) if applicable',
      'Commence business operations'
    ]
  },
  poland: {
    name: 'Poland',
    flag: '🇵🇱',
    color: '#DC143C',
    processingTime: '1-3 weeks',
    complexity: 'Moderate',
    capitalRequirement: 'PLN 5,000 (~€1,100) minimum for Limited Liability Company (Sp. z o.o); PLN 100,000 (~€22,000) minimum for Joint-Stock Company (S.A)',
    registrationFee: 'Approx. PLN 600-1,200 depending on company type and registration method',
    mainEntityType: 'Sp. z o.o (Limited Liability Company), S.A. (Joint-Stock Company)',
    secondaryEntityType: 'Limited Partnership, Registered Partnership, Sole Proprietorship, Branch Office',
    benefits: [
      'Strategic location in Central Europe with access to EU and Eastern markets',
      'Competitive corporate tax rates with reduced rates for small companies',
      'Highly skilled and cost-effective workforce',
      'Robust legal framework aligned with EU regulations',
      'Government incentives and special economic zones'
    ],
    statistics: {
      easeOfBusiness: 'Growing reputation for efficient registration and business environment',
      corporateTax: '19% standard; 9% reduced rate for small taxpayers and start-ups',
      foreignCompanies: 'Large and growing number, with simplified regulations for EU and non-EU investors',
      processingDays: '14'
    },
    entityStructures: [{
      name: 'Limited Liability Company (Sp. z o.o)',
      description: 'Most common form for SMEs and startups',
      capitalRequirement: 'Minimum capital PLN 5,000',
      timeline: '1-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, family businesses'
    }, {
      name: 'Joint-Stock Company (S.A.)',
      description: 'Suitable for larger enterprises and capital market access',
      capitalRequirement: 'Minimum capital PLN 100,000',
      timeline: 'Around 3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, public companies'
    }, {
      name: 'Limited Partnership (Spółka komandytowa)',
      description: 'Hybrid partnership with general and limited partners',
      capitalRequirement: 'No minimum capital, personal liability varies',
      timeline: '1-2 weeks',
      liability: 'Varies by partner type',
      suitableFor: 'Flexible and family businesses'
    }, {
      name: 'Registered Partnership (Spółka jawna)',
      description: 'Traditional partnership without legal personality',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Small businesses and professionals'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market testing'
    }, {
      name: 'Sole Proprietorship',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: '1 week',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }],
    requirements: [
      'Valid ID or passport for shareholders and directors',
      'Registered physical office address in Poland (mandatory)',
      'Drafting and notarization or electronic submission of Articles of Association (for Sp. z o.o and S.A.)',
      'Bank account and deposit of minimum share capital',
      'Registration with National Court Register (KRS)',
      'Tax identification number (NIP), VAT registration where applicable',
      'Social security registration for employees',
      'UBO registration as per EU transparency directives'
    ],
    registrationSteps: [
      'Choose and reserve company name with KRS',
      'Draft and notarize Articles of Association or submit electronically (S24 portal)',
      'Deposit minimum share capital in bank account',
      'Submit registration application to KRS (via S24 portal for faster online registration)',
      'Obtain Certificate of Incorporation and KRS number',
      'Register for VAT and corporate taxes with Polish Tax Authorities',
      'Register employees with Social Insurance Institution (ZUS) if applicable',
      'Start business operations'
    ]
  },
  portugal: {
    name: 'Portugal',
    flag: '🇵🇹',
    color: '#FF0000',
    processingTime: 'Approx. 2 weeks',
    complexity: 'Moderate',
    capitalRequirement: '€1 minimum for Lda (Private Limited Company); €50,000 minimum for S.A. (Public Limited Company)',
    registrationFee: 'Approx. €350-€1,000 depending on company type and share capital',
    mainEntityType: 'Lda (Private Limited Company), S.A. (Public Limited Company)',
    secondaryEntityType: 'Sole Proprietorship, General Partnership, Limited Partnership, Branch Office',
    benefits: [
      'Access to the EU market and Portuguese-speaking countries',
      'Competitive corporate tax rates with additional regional tax incentives',
      'Flexible and agile legal framework with digital registration options',
      'Government support for startups and innovation, including Portugal 2030 program',
      'Multilingual workforce and high quality of life',
      'Strategic location with access to Europe, Africa, and Americas'
    ],
    statistics: {
      easeOfBusiness: 'Streamlined digital company registration (Empresa na Hora) system',
      corporateTax: '21% standard rate; reduced rates for SMEs and regional incentives',
      foreignCompanies: 'Many registered owing to EU membership and business incentives',
      processingDays: '10'
    },
    entityStructures: [{
      name: 'Lda (Private Limited Company)',
      description: 'Suitable for SMEs and small businesses',
      capitalRequirement: 'Minimum share capital €1',
      timeline: 'Approx. 2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, professionals'
    }, {
      name: 'S.A. (Public Limited Company)',
      description: 'Suitable for larger companies and public offerings',
      capitalRequirement: 'Minimum share capital €50,000',
      timeline: '3-4 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, listed companies'
    }, {
      name: 'Sole Proprietorship (Empresário em Nome Individual)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: 'Approx. 1 week',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }, {
      name: 'General Partnership (Sociedade em Nome Coletivo)',
      description: 'Unlimited liability partners',
      capitalRequirement: 'No minimum capital',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Small partnerships'
    }, {
      name: 'Limited Partnership (Sociedade em Comandita)',
      description: 'Limited liability for some partners',
      capitalRequirement: 'Capital required if structured with share capital',
      timeline: '1-2 weeks',
      liability: 'Varies by partner type',
      suitableFor: 'Flexible business structures'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }],
    requirements: [
      'Valid identification documents for shareholders and directors',
      'Registered business address in Portugal (mandatory)',
      'Drafting and notarization of Articles of Association',
      'Bank deposit receipt for share capital',
      'Registration with Portuguese Commercial Registry',
      'Tax and social security registrations',
      'UBO registration as per EU transparency laws'
    ],
    registrationSteps: [
      'Reserve company name at Portuguese Trade Registry',
      'Draft and notarize Articles of Association',
      'Open business bank account and deposit required capital',
      'Submit incorporation documents to Commercial Registry',
      'Receive Certificate of Incorporation and registration number',
      'Register for VAT and corporate taxes with Portuguese Tax Authority',
      'Register employees for social security if applicable',
      'Commence business operations'
    ]
  },
  romania: {
    name: 'Romania',
    flag: '🇷🇴',
    color: '#ED2939',
    processingTime: '1-3 weeks',
    complexity: 'Moderate',
    capitalRequirement: 'RON 1 (~€0.20) minimum for SRL (Limited Liability Company); RON 90,000 (~€18,000) minimum for SA (Joint-Stock Company)',
    registrationFee: 'Approx. RON 600-1,200 depending on company type and complexity',
    mainEntityType: 'SRL (Societate cu Răspundere Limitată – Limited Liability Company), SA (Societate pe Acțiuni – Joint-Stock Company)',
    secondaryEntityType: 'Limited Partnership (SCS), General Partnership (SNC), Sole Proprietorship (PFA), Branch Office',
    benefits: [
      'Strategic location bridging Eastern and Western Europe',
      'Competitive corporate tax system with incentives for small businesses',
      'Access to EU single market with Schengen membership since 2024',
      'Skilled labor force with relatively low operational costs',
      'Government incentives supporting technology and innovation sectors'
    ],
    statistics: {
      easeOfBusiness: 'Growing business hub with improving registration efficiency',
      corporateTax: 'Standard 16%; micro-enterprise tax 1%-3% depending on payroll',
      foreignCompanies: 'Large number, benefiting from EU access and low taxes',
      processingDays: '14'
    },
    entityStructures: [{
      name: 'SRL (Limited Liability Company)',
      description: 'Most popular business form in Romania',
      capitalRequirement: 'Minimum capital: RON 1',
      timeline: '1-2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, small to medium businesses'
    }, {
      name: 'SA (Joint-Stock Company)',
      description: 'Suitable for larger businesses requiring share capital financing',
      capitalRequirement: 'Minimum capital: RON 90,000',
      timeline: '2-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, listed companies'
    }, {
      name: 'Limited Partnership (SCS)',
      description: 'Partners with limited and unlimited liability',
      capitalRequirement: 'No minimum capital requirement',
      timeline: '1-2 weeks',
      liability: 'Varies by partner type',
      suitableFor: 'Family businesses and investment ventures'
    }, {
      name: 'General Partnership (SNC)',
      description: 'Partners with unlimited liability',
      capitalRequirement: 'No minimum capital requirement',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Professional partnerships and small businesses'
    }, {
      name: 'Sole Proprietorship (PFA)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: '1 week',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }, {
      name: 'Branch Office',
      description: 'Foreign company extension without legal independence',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }],
    requirements: [
      'Valid ID or passport for shareholders and directors',
      'Registered physical business address in Romania (mandatory)',
      'Articles of Association drafting and notarization',
      'Bank deposit receipt for share capital (SRL and SA)',
      'Registration with National Trade Register Office (ONRC)',
      'Tax identification number (CUI) and VAT registration where applicable',
      'Social security registration for employees',
      'UBO registration per EU transparency rules'
    ],
    registrationSteps: [
      'Reserve and register company name with Trade Register',
      'Prepare and notarize Articles of Association',
      'Open bank account and deposit minimum share capital',
      'File registration documents with Trade Register Office (ONRC)',
      'Obtain Certificate of Incorporation and unique registration code (CUI)',
      'Register for VAT and corporate taxes with Romanian tax authorities (ANAF)',
      'Register employees with Social Security (Casa de Asigurări Sociale) if applicable',
      'Commence business activities'
    ]
  },
  slovakia: {
    name: 'Slovakia',
    flag: '🇸🇰',
    color: '#0072CE',
    processingTime: 'Approximately 1 week',
    complexity: 'Moderate',
    capitalRequirement: '€5,000 minimum for Private Limited Liability Company (s.r.o.); minimum €25,000 for Public Limited Company (a.s.)',
    registrationFee: 'Approx. €150 plus legal and notary fees',
    mainEntityType: 's.r.o. (Private Limited Liability Company), a.s. (Public Limited Company)',
    secondaryEntityType: 'General Partnership, Limited Partnership, Sole Proprietorship, Branch Office',
    benefits: [
      'Strategic Central European location with EU and Schengen access',
      'Competitive corporate tax rates with a tiered system',
      'Highly skilled multilingual workforce at competitive costs',
      'Active government support for innovation, R&D, and investment incentives',
      'Robust infrastructure and logistics network'
    ],
    statistics: {
      easeOfBusiness: 'Efficient registration process with electronic options',
      corporateTax: '21% standard; 10% reduced rate for incomes under €100,000 (in 2025)',
      foreignCompanies: 'Many foreign investors attracted by central location and EU membership',
      processingDays: '7'
    },
    entityStructures: [{
      name: 's.r.o. (Private Limited Liability Company)',
      description: 'Most common form for SMEs and startups',
      capitalRequirement: 'Minimum capital €5,000 with at least €750 per shareholder paid up',
      timeline: 'Approx. 1 week',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, small and medium businesses'
    }, {
      name: 'a.s. (Public Limited Company)',
      description: 'Suitable for larger enterprises and public offerings',
      capitalRequirement: 'Minimum capital €25,000',
      timeline: '2-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large companies, stock market participants'
    }, {
      name: 'General Partnership (verejná obchodná spoločnosť)',
      description: 'Partners have unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Professional partnerships and small businesses'
    }, {
      name: 'Limited Partnership (komanditná spoločnosť)',
      description: 'Combination of general (unlimited liability) and limited partners',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Varies by partner type',
      suitableFor: 'Family businesses and venture partnerships'
    }, {
      name: 'Sole Proprietorship (živnosť)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }, {
      name: 'Branch Office',
      description: 'Foreign company extension without separate legal personality',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }],
    requirements: [
      'Valid ID or passport copies for shareholders and directors',
      'Registered business address in Slovakia (mandatory)',
      'Notarized Memorandum of Association and Articles of Association for s.r.o. or Deed for a.s.',
      'Bank confirmation of share capital deposit',
      'Registration with the Commercial Register',
      'Tax identification and VAT registration as needed',
      'Social and health insurance registration for employees',
      'UBO registration complying with EU transparency requirements'
    ],
    registrationSteps: [
      'Check and reserve company name at Commercial Register',
      'Draft and notarize founding documents (Articles/Deed)',
      'Open bank account and deposit minimum share capital',
      'Submit registration documents to Commercial Register',
      'Obtain Business Identification Number',
      'Register for VAT and corporate taxes with Slovak Tax Authorities',
      'Register employees with Social Insurance Agency',
      'Begin business operations'
    ]
  },
  slovenia: {
    name: 'Slovenia',
    flag: '🇸🇮',
    color: '#0056A4',
    processingTime: '3-7 days (digital registration), up to 1 week via traditional process',
    complexity: 'Moderate',
    capitalRequirement: '€7,500 minimum for d.o.o. (Private Limited Liability Company); €25,000 minimum for d.d. (Public Limited Company)',
    registrationFee: 'Approx. €200-€400 depending on company type and service method',
    mainEntityType: 'd.o.o. (Družba z omejeno odgovornostjo – Limited Liability Company), d.d. (Delniška družba – Public Limited Company)',
    secondaryEntityType: 'Sole Proprietorship (s.p.), General Partnership, Limited Partnership, Branch Office',
    benefits: [
      'Access to EU Single Market and Eurozone',
      'Competitive corporate tax rates with government incentives for R&D and startups',
      'Highly skilled and multilingual workforce',
      'Strong legal framework aligned with EU law',
      'Modern digital registration system for efficient incorporation'
    ],
    statistics: {
      easeOfBusiness: 'Fast electronic registration available via e-VEM portal',
      corporateTax: 'Standard 22% (temporarily increased from 19% during 2024-2028)',
      foreignCompanies: 'Many registered with 100% foreign ownership allowed',
      processingDays: '5'
    },
    entityStructures: [{
      name: 'd.o.o. (Private Limited Company)',
      description: 'Most common entity for SMEs and startups',
      capitalRequirement: 'Minimum capital €7,500 (25% to be paid upfront)',
      timeline: '3-7 days electronically',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, family businesses, startups'
    }, {
      name: 'd.d. (Public Limited Company)',
      description: 'Suitable for larger businesses and stock market ventures',
      capitalRequirement: 'Minimum capital €25,000',
      timeline: '2-3 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'Large enterprises, publicly listed companies'
    }, {
      name: 'Sole Proprietorship (s.p.)',
      description: 'Individual business with unlimited liability',
      capitalRequirement: 'No capital requirement',
      timeline: '1-2 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Individual entrepreneurs'
    }, {
      name: 'General Partnership',
      description: 'Unlimited liability partners',
      capitalRequirement: 'No minimum capital',
      timeline: '1-2 weeks',
      liability: 'Unlimited personal liability',
      suitableFor: 'Professional partnerships'
    }, {
      name: 'Limited Partnership',
      description: 'Mix of general and limited liability partners',
      capitalRequirement: 'No minimum capital',
      timeline: '1-2 weeks',
      liability: 'Varies by partner type',
      suitableFor: 'Flexible business structures'
    }, {
      name: 'Branch Office',
      description: 'Extension of foreign parent company',
      capitalRequirement: 'No capital requirement',
      timeline: 'Approx. 7-10 days',
      liability: 'Parent company liable',
      suitableFor: 'Market presence and testing'
    }],
    requirements: [
      'Valid ID/passports for shareholders and directors',
      'Registered office address in Slovenia mandatory',
      'Articles of Association drafting and notarization',
      'Bank capital deposit confirmation (for d.o.o. and d.d.)',
      'Registration with Slovenian Business Register at AJPES or via e-VEM portal',
      'Tax and social security registration',
      'UBO registration per EU transparency rules'
    ],
    registrationSteps: [
      'Obtain Slovenian tax identification number for shareholders and directors',
      'Reserve company name via Slovenian Business Register',
      'Draft and notarize founding documents',
      'Open bank account and deposit share capital (for d.o.o. and d.d.)',
      'Submit registration to Business Register electronically or at SPOT centers',
      'Receive Certificate of Incorporation and registration number',
      'Register for VAT and corporate taxes',
      'Register employees with social security if applicable',
      'Commence business operations'
    ]
  },
  sweden: {
    name: 'Sweden',
    flag: '🇸🇪',
    color: '#006AA7',
    processingTime: '1-2 weeks',
    complexity: 'Moderate',
    capitalRequirement: 'SEK 25,000 (~€2,400) for Aktiebolag (AB, Limited Liability Company)',
    registrationFee: 'Approx. SEK 2,200 (~€210)',
    mainEntityType: 'Aktiebolag (AB), Handelsbolag (Partnership), Enskild Firma (Sole Proprietorship)',
    secondaryEntityType: 'Branch Office',
    benefits: [
      'Strategic geographic location in Scandinavia with access to EU and Nordic markets',
      'Competitive corporate tax rate with extensive tax treaties',
      'Strong innovation ecosystem and startup-friendly environment',
      'Highly skilled multilingual workforce',
      'Advanced digital infrastructure and government support for digitalization'
    ],
    statistics: {
      easeOfBusiness: 'Highly digitalized registration process',
      corporateTax: '20.6% (2025)',
      foreignCompanies: 'Many international firms locally incorporated',
      processingDays: '7'
    },
    entityStructures: [{
      name: 'Aktiebolag (AB - Limited Liability Company)',
      description: 'Most common business entity for startups and SMEs',
      capitalRequirement: 'Minimum SEK 25,000 share capital',
      timeline: '1-2 weeks',
      liability: 'Limited to share capital',
      suitableFor: 'SMEs, startups, joint ventures'
    }, {
      name: 'Enskild Firma (Sole Proprietorship)',
      description: 'Individual business, unlimited liability',
      capitalRequirement: 'No minimum capital',
      timeline: '1-2 days',
      liability: 'Unlimited personal liability',
      suitableFor: 'Sole entrepreneurs and freelancers'
    }, {
      name: 'Handelsbolag (Partnership)',
      description: 'Partnership with shared liability among partners',
      capitalRequirement: 'No minimum capital',
      timeline: '1-2 weeks',
      liability: 'Shared liability among partners',
      suitableFor: 'Small to medium business collaborations'
    }, {
      name: 'Branch Office',
      description: 'Extension of a foreign parent company',
      capitalRequirement: 'No capital requirement',
      timeline: '1-3 weeks',
      liability: 'Parent company liable',
      suitableFor: 'Market entry and testing'
    }],
    requirements: [
      'Valid ID or passport for shareholders and directors',
      'Business address in Sweden (physical address required)',
      'Draft Articles of Association (notarization optional)',
      'Share capital deposit receipt from a Swedish bank (for AB)',
      'Registration with Swedish Companies Registration Office (Bolagsverket)',
      'Tax registration and VAT registration with Swedish Tax Agency (Skatteverket)',
      'Social security registration for employees',
      'UBO (Ultimate Beneficial Owner) disclosure as per EU regulations'
    ],
    registrationSteps: [
      'Reserve your company name via Bolagsverket',
      'Prepare and submit Articles of Association and registration forms',
      'Deposit share capital in a Swedish bank account (for AB)',
      'Submit registration documents to Bolagsverket',
      'Obtain registration confirmation and corporate registration number',
      'Register for VAT and corporate taxes',
      'Register employees with social security agencies if applicable',
      'Start business operations'
    ]
  }
};
// Default country data
const DEFAULT_COUNTRY_DATA = {
  name: 'EU Country',
  flag: '🇪🇺',
  color: '#004494',
  processingTime: '10-15 business days',
  complexity: 'Medium',
  capitalRequirement: 'Varies',
  registrationFee: '€495',
  mainEntityType: 'Limited Liability Company',
  secondaryEntityType: 'Branch Office',
  benefits: ['Access to EU single market', 'European business presence', 'EU regulatory compliance', 'Gateway to European expansion'],
  statistics: {
    easeOfBusiness: 'Varies',
    corporateTax: 'Varies',
    foreignCompanies: '5,000+',
    processingDays: '12'
  },
  entityStructures: [{
    name: 'Limited Liability Company',
    description: 'Standard limited liability company',
    capitalRequirement: 'Varies by country',
    timeline: '7-15 days',
    liability: 'Limited to share capital',
    suitableFor: 'Most business activities'
  }, {
    name: 'Branch Office',
    description: 'Extension of foreign company',
    capitalRequirement: 'None',
    timeline: '5-10 days',
    liability: 'Parent company fully liable',
    suitableFor: 'Testing the market before full entry'
  }],
  requirements: ['Valid passport/ID for all directors', 'Proof of address for directors', 'Articles of association', 'Additional documents vary by country'],
  registrationSteps: ['Digital onboarding and KYC verification', 'Document submission', 'Legal formalization (varies by country)', 'Business registry registration', 'Tax registration']
};
// Add after DEFAULT_COUNTRY_DATA and before the component
const registrationProgress = {
  status: 'in-progress',
  steps: [{
    id: 1,
    name: 'Document Collection',
    date: 'June 10, 2024',
    completed: true
  }, {
    id: 2,
    name: 'Document Processing',
    date: 'June 11, 2024',
    completed: false
  }, {
    id: 3,
    name: 'Official Filing',
    date: 'June 12, 2024',
    completed: false
  }, {
    id: 4,
    name: 'Registration Complete',
    date: 'June 13, 2024',
    completed: false
  }]
};
const documents = [{
  id: 1,
  name: 'Certificate of Incorporation',
  date: 'June 10, 2024',
  status: 'available'
}, {
  id: 2,
  name: 'Articles of Association',
  date: 'Pending',
  status: 'pending'
}, {
  id: 3,
  name: 'Company Extract',
  date: 'Pending',
  status: 'pending'
}, {
  id: 4,
  name: 'VAT Registration',
  date: 'Pending',
  status: 'pending'
}];
const generalFaqs = [{
  question: 'How long does it take to form a company in the EU?',
  answer: 'Formation times vary by country, typically ranging from 3-5 business days in the Netherlands to 10-15 days in other EU countries. Our expedited services can reduce these timeframes in many jurisdictions.'
}, {
  question: 'What are the minimum capital requirements?',
  answer: 'Capital requirements vary significantly across the EU. Some countries like the Netherlands require as little as €0.01, while others like Germany require €25,000 for a GmbH. Our country selector provides specific information for each jurisdiction.'
}, {
  question: 'Do I need to be physically present to form a company?',
  answer: 'No, our digital-first approach allows you to complete the entire process remotely for all EU countries. We handle all local paperwork and filings on your behalf.'
}, {
  question: 'What documents are required?',
  answer: 'Generally, you will need proof of identity (passport/ID), proof of address, and if applicable, corporate documents of the parent company. Specific requirements vary by country and can be viewed in our detailed country guides.'
}, {
  question: 'Can I open a business bank account remotely?',
  answer: 'Yes, we have partnerships with various EU banks that allow for remote account opening. The process and requirements vary by country and banking institution.'
}, {
  question: 'What ongoing compliance requirements will my company have?',
  answer: 'All EU companies have annual filing requirements, including financial statements and tax returns. Specific requirements vary by country, company type, and size. Our compliance calendar tool helps you track all deadlines.'
}];
// Country-specific FAQs
const countryFaqs = {
  netherlands: [{
    question: 'What is the difference between a Legal Entity and a Branch Office?',
    answer: 'A Legal Entity is a separate legal entity with limited liability protection for shareholders, while a Branch Office is an extension of your existing company without separate legal status. Legal Entities offer better liability protection but have more formal requirements.'
  }, {
    question: 'How does the Dutch tax system work for companies?',
    answer: 'The Netherlands has a corporate tax rate of 15% on the first €395,000 of profits and 25.8% on profits exceeding that amount. The country is known for its extensive tax treaty network and favorable holding company regime.'
  }, {
    question: 'What is the UBO register in the Netherlands?',
    answer: 'The UBO (Ultimate Beneficial Owner) register requires all Dutch companies to register individuals who ultimately own or control the company (25% or more ownership/voting rights). This information must be registered with the Chamber of Commerce.'
  }],
  germany: [{
    question: 'What are the different business structures available in Germany?',
    answer: 'Germany offers several business structures: GmbH (most popular, requires €25,000 capital), UG or "mini-GmbH" (can start with €1), AG (public company, requires €50,000), and Branch Offices for foreign companies. Each has different capital requirements and legal obligations.'
  }, {
    question: 'What is the complete registration process for a German company?',
    answer: 'The process includes: selecting business structure and reserving name, preparing Articles of Association in German, notarizing documents before a German notary, opening a German bank account and depositing share capital, obtaining capital confirmation from bank, registering in Commercial Register (Handelsregister), registering at Trade Office (Gewerbeamt), registering for tax (tax number, VAT registration), registering with social security if hiring employees, and receiving company certificate and extracts.'
  }, {
    question: 'What is the difference between Legal Entity and Branch Office in Germany?',
    answer: 'GmbH/UG/AG are separate legal entities with liability protections; branch offices are part of foreign parent companies with full liability for the parent. Legal entities offer better liability protection but have more formal requirements.'
  }, {
    question: 'How does the German tax system work for companies?',
    answer: 'Corporate tax rate is 15% plus 5.5% solidarity surcharge. Municipal trade tax ranges from 7-17%. VAT rate is 19% standard (7% for some goods). Many double tax treaties and R&D tax incentives are available.'
  }, {
    question: 'What is the UBO register in Germany?',
    answer: 'All German companies must disclose their Ultimate Beneficial Owners (UBOs)—those with at least 25% shares or voting rights—to the Transparency Register.'
  }, {
    question: 'Do I need to be physically present in Germany to form a company?',
    answer: 'Physical presence is not always required for company formation, but bank account setup may necessitate it. Foreign nationals can own 100% of a German company, and we can provide local nominee directors as a solution while you arrange your residence status.'
  }, {
    question: 'What are the ongoing compliance requirements for German companies?',
    answer: 'German companies must maintain a registered address, comply with corporate and reporting laws, file annual financial statements, pay corporate income tax and trade tax (Gewerbesteuer), and meet employment regulations if hiring. The effective corporate tax rate is approximately 30-33%.'
  }, {
    question: 'How long does the German company formation process take?',
    answer: 'The complete process typically takes 10-20 business days (can be 2-3 weeks with complete documents), but delays may occur due to documentation, translation, or banking procedures. Registration fees vary from €500-€2,000 depending on company form and region.'
  }],
  france: [{
    question: 'What are the minimum capital requirements for French companies?',
    answer: 'SARL/SAS: €1; SA: €37,000 (deposit 1/5th on registration); higher if regulated activity. The minimum capital can be as low as €1 for most business structures.'
  }, {
    question: 'Is foreign ownership allowed in French companies?',
    answer: '100% foreign ownership allowed for SARL, SAS, SA. No local residency required for directors/shareholders. Foreign nationals can fully own and manage French companies.'
  }, {
    question: 'What is the typical timeline for French company formation?',
    answer: '1-4 weeks typical; SARL/SAS often completed in 2 weeks. The process can be faster with complete documentation and proper preparation.'
  }, {
    question: 'How does the French tax system work for companies?',
    answer: 'Corporate tax 25%. VAT 20% (reduced rates apply). Dividends: 25% withholding. Various tax incentives for R&D, startups, priority sectors.'
  }, {
    question: 'What is the UBO register requirement in France?',
    answer: 'All French entities must declare their UBO (persons with ≥25% share/voting rights), filed with authorities for transparency.'
  }, {
    question: 'What is the difference between SAS and SARL in France?',
    answer: 'An SAS (Société par Actions Simplifiée) offers more flexibility in governance and is suitable for companies seeking external investment. A SARL (Société à Responsabilité Limitée) has a more rigid structure but simpler governance, making it suitable for smaller businesses.'
  }, {
    question: 'What are the requirements for a registered office in France?',
    answer: 'Every French company must have a physical registered address in France. We offer virtual office services with a prestigious Paris address that fulfills all legal requirements.'
  }, {
    question: 'How does the French social security system affect employers?',
    answer: 'French employers must pay substantial social security contributions (approximately 40-45% of gross salary). These cover health insurance, pension, unemployment, and other social benefits for employees.'
  }],
  spain: [{
    question: 'What are the minimum capital requirements for different Spanish entities?',
    answer: 'SL requires €3,000 minimum; SA requires €60,000, with 25% paid on incorporation. The SL is the most popular choice for small to medium businesses due to its lower capital requirement.'
  }, {
    question: 'Is foreign ownership allowed in Spanish companies?',
    answer: '100% foreign ownership allowed. No residency requirement for directors or shareholders. Foreign nationals can fully own and manage Spanish companies without any local participation requirements.'
  }, {
    question: 'What is the typical registration timeline for Spanish companies?',
    answer: 'SL can be registered within 1-3 weeks, SA may take slightly longer (3-4 weeks). The process is efficient thanks to Spain\'s electronic registration system (Registro Mercantil Central).'
  }, {
    question: 'How does the Spanish tax system work for companies?',
    answer: 'Corporate tax is 25%, but SMEs enjoy reduced rates on first €300,000 profits. Standard VAT rate is 21%. Spain offers various regional grants and R&D incentives for qualifying businesses.'
  }, {
    question: 'What is the UBO register requirement in Spain?',
    answer: 'Companies must register Ultimate Beneficial Owners with over 25% ownership or voting rights in the Mercantile Registry for transparency. This is mandatory for all Spanish companies.'
  }, {
    question: 'What is the difference between SL and SA in Spain?',
    answer: 'An SL (Sociedad Limitada) requires €3,000 minimum capital and is suitable for small to medium businesses. An SA (Sociedad Anónima) requires €60,000 minimum capital and is designed for larger businesses or those planning to go public.'
  }, {
    question: 'What is the process for obtaining a NIF in Spain?',
    answer: 'The NIF (Número de Identificación Fiscal) is the tax identification number for Spanish companies. It starts as provisional when you form your company and becomes permanent once all formation steps are completed. We handle the entire application process.'
  }, {
    question: 'Are there regional differences in company formation in Spain?',
    answer: 'Yes, Spain has 17 autonomous communities with varying regional regulations. These can affect aspects like regional taxes, grants, and specific business permits. Our service includes guidance on regional specificities based on your chosen location.'
  }],
  italy: [{
    question: 'What are the minimum capital requirements for SRL and SPA in Italy?',
    answer: 'SRL can start with €1; SPA requires minimum €50,000 with 25% paid upfront. The SRL is the most popular choice for small to medium businesses due to its lower capital requirement.'
  }, {
    question: 'Is foreign ownership allowed in Italian companies?',
    answer: 'No restriction on foreign ownership; directors need not be Italian residents. 100% foreign ownership permitted for all company types including SRL and SPA.'
  }, {
    question: 'What is the typical processing time for Italian company formation?',
    answer: 'Incorporation takes approximately 1 to 3 weeks depending on documents and type. SRL typically takes 1-3 weeks, while SPA may take 2-4 weeks due to higher capital requirements.'
  }, {
    question: 'How does the Italian tax system work for companies?',
    answer: 'Corporate tax rate of 24% (IRES), local IRAP tax additional (~3.9%), VAT standard rate 22%. Italy offers tax incentives for innovative startups and SMEs.'
  }, {
    question: 'What is the UBO register requirement in Italy?',
    answer: 'Companies must register Ultimate Beneficial Owners in compliance with Italian transparency laws. UBO declaration required for those with ≥25% ownership/voting rights.'
  }, {
    question: 'What is the difference between SRL and SPA in Italy?',
    answer: 'SRL (Società a Responsabilità Limitata) is for small to medium businesses with minimum €1 capital. SPA (Società per Azioni) is for larger entities that can issue shares publicly, requiring minimum €50,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Italy?',
    answer: 'Every Italian company must have a physical registered address in Italy. We offer virtual office services with prestigious Italian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Italian social security system affect employers?',
    answer: 'Italian employers must register for social security and insurance if employing staff. The system includes health insurance, pension, and other social benefits for employees.'
  }],
  belgium: [{
    question: 'What are the capital requirements for Belgian companies?',
    answer: 'BV must have minimum capital of €18,550 with justified start-up capital; NV must have €61,500. The 2019 reform made BV formation more flexible with lower capital thresholds.'
  }, {
    question: 'Is foreign ownership allowed in Belgian companies?',
    answer: 'No restrictions on nationality of shareholders or directors; directors can be non-residents. 100% foreign ownership allowed for all company types including BV and NV.'
  }, {
    question: 'What is the typical registration timeline for Belgian companies?',
    answer: 'Business registration can be completed within 5-10 business days typically. BV formation takes 1-2 weeks, while NV may take 2-3 weeks due to higher capital requirements.'
  }, {
    question: 'How does the Belgian tax system work for companies?',
    answer: 'Corporate tax standard rate is 25%, with some preferential rates for SMEs and R&D incentives. VAT rate is 21%. Belgium offers various tax incentives for R&D and startups.'
  }, {
    question: 'What is the UBO register requirement in Belgium?',
    answer: 'Ultimate Beneficial Owners owning 25%+ must be recorded in UBO Register, accessible to Belgian authorities for transparency. This is mandatory for all Belgian companies.'
  }, {
    question: 'What is the difference between BV and NV in Belgium?',
    answer: 'BV (Besloten Vennootschap) is for small to medium businesses with minimum €18,550 capital. NV (Naamloze Vennootschap) is for larger entities that can issue shares publicly, requiring minimum €61,500 capital.'
  }, {
    question: 'What are the requirements for a registered office in Belgium?',
    answer: 'Every Belgian company must have a physical registered address in Belgium. We offer virtual office services with prestigious Belgian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Belgian social security system affect employers?',
    answer: 'Belgian employers must register for social security if hiring employees. The system includes health insurance, pension, and other social benefits for employees.'
  }],
  ireland: [{
    question: 'What is the minimum capital requirement for Irish companies?',
    answer: 'Usually €1 for LTD; €25,000 for PLC (with 25% paid up). The LTD is the most popular choice for small to medium businesses due to its minimal capital requirement.'
  }, {
    question: 'Can foreigners fully own an Irish company?',
    answer: 'Yes, 100% foreign ownership is allowed with no local director requirement. No residency requirement for directors or shareholders.'
  }, {
    question: 'How fast is the Irish company registration process?',
    answer: 'Typically 3-5 business days online with complete documents. The process is simple and fast through the online Companies Registration Office (CRO) system.'
  }, {
    question: 'What are the corporate tax rates in Ireland?',
    answer: '12.5% standard rate for trading income, 25% for non-trading income. Ireland offers one of the most attractive corporate tax rates in the EU.'
  }, {
    question: 'What is required for Irish company compliance?',
    answer: 'Annual returns to CRO, financial statements, and tax filings. Companies must maintain proper records and file annual returns with the Companies Registration Office.'
  }, {
    question: 'What is the difference between LTD and PLC in Ireland?',
    answer: 'LTD (Private Company Limited by Shares) is for most business types with minimum €1 capital. PLC (Public Limited Company) is for larger companies seeking to trade publicly, requiring minimum €25,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Ireland?',
    answer: 'Every Irish company must have a physical registered address in Ireland. We offer virtual office services with prestigious Irish addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Irish employment system work for companies?',
    answer: 'Irish companies must register for PAYE/PRSI if hiring employees. The system includes social insurance contributions and employment law compliance.'
  }],
  austria: [{
    question: 'What is the minimum capital requirement for Austrian companies?',
    answer: 'GmbH requires €35,000 with €17,500 minimum paid up; AG requires €70,000 with 25% minimum payment at registration. The GmbH is the most popular choice for small to medium businesses.'
  }, {
    question: 'Can foreigners fully own Austrian companies?',
    answer: 'Yes, no restrictions on foreign ownership or nationality of directors. 100% foreign ownership permissible for all company types including GmbH and AG.'
  }, {
    question: 'How long does Austrian company registration take?',
    answer: 'Typically 1 to 3 weeks depending on readiness of documentation and payment. GmbH formation takes 1-3 weeks, while AG may take 2-4 weeks due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in Austria?',
    answer: 'Corporate tax is 25%; local trade tax (Kommunalsteuer) might apply (~3%). VAT is usually 20%. Austria offers favorable tax treaties and R&D incentives.'
  }, {
    question: 'What is the UBO register requirement in Austria?',
    answer: 'Disclosure of Ultimate Beneficial Owners owning 25% or more is mandatory, maintained in the Transparency Register. This is required for all Austrian companies.'
  }, {
    question: 'What is the difference between GmbH and AG in Austria?',
    answer: 'GmbH (Private Limited Company) is for SMEs and startups with minimum €35,000 capital. AG (Public Limited Company) is for larger companies and stock market participants, requiring minimum €70,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Austria?',
    answer: 'Every Austrian company must have a physical registered office in Austria. We offer virtual office services with prestigious Austrian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Austrian social security system affect employers?',
    answer: 'Austrian companies must register for social security if employing staff. The system includes health insurance, pension, and other social benefits for employees.'
  }],
  bulgaria: [{
    question: 'What is the minimum capital requirement for Bulgarian companies?',
    answer: 'For OOD, minimum share capital is BGN 2 (~€1). For AD, it is BGN 50,000 (~€25,500). The OOD is the most popular choice due to its minimal capital requirement.'
  }, {
    question: 'Can foreigners fully own Bulgarian companies?',
    answer: 'Yes, there are no restrictions on foreign ownership. 100% foreign ownership is permitted for all company types including OOD and AD.'
  }, {
    question: 'How long does Bulgarian company registration take?',
    answer: 'Usually 5-10 business days with complete documentation. OOD registration typically takes 5-10 days, while AD may take 10+ days due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in Bulgaria?',
    answer: 'Flat corporate tax rate of 10% and VAT standard rate at 20%. Bulgaria offers the lowest corporate tax rate in the EU at 10%.'
  }, {
    question: 'What is the UBO register requirement in Bulgaria?',
    answer: 'Bulgarian companies must register Ultimate Beneficial Owners with 25% or more ownership or control. This is mandatory for transparency and compliance.'
  }, {
    question: 'What is the difference between OOD and AD in Bulgaria?',
    answer: 'OOD (Limited Liability Company) is for SMEs and startups with minimum BGN 2 capital. AD (Joint Stock Company) is for larger enterprises needing to raise capital, requiring minimum BGN 50,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Bulgaria?',
    answer: 'Every Bulgarian company must have a physical registered office in Bulgaria. We offer virtual office services with prestigious Bulgarian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Bulgarian tax system work for companies?',
    answer: 'Bulgarian companies must register with the National Revenue Agency for taxes and social security. The system includes VAT registration if threshold exceeded and ongoing tax compliance.'
  }],
  croatia: [{
    question: 'What is the minimum capital requirement for Croatian companies?',
    answer: 'd.o.o. requires HRK 10,000 minimum (~€1,300); d.d. requires HRK 200,000 (~€26,500). The d.o.o. is the most popular choice for SMEs due to its lower capital requirement.'
  }, {
    question: 'Can foreigners fully own Croatian companies?',
    answer: 'Yes, 100% foreign ownership is permitted without restrictions. Full foreign ownership allowed for all company types including d.o.o. and d.d.'
  }, {
    question: 'How long does Croatian company registration take?',
    answer: 'Typically 7-14 days for most companies; branches may take slightly less. d.o.o. registration takes 7-14 days, while d.d. may take 14-21 days due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in Croatia?',
    answer: 'Corporate tax at 18%, VAT standard rate is 25%. Croatia offers a competitive corporate tax rate and access to EU market with increasing FDI incentives.'
  }, {
    question: 'What is the UBO register requirement in Croatia?',
    answer: 'Companies must register Ultimate Beneficial Owners (25% or more ownership or control) for transparency purposes. This is mandatory for all Croatian companies.'
  }, {
    question: 'What is the difference between d.o.o. and d.d. in Croatia?',
    answer: 'd.o.o. (Limited Liability Company) is for SMEs and startups with minimum HRK 10,000 capital. d.d. (Joint Stock Company) is for larger companies able to raise capital through shares, requiring minimum HRK 200,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Croatia?',
    answer: 'Every Croatian company must have a physical registered office in Croatia. We offer virtual office services with prestigious Croatian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Croatian tax system work for companies?',
    answer: 'Croatian companies must register with tax authorities and social security. The system includes VAT registration if applicable and ongoing tax administration and social security obligations.'
  }],
  cyprus: [{
    question: 'What is the minimum capital requirement for Cypriot companies?',
    answer: '€1,000 minimum for LTD; €25,629 for PLC. The LTD is the most popular choice for SMEs due to its lower capital requirement and simple structure.'
  }, {
    question: 'Can foreigners own Cypriot companies entirely?',
    answer: 'Yes, 100% foreign ownership allowed, no residency needed. Full foreign ownership permitted for all company types with no restrictions on nationality of directors or shareholders.'
  }, {
    question: 'What is the usual registration timeline?',
    answer: 'Typically 3-7 working days, faster for simple LTDs. LTD registration takes 3-7 days, while PLC may take 7-14 days due to higher capital requirements.'
  }, {
    question: 'How does corporate taxation work in Cyprus?',
    answer: 'Flat 12.5% corporate tax rate, attractive for international businesses. Cyprus offers the lowest corporate tax rate in the EU at 12.5%, making it highly attractive for international business.'
  }, {
    question: 'Are UBO disclosures mandatory in Cyprus?',
    answer: 'Yes, beneficial owners holding 25% or more must be registered with authorities. UBO register compliance is mandatory for transparency and anti-money laundering purposes.'
  }, {
    question: 'What is the difference between LTD and PLC in Cyprus?',
    answer: 'LTD (Private Limited Company) is for SMEs and startups with minimum €1,000 capital. PLC (Public Limited Company) is for larger businesses seeking public funding, requiring minimum €25,629 capital.'
  }, {
    question: 'What are the requirements for a registered office in Cyprus?',
    answer: 'Every Cypriot company must have a physical registered office address in Cyprus. We offer virtual office services with prestigious Cypriot addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Cypriot employment system work for companies?',
    answer: 'Cypriot companies must register with Social Insurance Services if employing staff. The system includes social insurance contributions and employment law compliance for all employees.'
  }],
  czech: [{
    question: 'What is the minimum capital requirement for Czech companies?',
    answer: 's.r.o. requires CZK 1 (~€40); a.s. requires CZK 2 million (~€80k). The s.r.o. is the most popular choice for SMEs due to its extremely low capital requirement.'
  }, {
    question: 'Can foreigners fully own Czech companies?',
    answer: 'No restrictions on foreign ownership or directors\' residency. 100% foreign ownership allowed for all company types including s.r.o. and a.s.'
  }, {
    question: 'How long does Czech company registration take?',
    answer: 'Usually 7-14 business days, longer for larger a.s. companies. s.r.o. registration takes 7-14 days, while a.s. may take 14-21 days due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in the Czech Republic?',
    answer: 'Corporate income tax rate at 19%; VAT standard rate 21%. The Czech Republic offers competitive tax rates and access to EU markets with central European economy benefits.'
  }, {
    question: 'What is the UBO register requirement in the Czech Republic?',
    answer: 'Mandatory registration of Ultimate Beneficial Owners with significant ownership or control. UBO register compliance is required for persons with ≥25% ownership for transparency purposes.'
  }, {
    question: 'What is the difference between s.r.o. and a.s. in the Czech Republic?',
    answer: 's.r.o. (Limited Liability Company) is for SMEs and startups with minimum CZK 1 capital. a.s. (Joint Stock Company) is for large companies intending to raise capital, requiring minimum CZK 2,000,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in the Czech Republic?',
    answer: 'Every Czech company must have a physical registered office address in the Czech Republic. We offer virtual office services with prestigious Czech addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Czech employment system work for companies?',
    answer: 'Czech companies must register with social security and health insurance authorities if employing staff. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  denmark: [{
    question: 'What is the minimum capital requirement for Danish companies?',
    answer: 'DKK 40,000 for ApS; DKK 500,000 for A/S. The ApS is the most popular choice for SMEs due to its lower capital requirement and fast registration process.'
  }, {
    question: 'Can foreigners fully own Danish companies?',
    answer: 'Yes, 100% foreign ownership is allowed. No restrictions on foreign ownership for all company types including ApS and A/S.'
  }, {
    question: 'How fast is Danish company registration?',
    answer: 'Typically 1-3 business days online for ApS. The Danish system is known for its fast and simple online registration process with robust digital infrastructure.'
  }, {
    question: 'What are the tax rates in Denmark?',
    answer: 'Corporate tax at 22%; VAT standard rate 25%. Denmark offers competitive tax rates and access to Nordic and EU markets with a transparent legal system.'
  }, {
    question: 'Are UBO disclosures required in Denmark?',
    answer: 'Yes, beneficial owners owning 25% or more must be registered. UBO register compliance is mandatory for transparency and anti-money laundering purposes.'
  }, {
    question: 'What is the difference between ApS and A/S in Denmark?',
    answer: 'ApS (Private Limited Company) is for SMEs and startups with minimum DKK 40,000 capital. A/S (Public Limited Company) is for large companies wanting to list shares, requiring minimum DKK 500,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Denmark?',
    answer: 'Every Danish company must have a physical registered office in Denmark. We offer virtual office services with prestigious Danish addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Danish employment system work for companies?',
    answer: 'Danish companies must register for labor market and social security if hiring. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  estonia: [{
    question: 'What is the minimum share capital for Estonian companies?',
    answer: '€2,500 for OÜ (can be deferred for private companies), €25,000 for AS. The OÜ is the most popular choice for startups due to its flexible capital requirements and fast online registration.'
  }, {
    question: 'Can foreigners fully own Estonian companies?',
    answer: 'Yes, 100% foreign ownership is permitted with no local residency required. Estonia offers e-Residency for global entrepreneurs to manage companies remotely.'
  }, {
    question: 'How fast is Estonian company registration?',
    answer: 'Typically done within 1-3 business days, fully online. Estonia is renowned for its digital governance and efficient e-Business Register system.'
  }, {
    question: 'What is Estonia\'s taxation system like?',
    answer: 'Corporate tax is 20% only on distributed profits; retained profits are tax-exempt. This unique system encourages reinvestment and business growth.'
  }, {
    question: 'What digital advantages does Estonia offer?',
    answer: 'Full e-registration via state platform and e-Residency available worldwide. Estonia is a global leader in digital governance with transparent, digitally advanced business environment.'
  }, {
    question: 'What is the difference between OÜ and AS in Estonia?',
    answer: 'OÜ (Private Limited Company) is for SMEs and startups with minimum €2,500 capital. AS (Public Limited Company) is for larger companies able to raise capital on stock markets, requiring minimum €25,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Estonia?',
    answer: 'Every Estonian company must have a registered Estonian address (mandatory). We offer virtual office services with prestigious Estonian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Estonian employment system work for companies?',
    answer: 'Estonian companies must register social security if employing workers. The system includes comprehensive social security contributions and employment law compliance in a digitally advanced environment.'
  }],
  finland: [{
    question: 'Is minimum share capital mandatory for Finnish companies?',
    answer: 'For Oy (private limited), minimum share capital is now €1; Oyj requires €80,000. Since 2019, private limited companies no longer have mandatory €2,500 paid-up capital requirement.'
  }, {
    question: 'Are non-resident directors allowed in Finnish companies?',
    answer: 'Generally, at least one EEA resident director is required unless a permit is granted. This is a key requirement for Finnish company formation.'
  }, {
    question: 'How long is the Finnish incorporation process?',
    answer: 'Typically 3-4 weeks for Oy; longer for public companies. The process varies depending on company type and document readiness, with faster processing for small companies online.'
  }, {
    question: 'What are the tax rates in Finland?',
    answer: 'Corporate tax flat at 20%; VAT standard rate 24%. Finland offers competitive tax rates and access to Nordic and European markets with high legal and regulatory transparency.'
  }, {
    question: 'Can foreign nationals fully own Finnish companies?',
    answer: 'Yes, there are no restrictions on foreign ownership. 100% foreign ownership is allowed for all company types including Oy and Oyj.'
  }, {
    question: 'What is the difference between Oy and Oyj in Finland?',
    answer: 'Oy (Private Limited Company) is for SMEs and startups with minimum €1 capital. Oyj (Public Limited Company) is for larger enterprises listing on stock exchanges, requiring minimum €80,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Finland?',
    answer: 'Every Finnish company must have a registered Finnish business address. We offer virtual office services with prestigious Finnish addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Finnish employment system work for companies?',
    answer: 'Finnish companies must register for VAT, tax, and employments as applicable. The system includes comprehensive social security contributions and employment law compliance with strong governmental digital infrastructure.'
  }],
  greece: [{
    question: 'What is the minimum capital requirement for Greek companies?',
    answer: 'IKE requires minimum €4,500, AE requires €25,000. The IKE is the most popular choice for SMEs due to its flexible capital requirements and lower minimum threshold.'
  }, {
    question: 'Can foreigners fully own Greek companies?',
    answer: 'Yes, without restriction. 100% foreign ownership is allowed for all company types including IKE and AE, with access to EU single market and strategic Mediterranean location.'
  }, {
    question: 'How long does Greek company registration take?',
    answer: '7-15 business days depending on entity and document readiness. IKE registration takes 7-15 days, while AE may take 14-21 days due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in Greece?',
    answer: 'Corporate tax at 22%; VAT standard at 24%. Greece offers competitive tax rates and access to EU single market with EU legal protections and transparent corporate governance.'
  }, {
    question: 'Is UBO disclosure required in Greece?',
    answer: 'Yes, for owners above 25% beneficial ownership. Ultimate Beneficial Owners registration (UBO) is mandatory for transparency and compliance purposes.'
  }, {
    question: 'What is the difference between IKE and AE in Greece?',
    answer: 'IKE (Private Company) is for SMEs and startups with minimum €4,500 capital. AE (Public Limited Company) is for larger companies suited for stock issuance, requiring minimum €25,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Greece?',
    answer: 'Every Greek company must have a registered Greek business address. We offer virtual office services with prestigious Greek addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Greek employment system work for companies?',
    answer: 'Greek companies must register employees with social security institutions (EFKA) if hiring. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  hungary: [{
    question: 'What is the minimum required capital for Hungarian companies?',
    answer: 'Kft requires HUF 3 million (~€8,000); Rt requires HUF 5 million (~€13,000). The Kft is the most popular choice for SMEs due to its lower capital requirement and fast registration process.'
  }, {
    question: 'Are foreign nationals allowed full ownership of Hungarian companies?',
    answer: 'Yes, there are no limitations on foreign ownership. 100% foreign ownership is permitted without restrictions for all company types including Kft and Rt.'
  }, {
    question: 'How long does Hungarian company registration take?',
    answer: '3 to 7 days via electronic registration system. Kft registration takes 3-7 days, while Rt may take 7-14 days due to higher capital requirements.'
  }, {
    question: 'What are the tax rates in Hungary?',
    answer: 'Corporate tax is 9% flat rate (lowest in EU), VAT is 27% (highest in EU). Hungary offers the lowest corporate tax rate in the EU at 9%, making it highly attractive for international business.'
  }, {
    question: 'Do companies need to register their UBOs in Hungary?',
    answer: 'Yes, Ultimate Beneficial Owners with ≥25% ownership must be registered. UBO information registration is mandatory for transparency and compliance purposes.'
  }, {
    question: 'What is the difference between Kft and Rt in Hungary?',
    answer: 'Kft (Limited Liability Company) is for SMEs and startups with minimum HUF 3 million capital. Rt (Public Limited Company) is for large entities and stock market participants, requiring minimum HUF 5 million capital.'
  }, {
    question: 'What are the requirements for a registered office in Hungary?',
    answer: 'Every Hungarian company must have a registered Hungarian address. We offer virtual office services with prestigious Hungarian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Hungarian employment system work for companies?',
    answer: 'Hungarian companies must register for tax and social security authority registrations if hiring. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  latvia: [{
    question: 'What is the minimum capital requirement for Latvian companies?',
    answer: 'SIA requires €2,800 minimum capital; AS requires €35,000. The SIA is the most popular choice for SMEs due to its moderate capital requirements and straightforward registration process.'
  }, {
    question: 'Are foreigners allowed full ownership of Latvian companies?',
    answer: 'Yes, full foreign ownership is permitted with no residency requirements. 100% foreign ownership is allowed without restrictions for all company types including SIA and AS.'
  }, {
    question: 'How quickly is Latvian company registration?',
    answer: 'Normally 3-7 business days for SIA; longer for AS. Latvia offers a straightforward online registration process via Latvian Company Register with transparent legal framework aligned with EU standards.'
  }, {
    question: 'What are the tax rates in Latvia?',
    answer: 'Corporate tax is 20% on distributed profits; VAT at 21%. Latvia offers competitive tax rates and access to EU and Baltic markets with transparent legal framework.'
  }, {
    question: 'Is UBO disclosure mandatory in Latvia?',
    answer: 'Yes, UBOs with ≥25% ownership must be registered with authorities. UBO registration is mandatory for beneficial owners with ≥25% ownership for transparency and compliance purposes.'
  }, {
    question: 'What is the difference between SIA and AS in Latvia?',
    answer: 'SIA (Limited Liability Company) is for SMEs and entrepreneurs with minimum €2,800 capital. AS (Joint Stock Company) is for larger companies intending to raise capital publicly, requiring minimum €35,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Latvia?',
    answer: 'Every Latvian company must have a registered Latvian address (mandatory). We offer virtual office services with prestigious Latvian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Latvian employment system work for companies?',
    answer: 'Latvian companies must register employees with State Social Insurance Agency if hiring. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  lithuania: [{
    question: 'What is the minimum capital requirement for Lithuanian companies?',
    answer: 'UAB requires €2,500; AB requires €40,000. The UAB is the most popular choice for SMEs due to its moderate capital requirements and fast registration process.'
  }, {
    question: 'Are foreigners allowed to own 100% of Lithuanian companies?',
    answer: 'Yes, no restrictions on foreign ownership. 100% foreign ownership is permitted for all company types including UAB and AB.'
  }, {
    question: 'What is the typical registration time for Lithuanian companies?',
    answer: 'Normally 3-5 business days for UAB. Lithuania offers fast and reliable company registration via Lithuanian Centre of Registers with transparent legal and regulatory environment.'
  }, {
    question: 'What are the corporate tax rates in Lithuania?',
    answer: 'Corporate income tax at 15%. Lithuania offers competitive tax rates and strategic location in Baltic region with EU market access.'
  }, {
    question: 'Is UBO disclosure mandatory in Lithuania?',
    answer: 'Yes, beneficial owners with ≥25% ownership must be registered. UBO registration is mandatory for beneficial owners holding ≥25% for transparency and compliance purposes.'
  }, {
    question: 'What is the difference between UAB and AB in Lithuania?',
    answer: 'UAB (Private Limited Company) is for SMEs and startups with minimum €2,500 capital. AB (Public Limited Company) is for larger companies and stock issuance, requiring minimum €40,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Lithuania?',
    answer: 'Every Lithuanian company must have a registered office address in Lithuania. We offer virtual office services with prestigious Lithuanian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Lithuanian employment system work for companies?',
    answer: 'Lithuanian companies must register employees with State Social Insurance Fund Board if hiring. The system includes comprehensive social security contributions and employment law compliance.'
  }],
  luxembourg: [{
    question: 'What is the minimum capital requirement for Luxembourg companies?',
    answer: 'SARL requires €12,000 minimum capital; SA requires €31,000. The SARL is the most popular choice for SMEs due to its lower capital requirement and suitability for family businesses and startups.'
  }, {
    question: 'Can foreigners fully own Luxembourg companies?',
    answer: 'Yes, 100% foreign ownership allowed. Luxembourg offers a multilingual business environment (French, German, English) with modern and flexible company laws.'
  }, {
    question: 'How long does Luxembourg incorporation take?',
    answer: 'Usually 2-4 weeks depending on documentation and processing. SARL takes 2-4 weeks, while SA may take 3-4 weeks due to higher capital requirements.'
  }, {
    question: 'What is the corporate tax rate in Luxembourg?',
    answer: 'Combined rate approx. 24.94%, including municipal business tax. Luxembourg offers an attractive tax regime with extensive double tax treaties network.'
  }, {
    question: 'Is UBO disclosure mandatory in Luxembourg?',
    answer: 'Yes, as per EU directives, UBOs must be registered with the Register of Beneficial Owners. UBO registration is mandatory for transparency and compliance with EU transparency directive requirements.'
  }, {
    question: 'What is the difference between SARL and SA in Luxembourg?',
    answer: 'SARL (Private Limited Company) is for SMEs and startups with minimum €12,000 capital. SA (Public Limited Company) is for larger companies seeking capital market funding, requiring minimum €31,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Luxembourg?',
    answer: 'Every Luxembourg company must have a registered Luxembourg business address (mandatory). We offer virtual office services with prestigious Luxembourg addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Luxembourg employment system work for companies?',
    answer: 'Luxembourg companies must register employees with social security institutions if applicable. The system includes comprehensive social security contributions and employment law compliance in a multilingual business environment.'
  }],
  malta: [{
    question: 'What is the minimum capital requirement for Malta companies?',
    answer: 'Ltd requires €1,165 minimum capital (20% paid up); PLC requires approx. €46,600 (25% paid up). The Ltd is the most popular choice for SMEs due to its lower capital requirement and suitability for family businesses and startups.'
  }, {
    question: 'Can foreigners fully own Malta companies?',
    answer: 'Yes, 100% foreign ownership allowed. Malta offers a fully EU-compliant legal and tax framework with strong network of double tax treaties (70+ countries) and strategic location for EU and Mediterranean markets.'
  }, {
    question: 'How long does Malta incorporation take?',
    answer: 'Typically 1-2 weeks for Ltd; ~2 weeks for PLC. Malta offers a streamlined registration process favored by investors with business-friendly digital registration and support services.'
  }, {
    question: 'What is the corporate tax rate in Malta?',
    answer: 'Standard 35% with effective reductions to ~5% through refundable tax credits. Malta offers government incentives for R&D, IP and innovation, making it attractive for international businesses.'
  }, {
    question: 'Is UBO disclosure mandatory in Malta?',
    answer: 'Yes, UBO disclosure is mandatory as per EU transparency requirements. All companies must register their Ultimate Beneficial Owners with the Malta Business Registry for transparency and compliance.'
  }, {
    question: 'What is the difference between Ltd and PLC in Malta?',
    answer: 'Ltd (Private Limited Company) is for SMEs and startups with minimum €1,165 capital. PLC (Public Limited Company) is for larger companies requiring capital market access, requiring minimum approx. €46,600 capital.'
  }, {
    question: 'What are the requirements for a registered office in Malta?',
    answer: 'Every Malta company must have a registered business address in Malta (mandatory). We offer virtual office services with prestigious Maltese addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Malta employment system work for companies?',
    answer: 'Malta companies must register employees with social security institutions (Jobs Plus) if applicable. The system includes comprehensive social security contributions and employment law compliance in a business-friendly environment.'
  }],
  poland: [{
    question: 'What is the minimum capital requirement for Poland companies?',
    answer: 'Sp. z o.o requires PLN 5,000 minimum capital; S.A. requires PLN 100,000. The Sp. z o.o is the most popular choice for SMEs due to its lower capital requirement and suitability for startups and family businesses.'
  }, {
    question: 'Can foreigners fully own Poland companies?',
    answer: 'Yes, 100% foreign ownership allowed for all entity types. Poland offers a strategic location in Central Europe with access to EU and Eastern markets, competitive corporate tax rates, and a highly skilled workforce.'
  }, {
    question: 'How long does Poland incorporation take?',
    answer: 'Usually 1-3 weeks (faster via online S24 portal). Poland has a growing reputation for efficient registration and business environment with modern online company registration portal.'
  }, {
    question: 'What is the corporate tax rate in Poland?',
    answer: '19% standard CIT; 9% for eligible small taxpayers. Poland offers competitive corporate tax rates with reduced rates for small companies and government incentives and special economic zones.'
  }, {
    question: 'Is UBO disclosure mandatory in Poland?',
    answer: 'Yes, UBO registration is mandatory as per EU transparency directives. All companies must register their Ultimate Beneficial Owners with the National Court Register (KRS) for transparency and compliance.'
  }, {
    question: 'What is the difference between Sp. z o.o and S.A. in Poland?',
    answer: 'Sp. z o.o (Limited Liability Company) is for SMEs and startups with minimum PLN 5,000 capital. S.A. (Joint-Stock Company) is for larger enterprises requiring capital market access, requiring minimum PLN 100,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Poland?',
    answer: 'Every Poland company must have a registered physical office address in Poland (mandatory). We offer virtual office services with prestigious Polish addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Poland employment system work for companies?',
    answer: 'Poland companies must register employees with Social Insurance Institution (ZUS) if applicable. The system includes comprehensive social security contributions and employment law compliance in a robust legal framework aligned with EU regulations.'
  }],
  portugal: [{
    question: 'What is the minimum capital requirement for Portugal companies?',
    answer: 'Lda requires €1 minimum capital; S.A. requires €50,000. The Lda is the most popular choice for SMEs due to its very low capital requirement and suitability for startups and small businesses.'
  }, {
    question: 'Can foreigners fully own Portugal companies?',
    answer: 'Yes, 100% foreign ownership allowed. Portugal offers access to the EU market and Portuguese-speaking countries, competitive corporate tax rates with regional incentives, and a strategic location with access to Europe, Africa, and Americas.'
  }, {
    question: 'How long does Portugal incorporation take?',
    answer: 'Approx. 2 weeks (faster with Empresa na Hora digital system). Portugal offers streamlined digital company registration with flexible and agile legal framework and government support for startups and innovation.'
  }, {
    question: 'What is the corporate tax rate in Portugal?',
    answer: '21% standard rate; reduced rates for SMEs and regional incentives. Portugal offers competitive corporate tax rates with additional regional tax incentives and government support including Portugal 2030 program.'
  }, {
    question: 'Is UBO disclosure mandatory in Portugal?',
    answer: 'Yes, UBO registration is mandatory as per EU transparency laws. All companies must register their Ultimate Beneficial Owners with the Portuguese Commercial Registry for transparency and compliance.'
  }, {
    question: 'What is the difference between Lda and S.A. in Portugal?',
    answer: 'Lda (Private Limited Company) is for SMEs and small businesses with minimum €1 capital. S.A. (Public Limited Company) is for larger companies and public offerings, requiring minimum €50,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Portugal?',
    answer: 'Every Portugal company must have a registered business address in Portugal (mandatory). We offer virtual office services with prestigious Portuguese addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Portugal employment system work for companies?',
    answer: 'Portugal companies must register employees for social security if applicable. The system includes comprehensive social security contributions and employment law compliance with a multilingual workforce and high quality of life.'
  }],
  romania: [{
    question: 'What is the minimum capital requirement for Romania companies?',
    answer: 'SRL requires RON 1 minimum capital; SA requires RON 90,000. The SRL is the most popular business form in Romania due to its extremely low capital requirement and suitability for SMEs, startups, and small to medium businesses.'
  }, {
    question: 'Can foreigners fully own Romania companies?',
    answer: 'Yes, 100% foreign ownership allowed across all entity types. Romania offers a strategic location bridging Eastern and Western Europe, competitive corporate tax system with incentives for small businesses, and access to EU single market with Schengen membership since 2024.'
  }, {
    question: 'How long does Romania incorporation take?',
    answer: 'Usually 1-3 weeks. Romania is a growing business hub with improving registration efficiency, offering a skilled labor force with relatively low operational costs and government incentives supporting technology and innovation sectors.'
  }, {
    question: 'What is the corporate tax rate in Romania?',
    answer: 'Standard 16% CIT; 1%-3% for qualifying micro-enterprises depending on payroll. Romania offers competitive corporate tax system with incentives for small businesses and a large number of foreign companies benefiting from EU access and low taxes.'
  }, {
    question: 'Is UBO disclosure mandatory in Romania?',
    answer: 'Yes, UBO registration is mandatory under EU law. All companies must register their Ultimate Beneficial Owners with the National Trade Register Office (ONRC) for transparency and compliance with EU transparency rules.'
  }, {
    question: 'What is the difference between SRL and SA in Romania?',
    answer: 'SRL (Limited Liability Company) is the most popular business form with minimum RON 1 capital. SA (Joint-Stock Company) is for larger businesses requiring share capital financing, requiring minimum RON 90,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Romania?',
    answer: 'Every Romania company must have a registered physical business address in Romania (mandatory). We offer virtual office services with prestigious Romanian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Romania employment system work for companies?',
    answer: 'Romania companies must register employees with Social Security (Casa de Asigurări Sociale) if applicable. The system includes comprehensive social security contributions and employment law compliance with a skilled labor force and relatively low operational costs.'
  }],
  slovakia: [{
    question: 'What is the minimum capital requirement for Slovakia companies?',
    answer: 's.r.o. requires €5,000 minimum capital with at least €750 per shareholder paid up; a.s. requires €25,000. The s.r.o. is the most common form for SMEs and startups due to its lower capital requirement and suitability for small and medium businesses.'
  }, {
    question: 'Can foreigners fully own Slovakia companies?',
    answer: 'Yes, 100% foreign ownership allowed. Slovakia offers a strategic Central European location with EU and Schengen access, competitive corporate tax rates with a tiered system, and a highly skilled multilingual workforce at competitive costs.'
  }, {
    question: 'How long does Slovakia incorporation take?',
    answer: 'Typically 1 week for s.r.o., 2-3 weeks for a.s. Slovakia offers an efficient registration process with electronic options, active government support for innovation, R&D, and investment incentives, and a robust infrastructure and logistics network.'
  }, {
    question: 'What is the corporate tax rate in Slovakia?',
    answer: '21% standard rate; 10% reduced rate for incomes under €100,000 (in 2025). Slovakia offers competitive corporate tax rates with a tiered system, attracting many foreign investors due to its central location and EU membership.'
  }, {
    question: 'Is UBO disclosure mandatory in Slovakia?',
    answer: 'Yes, UBO registration is mandatory per EU guidelines. All companies must register their Ultimate Beneficial Owners with the Commercial Register for transparency and compliance with EU transparency requirements.'
  }, {
    question: 'What is the difference between s.r.o. and a.s. in Slovakia?',
    answer: 's.r.o. (Private Limited Liability Company) is for SMEs and startups with minimum €5,000 capital. a.s. (Public Limited Company) is for larger enterprises and public offerings, requiring minimum €25,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Slovakia?',
    answer: 'Every Slovakia company must have a registered business address in Slovakia (mandatory). We offer virtual office services with prestigious Slovak addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Slovakia employment system work for companies?',
    answer: 'Slovakia companies must register employees with Social Insurance Agency if applicable. The system includes comprehensive social and health insurance registration with a highly skilled multilingual workforce at competitive costs.'
  }],
  slovenia: [{
    question: 'What is the minimum capital requirement for Slovenia companies?',
    answer: 'd.o.o. requires €7,500 minimum capital (25% to be paid upfront); d.d. requires €25,000. The d.o.o. is the most common entity for SMEs and startups due to its lower capital requirement and suitability for family businesses and startups.'
  }, {
    question: 'Can foreigners fully own Slovenia companies?',
    answer: 'Yes, 100% foreign ownership allowed. Slovenia offers access to EU Single Market and Eurozone, competitive corporate tax rates with government incentives for R&D and startups, and a highly skilled and multilingual workforce.'
  }, {
    question: 'How long does Slovenia incorporation take?',
    answer: '3-7 days electronically via e-VEM portal, longer for traditional processes. Slovenia offers fast electronic registration with a modern digital registration system for efficient incorporation and strong legal framework aligned with EU law.'
  }, {
    question: 'What is the corporate tax rate in Slovenia?',
    answer: 'Standard 22% (temporarily increased from 19% during 2024-2028). Slovenia offers competitive corporate tax rates with government incentives for R&D and startups, attracting many foreign companies with 100% foreign ownership allowed.'
  }, {
    question: 'Is UBO disclosure mandatory in Slovenia?',
    answer: 'Yes, UBO registration is mandatory under EU law. All companies must register their Ultimate Beneficial Owners with the Slovenian Business Register for transparency and compliance with EU transparency rules.'
  }, {
    question: 'What is the difference between d.o.o. and d.d. in Slovenia?',
    answer: 'd.o.o. (Private Limited Company) is for SMEs and startups with minimum €7,500 capital. d.d. (Public Limited Company) is for larger businesses and stock market ventures, requiring minimum €25,000 capital.'
  }, {
    question: 'What are the requirements for a registered office in Slovenia?',
    answer: 'Every Slovenia company must have a registered office address in Slovenia (mandatory). We offer virtual office services with prestigious Slovenian addresses that fulfill all legal requirements.'
  }, {
    question: 'How does the Slovenia employment system work for companies?',
    answer: 'Slovenia companies must register employees with social security if applicable. The system includes comprehensive social security contributions and employment law compliance with a highly skilled and multilingual workforce.'
  }]
};
const countries = {
  netherlands: 'Netherlands',
  germany: 'Germany',
  france: 'France',
  spain: 'Spain',
  italy: 'Italy',
  belgium: 'Belgium',
  ireland: 'Ireland',
  austria: 'Austria',
  bulgaria: 'Bulgaria',
  croatia: 'Croatia',
  cyprus: 'Cyprus',
  czech: 'Czech Republic',
  denmark: 'Denmark',
  estonia: 'Estonia',
  finland: 'Finland',
  greece: 'Greece',
  hungary: 'Hungary',
  latvia: 'Latvia',
  lithuania: 'Lithuania',
  luxembourg: 'Luxembourg',
  malta: 'Malta',
  poland: 'Poland',
  portugal: 'Portugal',
  romania: 'Romania',
  slovakia: 'Slovakia',
  slovenia: 'Slovenia'
};
export function CompanyFormationPage() {
  const { country } = useParams();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(country || 'netherlands');
  const [formStep, setFormStep] = useState(1);
  const [companyType, setCompanyType] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  // Get country data with fallback to default
  const getCountryData = (countryCode: string) => {
    return COUNTRY_DATA[countryCode as keyof typeof COUNTRY_DATA] || {
      ...DEFAULT_COUNTRY_DATA,
      name: countryCode.charAt(0).toUpperCase() + countryCode.slice(1)
    };
  };
  const currentCountryData = getCountryData(selectedCountry);
  // Get country-specific FAQs with fallback to general FAQs
  const getFaqs = (countryCode: string) => {
    return countryFaqs[countryCode as keyof typeof countryFaqs] || generalFaqs.slice(0, 4);
  };
  const currentFaqs = getFaqs(selectedCountry);
  // Update selected country when URL parameter changes
  useEffect(() => {
    if (country && countries[country as keyof typeof countries]) {
      setSelectedCountry(country);
      localStorage.setItem('preferredCountry', country);
    }
  }, [country]);

  // Load selected country from localStorage on initial load (fallback)
  useEffect(() => {
    if (!country) {
    const savedCountry = localStorage.getItem('preferredCountry');
      if (savedCountry && countries[savedCountry as keyof typeof countries]) {
      setSelectedCountry(savedCountry);
    }
    }
  }, [country]);
  // Save country preference to localStorage and navigate to country-specific route
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    localStorage.setItem('preferredCountry', country);
    navigate(`/services/${country}/company-formation`);
  };
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  const filteredCountries = Object.entries(countries).filter(([key, name]) => name.toLowerCase().includes(searchQuery.toLowerCase()));
  return <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80)`,
        filter: 'brightness(0.2)'
      }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0826]/90 to-[#0A0826]/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <div className="flex items-center mb-2">
                <BuildingIcon className="h-6 w-6 text-[#EA3A70] mr-2" />
                <span className="text-indigo-300 text-sm font-medium">
                  Business Formation
                </span>


  {/* Move CountrySelector to top right */}
 

  <div className="absolute top-4 right-4 z-20">
    <CountrySelector 
      onCountrySelect={handleCountrySelect} 
      selectedCountry={selectedCountry} 
    />
  </div>

              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Company Formation in {currentCountryData.name}
              </h1>
              <p className="text-xl text-indigo-200 max-w-2xl">
                Fast, secure, and hassle-free company registration through our
                digital platform. Get your {currentCountryData.name} company up
                and running in {currentCountryData.processingTime}.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8">

            <Link to={`/pricing`} className="px-6 py-3 bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white rounded-lg shadow-lg shadow-[#EA3A70]/20 font-medium flex items-center justify-center">
              Start Formation Process
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30 flex flex-col items-center text-center">
              <ClockIcon className="h-6 w-6 text-[#EA3A70] mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentCountryData.statistics.processingDays} days
              </div>
              <div className="text-sm text-indigo-300">
                Average Formation Time
              </div>
            </div>
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30 flex flex-col items-center text-center">
              <BuildingIcon className="h-6 w-6 text-[#EA3A70] mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentCountryData.statistics.foreignCompanies}
              </div>
              <div className="text-sm text-indigo-300">Foreign Companies</div>
            </div>
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30 flex flex-col items-center text-center">
              <CoinsIcon className="h-6 w-6 text-[#EA3A70] mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentCountryData.statistics.corporateTax}
              </div>
              <div className="text-sm text-indigo-300">Corporate Tax Rate</div>
            </div>
            <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30 flex flex-col items-center text-center">
              <TrendingUpIcon className="h-6 w-6 text-[#EA3A70] mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentCountryData.statistics.easeOfBusiness}
              </div>
              <div className="text-sm text-indigo-300">
                Ease of Doing Business
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Portal Features Section */}
      <section className="py-16 bg-[#0A0826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Digital Platform Makes Company Formation Easy
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Experience a streamlined, fully digital process designed for
              entrepreneurs worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-indigo-900/20 rounded-xl overflow-hidden border border-indigo-500/30">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-900/50 rounded-lg mr-4">
                    <LayoutDashboardIcon className="h-6 w-6 text-[#EA3A70]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Interactive Portal
                  </h3>
                </div>
                <p className="text-indigo-200 mb-6">
                  Our intuitive dashboard guides you through each step of the
                  company formation process, from entity selection to document
                  submission and registration tracking.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Simple step-by-step process
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Real-time status updates
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Secure document upload
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-indigo-500/30 bg-indigo-900/30 p-4">
                <SimpleImage imageName="branch_registration_portal.jpg" alt="Company Formation Portal Interface" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>
            <div className="bg-indigo-900/20 rounded-xl overflow-hidden border border-indigo-500/30">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-900/50 rounded-lg mr-4">
                    <MessageCircleIcon className="h-6 w-6 text-[#EA3A70]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    AI Company Formation Agent
                  </h3>
                </div>
                <p className="text-indigo-200 mb-6">
                  Our AI assistant guides you through the entire formation
                  process, answering questions about business structures in{' '}
                  {currentCountryData.name} and helping with statutory
                  documents.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      24/7 instant assistance
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Personalized recommendations
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Document explanation and guidance
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-indigo-500/30 bg-indigo-900/30 p-4">
                <SimpleImage imageName="company_formation_chatbot_demo.jpg" alt="AI Company Formation Agent" className="w-full rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="p-3 bg-indigo-900/50 rounded-lg inline-block mb-4">
                <UploadIcon className="h-6 w-6 text-[#EA3A70]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Document Management
              </h3>
              <p className="text-indigo-200 mb-4">
                Secure upload and storage of all formation documents with guided
                submission requirements for {currentCountryData.name}
              </p>
              <SimpleImage imageName="branch_registration_upload_documents.jpg" alt="Document Management Interface" className="w-full rounded-lg shadow-lg" />
            </div>
            <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="p-3 bg-indigo-900/50 rounded-lg inline-block mb-4">
                <ClockIcon className="h-6 w-6 text-[#EA3A70]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Real-time Progress Tracking
              </h3>
              <p className="text-indigo-200 mb-4">
                Monitor every step of your company formation with detailed
                status updates and timeline
              </p>
              <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/50">
                <div className="space-y-3">
                  {registrationProgress.steps.slice(0, 3).map(step => <div key={step.id} className="flex items-center">
                      {step.completed ? <div className="h-6 w-6 rounded-full bg-[#EA3A70] flex items-center justify-center mr-3">
                          <CheckIcon className="h-4 w-4 text-white" />
                        </div> : <div className="h-6 w-6 rounded-full border border-indigo-500/50 flex items-center justify-center mr-3">
                          <span className="text-indigo-300 text-xs">
                            {step.id}
                          </span>
                        </div>}
                      <div>
                        <p className="text-white text-sm">{step.name}</p>
                        <p className="text-indigo-300 text-xs">{step.date}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="p-3 bg-indigo-900/50 rounded-lg inline-block mb-4">
                <GlobeIcon className="h-6 w-6 text-[#EA3A70]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Remote Formation
              </h3>
              <p className="text-indigo-200 mb-4">
                Complete the entire process from anywhere in the world, with no
                need to visit {currentCountryData.name}
              </p>
              <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/50">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Digital document submission
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Video verification for KYC
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Electronic signatures
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-200">
                      Virtual business address
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Interactive Entity Selection Section */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your {currentCountryData.name} Business Structure
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Select the right legal structure for your business needs and
              objectives
            </p>
          </div>
          <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30 mb-12">
            <div className="flex items-center mb-6">
              <div className="h-8 w-8 rounded-full bg-[#EA3A70] text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-white">
                  Select Company Type
                </h2>
                <p className="text-indigo-300">
                  Select the type of company you want to establish in{' '}
                  {currentCountryData.name}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`bg-[#0F0B1F] rounded-xl p-6 border-2 cursor-pointer transition-colors ${companyType === 'branch' ? 'border-[#EA3A70]' : 'border-[#2D2755] hover:border-[#EA3A70]/50'}`} onClick={() => setCompanyType('branch')}>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#EA3A70]/10 p-3 rounded-lg">
                    <BuildingIcon className="h-8 w-8 text-[#EA3A70]" />
                  </div>
                  {companyType === 'branch' && <div className="bg-[#EA3A70] rounded-full p-1">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {currentCountryData.secondaryEntityType}
                </h3>
                <p className="text-indigo-300 mb-4">
                  Establish a branch of your existing company in{' '}
                  {currentCountryData.name}. Simpler setup, but operates under
                  the liability of the parent company.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Faster registration process
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Lower capital requirements
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Simplified accounting
                    </span>
                  </div>
                </div>
              </div>
              <div className={`bg-[#0F0B1F] rounded-xl p-6 border-2 cursor-pointer transition-colors ${companyType === 'entity' ? 'border-[#EA3A70]' : 'border-[#2D2755] hover:border-[#EA3A70]/50'}`} onClick={() => setCompanyType('entity')}>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#EA3A70]/10 p-3 rounded-lg">
                    <BriefcaseIcon className="h-8 w-8 text-[#EA3A70]" />
                  </div>
                  {companyType === 'entity' && <div className="bg-[#EA3A70] rounded-full p-1">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {currentCountryData.mainEntityType}
                </h3>
                <p className="text-indigo-300 mb-4">
                  Form a new independent company with its own legal identity in{' '}
                  {currentCountryData.name}. More formalities but offers limited
                  liability protection.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Limited liability protection
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Greater operational autonomy
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-300">
                      Better perception with local clients
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 mt-4">
                <button onClick={() => window.location.href = `/portal/company-formation/${selectedCountry}`} disabled={!companyType} className={`w-full py-3 rounded-lg font-medium ${companyType ? 'bg-[#EA3A70] text-white hover:bg-[#EA3A70]/90' : 'bg-[#2D2755] text-gray-400 cursor-not-allowed'} transition-colors`}>
                  Continue in Our Portal
                </button>
              </div>
            </div>
          </div>
          <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#EA3A70]/10 rounded-lg mr-4">
                <AlertCircleIcon className="h-6 w-6 text-[#EA3A70]" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Not sure which structure is right for you?
              </h3>
            </div>
            <p className="text-indigo-200 mb-6">
              Our AI Company Formation Agent can help you determine the best
              structure based on your specific business needs, goals, and
              circumstances in {currentCountryData.name}.
            </p>
            <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/30">
              <div className="flex items-start space-x-4">
                <div className="bg-[#EA3A70] rounded-full p-2 flex-shrink-0">
                  <MessageCircleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white">
                    "Hi there! I'm Emma, your AI business setup assistant. I can
                    help you choose between a{' '}
                    {currentCountryData.secondaryEntityType} and a{' '}
                    {currentCountryData.mainEntityType} based on your specific
                    situation. Would you like me to ask you a few questions to
                    determine the best option?"
                  </p>
                  <div className="mt-4">
                    <Link to="/portal/ai-advisor" className="px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors inline-flex items-center">
                      Chat with AI Advisor
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Business Entity Types Section */}
      <section className="py-16 bg-[#0A0826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {currentCountryData.name} Business Entity Types
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Compare the different legal structures available in{' '}
              {currentCountryData.name}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-indigo-900/20 rounded-xl border border-indigo-500/30">
              <thead>
                <tr className="border-b border-indigo-500/30">
                  <th className="px-6 py-4 text-left text-white">
                    Entity Type
                  </th>
                  <th className="px-6 py-4 text-left text-white">
                    Capital Requirement
                  </th>
                  <th className="px-6 py-4 text-left text-white">
                    Formation Timeline
                  </th>
                  <th className="px-6 py-4 text-left text-white">Liability</th>
                  <th className="px-6 py-4 text-left text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                {currentCountryData.entityStructures.map((entity, index) => <tr key={index} className="border-b border-indigo-500/30">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {entity.name}
                      </div>
                      <div className="text-sm text-indigo-300">
                        {entity.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-indigo-200">
                      {entity.capitalRequirement}
                    </td>
                    <td className="px-6 py-4 text-indigo-200">
                      {entity.timeline}
                    </td>
                    <td className="px-6 py-4 text-indigo-200">
                      {entity.liability}
                    </td>
                    <td className="px-6 py-4 text-indigo-200">
                      {entity.suitableFor}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Process Timeline Section */}
      <section className="py-16 bg-[#0A0826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Streamlined Formation Process
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Experience a faster, simpler way to establish your business in{' '}
              {currentCountryData.name}
            </p>
          </div>
          <div className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/30 p-6 mb-12">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <ClockIcon className="h-6 w-6 text-[#EA3A70] mr-2" />
                <h3 className="text-xl font-bold text-white">
                  Digital {currentCountryData.mainEntityType} Formation:{' '}
                  {currentCountryData.processingTime}
                </h3>
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 h-full w-0.5 bg-indigo-500/30"></div>
                <div className="space-y-8">
                  {currentCountryData.registrationSteps.map((step, index) => <div key={index} className="relative flex items-start">
                      <div className="absolute left-6 top-6 h-0.5 w-6 bg-indigo-500/30"></div>
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center z-10">
                        <span className="text-white font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-8 bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/30 flex-grow">
                        <h4 className="text-white font-medium mb-1">{step}</h4>
                        <div className="flex items-center text-indigo-300 text-xs">
                          <TimerIcon className="h-4 w-4 mr-1" />
                          {index === 0 ? '30 minutes' : index === 1 ? '1 day' : index === 2 ? '1-2 days' : index === 3 ? '1 day' : 'Same day'}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#EA3A70]/10 rounded-lg mr-4">
                  <UploadIcon className="h-6 w-6 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Document Requirements
                </h3>
              </div>
              <div className="space-y-4">
                {currentCountryData.requirements.map((requirement, index) => <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-indigo-200">{requirement}</p>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-500/30">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-[#EA3A70]/10 rounded-lg mr-4">
                  <ShieldCheckIcon className="h-6 w-6 text-[#EA3A70]" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Post-Registration Support
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">
                      Bank Account Setup
                    </h4>
                    <p className="text-indigo-200 text-sm">
                      Assistance with opening a {currentCountryData.name}{' '}
                      business bank account
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Tax Registration</h4>
                    <p className="text-indigo-200 text-sm">
                      VAT and corporate tax registration assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">
                      Compliance Calendar
                    </h4>
                    <p className="text-indigo-200 text-sm">
                      Automated reminders for all statutory deadlines
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-[#EA3A70] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium">Digital Mailbox</h4>
                    <p className="text-indigo-200 text-sm">
                      Virtual business address with mail scanning and forwarding
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Order Process Preview */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Simple 3-Step Order Process
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Our streamlined process makes it easy to get started with your
              {currentCountryData.name} company formation
            </p>
          </div>
          <div className="bg-[#0A0826] rounded-xl border border-indigo-500/30 overflow-hidden">
            <div className="border-b border-indigo-500/30 p-4">
              <div className="flex space-x-4">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'overview' ? 'bg-[#EA3A70] text-white' : 'text-indigo-300 hover:bg-indigo-900/30'}`}>
                  Overview
                </button>
                <button onClick={() => setActiveTab('order')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'order' ? 'bg-[#EA3A70] text-white' : 'text-indigo-300 hover:bg-indigo-900/30'}`}>
                  Order Form
                </button>
                <button onClick={() => setActiveTab('progress')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'progress' ? 'bg-[#EA3A70] text-white' : 'text-indigo-300 hover:bg-indigo-900/30'}`}>
                  Progress Tracking
                </button>
                <button onClick={() => setActiveTab('documents')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'documents' ? 'bg-[#EA3A70] text-white' : 'text-indigo-300 hover:bg-indigo-900/30'}`}>
                  Documents
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Order Form Section */}
              {activeTab === 'order' && <div className="space-y-8">
                  <div className="flex items-center mb-6">
                    <div className="h-8 w-8 rounded-full bg-[#EA3A70] text-white flex items-center justify-center font-bold">
                      {formStep}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-white">
                        {formStep === 1 ? 'Select Company Type' : formStep === 2 ? 'Choose Country' : 'Complete Your Order'}
                      </h2>
                      <p className="text-indigo-300">
                        {formStep === 1 ? 'Select the type of company you want to establish' : formStep === 2 ? 'Choose the country where you want to form your company' : 'Provide your details to complete the registration'}
                      </p>
                    </div>
                  </div>
                  {/* Step 1: Company Type Selection */}
                  {formStep === 1 && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`bg-[#0F0B1F] rounded-xl p-6 border-2 cursor-pointer transition-colors ${companyType === 'branch' ? 'border-[#EA3A70]' : 'border-[#2D2755] hover:border-[#EA3A70]/50'}`} onClick={() => setCompanyType('branch')}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-[#EA3A70]/10 p-3 rounded-lg">
                            <BuildingIcon className="h-8 w-8 text-[#EA3A70]" />
                          </div>
                          {companyType === 'branch' && <div className="bg-[#EA3A70] rounded-full p-1">
                              <CheckIcon className="h-4 w-4 text-white" />
                            </div>}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Branch Office
                        </h3>
                        <p className="text-indigo-300 mb-4">
                          Establish a branch of your existing company in a new
                          country. Simpler setup, but operates under the
                          liability of the parent company.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Faster registration process
                            </span>
                          </div>
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Lower capital requirements
                            </span>
                          </div>
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Simplified accounting
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`bg-[#0F0B1F] rounded-xl p-6 border-2 cursor-pointer transition-colors ${companyType === 'entity' ? 'border-[#EA3A70]' : 'border-[#2D2755] hover:border-[#EA3A70]/50'}`} onClick={() => setCompanyType('entity')}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-[#EA3A70]/10 p-3 rounded-lg">
                            <BriefcaseIcon className="h-8 w-8 text-[#EA3A70]" />
                          </div>
                          {companyType === 'entity' && <div className="bg-[#EA3A70] rounded-full p-1">
                              <CheckIcon className="h-4 w-4 text-white" />
                            </div>}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Legal Entity
                        </h3>
                        <p className="text-indigo-300 mb-4">
                          Form a new independent company with its own legal
                          identity. More formalities but offers limited
                          liability protection.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Limited liability protection
                            </span>
                          </div>
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Greater operational autonomy
                            </span>
                          </div>
                          <div className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-[#EA3A70] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-indigo-300">
                              Better perception with local clients
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2 mt-4">
                        <button onClick={() => setFormStep(2)} disabled={!companyType} className={`w-full py-3 rounded-lg font-medium ${companyType ? 'bg-[#EA3A70] text-white hover:bg-[#EA3A70]/90' : 'bg-[#2D2755] text-indigo-400 cursor-not-allowed'} transition-colors`}>
                          Continue
                        </button>
                      </div>
                    </div>}
                  {/* Step 2: Country Selection */}
                  {formStep === 2 && <div>
                      <div className="relative mb-6">
                        <div className="flex items-center justify-between p-4 bg-[#0F0B1F] border border-[#2D2755] rounded-lg cursor-pointer" onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}>
                          <div className="flex items-center">
                            <GlobeIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                            <span className="text-white">
                              {selectedCountry ? countries[selectedCountry as keyof typeof countries] : 'Select a country'}
                            </span>
                          </div>
                          <ChevronDownIcon className={`h-5 w-5 text-indigo-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                        {isCountryDropdownOpen && <div className="absolute z-10 mt-1 w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg shadow-lg max-h-64 overflow-y-auto">
                            <div className="p-2">
                              <div className="relative mb-2">
                                <input type="text" placeholder="Search countries..." className="w-full bg-[#1B1537] border border-[#2D2755] rounded-lg pl-4 pr-4 py-2 text-white focus:outline-none focus:border-[#EA3A70]" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                              </div>
                              <div className="space-y-1">
                                {filteredCountries.map(([key, name]) => <div key={key} className={`px-3 py-2 rounded-md cursor-pointer ${selectedCountry === key ? 'bg-[#EA3A70] text-white' : 'text-indigo-300 hover:bg-[#2D2755]'}`} onClick={() => handleCountrySelect(key)}>
                                    {name}
                                  </div>)}
                              </div>
                            </div>
                          </div>}
                      </div>
                      {selectedCountry && <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6 mb-6">
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="bg-[#EA3A70]/10 p-2 rounded-full mr-3">
                              <BuildingIcon className="h-5 w-5 text-[#EA3A70]" />
                            </span>
                            {companyType === 'branch' ? `Branch in ${countries[selectedCountry as keyof typeof countries]}` : `${countries[selectedCountry as keyof typeof countries]} ${currentCountryData.mainEntityType}`}
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-[#2D2755]">
                              <span className="text-indigo-300">
                                Registration Time
                              </span>
                              <span className="text-white font-medium">
                                {currentCountryData.processingTime}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#2D2755]">
                              <span className="text-indigo-300">
                                Capital Requirement
                              </span>
                              <span className="text-white font-medium">
                                {companyType === 'branch' ? 'None' : currentCountryData.capitalRequirement}
                              </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#2D2755]">
                              <span className="text-indigo-300">
                                VAT Registration
                              </span>
                              <span className="text-white font-medium">
                                Included
                              </span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-indigo-300">Price</span>
                              <span className="text-[#EA3A70] font-bold text-xl">
                                {companyType === 'branch' ? selectedCountry === 'netherlands' ? '€895' : selectedCountry === 'germany' ? '€1,295' : selectedCountry === 'france' ? '€1,195' : '€1,495' : selectedCountry === 'netherlands' ? '€1,495' : selectedCountry === 'germany' ? '€1,995' : selectedCountry === 'france' ? '€1,795' : '€2,195'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setFormStep(3)} className="flex-1 bg-[#EA3A70] text-white py-3 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors">
                              Continue
                            </button>
                            <button onClick={() => setFormStep(1)} className="flex-1 border border-[#2D2755] text-white py-3 rounded-lg font-medium hover:bg-[#2D2755] transition-colors">
                              Back
                            </button>
                          </div>
                        </div>}
                      {!selectedCountry && <div className="flex justify-end mt-4">
                          <button onClick={() => setFormStep(1)} className="border border-[#2D2755] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2D2755] transition-colors">
                            Back
                          </button>
                        </div>}
                    </div>}
                  {/* Step 3: Order Form */}
                  {formStep === 3 && <div className="space-y-6">
                      <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">
                          Order Summary
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between py-2 border-b border-[#2D2755]">
                            <span className="text-indigo-300">
                              Company Type
                            </span>
                            <span className="text-white font-medium">
                              {companyType === 'branch' ? currentCountryData.secondaryEntityType : currentCountryData.mainEntityType}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#2D2755]">
                            <span className="text-indigo-300">Country</span>
                            <span className="text-white font-medium">
                              {currentCountryData.name}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#2D2755]">
                            <span className="text-indigo-300">
                              Registration Fee
                            </span>
                            <span className="text-white font-medium">
                              {companyType === 'branch' ? 
                                selectedCountry === 'netherlands' ? '€80' : 
                                selectedCountry === 'germany' ? '€899' : 
                                selectedCountry === 'france' ? '€1,850' : 
                                selectedCountry === 'spain' ? '€1,050' : 
                                selectedCountry === 'italy' ? '€1,300' : 
                                selectedCountry === 'austria' ? '€1,728' : 
                                selectedCountry === 'poland' ? '€600' : 
                                selectedCountry === 'estonia' ? '€190' : 
                                selectedCountry === 'bulgaria' ? '€500' : 
                                selectedCountry === 'hungary' ? '€700' : '€800'
                              : 
                                selectedCountry === 'netherlands' ? '€799' : 
                                selectedCountry === 'germany' ? '€1,500' : 
                                selectedCountry === 'france' ? '€2,500' : 
                                selectedCountry === 'spain' ? '€2,500' : 
                                selectedCountry === 'italy' ? '€2,800' : 
                                selectedCountry === 'austria' ? '€2,200' : 
                                selectedCountry === 'poland' ? '€1,200' : 
                                selectedCountry === 'estonia' ? '€265' : 
                                selectedCountry === 'bulgaria' ? '€650' : 
                                selectedCountry === 'hungary' ? '€1,500' : '€1,500'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-[#2D2755]">
                            <span className="text-indigo-300">
                              Government Fees
                            </span>
                            <span className="text-white font-medium">
                              {companyType === 'branch' ? 
                                selectedCountry === 'netherlands' ? '€0' : 
                                selectedCountry === 'germany' ? '€49' : 
                                selectedCountry === 'france' ? '€100' : 
                                selectedCountry === 'spain' ? '€300' : 
                                selectedCountry === 'italy' ? '€200' : 
                                selectedCountry === 'austria' ? '€200' : 
                                selectedCountry === 'poland' ? '€100' : 
                                selectedCountry === 'estonia' ? '€0' : 
                                selectedCountry === 'bulgaria' ? '€100' : 
                                selectedCountry === 'hungary' ? '€50' : '€100'
                              : 
                                selectedCountry === 'netherlands' ? '€100' : 
                                selectedCountry === 'germany' ? '€400' : 
                                selectedCountry === 'france' ? '€400' : 
                                selectedCountry === 'spain' ? '€700' : 
                                selectedCountry === 'italy' ? '€500' : 
                                selectedCountry === 'austria' ? '€300' : 
                                selectedCountry === 'poland' ? '€200' : 
                                selectedCountry === 'estonia' ? '€75' : 
                                selectedCountry === 'bulgaria' ? '€200' : 
                                selectedCountry === 'hungary' ? '€200' : '€200'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-indigo-300 font-bold">
                              Total
                            </span>
                            <span className="text-[#EA3A70] font-bold text-xl">
                              {companyType === 'branch' ? 
                                selectedCountry === 'netherlands' ? '€80' : 
                                selectedCountry === 'germany' ? '€899' : 
                                selectedCountry === 'france' ? '€1,850' : 
                                selectedCountry === 'spain' ? '€1,050' : 
                                selectedCountry === 'italy' ? '€1,300' : 
                                selectedCountry === 'austria' ? '€1,728' : 
                                selectedCountry === 'poland' ? '€600' : 
                                selectedCountry === 'estonia' ? '€190' : 
                                selectedCountry === 'bulgaria' ? '€500' : 
                                selectedCountry === 'hungary' ? '€700' : '€800'
                              : 
                                selectedCountry === 'netherlands' ? '€899' : 
                                selectedCountry === 'germany' ? '€1,900' : 
                                selectedCountry === 'france' ? '€2,900' : 
                                selectedCountry === 'spain' ? '€3,200' : 
                                selectedCountry === 'italy' ? '€3,300' : 
                                selectedCountry === 'austria' ? '€2,500' : 
                                selectedCountry === 'poland' ? '€1,400' : 
                                selectedCountry === 'estonia' ? '€340' : 
                                selectedCountry === 'bulgaria' ? '€850' : 
                                selectedCountry === 'hungary' ? '€1,700' : '€1,700'
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm text-indigo-400 mb-2">
                            Desired Company Name*
                          </label>
                          <input type="text" className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" required />
                        </div>
                        <div>
                          <label className="block text-sm text-indigo-400 mb-2">
                            Industry*
                          </label>
                          <select className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" required>
                            <option value="">Select your industry</option>
                            <option value="tech">Technology</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="services">Services</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-indigo-400 mb-2">
                            Business Email*
                          </label>
                          <input type="email" className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" required />
                        </div>
                        <div>
                          <label className="block text-sm text-indigo-400 mb-2">
                            Phone Number*
                          </label>
                          <input type="tel" className="w-full bg-[#0F0B1F] border border-[#2D2755] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#EA3A70]" required />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Link to={`/portal/company-formation/${selectedCountry}`} className="flex-1 bg-[#EA3A70] text-white py-3 rounded-lg font-medium hover:bg-[#EA3A70]/90 transition-colors flex items-center justify-center">
                          Place Order
                          <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </Link>
                        <button onClick={() => setFormStep(2)} className="flex-1 border border-[#2D2755] text-white py-3 rounded-lg font-medium hover:bg-[#2D2755] transition-colors">
                          Back
                        </button>
                      </div>
                      <div className="mt-4 text-center text-sm text-indigo-400">
                        <p>
                          By placing an order, you agree to our{' '}
                          <Link to="/terms" className="text-[#EA3A70] hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-[#EA3A70] hover:underline">
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                    </div>}
                </div>}
              {/* Progress Tracking Section */}
              {activeTab === 'progress' && <div>
                  <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Registration Progress
                        </h3>
                        <p className="text-indigo-400">
                          Track the status of your company formation
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${registrationProgress.status === 'completed' ? 'bg-green-500/20 text-green-500' : registrationProgress.status === 'in-progress' ? 'bg-[#EA3A70]/20 text-[#EA3A70]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {registrationProgress.status === 'completed' ? 'Completed' : registrationProgress.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-px bg-[#2D2755]" />
                      <div className="space-y-8">
                        {registrationProgress.steps.map(step => <div key={step.id} className="relative pl-16">
                            <div className={`absolute left-4 w-5 h-5 rounded-full border-2 ${step.completed ? 'border-[#EA3A70] bg-[#EA3A70]' : 'border-[#2D2755] bg-[#0F0B1F]'}`} />
                            <div className={`bg-[#1B1537] rounded-lg p-4 border ${step.completed ? 'border-[#EA3A70]/30' : 'border-[#2D2755]'}`}>
                              <div className="flex justify-between items-center">
                                <h4 className={`font-medium ${step.completed ? 'text-white' : 'text-indigo-400'}`}>
                                  {step.name}
                                </h4>
                                <span className={`text-sm ${step.completed ? 'text-[#EA3A70]' : 'text-indigo-400'}`}>
                                  {step.date}
                                </span>
                              </div>
                              {step.id === 2 && <div className="mt-3 text-indigo-300 text-sm">
                                  <p>
                                    We're currently processing your documents.
                                    You can upload any missing documents in the
                                    Documents tab.
                                  </p>
                                </div>}
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Next Steps
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-[#EA3A70]/10 p-2 rounded-lg mr-3 flex-shrink-0">
                          <UploadIcon className="h-5 w-5 text-[#EA3A70]" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            Upload Required Documents
                          </h4>
                          <p className="text-indigo-400 text-sm">
                            Please upload the remaining documents in the
                            Documents tab to continue the registration process.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#EA3A70]/10 p-2 rounded-lg mr-3 flex-shrink-0">
                          <ClockIcon className="h-5 w-5 text-[#EA3A70]" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            Verification Process
                          </h4>
                          <p className="text-indigo-400 text-sm">
                            Our team will verify your documents and prepare them
                            for submission to the authorities.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-[#EA3A70]/10 p-2 rounded-lg mr-3 flex-shrink-0">
                          <FileTextIcon className="h-5 w-5 text-[#EA3A70]" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            Official Filing
                          </h4>
                          <p className="text-indigo-400 text-sm">
                            We'll submit your application to the relevant
                            authorities and keep you updated on the progress.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Documents Section */}
              {activeTab === 'documents' && <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <UploadIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                        Required Documents
                      </h3>
                      <p className="text-indigo-400 mb-4">
                        Please upload the following documents to proceed with
                        your registration
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#1B1537] rounded-lg border border-[#2D2755]">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                            <span className="text-white">
                              Certificate of Incorporation
                            </span>
                          </div>
                          <button className="bg-[#EA3A70] text-white text-sm px-3 py-1 rounded-md">
                            Upload
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#1B1537] rounded-lg border border-[#2D2755]">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                            <span className="text-white">
                              Director ID/Passport
                            </span>
                          </div>
                          <button className="bg-[#EA3A70] text-white text-sm px-3 py-1 rounded-md">
                            Upload
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#1B1537] rounded-lg border border-[#2D2755]">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                            <span className="text-white">
                              Proof of Address (Director)
                            </span>
                          </div>
                          <button className="bg-[#EA3A70] text-white text-sm px-3 py-1 rounded-md">
                            Upload
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#1B1537] rounded-lg border border-[#2D2755]">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                            <span className="text-white">
                              Articles of Association
                            </span>
                          </div>
                          <div className="flex items-center text-green-500 text-sm">
                            <CheckIcon className="h-4 w-4 mr-1" />
                            Uploaded
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <DownloadIcon className="h-5 w-5 text-[#EA3A70] mr-2" />
                        Company Documents
                      </h3>
                      <p className="text-indigo-400 mb-4">
                        Your official company documents will appear here once
                        available
                      </p>
                      <div className="space-y-4">
                        {documents.map(doc => <div key={doc.id} className="flex items-center justify-between p-3 bg-[#1B1537] rounded-lg border border-[#2D2755]">
                            <div className="flex items-center">
                              <FileTextIcon className="h-5 w-5 text-[#EA3A70] mr-3" />
                              <div>
                                <div className="text-white">{doc.name}</div>
                                <div className="text-indigo-400 text-xs">
                                  {doc.date}
                                </div>
                              </div>
                            </div>
                            {doc.status === 'available' ? <button className="bg-[#EA3A70] text-white text-sm px-3 py-1 rounded-md flex items-center">
                                <DownloadIcon className="h-4 w-4 mr-1" />
                                Download
                              </button> : <span className="text-indigo-400 text-sm">
                                Pending
                              </span>}
                          </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#1B1537] border border-[#2D2755] rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {currentFaqs.map((faq, index) => <div key={index} className={`bg-[#0F0B1F] rounded-xl border ${expandedFaq === index ? 'border-[#EA3A70]' : 'border-[#2D2755]'} overflow-hidden transition-all`}>
                          <button className="w-full px-6 py-4 flex items-center justify-between text-left" onClick={() => toggleFaq(index)}>
                            <h3 className="font-medium text-white">
                              {faq.question}
                            </h3>
                            {expandedFaq === index ? <ChevronUpIcon className="h-5 w-5 text-[#EA3A70] flex-shrink-0" /> : <ChevronDownIcon className="h-5 w-5 text-indigo-400 flex-shrink-0" />}
                          </button>
                          {expandedFaq === index && <div className="px-6 pb-4 text-indigo-200">
                              {faq.answer}
                            </div>}
                        </div>)}
                    </div>
                  </div>
                </div>}
              {/* Overview Section */}
              {activeTab === 'overview' && <div className="space-y-6">
                  <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Digital Company Formation Portal
                    </h3>
                    <p className="text-indigo-300 mb-6">
                      Our intuitive portal guides you through every step of the
                      company formation process, from entity selection to
                      document submission and progress tracking.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#1B1537] rounded-lg p-4 border border-[#2D2755]">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-[#EA3A70]/10 rounded-lg mr-2">
                            <BuildingIcon className="h-5 w-5 text-[#EA3A70]" />
                          </div>
                          <h4 className="text-white font-medium">
                            Company Setup
                          </h4>
                        </div>
                        <p className="text-indigo-300 text-sm">
                          Select your business structure and complete the
                          initial registration
                        </p>
                      </div>
                      <div className="bg-[#1B1537] rounded-lg p-4 border border-[#2D2755]">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-[#EA3A70]/10 rounded-lg mr-2">
                            <UploadIcon className="h-5 w-5 text-[#EA3A70]" />
                          </div>
                          <h4 className="text-white font-medium">
                            Document Upload
                          </h4>
                        </div>
                        <p className="text-indigo-300 text-sm">
                          Securely upload and manage all required formation
                          documents
                        </p>
                      </div>
                      <div className="bg-[#1B1537] rounded-lg p-4 border border-[#2D2755]">
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-[#EA3A70]/10 rounded-lg mr-2">
                            <ClockIcon className="h-5 w-5 text-[#EA3A70]" />
                          </div>
                          <h4 className="text-white font-medium">
                            Progress Tracking
                          </h4>
                        </div>
                        <p className="text-indigo-300 text-sm">
                          Monitor the status of your formation in real-time with
                          detailed updates
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link to={`/pricing`} className="px-6 py-3 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors inline-flex items-center">
                        Start Company Formation
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="bg-[#0F0B1F] border border-[#2D2755] rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="p-3 bg-[#EA3A70]/10 rounded-lg mr-4 flex-shrink-0">
                        <MessageCircleIcon className="h-6 w-6 text-[#EA3A70]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          AI Company Formation Agent
                        </h3>
                        <p className="text-indigo-300 mb-4">
                          Our AI assistant provides 24/7 guidance through the
                          entire formation process, answering questions about
                          {currentCountryData.name} business structures and
                          helping with statutory documents.
                        </p>
                        <div className="bg-[#1B1537] rounded-lg p-4 border border-[#2D2755]">
                          <div className="flex items-start space-x-3">
                            <div className="bg-[#EA3A70] rounded-full p-2 flex-shrink-0 mt-1">
                              <UserIcon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-indigo-300 text-sm">
                                What's the difference between a{' '}
                                {currentCountryData.mainEntityType} and a{' '}
                                {currentCountryData.secondaryEntityType}?
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 mt-3">
                            <div className="bg-indigo-900/50 rounded-full p-2 flex-shrink-0 mt-1">
                              <MessageCircleIcon className="h-4 w-4 text-indigo-300" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm">
                                A {currentCountryData.mainEntityType} is a
                                separate legal entity with limited liability
                                protection for shareholders, while a{' '}
                                {currentCountryData.secondaryEntityType} is an
                                extension of your existing company without
                                separate legal status. The main differences are:
                              </p>
                              <ul className="mt-2 space-y-1 text-indigo-300 text-sm pl-4 list-disc">
                                <li>
                                  Liability: {currentCountryData.mainEntityType}{' '}
                                  offers limited liability,{' '}
                                  {currentCountryData.secondaryEntityType}
                                  has no liability separation
                                </li>
                                <li>
                                  Setup: {currentCountryData.mainEntityType}{' '}
                                  requires more formal procedures,{' '}
                                  {currentCountryData.secondaryEntityType} is
                                  simpler to establish
                                </li>
                                <li>
                                  Capital: {currentCountryData.mainEntityType}{' '}
                                  may need minimum capital,
                                  {currentCountryData.secondaryEntityType} has
                                  no requirement
                                </li>
                                <li>
                                  Taxation: {currentCountryData.mainEntityType}{' '}
                                  files separate tax returns,
                                  {currentCountryData.secondaryEntityType} files
                                  as part of parent
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link to="/portal/ai-advisor" className="px-4 py-2 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors inline-flex items-center">
                            Ask the AI Advisor
                            <ArrowRightIcon className="h-4 w-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </section>
      {/* Client Testimonial Section */}
      <section className="py-16 bg-[#0A0826]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-900/20 rounded-xl p-8 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EA3A70]/20 to-indigo-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="rounded-xl overflow-hidden border-2 border-indigo-500/30 h-64 w-64 mx-auto">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Client Portrait" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-500" />)}
                </div>
                <blockquote className="text-xl text-white italic mb-6">
                  "I was amazed at how easy it was to form my{' '}
                  {currentCountryData.name} Legal Entity through House of
                  Companies' portal. The step-by-step process was intuitive, and
                  I could track progress in real-time. What would have taken
                  weeks with traditional service providers took just days, and I
                  could do everything from my office in Singapore."
                </blockquote>
                <div>
                  <p className="text-lg font-bold text-white">Michael Chen</p>
                  <p className="text-indigo-300">CEO, TechAsia Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-[#0F0B1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Get answers to common questions about forming a company in{' '}
              {currentCountryData.name}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentFaqs.map((faq, index) => <div key={index} className={`bg-indigo-900/20 rounded-xl border ${expandedFaq === index ? 'border-[#EA3A70]' : 'border-indigo-500/30'} overflow-hidden transition-all`}>
                <button className="w-full px-6 py-4 flex items-center justify-between text-left" onClick={() => toggleFaq(index)}>
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  {expandedFaq === index ? <ChevronUpIcon className="h-5 w-5 text-[#EA3A70] flex-shrink-0" /> : <ChevronDownIcon className="h-5 w-5 text-indigo-400 flex-shrink-0" />}
                </button>
                {expandedFaq === index && <div className="px-6 pb-4 text-indigo-200">{faq.answer}</div>}
              </div>)}
          </div>
          <div className="text-center">
            <Link to="/faq" className="px-6 py-3 bg-indigo-900/50 text-white border border-indigo-500/30 rounded-lg hover:bg-indigo-800/50 transition-colors text-lg font-medium inline-flex items-center">
              View All FAQs
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-[#0F0B1F] to-[#1B1537]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Establish Your Business in {currentCountryData.name}?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            Get started today through our secure portal and have your company up
            and running in as little as {currentCountryData.processingTime}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="https://clientdashboard3.houseofcompanies.co.in/" className="px-8 py-4 bg-[#EA3A70] text-white rounded-lg hover:bg-[#EA3A70]/90 transition-colors text-lg font-medium inline-flex items-center">
              Access Portal
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-indigo-900/50 text-white border border-indigo-500/30 rounded-lg hover:bg-indigo-800/50 transition-colors text-lg font-medium inline-flex items-center">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>;
}