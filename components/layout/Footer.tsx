"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { siteConfig, type Locale } from "@/config/site.config";
import { AnimatedAvatar } from "@/components/layout/AnimatedAvatar";
import type { FooterProps } from "@/types";

function CurrentYear({ fallback = 2025 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

// ─────────────────────────────────────────────────────────────
// Social icons
// ─────────────────────────────────────────────────────────────

const socialIcons = {
  facebook: (
    <path d="M15 22V13.1h3l.45-3.45H15V7.45c0-1 .28-1.68 1.72-1.68h1.84V2.68A24 24 0 0 0 15.9 2.5c-2.65 0-4.47 1.62-4.47 4.6v2.55H8.4v3.45h3.03V22H15Z" />
  ),

  instagram: (
    <path
      fill="currentColor"
      stroke="none"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
    />
  ),

  twitter: (
    <path
      d="M18.9 2.5h3.2l-7 8 8.2 11h-6.4l-5.1-6.7L5.9 21.5H2.7l7.5-8.6L2.2 2.5h6.6l4.6 6.1 5.5-6.1Zm-1.1 17h1.8L7.2 4.4H5.3l12.5 15.1Z"
      fill="currentColor"
      stroke="none"
    />
  ),

  youtube: (
    <path
      fill="currentColor"
      stroke="none"
      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 16.2V7.8l7.2 4.2-7.2 4.2Z"
    />
  ),

  tiktok: (
    <path d="M16.5 3H13v12.1a3.1 3.1 0 1 1-3.1-3.1c.4 0 .8.05 1.1.18V8.65a7 7 0 1 0 5.5 6.8V9.1a8.1 8.1 0 0 0 4.5 1.35V6.9A4.6 4.6 0 0 1 16.5 3Z" />
  ),

  linkedin: (
    <>
      <path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.2 9h3.6v12H3.2V9Zm6.2 0h3.5v1.65h.05a3.85 3.85 0 0 1 3.47-1.9c3.7 0 4.38 2.43 4.38 5.6V21h-3.65v-5.9c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9.4V9Z" />
    </>
  ),
} as const;

type SocialKey = keyof typeof socialIcons;

export function Footer({ locale, footer, nav, labels, settings }: FooterProps) {
  const l = locale as Locale;
  const year = 2025;

  const navLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/library`, label: nav.library },
    { href: `/${locale}/mothaqaf`, label: nav.mothaqaf },
    { href: `/${locale}/projects`, label: nav.projects },
  ];

  const contactEmail = settings?.contactEmail || "";
  const whatsappRaw = settings?.whatsapp || "";
  const whatsappDigits = whatsappRaw.replace(/\D/g, "");
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}`
    : null;

  const socialLinks: { key: SocialKey; label: string; href: string }[] = [
    {
      key: "facebook",
      label: "Facebook",
      href: settings?.social?.facebook || "",
    },
    {
      key: "instagram",
      label: "Instagram",
      href: settings?.social?.instagram || "",
    },
    {
      key: "twitter",
      label: "Twitter / X",
      href: settings?.social?.twitter || "",
    },
    { key: "youtube", label: "YouTube", href: settings?.social?.youtube || "" },
    { key: "tiktok", label: "TikTok", href: settings?.social?.tiktok || "" },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: settings?.social?.linkedin || "",
    },
  ].filter((s) => s.href) as { key: SocialKey; label: string; href: string }[];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background signature */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <p className="whitespace-nowrap text-center text-[18vw] font-black leading-[0.85] tracking-tighter text-primary-ghost opacity-40">
          {labels.signature}
        </p>
      </div>

      <section className="relative py-16">
        <div className="container-editorial relative">
          {/* ── 3 columns ──────────────────────────────── */}
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {/* ── 1. Brand ─────────────────────────────── */}
            <div className="flex flex-col items-center md:items-start text-center md:text-start">
              <Link
                href={`/${locale}`}
                className="group inline-flex items-center gap-3"
                aria-label={`${siteConfig.siteName[l]} — ${labels.brandHomeAria}`}
              >
                <AnimatedAvatar
                  locale={locale}
                  size={48}
                  showStatus={false}
                  showName
                  variant="watermark"
                  nameClassName="text-base"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {footer.tagline}
              </p>
              <p className="mt-2 text-xs text-muted/60">{footer.madeBy}</p>
            </div>

            {/* ── 2. Navigation ────────────────────────── */}
            <div className="flex flex-col items-center md:items-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {labels.navigation}
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-text/80 transition-colors hover:text-primary"
                    >
                      <span className="h-px w-0 bg-primary transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── 3. Contact + Social ──────────────────── */}
            <div className="flex flex-col items-center md:items-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {labels.contact}
              </p>
              <ul className="flex flex-col gap-2 text-sm w-full">
                {contactEmail && (
                  <li>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="group inline-flex items-center gap-2 text-text/80 transition-colors hover:text-primary"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-tint bg-canvas/50 text-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <Mail className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate" dir="ltr">
                        {contactEmail}
                      </span>
                    </a>
                  </li>
                )}
                {whatsappHref && (
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 text-text/80 transition-colors hover:text-primary"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-tint bg-canvas/50 text-muted transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <MessageCircle className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate" dir="ltr">
                        {whatsappRaw}
                      </span>
                    </a>
                  </li>
                )}
              </ul>

              {/* Social — تحت بيانات التواصل */}
              {socialLinks.length > 0 && (
                <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  {socialLinks.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={link.label}
                        title={link.label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-tint bg-canvas/50 text-muted backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          {socialIcons[link.key]}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Bottom bar ─────────────────────────────── */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-primary-tint pt-6 text-xs text-muted sm:flex-row">
            <p className="text-center sm:text-start">
              © <CurrentYear fallback={year} /> {siteConfig.siteName[l]} —{" "}
              {footer.rights}
            </p>

            <div className="flex items-center gap-4">
              <p className="text-muted/60">{labels.crafted}</p>
              <button
                type="button"
                onClick={handleBackToTop}
                aria-label={labels.backToTop}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary-tint bg-canvas/50 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowUp className="h-3 w-3" />
                <span className="hidden sm:inline">{labels.backToTop}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
