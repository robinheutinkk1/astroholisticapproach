import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActiveProducts, getProductBySlug } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatPrice } from "@/lib/format";
import { Section } from "@/components/ui";
import { AddToCartButton } from "@/components/AddToCartButton";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getActiveProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.summary ?? undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const soldOut = product.stock !== null && product.stock <= 0;

  return (
    <Section className="py-20">
      <div className="mx-auto max-w-2xl">
        <Link href="/shop" className="text-sm text-mist-500 hover:text-gold-300">
          ← Readings
        </Link>

        <p className="mt-8 text-xs tracking-[0.15em] text-gold-400 uppercase">{product.kind}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-mist-100 sm:text-5xl">
          {product.name}
        </h1>
        {product.summary && (
          <p className="mt-5 text-lg leading-relaxed text-mist-300">{product.summary}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-white/10 py-6">
          <p className="font-display text-3xl text-gold-300">
            {formatPrice(product.price_cents, product.currency)}
          </p>
          <AddToCartButton product={product} disabled={soldOut} />
          {product.stock !== null && !soldOut && (
            <p className="text-sm text-mist-500">{product.stock} available</p>
          )}
          {soldOut && <p className="text-sm text-mist-500">Currently unavailable.</p>}
        </div>

        <div
          className="prose-astro mt-10"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(product.description) }}
        />
      </div>
    </Section>
  );
}
