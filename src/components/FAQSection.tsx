import { motion } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, Shield, Lock, FileCheck, AlertTriangle, RefreshCw, Cpu } from "lucide-react";

const faqData = [
  {
    category: "Technical Architecture",
    icon: Cpu,
    questions: [
      {
        question: "How does StandardCore ensure \"Zero-Hallucination\" in OID mapping?",
        answer: "Unlike LLM-wrappers that \"guess\" the most likely XML tag, StandardCore uses a Dual-Gate Architecture. AI is used only for initial unstructured data extraction. The extracted data is then passed through a Deterministic Validator—a proprietary, hard-coded matrix of 1,500+ FDA-recognized Object Identifiers (OIDs). If a 100% binary match isn't found, the system halts. We prioritize Integrity over Autonomy."
      }
    ]
  },
  {
    category: "Migration Timelines",
    icon: Clock,
    questions: [
      {
        question: "How long does a typical eCTD v4.0 migration take?",
        answer: "Migration timelines vary based on submission volume and complexity. A standard migration for mid-sized pharmaceutical companies typically completes within 8-12 weeks. Large enterprise migrations with 500+ legacy submissions may require 16-20 weeks for full conversion and validation."
      },
      {
        question: "Can we run parallel submissions during migration?",
        answer: "Yes. StandardCore maintains dual-track processing capabilities, allowing your team to continue eCTD v3.0 submissions while systematically migrating to v4.0. Our infrastructure ensures zero disruption to ongoing regulatory timelines."
      },
      {
        question: "What's the cutoff date for mandatory eCTD v4.0 adoption?",
        answer: "FDA's ESG NextGen platform mandates eCTD v4.0 by Q4 2025. EMA follows with mandatory adoption in 2026. StandardCore recommends beginning migration 12 months prior to ensure validation cycles complete before regulatory deadlines."
      },
      {
        question: "How do you handle legacy v3.2 \"Replacement\" logic in v4.0?",
        answer: "We use a Relational Lifecycle Graph. In v3.2, document relationships were implied by folder paths. StandardCore's Legacy Bridge extracts these historical paths and calculates a Deterministic UUID v5 for every asset. This creates a persistent \"Chain of Custody\" that allows v4.0 messages to accurately reference documents submitted 20 years ago."
      }
    ]
  },
  {
    category: "Compliance Requirements",
    icon: FileCheck,
    questions: [
      {
        question: "Is StandardCore 21 CFR Part 11 compliant?",
        answer: "Yes. Every action taken by the engine is time-stamped, attributed, and stored in an Immutable Audit Ledger with HMAC-SHA256 signatures, ensuring total auditability for FDA inspections."
      },
      {
        question: "How do you handle EU Annex 11 validation?",
        answer: "Our infrastructure undergoes annual EU Annex 11 validation audits. We provide complete IQ/OQ/PQ documentation packages, change control procedures, and computer system validation (CSV) protocols that satisfy European regulatory inspectors."
      },
      {
        question: "What audit trail capabilities are included?",
        answer: "StandardCore captures comprehensive audit trails including user actions, timestamp metadata, document versioning, and approval workflows. All audit data is immutable, cryptographically signed, and exportable in FDA-compliant formats for inspection readiness."
      }
    ]
  },
  {
    category: "Security Protocols",
    icon: Lock,
    questions: [
      {
        question: "Does my clinical data leave my VPC?",
        answer: "No. StandardCore utilizes a Federated Agent architecture. The core logic engine is containerized and deployed within your secure Virtual Private Cloud (VPC). We process the metadata locally and only send anonymized \"Verification Hashes\" to our central ledger to maintain the audit trail."
      },
      {
        question: "What encryption standards protect our submission data?",
        answer: "All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Our key management follows NIST 800-57 guidelines with hardware security modules (HSMs) for cryptographic key storage. Zero-knowledge architecture ensures even StandardCore personnel cannot access your submission content."
      },
      {
        question: "How is access control managed across our organization?",
        answer: "Role-based access control (RBAC) with granular permissions allows you to define user roles by function, region, or therapeutic area. Multi-factor authentication is mandatory, and integration with enterprise SSO providers (SAML 2.0, OAuth 2.0) enables centralized identity management."
      },
      {
        question: "What disaster recovery and business continuity measures exist?",
        answer: "StandardCore operates across geographically distributed data centers with real-time replication. RPO (Recovery Point Objective) is under 1 minute, and RTO (Recovery Time Objective) is under 4 hours. Annual DR testing and SOC 2 Type II certification validate our continuity posture."
      }
    ]
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Common Questions</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about eCTD v4.0 migration, regulatory compliance, and enterprise security.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <ScrollReveal key={category.category} delay={categoryIndex * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={questionIndex}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border border-border/50 rounded-lg px-4 data-[state=open]:bg-muted/50 transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="text-foreground font-medium pr-4">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
              <RefreshCw className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Have more questions?{" "}
                <a href="#demo" className="text-primary font-medium hover:underline">
                  Schedule a consultation
                </a>
              </span>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
