"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    paymentMethod: "cod",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim())
      newErrors.customerName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.shippingAddress.trim())
      newErrors.shippingAddress = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const totalAmount = cartItems.reduce((sum) => sum + 100, 0) * 1.05;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: formData.shippingAddress,
          totalAmount,
          paymentMethod: formData.paymentMethod,
          items: cartItems.map((item, idx) => ({
            productId: item.productId,
            productName: `Product ${item.productId}`,
            price: 100,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderNumber(data.orderNumber);
        setOrderPlaced(true);

        // Clear cart
        localStorage.removeItem("cartSessionId");
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      setErrors({ submit: "Failed to place order. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="font-display text-3xl text-[color:var(--color-teal-deep)] mb-6">
          Checkout
        </h1>
        <div className="text-center py-16 bg-[color:var(--color-ivory-dim)]/40 rounded-2xl">
          <p className="text-[color:var(--color-ink-soft)] mb-6">
            Your cart is empty
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] px-6 py-3 rounded-full font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-[color:var(--color-ink-soft)] mb-2">
            Thank you for your order.
          </p>
          <p className="text-[color:var(--color-ink-soft)] mb-8">
            Order Number: <span className="font-bold text-[color:var(--color-teal-deep)]">{orderNumber}</span>
          </p>

          <div className="bg-[color:var(--color-ivory-dim)] rounded-xl p-8 mb-8">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-4">
              What's Next?
            </h2>
            <ul className="text-left space-y-3 text-[color:var(--color-ink-soft)]">
              <li className="flex gap-3">
                <span className="text-[color:var(--color-gold)]">✓</span>
                <span>We'll confirm your order shortly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--color-gold)]">✓</span>
                <span>You'll receive an SMS with tracking details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--color-gold)]">✓</span>
                <span>Expected delivery: Within 24 hours</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--color-gold)]">✓</span>
                <span>A confirmation email has been sent</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/orders/${orderNumber}`}
              className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] px-6 py-3 rounded-full font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors"
            >
              View Order
            </Link>
            <Link
              href="/store"
              className="border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)] px-6 py-3 rounded-full font-medium hover:border-[color:var(--color-teal)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum) => sum + 100, 0) * 1.05;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-12">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmitOrder} className="md:col-span-2">
          {/* Customer Information */}
          <div className="mb-8 bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
              Delivery Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[color:var(--color-ink)] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-[color:var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
                  placeholder="Your full name"
                />
                {errors.customerName && (
                  <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[color:var(--color-ink)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-[color:var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[color:var(--color-ink)] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-[color:var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[color:var(--color-ink)] mb-2">
                  Delivery Address *
                </label>
                <textarea
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[color:var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
                  placeholder="Enter your complete address"
                />
                {errors.shippingAddress && (
                  <p className="text-red-600 text-sm mt-1">{errors.shippingAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8 bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-[color:var(--color-line)] rounded-lg cursor-pointer hover:bg-[color:var(--color-ivory-dim)] transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-sm">Cash on Delivery</p>
                  <p className="text-xs text-[color:var(--color-ink-soft)]">
                    Pay when you receive your order
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[color:var(--color-line)] rounded-lg cursor-pointer hover:bg-[color:var(--color-ivory-dim)] transition-colors opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  disabled
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-sm">Online Payment (Coming Soon)</p>
                  <p className="text-xs text-[color:var(--color-ink-soft)]">
                    Credit/Debit card or UPI
                  </p>
                </div>
              </label>
            </div>
          </div>

          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 text-red-700">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] py-3 rounded-lg font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-[color:var(--color-line)]">
              <div className="flex justify-between text-sm">
                <span>{cartItems.length} items</span>
                <span className="font-medium">
                  ₹{cartItems.reduce((sum) => sum + 100, 0).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-[color:var(--color-gold)]">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span className="font-medium">
                  ₹{(cartItems.reduce((sum) => sum + 100, 0) * 0.05).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-display">Total</span>
              <span className="font-display text-2xl text-[color:var(--color-teal-deep)]">
                ₹{totalAmount.toFixed(0)}
              </span>
            </div>

            <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-700">
              ✓ Free delivery on all orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
