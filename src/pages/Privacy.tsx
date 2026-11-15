import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";
import { EMAILS } from "@/config/site";

const Privacy = () => {
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
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                StandardCore, Inc. ("we," "our," or "us") collects information you provide directly to us when you use our regulatory document management platform. This includes account registration data, organizational information, document metadata, and usage analytics necessary for platform optimization and compliance monitoring.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Data Protection & Encryption</h2>
              <p className="text-muted-foreground leading-relaxed">
                All data transmitted to and from our platform is protected using 256-bit AES encryption at rest and TLS 1.3 in transit. Our infrastructure operates within SOC2 Type II certified data centers with geographic redundancy across multiple availability zones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Regulatory Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is designed to meet the stringent requirements of 21 CFR Part 11 for electronic records and electronic signatures. We maintain audit trails, implement access controls, and ensure data integrity in accordance with FDA, EMA, and ICH guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Customer data is retained for the duration of the service agreement plus seven (7) years, or as required by applicable regulatory frameworks. Upon termination, data export options are provided in industry-standard formats prior to secure deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Processors</h2>
              <p className="text-muted-foreground leading-relaxed">
                We engage select third-party service providers for infrastructure hosting and security monitoring. All subprocessors are contractually bound to equivalent data protection standards and undergo annual security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your jurisdiction, you may have rights to access, correct, delete, or export your personal data. Enterprise customers may exercise these rights through their designated account administrator or by contacting our Data Protection Officer at {EMAILS.privacy}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related inquiries, please contact:<br />
                StandardCore, Inc.<br />
                Attn: Data Protection Officer<br />
                Cambridge, MA 02142<br />
                Email: {EMAILS.privacy}
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
