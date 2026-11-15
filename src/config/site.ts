// Single source of truth for domain, URLs, and contact addresses.
//
// IMPORTANT: standardcore.com was invented by Lovable's generator and is NOT a
// domain we own. Every email below is therefore currently non-deliverable —
// including security@, which is where vulnerability reports would go.
// Change DOMAIN once, here, and the whole site follows: JSON-LD, canonical URL,
// legal-page contacts, footer, sitemap.
export const DOMAIN = "standardcore.com";

export const SITE_URL = `https://${DOMAIN}`;

/** Addresses surfaced on legal and contact pages. Each must exist before launch. */
export const EMAILS = {
  privacy: `privacy@${DOMAIN}`,
  legal: `legal@${DOMAIN}`,
  security: `security@${DOMAIN}`,
  regulatory: `regulatory@${DOMAIN}`,
  enterprise: `enterprise@${DOMAIN}`,
  press: `press@${DOMAIN}`,
  regulatoryScience: `regulatory-science@${DOMAIN}`,
} as const;

// Social profiles asserted in Organization JSON-LD (schema.org sameAs).
// Only list accounts actually controlled by the company — claiming a handle you
// don't own is a misrepresentation to search engines. Empty array = omit sameAs.
export const SOCIAL_PROFILES: string[] = [];

// The platform app. Was a Lovable preview URL (id-preview--...lovable.app) in three
// components — that preview can disappear, so it must never ship as the primary CTA.
export const UTILITY_APP_URL =
  import.meta.env.VITE_UTILITY_APP_URL ?? "https://secure-ai-compliance.lovable.app";
