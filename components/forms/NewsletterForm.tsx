"use client";

import { useState } from "react";

interface NewsletterFormProps {
  placeholder: string;
  submitLabel: string;
  successMessage?: string;
  errorMessage?: string;
}

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      // TODO: wire to API
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md"
      noValidate
    >
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

      {status === "success" && (
        <p className="mt-2 text-center text-xs font-medium text-primary sm:text-start">
          {successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-center text-xs font-medium text-red-500 sm:text-start">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
