import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Globe, CheckCircle, FileText, Building, ExternalLink } from "lucide-react";
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

const modules = [
  { module: "Module 1", title: "Regional Administrative Information", description: "Region-specific administrative and prescribing information" },
  { module: "Module 2", title: "Common Technical Document Summaries", description: "Quality, nonclinical, and clinical overviews and summaries" },
  { module: "Module 3", title: "Quality", description: "Chemical, manufacturing, and controls (CMC) documentation" },
  { module: "Module 4", title: "Nonclinical Study Reports", description: "Pharmacology, pharmacokinetics, and toxicology studies" },
  { module: "Module 5", title: "Clinical Study Reports", description: "Clinical study reports, case report forms, and datasets" }
];

const euSpecific = [
  { title: "EMA Submission Portal", description: "CESP (Common European Submission Portal) for centralized procedures" },
  { title: "EU Module 1", description: "EU-specific administrative forms, cover letters, and product information" },
  { title: "Annex 11 Compliance", description: "EU GMP requirements for computerized systems" },
  { title: "EURD List", description: "Compliance with EU Reference Dates list for PSURs" }
];

const procedures = [
  { name: "Centralized Procedure (CP)", description: "Mandatory for certain products, assessed by EMA, valid in all EU/EEA states" },
  { name: "Decentralized Procedure (DCP)", description: "Simultaneous application to multiple member states" },
  { name: "Mutual Recognition (MRP)", description: "Recognition of existing authorization in other member states" },
  { name: "National Procedure", description: "Application to a single member state only" }
];

const EuCtdStandards = () => {
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
              <BreadcrumbPage>EU CTD Standards</BreadcrumbPage>
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
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Regulatory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              EU CTD Standards
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              European Union requirements for Common Technical Document submissions to the European Medicines Agency and national competent authorities.
            </p>
          </div>

          {/* Overview */}
          <div className="prose prose-invert max-w-none mb-16">
            <div className="p-6 rounded-xl bg-card/50 border border-border/40">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                EU Regulatory Framework
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The European Union follows the ICH Common Technical Document (CTD) format for marketing authorization applications. The CTD provides a harmonized structure accepted by regulatory authorities in the EU, US, Japan, and other ICH regions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Electronic submissions in eCTD format are mandatory for centralized procedures and increasingly required for national and decentralized procedures across EU member states.
              </p>
            </div>
          </div>

          {/* CTD Modules */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">CTD Module Structure</h2>
            <div className="space-y-4">
              {modules.map((mod, index) => (
                <motion.div
                  key={mod.module}
                  className="p-4 rounded-lg bg-secondary/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="flex items-start gap-4">
                    <div className="px-3 py-1 rounded bg-primary/20 text-primary text-sm font-medium flex-shrink-0">
                      {mod.module}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{mod.title}</h3>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EU-Specific Requirements */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">EU-Specific Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {euSpecific.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="p-4 rounded-lg bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Authorization Procedures */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Authorization Procedures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {procedures.map((proc, index) => (
                <motion.div
                  key={proc.name}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <FileText className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">{proc.name}</h3>
                  <p className="text-sm text-muted-foreground">{proc.description}</p>
                </motion.div>
              ))}
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
            <p className="text-muted-foreground mb-6">Access EMA guidance and submission requirements.</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.ema.europa.eu/en/human-regulatory-overview/marketing-authorisation/ectd" target="_blank" rel="noopener noreferrer">
                  EMA eCTD Guidance <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://cesp.hma.eu" target="_blank" rel="noopener noreferrer">
                  CESP Portal <ExternalLink className="w-4 h-4" />
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

export default EuCtdStandards;
