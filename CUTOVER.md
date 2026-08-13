# StandardCore — Supabase Cutover & Deploy Runbook

Repo-specific. Every command below is tailored to what's actually in this codebase.

**Current state:** code is Lovable-free and builds clean. The app still points at Lovable's
Supabase instance `mpasszylvcaslwymmayw`. This runbook moves it to a project you own and ships it.

---

## What the backend actually contains

**Tables (5 migrations in `supabase/migrations/`):**

| Table | Purpose | Access |
|---|---|---|
| `calculator_leads` | Readiness Calculator submissions | Public INSERT, admin SELECT/DELETE |
| `user_roles` | `admin` / `user` enum roles, FK → `auth.users` | Self SELECT, admin SELECT |
| `email_history` | Log of emails sent to leads | Admin SELECT/INSERT + service role |
| `email_templates` | Editable email templates + 1 seeded default | Admin full CRUD |

**Function:** `public.has_role(uuid, app_role)` — `SECURITY DEFINER`, prevents RLS recursion.
**Trigger:** `update_email_templates_updated_at`.

**Edge function:** `send-lead-email` (Deno + Resend), `verify_jwt = true`.
Secrets it reads: `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
(the last two are auto-injected by Supabase — only `RESEND_API_KEY` must be set manually).

**Frontend touchpoints:** `ReadinessCalculator.tsx` (insert lead), `AdminAuth.tsx`
(signUp / signInWithPassword + role check), `AdminLeads.tsx` (CRUD + `functions.invoke('send-lead-email')`).

---

## Step 1 — Create your own Supabase project

1. [supabase.com](https://supabase.com) → New Project. Region: closest to your users. Save the DB password.
2. Copy from **Settings → API**: Project URL, `anon`/publishable key, Project ref.

## Step 2 — Push the schema

```bash
npm i -g supabase
supabase login
cd ~/STDC/stdcore
supabase link --project-ref YOUR_NEW_REF     # prompts for the DB password
supabase db push                              # replays all 5 migrations
```

Verify in the dashboard: 4 tables, `app_role` enum, `has_role` function present.

## Step 3 — Repoint the app

Edit `.env` (gitignored — never commit real values):

```
VITE_SUPABASE_PROJECT_ID="YOUR_NEW_REF"
VITE_SUPABASE_URL="https://YOUR_NEW_REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-new-anon-key"
```

Also update `supabase/config.toml` → `project_id = "YOUR_NEW_REF"`.

```bash
npm run dev    # visit /readiness-calculator, submit a test lead
```

Confirm the row lands in `calculator_leads` in your new dashboard. **That single test proves
URL, key, RLS, and the insert path all work.**

## Step 4 — Edge function + email

```bash
supabase secrets set RESEND_API_KEY=re_xxxxx --project-ref YOUR_NEW_REF
supabase functions deploy send-lead-email --project-ref YOUR_NEW_REF
```

Resend also needs your sending domain verified (DNS: SPF + DKIM records) before mail to
external addresses will deliver. Check the `from:` address in
`supabase/functions/send-lead-email/index.ts` matches a verified domain.

## Step 5 — Create your admin user

Auth users do **not** migrate from Lovable Cloud. Create yours fresh:

1. Run the app → `/admin` → sign up with your email.
2. Grab the user id: dashboard → Authentication → Users.
3. Dashboard → SQL Editor:

```sql
insert into public.user_roles (user_id, role)
values ('PASTE-USER-UUID', 'admin');
```

4. Sign in at `/admin` → `/admin/leads` should now load. If it 403s, the role row is wrong.

## Step 6 — Auth settings

Dashboard → Authentication → URL Configuration:
- **Site URL:** `https://standardcore.com`
- **Redirect URLs:** add `http://localhost:8080`, the Vercel preview domain, and both production domains.

Consider disabling public sign-ups once your admin account exists (Authentication → Providers →
Email → disable "Allow new users to sign up") — `/admin` currently exposes a signup form.

## Step 7 — Deploy

```bash
git push                       # commit ac46008 is waiting to go up
npm i -g vercel && vercel      # or import the repo at vercel.com/new
```

In Vercel → Settings → Environment Variables, add the same three `VITE_*` vars (all environments).
`vercel.json` (already in the repo) handles the SPA rewrite so deep links like
`/readiness-calculator` survive a refresh.

Then: `vercel --prod`, add the custom domain, point DNS.

---

## Post-cutover verification

- [ ] Lead submits from the deployed site and appears in your Supabase
- [ ] `/admin` login works; `/admin/leads` lists leads
- [ ] "Send email" from admin panel delivers and writes to `email_history`
- [ ] Hard-refresh on `/whitepaper` returns the page, not a 404 (SPA rewrite)
- [ ] `grep -rn "mpasszylvcaslwymmayw" .` returns nothing outside `.git`
- [ ] Old Lovable project unpublished / subscription downgraded

---

## Security issues found during migration — fix these

**1. `email_history` insert policy is wide open.** Migration 3 has:

```sql
CREATE POLICY "Service role can insert email history"
ON public.email_history FOR INSERT WITH CHECK (true);
```

No `TO` clause means this applies to `public` — **anon users can insert arbitrary rows.**
The service role bypasses RLS entirely and never needed this policy. Fix:

```sql
DROP POLICY "Service role can insert email history" ON public.email_history;
```

**2. `calculator_leads` accepts unlimited anonymous inserts.** Correct for a lead form, but
add rate limiting (Cloudflare Turnstile on the calculator, or a per-IP check in an edge function)
before launch or you will get spammed.

**3. The old anon key was committed to git history.** Anon keys are public by design (RLS is the
real boundary), so this isn't an emergency — but the *old* project's key is permanently in the
repo history. Since you're moving to a new project anyway, the exposure dies with the cutover.
Just never commit the service-role key.
