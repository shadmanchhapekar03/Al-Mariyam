"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ShoppingCart, MapPin } from "lucide-react";
import CartButton from "./CartButton";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[color:var(--color-line)] shadow-sm">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[color:var(--color-teal)] to-[color:var(--color-gold)] flex items-center justify-center">
            <span className="text-white font-bold text-lg">Rx</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-[color:var(--color-teal-deep)]">
              Al Mariyam
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[color:var(--color-gold)] font-bold">
              Pharmacy
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-teal)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <CartButton />
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-teal)] hover:text-[color:var(--color-gold)] transition-colors"
          >
            <Phone size={16} strokeWidth={2} />
            +91 98765 43210
          </a>
          <Link
            href="/store"
            className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-all"
          >
            Order Now
          </Link>
        </div>

        <button
          className="md:hidden text-[color:var(--color-ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[color:var(--color-line)] px-6 py-6 flex flex-col gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base text-[color:var(--color-ink-soft)] font-semibold hover:text-[color:var(--color-teal)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-[color:var(--color-line)] pt-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] mb-4">
              <MapPin size={16} />
              <span className="font-semibold">Mumbra, Thane</span>
            </div>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm text-[color:var(--color-teal)] font-semibold mb-4"
            >
              <Phone size={16} />
              +91 98765 43210
            </a>
            <Link
              href="/store"
              onClick={() => setOpen(false)}
              className="w-full bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] text-white text-sm font-bold px-5 py-3 rounded-full text-center block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
