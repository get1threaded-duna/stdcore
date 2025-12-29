import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ectd-v4-migration-guide-2025",
    title: "The Complete eCTD v4.0 Migration Guide for 2025",
    excerpt: "With the FDA's eCTD v3.2.2 deprecation deadline approaching, pharmaceutical companies must prepare for mandatory v4.0 adoption. This comprehensive guide covers timeline milestones, technical requirements, and common migration pitfalls.",
    author: "Dr. Michael Torres",
    authorRole: "Director of Regulatory Strategy",
    date: "December 15, 2024",
    readTime: "12 min read",
    category: "eCTD Updates",
    tags: ["eCTD v4.0", "Migration", "FDA", "Compliance"],
    featured: true
  },
  {
    id: "2",
    slug: "deterministic-vs-probabilistic-regulatory",
    title: "Why Probabilistic AI Fails FDA Validation Requirements",
    excerpt: "A technical deep-dive into why Large Language Models cannot achieve 21 CFR Part 11 compliance, and how deterministic architectures solve the reproducibility problem.",
    author: "Sarah Chen, PhD",
    authorRole: "Chief Scientific Officer",
    date: "December 8, 2024",
    readTime: "15 min read",
    category: "Regulatory Technology",
    tags: ["AI", "Validation", "21 CFR Part 11", "Determinism"],
    featured: true
  },
  {
    id: "3",
    slug: "esg-nextgen-submission-requirements",
    title: "ESG NextGen: What Pharmaceutical Companies Need to Know",
    excerpt: "The FDA's Electronic Submissions Gateway NextGen represents a fundamental shift in how regulatory submissions are transmitted. Learn about the new authentication requirements, file formats, and integration approaches.",
    author: "James Wilson",
    authorRole: "VP of Engineering",
    date: "November 28, 2024",
    readTime: "8 min read",
    category: "ESG NextGen",
    tags: ["ESG", "FDA Gateway", "Electronic Submissions"],
    featured: false
  },
  {
    id: "4",
    slug: "oid-relational-integrity-rtf-prevention",
    title: "Preventing RTF Actions Through OID Relational Integrity",
    excerpt: "Object Identifier mismatches are now the leading cause of Refusal-to-File actions in eCTD v4.0 submissions. This article examines the technical requirements for maintaining referential integrity across modules.",
    author: "Dr. Emily Rodriguez",
    authorRole: "Regulatory Affairs Lead",
    date: "November 20, 2024",
    readTime: "10 min read",
    category: "Compliance",
    tags: ["OID", "RTF", "Relational Integrity", "eCTD"],
    featured: false
  },
  {
    id: "5",
    slug: "ich-m8-implementation-global-harmonization",
    title: "ICH M8 Implementation: Achieving Global Submission Harmonization",
    excerpt: "The ICH M8 guideline establishes the international standard for eCTD structure. Learn how StandardCore ensures compliance across FDA, EMA, PMDA, and Health Canada requirements.",
    author: "Akiko Tanaka",
    authorRole: "Global Regulatory Director",
    date: "November 12, 2024",
    readTime: "9 min read",
    category: "Global Regulatory",
    tags: ["ICH M8", "Global", "Harmonization", "Multi-Regional"],
    featured: false
  },
  {
    id: "6",
    slug: "21-cfr-part-11-cloud-validation",
    title: "21 CFR Part 11 Compliance in Cloud-Based Regulatory Systems",
    excerpt: "As pharmaceutical companies migrate to cloud infrastructure, maintaining Part 11 compliance requires careful architectural decisions. This article outlines the validation framework for cloud-native regulatory platforms.",
    author: "Robert Kim",
    authorRole: "Head of Quality Assurance",
    date: "November 5, 2024",
    readTime: "11 min read",
    category: "Compliance",
    tags: ["21 CFR Part 11", "Cloud", "Validation", "SaaS"],
    featured: false
  },
  {
    id: "7",
    slug: "sppl-spl-labeling-best-practices",
    title: "SPL Labeling Best Practices for 2025 FDA Requirements",
    excerpt: "Structured Product Labeling continues to evolve with new FDA requirements. This guide covers the latest SPL schema updates, UNII requirements, and common validation errors.",
    author: "Lisa Park",
    authorRole: "Labeling Specialist",
    date: "October 28, 2024",
    readTime: "7 min read",
    category: "Labeling",
    tags: ["SPL", "Labeling", "FDA", "UNII"],
    featured: false
  },
  {
    id: "8",
    slug: "legacy-ectd-archive-migration",
    title: "Migrating Legacy eCTD Archives to v4.0: Lessons from the Field",
    excerpt: "Organizations with decades of eCTD v3.x submissions face unique challenges in lifecycle migration. Learn from real-world case studies of successful archive transformations.",
    author: "Dr. Michael Torres",
    authorRole: "Director of Regulatory Strategy",
    date: "October 15, 2024",
    readTime: "14 min read",
    category: "eCTD Updates",
    tags: ["Migration", "Legacy", "Archive", "Lifecycle"],
    featured: false
  }
];

const categories = ["All", "eCTD Updates", "Regulatory Technology", "ESG NextGen", "Compliance", "Global Regulatory", "Labeling"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <ScrollToTop />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Regulatory <span className="text-primary">Insights</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Expert analysis on eCTD compliance, FDA requirements, and regulatory technology trends 
              from the StandardCore team.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="bg-card/50 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                        {/* Gradient placeholder for image */}
                        <div className="h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-background relative">
                          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                            Featured
                          </Badge>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{post.author}</p>
                                <p className="text-xs text-muted-foreground">{post.date}</p>
                              </div>
                            </div>
                            
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}

          {/* All Posts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {selectedCategory === "All" ? "All Articles" : selectedCategory}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-card/50 border border-border/50 rounded-xl p-6 h-full hover:border-primary/30 transition-all duration-300 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs text-muted-foreground flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        
                        <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.section>

          {/* Newsletter CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Ahead of Regulatory Changes
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get monthly insights on eCTD v4.0 updates, FDA guidance changes, and regulatory technology trends 
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input placeholder="Enter your email" className="bg-background" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
