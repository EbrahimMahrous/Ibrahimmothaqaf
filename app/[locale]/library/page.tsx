import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LibraryStats } from "@/components/sections/library/LibraryStats";
import { LibraryGrid } from "@/components/sections/library/LibraryGrid";
import { fetchFiles } from "@/lib/api";
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
    title: t.library.meta.title,
    description: t.library.meta.description,
    path: "/library",
  });
}

// Cache file list — refreshed via revalidateTag('files')
async function getCachedFiles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("files");
  return await fetchFiles({ limit: 100 });
}

export default async function LibraryPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getMessages(locale);
  const l = (locale === "en" ? "en" : "ar") as "ar" | "en";

  const files = await getCachedFiles();

  const totalDownloads = files.reduce((s, f) => s + f.downloads, 0);
  const totalViews = files.reduce((s, f) => s + f.views, 0);

  return (
    <>
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
              totalVideos={files.length}
              totalDownloads={totalDownloads}
              totalViews={totalViews}
              labels={t.library.stats}
              locale={l}
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-editorial">
          <LibraryGrid
            files={files}
            locale={l}
            labels={{
              filters: t.library.filters,
              categories: t.library.categories,
              card: {
                download: t.library.card.download,
                watchVideo: t.library.card.watchVideo,
                preview: t.library.card.preview, // ← new
                views: t.library.stats.views,
                downloads: t.library.stats.downloads,
                isNew: t.library.card.new,
                featured: t.library.card.featured,
              },
            }}
          />
        </div>
      </section>
    </>
  );
}
