// Single source of truth for external URLs and canonical domain.
// Set VITE_UTILITY_APP_URL in Cloudflare build variables to override per environment.
export const SITE_URL = "https://standardcore.com";

// The platform app. Was a Lovable preview URL (id-preview--...lovable.app) in three
// components — that preview can disappear, so it must never ship as the primary CTA.
export const UTILITY_APP_URL =
  import.meta.env.VITE_UTILITY_APP_URL ?? "https://secure-ai-compliance.lovable.app";
