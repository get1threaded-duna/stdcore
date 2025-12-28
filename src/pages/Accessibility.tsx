import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Eye, Keyboard, Monitor, MousePointer, Volume2 } from "lucide-react";

const Accessibility = () => {
  const features = [
    {
      icon: Keyboard,
      title: "Full Keyboard Navigation",
      description: "All interactive elements are accessible via keyboard. Use Tab to navigate, Enter to activate, and Escape to close dialogs."
    },
    {
      icon: Eye,
      title: "Screen Reader Compatible",
      description: "ARIA labels and semantic HTML ensure compatibility with screen readers including JAWS, NVDA, and VoiceOver."
    },
    {
      icon: Monitor,
      title: "High Contrast Support",
      description: "Our interface supports high contrast modes and respects user system preferences for reduced motion."
    },
    {
      icon: MousePointer,
      title: "Focus Indicators",
      description: "Clear, visible focus indicators help keyboard users track their position within the interface."
    },
    {
      icon: Volume2,
      title: "Alternative Text",
      description: "All images and non-text content include descriptive alternative text for screen reader users."
    }
  ];

  const wcagCriteria = [
    { level: "A", criteria: "1.1.1", name: "Non-text Content", status: "Compliant" },
    { level: "A", criteria: "1.3.1", name: "Info and Relationships", status: "Compliant" },
    { level: "A", criteria: "1.4.1", name: "Use of Color", status: "Compliant" },
    { level: "AA", criteria: "1.4.3", name: "Contrast (Minimum)", status: "Compliant" },
    { level: "AA", criteria: "1.4.4", name: "Resize Text", status: "Compliant" },
    { level: "A", criteria: "2.1.1", name: "Keyboard", status: "Compliant" },
    { level: "A", criteria: "2.1.2", name: "No Keyboard Trap", status: "Compliant" },
    { level: "AA", criteria: "2.4.6", name: "Headings and Labels", status: "Compliant" },
    { level: "AA", criteria: "2.4.7", name: "Focus Visible", status: "Compliant" },
    { level: "A", criteria: "3.1.1", name: "Language of Page", status: "Compliant" },
    { level: "A", criteria: "4.1.1", name: "Parsing", status: "Compliant" },
    { level: "A", criteria: "4.1.2", name: "Name, Role, Value", status: "Compliant" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Accessibility Statement
          </h1>
          <p className="text-lg text-muted-foreground">
            PharmaLedger is committed to ensuring digital accessibility for people with disabilities.
          </p>
        </div>

        {/* Commitment Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Commitment</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              PharmaLedger is committed to providing a website and application that is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the accessibility and usability of our digital properties and in doing so adhere to many of the available standards and guidelines.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We strive to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1). These guidelines explain how to make web content more accessible for people with disabilities, and user-friendly for everyone.
            </p>
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Accessibility Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-secondary/20 border border-border/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WCAG Compliance Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">WCAG 2.1 AA Compliance</h2>
          <div className="bg-secondary/20 border border-border/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Level</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Criteria</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {wcagCriteria.map((item, index) => (
                  <tr key={index} className="border-b border-border/30 last:border-0">
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        item.level === "AA" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground font-mono">{item.criteria}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{item.name}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Feedback</h2>
          <div className="bg-secondary/20 border border-border/50 rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We welcome your feedback on the accessibility of PharmaLedger. Please let us know if you encounter accessibility barriers:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Email: <span className="text-foreground">accessibility@pharmaledger.io</span></li>
              <li>• Phone: <span className="text-foreground">+1 (888) 555-LEDGER (option 3)</span></li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              We try to respond to feedback within 2 business days.
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <p className="text-sm text-muted-foreground">
          Last updated: December 2024
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
