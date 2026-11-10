"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig, type Locale } from "@/config/site.config";
import { AnimatedAvatar } from "@/components/layout/AnimatedAvatar";

interface HeaderProps {
  locale: string;
  nav: {
    home: string;
    about: string;
    library: string;
    mothaqaf: string;
    projects: string;
  };
  switchLabel: string;
  ctaLabel: string;
  ctaHref: string;
  /** Localized header strings (from common.header). */
  labels: {
    skipToContent: string;
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    close: string;
    contact: string;
    switchAria: string;
    brandHomeAria: string;
  };
}

export function Header({
  locale,
  nav,
  switchLabel,
  ctaLabel,
  ctaHref,
  labels,
}: HeaderProps) {
  const l = locale as Locale;
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle a subtle background when the user scrolls down.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Internal nav links.
  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/library`, label: nav.library },
    { href: `/${locale}/mothaqaf`, label: nav.mothaqaf },
    { href: `/${locale}/projects`, label: nav.projects },
  ];

  // Home is active only on exact match; every other route uses startsWith.
  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  // ─── Locale switch URL ────────────────────────────────────
  // Replace the first URL segment with the target locale.
  const targetLocale = locale === "ar" ? "en" : "ar";
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "ar" || segs[0] === "en") segs[0] = targetLocale;
  else segs.unshift(targetLocale);
  const switchHref = `/${segs.join("/")}`;

  const siteName = siteConfig.siteName[l];

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-primary-tint bg-canvas/70 backdrop-blur-xl"
            : "border-b border-transparent bg-canvas/40 backdrop-blur-sm",
        ].join(" ")}
      >
        {/* Skip link — visible only on keyboard focus */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:inset-s-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          {labels.skipToContent}
        </a>

        <div className="container-editorial flex h-16 items-center gap-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            aria-label={`${siteName} — ${labels.brandHomeAria}`}
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <AnimatedAvatar
              locale={locale}
              size={44}
              showStatus
              showName
              variant="watermark"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label={labels.primaryNav}
            className="hidden lg:flex flex-1 items-center justify-center gap-1"
          >
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-text"
                      : "text-muted hover:text-text hover:bg-primary-tint",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={[
                      "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary transition-all duration-300",
                      active
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right-side controls */}
          <div className="ms-auto flex items-center gap-2">
            {/* Locale switch */}
            <Link
              href={switchHref}
              aria-label={`${labels.switchAria} ${switchLabel}`}
              className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-primary-tint bg-background/70 px-3 text-xs font-semibold text-text backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="text-muted transition-colors group-hover:text-primary"
              >
                <path
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0c2.5 2.5 4 5.9 4 10s-1.5 7.5-4 10m0-20C9.5 4.5 8 7.9 8 12s1.5 7.5 4 10M2 12h20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span>{switchLabel}</span>
            </Link>

            {/* Primary CTA — hidden on mobile */}
            <Link
              href={ctaHref}
              className="hidden md:inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {ctaLabel}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-tint bg-background/70 text-text backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-100 flex flex-col bg-canvas lg:hidden"
        >
          {/* Menu header */}
          <div className="container-editorial flex h-16 items-center justify-between">
            <span className="text-sm font-bold text-text">{labels.menu}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={labels.close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-tint text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 flex-col">
            {/* Nav links with staggered entrance animation */}
            <nav className="container-editorial flex-1 pt-8">
              <ul className="space-y-1">
                {links.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <li
                      key={link.href}
                      style={{
                        animation: `menuItemIn 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "flex items-baseline gap-4 py-2 text-3xl font-bold transition-colors",
                          active
                            ? "text-primary"
                            : "text-text hover:text-primary",
                        ].join(" ")}
                      >
                        <span className="text-[10px] font-semibold text-primary/50">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact block + CTA */}
            <div className="container-editorial border-t border-primary-tint py-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                {labels.contact}
              </p>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="block text-sm font-medium text-text transition-colors hover:text-primary"
              >
                {siteConfig.social.email}
              </a>
              <div className="mt-4 flex gap-2">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-muted hover:text-primary"
                >
                  LinkedIn
                </a>
                <span className="text-muted">·</span>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-muted hover:text-primary"
                >
                  Twitter
                </a>
                <span className="text-muted">·</span>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs text-muted hover:text-primary"
                >
                  GitHub
                </a>
              </div>
              <Link
                href={ctaHref}
                onClick={() => setMenuOpen(false)}
                className="btn-base btn-primary mt-6 w-full"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
