import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { PostForm } from "@/components/admin/PostForm";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>Edit post</h2>
      <div style={{ marginTop: 28 }}>
        <PostForm post={data as Post} />
      </div>
    </div>
  );
}
