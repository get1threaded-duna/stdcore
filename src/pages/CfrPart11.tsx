import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Lock, FileText, Users, Clock, ExternalLink } from "lucide-react";
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

const requirements = [
  {
    icon: Lock,
    title: "Access Controls",
    description: "System access limited to authorized individuals with unique user identification and secure authentication."
  },
  {
    icon: FileText,
    title: "Audit Trails",
    description: "Complete, unalterable audit trails capturing all record creation, modification, and deletion events."
  },
  {
    icon: Users,
    title: "Electronic Signatures",
    description: "Legally binding electronic signatures linked to their respective electronic records."
  },
  {
    icon: Clock,
    title: "Record Retention",
    description: "Electronic records maintained and available for agency review throughout the required retention period."
  }
];

const controls = [
  { category: "Procedural Controls", items: ["Standard Operating Procedures (SOPs)", "Personnel training and qualification", "Document version control", "Change management processes"] },
  { category: "Technical Controls", items: ["User authentication mechanisms", "Role-based access control", "Automatic session timeout", "Data encryption in transit and at rest"] },
  { category: "Validation Requirements", items: ["System validation documentation", "Operational qualification (OQ)", "Performance qualification (PQ)", "Ongoing system monitoring"] }
];

const CfrPart11 = () => {
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
              <span className="text-muted-foreground">Regulatory</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>21 CFR Part 11</BreadcrumbPage>
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Regulatory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              21 CFR Part 11
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Understanding FDA regulations governing electronic records and electronic signatures in pharmaceutical and medical device industries.
            </p>
          </div>

          {/* Overview */}
          <div className="prose prose-invert max-w-none mb-16">
            <div className="p-6 rounded-xl bg-card/50 border border-border/40">
              <h2 className="text-xl font-semibold text-foreground mb-4">What is 21 CFR Part 11?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Title 21 CFR Part 11 is the FDA regulation that establishes criteria under which electronic records and electronic signatures are considered trustworthy, reliable, and equivalent to paper records and handwritten signatures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Published in 1997 and updated with guidance in 2003, Part 11 applies to all FDA-regulated industries including pharmaceuticals, biologics, medical devices, and food. Compliance is mandatory when electronic records are used to meet FDA predicate rule requirements.
              </p>
            </div>
          </div>

          {/* Key Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Key Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.title}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <req.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{req.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{req.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Compliance Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {controls.map((control, index) => (
                <motion.div
                  key={control.category}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <h3 className="font-semibold text-foreground mb-4">{control.category}</h3>
                  <ul className="space-y-2">
                    {control.items.map((item) => (
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

          {/* Electronic Signatures */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Electronic Signature Requirements</h2>
            <div className="p-6 rounded-xl bg-card/50 border border-border/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Signature Components</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Printed name of the signer
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Date and time of signing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Meaning of the signature (e.g., approval, review)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Authentication Methods</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Unique user identification codes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Biometric-based methods
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Tokens or cryptographic devices
                    </li>
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
            <p className="text-muted-foreground mb-6">Access FDA guidance documents and regulatory text.</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11" target="_blank" rel="noopener noreferrer">
                  21 CFR Part 11 Text <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application" target="_blank" rel="noopener noreferrer">
                  FDA Guidance <ExternalLink className="w-4 h-4" />
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

export default CfrPart11;
