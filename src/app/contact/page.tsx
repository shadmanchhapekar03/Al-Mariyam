import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Appointments — Al Mariyam Medical Center",
  description:
    "Book an appointment at Al Mariyam Medical Center or send us a general inquiry. Located in Jumeirah, Dubai, open Saturday to Thursday.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--color-gold)] font-semibold">
          Contact & appointments
        </span>
        <h1 className="font-display text-5xl mt-4 text-[color:var(--color-teal-deep)] max-w-2xl">
          Let&apos;s get you seen.
        </h1>
        <p className="mt-5 text-[color:var(--color-ink-soft)] max-w-xl leading-relaxed">
          Fill out the form below and our scheduling desk will confirm your
          slot within one business day. For urgent concerns, please call us
          directly rather than submitting a request.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-[1fr_0.85fr] gap-12">
        <AppointmentForm />

        <div className="space-y-8">
          <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-ivory-dim)]/60 p-7">
            <div className="flex gap-3 items-start text-[color:var(--color-teal-deep)]">
              <AlertCircle size={20} strokeWidth={1.75} className="shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">
                For chest pain, breathing difficulty, or any life-threatening
                emergency, call 998 or go to your nearest emergency room
                immediately. This form is for scheduled care only.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[color:var(--color-ink-soft)]">
            <h3 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-2">
              Visit or call us
            </h3>
            <p className="flex gap-2.5">
              <MapPin size={17} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              14 Al Wasl Corniche, Jumeirah, Dubai, UAE
            </p>
            <p className="flex gap-2.5">
              <Phone size={17} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              +971 4 234 5678
            </p>
            <p className="flex gap-2.5">
              <Mail size={17} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              care@almariyammedical.com
            </p>
            <p className="flex gap-2.5">
              <Clock size={17} className="shrink-0 mt-0.5" strokeWidth={1.5} />
              Saturday – Thursday, 8:00am – 9:00pm
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl text-[color:var(--color-teal-deep)] mb-3">
              General inquiry
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
