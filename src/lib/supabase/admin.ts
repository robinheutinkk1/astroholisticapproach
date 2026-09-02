import "server-only";

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Service-role client. Bypasses RLS entirely, so it must never be reachable
 * from the browser — only from route handlers and server actions that have
 * already decided the caller is allowed to do the thing.
 */
export function createSupabaseAdminClient() {
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
