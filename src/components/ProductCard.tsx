import Link from "next/link";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Link href={`/store/product/${product.slug}`}>
      <div className="group rounded-2xl border border-[color:var(--color-line)] p-6 bg-[color:var(--color-ivory)] hover:border-[color:var(--color-gold-soft)] hover:shadow-lg hover:shadow-black/5 transition-all cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative mb-5 h-48 rounded-lg overflow-hidden bg-[color:var(--color-ivory-dim)]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)] px-3 py-1 rounded-full text-xs font-bold">
              {discount}% off
            </div>
          )}
          {product.isPrescriptionRequired && (
            <div className="absolute bottom-3 left-3 bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
              Rx Required
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-lg text-[color:var(--color-teal-deep)] mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-[color:var(--color-ink-soft)] mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Stock */}
        <div className="border-t border-[color:var(--color-line)] pt-4 mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display text-2xl text-[color:var(--color-teal-deep)]">
              ₹{product.price.toFixed(0)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[color:var(--color-ink-soft)]/50 line-through">
                ₹{product.originalPrice.toFixed(0)}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[color:var(--color-ink-soft)]">
              Stock: {product.stock > 10 ? "✓ Available" : `Only ${product.stock}`}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
              View <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
