"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Physicians" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[color:var(--color-ivory)]/90 backdrop-blur-md">
      <div className="hairline absolute bottom-0 left-0 right-0" />
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-display italic text-2xl tracking-tight text-[color:var(--color-teal-deep)]">
            Al Mariyam
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-gold)] font-medium mt-1">
            Medical Center
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline-grow text-sm text-[color:var(--color-ink-soft)] font-medium tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+97142345678"
            className="flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)]"
          >
            <Phone size={15} strokeWidth={1.75} />
            +971 4 234 5678
          </a>
          <Link
            href="/contact"
            className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[color:var(--color-teal-deep)] transition-colors"
          >
            Book Appointment
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
        <div className="md:hidden bg-[color:var(--color-ivory)] border-t border-[color:var(--color-line)] px-6 py-6 flex flex-col gap-5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base text-[color:var(--color-ink-soft)] font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] text-sm font-medium px-5 py-3 rounded-full text-center"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
