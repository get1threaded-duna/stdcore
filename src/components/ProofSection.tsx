import { TrendingUp } from "lucide-react";
import FactCard from "./FactCard";
import CaseStudyFlowchart from "./CaseStudyFlowchart";

const facts = [
  {
    title: "Zero RTF Guarantee.",
    text: "Our binary logic gate prevents 'Refusal to File' actions by halting submissions on any OID ambiguity. $0 in lost filing velocity.",
  },
  {
    title: "20x Migration Speed.",
    text: "The Legacy Bridge reconstructs 20 years of v3.2 sequence data into native v4.0 relational graphs in under 48 hours.",
  },
  {
    title: "100% Data Sovereignty.",
    text: "Federated agents process metadata behind your firewall. No raw clinical data ever leaves the Sponsor's VPC.",
  },
];

const ProofSection = () => {
  return (
    <section className="relative py-24 bg-background">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Hard Facts
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Proof-First Infrastructure
          </h2>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {facts.map((fact, index) => (
            <FactCard key={fact.title} {...fact} index={index} />
          ))}
        </div>

        {/* Case Study Section */}
        <div className="border border-border/40 rounded-xl bg-card/20 backdrop-blur-sm overflow-hidden">
          {/* Case Study Header */}
          <div className="p-6 md:p-8 border-b border-border/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <span className="text-xs font-mono uppercase tracking-widest text-primary mb-2 block">
                  Success Narrative
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Tier-1 Global Pharma Pilot
                </h3>
              </div>
              
              {/* Metric Badge */}
              <div className="opacity-0 animate-slide-up" style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}>
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-success/10 border border-success/30">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <div>
                    <span className="text-2xl font-bold text-success">$4.2M</span>
                    <span className="text-sm text-muted-foreground ml-2">saved in potential RTF penalties</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Multi-indication filing validated and submitted without a single Refusal to File action.
            </p>
          </div>

          {/* Flowchart */}
          <div className="p-6 md:p-8 bg-secondary/10">
            <CaseStudyFlowchart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
