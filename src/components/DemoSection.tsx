import { motion } from "framer-motion";
import { Lock, ChevronRight, Calendar, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./animations/ScrollReveal";
import UtilityScreenshot from "./UtilityScreenshot";

// External Utility Project URL
import { UTILITY_APP_URL } from "@/config/site";

const DemoSection = () => {
  return (
    <section className="relative py-24 bg-card/30">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Platform Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Bridge Engine in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how StandardCore transforms legacy eCTD v3.2 submissions into v4.0 relational graphs with 100% traceability.
          </p>
        </ScrollReveal>

        {/* Platform Screenshot */}
        <ScrollReveal delay={0.2}>
          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <UtilityScreenshot />
          </motion.div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.3}>
          <div className="border border-border/40 rounded-2xl bg-background/50 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Ready to Transform Your Regulatory Infrastructure?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join leading pharmaceutical companies already using StandardCore for eCTD v4.0 migration and ESG NextGen compliance.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: Zap, title: "48-Hour Migration", desc: "Legacy v3.2 data converted to native v4.0 graphs" },
                    { icon: Shield, title: "Zero RTF Guarantee", desc: "Binary validation prevents refusal-to-file actions" },
                    { icon: Calendar, title: "Q4 2025 Ready", desc: "Compliant before FDA's mandatory deadline" },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right CTA */}
              <div className="flex flex-col items-center lg:items-start gap-6 p-8 rounded-xl bg-secondary/20 border border-border/30">
                <div className="text-center lg:text-left">
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Access the Platform
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Log in to the StandardCore Utility to begin your eCTD v4.0 migration journey.
                  </p>
                </div>

                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="w-full group"
                    asChild
                  >
                    <a href={UTILITY_APP_URL} target="_blank" rel="noopener noreferrer">
                      <Lock className="w-5 h-5 mr-2" />
                      Access Master Vault
                      <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>21 CFR Part 11</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>HIPAA Compliant</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center lg:text-left">
                  Contact{" "}
                  <a href="mailto:enterprise@standardcore.com" className="text-primary hover:underline">
                    enterprise@standardcore.com
                  </a>
                  {" "}for enterprise licensing and custom deployments.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DemoSection;
