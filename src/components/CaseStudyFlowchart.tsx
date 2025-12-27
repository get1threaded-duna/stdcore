import { FileWarning, ArrowRight, CheckCircle2, Database } from "lucide-react";

const CaseStudyFlowchart = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-8">
      {/* Node 1: Messy Legacy Files */}
      <div className="flex flex-col items-center gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        <div className="w-20 h-20 rounded-xl bg-error/10 border border-error/30 flex items-center justify-center">
          <FileWarning className="w-9 h-9 text-error" />
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-foreground block">Messy Legacy</span>
          <span className="text-xs text-muted-foreground">v3.2 Files</span>
        </div>
      </div>

      {/* Arrow 1 */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
      </div>

      {/* Node 2: StandardCore Bridge */}
      <div className="flex flex-col items-center gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
        <div className="w-24 h-20 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center relative overflow-hidden">
          <Database className="w-9 h-9 text-primary" />
          {/* Animated processing indicator */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse-glow" />
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-primary block">StandardCore</span>
          <span className="text-xs text-muted-foreground">Bridge Engine</span>
        </div>
      </div>

      {/* Arrow 2 */}
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
        <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
      </div>

      {/* Node 3: Validated XML */}
      <div className="flex flex-col items-center gap-3 opacity-0 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <div className="w-20 h-20 rounded-xl bg-success/10 border border-success/30 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-success" />
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-foreground block">Validated XML</span>
          <span className="text-xs text-muted-foreground">v4.0 Native</span>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyFlowchart;
