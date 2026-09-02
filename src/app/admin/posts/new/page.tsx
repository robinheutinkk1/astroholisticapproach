import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>New post</h2>
      <div style={{ marginTop: 28 }}>
        <PostForm />
      </div>
    </div>
  );
}
