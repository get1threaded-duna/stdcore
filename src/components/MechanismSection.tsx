import { Download, GitBranch, ShieldCheck, FileCode, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Ingestion",
    description: "Algorithmic intake of unstructured legacy metadata.",
    color: "primary",
  },
  {
    number: "02",
    icon: GitBranch,
    title: "Binary Mapping",
    description: "Mapping to 1,500+ proprietary OID matrices.",
    color: "primary",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Verification",
    titleExtra: (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help border-b border-dashed border-primary/50">
            Deterministic
            <Info className="w-3 h-3 text-primary/70" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-4 bg-card border border-border">
          <div className="space-y-2">
            <p className="font-semibold text-foreground text-sm">UUID v5 Hashing Process</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every document node is assigned a deterministic UUID v5 hash derived from its 
              namespace OID and content signature. This ensures bit-perfect reproducibility 
              across all validation cycles—identical inputs always produce identical outputs, 
              eliminating stochastic variance inherent in ML-based systems.
            </p>
            <code className="block text-xs font-mono bg-secondary/50 p-2 rounded text-primary">
              UUID.v5(OID_NAMESPACE, SHA256(content))
            </code>
          </div>
        </TooltipContent>
      </Tooltip>
    ),
    description: "logic gate validation (Zero-Hallucination).",
    color: "success",
  },
  {
    number: "04",
    icon: FileCode,
    title: "Output",
    description: "Automated XML backbone generation for FDA ESG NextGen.",
    color: "primary",
  },
];

const MechanismSection = () => {
  return (
    <section className="relative py-24 bg-card/30">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Mechanism of Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Deterministic Infrastructure: How the Bridge Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Standardized Rail methodology ensures complete traceability from legacy formats to FDA-compliant outputs.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 150 + 200}ms`, animationFillMode: 'forwards' }}
              >
                {/* Step Card */}
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      step.color === 'success' 
                        ? 'bg-success/10 border border-success/30 group-hover:border-success/50' 
                        : 'bg-primary/10 border border-primary/30 group-hover:border-primary/50'
                    }`}>
                      <step.icon className={`w-7 h-7 ${step.color === 'success' ? 'text-success' : 'text-primary'}`} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-xs font-mono font-bold text-foreground">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                    {step.titleExtra && (
                      <span className="ml-1">{step.titleExtra}</span>
                    )}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.titleExtra ? step.description : step.description}
                  </p>
                </div>

                {/* Connector Arrow (mobile/tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-border/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MechanismSection;
