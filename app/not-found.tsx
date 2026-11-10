import Link from "next/link";
import { getMessages } from "@/lib/i18n";

// Root 404 — shown when no locale segment is matched.
// Defaults to Arabic strings since the locale is unknown here.
export default function NotFound() {
  const t = getMessages("ar");

  return (
    <div className="container-editorial section text-center">
      <h1 className="heading-section">{t.common.notFound.title}</h1>
      <p className="body-lead mt-4">{t.common.notFound.message}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/ar" className="btn-base btn-primary">
          العربية
        </Link>
        <Link href="/en" className="btn-base btn-secondary">
          English
        </Link>
      </div>
    </div>
  );
}
