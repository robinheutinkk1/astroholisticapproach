import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem" }}>New product</h2>
      <div style={{ marginTop: 28 }}>
        <ProductForm />
      </div>
    </div>
  );
}
