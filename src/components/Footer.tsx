import { motion } from "framer-motion";
import { Shield, FileCheck, Lock, Heart, Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

type FooterLink = {
  label: string;
  href: string;
  isRoute?: boolean;
  disabled?: boolean;
};

const footerLinks: Record<string, FooterLink[]> = {
  platform: [
    { label: "eCTD v4.0 Engine", href: "/ectd-engine", isRoute: true },
    { label: "Legacy Bridge", href: "/legacy-bridge", isRoute: true },
    { label: "ESG NextGen", href: "/esg-nextgen", isRoute: true },
    { label: "Validation Suite", href: "/validation-suite", isRoute: true },
  ],
  resources: [
    { label: "Readiness Calculator", href: "/readiness-calculator", isRoute: true },
    { label: "FDA OID Reference", href: "/fda-oids", isRoute: true },
    { label: "Whitepaper", href: "/whitepaper", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
  ],
  regulatory: [
    { label: "ICH M8 Guidelines", href: "/ich-m8-guidelines", isRoute: true },
    { label: "FDA ESG Requirements", href: "/fda-esg-requirements", isRoute: true },
    { label: "21 CFR Part 11", href: "/21-cfr-part-11", isRoute: true },
    { label: "EU CTD Standards", href: "/eu-ctd-standards", isRoute: true },
  ],
  company: [
    { label: "About Us", href: "/about", isRoute: true },
    { label: "Careers", href: "/careers", isRoute: true },
    { label: "Contact", href: "/contact", isRoute: true },
    { label: "Press Kit", href: "#", disabled: true },
  ],
};

const certifications = [
  { icon: FileCheck, label: "ICH M8 v1.6" },
  { icon: Shield, label: "21 CFR Part 11" },
  { icon: Lock, label: "SOC2 Type II" },
  { icon: Heart, label: "HIPAA" },
];

const Footer = () => {
  return (
    <footer className="relative bg-card/50 border-t border-border/30">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand & Newsletter */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">SC</span>
              </div>
              <span className="font-semibold text-foreground tracking-tight">
                Standard<span className="text-primary">Core</span>
              </span>
            </a>
            
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The deterministic infrastructure platform for regulatory document lifecycle management. Built for enterprise pharma.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Regulatory Updates</p>
              <NewsletterSignup />
              <p className="text-xs text-muted-foreground">
                Monthly insights on eCTD, ESG, and compliance standards.
              </p>
            </div>
          </motion.div>

          {/* Platform Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-sm text-muted-foreground/50 cursor-default">
                      {link.label}
                    </span>
                  ) : link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <motion.a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-sm text-muted-foreground/50 cursor-default">
                      {link.label}
                    </span>
                  ) : link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <motion.a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Regulatory Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground">Regulatory</h4>
            <ul className="space-y-3">
              {footerLinks.regulatory.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-sm text-muted-foreground/50 cursor-default">
                      {link.label}
                    </span>
                  ) : link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <motion.a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:regulatory@standardcore.io" className="hover:text-foreground transition-colors">
                  regulatory@standardcore.io
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+1 (800) 555-0123</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cambridge, MA 02142<br />United States</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <div
                className="w-8 h-8 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center text-muted-foreground/50 cursor-default"
              >
                <Linkedin className="w-4 h-4" />
              </div>
              <div
                className="w-8 h-8 rounded-lg bg-secondary/30 border border-border/30 flex items-center justify-center text-muted-foreground/50 cursor-default"
              >
                <Twitter className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications Bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={cert.label} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <cert.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">{cert.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Validated for FDA, EMA, PMDA, and Health Canada submissions
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-background/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} StandardCore, Inc. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/security" className="hover:text-foreground transition-colors">
                  Security
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/accessibility" className="hover:text-foreground transition-colors">
                  Accessibility
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
