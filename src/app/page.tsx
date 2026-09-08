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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-32 -right-40 w-[560px] h-[560px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--color-gold-soft)" }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
              <span className="w-8 h-px bg-[color:var(--color-gold)]" />
              Dubai Health Authority Licensed
            </span>
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.05] mt-6 text-[color:var(--color-teal-deep)]">
              Careful medicine,
              <br />
              <span className="italic">practiced patiently.</span>
            </h1>
            <p className="mt-6 text-lg text-[color:var(--color-ink-soft)] max-w-lg leading-relaxed">
              Al Mariyam brings cardiology, pediatrics, women&apos;s health, and
              seven other specialties into one calm, well-lit building —
              staffed by physicians who read your full chart before your
              five-minute slot begins.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] font-medium px-7 py-3.5 rounded-full hover:bg-[color:var(--color-teal-deep)] transition-colors inline-flex items-center gap-2"
              >
                Book an appointment
                <ArrowUpRight size={17} strokeWidth={2} />
              </Link>
              <Link
                href="/services"
                className="underline-grow text-sm font-medium text-[color:var(--color-ink-soft)]"
              >
                View all departments
              </Link>
            </div>
          </div>

          <div className="relative animate-rise" style={{ animationDelay: "120ms" }}>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl shadow-black/10">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop"
                alt="Physician at Al Mariyam Medical Center reviewing a patient chart"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[color:var(--color-ivory)] rounded-2xl shadow-lg p-5 w-52 border border-[color:var(--color-line)]">
              <div className="flex items-center gap-2 text-[color:var(--color-teal)]">
                <ShieldCheck size={18} strokeWidth={1.75} />
                <span className="text-xs font-semibold uppercase tracking-wide">Accredited</span>
              </div>
              <p className="text-sm mt-1.5 text-[color:var(--color-ink-soft)]">
                CBAHI-accredited facility, audited annually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-ivory-dim)]/60">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl text-[color:var(--color-teal-deep)]">
                {s.value}
              </div>
              <div className="text-sm text-[color:var(--color-ink-soft)] mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
              Departments
            </span>
            <h2 className="font-display text-4xl mt-3 text-[color:var(--color-teal-deep)]">
              Eight specialties, one address
            </h2>
          </div>
          <Link href="/services" className="underline-grow text-sm font-medium">
            See every department →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className={`group rounded-2xl border border-[color:var(--color-line)] p-7 bg-[color:var(--color-ivory)] hover:border-[color:var(--color-gold-soft)] hover:shadow-lg hover:shadow-black/5 transition-all ${
                  i === 0 ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-[color:var(--color-teal)]"
                />
                <h3 className="font-display text-xl mt-5 text-[color:var(--color-teal-deep)]">
                  {service.name}
                </h3>
                <p className="text-sm text-[color:var(--color-ink-soft)] mt-2 leading-relaxed">
                  {service.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-gold)] mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[color:var(--color-teal-deep)] text-[color:var(--color-ivory)]">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold-soft)] font-semibold">
              Why families choose Al Mariyam
            </span>
            <h2 className="font-display text-4xl mt-4 leading-tight">
              We built the kind of clinic we&apos;d want for our own parents.
            </h2>
            <p className="mt-5 text-[color:var(--color-ivory-dim)]/85 leading-relaxed max-w-md">
              That means unhurried consultations, imaging read the same day,
              and a billing desk that explains costs before treatment — not
              after.
            </p>
          </div>

          <div className="grid gap-8">
            {[
              {
                icon: Clock3,
                title: "20-minute consultation slots",
                text: "Double the regional average, so your physician actually has time to listen.",
              },
              {
                icon: Users2,
                title: "One file, every specialist",
                text: "Your records travel between departments instantly — no repeating your history at each door.",
              },
              {
                icon: ShieldCheck,
                title: "Transparent, itemized pricing",
                text: "A written estimate before any procedure, with insurance pre-approval handled for you.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5">
                <item.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-[color:var(--color-gold-soft)] shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-sm text-[color:var(--color-ivory-dim)]/75 mt-1.5 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
              Our physicians
            </span>
            <h2 className="font-display text-4xl mt-3 text-[color:var(--color-teal-deep)]">
              Meet a few of the team
            </h2>
          </div>
          <Link href="/doctors" className="underline-grow text-sm font-medium">
            View all physicians →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map((doc) => (
            <div
              key={doc.slug}
              className="rounded-2xl border border-[color:var(--color-line)] p-7 bg-[color:var(--color-ivory)]"
            >
              <div className="w-14 h-14 rounded-full bg-[color:var(--color-ivory-dim)] flex items-center justify-center font-display text-xl text-[color:var(--color-teal-deep)]">
                {doc.name.split(" ")[1]?.[0]}
                {doc.name.split(" ")[2]?.[0]}
              </div>
              <h3 className="font-display text-xl mt-5 text-[color:var(--color-teal-deep)]">
                {doc.name}
              </h3>
              <p className="text-sm text-[color:var(--color-gold)] font-medium mt-1">
                {doc.role}
              </p>
              <p className="text-sm text-[color:var(--color-ink-soft)] mt-3 leading-relaxed">
                {doc.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] bg-[color:var(--color-ivory-dim)] border border-[color:var(--color-line)] px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl text-[color:var(--color-teal-deep)]">
              Ready when you are.
            </h2>
            <p className="text-[color:var(--color-ink-soft)] mt-2 max-w-md">
              Same-week appointments across every department, with emergency
              triage available around the clock.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] font-medium px-7 py-3.5 rounded-full hover:bg-[color:var(--color-teal-deep)] transition-colors whitespace-nowrap"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
