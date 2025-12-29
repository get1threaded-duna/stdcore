import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Send, CheckCircle, ArrowRight, Shield, Clock, Globe } from "lucide-react";
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
    icon: Send,
    title: "Direct Gateway Integration",
    description: "Native integration with FDA ESG for direct submission delivery with real-time status tracking."
  },
  {
    icon: Shield,
    title: "Pre-Submission Validation",
    description: "Comprehensive validation suite ensures your submission meets all FDA requirements before transmission."
  },
  {
    icon: Clock,
    title: "Automated Scheduling",
    description: "Schedule submissions in advance with automatic retry logic and notification system."
  },
  {
    icon: Globe,
    title: "Multi-Center Support",
    description: "Manage submissions from multiple global locations through a single unified interface."
  }
];

const capabilities = [
  "AS2 protocol compliant transmission",
  "Automatic MDN receipt processing",
  "Submission acknowledgement tracking",
  "Error handling and retry management",
  "Submission history and audit logs",
  "Certificate management",
  "Test gateway integration",
  "Submission scheduling"
];

const EsgNextgen = () => {
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
              <BreadcrumbPage>ESG NextGen</BreadcrumbPage>
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
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ESG NextGen
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Next-generation Electronic Submission Gateway integration. Submit directly to FDA with confidence, tracking every step from transmission to acknowledgement.
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
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Gateway Features</h2>
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Transmission Success</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">&lt;5min</div>
              <div className="text-sm text-muted-foreground">Avg. ACK Time</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 rounded-xl bg-card/50 border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Gateway Monitoring</div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Streamline Your FDA Submissions</h2>
            <p className="text-muted-foreground mb-6">Learn how ESG NextGen can reduce submission time and eliminate gateway errors.</p>
            <Link to="/contact">
              <Button className="gap-2">
                Schedule Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default EsgNextgen;
