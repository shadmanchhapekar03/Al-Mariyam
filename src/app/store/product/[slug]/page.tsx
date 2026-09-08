import { products } from "@/lib/products-data";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const categoryDisplay = product.category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      {/* Breadcrumb */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <div className="flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)]">
          <Link href="/store" className="hover:text-[color:var(--color-teal)]">
            Store
          </Link>
          <span>/</span>
          <Link
            href={`/store/${product.category}`}
            className="hover:text-[color:var(--color-teal)]"
          >
            {categoryDisplay}
          </Link>
          <span>/</span>
          <span className="text-[color:var(--color-ink)]">{product.name}</span>
        </div>
      </section>

      {/* Product Details */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-[color:var(--color-ivory-dim)] aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold mb-3">
              {categoryDisplay}
            </p>

            <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-4">
              {product.name}
            </h1>

            {/* Prescription Badge */}
            {product.isPrescriptionRequired && (
              <div className="mb-6 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                <span className="text-orange-700 font-medium text-sm">
                  ⚕ Prescription Required
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl text-[color:var(--color-teal-deep)]">
                  ₹{product.price.toFixed(0)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-[color:var(--color-ink-soft)]/50 line-through">
                      ₹{product.originalPrice.toFixed(0)}
                    </span>
                    <span className="bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)] px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-8 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check size={20} className="text-green-600" />
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8 border-b border-[color:var(--color-line)] pb-8">
              <p className="text-[color:var(--color-ink-soft)] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-gold)] font-semibold mb-1">
                  Manufacturer
                </p>
                <p className="text-sm text-[color:var(--color-ink)]">
                  {product.manufacturer || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-gold)] font-semibold mb-1">
                  Category
                </p>
                <p className="text-sm text-[color:var(--color-ink)]">
                  {categoryDisplay}
                </p>
              </div>
            </div>

            {/* Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-8">
                <AddToCartButton
                  productId={products.indexOf(product)}
                  productName={product.name}
                  price={product.price}
                />
              </div>
            )}

            {/* Why Buy From Us */}
            <div className="bg-[color:var(--color-ivory-dim)] rounded-xl p-6">
              <h3 className="font-medium text-sm mb-4">Why Buy From Us?</h3>
              <ul className="space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-gold)]">✓</span>
                  Authentic & genuine medicines
                </li>
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-gold)]">✓</span>
                  Fast & reliable delivery
                </li>
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-gold)]">✓</span>
                  Licensed pharmacist support
                </li>
                <li className="flex gap-2">
                  <span className="text-[color:var(--color-gold)]">✓</span>
                  Secure & confidential
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
