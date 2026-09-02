import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-mist-100">New product</h1>
      <div className="mt-8">
        <ProductForm />
      </div>
    </div>
  );
}
