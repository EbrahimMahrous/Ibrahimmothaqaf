"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";

/**
 * Locale-scoped 404.
 * Detects the current locale from the pathname and shows a localized message.
 * Uses a client component because `not-found.tsx` doesn't receive params.
 */
export default function NotFound() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1] ?? "ar";
  const locale = isLocale(firstSegment) ? firstSegment : "ar";
  const t = getMessages(locale);

  return (
    <div className="container-editorial section text-center">
      <h1 className="heading-section">{t.common.notFound.title}</h1>
      <p className="body-lead mt-4">{t.common.notFound.message}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href={`/${locale}`} className="btn-base btn-primary">
          {t.common.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
