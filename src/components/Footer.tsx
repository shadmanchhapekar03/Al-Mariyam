import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-br from-[color:var(--color-teal-deep)] to-[color:var(--color-teal)] text-white mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[color:var(--color-gold)] flex items-center justify-center">
              <span className="text-[color:var(--color-teal-deep)] font-bold">Rx</span>
            </div>
            <span className="font-display text-2xl font-bold">Al Mariyam</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm text-white/80">
            Premium medicines, healthcare products, and expert consultations. Serving families across Mumbai with authenticity, speed, and care.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { icon: Share2, label: "Facebook", href: "#" },
              { icon: Share2, label: "Instagram", href: "#" },
              { icon: Share2, label: "LinkedIn", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[color:var(--color-gold)]/20 flex items-center justify-center transition-colors"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-[color:var(--color-gold-soft)] mb-5 font-bold">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/store" className="hover:text-[color:var(--color-gold)] transition-colors">Online Store</Link></li>
            <li><Link href="/doctors" className="hover:text-[color:var(--color-gold)] transition-colors">Our Doctors</Link></li>
            <li><Link href="/services" className="hover:text-[color:var(--color-gold)] transition-colors">Services</Link></li>
            <li><Link href="/about" className="hover:text-[color:var(--color-gold)] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[color:var(--color-gold)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-[color:var(--color-gold-soft)] mb-5 font-bold">
            Contact Info
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5 items-start">
              <MapPin size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              <span>Al Mariyam Pharmacy, Mumbra, Thane, Mumbai</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Phone size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              <a href="tel:+919876543210" className="hover:text-[color:var(--color-gold)]">+91 98765 43210</a>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              <a href="mailto:hello@almariyampharmacy.com" className="hover:text-[color:var(--color-gold)]">hello@almariyam.com</a>
            </li>
            <li className="flex gap-2.5 items-start">
              <Clock size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              <span>Mon–Sun, 9:00 AM – 10:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Al Mariyam Pharmacy. All rights reserved.</span>
          <span>Trusted by thousands of families in Mumbai</span>
        </div>
      </div>
    </footer>
  );
}
