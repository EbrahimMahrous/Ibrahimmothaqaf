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
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";
import { ContactSection } from "@/components/sections/home/ContactSection";

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
        <ContactSection
          locale={locale}
          labels={{
            letsTalk: t.common.contactSection.letsTalk,
            gotIdea: t.common.contactSection.gotIdea,
            buildTogether: t.common.contactSection.buildTogether,
            contactTitle: t.common.contactSection.contactTitle,
            contactSubtitle: t.common.contactSection.contactSubtitle,
            contactResponseTime: t.common.contactSection.contactResponseTime,
            contactAlt: t.common.contactSection.contactAlt,
            contactFormName: t.common.contactSection.formName,
            contactFormNamePlaceholder:
              t.common.contactSection.formNamePlaceholder,
            contactFormEmail: t.common.contactSection.formEmail,
            contactFormEmailPlaceholder:
              t.common.contactSection.formEmailPlaceholder,
            contactFormMessage: t.common.contactSection.formMessage,
            contactFormMessagePlaceholder:
              t.common.contactSection.formMessagePlaceholder,
            contactFormSubmit: t.common.contactSection.formSubmit,
            contactFormSuccess: t.common.contactSection.formSuccess,
            contactFormSending: t.common.contactSection.formSending,
            contactFormError: t.common.contactSection.formError,
            faqTitle: t.common.contactSection.faqTitle,
            faqViewAll: t.common.contactSection.faqViewAll,
          }}
        />

        <NewsletterSection
          labels={{
            newsletterTitle: t.common.newsletterSection.title,
            newsletterSubtitle: t.common.newsletterSection.subtitle,
            newsletterPlaceholder: t.common.newsletterSection.placeholder,
            newsletterSubmit: t.common.newsletterSection.submit,
            newsletterSuccess: t.common.newsletterSection.success,
            newsletterError: t.common.newsletterSection.error,
            newsletterHint: t.common.newsletterSection.hint,
            newsletterPerks: t.common.newsletterSection.perks,
          }}
        />
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
