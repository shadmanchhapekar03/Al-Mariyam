"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
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
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
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
      <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-ivory)] p-8 text-center">
        <CheckCircle2
          size={32}
          strokeWidth={1.5}
          className="text-[color:var(--color-teal)] mx-auto"
        />
        <h3 className="font-display text-xl mt-3 text-[color:var(--color-teal-deep)]">
          Message sent.
        </h3>
        <p className="text-sm text-[color:var(--color-ink-soft)] mt-2">
          We reply to general inquiries within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
        />
      </div>
      <input
        name="subject"
        required
        placeholder="Subject"
        className="w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="How can we help?"
        className="w-full rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-teal)]/30 resize-none"
      />
      {status === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto bg-[color:var(--color-ink)] text-[color:var(--color-ivory)] font-medium px-7 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
