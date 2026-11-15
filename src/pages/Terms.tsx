import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { FileCheck } from "lucide-react";

const Terms = () => {
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
            <FileCheck className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the StandardCore platform ("Service"), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                StandardCore provides a deterministic document lifecycle management platform for regulatory submissions, including but not limited to eCTD v4.0 migration, ESG gateway connectivity, and compliance validation services. The Service is designed for enterprise pharmaceutical, biotechnology, and medical device organizations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Enterprise Subscription</h2>
              <p className="text-muted-foreground leading-relaxed">
                Access to the Service requires an active enterprise subscription agreement. Subscription terms, including pricing, user limits, and service level agreements, are specified in your Master Service Agreement (MSA). The Service operates on an annual commitment basis with customized implementation support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Customer Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for: (a) maintaining the confidentiality of account credentials; (b) ensuring that all users comply with these terms; (c) the accuracy and legality of documents submitted through the platform; (d) maintaining appropriate licenses and authorizations for regulatory submissions in your jurisdictions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                StandardCore retains all rights, title, and interest in the Service, including all software, algorithms, user interfaces, and documentation. Customer retains ownership of all documents, data, and submissions processed through the platform. No intellectual property rights are transferred except as expressly stated herein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Service Level Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                StandardCore commits to 99.9% platform availability, measured monthly. Scheduled maintenance windows are communicated 72 hours in advance. Emergency maintenance for critical security updates may be performed with reasonable notice. SLA credits are defined in your MSA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, StandardCore's aggregate liability shall not exceed the fees paid by customer in the twelve (12) months preceding the claim. In no event shall StandardCore be liable for indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by the laws of the Commonwealth of Massachusetts, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in Boston, MA under the rules of the American Arbitration Association.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms, contact:<br />
                StandardCore, Inc.<br />
                Legal Department<br />
                Cambridge, MA 02142<br />
                Email: legal@standardcore.com
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
