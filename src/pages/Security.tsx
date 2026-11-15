import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Shield, Lock, Key, Server, FileCheck, Eye } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "256-bit AES Encryption",
    description: "All data at rest is encrypted using AES-256, the gold standard for data protection used by government agencies worldwide."
  },
  {
    icon: Key,
    title: "SAML 2.0 SSO",
    description: "Enterprise single sign-on integration with support for SAML 2.0, enabling seamless authentication through your existing identity provider."
  },
  {
    icon: FileCheck,
    title: "21 CFR Part 11 Compliance",
    description: "Full compliance with FDA regulations for electronic records and signatures, including audit trails, access controls, and data integrity."
  },
  {
    icon: Server,
    title: "VPC Isolation",
    description: "Dedicated virtual private cloud environments with network isolation, ensuring complete separation of customer data and infrastructure."
  },
  {
    icon: Eye,
    title: "Real-time Audit Logging",
    description: "Comprehensive audit trails capturing all user actions, document modifications, and system events with tamper-evident logging."
  },
  {
    icon: Shield,
    title: "SOC2 Type II Certified",
    description: "Independently audited security controls verified annually, demonstrating our commitment to protecting customer data."
  }
];

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Security</h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            StandardCore is built from the ground up with enterprise security requirements in mind. Our platform meets the most stringent regulatory and industry standards for pharmaceutical and life sciences organizations.
          </p>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card/50 border border-border/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Compliance Section */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Regulatory Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is designed to support compliance with global regulatory requirements including FDA 21 CFR Part 11, EU Annex 11, ICH guidelines, and HIPAA. We maintain comprehensive documentation and validation packages to support your qualification activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Infrastructure Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                StandardCore operates on enterprise-grade cloud infrastructure with geographic redundancy, automatic failover, and 99.9% uptime SLA. Our infrastructure is hosted in SOC2 Type II certified data centers with 24/7 physical security, biometric access controls, and environmental monitoring.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Customer data is protected through multiple layers of security including encryption in transit (TLS 1.3) and at rest (AES-256), network segmentation, intrusion detection systems, and regular penetration testing by independent security firms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Access Control</h2>
              <p className="text-muted-foreground leading-relaxed">
                Role-based access control (RBAC) ensures users only access data and functions appropriate to their responsibilities. Multi-factor authentication is enforced for all accounts. Session management includes automatic timeout and concurrent session controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Security Certifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["SOC2 Type II", "ISO 27001", "HIPAA", "21 CFR Part 11"].map((cert) => (
                  <div key={cert} className="p-4 rounded-lg bg-secondary/20 border border-border/30 text-center">
                    <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Security Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                To report security vulnerabilities or for security-related inquiries:<br />
                Email: security@standardcore.com<br />
                PGP Key: Available upon request
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Security;
