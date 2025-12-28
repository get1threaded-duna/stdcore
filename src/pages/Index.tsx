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
  return (
    <AnimatePresence mode="wait">
      <motion.main 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
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
