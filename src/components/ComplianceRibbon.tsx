import { Shield, FileCheck, Lock, Heart } from "lucide-react";

const complianceBadges = [
  {
    icon: FileCheck,
    label: "ICH M8 v1.6",
    sublabel: "Compliant",
  },
  {
    icon: Shield,
    label: "21 CFR Part 11",
    sublabel: "Validated",
  },
  {
    icon: Lock,
    label: "SOC2 Type II",
    sublabel: "Certified",
  },
  {
    icon: Heart,
    label: "HIPAA",
    sublabel: "Certified",
  },
];

const ComplianceRibbon = () => {
  return (
    <div className="w-full border-t border-border/30 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Enterprise Compliance & Certifications
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {complianceBadges.map((badge, index) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 opacity-0 animate-fade-in group cursor-default"
                style={{ animationDelay: `${index * 100 + 600}ms`, animationFillMode: 'forwards' }}
              >
                <div className="p-2 rounded-lg bg-secondary/50 border border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                  <badge.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {badge.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {badge.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRibbon;
