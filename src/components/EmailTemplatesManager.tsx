import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Star, Save, X, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body_html: string;
  is_default: boolean;
  template_type: string;
  created_at: string;
  updated_at: string;
}

const TEMPLATE_VARIABLES = [
  { var: "{{name}}", desc: "Lead's name" },
  { var: "{{email}}", desc: "Lead's email" },
  { var: "{{company}}", desc: "Company name" },
  { var: "{{velocity_score}}", desc: "Velocity score (0-100)" },
  { var: "{{velocity_grade}}", desc: "Grade (A-F)" },
  { var: "{{financial_risk}}", desc: "Financial risk amount" },
  { var: "{{rtf_probability}}", desc: "RTF probability %" },
  { var: "{{active_applications}}", desc: "Number of active apps" },
  { var: "{{team_size}}", desc: "Team size" },
  { var: "{{data_architecture}}", desc: "Data architecture type" },
];

interface EmailTemplatesManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailTemplatesManager = ({ isOpen, onClose }: EmailTemplatesManagerProps) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<EmailTemplate | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body_html: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('is_default', { ascending: false })
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch templates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.subject || !formData.body_html) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .insert({
          name: formData.name,
          subject: formData.subject,
          body_html: formData.body_html,
          is_default: templates.length === 0,
          template_type: 'results_summary',
        });

      if (error) throw error;

      toast({ title: "Template Created", description: "Email template saved successfully" });
      setShowNewForm(false);
      setFormData({ name: "", subject: "", body_html: "" });
      fetchTemplates();
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to create template",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingTemplate) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          name: editingTemplate.name,
          subject: editingTemplate.subject,
          body_html: editingTemplate.body_html,
        })
        .eq('id', editingTemplate.id);

      if (error) throw error;

      toast({ title: "Template Updated", description: "Changes saved successfully" });
      setEditingTemplate(null);
      fetchTemplates();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update template",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetDefault = async (template: EmailTemplate) => {
    try {
      // First, unset all defaults
      await supabase
        .from('email_templates')
        .update({ is_default: false })
        .neq('id', template.id);

      // Then set the new default
      const { error } = await supabase
        .from('email_templates')
        .update({ is_default: true })
        .eq('id', template.id);

      if (error) throw error;

      toast({ title: "Default Updated", description: `${template.name} is now the default template` });
      fetchTemplates();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to set default",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingTemplate) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', deletingTemplate.id);

      if (error) throw error;

      toast({ title: "Template Deleted", description: "Template removed successfully" });
      setDeletingTemplate(null);
      fetchTemplates();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete template",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Templates</DialogTitle>
            <DialogDescription>
              Manage email templates for lead follow-ups. Use variables like {"{{name}}"} to personalize emails.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Variable Reference */}
            <Card className="bg-secondary/30">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Available Variables
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  {TEMPLATE_VARIABLES.map(v => (
                    <TooltipProvider key={v.var}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="font-mono text-xs">
                            {v.var}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>{v.desc}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New Template Form */}
            {showNewForm ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Follow-up Email"
                    />
                  </div>
                  <div>
                    <Label>Subject Line</Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Your Assessment Results"
                    />
                  </div>
                  <div>
                    <Label>Body (HTML)</Label>
                    <Textarea
                      value={formData.body_html}
                      onChange={(e) => setFormData({ ...formData, body_html: e.target.value })}
                      placeholder="<h1>Hello {{name}},</h1>..."
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreate} disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Template"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewForm(false)}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button onClick={() => setShowNewForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            )}

            {/* Template List */}
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading templates...</div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No templates found</div>
            ) : (
              <div className="space-y-4">
                {templates.map(template => (
                  <Card key={template.id} className={editingTemplate?.id === template.id ? "ring-2 ring-primary" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          {template.is_default && (
                            <Badge variant="default" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {!template.is_default && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(template)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTemplate(template)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingTemplate(template)}
                            className="text-destructive hover:text-destructive"
                            disabled={template.is_default}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription className="text-sm font-mono">
                        Subject: {template.subject}
                      </CardDescription>
                    </CardHeader>
                    
                    {editingTemplate?.id === template.id && (
                      <CardContent className="space-y-4 pt-0">
                        <div>
                          <Label>Template Name</Label>
                          <Input
                            value={editingTemplate.name}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Subject Line</Label>
                          <Input
                            value={editingTemplate.subject}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Body (HTML)</Label>
                          <Textarea
                            value={editingTemplate.body_html}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, body_html: e.target.value })}
                            rows={10}
                            className="font-mono text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleUpdate} disabled={isSaving}>
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingTemplate} onOpenChange={(open) => !open && setDeletingTemplate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTemplate?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmailTemplatesManager;
