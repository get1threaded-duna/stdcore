import { Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeterministicToggle from "./DeterministicToggle";
import ComplianceRibbon from "./ComplianceRibbon";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Grid Overlay Background */}
      <div className="absolute inset-0 grid-overlay" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col justify-center container mx-auto px-6 py-20">
        {/* Top Badge */}
        <div className="flex justify-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground font-mono text-xs">
              Regulatory Infrastructure Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">The </span>
            <span className="text-gradient-primary">Deterministic Engine</span>
            <br />
            <span className="text-foreground">for eCTD v4.0 & ESG NextGen</span>
          </h1>
        </div>

        {/* Sub-headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Standardized infrastructure for the transition from hierarchical folders 
            to relational document lifecycles.{" "}
            <span className="text-foreground font-medium">100% Traceability.</span>{" "}
            <span className="text-foreground font-medium">Zero-Hallucination Mapping.</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <Button variant="hero" size="xl" className="group">
            <Lock className="w-5 h-5 mr-1" />
            Access Master Vault (Data Room)
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Deterministic Toggle Feature */}
        <DeterministicToggle />
      </div>

      {/* Compliance Ribbon */}
      <ComplianceRibbon />
    </section>
  );
};

export default HeroSection;
