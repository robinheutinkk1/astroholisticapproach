"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

export type ActionState = { error?: string };

/** Every action starts here. No admin, no write. */
async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");
  return admin;
}

function optionalText(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value.trim() : "";
  return text.length > 0 ? text : null;
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

const postSchema = z.object({
  title: z.string().trim().min(2, "A title is required.").max(200),
  slug: z.string().trim().max(80).optional(),
  excerpt: z.string().trim().max(500).nullable(),
  content: z.string().max(200_000),
  cover_image: z.url("Cover image must be a valid URL.").nullable(),
  category: z.string().trim().max(60).nullable(),
  read_minutes: z.number().int().min(1).max(240).nullable(),
  tags: z.array(z.string()),
  published: z.boolean(),
});

function readPostForm(formData: FormData) {
  const readMinutes = optionalText(formData.get("read_minutes"));

  return postSchema.safeParse({
    title: formData.get("title"),
    slug: optionalText(formData.get("slug")) ?? undefined,
    excerpt: optionalText(formData.get("excerpt")),
    content: String(formData.get("content") ?? ""),
    cover_image: optionalText(formData.get("cover_image")),
    category: optionalText(formData.get("category")),
    read_minutes: readMinutes === null ? null : Number(readMinutes),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    published: formData.get("published") === "on",
  });
}

export async function savePost(
  postId: string | null,
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = readPostForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const { slug, published, ...rest } = parsed.data;
  const supabase = createSupabaseAdminClient();

  const values = {
    ...rest,
    slug: slugify(slug || rest.title),
    published,
    // Stamped the first time a post goes live, then left alone so the
    // published date does not jump on every later edit.
    ...(published ? { published_at: await resolvePublishedAt(postId) } : {}),
  };

  const query = postId
    ? supabase.from("posts").update(values).eq("id", postId)
    : supabase.from("posts").insert(values);

  const { error } = await query;
  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${values.slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

async function resolvePublishedAt(postId: string | null): Promise<string> {
  if (!postId) return new Date().toISOString();

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", postId)
    .maybeSingle();

  return data?.published_at ?? new Date().toISOString();
}

export async function deletePost(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("posts").delete().eq("id", id);

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const productSchema = z.object({
  name: z.string().trim().min(2, "A name is required.").max(200),
  slug: z.string().trim().max(80).optional(),
  summary: z.string().trim().max(500).nullable(),
  description: z.string().max(200_000),
  price_cents: z.number().int().min(0, "Price cannot be negative."),
  price_on_request: z.boolean(),
  currency: z.string().trim().length(3).toLowerCase(),
  image_url: z.url("Image must be a valid URL.").nullable(),
  icon: z.enum(["chart", "star", "book", "circle", "heart", "beads", "gem", "triple", "leaf"]),
  category: z.enum(["reports", "jewelry", "crystals"]),
  badge: z.string().trim().max(40).nullable(),
  kind: z.enum(["service", "digital", "physical"]),
  stock: z.number().int().min(0).nullable(),
  active: z.boolean(),
  sort_order: z.number().int(),
});

export async function saveProduct(
  productId: string | null,
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const rawPrice = String(formData.get("price") ?? "0").replace(",", ".");
  const rawStock = optionalText(formData.get("stock"));

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: optionalText(formData.get("slug")) ?? undefined,
    summary: optionalText(formData.get("summary")),
    description: String(formData.get("description") ?? ""),
    // Prices are typed in whole currency units and stored as integer cents.
    price_cents: Math.round(Number(rawPrice) * 100),
    price_on_request: formData.get("price_on_request") === "on",
    currency: formData.get("currency") ?? "eur",
    image_url: optionalText(formData.get("image_url")),
    icon: formData.get("icon") ?? "star",
    category: formData.get("category") ?? "reports",
    badge: optionalText(formData.get("badge")),
    kind: formData.get("kind") ?? "service",
    stock: rawStock === null ? null : Number(rawStock),
    active: formData.get("active") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const { slug, ...rest } = parsed.data;
  const values = { ...rest, slug: slugify(slug || rest.name) };

  const supabase = createSupabaseAdminClient();
  const query = productId
    ? supabase.from("products").update(values).eq("id", productId)
    : supabase.from("products").insert(values);

  const { error } = await query;
  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/shop");
  revalidatePath(`/shop/${values.slug}`);
  revalidatePath("/healing/jewelry");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("products").delete().eq("id", id);

  revalidatePath("/shop");
  revalidatePath("/healing/jewelry");
  revalidatePath("/admin/products");
}

// ---------------------------------------------------------------------------
// Orders and messages
// ---------------------------------------------------------------------------

export async function setOrderStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["pending", "paid", "fulfilled", "cancelled"].includes(status)) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("orders").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
}

export async function toggleMessageHandled(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const handled = formData.get("handled") === "true";
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("contact_messages").update({ handled: !handled }).eq("id", id);

  revalidatePath("/admin/messages");
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// ---------------------------------------------------------------------------
// Image uploads
// ---------------------------------------------------------------------------

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export type UploadResult = { url: string } | { error: string };

/**
 * Takes a picked file and returns the public URL to store on the record, so
 * nobody has to open the Supabase dashboard to add an image. Runs with the
 * service role, which is why it checks for an admin first.
 */
export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const admin = await getAdminUser();
  if (!admin) return { error: "You are not signed in." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file was selected." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Please choose a JPG, PNG, WEBP, AVIF or GIF image." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { error: "That image is larger than 8 MB. Please use a smaller one." };
  }

  const folder = String(formData.get("folder") ?? "uploads").replace(/[^a-z0-9-]/gi, "") || "uploads";
  const path = `${folder}/${crypto.randomUUID()}.${EXTENSIONS[file.type]}`;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    console.error("[upload] failed", error.message);
    return { error: "Uploading failed. Please try again." };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
