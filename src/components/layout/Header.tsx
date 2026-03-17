import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronDownIcon, SearchIcon, CheckIcon } from 'lucide-react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useCountry } from '../../contexts/CountryContext';
import logo from '../../hoclogo.png';
import { createPortal } from 'react-dom';
import { useClickOutside } from '../../hooks/useClickOutside';
import React from 'react';

// Service dropdown items - will be updated dynamically
const getServiceItems = (selectedCountry: string, countries: any) => [
  {
    name: 'Company Formation',
    description: `Register your business in ${countries[selectedCountry as keyof typeof countries]?.name || 'the Netherlands'}`,
    href: `/services/${selectedCountry}/company-formation`,
  },
  {
    name: 'Company Essentials',
    description: 'Essential services for EU business setup',
    href: '/services/company-essentials',
  },
  {
    name: 'Mailbox',
    description: 'Get a prestigious Dutch business address',
    href: '/services/mailbox',
  },
  {
    name: 'Accounting',
    description: 'Financial management for your business',
    href: '/accounting-product',
  },
  {
    name: 'Tax Registration',
    description: 'Tax registration and compliance services',
    href: '/tax-registration-product',
  },
  {
    name: 'AI Bookkeeping',
    description: 'AI-powered bookkeeping solutions',
    href: '/ai-bookkeeping-product',
  },
  {
    name: 'Virtual Office',
    description: 'Prestigious business address services',
    href: '/virtual-office-product',
  },
  {
    name: 'VAT Filing',
    description: 'Quarterly and monthly VAT filing',
    href: '/vat-filing-product',
  },
  {
    name: 'CIT Filing',
    description: 'Corporate income tax filing',
    href: '/cit-filing-product',
  },
  {
    name: 'Corporate Secretary',
    description: 'Maintain legal compliance for your entity',
    href: '/services/corporate-secretary',
  },
  {
    name: 'Legal',
    description: 'Expert legal support for your business',
    href: '/services/legal',
  },
  {
    name: 'Marketing Services',
    description: 'AI-powered marketing solutions for global reach',
    href: '/services/marketing',
  },
];
// Resources dropdown items
const resourceItems = [
  {
    name: 'Tutorials',
    description: 'Step-by-step business setup guides',
    href: '/tutorials',
  },
  {
    name: 'Knowledge Base',
    description: 'Guides and articles for business owners',
    href: '/resources/knowledge-base',
  },
  {
    name: 'Blog',
    description: 'Latest news and business insights',
    href: '/blog',
  },
  {
    name: 'FAQ',
    description: 'Answers to common questions',
    href: '/resources/faq',
  },
  {
    name: 'Case Studies',
    description: 'Success stories from our clients',
    href: '/resources/case-studies',
  },
];

// Add type definitions for navigation items
type NavigationItem = {
  name: string;
  type: 'dropdown' | 'link';
  href?: string;
  items?: Array<{
    name: string;
    description: string;
    href: string;
  }>;
};

