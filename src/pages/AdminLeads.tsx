import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import LeadDetailModal from "@/components/LeadDetailModal";
import { 
  LogOut, Download, Search, Filter, Mail, Calendar,
  Building, TrendingUp, Users, DollarSign, RefreshCw, Eye, Send, Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Session } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";

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

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sendingBatch, setSendingBatch] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [emailHistory, setEmailHistory] = useState<EmailRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [velocityGradeFilter, setVelocityGradeFilter] = useState("all");
  const [dataArchitectureFilter, setDataArchitectureFilter] = useState("all");
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (!session) {
          navigate('/admin');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/admin');
      } else {
        fetchLeads();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('calculator_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmailHistory = async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('email_history')
        .select('*')
        .eq('lead_id', leadId)
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setEmailHistory(data || []);
    } catch (error: any) {
      console.error('Failed to fetch email history:', error);
      setEmailHistory([]);
    }
  };

  const handleViewLead = async (lead: Lead) => {
    setSelectedLead(lead);
    await fetchEmailHistory(lead.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
    setEmailHistory([]);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        lead.email.toLowerCase().includes(searchLower) ||
        (lead.name?.toLowerCase().includes(searchLower)) ||
        (lead.company?.toLowerCase().includes(searchLower));

      const leadDate = parseISO(lead.created_at);
      const matchesDateFrom = !dateFrom || leadDate >= parseISO(dateFrom);
      const matchesDateTo = !dateTo || leadDate <= parseISO(dateTo + 'T23:59:59');

      const score = lead.velocity_score || 0;
      const matchesMinScore = !minScore || score >= parseInt(minScore);
      const matchesMaxScore = !maxScore || score <= parseInt(maxScore);

      const matchesGrade = velocityGradeFilter === "all" || lead.velocity_grade === velocityGradeFilter;
      const matchesArchitecture = dataArchitectureFilter === "all" || lead.data_architecture === dataArchitectureFilter;

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesMinScore && matchesMaxScore && matchesGrade && matchesArchitecture;
    });
  }, [leads, searchTerm, dateFrom, dateTo, minScore, maxScore, velocityGradeFilter, dataArchitectureFilter]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const handleDeleteLead = async () => {
    if (!deletingLead) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('calculator_leads')
        .delete()
        .eq('id', deletingLead.id);

      if (error) throw error;

      setLeads(leads.filter(l => l.id !== deletingLead.id));
      toast({
        title: "Lead Deleted",
        description: `Successfully deleted lead for ${deletingLead.email}`,
      });
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete lead",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingLead(null);
    }
  };

  const handleBulkDelete = async () => {
    if (filteredLeads.length === 0) return;
    
    setIsBulkDeleting(true);
    try {
      const leadIds = filteredLeads.map(lead => lead.id);
      
      const { error } = await supabase
        .from('calculator_leads')
        .delete()
        .in('id', leadIds);

      if (error) throw error;

      setLeads(leads.filter(l => !leadIds.includes(l.id)));
      toast({
        title: "Bulk Delete Complete",
        description: `Successfully deleted ${leadIds.length} leads`,
      });
    } catch (error: any) {
      toast({
        title: "Bulk Delete Failed",
        description: error.message || "Failed to delete leads",
        variant: "destructive",
      });
    } finally {
      setIsBulkDeleting(false);
      setShowBulkDeleteConfirm(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Email', 'Name', 'Company', 'Job Title', 'Velocity Score', 'Grade',
      'Financial Risk', 'Annual Submissions', 'Active Applications', 
      'Team Size', 'Data Architecture', 'Validated System', 'RTF Probability', 'Date'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.email,
        lead.name || '',
        lead.company || '',
        lead.job_title || '',
        lead.velocity_score || '',
        lead.velocity_grade || '',
        lead.financial_risk || '',
        lead.annual_submissions || '',
        lead.active_applications || '',
        lead.team_size || '',
        lead.data_architecture || '',
        lead.has_validated_system ? 'Yes' : 'No',
        lead.rtf_probability || '',
        format(parseISO(lead.created_at), 'yyyy-MM-dd HH:mm')
      ].map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculator-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${filteredLeads.length} leads to CSV`,
    });
  };

  const handleSendEmail = async (lead: Lead) => {
    setSendingEmail(lead.id);
    try {
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: { leadId: lead.id }
      });

      if (error) throw error;

      toast({
        title: "Email Sent",
        description: `Follow-up email sent to ${lead.email}`,
      });
    } catch (error: any) {
      toast({
        title: "Email Failed",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(null);
    }
  };

  const handleBatchEmail = async () => {
    if (filteredLeads.length === 0) {
      toast({
        title: "No Leads",
        description: "No leads to email with current filters",
        variant: "destructive",
      });
      return;
    }

    setSendingBatch(true);
    try {
      const leadIds = filteredLeads.map(lead => lead.id);
      
      const { data, error } = await supabase.functions.invoke('send-lead-email', {
        body: { leadIds }
      });

      if (error) throw error;

      toast({
        title: "Batch Email Complete",
        description: `Sent ${data.sent} emails successfully${data.failed > 0 ? `, ${data.failed} failed` : ''}`,
      });
    } catch (error: any) {
      toast({
        title: "Batch Email Failed",
        description: error.message || "Failed to send batch emails",
        variant: "destructive",
      });
    } finally {
      setSendingBatch(false);
    }
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

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const stats = useMemo(() => ({
    totalLeads: filteredLeads.length,
    avgScore: filteredLeads.length > 0 
      ? Math.round(filteredLeads.reduce((sum, l) => sum + (l.velocity_score || 0), 0) / filteredLeads.length)
      : 0,
    totalRisk: filteredLeads.reduce((sum, l) => sum + (l.financial_risk || 0), 0),
    uniqueCompanies: new Set(filteredLeads.map(l => l.company).filter(Boolean)).size,
  }), [filteredLeads]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Calculator Leads</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalLeads}</p>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.avgScore}</p>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <DollarSign className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRisk)}</p>
                  <p className="text-sm text-muted-foreground">Total Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Building className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.uniqueCompanies}</p>
                  <p className="text-sm text-muted-foreground">Companies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <Label className="text-foreground">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email, name, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border"
                  />
                </div>
              </div>
              <div>
                <Label className="text-foreground">Grade</Label>
                <Select value={velocityGradeFilter} onValueChange={setVelocityGradeFilter}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="All Grades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="A">Grade A</SelectItem>
                    <SelectItem value="B">Grade B</SelectItem>
                    <SelectItem value="C">Grade C</SelectItem>
                    <SelectItem value="D">Grade D</SelectItem>
                    <SelectItem value="F">Grade F</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Architecture</Label>
                <Select value={dataArchitectureFilter} onValueChange={setDataArchitectureFilter}>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="centralized">Centralized</SelectItem>
                    <SelectItem value="decentralized">Decentralized</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">From Date</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div>
                <Label className="text-foreground">To Date</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-foreground">Min Score</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-foreground">Max Score</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions & Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Leads</CardTitle>
              <CardDescription>{filteredLeads.length} results</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleBatchEmail} disabled={sendingBatch || filteredLeads.length === 0}>
                <Send className={`mr-2 h-4 w-4 ${sendingBatch ? 'animate-pulse' : ''}`} />
                Email All ({filteredLeads.length})
              </Button>
              <Button onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setShowBulkDeleteConfirm(true)} 
                disabled={filteredLeads.length === 0}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete All ({filteredLeads.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading leads...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No leads found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Architecture</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-secondary/30" onClick={() => handleViewLead(lead)}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{lead.name || '-'}</p>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                            {lead.job_title && (
                              <p className="text-xs text-muted-foreground">{lead.job_title}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {lead.company || '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-foreground">{lead.velocity_score || '-'}</span>
                            {lead.velocity_grade && (
                              <Badge variant={getGradeBadgeVariant(lead.velocity_grade)}>
                                {lead.velocity_grade}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-foreground">
                          {formatCurrency(lead.financial_risk)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {lead.data_architecture?.replace('-', ' ') || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(parseISO(lead.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewLead(lead);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSendEmail(lead);
                              }}
                              disabled={sendingEmail === lead.id}
                            >
                              <Mail className={`h-4 w-4 ${sendingEmail === lead.id ? 'animate-pulse' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingLead(lead);
                              }}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <LeadDetailModal
        lead={selectedLead}
        emailHistory={emailHistory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <AlertDialog open={!!deletingLead} onOpenChange={(open) => !open && setDeletingLead(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the lead for <strong>{deletingLead?.email}</strong>? 
              This action cannot be undone and will also delete all associated email history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLead}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showBulkDeleteConfirm} onOpenChange={setShowBulkDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bulk Delete Leads</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{filteredLeads.length} leads</strong> matching your current filters? 
              This action cannot be undone and will also delete all associated email history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBulkDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isBulkDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isBulkDeleting ? "Deleting..." : `Delete ${filteredLeads.length} Leads`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminLeads;
