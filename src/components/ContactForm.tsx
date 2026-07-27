"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { OPERATOR } from "@/lib/site";
import { IconArrow } from "@/components/Icons";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in name, email, and message.");
      return;
    }

    setStatus("sending");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      _subject: `WattPayback contact — ${topic}`,
      _template: "table",
    };

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${OPERATOR.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTopic("general");
    } catch {
      // Fallback: open mail client so contact always works
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${topic}\n\n${message.trim()}`,
      );
      const subject = encodeURIComponent(`WattPayback contact — ${topic}`);
      window.location.href = `mailto:${OPERATOR.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="reveal-on border border-accent bg-accent-soft px-5 py-6">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-accent-deep">
          Message ready
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Thanks — your message was sent (or your email app opened as backup).
          I usually reply to {OPERATOR.email}.
        </p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-accent-deep underline underline-offset-2"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Topic</span>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none focus:border-accent"
        >
          <option value="general">General question</option>
          <option value="formula">Formula / calculator bug</option>
          <option value="ads">Advertising / partnership</option>
          <option value="privacy">Privacy request</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Message</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y border border-line bg-bg-elevated px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent"
          placeholder="How can I help?"
        />
      </label>

      {error && <p className="text-sm text-warn">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <IconArrow size={16} />
      </button>

      <p className="text-xs text-ink-muted">
        Or email directly:{" "}
        <a
          className="font-medium text-accent-deep underline underline-offset-2"
          href={`mailto:${OPERATOR.email}`}
        >
          {OPERATOR.email}
        </a>
      </p>
    </form>
  );
}
