import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo, Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundFX } from "@/components/common/BackgroundFX";
import { FloatingGame } from "@/components/games/FloatingGame";
import { getMessages, isLocale } from "@/lib/i18n";
import { siteConfig } from "@/config/site.config";
import { fetchSettings } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

async function getCachedSettings() {
  "use cache";
  cacheLife("hours");
  cacheTag("settings");
  return await fetchSettings();
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const t = getMessages(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  const settings = await getCachedSettings();

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
          settings={settings}
        />
        <main id="main" className="relative">
          {children}
        </main>
        <Footer
          locale={locale}
          footer={t.common.footer}
          nav={t.common.nav}
          labels={{
            contact: t.common.footerLabels.contact,
            navigation: t.common.footerLabels.navigation,
            follow: t.common.footerLabels.follow,
            backToTop: t.common.footerLabels.backToTop,
            crafted: t.common.footerLabels.crafted,
            brandHomeAria: t.common.footerLabels.brandHomeAria,
            signature: t.common.footerLabels.signature,
          }}
          settings={settings}
        />
        <FloatingGame />
      </body>
    </html>
  );
}
