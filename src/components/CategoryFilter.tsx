"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/products-data";

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Link
        href="/store"
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          !activeCategory
            ? "bg-[color:var(--color-teal)] text-[color:var(--color-ivory)]"
            : "border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-teal)]"
        }`}
      >
        All Products
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/store/${cat.slug}`}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat.slug
              ? "bg-[color:var(--color-teal)] text-[color:var(--color-ivory)]"
              : "border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-teal)]"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
