import { useState } from "react";
import { ChevronDown, Database, FileInput, GitMerge, Shield, FileOutput, Server, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStage {
  id: string;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  details: string[];
  color: "muted" | "primary" | "success";
}

const pipelineStages: PipelineStage[] = [
  {
    id: "source",
    icon: FileInput,
    label: "Legacy Sources",
    sublabel: "v3.2 / v3.2.2",
    details: [
      "PDF documents with embedded metadata",
      "eCTD v3.2 folder hierarchies",
      "Unstructured XML fragments",
      "Legacy sequence manifests",
    ],
    color: "muted",
  },
  {
    id: "ingest",
    icon: Database,
    label: "Ingestion Layer",
    sublabel: "Parsing Engine",
    details: [
      "Multi-format document parsers",
      "Metadata extraction algorithms",
      "Character encoding normalization",
      "Checksum validation",
    ],
    color: "primary",
  },
  {
    id: "transform",
    icon: GitMerge,
    label: "Transformation Core",
    sublabel: "OID Mapping",
    details: [
      "1,500+ OID matrix lookup",
      "Relational graph construction",
      "UUID v5 hash assignment",
      "Cross-reference resolution",
    ],
    color: "primary",
  },
  {
    id: "validate",
    icon: Shield,
    label: "Validation Gate",
    sublabel: "Zero-Hallucination",
    details: [
      "Binary logic gate validation",
      "ICH M8 conformance checks",
      "Structural integrity verification",
      "Audit trail generation",
    ],
    color: "success",
  },
  {
    id: "output",
    icon: FileOutput,
    label: "Output Layer",
    sublabel: "v4.0 Native",
    details: [
      "FHIR-compliant XML generation",
      "ESG NextGen packaging",
      "Digital signature application",
      "Submission-ready artifacts",
    ],
    color: "success",
  },
];

const ArchitectureDiagram = () => {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const getColorClasses = (color: PipelineStage["color"], isExpanded: boolean) => {
    const base = {
      muted: {
        bg: "bg-muted/30",
        border: isExpanded ? "border-muted-foreground/40" : "border-border/40",
        icon: "text-muted-foreground",
        hover: "hover:border-muted-foreground/30",
      },
      primary: {
        bg: "bg-primary/10",
        border: isExpanded ? "border-primary/50" : "border-primary/30",
        icon: "text-primary",
        hover: "hover:border-primary/40",
      },
      success: {
        bg: "bg-success/10",
        border: isExpanded ? "border-success/50" : "border-success/30",
        icon: "text-success",
        hover: "hover:border-success/40",
      },
    };
    return base[color];
  };

  return (
    <section className="relative py-24 bg-background">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Technical Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            eCTD v4.0 Processing Pipeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any stage to explore the technical implementation details.
          </p>
        </div>

        {/* Architecture Container */}
        <div className="relative border border-border/40 rounded-2xl bg-card/20 backdrop-blur-sm p-8 overflow-hidden">
          {/* Security Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">VPC Isolated</span>
          </div>

          {/* Pipeline Stages */}
          <div className="flex flex-col lg:flex-row items-stretch gap-4 mt-8">
            {pipelineStages.map((stage, index) => {
              const isExpanded = expandedStage === stage.id;
              const colors = getColorClasses(stage.color, isExpanded);

              return (
                <div key={stage.id} className="flex-1 flex flex-col lg:flex-row items-center gap-4">
                  {/* Stage Card */}
                  <button
                    onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                    className={cn(
                      "w-full lg:w-auto flex-1 p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                      colors.bg,
                      colors.border,
                      colors.hover,
                      isExpanded && "ring-2 ring-offset-2 ring-offset-background ring-primary/20"
                    )}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        colors.bg,
                        "border",
                        colors.border
                      )}>
                        <stage.icon className={cn("w-6 h-6", colors.icon)} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{stage.label}</p>
                        <p className="text-xs text-muted-foreground">{stage.sublabel}</p>
                      </div>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-300",
                        isExpanded && "rotate-180"
                      )} />
                    </div>

                    {/* Expanded Details */}
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      isExpanded ? "max-h-48 mt-4 pt-4 border-t border-border/30" : "max-h-0"
                    )}>
                      <ul className="space-y-2 text-left">
                        {stage.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", colors.icon, "bg-current")} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>

                  {/* Connector Arrow */}
                  {index < pipelineStages.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-8">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-border">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Infrastructure Badge */}
          <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Server className="w-4 h-4" />
              <span>Federated Processing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>21 CFR Part 11 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>End-to-End Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
