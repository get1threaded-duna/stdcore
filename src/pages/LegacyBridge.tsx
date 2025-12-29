import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { RefreshCw, CheckCircle, ArrowRight, FileText, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: RefreshCw,
    title: "Automated Migration",
    description: "Seamlessly convert legacy eCTD v3.2.2 submissions to v4.0 format with full lifecycle preservation."
  },
  {
    icon: Database,
    title: "Data Integrity",
    description: "Maintain complete audit trails and document relationships throughout the migration process."
  },
  {
    icon: FileText,
    title: "Format Translation",
    description: "Intelligent mapping of legacy XML structures to FHIR-based v4.0 resources and bundles."
  },
  {
    icon: Shield,
    title: "Validation Assurance",
    description: "Pre and post-migration validation ensures compliance before and after conversion."
  }
];

const migrationSteps = [
  { step: "1", title: "Analysis", description: "Scan existing submissions to identify structure, dependencies, and potential issues" },
  { step: "2", title: "Mapping", description: "Create transformation rules for documents, metadata, and cross-references" },
  { step: "3", title: "Conversion", description: "Execute automated migration with real-time progress tracking" },
  { step: "4", title: "Validation", description: "Verify migrated submission against v4.0 specifications" },
  { step: "5", title: "Review", description: "Generate detailed migration report with change documentation" }
];

const LegacyBridge = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Legacy Bridge
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Migrate your eCTD v3.2.2 submissions to v4.0 with confidence. Our intelligent migration engine preserves every relationship while upgrading to the modern format.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card/50 border border-border/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Migration Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Migration Process</h2>
            <div className="space-y-4">
              {migrationSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Plan Your Migration</h2>
            <p className="text-muted-foreground mb-6">Our team can assess your legacy submissions and create a custom migration roadmap.</p>
            <Link to="/contact">
              <Button className="gap-2">
                Get Migration Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LegacyBridge;
