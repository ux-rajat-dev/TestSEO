import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// All 27 EU Countries used in company formation page
const countries = {
  netherlands: { name: 'Netherlands', flag: '🇳🇱' },
  germany: { name: 'Germany', flag: '🇩🇪' },
  france: { name: 'France', flag: '🇫🇷' },
  spain: { name: 'Spain', flag: '🇪🇸' },
  italy: { name: 'Italy', flag: '🇮🇹' },
  belgium: { name: 'Belgium', flag: '🇧🇪' },
  ireland: { name: 'Ireland', flag: '🇮🇪' },
  austria: { name: 'Austria', flag: '🇦🇹' },
  bulgaria: { name: 'Bulgaria', flag: '🇧🇬' },
  croatia: { name: 'Croatia', flag: '🇭🇷' },
  cyprus: { name: 'Cyprus', flag: '🇨🇾' },
  czech: { name: 'Czech Republic', flag: '🇨🇿' },
  denmark: { name: 'Denmark', flag: '🇩🇰' },
  estonia: { name: 'Estonia', flag: '🇪🇪' },
  finland: { name: 'Finland', flag: '🇫🇮' },
  greece: { name: 'Greece', flag: '🇬🇷' },
  hungary: { name: 'Hungary', flag: '🇭🇺' },
  latvia: { name: 'Latvia', flag: '🇱🇻' },
  lithuania: { name: 'Lithuania', flag: '🇱🇹' },
  luxembourg: { name: 'Luxembourg', flag: '🇱🇺' },
  malta: { name: 'Malta', flag: '🇲🇹' },
  poland: { name: 'Poland', flag: '🇵🇱' },
  portugal: { name: 'Portugal', flag: '🇵🇹' },
  romania: { name: 'Romania', flag: '🇷🇴' },
  slovakia: { name: 'Slovakia', flag: '🇸🇰' },
  slovenia: { name: 'Slovenia', flag: '🇸🇮' },
  sweden: { name: 'Sweden', flag: '🇸🇪' }
};

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countries: typeof countries;
  getCountryName: (code: string) => string;
  getCountryFlag: (code: string) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [selectedCountry, setSelectedCountry] = useState('netherlands');

  // Load selected country from localStorage on initial load
  useEffect(() => {
    const savedCountry = localStorage.getItem('preferredCountry');
    if (savedCountry && countries[savedCountry as keyof typeof countries]) {
      setSelectedCountry(savedCountry);
    }
  }, []);

  // Save country preference to localStorage when it changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    localStorage.setItem('preferredCountry', country);
  };

  // Get country name based on code
  const getCountryName = (code: string) => {
    return countries[code as keyof typeof countries]?.name || 'European';
  };

  // Get country flag emoji
  const getCountryFlag = (code: string) => {
    return countries[code as keyof typeof countries]?.flag || '🇪🇺';
  };

  const value: CountryContextType = {
    selectedCountry,
    setSelectedCountry: handleCountryChange,
    countries,
    getCountryName,
    getCountryFlag,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}

