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
import { SITE_URL, EMAILS, SOCIAL_PROFILES } from "@/config/site";

const Index = () => {
  // Organization JSON-LD schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StandardCore",
    "url": SITE_URL,
    "logo": "`${SITE_URL}/logo.png`",
    "description": "Deterministic Engine for eCTD v4.0 & ESG NextGen - Standardized infrastructure for regulatory document lifecycles",
    // sameAs omitted until real, owned social profiles exist. Listing handles
    // the company does not control misrepresents identity to search engines.
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": EMAILS.enterprise
    }
  };

  // WebSite JSON-LD schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StandardCore",
    "url": SITE_URL,
    "description": "Standardized infrastructure for the transition from hierarchical folders to relational document lifecycles. 100% Traceability. Zero-Hallucination Mapping.",
    "publisher": {
      "@type": "Organization",
      "name": "StandardCore"
    },
    // SearchAction removed: the app has no /search route, so advertising one
    // tells Google about a page that 404s (well, soft-404s via SPA fallback).
  };

  // BreadcrumbList JSON-LD schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Platform",
        "item": `${SITE_URL}/#platform`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Solutions",
        "item": `${SITE_URL}/#solutions`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Resources",
        "item": `${SITE_URL}/#resources`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Pricing",
        "item": `${SITE_URL}/#pricing`
      }
    ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
