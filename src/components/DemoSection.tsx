import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";
import DemoRequestForm from "./DemoRequestForm";

const DemoSection = () => {
  return (
    <section className="relative py-24 bg-card/30">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <ScrollReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Request a Personalized Demo
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how StandardCore can transform your regulatory submission infrastructure. Our solutions architects will walk you through a tailored implementation plan.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-4 pt-4">
                {[
                  { num: "1", title: "Discovery Call", desc: "30-minute assessment of your current infrastructure" },
                  { num: "2", title: "Live Demo", desc: "See the Bridge Engine with your sample data" },
                  { num: "3", title: "Implementation Roadmap", desc: "Custom migration plan with timeline and milestones" },
                ].map((item, index) => (
                  <motion.div 
                    key={item.num}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary) / 0.5)" }}
                    >
                      <span className="text-primary font-bold text-sm">{item.num}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Form */}
          <ScrollReveal delay={0.3} direction="right">
            <motion.div 
              className="border border-border/40 rounded-2xl bg-background/50 backdrop-blur-sm p-8"
              whileHover={{ borderColor: "hsl(var(--primary) / 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <DemoRequestForm />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
