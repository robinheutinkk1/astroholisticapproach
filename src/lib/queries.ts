import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Post, Product } from "@/lib/types";

/**
 * Content queries never throw. A database that is unreachable at build time
 * (or briefly at request time) renders an empty section rather than a 500 —
 * the page shells and the shop still work.
 */
type QueryResult = { data: unknown; error: { message: string } | null };

// PromiseLike, because a PostgREST builder is thenable but not a real Promise.
async function safe<T>(label: string, run: () => PromiseLike<QueryResult>): Promise<T | null> {
  try {
    const { data, error } = await run();
    if (error) {
      console.error(`[queries] ${label}`, error.message);
      return null;
    }
    return (data ?? null) as T | null;
  } catch (cause) {
    console.error(`[queries] ${label} threw`, cause);
    return null;
  }
}

export async function getPublishedPosts(limit?: number): Promise<Post[]> {
  const supabase = createSupabasePublicClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (limit) query = query.limit(limit);

  return (await safe<Post[]>("getPublishedPosts", () => query)) ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createSupabasePublicClient();
  return safe<Post>("getPostBySlug", () =>
    supabase.from("posts").select("*").eq("slug", slug).eq("published", true).maybeSingle(),
  );
}

export async function getActiveProducts(
  options: { limit?: number; category?: string } = {},
): Promise<Product[]> {
  const supabase = createSupabasePublicClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (options.category) query = query.eq("category", options.category);
  if (options.limit) query = query.limit(options.limit);

  return (await safe<Product[]>("getActiveProducts", () => query)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createSupabasePublicClient();
  return safe<Product>("getProductBySlug", () =>
    supabase.from("products").select("*").eq("slug", slug).eq("active", true).maybeSingle(),
  );
}
