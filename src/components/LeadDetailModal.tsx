import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { Mail, Building, User, Calendar, TrendingUp, DollarSign, Database, CheckCircle, XCircle } from "lucide-react";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  job_title: string | null;
  velocity_score: number | null;
  velocity_grade: string | null;
  financial_risk: number | null;
  annual_submissions: number | null;
  active_applications: number | null;
  team_size: number | null;
  data_architecture: string | null;
  has_validated_system: boolean | null;
  rtf_probability: number | null;
  created_at: string;
}

interface EmailRecord {
  id: string;
  sent_at: string;
  subject: string;
  status: string;
  email_type: string;
}

interface LeadDetailModalProps {
  lead: Lead | null;
  emailHistory: EmailRecord[];
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, emailHistory, isOpen, onClose }: LeadDetailModalProps) => {
  if (!lead) return null;

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getGradeBadgeVariant = (grade: string | null) => {
    switch (grade) {
      case 'A': return 'default';
      case 'B': return 'secondary';
      case 'C': return 'outline';
      case 'D': return 'destructive';
      case 'F': return 'destructive';
      default: return 'outline';
    }
  };

  const getGradeDescription = (grade: string | null) => {
    switch (grade) {
      case 'A': return 'Excellent readiness - minimal transition risk';
      case 'B': return 'Good readiness - some optimization needed';
      case 'C': return 'Moderate readiness - significant improvements required';
      case 'D': return 'Low readiness - major infrastructure changes needed';
      case 'F': return 'Critical readiness gap - comprehensive overhaul required';
      default: return 'Assessment pending';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Lead Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{lead.name || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium text-foreground">{lead.company || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-medium text-foreground">{lead.job_title || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Assessment Score */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Assessment Results</h3>
            <div className="bg-secondary/30 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Compliance Velocity Score</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl font-bold text-primary">{lead.velocity_score ?? '--'}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
                {lead.velocity_grade && (
                  <Badge variant={getGradeBadgeVariant(lead.velocity_grade)} className="text-lg px-3 py-1">
                    Grade {lead.velocity_grade}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{getGradeDescription(lead.velocity_grade)}</p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Key Metrics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-destructive" />
                  <p className="text-sm text-muted-foreground">Financial Risk</p>
                </div>
                <p className="text-lg font-semibold text-destructive">{formatCurrency(lead.financial_risk)}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">RTF Probability</p>
                </div>
                <p className="text-lg font-semibold text-foreground">{lead.rtf_probability ? `${(lead.rtf_probability * 100).toFixed(1)}%` : 'N/A'}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Annual Submissions</p>
                </div>
                <p className="text-lg font-semibold text-foreground">{lead.annual_submissions ?? 'N/A'}</p>
              </div>
              <div className="bg-secondary/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Database className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Active Applications</p>
                </div>
                <p className="text-lg font-semibold text-foreground">{lead.active_applications ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Organization Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Organization Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-medium text-foreground">{lead.team_size ?? 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Data Architecture</p>
                  <p className="font-medium text-foreground capitalize">{lead.data_architecture?.replace('-', ' ') || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {lead.has_validated_system ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Validated Publishing System</p>
                  <p className="font-medium text-foreground">{lead.has_validated_system ? 'Yes' : 'No'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium text-foreground">{format(parseISO(lead.created_at), 'MMM d, yyyy h:mm a')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email History */}
          <Separator className="bg-border" />
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Email History</h3>
            {emailHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No emails sent yet</p>
            ) : (
              <div className="space-y-2">
                {emailHistory.map((email) => (
                  <div key={email.id} className="flex items-center justify-between bg-secondary/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{email.subject}</p>
                        <p className="text-xs text-muted-foreground">{email.email_type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={email.status === 'sent' ? 'default' : 'destructive'} className="mb-1">
                        {email.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(email.sent_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
