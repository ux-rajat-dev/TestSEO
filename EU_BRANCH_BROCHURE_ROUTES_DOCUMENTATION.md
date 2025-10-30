# EU Branch Brochure Routes Documentation

## Overview
This document provides comprehensive documentation for all 21 EU country branch brochure routes that have been implemented in the application. Each country has both standalone and services-integrated routes with full header support.

## Route Structure

### 1. Standalone Routes
Each country has a standalone route following the pattern: `/{country}-branch-brochure`

### 2. Services Routes  
Each country also has a services-integrated route following the pattern: `/services/{country}/branch-brochure`

### 3. Layout
All routes use the `BranchBrochureLayout` component which includes:
- Header navigation
- Footer
- Dark theme background (`bg-[#0F0B1F]`)

---

## Complete Route List

### 🇳🇱 Netherlands
- **Standalone Route**: `/dutch-branch-brochure`
- **Services Route**: `/services/netherlands/branch-brochure`
- **Component**: `DutchBranchBrochure`
- **File**: `src/pages/DutchBranchBrochure.tsx`

### 🇦🇹 Austria
- **Standalone Route**: `/austrian-branch-brochure`
- **Services Route**: `/services/austria/branch-brochure`
- **Component**: `AustrianBranchBrochure`
- **File**: `src/pages/AustrianBranchBrochure.tsx`

### 🇧🇪 Belgium
- **Standalone Route**: `/belgian-branch-brochure`
- **Services Route**: `/services/belgium/branch-brochure`
- **Component**: `BelgianBranchBrochure`
- **File**: `src/pages/BelgianBranchBrochure.tsx`

### 🇧🇬 Bulgaria
- **Standalone Route**: `/bulgarian-branch-brochure`
- **Services Route**: `/services/bulgaria/branch-brochure`
- **Component**: `BulgarianBranchBrochure`
- **File**: `src/pages/BulgarianBranchBrochure.tsx`

### 🇭🇷 Croatia
- **Standalone Route**: `/croatian-branch-brochure`
- **Services Route**: `/services/croatia/branch-brochure`
- **Component**: `CroatianBranchBrochure`
- **File**: `src/pages/CroatianBranchBrochure.tsx`

### 🇨🇾 Cyprus
- **Standalone Route**: `/cypriot-branch-brochure`
- **Services Route**: `/services/cyprus/branch-brochure`
- **Component**: `CypriotBranchBrochure`
- **File**: `src/pages/CypriotBranchBrochure.tsx`

### 🇨🇿 Czech Republic
- **Standalone Route**: `/czech-branch-brochure`
- **Services Route**: `/services/czech-republic/branch-brochure`
- **Component**: `CzechBranchBrochure`
- **File**: `src/pages/CzechBranchBrochure.tsx`

### 🇩🇰 Denmark
- **Standalone Route**: `/danish-branch-brochure`
- **Services Route**: `/services/denmark/branch-brochure`
- **Component**: `DanishBranchBrochure`
- **File**: `src/pages/DanishBranchBrochure.tsx`

### 🇫🇮 Finland
- **Standalone Route**: `/finnish-branch-brochure`
- **Services Route**: `/services/finland/branch-brochure`
- **Component**: `FinnishBranchBrochure`
- **File**: `src/pages/FinnishBranchBrochure.tsx`

### 🇫🇷 France
- **Standalone Route**: `/french-branch-brochure`
- **Services Route**: `/services/france/branch-brochure`
- **Component**: `FrenchBranchBrochure`
- **File**: `src/pages/FrenchBranchBrochure.tsx`

### 🇩🇪 Germany
- **Standalone Route**: `/german-branch-brochure`
- **Services Route**: `/services/germany/branch-brochure`
- **Component**: `GermanBranchBrochure`
- **File**: `src/pages/GermanBranchBrochure.tsx`

### 🇬🇷 Greece
- **Standalone Route**: `/greek-branch-brochure`
- **Services Route**: `/services/greece/branch-brochure`
- **Component**: `GreekBranchBrochure`
- **File**: `src/pages/GreekBranchBrochure.tsx`

### 🇭🇺 Hungary
- **Standalone Route**: `/hungarian-branch-brochure`
- **Services Route**: `/services/hungary/branch-brochure`
- **Component**: `HungarianBranchBrochure`
- **File**: `src/pages/HungarianBranchBrochure.tsx`

### 🇮🇪 Ireland
- **Standalone Route**: `/irish-branch-brochure`
- **Services Route**: `/services/ireland/branch-brochure`
- **Component**: `IrishBranchBrochure`
- **File**: `src/pages/IrishBranchBrochure.tsx`

### 🇮🇹 Italy
- **Standalone Route**: `/italian-branch-brochure`
- **Services Route**: `/services/italy/branch-brochure`
- **Component**: `ItalianBranchBrochure`
- **File**: `src/pages/ItalianBranchBrochure.tsx`

### 🇵🇱 Poland
- **Standalone Route**: `/polish-branch-brochure`
- **Services Route**: `/services/poland/branch-brochure`
- **Component**: `PolishBranchBrochure`
- **File**: `src/pages/PolishBranchBrochure.tsx`

### 🇵🇹 Portugal
- **Standalone Route**: `/portuguese-branch-brochure`
- **Services Route**: `/services/portugal/branch-brochure`
- **Component**: `PortugueseBranchBrochure`
- **File**: `src/pages/PortugueseBranchBrochure.tsx`

### 🇷🇴 Romania
- **Standalone Route**: `/romanian-branch-brochure`
- **Services Route**: `/services/romania/branch-brochure`
- **Component**: `RomanianBranchBrochure`
- **File**: `src/pages/RomanianBranchBrochure.tsx`

