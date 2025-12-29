import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { BookOpen, FileText, Globe, Calendar, ExternalLink } from "lucide-react";
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

const guidelines = [
  {
    version: "M8 v1.6",
    title: "eCTD v4.0 Specification",
    date: "November 2023",
    description: "The current version implementing FHIR-based document exchange for regulatory submissions.",
    status: "Current"
  },
  {
    version: "M8 v1.5",
    title: "eCTD v4.0 Technical Conformance Guide",
    date: "August 2022",
    description: "Technical implementation guidance for software developers and sponsors.",
    status: "Supplementary"
  },
  {
    version: "M8 v1.4",
    title: "eCTD v3.2.2 Specification",
    date: "July 2008",
    description: "Legacy specification for XML-based document exchange, still accepted by most agencies.",
    status: "Legacy"
  }
];

const keyChanges = [
  { title: "FHIR Foundation", description: "eCTD v4.0 is built on FHIR (Fast Healthcare Interoperability Resources) for modern data exchange" },
  { title: "Enhanced Lifecycle", description: "Improved lifecycle management with better tracking of document versions and relationships" },
  { title: "Structured Content", description: "Greater support for structured, machine-readable content beyond PDF documents" },
  { title: "Global Harmonization", description: "Improved alignment across FDA, EMA, PMDA, and other regulatory authorities" }
];

const IchM8Guidelines = () => {
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
              <BreadcrumbPage>ICH M8 Guidelines</BreadcrumbPage>
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
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Regulatory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ICH M8 Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Understanding the International Council for Harmonisation guidelines for electronic Common Technical Document (eCTD) submissions.
            </p>
          </div>

          {/* Overview */}
          <div className="prose prose-invert max-w-none mb-16">
            <div className="p-6 rounded-xl bg-card/50 border border-border/40">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                What is ICH M8?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ICH M8 is the international guideline that defines the electronic Common Technical Document (eCTD) specification. It establishes the standard format for electronic regulatory submissions accepted by health authorities worldwide, including FDA, EMA, PMDA, Health Canada, and TGA.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The M8 Expert Working Group continuously updates the specification to reflect evolving technology and regulatory needs, with the latest version (v4.0) introducing FHIR-based document exchange capabilities.
              </p>
            </div>
          </div>

          {/* Guideline Versions */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Specification Versions</h2>
            <div className="space-y-4">
              {guidelines.map((guideline, index) => (
                <motion.div
                  key={guideline.version}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-primary/20 text-primary">{guideline.version}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          guideline.status === 'Current' ? 'bg-green-500/20 text-green-400' :
                          guideline.status === 'Legacy' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-secondary/50 text-muted-foreground'
                        }`}>
                          {guideline.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{guideline.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{guideline.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {guideline.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Changes in v4.0 */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Key Changes in eCTD v4.0</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyChanges.map((change, index) => (
                <motion.div
                  key={change.title}
                  className="p-4 rounded-lg bg-secondary/20 border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <h3 className="font-semibold text-foreground mb-1">{change.title}</h3>
                  <p className="text-sm text-muted-foreground">{change.description}</p>
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
            <p className="text-muted-foreground mb-6">Access the official ICH M8 documentation and supporting materials.</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://www.ich.org/page/multidisciplinary-guidelines" target="_blank" rel="noopener noreferrer">
                  ICH M8 Guidelines <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="https://estri.ich.org" target="_blank" rel="noopener noreferrer">
                  ESTRI Portal <ExternalLink className="w-4 h-4" />
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

export default IchM8Guidelines;
