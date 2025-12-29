-- Allow admins to delete leads
CREATE POLICY "Admins can delete calculator leads"
ON public.calculator_leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));