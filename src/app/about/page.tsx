import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, HeartHandshake, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Al Mariyam Medical Center",
  description:
    "Founded in 2011, Al Mariyam Medical Center is a CBAHI-accredited, multi-specialty clinic in Jumeirah, Dubai, built around unhurried consultations and same-day diagnostics.",
};

const TIMELINE = [
  { year: "2011", text: "Al Mariyam opens with two departments: internal medicine and pediatrics." },
  { year: "2015", text: "In-house diagnostic imaging suite added, ending referrals to outside labs." },
  { year: "2019", text: "CBAHI accreditation awarded following a full clinical governance review." },
  { year: "2023", text: "Obstetrics & gynecology and dermatology join, bringing the center to eight departments." },
];

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Time to listen",
    text: "20-minute consultation slots as standard, not an upsell.",
  },
  {
    icon: ShieldCheck,
    title: "Clear pricing",
    text: "A written, itemized estimate before treatment begins — always.",
  },
  {
    icon: Award,
    title: "Accredited care",
    text: "CBAHI-accredited and audited annually against clinical governance standards.",
  },
  {
    icon: Building2,
    title: "One building, one file",
    text: "Every department shares records instantly, so nothing gets repeated or lost.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 grid md:grid-cols-[1fr_0.9fr] gap-14 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
            About Al Mariyam
          </span>
          <h1 className="font-display text-5xl mt-4 text-[color:var(--color-teal-deep)] leading-tight">
            Built by two physicians who were tired of ten-minute appointments.
          </h1>
          <p className="mt-6 text-[color:var(--color-ink-soft)] leading-relaxed">
            Al Mariyam Medical Center opened in Jumeirah in 2011, founded by
            Dr. Hana Al Mariyam and Dr. Youssef Karam after years of practicing
            in high-volume hospital wards. They set one rule for the clinic
            they built: no appointment shorter than twenty minutes. Fourteen
            years and eight departments later, that rule still holds.
          </p>
        </div>
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl shadow-black/10">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=900&auto=format&fit=crop"
            alt="Al Mariyam Medical Center reception and waiting area"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-ivory-dim)]/60">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-4 gap-8">
          {VALUES.map((v) => (
            <div key={v.title}>
              <v.icon size={26} strokeWidth={1.5} className="text-[color:var(--color-teal)]" />
              <h3 className="font-display text-lg mt-4 text-[color:var(--color-teal-deep)]">
                {v.title}
              </h3>
              <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
          Our history
        </span>
        <h2 className="font-display text-4xl mt-4 text-[color:var(--color-teal-deep)] mb-12">
          Fourteen years, one address.
        </h2>
        <div className="space-y-10">
          {TIMELINE.map((t) => (
            <div key={t.year} className="grid grid-cols-[5rem_1fr] gap-6">
              <span className="font-display text-2xl text-[color:var(--color-gold)]">
                {t.year}
              </span>
              <p className="text-[color:var(--color-ink-soft)] leading-relaxed pb-8 border-b border-[color:var(--color-line)]">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
