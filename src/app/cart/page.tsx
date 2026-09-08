"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, ArrowUpRight } from "lucide-react";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  stock: number;
  isPrescriptionRequired: boolean;
  manufacturer?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const sessionId = localStorage.getItem("cartSessionId");
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/cart?sessionId=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);

          // Fetch product details for each item
          const productsMap: Record<number, Product> = {};
          for (const item of data.items) {
            const productRes = await fetch(
              `/api/products?search=${item.productId}`
            );
            if (productRes.ok) {
              const productData = await productRes.json();
              // Find product by ID from products-data
              const allProducts = await fetch("/api/products").then((r) =>
                r.json()
              );
              const product = allProducts.products.find(
                (p: any) => p.name.includes("test") // placeholder
              );
              if (product) {
                productsMap[item.productId] = product;
              }
            }
          }
          setProducts(productsMap);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await fetch(`/api/cart/${cartItemId}`, { method: "DELETE" });
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    try {
      await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="font-display text-3xl text-[color:var(--color-teal-deep)] mb-6">
          Your Cart
        </h1>
        <div className="text-center py-16 bg-[color:var(--color-ivory-dim)]/40 rounded-2xl">
          <p className="text-[color:var(--color-ink-soft)] mb-6">
            Your cart is empty
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] px-6 py-3 rounded-full font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors"
          >
            Continue Shopping
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-12">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-[color:var(--color-line)] rounded-xl p-6 bg-[color:var(--color-ivory)]"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg bg-[color:var(--color-ivory-dim)] shrink-0">
                    <img
                      src={`https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?q=80&w=100`}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-[color:var(--color-teal-deep)] mb-1">
                      Product {item.productId}
                    </h3>
                    <p className="text-sm text-[color:var(--color-ink-soft)] mb-4">
                      ₹{(item.price || 100).toFixed(0)} per unit
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border border-[color:var(--color-line)] rounded text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border border-[color:var(--color-line)] rounded text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-[color:var(--color-teal-deep)]">
                      ₹{((item.price || 100) * item.quantity).toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-[color:var(--color-line)] pb-6 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">
                  ₹
                  {cartItems
                    .reduce(
                      (sum, item) => sum + (item.price || 100) * item.quantity,
                      0
                    )
                    .toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-medium text-[color:var(--color-gold)]">
                  Free
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span className="font-medium">
                  ₹
                  {(
                    cartItems.reduce(
                      (sum, item) => sum + (item.price || 100) * item.quantity,
                      0
                    ) * 0.05
                  ).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl text-[color:var(--color-teal-deep)]">
                ₹
                {(
                  cartItems.reduce(
                    (sum, item) => sum + (item.price || 100) * item.quantity,
                    0
                  ) * 1.05
                ).toFixed(0)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] py-3 rounded-lg font-medium text-center hover:bg-[color:var(--color-teal-deep)] transition-colors block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
