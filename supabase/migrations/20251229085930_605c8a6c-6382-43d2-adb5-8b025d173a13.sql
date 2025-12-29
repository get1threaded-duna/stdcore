-- Create function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  template_type TEXT NOT NULL DEFAULT 'results_summary',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view email templates" 
ON public.email_templates 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create email templates" 
ON public.email_templates 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update email templates" 
ON public.email_templates 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete email templates" 
ON public.email_templates 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default template
INSERT INTO public.email_templates (name, subject, body_html, is_default, template_type)
VALUES (
  'Default Results Summary',
  'Your eCTD v4.0 Readiness Assessment Results',
  '<h1>Hello {{name}},</h1>
<p>Thank you for completing the eCTD v4.0 Readiness Calculator. Here are your results:</p>
<h2>Your Velocity Score: {{velocity_score}}/100 (Grade {{velocity_grade}})</h2>
<p><strong>Estimated Financial Risk:</strong> ${{financial_risk}}</p>
<p><strong>RTF Probability:</strong> {{rtf_probability}}%</p>
<h3>What This Means</h3>
<p>Based on your current setup with {{active_applications}} active applications, {{team_size}} team members, and a {{data_architecture}} data architecture, we have identified opportunities to improve your regulatory submission process.</p>
<p>Would you like to discuss how to reduce your risk and improve your readiness score? Reply to this email to schedule a consultation.</p>
<p>Best regards,<br>The eCTD Velocity Team</p>',
  true,
  'results_summary'
);