import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Cookie } from "lucide-react";
import { EMAILS } from "@/config/site";

const Cookies = () => {
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
            <Cookie className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Cookie Policy</h1>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit our platform. They enable essential functionality, remember your preferences, and help us understand how you use our Service to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Essential Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are required for the platform to function and cannot be disabled. They include session authentication tokens, security tokens for CSRF protection, and load balancing identifiers. Without these cookies, the Service cannot operate securely.
              </p>
              <div className="mt-4 p-4 rounded-lg bg-secondary/20 border border-border/30">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-mono text-primary">sc_session</span>
                    <p className="text-xs text-muted-foreground mt-1">Authentication session</p>
                  </div>
                  <div>
                    <span className="font-mono text-primary">sc_csrf</span>
                    <p className="text-xs text-muted-foreground mt-1">Security token</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Functional Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Functional cookies remember your preferences such as language settings, dashboard layouts, and notification preferences. These enhance your experience but are not strictly necessary for platform operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Analytics Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use first-party analytics to understand platform usage patterns, identify performance issues, and improve our Service. Analytics data is aggregated and does not include personally identifiable information. We do not use third-party advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookie Duration</h2>
              <p className="text-muted-foreground leading-relaxed">
                Session cookies expire when you close your browser. Persistent cookies remain for the duration specified below:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                <li>Authentication cookies: 24 hours (or session, based on settings)</li>
                <li>Preference cookies: 1 year</li>
                <li>Analytics cookies: 90 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise customers can configure cookie preferences through their organization's settings panel. Individual users may adjust browser settings to block or delete cookies, though this may impact platform functionality. Contact your IT administrator for organization-wide cookie policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy to reflect changes in our practices or regulatory requirements. Material changes will be communicated through the platform notification system. Continued use of the Service constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about our cookie practices:<br />
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

export default Cookies;
