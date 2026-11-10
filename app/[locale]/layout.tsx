import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo, Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundFX } from "@/components/common/BackgroundFX";
import { getMessages, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/config/site.config";

// ─── Fonts (Arabic + English) ─────────────────────────────
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Base metadata for the site.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Pre-render each supported locale at build time.
export async function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Reject unknown locales early.
  if (!isLocale(locale)) notFound();

  const t = getMessages(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-canvas text-text antialiased">
        <BackgroundFX />
        <Header
          locale={locale}
          nav={t.common.nav}
          switchLabel={t.common.locale.switchTo}
          ctaLabel={t.common.cta.contactMe}
          ctaHref={`/${locale}/about`}
          labels={t.common.header}
        />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer
          locale={locale}
          footer={t.common.footer}
          nav={t.common.nav}
          labels={t.common.footerLabels}
        />
      </body>
    </html>
  );
}
