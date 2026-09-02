import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Btn, PageHeader, Section } from "@/components/Layout";
import { getActiveProducts, getProductBySlug } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatPrice } from "@/lib/format";
import { ProductIcon } from "@/components/ProductIcon";
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

  return { title: product.name, description: product.summary ?? undefined };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const soldOut = product.stock !== null && product.stock <= 0;
  const purchasable = !product.price_on_request && !soldOut;

  return (
    <>
      <PageHeader
        trail={[{ label: "Shop", href: "/shop" }, { label: product.name }]}
        eyebrow={product.badge ?? "Shop"}
        title={product.name}
        intro={product.summary ?? undefined}
      />
      <Section>
        <div className="split">
          <div className="split-img reveal" style={{ display: "grid", placeItems: "center", padding: 40 }}>
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image_url} alt="" />
            ) : (
              <div style={{ width: "min(320px, 70%)" }}>
                <ProductIcon name={product.icon} />
              </div>
            )}
          </div>

          <div className="reveal">
            <p className="price-head" style={{ marginBottom: 10 }}>
              {product.price_on_request ? "Price" : "Tariff"}
            </p>
            <h2 className="accent" style={{ fontStyle: "normal" }}>
              {product.price_on_request ? "On request" : formatPrice(product.price_cents, product.currency)}
            </h2>

            <div className="article-body" style={{ margin: "24px 0 0" }}>
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(product.description) }} />
            </div>

            {product.stock !== null && !soldOut && <p className="side-note">{product.stock} available</p>}
            {soldOut && <p className="side-note">Currently unavailable.</p>}

            <div className="course-cta" style={{ marginTop: 26 }}>
              {purchasable ? (
                <>
                  <AddToCartButton product={product} className="btn btn-primary" />
                  <Btn href="/cart" variant="secondary">
                    Go to cart
                  </Btn>
                </>
              ) : (
                <Btn href="/contact?i=shop" arrow>
                  Inquire about this piece
                </Btn>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
