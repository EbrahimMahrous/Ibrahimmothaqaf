import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { contentRepository } from "@/lib/content/repository";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LibraryStats } from "@/components/sections/library/LibraryStats";
import { LibraryGrid } from "@/components/sections/library/LibraryGrid";

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
    title: t.library.meta.title,
    description: t.library.meta.description,
    path: "/library",
  });
}

export default async function LibraryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);
  const l = (locale === "en" ? "en" : "ar") as "ar" | "en";

  // Load all guides for the current locale.
  const guides = contentRepository.getGuides(locale);

  // Aggregate stats for the header cards.
  const totalViews = guides.reduce((s, g) => s + g.stats.views, 0);
  const totalDownloads = guides.reduce((s, g) => s + g.stats.downloads, 0);

  return (
    <>
      {/* ─── Header + stats ─────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 inset-s-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-tint blur-3xl"
        />
        <div className="container-editorial relative reveal">
          <SectionHeading
            eyebrow={t.library.heading.eyebrow}
            title={t.library.heading.title}
            subtitle={t.library.heading.subtitle}
            align="center"
          />

          <div className="mx-auto mt-10 max-w-3xl">
            <LibraryStats
              totalVideos={guides.length}
              totalDownloads={totalDownloads}
              totalViews={totalViews}
              labels={t.library.stats}
              locale={l}
            />
          </div>
        </div>
      </section>

      {/* ─── Grid + filters ─────────────────────────────────── */}
      <section className="section pt-0">
        <div className="container-editorial">
          <LibraryGrid
            guides={guides}
            locale={l}
            labels={{
              filters: t.library.filters,
              categories: t.library.categories,
              card: {
                download: t.library.card.download,
                video: t.library.card.video,
                views: t.library.stats.views,
                downloads: t.library.stats.downloads,
                isNew: t.library.card.new,
              },
            }}
          />
        </div>
      </section>
    </>
  );
}
