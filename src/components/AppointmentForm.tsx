"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      department: data.get("department"),
      preferredDate: data.get("preferredDate"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-ivory)] p-10 text-center">
        <CheckCircle2
          size={40}
          strokeWidth={1.5}
          className="text-[color:var(--color-teal)] mx-auto"
        />
        <h3 className="font-display text-2xl mt-4 text-[color:var(--color-teal-deep)]">
          Request received.
        </h3>
        <p className="text-[color:var(--color-ink-soft)] mt-2 max-w-sm mx-auto leading-relaxed">
          Our scheduling desk will call or email you within one business day
          to confirm your preferred time.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline-grow text-[color:var(--color-teal)]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-ivory)] p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="fullName" required placeholder="Yusuf Al Amin" />
        <Field label="Phone number" name="phone" required placeholder="+971 50 123 4567" type="tel" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email address" name="email" required placeholder="you@email.com" type="email" />
        <Field label="Preferred date" name="preferredDate" required type="date" />
      </div>
      <div>
        <label className="text-sm font-medium text-[color:var(--color-ink-soft)]">
          Department
          <span className="text-[color:var(--color-gold)]"> *</span>
        </label>
        <select
          name="department"
          required
          defaultValue=""
          className="mt-2 w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
        >
          <option value="" disabled>
            Select a department
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-[color:var(--color-ink-soft)]">
          Reason for visit (optional)
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Briefly describe your symptoms or reason for the visit"
          className="mt-2 w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[color:var(--color-teal)] text-[color:var(--color-ivory)] font-medium px-7 py-3.5 rounded-full hover:bg-[color:var(--color-teal-deep)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Submitting…" : "Request appointment"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[color:var(--color-ink-soft)]">
        {label}
        {required && <span className="text-[color:var(--color-gold)]"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm text-[color:var(--color-ink)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
      />
    </div>
  );
}
