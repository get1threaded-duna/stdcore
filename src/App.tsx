import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Security from "./pages/Security";
import Contact from "./pages/Contact";
import Accessibility from "./pages/Accessibility";
import FDAOIDs from "./pages/FDAOIDs";
import Whitepaper from "./pages/Whitepaper";
import Blog from "./pages/Blog";
import BlogPostDeterministic from "./pages/BlogPostDeterministic";
import ReadinessCalculator from "./pages/ReadinessCalculator";
import AdminAuth from "./pages/AdminAuth";
import AdminLeads from "./pages/AdminLeads";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import EctdEngine from "./pages/EctdEngine";
import LegacyBridge from "./pages/LegacyBridge";
import EsgNextgen from "./pages/EsgNextgen";
import ValidationSuite from "./pages/ValidationSuite";
import IchM8Guidelines from "./pages/IchM8Guidelines";
import FdaEsgRequirements from "./pages/FdaEsgRequirements";
import CfrPart11 from "./pages/CfrPart11";
import EuCtdStandards from "./pages/EuCtdStandards";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/security" element={<Security />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/fda-oids" element={<FDAOIDs />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/deterministic-vs-probabilistic-regulatory" element={<BlogPostDeterministic />} />
          <Route path="/readiness-calculator" element={<ReadinessCalculator />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/ectd-engine" element={<EctdEngine />} />
          <Route path="/legacy-bridge" element={<LegacyBridge />} />
          <Route path="/esg-nextgen" element={<EsgNextgen />} />
          <Route path="/validation-suite" element={<ValidationSuite />} />
          <Route path="/ich-m8-guidelines" element={<IchM8Guidelines />} />
          <Route path="/fda-esg-requirements" element={<FdaEsgRequirements />} />
          <Route path="/21-cfr-part-11" element={<CfrPart11 />} />
          <Route path="/eu-ctd-standards" element={<EuCtdStandards />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
