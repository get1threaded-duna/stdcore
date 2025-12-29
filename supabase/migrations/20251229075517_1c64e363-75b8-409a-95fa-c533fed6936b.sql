-- Create email history table to track sent emails
CREATE TABLE public.email_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.calculator_leads(id) ON DELETE CASCADE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  email_type TEXT NOT NULL DEFAULT 'results_summary',
  sent_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.email_history ENABLE ROW LEVEL SECURITY;

-- Admins can view and insert email history
CREATE POLICY "Admins can view email history"
ON public.email_history
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert email history"
ON public.email_history
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Service role can insert (for edge functions)
CREATE POLICY "Service role can insert email history"
ON public.email_history
FOR INSERT
WITH CHECK (true);