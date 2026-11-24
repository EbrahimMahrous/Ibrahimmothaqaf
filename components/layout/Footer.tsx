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
    <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6a22 22 0 0 0-2.4-.12c-2.4 0-4 1.45-4 4.1v2.3H7.6V14h2.7v8h3.2Z" />
  ),
  instagram: (
    <>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.25-2.18.41-.55.21-.94.47-1.36.89-.42.42-.68.81-.89 1.36-.16.41-.36 1.03-.41 2.18C2.34 8.48 2.33 8.85 2.33 12s.01 3.52.07 4.76c.05 1.15.25 1.77.41 2.18.21.55.47.94.89 1.36.42.42.81.68 1.36.89.41.16 1.03.36 2.18.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.25 2.18-.41.55-.21.94-.47 1.36-.89.42-.42.68-.81.89-1.36.16-.41.36-1.03.41-2.18.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.25-1.77-.41-2.18a3.7 3.7 0 0 0-.89-1.36 3.7 3.7 0 0 0-1.36-.89c-.41-.16-1.03-.36-2.18-.41C15.52 4.01 15.15 4 12 4Z" />
      <path d="M12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.08a3.18 3.18 0 1 1 0-6.36 3.18 3.18 0 0 1 0 6.36ZM18.3 6.88a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </>
  ),
  twitter: (
    <path d="M17.3 3H20l-6.1 7 7.2 11h-6.6l-5.2-7.7L3.3 21H.6l6.5-7.5L.1 3h6.8l4.7 7L17.3 3Zm-1.1 16h1.5L6.9 4.7H5.3L16.2 19Z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.84C18.2 5 12 5 12 5s-6.2 0-7.8.36A2.6 2.6 0 0 0 2.4 7.2 27.3 27.3 0 0 0 2 12a27.3 27.3 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.84C5.8 19 12 19 12 19s6.2 0 7.8-.36a2.6 2.6 0 0 0 1.8-1.84A27.3 27.3 0 0 0 22 12a27.3 27.3 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  ),
  tiktok: (
    <path d="M16.6 3h-3v11.7a2.7 2.7 0 1 1-2.4-2.7v-3a5.7 5.7 0 1 0 5.4 5.7V8.5a6.6 6.6 0 0 0 3.7 1.1V6.6a3.6 3.6 0 0 1-3.7-3.6Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1v5.35H19v-4.74c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5v4.82H9v-11Z" />
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
