"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig, type Locale } from "@/config/site.config";
import { AnimatedAvatar } from "@/components/layout/AnimatedAvatar";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

interface FooterProps {
  locale: string;
  footer: { rights: string; tagline: string; madeBy: string };
  nav: {
    home: string;
    about: string;
    library: string;
    mothaqaf: string;
    projects: string;
  };
  /** Localized footer strings (from common.footerLabels). */
  labels: {
    contact: string;
    navigation: string;
    follow: string;
    backToTop: string;
    crafted: string;
    letsTalk: string;
    gotIdea: string;
    buildTogether: string;
    emailMe: string;
    newsletterLabel: string;
    newsletterPlaceholder: string;
    newsletterSubmit: string;
    newsletterSuccess: string;
    brandHomeAria: string;
    signature: string;
  };
}

// Renders the current year on the client to avoid hydration mismatches.
function CurrentYear({ fallback = 2025 }: { fallback?: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

// Inline social icons — keep them dependency-free.
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

// Social links — external URLs from siteConfig.
const socialLinks = [
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { key: "twitter", label: "Twitter", href: siteConfig.social.twitter },
  { key: "github", label: "GitHub", href: siteConfig.social.github },
] as const;

export function Footer({ locale, footer, nav, labels }: FooterProps) {
  const l = locale as Locale;
  const year = 2025;

  // Internal nav links.
  const navLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/library`, label: nav.library },
    { href: `/${locale}/mothaqaf`, label: nav.mothaqaf },
    { href: `/${locale}/projects`, label: nav.projects },
  ];

  // Smooth scroll back to the top of the page.
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden pt-20 pb-0">
      {/* Giant signature watermark in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <p className="whitespace-nowrap text-center text-[20vw] font-black leading-[0.85] tracking-tighter text-primary-ghost">
          {labels.signature}
        </p>
      </div>

      <div className="container-editorial relative">
        {/* Central CTA + newsletter form */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {labels.letsTalk}
          </p>
          <h2 className="heading-section mt-4 text-text">
            {labels.gotIdea}{" "}
            <span className="block text-text/70">{labels.buildTogether}</span>
          </h2>

          {/* Newsletter form */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {labels.newsletterLabel}
            </p>
            <NewsletterForm
              placeholder={labels.newsletterPlaceholder}
              submitLabel={labels.newsletterSubmit}
              successMessage={labels.newsletterSuccess}
            />
          </div>

          {/* Secondary email CTA */}
          <div className="mt-6">
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 7l9 6 9-6M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {labels.emailMe}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="mx-auto my-16 h-px max-w-3xl bg-linear-to-r from-transparent via-primary/20 to-transparent"
        />

        {/* Grid: brand + nav + social */}
        <div className="grid gap-10 text-center md:grid-cols-12 md:gap-6 md:text-start">
          {/* Brand column */}
          <div className="flex flex-col items-center md:col-span-5 md:items-start">
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <p className="mt-3 text-xs text-muted/70">{footer.madeBy}</p>
          </div>

          {/* Nav column */}
          <div className="flex flex-col items-center md:col-span-4 md:items-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
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

          {/* Social + contact column */}
          <div className="flex flex-col items-center md:col-span-3 md:items-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {labels.follow}
            </p>
            <ul className="flex items-center justify-center gap-2 md:justify-start">
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

            <a
              href={`mailto:${siteConfig.social.email}`}
              className="mt-6 block text-sm font-medium text-text transition-colors hover:text-primary"
            >
              {siteConfig.social.email}
            </a>

            <button
              type="button"
              onClick={handleBackToTop}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary-tint bg-canvas/50 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 19V5m0 0-6 6m6-6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {labels.backToTop}
            </button>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-primary-tint pt-6 pb-10 text-xs text-muted sm:flex-row sm:items-center">
          <p className="text-center sm:text-start">
            © <CurrentYear fallback={year} /> {siteConfig.siteName[l]} —{" "}
            {footer.rights}
          </p>
          <p className="text-center text-muted/70 sm:text-end">
            {labels.crafted}
          </p>
        </div>
      </div>
    </footer>
  );
}
