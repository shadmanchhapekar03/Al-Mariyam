"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  price: number;
  onSuccess?: () => void;
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  onSuccess,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const sessionId = localStorage.getItem("cartSessionId") ||
      `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (!localStorage.getItem("cartSessionId")) {
      localStorage.setItem("cartSessionId", sessionId);
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          productId,
          quantity,
        }),
      });

      if (response.ok) {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
        onSuccess?.();

        // Dispatch custom event for cart update
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: { sessionId } })
        );
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border border-[color:var(--color-line)] rounded-lg p-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-2 py-1 text-sm text-[color:var(--color-ink-soft)]"
        >
          −
        </button>
        <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-2 py-1 text-sm text-[color:var(--color-ink-soft)]"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isLoading || isAdded}
        className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all ${
          isAdded
            ? "bg-green-100 text-green-700 border border-green-300"
            : isLoading
            ? "bg-[color:var(--color-teal)]/70 text-[color:var(--color-ivory)]"
            : "bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] hover:bg-[color:var(--color-teal-deep)]"
        }`}
      >
        <ShoppingCart size={18} />
        {isAdded ? "Added to Cart" : isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
