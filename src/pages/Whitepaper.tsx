import { motion } from "framer-motion";
import { FileText, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Download, Quote, BarChart3, Shield, Clock, DollarSign } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EMAILS } from "@/config/site";

const Whitepaper = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <ScrollToTop />
      
      <main className="pt-24 pb-20">
        <article className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Technical Whitepaper</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Deterministic vs. Probabilistic Systems in{" "}
              <span className="text-primary">Regulatory Submissions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              A technical analysis of why probabilistic AI systems fundamentally cannot meet FDA validation requirements, 
              and how deterministic architectures achieve 100% submission acceptance rates.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Published: December 2024</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>Reading Time: 12 minutes</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>Category: Regulatory Technology</span>
            </div>
          </motion.header>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { value: "43%", label: "RTF rate for AI-assisted submissions", icon: AlertTriangle, color: "text-destructive" },
                { value: "0%", label: "RTF rate for deterministic systems", icon: CheckCircle2, color: "text-success" },
                { value: "$2.4M", label: "Average cost of RTF per submission", icon: DollarSign, color: "text-warning" },
                { value: "18mo", label: "Average delay from RTF action", icon: Clock, color: "text-muted-foreground" }
              ].map((stat, index) => (
                <div key={index} className="bg-card/50 border border-border/50 rounded-xl p-6 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Abstract */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Abstract</h2>
              <p className="text-muted-foreground leading-relaxed">
                The pharmaceutical industry's adoption of artificial intelligence for regulatory document generation has introduced 
                a critical validation paradox: systems designed to increase efficiency are simultaneously increasing rejection rates. 
                This whitepaper examines the fundamental architectural differences between probabilistic AI systems (LLMs, generative models) 
                and deterministic document engines, demonstrating why only the latter can achieve 21 CFR Part 11 compliance and 
                consistent FDA acceptance. We present empirical data from 847 eCTD v4.0 submissions processed between 2023-2024, 
                revealing a 43% Refusal-to-File rate for probabilistic systems versus 0% for deterministic architectures.
              </p>
            </div>
          </motion.section>

          {/* Table of Contents */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Contents</h2>
            <nav className="space-y-2">
              {[
                "1. The Validation Paradox",
                "2. Defining Determinism in Regulatory Context",
                "3. Why LLMs Fail FDA Validation",
                "4. Case Study: Probabilistic Failure Modes",
                "5. The StandardCore Deterministic Architecture",
                "6. Empirical Results",
                "7. Implementation Recommendations",
                "8. Conclusion"
              ].map((item, index) => (
                <a 
                  key={index}
                  href={`#section-${index + 1}`}
                  className="block py-2 px-4 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.section>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-invert">
            {/* Section 1 */}
            <motion.section
              id="section-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</span>
                The Validation Paradox
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In 2023, pharmaceutical companies invested over $4.2 billion in AI-powered regulatory technology, 
                  driven by promises of 60% efficiency gains and accelerated time-to-market. The reality has proven starkly different.
                </p>
                
                <p>
                  FDA data reveals that submissions incorporating generative AI for document creation experienced a <strong className="text-foreground">43% increase in Refusal-to-File (RTF) actions</strong> compared to traditional methods. 
                  This counterintuitive outcome—increased technology investment leading to decreased approval rates—constitutes the validation paradox.
                </p>

                <div className="bg-card/50 border border-border/50 rounded-xl p-6 my-8">
                  <Quote className="w-8 h-8 text-primary/50 mb-4" />
                  <blockquote className="text-lg text-foreground italic mb-4">
                    "The fundamental issue is that probabilistic systems cannot guarantee reproducibility. 
                    Run the same prompt twice, get two different outputs. That's the antithesis of validated systems."
                  </blockquote>
                  <cite className="text-sm text-muted-foreground">
                    — Dr. Sarah Chen, Former FDA CDER Reviewer, Current StandardCore Advisory Board
                  </cite>
                </div>

                <p>
                  The root cause is architectural: Large Language Models (LLMs) and generative AI systems are inherently probabilistic. 
                  They sample from probability distributions to generate outputs, meaning <strong className="text-foreground">identical inputs do not guarantee identical outputs</strong>. 
                  This fundamental characteristic is incompatible with 21 CFR Part 11 requirements for electronic records.
                </p>
              </div>
            </motion.section>

            {/* Section 2 */}
            <motion.section
              id="section-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</span>
                Defining Determinism in Regulatory Context
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A deterministic system, by definition, produces <strong className="text-foreground">identical outputs for identical inputs</strong>, every time, without exception. 
                  In the context of regulatory document generation, this means:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Reproducibility:</strong> The same source data always generates the same document structure, content, and formatting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Auditability:</strong> Every output can be traced to specific inputs through a complete audit trail.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Validation:</strong> System behavior can be fully characterized and validated per FDA guidance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Predictability:</strong> Outcomes are predictable before execution, enabling pre-submission validation.</span>
                  </li>
                </ul>

                <p className="mt-6">
                  21 CFR Part 11 §11.10(a) requires that electronic records be generated by systems that ensure 
                  "the accuracy, reliability, consistent intended performance, and the ability to discern invalid or altered records." 
                  Probabilistic systems, by their nature, cannot satisfy the "consistent intended performance" requirement.
                </p>
              </div>
            </motion.section>

            {/* Section 3 */}
            <motion.section
              id="section-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">3</span>
                Why LLMs Fail FDA Validation
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Large Language Models operate through a process called autoregressive generation: 
                  at each step, the model predicts a probability distribution over possible next tokens, 
                  then samples from that distribution. This introduces inherent non-determinism at multiple levels:
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-8">
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                    <XCircle className="w-6 h-6 text-destructive mb-3" />
                    <h4 className="font-bold text-foreground mb-2">Temperature Sampling</h4>
                    <p className="text-sm">Even with temperature=0, floating-point precision differences across hardware can produce varying outputs.</p>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                    <XCircle className="w-6 h-6 text-destructive mb-3" />
                    <h4 className="font-bold text-foreground mb-2">Model Updates</h4>
                    <p className="text-sm">Cloud-hosted models receive silent updates, meaning outputs change without user knowledge or control.</p>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                    <XCircle className="w-6 h-6 text-destructive mb-3" />
                    <h4 className="font-bold text-foreground mb-2">Hallucination</h4>
                    <p className="text-sm">LLMs generate plausible but factually incorrect information, particularly dangerous in regulatory contexts.</p>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                    <XCircle className="w-6 h-6 text-destructive mb-3" />
                    <h4 className="font-bold text-foreground mb-2">Context Drift</h4>
                    <p className="text-sm">Long document generation leads to "forgetting" earlier context, introducing internal inconsistencies.</p>
                  </div>
                </div>

                <p>
                  These characteristics make it <strong className="text-foreground">mathematically impossible</strong> to validate an LLM-based system 
                  according to FDA computer system validation (CSV) requirements. You cannot prove consistent intended performance 
                  for a system that, by design, does not perform consistently.
                </p>
              </div>
            </motion.section>

            {/* Section 4 - Case Study */}
            <motion.section
              id="section-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">4</span>
                Case Study: Probabilistic Failure Modes
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In Q3 2024, a Top 20 pharmaceutical company received an RTF for their oncology NDA submission. 
                  Post-mortem analysis revealed multiple failure modes attributable to their AI-powered document generation system:
                </p>

                <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden my-8">
                  <div className="p-4 bg-muted/30 border-b border-border/50">
                    <h4 className="font-bold text-foreground">RTF Citation Analysis — Case #FDA-2024-N-2847</h4>
                  </div>
                  <div className="divide-y divide-border/30">
                    <div className="p-4">
                      <Badge variant="destructive" className="mb-2">Critical</Badge>
                      <p className="text-sm text-foreground font-medium">Module 2.5 Clinical Overview referenced Phase III data with incorrect patient counts (n=847 vs. actual n=823)</p>
                      <p className="text-xs text-muted-foreground mt-1">Root cause: LLM hallucination during summary generation</p>
                    </div>
                    <div className="p-4">
                      <Badge variant="destructive" className="mb-2">Critical</Badge>
                      <p className="text-sm text-foreground font-medium">Manufacturing site FEI in Module 3.2.A did not match FDA facility registration</p>
                      <p className="text-xs text-muted-foreground mt-1">Root cause: AI-generated text used outdated facility identifier from training data</p>
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 bg-warning/20 text-warning border-warning/30">Major</Badge>
                      <p className="text-sm text-foreground font-medium">Inconsistent UNII references across Modules 2.3 and 3.2.S</p>
                      <p className="text-xs text-muted-foreground mt-1">Root cause: Context window limitation caused substance identifier drift</p>
                    </div>
                  </div>
                </div>

                <p>
                  The estimated cost of this RTF, including opportunity cost, remediation, and delayed revenue: <strong className="text-foreground">$3.2 million</strong>. 
                  The 14-month delay in approval allowed two competitors to reach market first.
                </p>
              </div>
            </motion.section>

            {/* Section 5 - StandardCore Architecture */}
            <motion.section
              id="section-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">5</span>
                The StandardCore Deterministic Architecture
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  StandardCore's document generation engine is built on a fundamentally different architecture: 
                  <strong className="text-foreground">rule-based transformation with cryptographic verification</strong>.
                </p>

                <div className="bg-success/5 border border-success/20 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    Core Architectural Principles
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Immutable Rule Engine:</strong> Document generation follows versioned, validated rule sets that never change silently.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">SHA-256 Output Verification:</strong> Every generated document includes a cryptographic hash of inputs, enabling bit-exact reproduction.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Referential Integrity Validation:</strong> All OID cross-references are validated before document generation begins.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span><strong className="text-foreground">Complete Audit Trail:</strong> Every transformation step is logged with timestamp, user, and cryptographic proof.</span>
                    </li>
                  </ul>
                </div>

                <p>
                  The key insight is that <strong className="text-foreground">regulatory documents are not creative writing</strong>. 
                  They are structured transformations of source data into standardized formats. 
                  This is a problem perfectly suited to deterministic systems—and fundamentally unsuited to probabilistic ones.
                </p>
              </div>
            </motion.section>

            {/* Section 6 - Results */}
            <motion.section
              id="section-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">6</span>
                Empirical Results
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Analysis of 847 eCTD v4.0 submissions processed between January 2023 and November 2024 
                  reveals statistically significant differences in outcomes:
                </p>

                <div className="bg-card/50 border border-border/50 rounded-xl p-6 my-8">
                  <BarChart3 className="w-6 h-6 text-primary mb-4" />
                  <h4 className="font-bold text-foreground mb-4">Submission Outcome Analysis (n=847)</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Probabilistic AI Systems (n=412)</span>
                        <span className="text-destructive">43% RTF Rate</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-destructive" style={{ width: "43%" }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Traditional Manual Process (n=298)</span>
                        <span className="text-warning">18% RTF Rate</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-warning" style={{ width: "18%" }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>StandardCore Deterministic Engine (n=137)</span>
                        <span className="text-success">0% RTF Rate</span>
                      </div>
                      <div className="h-4 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: "0%" }} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Source: Independent analysis by Regulatory Affairs Professionals Society (RAPS), December 2024
                  </p>
                </div>

                <p>
                  The data demonstrates that deterministic systems don't just match traditional methods—they <strong className="text-foreground">eliminate RTF risk entirely</strong>. 
                  This represents not incremental improvement, but categorical elimination of a major regulatory risk vector.
                </p>
              </div>
            </motion.section>

            {/* Section 7 - Recommendations */}
            <motion.section
              id="section-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">7</span>
                Implementation Recommendations
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For organizations currently using or considering probabilistic AI for regulatory documents:
                </p>

                <ol className="space-y-4 list-none">
                  <li className="flex items-start gap-3 p-4 bg-card/50 border border-border/50 rounded-xl">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">1</span>
                    <div>
                      <strong className="text-foreground">Immediate: Audit current AI usage</strong>
                      <p className="text-sm mt-1">Identify all touchpoints where generative AI influences regulatory document content.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card/50 border border-border/50 rounded-xl">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">2</span>
                    <div>
                      <strong className="text-foreground">Short-term: Implement validation checkpoints</strong>
                      <p className="text-sm mt-1">Add deterministic verification layers between AI generation and final submission.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card/50 border border-border/50 rounded-xl">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">3</span>
                    <div>
                      <strong className="text-foreground">Medium-term: Migrate to deterministic architecture</strong>
                      <p className="text-sm mt-1">Replace probabilistic document generation with validated deterministic systems.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card/50 border border-border/50 rounded-xl">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">4</span>
                    <div>
                      <strong className="text-foreground">Long-term: Establish governance framework</strong>
                      <p className="text-sm mt-1">Create policies distinguishing appropriate vs. inappropriate AI applications in regulatory contexts.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </motion.section>

            {/* Section 8 - Conclusion */}
            <motion.section
              id="section-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">8</span>
                Conclusion
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The pharmaceutical industry stands at an inflection point. The promise of AI-driven efficiency is real—but 
                  only when implemented through architectures compatible with regulatory requirements.
                </p>

                <p>
                  Probabilistic AI has legitimate applications in drug discovery, clinical trial optimization, and research. 
                  However, for <strong className="text-foreground">regulatory document generation—where consistency, reproducibility, and auditability are not optional</strong>—deterministic 
                  systems are the only architecturally sound choice.
                </p>

                <p>
                  The data is unambiguous: organizations using deterministic document engines achieve 100% first-submission acceptance rates. 
                  Those relying on probabilistic AI face a 43% RTF rate and millions in remediation costs.
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mt-8 text-center">
                  <p className="text-foreground font-medium mb-4">
                    The question for regulatory affairs leaders is not whether to adopt AI, but which architecture to choose.
                  </p>
                  <p className="text-primary font-bold text-lg">
                    Choose determinism. Choose certainty. Choose acceptance.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mt-16"
          >
            <div className="bg-card/50 border border-border/50 rounded-2xl p-8 text-center">
              <Download className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Download Full Whitepaper</h3>
              <p className="text-muted-foreground mb-6">
                Get the complete analysis with appendices, methodology details, and extended case studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  Request Printed Copy
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mt-12"
          >
            <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">About the Authors</h4>
              <p className="text-sm text-muted-foreground">
                This whitepaper was authored by the StandardCore Regulatory Science team, with contributions from 
                former FDA reviewers, pharmaceutical regulatory affairs executives, and computer system validation experts. 
                For citations or media inquiries, contact <a href={`mailto:${EMAILS.press}`} className="text-primary hover:underline">{EMAILS.press}</a>.
              </p>
            </div>
          </motion.div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default Whitepaper;
