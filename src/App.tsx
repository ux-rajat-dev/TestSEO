import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ServiceTemplate } from './pages/ServiceTemplate'
import { EBranch } from './pages/EBranch'
import { Tools } from './pages/Tools'
import { Pricing } from './pages/Pricing'
import { NewTutorial } from './pages/NewTutorial'
import { CompanyFormationPage } from './pages/services/CompanyFormationPage'
import { MailboxPage } from './pages/services/MailboxPage'
import { AccountingPage } from './pages/services/AccountingPage'
import { TaxFilingPage } from './pages/services/TaxFilingPage'
import { CorporateSecretaryPage } from './pages/services/CorporateSecretaryPage'
import { LegalPage } from './pages/services/LegalPage'
import { MarketingServicesPage } from './pages/services/MarketingServicesPage'
import { CompanyEssentialsPage } from './pages/services/CompanyEssentialsPage'
import { BranchRegistrationRequirements } from './pages/BranchRegistrationRequirements'
import { BlogDetail } from './pages/blog/BlogDetail'
import { BlogPostBySlug } from './pages/blog/BlogPostBySlug'
import { BlogPage } from './pages/blog/BlogPage'
import { Services } from './pages/Services'
import { EUServicesPage } from './components/EUServicesPage'
import { PaymentPage } from './components/PaymentPage'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { PaymentCancelled } from './pages/PaymentCancelled'
import { PaymentTest } from './pages/PaymentTest'
import { AboutUs } from './pages/AboutUs'
import {SurveyForm} from './components/SurveyForm'
import { NetherlandsProductPage } from './components/expansion/NetherlandsProductPage'
import { FranceProductPage } from './components/expansion/FranceProductPage'
import { GermanyProductPage } from './components/expansion/GermanyProductPage'
import { CountryPage } from './components/countryyy p/CountryPage'
import { Contact } from './pages/Contact'
import { QuotePage } from './pages/QuotePage'
import { PromoPage } from './pages/PromoPage'
import { QualificationPage } from './pages/QualificationPage'
import { OrderSummaryPage } from './pages/OrderSummaryPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { FloatingChatbot } from './components/FloatingChatbot'
import { CountryProvider } from './contexts/CountryContext'
import { BranchBrochureLayout } from './components/layout/BranchBrochureLayout'
import { NetherlandsBranchPage } from './pages/NetherlandsBranchPage'
import {
  BelgiumBranchPage,
  GermanyBranchPage,
  AustriaBranchPage,
  BulgariaBranchPage,
  CroatiaBranchPage,
  CyprusBranchPage,
  CzechRepublicBranchPage,
  DenmarkBranchPage,
  EstoniaBranchPage,
  FinlandBranchPage,
  FranceBranchPage,
  GreeceBranchPage,
  HungaryBranchPage,
  IrelandBranchPage,
  ItalyBranchPage,
  LatviaBranchPage,
  LithuaniaBranchPage,
  LuxembourgBranchPage,
  MaltaBranchPage,
  PolandBranchPage,
  PortugalBranchPage,
  RomaniaBranchPage,
  SlovakiaBranchPage,
  SloveniaBranchPage,
  SpainBranchPage,
  SwedenBranchPage,
} from './pages/branch-pages'
import { DutchBranchBrochure } from './pages/DutchBranchBrochure'
import { AustrianBranchBrochure } from './pages/AustrianBranchBrochure'
import { BelgianBranchBrochure } from './pages/BelgianBranchBrochure'
import { BulgarianBranchBrochure } from './pages/BulgarianBranchBrochure'
import { CroatianBranchBrochure } from './pages/CroatianBranchBrochure'
import { CypriotBranchBrochure } from './pages/CypriotBranchBrochure'
import { CzechBranchBrochure } from './pages/CzechBranchBrochure'
import { DanishBranchBrochure } from './pages/DanishBranchBrochure'
import { FinnishBranchBrochure } from './pages/FinnishBranchBrochure'
import { FrenchBranchBrochure } from './pages/FrenchBranchBrochure'
import { GermanBranchBrochure } from './pages/GermanBranchBrochure'
import { HungarianBranchBrochure } from './pages/HungarianBranchBrochure'
import { IrishBranchBrochure } from './pages/IrishBranchBrochure'
import { PolishBranchBrochure } from './pages/PolishBranchBrochure'
import { PortugueseBranchBrochure } from './pages/PortugueseBranchBrochure'
import { RomanianBranchBrochure } from './pages/RomanianBranchBrochure'
import { SlovakBranchBrochure } from './pages/SlovakBranchBrochure'
import { SpanishBranchBrochure } from './pages/SpanishBranchBrochure'
import { SwedishBranchBrochure } from './pages/SwedishBranchBrochure'
import { GreekBranchBrochure } from './pages/GreekBranchBrochure'
import { ItalianBranchBrochure } from './pages/ItalianBranchBrochure'
import { EstonianBranchBrochure } from './pages/EstonianBranchBrochure'
import { LatvianBranchBrochure } from './pages/LatvianBranchBrochure'
import { LithuanianBranchBrochure } from './pages/LithuanianBranchBrochure'
import { LuxembourgBranchBrochure } from './pages/LuxembourgBranchBrochure'
import { MalteseBranchBrochure } from './pages/MalteseBranchBrochure'
import { SlovenianBranchBrochure } from './pages/SlovenianBranchBrochure'
import './styles/globals.css'

