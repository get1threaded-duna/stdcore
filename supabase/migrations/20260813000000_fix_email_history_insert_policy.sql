-- Security fix: the original "Service role can insert email history" policy had no TO clause,
-- so it applied to the `public` role — allowing anonymous users to insert arbitrary rows.
-- The service role bypasses RLS entirely, so this policy was never needed.
DROP POLICY IF EXISTS "Service role can insert email history" ON public.email_history;
