import { motion } from "framer-motion";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Building, Users, Target, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "We build systems that produce deterministic, verifiable results. Every output must be traceable and reproducible."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside our customers as true partners, understanding their challenges and delivering solutions that matter."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we do, from code quality to customer support."
  }
];

const leadership = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Former VP of Regulatory Technology at a top-10 pharma company. PhD in Computational Biology from MIT."
  },
  {
    name: "Michael Torres",
    role: "Chief Technology Officer",
    bio: "20+ years building enterprise software. Previously led engineering at two successful regulatory tech startups."
  },
  {
    name: "Dr. Emily Watson",
    role: "Chief Regulatory Officer",
    bio: "Former FDA reviewer with 15 years of agency experience. Expert in eCTD and electronic submissions."
  },
  {
    name: "James Park",
    role: "Chief Product Officer",
    bio: "Product leader with deep expertise in life sciences software. MBA from Wharton."
  }
];

const milestones = [
  { year: "2019", event: "StandardCore founded in Cambridge, MA" },
  { year: "2020", event: "First production deployment at a top-20 pharma" },
  { year: "2021", event: "Achieved SOC2 Type II certification" },
  { year: "2022", event: "Launched eCTD v4.0 Engine" },
  { year: "2023", event: "Expanded to European and Asian markets" },
  { year: "2024", event: "1,000th successful submission milestone" }
];

const AboutUs = () => {
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
              <BreadcrumbPage>About Us</BreadcrumbPage>
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
              <Building className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Company</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About StandardCore
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to eliminate regulatory submission failures and accelerate the path to patient access for life-saving therapies.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every day, regulatory delays keep life-saving medicines from reaching patients who need them. We believe technology should eliminate these barriers, not create new ones. StandardCore builds the deterministic infrastructure that ensures submissions succeed the first time, every time.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="p-6 rounded-xl bg-card/50 border border-border/40 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((person, index) => (
                <motion.div
                  key={person.name}
                  className="p-6 rounded-xl bg-card/50 border border-border/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4">
                    <span className="text-primary font-semibold">{person.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="text-sm text-primary mb-2">{person.role}</p>
                  <p className="text-sm text-muted-foreground">{person.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Our Journey</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <div className="w-16 text-primary font-bold text-lg">{milestone.year}</div>
                  <div className="flex-1 p-4 rounded-lg bg-secondary/20 border border-border/30">
                    <span className="text-foreground">{milestone.event}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Location */}
          <motion.div 
            className="p-8 rounded-2xl bg-card/50 border border-border/40 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Headquarters</h2>
            <p className="text-muted-foreground">
              Cambridge, MA 02142<br />
              United States
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              With remote team members across North America, Europe, and Asia
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