// Redirect component for sending users to external URLs (e.g., client dashboard)
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to
  }, [to])
  return null
}

export function App() {
  return (
    <CountryProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/netherlands-branch" element={<NetherlandsBranchPage />} />
        <Route path="/belgium-branch" element={<BelgiumBranchPage />} />
        <Route path="/germany-branch" element={<GermanyBranchPage />} />
        <Route path="/france-branch" element={<FranceBranchPage />} />
        <Route path="/spain-branch" element={<SpainBranchPage />} />
        <Route path="/italy-branch" element={<ItalyBranchPage />} />
        <Route path="/poland-branch" element={<PolandBranchPage />} />
        <Route path="/austria-branch" element={<AustriaBranchPage />} />
        <Route path="/bulgaria-branch" element={<BulgariaBranchPage />} />
        <Route path="/croatia-branch" element={<CroatiaBranchPage />} />
        <Route path="/cyprus-branch" element={<CyprusBranchPage />} />
        <Route path="/czech-republic-branch" element={<CzechRepublicBranchPage />} />
        <Route path="/denmark-branch" element={<DenmarkBranchPage />} />
        <Route path="/estonia-branch" element={<EstoniaBranchPage />} />
        <Route path="/finland-branch" element={<FinlandBranchPage />} />
        <Route path="/greece-branch" element={<GreeceBranchPage />} />
        <Route path="/hungary-branch" element={<HungaryBranchPage />} />
        <Route path="/ireland-branch" element={<IrelandBranchPage />} />
        <Route path="/latvia-branch" element={<LatviaBranchPage />} />
        <Route path="/lithuania-branch" element={<LithuaniaBranchPage />} />
        <Route path="/luxembourg-branch" element={<LuxembourgBranchPage />} />
        <Route path="/malta-branch" element={<MaltaBranchPage />} />
        <Route path="/portugal-branch" element={<PortugalBranchPage />} />
        <Route path="/romania-branch" element={<RomaniaBranchPage />} />
        <Route path="/slovakia-branch" element={<SlovakiaBranchPage />} />
        <Route path="/slovenia-branch" element={<SloveniaBranchPage />} />
        <Route path="/sweden-branch" element={<SwedenBranchPage />} />
        <Route path="/services/company-formation" element={<CompanyFormationPage />} />
        <Route path="/services/:country/company-formation" element={<CompanyFormationPage />} />
        <Route path="/services/mailbox" element={<MailboxPage />} />
        <Route path="/services/:country/mailbox" element={<MailboxPage />} />
        <Route path="/services/accounting" element={<AccountingPage />} />
        <Route path="/services/:country/accounting" element={<AccountingPage />} />
        <Route path="/services/tax-filing" element={<TaxFilingPage />} />
        <Route path="/services/:country/tax-filing" element={<TaxFilingPage />} />
        <Route path="/services/corporate-secretary" element={<CorporateSecretaryPage />} />
        <Route path="/services/:country/corporate-secretary" element={<CorporateSecretaryPage />} />
        <Route path="/services/payment" element={<PaymentPage />} />
        <Route path="/services/legal" element={<LegalPage />} />
        <Route
          path="/dutch-branch-brochure"
          element={
            <BranchBrochureLayout>
              <DutchBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/austrian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <AustrianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/belgian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <BelgianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/bulgarian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <BulgarianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/croatian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <CroatianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/cypriot-branch-brochure"
          element={
            <BranchBrochureLayout>
              <CypriotBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/czech-branch-brochure"
          element={
            <BranchBrochureLayout>
              <CzechBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/danish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <DanishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/finnish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <FinnishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/french-branch-brochure"
          element={
            <BranchBrochureLayout>
              <FrenchBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/german-branch-brochure"
          element={
            <BranchBrochureLayout>
              <GermanBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/hungarian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <HungarianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/irish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <IrishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/polish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <PolishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/portuguese-branch-brochure"
          element={
            <BranchBrochureLayout>
              <PortugueseBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/romanian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <RomanianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/slovak-branch-brochure"
          element={
            <BranchBrochureLayout>
              <SlovakBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/spanish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <SpanishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/swedish-branch-brochure"
          element={
            <BranchBrochureLayout>
              <SwedishBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/greek-branch-brochure"
          element={
            <BranchBrochureLayout>
              <GreekBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/italian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <ItalianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/estonian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <EstonianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/latvian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <LatvianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/lithuanian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <LithuanianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/luxembourg-branch-brochure"
          element={
            <BranchBrochureLayout>
              <LuxembourgBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/maltese-branch-brochure"
          element={
            <BranchBrochureLayout>
              <MalteseBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route
          path="/slovenian-branch-brochure"
          element={
            <BranchBrochureLayout>
              <SlovenianBranchBrochure />
            </BranchBrochureLayout>
          }
        />
        <Route path="/services/:country/legal" element={<LegalPage />} />
        <Route path="/services/marketing" element={<MarketingServicesPage />} />
        <Route path="/services/company-essentials" element={<CompanyEssentialsPage />} />
        <Route path="/services/:country/branch-registration" element={<BranchRegistrationRequirements />} />
        <Route path="/services/netherlands/branch-brochure" element={<BranchBrochureLayout><DutchBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/austria/branch-brochure" element={<BranchBrochureLayout><AustrianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/belgium/branch-brochure" element={<BranchBrochureLayout><BelgianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/bulgaria/branch-brochure" element={<BranchBrochureLayout><BulgarianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/croatia/branch-brochure" element={<BranchBrochureLayout><CroatianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/cyprus/branch-brochure" element={<BranchBrochureLayout><CypriotBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/czech-republic/branch-brochure" element={<BranchBrochureLayout><CzechBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/denmark/branch-brochure" element={<BranchBrochureLayout><DanishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/finland/branch-brochure" element={<BranchBrochureLayout><FinnishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/france/branch-brochure" element={<BranchBrochureLayout><FrenchBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/germany/branch-brochure" element={<BranchBrochureLayout><GermanBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/hungary/branch-brochure" element={<BranchBrochureLayout><HungarianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/ireland/branch-brochure" element={<BranchBrochureLayout><IrishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/poland/branch-brochure" element={<BranchBrochureLayout><PolishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/portugal/branch-brochure" element={<BranchBrochureLayout><PortugueseBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/romania/branch-brochure" element={<BranchBrochureLayout><RomanianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/slovakia/branch-brochure" element={<BranchBrochureLayout><SlovakBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/spain/branch-brochure" element={<BranchBrochureLayout><SpanishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/sweden/branch-brochure" element={<BranchBrochureLayout><SwedishBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/greece/branch-brochure" element={<BranchBrochureLayout><GreekBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/italy/branch-brochure" element={<BranchBrochureLayout><ItalianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/estonia/branch-brochure" element={<BranchBrochureLayout><EstonianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/latvia/branch-brochure" element={<BranchBrochureLayout><LatvianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/lithuania/branch-brochure" element={<BranchBrochureLayout><LithuanianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/luxembourg/branch-brochure" element={<BranchBrochureLayout><LuxembourgBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/malta/branch-brochure" element={<BranchBrochureLayout><MalteseBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/services/slovenia/branch-brochure" element={<BranchBrochureLayout><SlovenianBranchBrochure /></BranchBrochureLayout>} />
        <Route path="/market-entry" element={<EUServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceTemplate />} />
        <Route path="/services" element={<Services />} />
        <Route path="/get-started" element={<ExternalRedirect to="/services" />} />
        <Route path="/ebranch" element={<EBranch />} />
        <Route path ="/survey" element={<SurveyForm onClose={() => window.history.back()} />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/tutorials/:tutorialId" element={<NewTutorial />} />
        <Route path="/tutorials" element={<NewTutorial />} />
        <Route path="/tutorials/:country-vat-requirements" element={<NewTutorial />} />
        <Route path="/tutorials/:country-corporate-tax-filing" element={<NewTutorial />} />
        <Route path="/tutorials/:country-business-bank-account" element={<NewTutorial />} />
        <Route path="/tutorials/hiring-employees-:country" element={<NewTutorial />} />
        <Route path="/tutorials/:country-employment-contracts" element={<NewTutorial />} />
        <Route path="/tutorials/choosing-:country-business-entity" element={<NewTutorial />} />
        <Route path="/tutorials/setting-up-:country-company" element={<NewTutorial />} />
        <Route path="/tutorials/required-documents-:country" element={<NewTutorial />} />
        <Route path="/tutorials/:country-compliance-calendar" element={<NewTutorial />} />
        <Route path="/tutorials/:country-ubo-registration" element={<NewTutorial />} />
        <Route path="/tutorials/:country-business-financing" element={<NewTutorial />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/post/:slug" element={<BlogPostBySlug />} />
        <Route path="/resources" element={<BlogPage />} />
        <Route path="/resources/knowledge-base" element={<BlogPage />} />
        <Route path="/resources/faq" element={<BlogPage />} />
        <Route path="/resources/case-studies" element={<BlogPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/qualification" element={<QualificationPage />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/france-business-setup" element={<FranceProductPage />} />
        <Route path="/germany-business-setup" element={<GermanyProductPage />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/payment-test" element={<PaymentTest />} />
        {/* Redirect any portal signup routes to the external client dashboard */}
        <Route path="/portal/*" element={<ExternalRedirect to="https://clientdashboard.houseofcompanies.io/" />} />
        {/* Optional: direct signup path redirect */}
        <Route path="/signup" element={<ExternalRedirect to="https://clientdashboard.houseofcompanies.io/" />} />
        
      </Routes>
      
      {/* Floating Chatbot - Available on all pages */}
      <FloatingChatbot />
    </Router>
    </CountryProvider>
  )
}