// Navigation items will be created dynamically in the component
const getNavigationItems = (
  selectedCountry: string,
  countries: any,
): NavigationItem[] => [
  {
    name: 'Solutions',
    type: 'dropdown',
    items: getServiceItems(selectedCountry, countries),
  },
  {
    name: 'eBranch',
    type: 'link',
    href: '/ebranch',
  },
  {
    name: 'Company',
    type: 'dropdown',
    items: [
      {
        name: 'About Us',
        description: 'Learn more about our company',
        href: '/about-us',
      },
      {
        name: 'Contact Us',
        description: 'Get in touch with our team',
        href: '/contact',
      },
    ],
  },
  {
    name: 'Pricing',
    type: 'link',
    href: '/pricing',
  },
  {
    name: 'Resources',
    type: 'dropdown',
    items: resourceItems,
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  const { selectedCountry, setSelectedCountry, countries } = useCountry();

  const location = useLocation();
  const navigate = useNavigate();

  // Get dynamic navigation items based on selected country
  const navigationItems = getNavigationItems(selectedCountry, countries);

  // Refs for different dropdown elements
  const desktopNavRef = useClickOutside<HTMLDivElement>(() => {
    setOpenDropdown(null);
  });
  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null); // Also close any open mobile dropdowns
  });
  const countrySelectorRef = useClickOutside<HTMLDivElement>(() => {
    setIsCountryDropdownOpen(false);
  });

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isCountryDropdownOpen) {
          setIsCountryDropdownOpen(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
          setOpenDropdown(null);
        } else if (openDropdown) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCountryDropdownOpen, isMenuOpen, openDropdown]);

  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);

    // Navigate to country-specific routes based on current path
    const currentPath = location.pathname;

    // Check if we're on a company formation page and redirect to the new country
    if (
      currentPath.includes('/services/') &&
      currentPath.includes('/company-formation')
    ) {
      const newPath = `/services/${country}/company-formation`;
      navigate(newPath);
    }
  };

  return (
    <header className="bg-[#0F0B1F]/80 backdrop-blur-md border-b border-[#2D2755] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-14 lg:h-16">
          {/* Mobile Hamburger + Logo (mobile only) */}
          <div className="md:hidden flex items-center gap-[10px]">
            <button
              onClick={() => {
                setIsMenuOpen((prev) => {
                  if (prev) {
                    setOpenDropdown(null);
                    setMobileDropdown(null);
                  }
                  return !prev;
                });
              }}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-[#1B1537] focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <HiOutlineMenuAlt2 className="block h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="House of Companies Logo"
                  className="h-8 w-10 sm:h-10 sm:w-12 lg:h-12 lg:w-14"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex flex-shrink-0 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="House of Companies Logo"
                className="h-8 w-10 sm:h-10 sm:w-12 lg:h-12 lg:w-14"
              />
            </Link>
          </div>
          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navigationItems.slice(0, 3).map((item) =>
              item.type === 'link' ? (
                <Link
                  key={item.name}
                  to={item.href || '/'}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-[#EA3A70]/10 text-[#EA3A70]'
                      : 'text-white hover:bg-[#1B1537] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ) : null,
            )}
            <Link
              to="/pricing"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors text-white hover:bg-[#1B1537] hover:text-white"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            ref={desktopNavRef}
          >
            {/* Home Link */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-[#EA3A70]/10 text-[#EA3A70] hover:bg-[#EA3A70]/10 hover:text-[#EA3A70]'
                  : 'text-white hover:bg-[#1B1537] hover:text-white'
              }`}
            >
              Home
            </Link>

            {/* Other Navigation Items */}
            {navigationItems.map((item) => {
              if (item.type === 'dropdown' && item.name !== 'Resources') {
                const isActive = location.pathname.startsWith(
                  '/' + item.name.toLowerCase(),
                );
                const isOpen = openDropdown === item.name.toLowerCase();

                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name.toLowerCase())}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center transition-colors
              ${
                isOpen
                  ? 'bg-[#1B1537] text-white hover:bg-[#1B1537] hover:text-white'
                  : isActive
                    ? 'bg-[#EA3A70]/10 text-[#EA3A70] hover:bg-[#EA3A70]/10 hover:text-[#EA3A70] cursor-default'
                    : 'text-white bg-transparent hover:bg-[#1B1537] hover:text-white'
              }
            `}
                    >
                      {item.name}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>

                    {/* Dropdown Menus */}
                    {isOpen &&
                      item.items &&
                      (item.name === 'Company' ? (
                        <div className="absolute top-full left-0 mt-2 w-80 bg-[#1B1537] rounded-2xl shadow-xl border border-[#2D2755] p-6 z-20 transition-all duration-300 ease-out">
                          <div className="grid grid-cols-1 gap-4">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block rounded-xl p-4 bg-[#2D2755]/20 border border-[#2D2755] hover:bg-[#EA3A70]/10 hover:border-[#EA3A70] !text-white transition-all duration-300 ease-in-out"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="font-semibold text-white text-base mb-1">
                                  {subItem.name}
                                </div>
                                <div className="text-sm text-gray-300">
                                  {subItem.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="absolute top-full left-0 mt-2 w-[700px] bg-[#1B1537] rounded-2xl shadow-xl border border-[#2D2755] p-6 z-20 transition-all duration-300 ease-out">
                          <div className="grid grid-cols-3 gap-6">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block rounded-xl p-4 bg-[#2D2755]/20 border border-[#2D2755] hover:bg-[#EA3A70]/10 hover:border-[#EA3A70] transition-colors duration-300 ease-in-out"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="font-semibold text-white text-base mb-1">
                                  {subItem.name}
                                </div>
                                <div className="text-sm text-gray-300">
                                  {subItem.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-6 text-center">
                            <Link
                              to="/services"
                              className="inline-block px-6 py-2 bg-[#EA3A70] !text-white font-medium rounded-full hover:bg-[#C73662] transition-colors duration-300 ease-in-out"
                              onClick={() => setOpenDropdown(null)}
                            >
                              View All Services
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              }

              // Regular link items
              if (item.type === 'link') {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href || '/'}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EA3A70]/10 text-[#EA3A70] hover:bg-[#EA3A70]/10 hover:text-[#EA3A70] cursor-default'
                        : 'text-white hover:bg-[#1B1537] hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return null;
            })}

            {/* Resources Dropdown - always last */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  location.pathname.startsWith('/resources')
                    ? 'bg-[#EA3A70]/10 text-[#EA3A70] hover:bg-[#EA3A70]/10 hover:text-[#EA3A70]'
                    : 'text-white hover:bg-[#1B1537] hover:text-white'
                }`}
              >
                Resources
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>

              {openDropdown === 'resources' && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#1B1537] rounded-2xl shadow-xl border border-[#2D2755] p-4 z-20 transition-all duration-300 ease-out">
                  <div className="grid grid-cols-1 gap-3">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block rounded-xl p-3 bg-[#2D2755]/20 border border-[#2D2755] hover:bg-[#EA3A70]/10 hover:border-[#EA3A70] !text-white transition-all duration-300 ease-in-out"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="font-semibold text-white text-base mb-1">
                          {item.name}
                        </div>
                        <div className="font-normal text-gray-300 text-sm truncate">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Country Selector + Login */}
          <div
            className="flex items-center gap-[20px]"
            ref={countrySelectorRef}
          >
            {/* Country Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCountryDropdownOpen(true)} // opens the center modal
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-[#1B1537] transition-colors"
              >
                <span className="text-lg">
                  {countries[selectedCountry as keyof typeof countries]?.flag ||
                    '🇳🇱'}
                </span>

                <span className="hidden sm:inline">
                  {countries[selectedCountry as keyof typeof countries]?.name ||
                    'Netherlands'}
                </span>

                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    isCountryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Login Button */}
            <a
              href="https://clientdashboard.houseofcompanies.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-[#EA3A70]/20"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-[#0F0B1F]/80 border-t border-[#2D2755]"
          ref={mobileMenuRef}
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {/* Mobile Services Section */}
            <div className="space-y-1">
              <button
                onClick={() =>
                  setMobileDropdown((prev) =>
                    prev === 'mobile-services' ? null : 'mobile-services',
                  )
                }
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${location.pathname.startsWith('/services') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              >
                Services
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${mobileDropdown === 'mobile-services' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'mobile-services' && (
                <div className="pl-4 space-y-1 border-l border-[#2D2755] ml-3">
                  {getServiceItems(selectedCountry, countries).map(
                    (item: any) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        <div className="font-medium text-white">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.description}
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
            <Link
              to="/ebranch"
              className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/ebranch' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              eBranch
            </Link>
            <Link
              to="/pricing"
              className={`block px-3 py-2 rounded-lg font-medium ${location.pathname === '/pricing' ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {/* Mobile Company Section */}
            <div className="space-y-1">
              <button
                onClick={() =>
                  setMobileDropdown((prev) =>
                    prev === 'mobile-company' ? null : 'mobile-company',
                  )
                }
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${location.pathname.startsWith('/about') || location.pathname.startsWith('/contact') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              >
                Company
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${mobileDropdown === 'mobile-company' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'mobile-company' && (
                <div className="pl-4 space-y-1 border-l border-[#2D2755] ml-3">
                  <Link
                    to="/about-us"
                    className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile Resources Section */}
            <div className="space-y-1">
              <button
                onClick={() =>
                  setMobileDropdown((prev) =>
                    prev === 'mobile-resources' ? null : 'mobile-resources',
                  )
                }
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg font-medium ${location.pathname.startsWith('/resources') ? 'bg-[#EA3A70]/10 text-[#EA3A70]' : 'text-white hover:bg-[#2D2755]/30'}`}
              >
                Resources
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${mobileDropdown === 'mobile-resources' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileDropdown === 'mobile-resources' && (
                <div className="pl-4 space-y-1 border-l border-[#2D2755] ml-3">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2D2755]/30"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <div className="font-medium text-white">{item.name}</div>
                      <div className="text-xs text-gray-400">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu login section */}
            <div className="px-2 pt-2 pb-0 border-t border-[#2D2755]">
              <a
                href="https://clientdashboard2.houseofcompanies.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 mt-2 text-center bg-[#EA3A70] hover:bg-[#EA3A70]/90 text-white rounded-lg shadow-sm shadow-[#EA3A70]/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Country Selector Modal */}
      {isCountryDropdownOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
            <div
              ref={countrySelectorRef}
              className="relative w-full max-w-lg max-h-[90vh] bg-[#1B1537] border border-[#2D2755] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-[#1B1537] border-b border-[#2D2755] px-6 py-4 flex items-center justify-between">
                <h3 className="m-0 text-lg sm:text-xl font-semibold text-white">
                  Select Country
                </h3>

                <button
                  onClick={() => setIsCountryDropdownOpen(false)}
                  className="p-2 rounded-full hover:bg-[#2D2755]/50 transition flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 pt-5 pb-3 space-y-6 scrollbar-modern">
                {/* Intro Text */}
                <p className="m-0 text-sm text-indigo-300">
                  Select your country to personalize content across the
                  platform.
                </p>

                {/* Search */}
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0F0B1F] border border-[#2D2755] rounded-lg text-white placeholder-indigo-400 focus:outline-none focus:border-[#EA3A70] focus:ring-1 focus:ring-[#EA3A70]/40 transition"
                  />
                </div>

                {/* Country List */}
                <div className="space-y-2">
                  <h4 className="m-0 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {countrySearchQuery ? 'Search Results' : 'All Countries'}
                  </h4>

                  <div className="grid gap-2 max-h-[350px] overflow-y-auto pr-1 scrollbar-modern">
                    {Object.entries(countries)
                      .filter(([, country]) =>
                        country.name
                          .toLowerCase()
                          .includes(countrySearchQuery.toLowerCase()),
                      )
                      .map(([key, country]) => (
                        <button
                          key={key}
                          onClick={() => handleCountryChange(key)}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all duration-150 ${
                            selectedCountry === key
                              ? 'bg-[#EA3A70]/20 border-[#EA3A70]/40'
                              : 'border-transparent hover:bg-[#242053]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm text-white">
                              {country.name}
                            </span>
                          </div>

                          {selectedCountry === key && (
                            <CheckIcon className="h-4 w-4 text-[#EA3A70]" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Footer Message */}
              <div className="sticky bottom-0 bg-[#0F0B1F]/80 backdrop-blur border-t border-[#2D2755] px-6 py-4">
                <p className="m-0 text-xs text-indigo-300 text-center sm:text-left">
                  Your selection will be saved for future visits
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
