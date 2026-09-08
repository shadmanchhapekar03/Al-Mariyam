import { products, CATEGORIES } from "@/lib/products-data";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function StorePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-32 -right-40 w-[560px] h-[560px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-gold-soft)" }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
              <span className="w-8 h-px bg-[color:var(--color-gold)]" />
              Online Pharmacy
            </span>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mt-6 text-[color:var(--color-teal-deep)]">
              Quality medicines
              <br />
              <span className="italic">delivered to your door.</span>
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] max-w-lg leading-relaxed">
              Browse our comprehensive selection of medicines, juices, medical devices, and wellness products. Fast delivery, prescription support, and competitive prices.
            </p>
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8">
          <h2 className="font-display text-3xl text-[color:var(--color-teal-deep)] mb-6">
            Browse by Category
          </h2>
          <CategoryFilter />
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[color:var(--color-ink-soft)]">
              No products found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Trust & Features */}
      <section className="bg-[color:var(--color-teal-deep)] text-[color:var(--color-ivory)]">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-3 gap-12">
          <div className="flex gap-4">
            <div className="text-[color:var(--color-gold-soft)] text-3xl shrink-0">✓</div>
            <div>
              <h3 className="font-medium text-lg mb-2">Genuine Products</h3>
              <p className="text-sm text-[color:var(--color-ivory-dim)]/80">
                All medicines sourced directly from verified manufacturers.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-[color:var(--color-gold-soft)] text-3xl shrink-0">✓</div>
            <div>
              <h3 className="font-medium text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-[color:var(--color-ivory-dim)]/80">
                Same-day and next-day delivery available across the city.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-[color:var(--color-gold-soft)] text-3xl shrink-0">✓</div>
            <div>
              <h3 className="font-medium text-lg mb-2">Prescription Support</h3>
              <p className="text-sm text-[color:var(--color-ivory-dim)]/80">
                Upload prescriptions for controlled medicines securely.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
