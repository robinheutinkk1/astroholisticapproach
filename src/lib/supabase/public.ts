import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Anonymous, session-less client for public content. It reads no cookies, so
 * pages built on it can still be statically rendered and revalidated instead
 * of being forced dynamic. RLS restricts it to published posts and active
 * products.
 */
export function createSupabasePublicClient() {
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
