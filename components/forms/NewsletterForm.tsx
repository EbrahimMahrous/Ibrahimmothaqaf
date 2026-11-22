"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api";
import type { NewsletterFormProps } from "@/types";

export function NewsletterForm({
  placeholder,
  submitLabel,
  successMessage = "تم الاشتراك بنجاح ✓",
  errorMessage = "حصل خطأ، جرب تاني.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setMessage(successMessage);
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.message ? err.message : errorMessage,
      );
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={status === "loading" || status === "success"}
            aria-label={placeholder}
            className="w-full rounded-lg border border-primary/15 bg-background/60 px-4 py-2.5 text-sm text-text placeholder:text-muted/60 outline-none backdrop-blur-sm transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-base btn-primary whitespace-nowrap py-2.5! text-sm disabled:opacity-60"
        >
          {status === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {submitLabel}
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>

      {message && status === "success" && (
        <p className="mt-2 text-xs font-medium text-primary">{message}</p>
      )}
      {message && status === "error" && (
        <p className="mt-2 text-xs font-medium text-red-500">{message}</p>
      )}
    </form>
  );
}
