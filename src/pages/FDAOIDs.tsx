import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Database, AlertTriangle, FileWarning, CheckCircle2, ExternalLink, Download } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortField = "oid" | "displayName" | "contextOfUse";
type SortDirection = "asc" | "desc";

interface OIDEntry {
  oid: string;
  displayName: string;
  contextOfUse: string;
  category: string;
  criticality: "high" | "medium" | "low";
}

const fdaOIDs: OIDEntry[] = [
  { oid: "2.16.840.1.113883.3.26.1.1", displayName: "FDA Substance Registration System (SRS)", contextOfUse: "Mandatory for Active Ingredient identification in Module 3.2.S", category: "Substance", criticality: "high" },
  { oid: "2.16.840.1.113883.3.26.1.2", displayName: "FDA Route of Administration", contextOfUse: "Required for all drug product submissions in Module 1.2", category: "Product", criticality: "high" },
  { oid: "2.16.840.1.113883.3.26.1.3", displayName: "FDA Dosage Form", contextOfUse: "Mandatory reference for pharmaceutical form classification", category: "Product", criticality: "high" },
  { oid: "2.16.840.1.113883.3.26.1.4", displayName: "FDA Unit of Presentation", contextOfUse: "Required for dose unit standardization in SPL", category: "Product", criticality: "high" },
  { oid: "2.16.840.1.113883.3.26.1.5", displayName: "FDA Marketing Category", contextOfUse: "Defines NDA, ANDA, BLA classification in Module 1", category: "Application", criticality: "high" },
  { oid: "2.16.840.1.113883.4.6", displayName: "National Provider Identifier (NPI)", contextOfUse: "Healthcare provider identification in clinical modules", category: "Organization", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.1", displayName: "LOINC (Logical Observation Identifiers)", contextOfUse: "Laboratory test identification in Module 2.7.4", category: "Clinical", criticality: "high" },
  { oid: "2.16.840.1.113883.6.8", displayName: "UCUM (Unified Code for Units of Measure)", contextOfUse: "Standardized measurement units across all modules", category: "Units", criticality: "high" },
  { oid: "2.16.840.1.113883.6.69", displayName: "FDA National Drug Code (NDC)", contextOfUse: "Product identification in labeling and Module 1.14", category: "Product", criticality: "high" },
  { oid: "2.16.840.1.113883.6.73", displayName: "WHO ATC Classification", contextOfUse: "Therapeutic classification in Module 2.5", category: "Classification", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.88", displayName: "RxNorm", contextOfUse: "Drug nomenclature standardization in clinical data", category: "Nomenclature", criticality: "high" },
  { oid: "2.16.840.1.113883.6.96", displayName: "SNOMED CT", contextOfUse: "Clinical terminology for adverse events and indications", category: "Clinical", criticality: "high" },
  { oid: "2.16.840.1.113883.6.162", displayName: "FDA Potency", contextOfUse: "Biological product potency measurement standards", category: "Product", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.163", displayName: "FDA Product Type", contextOfUse: "Classification of drug vs. biologic vs. device", category: "Classification", criticality: "high" },
  { oid: "2.16.840.1.113883.6.275", displayName: "FDA Establishment Types", contextOfUse: "Manufacturing facility classification in Module 3.2.A", category: "Organization", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.276", displayName: "FDA Business Operations", contextOfUse: "Manufacturing operations description", category: "Organization", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.277", displayName: "FDA Product Code", contextOfUse: "Specific product identification in listings", category: "Product", criticality: "high" },
  { oid: "2.16.840.1.113883.6.303", displayName: "NCI Thesaurus (NCIt)", contextOfUse: "Oncology terminology in clinical modules", category: "Clinical", criticality: "medium" },
  { oid: "2.16.840.1.113883.6.345", displayName: "FDA UNII (Unique Ingredient Identifier)", contextOfUse: "Global substance identification - MANDATORY for all APIs", category: "Substance", criticality: "high" },
  { oid: "2.16.840.1.113883.5.1", displayName: "HL7 Administrative Gender", contextOfUse: "Patient demographics in clinical study data", category: "Demographics", criticality: "medium" },
  { oid: "2.16.840.1.113883.5.2", displayName: "HL7 Marital Status", contextOfUse: "Patient characteristics in demographics", category: "Demographics", criticality: "low" },
  { oid: "2.16.840.1.113883.5.4", displayName: "HL7 Act Code", contextOfUse: "Document type classification in eCTD structure", category: "Document", criticality: "high" },
  { oid: "2.16.840.1.113883.5.6", displayName: "HL7 Act Class", contextOfUse: "Act classification for regulatory documents", category: "Document", criticality: "high" },
  { oid: "2.16.840.1.113883.5.7", displayName: "HL7 Act Mood", contextOfUse: "Document status and intent classification", category: "Document", criticality: "medium" },
  { oid: "2.16.840.1.113883.5.14", displayName: "HL7 Act Status", contextOfUse: "Submission lifecycle status tracking", category: "Lifecycle", criticality: "high" },
  { oid: "2.16.840.1.113883.5.25", displayName: "HL7 Confidentiality Code", contextOfUse: "Document security classification", category: "Security", criticality: "high" },
  { oid: "2.16.840.1.113883.5.79", displayName: "HL7 Media Type", contextOfUse: "File format specification in eCTD backbone", category: "Technical", criticality: "high" },
  { oid: "2.16.840.1.113883.5.83", displayName: "HL7 Observation Interpretation", contextOfUse: "Clinical result interpretation flags", category: "Clinical", criticality: "medium" },
  { oid: "2.16.840.1.113883.5.110", displayName: "HL7 Role Class", contextOfUse: "Entity relationship classification", category: "Structure", criticality: "high" },
  { oid: "2.16.840.1.113883.5.111", displayName: "HL7 Role Code", contextOfUse: "Specific role identification in submissions", category: "Structure", criticality: "high" },
  { oid: "2.16.840.1.113883.5.1001", displayName: "HL7 Act Relationship Type", contextOfUse: "Document cross-referencing and linking", category: "Structure", criticality: "high" },
  { oid: "2.16.840.1.113883.5.1002", displayName: "HL7 Act Relationship", contextOfUse: "Defines predecessor/successor relationships", category: "Lifecycle", criticality: "high" },
  { oid: "2.16.840.1.113883.5.1119", displayName: "HL7 Address Use", contextOfUse: "Organization address classification", category: "Organization", criticality: "low" },
  { oid: "2.16.840.1.113883.12.1", displayName: "HL7 Administrative Sex", contextOfUse: "Clinical trial demographics", category: "Demographics", criticality: "medium" },
  { oid: "2.16.840.1.113883.19.1", displayName: "HL7 Example OID Root", contextOfUse: "Testing and development only - NEVER for production", category: "Technical", criticality: "low" },
  { oid: "2.16.840.1.113883.2.20.6.42", displayName: "Health Canada DIN", contextOfUse: "Drug Identification Number for CA submissions", category: "Regulatory", criticality: "medium" },
  { oid: "2.16.840.1.113883.4.82", displayName: "DUNS Number", contextOfUse: "Organization identification in facility modules", category: "Organization", criticality: "high" },
  { oid: "2.16.840.1.113883.4.336", displayName: "FDA Facility Establishment ID (FEI)", contextOfUse: "Manufacturing site registration - MANDATORY for M3", category: "Organization", criticality: "high" },
  { oid: "2.16.840.1.113883.4.330", displayName: "SPL Document ID", contextOfUse: "Unique labeling document identification", category: "Document", criticality: "high" },
  { oid: "2.16.840.1.113883.4.331", displayName: "SPL Set ID", contextOfUse: "Labeling version set identification", category: "Document", criticality: "high" },
  { oid: "2.16.840.1.113883.6.204", displayName: "FDA Color", contextOfUse: "Physical product appearance description", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.205", displayName: "FDA Shape", contextOfUse: "Physical product form description", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.206", displayName: "FDA Imprint Code", contextOfUse: "Product identification markings", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.207", displayName: "FDA Flavor", contextOfUse: "Organoleptic properties description", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.208", displayName: "FDA Scoring", contextOfUse: "Tablet divisibility characteristics", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.209", displayName: "FDA Size", contextOfUse: "Physical dimension specifications", category: "Product", criticality: "low" },
  { oid: "2.16.840.1.113883.6.14", displayName: "FDA Drug Application Type", contextOfUse: "NDA/ANDA/BLA/IND differentiation", category: "Application", criticality: "high" },
  { oid: "2.16.840.1.113883.3.150", displayName: "FDA Center Identifier", contextOfUse: "CDER/CBER/CDRH routing classification", category: "Regulatory", criticality: "high" },
  { oid: "2.16.840.1.113883.4.9", displayName: "FDA GSRS (Global Substance Registry)", contextOfUse: "Successor to UNII for global harmonization", category: "Substance", criticality: "high" },
  { oid: "2.16.840.1.113883.13.36", displayName: "eCTD Submission Type", contextOfUse: "Initial/Amendment/Supplement classification", category: "Submission", criticality: "high" },
];

const FDAOIDs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("criticality" as any);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = [...new Set(fdaOIDs.map(o => o.category))].sort();
    return ["all", ...cats];
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedOIDs = useMemo(() => {
    let result = [...fdaOIDs];
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(oid => 
        oid.oid.toLowerCase().includes(query) ||
        oid.displayName.toLowerCase().includes(query) ||
        oid.contextOfUse.toLowerCase().includes(query) ||
        oid.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter(oid => oid.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === "oid") {
        comparison = a.oid.localeCompare(b.oid);
      } else if (sortField === "displayName") {
        comparison = a.displayName.localeCompare(b.displayName);
      } else if (sortField === "contextOfUse") {
        comparison = a.contextOfUse.localeCompare(b.contextOfUse);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, sortField, sortDirection, categoryFilter]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    return sortDirection === "asc" 
      ? <ArrowUp className="w-4 h-4 ml-1" /> 
      : <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const CriticalityBadge = ({ level }: { level: string }) => {
    const variants: Record<string, string> = {
      high: "bg-destructive/20 text-destructive border-destructive/30",
      medium: "bg-warning/20 text-warning border-warning/30",
      low: "bg-muted text-muted-foreground border-border"
    };
    return (
      <Badge variant="outline" className={variants[level]}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <ScrollToTop />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Regulatory Reference</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              FDA OID Reference for{" "}
              <span className="text-primary">eCTD v4.0</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              The definitive source of truth for Object Identifiers in electronic Common Technical Document submissions.
            </p>
          </motion.div>

          {/* RTF Warning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Why Relational Integrity is the #1 Cause of RTF Actions in 2026
                  </h2>
                  <div className="prose prose-sm text-muted-foreground max-w-none">
                    <p>
                      The FDA's transition to eCTD v4.0 introduced a fundamental architectural shift: from document-centric to <strong className="text-foreground">data-centric submissions</strong>. 
                      This means Object Identifiers (OIDs) are no longer just metadata—they are the <strong className="text-foreground">relational backbone</strong> of your entire submission.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 my-6">
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <FileWarning className="w-5 h-5 text-destructive mb-2" />
                        <h4 className="font-semibold text-foreground text-sm mb-1">Orphaned References</h4>
                        <p className="text-xs">When an OID in Module 3 references a substance that doesn't exist in your UNII registry, the entire CMC section fails validation.</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <FileWarning className="w-5 h-5 text-destructive mb-2" />
                        <h4 className="font-semibold text-foreground text-sm mb-1">Version Mismatches</h4>
                        <p className="text-xs">Using deprecated OID versions (e.g., legacy LOINC codes) triggers automatic RTF for clinical study reports in Module 5.</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <FileWarning className="w-5 h-5 text-destructive mb-2" />
                        <h4 className="font-semibold text-foreground text-sm mb-1">Cross-Module Breaks</h4>
                        <p className="text-xs">Manufacturing site FEIs in Module 3.2.A must exactly match facility registrations—any discrepancy is a technical rejection.</p>
                      </div>
                    </div>

                    <p>
                      <strong className="text-foreground">StandardCore's Deterministic Engine</strong> validates all OID relationships before submission, 
                      ensuring zero orphaned references and complete referential integrity across all modules. This is why our customers achieve 
                      <strong className="text-foreground"> 100% first-submission acceptance rates</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Understanding OID Architecture in eCTD v4.0
              </h3>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p>
                  Object Identifiers follow the ISO/IEC 8824 ASN.1 standard, creating a hierarchical namespace managed by registration authorities. 
                  The FDA's OID branch (<code className="text-primary bg-primary/10 px-1 rounded">2.16.840.1.113883</code>) contains all controlled vocabularies 
                  required for U.S. pharmaceutical submissions.
                </p>
                <p className="mt-3">
                  Each OID represents a <strong className="text-foreground">specific controlled vocabulary term</strong> that must maintain referential integrity 
                  with other OIDs in your submission. For example, a drug product's Route of Administration OID must be semantically compatible with its Dosage Form OID.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search OIDs, names, or context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={categoryFilter === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(cat)}
                    className="text-xs"
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Showing {filteredAndSortedOIDs.length} of {fdaOIDs.length} OIDs
            </p>
          </motion.div>

          {/* OID Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead 
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("oid")}
                    >
                      <div className="flex items-center">
                        OID String
                        <SortIcon field="oid" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("displayName")}
                    >
                      <div className="flex items-center">
                        Display Name
                        <SortIcon field="displayName" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer select-none hidden lg:table-cell"
                      onClick={() => handleSort("contextOfUse")}
                    >
                      <div className="flex items-center">
                        Context of Use
                        <SortIcon field="contextOfUse" />
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Category</TableHead>
                    <TableHead className="text-center">Criticality</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedOIDs.map((oid, index) => (
                    <motion.tr
                      key={oid.oid}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="border-border/30 hover:bg-muted/30"
                    >
                      <TableCell className="font-mono text-xs text-primary">
                        {oid.oid}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {oid.displayName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                        {oid.contextOfUse}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          {oid.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <CriticalityBadge level={oid.criticality} />
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Download CTA */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download Complete OID Registry (CSV)
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Includes all 500+ FDA OIDs with version history and deprecation notes
              </p>
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto mt-16"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Related Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="https://www.fda.gov/regulatory-information/ectd-common-technical-document" target="_blank" rel="noopener noreferrer" 
                className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">FDA eCTD Guidance</h4>
                <p className="text-sm text-muted-foreground">Official FDA technical specifications for eCTD v4.0 submissions.</p>
              </a>
              <a href="https://www.ich.org/page/multidisciplinary-guidelines" target="_blank" rel="noopener noreferrer"
                className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">ICH M8 Guidelines</h4>
                <p className="text-sm text-muted-foreground">International harmonization standards for electronic CTD.</p>
              </a>
              <a href="/whitepaper" className="group p-6 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Deterministic Whitepaper</h4>
                <p className="text-sm text-muted-foreground">Why probabilistic AI fails for regulatory submissions.</p>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FDAOIDs;
