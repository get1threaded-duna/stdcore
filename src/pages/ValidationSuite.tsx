import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { CheckSquare, CheckCircle, ArrowRight, AlertTriangle, FileSearch, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const features = [
  {
    icon: FileSearch,
    title: "Multi-Level Validation",
    description: "Comprehensive validation at document, folder, submission, and sequence levels."
  },
  {
    icon: AlertTriangle,
    title: "Error Prevention",
    description: "Catch issues before they become RTF letters with proactive validation rules."
  },
  {
    icon: Settings,
    title: "Custom Rule Engine",
    description: "Define organization-specific validation rules beyond regulatory requirements."
  },
  {
    icon: CheckSquare,
    title: "Compliance Reports",
    description: "Generate detailed validation reports for internal review and audit purposes."
  }
];

const validationTypes = [
  { title: "Technical Validation", items: ["XML schema compliance", "Document checksums", "File naming conventions", "Folder structure verification"] },
  { title: "Business Validation", items: ["Cross-reference integrity", "Lifecycle operation rules", "Study tagging accuracy", "Metadata completeness"] },
  { title: "Regional Validation", items: ["FDA-specific requirements", "EMA regional rules", "PMDA Japan requirements", "Health Canada guidelines"] }
];

const ValidationSuite = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-5xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-muted-foreground">Platform</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Validation Suite</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <CheckSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Validation Suite
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade validation engine that catches errors before they reach the agency. Validate against FDA, EMA, PMDA, and custom organizational rules.
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

          {/* Validation Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Validation Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {validationTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <h3 className="font-semibold text-foreground mb-4">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Validation Rules</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">RTF Prevention</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">&lt;30s</div>
              <div className="text-sm text-muted-foreground">Full Scan Time</div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Stop RTF Letters Before They Start</h2>
            <p className="text-muted-foreground mb-6">See how Validation Suite catches the errors that other tools miss.</p>
            <Link to="/contact">
              <Button className="gap-2">
                Request Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ValidationSuite;
