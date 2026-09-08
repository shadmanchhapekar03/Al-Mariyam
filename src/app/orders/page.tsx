"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, User, Phone, Mail, Calendar } from "lucide-react";

interface Order {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
      confirmed: { bg: "bg-blue-100", text: "text-blue-700", label: "Confirmed" },
      shipped: { bg: "bg-purple-100", text: "text-purple-700", label: "Shipped" },
      delivered: { bg: "bg-green-100", text: "text-green-700", label: "Delivered" },
      cancelled: { bg: "bg-red-100", text: "text-red-700", label: "Cancelled" },
    };
    const style = statusStyles[status] || statusStyles.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-12">
        My Orders
      </h1>

      {!hasSearched ? (
        <div className="bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-8">
          <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
            Find Your Orders
          </h2>
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[color:var(--color-ink)] mb-2">
                Enter your email address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-[color:var(--color-line)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
                  placeholder="your@email.com"
                  required
                />
                <button
                  type="submit"
                  className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] px-6 py-2.5 rounded-lg font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <>
          {isLoading ? (
            <p className="text-center text-[color:var(--color-ink-soft)]">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-[color:var(--color-ivory-dim)]/40 rounded-2xl">
              <Package size={48} className="mx-auto mb-4 text-[color:var(--color-ink-soft)]/30" />
              <p className="text-[color:var(--color-ink-soft)] mb-6">
                No orders found for this email address.
              </p>
              <button
                onClick={() => {
                  setHasSearched(false);
                  setEmail("");
                  setOrders([]);
                }}
                className="inline-flex items-center gap-2 text-[color:var(--color-teal)] font-medium hover:text-[color:var(--color-teal-deep)]"
              >
                <ArrowLeft size={16} />
                Try another email
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link key={order.orderNumber} href={`/orders/${order.orderNumber}`}>
                  <div className="group bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-xl p-6 hover:shadow-lg hover:border-[color:var(--color-gold-soft)] transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-display text-lg text-[color:var(--color-teal-deep)]">
                            Order #{order.orderNumber}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-1">
                              Date
                            </p>
                            <p className="text-[color:var(--color-ink)]">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-1">
                              Amount
                            </p>
                            <p className="font-display text-lg text-[color:var(--color-teal-deep)]">
                              ₹{parseFloat(order.totalAmount).toFixed(0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-1">
                              Payment
                            </p>
                            <p className="text-[color:var(--color-ink)]">
                              {order.paymentMethod === "cod"
                                ? "Cash on Delivery"
                                : "Online"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-1">
                              Recipient
                            </p>
                            <p className="text-[color:var(--color-ink)]">
                              {order.customerName}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-[color:var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {hasSearched && orders.length > 0 && (
            <button
              onClick={() => {
                setHasSearched(false);
                setEmail("");
                setOrders([]);
              }}
              className="mt-8 flex items-center gap-2 text-[color:var(--color-teal)] font-medium hover:text-[color:var(--color-teal-deep)]"
            >
              <ArrowLeft size={16} />
              Search another email
            </button>
          )}
        </>
      )}
    </div>
  );
}
