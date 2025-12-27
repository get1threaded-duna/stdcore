import DemoRequestForm from "./DemoRequestForm";

const DemoSection = () => {
  return (
    <section className="relative py-24 bg-card/30">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Request a Personalized Demo
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how StandardCore can transform your regulatory submission infrastructure. Our solutions architects will walk you through a tailored implementation plan.
              </p>
            </div>

            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Discovery Call</h4>
                    <p className="text-sm text-muted-foreground">30-minute assessment of your current infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Live Demo</h4>
                    <p className="text-sm text-muted-foreground">See the Bridge Engine with your sample data</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Implementation Roadmap</h4>
                    <p className="text-sm text-muted-foreground">Custom migration plan with timeline and milestones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <div className="border border-border/40 rounded-2xl bg-background/50 backdrop-blur-sm p-8">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
