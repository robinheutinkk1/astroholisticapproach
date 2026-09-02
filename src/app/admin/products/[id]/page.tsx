import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { ProductForm } from "@/components/admin/ProductForm";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>Edit product</h2>
      <div style={{ marginTop: 28 }}>
        <ProductForm product={data as Product} />
      </div>
    </div>
  );
}
