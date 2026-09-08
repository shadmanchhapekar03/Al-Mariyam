import type { Metadata } from "next";
import Link from "next/link";
import { doctors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Physicians — Al Mariyam Medical Center",
  description:
    "Meet the consultant physicians of Al Mariyam Medical Center across cardiology, pediatrics, obstetrics & gynecology, orthopedics, dermatology, and internal medicine.",
};

export default function DoctorsPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
          Our physicians
        </span>
        <h1 className="font-display text-5xl mt-4 text-[color:var(--color-teal-deep)] max-w-2xl">
          Full-time consultants, not rotating locums.
        </h1>
        <p className="mt-5 text-[color:var(--color-ink-soft)] max-w-xl leading-relaxed">
          Every physician below sees patients at this address year-round.
          Request any of them by name when you book.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.slug}
            className="rounded-2xl border border-[color:var(--color-line)] p-8 bg-[color:var(--color-ivory)] flex gap-6"
          >
            <div className="w-16 h-16 shrink-0 rounded-full bg-[color:var(--color-ivory-dim)] flex items-center justify-center font-display text-2xl text-[color:var(--color-teal-deep)]">
              {doc.name.split(" ")[1]?.[0]}
              {doc.name.split(" ")[2]?.[0]}
            </div>
            <div>
              <h2 className="font-display text-xl text-[color:var(--color-teal-deep)]">
                {doc.name}
              </h2>
              <p className="text-sm text-[color:var(--color-gold)] font-medium mt-1">
                {doc.role}
              </p>
              <p className="text-sm text-[color:var(--color-ink-soft)] mt-3 leading-relaxed">
                {doc.bio}
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-[color:var(--color-ink-soft)]/80">
                <span>{doc.years} years experience</span>
                <span>·</span>
                <span>{doc.languages.join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[color:var(--color-teal-deep)] text-[color:var(--color-ivory)] px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl">Request a physician by name.</h2>
            <p className="text-[color:var(--color-ivory-dim)]/80 mt-2 max-w-md">
              Tell us who you&apos;d like to see when you book, and we&apos;ll
              match the earliest slot on their calendar.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[color:var(--color-gold)] text-[color:var(--color-teal-deep)] font-medium px-7 py-3.5 rounded-full hover:bg-[color:var(--color-gold-soft)] transition-colors whitespace-nowrap"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
