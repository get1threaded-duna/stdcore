import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// External Utility Project URL
const UTILITY_APP_URL = "https://id-preview--1c7bab28-ee3b-47e1-9fa7-54c85e1eddaf.lovable.app";

const platformLinks = [
  { label: "eCTD v4.0 Engine", href: "/ectd-engine", description: "Next-generation submission assembly" },
  { label: "Legacy Bridge", href: "/legacy-bridge", description: "Seamless format conversion" },
  { label: "ESG NextGen", href: "/esg-nextgen", description: "Modern gateway integration" },
  { label: "Validation Suite", href: "/validation-suite", description: "Comprehensive compliance testing" },
];

const regulatoryLinks = [
  { label: "ICH M8 Guidelines", href: "/ich-m8-guidelines", description: "International eCTD standards" },
  { label: "FDA ESG Requirements", href: "/fda-esg-requirements", description: "Electronic submission gateway" },
  { label: "21 CFR Part 11", href: "/21-cfr-part-11", description: "Electronic records compliance" },
  { label: "EU CTD Standards", href: "/eu-ctd-standards", description: "European submission requirements" },
];

const NavigationHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">SC</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">
              Standard<span className="text-primary">Core</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4">
                    {platformLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  Regulatory
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4">
                    {regulatoryLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/about"
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/contact"
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTAs */}
          <motion.div 
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
            >
              <a href={UTILITY_APP_URL} target="_blank" rel="noopener noreferrer">
                Login
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
              </a>
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="default" size="sm">
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                Access Vault
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-border/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Platform Section */}
                <div className="mb-4">
                  <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</p>
                  {platformLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Regulatory Section */}
                <div className="mb-4">
                  <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Regulatory</p>
                  {regulatoryLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * (index + platformLinks.length) }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Other Links */}
                <div className="border-t border-border/30 pt-4">
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  >
                    Contact
                  </Link>
                </div>
              <div className="flex flex-col gap-2 px-4">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <a href={UTILITY_APP_URL} target="_blank" rel="noopener noreferrer">
                    Login
                    <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                  </a>
                </Button>
                <Button variant="default" size="sm">
                  <Lock className="w-3.5 h-3.5 mr-1.5" />
                  Access Vault
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default NavigationHeader;
