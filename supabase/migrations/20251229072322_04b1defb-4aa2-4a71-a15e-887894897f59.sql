-- Create a table for calculator leads
CREATE TABLE public.calculator_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  job_title TEXT,
  active_applications INTEGER,
  team_size INTEGER,
  data_architecture TEXT,
  annual_submissions INTEGER,
  has_validated_system BOOLEAN,
  velocity_score INTEGER,
  velocity_grade TEXT,
  financial_risk NUMERIC,
  rtf_probability NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.calculator_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (anyone can submit)
CREATE POLICY "Anyone can submit a lead" 
ON public.calculator_leads 
FOR INSERT 
WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX idx_calculator_leads_email ON public.calculator_leads(email);
CREATE INDEX idx_calculator_leads_created_at ON public.calculator_leads(created_at DESC);