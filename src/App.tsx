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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
