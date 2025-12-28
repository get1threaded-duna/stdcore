import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import MechanismSection from "@/components/MechanismSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  // Organization JSON-LD schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StandardCore",
    "url": "https://standardcore.com",
    "logo": "https://standardcore.com/logo.png",
    "description": "Deterministic Engine for eCTD v4.0 & ESG NextGen - Standardized infrastructure for regulatory document lifecycles",
    "sameAs": [
      "https://twitter.com/StandardCore",
      "https://linkedin.com/company/standardcore"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "contact@standardcore.com"
    }
  };

  // WebSite JSON-LD schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StandardCore",
    "url": "https://standardcore.com",
    "description": "Standardized infrastructure for the transition from hierarchical folders to relational document lifecycles. 100% Traceability. Zero-Hallucination Mapping.",
    "publisher": {
      "@type": "Organization",
      "name": "StandardCore"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://standardcore.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        <NavigationHeader />
        <div className="pt-16 scroll-smooth">
          <section id="platform">
            <HeroSection />
          </section>
          <section id="solutions">
            <ProofSection />
            <MechanismSection />
          </section>
          <section id="resources">
            <ArchitectureDiagram />
            <FAQSection />
          </section>
          <section id="pricing">
            <DemoSection />
          </section>
          <Footer />
        </div>
        <ScrollToTop />
      </motion.main>
    </AnimatePresence>
  );
};

export default Index;
