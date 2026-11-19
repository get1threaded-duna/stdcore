# StandardCore

Marketing site and lead capture for StandardCore: regulatory submission readiness for
life-sciences teams (FDA ESG, eCTD, 21 CFR Part 11, ICH M8). It includes a Readiness
Calculator that records leads, and a small admin area for reviewing and emailing them.

Live preview (pre-launch, not indexed): https://stdcore-landing.standardcore.workers.dev

## Stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, shadcn/ui, React Router (single-page app)
- **Backend:** Supabase (Postgres with row-level security, Auth, and an Edge Function)
- **Hosting:** Cloudflare Workers static assets, deployed with Wrangler
- **Email:** Resend, called from the `send-lead-email` Edge Function

## Local development

Requires Node.js and npm.

```sh
npm install
cp .env.example .env   # then fill in the Supabase values below
npm run dev            # http://localhost:8080
```

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ref |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon (public) key; row-level security is the real access boundary |
| `VITE_UTILITY_APP_URL` | Optional. URL for the platform app call-to-action (default set in `src/config/site.ts`) |

`VITE_*` values are compiled into the bundle at build time, so changing them requires a rebuild
and redeploy. Never put the Supabase service-role key in `.env`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Deploying

```sh
npm run build
npx wrangler deploy
```

`wrangler.jsonc` pins the Cloudflare account and serves `dist/` with single-page-app fallback,
so deep links such as `/readiness-calculator` survive a refresh.

## Supabase

Schema, policies and the Edge Function live in `supabase/`. Auth settings (site URL, redirect
URLs, sign-up disabled) are tracked in `supabase/config.toml`.

```sh
supabase link --project-ref <project-ref>
supabase db push                          # apply migrations in supabase/migrations
supabase config push                      # apply config.toml; run it in a real terminal and review the diff
supabase functions deploy send-lead-email
```

The Edge Function needs `RESEND_API_KEY` set as a Supabase secret, and a sending domain
verified in Resend.

### Admin access

Public sign-up is disabled. To add an admin, create the user in the Supabase dashboard
(Authentication → Users), then run:

```sql
insert into public.user_roles (user_id, role) values ('<user-uuid>', 'admin');
```

## Project layout

```
src/
  pages/                 Route components (marketing pages, calculator, admin)
  components/            Shared components; shadcn/ui primitives in components/ui
  config/site.ts         Domain, URLs and contact addresses (single source of truth)
  integrations/supabase  Supabase client and generated types
supabase/
  migrations/            Database schema and row-level security policies
  functions/             send-lead-email Edge Function
public/                  Static files, robots.txt, sitemap.xml, Cloudflare _headers/_redirects
```

## Before launch

- Set the real domain in `src/config/site.ts` and `supabase/config.toml` (`standardcore.com` is a placeholder that isn't owned yet)
- Add spam protection, such as Cloudflare Turnstile, to the Readiness Calculator
- Re-enable indexing: replace `public/robots.txt` as its comments describe, and remove the `X-Robots-Tag` line from `public/_headers`
