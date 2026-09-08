import { products } from "@/lib/products-data";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryProducts = products.filter((p) => p.category === category);

  if (categoryProducts.length === 0) {
    notFound();
  }

  const categoryName = categoryProducts[0].category;
  const categoryDisplay = categoryName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[color:var(--color-ivory-dim)]/40">
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
          <div className="mb-4">
            <a
              href="/store"
              className="text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-teal)] underline"
            >
              ← Back to Store
            </a>
          </div>
          <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)]">
            {categoryDisplay}
          </h1>
          <p className="text-[color:var(--color-ink-soft)] mt-2">
            {categoryProducts.length} products available
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <CategoryFilter activeCategory={category} />

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
