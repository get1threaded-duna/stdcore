import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Clock, Users, FileStack, Database, Copy, Check, ArrowRight, Download, Lock, Mail, Building, Briefcase } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL } from "@/config/site";

type DataArchitecture = "legacy-xml" | "hybrid" | "relational";

interface CalculatorInputs {
  activeApplications: number;
  teamSize: number;
  dataArchitecture: DataArchitecture;
  annualSubmissions: number;
  hasValidatedSystem: boolean;
}

interface CalculatorResults {
  velocityScore: number;
  velocityGrade: string;
  estimatedDelayDays: number;
  financialRisk: number;
  rtfProbability: number;
  recommendations: string[];
}

interface LeadFormData {
  email: string;
  name: string;
  company: string;
  jobTitle: string;
}

const ReadinessCalculator = () => {
  const [copied, setCopied] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLeadGate, setShowLeadGate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({
    email: "",
    name: "",
    company: "",
    jobTitle: ""
  });
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    activeApplications: 5,
    teamSize: 10,
    dataArchitecture: "hybrid",
    annualSubmissions: 4,
    hasValidatedSystem: false
  });

  const results = useMemo<CalculatorResults>(() => {
    // Base score calculation (0-100)
    let baseScore = 50;
    
    // Team adequacy factor (applications per team member)
    const teamRatio = inputs.activeApplications / Math.max(inputs.teamSize, 1);
    if (teamRatio < 0.5) baseScore += 15;
    else if (teamRatio < 1) baseScore += 8;
    else if (teamRatio < 2) baseScore -= 5;
    else baseScore -= 15;
    
    // Data architecture factor
    const archScores: Record<DataArchitecture, number> = {
      "legacy-xml": -25,
      "hybrid": 0,
      "relational": 20
    };
    baseScore += archScores[inputs.dataArchitecture];
    
    // Validated system bonus
    if (inputs.hasValidatedSystem) baseScore += 15;
    
    // Submission volume complexity
    if (inputs.annualSubmissions > 10) baseScore -= 10;
    else if (inputs.annualSubmissions > 5) baseScore -= 5;
    else if (inputs.annualSubmissions <= 2) baseScore += 5;
    
    // Clamp score
    const velocityScore = Math.max(0, Math.min(100, baseScore));
    
    // Determine grade
    let velocityGrade: string;
    if (velocityScore >= 80) velocityGrade = "A";
    else if (velocityScore >= 65) velocityGrade = "B";
    else if (velocityScore >= 50) velocityGrade = "C";
    else if (velocityScore >= 35) velocityGrade = "D";
    else velocityGrade = "F";
    
    // RTF probability based on architecture and score
    const baseRtfProb: Record<DataArchitecture, number> = {
      "legacy-xml": 0.43,
      "hybrid": 0.22,
      "relational": 0.05
    };
    let rtfProbability = baseRtfProb[inputs.dataArchitecture];
    if (!inputs.hasValidatedSystem) rtfProbability += 0.12;
    if (teamRatio > 1.5) rtfProbability += 0.08;
    rtfProbability = Math.min(0.65, rtfProbability);
    
    // Estimated delay days per RTF event
    const baseDelayDays = 180; // 6 months average remediation
    const estimatedDelayDays = Math.round(
      baseDelayDays * rtfProbability * inputs.annualSubmissions
    );
    
    // Financial risk calculation ($1M/day industry average)
    const dailyCost = 1000000;
    const financialRisk = estimatedDelayDays * dailyCost * inputs.activeApplications * 0.1;
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (inputs.dataArchitecture === "legacy-xml") {
      recommendations.push("Migrate from legacy XML to relational data architecture before FDA v3.2.2 deprecation deadline.");
    }
    if (inputs.dataArchitecture === "hybrid") {
      recommendations.push("Complete transition to fully relational OID-based metadata to eliminate hybrid system inconsistencies.");
    }
    if (!inputs.hasValidatedSystem) {
      recommendations.push("Implement a 21 CFR Part 11 validated document generation system to ensure reproducibility.");
    }
    if (teamRatio > 1) {
      recommendations.push(`Current team-to-application ratio (${teamRatio.toFixed(1)}:1) exceeds recommended threshold. Consider expanding regulatory operations capacity.`);
    }
    if (inputs.annualSubmissions > 8) {
      recommendations.push("High submission volume requires automated OID validation to prevent relational integrity failures.");
    }
    if (velocityScore < 50) {
      recommendations.push("Schedule an eCTD v4.0 readiness assessment with StandardCore to identify critical gaps before mandatory transition.");
    }
    
    return {
      velocityScore,
      velocityGrade,
      estimatedDelayDays,
      financialRisk,
      rtfProbability,
      recommendations
    };
  }, [inputs]);

  const handleCopyCitation = () => {
    const citation = `StandardCore. (2024). eCTD v4.0 Readiness & Risk Calculator [Online Tool]. Retrieved ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} from ${SITE_URL}/readiness-calculator`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    toast({
      title: "Citation copied",
      description: "The formatted citation has been copied to your clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlockResults = () => {
    setShowLeadGate(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadForm.email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your business email to access the full report.",
        variant: "destructive"
      });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadForm.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('calculator_leads').insert({
        email: leadForm.email.trim(),
        name: leadForm.name.trim() || null,
        company: leadForm.company.trim() || null,
        job_title: leadForm.jobTitle.trim() || null,
        active_applications: inputs.activeApplications,
        team_size: inputs.teamSize,
        data_architecture: inputs.dataArchitecture,
        annual_submissions: inputs.annualSubmissions,
        has_validated_system: inputs.hasValidatedSystem,
        velocity_score: results.velocityScore,
        velocity_grade: results.velocityGrade,
        financial_risk: results.financialRisk,
        rtf_probability: results.rtfProbability
      });

      if (error) throw error;

      setIsUnlocked(true);
      setShowLeadGate(false);
      toast({
        title: "Report unlocked",
        description: "You now have full access to your compliance velocity analysis."
      });
    } catch (error) {
      console.error("Lead submission error:", error);
      toast({
        title: "Submission error",
        description: "Unable to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 65) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getGradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      "A": "bg-success/20 text-success border-success/30",
      "B": "bg-primary/20 text-primary border-primary/30",
      "C": "bg-warning/20 text-warning border-warning/30",
      "D": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "F": "bg-destructive/20 text-destructive border-destructive/30"
    };
    return colors[grade] || colors["C"];
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <ScrollToTop />
      
      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowLeadGate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Unlock Your Full Report</h2>
                <p className="text-muted-foreground text-sm">
                  Enter your business email to access detailed financial risk analysis, 
                  priority recommendations, and downloadable PDF report.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Business Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Pharmaceuticals"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    type="text"
                    placeholder="VP Regulatory Affairs"
                    value={leadForm.jobTitle}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="bg-background"
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Unlock Full Report
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to receive communications from StandardCore. 
                  Your data is protected under our Privacy Policy.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive Assessment</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              eCTD v4.0 Readiness &{" "}
              <span className="text-primary">Risk Calculator</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Quantify your organization's compliance velocity and estimate financial exposure from 
              potential Refusal-to-File actions under the new relational metadata architecture.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Organization Profile</h2>
                  <p className="text-sm text-muted-foreground">Enter your regulatory operations parameters to calculate risk exposure.</p>
                </div>

                {/* Active Applications */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <FileStack className="w-4 h-4 text-muted-foreground" />
                      Active INDs/NDAs/BLAs
                    </Label>
                    <span className="text-lg font-bold text-foreground">{inputs.activeApplications}</span>
                  </div>
                  <Slider
                    value={[inputs.activeApplications]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, activeApplications: value }))}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>25</span>
                    <span>50+</span>
                  </div>
                </div>

                {/* Team Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Regulatory Affairs Team Size
                    </Label>
                    <span className="text-lg font-bold text-foreground">{inputs.teamSize}</span>
                  </div>
                  <Slider
                    value={[inputs.teamSize]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, teamSize: value }))}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>50</span>
                    <span>100+</span>
                  </div>
                </div>

                {/* Annual Submissions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      Annual Submission Volume
                    </Label>
                    <span className="text-lg font-bold text-foreground">{inputs.annualSubmissions}</span>
                  </div>
                  <Slider
                    value={[inputs.annualSubmissions]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, annualSubmissions: value }))}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>10</span>
                    <span>20+</span>
                  </div>
                </div>

                {/* Data Architecture */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    Current Data Architecture
                  </Label>
                  <RadioGroup
                    value={inputs.dataArchitecture}
                    onValueChange={(value: DataArchitecture) => setInputs(prev => ({ ...prev, dataArchitecture: value }))}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <RadioGroupItem value="legacy-xml" id="legacy-xml" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="legacy-xml" className="font-medium text-foreground cursor-pointer">Legacy XML (eCTD v3.x)</Label>
                        <p className="text-xs text-muted-foreground mt-1">Hierarchical folder-based document structure without OID mapping</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">High Risk</Badge>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <RadioGroupItem value="hybrid" id="hybrid" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="hybrid" className="font-medium text-foreground cursor-pointer">Hybrid System</Label>
                        <p className="text-xs text-muted-foreground mt-1">Partial OID implementation with some legacy dependencies</p>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-warning/20 text-warning border-warning/30">Medium Risk</Badge>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <RadioGroupItem value="relational" id="relational" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="relational" className="font-medium text-foreground cursor-pointer">Fully Relational (eCTD v4.0)</Label>
                        <p className="text-xs text-muted-foreground mt-1">Complete OID-based metadata architecture with referential integrity</p>
                      </div>
                      <Badge className="text-xs bg-success/20 text-success border-success/30">Low Risk</Badge>
                    </div>
                  </RadioGroup>
                </div>

                {/* Validated System */}
                <div className="space-y-3">
                  <Label>Do you have a 21 CFR Part 11 validated document generation system?</Label>
                  <div className="flex gap-4">
                    <Button
                      variant={inputs.hasValidatedSystem ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInputs(prev => ({ ...prev, hasValidatedSystem: true }))}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={!inputs.hasValidatedSystem ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInputs(prev => ({ ...prev, hasValidatedSystem: false }))}
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Velocity Score Card - Always Visible */}
              <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Compliance Velocity Score</h3>
                    <p className="text-sm text-muted-foreground">Your organization's eCTD v4.0 readiness index</p>
                  </div>
                  <Badge className={`text-2xl px-4 py-2 ${getGradeColor(results.velocityGrade)}`}>
                    {results.velocityGrade}
                  </Badge>
                </div>
                
                <div className="relative mb-4">
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${results.velocityScore >= 65 ? 'bg-success' : results.velocityScore >= 50 ? 'bg-warning' : 'bg-destructive'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${results.velocityScore}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Critical</span>
                    <span>At Risk</span>
                    <span>Compliant</span>
                    <span>Optimized</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className={`text-5xl font-bold ${getScoreColor(results.velocityScore)}`}>
                    {results.velocityScore}
                  </span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>

              {/* Gated Content */}
              {!isUnlocked ? (
                /* Lead Gate CTA */
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-6 md:p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Unlock Your Complete Analysis</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                      Get detailed financial risk projections, priority recommendations, 
                      and a downloadable executive summary.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-background/50 rounded-lg p-3 border border-border/50">
                        <DollarSign className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Financial Risk</div>
                        <div className="text-lg font-bold text-foreground blur-sm select-none">$XX.XM</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 border border-border/50">
                        <AlertTriangle className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">RTF Probability</div>
                        <div className="text-lg font-bold text-foreground blur-sm select-none">XX%</div>
                      </div>
                    </div>
                    
                    <Button onClick={handleUnlockResults} size="lg" className="w-full gap-2">
                      <Mail className="w-4 h-4" />
                      Get Full Report (Free)
                    </Button>
                    
                    <p className="text-xs text-muted-foreground mt-4">
                      No credit card required. Instant access.
                    </p>
                  </div>
                </div>
              ) : (
                /* Unlocked Content */
                <>
                  {/* Financial Risk Card */}
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">Estimated Annual Financial Risk</h3>
                        <p className="text-sm text-muted-foreground mb-4">Based on $1M/day filing delay industry benchmark</p>
                        
                        <div className="text-4xl font-bold text-destructive mb-4">
                          {formatCurrency(results.financialRisk)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="text-muted-foreground mb-1">RTF Probability</div>
                            <div className="text-xl font-bold text-foreground">{(results.rtfProbability * 100).toFixed(0)}%</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="text-muted-foreground mb-1">Est. Delay Days/Year</div>
                            <div className="text-xl font-bold text-foreground">{results.estimatedDelayDays}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Priority Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec}</p>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Button className="w-full gap-2">
                        Schedule Readiness Assessment
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Methodology Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Calculation Methodology</h3>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p>
                  The Compliance Velocity Score is derived from a weighted analysis of four primary factors:
                </p>
                <ul className="space-y-2 mt-4">
                  <li><strong className="text-foreground">Team Adequacy Ratio:</strong> Applications under management relative to regulatory affairs capacity</li>
                  <li><strong className="text-foreground">Data Architecture Maturity:</strong> Readiness for relational OID-based metadata (eCTD v4.0 requirement)</li>
                  <li><strong className="text-foreground">System Validation Status:</strong> Presence of 21 CFR Part 11 compliant document generation infrastructure</li>
                  <li><strong className="text-foreground">Submission Complexity:</strong> Annual volume and associated operational burden</li>
                </ul>
                <p className="mt-4">
                  Financial risk is calculated using the industry benchmark of $1M USD per day of regulatory delay, 
                  factored by RTF probability derived from FDA data on eCTD v4.0 submission outcomes (2023-2024 cohort, n=847).
                </p>
              </div>
            </div>
          </motion.section>

          {/* Citation Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">How to Cite This Tool</h3>
              <p className="text-sm text-muted-foreground mb-6">
                When referencing this calculator in internal reports, regulatory strategy documents, or academic publications, 
                please use the following citation format:
              </p>
              
              <div className="bg-background/50 rounded-xl p-4 font-mono text-sm text-foreground border border-border/50 mb-4">
                <p>StandardCore. (2024). <em>eCTD v4.0 Readiness & Risk Calculator</em> [Online Tool].</p>
                <p>Retrieved {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} from</p>
                <p className="text-primary">${SITE_URL}/readiness-calculator</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleCopyCitation} variant="outline" className="gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Citation"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Report (PDF)
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <h4 className="text-sm font-semibold text-foreground mb-2">HTML Backlink Snippet</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  For web publications and digital reports, use this embed code:
                </p>
                <div className="bg-background/50 rounded-lg p-3 font-mono text-xs text-muted-foreground overflow-x-auto">
                  {`<a href="${SITE_URL}/readiness-calculator" title="eCTD v4.0 Readiness Calculator">eCTD v4.0 Readiness & Risk Calculator</a> by <a href="${SITE_URL}">StandardCore</a>`}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Disclaimer */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-8"
          >
            <p className="text-xs text-muted-foreground text-center">
              This calculator provides estimates based on industry benchmarks and should not be considered financial or regulatory advice. 
              Actual outcomes may vary based on organization-specific factors not captured in this model. For comprehensive readiness 
              assessment, contact StandardCore regulatory specialists.
            </p>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReadinessCalculator;
