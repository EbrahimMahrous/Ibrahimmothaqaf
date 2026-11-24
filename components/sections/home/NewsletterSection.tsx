"use client";

import { Check, Send, Shield, Users } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { NewsletterSectionProps } from "@/types";

export function NewsletterSection({ labels }: NewsletterSectionProps) {
  return (
    <section className="relative bg-primary-dark text-white py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Mesh gradient blobs */}
        <div className="absolute top-0 left-0 h-125 w-125 rounded-full bg-[#1a5f4a] blur-[100px] opacity-60 animate-blob-1" />
        <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-[#0f3d2e] blur-[100px] opacity-60 animate-blob-2" />
        <div className="absolute bottom-0 left-1/3 h-125 w-125 rounded-full bg-[#2a7d5f] blur-[100px] opacity-40 animate-blob-3" />
        <div className="absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-[#ff8c42] blur-[120px] opacity-20 animate-blob-4" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark via-transparent to-primary-dark/50" />
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
                {labels.newsletterPerks?.weekly || "Join 500+ readers"}
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
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(80px, 40px) scale(1.1);
          }
          66% {
            transform: translate(40px, 80px) scale(0.9);
          }
        }
        @keyframes blob-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-60px, 60px) scale(1.15);
          }
          66% {
            transform: translate(-100px, 20px) scale(1);
          }
        }
        @keyframes blob-3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(60px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-40px, -60px) scale(0.95);
          }
        }
        @keyframes blob-4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-80px, -50px) scale(1.2);
          }
        }
        .animate-blob-1 {
          animation: blob-1 18s ease-in-out infinite;
        }
        .animate-blob-2 {
          animation: blob-2 22s ease-in-out infinite;
        }
        .animate-blob-3 {
          animation: blob-3 20s ease-in-out infinite;
        }
        .animate-blob-4 {
          animation: blob-4 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
