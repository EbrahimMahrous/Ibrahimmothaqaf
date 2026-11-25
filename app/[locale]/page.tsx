import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { contentRepository } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { FeaturedGuides } from "@/components/sections/home/FeaturedGuides";
import { ProjectsPreview } from "@/components/sections/home/ProjectsPreview";
import { ArabWorldSection } from "@/components/sections/home/ArabWorldSection";
import { fetchHeroImages, fetchFiles } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import type { HeroImage } from "@/types";

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

// Fallback portraits — same shape as HeroImage (but _id will be synthetic)
const DEFAULT_PORTRAITS: HeroImage[] = [
  {
    _id: "default-1",
    url: "/images/hero/portrait-1.jpg",
    publicId: "",
    alt: "",
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-2",
    url: "/images/hero/portrait-2.jpg",
    publicId: "",
    alt: "",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-3",
    url: "/images/hero/portrait-3.jpg",
    publicId: "",
    alt: "",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-4",
    url: "/images/hero/portrait-4.jpg",
    publicId: "",
    alt: "",
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-5",
    url: "/images/hero/portrait-5.jpg",
    publicId: "",
    alt: "",
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-6",
    url: "/images/hero/portrait-6.jpg",
    publicId: "",
    alt: "",
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "default-7",
    url: "/images/hero/portrait-7.jpg",
    publicId: "",
    alt: "",
    order: 6,
    createdAt: new Date().toISOString(),
  },
];

async function getHeroData(): Promise<HeroImage[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("hero");

  const images = await fetchHeroImages();
  return images.length > 0 ? images : DEFAULT_PORTRAITS;
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
        portraitLabels={{
          viewFile: t.library.card.preview,
          watchVideo: t.library.card.watchVideo,
          openNewTab: locale === "ar" ? "فتح في تاب جديد" : "Open in new tab",
          unsupported:
            locale === "ar" ? "المعاينة غير متاحة" : "Preview not available",
          preview: t.library.card.preview,
          download: t.library.card.download,
        }}
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
          preview: t.library.card.preview,
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
    </>
  );
}
