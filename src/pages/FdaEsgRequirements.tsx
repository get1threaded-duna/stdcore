import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Send, CheckCircle, AlertTriangle, FileText, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const requirements = [
  {
    category: "Account Setup",
    items: [
      "FDA ESG Account registration and approval",
      "Digital certificate installation (WebTrust certified)",
      "AS2 trading partner configuration",
      "Test gateway validation before production"
    ]
  },
  {
    category: "Technical Requirements",
    items: [
      "AS2 protocol for secure transmission",
      "MDN (Message Disposition Notification) processing",
      "Proper MIME packaging of submissions",
      "SHA-256 checksums for file integrity"
    ]
  },
  {
    category: "Submission Standards",
    items: [
      "eCTD v3.2.2 or v4.0 format compliance",
      "Valid XML backbone and regional envelope",
      "PDF/A format for content documents",
      "Proper study data tagging (if applicable)"
    ]
  }
];

const submissionTypes = [
  { type: "NDA", description: "New Drug Applications for new molecular entities" },
  { type: "BLA", description: "Biologics License Applications for biological products" },
  { type: "ANDA", description: "Abbreviated New Drug Applications for generics" },
  { type: "IND", description: "Investigational New Drug applications" },
  { type: "DMF", description: "Drug Master Files for manufacturing info" },
  { type: "510(k)", description: "Premarket Notification for medical devices" }
];

const FdaEsgRequirements = () => {
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
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Regulatory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              FDA ESG Requirements
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Complete guide to FDA Electronic Submissions Gateway (ESG) requirements for electronic regulatory submissions to the U.S. Food and Drug Administration.
            </p>
          </div>

          {/* Overview */}
          <div className="prose prose-invert max-w-none mb-16">
            <div className="p-6 rounded-xl bg-card/50 border border-border/40">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                About FDA ESG
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The FDA Electronic Submissions Gateway (ESG) is the FDA's primary method for receiving electronic regulatory submissions. It provides a secure, reliable channel for sponsors to submit applications, amendments, and other regulatory documents directly to the FDA.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ESG uses industry-standard AS2 (Applicability Statement 2) protocol for secure message exchange, ensuring data integrity and non-repudiation through digital signatures and encryption.
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">ESG Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.category}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <h3 className="font-semibold text-foreground mb-4">{req.category}</h3>
                  <ul className="space-y-2">
                    {req.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submission Types */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Supported Submission Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {submissionTypes.map((sub, index) => (
                <motion.div
                  key={sub.type}
                  className="p-4 rounded-lg bg-secondary/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">{sub.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{sub.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-16">
            <div className="p-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Considerations</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• ESG accounts require FDA approval, which can take several weeks</li>
                    <li>• Always validate submissions on the test gateway before production</li>
                    <li>• Digital certificates must be renewed before expiration to avoid submission interruptions</li>
                    <li>• ESG has scheduled maintenance windows; plan submissions accordingly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <motion.div 
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Official Resources</h2>
            <p className="text-muted-foreground mb-6">Access FDA ESG documentation and registration portal.</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.fda.gov/industry/electronic-submissions-gateway" target="_blank" rel="noopener noreferrer">
                  FDA ESG Portal <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.fda.gov/drugs/electronic-regulatory-submission-and-review/electronic-common-technical-document-ectd" target="_blank" rel="noopener noreferrer">
                  eCTD Requirements <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FdaEsgRequirements;
