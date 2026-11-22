"use client";

import { Check, Send, Shield, Users } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { NewsletterSectionProps } from "@/types";

export function NewsletterSection({ labels }: NewsletterSectionProps) {
  return (
    <section className="relative bg-primary-dark text-white py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary-dark via-primary-dark to-primary/40" />

        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute left-0 top-0 h-px w-full origin-top-left rotate-[-8deg] bg-white" />
          <div className="absolute left-0 bottom-0 h-px w-full origin-bottom-left rotate-6 bg-white" />
        </div>

        {[
          { top: "12%", left: "8%", size: 2, delay: "0s", duration: "3.5s" },
          { top: "22%", left: "18%", size: 1.5, delay: "0.6s", duration: "4s" },
          { top: "8%", left: "32%", size: 2.5, delay: "1.2s", duration: "5s" },
          {
            top: "18%",
            left: "46%",
            size: 1.5,
            delay: "0.3s",
            duration: "3.8s",
          },
          { top: "28%", left: "58%", size: 2, delay: "1.8s", duration: "4.5s" },
          {
            top: "10%",
            left: "70%",
            size: 1.5,
            delay: "0.9s",
            duration: "3.2s",
          },
          {
            top: "20%",
            left: "82%",
            size: 2.5,
            delay: "2.1s",
            duration: "5.2s",
          },
          {
            top: "35%",
            left: "92%",
            size: 1.5,
            delay: "1.5s",
            duration: "4.2s",
          },
          { top: "72%", left: "6%", size: 2, delay: "0.4s", duration: "3.6s" },
          {
            top: "80%",
            left: "14%",
            size: 1.5,
            delay: "1.1s",
            duration: "4.8s",
          },
          {
            top: "68%",
            left: "26%",
            size: 2.5,
            delay: "2.4s",
            duration: "5.4s",
          },
          {
            top: "78%",
            left: "38%",
            size: 1.5,
            delay: "0.7s",
            duration: "3.4s",
          },
          { top: "74%", left: "52%", size: 2, delay: "1.6s", duration: "4.1s" },
          {
            top: "82%",
            left: "64%",
            size: 1.5,
            delay: "0.2s",
            duration: "3.9s",
          },
          {
            top: "70%",
            left: "76%",
            size: 2.5,
            delay: "2.0s",
            duration: "5.1s",
          },
          { top: "84%", left: "88%", size: 2, delay: "1.3s", duration: "4.4s" },
        ].map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: "0 0 6px 1px rgba(255,255,255,0.6)",
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}

        {[
          { top: "15%", left: "25%" },
          { top: "75%", left: "45%" },
          { top: "25%", left: "88%" },
          { top: "60%", left: "12%" },
          { top: "45%", left: "70%" },
        ].map((mark, i) => (
          <span
            key={`plus-${i}`}
            className="absolute text-white/20 text-xs font-light select-none animate-twinkle"
            style={{
              top: mark.top,
              left: mark.left,
              animationDelay: `${i * 0.8}s`,
              animationDuration: "6s",
            }}
          >
            +
          </span>
        ))}
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-center lg:text-start">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-4 backdrop-blur-sm">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">
              {labels.newsletterTitle || "Weekly Newsletter"}
            </h3>
            <p className="mt-2 text-white/70 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              {labels.newsletterSubtitle ||
                "Subscribe to get exclusive content every week."}
            </p>
          </div>

          <div className="lg:col-span-7">
            <NewsletterForm
              placeholder={labels.newsletterPlaceholder}
              submitLabel={labels.newsletterSubmit}
              successMessage={labels.newsletterSuccess}
              errorMessage={labels.newsletterError}
            />

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-white/80" />
                {labels.newsletterPerks?.weekly ||
                  labels.newsletterPerks?.readers ||
                  "Join 500+ readers"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-white/80" />
                {labels.newsletterPerks?.noSpam || "No spam"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-white/80" />
                {labels.newsletterPerks?.unsubscribe || "Unsubscribe anytime"}
              </span>
            </div>

            {labels.newsletterHint && (
              <p className="mt-3 text-xs text-white/50 text-center lg:text-start">
                {labels.newsletterHint}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
