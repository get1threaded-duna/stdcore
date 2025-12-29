import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Zap, CheckCircle, ArrowRight, FileText, Settings, Globe } from "lucide-react";
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
    icon: FileText,
    title: "Native v4.0 Support",
    description: "Full implementation of ICH M8 eCTD v4.0 specification with automatic XML generation and validation."
  },
  {
    icon: Settings,
    title: "Smart Assembly",
    description: "Intelligent document assembly with automatic lifecycle management, cross-references, and dependency tracking."
  },
  {
    icon: Globe,
    title: "Multi-Region Ready",
    description: "Built-in support for FDA, EMA, PMDA, Health Canada, and TGA regional requirements."
  },
  {
    icon: Zap,
    title: "Real-time Validation",
    description: "Continuous validation against regulatory specifications with instant feedback and error resolution."
  }
];

const capabilities = [
  "Automated XML backbone generation",
  "Lifecycle operation management (new, append, replace, delete)",
  "Cross-reference integrity validation",
  "Document hash verification (SHA-256)",
  "Leaf title and attribute management",
  "Study tagging file generation",
  "Regional envelope configuration",
  "Submission unit tracking"
];

const EctdEngine = () => {
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
              <BreadcrumbPage>eCTD v4.0 Engine</BreadcrumbPage>
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
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              eCTD v4.0 Engine
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The industry's first fully deterministic eCTD v4.0 publishing engine. Generate compliant submissions with mathematical precision and zero validation errors.
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

          {/* Capabilities */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  className="flex items-center gap-3 p-4 rounded-lg bg-secondary/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{capability}</span>
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
            <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Transform Your Submissions?</h2>
            <p className="text-muted-foreground mb-6">See how our eCTD v4.0 Engine can eliminate validation errors and accelerate your regulatory timeline.</p>
            <Link to="/contact">
              <Button className="gap-2">
                Request a Demo <ArrowRight className="w-4 h-4" />
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

export default EctdEngine;
