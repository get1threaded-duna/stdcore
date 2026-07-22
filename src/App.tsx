import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CookieConsent from "./components/CookieConsent";

// Route-level code splitting: each page loads only when visited
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Security = lazy(() => import("./pages/Security"));
const Contact = lazy(() => import("./pages/Contact"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const FDAOIDs = lazy(() => import("./pages/FDAOIDs"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDeterministic = lazy(() => import("./pages/BlogPostDeterministic"));
const ReadinessCalculator = lazy(() => import("./pages/ReadinessCalculator"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EctdEngine = lazy(() => import("./pages/EctdEngine"));
const LegacyBridge = lazy(() => import("./pages/LegacyBridge"));
const EsgNextgen = lazy(() => import("./pages/EsgNextgen"));
const ValidationSuite = lazy(() => import("./pages/ValidationSuite"));
const IchM8Guidelines = lazy(() => import("./pages/IchM8Guidelines"));
const FdaEsgRequirements = lazy(() => import("./pages/FdaEsgRequirements"));
const CfrPart11 = lazy(() => import("./pages/CfrPart11"));
const EuCtdStandards = lazy(() => import("./pages/EuCtdStandards"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Careers = lazy(() => import("./pages/Careers"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
