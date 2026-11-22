"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import type { ContactSectionProps, QuickContactFormProps } from "@/types";

// ─── Internal: Quick Contact Form ─────────────────────────
function QuickContactForm({
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  successLabel,
  sendingLabel,
  errorLabel,
}: QuickContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || errorLabel);
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : errorLabel);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary-tint text-primary flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <p className="text-sm font-medium text-text">{successLabel}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label htmlFor="contact-name" className="sr-only">
          {nameLabel}
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={namePlaceholder}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-primary/15 bg-background/60 px-3 py-2 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          {emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-primary/15 bg-background/60 px-3 py-2 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {messageLabel}
        </label>
        <textarea
          id="contact-message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={messagePlaceholder}
          disabled={status === "loading"}
          className="w-full resize-none rounded-lg border border-primary/15 bg-background/60 px-3 py-2 text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
        />
      </div>

      {status === "error" && errorMsg && (
        <p className="text-xs font-medium text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-base btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {sendingLabel}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}

// ─── Public: Contact Section ──────────────────────────────
export function ContactSection({
  locale,
  settings,
  labels,
}: ContactSectionProps) {
  const contactEmail = settings?.contactEmail || siteConfig.social.email;
  const whatsappDigits = settings?.whatsapp?.replace(/\D/g, "") || "";
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}`
    : null;

  return (
    <section className="relative py-20 md:py-24 border-t border-primary-tint">
      <div className="container-editorial relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="reveal">
            <p className="eyebrow-pill mb-5 inline-flex">
              <MessageCircle className="h-3.5 w-3.5" />
              {labels.letsTalk}
            </p>

            <h2 className="heading-display text-text">
              {labels.contactTitle || labels.gotIdea}{" "}
              <span className="block text-text/60">{labels.buildTogether}</span>
            </h2>

            <p className="body-lead mt-5 max-w-lg">
              {labels.contactSubtitle ||
                "Message me and I'll reply personally as soon as I can."}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-tint px-4 py-2 text-sm font-medium text-primary">
              <Clock className="h-4 w-4" />
              {labels.contactResponseTime || "Reply within 24-48 hours"}
            </div>

            <div className="my-8 h-px w-24 bg-primary/20" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted mb-4">
                {labels.contactAlt || "Or reach out directly"}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-primary-tint bg-canvas-alt px-4 py-2.5 text-sm font-medium text-text transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {contactEmail}
                </a>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full border border-primary-tint bg-canvas-alt px-4 py-2.5 text-sm font-medium text-text transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="reveal reveal-2">
            <div className="relative rounded-2xl border border-primary-tint bg-canvas-alt p-6 md:p-8 shadow-sm">
              <div className="absolute -top-3 -inset-e-3 w-20 h-20 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

              <QuickContactForm
                nameLabel={labels.contactFormName || "Name"}
                namePlaceholder={
                  labels.contactFormNamePlaceholder || "Your name"
                }
                emailLabel={labels.contactFormEmail || "Email"}
                emailPlaceholder={
                  labels.contactFormEmailPlaceholder || "you@example.com"
                }
                messageLabel={labels.contactFormMessage || "Message"}
                messagePlaceholder={
                  labels.contactFormMessagePlaceholder ||
                  "Tell me about your idea..."
                }
                submitLabel={labels.contactFormSubmit || "Send message"}
                successLabel={
                  labels.contactFormSuccess || "Sent! I'll reply soon."
                }
                sendingLabel={labels.contactFormSending || "Sending..."}
                errorLabel={
                  labels.contactFormError ||
                  "Something went wrong, please try again"
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center reveal reveal-3">
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors group"
          >
            <Sparkles className="h-4 w-4" />
            {labels.faqTitle || "More questions?"}
            <span className="inline-flex items-center gap-1 text-primary">
              {labels.faqViewAll || "View all FAQs"}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
