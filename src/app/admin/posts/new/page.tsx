import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
