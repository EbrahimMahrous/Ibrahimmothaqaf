"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LocaleSwitcherProps {
  currentLocale: string;
  switchLabel: string;
}

export function LocaleSwitcher({
  currentLocale,
  switchLabel,
}: LocaleSwitcherProps) {
  const pathname = usePathname() || "/";
  const targetLocale = currentLocale === "ar" ? "en" : "ar";

  // Replace the first segment with the target locale.
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "ar" || segments[0] === "en") {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  const targetHref = `/${segments.join("/")}`;

  return (
    <Link
      href={targetHref}
      aria-label={switchLabel}
      title={switchLabel}
      className="group inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-muted transition-colors hover:text-primary"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span className="text-[11px] font-semibold tracking-wider uppercase">
        {currentLocale === "ar" ? "EN" : "AR"}
      </span>
    </Link>
  );
}
