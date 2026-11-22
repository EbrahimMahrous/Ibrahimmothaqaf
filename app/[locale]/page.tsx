import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { contentRepository } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { FeaturedGuides } from "@/components/sections/home/FeaturedGuides";
import { ProjectsPreview } from "@/components/sections/home/ProjectsPreview";
import { ArabWorldSection } from "@/components/sections/home/ArabWorldSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";
import { fetchHeroImages, fetchFiles } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

export const instant = false;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale);
  return buildMetadata({
    locale,
    title: t.home.hero.title,
    description: t.home.hero.subtitle,
    path: "",
  });
}

const DEFAULT_PORTRAITS = [
  { src: "/images/hero/portrait-1.jpg", alt: "" },
  { src: "/images/hero/portrait-2.jpg", alt: "" },
  { src: "/images/hero/portrait-3.jpg", alt: "" },
  { src: "/images/hero/portrait-4.jpg", alt: "" },
  { src: "/images/hero/portrait-5.jpg", alt: "" },
  { src: "/images/hero/portrait-6.jpg", alt: "" },
  { src: "/images/hero/portrait-7.jpg", alt: "" },
];

async function getHeroData() {
  "use cache";
  cacheLife("minutes");
  cacheTag("hero");

  const images = await fetchHeroImages();
  return images.length > 0
    ? images.map((img) => ({ src: img.url, alt: img.alt || "" }))
    : DEFAULT_PORTRAITS;
}

async function getFeaturedFiles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("files");

  const files = await fetchFiles({ limit: 3 });
  return files;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);
  const l = (locale === "en" ? "en" : "ar") as "ar" | "en";

  const files = await getFeaturedFiles();
  const projects = contentRepository.getProjects(locale).slice(0, 3);
  const portraits = await getHeroData();

  return (
    <>
      <HeroSection
        locale={locale}
        eyebrow={t.home.hero.eyebrow}
        title={t.home.hero.title}
        subtitle={t.home.hero.subtitle}
        primaryCta={{
          label: t.home.hero.primaryCta,
          href: `/${locale}/library`,
        }}
        secondaryCta={{
          label: t.home.hero.secondaryCta,
          href: `/${locale}/about`,
        }}
        portraits={portraits}
        carouselLabels={t.common.carousel}
        features={t.home.hero.features}
      />

      <AboutPreview
        locale={locale}
        eyebrow={t.home.aboutPreview.eyebrow}
        title={t.home.aboutPreview.title}
        subtitle={t.home.aboutPreview.body}
        cta={t.home.aboutPreview.cta}
        quote={t.home.aboutPreview.quote}
      />

      <ArabWorldSection
        locale={locale}
        eyebrow={t.arabWorld.eyebrow}
        title={t.arabWorld.title}
        subtitle={t.arabWorld.subtitle}
        cta={{
          label: t.arabWorld.cta,
          href: `/${locale}/library`,
        }}
        welcomeMessages={t.welcomeFrom}
      />

      <FeaturedGuides
        locale={l}
        eyebrow={t.home.featuredGuides.eyebrow}
        title={t.home.featuredGuides.title}
        subtitle={t.home.featuredGuides.subtitle}
        cta={t.home.featuredGuides.cta}
        files={files}
        cardLabels={{
          download: t.library.card.download,
          watchVideo: t.library.card.watchVideo,
          preview: t.library.card.preview, // ← add
          views: t.library.stats.views,
          downloads: t.library.stats.downloads,
          isNew: t.library.card.new,
          featured: t.library.card.featured,
          categories: t.library.categories,
        }}
      />

      <ProjectsPreview
        locale={locale}
        eyebrow={t.home.projectsPreview.eyebrow}
        title={t.home.projectsPreview.title}
        subtitle={t.home.projectsPreview.subtitle}
        cta={t.home.projectsPreview.cta}
        statusLabels={t.common.status}
        viewLabel={t.common.cta.viewProjects}
        projects={projects}
      />

      {/* ─── Contact Section ────────────────────────────── */}
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

      {/* ─── Newsletter Section ─────────────────────────── */}
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
    </>
  );
}
