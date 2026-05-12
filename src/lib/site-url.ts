/**
 * URL canónica do site (OG, sitemap, JSON-LD).
 * Em produção define `NEXT_PUBLIC_SITE_URL` (ex. https://seudominio.com).
 * Na Vercel, sem env, usa `VERCEL_URL` com https.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return "http://localhost:3000";
}
