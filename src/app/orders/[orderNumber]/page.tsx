"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, User, Phone, Mail, Calendar, Package } from "lucide-react";

interface OrderDetail {
  order: {
    orderNumber: string;
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    totalAmount: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
  };
  items: any[];
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    (async () => {
      const { orderNumber: num } = await params;
      setOrderNumber(num);

      try {
        const response = await fetch(`/api/orders/${num}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-[color:var(--color-teal-deep)] mb-6">
          Order Not Found
        </h1>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] px-6 py-3 rounded-full font-medium hover:bg-[color:var(--color-teal-deep)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "text-yellow-600",
      confirmed: "text-blue-600",
      shipped: "text-purple-600",
      delivered: "text-green-600",
      cancelled: "text-red-600",
    };
    return colors[status] || "text-yellow-600";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Order Pending",
      confirmed: "Order Confirmed",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };
    return labels[status] || "Unknown";
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-[color:var(--color-teal)] font-medium hover:text-[color:var(--color-teal-deep)] mb-8"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Order Header */}
          <div className="bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="font-display text-3xl text-[color:var(--color-teal-deep)]">
                  Order #{order.order.orderNumber}
                </h1>
                <p className="text-sm text-[color:var(--color-ink-soft)] mt-1">
                  Placed on {new Date(order.order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`text-right ${getStatusColor(order.order.status)}`}>
                <p className="text-sm uppercase tracking-wide font-bold">
                  {getStatusLabel(order.order.status)}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4">
              {["pending", "confirmed", "shipped", "delivered"].map(
                (status, idx) => (
                  <div key={status} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        ["pending", "confirmed", "shipped", "delivered"].indexOf(
                          order.order.status
                        ) >= idx
                          ? "bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)]"
                          : "bg-[color:var(--color-ivory-dim)] text-[color:var(--color-ink-soft)]"
                      }`}
                    >
                      ✓
                    </div>
                    <span
                      className={`text-sm font-medium capitalize ${
                        ["pending", "confirmed", "shipped", "delivered"].indexOf(
                          order.order.status
                        ) >= idx
                          ? "text-[color:var(--color-ink)]"
                          : "text-[color:var(--color-ink-soft)]"
                      }`}
                    >
                      {status === "pending" && "Order Placed"}
                      {status === "confirmed" && "Confirmed"}
                      {status === "shipped" && "Shipped"}
                      {status === "delivered" && "Delivered"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6 mb-8">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-6">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center pb-4 border-b border-[color:var(--color-line)] last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-[color:var(--color-ink)]">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-[color:var(--color-ink-soft)]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{parseFloat(item.price).toFixed(0)}</p>
                    <p className="text-sm text-[color:var(--color-ink-soft)]">
                      Subtotal: ₹{(parseFloat(item.price) * item.quantity).toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Delivery Address
            </h2>
            <p className="text-[color:var(--color-ink-soft)] whitespace-pre-wrap">
              {order.order.shippingAddress}
            </p>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-[color:var(--color-ivory)] border border-[color:var(--color-line)] rounded-2xl p-6">
            <h2 className="font-display text-lg text-[color:var(--color-teal-deep)] mb-6">
              Order Summary
            </h2>

            {/* Customer Info */}
            <div className="space-y-4 mb-6 pb-6 border-b border-[color:var(--color-line)]">
              <div className="flex gap-3">
                <User size={16} className="text-[color:var(--color-gold)] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-0.5">
                    Name
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    {order.order.customerName}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-[color:var(--color-gold)] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-0.5">
                    Email
                  </p>
                  <p className="text-[color:var(--color-ink)] break-all">
                    {order.order.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-[color:var(--color-gold)] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-[color:var(--color-ink-soft)] text-xs uppercase tracking-wide mb-0.5">
                    Phone
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    {order.order.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 mb-6 pb-6 border-b border-[color:var(--color-line)]">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>
                  ₹
                  {(
                    parseFloat(order.order.totalAmount) /
                    1.05
                  ).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (5%)</span>
                <span>
                  ₹
                  {(
                    (parseFloat(order.order.totalAmount) / 1.05) *
                    0.05
                  ).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-display">Total</span>
              <span className="font-display text-2xl text-[color:var(--color-teal-deep)]">
                ₹{parseFloat(order.order.totalAmount).toFixed(0)}
              </span>
            </div>

            <div className="text-sm text-center text-[color:var(--color-ink-soft)]">
              <p className="mb-2">Payment Method</p>
              <p className="font-medium text-[color:var(--color-ink)]">
                {order.order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
