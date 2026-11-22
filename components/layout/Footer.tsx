"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig, type Locale } from "@/config/site.config";
import { AnimatedAvatar } from "@/components/layout/AnimatedAvatar";
import type { FooterProps } from "@/types";

function CurrentYear({ fallback = 2025 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

const socialIcons = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1v5.35H19v-4.74c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5v4.82H9v-11Z" />
  ),
  twitter: (
    <path d="M17.3 3H20l-6.1 7 7.2 11h-6.6l-5.2-7.7L3.3 21H.6l6.5-7.5L.1 3h6.8l4.7 7L17.3 3Zm-1.1 16h1.5L6.9 4.7H5.3L16.2 19Z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.9.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.59.69.48A10 10 0 0 0 12 2Z" />
  ),
} as const;

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

  const socialLinks = [
    {
      key: "linkedin" as const,
      label: "LinkedIn",
      href: settings?.social.linkedin || siteConfig.social.linkedin,
    },
    {
      key: "twitter" as const,
      label: "Twitter",
      href: settings?.social.twitter || siteConfig.social.twitter,
    },
    {
      key: "github" as const,
      label: "GitHub",
      href: siteConfig.social.github,
    },
  ].filter((s) => s.href);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
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
          <div className="grid gap-10 md:grid-cols-12 md:gap-6">
            <div className="flex flex-col items-center md:col-span-5 md:items-start text-center md:text-start">
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

            <div className="flex flex-col items-center md:col-span-4 md:items-start">
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

            <div className="flex flex-col items-center md:col-span-3 md:items-start">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {labels.follow}
              </p>
              <ul className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-tint bg-canvas/50 text-muted backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <svg
                        width="16"
                        height="16"
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
            </div>
          </div>

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
