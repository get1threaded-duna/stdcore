import { motion } from "framer-motion";
import { Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeterministicToggle from "./DeterministicToggle";
import ComplianceRibbon from "./ComplianceRibbon";

// External Utility Project URL
const UTILITY_APP_URL = "https://id-preview--1c7bab28-ee3b-47e1-9fa7-54c85e1eddaf.lovable.app";
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Grid Overlay Background */}
      <div className="absolute inset-0 grid-overlay" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col justify-center container mx-auto px-6 py-20">
        {/* Top Badge */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm">
            <motion.span 
              className="w-2 h-2 rounded-full bg-success"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-muted-foreground font-mono text-xs">
              Regulatory Infrastructure Platform
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">The </span>
            <span className="text-gradient-primary">Deterministic Engine</span>
            <br />
            <span className="text-foreground">for eCTD v4.0 & ESG NextGen</span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Standardized infrastructure for the transition from hierarchical folders 
            to relational document lifecycles.{" "}
            <span className="text-foreground font-medium">100% Traceability.</span>{" "}
            <span className="text-foreground font-medium">Zero-Hallucination Mapping.</span>
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href={UTILITY_APP_URL} target="_blank" rel="noopener noreferrer">
                <Lock className="w-5 h-5 mr-1" />
                Access Master Vault (Data Room)
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Deterministic Toggle Feature */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <DeterministicToggle />
        </motion.div>
      </div>

      {/* Compliance Ribbon */}
      <ComplianceRibbon />
    </section>
  );
};

export default HeroSection;
