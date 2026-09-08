import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[color:var(--color-teal-deep)] text-[color:var(--color-ivory-dim)] mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-display italic text-2xl text-[color:var(--color-ivory)]">
            Al Mariyam
          </span>
          <p className="mt-4 text-sm leading-relaxed max-w-sm text-[color:var(--color-ivory-dim)]/80">
            A multi-specialty medical center built on precise diagnostics,
            attentive physicians, and a calm place to be cared for. Serving
            families across the city since 2011.
          </p>
          <div className="flex gap-3 mt-6">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <span
                key={s}
                className="text-xs uppercase tracking-widest border border-[color:var(--color-gold-soft)]/40 rounded-full px-3 py-1.5 text-[color:var(--color-gold-soft)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold-soft)] mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/doctors" className="hover:text-white">Our Physicians</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Book an Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold-soft)] mb-4">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} /> 14 Al Wasl Corniche, Jumeirah, Dubai</li>
            <li className="flex gap-2.5"><Phone size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} /> +971 4 234 5678</li>
            <li className="flex gap-2.5"><Mail size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} /> care@almariyammedical.com</li>
            <li className="flex gap-2.5"><Clock size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} /> Sat–Thu, 8:00am – 9:00pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[color:var(--color-ivory-dim)]/60">
          <span>© {new Date().getFullYear()} Al Mariyam Medical Center. All rights reserved.</span>
          <span>Licensed by the Dubai Health Authority · License No. DHA-27714</span>
        </div>
      </div>
    </footer>
  );
}
