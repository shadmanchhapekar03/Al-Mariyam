import type { Metadata } from "next";
import {
  HeartPulse,
  Baby,
  Bone,
  Flower2,
  Sparkles,
  Stethoscope,
  Smile,
  ScanLine,
} from "lucide-react";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Departments & Services — Al Mariyam Medical Center",
  description:
    "Explore Al Mariyam's eight clinical departments: cardiology, pediatrics, orthopedics, obstetrics & gynecology, dermatology, internal medicine, dental care, and diagnostic imaging.",
};

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

export default function ServicesPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
          Departments
        </span>
        <h1 className="font-display text-5xl mt-4 text-[color:var(--color-teal-deep)] max-w-2xl">
          Every specialty your family needs, under one roof.
        </h1>
        <p className="mt-5 text-[color:var(--color-ink-soft)] max-w-xl leading-relaxed">
          Each department at Al Mariyam is staffed by full-time consultants —
          not rotating locums — so the physician you see today is the one
          reviewing your results next week.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 space-y-6">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon];
          return (
            <div
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start rounded-2xl border border-[color:var(--color-line)] p-8 bg-[color:var(--color-ivory)]"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-3xl text-[color:var(--color-gold-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-full bg-[color:var(--color-ivory-dim)] flex items-center justify-center">
                  <Icon size={22} strokeWidth={1.5} className="text-[color:var(--color-teal)]" />
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl text-[color:var(--color-teal-deep)]">
                  {service.name}
                </h2>
                <p className="text-[color:var(--color-ink-soft)] mt-3 leading-relaxed max-w-2xl">
                  {service.detail}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
