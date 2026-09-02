/**
 * Central place where every environment variable is read, so a missing value
 * fails loudly at the point of use instead of surfacing as `undefined` deep in
 * a request handler.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Add it to .env.local locally and to the Vercel project settings.`,
    );
  }
  return value;
}

export const env = {
  get supabaseUrl() {
    return required("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  },
  get supabaseAnonKey() {
    return required("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  },
  get supabaseServiceRoleKey() {
    return required("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);
  },
  get stripeSecretKey() {
    return required("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
  },
  get stripeWebhookSecret() {
    return required("STRIPE_WEBHOOK_SECRET", process.env.STRIPE_WEBHOOK_SECRET);
  },
  get resendApiKey() {
    return process.env.RESEND_API_KEY;
  },
  get contactToEmail() {
    return process.env.CONTACT_TO_EMAIL;
  },
  get contactFromEmail() {
    return process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  },
  get siteUrl() {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL;
    if (explicit) return explicit.replace(/\/$/, "");
    // Vercel sets this on preview deployments where no custom domain exists.
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  },
};
