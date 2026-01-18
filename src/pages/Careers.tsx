import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Clock, Heart, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage for you and your family" },
  { icon: Zap, title: "Flexible Work", description: "Remote-first culture with flexible hours and unlimited PTO" },
  { icon: Users, title: "Growth", description: "Learning budget, conference attendance, and career development programs" }
];

const openings = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Build the core eCTD publishing engine and validation systems that power enterprise pharma submissions."
  },
  {
    title: "Product Manager, Regulatory",
    department: "Product",
    location: "Cambridge, MA / Remote",
    type: "Full-time",
    description: "Define product strategy for our regulatory submission platform, working closely with pharma customers."
  },
  {
    title: "Regulatory Affairs Specialist",
    department: "Regulatory",
    location: "Remote (US/EU)",
    type: "Full-time",
    description: "Provide regulatory expertise to customers and inform product development with real-world submission experience."
  },
  {
    title: "Solutions Engineer",
    department: "Customer Success",
    location: "Remote (US)",
    type: "Full-time",
    description: "Help enterprise customers implement and optimize StandardCore for their submission workflows."
  },
  {
    title: "Senior DevOps Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Build and maintain our secure, compliant infrastructure supporting regulated workloads."
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-6 py-24 max-w-5xl">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Careers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Careers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Help us build the infrastructure that accelerates life-saving medicines to patients. We're looking for exceptional people who want to make a difference.
            </p>
          </div>

          {/* Why Join */}
          <div className="mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why StandardCore?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're a team of engineers, regulatory experts, and product people who believe technology can transform how medicines reach patients. Our work directly impacts drug approval timelines, and every successful submission is a step toward better patient outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <benefit.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <motion.div
                  key={job.title}
                  className="p-6 rounded-xl bg-card/50 border border-border/40 hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-secondary/50 text-muted-foreground">
                          {job.department}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-primary/20 text-primary">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="gap-1">
                        Apply <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Don't See */}
          <motion.div 
            className="p-8 rounded-2xl bg-card/50 border border-border/40 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We're always looking for talented people. Send us your resume and tell us how you'd like to contribute to our mission.
            </p>
            <Link to="/contact">
              <Button className="gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
