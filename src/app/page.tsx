import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  Baby,
  Bone,
  Flower2,
  Sparkles,
  Stethoscope,
  Smile,
  ScanLine,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  Users2,
  Zap,
  Truck,
  Shield,
  MapPin,
  Phone,
} from "lucide-react";
import { services, doctors } from "@/lib/data";

const ICONS: Record<string, React.ElementType> = {
  HeartPulse,
  Baby,
  Bone,
  Flower2,
  Sparkles,
  Stethoscope,
  Smile,
  ScanLine,
};

const STATS = [
  { value: "14", label: "Years serving the community" },
  { value: "38", label: "Specialist physicians" },
  { value: "96,400+", label: "Patients cared for" },
  { value: "8", label: "Clinical departments" },
];

export default function Home() {
  return (
    <div>
      {/* Discount Banner */}
      <section className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] text-white sticky top-20 z-40 shadow-lg">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-center gap-3 flex-wrap">
          <span className="font-bold text-lg md:text-xl">🎉 SPECIAL OFFER:</span>
          <span className="text-lg md:text-xl font-semibold">18% OFF on your first order</span>
          <span className="text-sm md:text-base opacity-90">| Minimum order: ₹499</span>
          <span className="text-xs md:text-sm opacity-75 ml-auto">Use code: WELCOME18</span>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden pt-0">
        <div
          className="absolute -top-32 -right-40 w-[560px] h-[560px] rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--color-gold-soft)" }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)] px-4 py-2 rounded-full mb-4">
              <Zap size={16} strokeWidth={2} />
              <span className="text-xs uppercase tracking-wider font-semibold">Fast & Reliable Delivery</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mt-4 text-[color:var(--color-teal-deep)]">
              Your Health,
              <br />
              <span className="text-[color:var(--color-gold)]">Our Priority</span>
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] max-w-lg leading-relaxed">
              Premium medicines, healthcare products, and consultations delivered to your doorstep. Trusted by thousands of families in Mumbai.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/store"
                className="bg-[color:var(--color-gold)] text-white font-semibold px-8 py-4 rounded-full hover:bg-[color:var(--color-gold)]/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Shop Now
                <ArrowUpRight size={18} strokeWidth={2} />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[color:var(--color-teal)] text-[color:var(--color-teal)] font-semibold px-8 py-3.5 rounded-full hover:bg-[color:var(--color-teal)]/5 transition-colors inline-flex items-center gap-2"
              >
                Book Consultation
                <ArrowUpRight size={18} strokeWidth={2} />
              </Link>
            </div>

            {/* Quick benefits */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-teal)]/15 flex items-center justify-center">
                  <Truck size={20} className="text-[color:var(--color-teal)]" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-[color:var(--color-ink-soft)]">Same-day Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-success)]/15 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-[color:var(--color-success)]" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-[color:var(--color-ink-soft)]">100% Genuine</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-gold)]/15 flex items-center justify-center">
                  <Shield size={20} className="text-[color:var(--color-gold)]" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-[color:var(--color-ink-soft)]">Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/20">
              <Image
                src="/Hijab_girl.png"
                alt="Al Mariyam Pharmacy - Premium Healthcare Products"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-2xl p-6 w-64 border-2 border-[color:var(--color-gold)]/20 backdrop-blur">
              <div className="flex items-center gap-2 text-[color:var(--color-gold)] mb-2">
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-lg">4.8/5</span>
              </div>
              <p className="text-sm text-[color:var(--color-ink-soft)] font-medium">
                Trusted by 50,000+ customers
              </p>
              <p className="text-xs text-[color:var(--color-ink-soft)] mt-2 opacity-75">
                Fast delivery, authentic products, expert support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[color:var(--color-line)] bg-gradient-to-r from-[color:var(--color-teal)]/5 to-[color:var(--color-gold)]/5">
        <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-display text-4xl md:text-5xl text-[color:var(--color-teal-deep)]">
              50K+
            </div>
            <div className="text-sm text-[color:var(--color-ink-soft)] mt-2">
              Happy Customers
            </div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl text-[color:var(--color-gold)]">
              10K+
            </div>
            <div className="text-sm text-[color:var(--color-ink-soft)] mt-2">
              Products Available
            </div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl text-[color:var(--color-teal-deep)]">
              24/7
            </div>
            <div className="text-sm text-[color:var(--color-ink-soft)] mt-2">
              Customer Support
            </div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl text-[color:var(--color-gold)]">
              Same-Day
            </div>
            <div className="text-sm text-[color:var(--color-ink-soft)] mt-2">
              Delivery in Mumbai
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[color:var(--color-gold)] font-bold">
              Shop by Category
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-[color:var(--color-teal-deep)]">
              Browse Our Products
            </h2>
          </div>
          <Link href="/store" className="underline-grow text-sm font-medium text-[color:var(--color-gold)]">
            View all categories →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.slice(0, 6).map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/store#${service.slug}`}
                className={`group rounded-2xl border-2 border-[color:var(--color-line)] p-8 bg-white hover:border-[color:var(--color-gold)] hover:shadow-xl hover:shadow-[color:var(--color-gold)]/10 transition-all ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[color:var(--color-gold)]/15 flex items-center justify-center group-hover:bg-[color:var(--color-gold)]/25 transition-colors">
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-[color:var(--color-gold)]"
                  />
                </div>
                <h3 className="font-bold text-xl mt-5 text-[color:var(--color-teal-deep)]">
                  {service.name}
                </h3>
                <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
                  {service.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[color:var(--color-gold)] mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop now <ArrowUpRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gradient-to-r from-[color:var(--color-teal-deep)] to-[color:var(--color-teal)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[color:var(--color-gold-soft)] bg-white/10 px-4 py-2 rounded-full w-fit mb-4">
              <ShieldCheck size={14} />
              Why Trust Al Mariyam
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
              Your Health, Our Expertise
            </h2>
            <p className="mt-6 text-white/85 leading-relaxed max-w-md text-lg">
              We combine authentic healthcare products with expert guidance. Every product is verified, every customer matters.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                icon: Shield,
                title: "100% Authentic Products",
                text: "Direct from manufacturers. No counterfeits, guaranteed.",
              },
              {
                icon: Zap,
                title: "Fast Delivery to Mumbai",
                text: "Same-day delivery in select areas. Track your order in real-time.",
              },
              {
                icon: Users2,
                title: "Expert Support Team",
                text: "Licensed pharmacists available 24/7 to answer your questions.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                text: "Multiple payment options with buyer protection guarantee.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-white/10 backdrop-blur rounded-2xl p-5">
                <item.icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-[color:var(--color-gold-soft)] shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-bold text-base">{item.title}</h3>
                  <p className="text-sm text-white/75 mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors preview - now "Expert Consultation" */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[color:var(--color-gold)] font-bold">
              Healthcare Experts
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 text-[color:var(--color-teal-deep)]">
              Consult Our Specialists
            </h2>
          </div>
          <Link href="/doctors" className="underline-grow text-sm font-medium text-[color:var(--color-gold)]">
            View all experts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map((doc) => (
            <div
              key={doc.slug}
              className="rounded-2xl border-2 border-[color:var(--color-line)] p-7 bg-white hover:border-[color:var(--color-gold)] hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[color:var(--color-teal)] to-[color:var(--color-gold)] flex items-center justify-center font-display text-2xl text-white font-bold">
                {doc.name.split(" ")[1]?.[0]}
                {doc.name.split(" ")[2]?.[0]}
              </div>
              <h3 className="font-bold text-xl mt-5 text-[color:var(--color-teal-deep)]">
                {doc.name}
              </h3>
              <p className="text-sm font-semibold text-[color:var(--color-gold)] mt-2">
                {doc.role}
              </p>
              <p className="text-sm text-[color:var(--color-ink-soft)] mt-3 leading-relaxed">
                {doc.bio}
              </p>
              <div className="mt-4 pt-4 border-t border-[color:var(--color-line)] flex items-center gap-2">
                <span className="text-xs font-semibold text-[color:var(--color-ink-soft)]">
                  {doc.years}+ years experience
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[color:var(--color-teal)] to-[color:var(--color-teal-deep)] border-0 px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-white">
              Need Help?
            </h2>
            <p className="text-white/85 mt-2 max-w-md">
              Chat with our experts, schedule a consultation, or get medicine recommendations instantly.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)] font-bold px-8 py-4 rounded-full hover:bg-[color:var(--color-gold-soft)] transition-all whitespace-nowrap shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Chat with Expert
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* Premium Store Section */}
      <section className="bg-gradient-to-br from-[color:var(--color-ivory-dim)] to-white mt-12">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)] px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xs uppercase tracking-wider font-bold">Online Store</span>
            </div>
            <h2 className="font-display text-5xl text-[color:var(--color-teal-deep)] mb-4 leading-tight">
              Premium Medicines & Health Products
            </h2>
            <p className="text-[color:var(--color-ink-soft)] leading-relaxed mb-6 text-lg">
              Curated collection of medicines, supplements, medical devices, and wellness products. All authentic, all certified. Delivered safely to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[color:var(--color-line)]">
                <Truck size={20} className="text-[color:var(--color-teal)]" strokeWidth={1.5} />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[color:var(--color-ink-soft)]">Same-day Delivery</span>
                  <p className="text-xs text-[color:var(--color-ink-soft)]/70">In Mumbai & suburbs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[color:var(--color-line)]">
                <Shield size={20} className="text-[color:var(--color-success)]" strokeWidth={1.5} />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[color:var(--color-ink-soft)]">100% Authentic</span>
                  <p className="text-xs text-[color:var(--color-ink-soft)]/70">Verified products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[color:var(--color-line)]">
                <ShieldCheck size={20} className="text-[color:var(--color-gold)]" strokeWidth={1.5} />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[color:var(--color-ink-soft)]">Secure Payment</span>
                  <p className="text-xs text-[color:var(--color-ink-soft)]/70">Protected checkout</p>
                </div>
              </div>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 bg-[color:var(--color-gold)] text-white font-bold px-8 py-4 rounded-full hover:bg-[color:var(--color-gold)]/90 transition-all shadow-lg hover:shadow-xl"
            >
              Shop Now
              <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>

          {/* Promo Card */}
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[color:var(--color-gold)]/20 rounded-full blur-3xl" />
            <div className="relative bg-white rounded-3xl p-8 border-2 border-[color:var(--color-gold)]/30 shadow-2xl">
              <div className="absolute -top-6 right-6 bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-gold-soft)] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg transform -rotate-3">
                18% OFF
              </div>

              <div className="mt-12 mb-8">
                <h3 className="font-display text-4xl text-[color:var(--color-teal-deep)] mb-2">
                  First Order Offer
                </h3>
                <p className="text-[color:var(--color-ink-soft)] font-semibold">
                  Minimum order: ₹499
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--color-success)]/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[color:var(--color-success)] font-bold">✓</span>
                  </div>
                  <span className="text-[color:var(--color-ink-soft)] text-sm font-medium">Shop medicines, juices & medical devices</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--color-success)]/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[color:var(--color-success)] font-bold">✓</span>
                  </div>
                  <span className="text-[color:var(--color-ink-soft)] text-sm font-medium">Use code <span className="font-bold text-[color:var(--color-gold)]">WELCOME18</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--color-success)]/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[color:var(--color-success)] font-bold">✓</span>
                  </div>
                  <span className="text-[color:var(--color-ink-soft)] text-sm font-medium">Fast & secure checkout</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--color-success)]/20 flex items-center justify-center mt-0.5 shrink-0">
                    <span className="text-[color:var(--color-success)] font-bold">✓</span>
                  </div>
                  <span className="text-[color:var(--color-ink-soft)] text-sm font-medium">Same-day delivery in Mumbai</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[color:var(--color-teal)]/10 to-[color:var(--color-gold)]/10 rounded-2xl p-4">
                <p className="text-xs text-[color:var(--color-ink-soft)] font-medium">Valid on first order only</p>
                <p className="text-2xl font-bold text-[color:var(--color-teal-deep)] mt-1">Save up to ₹100+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mumbai Address Section */}
      <section className="bg-white border-t border-[color:var(--color-line)]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-[color:var(--color-teal-deep)] mb-4">
              Visit Our Store
            </h2>
            <p className="text-[color:var(--color-ink-soft)] text-lg max-w-2xl mx-auto">
              Located in the heart of Mumbai, serving families across Mumbra and surrounding areas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border-2 border-[color:var(--color-line)] p-8 bg-[color:var(--color-ivory-dim)]/50 hover:border-[color:var(--color-gold)] transition-all">
              <MapPin size={32} className="text-[color:var(--color-gold)] mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-xl text-[color:var(--color-teal-deep)] mb-2">
                Store Location
              </h3>
              <p className="text-[color:var(--color-ink-soft)] text-sm leading-relaxed">
                Al Mariyam Pharmacy<br />
                Mumbra, Thane<br />
                Mumbai, Maharashtra
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[color:var(--color-line)] p-8 bg-[color:var(--color-ivory-dim)]/50 hover:border-[color:var(--color-gold)] transition-all">
              <Phone size={32} className="text-[color:var(--color-gold)] mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-xl text-[color:var(--color-teal-deep)] mb-2">
                Call Us
              </h3>
              <p className="text-[color:var(--color-ink-soft)] text-sm">
                <a href="tel:+919876543210" className="hover:text-[color:var(--color-gold)] font-semibold">
                  +91 98765 43210
                </a><br />
                Available 24/7
              </p>
            </div>

            <div className="rounded-2xl border-2 border-[color:var(--color-line)] p-8 bg-[color:var(--color-ivory-dim)]/50 hover:border-[color:var(--color-gold)] transition-all">
              <Clock3 size={32} className="text-[color:var(--color-gold)] mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-xl text-[color:var(--color-teal-deep)] mb-2">
                Store Hours
              </h3>
              <p className="text-[color:var(--color-ink-soft)] text-sm">
                Mon - Sun: 9:00 AM - 10:00 PM<br />
                Online: 24/7
              </p>
            </div>
          </div>

          <div className="mt-12 bg-[color:var(--color-teal)]/5 rounded-2xl p-8 text-center border border-[color:var(--color-teal)]/20">
            <p className="text-[color:var(--color-ink-soft)] mb-4">
              Can't find what you need? Our pharmacists are always ready to help.
            </p>
            <Link
              href="https://www.justdial.com/Thane/Al-Mariyam-Pharmacy-Mumbra/022PXX22-XX22-241202221043-S1R4_BZDET"
              target="_blank"
              className="inline-flex items-center gap-2 text-[color:var(--color-gold)] font-bold hover:text-[color:var(--color-gold-soft)] transition-colors"
            >
              View on JustDial
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
