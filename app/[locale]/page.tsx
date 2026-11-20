import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { contentRepository } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { FeaturedGuides } from "@/components/sections/home/FeaturedGuides";
import { ProjectsPreview } from "@/components/sections/home/ProjectsPreview";
import { fetchHeroImages } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

// Disable instant navigation validation for this segment.
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

// Fallback portraits if backend has no images yet
const DEFAULT_PORTRAITS = [
  { src: "/images/hero/portrait-1.jpg", alt: "" },
  { src: "/images/hero/portrait-2.jpg", alt: "" },
  { src: "/images/hero/portrait-3.jpg", alt: "" },
  { src: "/images/hero/portrait-4.jpg", alt: "" },
  { src: "/images/hero/portrait-5.jpg", alt: "" },
  { src: "/images/hero/portrait-6.jpg", alt: "" },
  { src: "/images/hero/portrait-7.jpg", alt: "" },
];

// Cache hero data — refreshed via revalidateTag('hero')
async function getHeroData() {
  "use cache";
  cacheLife("minutes");
  cacheTag("hero");

  const images = await fetchHeroImages();
  return images.length > 0
    ? images.map((img) => ({ src: img.url, alt: img.alt || "" }))
    : DEFAULT_PORTRAITS;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);
  const l = (locale === "en" ? "en" : "ar") as "ar" | "en";

  // Fetch only the first 3 items for each preview section.
  const guides = contentRepository.getGuides(locale).slice(0, 3);
  const projects = contentRepository.getProjects(locale).slice(0, 3);

  // Hero portraits from backend (cached).
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

      <FeaturedGuides
        locale={l}
        eyebrow={t.home.featuredGuides.eyebrow}
        title={t.home.featuredGuides.title}
        subtitle={t.home.featuredGuides.subtitle}
        cta={t.home.featuredGuides.cta}
        guides={guides}
        cardLabels={{
          download: t.library.card.download,
          video: t.library.card.video,
          views: t.library.stats.views,
          downloads: t.library.stats.downloads,
          isNew: t.library.card.new,
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
