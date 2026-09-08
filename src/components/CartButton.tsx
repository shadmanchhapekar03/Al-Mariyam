"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = async () => {
      const sessionId = localStorage.getItem("cartSessionId");
      if (!sessionId) {
        setItemCount(0);
        return;
      }

      try {
        const response = await fetch(`/api/cart?sessionId=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setItemCount(
            data.items.reduce(
              (total: number, item: any) => total + item.quantity,
              0
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-teal)]"
    >
      <ShoppingCart size={18} strokeWidth={1.75} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)] text-xs font-bold px-2 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
