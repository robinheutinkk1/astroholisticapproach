import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminUser = { id: string; email: string; fullName: string | null };

/**
 * Returns the signed-in admin, or null. Every /admin page and action calls
 * this rather than trusting the middleware alone — the middleware only checks
 * that a session exists, not that it belongs to an admin.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, email")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") return null;

  return {
    id: user.id,
    email: profile.email ?? user.email ?? "",
    fullName: profile.full_name ?? null,
  };
}