### 🇸🇰 Slovakia
- **Standalone Route**: `/slovak-branch-brochure`
- **Services Route**: `/services/slovakia/branch-brochure`
- **Component**: `SlovakBranchBrochure`
- **File**: `src/pages/SlovakBranchBrochure.tsx`

### 🇪🇸 Spain
- **Standalone Route**: `/spanish-branch-brochure`
- **Services Route**: `/services/spain/branch-brochure`
- **Component**: `SpanishBranchBrochure`
- **File**: `src/pages/SpanishBranchBrochure.tsx`

### 🇸🇪 Sweden
- **Standalone Route**: `/swedish-branch-brochure`
- **Services Route**: `/services/sweden/branch-brochure`
- **Component**: `SwedishBranchBrochure`
- **File**: `src/pages/SwedishBranchBrochure.tsx`

---

## DestinationSlider Integration

The following cities in the DestinationSlider component now navigate directly to their respective branch brochure pages:

| City | Country | Route |
|------|---------|-------|
| Amsterdam | Netherlands | `/dutch-branch-brochure` |
| Vienna | Austria | `/austrian-branch-brochure` |
| Brussels | Belgium | `/belgian-branch-brochure` |
| Zagreb | Croatia | `/croatian-branch-brochure` |
| Nicosia | Cyprus | `/cypriot-branch-brochure` |
| Prague | Czech Republic | `/czech-branch-brochure` |
| Copenhagen | Denmark | `/danish-branch-brochure` |
| Helsinki | Finland | `/finnish-branch-brochure` |
| Paris | France | `/french-branch-brochure` |
| Berlin | Germany | `/german-branch-brochure` |
| Athens | Greece | `/greek-branch-brochure` |
| Budapest | Hungary | `/hungarian-branch-brochure` |
| Dublin | Ireland | `/irish-branch-brochure` |
| Rome | Italy | `/italian-branch-brochure` |
| Warsaw | Poland | `/polish-branch-brochure` |
| Lisbon | Portugal | `/portuguese-branch-brochure` |
| Bucharest | Romania | `/romanian-branch-brochure` |
| Bratislava | Slovakia | `/slovak-branch-brochure` |
| Madrid | Spain | `/spanish-branch-brochure` |
| Stockholm | Sweden | `/swedish-branch-brochure` |

---

## Technical Implementation

### App.tsx Route Configuration
```typescript
// Standalone Routes
<Route path="/{country}-branch-brochure" element={
  <BranchBrochureLayout>
    <{Country}BranchBrochure />
  </BranchBrochureLayout>
} />

// Services Routes
<Route path="/services/{country}/branch-brochure" element={
  <BranchBrochureLayout>
    <{Country}BranchBrochure />
  </BranchBrochureLayout>
} />
```

### Component Structure
Each branch brochure component includes:
- Hero section with country flag and branding
- "What is a [Country] Branch?" section
- Branch vs Subsidiary comparison table
- Pricing tiers (Basic, Complete, Premium)
- Registration timeline
- Compliance requirements
- FAQ section
- Call-to-action sections

### Layout Component
All routes use `BranchBrochureLayout` which provides:
- Consistent header navigation
- Footer
- Dark theme styling
- Responsive design

---

## Missing EU Countries

The following EU countries do not yet have branch brochure pages implemented:

1. 🇪🇪 Estonia
2. 🇱🇻 Latvia  
3. 🇱🇹 Lithuania
4. 🇱🇺 Luxembourg
5. 🇲🇹 Malta
6. 🇸🇮 Slovenia

These can be added following the same pattern when needed.

---

## Usage Examples

### Direct Navigation
```typescript
// Navigate to German branch brochure
navigate('/german-branch-brochure');

// Navigate to German branch brochure via services
navigate('/services/germany/branch-brochure');
```

### Link Components
```jsx
// Standalone route
<Link to="/french-branch-brochure">French Branch Info</Link>

// Services route
<Link to="/services/france/branch-brochure">French Branch Info</Link>
```

---

## File Structure
```
src/
├── pages/
│   ├── DutchBranchBrochure.tsx
│   ├── AustrianBranchBrochure.tsx
│   ├── BelgianBranchBrochure.tsx
│   ├── BulgarianBranchBrochure.tsx
│   ├── CroatianBranchBrochure.tsx
│   ├── CypriotBranchBrochure.tsx
│   ├── CzechBranchBrochure.tsx
│   ├── DanishBranchBrochure.tsx
│   ├── FinnishBranchBrochure.tsx
│   ├── FrenchBranchBrochure.tsx
│   ├── GermanBranchBrochure.tsx
│   ├── GreekBranchBrochure.tsx
│   ├── HungarianBranchBrochure.tsx
│   ├── IrishBranchBrochure.tsx
│   ├── ItalianBranchBrochure.tsx
│   ├── PolishBranchBrochure.tsx
│   ├── PortugueseBranchBrochure.tsx
│   ├── RomanianBranchBrochure.tsx
│   ├── SlovakBranchBrochure.tsx
│   ├── SpanishBranchBrochure.tsx
│   └── SwedishBranchBrochure.tsx
├── components/
│   └── layout/
│       └── BranchBrochureLayout.tsx
└── App.tsx
```

---

## Summary

- **Total Countries**: 21 EU countries
- **Total Routes**: 42 routes (21 standalone + 21 services)
- **All routes include**: Headers, footers, and consistent styling
- **DestinationSlider integration**: 20 major cities navigate to branch brochures
- **Consistent structure**: All pages follow the same design pattern
- **Responsive design**: All pages work on desktop and mobile devices

This implementation provides comprehensive coverage for EU branch registration services with a consistent user experience across all countries.
