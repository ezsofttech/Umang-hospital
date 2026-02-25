"use client";

import { useState } from "react";
import { submitMessage } from "@/lib/api";

const HOSPITAL_EMAIL = "umanghospitalbsp@gmail.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await submitMessage({ name, email, description });
      setSubmitted(true);
      setName("");
      setEmail("");
      setDescription("");
    } catch {
      const subject = encodeURIComponent("Contact from UMANG Hospital website");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${description}`
      );
      window.location.href = `mailto:${HOSPITAL_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setName("");
      setEmail("");
      setDescription("");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-center text-sm font-medium text-[var(--umang-green)] sm:text-base">
          Thank you for your message. If your email client did not open, please email us directly at{" "}
          <a href={`mailto:${HOSPITAL_EMAIL}`} className="text-[var(--umang-teal)] underline">
            {HOSPITAL_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mx-auto mt-4 block rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="contact-form-heading"
    >
      <h2 id="contact-form-heading" className="flex items-center gap-2 text-lg font-bold text-[var(--umang-navy)] sm:text-xl">
        <i className="fi fi-sr-comment text-xl" aria-hidden />
        Send us a message
      </h2>
      <p className="mt-1 text-sm text-gray-600 sm:text-base">
        Fill in your details and we&apos;ll get back to you.
      </p>

      <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)] sm:text-base"
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)] sm:text-base"
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="contact-description" className="block text-sm font-medium text-gray-700">
            Message / Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[var(--umang-teal)] focus:ring-1 focus:ring-[var(--umang-teal)] sm:text-base"
            placeholder="Your message or enquiry..."
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--umang-navy)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--umang-teal)] focus:ring-offset-2 disabled:opacity-70 sm:py-3.5 sm:text-base"
        >
          <i className="fi fi-sr-send text-lg" aria-hidden />
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
